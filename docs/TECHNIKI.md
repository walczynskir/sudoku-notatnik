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

Spójrz na jedno puste pole, a nie na całą linię. Zbierz cyfry już wpisane w jego wierszu, kolumnie i bloku. Każda z nich jest w tym polu zabroniona. Jeśli po wykluczeniu zostaje jedna możliwość, nie ma drugiego poprawnego wyboru.

To jest wpisanie liczby, nie eliminacja w innych polach. Sama pojedyncza ręczna notatka nie wystarczy do dowodu: kandydaci muszą wynikać z poprawnych ograniczeń planszy.

### Jedyne miejsce dla cyfry

W wierszu, kolumnie lub kwadracie dana cyfra może trafić tylko do jednego pola. Nawet jeśli to pole ma kilku kandydatów, tę cyfrę można w nim wpisać.

Wybierz jedną cyfrę i jedną jednostkę, czyli wiersz, kolumnę albo blok. Sprawdź wszystkie puste pola tej jednostki. Cyfra musi wystąpić w niej dokładnie raz, więc jeśli pasuje tylko do jednego pola, właśnie tam jest jej miejsce.

Różnica względem jedynego kandydata: tutaj jedyna jest pozycja cyfry w jednostce, niekoniecznie lista kandydatów w samym polu. Pozostałe notatki w tym polu nie przeszkadzają we wpisaniu ustalonej cyfry.

### Zablokowani kandydaci

Jeśli wszystkie miejsca dla cyfry w kwadracie leżą w jednym wierszu lub kolumnie, usuń ją z pozostałych pól tego wiersza lub kolumny poza kwadratem. Działa też odwrotnie: jeśli wszystkie miejsca dla cyfry w wierszu lub kolumnie leżą w jednym kwadracie, usuń ją z pozostałych pól tego kwadratu.

Kluczem jest przecięcie bloku z wierszem lub kolumną. Gdy wszystkie możliwości danej cyfry w bloku leżą na tej samej linii, nie trzeba wiedzieć, które pole ją zawiera. Wiadomo już, że linia będzie miała tę cyfrę wewnątrz bloku, więc poza nim nie może jej powtórzyć.

W odwrotnym kierunku to wiersz lub kolumna ogranicza cyfrę do jednego bloku, a eliminacje dotyczą reszty tego bloku. Nie usuwaj kandydatów z pól tworzących samo przecięcie.

### Naga para

Dwa pola w tym samym wierszu, kolumnie lub kwadracie mają dokładnie tych samych dwóch kandydatów. Te cyfry zajmą te dwa pola, więc można usunąć je z kandydatów w pozostałych polach tej jednostki.

Szukaj dwóch pól z dokładnie tą samą parą, bez dodatkowych kandydatów. Nie musisz ustalać kolejności cyfr. Jedno pole zajmie jedną cyfrę, drugie pozostałą, więc obie są zarezerwowane dla tej pary pól.

Eliminacje wykonuj wyłącznie w jednostce wspólnej dla obu pól. Zachowaj obie cyfry w samej parze. Para, która nie usuwa niczego z innych pól, nie daje jeszcze nowego ruchu.

### Ukryta para

Dwie cyfry mogą wystąpić wyłącznie w tych samych dwóch polach wiersza, kolumny lub kwadratu. Te pola są dla nich zarezerwowane, więc można usunąć z nich wszystkich pozostałych kandydatów.

Zamiast szukać krótkich list kandydatów, śledź pozycje dwóch cyfr w jednej jednostce. Jeśli obie mieszczą się tylko w tych samych dwóch polach, muszą wspólnie je zająć. Inne cyfry zapisane w tych polach są wtedy zbędne.

To odwrócenie nagiej pary: tutaj usuwasz inne cyfry z dwóch pól, a nie cyfry pary z pozostałych pól. Każda z dwóch wybranych cyfr musi mieć w jednostce co najmniej jedno możliwe miejsce.

### Naga trójka

