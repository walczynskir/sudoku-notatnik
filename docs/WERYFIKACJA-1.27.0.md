# Weryfikacja 1.27.0 — Preferencje gry

Zakres: wyłącznie Sudoku, bez modyfikacji Domino.

## Automatycznie

- Pełen zestaw testów, składnia publikowanych plików JS, zgodność VERSION i odnośników oraz `git diff --check`.
- Nowe testy: wspólny zapis kandydatów i odtworzenie po ponownym uruchomieniu, odporność na odtwarzanie stanu formularza, synchronizacja z biblioteką, brak zmian w istniejącej grze, działanie w pamięci przy niedostępnym zapisie.
- Nowe testy: własny cel, odrzucanie wartości ułamkowych, wyłączenie celu bez utraty wyników i nagród, synchronizacja z trackerem, opt-out postępów i dotychczasowy klucz oznaczania błędów.
- Statyczne treści panelu i nowe objaśnienia objęte istniejącą weryfikacją wszystkich dziesięciu języków.

## Przeglądarka — osobny lokalny port

- Ustawienie kandydatów w preferencjach widoczne w Nowej grze. Odznaczenie w Nowej grze widoczne w preferencjach. Zapis przetrwał odświeżenie.
- Własny cel 2, wpisany klawiaturą i zatwierdzony zakończeniem edycji, widoczny w Moich postępach. Zmiana na 5 w Moich postępach widoczna w preferencjach.
- Dwie różne plansze Na początek rozwiązane przez wypełnianie pojedynczych: pierwsza bez pomocy, druga po włączeniu i wyłączeniu oznaczania błędów. Statystyki: 1 bez podpowiedzi, 1 z pomocą. Cel 2 ukończony, 1 pucharek.
- Wyłączenie celu i odświeżenie: nadal 2 ukończenia i 1 pucharek. Kontrolka pokazuje Bez celu.
- Kolejna, rozpoczęta plansza z notatkami: wyłączenie kandydatów dla nowych gier i włączenie oznaczania, potem odświeżenie. Widoczna plansza, notatki i licznik postępów identyczne. Checkbox oznaczania pozostał włączony, kandydatów wyłączony.
- Widoki 320 px / PL / Porcelana / zwykły tekst, 390 px / DE / Atrament i papier / większy tekst oraz 768 px / AR / Porcelana / większy tekst: brak nachodzenia przycisków, brak poziomego przepełnienia dokumentu i panelu preferencji, pełna etykieta pomocy. Sprawdzono także wysoki kontrast z większym tekstem i RTL.

To kontrola rozmiarów widoku przeglądarki, nie test fizycznego telefonu ani Safari.
