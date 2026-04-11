Document Control
Version: v2.0.0
Status: active
Last updated (UTC): 2026-02-15
Owner: Engineering / AI Delivery Governance
Source of truth: This playbook is the authoritative process source for issue-driven work in this repository.

Purpose
This guide defines a standard, auditable process for AI agents resolving repository issues.

Core principle: Think first, then implement. Always prefer proven patterns and validated solutions over ad-hoc approaches.

This explicitly means: no "quick-and-dirty" fixes to unblock, and no trial-and-error coding without prior technical reasoning.

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

#### Validation Plan
- [ ] Unit tests
- [ ] Integration check
- [ ] Manual verification

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

Implementation Principles
Keep changes focused on acceptance criteria

Avoid unrelated refactors in the same branch

Preserve backward compatibility unless explicitly requested

Commit atomically: implementation, tests, docs in separate commits

Phase 4: Smart Validation
Run the smallest relevant checks first, then expand only if necessary:

bash
# For leaf package changes
npm run lint:affected && npm run test:affected

# For shared/core changes
npm run lint && npm test

# For docs-only
npm run docs:lint
Validation evidence format:

✅ Command: npm test src/button.test.ts

✅ Result: All 5 tests passed (see [link to CI run])

❌ Do NOT paste full log dumps - summarize and link

Phase 5: Pull Request
PR Requirements
Branch name includes issue number (already done above)

Conventional commit title: type(scope): description (#issue)

Description: minimum 50 chars, clearly stating WHAT/FOR/HOW

Max lines: < 1000 (split if exceeded - see below)

Risk note included for non-trivial changes

Rollback note for reversible changes

PR Split Strategy (when >1000 lines)
typescript
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

## Risk: [Low/Medium/High]
[Mitigation notes]

## Rollback
[revert strategy if applicable]

Closes #123
Phase 6: Intelligent Close
Template B — Final Close Summary (Human-Friendly)
markdown
## Issue Close Summary

### What Changed
- [Change 1] (file link)
- [Change 2] (file link)

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
Quality Gates by Depth
Express Depth (must pass)
Change matches scope (docs/format only)

No behavioral changes

Validation passed (lint/docs check)

Standard Depth (must pass)
Unified analysis documented

Acceptance criteria mapped to changes

Tests updated/added

Validation evidence provided

PR < 1000 lines

Branch name includes issue #

Full Depth (must pass)
All Standard gates

Risk assessment documented

Business rule confirmation (if ambiguous) - but only if truly ambiguous

Negative-path tests added

Rollback strategy documented

Decision log included (why this approach, alternatives rejected)

Risk Classification Guide
Level	Definition	Process Depth
Low	Docs-only, formatting, non-behavioral refactor in leaf package	Express
Medium	Behavior change behind existing contract, touches shared utilities	Standard
High	Cross-cutting change, core contracts, auth, lifecycle, state machines	Full
Business Rules: When to Ask vs. When to Proceed
graph TD
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

Automation & Tooling
CI Enforcement
PR size check (<1000 lines) in .github/workflows/pr-quality-gate.yml

Branch naming convention check (^[a-z]+/[0-9]+-.*$)

Template completeness check for Full depth issues

Conventional commit validation

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

❌ Splitting PRs arbitrarily instead of by logical boundaries

Decision Log Standard
For non-trivial trade-offs, include a compact decision record:

markdown
## Decision: [Title]

**Context:** [what prompted the decision]
**Decision:** [what was chosen]
**Rationale:** [why this over alternatives]
**Alternatives rejected:** [and why]
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
Negative-path test	At least one failure test for behavior changes	Full depth
Observability	Execution flow changes define expected logs	Full depth
Documentation freshness	Update docs in same PR if behavior changes	Standard+
Small diff	Prefer focused, reviewable diffs	All depths
Change History
Date (UTC)	Version	Change	Author
2026-02-15	v2.0.0	Complete rewrite with intelligent triage, unified analysis, branch naming, depth-based gates, and reduced friction	AI assistant
2026-02-14	v1.6.2	Added mandatory PR description length and max lines	AI assistant
2026-02-14	v1.6.1	Added Markdown rendering rule	AI assistant
2026-02-14	v1.6.0	Added Suitability, Blockers, Opportunities sections	AI assistant
2026-02-14	v1.0.0	Initial baseline playbook	AI assistant