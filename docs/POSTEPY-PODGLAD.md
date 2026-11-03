# Moje postępy — opcjonalna wersja testowa 1.21.0

Wydanie 1.21.0 zawiera publiczny test pod adresem https://rsudoku.pl/?features=gamification . Zwykły adres https://rsudoku.pl/ nie włącza tej funkcji. Flaga jest odczytywana z URL, nie jest zapamiętywana jako uprawnienie użytkownika. Usunięcie parametru wyłącza interfejs; dane postępów pozostają na urządzeniu. Parametr nie jest zabezpieczeniem ani listą zaproszonych — każdy znający link może włączyć test.

Podgląd deweloperski: http://127.0.0.1:5196/?features=gamification . Obsługiwane hosty to rsudoku.pl, www.rsudoku.pl, walczynskir.github.io i lokalne adresy loopback. Interfejs wersji testowej jest na razie po polsku; standardowy interfejs zachowuje dziewięć języków. Nowe zasoby są objęte skryptem wersjonowania. Nie ma kont ani synchronizacji postępów.

## Cel dzienny i pucharki

Na komputerze klikalny pasek nad grą pokazuje postęp dzisiaj, liczbę pucharków oraz aktualną setkę. Na telefonie do 640 px pasek jest ukryty; zamiast niego przy liczniku pól jest kompaktowy przycisk 🎯 2/3 · 🏆 1. Oba otwierają ten sam panel. Wyłączony cel pokazuje kreskę, a liczby pucharków powyżej 99 skrót 99+; pełne wartości pozostają w opisie dostępności. Większy tekst może zawinąć wiersz dla czytelności. Po kliknięciu otwiera ustawienia i nagrody. Statystyki oraz kalendarz są w rozwijanych szczegółach.

Domyślny cel: 3 nowe ukończone sudoku dziennie. Presety: 1, 3, 5, własny cel 1–99 albo Bez celu. Liczą się unikalne plansze biblioteki, niezależnie od trudności i użycia pomocy. Wcześniejsze ukończenia bez daty nie są wstecz doliczane do dzisiejszego celu. Powtórne rozwiązanie tej samej planszy nie zwiększa licznika.

Za realizację celu przyznajemy jeden pucharek na dzień, według lokalnej daty przeglądarki. Zwiększenie lub wyłączenie celu nie odbiera pucharków. Zmniejszenie może od razu przyznać dzisiejszą nagrodę. Wyłączony cel nie przyznaje nowych pucharów. Po północy licznik zaczyna od nowa i zachowuje ostatni wybrany cel; widok odświeża się przy grze, otwarciu panelu, powrocie do karty i co minutę. Nie ma kar za przerwy. Tydzień od poniedziałku pozostaje tylko podsumowaniem liczby ukończeń w szczegółach.

## Kolekcje setek

Każde 100 różnych ukończonych plansz tworzy jedną kolekcję. Na początku widoczna jest Pierwsza setka; po 100 ukończeniach odsłania się Setka 2 i pierwsza odznaka. To kolejne progi postępu, a nie zamknięte paczki przypisanych z góry plansz. Użytkownik sam wybiera poziom; cała biblioteka i import są dostępne od początku. Łączny wynik z 10 000 pozostaje widoczny w karcie kolekcji i statystykach. Po 10 000 ostatnia kolekcja pokazuje 100/100, bez fikcyjnej setki 101. Każda plansza jest liczona tylko raz.

## Nagrodowy motyw Zorza

Trzy pucharki dnia (trzy różne dni z osiągniętym celem) odblokowują trwale Zorzę. Pucharków się nie wydaje. Motyw ma białe powierzchnie, miętowo-lawendowy nagłówek i śliwkowe akcenty. Można go wybrać przy nagrodzie lub na liście motywów. Działa z większym tekstem i przełącznikiem wysokiego kontrastu. Dostępność, podpowiedzi i podstawowe narzędzia nie są nagrodami. Zorza jest rejestrowana tylko po włączeniu flagi; poza flagą zapisany wybór Zorzy ma bezpieczny powrót do Porcelany. To prototyp, bez ochrony przed ręcznym edytowaniem danych użytkownika.

