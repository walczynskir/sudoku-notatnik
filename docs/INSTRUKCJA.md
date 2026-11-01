# Instrukcja użytkownika

Język zmienisz listą z symbolem globu w nagłówku. Dostępne: polski, angielski, hiszpański, niemiecki, chiński uproszczony, hindi, francuski, arabski i włoski. Wybór jest pamiętany na urządzeniu; zmiana nie resetuje planszy ani historii. Szczegóły: [Języki](JEZYKI.md).

## Gotowe łamigłówki

Wybierz **Graj w sudoku** nad planszą lub **Wczytaj → Graj w sudoku**, następnie poziom i **Nowa łamigłówka**. Na telefonie podczas gry duży panel jest ukryty, a przy planszy dostępny jest mały przycisk **Nowa łamigłówka**. Każdy z czterech poziomów ma 2500 plansz. Opcja **Pokaż kandydatów od razu** wypełnia notatki już przy starcie; można je też obliczyć później. Zastąpienie istniejącej planszy wymaga potwierdzenia i daje się cofnąć. Restart wraca do cyfr początkowych wybranej łamigłówki.

**Łamigłówka dnia** wybiera wspólną planszę o średnim poziomie, niezależnie od poziomu ustawionego na liście. Zmienia się o północy UTC. Nad planszą pojawiają się poziom, identyfikator i źródłowa ocena SE. Najtrudniejsza technika nie jest tam ujawniana.

Ukończone plansze są pamiętane lokalnie i pomijane przy losowaniu nowych, dopóki są dostępne inne. Dzisiejsza łamigłówka jest zawsze ta sama, nawet jeśli została już ukończona. Ukończenie wymaga pełnej, poprawnej planszy z zachowaniem cyfr początkowych. Więcej: [Biblioteka](BIBLIOTEKA.md).

## Wpisywanie liczb i kandydatów

1. Wybierz pole na planszy.
2. W trybie **Liczby** kliknij cyfrę na klawiaturze ekranowej lub wpisz 1–9 na klawiaturze komputera.
3. W trybie **Kandydaci** kliknięcie cyfry dodaje ją do notatek, a kolejne kliknięcie usuwa. Pole musi być puste.
4. **Oblicz kandydatów** uzupełnia wszystkie dozwolone cyfry w pustych polach zgodnie z wierszem, kolumną i blokiem 3 × 3. Zastępuje ręczne notatki.

Po wpisaniu liczby aplikacja automatycznie usuwa tę cyfrę z kandydatów w powiązanych polach. Nie dodaje automatycznie innych kandydatów i nie przywraca ich po usunięciu liczby. Do pełnego odtworzenia możliwości użyj **Oblicz kandydatów**.

Można wpisywać także cyfry dewanagari, arabsko-indyjskie i perskie; aplikacja zamienia je na cyfry 0–9 przy wprowadzaniu oraz imporcie tekstu. OCR nadal jest przeznaczony dla drukowanych cyfr 1–9.

Powtarzające się liczby w wierszu, kolumnie lub bloku są oznaczane na czerwono.

## Cofanie, czyszczenie i restart

- **Cofnij ostatnią zmianę** przywraca liczby i kandydatów; obejmuje także import, czyszczenie i restart. Nie ma ustalonego limitu liczby kroków w bieżącej sesji. Historia zajmuje pamięć przeglądarki i znika po odświeżeniu strony.
- **Wyczyść wybrane pole** usuwa z niego liczbę i notatki.
- **Wyczyść kandydatów** usuwa wszystkie notatki i zachowuje liczby.
- **Restartuj sudoku** przywraca liczby z ostatniego importu i usuwa kandydatów. Dla nowej planszy wpisywanej ręcznie punktem początkowym jest pusta plansza.
- **Nowa, pusta plansza** rozpoczyna nowe sudoku. Wczytanie nowej planszy przy istniejących danych wymaga potwierdzenia.

Dla danych zapisanych przed wprowadzeniem funkcji restartu stan przy pierwszym otwarciu aktualizacji jest traktowany jako początkowy.

## Import z tekstu lub pliku

Wybierz **Z tekstu**. Możesz wkleić treść i kliknąć **Wczytaj planszę** albo użyć **Wybierz plik**.

Wymagane jest 81 cyfr lub kropek, w jednym ciągu albo w 9 wierszach. `0` i `.` oznaczają puste pola. Białe znaki, pionowe kreski, przecinki oraz znaki `+` i `-` są pomijane. Limit pliku tekstowego: 1 MB.

```text
530070000
600195000
098000060
800060003
400803001
700020006
060000280
000419005
000080079
```

