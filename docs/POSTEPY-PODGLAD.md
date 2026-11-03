# Moje postępy — lokalny prototyp

Gałąź `codex/progress-preview`, bez publikacji i nowego numeru wydania. Produkcja pozostaje przy 1.20.3. Adres: http://127.0.0.1:5196/?features=gamification . Bez flagi funkcja jest wyłączona. Kod sprawdza host: rsudoku.pl nie może jej włączyć parametrem. To ograniczenie wdrożeniowe, nie zabezpieczenie przed modyfikacją kodu lub localStorage. Serwer nasłuchuje na 127.0.0.1. Interfejs prototypu jest po polsku; tłumaczenia i wersjonowanie nowych zasobów wymagają przygotowania przed wydaniem.

## Cel dzienny i pucharki

Na komputerze klikalny pasek nad grą pokazuje postęp dzisiaj, liczbę pucharków oraz aktualną setkę. Na telefonie do 640 px pasek jest ukryty; zamiast niego przy liczniku pól jest kompaktowy przycisk 🎯 2/3 · 🏆 1. Oba otwierają ten sam panel. Wyłączony cel pokazuje kreskę, a liczby pucharków powyżej 99 skrót 99+; pełne wartości pozostają w opisie dostępności. Większy tekst może zawinąć wiersz dla czytelności. Po kliknięciu otwiera ustawienia i nagrody. Statystyki oraz kalendarz są w rozwijanych szczegółach.

Domyślny cel: 3 nowe ukończone sudoku dziennie. Presety: 1, 3, 5, własny cel 1–99 albo Bez celu. Liczą się unikalne plansze biblioteki, niezależnie od trudności i użycia pomocy. Wcześniejsze ukończenia bez daty nie są wstecz doliczane do dzisiejszego celu. Powtórne rozwiązanie tej samej planszy nie zwiększa licznika.

Za realizację celu przyznajemy jeden pucharek na dzień, według lokalnej daty przeglądarki. Zwiększenie lub wyłączenie celu nie odbiera pucharków. Zmniejszenie może od razu przyznać dzisiejszą nagrodę. Wyłączony cel nie przyznaje nowych pucharów. Po północy licznik zaczyna od nowa i zachowuje ostatni wybrany cel; widok odświeża się przy grze, otwarciu panelu, powrocie do karty i co minutę. Nie ma kar za przerwy. Tydzień od poniedziałku pozostaje tylko podsumowaniem liczby ukończeń w szczegółach.

## Kolekcje setek

Każde 100 różnych ukończonych plansz tworzy jedną kolekcję. Na początku widoczna jest Pierwsza setka; po 100 ukończeniach odsłania się Setka 2 i pierwsza odznaka. To kolejne progi postępu, a nie zamknięte paczki przypisanych z góry plansz. Użytkownik sam wybiera poziom; cała biblioteka i import są dostępne od początku. Łączny wynik z 10 000 pozostaje widoczny w karcie kolekcji i statystykach. Po 10 000 ostatnia kolekcja pokazuje 100/100, bez fikcyjnej setki 101. Każda plansza jest liczona tylko raz.

## Nagrodowy motyw Zorza

Trzy pucharki dnia (trzy różne dni z osiągniętym celem) odblokowują trwale Zorzę. Pucharków się nie wydaje. Motyw ma białe powierzchnie, miętowo-lawendowy nagłówek i śliwkowe akcenty. Można go wybrać przy nagrodzie lub na liście motywów. Działa z większym tekstem i przełącznikiem wysokiego kontrastu. Dostępność, podpowiedzi i podstawowe narzędzia nie są nagrodami. Zorza jest rejestrowana tylko w lokalnym eksperymencie; poza flagą zapisany wybór Zorzy ma bezpieczny powrót do Porcelany. To prototyp, bez ochrony przed ręcznym edytowaniem danych użytkownika.

## Sposób rozwiązania

Bez podpowiedzi oznacza brak ujawnionej techniki i brak włączonego oznaczania błędnych cyfr w śledzonej rozgrywce. Obliczanie kandydatów i wypełnianie pojedynczych nie są pomocą. Cofnięcie wpisów lub wyłączenie oznaczania błędów nie usuwa faktu użycia pomocy. Nowa sesja powstaje dopiero po zaakceptowaniu wczytania z biblioteki i może być wznowiona po odświeżeniu. Dotychczasowe i nieśledzone ukończenia mają kategorię wcześniejsze/brak danych. Pierwsze ukończenie utrwala kategorię; powtórne jej nie zmienia. Biblioteka nadal sprawdza poprawność i zgodność cyfr początkowych.

## Zapis i izolacja

`sudoku-progress-preview-v1`: records, sessions, dailyTarget, dailyGoals, dailyAwards, unlockedThemes. Stare pola weeklyTarget/goals/awards z pierwszego prototypu zostają zachowane, ale tygodniowe puchary nie stają się dziennymi. Domyślny cel dzienny po migracji to 3. Moduł odczytuje dotychczasowe ukończenia `sudoku-library-v1`; zapis zwykłych ukończeń nadal należy do biblioteki. LocalStorage localhost/127.0.0.1 jest osobny względem https://rsudoku.pl. Licznik nie zmienia planszy, notatek, historii ani eksportu. Brak kont, synchronizacji, punktów, reklam i rankingu. Błąd pamięci lokalnej jest pokazywany w panelu; gra nadal działa.

## Weryfikacja

Testy obejmują blokadę flagi na produkcji, unikalność ukończeń, pomoc, migrację, granice dni i tygodni, własny cel, wyłączanie, trwałość nagrody, odblokowanie po trzech dniach, progi setek (99/100 i 10 000), rejestrację motywu tylko lokalnie oraz połączenie z biblioteką bez zmiany planszy. Ręcznie w izolowanych danych testowych: ostatni pojedynczy kandydat jednocześnie realizuje cel dnia, daje trzeci pucharek, odsłania Setkę 2 i motyw; wybór Zorzy pozostaje po odświeżeniu. Testowe HTML z danymi nie wchodzą do repozytorium.
