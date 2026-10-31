# Sudoku · Notatnik

Statyczna strona po polsku. Uruchomienie: `python3 -m http.server 5173 --directory dist`, następnie http://localhost:5173.

Plansza 9 × 9, obliczanie i ręczna edycja kandydatów, podświetlanie konfliktów, cofanie, automatyczny zapis lokalny, import tekstu i obrazów oraz eksport kopii JSON z notatkami.

Import tekstu: 81 cyfr lub kropek (0 i kropka to puste pola), opcjonalne białe znaki i separatory |, przecinki. Import JSON przywraca również notatki. Wpisanie liczby automatycznie usuwa ją z kandydatów w tym samym wierszu, kolumnie i bloku 3 × 3, zachowując pozostałe ręczne notatki. Całość można cofnąć jednym krokiem. Usunięcie lub zastąpienie liczby nie przywraca wcześniej usuniętych kandydatów; przycisk „Oblicz kandydatów” odtwarza wszystkie dozwolone możliwości, zastępując ręczne notatki.

OCR: ręczne dopasowanie kwadratowej ramki, rozpoznawanie i sprawdzenie wyniku przed zatwierdzeniem. Tesseract.js 5.1.1 z jsDelivr przetwarza obraz lokalnie; pierwsze użycie wymaga internetu do pobrania silnika i danych językowych. Skośne zdjęcia, cyfry odręczne i obrazki z kandydatami mogą dawać gorszy wynik. Czcionki Google Fonts mają fallback systemowy.

Weryfikacja: `node --check dist/app.js` i `node --test tests/logic.test.cjs`.

Cofanie obejmuje liczby i kandydatów, bez ustalonego limitu liczby zmian w bieżącej sesji. Odświeżenie strony rozpoczyna nową historię; aktualna plansza pozostaje zapisana.

Wyczyść kandydatów usuwa wyłącznie notatki. Restartuj sudoku przywraca liczby z ostatniego importu/przykładu, bez kandydatów; nowa ręcznie tworzona plansza restartuje do pustej. Stan początkowy jest zapisany lokalnie. Przy pierwszym uruchomieniu po tej aktualizacji zastana plansza staje się punktem restartu. Obie operacje można cofnąć. Cofnij jest w panelu narzędzi, obsługuje również Ctrl+Z / ⌘Z.
