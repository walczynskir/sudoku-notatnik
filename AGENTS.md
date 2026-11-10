# Wspólne zasady gier

- Nową grę umieszczaj w osobnym katalogu i prowadź w osobnym repozytorium, na wzór Domino. Utrzymuj samodzielny katalog publikacyjny `dist/`. W projekcie gry zapisz odwołanie do tych zasad lub przenieś je do jego `AGENTS.md`, aby obowiązywały również po osobnym sklonowaniu.
- Przed projektowaniem interfejsu obejrzyj bieżące wersje Sudoku i Domino. Domino jest wzorcem rozmieszczenia wspólnych elementów w nowej grze, a Sudoku punktem odniesienia dla wyglądu i dostępności. Zachowaj wspólny styl nagłówka, przycisków, paska gry, ustawień i pomocy. Dopasuj planszę i sterowanie do mechaniki gry.
- Zacznij od wspólnych stylów `shared-game.css` i `shared-palettes.css`. Korzystaj z ich palet i zmiennych również na planszy. Zachowaj nazwy i wygląd wspólnych motywów oraz działanie wysokiego kontrastu i powiększonego tekstu.
- Obsłuż zestaw języków z aktualnego katalogu Domino. Tłumacz także reguły, ustawienia, komunikaty gry i etykiety dostępności. Ustawiaj język i kierunek dokumentu, w tym RTL dla arabskiego. Zachowaj kolejność elementów planszy tam, gdzie ma znaczenie dla gry.
- Wydziel silnik reguł od renderowania i zapisu. Używaj własnych kluczy zapisu gry i preferencji. Zasady konkretnej gry zapisuj w jej dokumentacji.
- Przy zmianach interfejsu sprawdź w przeglądarce szeroki i wąski ekran, sterowanie klawiaturą i dotykiem, motywy, zmianę języka, RTL oraz odtworzenie zapisu po przeładowaniu. Testuj reguły silnika niezależnie od przeglądarki.
- Zachowaj wspólne elementy wsparcia Ukrainy i Ciapkowa. Sprawdź aktualne odnośniki i ich umiejscowienie w Sudoku i Domino oraz przenieś motyw Ukrainy w ramach wspólnych palet.
- Umieść odnośnik do strony licencji i autorstwa w stopce. Udokumentuj pochodzenie i licencje wykorzystanych bibliotek, fontów, ikon, grafik oraz innych materiałów. Zachowaj wymagane informacje o autorstwie i dołącz wymagane teksty licencji.
- Przygotuj osobne logo gry, spójne stylistycznie z logo Sudoku i Domino. Użyj go w nagłówku oraz przygotuj odpowiadającą mu ikonę karty przeglądarki.
- Udostępnij przełączniki wysokiego kontrastu i powiększonego tekstu w tym samym miejscu co w grach wzorcowych. Sprawdź ich działanie także na planszy, w pomocy i ustawieniach.
- W pierwszej kolejności wykorzystuj gotowe elementy z Sudoku i Domino: strukturę HTML, style i zachowanie nagłówka, stopki, paska gry, ustawień, pomocy oraz przełączników dostępności. Używaj tych samych ikon dla tych samych funkcji, tych samych zasobów graficznych i fontów oraz pełnego zestawu wspólnych motywów. Zachowuj etykiety i obsługę klawiatury.
- Jeśli element jest dostępny jako wspólny plik lub moduł, wykorzystaj go bezpośrednio w procesie budowania. Gdy jest częścią jednej gry, przenieś go z możliwie małymi zmianami i wskaż źródło w dokumentacji projektu. Każda gra ma mieć komplet potrzebnych zasobów w swoim `dist/`, aby mogła działać niezależnie.
- Uwzględniaj gamifikację na wzór Sudoku i Domino. Miedź i Nocne niebo są motywami za osiągnięcia i mają być zablokowane na starcie. Pokazuj próg i postęp przy zablokowanych motywach. Zapisuj osiągnięcia osobno od stanu bieżącej partii i dobieraj warunki do mechaniki gry.

- Udostępniaj nowe gry pod stałym adresem HTTPS, tak jak Domino i Sudoku, i otwieraj gotową wersję w prawym panelu Codexa. Przy wdrożeniach przez Sites zachowuj identyfikator strony i jej ustawienia dostępu. Przed podaniem adresu potwierdź zakończenie wdrożenia.
- Przy opcjach ustawień dodawaj przyciski ⓘ na wzór Sudoku i Domino. Krótki opis ma wyjaśniać działanie opcji i moment zastosowania zmiany. Tłumacz opisy i udostępniaj je klawiaturą oraz dotykiem.
- Przy zwycięstwie używaj wspólnych `shared-victory.js` i `shared-victory.css`. Kopiuj oba pliki bez zmian z `sudoku/dist/` do katalogu `dist/` każdej gry. We wszystkich motywach pokazuj ten sam puchar na środku ekranu i krótkie konfetti z poszanowaniem ustawienia ograniczonego ruchu.

- Przycisk pełnego ekranu umieszczaj na pasku gry. Na szerokim ekranie pokazuj przetłumaczony tekst „Pełny ekran” lub „Wyjdź z pełnego ekranu”. Na wąskim ekranie pokazuj wspólną ikonę ⛶. W obu układach aktualizuj dostępną nazwę i stan `aria-pressed`.

- W stopce każdej gry pokazuj do trzech ikon ostatnio otwieranych gier na podstawie historii Games Chest. Pomijaj aktualną grę. Każda ikona ma przetłumaczoną nazwę dostępną dla klawiatury i czytnika ekranu. Zawsze pokazuj link „Wszystkie gry” do https://games-chest.com/. Otwieraj gry w tej samej karcie.

- W pełnym ekranie centruj grupy przycisków gry względem stołu i uwzględniaj bezpieczne odstępy ekranu, na wzór Domino. Sprawdź układ na szerokim ekranie i telefonie w poziomie.

- Wspólne kolory motywów edytuj w sudoku/dist/shared-palettes.css i kopiuj plik bez zmian do Domino i Ośmiu Asów. W arkuszu danej gry mapuj wspólne zmienne na jej własne elementy interfejsu.

- Przed zmianą lub publikacją pobierz aktualny main źródeł i GitHub Pages, porównaj oba z kopią roboczą i zachowaj nowsze zmiany. Zachowaj wspólny identyfikator Umami Games Chest oraz tag eight-aces. Po publikacji sprawdź publiczny adres i zapisz oba commity.

# Wydania Sudoku

- Przed zmianami i publikacją pobierz aktualny `main` z repozytorium źródłowego i porównaj go z lokalnymi zmianami. GitHub Pages publikuje `dist/` bezpośrednio z tego repozytorium przez GitHub Actions.
- Zachowaj wspólny identyfikator witryny Umami Games Chest i tag `sudoku` dla `rsudoku.pl`.
- Jeśli aktualizacja gry wymaga zmiany wpisu katalogowego, przekaż konkretną zmianę w wątku Games Chest.
- Po publikacji sprawdź https://rsudoku.pl/ i podaj commit źródłowy.

## Wydania

Stosuj [wspólne zasady wersjonowania Games Chest](docs/RELEASES.md) i skrypt `scripts/release-version.mjs` przed każdą publikacją.
