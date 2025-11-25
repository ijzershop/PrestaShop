function Sync-Copy($Source, $Target) {
  $src = $Source.TrimEnd('\') + '\'
  $dst = $Target.TrimEnd('\') + '\'
  robocopy $src $dst /MIR /NFL /NDL /NP /NJH /NJS | Out-Null
}

# 1c) Update .gitignore with deployed paths
$GitignorePath = Join-Path $ShopRoot ".gitignore"
Write-Host "`nUpdating .gitignore to exclude deployed files..."

foreach ($entry in $Map) {
  Add-ToGitignore -Path $entry.Target -GitignorePath $GitignorePath
}

foreach ($f in $FileMap) {
  Add-ToGitignore -Path $f.Target -GitignorePath $GitignorePath
}

  # Re-enable Addons API for subsequent operations if needed
  Remove-Item Env:\PS_ADDONS_API_ENABLED -ErrorAction SilentlyContinue
  Remove-Item Env:\_PS_MODE_DEV_ -ErrorAction SilentlyContinue

function Add-ToGitignore($Path, $GitignorePath) {
  # Normalize path to forward slashes for .gitignore
  $normalized = $Path -replace '\\', '/'

  # Check if .gitignore exists, create if not
  if (-not (Test-Path $GitignorePath)) {
    Write-Host "Creating .gitignore at $GitignorePath"
    New-Item -ItemType File -Path $GitignorePath -Force | Out-Null
  }

  # Check if path already exists in .gitignore
  $content = Get-Content -Path $GitignorePath -ErrorAction SilentlyContinue
  if ($content -notcontains "/$normalized" -and $content -notcontains $normalized) {
    Write-Host "Adding '$normalized' to .gitignore"
    Add-Content -Path $GitignorePath -Value $normalized
  }
}