Obsługiwane pliki: TXT, SDK, CSV zawierający taką siatkę oraz kopie JSON eksportowane przez aplikację. JSON przywraca również kandydatów.

## Import ze zdjęcia i aparatu

- **Z obrazka**: wybierz zdjęcie lub zrzut ekranu, maksymalnie 20 MB.
- **Zrób zdjęcie**: zezwól na kamerę, obejmij całą planszę i zrób zdjęcie. Mikrofon nie jest używany.
- Na telefonie można też wybrać **Użyj aparatu telefonu**. Sposób otwarcia aparatu lub wyboru zdjęcia zależy od przeglądarki.

Następnie:

1. Przeciągnij środek zielonej ramki, aby ją przesunąć. Przeciągnij narożnik, aby zmienić rozmiar. Ramka ma obejmować dokładnie wszystkie 9 × 9 pól, bez marginesów. Suwaki **Rozmiar**, **Poziomo** i **Pionowo** pozwalają dopasować ją dokładniej.
2. Lekkie pochylenie popraw suwakiem **Wyprostuj zdjęcie** (−15° do +15°, co 0,1°). **Wyzeruj obrót** przywraca 0°. Przy zdjęciu obróconym bokiem użyj **Obróć w lewo/prawo** (90°; resetuje kadr i drobną korektę).
3. Jeśli zdjęcie jest niewyraźne, wybierz **Zrób zdjęcie ponownie** nad obrazem. Powrócisz do aparatu bez zmiany planszy. Przycisk jest dostępny przed rozpoznaniem i przy sprawdzaniu wyniku; podczas rozpoznawania pozostaje zablokowany.
4. Kliknij **Rozpoznaj cyfry**. Analiza używa wyprostowanego obrazu. Każda zmiana kadru lub kąta unieważnia poprzedni wynik.
5. Porównaj wynik z miniaturą zdjęcia nad rozpoznanymi liczbami i popraw liczby w podglądzie.
6. Kliknij **Użyj tej planszy**. Dopiero ta czynność zastępuje planszę.

Najlepiej działa wyraźna, kwadratowa plansza sfotografowana na wprost, bez wpisanych kandydatów. Aplikacja nie prostuje perspektywy zdjęcia. OCR może pomylić lub pominąć cyfry, zwłaszcza odręczne — sprawdzaj wynik.

Pierwsze uruchomienie rozpoznawania wymaga połączenia z internetem i może chwilę potrwać. Zdjęcie jest przetwarzane lokalnie. Jeśli kamera nie działa w przeglądarce osadzonej, otwórz link bezpośrednio w Safari lub Chrome, sprawdź uprawnienia albo wczytaj gotowe zdjęcie.

## Zapis i przenoszenie między urządzeniami

Stan planszy i kandydatów jest automatycznie zapisywany w pamięci lokalnej przeglądarki. Osobno zapisany jest punkt restartu. Dane nie synchronizują się między urządzeniami, profilami ani różnymi adresami strony. Usunięcie danych witryny może je skasować.

**Pobierz planszę i notatki** pobiera `sudoku-notatnik.json`. Plik zawiera aktualne liczby i kandydatów; nie zawiera zdjęcia, historii cofania ani osobnego punktu restartu.

Aby przywrócić kopię: **Z tekstu → Wybierz plik → wskaż JSON → potwierdź zastąpienie planszy**. Zaimportowane liczby stają się nowym punktem restartu.

## Telefon i skróty klawiaturowe

Na telefonie przełącznik trybu, klawiatura i cofanie są przy planszy; pozostałe narzędzia znajdują się niżej. W małym widoku poziomym sterowanie jest obok planszy.

| Skrót | Działanie |
| --- | --- |
| 1–9 | Liczba lub przełączenie kandydata w wybranym trybie |
| N | Przełączenie Liczby / Kandydaci |
| Strzałki | Zmiana wybranego pola |
| Backspace, Delete, 0 lub kropka | Wyczyść wybrane pole |
| Ctrl+Z / ⌘Z | Cofnij ostatnią zmianę |
| Ctrl+Shift+Z / ⌘Shift+Z lub Ctrl+Y | Przywróć cofniętą zmianę |

Kliknięcie logo otwiera stronę główną i przeładowuje aplikację. Zapisana plansza pozostaje, historia cofania się zeruje.

## Podpowiedź: technika, zasada i ruch

