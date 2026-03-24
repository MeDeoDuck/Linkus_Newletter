# NEXT.JS PROJECT ORGANIZATION GUIDE

## Overview
This document provides the complete Next.js project structure organization for the Linkus Newsletter project.

## Directory Structure to Create

```
app/
├── lib/
│   └── db.ts
├── api/
│   └── newsletters/
│       ├── route.ts
│       └── [id]/
│           └── route.ts
├── write/
│   └── page.tsx
├── newsletters/
│   └── [id]/
│       └── page.tsx
└── components/
    ├── NewsletterCard.tsx
    └── PasswordModal.tsx
```

## File Mappings

The following files need to be moved from the root directory to their new locations:

| Source File | Destination |
|---|---|
| `lib.db.ts` | `app/lib/db.ts` |
| `api.newsletters.route.ts` | `app/api/newsletters/route.ts` |
| `api.newsletters.[id].route.ts` | `app/api/newsletters/[id]/route.ts` |
| `app.write.page.tsx` | `app/write/page.tsx` |
| `app.newsletter.[id].page.tsx` | `app/newsletters/[id]/page.tsx` |
| `components.NewsletterCard.tsx` | `app/components/NewsletterCard.tsx` |
| `components.PasswordModal.tsx` | `app/components/PasswordModal.tsx` |

## How to Execute

### Method 1: Using Node.js (Recommended)
```bash
cd c:\Users\seank\OneDrive\Desktop\linkus_newletter
node organize_structure.js
```

### Method 2: Using Batch Script
```bash
cd c:\Users\seank\OneDrive\Desktop\linkus_newletter
organize_with_batch.bat
```

### Method 3: Manual Command Line
```bash
cd c:\Users\seank\OneDrive\Desktop\linkus_newletter

REM Create directories
mkdir app\lib
mkdir app\api\newsletters\[id]
mkdir app\write
mkdir app\newsletters\[id]
mkdir app\components

REM Copy files
copy lib.db.ts app\lib\db.ts
copy api.newsletters.route.ts app\api\newsletters\route.ts
copy "api.newsletters.[id].route.ts" "app\api\newsletters\[id]\route.ts"
copy app.write.page.tsx app\write\page.tsx
copy "app.newsletter.[id].page.tsx" "app\newsletters\[id]\page.tsx"
copy components.NewsletterCard.tsx app\components\NewsletterCard.tsx
copy components.PasswordModal.tsx app\components\PasswordModal.tsx

REM View the final structure
tree app /F
```

### Method 4: Using npm Script
```bash
cd c:\Users\seank\OneDrive\Desktop\linkus_newletter
npm run organize
```

## Files Available

The following automation scripts have been created:

1. **organize_structure.js** - Node.js script with full directory structure display
2. **organize_with_batch.bat** - Batch file using native DOS commands
3. **run_organize_node.bat** - Batch wrapper for Node.js script
4. **run_organize.bat** - Generic batch runner
5. **organize_final.bat** - Advanced batch with Python support

## Implementation Status

All required files and directories are ready for organization. Once executed, the project will have a proper Next.js App Router structure with:

- Database utilities in `app/lib/`
- API routes in `app/api/`
- Page components in `app/write/` and `app/newsletters/[id]/`
- Shared components in `app/components/`

## Verification

After running any of the organization scripts, verify the structure with:

```bash
tree app /F
```

Or for a PowerShell/Unix equivalent:
```bash
node organize_structure.js
```

This will display the complete organized file structure.
