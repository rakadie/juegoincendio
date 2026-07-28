/* eslint-disable no-console */

/**
 * Synchronize GitHub issue state with a GitHub Projects v2 Status field.
 *
 * Safe defaults:
 * - closed issue -> Done
 * - status:blocked -> Backlog
 * - status:ready -> Ready
 * - status:in-progress -> In Progress
 * - all explicit dependencies closed -> Ready
 * - any explicit dependency open -> Backlog
 * - ready-for-review PR with `Closes/Fixes/Resolves #N` -> In Progress
 *
 * It never closes an issue because of a Project status change.
 */
module.exports = async ({ github, context, core }) => {
  const repoOwner = context.repo.owner;
  const repoName = context.repo.repo;
  const repoFullName = `${repoOwner}/${repoName}`;

  const projectOwner = process.env.PROJECT_OWNER || repoOwner;
  const projectNumber = Number(process.env.PROJECT_NUMBER);
  const statusFieldName = process.env.PROJECT_STATUS_FIELD || 'Status';

  const statusNames = {
    backlog: process.env.PROJECT_STATUS_BACKLOG || 'Backlog',
    ready: process.env.PROJECT_STATUS_READY || 'Ready',
    inProgress: process.env.PROJECT_STATUS_IN_PROGRESS || 'In Progress',
    done: process.env.PROJECT_STATUS_DONE || 'Done',
  };

  if (!Number.isInteger(projectNumber) || projectNumber <= 0) {
    throw new Error('Repository variable PROJECT_NUMBER must contain the GitHub Project number.');
  }

  const normalize = (value) => String(value || '').trim().toLocaleLowerCase('en-US');

  const projectQuery = `
    query Project($owner: String!, $repo: String!, $number: Int!) {
      repository(owner: $owner, name: $repo) {
        owner {
          __typename
          login
          ... on User {
            projectV2(number: $number) {
              ...ProjectData
            }
          }
          ... on Organization {
            projectV2(number: $number) {
              ...ProjectData
            }
          }
        }
      }
    }

    fragment ProjectData on ProjectV2 {
      id
      title
      fields(first: 50) {
        nodes {
          ... on ProjectV2SingleSelectField {
            id
            name
            options {
              id
              name
            }
          }
        }
      }
    }
  `;

  const projectResponse = await github.graphql(projectQuery, {
    owner: repoOwner,
    repo: repoName,
    number: projectNumber,
  });

  const repositoryOwner = projectResponse.repository?.owner;
  const project = repositoryOwner?.projectV2;

  if (!project) {
    throw new Error(
      `Project #${projectNumber} was not found for repository owner ${projectOwner}. ` +
        'Set PROJECT_OWNER and PROJECT_NUMBER to the owner and number shown in the Project URL.',
    );
  }

  const statusField = project.fields.nodes.find(
    (field) => field && normalize(field.name) === normalize(statusFieldName),
  );

  if (!statusField) {
    throw new Error(`Single-select field '${statusFieldName}' was not found in Project '${project.title}'.`);
  }

  const optionByName = (name) =>
    statusField.options.find((option) => normalize(option.name) === normalize(name));

  const statusOptions = {
    backlog: optionByName(statusNames.backlog),
    ready: optionByName(statusNames.ready),
    inProgress: optionByName(statusNames.inProgress),
    done: optionByName(statusNames.done),
  };

  for (const [key, option] of Object.entries(statusOptions)) {
    if (!option) {
      throw new Error(
        `Status option '${statusNames[key]}' was not found in field '${statusField.name}'. ` +
          'Adjust the PROJECT_STATUS_* repository variables to match the Project option names.',
      );
    }
  }

  const findProjectItem = async (issueNodeId) => {
    let after = null;

    do {
      const result = await github.graphql(
        `
          query ProjectItems($projectId: ID!, $after: String) {
            node(id: $projectId) {
              ... on ProjectV2 {
                items(first: 100, after: $after) {
                  nodes {
                    id
                    content {
                      ... on Issue {
                        id
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          }
        `,
        { projectId: project.id, after },
      );

      const items = result.node.items;
      const matchingItem = items.nodes.find((item) => item.content?.id === issueNodeId);
      if (matchingItem) return matchingItem;

      after = items.pageInfo.hasNextPage ? items.pageInfo.endCursor : null;
    } while (after);

    return null;
  };

  const ensureProjectItem = async (issueNodeId) => {
    const existing = await findProjectItem(issueNodeId);
    if (existing) return existing;

    const added = await github.graphql(
      `
        mutation AddProjectItem($projectId: ID!, $contentId: ID!) {
          addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
            item {
              id
            }
          }
        }
      `,
      { projectId: project.id, contentId: issueNodeId },
    );

    return added.addProjectV2ItemById.item;
  };

  const updateStatus = async (issue, desiredStatusKey, reason) => {
    const option = statusOptions[desiredStatusKey];
    const item = await ensureProjectItem(issue.node_id);

    await github.graphql(
      `
        mutation UpdateProjectStatus(
          $projectId: ID!
          $itemId: ID!
          $fieldId: ID!
          $optionId: String!
        ) {
          updateProjectV2ItemFieldValue(
            input: {
              projectId: $projectId
              itemId: $itemId
              fieldId: $fieldId
              value: { singleSelectOptionId: $optionId }
            }
          ) {
            projectV2Item {
              id
            }
          }
        }
      `,
      {
        projectId: project.id,
        itemId: item.id,
        fieldId: statusField.id,
        optionId: option.id,
      },
    );

    core.info(`#${issue.number} -> ${option.name}: ${reason}`);
  };

  const dependencyNumbers = (body) => {
    const numbers = new Set();
    const source = String(body || '');
    const linePattern =
      /(?:depende(?:ncia)?s?\s*(?:de)?|depends?\s+on|blocked\s+by|bloquead[oa]\s+por)\s*:?\s*([^\n]+)/gi;

    for (const match of source.matchAll(linePattern)) {
      for (const issueMatch of match[1].matchAll(/#(\d+)/g)) {
        numbers.add(Number(issueMatch[1]));
      }
    }

    return [...numbers];
  };

  const getIssue = async (number) => {
    const response = await github.rest.issues.get({ owner: repoOwner, repo: repoName, issue_number: number });
    return response.data;
  };

  const calculateStatus = async (issue) => {
    if (issue.state === 'closed') {
      return { key: 'done', reason: 'issue closed' };
    }

    const labels = new Set(
      (issue.labels || []).map((label) => normalize(typeof label === 'string' ? label : label.name)),
    );

    if (labels.has('status:blocked')) {
      return { key: 'backlog', reason: 'status:blocked label' };
    }

    if (labels.has('status:in-progress')) {
      return { key: 'inProgress', reason: 'status:in-progress label' };
    }

    if (labels.has('status:ready')) {
      return { key: 'ready', reason: 'status:ready label' };
    }

    const dependencies = dependencyNumbers(issue.body);
    if (dependencies.length === 0) return null;

    const dependencyIssues = await Promise.all(dependencies.map(getIssue));
    const openDependencies = dependencyIssues.filter((dependency) => dependency.state !== 'closed');

    if (openDependencies.length > 0) {
      return {
        key: 'backlog',
        reason: `open dependencies: ${openDependencies.map((dependency) => `#${dependency.number}`).join(', ')}`,
      };
    }

    return {
      key: 'ready',
      reason: `all dependencies closed: ${dependencies.map((number) => `#${number}`).join(', ')}`,
    };
  };

  const syncIssue = async (issue, forcedKey = null) => {
    if (issue.pull_request) return;

    const decision = forcedKey
      ? { key: forcedKey, reason: 'manual workflow dispatch' }
      : await calculateStatus(issue);

    if (!decision) {
      core.info(`#${issue.number}: no explicit status signal; status left unchanged.`);
      return;
    }

    await updateStatus(issue, decision.key, decision.reason);
  };

  const syncOpenDependencyIssues = async () => {
    const issues = await github.paginate(github.rest.issues.listForRepo, {
      owner: repoOwner,
      repo: repoName,
      state: 'open',
      per_page: 100,
    });

    for (const issue of issues) {
      if (!issue.pull_request && dependencyNumbers(issue.body).length > 0) {
        await syncIssue(issue);
      }
    }
  };

  const closingReferences = (body) => {
    const numbers = new Set();
    const pattern = /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/gi;
    for (const match of String(body || '').matchAll(pattern)) {
      numbers.add(Number(match[1]));
    }
    return [...numbers];
  };

  if (context.eventName === 'pull_request') {
    const pullRequest = context.payload.pull_request;
    const linkedIssues = closingReferences(pullRequest.body);

    if (linkedIssues.length === 0) {
      core.info('Pull request has no closing references; nothing to synchronize.');
      return;
    }

    if (pullRequest.merged) {
      for (const number of linkedIssues) {
        await syncIssue(await getIssue(number), 'done');
      }
      await syncOpenDependencyIssues();
      return;
    }

    if (pullRequest.state === 'open' && !pullRequest.draft) {
      for (const number of linkedIssues) {
        await syncIssue(await getIssue(number), 'inProgress');
      }
    }

    return;
  }

  if (context.eventName === 'workflow_dispatch') {
    const requestedNumber = Number(context.payload.inputs?.issue_number || 0);
    const requestedStatus = String(context.payload.inputs?.status || 'auto');
    const forcedStatusMap = {
      Backlog: 'backlog',
      Ready: 'ready',
      'In Progress': 'inProgress',
      Done: 'done',
    };

    if (requestedNumber > 0) {
      await syncIssue(await getIssue(requestedNumber), forcedStatusMap[requestedStatus] || null);
    } else {
      await syncOpenDependencyIssues();
    }
    return;
  }

  if (context.eventName === 'issues') {
    await syncIssue(context.payload.issue);

    if (['closed', 'reopened', 'edited'].includes(context.payload.action)) {
      await syncOpenDependencyIssues();
    }
  }

  core.info(`Project synchronization completed for ${repoFullName}.`);
};
