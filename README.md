# Trener Sudoku

Prosta aplikacja internetowa po polsku do samodzielnego rozwiązywania sudoku 9 × 9. Pozwala wpisywać liczby, obliczać i edytować kandydatów oraz wczytywać plansze z tekstu, plików i zdjęć. Podpowiedzi najpierw ujawniają tylko technikę, a na życzenie pola i wyjaśnienie. Interfejs, komunikaty i wyjaśnienia technik są dostępne po polsku, angielsku, hiszpańsku, niemiecku i w chińskim uproszczonym. Język można wybrać w nagłówku. Aplikacja wcześniej nosiła nazwę Sudoku · Notatnik; adresy, repozytorium i zapisane dane pozostają takie same.

**Strona:** https://rsudoku.pl/

**GitHub Pages:** https://walczynskir.github.io/sudoku-notatnik/

**Starsza kopia, nieaktualizowana automatycznie (Sites):** https://sudoku-notatnik-rw.deluxemonk1.chatgpt.site/

Aplikacja działa w przeglądarce, bez backendu, kont i bazy danych. Każdy użytkownik ma własny stan na swoim urządzeniu.

## Dokumentacja

- [Instrukcja użytkownika](docs/INSTRUKCJA.md) — wpisywanie, kandydaci, import, aparat, zapis i cofanie.
- [Języki i tłumaczenia](docs/JEZYKI.md) — wybór języka i rozwijanie katalogu tłumaczeń.
- [Techniki i ich wyjaśnienia](docs/TECHNIKI.md) — obsługiwane warianty, zasady, ograniczenia i podział v1/v2.
- [Założenia i ograniczenia](docs/ZALOZENIA.md) — zakres produktu, prywatność i dokładne zasady działania.
- [Rozwój i publikacja](docs/ROZWOJ.md) — struktura kodu, testy, hosting i dalsze kierunki.

## Uruchomienie lokalne

Wymagania: Python 3 do serwera lokalnego. Node.js z obsługą `node:test` do testów (zweryfikowano na Node.js 22). Do używania opublikowanej strony wystarczy przeglądarka.

```bash
git clone https://github.com/walczynskir/sudoku-notatnik.git
cd sudoku-notatnik
python3 -m http.server 5173 --directory dist
```

Otwórz http://localhost:5173/. Zatrzymanie serwera: `Ctrl+C`.

Nie potrzeba `npm install`, kompilacji ani kluczy API. OCR pobiera bibliotekę i dane z internetu przy pierwszym użyciu; fonty również są zewnętrzne. Repozytorium jest publiczne.

## Sprawdzenie kodu

```bash
node --check dist/app.js
node --check dist/camera.js
node --check dist/logic.js
node --check dist/hints.js
node --check dist/ocr.js
node scripts/version.mjs --check
node --test tests/*.test.cjs
```

Testy obejmują reguły kandydatów, konflikty, import, historię, techniki (również zaawansowane i jednoznaczność), przygotowanie obrazów do OCR, przegląd wyników, przeciąganie i zmianę rozmiaru kadru, prostowanie zdjęcia oraz cykl życia i przełączanie kamery z atrapą urządzenia. Rzeczywisty aparat, jakość OCR i układ na fizycznych telefonach wymagają testów ręcznych.

## Hosting

Do publikacji wystarcza **zawartość katalogu `dist/`**. GitHub Actions sprawdza składnię i testy przy zmianach na `main` i pull requestach. Po udanych testach zmiana na `main` jest automatycznie publikowana na GitHub Pages. Dostępne jest także ręczne uruchomienie w zakładce Actions. Obie publikacje działają niezależnie od komputera właściciela. Poprzednia strona Sites nie aktualizuje się automatycznie z GitHuba. Szczegóły: [Rozwój i publikacja](docs/ROZWOJ.md).

## Licencja

Nie wybrano jeszcze licencji dla kodu projektu. Publiczny dostęp do aplikacji nie oznacza udzielenia licencji open source na jej kod. Zależności zewnętrzne podlegają własnym licencjom.

## Wersje

Aktualne wydanie: **1.12.1**, numer również w stopce strony. Stosujemy `MAJOR.MINOR.PATCH`, tagi `vX.Y.Z` i [historię zmian](CHANGELOG.md). Procedura: [Wersjonowanie](docs/ROZWOJ.md#wersjonowanie).

Wersja 1.x obejmuje analizę i wyjaśnienia technik, także Unique Rectangles, kolorowania i łańcuchów. Dokładne warianty i ograniczenia: [Zakres technik](docs/TECHNIKI.md). Generowanie plansz do nauki, ścieżki treningowe i ewentualny płatny dostęp są planowane na wersję 2; nie są częścią obecnej aplikacji.
