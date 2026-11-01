# Języki i tłumaczenia

Od wersji 1.12.0 dostępne są: Polski (`pl`), English (`en`), Español (`es`), Deutsch (`de`) 简体中文 — chiński uproszczony (`zh-Hans`), हिन्दी — hindi (`hi`), Français — francuski (`fr`), العربية — arabski (`ar`) i Italiano — włoski (`it`). Chiński tradycyjny nie ma osobnego tłumaczenia.

## Wybór języka

Użyj listy z symbolem globu w nagłówku, także na telefonie. Zmiana jest natychmiastowa i nie zmienia planszy, kandydatów, zaznaczenia ani historii. Dotyczy również otwartego wyjaśnienia techniki. Wybór zapisuje się lokalnie pod `sudoku-language`. Pierwsze uruchomienie wybiera pierwszy obsługiwany język z preferencji przeglądarki; jeśli nie ma pasującego, używa angielskiego. Preferencje chińskie kierują do uproszczonego wariantu. Bez dostępu do pamięci lokalnej zmiana działa do zamknięcia lub odświeżenia strony.

Tłumaczenia obejmują interfejs, okna, komunikaty aplikacji, postęp rozpoznawania, etykiety dostępności, nazwy technik, zasady i konkretne wskazówki. Dokumentacja repozytorium pozostaje po polsku. Własne nazwy urządzeń, nazwy plików i komunikaty pochodzące bezpośrednio z przeglądarki lub biblioteki zewnętrznej nie są tłumaczone przez aplikację.

## Utrzymanie

`dist/locales.js` zawiera katalog: polski tekst lub wzorzec → tablica tłumaczeń w kolejności angielski, hiszpański, niemiecki, chiński uproszczony, hindi, francuski, arabski, włoski. `{0}`, `{1}` itd. oznaczają wartości dynamiczne; należy zachować ich zestaw i znaczenie. Indeksy komórek, cyfry oraz połączenia w łańcuchu muszą pozostać zgodne z dowodem.

`dist/i18n.js` udostępnia czyste `text(source, language)` oraz dobór języka. Warstwa DOM przechowuje oryginalne treści w WeakMap i reaguje na nowe komunikaty. Zmienia wyłącznie tekst i wybrane etykiety, nie wartości formularzy, stan Sudoku ani procedury wnioskowania. Nazwy technik w silniku pozostają polskimi identyfikatorami. Dla nowej techniki dodaj tłumaczenie nazwy, ogólnej zasady oraz wzorca konkretnego wyjaśnienia.

Nie ma zewnętrznego API tłumaczeń: katalog jest częścią statycznej aplikacji. Dane planszy nie są wysyłane do tłumaczenia. Nieznany komunikat zachowuje oryginalne brzmienie zamiast wymyślonego tłumaczenia.

Testy `tests/i18n.test.cjs` sprawdzają kompletność ośmiu kolumn, znaczniki wartości, nazwy i zasady wszystkich technik, podstawowe etykiety HTML, dobór języka, dynamiczne współrzędne, komunikaty i zachowanie oryginału przy przełączaniu. Po zmianie tekstów uruchom pełne testy oraz sprawdź układ z długimi niemieckimi etykietami i chińskimi znakami. Korekty terminologii przez rodzimych użytkowników języków można dodawać bez zmiany logiki Sudoku.

Arabski ustawia `dir=rtl` na dokumencie. Sama plansza, siatka kandydatów, klawiatura liczbowa i podgląd zdjęć pozostają LTR, aby współrzędne i pozycje nie były odwracane. Wartości dynamiczne w zdaniach arabskich są izolowane znakami kierunkowymi FSI/PDI. Cyfry dewanagari, arabsko-indyjskie i perskie są normalizowane przy wpisywaniu i parsowaniu tekstu.
