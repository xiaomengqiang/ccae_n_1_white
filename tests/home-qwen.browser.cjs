// Uses the same external Playwright / Chrome setup as qwen-story.browser.cjs.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
  try {
    const page = await browser.newPage({viewport:{width:1421,height:1428}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.DEMO_URL || 'http://127.0.0.1:8765/preview/index.page.html');
    const frame = page.frameLocator('.cabinet-area-frame');
    await frame.locator('canvas').waitFor({timeout:120000});
    const iframe = await page.locator('.cabinet-area-frame').elementHandle();
    const scene = await iframe.contentFrame();
    await scene.evaluate(() => {
      window.mergeMessages = [];
      window.addEventListener('message', event => window.mergeMessages.push(event.data));
    });
    await page.screenshot({path:'/tmp/ccae-merge-home.png'});
    assert.equal(await page.locator('.tl-event-hot').count(), 4);
    assert.equal(await page.locator('.ai-event-row').count(), 4);
    assert.match(await page.locator('.ai-event-row').first().innerText(), /Qwen-1.5B[\s\S]*影响业务/);
    assert.match(await page.locator('.metrics-area').innerText(), /故障数\s*4/);
    const event = page.locator('.ai-event-row').filter({hasText:'Qwen-1.5B'});
    await event.click();
    await page.locator('.qw-canvas').waitFor();
    assert.equal(await page.locator('.qw-canvas').getAttribute('data-stage'), '6');
    const box = await page.locator('.qw-canvas').boundingBox();
    assert.ok(Math.abs(box.width - 1421) < 1, 'Qwen scales exactly once');
    await page.screenshot({path:'/tmp/ccae-merge-qwen.png'});
    await page.getByLabel('返回',{exact:true}).click();
    assert.ok(await event.isVisible());
    assert.equal(await page.locator('.ai-event-selected').count(), 1);
    await page.locator('.tl-event-hot').filter({hasText:'Qwen-1.5B'}).press('Enter');
    await page.locator('.qw-canvas').waitFor();
    await page.getByRole('button',{name:'授权升级网卡',exact:true}).click();
    await page.getByLabel('返回',{exact:true}).click();
    await page.locator('.tl-single-state.closed').waitFor();
    assert.equal(await page.locator('.ai-event-row').count(), 3);
    assert.match(await page.locator('.metrics-area').innerText(), /故障数\s*3/);
    assert.match(await page.locator('.ai-guard-text').innerText(), /业务均正常/);
    assert.equal(await page.locator('.ai-event-row').filter({hasText:'NPU驱动固件'}).count(),1);
    assert.ok(await scene.evaluate(() => window.mergeMessages.some(message => message.type === 'resolveCabinet' && message.id === 'D-08')), 'Completion synchronizes the retained 3D frame');
    await page.screenshot({path:'/tmp/ccae-merge-home-resolved.png'});
    await page.locator('.tl-event-hot').filter({hasText:'Qwen-1.5B'}).click();
    assert.equal(await page.locator('.qw-canvas').getAttribute('data-stage'),'9');
    assert.ok(await iframe.evaluate(element => element.isConnected), 'Original 3D iframe remains mounted');
    assert.deepEqual(errors,[]);
    console.log('PASS: homepage + 3D, both Qwen entries, keyboard entry, single scaling, return, background completion, 3D synchronization, retained story state and unrelated event.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode=1; });
