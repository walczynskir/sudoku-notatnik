# Weryfikacja wydania 1.26.0

Zakres: wyłącznie repozytorium Sudoku. Domino nie było modyfikowane.

## Automatycznie

- `node --test tests/*.test.cjs`: 16 plików testów, bez błędów.
- `node --check` dla wszystkich publikowanych plików JS.
- `node scripts/version.mjs --check` i `git diff --check`.
- Test struktury potwierdza pojedyncze ID istniejących przycisków, ich wspólny pasek, brak pomocy w nagłówku, brak powtórzenia nowej gry w menu Wczytaj i zachowanie pięciu narzędzi panelu.
- Test pokazu sprawdza stan schowany przed uruchomieniem, start wyłącznie na żądanie, pauzę, nawigację, ujawnianie podpowiedzi, zatrzymywanie po zamknięciu i ukryciu karty oraz reset po ponownym otwarciu. Katalog nowych treści obejmuje wszystkie 10 języków.

## Przeglądarka — lokalny podgląd na osobnym porcie

Wymiary są rozmiarami widoku przeglądarki, nie testem fizycznego telefonu ani Safari.

| Szerokość | Język | Motyw | Tekst |
|---:|---|---|---|
| 320 px | polski | Porcelana | zwykły |
| 390 px | arabski / RTL | Porcelana | większy |
| 768 px | arabski / RTL | Atrament i papier | większy |
| 900 px | niemiecki | Szałwia | zwykły |
| 1024 px | polski | Energia | zwykły |

We wszystkich przypadkach: pełna widoczna etykieta pomocy, brak nachodzenia przycisków, brak poziomego przepełnienia dokumentu, Nowa gra po lewej, pomoc po prawej, pasek nad panelem i po jednym egzemplarzu obu przycisków.

Dodatkowo 375 px: Szałwia, Atrament i papier, Pracownia, Forma, Energia, Mandarynka, Porcelana, Ukraina i Wysoki kontrast — stały pasek, widoczna etykieta, pięć komend panelu, brak przepełnienia dokumentu. Sprawdzono kolor przycisku Nowa gra w Porcelanie po usunięciu starego przenoszenia między kontenerami.

## Zapis i rozgrywka

W osobnej lokalnej rozgrywce ukończono planszę Na początek przez wypełnianie pojedynczych: poprawne ukończenie, cel 1/3, suma 1/10 000 i plakietka samodzielności. Następnie wczytano kolejną planszę Łatwy z notatkami, otwarto i zamknięto pomoc oraz odświeżono stronę. Widoczna zawartość planszy z notatkami oraz opis licznika postępów pozostały identyczne. Nie zmieniano kluczy ani formatu zapisu.
