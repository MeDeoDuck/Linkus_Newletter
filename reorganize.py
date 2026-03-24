#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

project_root = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter"
os.chdir(project_root)

print("Starting file reorganization...\n")

# Create directory structure
dirs = [
    'app/lib',
    'app/api/newsletters/[id]',
    'app/write',
    'app/newsletters/[id]',
    'app/components',
]

for dir_path in dirs:
    full_path = Path(project_root) / dir_path
    full_path.mkdir(parents=True, exist_ok=True)
    print(f"✓ Created directory: {dir_path}")

print("\nCopying files...\n")

# File mappings: (source, destination)
file_mappings = [
    ('lib.db.ts', 'app/lib/db.ts'),
    ('api.newsletters.route.ts', 'app/api/newsletters/route.ts'),
    ('api.newsletters.[id].route.ts', 'app/api/newsletters/[id]/route.ts'),
    ('app.write.page.tsx', 'app/write/page.tsx'),
    ('app.newsletter.[id].page.tsx', 'app/newsletters/[id]/page.tsx'),
    ('components.NewsletterCard.tsx', 'app/components/NewsletterCard.tsx'),
    ('components.PasswordModal.tsx', 'app/components/PasswordModal.tsx'),
]

for src, dest in file_mappings:
    src_path = Path(project_root) / src
    dest_path = Path(project_root) / dest
    
    if src_path.exists() and not dest_path.exists():
        shutil.copy2(src_path, dest_path)
        print(f"✓ Copied {src} -> {dest}")
    elif dest_path.exists():
        print(f"✓ {dest} already exists")
    else:
        print(f"✗ Source file not found: {src}")

print("\n✅ File reorganization complete!")