1. Kliknij **Podpowiedz technikę**. Zobaczysz wyłącznie nazwę najłatwiejszej znalezionej techniki, bez cyfr, pól i ich podświetlania.
2. Opcjonalnie rozwiń **Na czym polega?** pod nazwą techniki: znajdziesz ogólną zasadę, sposób rozpoznania układu, uzasadnienie i typowe pułapki, bez cyfr i współrzędnych z własnej planszy. W razie potrzeby rozwiń także **Pojęcia użyte w wyjaśnieniu**. Sekcję można ponownie zwinąć. Nowa podpowiedź zawsze zaczyna ze zwiniętą zasadą.
3. Jeśli chcesz więcej pomocy, kliknij **Pokaż pola i wyjaśnienie ruchu**. Ciemnozielona ramka oznacza aktualnie wybrane przez Ciebie pole. Niebieskie pola tworzą wskazówkę, a bursztynowa obwódka wskazuje miejsca do eliminacji kandydatów. Wyjaśnienie opisuje konkretny ruch.

Wskazówkę można ukryć; każda edycja danych i cofnięcie automatycznie ją usuwa. Podpowiedź nie wpisuje liczb, nie zmienia notatek i nie trafia do historii cofania.

Kolejność wyszukiwania: jedyny kandydat → jedyne miejsce dla cyfry → zablokowani kandydaci (wskazujące i zgłaszające) → naga para → ukryta para → naga trójka → ukryta trójka → naga/ukryta czwórka → X-Wing → XY/XYZ/W-Wing → Swordfish → Jellyfish → UR1/2/4 → kolorowanie → X-Chain → XY-Chain → AIC. To kolejność przyjęta w tej aplikacji, nie uniwersalna skala trudności. Analiza wylicza możliwości z liczb, niezależnie od ręcznych notatek. Notatki służą do pomijania już wykonanych eliminacji: podpowiedź wskazuje tylko pola, w których dany kandydat nadal jest zapisany. Gdy wszystkie eliminacje danej wskazówki są już wykonane, analiza szuka kolejnej. Puste notatki nie są podstawą do proponowania eliminacji; można je uzupełnić przyciskiem Oblicz kandydatów. Same ręczne wykluczenia nie uzasadniają nowych wniosków. Analiza odtwarza tylko te wykonane już eliminacje, które potrafi niezależnie udowodnić własnymi regułami na podstawie liczb i poprzednich potwierdzonych eliminacji. Dzięki temu kolejne techniki mogą korzystać z poprawnego wcześniejszego postępu. Po odtworzeniu wcześniejszych eliminacji wyjaśnienie zaczyna się od „W aktualnym układzie:”. Nie wypisuje technicznych szczegółów odtwarzania. Dla każdego pola docelowego nadal podaje konkretne cyfry do usunięcia.

Brak znalezionej techniki nie oznacza braku rozwiązania. Trudniejsze techniki nie są jeszcze obsługiwane. Lokalnie sprzeczna plansza daje komunikat o błędzie przed szukaniem ruchu; nie jest to pełne sprawdzenie rozwiązywalności.

## Przywracanie cofniętej zmiany

Przycisk **Przywróć ostatnią zmianę** obok Cofnij ponawia ostatnią cofniętą zmianę. Można przywracać kolejne cofnięte kroki, również import, kandydatów i restart. Skróty: Ctrl+Shift+Z / ⌘Shift+Z lub Ctrl+Y. Nowa edycja usuwa możliwość przywrócenia poprzedniej ścieżki. Odświeżenie strony usuwa obie historie.

## Wypełnianie pojedynczych kandydatów

**Wypełnij pojedynczych kandydatów** wpisuje cyfry w puste pola z dokładnie jednym kandydatem w bieżących notatkach. Nie oblicza notatek od nowa. Powtarza wpisy i eliminacje aż nie będzie kolejnych pojedynczych pól. Cała kaskada jest jedną operacją; błąd także w późniejszej rundzie anuluje wszystkie jej wpisy. Ręczne notatki muszą być poprawne; kontrola zgodności z planszą nie gwarantuje poprawności arbitralnych ręcznych wykluczeń. W przypadku wykrytego konfliktu lub pozbawienia innego pola możliwości operacja nie zmienia planszy. Wszystkie wpisy i eliminacje z jednego kliknięcia można razem cofnąć i przywrócić.

Po poprawnym wypełnieniu wszystkich 81 pól nad planszą pojawia się zielony baner **Sudoku rozwiązane!**. Pełna plansza z powtórzeniami nie wyświetla tego komunikatu. Cofnięcie lub usunięcie wpisu usuwa baner.

## Belka szybkich akcji

