# Podgląd poziomów według technik

Podgląd dostępny wyłącznie lokalnie: `http://localhost:5200/?features=technique-levels`. Bez parametru aplikacja zachowuje cztery dotychczasowe kategorie. Flaga nie działa na rsudoku.pl; brak wdrożenia na produkcję. Gałąź: `codex/technique-levels-preview`.

| Poziom | Zakres narastający | Plansze |
|---|---|---:|
| Na początek | Jedyny kandydat | 1802 |
| Łatwy (domyślny) | Jedyne miejsce dla cyfry | 2511 |
| Średni | Zablokowani kandydaci | 1100 |
| Wymagający | Nagie i ukryte pary, trójki, czwórki | 710 |
| Zaawansowany | X/XY/XYZ/W-Wing, Skyscraper, Swordfish, Jellyfish | 1478 |
| Ekstremalny | Prostokąty, kolorowanie, X/XY/AIC | 2399 |

Pierwsze cztery kafelki są widoczne od razu. Dwa ostatnie znajdują się pod „Szukasz większego wyzwania?”. Opisy i nazwy dostępne w dziesięciu językach. Każdy poziom ma oddzielne losowanie i łamigłówkę dnia.

## Sprawdzanie

`node scripts/library/classify.cjs` ponownie rozwiązuje wszystkie 10 000 istniejących plansz. Najpierw ogranicza prawdziwe `findHint` do czterech pierwszych grup, a w razie zatrzymania sprawdza kolejno zakres zaawansowany i pełny. Każdy krok jest rzeczywistym wpisaniem cyfry lub eliminacją kandydatów. Na końcu sprawdzana jest kompletna plansza bez konfliktów. Unikalność pierwotnego zestawu jest objęta istniejącymi testami biblioteki.

Wszystkie 10 000 plansz sklasyfikowano; żadnej nie odrzucono. Kategoria odpowiada najwyższej technice w potwierdzonej ścieżce tego analizatora. To nie dowód, że ta technika jest konieczna we wszystkich możliwych ścieżkach albo że dwie plansze tej samej kategorii wymagają tyle samo wysiłku.

`dist/puzzles/technique-levels.json` przechowuje indeks istniejących stabilnych ID i plików partii, bez duplikowania zagadek. Zawiera hash źródłowego manifestu i silnika. `reports/technique-levels.json` przechowuje profil dowodu każdej planszy. Test weryfikuje zgodność indeksu i profili oraz ponownie rozwiązuje próbkę z każdej partii i poziomu pod odpowiednim limitem.

Podpowiedzi w podglądzie respektują limit wybranego poziomu także podczas odtwarzania wcześniejszych eliminacji. Zwykły tryb i własne importy nadal mają pełny zakres technik.

## Dane i granice testu

Biblioteka testowa zapisuje ukończenia i metadane osobno pod `sudoku-library-technique-preview-v1`. Nie zapisuje wyników do zwykłej biblioteki ani do celów i plakietek. Plansza, kandydaci i historia nadal są zwykłą grą na danym lokalnym adresie, więc wczytanie nowej planszy zachowuje standardowe potwierdzenie i cofanie. Identyfikatory źródłowe nie zmieniają się.

Przed wdrożeniem należy ustalić migrację dotychczasowych czterech odznak poziomów oraz połączenie starych ukończeń z nowymi kategoriami. Nie przeprowadzamy migracji przy samym podglądzie.
