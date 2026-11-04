import {readFileSync,writeFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const argument=process.argv[2];
const version=argument==='--check'?read('VERSION').trim():argument;
if(!/^\d+\.\d+\.\d+$/.test(version||''))throw Error('Użycie: node scripts/version.mjs X.Y.Z lub --check');
const html=read('dist/index.html');
const credits=read('dist/credits.html');
const pattern=/<span id="app-version"[^>]*>v\d+\.\d+\.\d+<\/span>/;
if(!pattern.test(html))throw Error('Brak oznaczenia wersji w stopce.');
if(argument==='--check'){
 if(!html.includes(`aria-label="Wersja ${version}">v${version}</span>`))throw Error('Wersja stopki różni się od VERSION. Uruchom skrypt z numerem wydania.');
 if(!credits.includes(`themes.css?v=${version}`)||!credits.includes(`studio.css?v=${version}`))throw Error('Wersja stylów motywów różni się od VERSION.');
 for(const asset of ['locales','i18n','theme'])if(!credits.includes(`${asset}.js?v=${version}`))throw Error('Wersja plików strony licencji różni się od VERSION.');
 for(const page of [html,credits])for(const asset of ['themes','studio','forma','energy','tangerine','porcelain','accessibility','aurora','ukraine','technique-rewards'])if(!page.includes(`${asset}.css?v=${version}`))throw Error(`Niezgodna wersja arkusza ${asset}.css`);
 for(const asset of ['progress.js','progress.css'])if(!html.includes(`${asset}?v=${version}`))throw Error(`Niezgodna wersja ${asset}`);
 console.log(`Wersja ${version}: VERSION i stopka są zgodne.`);
}else{
 writeFileSync(new URL('dist/credits.html',root),credits.replace(/((?:src="(?:locales|i18n|theme)\.js|href="(?:themes|studio|forma|energy|tangerine|porcelain|accessibility|aurora|ukraine|technique-rewards)\.css))(?:\?v=[^"]*)?"/g,`$1?v=${version}"`));
 writeFileSync(new URL('VERSION',root),version+'\n');
 writeFileSync(new URL('dist/index.html',root),html.replace(/((?:href|src)="(?:style\.css|themes\.css|studio\.css|forma\.css|energy\.css|tangerine\.css|porcelain\.css|accessibility\.css|aurora\.css|ukraine\.css|progress\.css|technique-rewards\.css|favicon\.ico|favicon\.svg|apple-touch-icon\.png|(?:logic|hints|ocr|app|camera|locales|i18n|library|theme|progress|difficulty|technique-rewards)\.js))(?:\?v=[^"]*)?"/g,`$1?v=${version}"`).replace(pattern,`<span id="app-version" aria-label="Wersja ${version}">v${version}</span>`));
 console.log(`Ustawiono wersję ${version}. Zaktualizuj CHANGELOG.md i utwórz tag v${version} po sprawdzeniu zmian.`);
}
