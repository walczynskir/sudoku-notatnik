# Historia wydań

## 1.6.2

- OCR: adaptacyjny próg jasności zamiast stałego progu 150, usuwanie resztek krawędzi siatki i większe, wycentrowane obrazy cyfr.
- Ponowienie niepewnego odczytu w alternatywnych trybach segmentacji, z zachowaniem oryginalnego obrazu jako jednej z prób.
- Niepewne i nierozpoznane pola z wykrytym znakiem mają bursztynowe oznaczenie w podglądzie.
- W porównaniu na 9 wygenerowanych próbkach 4/6/9 wynik wzrósł z 5/9 do 9/9; nie stanowi to gwarancji skuteczności na zdjęciach.

## 1.6.1

- Usunięcie starych klas przycisków Cofnij i Przywróć z belki i jawne wyrównanie wymiarów pięciu akcji na telefonie.
- Wersjonowane adresy CSS i JavaScript, aby po aktualizacji nie mieszały się stare mobilne skrypty z nowym układem.

## 1.6.0

- Belka szybkich akcji nad planszą: Cofnij, Przywróć, Wczytaj, Zapisz i Więcej.
- Rozwijany import tekstu/JSON, obrazka i aparatu oraz menu czyszczenia i restartu.
- Wyraźniejsze przyciski eksportu i nowej planszy; usunięcie przykładu.
- Układ mobilny zachowuje klawiaturę przy planszy.

## 1.5.2

- Jawne, równe wysokości dziewięciu wierszy i szerokości kolumn planszy.
- Poprawka rozciągania wiersza z liczbami przy pustych pozostałych polach, widocznego w Chrome na telefonie.

## 1.5.1

- Wyraźny baner „Sudoku rozwiązane!” i zielone wyróżnienie poprawnie ukończonej planszy, bez dialogu.
- Komunikat znika po edycji lub cofnięciu; pełna plansza z konfliktem nie jest uznawana za rozwiązaną.

## 1.5.0

- Przycisk pojedynczych kandydatów wypełnia teraz kolejne pola aż do wyczerpania możliwości.
- Cała kaskada pozostaje jednym krokiem cofania/przywracania; sprzeczność w dowolnej rundzie anuluje całość.

## 1.4.0

- Przycisk wypełniający pola z jednym kandydatem w notatkach, w jednym kroku bez kaskady.
- Kontrola konfliktów przed zastosowaniem całej operacji, eliminacja wpisanych cyfr z notatek i wspólne cofanie/przywracanie.

## 1.3.0

- Przywracanie cofniętych zmian liczb, kandydatów i punktu restartu, także wielokrotnie.
- Przycisk przy Cofnij na komputerze i telefonie; skróty Ctrl+Shift+Z / ⌘Shift+Z i Ctrl+Y.
- Nowa edycja usuwa historię ponawiania.

## 1.2.0

- Rozwijana sekcja „Na czym polega?” pod nazwą techniki, z ogólną zasadą dla wszystkich ośmiu technik.
- Wyjaśnienie zasady nie ujawnia pól ani cyfr z planszy. Konkretny ruch pozostaje za osobnym przyciskiem.
- Sekcja jest domyślnie zwinięta i resetuje się po zmianie podpowiedzi.

## 1.1.0

- Podpowiedzi w dwóch etapach: najpierw technika, następnie opcjonalnie pola i wyjaśnienie.
- Jedyny kandydat, jedyne miejsce, zablokowani kandydaci, nagie i ukryte pary oraz trójki, X-Wing.
- Pomijanie wykonanych eliminacji i odtwarzanie logicznie potwierdzonego postępu.
- Poprawki wskazywania celów eliminacji; konkretne cyfry dla każdego pola.
- Rozróżnienie kolorów: wybrane pole ciemnozielone, pola techniki niebieskie, eliminacje bursztynowe.
- Dyskretny numer wersji w stopce, plik VERSION i kontrola zgodności wersji w CI.

## 1.0.0

- Plansza sudoku z liczbami i ręcznymi kandydatami, ich obliczaniem i automatyczną eliminacją po wpisaniu liczby.
- Cofanie, czyszczenie kandydatów i restart.
- Import tekstu, JSON, obrazka i zdjęcia z aparatu; eksport kopii JSON i zapis lokalny.
- Układ na telefon i komputer.
- Dokumentacja projektu, testy i automatyczna publikacja GitHub Pages po testach.
