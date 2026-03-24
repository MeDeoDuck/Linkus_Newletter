#!/usr/bin/env python3

import os
import shutil
from pathlib import Path

# Change to project directory
project_dir = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter"
os.chdir(project_dir)

print("=" * 60)
print("NEXT.JS PROJECT STRUCTURE ORGANIZATION")
print("=" * 60)

# Step 1: Create directories
directories = [
    "app\\lib",
    "app\\api\\newsletters\\[id]",
    "app\\write",
    "app\\newsletters\\[id]",
    "app\\components"
]

print("\n1. Creating directories...")
for dir_path in directories:
    full_path = os.path.join(project_dir, dir_path)
    os.makedirs(full_path, exist_ok=True)
    print(f"   ✓ Created: {dir_path}")

# Step 2: Copy files to their new locations
file_mappings = [
    ("lib.db.ts", "app\\lib\\db.ts"),
    ("api.newsletters.route.ts", "app\\api\\newsletters\\route.ts"),
    ("api.newsletters.[id].route.ts", "app\\api\\newsletters\\[id]\\route.ts"),
    ("app.write.page.tsx", "app\\write\\page.tsx"),
    ("app.newsletter.[id].page.tsx", "app\\newsletters\\[id]\\page.tsx"),
    ("components.NewsletterCard.tsx", "app\\components\\NewsletterCard.tsx"),
    ("components.PasswordModal.tsx", "app\\components\\PasswordModal.tsx"),
]

print("\n2. Copying files to new locations...")
for source, destination in file_mappings:
    source_path = os.path.join(project_dir, source)
    dest_path = os.path.join(project_dir, destination)
    
    if os.path.exists(source_path):
        shutil.copy2(source_path, dest_path)
        print(f"   ✓ Copied: {source} → {destination}")
    else:
        print(f"   ✗ Source not found: {source}")

# Step 3: Print final directory structure
print("\n3. Final Directory Structure:")
print("-" * 60)

def print_tree(directory, prefix="", max_depth=5, current_depth=0, ignore_dirs={".git", "node_modules", "UI"}):
    if current_depth >= max_depth:
        return
    
    try:
        items = sorted(os.listdir(directory))
    except PermissionError:
        return
    
    # Filter out ignored directories and files starting with dot
    items = [item for item in items if item not in ignore_dirs and not item.startswith('.')]
    
    for i, item in enumerate(items):
        path = os.path.join(directory, item)
        is_last = i == len(items) - 1
        current_prefix = "└── " if is_last else "├── "
        print(prefix + current_prefix + item)
        
        if os.path.isdir(path) and not item.startswith('.'):
            next_prefix = prefix + ("    " if is_last else "│   ")
            print_tree(path, next_prefix, max_depth, current_depth + 1, ignore_dirs)

print("app/")
print_tree(os.path.join(project_dir, "app"), "", max_depth=4, current_depth=1)

print("\n" + "=" * 60)
print("ORGANIZATION COMPLETE!")
print("=" * 60)
