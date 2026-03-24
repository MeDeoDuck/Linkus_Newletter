#!/usr/bin/env python3
import os
import shutil
import json
from pathlib import Path

project_root = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter"
os.chdir(project_root)

print("Starting file reorganization...\n")

# Step 1: Create directory structure
dirs = [
    'app/lib',
    'app/api/newsletters/[id]',
    'app/write',
    'app/newsletters/[id]',
    'app/components',
]

for dir_path in dirs:
    full_path = os.path.join(project_root, dir_path)
    if not os.path.exists(full_path):
        os.makedirs(full_path, exist_ok=True)
        print(f"✓ Created directory: {dir_path}")
    else:
        print(f"✓ Directory already exists: {dir_path}")

print()

# Step 2: Copy/Move files
file_mappings = [
    ('lib.db.ts', 'app/lib/db.ts'),
    ('api.newsletters.route.ts', 'app/api/newsletters/route.ts'),
    ('api.newsletters.[id].route.ts', 'app/api/newsletters/[id]/route.ts'),
    ('app.write.page.tsx', 'app/write/page.tsx'),
    ('app.newsletter.[id].page.tsx', 'app/newsletters/[id]/page.tsx'),
    ('components.NewsletterCard.tsx', 'app/components/NewsletterCard.tsx'),
    ('components.PasswordModal.tsx', 'app/components/PasswordModal.tsx'),
]

for src, dst in file_mappings:
    src_path = os.path.join(project_root, src)
    dst_path = os.path.join(project_root, dst)
    
    if os.path.exists(src_path):
        if os.path.exists(dst_path):
            print(f"✓ {dst} already exists (skipped)")
        else:
            shutil.copy2(src_path, dst_path)
            print(f"✓ Copied {src} → {dst}")
    else:
        print(f"✗ Source file not found: {src}")

print()

# Step 3: Update tsconfig.json
tsconfig_path = os.path.join(project_root, 'tsconfig.json')
try:
    with open(tsconfig_path, 'r') as f:
        tsconfig = json.load(f)
    
    # Update paths
    tsconfig['compilerOptions']['paths'] = {
        "@/*": ["./*"],
        "@/lib/db": ["./app/lib/db.ts"],
        "@/components/*": ["./app/components/*"]
    }
    
    with open(tsconfig_path, 'w') as f:
        json.dump(tsconfig, f, indent=2)
    
    print("✓ Updated tsconfig.json paths:")
    print("  - @/lib/db → ./app/lib/db.ts")
    print("  - @/components/* → ./app/components/*")
except Exception as e:
    print(f"✗ Error updating tsconfig.json: {e}")

print("\n✅ File reorganization complete!")
