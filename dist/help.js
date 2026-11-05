/* Isolated teaching scene: never reads or writes the player's board or storage. */
(function(root){
'use strict';
const steps=[
 ['Zasady sudoku','Wypełnij puste pola cyframi od 1 do 9. W każdym wierszu, każdej kolumnie i każdym bloku 3 × 3 każda cyfra występuje dokładnie raz. Liczb początkowych nie zmieniamy.'],
 ['Zacznij od nowej gry','Wybierz „Nowa gra” i poziom „Na początek” lub „Łatwy”. Dotknij pustego pola. Gruba ramka oznacza pole, do którego wpiszesz cyfrę.'],
 ['Wpisuj i cofaj','Wybierz cyfrę na klawiaturze pod planszą lub wpisz ją z klawiatury komputera. Tutaj wpisujemy 4. „Cofnij” i „Przywróć” pozwalają poprawiać ruchy oraz notatki.'],
 ['Notuj kandydatów','Kandydaci to możliwe cyfry, a nie odpowiedzi. W tym polu pasują 1, 2 i 4. „Oblicz kandydatów” uzupełnia notatki; w trybie „Kandydaci” możesz je samodzielnie dodawać i usuwać.'],
 ['Podpowiedź bez pośpiechu','Najpierw odkrywasz nazwę techniki. Możesz rozwinąć jej opis, a dopiero potem pokazać pola i wyjaśnienie ruchu.']
];
const candidateGuide=[
 [
  "Co oznaczają małe cyfry?",
  "Kandydat to cyfra, której jeszcze nie wykluczają znane liczby i wykonane rozumowanie. Notatki nie są wpisanymi odpowiedziami. Jeśli pole ma kandydatów 1, 2 i 4, nie wybieraj dowolnego: dalsze rozumowanie ma ustalić, która cyfra jest właściwa."
 ],
 [
  "Jak znaleźć kandydatów?",
  "Zacznij od cyfr 1–9. Skreśl te, które występują już w tym samym wierszu, kolumnie lub bloku 3 × 3. Pozostałe cyfry to podstawowi kandydaci. W przykładzie w pierwszym wierszu i trzeciej kolumnie zostają 1, 2 i 4."
 ],
 [
  "Jak prowadzić notatki?",
  "„Oblicz kandydatów” przygotuje pełne podstawowe notatki. Wybierz pole i tryb „Kandydaci”, a następnie dotknij cyfry, aby ją dodać lub usunąć. Wpisanie zwykłej liczby automatycznie usuwa ją z notatek w powiązanych polach. Usunięcie liczby nie odtwarza automatycznie wcześniej skreślonych kandydatów."
 ],
 [
  "Jak wykorzystać notatki do kolejnego ruchu?",
  "Najpierw szukaj pól z jedną możliwością. Następnie sprawdzaj, gdzie dana cyfra może wystąpić w wierszu, kolumnie lub bloku. Jeśli ma tylko jedno miejsce, możesz ją tam wpisać, nawet gdy to pole zawiera też inne notatki. Przy trudniejszych układach podpowiedź wyjaśni kolejną technikę."
 ],
 [
  "Kiedy wolno skreślić kandydata?",
  "Usuwaj cyfrę tylko wtedy, gdy potrafisz uzasadnić, że nie może być w tym polu — na podstawie wpisanych liczb lub techniki, np. pary. Nie usuwaj jej dlatego, że inna wygląda bardziej prawdopodobnie. Jeden pozostały kandydat pozwala wpisać liczbę tylko wtedy, gdy lista była kompletna, a wcześniejsze eliminacje poprawne."
 ],
 [
  "Co robi ponowne obliczenie?",
  "Ponowne „Oblicz kandydatów” zastępuje wszystkie notatki możliwościami wynikającymi z samych liczb. Może przywrócić kandydatów usuniętych poprawnie zaawansowaną techniką. Nie używaj go po każdej eliminacji. „Wyczyść kandydatów” usuwa notatki, nie liczby; obie operacje możesz cofnąć."
 ],
 [
  "Co jeśli nie został żaden kandydat?",
  "Puste notatki mogą po prostu oznaczać, że ich jeszcze nie uzupełniono. Jeśli jednak prowadzisz pełną listę i usuniesz ostatnią możliwość, sprawdź wpisy oraz ostatnie eliminacje; pomocne jest „Cofnij”. Automatyczne wypełnianie pojedynczych korzysta z Twoich notatek — nie traktuj ręcznie pozostawionej jednej cyfry jako dowodu."
 ]
];
const tools=[
 ['Własne sudoku','W menu „Wczytaj” wybierz tekst lub plik JSON, obrazek albo aparat. Po rozpoznaniu zdjęcia sprawdź cyfry przed wczytaniem. Przy ręcznym wpisywaniu zablokuj dane przyciskiem „Rozpocznij rozwiązywanie”.'],
 ['Notatki i zapis','Wpisanie liczby usuwa ją z kandydatów w powiązanych polach. Wypełnianie pojedynczych działa aż do wyczerpania możliwości. „Zapisz” pobiera planszę i notatki do pliku JSON; możesz je później wczytać.'],
 ['Graj po swojemu','W nagłówku zmienisz język, motyw, kontrast i wielkość tekstu. Opcjonalne oznaczanie błędnych cyfr znajdziesz w „Więcej”. Postępy i nagrody są zapisane na tym urządzeniu; samodzielne rozwiązanie wyklucza podpowiedzi techniki i oznaczanie błędów, ale dopuszcza kandydatów oraz wypełnianie pojedynczych.']
];
const givens='530070000600195000098000060800060003400803001700020006060000280000419005000080079';
let dialog,timer=null,step=0,running=false,revealed=false,started=false,opener;
const $=selector=>dialog.querySelector(selector);
function stop(){clearInterval(timer);timer=null;running=false;}
function draw(){
 $('#help-demo').hidden=!started;$('#help-prev').hidden=!started;$('#help-next').hidden=!started;
 $('#help-step').textContent=`${step+1} / ${steps.length}`;
 $('#help-step-title').textContent=steps[step][0];$('#help-description').textContent=steps[step][1];
 $('#help-play').textContent=running?'Pauza':'Odtwórz pokaz';$('#help-prev').disabled=step===0;$('#help-next').disabled=step===steps.length-1;
 const scene=$('#help-scene');scene.replaceChildren();scene.dataset.step=step;
 const board=document.createElement('div');board.className='help-demo-grid';board.dir='ltr';board.setAttribute('aria-hidden','true');
 [...givens].forEach((n,i)=>{const cell=document.createElement('span');cell.className='help-demo-cell';cell.textContent=n==='0'?'':n;
 if(step===0&&i<9)cell.classList.add('demo-unit');
 if(step===1&&i%9===2)cell.classList.add('demo-unit');
 if(step===2&&Math.floor(i/27)===0&&Math.floor(i%9/3)===0)cell.classList.add('demo-unit');
 if(step>=1&&step<=3&&i===2)cell.classList.add('demo-focus');
 if(step===2&&i===2){cell.textContent='4';cell.classList.add('demo-entry');}
 if(step===3&&i===2){cell.textContent='1 2 4';cell.classList.add('demo-notes');}
 if(step===4&&revealed&&i===40){cell.textContent='5';cell.classList.add('demo-hint');}
 board.append(cell);});scene.append(board);
 $('#help-demo-label').textContent=step===0?'Przykład: wyróżniony wiersz':step===1?'Przykład: wybrane pole w kolumnie':step===2?'Przykład: wpis w bloku 3 × 3':step===3?'Przykład: notatki w wybranym polu':revealed?'Przykład: pole wskazane przez podpowiedź':'Technika: Jedyny kandydat';
 $('#help-reveal').hidden=step!==4||revealed;$('#help-hint-detail').hidden=step!==4||!revealed;
}
function advance(){if(step>=steps.length-1){stop();draw();return;}step++;revealed=false;draw();}
function open(){
 stop();step=0;revealed=false;started=false;opener=document.activeElement;
 if(!dialog){dialog=document.createElement('dialog');dialog.id='help-dialog';dialog.setAttribute('aria-labelledby','help-title');document.body.append(dialog);
 dialog.innerHTML='<div class="help-heading"><h2 id="help-title">Jak grać w sudoku?</h2><button type="button" id="help-close" aria-label="Zamknij">×</button></div><section class="help-overview"><h3>Cel gry</h3><p>Uzupełnij siatkę 9 × 9 tak, aby cyfry 1–9 nie powtarzały się w żadnym wierszu, kolumnie ani bloku 3 × 3.</p></section><p class="help">Pokaz na przykładowej planszy — nie zmienia Twojej gry ani postępów.</p><nav class="help-demo-controls" aria-label="Sterowanie pokazem"><button id="help-prev" type="button" hidden>Wstecz</button><button id="help-play" type="button">Odtwórz pokaz</button><button id="help-next" type="button" hidden>Dalej</button></nav><section id="help-demo" hidden><p id="help-step" translate="no" dir="ltr"></p><h3 id="help-step-title"></h3><p id="help-description" aria-live="polite"></p><div id="help-scene"></div><p id="help-demo-label"></p><button id="help-reveal" class="secondary" type="button">Pokaż pola i wyjaśnienie ruchu</button><p id="help-hint-detail" hidden>W tym przykładzie w środkowym polu pasuje tylko 5. Podpowiedź wskazuje to pole, ale nie wpisuje za Ciebie cyfry.</p></section><details class="help-tools" id="help-rules"><summary>Zasady sudoku</summary><p>To łamigłówka logiczna, nie rachunkowa. Uzupełniasz siatkę 9 × 9, kierując się wierszami, kolumnami i dziewięcioma blokami. Nie musisz zgadywać — szukaj cyfr, które wynikają z układu planszy.</p></details><details class="help-tools" id="help-input"><summary>Sterowanie</summary></details><details id="help-candidates" class="help-tools"><summary>Więcej o kandydatach</summary></details><details class="help-tools" id="help-tools"><summary>Narzędzia i przydatne wskazówki</summary></details>';
 const rule=document.createElement('p');rule.textContent=steps[0][1];$('#help-rules').append(rule);
 for(const i of [1,2,3]){const p=document.createElement('p');p.textContent=steps[i][1];$('#help-input').append(p);}
 for(const [title,text]of candidateGuide){const h=document.createElement('h3'),p=document.createElement('p');h.textContent=title;p.textContent=text;$('#help-candidates').append(h,p);}
 for(const [title,text]of tools){const h=document.createElement('h3'),p=document.createElement('p');h.textContent=title;p.textContent=text;$('#help-tools').append(h,p);}
 $('#help-close').onclick=()=>dialog.close();$('#help-prev').onclick=()=>{stop();step=Math.max(0,step-1);revealed=false;draw();};$('#help-next').onclick=()=>{stop();advance();};
 $('#help-play').onclick=()=>{if(running){stop();draw();return;}if(step===steps.length-1){step=0;revealed=false;}started=true;running=true;timer=setInterval(advance,7000);draw();};
 $('#help-reveal').onclick=()=>{revealed=true;draw();};
 dialog.addEventListener('close',()=>{stop();opener?.focus();});
 }
 dialog.showModal();dialog.scrollTop=0;draw();
}
root.SudokuHelp={open};
document.getElementById('open-help').onclick=open;
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running){stop();draw();}});
})(globalThis);
