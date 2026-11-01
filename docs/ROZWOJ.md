# Rozwój i publikacja

## Struktura

| Plik | Odpowiedzialność |
| --- | --- |
| `dist/index.html` | Struktura strony i okna dialogowe |
| `dist/style.css` | Wygląd i układ responsywny |
| `dist/logic.js` | Reguły sudoku, kandydaci, konflikty, walidacja i parser importu |
| `dist/app.js` | Stan, historia, zapis lokalny, zdarzenia, import/eksport, OCR i przenoszenie sterowania na telefonie |
| `dist/library.js` | Biblioteka plansz, dzień UTC i lokalna lista ukończeń |
| `scripts/import-puzzles.mjs` | Import i walidacja źródła na czterech wątkach |
| `tests/library.test.cjs` | Integralność i unikalność 10 000 plansz oraz próbki pełnej ścieżki podpowiedzi |
| `dist/locales.js` | Katalog tłumaczeń czterech języków względem polskich źródeł |
| `dist/i18n.js` | Dobór języka, lokalizacja komunikatów i warstwa DOM bez zmiany danych |
| `tests/i18n.test.cjs` | Kompletność tłumaczeń, wartości dynamiczne, etykiety i przełączanie |
| `dist/hints.js` | Niezależna od notatek analiza technik; wynik z nazwą, polami źródłowymi, celami eliminacji i wyjaśnieniem |
| `tests/hints.test.cjs` | Przykłady technik, X-Wing w obu orientacjach, kolejność, odtwarzanie eliminacji, poprawność względem znanego rozwiązania, stany błędów |
| `dist/camera.js` | Sesja kamery, jej zwalnianie i zrobienie zdjęcia |
| `dist/ocr.js` | Przygotowanie obrazu komórek i strategia ponawiania odczytów |
| `tests/advanced-hints.test.cjs` | Czwórki, skrzydła, ryby, UR, kolorowanie, łańcuchy i poprawność względem znanych rozwiązań |
| `tests/ocr.test.cjs` | Przetwarzanie pikseli oraz wybór wyniku OCR |
| `tests/ocr-review.test.cjs` | Przegląd wyniku, ponowne zdjęcie, przesuwanie i rozmiar kadru, drobny obrót |
| `tests/history.test.cjs` | Cofanie, przywracanie oraz migawki planszy i punktu restartu |
| `scripts/version.mjs` | Spójny numer wersji i odświeżanie adresów zasobów |
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

Strona docelowa: https://rsudoku.pl/ (publiczna, GitHub Pages).

Starsza kopia Sites: https://sudoku-notatnik-rw.deluxemonk1.chatgpt.site/ — oddzielna publikacja, może zawierać starszy kod.

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

Silnik `hints.js`: generator `deductions(notes, options)` emituje ruchy w ustalonej kolejności; eliminacje mają listę `removals: [{cell, digits}]`. `findHint(values, manualNotes)` buduje bazowe możliwości z liczb i filtruje cele według notatek. Całkowicie wykonane, udowodnione eliminacje odtwarza na roboczej kopii kandydatów, po czym ponawia analizę. Każdy taki krok usuwa co najmniej jednego kandydata; limit 730 przebiegów przekracza maksymalną liczbę 729 kandydatów. Pusty notatnik nie uruchamia odtwarzania. Dane użytkownika pozostają bez zmian.

## Wersjonowanie

Stosujemy schemat `MAJOR.MINOR.PATCH` (np. `1.1.0`):

- MAJOR: zmiana niezgodna z dotychczasowym użyciem lub formatem danych.
- MINOR: nowe funkcje zgodne z dotychczasowym działaniem.
- PATCH: poprawki błędów i drobne korekty wyglądu.

Wersja wydania jest w `VERSION`, widoczna również w stopce. Przygotowanie wydania:

```bash
node scripts/version.mjs 1.1.1
node scripts/version.mjs --check
node --test tests/*.test.cjs
```

Zaktualizuj także `CHANGELOG.md`, zapisz zmiany w commicie, po udanych kontrolach oznacz ten commit adnotowanym tagiem `v1.1.1` i wyślij commit oraz tag do GitHuba. Nie przenoś istniejących tagów na inne commity. Przykładowy numer powyżej nie oznacza istniejącego wydania.

