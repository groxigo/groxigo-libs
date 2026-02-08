# Deploy @groxigo/libs packages

Create changesets, version-bump, and push to trigger the Release workflow.

## Step 1: Detect changed packages

Run `git diff HEAD~1 --name-only` (or the appropriate range) to identify which packages have changed since the last release. Map changed paths to package names:

| Path prefix | Package |
|---|---|
| `packages/tokens/` | `@groxigo/tokens` |
| `packages/contracts/` | `@groxigo/contracts` |
| `packages/api-types/` | `@groxigo/api-types` |
| `packages/ui-core/` | `@groxigo/ui-core` |
| `packages/ui-elements/` | `@groxigo/ui-elements` |
| `packages/ui-elements-web/` | `@groxigo/ui-elements-web` |
| `packages/components/` | `@groxigo/components` |
| `packages/components-web/` | `@groxigo/components-web` |
| `packages/icons/` | `@groxigo/icons` |
| `packages/sdui/` | `@groxigo/sdui` |

Also include **downstream dependents** that need a patch bump when a foundation package changes:

| Changed Package | Also Bump (patch) |
|---|---|
| `tokens` | ui-core, ui-elements, ui-elements-web, components, components-web |
| `contracts` | ui-elements, ui-elements-web, components, components-web |
| `ui-core` | ui-elements, ui-elements-web |
| `ui-elements` | components |
| `ui-elements-web` | components-web |

## Step 2: Build & test

```bash
cd /Users/pavanikondapalli/projects/groxigo/groxigo-libs
bun run build
bun run test
```

If build or tests fail, stop and report the errors. Do NOT proceed with deployment.

## Step 3: Determine bump type

Ask the user which bump type to use if not already specified:

- **patch** — bug fixes, token value changes, small adjustments
- **minor** — new features, new tokens, new components (non-breaking)
- **major** — breaking changes (renamed exports, removed tokens, API changes)

Default to **patch** for sync/fix commits.

## Step 4: Create changeset

Create a changeset file manually in `.changeset/` with the correct format:

```bash
# Generate a random name for the changeset file
CHANGESET_NAME=$(openssl rand -hex 4)
```

Write the changeset file at `.changeset/${CHANGESET_NAME}.md` with this format:

```markdown
---
"@groxigo/package-name": patch
"@groxigo/dependent-package": patch
---

Description of what changed.
```

Include ALL affected packages (direct changes + dependents) in the frontmatter.

## Step 5: Commit the changeset

```bash
git add .changeset/
git commit -m "chore: add changeset for [brief description]"
```

## Step 6: Push to main

```bash
git push origin main
```

This triggers the **Release** workflow (`.github/workflows/release.yml`) which will:
1. Detect the pending changeset
2. Create a "Version Packages" PR that bumps versions in package.json files
3. The **PR Review** workflow (`.github/workflows/pr-review.yml`) automatically runs Claude Code to review the PR
4. After successful review, "Version Packages" PRs are auto-merged
5. The merge triggers Release again, which publishes packages to GitHub Packages

## Step 7: Monitor the workflows

```bash
# Wait a few seconds for the workflows to start
sleep 5

# Check Release workflow
gh run list --repo groxigo/groxigo-libs --workflow "Release" --limit 1

# Check PR Review workflow (runs on the Version Packages PR)
gh run list --repo groxigo/groxigo-libs --workflow "PR Review" --limit 1

# Watch a specific run (get the run ID from above)
gh run watch <RUN_ID> --repo groxigo/groxigo-libs
```

Report the workflow status to the user. If it fails, fetch logs:

```bash
gh run view <RUN_ID> --repo groxigo/groxigo-libs --log 2>&1 | tail -50
```

## Step 8: Verify the Version PR

The full flow is automated:
1. **Release** workflow creates "chore: version packages" PR
2. **PR Review** workflow runs Claude Code review on it
3. After review passes, the PR is auto-approved and auto-merged
4. The merge triggers **Release** again → publishes packages

If auto-merge fails (e.g., review found issues), report to the user and offer to merge manually:

```bash
gh pr merge --squash --repo groxigo/groxigo-libs
```

## Emergency: Manual Publish

If the Release workflow is broken or you need to publish immediately:

```bash
gh workflow run "Manual Publish" --repo groxigo/groxigo-libs --field confirm=PUBLISH
```

This bypasses the changeset PR flow and publishes packages at their current versions.
