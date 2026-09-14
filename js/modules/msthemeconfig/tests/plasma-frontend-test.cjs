/** Isolated real-Fabric browser checks. Requires Playwright; all HTTP requests are mocked. */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLASMA_PLAYWRIGHT_PATH || 'playwright');
const moduleRoot = path.resolve(__dirname, '..');

async function main() {
  const launch = { headless: true };
  if (process.env.PLASMA_CHROMIUM_PATH) launch.executablePath = process.env.PLASMA_CHROMIUM_PATH;
  const browser = await chromium.launch(launch);
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => route.fulfill({ status: 200, body: '<!doctype html><html></html>', contentType: 'text/html' }));
    await page.goto('https://shop.example/sub/');
    const template = fs.readFileSync(path.join(moduleRoot, 'views/templates/hook/plasmacutting_modal.tpl'), 'utf8')
      .replace(/\{l s='([^']*)' mod='msthemeconfig'\}/g, (_, value) => value);
    await page.setContent('<!doctype html><html lang="en"><body><button class="js-plasma-open" data-product-id="7" data-product-attribute-id="3">Open</button>' + template + '</body></html>');
    await page.addStyleTag({ path: path.resolve(moduleRoot, '../../theme/modernesmid/assets/css/theme-core-bundled.css') });
    await page.addStyleTag({ path: path.join(moduleRoot, 'views/css/plasmacutting.css') });
    await page.addScriptTag({ path: process.env.PLASMA_JQUERY_PATH || path.resolve(moduleRoot, '../../theme/modernesmid/_dev/node_modules/jquery/dist/jquery.js') });
    await page.addScriptTag({ path: path.join(moduleRoot, 'views/js/fabric5.js') });
    await page.evaluate(() => {
      $.fn.modal = function (action) { this.css('display', action === 'show' ? 'block' : 'none').toggleClass('show', action === 'show'); this.trigger(action === 'show' ? 'shown.bs.modal' : 'hidden.bs.modal'); return this; };
      window.msPlasma = { url: '/sub/plasma', token: 'fixture-token' };
      window.prestashop = { events: [], emit(type, data) { this.events.push({ type, data }); } };
      window.requests = [];
      window.fetch = (url, options) => new Promise((resolve, reject) => requests.push({ url, options, resolve: result => resolve({ json: () => Promise.resolve(result) }), reject }));
    });
    await page.addScriptTag({ path: path.join(moduleRoot, 'views/js/plasmacutting.js') });
    const result = await page.evaluate(async () => {
      await new Promise(resolve => $(resolve));
      const flush = () => new Promise(resolve => setTimeout(resolve, 40));
      let checks = 0;
      const check = (condition, description) => { checks++; if (!condition) throw new Error(description); };
      const el = name => document.getElementById('plasma-' + name);
      const good = (id, enabled = [0, 1], x = 0, y = 0, quantity = 1) => ({
        success: true, quote_id: id,
        metrics: {
          success: true, total_length_mm: enabled.reduce((sum, id) => sum + (id ? 200 : 1200), 0), total_pierces: enabled.length,
          part_width_mm: enabled.includes(0) ? 200 : 40, part_height_mm: enabled.includes(0) ? 400 : 20,
          diagnostics: { is_safe_to_cut: enabled.length > 0, open_loops_count: 0, duplicate_lines_stripped_count: 1 },
          contours: [0, 1].map(number => ({ id: number, enabled: enabled.includes(number), closed: true, length_mm: number ? 200 : 1200 })),
          placement: { offset_x_mm: x, offset_y_mm: y, design_width_mm: 400, design_height_mm: 200 }
        },
        preview_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1000mm" height="500mm" viewBox="-5 -5 1010 510"><rect x="0" y="0" width="1000" height="500" fill="#f5f5f5" stroke="#9ca3af"/><g fill="none" stroke-width="1" transform="translate(' + x + ' ' + (-y) + ')">' +
          [0, 1].map(number => '<path data-contour-id="' + number + '" data-cut-enabled="' + (enabled.includes(number) ? 1 : 0) + '" stroke="' + (enabled.includes(number) ? '#111827' : '#9ca3af') + '" d="' + (number ? 'M20 480 L60 480 L60 460 L20 460 Z' : 'M0 500 L400 500 L400 300 L0 300 Z') + '"/>').join('') + '</g></svg>',
        preview_rotation_degrees: 90,
        quote: { rotation_degrees: 90, formatted_total: quantity === 1 ? 'EUR 25.00' : 'EUR 24.00', quantity, tax_included: quantity === 1 }
      });

      $('.js-plasma-open').trigger('click');
      check(el('add').disabled, 'Empty quote blocks ordering.');
      el('library-tab').click();
      check(requests[0].options.body.get('token') === 'fixture-token', 'Library uses the generated endpoint and CSRF token.');
      requests[0].resolve({ success: true, parts: [{ id_cutfile: 1, display_name: 'Bracket', category: 'Hardware' }, { id_cutfile: 2, display_name: 'Flange', category: 'Hardware' }] }); await flush();
      el('library-results').querySelector('button').click();
      el('library-results').querySelectorAll('button')[1].click();
      check(requests[1].options.signal.aborted, 'Selecting another drawing aborts the earlier request.');
      requests[2].resolve(good('latest')); await flush();
      requests[1].resolve(Object.assign(good('old'), { quote: { formatted_total: 'WRONG' } })); await flush();
      check(el('total').textContent === 'EUR 25.00' && !el('add').disabled, 'Stale responses cannot overwrite the active quote.');
      const canvas = el('preview').canvasObject;
      let paths = canvas.getObjects().filter(object => object.plasmaCutline);
      check(fabric.version === '6.7.1' && paths.length === 2, 'Use the project Fabric build and individual contour objects.');
      check(paths.every(object => object.selectable && !object.lockMovementX && !object.lockMovementY && object.lockScalingX && object.lockScalingY && object.lockRotation && !object.hasControls), 'Contours allow complete-design translation but no scale or rotation.');
      check(canvas.getObjects()[0].selectable === false, 'The physical sheet border is excluded from cut selection.');
      canvas.setActiveObject(paths[0]);
      canvas.upperCanvasEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      check(canvas.getActiveObject() === paths[1] && el('selected-line').textContent === '2', 'Keyboard selection identifies individual cut lines.');
      el('contours').querySelector('input').click();
      check(el('add').disabled && !el('apply').disabled && paths[0].stroke === '#9ca3af', 'Deselecting a contour updates the draft and invalidates checkout.');
      el('apply').click();
      check(requests[3].options.body.get('action') === 'configure' && requests[3].options.body.get('enabled_contours') === '[1]', 'Recalculation sends only selected contour IDs.');
      requests[3].resolve(good('selection-quote', [1])); await flush();
      check(!el('add').disabled && el('apply').disabled, 'The server returns an orderable new quote for the selection.');

      paths = canvas.getObjects().filter(object => object.plasmaCutline);
      const initial = paths.map(object => ({ left: object.left, top: object.top }));
      canvas.fire('mouse:down', { target: paths[1] });
      paths[1].set({ left: paths[1].left + 50, top: paths[1].top - 25 });
      canvas.fire('object:moving', { target: paths[1] });
      canvas.fire('object:modified', { target: paths[1], transform: { action: 'drag' } });
      check(paths.every((object, index) => Math.abs(object.left - initial[index].left - 50) < 0.001 && Math.abs(object.top - initial[index].top + 25) < 0.001), 'Dragging one contour translates every contour, including disabled contours.');
      check(el('offset-x').value === '50' && el('offset-y').value === '25' && el('add').disabled, 'Drag coordinates use the sheet lower-left origin and invalidate price.');
      el('apply').click();
      check(requests[4].options.body.get('quote_id') === 'selection-quote' && requests[4].options.body.get('offset_x_mm') === '50', 'Placement edits bind to the current server quote.');
      requests[4].resolve(good('position-quote', [1], 50, 25)); await flush();
      el('quantity').value = '2'; el('quantity').dispatchEvent(new Event('input'));
      check(el('add').disabled && requests[5].options.body.get('quantity') === '2', 'Quantity changes require an authoritative price update.');
      requests[5].resolve(good('position-quote', [1], 50, 25, 2)); await flush();
      check(!el('add').disabled && !el('tax-excluded').hidden, 'Quantity discount and tax mode match the server quote.');

      el('offset-x').value = '700'; el('offset-x').dispatchEvent(new Event('input')); el('apply').click();
      check(requests.length === 6 && el('add').disabled && !el('error').hidden, 'Out-of-bounds placement cannot be ordered or submitted.');
      el('offset-x').value = '100'; el('offset-x').dispatchEvent(new Event('input')); el('apply').click();
      requests[6].resolve({ success: false, error_message: 'Please retry this placement.' }); await flush();
      check(!el('apply').disabled && !el('editor').hidden && el('add').disabled, 'A failed recalculation preserves the editable draft for retry.');
      el('apply').click(); requests[7].resolve(good('final-quote', [1], 100, 25, 2)); await flush();
      el('add').click(); el('add').click();
      check(requests.length === 9 && requests[8].options.body.get('quote_id') === 'final-quote', 'Double clicking submits the final configured quote once.');
      requests[8].resolve({ success: true, id_product: 7, id_product_attribute: 3, id_customization: 9, cart_url: '/sub/cart' }); await flush();
      check(prestashop.events.length === 1 && prestashop.events[0].type === 'updateCart' && el('add').disabled && el('editor').hidden, 'Cart updates once and consumed quotes cannot be edited or ordered twice.');
      window.plasmaReviewQuote = good('review-quote', [1], 100, 25, 2);
      return { checks, fabric: fabric.version };
    });
    if (process.env.PLASMA_SCREENSHOT_PATH) {
      await page.setViewportSize({ width: 1100, height: 1700 });
      await page.evaluate(() => {
        document.querySelector('#plasma-library-results button').click();
        requests[requests.length - 1].resolve(window.plasmaReviewQuote);
      });
      await page.waitForFunction(() => !document.getElementById('plasma-editor').hidden && !document.getElementById('plasma-add').disabled);
      await page.locator('#plasma-modal .modal-content').screenshot({ path: process.env.PLASMA_SCREENSHOT_PATH });
    }
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForFunction(() => document.querySelector('#plasma-sheet canvas').getBoundingClientRect().width <= window.innerWidth);
    const width = await page.locator('#plasma-sheet canvas').first().evaluate(canvas => canvas.getBoundingClientRect().width);
    if (width > 375 || width <= 0) throw new Error('Canvas must fit the mobile viewport.');
    if (errors.length) throw new Error(errors.join('\n'));
    console.log('PASS: ' + result.checks + ' plasma UI checks, responsive canvas, Fabric ' + result.fabric + ', no page errors.');
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
