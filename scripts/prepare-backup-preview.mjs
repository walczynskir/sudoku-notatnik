import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
const output='/tmp/sudoku-backup-preview';
await mkdir(output,{recursive:true});await cp(new URL('../dist/',import.meta.url),output,{recursive:true});
const index=await readFile(output+'/index.html','utf8');
await writeFile(output+'/index.html',index.replace(/<script defer src="https:\/\/cloud\.umami\.is\/script\.js"[^>]*><\/script>/g,''));
const install=await readFile(output+'/install.js','utf8');
await writeFile(output+'/install.js',install.replace(/if \(window === window.top && 'serviceWorker' in navigator\) \{[\s\S]*?\n\}/,''));
// The temporary preview can be opened from a phone on the local network.
for(const file of ['theme.js','progress.js','difficulty.js']){
 const source=await readFile(output+'/'+file,'utf8');
 await writeFile(output+'/'+file,source.replaceAll('.includes(root.location?.hostname)',".includes('localhost')").replaceAll('.includes(location?.hostname)',".includes('localhost')"));
}
console.log(output);