Trzy pola w jednym wierszu, kolumnie lub kwadracie zawierają łącznie tylko trzy różne cyfry. Każde pole może mieć dwóch lub trzech kandydatów. Te cyfry zajmą te trzy pola, więc usuń je z pozostałych pól tej jednostki.

Nie wymagaj identycznych trzech kandydatów w każdym polu. Trzy listy mogą być różne; ważne, by ich suma zawierała dokładnie trzy cyfry. Ponieważ trzy pola w jednej jednostce nie mogą powtarzać liczb, zużyją wszystkie trzy cyfry między sobą.

Skreśl te cyfry wyłącznie w pozostałych polach wspólnej jednostki. Żadna dodatkowa, czwarta cyfra nie może występować w wybranych trzech polach — wtedy ta reguła nie działa.

### Ukryta trójka

Trzy cyfry mogą występować tylko w tych samych trzech polach wiersza, kolumny lub kwadratu. Można usunąć z tych pól pozostałych kandydatów. Nie każda z tych trzech cyfr musi występować w każdym z trzech pól.

Zaznacz wszystkie miejsca trzech wybranych cyfr w jednej jednostce. Łącznie muszą mieścić się w trzech polach, choć poszczególna cyfra nie musi pojawiać się w każdym z nich. Te trzy cyfry muszą gdzieś wystąpić, więc zajmują cały zestaw trzech pól.

Usuń z tych pól kandydatów spoza wybranej trójki. Nie usuwaj cyfr trójki tylko dlatego, że kolejność ich rozmieszczenia nie jest jeszcze znana.

### Naga czwórka

Cztery pola w jednej jednostce mają łącznie tylko cztery różne cyfry. Zajmą one te pola, więc można usunąć je z pozostałych pól jednostki.

Zasada jest taka sama jak dla nagiej pary i trójki, ale obejmuje cztery pola. Listy mogą mieć różną długość; razem muszą zawierać dokładnie cztery cyfry. Cztery pola jednej jednostki potrzebują czterech różnych wartości, więc żadna z tych cyfr nie zostaje dla pozostałych pól.

Zwróć uwagę na kierunek eliminacji: cyfry czwórki usuwasz poza jej polami, we wspólnej jednostce. Nie próbujesz jeszcze rozstrzygać, która cyfra trafia do którego z czterech pól.

### Ukryta czwórka

Cztery cyfry występują wyłącznie w czterech polach jednostki. Usuń z tych czterech pól pozostałych kandydatów.

Skup się na czterech cyfrach i sprawdź wszystkie ich pozycje w jednej jednostce. Jeśli razem zajmują tylko cztery pola, te pola są w całości dla nich zarezerwowane. Rozbudowane listy notatek mogą ukrywać ten układ.

Czyść same cztery pola z pozostałych cyfr. W przeciwieństwie do nagiej czwórki wybranych cyfr nie skreślasz tutaj z zewnętrznych pól — warunek już mówi, że nie mają tam swoich miejsc.

### X-Wing

W dwóch wierszach dana cyfra ma dokładnie po dwa możliwe miejsca, w tych samych dwóch kolumnach. Powstaje prostokąt: cyfra musi zająć przeciwległe rogi, więc usuń ją z pozostałych pól obu kolumn. Reguła działa też po zamianie wierszy z kolumnami.

Wybierz jedną cyfrę i znajdź dwa wiersze, w których ma ona po dwa miejsca. Obie pary muszą leżeć w tych samych kolumnach. Gdy w pierwszym wierszu wybierzesz jeden róg, drugi wiersz musi użyć przeciwnego rogu, bo kolumna nie może powtórzyć cyfry.

Niezależnie od wyboru obie kolumny zostaną zajęte przez tę cyfrę w tych dwóch wierszach. Usuń ją z pozostałych pól obu kolumn, zachowując cztery rogi. Przy zamianie wierszy z kolumnami odwraca się też kierunek eliminacji.

### XY-Wing

Centrum ma parę XY, a dwa widzące je skrzydła pary XZ i YZ. Bez względu na cyfrę centrum jedno skrzydło ma Z, więc usuń Z z pól widzących oba skrzydła.

