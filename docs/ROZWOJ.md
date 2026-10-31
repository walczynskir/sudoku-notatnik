# Rozwój i publikacja

## Struktura

| Plik | Odpowiedzialność |
| --- | --- |
| `dist/index.html` | Struktura strony i okna dialogowe |
| `dist/style.css` | Wygląd i układ responsywny |
| `dist/logic.js` | Reguły sudoku, kandydaci, konflikty, walidacja i parser importu |
| `dist/app.js` | Stan, historia, zapis lokalny, zdarzenia, import/eksport, OCR i przenoszenie sterowania na telefonie |
| `dist/hints.js` | Niezależna od notatek analiza technik; wynik z nazwą, polami źródłowymi, celami eliminacji i wyjaśnieniem |
| `tests/hints.test.cjs` | Przykłady czterech technik, kolejność, poprawność względem znanego rozwiązania, stany błędów |
| `dist/camera.js` | Sesja kamery, jej zwalnianie i zrobienie zdjęcia |
| `tests/logic.test.cjs` | Testy reguł i formatów danych |
| `tests/camera.test.cjs` | Testy cyklu życia kamery z atrapą MediaDevices |
| `.openai/hosting.json` | Tożsamość istniejącej strony Sites i katalog publikacji |

Katalog `dist/` zawiera bezpośrednio edytowane źródła do publikacji, mimo nazwy sugerującej wynik kompilacji. Nie ma generatora ani procesu build.

## Model danych

```js
{
  values: [/* 81 liczb całkowitych 0–9; 0 = puste pole */],
  notes: [/* 81 tablic z kandydatami 1–9 */]
}
```

Indeksy są wierszami: `wiersz = Math.floor(i / 9)`, `kolumna = i % 9`. Obie współrzędne w kodzie liczone od zera. Eksport JSON dodaje `format: "sudoku-notatnik-v1"`; parser waliduje pola `values` i `notes`, nie wymaga tego znacznika formatu. Brak `notes` daje puste notatki. Walidacja usuwa duplikaty kandydatów i notatki z zajętych pól.

W `app.js` stan bieżący to `state`, punkt restartu to `initial`. Funkcja `change(fn)` zapisuje obie struktury w historii przed zmianą, a następnie zapisuje dane i odświeża interfejs. Nowe operacje edycji należy prowadzić przez tę funkcję. Zachowaj rozdział między ręcznymi notatkami a pełnym przeliczeniem kandydatów.

## Zależności i zgodność

- Tesseract.js 5.1.1 jest ładowany na żądanie z CDN; silnik pobiera także zasoby WebAssembly i dane językowe.
- Fonty: DM Sans i Manrope z Google Fonts, z fallbackiem sans-serif.
- Potrzebna współczesna przeglądarka z obsługą m.in. dialog, canvas, createImageBitmap, structuredClone, matchMedia i localStorage. Dostosowanie planszy używa jednostek `svh`.
- Kamera w hostingu wymaga HTTPS i zgody użytkownika. Osadzenie strony może dodatkowo ograniczyć dostęp do kamery.
- Nie ma gwarancji działania offline ani wspierania starych przeglądarek.

## Weryfikacja zmiany

Uruchom polecenia kontroli składni i testy z README. Następnie ręcznie sprawdź funkcje związane ze zmianą. Dla większych zmian interfejsu przydatna jest poniższa lista:

- Wpisanie, zastąpienie i usunięcie liczby; kandydaci w wierszu, kolumnie i bloku; zachowanie ręcznych wykluczeń.
- Ręczna edycja, pełne przeliczenie i wyczyszczenie kandydatów.
- Cofnięcie wpisu, importu, restartu i czyszczenia.
- Eksport/import JSON; nieprawidłowy tekst bez utraty obecnej planszy.
- Odświeżenie i odtworzenie zapisu; reset historii po przeładowaniu.
- Widok telefonu (np. 360 × 640), komputer i zmiana orientacji. Sterowanie powinno istnieć w jednej kopii i zachowywać działanie po przeniesieniu.
- Aparat: odmowa zgody, zamknięcie przed udzieleniem zgody, zdjęcie i przejście do OCR, powrót do strony.

Testy kamery nie używają prawdziwego sprzętu. Test zapisu migawki nie zastępuje pełnego testu integracyjnego przycisku Cofnij. Dotychczasowy podgląd mobilny był symulowany w przeglądarce, nie na fizycznym telefonie.

## GitHub i obecna strona

Repozytorium: https://github.com/walczynskir/sudoku-notatnik (publiczne).

Strona: https://sudoku-notatnik-rw.deluxemonk1.chatgpt.site/ (publiczna).

GitHub Pages: https://walczynskir.github.io/sudoku-notatnik/.

Workflow `.github/workflows/pages.yml` uruchamia kontrolę składni i testy na Node.js 22 przy pushu na `main`, pull requestach do `main` i ręcznym uruchomieniu. Zadanie publikacji zależy od poprawnego zakończenia testów i działa wyłącznie dla `main`, poza zdarzeniem pull request. Publikuje tylko `dist/`; nie wymaga własnego tokenu ani sekretów. GitHub udostępnia krótkotrwałe uprawnienia Pages/OIDC.

Postęp: zakładka Actions → Testy i publikacja. Ręcznie: Run workflow → main. Przy błędzie testów publikacja nie ruszy i dotychczasowa wersja zostanie dostępna. Testy nie gwarantują jakości OCR ani poprawności na wszystkich telefonach. Przywrócenie starszej wersji: revert odpowiedniego commita i push na `main`, co ponownie uruchomi testy i publikację.

GitHub Pages i wcześniejsza strona Sites to dwa oddzielne miejsca. Automatyzacja aktualizuje tylko GitHub Pages. W lokalnym repozytorium remote `github` wskazuje GitHub; publikacja Sites korzysta z osobnego repozytorium zarządzanego przez Sites. Nie przełączaj ich automatycznie ani nie używaj force push.

Kod po zmianie można zapisać do istniejącego repozytorium:

```bash
git add README.md docs dist tests
git commit -m "Opis zmiany"
git push github main
```

Przy pracy zespołowej preferuj osobną gałąź i pull request. Przed wypchnięciem sprawdź `git status` i diff. Nie dodawaj tokenów, danych sesji przeglądarki ani prywatnych zdjęć.

Publikacja w Sites wymaga zapisania wersji odpowiadającej wysłanemu commitowi źródłowemu oraz wdrożenia jej z archiwum zawierającym `dist/` i manifest hostingu. Narzędzia Sites w Codex obsługują ten proces. Zachowaj istniejący identyfikator projektu i publiczny dostęp, chyba że właściciel zleci zmianę.

## Inny hosting

Na hostingu statycznym opublikuj zawartość `dist/`, tak aby `index.html` był dokumentem startowym. Nie publikuj całego repozytorium ani katalogu `.git`. Zapewnij HTTPS dla kamery. Nie trzeba konfigurować serwera aplikacyjnego ani zmiennych środowiskowych.

Zmiana adresu strony oznacza inną przestrzeń localStorage. Przed przeniesieniem wyeksportuj planszę do JSON i zaimportuj ją pod nowym adresem. Import nie przenosi historii cofania ani oryginalnego punktu restartu.
