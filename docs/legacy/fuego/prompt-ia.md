Document Control
Version: v2.1.0
Status: active
Last updated (UTC): 2026-02-15
Owner: Engineering / AI Delivery Governance
Source of truth: This playbook is the authoritative process source for issue-driven work in this repository.

Purpose
This guide defines a standard, auditable process for AI agents resolving repository issues.

Core principle: Think first, then implement. Always prefer proven patterns and validated solutions over ad-hoc approaches.

This explicitly means: no "quick-and-dirty" fixes to unblock, and no trial-and-error coding without prior technical reasoning.

Golden Rule: GitHub-First, Markdown-Only, Three Environments
📌 Everything lives in GitHub, all communication is Markdown, all changes flow through three environments

Every decision, analysis, and validation MUST be in GitHub issues/PRs

Every human-readable output MUST be valid GitHub Flavored Markdown

Every log/evidence MUST be linked from GitHub Actions, never pasted raw

Every document MUST render correctly in GitHub before merging

Every change MUST pass through Development → Staging → Production

Scope
Applies to all issue-driven work (code, docs, tests, CI, operations docs)

Applies whether the issue exists or must be created for traceability

Working language: English for all deliverables (code comments, docs, issue/PR text, status updates)

Intelligent Workflow
Phase 0: Intelligent Triage (Pre-flight)
Before executing the full process, perform a quick classification to determine the appropriate depth:

typescript
type IssueDepth = "express" | "standard" | "full";

function classifyIssueDepth(issue): IssueDepth {
  const isLowRisk = 
    issue.labels.includes('docs') || 
    issue.labels.includes('formatting') || 
    issue.labels.includes('typo') ||
    issue.body.includes('#risk:low');
    
  const isHighRisk = 
    issue.labels.includes('core-contract') || 
    issue.labels.includes('auth') || 
    issue.labels.includes('migration') ||
    issue.body.includes('lifecycle') ||
    issue.body.includes('state-machine');
    
  if (isLowRisk) return "express";
  if (isHighRisk) return "full";
  return "standard";
}
Depth definitions:

Express: Docs-only, formatting, typos, non-behavioral refactors

Standard: Behavior changes behind existing contracts, utility updates

Full: Cross-cutting changes, core contracts, auth policies, lifecycle changes

Phase 1: Unified Analysis (Think-First + Brief)
For Standard and Full depth, create a single combined analysis. For Express depth, create a minimal 3-line version.

Template A — Unified Pre-implementation Analysis
markdown
## Pre-implementation Analysis

### Quick Summary
- **Problem:** (one-line summary)
- **Selected approach:** (what and why briefly)
- **Files touched:** (paths)

### Detailed Analysis (expand only as needed)

#### Options Considered
- A: [option] → [pros/cons]
- B: [option] → [pros/cons]
- **Selected:** [option] because [rationale]

#### What Will Change
- [ ] File 1: [specific change]
- [ ] File 2: [specific change]

#### Risks & Mitigation
| Risk | Impact | Mitigation |
|------|--------|------------|
| [risk] | [high/med/low] | [action] |

#### Validation Plan by Environment
| Environment | Test Type | Expected Outcome |
|-------------|-----------|------------------|
| Development | Unit tests | All passing |
| Staging | Integration/E2E | CI green |
| Production | Smoke test | Metrics stable |

#### Log Location & Format
- **Primary log storage:** GitHub (Actions logs, issue comments, PR conversations)
- **All human-readable output MUST be in Markdown (.md) format**
- **Never paste raw log dumps** - use:
  - Links to GitHub Action runs
  - Collapsible sections with key excerpts
  - Screenshots for UI changes (uploaded to issue)

#### Decision Needed? 
[Only if truly ambiguous - otherwise proceed]
Phase 2: Research & Pattern Matching
Check repository memory first

Review closed issues with similar patterns

Check decision logs in past PRs

Verify if this exact problem was solved before

Prioritize official sources

