# Historia zmian

## 1.11.0

- Unique Rectangles (1/2/4) z potwierdzaniem jednoznaczności, simple coloring, X-Chain, XY-Chain i AIC z wyjaśnieniami.
- XY-Chain wymaga tej samej cyfry na obu końcach.
- Opublikowany dokładny katalog technik i ograniczeń w docs/TECHNIKI.md.
- Rozwój analizatora pozostaje w 1.x; generowanie treningowe i ewentualny płatny dostęp zaplanowane na v2.

## 1.10.0

- Zmiana rozmiaru ramki przez przeciąganie narożników.
- Prostowanie zdjęcia w zakresie ±15°, co 0,1°, z możliwością wyzerowania.
- Podgląd, miniatura i rozpoznawanie korzystają ze skorygowanego obrazu; regulacja kąta nie pogarsza kolejno jakości oryginału.

## 1.9.0

- Podgląd aparatu z pomocniczą siatką i wyborem kamery, gdy jest ich kilka.
- Przeciąganie ramki kadrowania myszą lub palcem, z uwzględnieniem proporcji obrazu.
- Obracanie zdjęcia o 90° w lewo i w prawo przed rozpoznawaniem.

## 1.8.3

- Import zdjęć: instrukcja dopasowania ramki opisuje suwaki, siatkę 9 × 9 i sprawdzenie wyniku.
- Zrozumiałe komunikaty przygotowania i błędu rozpoznawania, bez określenia „silnik OCR”.

## 1.8.2

- Widoczny przycisk „Zrób zdjęcie ponownie” podczas kadrowania i sprawdzania OCR. Ponownie otwiera aparat bez zmiany planszy; zablokowany podczas rozpoznawania.

## 1.8.1

- Nazwa aplikacji: Trener Sudoku.
- Docelowy zakres v1: czwórki, skrzydła i podstawowe ryby do Jellyfish.
- Unique Rectangles, kolorowanie i łańcuchy przeniesione do zakresu v2; kod zachowany na `codex/v2-techniques`.

# Historia wydań

## 1.8.0

- Nowa nazwa aplikacji: Szkoła Sudoku — krok po kroku. Adresy, repozytorium i dane lokalne bez zmian.
- Nagie i ukryte czwórki, XY-Wing, XYZ-Wing, W-Wing, Swordfish i Jellyfish.
- Unique Rectangle typy 1, 2 i 4 wyłącznie po potwierdzeniu dokładnie jednego rozwiązania.
- Proste kolorowanie (pułapka i sprzeczność), X-Chain, XY-Chain i AIC (proste łańcuchy do 11 połączeń).
- Wyjaśnienia zasad wszystkich technik oraz ścieżki dowodów dla łańcuchów.
- Zachowanie etapowego odkrywania podpowiedzi i odtwarzania tylko udowodnionych eliminacji.

## 1.7.1

- Zielona ikona siatki sudoku: SVG dla nowoczesnych przeglądarek, ICO 16/32/48 px i Apple Touch Icon 180 px.
- Wersjonowane adresy ikon dla poprawnego odświeżania po kolejnych wydaniach.

## 1.7.0

- Cyfra wpisana 9 razy jest nieaktywna na klawiaturze ekranowej oraz blokowana przy wpisywaniu klawiaturą fizyczną.
- Poprawny komplet oznaczony zielonym tłem, przekreśleniem i znakiem ✓.
- Po usunięciu lub cofnięciu wpisu cyfra jest ponownie dostępna; konflikty nie są oznaczane jako poprawny komplet.

## 1.6.5

- Miniatura przyciętego oryginału bezpośrednio nad edytowalnym wynikiem OCR, także na telefonie.
- Pełny obraz i kadrowanie nadal dostępne osobno w rozwijanej sekcji.

## 1.6.4

- Po OCR automatyczne przejście do sprawdzania cyfr: zwinięte zdjęcie i suwaki, przewinięcie okna do góry i fokus na nagłówku wyniku bez otwierania klawiatury.
- Ponowne rozpoznawanie w zwijanej sekcji obrazu; osobny odnośnik powrotu do kadrowania.
- Wyraźny, przyklejony do dolnej krawędzi przycisk użycia sprawdzonej planszy.

## 1.6.3

- Dodatkowy silnik OCR uruchamiany wyłącznie dla niepewnych odczytów; wynik musi być zgodny w dwóch wariantach obrazu.
- Na dostarczonym przykładzie po dokładnym dopasowaniu siatki: 24/24 cyfr i wszystkie 57 pustych pól poprawnie; poprzednia wersja pierwotnego OCR odczytywała 18/24 cyfr.
- Weryfikacja obejmuje wszystkie trzy szóstki oraz czwórki i dziewiątki w przykładzie. Wynik nie gwarantuje skuteczności na innych zdjęciach.

