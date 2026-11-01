# Widoczność w wyszukiwarkach

## Przygotowane pliki

- `dist/robots.txt` pozwala robotom odwiedzać stronę i wskazuje mapę witryny. Brak tego pliku sam w sobie wcześniej nie blokował Google.
- `dist/sitemap.xml` zawiera publiczne adresy strony głównej i autorów/licencji. Nie zawiera JSON-ów z planszami, stanu gry ani zasobów skryptowych.
- Strony HTML wskazują własne adresy kanoniczne w domenie `https://rsudoku.pl/`. Strona główna ma także tytuł, opis oraz metadane Open Graph i karty tekstowej do udostępniania. Nie dodano osobnej grafiki podglądu.
- Nie dodano analityki, śledzenia ani nowych cookies.

Interfejs ma dziewięć języków na jednym adresie, wybieranych w przeglądarce. Nie ma osobnych URL-i językowych ani deklaracji hreflang. Nie oznaczamy fikcyjnych stron językowych. Metadane udostępniania w źródle HTML są po polsku; roboty społecznościowe zwykle nie wykonują przełączania języka aplikacji.

## Google Search Console — najprostsza weryfikacja

1. Otwórz [Google Search Console](https://search.google.com/search-console/) i zaloguj się na własne konto Google.
2. Dodaj usługę typu **Prefiks adresu URL** dla dokładnego adresu `https://rsudoku.pl/`.
3. Wybierz metodę **Tag HTML** i skopiuj pełny element `<meta name="google-site-verification" content="…">` wygenerowany przez Google.
4. Dodaj rzeczywisty tag do sekcji `<head>` pliku `dist/index.html`. Tag musi być w opublikowanym źródle HTML, a nie dopisywany przez JavaScript. Nie umieszczaj przykładowego tokenu. Jest to publiczny znacznik weryfikacji, nie hasło do konta.
5. Po testach i publikacji sprawdź obecność tagu w źródle `https://rsudoku.pl/`, następnie kliknij **Zweryfikuj** w Search Console. Pozostaw tag na stronie również po weryfikacji.
6. W sekcji **Mapy witryn** prześlij `https://rsudoku.pl/sitemap.xml`.
7. W **Sprawdzeniu adresu URL** wpisz `https://rsudoku.pl/`, sprawdź dostępność i poproś o indeksowanie, jeśli opcja jest dostępna.

Nie trzeba kupować narzędzi SEO ani dodawać Google Analytics. Alternatywą jest usługa typu Domena (`rsudoku.pl`), która obejmuje wszystkie protokoły i subdomeny, lecz wymaga weryfikacji DNS u rejestratora. Weryfikacja prefiksu obejmuje tylko wskazany prefiks HTTPS.

Wysłanie mapy ani prośba o indeksowanie nie gwarantują obecności lub pozycji w wynikach. Proces może trwać dni albo tygodnie. Stan i błędy sprawdzaj w Search Console; wielokrotne zgłaszanie tego samego adresu nie przyspiesza procesu.

## Utrzymanie

Przy nowych publicznych stronach dodaj rzeczywiste kanoniczne adresy do sitemap.xml. Nie dopisuj wszystkich plików technicznych ani 10 000 zapisów plansz jako stron HTML. Weryfikacji nie da się zakończyć bez znacznika wydanego dla konta właściciela i potwierdzenia w Search Console. Ostatni etap nie jest wykonywany automatycznie przez publikację GitHub Pages.

Źródła: [weryfikacja własności](https://support.google.com/webmasters/answer/9008080), [mapa witryny](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [prośba o indeksowanie](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
