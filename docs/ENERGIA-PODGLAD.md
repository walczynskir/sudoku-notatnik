> Dostępne na rsudoku.pl od wersji 1.19.0. Domyślna jest Porcelana; zapisane preferencje są zachowane. Adresy localhost poniżej służą wyłącznie do testów lokalnych. Nazwy plików z PODGLAD zachowano dla ciągłości odnośników.

# Energia — osobny kolorowy motyw

Forma zachowuje ciepłe kolory kości słoniowej, śliwki i terakoty. Energia jest dodatkową opcją, a nie zamiennikiem Formy. Oba warianty są dostępne na publicznej stronie od 1.19.0.

## Podgląd

```sh
python3 -m http.server 5196 --bind 127.0.0.1 --directory dist
```

Otwórz <http://127.0.0.1:5196/?preview=energy>. W selektorze Wygląd można wrócić do Formy lub Pracowni. LocalStorage jest niezależny od rsudoku.pl. Parametr preview służy do wygodnego wyboru wariantu tylko na localhost, nie stanowi kontroli dostępu. Serwer podglądu nasłuchuje wyłącznie na 127.0.0.1; te same motywy są dostępne w produkcji.

## Kierunek

Inspiracja wizualna: podglądy JPG dostarczone przez właściciela w archiwach smartphone-screen-templates-user-interfaces-mobile-applications.zip oraz goals-habits-tracking-app.zip. Przejęto kierunek kolorystyczny i charakter zaokrąglonych powierzchni; nie skopiowano fotografii, ilustracji, fontów ani plików AI/EPS do aplikacji. Archiwów nie wykonywano.

- Fioletowo-różowy nagłówek, białe zaokrąglone powierzchnie na lawendowym tle.
- Bursztynowa Nowa gra i aktywny tryb; fioletowe akcje narzędzi i podpowiedzi.
- Spokojna, czytelna siatka; zaznaczenie pozostaje neutralne z ciemną ramką, dowody niebiesko/fioletowe, eliminacje bursztynowe, konflikty czerwone.
- Na bardzo wąskich ekranach do 360 px belka akcji przechodzi do dwóch rzędów. Większy tekst zachowuje własne minimum szerokości planszy i przewijanie.
- Nazwa motywu jest przetłumaczona na wszystkie języki.

Style układu są współdzielone w studio.css, zaokrąglenia w pierwszej części forma.css. Ciepła paleta Formy jest ograniczona do data-theme=forma. Kolory i powierzchnie Energii są w energy.css i dotyczą tylko data-theme=energy.

Główne pary kontrastu sprawdzono obliczeniowo: biel na końcach nagłówka 6.79:1 i 5.12:1; biel na przycisku #6235c3 7.46:1; ciemny tekst #302441 na #ffb800 8.33:1. To weryfikacja tych par kolorów, nie deklaracja pełnej zgodności WCAG.
