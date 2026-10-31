# Sudoku · Notatnik

Prosta aplikacja internetowa po polsku do samodzielnego rozwiązywania sudoku 9 × 9. Pozwala wpisywać liczby, obliczać i edytować kandydatów oraz wczytywać plansze z tekstu, plików i zdjęć.

**Działająca strona:** https://sudoku-notatnik-rw.deluxemonk1.chatgpt.site/

Aplikacja działa w przeglądarce, bez backendu, kont i bazy danych. Każdy użytkownik ma własny stan na swoim urządzeniu.

## Dokumentacja

- [Instrukcja użytkownika](docs/INSTRUKCJA.md) — wpisywanie, kandydaci, import, aparat, zapis i cofanie.
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

Nie potrzeba `npm install`, kompilacji ani kluczy API. OCR pobiera bibliotekę i dane z internetu przy pierwszym użyciu; fonty również są zewnętrzne. Dla dostępu do prywatnego repozytorium GitHub wymaga uprawnień.

## Sprawdzenie kodu

```bash
node --check dist/app.js
node --check dist/camera.js
node --check dist/logic.js
node --test tests/*.test.cjs
```

Testy obejmują reguły kandydatów, konflikty, import i cykl życia kamery z atrapą urządzenia. Rzeczywisty aparat, jakość OCR i układ na fizycznych telefonach wymagają testów ręcznych.

## Hosting

Do publikacji wystarcza **zawartość katalogu `dist/`**. Obecna wersja jest hostowana przez Sites; wyłączenie komputera właściciela nie wyłącza strony. GitHub przechowuje kod — samo przesłanie zmian do tego repozytorium nie aktualizuje obecnej strony. Szczegóły: [Rozwój i publikacja](docs/ROZWOJ.md).

## Licencja

Nie wybrano jeszcze licencji dla kodu projektu. Publiczny dostęp do aplikacji nie oznacza udzielenia licencji open source na jej kod. Zależności zewnętrzne podlegają własnym licencjom.
