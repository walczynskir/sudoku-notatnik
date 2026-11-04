/* Optional technique-based library preview. Stable source IDs are unchanged. */
(function(root){
'use strict';
const levels=[
 {id:'starter',label:'Na początek',description:'Tylko jedyny kandydat',tier:0},
 {id:'gentle',label:'Łatwy',description:'Także jedyne miejsce dla cyfry',tier:1},
 {id:'regular',label:'Wymagający',description:'Także zablokowani kandydaci',tier:2},
 {id:'demanding',label:'Ekspert',description:'Także pary, trójki i czwórki',tier:3},
 {id:'advanced',label:'Ekstremalny',description:'Wingi, Skyscraper i ryby',tier:4},
 {id:'extreme',label:'Arcymistrzowski',description:'Także prostokąty, kolorowanie i łańcuchy',tier:5}
];
function tier(technique){if(technique==='Jedyny kandydat')return 0;if(technique==='Jedyne miejsce dla cyfry')return 1;if(technique==='Zablokowani kandydaci')return 2;if(/^(Naga|Ukryta) (para|trójka|czwórka)$/.test(technique))return 3;if(['X-Wing','Skyscraper','XY-Wing','XYZ-Wing','W-Wing','Swordfish','Jellyfish'].includes(technique))return 4;return 5;}
function enabled(location){return ['localhost','127.0.0.1','[::1]'].includes(location?.hostname)&&new URLSearchParams(location?.search||'').get('features')?.split(',').includes('technique-levels')===true;}
const api={levels,tier,enabled};root.SudokuDifficulty=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
