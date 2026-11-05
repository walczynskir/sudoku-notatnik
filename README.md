# Trener Sudoku

Aplikacja internetowa do rozwiązywania sudoku 9 × 9. Biblioteka zawiera 10 000 sprawdzonych plansz w sześciu poziomach według technik: Na początek, Łatwy, Wymagający, Ekspert, Ekstremalny i Arcymistrzowski oraz osobną, wspólną dla wszystkich łamigłówkę dnia na każdym poziomie. Pozwala wpisywać liczby, obliczać i edytować kandydatów oraz wczytywać plansze z tekstu, plików i zdjęć. Podpowiedzi najpierw ujawniają tylko technikę, a na życzenie pola i wyjaśnienie. Interfejs, komunikaty i wyjaśnienia technik są dostępne po polsku, angielsku, hiszpańsku, niemiecku, w chińskim uproszczonym, hindi, francusku, arabsku, włosku i ukraińsku. Język można wybrać w nagłówku. Selektor **Wygląd** obok języka oferuje kolejno: Porcelana, Atrament i papier, Szałwia, Pracownia, Forma, Energia i Mandarynka. Osobne przyciski Kontrast i Większy tekst ułatwiają dostęp do ustawień dostępności. Domyślnym motywem nowych użytkowników jest Porcelana; zapisane wcześniej wybory są zachowane. Aplikacja wcześniej nosiła nazwę Sudoku · Notatnik; adresy, repozytorium i zapisane dane pozostają takie same.

**Strona:** https://rsudoku.pl/

**GitHub Pages:** https://walczynskir.github.io/sudoku-notatnik/

**Starsza kopia, nieaktualizowana automatycznie (Sites):** https://sudoku-notatnik-rw.deluxemonk1.chatgpt.site/

Opcjonalne **Więcej → Oznaczaj błędne cyfry** oznacza cyfry niezgodne z jedynym rozwiązaniem, bez ujawniania odpowiedzi. Domyślnie jest wyłączone; wymaga zablokowanych cyfr początkowych i potwierdzenia jednoznaczności.

Aplikacja działa w przeglądarce, bez backendu, kont i bazy danych. Każdy użytkownik ma własny stan na swoim urządzeniu. Zbiorcze statystyki odwiedzin są zbierane przez Umami Cloud; panel statystyk jest zewnętrzny, bez publicznego licznika w aplikacji.

## Dokumentacja

- [Instrukcja użytkownika](docs/INSTRUKCJA.md) — wpisywanie, kandydaci, import, aparat, zapis i cofanie.
- [Biblioteka łamigłówek](docs/BIBLIOTEKA.md) — źródło, walidacja, oceny, codzienna plansza i postępy.
- [Języki i tłumaczenia](docs/JEZYKI.md) — wybór języka i rozwijanie katalogu tłumaczeń.
- [Techniki i ich wyjaśnienia](docs/TECHNIKI.md) — obsługiwane warianty, zasady, ograniczenia i podział v1/v2.
- [Założenia i ograniczenia](docs/ZALOZENIA.md) — zakres produktu, prywatność i dokładne zasady działania.
- [Autorzy i licencje](THIRD_PARTY_NOTICES.md) — biblioteki, fonty, dane i pełne teksty warunków.
- [Widoczność w Google](docs/WYSZUKIWARKI.md) — Search Console, weryfikacja i mapa witryny.
- [Motywy i dostępność](docs/LOKALNE-STEROWANIE.md) — wygląd, kontrast, większy tekst i menu akcji.
- [Rozwój i publikacja](docs/ROZWOJ.md) — struktura kodu, testy, hosting i dalsze kierunki.

## Cele, postępy i nagrody

Od wersji 1.22.0 cele dzienne, kolekcje setek, album 12 plakietek i nagrodowy motyw Zorza są dostępne w zwykłym widoku https://rsudoku.pl/ we wszystkich dziesięciu językach. Postępy pozostają na urządzeniu. Cel można wyłączyć w panelu; parametr `?features=no-gamification` wyłącza cały interfejs postępów bez usuwania danych. Stary link `?features=gamification` pozostaje zgodny. [Zasady i ograniczenia](docs/POSTEPY-PODGLAD.md).

## Uruchomienie lokalne

Wymagania: Python 3 do serwera lokalnego. Node.js z obsługą `node:test` do testów (zweryfikowano na Node.js 22). Do używania opublikowanej strony wystarczy przeglądarka.

```bash
git clone https://github.com/walczynskir/sudoku-notatnik.git
cd sudoku-notatnik
python3 -m http.server 5173 --directory dist
```

Otwórz http://localhost:5173/. Zatrzymanie serwera: `Ctrl+C`.

Nie potrzeba `npm install`, kompilacji ani kluczy API. OCR pobiera bibliotekę i dane z internetu przy pierwszym użyciu; fonty również są zewnętrzne. Repozytorium jest publiczne.

