# Lokalne usprawnienia sterowania

Zmiany na gałęzi codex/forma-preview; nie zostały jeszcze opublikowane. Publiczna strona nadal działa w wersji 1.18.0.

## Więcej

Menu zawiera teraz Oblicz kandydatów, Wypełnij pojedynczych kandydatów, Wyczyść kandydatów, Edytuj liczby początkowe (gdy są zablokowane), następnie separator oraz Restartuj sudoku i Nowa, pusta plansza. Są to skróty do istniejących akcji przez data-action, więc zachowują dotychczasową walidację i historię. Dotychczasowe przyciski narzędzi pozostały dostępne. Podpowiedz technikę nie jest schowana w menu.

Menu na krótkich ekranach przewija się w pionie; na telefonie jest kotwiczone do całej belki we wszystkich motywach.

## Kontrast

Na stronie głównej i stronie licencji w nagłówku obok A+ jest zawsze widoczny przycisk Kontrast. Posiada pełną przetłumaczoną nazwę Wysoki kontrast, aria-pressed oraz widoczny fokus. Stan aktywny ma żółte tło i czarną ramkę. Opcję Wysoki kontrast usunięto z listy motywów: dostęp zapewnia osobny przycisk.

Włączenie przełącza na istniejący tryb wysokiego kontrastu; wyłączenie przywraca wcześniejszy motyw. Wygląd listy podczas aktywnego kontrastu pokazuje ten wcześniejszy motyw zamiast pustej wartości. Wybranie innego motywu z listy przełącza na niego i wyłącza kontrast. Większy tekst jest niezależny; bez localStorage przełączanie działa w bieżącej karcie.

Stan wysokiego kontrastu nadal jest zapisany w sudoku-theme jako contrast, co zachowuje kompatybilność ze starszymi zapisami. Ostatni zwykły motyw jest zapisany pod sudoku-previous-theme. Parametr lokalnego podglądu nie nadpisuje zapisanego włączonego kontrastu. Nie zmienia się stan planszy, notatek, historii ani eksportu.

Na telefonie o zwykłym tekście Kontrast i A+ są w górnym wierszu nagłówka. W trybie większego tekstu grupa dostaje osobny wiersz, aby nie kolidowała z nazwą aplikacji i selektorami. Style są w accessibility.css. Przy przyszłej publikacji ten plik trzeba uwzględnić w procedurze wersjonowania tak jak pozostałe nowe arkusze lokalne.

## Języki

Dodano tłumaczenia przycisku Kontrast i etykiety Oblicz kandydatów bez ozdobnego znaku. Obecnej kolejności języków jeszcze nie zmieniono. Zasugerowano alfabetyczny porządek nazw łacińskich, następnie pozostałe pisma; wybór języka i negocjacja z przeglądarką pozostają bez zmian.

## Sprawdzenie

Testy obejmują powrót do motywu po wyłączeniu kontrastu i przeładowaniu, zgodność selektora, działanie bez pamięci lokalnej, niezależność większego tekstu, brak opcji kontrastu w obu listach oraz tłumaczenia. Test kredytów porównuje wynik do odpowiedniego wpisu katalogu, ponieważ poprawny niemiecki Kontrast jest identyczny z polskim słowem. W przeglądarce sprawdzono nagłówek 390/320 px, wykonanie Oblicz kandydatów z Więcej, zamknięcie menu po akcji, przywrócenie Mandarynki i układ większego tekstu.
