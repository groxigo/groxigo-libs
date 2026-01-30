# Publishing Guide

This guide explains how to publish packages from the `groxigo-libs` monorepo to GitHub Packages using **Changesets**.

## Overview

All `@groxigo/*` scoped packages are published to GitHub Packages using Changesets for automated version management.

- **Repository**: `groxigo/groxigo-libs`
- **Registry**: `https://npm.pkg.github.com`
- **Scope**: `@groxigo/*`
- **Version Management**: Changesets

## How Changesets Works

Changesets provides a structured way to manage versions and changelogs:

1. **Create a changeset** when you make a change
2. **Changesets accumulate** until you're ready to release
3. **Version command** consumes changesets and bumps versions
4. **Publish command** publishes updated packages

### Key Benefits

- **Automatic dependency updates**: When `@groxigo/tokens` is updated, packages depending on it (`ui-elements`, `components`) automatically get their dependency versions updated
- **Changelog generation**: Automatic CHANGELOG.md generation per package
- **Batched releases**: Multiple changes can be released together
- **Pull Request workflow**: CI creates a "Release" PR that you merge to publish

## Quick Start

### Making Changes

After making changes to any package:

```bash
# Create a changeset
npm run changeset:add
```

This will prompt you to:
1. Select which packages have changed
2. Choose version bump type (major/minor/patch)
3. Write a summary of the changes

### Example Workflow

```bash
# 1. Make your code changes
# 2. Create a changeset
npm run changeset:add

# Select: @groxigo/tokens
# Select: patch (for bug fixes) / minor (for features) / major (for breaking changes)
# Enter: "Added Poppins font as primary font family"

# 3. Commit your changes AND the changeset file
git add .
git commit -m "feat(tokens): add Poppins font family"
git push
```

### Releasing

**Option 1: Automated (Recommended)**

Push to `master` branch. GitHub Actions will:
1. Detect pending changesets
2. Create a "Version Packages" PR with all version bumps and changelog updates
3. When you merge that PR, packages are automatically published

**Option 2: Manual**

```bash
# Bump versions based on changesets
npm run version

# Build and publish all packages
npm run release
```

## Package Dependencies

Packages reference internal dependencies with semver:

```json
// packages/ui-elements/package.json
{
  "dependencies": {
    "@groxigo/tokens": "^2.0.0"
  }
}

// packages/components/package.json
{
  "dependencies": {
    "@groxigo/tokens": "^2.0.0",
    "@groxigo/ui-elements": "^1.0.1"
  }
}
```

**Important**: Changesets automatically updates these version numbers when dependent packages are released. The `updateInternalDependencies: "patch"` setting ensures that when `@groxigo/tokens` is bumped, packages depending on it also get a patch bump with updated dependency versions.

## Version Bump Types

| Type | When to Use | Example |
|------|-------------|---------|
| `patch` | Bug fixes, small changes | 2.0.0 → 2.0.1 |
| `minor` | New features (backward compatible) | 2.0.0 → 2.1.0 |
| `major` | Breaking changes | 2.0.0 → 3.0.0 |

### Automatic Dependency Updates

When you bump `@groxigo/tokens`:
- `@groxigo/ui-elements` dependency on tokens is updated
- `@groxigo/components` dependency on tokens is updated
- Both dependent packages get a patch bump automatically

## Available Scripts

```bash
# Create a new changeset
npm run changeset:add

# Check pending changesets
npm run changeset:status

# Apply version bumps (consumes changesets)
npm run version

# Build all packages and publish
npm run release

# Publish individual packages (if needed)
npm run publish:tokens
npm run publish:ui-elements
npm run publish:components
```

## GitHub Actions Workflow

The release workflow (`.github/workflows/release.yml`) runs on every push to `master`:

1. **If changesets exist**: Creates a "Version Packages" PR
2. **If Version PR is merged**: Publishes packages to GitHub Packages

### Manual Trigger

You can also manually trigger the old publish workflow from GitHub Actions if needed.

## Authentication Setup

### For GitHub Actions (CI/CD)

No setup needed! `GITHUB_TOKEN` works automatically with the correct permissions.

### For Local Publishing

1. **Create a Personal Access Token (PAT)**:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Select scopes: `read:packages`, `write:packages`, `repo`

2. **Configure `.npmrc`**:
   ```ini
   @groxigo:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

## Consuming Published Packages

In your consuming project:

1. **Create `.npmrc`**:
   ```ini
   @groxigo:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

2. **Install packages**:
   ```bash
   npm install @groxigo/tokens @groxigo/ui-elements @groxigo/components
   ```

## Troubleshooting

### "No changesets found"

Run `npm run changeset:add` to create a changeset before releasing.

### Version PR not created

Ensure:
1. You have changesets in `.changeset/` directory
2. Push is to `master` branch
3. GitHub Actions has write permissions

### Publish failed

Check:
1. Package builds successfully (`npm run build`)
2. `GITHUB_TOKEN` has `packages:write` permission
3. Package version doesn't already exist in registry

### Dependency version mismatch

If internal dependency versions are out of sync, run `npm run version` to let Changesets update them.

## Migration from Old Workflow

If you were using the old manual versioning:

1. Delete old version scripts (already done)
2. Use `npm run changeset:add` instead of manual version bumps
3. Let CI handle publishing via Version PR

## Best Practices

1. **One changeset per logical change**: Group related changes in one changeset
2. **Descriptive summaries**: These become your changelog entries
3. **Review Version PRs**: Check the changelog looks correct before merging
4. **Don't skip changesets**: Even small fixes should have changesets for tracking
5. **Use conventional commits**: Helps identify what changeset type to use

## Additional Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [GitHub Packages Documentation](https://docs.github.com/en/packages)
- [Semantic Versioning](https://semver.org/)