Litery X, Y i Z oznaczają trzy różne cyfry. Centrum widzi oba skrzydła, czyli współdzieli z każdym wiersz, kolumnę lub blok; skrzydła nie muszą widzieć się wzajemnie. Gdy centrum przyjmie X, skrzydło XZ musi przyjąć Z. Gdy centrum przyjmie Y, skrzydło YZ musi przyjąć Z.

W obu przypadkach jedno ze skrzydeł zawiera Z. Z można więc usunąć tylko z pól widzących oba skrzydła. Nie trzeba wiedzieć, które skrzydło ostatecznie przyjmie Z.

### XYZ-Wing

Centrum ma XYZ, a widzące je skrzydła XZ i YZ. Usuń Z tylko z pól widzących wszystkie trzy pola: centrum i oba skrzydła.

Rozpatrz trzy możliwości centrum. Gdy wybierze Z, Z jest w centrum. Gdy wybierze X, skrzydło XZ zostaje z Z; gdy wybierze Y, skrzydło YZ zostaje z Z. Za każdym razem Z wystąpi w którymś z trzech pól.

Dlatego cel eliminacji musi widzieć nie tylko oba skrzydła, lecz także centrum. To ważna różnica względem XY-Wing: pole widzące same skrzydła nie zawsze pozwala usunąć Z.

### W-Wing

Dwa pola z taką samą parą kandydatów są połączone silnym połączeniem jednej cyfry: w jednostce są dla niej tylko dwa miejsca. Jeden koniec widzi pierwszą parę, drugi drugą. Druga cyfra pary musi wystąpić w co najmniej jednym z tych pól; usuń ją ze wspólnych sąsiadów.

Silne połączenie oznacza tutaj, że wybrana cyfra ma w jednej jednostce dokładnie dwa miejsca i jedno z nich musi być prawdziwe. Wyobraź sobie, że obie jednakowe pary wybierają cyfrę łączącą zamiast drugiej cyfry. Każda para wykluczy wtedy inny koniec silnego połączenia, więc nie zostanie żadne miejsce dla tej cyfry — sprzeczność.

Co najmniej jedna para musi zatem użyć drugiej cyfry. Usuń tę drugą cyfrę ze wspólnych sąsiadów dwóch pól z parą, a nie automatycznie z otoczenia całego połączenia.

### Swordfish

W trzech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych trzech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.

Wybierz jedną cyfrę. W trzech wybranych wierszach jej wszystkie pozycje muszą łącznie mieścić się w trzech kolumnach. Każdy z tych wierszy potrzebuje jednego wystąpienia cyfry, a żadna kolumna nie może dostać jej dwa razy. Trzy wystąpienia zajmą więc wszystkie trzy kolumny.

Skreśl cyfrę z tych kolumn poza trzema wierszami tworzącymi układ. Nie jest wymagany pełny prostokąt ani taka sama liczba kandydatów w każdym wierszu. Ta aplikacja rozpoznaje podstawową odmianę bez płetw.

### Jellyfish

W czterech wierszach wszystkie miejsca dla jednej cyfry mieszczą się w tych samych czterech kolumnach. Usuń tę cyfrę z innych pól tych kolumn. Działa też z zamienionymi wierszami i kolumnami.

Tu rozumowanie obejmuje cztery wiersze i cztery kolumny dla jednej cyfry. Wszystkie możliwości w wybranych wierszach muszą mieścić się w tych czterech kolumnach. Cztery wymagane wystąpienia nie mogą współdzielić kolumny, więc zajmą każdą z nich.

Eliminuj cyfrę w tych kolumnach poza wierszami źródłowymi. Liczy się wspólne ograniczenie wszystkich czterech wierszy, nie sam wizualny kształt rysunku. W tej aplikacji jest to podstawowa odmiana bez płetw; wiersze i kolumny można zamienić.

### Unique Rectangle typ 1

Tylko dla planszy z potwierdzonym jednym rozwiązaniem: cztery rogi prostokąta w dwóch blokach nie mogą tworzyć tej samej dwucyfrowej pary. Jeśli trzy rogi są taką parą, usuń obie cyfry z czwartego.