Nad planszą znajdują się Cofnij, Przywróć, Wczytaj, Zapisz i Więcej. Wczytaj rozwija import tekstu/pliku JSON, obrazka i aparatu. Zapisz pobiera dotychczasową kopię JSON (nie synchronizuje jej w chmurze). Więcej zawiera czyszczenie kandydatów, restart i nową pustą planszę. Nowa plansza nadal wymaga potwierdzenia. Menu zamyka się po wyborze, kliknięciu poza belką lub Escape. Eksport i nowa plansza pozostają dostępne także niżej jako wyraźne przyciski. Usunięto Wczytaj przykład.

OCR automatycznie dopasowuje próg kontrastu dla każdego pola i ponawia słabe odczyty różnymi trybami rozpoznawania. Bursztynowe pola w podglądzie oznaczają niepewny wynik lub wykryty znak bez rozpoznanej cyfry. Sprawdź również pozostałe pola — nawet odczyt z wysoką oceną pewności może być błędny.

Po rozpoznaniu zdjęcie i suwaki zwijają się, a okno przechodzi do sprawdzania rozpoznanych cyfr. „Użyj tej planszy” pozostaje główną akcją u dołu okna. Aby porównać z obrazem, rozwiń „Obraz i kadrowanie”. Ponowne uruchomienie OCR wymaga rozwinięcia tej sekcji i kliknięcia „Rozpoznaj ponownie”; można też użyć odnośnika „Popraw kadr lub rozpoznaj ponownie”. Edycja kadru unieważnia poprzedni wynik.

## Komplet dziewięciu cyfr

Gdy dana cyfra występuje już 9 razy w liczbach planszy, jej przycisk przestaje być aktywny w obu trybach; dotyczy to także wpisywania fizyczną klawiaturą. Poprawny komplet ma zielonkawe tło, przekreślenie i ✓. Wpisy z konfliktami nie dostają znaku poprawnego kompletu. Usunięcie, cofnięcie lub wczytanie innej planszy od razu aktualizuje dostępność cyfr. Kandydaci nie są liczeni jako wpisane liczby.

## Zaawansowane techniki

Podpowiedzi obejmują nagie i ukryte pary, trójki i czwórki, X-Wing, XY-Wing, XYZ-Wing, W-Wing, Swordfish i Jellyfish. Każda technika ma zwijaną ogólną zasadę oraz osobno odsłaniany ruch na planszy. Niebieskie pola tworzą dowód, bursztynowe są celami eliminacji.

Obsługiwane są podstawowe ryby bez płetw (bez wariantów finned/sashimi). Ranking aplikacji jest stałą kolejnością wyszukiwania, nie obiektywną miarą trudności. Brak podpowiedzi nie stanowi dowodu nierozwiązywalności.

Od 1.11.0 dostępne są także Unique Rectangle typy 1/2/4, proste kolorowanie oraz X-Chain, XY-Chain i AIC. Szczegóły i ograniczenia: [Zakres technik](TECHNIKI.md). Wersja 2 jest przeznaczona na trening i generowanie plansz.

### Wygodniejsze zdjęcia z kamery

Zielona siatka w podglądzie pomaga ustawić planszę; zdjęcie obejmuje cały podgląd, a ramka jest tylko pomocą. Przy kilku kamerach wybierz aparat z listy. Po zdjęciu przeciągnij ramkę myszą lub palcem i dopasuj rozmiar suwakiem. Obraz można obrócić o 90° w lewo lub w prawo (obrót resetuje kadr). Silne zniekształcenie perspektywy nadal wymaga zrobienia zdjęcia bardziej na wprost.

Narożniki ramki służą do zmiany jej rozmiaru; środek do przesuwania. Suwak „Wyprostuj zdjęcie” koryguje pochylenie o maksymalnie 15° w każdą stronę, co 0,1°. „Wyzeruj obrót” przywraca 0°. Korekta nie usuwa zniekształcenia perspektywy (trapezu). Po każdej zmianie kadru lub kąta rozpoznaj cyfry ponownie.

### Kolorowanie i Skyscraper

Skyscraper jest rozpoznawany przed ogólnym kolorowaniem. W kolorowaniu po odsłonięciu pól grupa A jest niebieska z ciągłą ramką, a grupa B fioletowa z przerywaną ramką. Pogrubiona, podkreślona cyfra to analizowany kandydat. Nie trzeba samodzielnie kolorować planszy. Bursztynowa ramka wskazuje eliminacje, ciemnozielona wybrane przez użytkownika pole.

### Autorzy i licencje

Odnośnik w stopce otwiera informacje o zewnętrznych bibliotekach, fontach i danych oraz pełne teksty licencyjne. Oryginalne teksty prawne pozostają w języku źródłowym.

Przycisk „Nowa gra” otwiera bibliotekę na komputerze i telefonie. Jest zielony i znajduje się w panelu nad planszą; na telefonie podczas gry panel ma kompaktową postać.
