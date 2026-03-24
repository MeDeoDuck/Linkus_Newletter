import os
import sys

# Base app directory
app_dir = r"c:\Users\seank\OneDrive\Desktop\linkus_newletter\app"

# Directory structure to create
dirs_to_create = [
    os.path.join(app_dir, "lib"),
    os.path.join(app_dir, "api", "newsletters"),
    os.path.join(app_dir, "api", "newsletters", "[id]"),
    os.path.join(app_dir, "write"),
    os.path.join(app_dir, "newsletters", "[id]"),
    os.path.join(app_dir, "components"),
]

print("Creating directories...\n")

for dir_path in dirs_to_create:
    try:
        if not os.path.exists(dir_path):
            os.makedirs(dir_path, exist_ok=True)
            print(f"✓ Created: {os.path.relpath(dir_path, app_dir)}")
        else:
            print(f"  Already exists: {os.path.relpath(dir_path, app_dir)}")
    except Exception as err:
        print(f"✗ Error creating {dir_path}: {err}")

print("\nDirectory creation complete!")
