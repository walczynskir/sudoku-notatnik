> Dostępne na rsudoku.pl od wersji 1.19.0. Domyślna jest Porcelana; zapisane preferencje są zachowane. Adresy localhost poniżej służą wyłącznie do testów lokalnych. Nazwy plików z PODGLAD zachowano dla ciągłości odnośników.

# Mandarynka — pomarańczowy motyw

Mandarynka jest osobnym wariantem inspirowanym pomarańczowo-białym podglądem aplikacji do nawyków dostarczonym przez właściciela. Nie zastępuje Energii ani ciepłej Formy. Nie kopiowano zdjęcia, plików wektorowych ani fontów referencji do aplikacji.

Podgląd: <http://127.0.0.1:5196/?preview=tangerine>, przy serwerze uruchomionym poleceniem:

```sh
python3 -m http.server 5196 --bind 127.0.0.1 --directory dist
```

Kolory: nagłówek i główne akcje #ffab00, białe zaokrąglone powierzchnie i ciemne etykiety #30291f. Mniejsze pomarańczowe akcenty tekstowe i obwódka fokusu używają ciemniejszego #9b4f00. Niebiesko-fioletowe dowody podpowiedzi, bursztynowe eliminacje i czerwone konflikty zachowują znaczenie. Zaokrąglenia są współdzielone, a osobna paleta jest w tangerine.css.

Nazwę przetłumaczono na wszystkie języki aplikacji. Wybór większego tekstu i stan gry są niezależne od zmiany motywu.

## Menu mobilne

Przyciski Wczytaj i Więcej wcześniej kotwiczyły rozwijany panel względem własnej wąskiej kolumny, przez co panel mógł wychodzić poza lewą krawędź ekranu. Dla czterech nowych układów (Pracownia, Forma, Energia, Mandarynka) mobilny panel jest teraz pozycjonowany względem całej belki. Ma szerokość co najwyżej 280 px i 100% belki, logiczne wyrównanie uwzględniające kierunek pisma oraz pozycję pod belką. Weryfikacja przeglądarkowa obejmowała Wczytaj w Energii przy 390 px oraz Więcej w Mandarynce przy 360 px.

Zmiany są na głównej gałęzi publicznego repozytorium i zostały opublikowane w 1.19.0.

Nagłówek Podpowiedź ma neutralny kolor #30291f, zgodny z nagłówkiem importu; pomarańcz jest akcentem akcji.
