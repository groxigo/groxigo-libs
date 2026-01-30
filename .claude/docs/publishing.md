# Publishing Guide

How to publish packages to GitHub Packages registry.

---

## Quick Start (3 Steps)

```bash
# 1. Create changeset (describes what changed)
npx changeset add

# 2. Commit and push
git add . && git commit -m "chore: add changeset"
git push origin master

# 3. Merge the "Version Packages" PR that GitHub creates
#    → Packages are published automatically!
```

---

## How It Works

### The Release Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  You push code with a changeset to master                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  GitHub Actions creates a "Version Packages" PR             │
│  - Bumps package versions                                   │
│  - Updates CHANGELOG.md files                               │
│  - Shows what will be released                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  You review and merge the PR                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  GitHub Actions publishes to GitHub Packages                │
│  - Creates GitHub releases                                  │
│  - Packages available via npm install                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Creating a Changeset

```bash
npx changeset add
```

This interactive prompt asks:

1. **Which packages changed?** (use space to select)
2. **What type of bump?** (major/minor/patch)
3. **Summary** (appears in CHANGELOG.md)

### Example Changeset File

Created in `.changeset/happy-dogs-dance.md`:

```markdown
---
"@groxigo/tokens": minor
"@groxigo/ui-elements": patch
---

Added new color tokens for status indicators
```

---

## Semantic Versioning

| Bump | When | Example |
|------|------|---------|
| **patch** | Bug fixes, small changes | `1.0.0` → `1.0.1` |
| **minor** | New features (backward compatible) | `1.0.0` → `1.1.0` |
| **major** | Breaking changes | `1.0.0` → `2.0.0` |

### Linked Packages

These packages always share the same version:

- `@groxigo/ui-elements` ↔ `@groxigo/ui-elements-web`
- `@groxigo/components` ↔ `@groxigo/components-web`

Bumping one automatically bumps the other.

---

## GitHub Workflows

### CI Workflow (`.github/workflows/ci.yml`)

Runs on every PR and push to master:
- Builds all packages
- Runs tests
- Runs linting

If this fails, the Release workflow won't run.

### Release Workflow (`.github/workflows/release.yml`)

Runs on push to master:
- Builds and tests
- Creates "Version Packages" PR (if changesets exist)
- Publishes packages (if versions were bumped)

---

## Local Development Setup

### Prerequisites

1. **GitHub Token** with `read:packages` and `write:packages` scopes
   - Create at: https://github.com/settings/tokens

2. **Configure npm** (`~/.npmrc`):
   ```
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   @groxigo:registry=https://npm.pkg.github.com
   ```

3. **Authenticate**:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   ```

---

## Manual Publishing (Emergency)

If you need to publish without GitHub Actions:

```bash
# 1. Build all packages
npm run build

# 2. Run tests
npm run test

# 3. Version (if changesets exist)
npx changeset version

# 4. Publish
npx changeset publish
```

Or trigger manually:
1. Go to **Actions** → **Release**
2. Click **Run workflow**

---

## Consuming Private Packages

In projects that use these packages:

### 1. Configure `.npmrc`

```
@groxigo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Install

```bash
npm install @groxigo/tokens @groxigo/ui-elements
```

### 3. For CI/CD

Add `GITHUB_TOKEN` or `NPM_TOKEN` secret with `read:packages` scope.

---

## Troubleshooting

### "Version Packages PR not created"

- Check that changesets exist in `.changeset/` (not just `config.json`)
- Run `npx changeset status` to see pending changes

### "403 Forbidden" on publish

- Token needs `write:packages` scope
- Package name must match GitHub org/user

### "401 Unauthorized"

```bash
npm logout --registry=https://npm.pkg.github.com
npm login --registry=https://npm.pkg.github.com
```

### Build failed in CI

- Check the Actions tab for error details
- Run `npm run build` locally to reproduce
- Ensure all packages compile without errors

---

## Package Configuration

Each package needs in `package.json`:

```json
{
  "name": "@groxigo/package-name",
  "version": "1.0.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/groxigo/groxigo-libs.git",
    "directory": "packages/package-name"
  }
}
```

---

## Release Checklist

- [ ] Create changeset with `npx changeset add`
- [ ] Commit: `git commit -m "chore: add changeset"`
- [ ] Push to master
- [ ] Wait for "Version Packages" PR
- [ ] Review version bumps and changelogs
- [ ] Merge the PR
- [ ] Verify packages published in Actions tab
