> Dostępne na rsudoku.pl od wersji 1.19.0. Domyślna jest Porcelana; zapisane preferencje są zachowane. Adresy localhost poniżej służą wyłącznie do testów lokalnych. Nazwy plików z PODGLAD zachowano dla ciągłości odnośników.

# Lokalne usprawnienia sterowania

Sterowanie zostało opublikowane na głównej gałęzi w 1.19.0.

## Więcej

Menu zawiera teraz Oblicz kandydatów, Wypełnij pojedynczych kandydatów, Wyczyść kandydatów, Edytuj liczby początkowe (gdy są zablokowane), następnie separator oraz Restartuj sudoku i Nowa, pusta plansza. Są to skróty do istniejących akcji przez data-action, więc zachowują dotychczasową walidację i historię. Dotychczasowe przyciski narzędzi pozostały dostępne. Podpowiedz technikę nie jest schowana w menu.

Menu na krótkich ekranach przewija się w pionie; na telefonie jest kotwiczone do całej belki we wszystkich motywach.

## Kontrast

Na stronie głównej i stronie licencji w nagłówku obok A+ jest zawsze widoczny przycisk Kontrast. Posiada pełną przetłumaczoną nazwę Wysoki kontrast, aria-pressed oraz widoczny fokus. Stan aktywny ma żółte tło i czarną ramkę. Opcję Wysoki kontrast usunięto z listy motywów: dostęp zapewnia osobny przycisk.

Włączenie przełącza na istniejący tryb wysokiego kontrastu; wyłączenie przywraca wcześniejszy motyw. Wygląd listy podczas aktywnego kontrastu pokazuje ten wcześniejszy motyw zamiast pustej wartości. Wybranie innego motywu z listy przełącza na niego i wyłącza kontrast. Większy tekst jest niezależny; bez localStorage przełączanie działa w bieżącej karcie.

Stan wysokiego kontrastu nadal jest zapisany w sudoku-theme jako contrast, co zachowuje kompatybilność ze starszymi zapisami. Ostatni zwykły motyw jest zapisany pod sudoku-previous-theme. Parametr lokalnego podglądu nie nadpisuje zapisanego włączonego kontrastu. Nie zmienia się stan planszy, notatek, historii ani eksportu.

Na telefonie o zwykłym tekście Kontrast i A+ są w górnym wierszu nagłówka. W trybie większego tekstu grupa dostaje osobny wiersz, aby nie kolidowała z nazwą aplikacji i selektorami. Style są w accessibility.css. Plik jest objęty procedurą wersjonowania wraz z pozostałymi arkuszami motywów.

## Języki

Dodano tłumaczenia przycisku Kontrast i etykiety Oblicz kandydatów bez ozdobnego znaku. Kolejność w obu selektorach: Deutsch, English, Español, Français, Italiano, Polski, العربية, हिन्दी, 简体中文. Nazwy łacińskie są alfabetyczne, pozostałe pisma zgrupowano na końcu. Wartości opcji, negocjacja z przeglądarką i kolejność kolumn katalogu tłumaczeń nie zmieniły się.

## Sprawdzenie

Testy obejmują powrót do motywu po wyłączeniu kontrastu i przeładowaniu, zgodność selektora, działanie bez pamięci lokalnej, niezależność większego tekstu, brak opcji kontrastu w obu listach oraz tłumaczenia. Test kredytów porównuje wynik do odpowiedniego wpisu katalogu, ponieważ poprawny niemiecki Kontrast jest identyczny z polskim słowem. W przeglądarce sprawdzono nagłówek 390/320 px, wykonanie Oblicz kandydatów z Więcej, zamknięcie menu po akcji, przywrócenie Mandarynki i układ większego tekstu.

Mobilny nagłówek używa teraz dwóch rzeczywistych wierszy CSS Grid: nazwa i dostępność, następnie język i motyw. Nie ma absolutnie pozycjonowanej grupy nad selektorem. Większy tekst układa kontrolki w dodatkowe wiersze. Przycisk Kontrast dopasowuje promień do motywu: Szałwia 8 px, Atrament i papier 3 px, Pracownia i kontrast 2 px, pozostałe warianty kapsułka.
