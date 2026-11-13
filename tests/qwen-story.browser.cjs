// Run with Playwright installed outside the page bundle. See README for usage.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
(async () => {
 const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
 try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto(process.env.DEMO_URL || 'http://127.0.0.1:8765/preview/index.page.html');
  await page.locator('.ai-event-row').filter({hasText:'Qwen-1.5B'}).click();
  await page.waitForSelector('.qw-canvas'); await page.waitForTimeout(1000);
  const metric = () => page.locator('.qw-metrics > div').first().innerText();
  const stage = () => page.locator('.qw-canvas').getAttribute('data-stage');
  assert.equal(await page.locator('.qw-cells span').filter({hasText:/^N$/}).count(),80);assert.equal(await page.locator('.qw-cells span').filter({hasText:/^C$/}).count(),20);assert.equal(await page.locator('.qw-journey-actions').innerText(),'');assert.equal(await stage(), '6'); assert.match(await metric(), /77.5/);
  assert.equal(await page.getByRole('button', { name: '授权升级网卡', exact: true }).count(), 1);
  const images = await page.locator('.qw-canvas img').evaluateAll(els => els.filter(e => !e.complete || !e.naturalWidth).map(e => e.src));
  assert.deepEqual(images, []);
  assert.ok(await page.locator('.qw-chart svg path').count() > 20, 'Timeline actually renders');
  await page.screenshot({path: '/tmp/ccae-qwen-default.png'});
  await page.getByText('展开全部', {exact:true}).click();
  assert.equal(await page.locator('.qw-step-content').count(), 6);
  await page.getByText('vmcore 分析结果', {exact:true}).click();
  await page.getByRole('dialog').waitFor();
  assert.match(await page.getByRole('dialog').innerText(), /内核空指针异常/);
  await page.getByRole('button', {name:'Close',exact:true}).click();
  await page.getByText('收起全部', {exact:true}).click();assert.equal(await page.locator('.qw-step-content').count(),0);
  await page.locator('.qw-step-heading').nth(5).click();
  // Distinct OS / instance / service moments. Historical view cannot authorize twice.
  await page.getByRole('button',{name:'12:05:06 操作系统崩溃重启',exact:true}).click();
  assert.match(await metric(), /77.5/);assert.equal(await page.locator('.qw-service').getAttribute('data-healthy'),'false');assert.equal(await stage(),'6');
  await page.getByRole('button',{name:'12:05:09 D-08 实例异常退出',exact:true}).click();assert.match(await metric(),/77.5/);
  await page.getByRole('button',{name:'12:05:12 推理服务劣化',exact:true}).click();assert.match(await metric(),/77.5/);
  await page.getByRole('button',{name:'时间范围',exact:true}).click();await page.getByRole('button',{name:'回到最新',exact:true}).click();
  await page.getByLabel('叠加性能指标').selectOption('tpot');
  const chartRect=await page.locator('.qw-chart').boundingBox();
  await page.mouse.click(chartRect.x+100,chartRect.y+50);
  assert.notEqual(await page.locator('.qw-journey').getAttribute('data-replay'),'latest');
  await page.getByRole('button',{name:'时间范围',exact:true}).click();await page.getByRole('button',{name:'回到最新',exact:true}).click();
  await page.getByRole('button',{name:/P-01 实例 112.34.13.2/}).hover();
  assert.match(await page.locator('.qw-node-tip').innerText(),/待升级网卡驱动版本/);assert.deepEqual(await page.locator('.qw-u-label').allTextContents(),['CPU U18','NPU U12']);assert.equal(await page.locator('.qw-rack-cell.unmapped').count(),60);
  assert.equal(await page.locator('.qw-blade').first().evaluate(e=>e.style.left),'5.4px');
  for (const [name,cpu,npu] of [['P-02',17,11],['D-01',16,10],['D-02',15,9],['D-03',4,8],['D-04',3,7],['D-05',2,6],['D-06',1,5],['D-07',18,12],['D-08',16,10]]) {
   await page.locator('.qw-node').filter({hasText:name}).hover();
   assert.deepEqual(await page.locator('.qw-u-label').allTextContents(),['CPU U'+String(cpu).padStart(2,'0'),'NPU U'+String(npu).padStart(2,'0')]);
   assert.equal(await page.locator('.qw-rack-cell.fault-cell').count(),1);
  }
  const boxes=await page.locator('.qw-blade').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}}));
  const cells=await page.locator('.qw-rack-cell.linked,.qw-rack-cell.fault-cell').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom}}));
  for(const c of cells) assert.ok(boxes.some(b=>c.x>=b.x-1&&c.right<=b.right+1&&c.y>=b.y-1&&c.bottom<=b.bottom+1),'Highlighted cell lies inside its slot frame');
  await page.screenshot({path:'/tmp/ccae-qwen-slot-labels.png'});
  await page.mouse.move(550,70);
  await page.getByRole('tab',{name:'处理环节',exact:true}).click();
  assert.equal(await page.locator('.qw-flow [data-icon=flow-hand]').count(),1);assert.equal(await page.locator('.qw-flow [data-icon=flow-robot]').count(),9);await page.screenshot({path:'/tmp/ccae-qwen-flow-review.png'});await page.locator('.qw-flow>button').nth(4).click();assert.equal(await page.locator('.qw-step-heading').nth(3).getAttribute('aria-expanded'),'true');
  await page.getByRole('tab',{name:'服务旅程',exact:true}).click();
  // Close expanded earlier sections to keep authorization visible.
  await page.getByText('展开全部',{exact:true}).click();await page.getByText('收起全部',{exact:true}).click();await page.locator('.qw-step-heading').nth(5).click();
  await page.getByRole('button',{name:'授权升级网卡',exact:true}).click();assert.equal(await stage(),'7');assert.match(await metric(),/77.5/);
  await page.waitForFunction(()=>document.querySelector('.qw-canvas').dataset.stage==='8');assert.match(await metric(),/77.5/);
  await page.waitForFunction(()=>document.querySelector('.qw-canvas').dataset.stage==='9');assert.match(await metric(),/99.94/);
  assert.equal(await page.locator('.qw-rack-cell.fault-cell').count(),0);await page.screenshot({path:'/tmp/ccae-qwen-recovered.png'});
  await page.getByRole('button',{name:'12:05:12 推理服务劣化',exact:true}).click();assert.match(await metric(),/77.5/);assert.equal(await stage(),'9');assert.match(await page.locator('.qw-event-heading').innerText(),/已恢复/);
  await page.getByRole('button',{name:'时间范围',exact:true}).click();await page.getByRole('button',{name:'回到最新',exact:true}).click();assert.match(await metric(),/99.94/);
  await page.getByRole('textbox',{name:'询问算小维'}).fill('当前恢复状态是什么');await page.getByLabel('发送问题',{exact:true}).click();assert.match(await page.locator('.qw-answer').innerText(),/已恢复/);
  await page.getByLabel('放大诊断详情',{exact:true}).click();assert.equal(await page.locator('.qw-process').isVisible(),false);await page.getByLabel('退出专注视图',{exact:true}).click();
  await page.getByLabel('返回',{exact:true}).click();
  await page.locator('.tl-event-hot').filter({hasText:'Qwen-1.5B'}).click();assert.equal(await stage(),'9');
  await page.reload();await page.locator('.ai-event-row').filter({hasText:'Qwen-1.5B'}).click();await page.waitForSelector('.qw-canvas');assert.equal(await stage(),'6');
  await page.setViewportSize({width:2483,height:1381});await page.waitForTimeout(500);
  const event=page.getByRole('button',{name:'12:05:06 操作系统崩溃重启',exact:true});await event.click();
  assert.match(await metric(),/77.5/);assert.equal(await page.locator('.qw-service h2 .qw-badge').innerText(),'劣化');
  const eventBox=await event.boundingBox(),line=await page.locator('.qw-replay-line').boundingBox();assert.ok(Math.abs(eventBox.x+eventBox.width/2-line.x-line.width/2)<1,'Replay line aligns with event at enlarged viewport');
  const graph=await page.locator('.qw-chart').boundingBox();await page.mouse.click(eventBox.x+eventBox.width/2,graph.y+graph.height*.4);assert.equal(await page.locator('.qw-journey').getAttribute('data-replay'),'6','Chart click matches lane time');
  assert.equal(await page.locator('.qw-nav-items button').count(),4);assert.equal((await page.locator('.qw-nav-items').innerText()).trim(),'');
  await page.screenshot({path:'/tmp/ccae-qwen-2483.png'});
  await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(300);
  const rect=await page.locator('.qw-canvas').boundingBox();assert.ok(rect.x>=0&&rect.y>=0&&rect.x+rect.width<=1441&&rect.y+rect.height<=901);
  await page.screenshot({path:'/tmp/ccae-qwen-1440.png'});
  assert.deepEqual(errors,[]);
  console.log('PASS: default, assets, chart, expand/collapse, evidence, 6/9/12-second replay, node/rack mapping, metric and tab switches, authorization stages 7/8/9, history after recovery, composer, focus view, reset, 1440 viewport.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
