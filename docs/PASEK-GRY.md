# Pasek gry Sudoku

Wspólny pasek Games Chest w wydaniu 1.32.0.

Nowa gra znajduje się po lewej. Cofnij, Przywróć, pełny ekran, pomoc i ustawienia tworzą jedną grupę po prawej. Wczytaj, Zapisz i Więcej pozostają w panelu narzędziowym. Nie ma duplikatów Cofnij i Przywróć.

`dist/toolbar.css` i `dist/toolbar.js` adaptują wzorzec `garibaldka/dist/toolbar.css` oraz `fitToolbar` z `garibaldka/dist/app.js`. Pomiar odejmuje padding paska; kolejno chowa podpisy pomocy i pełnego ekranu, podpisy historii, a na końcu zamienia Nowa gra na +. Każdy przycisk zachowuje przetłumaczoną nazwę dostępną oraz minimum 44 × 44 px. Reguły historii i zapisu pozostają bez zmian.

W pełnym ekranie pasek ma szerokość obszaru gry, padding 8 px pionowo / 16 px poziomo, do 360 px — 8 px poziomo. Zewnętrzny obszar zachowuje safe-area.

Weryfikacja: `PLAYWRIGHT_PATH=... node tests/toolbar-browser.cjs`, szerokości 320, 390, 850 (poziom), 1280 px; polski, arabski RTL, A+, pełny ekran, dotykowe Cofnij/Przywróć, wznowienie po przeładowaniu i otwieranie ustawień klawiaturą. Testy reguł: `node --test tests/*.test.cjs`.

Preferencja „Cofnij i Przywróć” jest w Sudoku domyślnie włączona. Osobny klucz `sudoku-show-history` zachowuje wybór po odświeżeniu. Wyłączenie ukrywa oba przyciski i blokuje ich aktywację skrótami, nie usuwa historii. Ponowne włączenie przywraca oba przyciski i przelicza miejsce na podpisy. Opis dostępny przyciskiem ? jest przetłumaczony we wszystkich językach.