## Sprawdzenie kodu

```bash
for file in dist/*.js; do
  node --check "$file"
done
node scripts/version.mjs --check
node --test tests/*.test.cjs
```

Testy obejmują integralność i jednoznaczność 10 000 plansz, codzienną planszę na każdym poziomie, wybór trudności, lokalizację interfejsu i strony licencji, reguły kandydatów, konflikty, import, historię, techniki (również zaawansowane i jednoznaczność), przygotowanie obrazów do OCR, przegląd wyników, przeciąganie i zmianę rozmiaru kadru, prostowanie zdjęcia oraz cykl życia i przełączanie kamery z atrapą urządzenia. Rzeczywisty aparat, jakość OCR i układ na fizycznych telefonach wymagają testów ręcznych.

## Hosting

Do publikacji wystarcza **zawartość katalogu `dist/`**. GitHub Actions sprawdza składnię i testy przy zmianach na `main` i pull requestach. Po udanych testach zmiana na `main` jest automatycznie publikowana na GitHub Pages. Dostępne jest także ręczne uruchomienie w zakładce Actions. Opublikowana strona działa niezależnie od komputera właściciela. Poprzednia strona Sites nie aktualizuje się automatycznie z GitHuba. Szczegóły: [Rozwój i publikacja](docs/ROZWOJ.md).

## Licencja

Nie wybrano jeszcze licencji dla kodu projektu. Publiczny dostęp do aplikacji nie oznacza udzielenia licencji open source na jej kod. Zależności zewnętrzne podlegają własnym licencjom. Dane biblioteki Sudoku Exchange są osobnym zbiorem w domenie publicznej (Unlicense); pełna deklaracja: `licenses/sudoku-exchange-LICENSE.txt`. Nie zmienia to statusu licencji kodu aplikacji.

## Wersje

Aktualne wydanie: **1.18.0**, numer również w stopce strony. Stosujemy `MAJOR.MINOR.PATCH`, tagi `vX.Y.Z` i [historię zmian](CHANGELOG.md). Procedura: [Wersjonowanie](docs/ROZWOJ.md#wersjonowanie).

Wersja 1.x obejmuje analizę i wyjaśnienia technik, także Unique Rectangles, kolorowania i łańcuchów. Dokładne warianty i ograniczenia: [Zakres technik](docs/TECHNIKI.md). Generowanie plansz do nauki, ścieżki treningowe i ewentualny płatny dostęp są planowane na wersję 2; nie są częścią obecnej aplikacji.

Pełne informacje o bibliotekach, fontach i danych: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). W aplikacji znajduje się też odnośnik „Autorzy i licencje” w stopce.

Od wersji 1.23.0 dostępne są język ukraiński i niebiesko-żółty motyw Ukraina. Motyw wybiera się niezależnie od języka; nie zmienia zapisanej gry ani domyślnych preferencji.

Stopka we wszystkich motywach i językach zawiera dobrowolne linki wsparcia: PAH — pomoc Ukrainie oraz OTOZ Animals Ciapkowo w Gdyni — pomoc psom i kotom. Prowadzą do oficjalnych stron w nowej karcie, bez osadzonych płatności, przekazywania danych gry i prowizji aplikacji.

Autorem projektu jest Robert Walczyński (pomysł, rozwój i kierunek projektu). Aplikacja rozwijana z pomocą OpenAI Codex. Informacje te wraz z repozytorium znajdują się na stronie Autorzy i licencje; nie zmieniają zasad licencjonowania.

Podział na sześć poziomów według potwierdzonej ścieżki technik oraz plakietki samodzielności i nagrody opisano w [POZIOMY-PODGLAD.md](docs/POZIOMY-PODGLAD.md). Domyślnie dostępny od 1.24.0. Jawny lokalny `?features=technique-levels` zachowuje osobny zapis testowy.

Od 1.25.0 **? Jak grać?** na pasku nad panelem gry otwiera krótki opis zasad, sterowany pokaz na osobnej planszy i rozwijane objaśnienia narzędzi. Pomoc jest dostępna we wszystkich dziesięciu językach i nie wpływa na grę ani postępy.

Od 1.26.0 stały pasek nad panelem gry zawiera istniejące przyciski **Nowa gra** po lewej i **? Jak grać?** po prawej, również na telefonie. Cofnij, Przywróć, Wczytaj, Zapisz i Więcej pozostają w panelu. Pomoc rozpoczyna krótki cel gry; pokaz jest widoczny dopiero po uruchomieniu, a zasady, sterowanie, kandydaci i narzędzia są rozwijane.

Od 1.27.0 **⚙ Preferencje gry** obok pomocy zbiera oznaczanie błędnych cyfr, zapamiętany wybór kandydatów dla nowych plansz i cel dzienny. Cel i kandydaci są wspólne z dotychczasowymi kontrolkami; język, motyw, kontrast i większy tekst pozostają w nagłówku.