CI sprawdza zgodność stopki z VERSION. Numery są nadawane świadomie przy wydaniu, nie przy każdym commicie. Push na main publikuje stronę po testach; sam tag nie uruchamia osobnej publikacji. Historia zmian: `CHANGELOG.md`. Dane użytkownika i eksport JSON mają osobne oznaczenie formatu `sudoku-notatnik-v1`, niezależne od numeru aplikacji.

OCR: `dist/ocr.js` zawiera adaptacyjny próg Otsu, analizę składowych obrazu pola do usunięcia linii siatki, normalizację cyfry z białym marginesem i ponowienia PSM 10/13/8 dla niepewnych wyników. Pierwszy odczyt z oceną co najmniej 92 kończy próby; inaczej wynik wybierany jest według zgodności prób, następnie pewności. Rozbieżność lub pewność poniżej 75 oznacza pole jako niepewne. Puste pole z wykrytym znakiem także wymaga sprawdzenia. Oceny silnika nie są skalibrowanym prawdopodobieństwem poprawności. Testy `tests/ocr.test.cjs` obejmują przygotowanie pikseli i strategię ponowień.

Dla niepewnych wyników OCR uruchamiany jest na żądanie drugi worker Tesseract (OEM 0, legacyCore/legacyLang, osobny cache). Wynik tego silnika zastępuje pierwszy tylko przy zgodności cyfry z obrazu oryginalnego i binarnego oraz wystarczającej ocenie pewności. Pobranie zasobów drugiego silnika zwiększa pierwsze użycie OCR i zużycie pamięci; po analizie oba workery są zamykane. Test rzeczywistego przykładu użytkownika wykonano lokalnie, bez dodawania prywatnego obrazu do repozytorium i bez wysyłania go do usług OCR.

## Techniki i bezpieczeństwo jednoznaczności

Generator `deductions(notes, options)` obsługuje techniki wymienione w TECHNIKI.md. UR są włączane przez leniwe `isUnique` po potwierdzeniu `solutionCount(values).count === 1 && complete`. Licznik MRV/backtracking ma limit 200 000 węzłów, nie modyfikuje wejścia i nie przekazuje rozwiązania do podpowiedzi. Wynik dla ostatniej planszy jest buforowany.

Łańcuchy budują graf słabych i silnych zależności kandydatów. BFS przeplata fałsz i prawdę do 11 połączeń; kandydaci wykluczający oba końce są eliminowani. XY-Chain wymaga tej samej cyfry na obu końcach. Regresje sprawdzają konkretne dowody i zachowanie znanych rozwiązań także po poprawnych redukcjach kandydatów.

Dawna gałąź `codex/v2-techniques` pozostaje archiwalnym punktem odniesienia. Jej techniki są od 1.11.0 częścią 1.x; generowanie treningowe pozostaje na wersję 2.


## Zdjęcie, kadr i prostowanie

`originalPhoto` przechowuje bitmapę bazową, a `photo` obraz używany przez podgląd, miniaturę i OCR. Drobna korekta kąta rysuje oryginał na nowym canvasie o tych samych wymiarach (białe narożniki), bez kumulowania kolejnych obrotów. Obrót 90° tworzy nowy obraz bazowy i resetuje kadr. Korekta perspektywy nie jest zaimplementowana.

Współrzędne gestu są przeliczane przez `photoPoint`, z uwzględnieniem pustych pasów wynikających z `object-fit: contain`. Przeciąganie narożnika zachowuje przeciwległy narożnik i ogranicza kwadrat do rozmiarów zdjęcia. Zmiany kadru lub kąta ukrywają poprzedni odczyt; podczas OCR edycja jest zablokowana. Wybór innej kamery zamyka poprzedni strumień, a numer żądania zapobiega przyjęciu opóźnionego strumienia.

Lokalizacja: [Języki i tłumaczenia](JEZYKI.md). Skrypt wersjonowania aktualizuje również adresy `locales.js` i `i18n.js`, aby zapobiec mieszaniu starych i nowych tłumaczeń.

Biblioteka i jej audyt: [Biblioteka łamigłówek](BIBLIOTEKA.md). Odpowiedzi źródłowe nie są dołączane do danych biblioteki, a źródłowe oceny nie zmieniają rankingu naszego analizatora.
