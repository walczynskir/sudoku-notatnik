# Kopia konfiguracji i postępów Sudoku

Wydanie 1.33.0 — kopia konfiguracji i trwałego dorobku po zaakceptowanym wspólnym przeglądzie. Źródła i GitHub Pages `main`: `25a657dc6e54ff9c52d546cae86e1408356dd588` (1.32.1). Pages publikuje bezpośrednio z tego repozytorium. Zachowano lokalne zrzuty innych prac i konfigurację hostingu. Porównano również repozytorium Sites `3b3838548564e711fac73692318156d6cd3c3008`: jego dist odpowiada źródłom 1.32.1. Oba wdrożenia otrzymują tę samą zawartość wydania 1.33.0.

## Dotychczasowe kopie

`dist/app.js` eksportuje `sudoku-notatnik-v1`: values, notes i opcjonalne givens. Ten plik nigdy nie zawierał konfiguracji, historii ani dorobku. Dotychczasowy eksport i import planszy pozostają bez zmian. Nowe „Importuj kopię” rozpoznaje plik planszy i wskazuje właściwe Wczytaj → Tekst lub plik JSON; nie przedstawia go jako kopii statystyk. Nie znaleziono opublikowanego starszego formatu przenośnej kopii dorobku.

## Nowy zakres

Wspólne moduły `shared-progress-backup.js` i `shared-preferences.js` skopiowano bez zmian z Ośmiu Asów. Adapter `progress-backup.js` stosuje obwiednię `format: games-chest-backup`, `version: 1`, `game: sudoku`; limit 5 MiB UTF-8. Cały plik i wszystkie pola są walidowane przed potwierdzeniem. Nieznana gra, wersja, nieprawidłowe opcje, daty, identyfikatory, rekordy lub odblokowania odrzucają plik.

Konfiguracja: język, bazowy motyw, A+, kontrast, oznaczanie błędów, automatyczne notatki dla następnej planszy, widoczność Cofnij/Przywróć oraz obecny cel dzienny i dawny cel tygodniowy. Konfiguracja z kopii zastępuje konfigurację urządzenia. Motyw nieznany lub niedostępny pozostawia bieżący motyw z komunikatem.

Dorobek: completed (unikalne ID), records (data, poziom źródłowy, opcjonalny poziom technik, pomoc i data łamigłówki dnia), goals/awards tygodniowe, dailyGoals/dailyAwards, badges, techniqueBadges i unlockedThemes. Kolekcje, sumy ukończeń i postęp poziomów są wyliczane z tych samych identyfikatorów przez istniejące moduły; nie powstał drugi licznik.

Klucze produkcyjne:

| Klucz | Rola |
|---|---|
| `sudoku-language`, `sudoku-theme`, `sudoku-previous-theme`, `sudoku-large-text` | Wygląd, język i kontrast |
| `sudoku-check-entries`, `sudoku-library-notes`, `sudoku-show-history` | Opcje gry |
| `sudoku-library-v1` | ID ukończeń; lokalne recent pozostaje lokalne |
| `sudoku-progress-preview-v1` | Rzeczywisty klucz produkcyjnego dorobku, mimo historycznej nazwy; także cele |
| `sudoku-technique-achievements-v1` | Odznaki za poziomy; lokalne sessions zachowane |
| `sudoku-unlocked-themes-v1` | Trwały zbiór odblokowań z połączonego dorobku |
| `sudoku-backup-transaction-v1` | Dziennik odzyskiwania niedokończonego importu |
| `sudoku-active-options-v1` | Zachowanie aktywnej opcji oznaczania błędów po imporcie i odświeżeniu |

`sudoku-notatnik-v1`, `sudoku-notatnik-initial-v1`, aktywne state/initial, selected/mode, history/future i sessions obu trackerów nie są eksportowane ani zastępowane. Import nie wywołuje replace, restart, render planszy, begin, finish ani assist. Wczytane oznaczanie błędów czeka do nowej planszy lub restartu; aktualna próba zachowuje swoją opcję także po reload. Ręczna zmiana tej opcji nadal działa od razu. Preferencje widoczności historii i wyglądu działają od razu, zachowując historię ruchów.

## Łączenie i błędy

ID ukończeń i odblokowania łączą się jako zbiory. Rekordy, odznaki i nagrody z tym samym ID/dniem zachowują lokalny wpis. Przed zatwierdzeniem widać zakres, sumy przed/po, rozwijane wartości konfiguracji oraz ograniczenia starych danych. Ponowny import jest idempotentny. Dane są ponownie łączone z aktualnym stanem tuż przed zatwierdzeniem.

Starsze ukończenia w Sudoku mają ID, lecz mogą nie mieć daty, poziomu lub informacji o pomocy. Są zachowane jako ukończenia o nieznanych szczegółach; nie tworzymy zastępczych rekordów, sesji, poziomów ani dat. Nie znaleziono dawnych trwałych liczników ukończeń bez ID, więc nie dodano fikcyjnego base-counter ani sumowania liczników. Dawne pucharki mają klucze dat/tygodni i są scalane po tych kluczach.

Zapis wszystkich kluczy poprzedza aktualizację modułów w pamięci. Trwały dziennik `sudoku-backup-transaction-v1` zawiera wersję oraz poprzednie wartości wszystkich 12 dopuszczonych kluczy importu (także `null` dla nieobecnych wartości). Dziennik powstaje przed pierwszym zapisem importu, a jest usuwany dopiero po zapisaniu całości. Nie obejmuje i nie może wskazywać kluczy planszy ani historii.

