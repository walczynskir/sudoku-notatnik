# Poziomy według technik — od 1.24.0

Sześć poziomów jest domyślnie dostępnych na rsudoku.pl. Nazwę pliku dokumentacji zachowano dla zgodności odnośników. Lokalny adres `?features=technique-levels` nadal włącza izolowany zapis testowy; na produkcji ten parametr nie zmienia sposobu zapisu.

| Poziom | Zakres narastający | Plansze |
|---|---|---:|
| Na początek | Jedyny kandydat | 1802 |
| Łatwy (domyślny) | Jedyne miejsce dla cyfry | 2511 |
| Wymagający | Zablokowani kandydaci | 1100 |
| Ekspert | Nagie i ukryte pary, trójki, czwórki | 710 |
| Ekstremalny | X/XY/XYZ/W-Wing, Skyscraper, Swordfish, Jellyfish | 1478 |
| Arcymistrzowski | Prostokąty, kolorowanie, X/XY/AIC | 2399 |

Pierwsze cztery kafelki są widoczne od razu. Dwa ostatnie znajdują się pod „Szukasz ekstremalnego wyzwania?”; sekcja jest domyślnie rozwinięta i można ją zwinąć. Opisy i nazwy dostępne w dziesięciu językach. Każdy poziom ma oddzielne losowanie i łamigłówkę dnia.

## Sprawdzanie

`node scripts/library/classify.cjs` ponownie rozwiązuje wszystkie 10 000 istniejących plansz. Najpierw ogranicza prawdziwe `findHint` do czterech pierwszych grup, a w razie zatrzymania sprawdza kolejno zakres zaawansowany i pełny. Każdy krok jest rzeczywistym wpisaniem cyfry lub eliminacją kandydatów. Na końcu sprawdzana jest kompletna plansza bez konfliktów. Unikalność pierwotnego zestawu jest objęta istniejącymi testami biblioteki.

Wszystkie 10 000 plansz sklasyfikowano; żadnej nie odrzucono. Kategoria odpowiada najwyższej technice w potwierdzonej ścieżce tego analizatora. To nie dowód, że ta technika jest konieczna we wszystkich możliwych ścieżkach albo że dwie plansze tej samej kategorii wymagają tyle samo wysiłku.

`dist/puzzles/technique-levels.json` przechowuje indeks istniejących stabilnych ID i plików partii, bez duplikowania zagadek. Zawiera hash źródłowego manifestu i silnika. `reports/technique-levels.json` przechowuje profil dowodu każdej planszy. Test weryfikuje zgodność indeksu i profili oraz ponownie rozwiązuje próbkę z każdej partii i poziomu pod odpowiednim limitem.

Podpowiedzi biblioteki respektują limit wybranego poziomu także podczas odtwarzania wcześniejszych eliminacji. Własne importy nadal mają pełny zakres technik.

## Zachowanie dotychczasowych postępów

Produkcyjna biblioteka nadal korzysta z `sudoku-library-v1`, a cele, kolekcje i statystyki z `sudoku-progress-preview-v1` (historyczna nazwa klucza). Stabilne ID i ukończenia nie zmieniają się; licznik każdego nowego poziomu zlicza istniejące ID według nowego indeksu. Metadane rozgrywanej planszy są przypisywane do nowego poziomu przy odczycie indeksu, bez zmiany planszy i notatek. Cele dzienne oraz setki obejmują wszystkie nowe poziomy. Powtórne rozwiązanie nadal nie zwiększa sumy ukończeń.

Zdobyte wcześniej cztery plakietki poziomów pozostają w albumie w sekcji „Wcześniejsze poziomy”. Nowe rozgrywki nie przyznają starych plakietek na podstawie źródłowej kategorii. Plakietek samodzielności nie przyznajemy wstecz bez śledzonej próby.

Wyłącznie lokalny jawny podgląd `?features=technique-levels` zapisuje bibliotekę osobno w `sudoku-library-technique-preview-v1`, nagrody w `sudoku-technique-achievements-preview-v1`, a motyw w `sudoku-technique-theme-preview`. Jego ukończenia nie trafiają do zwykłych celów. Testowych nagród nie przenosimy na produkcję. Sama plansza nadal używa lokalnego zapisu gry; standardowe potwierdzenie zastąpienia i cofanie działają bez zmian.

## Plakietki samodzielności i dwa motywy

Biblioteka ma sześć własnych, trwałych plakietek: po jednej za pierwsze samodzielne ukończenie każdego nowego poziomu. Status widoczny jest przy kafelku poziomu. Szczegóły i warunki motywów są w rozwijanej sekcji „Plakietki i motywy nagrodowe”. Zdobycie plakietki jest ogłaszane krótkim komunikatem bez okna modalnego.

Samodzielnie oznacza brak znalezionej podpowiedzi techniki i brak włączonego oznaczania błędnych wpisów podczas danej próby. Obliczanie i edycja kandydatów oraz rekurencyjne wypełnianie pojedynczych są dozwolone. Flaga użycia pomocy pozostaje po cofnięciu ruchu, wyłączeniu oznaczania, restarcie i odświeżeniu. Świadome wczytanie planszy jako nowej próby rozpoczyna nową historię pomocy; można zdobyć plakietkę przy kolejnym samodzielnym rozwiązaniu. Wyniki sprzed dodania śledzenia nie otrzymują nagród wstecz.

Produkcyjne sesje i plakietki mają klucz `sudoku-technique-achievements-v1`. Zdobyte motywy korzystają ze zwykłej preferencji `sudoku-theme` i działają także na stronie licencji. `?features=no-gamification` ukrywa nagrody i postępy, zachowując zapisane dane; poziomy pozostają dostępne.

- Ekstremalny samodzielnie: **Obsydian** — ciemny granat i złote akcenty.
- Arcymistrzowski samodzielnie: **Korona** — jasna kość słoniowa i złote/brązowe akcenty.

Motywy odblokowują się trwale, nie są włączane automatycznie. Po zdobyciu można wybrać je w sekcji nagród lub w selektorze motywu. Niezależnie dostępne pozostają kontrast i większy tekst. Awaria pamięci lokalnej pozostawia nagrody tylko na sesję z widocznym komunikatem.

Dwa lokalne linki demonstracyjne pozwalają obejrzeć wygląd bez przyznawania plakietek: `?features=technique-levels&preview=obsidian` i `?features=technique-levels&preview=crown`. Są pomocą do oceny podglądu, nie działają jako odblokowanie na produkcji. Cały mechanizm jest lokalny, bez konta i bez ochrony przed ręczną edycją własnego localStorage.