Project-internal docs

Official library documentation (matching pinned versions)

Maintainer guidance in comments

Stop only if:

Documentation is missing AND pattern is ambiguous

Multiple equally-valid approaches exist with no project precedent

Change touches business rules without clear precedent

Phase 3: Implementation & Branching
Branch Naming (MANDATORY)
All branches MUST include the issue number for traceability:

text
<type>/<issue-number>-<short-description>
Examples:

fix/123-button-color

feat/456-user-auth

docs/789-readme-update

refactor/234-core-utils

Type prefixes: fix/feat/docs/refactor/test/chore

Branch-to-Environment Mapping
Branch Pattern	Environment	Purpose
feature/123-*	Development	Local work
PR-123 (via PR)	Staging	Integration testing
main	Staging (latest)	Stable branch
release/v*	Staging (pre-prod)	Release validation
v* (tag)	Production	Live code
Implementation Principles
Keep changes focused on acceptance criteria

Avoid unrelated refactors in the same branch

Preserve backward compatibility unless explicitly requested

Commit atomically: implementation, tests, docs in separate commits

Phase 4: Smart Validation by Environment
Run the smallest relevant checks first for the current environment:

Development Environment
bash
# For leaf package changes
npm run lint:affected && npm run test:affected

# For shared/core changes
npm run lint && npm test

# For docs-only
npm run docs:lint
Staging Environment (via PR)
CI runs automatically on PR creation

Auto-deploy to staging environment

Run integration/E2E tests against staging

Performance baseline checks (for Medium/High risk)

Security scans (for auth/data changes)

Production Environment
Deploy with appropriate strategy (see Environment Strategy section)

Run smoke tests on critical paths

Monitor error rates for 15 minutes minimum

Verify business metrics (if applicable)

Validation Evidence Format (MANDATORY)
All validation evidence MUST be stored in GitHub and formatted in Markdown:

✅ Correct format:

markdown
## Validation Results

