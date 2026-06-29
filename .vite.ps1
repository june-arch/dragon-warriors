$port = 3000
$proc = Get-Process -Id (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue

if ($proc) {
  Write-Host "Vite already running on port $port (PID $($proc.Id))" -ForegroundColor Green
  exit
}

Write-Host "Starting Vite on port $port..." -ForegroundColor Yellow
$p = Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c npx vite --port $port" -PassThru

while (-not (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue)) {
  Start-Sleep -Milliseconds 300
}

Write-Host "Vite ready on http://localhost:$port" -ForegroundColor Green
