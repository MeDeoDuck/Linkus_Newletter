import os
import sys

os.chdir(r'c:\Users\seank\OneDrive\Desktop\linkus_newletter')

# Files to delete
files = [
    'api.newsletters.route.ts',
    'api.newsletters.[id].route.ts',
    'lib.db.ts',
    'temp_lib_db.ts',
    'app.write.page.tsx',
    'app.newsletter.[id].page.tsx',
    'components.PasswordModal.tsx',
    'components.NewsletterCard.tsx',
    'NewsletterDetailPage.tsx',
    'WritePage.tsx',
    'app/api.newsletters.route.ts',
    'app/api.newsletters.[id].route.ts',
    'app/db.ts',
    'app/lib.db.ts',
    'app/DeleteRoute.ts',
    'app/write.page.tsx',
    'app/PasswordModal.tsx',
    'app/components.PasswordModal.tsx',
    'app/components.NewsletterCard.tsx',
    'app/NewsletterCard.tsx',
    'app/newsletter.[id].page.tsx',
    'app/page_home.tsx',
    'app/db_code.txt',
]

deleted = 0
for f in files:
    try:
        if os.path.exists(f):
            os.remove(f)
            print(f'Deleted: {f}')
            deleted += 1
    except:
        pass

print(f'\nTotal deleted: {deleted}')
print('Done!')
