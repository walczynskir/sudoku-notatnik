import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const argument=process.argv[2];
const version=argument==='--check'?read('VERSION').trim():argument;
if(!/^\d+\.\d+\.\d+$/.test(version||''))throw Error('Użycie: node scripts/version.mjs X.Y.Z lub --check');
const html=read('dist/index.html');
const pattern=/<span id="app-version"[^>]*>v\d+\.\d+\.\d+<\/span>/;
if(!pattern.test(html))throw Error('Brak oznaczenia wersji w stopce.');
if(argument==='--check'){
 if(!html.includes(`aria-label="Wersja ${version}">v${version}</span>`))throw Error('Wersja stopki różni się od VERSION. Uruchom skrypt z numerem wydania.');
 console.log(`Wersja ${version}: VERSION i stopka są zgodne.`);
}else{
 writeFileSync(new URL('VERSION',root),version+'\n');
 writeFileSync(new URL('dist/index.html',root),html.replace(pattern,`<span id="app-version" aria-label="Wersja ${version}">v${version}</span>`));
 console.log(`Ustawiono wersję ${version}. Zaktualizuj CHANGELOG.md i utwórz tag v${version} po sprawdzeniu zmian.`);
}