Cztery narożniki muszą należeć do dwóch wierszy, dwóch kolumn i dokładnie dwóch bloków. Gdyby wszystkie używały wyłącznie tej samej pary, można byłoby zamienić cyfry miejscami w całym prostokącie bez naruszenia tych jednostek. Otrzymalibyśmy drugie rozwiązanie.

Przy potwierdzonym jednym rozwiązaniu czwarty róg musi więc wybrać cyfrę spoza pary. Usuń z niego obie cyfry pary, ale nie zgaduj, która z dodatkowych jest poprawna. Bez założenia jednoznaczności ten argument nie jest dozwolony.

### Unique Rectangle typ 2

Dwa rogi prostokąta są tą samą parą, a dwa pozostałe mają dodatkowo tę samą trzecią cyfrę. Przy potwierdzonej jednoznaczności co najmniej jeden z dodatkowych rogów musi zawierać tę cyfrę. Usuń ją ze wspólnych sąsiadów tych rogów.

Dwa rogi z dodatkową cyfrą są w tej odmianie w jednej jednostce. Gdyby żaden nie wybrał dodatkowej cyfry, wszystkie cztery rogi korzystałyby tylko z pary i powstałby zamienny prostokąt z dwoma rozwiązaniami.

Przynajmniej jeden z tych dwóch rogów musi więc zawierać dodatkową cyfrę. Każde inne pole widzące oba rogi nie może jej zawierać, niezależnie od tego, który róg ją dostanie. Nie usuwaj jej z samych rogów.

### Unique Rectangle typ 4

Przy potwierdzonej jednoznaczności: dwa rogi są parą, a pozostałe dwa są połączone silnym połączeniem jednej cyfry pary w jednostce. Usuń drugą cyfrę pary z tych dwóch dodatkowych rogów.

Dwa dodatkowe rogi dzielą jednostkę, w której jedna cyfra pary występuje jako kandydat tylko w tych rogach. Ta cyfra musi zająć jeden z nich. Gdyby drugi róg użył drugiej cyfry pary, pozostałe dwa rogi także zamknęłyby się w tej parze i można byłoby zamienić cały prostokąt.

Jednoznaczność wyklucza taki układ. Usuń drugą cyfrę pary z obu dodatkowych rogów. Silne połączenie dotyczy konkretnej jednostki — same obecne cyfry w dwóch rogach nie wystarczają.

### Kolorowanie — pułapka

Połącz silne pary jednej cyfry i przypisz przeciwne grupy kolejnym końcom. Jedna grupa musi być prawdziwa. Kandydat poza łańcuchem, który widzi obie grupy, jest niemożliwy.

Dla jednej cyfry połącz pary, które są jej jedynymi dwoma miejscami w jednostce. Końce takiego połączenia mają przeciwne wartości logiczne: gdy jeden jest prawdziwy, drugi fałszywy. Idąc po połączeniach, otrzymujesz dwie naprzemienne grupy, a jedna z nich musi być prawdziwa.

Kandydat spoza tej sieci, który widzi przynajmniej jedno pole z każdej grupy, przegrywa w obu przypadkach. Usuń go, ale nie wybieraj na tej podstawie jednej grupy jako poprawnej. Kolor jest etykietą zależności, nie zgadywaną cyfrą.

### Kolorowanie — sprzeczność

Pokoloruj naprzemiennie końce silnych połączeń jednej cyfry. Jeśli dwa pola tej samej grupy widzą się wzajemnie, wszystkie kandydaty tej grupy są fałszywe.

W jednej spójnej sieci silnych połączeń cała grupa tego samego koloru ma tę samą wartość logiczną. Jeśli dwa jej pola współdzielą wiersz, kolumnę lub blok, nie mogą jednocześnie zawierać rozpatrywanej cyfry. Taka grupa nie może być prawdziwa.

Usuń kandydatów tej cyfry ze wszystkich pól sprzecznej grupy, nie z obu grup naraz. Nie łącz kolorów z niezależnych sieci tak, jakby były jednym dowodem.

