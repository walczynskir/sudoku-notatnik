(function(root){
'use strict';
const raw=root.SudokuLocales||(typeof require==='function'?require('./locales.js'):{});
const languages=['pl','en','es','de','zh-Hans','hi','fr','ar','it'],normalize=s=>s.replace(/\s+/gu,' ').trim();
const catalog=new Map(Object.entries(raw).map(([key,v])=>[normalize(key),v]));
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const patterns=[...catalog].filter(([key])=>/\{\d+\}/.test(key)).map(([key,values])=>{
 const slots=[];let last=0,source='';for(const m of key.matchAll(/\{(\d+)\}/g)){source+=escape(key.slice(last,m.index))+(/^[Ww]iersz \{0\}, kolumna \{1\}$/.test(key)?'(\\d+)':'(.*?)');slots.push(Number(m[1]));last=m.index+m[0].length;}source+=escape(key.slice(last));return {key,values,slots,regex:new RegExp('^'+source+'$','u')};
}).sort((a,b)=>b.key.replace(/\{\d+\}/g,'').length-a.key.replace(/\{\d+\}/g,'').length);
function resolveLanguage(preferred){for(const tag of preferred||[]){const code=String(tag).toLowerCase().split('-')[0];if(code==='zh')return 'zh-Hans';if(languages.includes(code))return code;}return 'en';}
let language='pl';
function text(source,lang=language,depth=0){
 if(source==null)return '';source=String(source);if(lang==='pl'||!languages.includes(lang)||depth>12)return source;
 if(!/[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/u.test(source))return source;
 const key=normalize(source),column=languages.indexOf(lang)-1,found=catalog.get(key);if(found)return found[column];
 const currentPrefix='W aktualnym układzie: ';if(key.startsWith(currentPrefix)){const value=text(key.slice(currentPrefix.length),lang,depth+1);return catalog.get(currentPrefix+'{0}')[column].replace('{0}',()=>lang==='ar'?'\u2068'+value+'\u2069':value);}
 const removal=' Usuń wyłącznie wskazanych kandydatów: ',at=source.indexOf(removal);
 if(at>=0)return text(source.slice(0,at),lang,depth+1)+' '+text(removal.trim(),lang)+' '+text(source.slice(at+removal.length),lang,depth+1);
 for(const p of patterns){const m=key.match(p.regex);if(!m)continue;const args={};p.slots.forEach((slot,i)=>{args[slot]=text(m[i+1],lang,depth+1);});return p.values[column].replace(/\{(\d+)\}/g,(_,i)=>lang==='ar'?'\u2068'+args[i]+'\u2069':args[i]);}
 // Coordinate lists and chain notation retain every digit and link exactly.
 let result=source.replace(/wiersz (\d+), kolumna (\d+)/g,(_,r,c)=>text(`wiersz ${r}, kolumna ${c}`,lang,depth+1));
 for(const [key,v]of catalog){if((key.startsWith('Nie udało się otworzyć obrazu.')||key.startsWith('Rozpoznawanie nie powiodło się.'))&&source.startsWith(key+' '))return v[column]+' '+text(source.slice(key.length+1),lang,depth+1);}
 // Known technique identifiers can appear as a comma-separated proof history.
 const names=['Jedyny kandydat','Jedyne miejsce dla cyfry','Zablokowani kandydaci','Naga para','Ukryta para','Naga trójka','Ukryta trójka','Naga czwórka','Ukryta czwórka','Unique Rectangle typ 1','Unique Rectangle typ 2','Unique Rectangle typ 4','Kolorowanie — pułapka','Kolorowanie — sprzeczność'];
 for(const name of names)if(result.includes(name))result=result.replaceAll(name,catalog.get(name)[column]);
 if(result.endsWith(', konflikt'))result=result.slice(0,-10)+catalog.get(', konflikt')[column];
 return result;
}
const api={languages,resolveLanguage,text,get language(){return language;}};root.SudokuI18n=api;if(typeof module!=='undefined')module.exports=api;
if(typeof document==='undefined')return;
const originalText=new WeakMap(),originalAttributes=new WeakMap();
function translateNode(node){
 const value=node.nodeValue;if(!value?.trim()||node.parentElement?.closest('script,style,textarea,#language-select'))return;
 const saved=originalText.get(node),source=saved&&value===saved.translated?saved.source:value;
 const translated=(source.match(/^\s*/u)?.[0]||'')+text(normalize(source))+(source.match(/\s*$/u)?.[0]||'');
 originalText.set(node,{source,translated});if(value!==translated)node.nodeValue=translated;
}
function translateElement(el){
 if(el.closest('#language-select'))return;
 let stored=originalAttributes.get(el);if(!stored){stored={};originalAttributes.set(el,stored);}
 for(const attr of ['aria-label','title','placeholder']){if(!el.hasAttribute(attr))continue;const value=el.getAttribute(attr),old=stored[attr],source=old&&old.translated===value?old.source:value,translated=text(source);stored[attr]={source,translated};if(value!==translated)el.setAttribute(attr,translated);}
}
function apply(){
 document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';
 const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode())translateNode(node);
 document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(translateElement);
 const meta=document.querySelector('meta[name="description"]');if(meta){const key='Trener Sudoku: rozwiązuj sudoku krok po kroku. Kandydaci, import zdjęć i wyjaśnienia technik — od par po skrzydła i ryby.';meta.content=text(key);}
}
const select=document.getElementById('language-select');
try{const saved=localStorage.getItem('sudoku-language');language=languages.includes(saved)?saved:resolveLanguage(navigator.languages||[navigator.language]);}catch{language=resolveLanguage(navigator.languages||[navigator.language]);}
api.setLanguage=lang=>{if(!languages.includes(lang))return;language=lang;select.value=lang;try{localStorage.setItem('sudoku-language',lang);}catch{}apply();};
select.value=language;select.addEventListener('change',()=>api.setLanguage(select.value));
apply();let queued=false;
new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply();});}).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});
})(globalThis);
