# Instrukcja użytkownika

## Wpisywanie liczb i kandydatów

1. Wybierz pole na planszy.
2. W trybie **Liczby** kliknij cyfrę na klawiaturze ekranowej lub wpisz 1–9 na klawiaturze komputera.
3. W trybie **Kandydaci** kliknięcie cyfry dodaje ją do notatek, a kolejne kliknięcie usuwa. Pole musi być puste.
4. **Oblicz kandydatów** uzupełnia wszystkie dozwolone cyfry w pustych polach zgodnie z wierszem, kolumną i blokiem 3 × 3. Zastępuje ręczne notatki.

Po wpisaniu liczby aplikacja automatycznie usuwa tę cyfrę z kandydatów w powiązanych polach. Nie dodaje automatycznie innych kandydatów i nie przywraca ich po usunięciu liczby. Do pełnego odtworzenia możliwości użyj **Oblicz kandydatów**.

Powtarzające się liczby w wierszu, kolumnie lub bloku są oznaczane na czerwono.

## Cofanie, czyszczenie i restart

- **Cofnij ostatnią zmianę** przywraca liczby i kandydatów; obejmuje także import, czyszczenie i restart. Nie ma ustalonego limitu liczby kroków w bieżącej sesji. Historia zajmuje pamięć przeglądarki i znika po odświeżeniu strony.
- **Wyczyść wybrane pole** usuwa z niego liczbę i notatki.
- **Wyczyść kandydatów** usuwa wszystkie notatki i zachowuje liczby.
- **Restartuj sudoku** przywraca liczby z ostatniego importu lub przykładu i usuwa kandydatów. Dla nowej planszy wpisywanej ręcznie punktem początkowym jest pusta plansza.
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

1. Suwakami dopasuj zieloną ramkę do zewnętrznych krawędzi siatki.
2. Kliknij **Rozpoznaj cyfry**.
3. Porównaj wynik z obrazkiem i popraw liczby w podglądzie.
4. Kliknij **Użyj tej planszy**.

Najlepiej działa wyraźna, kwadratowa plansza sfotografowana na wprost, bez wpisanych kandydatów. Aplikacja nie prostuje perspektywy zdjęcia. OCR może pomylić lub pominąć cyfry, zwłaszcza odręczne — sprawdzaj wynik.

Pierwsze użycie OCR wymaga internetu do pobrania silnika i danych językowych. Zdjęcie jest przetwarzane lokalnie. Jeśli kamera nie działa w przeglądarce osadzonej, otwórz link bezpośrednio w Safari lub Chrome, sprawdź uprawnienia albo wczytaj gotowe zdjęcie.

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

Kliknięcie logo otwiera stronę główną i przeładowuje aplikację. Zapisana plansza pozostaje, historia cofania się zeruje.

## Podpowiedź: technika, zasada i ruch

1. Kliknij **Podpowiedz technikę**. Zobaczysz wyłącznie nazwę najłatwiejszej znalezionej techniki, bez cyfr, pól i ich podświetlania.
2. Opcjonalnie rozwiń **Na czym polega?** pod nazwą techniki: znajdziesz ogólną zasadę bez cyfr i współrzędnych z własnej planszy. Sekcję można ponownie zwinąć. Nowa podpowiedź zawsze zaczyna ze zwiniętą zasadą.
3. Jeśli chcesz więcej pomocy, kliknij **Pokaż pola i wyjaśnienie ruchu**. Ciemnozielona ramka oznacza aktualnie wybrane przez Ciebie pole. Niebieskie pola tworzą wskazówkę, a bursztynowa obwódka wskazuje miejsca do eliminacji kandydatów. Wyjaśnienie opisuje konkretny ruch.

Wskazówkę można ukryć; każda edycja danych i cofnięcie automatycznie ją usuwa. Podpowiedź nie wpisuje liczb, nie zmienia notatek i nie trafia do historii cofania.

Kolejność wyszukiwania: jedyny kandydat → jedyne miejsce dla cyfry → zablokowani kandydaci (wskazujące i zgłaszające) → naga para → ukryta para → naga trójka → ukryta trójka → X-Wing (wiersze i kolumny). To kolejność przyjęta w tej aplikacji, nie uniwersalna skala trudności. Analiza wylicza możliwości z liczb, niezależnie od ręcznych notatek. Notatki służą do pomijania już wykonanych eliminacji: podpowiedź wskazuje tylko pola, w których dany kandydat nadal jest zapisany. Gdy wszystkie eliminacje danej wskazówki są już wykonane, analiza szuka kolejnej. Puste notatki nie są podstawą do proponowania eliminacji; można je uzupełnić przyciskiem Oblicz kandydatów. Same ręczne wykluczenia nie uzasadniają nowych wniosków. Analiza odtwarza tylko te wykonane już eliminacje, które potrafi niezależnie udowodnić własnymi regułami na podstawie liczb i poprzednich potwierdzonych eliminacji. Dzięki temu kolejne techniki mogą korzystać z poprawnego wcześniejszego postępu. Wyjaśnienie informuje o uwzględnionych wcześniej technikach, a dla każdego pola docelowego podaje konkretne cyfry do usunięcia.

Brak znalezionej techniki nie oznacza braku rozwiązania. Trudniejsze techniki nie są jeszcze obsługiwane. Lokalnie sprzeczna plansza daje komunikat o błędzie przed szukaniem ruchu; nie jest to pełne sprawdzenie rozwiązywalności.

## Przywracanie cofniętej zmiany

Przycisk **Przywróć ostatnią zmianę** obok Cofnij ponawia ostatnią cofniętą zmianę. Można przywracać kolejne cofnięte kroki, również import, kandydatów i restart. Skróty: Ctrl+Shift+Z / ⌘Shift+Z lub Ctrl+Y. Nowa edycja usuwa możliwość przywrócenia poprzedniej ścieżki. Odświeżenie strony usuwa obie historie.

## Wypełnianie pojedynczych kandydatów

**Wypełnij pojedynczych kandydatów** wpisuje cyfry w puste pola z dokładnie jednym kandydatem w bieżących notatkach. Nie oblicza notatek od nowa. Powtarza wpisy i eliminacje aż nie będzie kolejnych pojedynczych pól. Cała kaskada jest jedną operacją; błąd także w późniejszej rundzie anuluje wszystkie jej wpisy. Ręczne notatki muszą być poprawne; kontrola zgodności z planszą nie gwarantuje poprawności arbitralnych ręcznych wykluczeń. W przypadku wykrytego konfliktu lub pozbawienia innego pola możliwości operacja nie zmienia planszy. Wszystkie wpisy i eliminacje z jednego kliknięcia można razem cofnąć i przywrócić.

Po poprawnym wypełnieniu wszystkich 81 pól nad planszą pojawia się zielony baner **Sudoku rozwiązane!**. Pełna plansza z powtórzeniami nie wyświetla tego komunikatu. Cofnięcie lub usunięcie wpisu usuwa baner.
