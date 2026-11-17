// Run locally with PLAYWRIGHT_PATH pointing to an installed Playwright package.
const {chromium}=require(process.env.PLAYWRIGHT_PATH);
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const dist=path.resolve(__dirname,'../dist');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 try{for(const width of [390,1280]){
  const context=await browser.newContext({viewport:{width,height:850},hasTouch:width===390,serviceWorkers:'block'});
  await context.route('**/*',route=>{
   const url=new URL(route.request().url());if(url.hostname!=='localhost')return route.abort();
   const file=path.join(dist,url.pathname==='/'?'index.html':url.pathname);
   return fs.existsSync(file)?route.fulfill({path:file}):route.fulfill({status:404});
  });
  const manifest=JSON.parse(fs.readFileSync(path.join(dist,'puzzles/technique-levels.json')));
  const ids=Object.values(manifest.levels).flatMap(l=>l.chunks.flatMap(c=>c.ids));
  await context.addInitScript(ids=>{localStorage.setItem('sudoku-language','pl');localStorage.setItem('sudoku-library-v1',JSON.stringify({completed:ids,recent:[]}));},ids);
  const page=await context.newPage();await page.goto('http://localhost:5189/');
  await page.evaluate(()=>{const data=empty();data.values[0]=1;replace(data,'test');change(()=>{state.values[1]=2;});});
  await page.locator('#reset').click();await page.locator('#confirm-no').click();
  assert.equal(await page.evaluate(()=>state.values[1]),2);
  assert.equal(await page.locator('#undo').isEnabled(),true);
  await page.locator('#reset').click();await page.locator('#confirm-yes').click();
  assert.equal(await page.locator('#undo').isDisabled(),true);
  assert.equal(await page.locator('#redo').isDisabled(),true);
  await page.evaluate(()=>{const data=empty();data.values[0]=1;replace(data,'test');change(()=>state.values[1]=2);});
  await page.locator('#restart').click();await page.locator('#confirm-no').click();
  assert.equal(await page.evaluate(()=>state.values[1]),2);
  await page.locator('#restart').click();await page.locator('#confirm-yes').click();
  assert.equal(await page.evaluate(()=>state.values[1]),0);
  assert.equal(await page.locator('#undo').isDisabled(),true);
  await page.reload();assert.equal(await page.evaluate(()=>state.values[0]),1);
  await page.locator('#open-library').click();
  await page.locator('#library-repeat').waitFor({state:'visible'});
  assert.match(await page.locator('#library-repeat').innerText(),/Poziom ukończony/);
  for(const id of ['library-start','library-daily']){
   const box=await page.locator('#'+id).boundingBox();assert.ok(box.y>=0&&box.y+box.height<=850);
  }
  await page.screenshot({path:path.join(__dirname,'artifacts/results-'+width+'.png')});
  await page.locator('#language-select').evaluate(el=>{SudokuI18n.setLanguage('ar');});
  assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
  assert.ok(!/Poziom ukończony/.test(await page.locator('#library-repeat').innerText()));
  await context.close();console.log(width+'px OK');
 }}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