### X-Chain

Łańcuch jednej cyfry przeplata silne i słabe połączenia, zaczynając i kończąc silnym. Co najmniej jeden z końców jest prawdziwy. Usuń tę cyfrę z pól widzących oba końce.

Silne połączenie pozwala przejść od „ten kandydat jest fałszywy” do „następny jest prawdziwy”. Słabe pozwala przejść od „prawdziwy” do „następny fałszywy”. Naprzemienne użycie tych dwóch reguł buduje dowód dla jednej cyfry, bez zgadywania wartości całej planszy.

Zacznij myślowo od fałszywego pierwszego końca. Jeśli łańcuch kończy się prawdziwym drugim końcem, co najmniej jeden z końców musi być prawdziwy. Usuwasz cyfrę tylko z pól widzących oba końce, nie z każdego pola sąsiadującego z dowolnym fragmentem łańcucha.

### XY-Chain

Łańcuch pól z dwiema cyframi wykorzystuje silną zależność wewnątrz pola i słabe połączenia tej samej cyfry między polami. Jeśli oba końce reprezentują tę samą cyfrę, usuń ją ze wspólnych sąsiadów.

Każde używane pole ma dokładnie dwóch kandydatów: odrzucenie jednego wymusza drugiego. Między polami przechodzisz po tej samej cyfrze, której dwa widzące się pola nie mogą zawierać jednocześnie. W ten sposób wymuszenia przechodzą przez kolejne różne pary.

Oba końce muszą reprezentować tę samą cyfrę. Jeśli jej brak na pierwszym końcu wymusza ją na ostatnim, jest prawdziwa na co najmniej jednym z nich. Usuń ją z ich wspólnych sąsiadów; sama seria dowolnych pól z dwiema notatkami nie stanowi jeszcze poprawnego łańcucha.

### AIC

Naprzemienny łańcuch wnioskowania łączy silne i słabe zależności między kandydatami. Gdy z fałszywości pierwszego wynika prawdziwość ostatniego, kandydat wykluczający oba końce musi być fałszywy. Ta wersja analizuje proste łańcuchy do 11 połączeń, bez grup i sieci.

W tej aplikacji znak = oznacza silne połączenie: oba końce nie mogą być fałszywe. Znak — oznacza słabe: oba nie mogą być prawdziwe. Silne połączenie może wynikać z dwóch kandydatów w polu albo dwóch miejsc cyfry w jednostce. Łańcuch przeplata te zależności i zaczyna oraz kończy się silnym połączeniem.

Nie musisz rozstrzygać, który koniec jest prawdziwy. Wystarczy, że kandydat docelowy wyklucza oba: gdyby był prawdziwy, oba końce byłyby fałszywe, czemu przeczy łańcuch. W tej wersji analizowane są proste łańcuchy do 11 połączeń, bez grup i rozgałęzionych sieci.

## Granice obecnej implementacji

Nie jest to katalog wszystkich wariantów znanych w Sudoku. Nie obejmuje finned/sashimi i złożonych ryb, pozostałych typów UR, grouped AIC, pełnych pętli, ALS ani forcing nets. Te rozszerzenia mogą nadal trafiać do 1.x. Brak podpowiedzi oznacza brak ruchu znalezionego przez obsługiwane reguły, nie dowód nierozwiązywalności.

Łańcuchy są ograniczone do 11 połączeń; nie tworzą węzłów grupowych ani sieci. Test jednoznaczności ma limit 200 000 węzłów: gdy nie ukończy analizy, UR są pomijane. Licznik rozwiązań nie podaje cyfr jako podpowiedzi.

## Wersja 2

Osobny zakres: generator plansz wymagających wybranej techniki, ćwiczenia i ścieżki nauki. Konta, zapisy postępów oraz płatny dostęp pozostają decyzjami przyszłego etapu; obecna aplikacja pozostaje bez paywalla.

Podstawy definicji: [HoDoKu — Chains and Loops](https://hodoku.sourceforge.net/en/tech_chains.php).
