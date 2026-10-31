# Historia wydań

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