## Sposób rozwiązania

Bez podpowiedzi oznacza brak ujawnionej techniki i brak włączonego oznaczania błędnych cyfr w śledzonej rozgrywce. Obliczanie kandydatów i wypełnianie pojedynczych nie są pomocą. Cofnięcie wpisów lub wyłączenie oznaczania błędów nie usuwa faktu użycia pomocy. Nowa sesja powstaje dopiero po zaakceptowaniu wczytania z biblioteki i może być wznowiona po odświeżeniu. Dotychczasowe i nieśledzone ukończenia mają kategorię wcześniejsze/brak danych. Pierwsze ukończenie utrwala kategorię; powtórne jej nie zmienia. Biblioteka nadal sprawdza poprawność i zgodność cyfr początkowych.

## Zapis i izolacja

`sudoku-progress-preview-v1`: records, sessions, dailyTarget, dailyGoals, dailyAwards, unlockedThemes. Stare pola weeklyTarget/goals/awards z pierwszego prototypu zostają zachowane, ale tygodniowe puchary nie stają się dziennymi. Domyślny cel dzienny po migracji to 3. Moduł odczytuje dotychczasowe ukończenia `sudoku-library-v1`; zapis zwykłych ukończeń nadal należy do biblioteki. LocalStorage localhost/127.0.0.1 jest osobny względem https://rsudoku.pl. Licznik nie zmienia planszy, notatek, historii ani eksportu. Brak kont, synchronizacji, punktów, reklam i rankingu. Błąd pamięci lokalnej jest pokazywany w panelu; gra nadal działa.

## Weryfikacja

Testy obejmują domyślne wyłączenie flagi i jawne włączenie wersji testowej, unikalność ukończeń, pomoc, migrację, granice dni i tygodni, własny cel, wyłączanie, trwałość nagrody, odblokowanie po trzech dniach, progi setek (99/100 i 10 000), rejestrację motywu tylko w wersji testowej oraz połączenie z biblioteką bez zmiany planszy. Ręcznie w izolowanych danych testowych: ostatni pojedynczy kandydat jednocześnie realizuje cel dnia, daje trzeci pucharek, odsłania Setkę 2 i motyw; wybór Zorzy pozostaje po odświeżeniu. Testowe HTML z danymi nie wchodzą do repozytorium.

## Album plakietek

W rozwijanych szczegółach jest album 12 plakietek, w trzech kolekcjach po cztery: Setki (100, 200, 500 i 1000 różnych plansz), Regularność (3, 7, 15 i 30 zrealizowanych celów dnia; dni nie muszą być kolejne), Odkrywca poziomów (pierwsza plansza łatwa, średnia, trudna i ekspert). Każda karta pokazuje warunek, postęp i tekstowy stan; zdobyte mają kolorowy emblemat i datę odblokowania w prototypie. Kolor nie jest jedyną informacją o stanie.

Odblokowania są zapisywane raz w polu badges, według stałego ID i lokalnej daty. Nie są odbierane przez wyłączenie celu ani cofnięcie ostatniego wpisu. Pomoc nie ogranicza żadnej kolekcji. Dotychczasowe sumy ukończeń mogą odblokować plakietki Setek przy migracji; bez danych poziomu lub dat nie wymyślamy pozostałych osiągnięć. Migracja nie wyświetla lawiny powiadomień. Nowe plakietki są ogłaszane krótkim, znikającym komunikatem bez dialogu; panel gry nie zmienia wysokości.

Album nie kosztuje pucharków i nie zmienia warunku odblokowania Zorzy. Album jest dostępny tylko po włączeniu flagi i na razie polskojęzyczny. Testy sprawdzają liczbę i unikalność 12 ID, migrację, progi postępu, pomoc, niekolejne dni, zapis po odświeżeniu, jednokrotne nadanie i trwałość daty.
