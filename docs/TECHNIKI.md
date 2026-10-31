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

## Zasady poszczególnych technik

### Jedyny kandydat

W pustym polu zostaje tylko jedna możliwa cyfra po wykluczeniu liczb obecnych w jego wierszu, kolumnie i kwadracie. Można wpisać tę cyfrę.

### Jedyne miejsce dla cyfry

W wierszu, kolumnie lub kwadracie dana cyfra może trafić tylko do jednego pola. Nawet jeśli to pole ma kilku kandydatów, tę cyfrę można w nim wpisać.

### Zablokowani kandydaci

Jeśli wszystkie miejsca dla cyfry w kwadracie leżą w jednym wierszu lub kolumnie, usuń ją z pozostałych pól tego wiersza lub kolumny poza kwadratem. Działa też odwrotnie: jeśli wszystkie miejsca dla cyfry w wierszu lub kolumnie leżą w jednym kwadracie, usuń ją z pozostałych pól tego kwadratu.

### Naga para

Dwa pola w tym samym wierszu, kolumnie lub kwadracie mają dokładnie tych samych dwóch kandydatów. Te cyfry zajmą te dwa pola, więc można usunąć je z kandydatów w pozostałych polach tej jednostki.

### Ukryta para

Dwie cyfry mogą wystąpić wyłącznie w tych samych dwóch polach wiersza, kolumny lub kwadratu. Te pola są dla nich zarezerwowane, więc można usunąć z nich wszystkich pozostałych kandydatów.

### Naga trójka

Trzy pola w jednym wierszu, kolumnie lub kwadracie zawierają łącznie tylko trzy różne cyfry. Każde pole może mieć dwóch lub trzech kandydatów. Te cyfry zajmą te trzy pola, więc usuń je z pozostałych pól tej jednostki.

### Ukryta trójka

Trzy cyfry mogą występować tylko w tych samych trzech polach wiersza, kolumny lub kwadratu. Można usunąć z tych pól pozostałych kandydatów. Nie każda z tych trzech cyfr musi występować w każdym z trzech pól.

### Naga czwórka

Cztery pola w jednej jednostce mają łącznie tylko cztery różne cyfry. Zajmą one te pola, więc można usunąć je z pozostałych pól jednostki.

### Ukryta czwórka

Cztery cyfry występują wyłącznie w czterech polach jednostki. Usuń z tych czterech pól pozostałych kandydatów.

### X-Wing

W dwóch wierszach dana cyfra ma dokładnie po dwa możliwe miejsca, w tych samych dwóch kolumnach. Powstaje prostokąt: cyfra musi zająć przeciwległe rogi, więc usuń ją z pozostałych pól obu kolumn. Reguła działa też po zamianie wierszy z kolumnami.

### XY-Wing

Centrum ma parę XY, a dwa widzące je skrzydła pary XZ i YZ. Bez względu na cyfrę centrum jedno skrzydło ma Z, więc usuń Z z pól widzących oba skrzydła.

### XYZ-Wing

Centrum ma XYZ, a widzące je skrzydła XZ i YZ. Usuń Z tylko z pól widzących wszystkie trzy pola: centrum i oba skrzydła.

### W-Wing

Dwa pola z taką samą parą kandydatów są połączone silnym połączeniem jednej cyfry: w jednostce są dla niej tylko dwa miejsca. Jeden koniec widzi pierwszą parę, drugi drugą. Druga cyfra pary musi wystąpić w co najmniej jednym z tych pól; usuń ją ze wspólnych sąsiadów.

### Swordfish

W trzech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych trzech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.

### Jellyfish

W czterech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych czterech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.

### Unique Rectangle typ 1

Tylko dla planszy z potwierdzonym jednym rozwiązaniem: cztery rogi prostokąta w dwóch blokach nie mogą tworzyć tej samej dwucyfrowej pary. Jeśli trzy rogi są taką parą, usuń obie cyfry z czwartego.

### Unique Rectangle typ 2

Dwa rogi prostokąta są tą samą parą, a dwa pozostałe mają dodatkowo tę samą trzecią cyfrę. Przy potwierdzonej jednoznaczności co najmniej jeden z dodatkowych rogów musi zawierać tę cyfrę. Usuń ją ze wspólnych sąsiadów tych rogów.

### Unique Rectangle typ 4

Przy potwierdzonej jednoznaczności: dwa rogi są parą, a pozostałe dwa są połączone silnym połączeniem jednej cyfry pary w jednostce. Usuń drugą cyfrę pary z tych dwóch dodatkowych rogów.

### Kolorowanie — pułapka

Połącz silne pary jednej cyfry i przypisz przeciwne grupy kolejnym końcom. Jedna grupa musi być prawdziwa. Kandydat poza łańcuchem, który widzi obie grupy, jest niemożliwy.

### Kolorowanie — sprzeczność

Pokoloruj naprzemiennie końce silnych połączeń jednej cyfry. Jeśli dwa pola tej samej grupy widzą się wzajemnie, wszystkie kandydaty tej grupy są fałszywe.

### X-Chain

Łańcuch jednej cyfry przeplata silne i słabe połączenia, zaczynając i kończąc silnym. Co najmniej jeden z końców jest prawdziwy. Usuń tę cyfrę z pól widzących oba końce.

### XY-Chain

Łańcuch pól z dwiema cyframi wykorzystuje silną zależność wewnątrz pola i słabe połączenia tej samej cyfry między polami. Jeśli oba końce reprezentują tę samą cyfrę, usuń ją ze wspólnych sąsiadów.

### AIC

Naprzemienny łańcuch wnioskowania łączy silne i słabe zależności między kandydatami. Gdy z fałszywości pierwszego wynika prawdziwość ostatniego, kandydat wykluczający oba końce musi być fałszywy. Ta wersja analizuje proste łańcuchy do 11 połączeń, bez grup i sieci.

## Granice obecnej implementacji

Nie jest to katalog wszystkich wariantów znanych w Sudoku. Nie obejmuje finned/sashimi i złożonych ryb, pozostałych typów UR, grouped AIC, pełnych pętli, ALS ani forcing nets. Te rozszerzenia mogą nadal trafiać do 1.x. Brak podpowiedzi oznacza brak ruchu znalezionego przez obsługiwane reguły, nie dowód nierozwiązywalności.

Łańcuchy są ograniczone do 11 połączeń; nie tworzą węzłów grupowych ani sieci. Test jednoznaczności ma limit 200 000 węzłów: gdy nie ukończy analizy, UR są pomijane. Licznik rozwiązań nie podaje cyfr jako podpowiedzi.

## Wersja 2

Osobny zakres: generator plansz wymagających wybranej techniki, ćwiczenia i ścieżki nauki. Konta, zapisy postępów oraz płatny dostęp pozostają decyzjami przyszłego etapu; obecna aplikacja pozostaje bez paywalla.

Podstawy definicji: [HoDoKu — Chains and Loops](https://hodoku.sourceforge.net/en/tech_chains.php).
