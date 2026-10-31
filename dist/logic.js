(function(root){
const peers=(a,b)=>a!==b&&(Math.floor(a/9)===Math.floor(b/9)||a%9===b%9||(Math.floor(a/27)===Math.floor(b/27)&&Math.floor(a%9/3)===Math.floor(b%9/3)));
function candidates(values,i){return values[i]?[]:[1,2,3,4,5,6,7,8,9].filter(n=>!values.some((v,j)=>v===n&&peers(i,j)));}
function placeValue(state,i,n){state.values[i]=n;state.notes[i]=[];state.notes=state.notes.map((notes,j)=>peers(i,j)?notes.filter(v=>v!==n):notes);return state;}
function fillSingles(state){
 if(conflicts(state.values).some(Boolean))return {error:'Najpierw popraw konflikty liczb na planszy.'};
 const singles=state.notes.flatMap((a,i)=>!state.values[i]&&a.length===1?[{cell:i,digit:a[0]}]:[]);
 if(!singles.length)return {count:0};
 const next=validate(state);
 for(const {cell,digit} of singles){if(!candidates(next.values,cell).includes(digit))return {error:'Pojedynczy kandydat jest sprzeczny z planszą lub innym wpisem. Sprawdź notatki; nic nie zmieniono.'};placeValue(next,cell,digit);}
 if(next.values.some((v,i)=>!v&&(!candidates(next.values,i).length||(state.notes[i].length>0&&!next.notes[i].length))))return {error:'Wpisanie pojedynczych kandydatów pozostawiłoby pole bez możliwości. Sprawdź notatki; nic nie zmieniono.'};
 return {count:singles.length,state:next};
}
function conflicts(values){return values.map((v,i)=>!!v&&values.some((w,j)=>w===v&&peers(i,j)));}
function validate(data){if(!data||!Array.isArray(data.values)||data.values.length!==81||!data.values.every(v=>Number.isInteger(v)&&v>=0&&v<=9))throw Error('Nieprawidłowe dane planszy.');let notes=data.notes??Array.from({length:81},()=>[]);if(!Array.isArray(notes)||notes.length!==81||!notes.every(a=>Array.isArray(a)&&a.every(v=>Number.isInteger(v)&&v>=1&&v<=9)))throw Error('Nieprawidłowy format kandydatów.');return {values:[...data.values],notes:notes.map((a,i)=>data.values[i]?[]:[...new Set(a)].sort())};}
function parse(text){if(text.trim().startsWith('{'))return validate(JSON.parse(text));const clean=text.replace(/[\s|,+\-]/g,'');if(!/^[0-9.]{81}$/.test(clean))throw Error('Potrzeba dokładnie 81 cyfr lub kropek. Sprawdź, czy jest 9 wierszy po 9 pól.');return validate({values:[...clean].map(c=>c==='.'?0:Number(c))});}
const api={peers,candidates,placeValue,fillSingles,conflicts,validate,parse};root.Sudoku=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