## 1.6.2

- OCR: adaptacyjny próg jasności zamiast stałego progu 150, usuwanie resztek krawędzi siatki i większe, wycentrowane obrazy cyfr.
- Ponowienie niepewnego odczytu w alternatywnych trybach segmentacji, z zachowaniem oryginalnego obrazu jako jednej z prób.
- Niepewne i nierozpoznane pola z wykrytym znakiem mają bursztynowe oznaczenie w podglądzie.
- W porównaniu na 9 wygenerowanych próbkach 4/6/9 wynik wzrósł z 5/9 do 9/9; nie stanowi to gwarancji skuteczności na zdjęciach.

## 1.6.1

- Usunięcie starych klas przycisków Cofnij i Przywróć z belki i jawne wyrównanie wymiarów pięciu akcji na telefonie.
- Wersjonowane adresy CSS i JavaScript, aby po aktualizacji nie mieszały się stare mobilne skrypty z nowym układem.

## 1.6.0

- Belka szybkich akcji nad planszą: Cofnij, Przywróć, Wczytaj, Zapisz i Więcej.
- Rozwijany import tekstu/JSON, obrazka i aparatu oraz menu czyszczenia i restartu.
- Wyraźniejsze przyciski eksportu i nowej planszy; usunięcie przykładu.
- Układ mobilny zachowuje klawiaturę przy planszy.

## 1.5.2

- Jawne, równe wysokości dziewięciu wierszy i szerokości kolumn planszy.
- Poprawka rozciągania wiersza z liczbami przy pustych pozostałych polach, widocznego w Chrome na telefonie.

## 1.5.1

- Wyraźny baner „Sudoku rozwiązane!” i zielone wyróżnienie poprawnie ukończonej planszy, bez dialogu.
- Komunikat znika po edycji lub cofnięciu; pełna plansza z konfliktem nie jest uznawana za rozwiązaną.

## 1.5.0

- Przycisk pojedynczych kandydatów wypełnia teraz kolejne pola aż do wyczerpania możliwości.
- Cała kaskada pozostaje jednym krokiem cofania/przywracania; sprzeczność w dowolnej rundzie anuluje całość.

## 1.4.0

- Przycisk wypełniający pola z jednym kandydatem w notatkach, w jednym kroku bez kaskady.
- Kontrola konfliktów przed zastosowaniem całej operacji, eliminacja wpisanych cyfr z notatek i wspólne cofanie/przywracanie.

## 1.3.0

- Przywracanie cofniętych zmian liczb, kandydatów i punktu restartu, także wielokrotnie.
- Przycisk przy Cofnij na komputerze i telefonie; skróty Ctrl+Shift+Z / ⌘Shift+Z i Ctrl+Y.
- Nowa edycja usuwa historię ponawiania.

## 1.2.0

- Rozwijana sekcja „Na czym polega?” pod nazwą techniki, z ogólną zasadą dla wszystkich ośmiu technik.
- Wyjaśnienie zasady nie ujawnia pól ani cyfr z planszy. Konkretny ruch pozostaje za osobnym przyciskiem.
- Sekcja jest domyślnie zwinięta i resetuje się po zmianie podpowiedzi.

## 1.1.0

- Podpowiedzi w dwóch etapach: najpierw technika, następnie opcjonalnie pola i wyjaśnienie.
- Jedyny kandydat, jedyne miejsce, zablokowani kandydaci, nagie i ukryte pary oraz trójki, X-Wing.
- Pomijanie wykonanych eliminacji i odtwarzanie logicznie potwierdzonego postępu.
- Poprawki wskazywania celów eliminacji; konkretne cyfry dla każdego pola.
- Rozróżnienie kolorów: wybrane pole ciemnozielone, pola techniki niebieskie, eliminacje bursztynowe.
- Dyskretny numer wersji w stopce, plik VERSION i kontrola zgodności wersji w CI.

## 1.0.0

- Plansza sudoku z liczbami i ręcznymi kandydatami, ich obliczaniem i automatyczną eliminacją po wpisaniu liczby.
- Cofanie, czyszczenie kandydatów i restart.
- Import tekstu, JSON, obrazka i zdjęcia z aparatu; eksport kopii JSON i zapis lokalny.
- Układ na telefon i komputer.
- Dokumentacja projektu, testy i automatyczna publikacja GitHub Pages po testach.
