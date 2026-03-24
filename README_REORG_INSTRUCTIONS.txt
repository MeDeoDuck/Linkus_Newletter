===============================================================================
NEXT.JS PROJECT REORGANIZATION - EXECUTION INSTRUCTIONS
===============================================================================

PROJECT: linkus_newsletter
LOCATION: c:\Users\seank\OneDrive\Desktop\linkus_newletter
STATUS: Ready for reorganization

===============================================================================
WHAT NEEDS TO BE DONE
===============================================================================

This project needs to reorganize source files from the project root and app/ 
directory into a proper Next.js 13+ App Router structure.

CURRENT STATE:
- Files are scattered in project root and app/ directory
- Example: api.newsletters.route.ts (needs to be in app/api/newsletters/route.ts)
- Example: lib.db.ts (needs to be in app/lib/db.ts)

TARGET STATE:
- All files organized into proper nested directories
- Ready for Next.js compilation and deployment

===============================================================================
HOW TO EXECUTE THE REORGANIZATION
===============================================================================

OPTION 1: Using Python (Recommended)
----------------------------------
1. Open Command Prompt or PowerShell
2. Navigate to the project directory:
   cd c:\Users\seank\OneDrive\Desktop\linkus_newletter

3. Run the reorganization script:
   python DO_REORGANIZE.py

   OR (if python is not in PATH):
   py DO_REORGANIZE.py

This script will:
- Create all necessary directories
- Copy all files to their correct locations
- Verify the new structure
- Show a detailed report


OPTION 2: Using Node.js
----------------------
1. Open Command Prompt or PowerShell
2. Navigate to the project directory:
   cd c:\Users\seank\OneDrive\Desktop\linkus_newletter

3. Run the reorganization script:
   node reorganize_now.js


OPTION 3: Manual using Batch Commands
--------------------------------------
1. Open Command Prompt
2. Navigate to the project directory:
   cd /d c:\Users\seank\OneDrive\Desktop\linkus_newletter

3. Create directories:
   mkdir "app\lib" 2>NUL
   mkdir "app\api\newsletters\[id]" 2>NUL
   mkdir "app\write" 2>NUL
   mkdir "app\newsletters\[id]" 2>NUL
   mkdir "app\components" 2>NUL

4. Copy files:
   copy /Y "lib.db.ts" "app\lib\db.ts"
   copy /Y "api.newsletters.route.ts" "app\api\newsletters\route.ts"
   copy /Y "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts"
   copy /Y "app.write.page.tsx" "app\write\page.tsx"
   copy /Y "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx"
   copy /Y "components.NewsletterCard.tsx" "app\components\NewsletterCard.tsx"
   copy /Y "components.PasswordModal.tsx" "app\components\PasswordModal.tsx"

5. Verify:
   dir /s app | findstr /E "\.ts$|\.tsx$"


===============================================================================
FILES TO BE REORGANIZED
===============================================================================

Source File                        →  Destination File
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
lib.db.ts                          →  app/lib/db.ts
api.newsletters.route.ts           →  app/api/newsletters/route.ts
api.newsletters.[id].route.ts      →  app/api/newsletters/[id]/route.ts
app.write.page.tsx                 →  app/write/page.tsx
app.newsletter.[id].page.tsx       →  app/newsletters/[id]/page.tsx
components.NewsletterCard.tsx      →  app/components/NewsletterCard.tsx
components.PasswordModal.tsx       →  app/components/PasswordModal.tsx


===============================================================================
DIRECTORIES THAT WILL BE CREATED
===============================================================================

- app/lib
- app/api/newsletters/[id]
- app/write
- app/newsletters/[id]
- app/components


===============================================================================
NEXT STEPS AFTER REORGANIZATION
===============================================================================

1. Verify the reorganization completed successfully
2. Run: npm run build
3. Fix any import paths if necessary (check for @/ alias paths)
4. Test the application locally
5. Deploy to production


===============================================================================
SUPPORT / TROUBLESHOOTING
===============================================================================

If the Python script fails:
- Check that Python 3 is installed: python --version
- Ensure you're in the correct directory
- Check that all source files exist in the project root

If the Node.js script fails:
- Check that Node.js is installed: node --version
- Ensure you're in the correct directory
- Check file permissions

If manual batch commands fail:
- Ensure paths use backslashes (\) not forward slashes (/)
- Check that the Command Prompt is run as Administrator (if needed)
- Verify all source files exist before copying


===============================================================================
Script files available in this directory:
- DO_REORGANIZE.py (Python - Recommended)
- reorganize_now.js (Node.js)
- REORGANIZE_NOW.bat (Batch)
- This file (README_REORG.txt)

===============================================================================
