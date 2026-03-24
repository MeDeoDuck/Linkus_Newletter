# PowerShell script to deploy to Vercel
# Run this to complete the deployment

param(
    [switch]$SkipBuild = $false
)

$ErrorActionPreference = "Stop"

function Write-Header {
    param([string]$Text)
    Write-Host ""
    Write-Host "=========================================="
    Write-Host $Text
    Write-Host "=========================================="
    Write-Host ""
}

function Write-Success {
    param([string]$Text)
    Write-Host "✓ $Text" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Text)
    Write-Host "⚠ $Text" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Text)
    Write-Host "✗ $Text" -ForegroundColor Red
}

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommandPath

Write-Header "PREPARING FOR VERCEL DEPLOYMENT"

# Step 1: Verify files
Write-Host "Step 1: Verifying file structure..."
$files = @(
    "app\lib\db.ts",
    "app\api\newsletters\route.ts",
    "app\api\newsletters\[id]\route.ts",
    "app\write\page.tsx",
    "app\newsletters\[id]\page.tsx",
    "app\components\NewsletterCard.tsx",
    "app\components\PasswordModal.tsx"
)

$missingFiles = @()
foreach ($file in $files) {
    $path = Join-Path $ProjectRoot $file
    if (Test-Path $path) {
        Write-Host "  ✓ $file"
    } else {
        Write-Host "  ✗ MISSING: $file" -ForegroundColor Red
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Error-Custom "Missing files detected!"
    exit 1
}

Write-Success "All files present"
Write-Host ""

# Step 2: Check environment
Write-Host "Step 2: Checking environment..."
$envPath = Join-Path $ProjectRoot ".env.local"
if (Test-Path $envPath) {
    Write-Success ".env.local found"
} else {
    Write-Warning ".env.local not found"
}

$packagePath = Join-Path $ProjectRoot "package.json"
if (Test-Path $packagePath) {
    Write-Success "package.json found"
} else {
    Write-Error-Custom "package.json not found"
    exit 1
}

Write-Host ""

# Step 3: Optional build test
if (-not $SkipBuild) {
    Write-Host "Step 3: Running npm build..."
    try {
        npm run build
        Write-Success "Build successful!"
    } catch {
        Write-Error-Custom "Build failed!"
        Write-Host $_.Exception.Message
        exit 1
    }
    Write-Host ""
}

# Step 4: Git commit and push
Write-Host "Step 4: Committing changes to GitHub..."

try {
    # Check git status
    $status = git status --porcelain
    if ([string]::IsNullOrWhiteSpace($status)) {
        Write-Warning "No changes to commit"
    } else {
        # Stage all changes
        git add .
        Write-Success "Changes staged"

        # Commit with detailed message
        $commitMessage = @"
Restructure: Move files to Next.js App Router format for Vercel deployment

- Move API routes to app/api/newsletters/
- Move pages to app/write/ and app/newsletters/[id]/
- Move components to app/components/
- Move database utilities to app/lib/
- Update all imports to use correct path aliases
- Configured tsconfig.json for proper module resolution
- Fixed @/components/* and @/lib/db path aliases

This restructuring ensures compatibility with Vercel's Next.js App Router
and resolves 404 errors from incorrect route locations.

Database: Vercel Postgres (async operations)
Password: linkus_2026 (via SITE_PASSWORD env var)
"@

        git commit -m $commitMessage
        Write-Success "Changes committed"
    }

    # Push to GitHub
    git push origin main
    Write-Success "Changes pushed to GitHub"
} catch {
    Write-Error-Custom "Git operation failed!"
    Write-Host $_.Exception.Message
    exit 1
}

Write-Host ""
Write-Header "✓ DEPLOYMENT READY"
Write-Host ""
Write-Host "Your project has been successfully restructured and pushed to GitHub!"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Vercel will auto-deploy when it detects the changes"
Write-Host "2. Check your Vercel dashboard for deployment status"
Write-Host "3. Your newsletter site should be live shortly"
Write-Host ""
Write-Host "Vercel Dashboard: https://vercel.com/dashboard"
Write-Host ""
