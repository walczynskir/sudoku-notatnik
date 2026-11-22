# Wspólne zasady gier

- Nie używaj przeglądarkowych `alert()`, `confirm()` ani `prompt()`. Potwierdzenia i pytania pokazuj w dostępnych, tłumaczonych oknach aplikacji, a krótkie komunikaty o wyniku umieszczaj przy akcji, której dotyczą. Okna obsługuj klawiaturą, w tym klawiszem Escape, i po zamknięciu przywracaj fokus do elementu, który je otworzył.

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

## Wspólny pasek przycisków gry


- W pionie i poziomie umieszczaj „Nowa gra” po lewej, a „Cofnij” i „Przywróć” w grupie przycisków po prawej, obok pełnego ekranu, pomocy i ustawień. Wszystkie te przyciski mają znajdować się w jednej linii. Cofanie i przywracanie są przysunięte do prawej grupy. Na wąskim ekranie stosuj ikony z przetłumaczonymi nazwami dostępnymi.
- Układ obejmuje także Garibaldkę w poziomie. Przymierz go na rzeczywistej planszy, z A+ i pełnym ekranem, przed przeniesieniem do pozostałych gier. Szczegóły gęstości i rozmiarów wymagają weryfikacji podglądu.
- Przełącznik wysokiego kontrastu ma widoczną etykietę „Kontrast” (z odpowiednim tłumaczeniem). Pełną nazwę „Wysoki kontrast” zachowaj jako przetłumaczoną nazwę dostępną. Aktualizuj aria-pressed. W nagłówku zapewnij miejsce na nazwę gry, Kontrast i A+ bez nakładania i obcinania, także na wąskim ekranie oraz przy powiększonym tekście.
- W pasku gry pokazuj przetłumaczoną etykietę „Nowa gra”, gdy przyciski mieszczą się w jednym wierszu. Gdy brakuje miejsca, użyj „+” z pełną przetłumaczoną nazwą dostępną. Dobieraj wariant do dostępnego miejsca, uwzględniając A+, język i pełny ekran. Etykiety „Cofnij” i „Przywróć” pokazuj, gdy mieszczą się w dostępnym miejscu, także w poziomie i pełnym ekranie. Ikony stosuj w ciasnym układzie. Pasek w pełnym ekranie wyrównuj względem stołu i uwzględniaj bezpieczne odstępy od obu krawędzi oraz safe-area.

- Cofnij/Przywróć jest domyślnie wyłączone poza Sudoku; w Sudoku jest domyślnie włączone. Zachowuj zapisany wybór. Wyłączenie ukrywa oba przyciski; włączenie pokazuje oba stale, nieaktywne przy braku historii. Ustawienie ma przetłumaczoną nazwę „Cofnij i Przywróć” oraz opis.

## Wspólne ustawienia Games Chest

- Stosuj zaakceptowany układ z Ośmiu Asów (`shared-settings.css`, `settings-strings.js`): nagłówek, przewijana treść i grupy opcji. Zachowuj własne opcje gry, ich klucze i moment zastosowania.
- Zamykaj okno wyłącznie przyciskiem × w prawym górnym rogu z pełną przetłumaczoną nazwą dostępną i celem minimum 44 × 44 px; bez dolnego przycisku Zamknij. Escape zamyka okno i przywraca fokus do przycisku ustawień.
- Zapisuj poprawne wartości automatycznie. Pokazuj błąd zapisu i umożliwiaj ponowienie. Opisy pod ⓘ i etykiety przy opcjach wyjaśniają moment zastosowania. Zamykanie zachowuje zmiany. Eksport/import to osobny zakres.

## Kopia konfiguracji i postępów

- Udostępniaj eksport i import kopii konfiguracji oraz trwałego postępu gry do pliku, do odtworzenia po reinstalacji lub przeniesienia na inne urządzenie. Kopia obejmuje język, motyw, dostępność, opcje gry, statystyki, osiągnięcia, odblokowane motywy oraz identyfikatory ukończonych łamigłówek Sudoku i postęp poziomów.
- Bieżąca partia i historia jej ruchów pozostają w lokalnym automatycznym zapisie. Kopia przenośna obejmuje trwały dorobek i konfigurację. Import zachowuje bieżącą partię urządzenia docelowego; opcje nowej partii obowiązują od kolejnej gry.
- Plik oznacz identyfikatorem gry i wersją formatu. Zweryfikuj całość przed zastosowaniem. Czytelnie obsłuż błąd odczytu, zapisu, obcą grę i nieobsługiwaną wersję. Pokaż zakres importowanych danych przed potwierdzeniem. Zasady łączenia określa sekcja „Odtwarzanie konfiguracji i dorobku z kopii”.
- Eksport i import konfiguracji oraz osiągnięć są docelowym zakresem wspólnej kopii. Istniejące formaty pełnych zapisów uwzględnij przy projektowaniu zgodności, aby zachować możliwość odtworzenia wcześniejszego dorobku.

## Odtwarzanie konfiguracji i dorobku z kopii

- Po potwierdzonym imporcie przyjmuj konfigurację z pliku. Łącz trwały dorobek z istniejącym na urządzeniu, zachowując lokalne osiągnięcia i odblokowania. Wyniki deduplikuj według identyfikatorów partii, a ukończone łamigłówki Sudoku według ich identyfikatorów. Ponowny import tej samej kopii nie zwiększa liczników.
- Przy konflikcie tego samego identyfikatora wyniku zachowaj wpis urządzenia docelowego. Odblokowane motywy łącz jako zbiór. Bieżąca partia i historia ruchów urządzenia docelowego pozostają zachowane wraz z aktywnymi regułami.
- Dla dawnych liczników bez identyfikatorów zachowuj wyższą wartość zamiast sumowania. Przed potwierdzeniem wyjaśnij ograniczenie odtwarzania takich danych. Wyliczenia z rozpoznawalnych rekordów i dawnych liczników muszą uwzględniać istniejącą migrację, aby ograniczyć podwójne naliczanie.
- Wzorcem jest kopia konfiguracji i postępów Ośmiu Asów: `pasjans/dist/shared-progress-backup.js` oraz adapter `progress-backup.js`, opisane w `pasjans/docs/PROGRESS-BACKUP-PREVIEW.md`. Gry używają wspólnej obwiedni formatu i własnych adapterów rzeczywistych danych dorobku.

- W pasku rozgrywki udostępniaj „Inne gry” zgodnie z zaakceptowanym wzorcem Domino. Utrzymuj przycisk w pełnym ekranie, dopasowuj tekst do miejsca i zachowuj tłumaczoną nazwę ikony. Okno pokazuje ikony i nazwy pozostałych gier, maksymalnie trzy ostatnio otwierane na początku oraz link „Wszystkie gry”. Linki otwieraj w tej samej karcie, z możliwością wznowienia partii po powrocie.
- W każdej sekcji ustawień umieszczaj najczęściej używane opcje na początku, a rzadziej używane niżej. Sekcję kopii konfiguracji i postępów umieszczaj na końcu ustawień.

- W oknie „Inne gry” pokazuj siatkę zaokrąglonych ikon z podpisami poniżej. Ikona i podpis są jednym celem dotykowym. Link „Wszystkie gry” umieszczaj osobno pod siatką.

- Od sekcji „Dobra gra może zrobić coś dobrego” używaj wspólnej stopki wzorowanej na Garibaldce. Zachowaj odnośniki do organizacji, autorów i licencji, numer wersji oraz komunikat o zapisie, gdy gra go wyświetla. Katalog „Wszystkie gry” otwieraj z okna „Inne gry”.
