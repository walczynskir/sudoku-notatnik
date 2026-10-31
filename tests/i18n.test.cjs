const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),I=require('../dist/i18n.js'),C=require('../dist/locales.js'),H=require('../dist/hints.js'),S=require('../dist/logic.js');
const langs=['en','es','de','zh-Hans'];
test('all catalog entries contain all four translations and matching placeholders',()=>{
 for(const [source,targets]of Object.entries(C)){assert.equal(targets.length,4,source);const slots=s=>[...s.matchAll(/\{(\d+)\}/g)].map(m=>m[1]).sort().join();for(const target of targets){assert(target.trim(),source);assert.equal(slots(target),slots(source),source);}}
});
test('every supported technique and guide is translated',()=>{
 for(const [name,guide]of Object.entries(H.guides))for(const lang of langs){assert(C[name],name);assert(C[guide],name);assert.notEqual(I.text(guide,lang),guide,name);assert(!/[ąćęłńśźż]/i.test(I.text(guide,lang)),name);}
});
test('browser language negotiation and unsupported fallback',()=>{
 assert.equal(I.resolveLanguage(['fr-FR','es-MX']),'es');assert.equal(I.resolveLanguage(['de-AT']),'de');assert.equal(I.resolveLanguage(['zh-CN']),'zh-Hans');assert.equal(I.resolveLanguage(['zh-TW']),'zh-Hans');assert.equal(I.resolveLanguage(['pl-PL']),'pl');assert.equal(I.resolveLanguage(['fr']),'en');
});
test('dynamic progress, coordinates, proof histories and OCR summaries preserve values',()=>{
 const cases=['Wiersz 3, kolumna 8: puste, kandydaci 2, 6, konflikt','Rozpoznawanie pola 47 z 81…','Rozpoznano 24 cyfr. Sprawdź wynik z obrazkiem. Pola z niepewnym odczytem (3) mają bursztynowe tło.','Wypełniono 17 pól z pojedynczym kandydatem. Całą operację możesz cofnąć jednym krokiem.','Po uwzględnieniu już wykonanych, logicznie potwierdzonych eliminacji (Naga para, Ukryta trójka): W wierszu 4 wszystkie miejsca dla cyfry 6 leżą także w kwadracie 5. Usuń wyłącznie wskazanych kandydatów: wiersz 5, kolumna 8 → 6; wiersz 6, kolumna 8 → 6.'];
 for(const source of cases)for(const lang of langs){const translated=I.text(source,lang);assert.notEqual(translated,source,source);assert(!/[ąćęłńśźż]/i.test(translated),translated);assert.deepEqual(translated.match(/\d+/g),source.match(/\d+/g),translated);}
});
test('actual deduction explanations translate without losing elimination coordinates',()=>{
 const solved=[...'534678912672195348198342567859761423426853791713924856961537284287419635345286179'].map(Number);let seed=123;
 for(let trial=0;trial<8;trial++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const values=solved.map((n,i)=>(i*13+seed)%10<3?n:0),notes=values.map((_,i)=>S.candidates(values,i));let count=0;for(const h of H.deductions(notes)){for(const lang of langs){const translated=I.text(h.explanation,lang);assert(!/[ąćęłńśźż]/i.test(translated),translated);assert.deepEqual(translated.match(/\d+/g),h.explanation.match(/\d+/g));}if(++count>20)break;}}
});
test('Polish source remains unchanged and unknown text is not invented',()=>{assert.equal(I.text('Wczytaj','pl'),'Wczytaj');assert.equal(I.text('Device busy: camera 2','en'),'Device busy: camera 2');});
test('switching language restores original text, preserves input and tolerates blocked storage',()=>{
 const handlers={},storage=new Map(),nodes=[{nodeValue:' Wczytaj ',parentElement:{closest(){return null;}}}],select={value:'',addEventListener(n,fn){handlers[n]=fn;}},input={value:'123',hidden:true},document={documentElement:{lang:'pl'},getElementById(){return select;},createTreeWalker(){let i=0;return {nextNode:()=>nodes[i++]||null};},querySelectorAll(){return [];},querySelector(){return null;},body:{}};
 const c={SudokuLocales:C,document,navigator:{languages:['en-US']},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},NodeFilter:{SHOW_TEXT:4},MutationObserver:class{observe(){}},queueMicrotask};vm.createContext(c);vm.runInContext(fs.readFileSync(require.resolve('../dist/i18n.js'),'utf8'),c);assert.equal(nodes[0].nodeValue,' Import ');c.SudokuI18n.setLanguage('es');assert.equal(nodes[0].nodeValue,' Cargar ');assert.equal(storage.get('sudoku-language'),'es');c.SudokuI18n.setLanguage('pl');assert.equal(nodes[0].nodeValue,' Wczytaj ');assert.equal(input.value,'123');assert(input.hidden);assert.equal(document.documentElement.lang,'pl');c.localStorage.setItem=()=>{throw Error('blocked');};assert.doesNotThrow(()=>c.SudokuI18n.setLanguage('de'));
});

test('all static interface labels have catalog or dynamic-template coverage',()=>{
 const html=fs.readFileSync(require.resolve('../dist/index.html'),'utf8'),labels=[...html.matchAll(/>([^<>]+)</g)].map(m=>m[1]),attributes=[...html.matchAll(/(?:aria-label|title)="([^"]+)"/g)].map(m=>m[1]),keys=new Set(Object.keys(C).map(s=>s.replace(/\s+/g,' ').trim()));
 for(let source of [...labels,...attributes]){source=source.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();if(!/[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(source)||['Polski','English','Español','Deutsch','Language / Język'].includes(source)||/^v\d+\.\d+\.\d+$/.test(source))continue;assert(keys.has(source)||I.text(source,'en')!==source,source);}
});
