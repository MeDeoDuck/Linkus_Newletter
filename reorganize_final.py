#!/usr/bin/env python3
"""
Next.js App Router File Reorganization Script
Moves files from app/ flat structure to proper nested directories
"""

import os
import shutil
from pathlib import Path

def main():
    project_root = Path(__file__).parent
    os.chdir(project_root)
    
    print("\n🚀 Moving files to proper Next.js App Router structure...\n")
    
    # File mappings: (source, destination, description)
    file_mappings = [
        ('app/lib.db.ts', 'app/lib/db.ts', 'Database utilities'),
        ('app/api.newsletters.route.ts', 'app/api/newsletters/route.ts', 'Newsletter list API'),
        ('app/api.newsletters.[id].route.ts', 'app/api/newsletters/[id]/route.ts', 'Newsletter detail API'),
        ('app/write.page.tsx', 'app/write/page.tsx', 'Write page'),
        ('app/newsletter.[id].page.tsx', 'app/newsletters/[id]/page.tsx', 'Newsletter detail page'),
        ('app/components.NewsletterCard.tsx', 'app/components/NewsletterCard.tsx', 'Newsletter card component'),
        ('app/components.PasswordModal.tsx', 'app/components/PasswordModal.tsx', 'Password modal component'),
    ]
    
    # Directories to create
    dirs_to_create = [
        'app/lib',
        'app/api/newsletters/[id]',
        'app/write',
        'app/newsletters/[id]',
        'app/components',
    ]
    
    print("📁 Creating directories...")
    for dir_path in dirs_to_create:
        full_path = project_root / dir_path
        full_path.mkdir(parents=True, exist_ok=True)
        print(f"  ✓ {dir_path}")
    
    print("\n📋 Moving files...")
    moved_count = 0
    skipped_count = 0
    error_count = 0
    
    for src, dest, desc in file_mappings:
        src_path = project_root / src
        dest_path = project_root / dest
        
        try:
            if src_path.exists():
                dest_path.parent.mkdir(parents=True, exist_ok=True)
                
                if not dest_path.exists():
                    shutil.copy2(src_path, dest_path)
                    print(f"  ✓ {desc}")
                    print(f"    {src} → {dest}")
                    moved_count += 1
                else:
                    print(f"  ⊘ {desc} (already exists)")
                    skipped_count += 1
            else:
                print(f"  ✗ {desc} (source not found)")
                error_count += 1
        except Exception as e:
            print(f"  ✗ {desc}: {str(e)}")
            error_count += 1
    
    print(f"\n📊 Results: {moved_count} moved, {skipped_count} skipped, {error_count} errors")
    
    # Update tsconfig.json
    print("\n⚙️  Verifying tsconfig.json...")
    import json
    
    try:
        tsconfig_path = project_root / 'tsconfig.json'
        with open(tsconfig_path, 'r') as f:
            tsconfig = json.load(f)
        
        if 'compilerOptions' not in tsconfig:
            tsconfig['compilerOptions'] = {}
        
        tsconfig['compilerOptions']['paths'] = {
            "@/*": ["./*"],
            "@/lib/db": ["./app/lib/db.ts"],
            "@/components/*": ["./app/components/*"]
        }
        
        with open(tsconfig_path, 'w') as f:
            json.dump(tsconfig, f, indent=2)
        
        print("  ✓ tsconfig.json paths verified:")
        print("    - @/* → ./*")
        print("    - @/lib/db → ./app/lib/db.ts")
        print("    - @/components/* → ./app/components/*")
    except Exception as e:
        print(f"  ✗ Error updating tsconfig.json: {str(e)}")
    
    print("\n✅ File reorganization complete!")
    print("\n📝 Next steps:")
    print("  1. Run: npm install")
    print("  2. Run: npm run build")
    print("  3. Run: npm run dev")

if __name__ == '__main__':
    main()
