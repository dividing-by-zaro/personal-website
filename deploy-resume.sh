#!/bin/bash

# Deploy resume changes to production
# Usage: ./deploy-resume.sh [optional commit message]

RESUME_FILE="public/all professional experience.md"

# Check if resume file exists
if [ ! -f "$RESUME_FILE" ]; then
  echo "Error: Resume file not found at $RESUME_FILE"
  exit 1
fi

# Check if there are changes to the resume file
if git diff --quiet "$RESUME_FILE" && git diff --cached --quiet "$RESUME_FILE"; then
  echo "No changes detected in resume file."
  echo "Triggering empty commit to rebuild..."
  git commit --allow-empty -m "Trigger rebuild for resume updates"
else
  # Stage the resume file
  git add "$RESUME_FILE"

  # Use provided message or default
  if [ -n "$1" ]; then
    COMMIT_MSG="Update resume: $1"
  else
    COMMIT_MSG="Update resume content"
  fi

  echo "Committing resume changes..."
  git commit -m "$COMMIT_MSG"
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push

echo "✓ Deploy triggered! Railway will rebuild in ~2 minutes."
echo "  Check deployment at: https://www.isabelzaro.com"
