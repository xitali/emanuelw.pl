# Odzyskanie dostępu administratora

Po wdrożeniu zmian uruchom dwuklikiem `scripts/Reset-hasla-admina.cmd` lub w terminalu folderu projektu `npm run admin:reset`.

Wpisz nowe hasło dwa razy (znaki są niewidoczne), następnie wpisz RESET. Minimum 12 znaków, maksimum 72 bajty UTF-8. Nie wklejaj hasła do czatu ani polecenia. Ctrl+C anuluje operację.

Narzędzie korzysta z istniejącej lokalnej konfiguracji bazy, nie zapisuje hasła do pliku. Przy wielu kontach prosi o wybór. Reset unieważnia poprzednie sesje WWW i aplikacji Android; trzeba zalogować się ponownie. Nie usuwa projektów ani wiadomości.

Przed użyciem musi być zastosowana migracja 010 oraz wdrożona nowa wersja obsługi sesji. Hasło ustawiasz samodzielnie; nie jest generowane przez agenta.
