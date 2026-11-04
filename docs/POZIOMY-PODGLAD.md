# Podgląd poziomów według technik

Podgląd dostępny wyłącznie lokalnie: `http://localhost:5200/?features=technique-levels`. Bez parametru aplikacja zachowuje cztery dotychczasowe kategorie. Flaga nie działa na rsudoku.pl; brak wdrożenia na produkcję. Gałąź: `codex/technique-levels-preview`.

| Poziom | Zakres narastający | Plansze |
|---|---|---:|
| Na początek | Jedyny kandydat | 1802 |
| Łatwy (domyślny) | Jedyne miejsce dla cyfry | 2511 |
| Wymagający | Zablokowani kandydaci | 1100 |
| Zaawansowany | Nagie i ukryte pary, trójki, czwórki | 710 |
| Ekstremalny | X/XY/XYZ/W-Wing, Skyscraper, Swordfish, Jellyfish | 1478 |
| Arcymistrzowski | Prostokąty, kolorowanie, X/XY/AIC | 2399 |

Pierwsze cztery kafelki są widoczne od razu. Dwa ostatnie znajdują się pod „Szukasz ekstremalnego wyzwania?”; sekcja jest domyślnie rozwinięta i można ją zwinąć. Opisy i nazwy dostępne w dziesięciu językach. Każdy poziom ma oddzielne losowanie i łamigłówkę dnia.

## Sprawdzanie

`node scripts/library/classify.cjs` ponownie rozwiązuje wszystkie 10 000 istniejących plansz. Najpierw ogranicza prawdziwe `findHint` do czterech pierwszych grup, a w razie zatrzymania sprawdza kolejno zakres zaawansowany i pełny. Każdy krok jest rzeczywistym wpisaniem cyfry lub eliminacją kandydatów. Na końcu sprawdzana jest kompletna plansza bez konfliktów. Unikalność pierwotnego zestawu jest objęta istniejącymi testami biblioteki.

Wszystkie 10 000 plansz sklasyfikowano; żadnej nie odrzucono. Kategoria odpowiada najwyższej technice w potwierdzonej ścieżce tego analizatora. To nie dowód, że ta technika jest konieczna we wszystkich możliwych ścieżkach albo że dwie plansze tej samej kategorii wymagają tyle samo wysiłku.

`dist/puzzles/technique-levels.json` przechowuje indeks istniejących stabilnych ID i plików partii, bez duplikowania zagadek. Zawiera hash źródłowego manifestu i silnika. `reports/technique-levels.json` przechowuje profil dowodu każdej planszy. Test weryfikuje zgodność indeksu i profili oraz ponownie rozwiązuje próbkę z każdej partii i poziomu pod odpowiednim limitem.

Podpowiedzi w podglądzie respektują limit wybranego poziomu także podczas odtwarzania wcześniejszych eliminacji. Zwykły tryb i własne importy nadal mają pełny zakres technik.

## Dane i granice testu

Biblioteka testowa zapisuje ukończenia i metadane osobno pod `sudoku-library-technique-preview-v1`. Nie zapisuje wyników do zwykłej biblioteki ani do dotychczasowych celów i plakietek. Plansza, kandydaci i historia nadal są zwykłą grą na danym lokalnym adresie, więc wczytanie nowej planszy zachowuje standardowe potwierdzenie i cofanie. Identyfikatory źródłowe nie zmieniają się.

Przed wdrożeniem należy ustalić migrację dotychczasowych czterech odznak poziomów oraz połączenie starych ukończeń z nowymi kategoriami. Nie przeprowadzamy migracji przy samym podglądzie.

## Plakietki samodzielności i dwa motywy

Podgląd ma sześć własnych, trwałych plakietek: po jednej za pierwsze samodzielne ukończenie każdego nowego poziomu. Status widoczny jest przy kafelku poziomu. Szczegóły i warunki motywów są w rozwijanej sekcji „Plakietki i motywy nagrodowe”. Zdobycie plakietki jest ogłaszane krótkim komunikatem bez okna modalnego.

Samodzielnie oznacza brak znalezionej podpowiedzi techniki i brak włączonego oznaczania błędnych wpisów podczas danej próby. Obliczanie i edycja kandydatów oraz rekurencyjne wypełnianie pojedynczych są dozwolone. Flaga użycia pomocy pozostaje po cofnięciu ruchu, wyłączeniu oznaczania, restarcie i odświeżeniu. Świadome wczytanie planszy jako nowej próby rozpoczyna nową historię pomocy; można zdobyć plakietkę przy kolejnym samodzielnym rozwiązaniu. Wyniki sprzed dodania śledzenia nie otrzymują nagród wstecz.

Sesje i plakietki mają osobny klucz `sudoku-technique-achievements-preview-v1`. Motywy testowe korzystają z osobnej preferencji `sudoku-technique-theme-preview`. Zwykłe dane celów i motyw produkcyjny nie są zmieniane.

- Ekstremalny samodzielnie: **Obsydian** — ciemny granat i złote akcenty.
- Arcymistrzowski samodzielnie: **Korona** — jasna kość słoniowa i złote/brązowe akcenty.

Motywy odblokowują się trwale, nie są włączane automatycznie. Po zdobyciu można wybrać je w sekcji nagród lub w selektorze motywu. Niezależnie dostępne pozostają kontrast i większy tekst. Awaria pamięci lokalnej pozostawia nagrody tylko na sesję z widocznym komunikatem.

Dwa lokalne linki demonstracyjne pozwalają obejrzeć wygląd bez przyznawania plakietek: `?features=technique-levels&preview=obsidian` i `?features=technique-levels&preview=crown`. Są pomocą do oceny podglądu, nie działają jako odblokowanie na produkcji. Cały mechanizm jest lokalny, bez konta i bez ochrony przed ręczną edycją własnego localStorage.
