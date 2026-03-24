#!/usr/bin/env python3
"""
Wrapper to execute the reorganization script and capture all output
"""
import subprocess
import sys
import os

# Change to the project directory
os.chdir(r'c:\Users\seank\OneDrive\Desktop\linkus_newletter')

# Execute the reorganization script
try:
    result = subprocess.run(
        [sys.executable, 'do-reorganize.py'],
        capture_output=False,
        text=True
    )
    sys.exit(result.returncode)
except Exception as e:
    print(f"Error running reorganization script: {e}")
    sys.exit(1)
