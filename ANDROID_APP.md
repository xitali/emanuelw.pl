# Emanuel Admin na Androida

To prywatna, natywna aplikacja Android dla właściciela portfolio. Nie wymaga
publikacji w Google Play ani płatnego abonamentu.

## Instalacja na telefonie

1. Pobierz plik `EmanuelAdmin-1.0.0.apk` na telefon.
2. Otwórz pobrany plik.
3. Jeżeli Android zablokuje instalację:
   - naciśnij `Ustawienia`,
   - włącz `Zezwól z tego źródła` dla aplikacji, z której otwierasz APK,
   - wróć i naciśnij `Zainstaluj`.
4. Otwórz aplikację `Emanuel Admin`.
5. Wpisz to samo hasło, którego używasz w panelu `/admin`.
6. Gdy Android zapyta o powiadomienia, naciśnij `Zezwól`.
7. W górnym pasku naciśnij ikonę dzwonka, aby wysłać test.

Po dotknięciu powiadomienia otworzy się natywna lista wiadomości. Treść
wiadomości jest pobierana dopiero po zalogowaniu; samo powiadomienie nie
zawiera danych klienta.

## Ważne

- APK jest podpisany prywatnym kluczem i może być instalowany bez Google Play.
- Przy aktualizacji instaluj nowy APK bez odinstalowywania poprzedniej wersji.
- Pliki `android-admin/emanuel-admin-release.jks` i
  `android-admin/keystore.properties` są lokalne i ignorowane przez Git.
  Trzeba zachować ich bezpieczną kopię, bo bez nich kolejne wydanie nie
  zaktualizuje obecnej aplikacji.
- `android-admin/app/google-services.json` również jest lokalny i ignorowany
  przez Git. W razie utraty można pobrać go ponownie z ustawień aplikacji
  Android w Firebase.
- Telefon musi mieć usługi Google Play. Firebase działa tylko jako niewidoczny
  transport; powiadomienie wyświetla systemowa aplikacja `Emanuel Admin`, nie
  Chrome.

## Budowa dla programisty

Projekt znajduje się w `android-admin/`. Wymaga JDK 17 i Android SDK API 36.

```powershell
cd android-admin
.\gradlew.bat assembleRelease
```

Wynik: `android-admin/app/build/outputs/apk/release/app-release.apk`.
