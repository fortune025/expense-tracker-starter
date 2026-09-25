<#
.SYNOPSIS
    Automated deployment script for expense-tracker.
.DESCRIPTION
    Runs all tests, builds the production bundle, and pushes changes to the staging area.
.PARAMETER TargetBranch
    The remote branch representing the staging area. Defaults to "staging".
.PARAMETER CommitMessage
    Optional commit message for unstaged/uncommitted changes.
#>

param(
    [string]$TargetBranch = "staging",
    [string]$CommitMessage = "chore(deploy): build and prepare release for staging"
)

$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Starting Deployment Process" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Run Tests
Write-Host "`n[1/3] Running tests and lint checks..." -ForegroundColor Yellow
npm test
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Tests failed with exit code $LASTEXITCODE. Aborting deployment." -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "[SUCCESS] All tests passed." -ForegroundColor Green

# 2. Build Production Bundle
Write-Host "`n[2/3] Building production bundle..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Production build failed with exit code $LASTEXITCODE. Aborting deployment." -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "[SUCCESS] Production bundle built successfully." -ForegroundColor Green

# 3. Stage and Push to Staging Area
Write-Host "`n[3/3] Preparing and pushing to staging area..." -ForegroundColor Yellow
git add .
$status = git status --porcelain
if ($status) {
    Write-Host "Committing staged changes..." -ForegroundColor Yellow
    git commit -m "$CommitMessage"
} else {
    Write-Host "Working tree clean, no new commits needed." -ForegroundColor Green
}

Write-Host "Pushing to remote branch '$TargetBranch' on origin..." -ForegroundColor Yellow
git push origin "HEAD:$TargetBranch"
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n[ERROR] Failed to push to staging branch ($TargetBranch). Please check git credentials and remote." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " Deployment to staging completed successfully!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
