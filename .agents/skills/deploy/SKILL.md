---
name: deploy
description: >-
  Executes the project deployment procedure. Use this skill whenever the user
  asks to deploy the application, run pre-deployment checks, build production assets,
  or push changes to the staging area or staging environment.
---

# Deploy Workflow

This skill guides the automated deployment process for the application. When triggered, it enforces running all tests, building the production bundle, and pushing changes to the staging area.

---

## Deployment Steps

Follow these steps in strict sequential order. If any step fails, abort the deployment immediately and report the error.

### Step 1: Run All Tests
Verify that the codebase passes all test suites and linting checks:

```bash
npm test
```

- **Validation**: Ensure the command exits with code `0`.
- **Failure Policy**: If tests fail, **HALT** immediately. Do not attempt to build or deploy broken code.

### Step 2: Build Production Bundle
Generate the optimized production distribution build:

```bash
npm run build
```

- **Validation**: Ensure Vite builds without errors and outputs bundle files to the `dist/` directory.
- **Checks**: Verify chunk sizes and asset paths. If the build fails, abort the deployment.

### Step 3: Push to Staging Area
Prepare and push changes to the staging area:

1. **Stage Changes in Git Index**:
   ```bash
   git status
   git add .
   ```

2. **Commit Staged Changes** (if there are uncommitted modifications):
   ```bash
   git commit -m "chore(deploy): build and prepare release for staging"
   ```

3. **Push to Staging Remote Branch**:
   Push the current commit to the `staging` branch on `origin`:
   ```bash
   git push origin HEAD:staging
   ```
   *(Alternatively, if working directly on a local staging branch: `git push origin staging`)*

### Step 4: Verification
Confirm deployment success:
- Verify git status: `git status`
- Verify that the remote ref `origin/staging` has been updated with the latest commit.
- Provide a summary of the test results, build outputs, and deployment status.

---

## Executable Helper Scripts

For convenience, automated deployment scripts are available:
- **Windows (PowerShell)**: [deploy.ps1](./scripts/deploy.ps1)
  ```powershell
  powershell -ExecutionPolicy Bypass -File .agents/skills/deploy/scripts/deploy.ps1
  ```
- **macOS / Linux (Bash)**: [deploy.sh](./scripts/deploy.sh)
  ```bash
  ./.agents/skills/deploy/scripts/deploy.sh
  ```
