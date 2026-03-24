import subprocess
import sys
import os

os.chdir('c:\\Users\\seank\\OneDrive\\Desktop\\linkus_newletter')

# Run the batch file
try:
    result = subprocess.run(['cleanup_and_build.bat'], capture_output=True, text=True, shell=True)
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr)
    print("Return code:", result.returncode)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
