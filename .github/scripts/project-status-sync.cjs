/* eslint-disable no-console */

const normalize = (value) => String(value || '').trim().toLocaleLowerCase('en-US');

const issueLabelNames = (labels = []) => {
  const values = Array.isArray(labels) ? labels : labels.nodes || [];
  return new Set(
    values.map((label) => normalize(typeof label === 'string' ? label : label?.name)),
  );
};

const projectStatusForClosedReason = (stateReason) => {
  const reason = normalize(stateReason);
  return reason === 'not_planned' || reason === 'duplicate' ? 'superseded' : 'done';
};

const closingReasonForProjectStatus = (statusKey) => {
  if (statusKey === 'done') return 'completed';
  if (statusKey !== 'superseded') return null;
  return 'not_planned';
};

/**
 * Return issue numbers governed by a closing keyword and targeting this
 * repository. GitHub requires a keyword for each target, so unrelated
 * references later on the same line are deliberately ignored.
 */
const closingReferences = (body, owner, repo) => {
  const numbers = new Set();
  const pattern =
    /\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+(?:([a-z0-9_.-]+)\/([a-z0-9_.-]+))?#(\d+)\b/gi;

  for (const match of String(body || '').matchAll(pattern)) {
    const [, targetOwner, targetRepo, issueNumber] = match;
    const isLocal =
      !targetOwner ||
      (targetOwner.toLocaleLowerCase('en-US') === owner.toLocaleLowerCase('en-US') &&
        targetRepo.toLocaleLowerCase('en-US') === repo.toLocaleLowerCase('en-US'));
    if (isLocal) numbers.add(Number(issueNumber));
  }
  return [...numbers];
};

/**
 * Keep GitHub issue state and the terminal GitHub Projects v2 statuses aligned.
 *
 * Rules:
 * - new/reopened issue without another signal -> Backlog
 * - closed issue as completed -> Done
 * - closed issue as not planned/duplicate -> Superseded
 * - Done -> close the issue as completed
 * - Superseded -> close the issue as not planned
 * - status:* labels explicitly select a Project status
 * - all explicit dependencies closed -> Ready
 * - any explicit dependency open -> Blocked
 * - draft PR with `Closes/Fixes/Resolves #N` -> In Progress
 * - non-draft PR with a closing reference -> Review
 * - merged PR with a closing reference -> Done
 *
 * All terminal transitions are idempotent. A scheduled reconciliation catches
 * manual moves to terminal Project statuses that do not emit repository events.
 */
