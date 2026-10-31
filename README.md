# Sudoku · Notatnik

Statyczna strona po polsku. Uruchomienie: `python3 -m http.server 5173 --directory dist`, następnie http://localhost:5173.

Plansza 9 × 9, obliczanie i ręczna edycja kandydatów, podświetlanie konfliktów, cofanie, automatyczny zapis lokalny, import tekstu i obrazów oraz eksport kopii JSON z notatkami.

Import tekstu: 81 cyfr lub kropek (0 i kropka to puste pola), opcjonalne białe znaki i separatory |, przecinki. Import JSON przywraca również notatki. Kandydaci są przeliczani wyłącznie na żądanie, zastępując dotychczasowe notatki; operację można cofnąć.

OCR: ręczne dopasowanie kwadratowej ramki, rozpoznawanie i sprawdzenie wyniku przed zatwierdzeniem. Tesseract.js 5.1.1 z jsDelivr przetwarza obraz lokalnie; pierwsze użycie wymaga internetu do pobrania silnika i danych językowych. Skośne zdjęcia, cyfry odręczne i obrazki z kandydatami mogą dawać gorszy wynik. Czcionki Google Fonts mają fallback systemowy.

Weryfikacja: `node --check dist/app.js` i `node --test tests/logic.test.cjs`.
