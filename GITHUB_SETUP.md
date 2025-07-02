# Instrukcje dodania projektu do GitHub

## Krok 1: Inicjalizacja repozytorium Git

W katalogu projektu wykonaj następujące polecenia:

```bash
# Inicjalizuj repozytorium Git
git init

# Dodaj wszystkie pliki do staging
git add .

# Wykonaj pierwszy commit
git commit -m "Initial commit: Portfolio website with PHP functionality"
```

## Krok 2: Utworzenie repozytorium na GitHub

1. Przejdź na https://github.com
2. Zaloguj się do swojego konta
3. Kliknij przycisk "New" lub "+" w prawym górnym rogu
4. Wybierz "New repository"
5. Wypełnij formularz:
   - **Repository name**: `emanuelw.pl`
   - **Description**: `Professional portfolio website with PHP functionality`
   - **Visibility**: Public (lub Private jeśli wolisz)
   - **NIE** zaznaczaj "Add a README file" (już mamy README.md)
   - **NIE** zaznaczaj "Add .gitignore" (już mamy .gitignore)
6. Kliknij "Create repository"

## Krok 3: Połączenie lokalnego repozytorium z GitHub

Po utworzeniu repozytorium na GitHub, skopiuj URL repozytorium i wykonaj:

```bash
# Dodaj remote origin (zastąp YOUR_USERNAME swoją nazwą użytkownika)
git remote add origin https://github.com/YOUR_USERNAME/emanuelw.pl.git

# Wypchnij kod na GitHub
git branch -M main
git push -u origin main
```

## Krok 4: Weryfikacja

1. Odśwież stronę repozytorium na GitHub
2. Sprawdź czy wszystkie pliki zostały przesłane:
   - index.php
   - styles.css
   - robots.txt
   - sitemap.xml
   - site.webmanifest
   - .gitignore
   - README.md
   - GITHUB_SETUP.md

## Krok 5: Konfiguracja GitHub Pages (opcjonalnie)

**UWAGA**: GitHub Pages nie obsługuje PHP. Jeśli chcesz hostować stronę na GitHub Pages:

1. Zmień nazwę `index.php` na `index.html`
2. Usuń kod PHP (zostaw tylko HTML/CSS/JS)
3. W ustawieniach repozytorium włącz GitHub Pages

**Alternatywnie** możesz użyć innych platform hostingowych obsługujących PHP:
- Heroku
- 000webhost
- InfinityFree
- Hostinger
- Nazwa.pl

## Przyszłe aktualizacje

Aby dodać nowe zmiany do repozytorium:

```bash
# Dodaj zmienione pliki
git add .

# Wykonaj commit z opisem zmian
git commit -m "Opis wprowadzonych zmian"

# Wypchnij zmiany na GitHub
git push origin main
```

## Przydatne polecenia Git

```bash
# Sprawdź status repozytorium
git status

# Zobacz historię commitów
git log --oneline

# Sprawdź różnice w plikach
git diff

# Cofnij zmiany w pliku (przed commit)
git checkout -- nazwa_pliku

# Zobacz remote repositories
git remote -v
```

## Troubleshooting

### Problem: "Permission denied (publickey)"
**Rozwiązanie**: Skonfiguruj klucze SSH lub użyj HTTPS z tokenem dostępu.

### Problem: "Repository not found"
**Rozwiązanie**: Sprawdź czy URL repozytorium jest poprawny i czy masz dostęp.

### Problem: "Updates were rejected"
**Rozwiązanie**: Wykonaj `git pull origin main` przed `git push`.

---

**Powodzenia z Twoim repozytorium GitHub! 🚀**