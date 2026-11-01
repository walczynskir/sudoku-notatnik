# Biblioteka gotowych sudoku

Wydanie 1.13.0 zawiera 10 000 różnych zapisów plansz, po 2500 na poziom łatwy, średni, trudny i ekspert. Nie jest to generator treningowy wersji 2. Plansze są gotowymi danymi statycznymi; ich wczytywanie nie wymaga konta, bazy danych ani zewnętrznego API.

## Źródło i licencja

Źródło: [Sudoku Exchange Puzzle Bank](https://github.com/grantm/sudoku-exchange-puzzle-bank), rewizja `d8c8ebaee0c08c412cfba96af1923dfa61c83317`. Dane są dedykowane domenie publicznej zgodnie z deklaracją Unlicense. Kopia deklaracji znajduje się w `licenses/sudoku-exchange-LICENSE.txt` i w publikowanym `dist/puzzles/LICENSE.txt`. Kod naszej aplikacji ma odrębny status licencyjny.

Kategorie i oceny SE zachowujemy ze źródła. To nie jest nasza własna uniwersalna skala. Kolejność technik i ścieżka rozwiązywania różnych silników mogą dawać inne wyniki; liczba cyfr początkowych nie jest jedynym miernikiem trudności. Profil zapisuje najtrudniejszą technikę znalezioną na ścieżce naszego silnika, nie dowodzi konieczności tej techniki we wszystkich możliwych ścieżkach.

## Walidacja

Importer sprawdza dokładnie jedno rozwiązanie (`solutionCount`, limit 200 000 węzłów), a następnie odtwarza cały proces przez rzeczywiste `findHint(values, notes)` używane w aplikacji. Wpisuje znalezione liczby i wykonuje wskazane eliminacje, aż do pełnej poprawnej planszy. Nie korzysta z odpowiedzi do generowania wskazówek. Plansza bez kolejnej podpowiedzi albo przekraczająca limit czasu nie trafia do biblioteki.

Manifest przechowuje wersję i hash silnika użytego do walidacji oraz limity. Każdy rekord zawiera cyfry początkowe, stabilny identyfikator, ocenę źródłową, identyfikator źródłowy oraz profil technik i liczbę kroków. Nie publikujemy rozwiązania jako części rekordu. Profile technik nie są pokazywane przed rozwiązaniem, żeby nie zdradzać następnej techniki.

`reports/puzzle-import.json` zawiera audyt odrzuceń z wejściem i stanem zatrzymania. Powód `unsupported` oznacza brak następnej znalezionej wskazówki, a nie rozpoznanie konkretnej brakującej techniki; `time-budget` oznacza przekroczenie czasu. Klasyfikacja tych przypadków wymaga niezależnego porównania. Źródłowa ocena SE może sugerować rodzinę technik, ale nie jest pełnym dowodem wymaganej ścieżki.

## Pliki i testy

`dist/puzzles/manifest.json` zawiera indeks i hashe SHA-256. Dane są podzielone na partie po 500 rekordów; strona pobiera indeks i tylko potrzebną partię. `dist/library.js` obsługuje wybór, codzienną planszę i postęp. Nie zmienia reguł rozwiązywania.

`tests/library.test.cjs` sprawdza liczebność całego zestawu, brak identycznych plansz i ID, hashe partii, unikalność rozwiązania każdej planszy, format profili oraz ponowny pełny przebieg podpowiedzi dla próbki z każdej partii. Osobno testuje losowanie, deterministyczny wybór dnia i zgodność cyfr początkowych.

Aby odtworzyć import, przygotuj pliki `easy.txt`, `medium.txt`, `hard.txt`, `diabolical.txt` i `LICENSE.txt` z podanej rewizji w katalogu lokalnym, a potem uruchom:

```bash
node scripts/import-puzzles.mjs /sciezka/do/zrodla 2500
node --test tests/*.test.cjs
```

Importer korzysta z czterech wątków i przyjmuje wyniki w kolejności źródłowej. W wydaniu użyto pierwszych 12 000 kandydatów z każdej kategorii. Limit czasu zależy od szybkości komputera, dlatego identyczny wynik odtworzenia nie jest gwarantowany na innym sprzęcie. Nie nadpisuj opublikowanego katalogu bez przeglądu danych i testów.

## Dzień i postępy

Łamigłówka dnia jest wybierana z poziomu średniego przez deterministyczny hash daty `YYYY-MM-DD` UTC i indeksu aktualnego zestawu. Jest niezależna od języka, strefy urządzenia i osobistych postępów. Losowanie zwykłe pomija ukończone oraz aktualną planszę, dopóki istnieją świeże; po wyczerpaniu zestawu dopuszcza powtórki.

Klucz `sudoku-library-v1` w localStorage zawiera ID ukończonych plansz i ostatnie 1000 powiązań planszy z metadanymi. Zapis bieżącej planszy i punktu restartu korzysta z istniejących kluczy. Cofnij, Przywróć i Restart zachowują działanie. Ukończenie wymaga wszystkich 81 cyfr bez konfliktów i zachowania początkowych cyfr danego rekordu. Początkowe cyfry pozostają edytowalne, ale zmienione nie pozwalają zaliczyć pierwotnej łamigłówki.

Postępy nie synchronizują się między urządzeniami ani adresami. Eksport JSON przenosi liczby i kandydatów, nie listę ukończonych i nie metadane biblioteki. Brak dostępu do localStorage nie blokuje gry. Przy błędzie pobierania lub zamknięciu okna przed końcem wczytywania dotychczasowa plansza pozostaje nienaruszona. Zastąpienie istniejącej planszy wymaga potwierdzenia.
