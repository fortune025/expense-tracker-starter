#!/usr/bin/env bash
set -e

TARGET_BRANCH="${1:-staging}"
COMMIT_MSG="${2:-chore(deploy): build and prepare release for staging}"

echo "========================================="
echo " Starting Deployment Process"
echo "========================================="

# 1. Run Tests
echo ""
echo "[1/3] Running tests and lint checks..."
npm test
echo "[SUCCESS] All tests passed."

# 2. Build Production Bundle
echo ""
echo "[2/3] Building production bundle..."
npm run build
echo "[SUCCESS] Production bundle built successfully."

# 3. Stage and Push to Staging Area
echo ""
echo "[3/3] Preparing and pushing to staging area..."
git add .
if ! git diff-index --quiet HEAD --; then
  echo "Committing staged changes..."
  git commit -m "$COMMIT_MSG"
else
  echo "Working tree clean, no new commits needed."
fi

echo "Pushing to remote branch '$TARGET_BRANCH' on origin..."
git push origin "HEAD:$TARGET_BRANCH"

echo ""
echo "========================================="
echo " Deployment to staging completed successfully!"
echo "========================================="
