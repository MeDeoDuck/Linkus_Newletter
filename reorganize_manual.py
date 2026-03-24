import os
import shutil

# Project directory
project_dir = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter"

# Change to project directory
os.chdir(project_dir)

# Step 2: Create all directories
directories = [
    "app\\lib",
    "app\\api\\newsletters\\[id]",
    "app\\write",
    "app\\newsletters\\[id]",
    "app\\components"
]

print("===== STEP 2: Creating directories =====")
for dir_path in directories:
    os.makedirs(dir_path, exist_ok=True)
    print(f"Created: {dir_path}")

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

print("===== STEP 3: Copying files =====")
for src, dst in files_to_copy:
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied: {src} -> {dst}")
    else:
        print(f"ERROR: Source file not found: {src}")

print()

# Step 4: Verify structure
print("===== STEP 4: Verify structure =====")
print("Directory listing (filtered for .ts and .tsx files):")
for root, dirs, files in os.walk("app"):
    for file in files:
        if file.endswith((".ts", ".tsx")):
            full_path = os.path.join(root, file)
            print(full_path)

print()
print("===== REORGANIZATION COMPLETE =====")
