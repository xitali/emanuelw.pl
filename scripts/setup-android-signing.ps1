param(
    [string]$JavaHome = $env:JAVA_HOME
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$androidRoot = Join-Path $projectRoot "android-admin"
$keystorePath = Join-Path $androidRoot "emanuel-admin-release.jks"
$propertiesPath = Join-Path $androidRoot "keystore.properties"

if ((Test-Path -LiteralPath $keystorePath) -or (Test-Path -LiteralPath $propertiesPath)) {
    if ((Test-Path -LiteralPath $keystorePath) -and (Test-Path -LiteralPath $propertiesPath)) {
        Write-Output "Klucz podpisu Android już istnieje. Niczego nie nadpisano."
        exit 0
    }

    throw "Znaleziono tylko część konfiguracji podpisu. Nie nadpisuję danych."
}

if (-not $JavaHome) {
    throw "Podaj JAVA_HOME wskazujący na JDK 17."
}

$keytoolPath = Join-Path $JavaHome "bin\keytool.exe"
if (-not (Test-Path -LiteralPath $keytoolPath)) {
    throw "Nie znaleziono keytool.exe w JAVA_HOME."
}

$passwordBytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($passwordBytes)
$password = [Convert]::ToBase64String($passwordBytes)
$alias = "emanuel-admin"

& $keytoolPath `
    -genkeypair `
    -v `
    -keystore $keystorePath `
    -storepass $password `
    -keypass $password `
    -alias $alias `
    -keyalg RSA `
    -keysize 3072 `
    -validity 10000 `
    -dname "CN=Emanuel Admin, OU=Private, O=Emanuel Wloch, L=Poland, C=PL"

if ($LASTEXITCODE -ne 0) {
    throw "Nie udało się wygenerować klucza podpisu Android."
}

$properties = @(
    "storeFile=emanuel-admin-release.jks"
    "storePassword=$password"
    "keyAlias=$alias"
    "keyPassword=$password"
) -join [Environment]::NewLine

[IO.File]::WriteAllText(
    $propertiesPath,
    $properties + [Environment]::NewLine,
    [Text.UTF8Encoding]::new($false)
)

Write-Output "Utworzono prywatny klucz podpisu i konfigurację. Oba pliki są ignorowane przez Git."
