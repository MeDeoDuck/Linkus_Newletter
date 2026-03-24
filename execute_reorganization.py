#!/usr/bin/env python3
import subprocess
import sys
import os

os.chdir(r'c:\Users\seank\OneDrive\Desktop\linkus_newletter')

print("=" * 70)
print("EXECUTING REORGANIZATION SCRIPTS")
print("=" * 70)

# Try Python script first
print("\nAttempting to run do-reorganize.py...")
try:
    result = subprocess.run([sys.executable, 'do-reorganize.py'], capture_output=True, text=True, timeout=30)
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr)
    if result.returncode == 0:
        print("\n✓ Python script completed successfully!")
        sys.exit(0)
except Exception as e:
    print(f"Python script error: {e}")

# Try Node script as fallback
print("\nAttempting to run Node script...")
try:
    result = subprocess.run(['node', 'reorganize-app-router.js'], capture_output=True, text=True, timeout=30)
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr)
    if result.returncode == 0:
        print("\n✓ Node script completed successfully!")
        sys.exit(0)
except Exception as e:
    print(f"Node script error: {e}")

print("\nAll reorganization attempts completed.")
