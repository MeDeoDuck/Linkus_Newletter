#!/bin/bash
# This script reorganizes Next.js App Router files for Windows systems
# Run from: c:\Users\seank\OneDrive\Desktop\linkus_newletter

cd "$(dirname "$0")" || exit 1

echo "========================================================================"
echo "NEXT.JS APP ROUTER FILE REORGANIZATION SCRIPT"
echo "========================================================================"

# Step 1: Create directories
echo ""
echo "STEP 1: Creating directory structure..."
echo ""

mkdir -p "app/lib"
echo "  ✓ Created: app/lib/"

mkdir -p "app/api/newsletters"
echo "  ✓ Created: app/api/newsletters/"

mkdir -p "app/api/newsletters/[id]"
echo "  ✓ Created: app/api/newsletters/[id]/"

mkdir -p "app/write"
echo "  ✓ Created: app/write/"

mkdir -p "app/newsletters/[id]"
echo "  ✓ Created: app/newsletters/[id]/"

mkdir -p "app/components"
echo "  ✓ Created: app/components/"

# Step 2: Copy files to their new locations
echo ""
echo "STEP 2: Copying files to their proper locations..."
echo ""

cp "app/lib.db.ts" "app/lib/db.ts" && echo "  ✓ Copied: lib.db.ts → app/lib/db.ts"
cp "app/api.newsletters.route.ts" "app/api/newsletters/route.ts" && echo "  ✓ Copied: api.newsletters.route.ts → app/api/newsletters/route.ts"
cp "app/api.newsletters.[id].route.ts" "app/api/newsletters/[id]/route.ts" && echo "  ✓ Copied: api.newsletters.[id].route.ts → app/api/newsletters/[id]/route.ts"
cp "app/write.page.tsx" "app/write/page.tsx" && echo "  ✓ Copied: write.page.tsx → app/write/page.tsx"
cp "app/newsletter.[id].page.tsx" "app/newsletters/[id]/page.tsx" && echo "  ✓ Copied: newsletter.[id].page.tsx → app/newsletters/[id]/page.tsx"
cp "app/components.NewsletterCard.tsx" "app/components/NewsletterCard.tsx" && echo "  ✓ Copied: components.NewsletterCard.tsx → app/components/NewsletterCard.tsx"
cp "app/components.PasswordModal.tsx" "app/components/PasswordModal.tsx" && echo "  ✓ Copied: components.PasswordModal.tsx → app/components/PasswordModal.tsx"

# Step 3: Verify structure
echo ""
echo "STEP 3: Verifying final structure..."
echo ""

if [ -f "app/lib/db.ts" ]; then echo "  ✓ app/lib/db.ts"; else echo "  ✗ app/lib/db.ts (MISSING)"; fi
if [ -f "app/api/newsletters/route.ts" ]; then echo "  ✓ app/api/newsletters/route.ts"; else echo "  ✗ app/api/newsletters/route.ts (MISSING)"; fi
if [ -f "app/api/newsletters/[id]/route.ts" ]; then echo "  ✓ app/api/newsletters/[id]/route.ts"; else echo "  ✗ app/api/newsletters/[id]/route.ts (MISSING)"; fi
if [ -f "app/write/page.tsx" ]; then echo "  ✓ app/write/page.tsx"; else echo "  ✗ app/write/page.tsx (MISSING)"; fi
if [ -f "app/newsletters/[id]/page.tsx" ]; then echo "  ✓ app/newsletters/[id]/page.tsx"; else echo "  ✗ app/newsletters/[id]/page.tsx (MISSING)"; fi
if [ -f "app/components/NewsletterCard.tsx" ]; then echo "  ✓ app/components/NewsletterCard.tsx"; else echo "  ✗ app/components/NewsletterCard.tsx (MISSING)"; fi
if [ -f "app/components/PasswordModal.tsx" ]; then echo "  ✓ app/components/PasswordModal.tsx"; else echo "  ✗ app/components/PasswordModal.tsx (MISSING)"; fi

# Step 4: Display tree
echo ""
echo "STEP 4: Final directory structure:"
echo ""
tree -L 3 app/ || find app -type f -name "*.ts" -o -name "*.tsx" | head -20

echo ""
echo "========================================================================"
echo "✓ REORGANIZATION COMPLETE!"
echo "========================================================================"
echo ""
echo "Next steps:"
echo "  1. npm run build"
echo "  2. Check for TypeScript errors"
echo "  3. npm run dev"
echo ""
echo "========================================================================"