### Test Run
- **Command:** `npm test src/auth.test.ts`
- **Result:** ✅ All 12 tests passed
- **Environment:** Development
- **Evidence:** [GitHub Action Run #123](https://github.com/.../actions/runs/123)
- **Key excerpt:** 
  ```bash
  PASS src/auth.test.ts
  PASS src/user.test.ts  
  Test Suites: 2 passed, 2 total
Staging Deployment
URL: https://staging-123.app.example.com

E2E Results: ✅ All flows pass (see E2E Run #456)

Screenshot: https://github.com/.../assets/screenshot.png

Production Smoke Test
Deployment: v1.2.3 deployment

Post-deploy check: Login flow works ✅

Error rates: Baseline (0.02% vs normal 0.03%) ✅

Dashboard: [link to monitoring dashboard]

text

❌ **Incorrect format:**
- Plain text without markdown
- Raw log dumps > 50 lines
- "Trust me, it works" without evidence
- Local file paths (`/Users/name/logs.txt`)
- Missing environment context

---

### Phase 5: Pull Request

#### PR Requirements
- **Branch name includes issue number** (already done above)
- Conventional commit title: `type(scope): description (#issue)`
- Description: minimum 50 chars, clearly stating WHAT/FOR/HOW
- Max lines: **< 1000** (split if exceeded - see below)
- Risk note included for non-trivial changes
- Rollback note for reversible changes
- Environment validation summary

#### PR Split Strategy (when >1000 lines)

```typescript
function splitPR(files: string[]): PR[] {
  if (hasContractChanges(files) && hasImplementation(files)) {
    return [
      { name: "PR 1: Contract definitions only", files: contractFiles },
      { name: "PR 2: Implementation", files: implFiles }
    ];
  }
  
  if (hasCodeChanges(files) && hasNewTests(files)) {
    return [
      { name: "PR 1: Source code", files: srcFiles },
      { name: "PR 2: Tests", files: testFiles }
    ];
  }
  
  // Default: package-based split
  return splitByPackage(files);
}
PR Description Template
markdown
## WHAT
[summary of changes]

## FOR
[why this change is needed]

## HOW
[implementation approach]

## Environment Validation
- [x] Development: Unit tests passing
- [x] Staging: CI green, deployed to [URL]
- [ ] Production: (pending)

## Risk: [Low/Medium/High]
[Mitigation notes]

## Rollback Plan
**If failure detected:**
1. [rollback step 1]
2. [rollback step 2]
**Estimated time:** < X minutes

Closes #123
GitHub-Specific Requirements
Since all work lives in GitHub:

Issue comments = Primary audit trail

All analysis, decisions, and validation MUST be in issue comments

Use Markdown formatting for readability

Link to specific PRs, commits, and Action runs

PR descriptions = Entry point for review

MUST render properly in GitHub (no broken markdown)

MUST include links to validation evidence in issues/Actions

SHOULD use GitHub flavored markdown (task lists, tables, alerts)

Action logs = Permanent record

Do not delete old Action runs

When linking logs, use permalinks to specific lines when possible

Archive important logs as artifacts if needed beyond retention

Phase 6: Intelligent Close
Template B — Final Close Summary (Human-Friendly)
markdown
## Issue Close Summary

### What Changed
- [Change 1] (file link)
- [Change 2] (file link)

### Environment Journey
| Environment | Status | Evidence |
|-------------|--------|----------|
| Development | ✅ | [test run link] |
| Staging | ✅ | [deployment URL + E2E results] |
| Production | ✅ | [deployment link + smoke test] |

### Does It Work?
✅ Acceptance criteria verified:
- AC1: [evidence summary]
- AC2: [evidence summary]

### Any Follow-up?
- [ ] Nothing - complete
- [ ] Created #followup-issue for [reason]

### For Humans (30-second summary)
[One paragraph explaining what happened in plain English]

Closes #123
Environment Strategy: Three-Tier Validation
All changes MUST pass through three environments before reaching production. The depth of validation in each environment depends on the change risk level.

Environment Definitions
Environment	Purpose	Access	Data
Development (Dev)	Local testing, initial validation	AI agent, developers	Isolated, mock data
Staging/PR	Integration testing, review	Maintainers, CI	Sanitized copy of production
Production (Prod)	Live environment	End users	Real data
Mandatory Environment Flow
graph LR
    A[Code Change] --> B[Development]
    B --> C{Change Type}
    C -->|Low Risk| D[Staging/PR]
    C -->|Medium/High Risk| E[Staging + Full Validation]
    D --> F{Approved?}
    E --> F
    F -->|Yes| G[Production]
    F -->|No| A
Validation Requirements by Environment
1. Development Environment
Purpose: Verify the change works in isolation

Must include:

Unit tests passing (all new + affected)

Linting/formatting checks

Type checking (TypeScript/Flow)

Local build succeeds

Manual smoke test in dev environment

Evidence: Issue comment with test output summaries + links

2. Staging / PR Environment
Purpose: Validate integration with real dependencies

For ALL changes (mandatory):

PR opened against main branch

CI passes (lint, test, build)

Deployed to staging environment automatically

Integration tests pass against staging

At least one maintainer review (for Medium/High risk)

Additional for Medium/High risk:

E2E tests pass (full user flows)

Performance baseline check (no regression >5%)

Security scan (if touching auth/data)

Database migration tested with rollback

Load test (if affecting critical path)

Evidence:

CI run links in PR

Staging deployment URL

Test reports as artifacts

Reviewer approval comments

3. Production Environment
Purpose: Deliver change to users safely

Deployment strategies by risk:

Risk Level	Deployment Strategy	Rollback Time
Low (docs, formatting)	Direct deploy	Immediate (no rollback needed)
Medium (behavior change)	Feature flag OR gradual rollout	< 15 minutes
High (core contracts, auth)	Canary deployment + monitoring	< 5 minutes
Pre-production checks:

All staging validation passed

Approval from code owner (for Medium/High)

Runbook updated (if operational impact)

Monitoring alerts configured

Communication sent (if user-facing change)

Post-deployment validation:

Smoke test in production (critical path)

Monitor error rates for 15 minutes

Check business metrics (if applicable)

Verify logs are flowing correctly

Evidence:

Deployment log link

Production smoke test results

Monitoring dashboard screenshot (pre/post)

Rollback Strategy by Environment
Environment	Rollback Method	Success Criteria
Development	git reset --hard + rebuild	Clean local state
Staging	Revert PR + redeploy	Tests pass again
Production (Low risk)	Revert PR + redeploy	< 30 minutes downtime
Production (Medium risk)	Feature flag off OR git revert	< 15 minutes
Production (High risk)	Immediate canary rollback + git revert	< 5 minutes
Rollback note template for PR:

markdown
## Rollback Plan

**If failure detected:**
1. Run `git revert <commit-hash>` (if flag not available)
2. Or disable feature flag `FEATURE_X=false`
3. Monitor error rates for 5 minutes
4. Create follow-up issue for root cause

**Estimated time to rollback:** < 15 minutes
**Success metric:** Error rates return to baseline
Testing Pyramid by Environment

    subgraph Production
        SM[Smoke Tests<br/>Critical paths only]
    end
    
    subgraph Staging
        E2E[E2E Tests<br/>Full user flows]
        INT[Integration Tests<br/>API/Service boundaries]
        PERF[Performance Tests<br/>Load & baseline]
    end
    
    subgraph Development
        UNIT[Unit Tests<br/>80%+ coverage]
        COMP[Component Tests<br/>UI/Logic in isolation]
        LINT[Lint/Type Checks]
    end
    
    UNIT --> INT
    COMP --> E2E
    LINT --> PERF
    INT --> SM
    E2E --> SM
Quality Gates by Depth
Express Depth (must pass)
Change matches scope (docs/format only)

No behavioral changes

Development validation passed (lint/docs check)

Branch name includes issue #

Standard Depth (must pass)
Unified analysis documented

Acceptance criteria mapped to changes

Tests updated/added

Development validation passed

Staging validation passed (CI + deployment)

PR < 1000 lines

Branch name includes issue #

Evidence in GitHub Markdown format

Full Depth (must pass)
All Standard gates

Risk assessment documented

Business rule confirmation (if ambiguous) - but only if truly ambiguous

Negative-path tests added

Performance baseline checked

Security scan passed (if applicable)

Rollback strategy documented

Production smoke test passed

Decision log included (why this approach, alternatives rejected)

Risk Classification Guide
Level	Definition	Process Depth
Low	Docs-only, formatting, non-behavioral refactor in leaf package	Express
Medium	Behavior change behind existing contract, touches shared utilities	Standard
High	Cross-cutting change, core contracts, auth, lifecycle, state machines	Full
Business Rules: When to Ask vs. When to Proceed

    A[Change touches business rule?] -->|No| B[Proceed independently]
    A -->|Yes| C{Is behavior clearly defined<br>in existing code/docs?}
    C -->|Yes, crystal clear| B
    C -->|Ambiguous or missing| D[STOP - Ask maintainer]
    C -->|Multiple interpretations| D
Business-rule-sensitive by default:

Lifecycle transitions (RunStatus/StepStatus)

Authorization/RBAC policy

Rate limits, retention/deletion rules

Adapter fallback behavior

Persisted state shape/meaning

But: If the repository already implements these patterns consistently, follow the pattern. Only ask when the pattern is missing or contradictory.

GitHub Workflow Integration
Where Things Live
Artifact	Location	Format	Retention
Decision records	Issue comments OR /docs/decisions/*.md	Markdown	Permanent
Validation evidence	Issue comments + GitHub Action logs	Markdown + Raw logs	Action logs: 90 days
Environment evidence	Issue/PR comments + deployment logs	Markdown + links	Permanent (summary)
Change history	This playbook + CHANGELOG.md	Markdown	Permanent
Technical docs	/docs/*.md	Markdown	Permanent
Runbooks	/runbooks/*.md	Markdown	Permanent
Deployment records	GitHub Deployments + Actions	Metadata + logs	Permanent
Markdown Requirements
All GitHub-facing content MUST:

Use .md file extension for docs

Render correctly in GitHub (preview before finalizing)

Use GitHub Flavored Markdown features appropriately:

- [x] for task lists

| tables | for | data |

```language for code blocks with syntax highlighting

> [!NOTE] for callouts (GitHub alerts)

# headers for structure

![alt](url) for images (uploaded to GitHub, not external)

Relative links to other .md files within the repo

Anti-Patterns in GitHub
❌ Posting screenshots of text (post the text as code block)

❌ Linking to Google Docs or external wikis (keep it in GitHub)

❌ Using escaped \n in visible text (use real line breaks)

❌ Editing issue titles after closure (creates broken references)

❌ Deleting branches before PR is merged (loses context)

❌ Pasting raw logs > 50 lines (use links or collapsible sections)

❌ Mixing environment evidence without labeling which environment

Automation & Tooling
CI Enforcement
PR size check (<1000 lines) in .github/workflows/pr-quality-gate.yml

Branch naming convention check (^[a-z]+/[0-9]+-.*$)

Template completeness check for Full depth issues

Conventional commit validation

Environment deployment status checks

Smoke test automation for production

Local Development Hooks
bash
# .husky/pre-commit
npm run lint:staged

# .husky/pre-push
npm run validate:branch-name
npm run test:affected
Anti-Patterns to Avoid
❌ Following the process literally instead of intelligently

❌ Writing separate analysis docs when one unified doc suffices

❌ Asking questions when the answer is already in the repository

❌ Pasting massive log dumps instead of summarizing evidence

❌ Creating branches without issue numbers

❌ Treating all issues identically regardless of risk

❌ Waiting for permission on purely technical decisions

❌ Skipping staging validation ("it works on my machine")

❌ Deploying directly to production without staging

❌ No rollback plan for reversible changes

❌ Splitting PRs arbitrarily instead of by logical boundaries

❌ Mixing environment evidence without clear labels

Decision Log Standard
For non-trivial trade-offs, include a compact decision record:

markdown
## Decision: [Title]

**Context:** [what prompted the decision]
**Decision:** [what was chosen]
**Rationale:** [why this over alternatives]
**Alternatives rejected:** [and why]
**Environment validated:** [dev/staging/prod]
**Date:** YYYY-MM-DD
**Issue:** #123
Store these in:

Issue comments for traceability, OR

/docs/decisions/ if the decision has long-term architectural impact

Suggested Quality Standards (Adopt as Baseline)
Standard	Description	Enforced In
Risk-first	Every non-trivial change includes risk briefing	Full depth
Traceability	Every AC maps to code change + validation	Standard+
Contract safety	API changes include compatibility note	Full depth
Three environments	Change validated in dev → staging → prod	All depths
Negative-path test	At least one failure test for behavior changes	Full depth
Observability	Execution flow changes define expected logs	Full depth
Documentation freshness	Update docs in same PR if behavior changes	Standard+
Small diff	Prefer focused, reviewable diffs	All depths
Markdown compliance	All GitHub content valid Markdown	All depths
Change History
Date (UTC)	Version	Change	Author
2026-02-15	v2.1.0	Added three-environment strategy, GitHub-first rule, Markdown requirements, environment evidence standards	AI assistant
2026-02-15	v2.0.0	Complete rewrite with intelligent triage, unified analysis, branch naming, depth-based gates	AI assistant
2026-02-14	v1.6.2	Added mandatory PR description length and max lines	AI assistant
2026-02-14	v1.0.0	Initial baseline playbook	AI assistant
