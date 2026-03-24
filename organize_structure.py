#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

project_dir = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter"
os.chdir(project_dir)

print("=" * 70)
print("NEXT.JS PROJECT STRUCTURE ORGANIZATION")
print("=" * 70)

# Step 1: Create directories
dirs_to_create = [
    os.path.join(project_dir, "app", "lib"),
    os.path.join(project_dir, "app", "api", "newsletters", "[id]"),
    os.path.join(project_dir, "app", "write"),
    os.path.join(project_dir, "app", "newsletters", "[id]"),
    os.path.join(project_dir, "app", "components"),
]

print("\n1. Creating directories...")
for dir_path in dirs_to_create:
    try:
        os.makedirs(dir_path, exist_ok=True)
        print(f"   ✓ Created: {dir_path.replace(project_dir + chr(92), '')}")
    except Exception as e:
        print(f"   ✗ Error creating {dir_path}: {e}")

# Step 2: Copy files
file_mappings = [
    (os.path.join(project_dir, "lib.db.ts"), os.path.join(project_dir, "app", "lib", "db.ts")),
    (os.path.join(project_dir, "api.newsletters.route.ts"), os.path.join(project_dir, "app", "api", "newsletters", "route.ts")),
    (os.path.join(project_dir, "api.newsletters.[id].route.ts"), os.path.join(project_dir, "app", "api", "newsletters", "[id]", "route.ts")),
    (os.path.join(project_dir, "app.write.page.tsx"), os.path.join(project_dir, "app", "write", "page.tsx")),
    (os.path.join(project_dir, "app.newsletter.[id].page.tsx"), os.path.join(project_dir, "app", "newsletters", "[id]", "page.tsx")),
    (os.path.join(project_dir, "components.NewsletterCard.tsx"), os.path.join(project_dir, "app", "components", "NewsletterCard.tsx")),
    (os.path.join(project_dir, "components.PasswordModal.tsx"), os.path.join(project_dir, "app", "components", "PasswordModal.tsx")),
]

print("\n2. Copying files to new locations...")
for source, dest in file_mappings:
    try:
        if os.path.exists(source):
            shutil.copy2(source, dest)
            src_name = source.replace(project_dir + chr(92), "")
            dst_name = dest.replace(project_dir + chr(92), "")
            print(f"   ✓ Copied: {src_name} → {dst_name}")
        else:
            print(f"   ✗ Source not found: {source.replace(project_dir + chr(92), '')}")
    except Exception as e:
        print(f"   ✗ Error copying {source}: {e}")

print("\n3. Final Directory Structure (app/):")
print("-" * 70)

def print_tree(path, prefix="", ignore_dirs={".git", "node_modules", "UI"}):
    try:
        entries = sorted(os.listdir(path))
    except PermissionError:
        return

    entries = [e for e in entries if not e.startswith('.') and e not in ignore_dirs]
    
    for i, entry in enumerate(entries):
        entry_path = os.path.join(path, entry)
        is_last = i == len(entries) - 1
        connector = "└── " if is_last else "├── "
        print(f"{prefix}{connector}{entry}")
        
        if os.path.isdir(entry_path):
            next_prefix = prefix + ("    " if is_last else "│   ")
            print_tree(entry_path, next_prefix, ignore_dirs)

app_path = os.path.join(project_dir, "app")
print(f"app{os.sep}")
print_tree(app_path, "")

print("\n" + "=" * 70)
print("✓ ORGANIZATION COMPLETE!")
print("=" * 70)
