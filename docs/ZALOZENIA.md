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
- Aktualny stan jest zapisany pod kluczem `sudoku-notatnik-v1`, punkt restartu pod `sudoku-notatnik-initial-v1` w `localStorage`.
- Wiele kart tego samego adresu nie ma synchronizacji na żywo. Ostatni zapis może zastąpić stan zapisany przez inną kartę; najlepiej edytować w jednej karcie.
- Zdjęcia i obraz z aparatu nie są wysyłane na serwer przez aplikację. Kamera działa tylko do zdjęcia, zamknięcia okna lub ukrycia/opuszczenia karty.
- Zewnętrzne usługi dostarczają fonty (Google Fonts), Tesseract.js z CDN jsDelivr oraz zasoby silnika OCR. Brak wysyłania zdjęć nie oznacza pełnego działania offline ani braku połączeń zewnętrznych.
- Publiczna strona oznacza dostęp do aplikacji, nie do cudzych danych w przeglądarce.

## Zakres, którego obecnie nie ma

- Automatyczne rozwiązanie całej planszy, dalsze zaawansowane techniki (np. Swordfish, XY-Wing, łańcuchy) i generator sudoku.
- Sprawdzenie, czy plansza ma rozwiązanie lub czy rozwiązanie jest unikalne. Brak lokalnych konfliktów nie gwarantuje rozwiązywalności.
- Rozpoznawanie dowolnych perspektyw i pisma ręcznego z gwarantowaną skutecznością.
- Konta, synchronizacja w chmurze, biblioteka wielu plansz i statystyki.
- Trwała historia cofania oraz jej eksport do JSON.

## Kierunki do rozważenia

1. Więcej testów ręcznych OCR i aparatu na rzeczywistych telefonach.
2. Dokładniejsze kadrowanie i korekcja perspektywy.
3. Opcjonalna biblioteka plansz i trwalsza historia lokalna.
4. Dopiero przy potrzebie synchronizacji między urządzeniami — opcjonalne konta i zapis w chmurze.

To propozycje, nie deklaracja wdrożenia.

Podpowiedzi: analiza z liczb, filtrowanie celów eliminacji według aktualnych notatek (bez ponawiania wykonanych eliminacji), dwa osobne etapy (tylko nazwa techniki, następnie opcjonalne pola i wyjaśnienie), bez automatycznego zastosowania ruchu. Obecny zakres: jedyny kandydat, jedyne miejsce, zablokowani kandydaci, naga/ukryta para, naga/ukryta trójka, X-Wing. Wcześniejsze eliminacje są odtwarzane do dalszej analizy tylko wtedy, gdy silnik sam potrafi je udowodnić, a wszystkie docelowe kandydaty zostały już usunięte z notatek. Notatki nie stanowią samodzielnego dowodu.
