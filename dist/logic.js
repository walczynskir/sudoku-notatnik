(function(root){
const peers=(a,b)=>a!==b&&(Math.floor(a/9)===Math.floor(b/9)||a%9===b%9||(Math.floor(a/27)===Math.floor(b/27)&&Math.floor(a%9/3)===Math.floor(b%9/3)));
function candidates(values,i){return values[i]?[]:[1,2,3,4,5,6,7,8,9].filter(n=>!values.some((v,j)=>v===n&&peers(i,j)));}
function placeValue(state,i,n){state.values[i]=n;state.notes[i]=[];state.notes=state.notes.map((notes,j)=>peers(i,j)?notes.filter(v=>v!==n):notes);return state;}
function fillSinglesRound(state){
 if(conflicts(state.values).some(Boolean))return {error:'Najpierw popraw konflikty liczb na planszy.'};
 const singles=state.notes.flatMap((a,i)=>!state.values[i]&&a.length===1?[{cell:i,digit:a[0]}]:[]);
 if(!singles.length)return {count:0};
 const next=validate(state);
 for(const {cell,digit} of singles){if(!candidates(next.values,cell).includes(digit))return {error:'Pojedynczy kandydat jest sprzeczny z planszą lub innym wpisem. Sprawdź notatki; nic nie zmieniono.'};placeValue(next,cell,digit);}
 if(next.values.some((v,i)=>!v&&(!candidates(next.values,i).length||(state.notes[i].length>0&&!next.notes[i].length))))return {error:'Wpisanie pojedynczych kandydatów pozostawiłoby pole bez możliwości. Sprawdź notatki; nic nie zmieniono.'};
 return {count:singles.length,state:next};
}
function fillSingles(state){
 let current=state,count=0;
 for(let round=0;round<81;round++){
  const result=fillSinglesRound(current);
  if(result.error)return {error:result.error};
  if(!result.count)return count?{count,state:current}:{count:0};
  count+=result.count;current=result.state;
 }
 return {count,state:current};
}
function conflicts(values){return values.map((v,i)=>!!v&&values.some((w,j)=>w===v&&peers(i,j)));}
function validate(data){if(!data||!Array.isArray(data.values)||data.values.length!==81||!data.values.every(v=>Number.isInteger(v)&&v>=0&&v<=9))throw Error('Nieprawidłowe dane planszy.');let notes=data.notes??Array.from({length:81},()=>[]);if(!Array.isArray(notes)||notes.length!==81||!notes.every(a=>Array.isArray(a)&&a.every(v=>Number.isInteger(v)&&v>=1&&v<=9)))throw Error('Nieprawidłowy format kandydatów.');return {values:[...data.values],notes:notes.map((a,i)=>data.values[i]?[]:[...new Set(a)].sort())};}
function solutionCount(values,limit=2,maxNodes=200000){
 const board=[...values],rows=Array(9).fill(0),cols=Array(9).fill(0),boxes=Array(9).fill(0);let count=0,nodes=0,exhausted=false;
 for(let i=0;i<81;i++)if(board[i]){const r=Math.floor(i/9),c=i%9,b=Math.floor(r/3)*3+Math.floor(c/3),bit=1<<board[i];if((rows[r]|cols[c]|boxes[b])&bit)return {count:0,complete:true};rows[r]|=bit;cols[c]|=bit;boxes[b]|=bit;}
 function search(){if(count>=limit||exhausted)return;if(++nodes>maxNodes){exhausted=true;return;}let best=-1,mask=0,min=10;
  for(let i=0;i<81;i++)if(!board[i]){const r=Math.floor(i/9),c=i%9,b=Math.floor(r/3)*3+Math.floor(c/3),m=1022&~(rows[r]|cols[c]|boxes[b]);let bits=m,n=0;while(bits){bits&=bits-1;n++;}if(!n)return;if(n<min){best=i;mask=m;min=n;if(n===1)break;}}
  if(best===-1){count++;return;}const r=Math.floor(best/9),c=best%9,b=Math.floor(r/3)*3+Math.floor(c/3);
  for(let n=1;n<=9;n++){const bit=1<<n;if(!(mask&bit))continue;board[best]=n;rows[r]|=bit;cols[c]|=bit;boxes[b]|=bit;search();board[best]=0;rows[r]^=bit;cols[c]^=bit;boxes[b]^=bit;if(count>=limit||exhausted)return;}
 }search();return {count,complete:!exhausted};
}
function digitState(values,n){const count=values.filter(v=>v===n).length;const bad=conflicts(values);return {count,disabled:count>=9,complete:count===9&&!values.some((v,i)=>v===n&&bad[i])};}
function normalizeDigits(text){return String(text).replace(/[٠-٩۰-۹०-९]/gu,c=>{const n=c.codePointAt(0);return String(n>=0x966?n-0x966:n>=0x6f0?n-0x6f0:n-0x660);});}
function parse(text){text=normalizeDigits(text);if(text.trim().startsWith('{'))return validate(JSON.parse(text));const clean=text.replace(/[\s|,+\-]/g,'');if(!/^[0-9.]{81}$/.test(clean))throw Error('Potrzeba dokładnie 81 cyfr lub kropek. Sprawdź, czy jest 9 wierszy po 9 pól.');return validate({values:[...clean].map(c=>c==='.'?0:Number(c))});}
const api={peers,candidates,placeValue,fillSingles,solutionCount,digitState,conflicts,validate,parse,normalizeDigits};root.Sudoku=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
