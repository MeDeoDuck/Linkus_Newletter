#!/bin/bash
# Final deployment script for Vercel
# This script will commit all changes and push to GitHub

cd "$(dirname "$0")" || exit 1

echo "=========================================="
echo "DEPLOYING TO VERCEL"
echo "=========================================="
echo ""

# Step 1: Check git status
echo "Step 1: Checking git status..."
git status --short
echo ""

# Step 2: Add all changes
echo "Step 2: Staging all changes..."
git add .
echo "✓ Changes staged"
echo ""

# Step 3: Commit
echo "Step 3: Creating commit..."
git commit -m "Restructure: Move files to Next.js App Router format for Vercel deployment

- Move API routes to app/api/newsletters/
- Move pages to app/write/ and app/newsletters/[id]/
- Move components to app/components/
- Move database to app/lib/
- Update all imports to use correct paths
- Configure tsconfig.json path aliases
- Ready for Vercel auto-deployment"

echo ""

# Step 4: Push to GitHub
echo "Step 4: Pushing to GitHub..."
git push origin main

echo ""
echo "=========================================="
echo "✓ DEPLOYMENT COMPLETE"
echo "=========================================="
echo ""
echo "Your changes have been pushed to GitHub."
echo "Vercel will auto-deploy when it detects the changes."
echo ""
echo "Check Vercel dashboard for deployment status:"
echo "https://vercel.com/dashboard"
