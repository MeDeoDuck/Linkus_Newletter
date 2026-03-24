#!/usr/bin/env pwsh

# Next.js Project Structure Organization Script
# This script will organize files into the proper Next.js App Router structure

$projectDir = "c:\Users\seank\OneDrive\Desktop\linkus_newletter"
Set-Location $projectDir

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "NEXT.JS PROJECT STRUCTURE ORGANIZATION" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create directories
$dirsToCreate = @(
    "app\lib",
    "app\api\newsletters\[id]",
    "app\write",
    "app\newsletters\[id]",
    "app\components"
)

Write-Host "1. Creating directories..." -ForegroundColor Green
foreach ($dir in $dirsToCreate) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "   ✓ Created: $dir" -ForegroundColor Green
    } else {
        Write-Host "   ✓ Already exists: $dir" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "2. Copying files to new locations..." -ForegroundColor Green

# Step 2: Copy files
$fileMappings = @(
    @{ src = "lib.db.ts"; dst = "app\lib\db.ts" },
    @{ src = "api.newsletters.route.ts"; dst = "app\api\newsletters\route.ts" },
    @{ src = "api.newsletters.[id].route.ts"; dst = "app\api\newsletters\[id]\route.ts" },
    @{ src = "app.write.page.tsx"; dst = "app\write\page.tsx" },
    @{ src = "app.newsletter.[id].page.tsx"; dst = "app\newsletters\[id]\page.tsx" },
    @{ src = "components.NewsletterCard.tsx"; dst = "app\components\NewsletterCard.tsx" },
    @{ src = "components.PasswordModal.tsx"; dst = "app\components\PasswordModal.tsx" }
)

foreach ($mapping in $fileMappings) {
    $srcPath = Join-Path $projectDir $mapping.src
    $dstPath = Join-Path $projectDir $mapping.dst
    
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "   ✓ Copied: $($mapping.src) → $($mapping.dst)" -ForegroundColor Green
    } else {
        Write-Host "   ✗ Source not found: $($mapping.src)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "3. Final Directory Structure (app/):" -ForegroundColor Green
Write-Host "─" * 66 -ForegroundColor Cyan

function Show-Tree {
    param(
        [string]$Path,
        [string]$Prefix = "",
        [hashtable]$IgnoreList = @{ ".git" = $true; "node_modules" = $true; "UI" = $true; ".next" = $true }
    )
    
    $items = Get-ChildItem -Path $Path -Force | Where-Object { 
        -not $IgnoreList.ContainsKey($_.Name) -and -not $_.Name.StartsWith('.')
    } | Sort-Object Name
    
    for ($i = 0; $i -lt $items.Count; $i++) {
        $item = $items[$i]
        $isLast = ($i -eq $items.Count - 1)
        $connector = if ($isLast) { "└── " } else { "├── " }
        Write-Host "$Prefix$connector$($item.Name)"
        
        if ($item.PSIsContainer) {
            $nextPrefix = $Prefix + (if ($isLast) { "    " } else { "│   " })
            Show-Tree -Path $item.FullName -Prefix $nextPrefix -IgnoreList $IgnoreList
        }
    }
}

$appPath = Join-Path $projectDir "app"
if (Test-Path $appPath) {
    Write-Host "app\" -ForegroundColor Cyan
    Show-Tree -Path $appPath
}

Write-Host "─" * 66 -ForegroundColor Cyan
Write-Host ""
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "✓ ORGANIZATION COMPLETE!" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
