#!/usr/bin/env python3
import os
import shutil
import sys

base = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter"
os.chdir(base)

dirs_to_create = [
    "app\\lib",
    "app\\api\\newsletters\\[id]",
    "app\\write",
    "app\\newsletters\\[id]",
    "app\\components"
]

for d in dirs_to_create:
    os.makedirs(d, exist_ok=True)
    print(f"✓ Created {d}")

files_to_copy = [
    ("lib.db.ts", "app\\lib\\db.ts"),
    ("api.newsletters.route.ts", "app\\api\\newsletters\\route.ts"),
    ("api.newsletters.[id].route.ts", "app\\api\\newsletters\\[id]\\route.ts"),
    ("app.write.page.tsx", "app\\write\\page.tsx"),
    ("app.newsletter.[id].page.tsx", "app\\newsletters\\[id]\\page.tsx"),
    ("components.NewsletterCard.tsx", "app\\components\\NewsletterCard.tsx"),
    ("components.PasswordModal.tsx", "app\\components\\PasswordModal.tsx"),
]

for src, dst in files_to_copy:
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"✓ Copied {src} → {dst}")
    else:
        print(f"✗ Source not found: {src}")

print("\n" + "="*60)
print("FINAL DIRECTORY STRUCTURE")
print("="*60 + "\n")

for root, dirs, files in os.walk("app"):
    level = root.replace("app", "").count(os.sep)
    indent = "  " * level
    print(f"{indent}📁 {os.path.basename(root)}/")
    subindent = "  " * (level + 1)
    for file in sorted(files):
        if file not in ["db_code.txt", "DeleteRoute.ts", "globals.css", "page_home.tsx"]:
            print(f"{subindent}📄 {file}")

print("\n✨ Reorganization complete!")
