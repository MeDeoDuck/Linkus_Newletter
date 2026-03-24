#!/bin/bash
cd "$(dirname "$0")" || exit 1

echo "=========================================="
echo "Project Structure Verification"
echo "=========================================="
echo ""

# Check all critical files exist
echo "✓ Checking critical files..."
echo ""

files=(
  "app/lib/db.ts"
  "app/api/newsletters/route.ts"
  "app/api/newsletters/[id]/route.ts"
  "app/write/page.tsx"
  "app/newsletters/[id]/page.tsx"
  "app/components/NewsletterCard.tsx"
  "app/components/PasswordModal.tsx"
  "app/page.tsx"
  "app/layout.tsx"
)

missing=0
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ MISSING: $file"
    ((missing++))
  fi
done

echo ""
echo "=========================================="
if [ $missing -eq 0 ]; then
  echo "✓ All files present!"
  echo "Ready for deployment"
else
  echo "✗ $missing file(s) missing!"
fi
echo "=========================================="
