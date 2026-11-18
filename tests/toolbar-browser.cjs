const {chromium}=require(process.env.PLAYWRIGHT_PATH),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});try{
for(const [width,height] of [[320,740],[390,850],[850,390],[1280,900]]){
 const context=await browser.newContext({viewport:{width,height},hasTouch:true,serviceWorkers:'block'});
 await context.route('**/*',r=>{const u=new URL(r.request().url());if(u.hostname!=='localhost')return r.abort();const f=path.resolve(__dirname,'../dist','.'+(u.pathname==='/'?'/index.html':u.pathname));return fs.existsSync(f)?r.fulfill({path:f}):r.fulfill({status:404})});
 const page=await context.newPage();await page.goto('http://localhost/');
 for(const lang of ['pl','ar'])for(const large of [false,true])for(const full of [false,true]){
 await page.evaluate(()=>document.body.classList.remove('sudoku-fullscreen'));await page.selectOption('#language-select',lang);
 await page.evaluate(({large,full})=>{document.documentElement.dataset.textSize=large?'large':'normal';document.body.classList.toggle('sudoku-fullscreen',full)},{large,full});
 await page.waitForTimeout(100);
 const boxes=await page.locator('#play-launch button').evaluateAll(bs=>bs.map(b=>{const r=b.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,label:b.getAttribute('aria-label')}}));
 assert.equal(boxes.length,6);for(let i=0;i<boxes.length;i++){const b=boxes[i];assert(b.w>=43.9&&b.h>=43.9,JSON.stringify(b));assert(b.x>=0&&b.x+b.w<=width+1,JSON.stringify({width,large,full,b}));assert(b.label);if(i)assert(boxes[i-1].x+boxes[i-1].w<=b.x+1);}
 assert.equal(await page.locator('#undo').count(),1);
 }
 await page.evaluate(()=>{document.body.classList.remove('sudoku-fullscreen');const d=empty();replace(d,'test');change(()=>state.values[0]=1)});
 await page.locator('#undo').tap();assert.equal(await page.evaluate(()=>state.values[0]),0);
 await page.locator('#redo').tap();assert.equal(await page.evaluate(()=>state.values[0]),1);
 await page.reload();assert.equal(await page.evaluate(()=>state.values[0]),1);
 await page.locator('#open-preferences').focus();await page.keyboard.press('Enter');assert(await page.locator('#preferences-dialog').isVisible());await page.keyboard.press('Escape');
 await page.locator('#open-preferences').click();
 await page.locator('#preference-history').uncheck();
 assert(await page.locator('#undo').isHidden());assert(await page.locator('#redo').isHidden());
 await page.keyboard.press('Escape');
 await page.keyboard.press('Control+z');assert.equal(await page.evaluate(()=>state.values[0]),1);
 await page.reload();assert(await page.locator('#undo').isHidden());
 await page.locator('#open-preferences').click();assert.equal(await page.locator('#preference-history').isChecked(),false);
 await page.locator('#preference-history').check();await page.keyboard.press('Escape');
 assert(await page.locator('#undo').isVisible());assert(await page.locator('#redo').isVisible());
 await page.waitForTimeout(100);
 const bounds=await page.locator('#play-launch').evaluate(b=>{const r=b.getBoundingClientRect();return [...b.querySelectorAll('button')].every(c=>{const x=c.getBoundingClientRect();return x.left>=r.left&&x.right<=r.right+1})});assert(bounds);
 await page.locator('#contrast-toggle').click();await page.waitForTimeout(100);
 fs.mkdirSync(path.join(__dirname,'artifacts'),{recursive:true});await page.screenshot({path:path.join(__dirname,`artifacts/toolbar-${width}.png`)});
 await context.close();console.log(`${width} OK`);
}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