module.exports = async ({ github, projectGraphql = github.graphql, context, core }) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const projectNumber = Number(process.env.PROJECT_NUMBER);
  const statusFieldName = process.env.PROJECT_STATUS_FIELD || 'Status';

  const statusNames = {
    backlog: process.env.PROJECT_STATUS_BACKLOG || 'Backlog',
    ready: process.env.PROJECT_STATUS_READY || 'Ready',
    inProgress: process.env.PROJECT_STATUS_IN_PROGRESS || 'In Progress',
    blocked: process.env.PROJECT_STATUS_BLOCKED || 'Blocked',
    review: process.env.PROJECT_STATUS_REVIEW || 'Review',
    done: process.env.PROJECT_STATUS_DONE || 'Done',
    superseded: process.env.PROJECT_STATUS_SUPERSEDED || 'Superseded',
  };

  if (!Number.isInteger(projectNumber) || projectNumber <= 0) {
    throw new Error('Repository variable PROJECT_NUMBER must contain the GitHub Project number.');
  }

  const projectResponse = await projectGraphql(
    `
      query Project($owner: String!, $repo: String!, $number: Int!) {
        repository(owner: $owner, name: $repo) {
          owner {
            ... on User {
              projectV2(number: $number) { ...ProjectData }
            }
            ... on Organization {
              projectV2(number: $number) { ...ProjectData }
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
              options { id name }
            }
          }
        }
      }
    `,
    { owner, repo, number: projectNumber },
  );

  const project = projectResponse.repository?.owner?.projectV2;
  if (!project) {
    throw new Error(`Project #${projectNumber} was not found for repository owner ${owner}.`);
  }

  const statusField = project.fields.nodes.find(
    (field) => field && normalize(field.name) === normalize(statusFieldName),
  );
  if (!statusField) {
    throw new Error(`Single-select field '${statusFieldName}' was not found in Project '${project.title}'.`);
  }

  const optionByName = (name) =>
    statusField.options.find((option) => normalize(option.name) === normalize(name));

  const statusOptions = Object.fromEntries(
    Object.entries(statusNames).map(([key, name]) => [key, optionByName(name)]),
  );

  for (const [key, option] of Object.entries(statusOptions)) {
    if (!option) {
      throw new Error(
        `Status option '${statusNames[key]}' was not found in field '${statusField.name}'. ` +
          'Set PROJECT_STATUS_* repository variables to the exact option names.',
      );
    }
  }

  const findProjectItem = async (issueNodeId) => {
    let after = null;
    do {
      const response = await projectGraphql(
        `
          query ProjectItems($projectId: ID!, $after: String) {
            node(id: $projectId) {
              ... on ProjectV2 {
                items(first: 100, after: $after) {
                  nodes {
                    id
                    content { ... on Issue { id } }
                  }
                  pageInfo { hasNextPage endCursor }
                }
              }
            }
          }
        `,
        { projectId: project.id, after },
      );

      const items = response.node.items;
      const match = items.nodes.find((item) => item.content?.id === issueNodeId);
      if (match) return match;
      after = items.pageInfo.hasNextPage ? items.pageInfo.endCursor : null;
    } while (after);
    return null;
  };

  const ensureProjectItem = async (issueNodeId) => {
    const existing = await findProjectItem(issueNodeId);
    if (existing) return existing;

    const response = await projectGraphql(
      `
        mutation AddProjectItem($projectId: ID!, $contentId: ID!) {
          addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
            item { id }
          }
        }
      `,
      { projectId: project.id, contentId: issueNodeId },
    );
    return response.addProjectV2ItemById.item;
  };

  const setStatus = async (issue, key, reason) => {
    const item = await ensureProjectItem(issue.node_id);
    const option = statusOptions[key];

    await projectGraphql(
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
          ) { projectV2Item { id } }
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

  const closeIssueForStatus = async (issue, statusKey) => {
    const stateReason = closingReasonForProjectStatus(statusKey);
    if (!stateReason || normalize(issue.state) === 'closed') return;

    await github.rest.issues.update({
      owner,
      repo,
      issue_number: issue.number,
      state: 'closed',
      state_reason: stateReason,
    });

    issue.state = 'closed';
    issue.state_reason = stateReason;
    core.info(`#${issue.number} closed as ${stateReason}: Project status ${statusNames[statusKey]}`);
  };

  const reconcileTerminalProjectStatuses = async () => {
    let after = null;
    do {
      const response = await projectGraphql(
        `
          query ProjectItemsWithStatus(
            $projectId: ID!
            $statusFieldName: String!
            $after: String
          ) {
            node(id: $projectId) {
              ... on ProjectV2 {
                items(first: 100, after: $after) {
                  nodes {
                    fieldValueByName(name: $statusFieldName) {
                      ... on ProjectV2ItemFieldSingleSelectValue { name }
                    }
                    content {
                      ... on Issue {
                        id
                        number
                        state
                        repository { nameWithOwner }
                        labels(first: 50) { nodes { name } }
                      }
                    }
                  }
                  pageInfo { hasNextPage endCursor }
                }
              }
            }
          }
        `,
        { projectId: project.id, statusFieldName, after },
      );

      const items = response.node.items;
      for (const item of items.nodes) {
        const issue = item.content;
        if (
          !issue ||
          normalize(issue.repository?.nameWithOwner) !== normalize(`${owner}/${repo}`) ||
          normalize(issue.state) !== 'open'
        ) {
          continue;
        }

        const statusKey = Object.entries(statusNames).find(
          ([, name]) => normalize(name) === normalize(item.fieldValueByName?.name),
        )?.[0];

        if (statusKey === 'done' || statusKey === 'superseded') {
          await closeIssueForStatus(issue, statusKey);
        }
      }

      after = items.pageInfo.hasNextPage ? items.pageInfo.endCursor : null;
    } while (after);
  };

  const issueReferences = (text) => {
    const numbers = new Set();
    const source = String(text || '');

    for (const match of source.matchAll(/#(\d+)\s*(?:-|–|—)\s*#?(\d+)/g)) {
      const start = Number(match[1]);
      const end = Number(match[2]);
      if (end >= start && end - start <= 100) {
        for (let number = start; number <= end; number += 1) numbers.add(number);
      }
    }

    for (const match of source.matchAll(/#(\d+)/g)) numbers.add(Number(match[1]));
    return [...numbers];
  };

  const dependencyNumbers = (body) => {
    const numbers = new Set();
    const pattern =
      /(?:depende(?:ncia)?s?\s*(?:de)?|depends?\s+on|blocked\s+by|bloquead[oa]\s+por)\s*:?\s*([^\n]+)/gi;

    for (const match of String(body || '').matchAll(pattern)) {
      for (const number of issueReferences(match[1])) numbers.add(number);
    }
    return [...numbers];
  };

  const getIssue = async (issueNumber) => {
    const response = await github.rest.issues.get({ owner, repo, issue_number: issueNumber });
    return response.data;
  };

  const calculateStatus = async (issue) => {
    if (normalize(issue.state) === 'closed') {
      const key = projectStatusForClosedReason(issue.state_reason);
      return { key, reason: `issue closed as ${normalize(issue.state_reason) || 'completed'}` };
    }

    const labels = issueLabelNames(issue.labels);

    if (labels.has('status:superseded')) {
      return { key: 'superseded', reason: 'status:superseded label' };
    }
    if (labels.has('status:blocked')) return { key: 'blocked', reason: 'status:blocked label' };
    if (labels.has('status:review')) return { key: 'review', reason: 'status:review label' };
    if (labels.has('status:in-progress')) {
      return { key: 'inProgress', reason: 'status:in-progress label' };
    }
    if (labels.has('status:ready')) return { key: 'ready', reason: 'status:ready label' };
    if (labels.has('status:backlog')) return { key: 'backlog', reason: 'status:backlog label' };

    const dependencies = dependencyNumbers(issue.body);
    if (dependencies.length === 0) return null;

    const dependencyIssues = await Promise.all(dependencies.map(getIssue));
    const openDependencies = dependencyIssues.filter(
      (dependency) => normalize(dependency.state) !== 'closed',
    );

    if (openDependencies.length > 0) {
      return {
        key: 'blocked',
        reason: `open dependencies: ${openDependencies.map((item) => `#${item.number}`).join(', ')}`,
      };
    }

    return {
      key: 'ready',
      reason: `all dependencies closed: ${dependencies.map((number) => `#${number}`).join(', ')}`,
    };
  };

  const syncIssue = async (issue, forcedKey = null, fallbackKey = null) => {
    if (issue.pull_request) return;

    let decision = forcedKey
      ? { key: forcedKey, reason: 'manual or pull-request transition' }
      : await calculateStatus(issue);

    if (!decision && fallbackKey) {
      decision = { key: fallbackKey, reason: 'default state for new or reopened issue' };
    }

    if (!decision) {
      core.info(`#${issue.number}: no explicit status signal; status left unchanged.`);
      return;
    }
    await setStatus(issue, decision.key, decision.reason);
    await closeIssueForStatus(issue, decision.key);
  };

  const syncOpenDependencies = async () => {
    const issues = await github.paginate(github.rest.issues.listForRepo, {
      owner,
      repo,
      state: 'open',
      per_page: 100,
    });

    for (const issue of issues) {
      if (!issue.pull_request && dependencyNumbers(issue.body).length > 0) {
        await syncIssue(issue);
      }
    }
  };

  if (context.eventName === 'schedule') {
    await reconcileTerminalProjectStatuses();
    return;
  }

  if (context.eventName === 'pull_request') {
    const pullRequest = context.payload.pull_request;
    const linkedIssues = closingReferences(pullRequest.body, owner, repo);
    if (linkedIssues.length === 0) return;

    if (pullRequest.merged) {
      for (const number of linkedIssues) await syncIssue(await getIssue(number), 'done');
      await syncOpenDependencies();
    } else if (pullRequest.state === 'closed') {
      for (const number of linkedIssues) await syncIssue(await getIssue(number));
      await syncOpenDependencies();
    } else if (pullRequest.state === 'open' && pullRequest.draft) {
      for (const number of linkedIssues) await syncIssue(await getIssue(number), 'inProgress');
    } else if (pullRequest.state === 'open') {
      for (const number of linkedIssues) await syncIssue(await getIssue(number), 'review');
    }
    return;
  }

  if (context.eventName === 'workflow_dispatch') {
    const issueNumber = Number(context.payload.inputs?.issue_number || 0);
    const requestedStatus = String(context.payload.inputs?.status || 'auto');
    const forcedStatus = {
      Backlog: 'backlog',
      Ready: 'ready',
      'In Progress': 'inProgress',
      Blocked: 'blocked',
      Review: 'review',
      Done: 'done',
      Superseded: 'superseded',
    }[requestedStatus];

    if (issueNumber > 0) {
      await syncIssue(await getIssue(issueNumber), forcedStatus || null);
    } else {
      await syncOpenDependencies();
      await reconcileTerminalProjectStatuses();
    }
    return;
  }

  if (context.eventName === 'issues') {
    const action = context.payload.action;
    const fallback = action === 'opened' || action === 'reopened' ? 'backlog' : null;
    await syncIssue(context.payload.issue, null, fallback);

    if (['closed', 'reopened', 'edited'].includes(action)) {
      await syncOpenDependencies();
    }
  }
};

module.exports.closingReferences = closingReferences;
module.exports.projectStatusForClosedReason = projectStatusForClosedReason;
module.exports.closingReasonForProjectStatus = closingReasonForProjectStatus;
