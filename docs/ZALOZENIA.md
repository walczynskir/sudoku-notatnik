# Założenia i ograniczenia

## Cel

Pomagać użytkownikowi samodzielnie rozwiązywać klasyczne sudoku 9 × 9, bez obowiązkowego konta. Główne zadanie to wygodna edycja planszy i kandydatów na komputerze oraz telefonie.

## Reguły produktu

- Obowiązuje klasyczne sudoku: cyfry 1–9, bez powtórzeń w wierszu, kolumnie i bloku 3 × 3.
- Kandydaci wynikają z bieżących wpisanych liczb, a nie z zaawansowanych technik rozwiązywania.
- Ręczne notatki należą do użytkownika. Wpisanie liczby usuwa tylko odpowiadającego jej kandydata u sąsiadów; pełne przeliczenie wykonuje osobny przycisk.
- Wpisane liczby są edytowalne, także te z importu. Nie ma blokowania cyfr początkowych.
- Każda zmiana danych przez interfejs przechodzi przez historię cofania. Wybór pola i trybu edycji nie stanowią kroków historii.
- Cofanie przywraca również punkt restartu, jeśli zmienił się w wyniku importu lub nowej planszy.
- Historia nie ma sztywnego limitu, ale zużywa pamięć urządzenia i istnieje tylko do przeładowania karty.
- Import obrazka wymaga sprawdzenia wyniku przez użytkownika przed zastosowaniem.

## Dane i prywatność

- Brak kont, backendu, bazy danych i współdzielonych plansz.
- Postęp biblioteki (`sudoku-library-v1`) zawiera identyfikatory ukończonych plansz i ostatnie metadane. Korzysta z localStorage, nie z cookies; nie synchronizuje się między urządzeniami. Eksport JSON planszy nie przenosi tych danych.
- Preferencja języka jest przechowywana lokalnie jako `sudoku-language`; nie zmienia formatu eksportu ani danych Sudoku.
- Aktualny stan jest zapisany pod kluczem `sudoku-notatnik-v1`, punkt restartu pod `sudoku-notatnik-initial-v1` w `localStorage`.
- Wiele kart tego samego adresu nie ma synchronizacji na żywo. Ostatni zapis może zastąpić stan zapisany przez inną kartę; najlepiej edytować w jednej karcie.
- Zdjęcia i obraz z aparatu nie są wysyłane na serwer przez aplikację. Kamera działa tylko do zdjęcia, zamknięcia okna lub ukrycia/opuszczenia karty.
- Zewnętrzne usługi dostarczają fonty (Google Fonts), Tesseract.js z CDN jsDelivr oraz zasoby silnika OCR. Brak wysyłania zdjęć nie oznacza pełnego działania offline ani braku połączeń zewnętrznych.
- Publiczna strona oznacza dostęp do aplikacji, nie do cudzych danych w przeglądarce.

## Zakres, którego obecnie nie ma

- Automatyczne rozwiązanie całej planszy, dalsze warianty zaawansowanych technik (np. finned fish, grupowe AIC, forcing nets) i generator sudoku.
- Osobny przycisk do sprawdzania rozwiązywalności lub jednoznaczności. Analizator sprawdza jednoznaczność wewnętrznie tylko do zabezpieczenia technik UR, z limitem wyszukiwania; nie jest to ogólna walidacja całej planszy. Brak lokalnych konfliktów nie gwarantuje rozwiązywalności.
- Rozpoznawanie dowolnych perspektyw i pisma ręcznego z gwarantowaną skutecznością.
- Konta, synchronizacja w chmurze, biblioteka wielu własnych zapisów i rozbudowane statystyki. Gotowa biblioteka 10 000 plansz oraz lokalny licznik ukończeń są dostępne.
- Trwała historia cofania oraz jej eksport do JSON. Lokalna lista ukończonych łamigłówek jest osobną funkcją, nie historią zmian planszy.

## Kierunki do rozważenia

1. Więcej testów ręcznych OCR i aparatu na rzeczywistych telefonach.
2. Dokładniejsze kadrowanie i korekcja perspektywy.
3. Trwalsza historia lokalna i biblioteka własnych zapisów.
4. Dopiero przy potrzebie synchronizacji między urządzeniami — opcjonalne konta i zapis w chmurze.

To propozycje, nie deklaracja wdrożenia.

Podpowiedzi: analiza z liczb, filtrowanie celów eliminacji według aktualnych notatek (bez ponawiania wykonanych eliminacji), dwa osobne etapy (tylko nazwa techniki, następnie opcjonalne pola i wyjaśnienie), bez automatycznego zastosowania ruchu. Obecny zakres: jedyny kandydat, jedyne miejsce, zablokowani kandydaci, naga/ukryta para, naga/ukryta trójka i czwórka, X-Wing, Skyscraper, skrzydła XY/XYZ/W, Swordfish/Jellyfish, UR1/2/4, simple coloring i ograniczone X/XY/AIC. Wcześniejsze eliminacje są odtwarzane do dalszej analizy tylko wtedy, gdy silnik sam potrafi je udowodnić, a wszystkie docelowe kandydaty zostały już usunięte z notatek. Notatki nie stanowią samodzielnego dowodu.

Nazwa produktu: Trener Sudoku. Wersje 1.x rozwijają analizator i wyjaśnienia technik (dokładny zakres: TECHNIKI.md). Generowanie treningowe i ewentualny płatny dostęp pozostają zakresem wersji 2.

Biblioteka gotowych plansz jest częścią 1.x: 10 000 zweryfikowanych łamigłówek w domenie publicznej, z ocenami źródłowymi. Generator personalizowanego treningu pozostaje poza tym zakresem. Postęp i ostatnie identyfikatory biblioteki są zapisywane jako `sudoku-library-v1`. Nie wymagają konta ani serwera aplikacyjnego.
