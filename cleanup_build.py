#!/usr/bin/env python3
import os
import subprocess
import sys

os.chdir('c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter')

# Files to delete from project root
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
    'WritePage.tsx'
]

# Files to delete from app/ directory
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
    'db_code.txt'
]

print("Starting cleanup...\n")

# Delete root files
print("Deleting files from project root:")
for file in root_files:
    if os.path.exists(file):
        try:
            os.remove(file)
            print(f"  ✓ Deleted: {file}")
        except Exception as e:
            print(f"  ✗ Failed to delete {file}: {e}")
    else:
        print(f"  - Not found: {file}")

# Delete app directory files
print("\nDeleting files from app/ directory:")
for file in app_files:
    filepath = os.path.join('app', file)
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
            print(f"  ✓ Deleted: app\\{file}")
        except Exception as e:
            print(f"  ✗ Failed to delete app\\{file}: {e}")
    else:
        print(f"  - Not found: app\\{file}")

print("\nCleanup completed. Running npm run build...\n")

# Run npm run build
try:
    result = subprocess.run('npm run build', shell=True, capture_output=True, text=True)
    print("BUILD OUTPUT:\n")
    print(result.stdout)
    if result.stderr:
        print("BUILD ERRORS:\n")
        print(result.stderr)
    
    if result.returncode == 0:
        print("\n✓ Build completed successfully!")
    else:
        print(f"\n✗ Build failed with return code {result.returncode}")
        sys.exit(1)
except Exception as e:
    print(f"✗ Failed to run build: {e}")
    sys.exit(1)
