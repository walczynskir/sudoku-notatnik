# Moje postępy — lokalny prototyp

Gałąź `codex/progress-preview`, bez publikacji i bez nowego numeru wydania. Produkcja pozostaje przy 1.20.3.

Adres: http://127.0.0.1:5196/?features=gamification . Bez parametru interfejs postępów jest wyłączony. Kod sprawdza również nazwę hosta: rsudoku.pl nie może włączyć eksperymentu parametrem URL. To ograniczenie wdrożeniowe, nie mechanizm autoryzacji. Serwer nasłuchuje wyłącznie na 127.0.0.1. Nie ma kont, synchronizacji ani telemetrii postępów. Prototyp interfejsu jest na razie po polsku; tłumaczenia wymagają przygotowania przed publikacją.

## Zakres

Przycisk Moje postępy otwiera licznik unikalnych ukończonych plansz z biblioteki 10 000, trzy kategorie oraz osiągnięcia: pierwsza plansza, dziesięć ukończonych, ukończenie wszystkich czterech poziomów. Kalendarz pokazuje lokalne daty pierwszych zarejestrowanych ukończeń Sudoku dnia w bieżącym miesiącu. W tym prototypie ponowne ukończenie tej samej planszy nie dodaje dnia ani nie zmienia kategorii. Dane historyczne nie wystarczają do odtworzenia wcześniejszych dni i poziomów.

Bez podpowiedzi oznacza brak ujawnionej techniki i brak włączonego oznaczania błędnych cyfr podczas śledzonej rozgrywki. Samo obliczanie kandydatów i automatyczne wypełnianie pojedynczych nie są pomocą. Ujawnienie nazwy techniki wystarcza do kategorii z pomocą. Cofnięcie wpisów lub wyłączenie oznaczania błędów nie usuwa faktu użycia pomocy.

Nowa śledzona sesja powstaje dopiero po zaakceptowaniu wczytania planszy z biblioteki. Jest zapisywana i może być wznowiona po odświeżeniu. Dotychczasowe ukończenia i rozgrywki bez początku śledzenia są pokazywane jako wcześniejsze/brak danych, nie jako bez podpowiedzi. Liczby początkowe i poprawność ukończenia nadal weryfikuje dotychczasowa biblioteka.

## Izolacja

Nowy zapis: `sudoku-progress-preview-v1` (sesje i ukończenia). Moduł odczytuje istniejące `sudoku-library-v1`, ale go nie modyfikuje; oryginalny moduł biblioteki nadal zapisuje zwykłe ukończenia podczas gry. Lokalny adres ma osobny localStorage względem https://rsudoku.pl. Dane planszy i historii nie są zmieniane przez licznik. Ustawienia pomocy nie wchodzą do JSON sudoku. Błąd pamięci lokalnej jest pokazywany w panelu; gra nadal działa.

Testy: flaga domyślnie wyłączona i niedostępna na produkcyjnym hoście, unikalność ukończeń, zachowanie kategorii, pamiętanie pomocy, migracja starych ukończeń, osobne sesje, poziomy i data lokalna, połączenie z biblioteką bez zmiany danych planszy. Ręcznie: kończenie planszy pojedynczym kandydatem, osiągnięcie, kalendarz i licznik. Przed wydaniem należy dopracować tłumaczenia, wersjonowanie nowych zasobów i zasady kalendarza dla ponownych rozwiązań.
