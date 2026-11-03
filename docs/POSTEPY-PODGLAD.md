# Moje postępy — lokalny prototyp

Gałąź `codex/progress-preview`, bez publikacji i bez nowego numeru wydania. Produkcja pozostaje przy 1.20.3.

Adres: http://127.0.0.1:5196/?features=gamification . Bez parametru interfejs postępów jest wyłączony. Kod sprawdza również nazwę hosta: rsudoku.pl nie może włączyć eksperymentu parametrem URL. To ograniczenie wdrożeniowe, nie mechanizm autoryzacji. Serwer nasłuchuje wyłącznie na 127.0.0.1. Nie ma kont, synchronizacji ani telemetrii postępów. Prototyp interfejsu jest na razie po polsku; tłumaczenia wymagają przygotowania przed publikacją.

## Zakres

Klikalny pasek celu nad obszarem gry otwiera ustawienia celu. Statystyki są schowane w rozwijanych szczegółach: licznik unikalnych ukończonych plansz z biblioteki 10 000, trzy kategorie oraz osiągnięcia: pierwsza plansza, dziesięć ukończonych, ukończenie wszystkich czterech poziomów. Kalendarz pokazuje lokalne daty pierwszych zarejestrowanych ukończeń Sudoku dnia w bieżącym miesiącu. W tym prototypie ponowne ukończenie tej samej planszy nie dodaje dnia ani nie zmienia kategorii. Dane historyczne nie wystarczają do odtworzenia wcześniejszych dni i poziomów.

Bez podpowiedzi oznacza brak ujawnionej techniki i brak włączonego oznaczania błędnych cyfr podczas śledzonej rozgrywki. Samo obliczanie kandydatów i automatyczne wypełnianie pojedynczych nie są pomocą. Ujawnienie nazwy techniki wystarcza do kategorii z pomocą. Cofnięcie wpisów lub wyłączenie oznaczania błędów nie usuwa faktu użycia pomocy.

Nowa śledzona sesja powstaje dopiero po zaakceptowaniu wczytania planszy z biblioteki. Jest zapisywana i może być wznowiona po odświeżeniu. Dotychczasowe ukończenia i rozgrywki bez początku śledzenia są pokazywane jako wcześniejsze/brak danych, nie jako bez podpowiedzi. Liczby początkowe i poprawność ukończenia nadal weryfikuje dotychczasowa biblioteka.

## Izolacja

Nowy zapis: `sudoku-progress-preview-v1` (sesje i ukończenia). Moduł odczytuje istniejące `sudoku-library-v1`, ale go nie modyfikuje; oryginalny moduł biblioteki nadal zapisuje zwykłe ukończenia podczas gry. Lokalny adres ma osobny localStorage względem https://rsudoku.pl. Dane planszy i historii nie są zmieniane przez licznik. Ustawienia pomocy nie wchodzą do JSON sudoku. Błąd pamięci lokalnej jest pokazywany w panelu; gra nadal działa.

Testy: flaga domyślnie wyłączona i niedostępna na produkcyjnym hoście, unikalność ukończeń, zachowanie kategorii, pamiętanie pomocy, migracja starych ukończeń, osobne sesje, poziomy i data lokalna, połączenie z biblioteką bez zmiany danych planszy. Ręcznie: kończenie planszy pojedynczym kandydatem, osiągnięcie, kalendarz i licznik. Przed wydaniem należy dopracować tłumaczenia, wersjonowanie nowych zasobów i zasady kalendarza dla ponownych rozwiązań.

## Cel tygodniowy i puchary

Domyślny cel to pięć nowych ukończonych plansz w tygodniu. Można wybrać 3, 5, 7 lub Bez celu. Tydzień trwa od poniedziałku do niedzieli według lokalnej daty przeglądarki, także na przełomie roku i zmiany czasu. Wszystkie nowe ukończenia liczą się jednakowo, bez względu na pomoc. Wcześniejsze ukończenia bez daty nie są doliczane do bieżącego tygodnia.

Za realizację celu przyznawany jest jeden pucharek na tydzień. Zapisane puchary pozostają po zwiększeniu lub wyłączeniu celu. Zwiększenie celu może ponownie pokazać niepełny pasek, ale nie odbiera zdobytej nagrody. Zmniejszenie celu może od razu przyznać pucharek. Wyłączony cel nie przyznaje nowych pucharów. Brak kar za przerwę; ukończenia i puchary z poprzednich tygodni pozostają zapisane. Po rozpoczęciu nowego tygodnia pasek liczy od nowa i stosuje ostatnio wybraną wysokość celu.

W tym samym zapisie testowym dodano weeklyTarget, goals (cel według daty poniedziałku) i awards (zdobyte puchary). Nie wprowadzono punktów, reklam, rankingu ani blokowania funkcji. Testy obejmują granice tygodnia/roku, cele, ukończenia z pomocą, trwałość i unikalność nagrody, wyłączenie celu oraz powrót po odświeżeniu.
