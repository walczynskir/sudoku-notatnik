# Wspólne okno ustawień Sudoku

Wspólne ustawienia Games Chest, wydanie 1.32.1.

Wzorzec pochodzi z Ośmiu Asów: `pasjans/dist/shared-settings.css` i `settings-strings.js` skopiowano bez zmian do `dist/`. `settings-sudoku.css` mapuje kolory i elementy Sudoku, a `settings-sudoku.js` obsługuje wspólne etykiety, błąd i ponowienie zapisu. Oba pliki wzorcowe są lokalne, więc gra nie wymaga dostępu do innej gry. Zasoby są dodane do listy offline.

Nagłówek ma nazwę okna, informację o automatycznym zapisie i wyłącznie × w prawym górnym rogu. Treść przewija się niezależnie od nagłówka. Escape i × przywracają fokus do ustawień. Cel × i ⓘ ma minimum 44 px.

Zachowane opcje: Cofnij i Przywróć, oznaczanie błędnych cyfr, kandydaci od razu oraz cel dzienny z wartością własną. Kandydaci dotyczą kolejnych plansz, pozostałe opcje działają od razu. Błąd zapisu można ponowić bez ponownego wykonania akcji gry, zmiany planszy lub naliczania pomocy. Zachowano klucze zapisów; nie dodano eksportu/importu.

Testy: `node --test tests/*.test.cjs` oraz `PLAYWRIGHT_PATH=... node tests/settings-browser.cjs`. Przegląd obejmuje 320, 390, 850 × 390 i 1280 px, polski i arabski RTL, Klasyczny, Porcelanę, Nocne niebo, kontrast, A+, dotyk i klawiaturę, fokus, przeładowanie oraz symulowany błąd zapisu i retry. Zrzuty w nieśledzonym `tests/artifacts/settings-*.png`.

Podgląd: http://127.0.0.1:8773/ (ustawienia na pasku gry).