`progress-backup.js` udostępnia `readJournal`, `write`, `recover` i `createStorageGuard`. Przy błędzie próbuje odtworzyć cały poprzedni zapis, lecz nie usuwa dziennika, dopóki odtworzenie wszystkich wartości nie powiedzie się. Ponowne odzyskiwanie jest idempotentne. Gdy proces zamknie się w połowie importu, po ponownym uruchomieniu wraca zapis sprzed importu; po usunięciu dziennika obowiązuje już pełny nowy zapis.

`backup-recovery.js` ładuje się synchronicznie w `<head>` przed `theme.js`, a więc także przed biblioteką i trackerami. Jest dołączony również na stronie autorstwa, aby zmiana wyglądu tam nie nadpisywała niedokończonego importu. Wszystkie kontrolery Sudoku korzystają z małej osłony istniejących operacji getItem/setItem/removeItem. Gdy odzyskiwanie jest nieskuteczne, odczytują poprzednie wartości z dziennika i odmawiają zwykłych zapisów, w tym zapisu planszy. Dziennik pozostaje zachowany. Nie zmieniono globalnego localStorage ani kluczy innych gier.

Czytelne okno w 10 językach pozwala ponowić odzyskiwanie. Ponowienie w tej samej karcie nie przeładowuje strony: zachowuje planszę, historię, sesje i oczekujące potwierdzenie importu. Po skutecznym odzyskaniu można ponowić import. Brak dostępu do pamięci przy uruchomieniu zachowuje tryb działania tylko w sesji: nie odczytuje potencjalnie częściowych trackerów ani nie zaczyna ich nadpisywać wartościami domyślnymi, gdy dostęp wróci w tej samej karcie. Aby wznowić zapis po przywróceniu dostępu, należy przeładować stronę. Anulowanie zwykłego potwierdzenia i Escape niczego nie zapisują.

## Podgląd

`node scripts/prepare-backup-preview.mjs` tworzy `/tmp/sudoku-backup-preview`, bez Umami i rejestracji service workera. Podgląd na osobnym porcie ma własną pamięć przeglądarki. W tymczasowych plikach dopuszczono też lokalny adres telefonu; nie zmienia to produkcyjnych feature flags. Oddzielny test `features=technique-levels` nie udostępnia kopii, aby nie mieszać danych izolowanego testu z głównym profilem.

Komputer: http://127.0.0.1:8774/ → ustawienia → Konfiguracja i postępy.
Telefon w tej samej sieci: http://192.168.0.119:8774/.

## Weryfikacja

- `node --test tests/*.test.cjs`: 19 zestawów; adapter obejmuje pełny roundtrip 10 000 ID, pełną walidację, zbiory, konflikty, brakujące stare szczegóły i rollback częściowego zapisu.
- `PLAYWRIGHT_PATH=... node tests/backup-browser.cjs`: eksport i pusty profil, merge, reimport, anulowanie, zły plik/obca gra/wersja i dawny plik planszy, błąd zapisu w połowie operacji, retry, zachowanie aktywnej próby i jej historii, odblokowań, opcji po reload oraz zastosowanie błędów dopiero w nowej próbie.
- Układ 390/1280 px, 10 języków, A+, RTL, kontrast, dotyk, × i fokus. Testy ustawień dodatkowo obejmują 320 px i niskie 850 × 390. Zrzuty w nieśledzonym `tests/artifacts/backup-*.png`.

Wydanie 1.33.0 otrzymuje adnotowany tag v1.33.0 i jest publikowane na GitHub Pages oraz w istniejącym Sites. Kompletna kopia konfiguracji i dorobku jest dostępna w ustawieniach.

## Przegląd poprawki trwałego dziennika

- `tests/progress-backup.test.cjs`: przerwanie na każdej granicy 12 zapisów, odmowa rollbacku, blokowanie zwykłych zapisów, odzyskanie i ponowienie, błędny dziennik, błędny zestaw kluczy i brak dostępu do pamięci. Dziennik jest pierwszy w kolejności zapisów i ostatni w kolejności usuwania.
- `tests/backup-recovery-browser.cjs`: start po przerwanym imporcie przed odczytem trackerów; start przy odmowie odzyskiwania; brak nadpisania częściowego zapisu przez inicjalizację i retry zwykłych persisterów; odmowa zapisu i rollbacku podczas importu; odzyskanie i ponowienie bez przeładowania oraz z zachowaniem aktywnej historii i sesji. Sprawdzone 390 i 1280 px.
- `tests/backup-browser.cjs`: ponownie przeszedł pełny scenariusz importu, idempotencji, reguł aktywnej próby i 10 języków.
- Ponownie sprawdzone ustawienia, pasek i granice historii: settings-browser, toolbar-browser i results-browser. Wszystkie 19 zestawów testów modułów przeszło; kontrola składni i diff --check poprawne.

Główne pliki poprawki: `dist/progress-backup.js`, `dist/backup-recovery.js`, kolejność skryptów w `dist/index.html` i `dist/credits.html`, `dist/sw.js`, użycie osłony zapisu w app/theme/i18n/library/progress/technique-rewards/toolbar/settings-sudoku/backup-ui, testy oraz ten raport. Wspólne shared-progress-backup.js i shared-preferences.js pozostają bez zmian. Finalna integracja jest częścią wydania 1.33.0.

Publiczna kontrola wydania: `PLAYWRIGHT_PATH=... node tests/backup-public-browser.cjs https://rsudoku.pl/ https://sudoku-notatnik-rw.walczynskir.chatgpt.site/`. Test używa oddzielnych, świeżych profili i blokuje analitykę. Obejmuje eksport, import, konflikt lokalnego wpisu, odblokowania, reimport bez wzrostu liczników, zachowanie planszy i reguł po reload oraz publiczną wersję i zasoby; rozmiary 390 i 1280 px. Telefon jest emulowany w Chrome, bez testu na fizycznym urządzeniu.
