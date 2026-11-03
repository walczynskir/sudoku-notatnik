# Forma — lokalny wariant zaokrąglony

Pracownia została opublikowana jako motyw w wersji 1.18.0. Zgodnie z wyborem właściciela pozostaje przy prostokątnych kontrolkach.

Forma jest osobnym, lokalnym wariantem na gałęzi `codex/forma-preview`. Nie publikujemy tej gałęzi ani kodu nowego motywu bez oceny właściciela. Produkcyjny motyw domyślny pozostaje bez zmian.

## Podgląd

```sh
python3 -m http.server 5196 --bind 127.0.0.1 --directory dist
```

Otwórz <http://127.0.0.1:5196/?preview=forma>. Serwer nasłuchuje wyłącznie lokalnie, bez dostępu z internetu lub telefonu. Parametr URL jest tylko wygodnym wyborem motywu, nie zabezpieczeniem. Prywatność wynika z braku publikacji oraz użycia 127.0.0.1. Statystyki Umami ograniczono do domen produkcyjnych, więc lokalny podgląd nie jest liczony.

## Kształty

- Większe przyciski akcji: kapsułki (`border-radius: 999px`).
- Klawiatura cyfr: zaokrąglone prostokąty, promień 12 px na komputerze i 10 px na telefonie; przyciski zachowują miejsce na pełną cyfrę.
- Selektory: 10 px; menu: 14 px; kafelki poziomów: 14 px; dialogi: 18–22 px.
- Siatka, zaznaczenie pola i pola przeglądu OCR pozostają kwadratowe.
- Rozkład i funkcje pochodzą z Pracowni. Forma ma własną ciepłą paletę: tło kości słoniowej #fff8ef, śliwkowy atrament #432c46 i terakotowe akcje #b5442d. Kolory dowodu podpowiedzi, eliminacji i konfliktów pozostają rozróżnialne.
- Wybór Forma jest niezależny od większego tekstu, nie zmienia planszy ani historii.

Wspólny układ jest w `dist/studio.css`; różnice kształtów w `dist/forma.css`. Selektory wspólnego układu obejmują oba motywy, a zaokrąglenia tylko `[data-theme="forma"]`. Nazwa jest przetłumaczona na wszystkie języki interfejsu.

Nie istnieje jeden obowiązujący promień narożników. Przykłady aktualnych wytycznych: [Apple — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons), [Fluent — Shapes](https://fluent2.microsoft.design/shapes/). Dobór promieni tutaj jest decyzją projektową, nie deklaracją zgodności z całym systemem projektowym.

W lokalnym wariancie z 3 listopada 2026 przyciski Cofnij i Przywróć mają poprawione odstępy i nie łamią polskiej etykiety w połowie słowa. Większy tekst nadal może rozłożyć belkę w dwa rzędy.
