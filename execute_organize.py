#!/usr/bin/env python3
import os
import sys

# Add current directory to path to allow running from anywhere
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    os.chdir(r"c:\Users\seank\OneDrive\Desktop\linkus_newletter")
    exec(open("organize_structure.py").read())
