REM Run this script with: powershell -ExecutionPolicy Bypass -File setup-app-router.ps1

$projectRoot = "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
Set-Location $projectRoot

Write-Host "Creating Next.js App Router Directory Structure..." -ForegroundColor Green

# Create directories
$dirs = @(
    'app\lib',
    'app\api\newsletters\[id]',
    'app\write',
    'app\newsletters\[id]',
    'app\components'
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✓ Created: $dir" -ForegroundColor Green
    } else {
        Write-Host "⊘ Exists: $dir" -ForegroundColor Yellow
    }
}

Write-Host "`nCopying files to proper locations..." -ForegroundColor Green

# Copy files
$fileMappings = @(
    @{ Source = 'lib.db.ts'; Dest = 'app\lib\db.ts' },
    @{ Source = 'api.newsletters.route.ts'; Dest = 'app\api\newsletters\route.ts' },
    @{ Source = 'api.newsletters.[id].route.ts'; Dest = 'app\api\newsletters\[id]\route.ts' },
    @{ Source = 'app.write.page.tsx'; Dest = 'app\write\page.tsx' },
    @{ Source = 'app.newsletter.[id].page.tsx'; Dest = 'app\newsletters\[id]\page.tsx' },
    @{ Source = 'components.NewsletterCard.tsx'; Dest = 'app\components\NewsletterCard.tsx' },
    @{ Source = 'components.PasswordModal.tsx'; Dest = 'app\components\PasswordModal.tsx' }
)

foreach ($mapping in $fileMappings) {
    $src = $mapping.Source
    $dest = $mapping.Dest
    
    if ((Test-Path $src) -and -not (Test-Path $dest)) {
        Copy-Item $src $dest -Force
        Write-Host "✓ Copied: $src -> $dest" -ForegroundColor Green
    } elseif (Test-Path $dest) {
        Write-Host "⊘ Exists: $dest" -ForegroundColor Yellow
    } else {
        Write-Host "✗ Not found: $src" -ForegroundColor Red
    }
}

Write-Host "`n✅ Reorganization Complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "  1. npm install" -ForegroundColor Gray
Write-Host "  2. npm run build" -ForegroundColor Gray
Write-Host "  3. npm run dev" -ForegroundColor Gray
