#!/usr/bin/env python3
"""
Next.js Project Reorganization Script
This script reorganizes files from project root and app/ directory into proper Next.js app router structure
"""

import os
import shutil
import sys

def main():
    # Project directory
    project_dir = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter"
    
    # Change to project directory
    try:
        os.chdir(project_dir)
    except Exception as e:
        print(f"ERROR: Could not change to directory {project_dir}: {e}")
        return False
    
    print("===== STEP 1: Navigate to project directory =====")
    print(f"Current directory: {os.getcwd()}")
    print()
    
    # Step 2: Create all directories
    directories = [
        "app\\lib",
        "app\\api\\newsletters\\[id]",
        "app\\write",
        "app\\newsletters\\[id]",
        "app\\components"
    ]
    
    print("===== STEP 2: Create all directories =====")
    for dir_path in directories:
        try:
            os.makedirs(dir_path, exist_ok=True)
            print(f"✓ Created: {dir_path}")
        except Exception as e:
            print(f"✗ ERROR creating {dir_path}: {e}")
            return False
    
    print()
    
    # Step 3: Copy files
    files_to_copy = [
        ("lib.db.ts", "app\\lib\\db.ts"),
        ("api.newsletters.route.ts", "app\\api\\newsletters\\route.ts"),
        ("api.newsletters.[id].route.ts", "app\\api\\newsletters\\[id]\\route.ts"),
        ("app.write.page.tsx", "app\\write\\page.tsx"),
        ("app.newsletter.[id].page.tsx", "app\\newsletters\\[id]\\page.tsx"),
        ("components.NewsletterCard.tsx", "app\\components\\NewsletterCard.tsx"),
        ("components.PasswordModal.tsx", "app\\components\\PasswordModal.tsx"),
    ]
    
    print("===== STEP 3: Copy all files to their destination locations =====")
    for src, dst in files_to_copy:
        try:
            if os.path.exists(src):
                shutil.copy2(src, dst)
                print(f"✓ Copied: {src} -> {dst}")
            else:
                print(f"✗ ERROR: Source file not found: {src}")
                return False
        except Exception as e:
            print(f"✗ ERROR copying {src} to {dst}: {e}")
            return False
    
    print()
    
    # Step 4: Verify structure
    print("===== STEP 4: Verify structure =====")
    print("Directory listing (filtered for .ts and .tsx files):")
    
    for root, dirs, files in os.walk("app"):
        for file in files:
            if file.endswith((".ts", ".tsx")):
                full_path = os.path.join(root, file)
                print(f"✓ {full_path}")
    
    print()
    print("===== REORGANIZATION COMPLETE =====")
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
