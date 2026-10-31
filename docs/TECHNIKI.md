# Zakres technik Trenera Sudoku 1.x

| Rodzina | Obsługiwany zakres |
| --- | --- |
| Pojedyncze | Jedyny kandydat, jedyne miejsce dla cyfry |
| Przecięcia | Zablokowani kandydaci w obu kierunkach |
| Podzbiory | Nagie i ukryte pary, trójki, czwórki |
| Ryby | Podstawowe X-Wing, Swordfish, Jellyfish w obu orientacjach |
| Skrzydła | XY-Wing, XYZ-Wing, W-Wing |
| Jednoznaczność | Unique Rectangle typy 1, 2, 4, wyłącznie po potwierdzeniu jednego rozwiązania |
| Kolorowanie | Simple Coloring: pułapka i sprzeczność |
| Łańcuchy | X-Chain, XY-Chain i proste AIC do 11 połączeń |

Najpierw wyświetlana jest nazwa techniki. Ogólne wyjaśnienie można rozwinąć niezależnie od ujawnienia pól. Niebieskie pola tworzą dowód, bursztynowe wskazują eliminacje. Podpowiedź nie wykonuje ruchu automatycznie.

Dla łańcuchów opis podaje kolejne pola i cyfry: `=` oznacza silne połączenie, `—` słabe. Dwie grupy kolorowania są wypisane w opisie; podświetlenie źródeł pozostaje niebieskie.

## Granice obecnej implementacji

Nie jest to katalog wszystkich wariantów znanych w Sudoku. Nie obejmuje finned/sashimi i złożonych ryb, pozostałych typów UR, grouped AIC, pełnych pętli, ALS ani forcing nets. Te rozszerzenia mogą nadal trafiać do 1.x. Brak podpowiedzi oznacza brak ruchu znalezionego przez obsługiwane reguły, nie dowód nierozwiązywalności.

Łańcuchy są ograniczone do 11 połączeń; nie tworzą węzłów grupowych ani sieci. Test jednoznaczności ma limit 200 000 węzłów: gdy nie ukończy analizy, UR są pomijane. Licznik rozwiązań nie podaje cyfr jako podpowiedzi.

## Wersja 2

Osobny zakres: generator plansz wymagających wybranej techniki, ćwiczenia i ścieżki nauki. Konta, zapisy postępów oraz płatny dostęp pozostają decyzjami przyszłego etapu; obecna aplikacja pozostaje bez paywalla.

Podstawy definicji: [HoDoKu — Chains and Loops](https://hodoku.sourceforge.net/en/tech_chains.php).
