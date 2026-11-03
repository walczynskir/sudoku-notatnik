# Pracownia — lokalny eksperyment

Wariant na lokalnej gałęzi `codex/studio-preview`, oparty na publicznej wersji 1.17.2. Nie jest wydaniem produkcyjnym. Nie wypychamy tej gałęzi do publicznego repozytorium ani nie wdrażamy jej na rsudoku.pl przed oceną właściciela.

## Uruchomienie

Z katalogu repozytorium:

```sh
python3 -m http.server 5196 --bind 127.0.0.1 --directory dist
```

Otwórz <http://127.0.0.1:5196/?preview=studio>. Serwer nasłuchuje wyłącznie na interfejsie lokalnym; podgląd nie jest dostępny z internetu ani telefonu. Zakończenie serwera: Ctrl+C. Nie zmieniaj bind na 0.0.0.0, jeśli podgląd ma pozostać tylko na komputerze.

## Zakres

- Pracownia jest dodatkowym motywem, z własnym plikiem `dist/studio.css` i innym układem narzędzi.
- Bez wstępu i panelu zapraszającego do gry; pojedynczy przycisk Nowa gra jest przenoszony do belki, bez duplikowania identyfikatorów i obsługi zdarzeń. Przy zmianie motywu wraca do poprzedniego miejsca.
- Biel, grafit, kobalt; płaskie sekcje oddzielone liniami, krótsze nagłówki, wyjaśnienia narzędzi w rozwijanej sekcji.
- Znaczenia kolorów podpowiedzi, blokada cyfr, historia, import i biblioteka pozostają takie same.
- Na telefonie priorytet mają plansza i klawiatura; większy tekst nadal zachowuje poziome przewijanie samej planszy.
- Napisy przetłumaczono na wszystkie obsługiwane języki.
- W tej lokalnej gałęzi usunięto skrypt Umami z obu stron, aby podgląd nie dodawał sztucznych odwiedzin. Przed ewentualnym wdrożeniem należy świadomie przywrócić konfigurację analityki produkcyjnej.
- LocalStorage jest osobny dla adresu i portu. Lokalny podgląd nie odczytuje ani nie zastępuje postępu na rsudoku.pl. Własną planszę można przenieść przez eksport/import JSON.

Parametr `preview=studio` działa jako wygodny wybór motywu wyłącznie na localhost/127.0.0.1. Nie jest zabezpieczeniem ani systemem uprawnień. Prywatność tego podglądu wynika z braku publikacji i lokalnego interfejsu serwera. Prywatna beta dostępna przez internet wymagałaby oddzielnego hostingu z kontrolą dostępu.

## Weryfikacja

`node --test tests/*.test.cjs` oraz kontrola przeglądarkowa: komputer, telefon, powrót do dotychczasowego motywu, podpowiedź z polami i okno Nowa gra. Nie zmieniono numeru produkcyjnego ani nie utworzono tagu wydania.
