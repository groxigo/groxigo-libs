# GitHub Token Setup Guide

## Overview

For publishing packages to GitHub Packages, you have two options:
1. **GITHUB_TOKEN** (Automatic) - Already works in GitHub Actions, no setup needed
2. **NPM_TOKEN** (Optional) - Custom Personal Access Token for more control or local publishing

## Option 1: Using GITHUB_TOKEN (Default - Recommended)

The workflow already uses `GITHUB_TOKEN` which is automatically provided by GitHub Actions. **No additional setup needed for CI/CD.**

### How it Works

- Automatically available in GitHub Actions
- Has access to the repository where the workflow runs
- Automatically scoped with `packages: write` permission
- No secret configuration needed

### Current Workflow Configuration

The workflow uses:
```yaml
env:
  NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

This works automatically - just push your code and create a release!

---

## Option 2: Using NPM_TOKEN (Optional - For Custom Control)

If you prefer using a custom Personal Access Token (e.g., for organization-wide access or local publishing), follow these steps:

### Step 1: Create Personal Access Token

1. Go to GitHub: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
   - Direct link: https://github.com/settings/tokens

2. Click **"Generate new token (classic)"**

3. Configure the token:
   - **Note**: `groxigo-libs-npm-token` (or any descriptive name)
   - **Expiration**: Choose appropriate duration (90 days, 1 year, or no expiration)
   - **Scopes**: Check the following:
     - ✅ `read:packages` - Download packages from GitHub Packages
     - ✅ `write:packages` - Upload packages to GitHub Packages
     - ✅ `repo` - Full control of private repositories (if repository is private)

4. Click **"Generate token"**

5. **Copy the token immediately** - you won't be able to see it again!

### Step 2A: Add as GitHub Secret (For CI/CD)

1. Go to your repository: https://github.com/groxigo/groxigo-libs
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Configure:
   - **Name**: `NPM_TOKEN`
   - **Secret**: Paste your Personal Access Token
5. Click **"Add secret"**

### Step 2B: Update Workflow (Optional)

If you want the workflow to use `NPM_TOKEN` instead of `GITHUB_TOKEN`, update `.github/workflows/publish.yml`:

Change from:
```yaml
NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

To:
```yaml
NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN || secrets.GITHUB_TOKEN }}
```

This allows fallback to `GITHUB_TOKEN` if `NPM_TOKEN` is not set.

### Step 2C: Configure for Local Publishing

For publishing from your local machine:

**Option A: Add to `~/.npmrc`** (User-level - Recommended):
```bash
# Open or create ~/.npmrc
nano ~/.npmrc

# Add these lines:
@groxigo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN_HERE
```

**Option B: Use Environment Variable**:
```bash
# In your shell profile (~/.zshrc, ~/.bashrc, etc.)
export NPM_TOKEN=YOUR_PERSONAL_ACCESS_TOKEN_HERE

# Then use it:
npm publish --workspace=@groxigo/tokens
```

**Option C: Project-level `.npmrc`** (Less secure - gitignored):
```bash
# In groxigo-libs/.npmrc (already exists, add auth line)
echo "//npm.pkg.github.com/:_authToken=\${NPM_TOKEN}" >> .npmrc
```

---

## Recommended Setup

### For GitHub Actions (CI/CD):
- **Use GITHUB_TOKEN** (already configured, no setup needed)
- Or optionally add `NPM_TOKEN` secret if you need organization-wide access

### For Local Publishing:
1. Create Personal Access Token with `read:packages` and `write:packages`
2. Add to `~/.npmrc` for secure storage
3. Or use environment variable `NPM_TOKEN`

---

## Testing Your Setup

### Test Local Publishing:
```bash
cd groxigo-libs

# Build first
npm run build

# Test publish (dry run - won't actually publish)
npm publish --workspace=@groxigo/tokens --dry-run

# If dry run works, publish for real
npm run publish:tokens
```

### Test GitHub Actions:
1. Go to repository → **Actions** tab
2. Select **"Publish Packages"** workflow
3. Click **"Run workflow"**
4. Choose package and version
5. Monitor the workflow run

---

## Security Best Practices

1. **Never commit tokens to git**
   - Use GitHub Secrets for CI/CD
   - Use `~/.npmrc` for local (already in .gitignore)
   - Use environment variables when possible

2. **Use minimum required scopes**
   - Only `read:packages` and `write:packages` for publishing
   - Only add `repo` scope if needed

3. **Set token expiration**
   - Use reasonable expiration (90 days recommended)
   - Rotate tokens regularly

4. **Review token access**
   - Periodically check active tokens: https://github.com/settings/tokens
   - Revoke unused or compromised tokens

---

## Troubleshooting

### Error: 401 Unauthorized
- **Cause**: Invalid or expired token
- **Solution**: 
  - Verify token is correct
  - Check token has `write:packages` scope
  - Regenerate token if expired

### Error: 403 Forbidden
- **Cause**: Insufficient permissions
- **Solution**: 
  - Ensure token has `write:packages` scope
  - Check repository access permissions
  - For organizations, verify organization package permissions

### Error: Package already exists
- **Cause**: Version already published
- **Solution**: 
  - Bump version using `npm run version:patch`
  - Or use a new version number

---

## Quick Reference

**Create Token**: https://github.com/settings/tokens
**Add GitHub Secret**: Repository → Settings → Secrets and variables → Actions
**Local .npmrc**: `~/.npmrc`
**Test Publish**: `npm publish --workspace=@groxigo/tokens --dry-run`

