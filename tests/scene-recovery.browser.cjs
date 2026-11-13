const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless:true,...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
  try {
    const page = await browser.newPage({viewport:{width:1356,height:647}});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.addInitScript(() => {
      window.blockWebGL = true;
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(type,...args) {
        if (window.blockWebGL && /webgl/.test(type)) return null;
        return original.call(this,type,...args);
      };
    });
    await page.goto('http://127.0.0.1:8765/preview-3d/index.page.html');
    await page.locator('[data-render-status="error"]').waitFor();
    assert.ok(await page.locator('.scene-fallback img').evaluate(img=>img.complete&&img.naturalWidth>0));
    await page.evaluate(()=>window.postMessage({type:'resolveCabinet',id:'D-08'},'*'));
    await page.waitForFunction(()=>document.querySelector('.scene-fallback img').src.includes('overview-resolved'));
    await page.evaluate(()=>{window.blockWebGL=false;});
    await page.getByRole('button',{name:'重试 3D'}).click();
    await page.locator('[data-render-status="ready"] canvas').waitFor();
    assert.equal(await page.locator('.scene-fallback').count(),0);
    await page.evaluate(()=>document.querySelector('canvas').dispatchEvent(new Event('webglcontextlost',{cancelable:true})));
    await page.locator('.scene-fallback').waitFor();
    await page.evaluate(()=>document.querySelector('canvas').dispatchEvent(new Event('webglcontextrestored')));
    await page.locator('[data-render-status="ready"]').waitFor();
    assert.deepEqual(errors,[]);
    console.log('PASS: WebGL failure keeps page, fallback asset, resolved fallback, retry restores real renderer, context-loss/restoration UI.');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
