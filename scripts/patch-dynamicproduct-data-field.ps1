param(
  [string]$ModulePath = "C:\wampserver\www\modernesmid-webshop\external\modernesmid_webshop\module\dynamicproduct",
  [switch]$WhatIf
)

$assetsDir = Join-Path $ModulePath "lib\media\product\assets"
if (-not (Test-Path $assetsDir)) {
  throw "Assets directory not found: $assetsDir"
}

$targets = Get-ChildItem -Path $assetsDir -File |
  Where-Object { $_.Name -like "main-*.js" -or $_.Name -like "main-legacy-*.js" } |
  Sort-Object LastWriteTime -Descending

if (-not $targets) {
  throw "No main-*.js files found in $assetsDir"
}

$legacyLiteral = ',dc(i,"data-invalid",nd(n)||null), ,dc(i,"data-name",nd(t).name)'
$legacyReplace = ',dc(i,"data-invalid",nd(n)||null),dc(i,"data-field",JSON.stringify(nd(t))||null),dc(i,"data-name",nd(t).name)'

$modernRegex = [regex]::new('([A-Za-z_$][\w$]*)\(([^,]+),["'']data-invalid["''],([^)]*?)\),\1\(\2,["'']data-name["''],([^)]*?)\.name\)')

$patchedAny = $false
foreach ($file in $targets) {
  $content = Get-Content -Raw -Path $file.FullName
  if ($content.Contains("data-field") -and $content.Contains("JSON.stringify")) {
    Write-Host "Already patched:" $file.FullName
    $patchedAny = $true
    continue
  }
  $newContent = $content

  if ($newContent.Contains($legacyLiteral)) {
    $newContent = $newContent.Replace($legacyLiteral, $legacyReplace)
  } elseif ($modernRegex.IsMatch($newContent)) {
    $newContent = $modernRegex.Replace($newContent, {
      param($m)
      $fn = $m.Groups[1].Value
      $target = $m.Groups[2].Value
      $invalidExpr = $m.Groups[3].Value
      $fieldObj = $m.Groups[4].Value
      "$fn($target,""data-invalid"",$invalidExpr),$fn($target,""data-field"",JSON.stringify($fieldObj)||null),$fn($target,""data-name"",$fieldObj.name)"
    })
  } else {
    Write-Host "Pattern not found, skipped:" $file.FullName
    continue
  }
  if ($WhatIf) {
    Write-Host "Would patch:" $file.FullName
  } else {
    Set-Content -Path $file.FullName -Value $newContent -NoNewline
    Write-Host "Patched:" $file.FullName
  }
  $patchedAny = $true
}

if (-not $patchedAny) {
  throw "No files patched. The expected pattern was not found in any main-*.js."
}
