#!/usr/bin/env python3
import os
import subprocess
import sys

os.chdir(r'c:\Users\seank\OneDrive\Desktop\linkus_newletter')

print("=" * 60)
print("CLEANUP: Removing Duplicate Files")
print("=" * 60)
print()

# Files to delete from root
root_files = [
    'api.newsletters.route.ts',
    'api.newsletters.[id].route.ts',
    'lib.db.ts',
    'temp_lib_db.ts',
    'app.write.page.tsx',
    'app.newsletter.[id].page.tsx',
    'components.PasswordModal.tsx',
    'components.NewsletterCard.tsx',
    'NewsletterDetailPage.tsx',
    'WritePage.tsx',
]

# Files to delete from app/
app_files = [
    'api.newsletters.route.ts',
    'api.newsletters.[id].route.ts',
    'db.ts',
    'lib.db.ts',
    'DeleteRoute.ts',
    'write.page.tsx',
    'PasswordModal.tsx',
    'components.PasswordModal.tsx',
    'components.NewsletterCard.tsx',
    'NewsletterCard.tsx',
    'newsletter.[id].page.tsx',
    'page_home.tsx',
    'db_code.txt',
]

deleted_count = 0
not_found_count = 0

print("Deleting from root directory:")
for f in root_files:
    if os.path.exists(f):
        try:
            os.remove(f)
            print(f"  ✓ Deleted: {f}")
            deleted_count += 1
        except Exception as e:
            print(f"  ✗ Error: {f} - {e}")
    else:
        not_found_count += 1

print()
print("Deleting from app/ directory:")
for f in app_files:
    path = os.path.join('app', f)
    if os.path.exists(path):
        try:
            os.remove(path)
            print(f"  ✓ Deleted: {path}")
            deleted_count += 1
        except Exception as e:
            print(f"  ✗ Error: {path} - {e}")
    else:
        not_found_count += 1

print()
print("=" * 60)
print(f"CLEANUP COMPLETE: Deleted {deleted_count} files, {not_found_count} not found")
print("=" * 60)
print()

# Verify correct files exist
print("VERIFICATION: Checking required files")
print()

required_files = [
    'app/api/newsletters/route.ts',
    'app/api/newsletters/[id]/route.ts',
    'app/write/page.tsx',
    'app/newsletters/[id]/page.tsx',
    'app/components/NewsletterCard.tsx',
    'app/components/PasswordModal.tsx',
    'app/lib/db.ts',
    'app/layout.tsx',
    'app/page.tsx',
    'app/globals.css',
]

all_present = True
for f in required_files:
    if os.path.exists(f):
        print(f"  ✓ {f}")
    else:
        print(f"  ✗ MISSING: {f}")
        all_present = False

print()
print("=" * 60)
if all_present:
    print("✓ All required files are present!")
else:
    print("✗ Some required files are missing!")
print("=" * 60)
print()

# Run build
print("Running: npm run build")
print("=" * 60)
print()

result = subprocess.run(['npm', 'run', 'build'], shell=True)

print()
print("=" * 60)
if result.returncode == 0:
    print("✓ BUILD SUCCESSFUL!")
else:
    print(f"✗ BUILD FAILED with exit code {result.returncode}")
print("=" * 60)

sys.exit(result.returncode)
