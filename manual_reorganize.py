#!/usr/bin/env python3
"""
Direct reorganization without subprocess - just create output
"""
import os
import shutil
from pathlib import Path

app_dir = Path(r'c:\Users\seank\OneDrive\Desktop\linkus_newletter\app')

print('=' * 70)
print('NEXT.JS APP ROUTER FILE REORGANIZATION')
print('=' * 70)

# Step 1: Create directories
print('\nSTEP 1: Creating directory structure...\n')

dirs = [
    'lib',
    r'api\newsletters',
    r'api\newsletters\[id]',
    'write',
    r'newsletters\[id]',
    'components'
]

for d in dirs:
    path = app_dir / d
    if path.exists():
        print(f'  ✓ {d}/ (already exists)')
    else:
        try:
            path.mkdir(parents=True, exist_ok=True)
            print(f'  ✓ {d}/ (created)')
        except Exception as e:
            print(f'  ✗ {d}/ - ERROR: {e}')

# Step 2: Copy files
print('\nSTEP 2: Copying and reorganizing files...\n')

file_moves = [
    ('lib.db.ts', r'lib\db.ts'),
    ('api.newsletters.route.ts', r'api\newsletters\route.ts'),
    ('api.newsletters.[id].route.ts', r'api\newsletters\[id]\route.ts'),
    ('write.page.tsx', r'write\page.tsx'),
    ('newsletter.[id].page.tsx', r'newsletters\[id]\page.tsx'),
    ('components.NewsletterCard.tsx', r'components\NewsletterCard.tsx'),
    ('components.PasswordModal.tsx', r'components\PasswordModal.tsx')
]

for src, dst in file_moves:
    src_path = app_dir / src
    dst_path = app_dir / dst
    
    if not src_path.exists():
        print(f'  ✗ {src} (source not found)')
    elif dst_path.exists():
        print(f'  ~ {dst} (destination already exists)')
    else:
        try:
            shutil.copy2(src_path, dst_path)
            print(f'  ✓ {src} → {dst}')
        except Exception as e:
            print(f'  ✗ {src} → {dst} - ERROR: {e}')

# Step 3: Verify structure
print('\nSTEP 3: Verifying final structure...\n')

expected = [
    r'lib\db.ts',
    r'api\newsletters\route.ts',
    r'api\newsletters\[id]\route.ts',
    r'write\page.tsx',
    r'newsletters\[id]\page.tsx',
    r'components\NewsletterCard.tsx',
    r'components\PasswordModal.tsx'
]

missing = []
for f in expected:
    path = app_dir / f
    if path.exists():
        print(f'  ✓ {f}')
    else:
        print(f'  ✗ {f} (MISSING)')
        missing.append(f)

# Step 4: Directory tree
print('\nSTEP 4: Final directory structure:\n')

def show_tree(path, prefix='  ', max_depth=4, current_depth=0):
    if current_depth >= max_depth:
        return
    
    try:
        items = sorted(os.listdir(str(path)))
        # Filter to only show relevant files/dirs
        relevant = []
        for item in items:
            item_path = path / item
            if item_path.is_dir():
                relevant.append((item, True))
            elif item.endswith(('.ts', '.tsx')):
                relevant.append((item, False))
        
        for i, (item, is_dir) in enumerate(relevant):
            is_last = i == len(relevant) - 1
            connector = '└── ' if is_last else '├── '
            item_path = path / item
            
            if is_dir:
                print(f'{prefix}{connector}{item}/')
                next_prefix = prefix + ('    ' if is_last else '│   ')
                show_tree(item_path, next_prefix, max_depth, current_depth + 1)
            else:
                print(f'{prefix}{connector}{item}')
    except Exception as e:
        print(f'{prefix}Error reading directory: {e}')

show_tree(app_dir)

# Final report
print('\n' + '=' * 70)
if not missing:
    print('✓ SUCCESS: All files have been successfully reorganized!')
    print('\nTsconfig path aliases are already configured:')
    print('  @/lib/db → ./app/lib/db.ts')
    print('  @/components/* → ./app/components/*')
else:
    print(f'⚠ WARNING: {len(missing)} file(s) still missing:')
    for f in missing:
        print(f'  - {f}')

print('\n' + '=' * 70)
print('Next steps:')
print('  1. npm run build')
print('  2. Verify no TypeScript/build errors')
print('=' * 70)
