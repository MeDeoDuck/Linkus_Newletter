#!/bin/bash

cd c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter

# Delete root files
rm -f api.newsletters.route.ts
rm -f api.newsletters.[id].route.ts
rm -f lib.db.ts
rm -f temp_lib_db.ts
rm -f app.write.page.tsx
rm -f app.newsletter.[id].page.tsx
rm -f components.PasswordModal.tsx
rm -f components.NewsletterCard.tsx
rm -f NewsletterDetailPage.tsx
rm -f WritePage.tsx

# Delete app files
rm -f app/api.newsletters.route.ts
rm -f app/api.newsletters.[id].route.ts
rm -f app/db.ts
rm -f app/lib.db.ts
rm -f app/DeleteRoute.ts
rm -f app/write.page.tsx
rm -f app/PasswordModal.tsx
rm -f app/components.PasswordModal.tsx
rm -f app/components.NewsletterCard.tsx
rm -f app/NewsletterCard.tsx
rm -f app/newsletter.[id].page.tsx
rm -f app/page_home.tsx
rm -f app/db_code.txt

echo "Cleanup complete. Running npm build..."
npm run build

if [ $? -eq 0 ]; then
  echo ""
  echo "BUILD SUCCESSFUL!"
  echo ""
  echo "Next steps:"
  echo "  git add ."
  echo "  git commit -m 'Restructure: Move files to Next.js App Router format'"
  echo "  git push origin main"
else
  echo ""
  echo "BUILD FAILED!"
fi
