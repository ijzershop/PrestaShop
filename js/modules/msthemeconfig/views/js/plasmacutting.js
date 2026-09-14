(function ($) {
  'use strict';

  $(function () {
    const modal = document.getElementById('plasma-modal');
    if (!modal) {
      return;
    }

    const $modal = $(modal);
    const el = function (name) { return document.getElementById('plasma-' + name); };
    const message = function (name) { return modal.getAttribute('data-' + name) || modal.getAttribute('data-error'); };
    const state = {
      session: 0,
      revision: 0,
      productId: 0,
      attributeId: 0,
      quoteId: null,
      referenceQuoteId: null,
      quotedQuantity: 1,
      safe: false,
      busy: false,
      adding: false,
      source: 'upload',
      library: null,
      librarySearch: null,
      libraryRevision: 0,
      libraryTimer: null,
      libraryId: null,
      controllers: {},
      canvas: null,
      rendering: false,
      editQuoteId: null,
      editDirty: false,
      contours: [],
      placement: null,
      previewPlacement: { x: 0, y: 0 },
      drag: null,
      opener: null
    };

    function showError(text) {
      el('error').textContent = text || '';
      el('error').hidden = !text;
    }

    function quantity() {
      const value = Number(el('quantity').value);
      return Number.isInteger(value) && value >= 1 && value <= 100 ? value : null;
    }

    function updateAddButton() {
      el('add').disabled = state.busy || state.adding || !state.safe || !state.quoteId || quantity() === null || quantity() !== state.quotedQuantity;
      el('quantity').disabled = state.adding;
      el('drawing').disabled = state.adding;
      el('library-search').disabled = state.adding;
      el('apply').disabled = state.busy || state.adding || !state.editQuoteId || !state.editDirty;
      modal.querySelectorAll('#plasma-editor input').forEach(function (input) { input.disabled = state.busy || state.adding; });
      if (state.canvas) {
        state.canvas.skipTargetFind = state.busy || state.adding;
      }
      modal.querySelectorAll('[data-plasma-tab], .plasma-library-part').forEach(function (button) {
        button.disabled = state.adding;
      });
      modal.setAttribute('aria-busy', state.busy || state.adding ? 'true' : 'false');
    }

    function releasePreview() {
      if (state.canvas) {
        state.rendering = true;
        state.canvas.clear();
        state.rendering = false;
      }
      el('selection').hidden = true;
    }

    function abort(channel) {
      if (state.controllers[channel]) {
        state.controllers[channel].abort();
        delete state.controllers[channel];
      }
    }

    function clearQuote(preserveEditor) {
      state.revision += 1;
      abort('geometry');
      state.quoteId = null;
      state.referenceQuoteId = null;
      state.safe = false;
      state.busy = false;
      state.libraryId = null;
      if (!preserveEditor) {
        releasePreview();
        state.editQuoteId = null;
        state.editDirty = false;
        state.contours = [];
        state.placement = null;
        state.drag = null;
        el('editor').hidden = true;
        el('visualizer').hidden = true;
        el('edit-notice').hidden = true;
      }
      ['quote', 'open-warning', 'optimized', 'rotated', 'cart', 'tax-included', 'tax-excluded'].forEach(function (name) {
        el(name).hidden = true;
      });
      el('length').textContent = '—';
      el('pierces').textContent = '—';
      el('dimensions').textContent = '—';
      el('total').textContent = '';
      el('status').textContent = '';
      showError('');
      updateAddButton();
    }

    function request(action, values, channel) {
      const config = window.msPlasma;
      if (!config || !config.url || !config.token) {
        return Promise.reject(new Error(message('unavailable')));
      }
      let endpoint;
      try {
        endpoint = new URL(config.url, window.location.href);
      } catch (error) {
        return Promise.reject(new Error(message('unavailable')));
      }
      if (endpoint.origin !== window.location.origin) {
        return Promise.reject(new Error(message('unavailable')));
      }
      const body = new FormData();
      body.append('ajax', '1');
      body.append('action', action);
      body.append('token', config.token);
      body.append('id_product', String(state.productId));
      body.append('id_product_attribute', String(state.attributeId));
      Object.keys(values || {}).forEach(function (key) { body.append(key, values[key]); });
      abort(channel);
      const controller = new AbortController();
      state.controllers[channel] = controller;
      return fetch(endpoint.href, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { Accept: 'application/json' },
        body: body,
        signal: controller.signal
      }).then(function (response) {
        return response.json().then(function (result) {
          if (!result || typeof result.success !== 'boolean') {
            throw new Error(message('error'));
          }
          return result;
        });
      }).catch(function (error) {
        if (error.name === 'AbortError') {
          throw error;
        }
        // Unexpected transport responses can contain HTML or infrastructure details.
        throw new Error(message('error'));
      }).finally(function () {
        if (state.controllers[channel] === controller) {
          delete state.controllers[channel];
        }
      });
    }

    function number(value) {
      return Number(value).toLocaleString(document.documentElement.lang || 'nl-NL', { maximumFractionDigits: 2 });
    }

    function invalidateDrawing() {
      if (state.rendering) {
        return;
      }
      state.revision += 1;
      abort('geometry');
      state.quoteId = null;
      state.referenceQuoteId = null;
      state.safe = false;
      state.busy = false;
      el('quote').hidden = true;
      el('status').textContent = '';
      showError(message('drawing-changed'));
      updateAddButton();
    }

    function markDraftDirty() {
      state.revision += 1;
      abort('geometry');
      state.quoteId = null;
      state.referenceQuoteId = null;
      state.safe = false;
      state.editDirty = true;
      el('quote').hidden = true;
      el('edit-notice').hidden = false;
      el('status').textContent = '';
      showError('');
      updateAddButton();
    }

    function draftPosition() {
      const x = Number(el('offset-x').value);
      const y = Number(el('offset-y').value);
      if (!state.placement || el('offset-x').value === '' || el('offset-y').value === '' || !Number.isFinite(x) || !Number.isFinite(y)
        || x < 0 || y < 0 || x + Number(state.placement.design_width_mm) > 1000.000001 || y + Number(state.placement.design_height_mm) > 500.000001) {
        return null;
      }
      return { x: x, y: y };
    }

    function shiftDesign(position) {
      if (state.canvas) {
        const dx = position.x - state.previewPlacement.x;
        const dy = position.y - state.previewPlacement.y;
        state.canvas.getObjects().filter(function (object) { return object.plasmaCutline; }).forEach(function (object) {
          object.set({ left: object.left + dx, top: object.top - dy });
          object.setCoords();
        });
        state.canvas.requestRenderAll();
      }
      state.previewPlacement = position;
    }

    function renderEditor(metrics, quoteId) {
      if (!quoteId || !Array.isArray(metrics.contours) || !metrics.placement) {
        return;
      }
      state.editQuoteId = quoteId;
      state.editDirty = false;
      state.contours = metrics.contours.map(function (contour) { return Object.assign({}, contour); });
      state.placement = metrics.placement;
      state.previewPlacement = { x: Number(metrics.placement.offset_x_mm) || 0, y: Number(metrics.placement.offset_y_mm) || 0 };
      el('offset-x').value = state.previewPlacement.x;
      el('offset-y').value = state.previewPlacement.y;
      el('offset-x').max = Math.max(0, 1000 - Number(metrics.placement.design_width_mm));
      el('offset-y').max = Math.max(0, 500 - Number(metrics.placement.design_height_mm));
      el('contours').replaceChildren();
      state.contours.forEach(function (contour, index) {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = contour.enabled === true;
        checkbox.setAttribute('data-contour-id', String(contour.id));
        const text = document.createElement('span');
        text.textContent = message('contour-label') + ' ' + (index + 1) + ' · ' + number(contour.length_mm) + ' mm';
        label.appendChild(checkbox);
        label.appendChild(text);
        checkbox.addEventListener('change', function () {
          contour.enabled = checkbox.checked;
          if (state.canvas) {
            state.canvas.getObjects().filter(function (object) { return object.plasmaContourId === String(contour.id); }).forEach(function (object) {
              object.set({ stroke: contour.enabled ? (contour.closed ? '#111827' : '#ff0000') : '#9ca3af', opacity: contour.enabled ? 1 : 0.45 });
            });
            state.canvas.requestRenderAll();
          }
          markDraftDirty();
        });
        el('contours').appendChild(label);
      });
      el('editor').hidden = false;
      el('edit-notice').hidden = true;
    }

    function resizePreview() {
      if (!state.canvas || el('visualizer').hidden) {
        return;
      }
      const width = el('sheet').clientWidth || 700;
      const zoom = width / 1010;
      state.canvas.setDimensions({ width: width, height: 510 * zoom });
      state.canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
      state.canvas.requestRenderAll();
    }

    function ensureCanvas() {
      if (state.canvas) {
        return state.canvas;
      }
      if (!window.fabric || !window.fabric.Canvas || !window.fabric.loadSVGFromString) {
        throw new Error(message('unavailable'));
      }
      state.canvas = new window.fabric.Canvas(el('preview'), {
        isDrawingMode: false,
        selection: false,
        preserveObjectStacking: true,
        renderOnAddRemove: false,
        hoverCursor: 'pointer',
        targetFindTolerance: 5
      });
      el('preview').canvasObject = state.canvas;
      const select = function () {
        const object = state.canvas.getActiveObject();
        el('selected-line').textContent = object && object.plasmaCutline ? String(object.plasmaLineNumber) : '';
        el('selection').hidden = !(object && object.plasmaCutline);
      };
      state.canvas.on('selection:created', select);
      state.canvas.on('selection:updated', select);
      state.canvas.on('selection:cleared', select);
      state.canvas.on('mouse:down', function (event) {
        state.drag = event.target && event.target.plasmaCutline && state.placement ? {
          target: event.target,
          left: event.target.left,
          top: event.target.top,
          x: state.previewPlacement.x,
          y: state.previewPlacement.y,
          objects: state.canvas.getObjects().filter(function (object) { return object.plasmaCutline; }).map(function (object) {
            return { object: object, left: object.left, top: object.top };
          })
        } : null;
      });
      state.canvas.on('object:moving', function (event) {
        const drag = state.drag;
        if (!drag || event.target !== drag.target || state.busy || state.adding) {
          return;
        }
        const maxX = Math.max(0, 1000 - Number(state.placement.design_width_mm));
        const maxY = Math.max(0, 500 - Number(state.placement.design_height_mm));
        const x = Math.max(0, Math.min(maxX, drag.x + event.target.left - drag.left));
        const y = Math.max(0, Math.min(maxY, drag.y - event.target.top + drag.top));
        drag.objects.forEach(function (item) {
          item.object.set({ left: item.left + x - drag.x, top: item.top - y + drag.y });
          item.object.setCoords();
        });
        state.previewPlacement = { x: x, y: y };
        el('offset-x').value = Number(x.toFixed(3));
        el('offset-y').value = Number(y.toFixed(3));
        if (!state.editDirty) {
          markDraftDirty();
        }
      });
      state.canvas.on('object:modified', function (event) {
        if (state.drag && event.target === state.drag.target && (!event.transform || event.transform.action === 'drag')) {
          markDraftDirty();
          state.drag = null;
        } else {
          invalidateDrawing();
        }
      });
      state.canvas.on('path:created', invalidateDrawing);
      const upper = state.canvas.upperCanvasEl;
      upper.tabIndex = 0;
      upper.setAttribute('aria-label', el('preview').getAttribute('aria-label'));
      upper.setAttribute('aria-describedby', 'plasma-preview-help');
      upper.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
          state.canvas.discardActiveObject();
          state.canvas.requestRenderAll();
          event.stopPropagation();
        } else if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(event.key) !== -1) {
          event.preventDefault();
          const paths = state.canvas.getObjects().filter(function (object) { return object.plasmaCutline; });
          if (paths.length) {
            const direction = ['ArrowLeft', 'ArrowUp'].indexOf(event.key) !== -1 ? -1 : 1;
            const index = paths.indexOf(state.canvas.getActiveObject());
            state.canvas.setActiveObject(paths[(index + direction + paths.length) % paths.length]);
            state.canvas.requestRenderAll();
          }
        }
      });
      return state.canvas;
    }

    function renderPreview(svg, session, revision) {
      releasePreview();
      if (typeof svg !== 'string' || !svg || /<!DOCTYPE|<!ENTITY/i.test(svg)) {
        return Promise.resolve(false);
      }
      const documentSvg = new DOMParser().parseFromString(svg, 'image/svg+xml');
      if (documentSvg.querySelector('parsererror') || documentSvg.documentElement.localName !== 'svg') {
        return Promise.resolve(false);
      }
      // Only server-generated primitives enter Fabric; external references and active SVG are rejected.
      const allowedElements = ['svg', 'g', 'path', 'line', 'polyline', 'polygon', 'circle', 'ellipse', 'rect', 'title', 'desc'];
      const unsafe = Array.from(documentSvg.querySelectorAll('*')).some(function (node) {
        return allowedElements.indexOf(node.localName) < 0 || Array.from(node.attributes).some(function (attribute) {
          return /^on/i.test(attribute.name) || /href$/i.test(attribute.name) || /url\s*\(/i.test(attribute.value);
        });
      });
      if (unsafe) {
        return Promise.resolve(false);
      }
      // Preserve the processor's full-sheet viewBox and rotation, using its millimetres as canvas units.
      documentSvg.documentElement.setAttribute('width', '1010');
      documentSvg.documentElement.setAttribute('height', '510');
      const canvas = ensureCanvas();
      let lineNumber = 0;
      return window.fabric.loadSVGFromString(new XMLSerializer().serializeToString(documentSvg), function (element, object) {
        const isCutline = element.localName === 'path';
        object.set({
          selectable: isCutline,
          evented: isCutline,
          hasControls: false,
          lockMovementX: !state.placement,
          lockMovementY: !state.placement,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
          lockSkewingX: true,
          lockSkewingY: true,
          strokeUniform: true,
          perPixelTargetFind: isCutline,
          borderColor: '#218838',
          objectCaching: false
        });
        object.plasmaCutline = isCutline;
        object.plasmaContourId = element.getAttribute('data-contour-id');
        object.plasmaLineNumber = isCutline ? ++lineNumber : null;
      }).then(function (parsed) {
        if (session !== state.session || revision !== state.revision) {
          return false;
        }
        state.rendering = true;
        canvas.clear();
        (parsed.objects || []).filter(Boolean).forEach(function (object) { canvas.add(object); });
        state.rendering = false;
        resizePreview();
        return lineNumber > 0;
      });
    }

    async function renderResult(result, session, revision) {
      const metrics = result.metrics;
      const quote = result.quote;
      const rotation = quote && Number(quote.rotation_degrees) === 90 ? 90 : 0;
      if (metrics && Number.isFinite(Number(metrics.part_width_mm)) && Number.isFinite(Number(metrics.part_height_mm))) {
        const diagnostics = metrics.diagnostics || {};
        el('length').textContent = number(metrics.total_length_mm);
        el('pierces').textContent = number(metrics.total_pierces);
        el('dimensions').textContent = number(metrics.part_width_mm) + ' × ' + number(metrics.part_height_mm);
        el('open-warning').hidden = !(Number(diagnostics.open_loops_count) > 0);
        el('optimized').hidden = !(Number(diagnostics.duplicate_lines_stripped_count) > 0);
        el('rotated').hidden = rotation !== 90;
        el('visualizer').hidden = false;
        renderEditor(metrics, result.quote_id);
        const previewReady = await renderPreview(result.preview_svg, session, revision);
        if (session !== state.session || revision !== state.revision) {
          return;
        }
        state.safe = previewReady && metrics.success === true && diagnostics.is_safe_to_cut === true && Number(diagnostics.open_loops_count) === 0;
      }
      if (result.success && state.safe && quote && result.quote_id && typeof quote.formatted_total === 'string') {
        state.quoteId = result.quote_id;
        state.referenceQuoteId = result.quote_id;
        state.quotedQuantity = Number(quote.quantity) || 1;
        el('total').textContent = quote.formatted_total;
        el('tax-included').hidden = quote.tax_included !== true;
        el('tax-excluded').hidden = quote.tax_included !== false;
        el('quote').hidden = false;
        el('status').textContent = message('ready');
      } else {
        state.safe = false;
        state.quoteId = null;
        el('status').textContent = '';
        showError(result.error_message || (metrics && metrics.error_message) || (el('open-warning').hidden ? message('error') : ''));
      }
      updateAddButton();
    }

    function calculate(action, values) {
      if (state.adding) {
        return;
      }
      clearQuote(action === 'configure' || !!values.quote_id);
      const session = state.session;
      const revision = state.revision;
      state.busy = true;
      state.referenceQuoteId = values.quote_id || null;
      state.libraryId = values.library_id || null;
      el('status').textContent = message('loading');
      updateAddButton();
      request(action, values, 'geometry').then(function (result) {
        if (session === state.session && revision === state.revision) {
          return renderResult(result, session, revision);
        }
      }).catch(function (error) {
        if (error.name !== 'AbortError' && session === state.session && revision === state.revision) {
          el('status').textContent = '';
          showError(error.message);
        }
      }).finally(function () {
        if (session === state.session && revision === state.revision) {
          state.busy = false;
          updateAddButton();
          if (state.safe && state.referenceQuoteId && quantity() !== null && quantity() !== state.quotedQuantity) {
            calculate('quote', { quote_id: state.referenceQuoteId, quantity: quantity() });
          }
        }
      });
    }

    function upload(files) {
      if (state.adding) {
        return;
      }
      clearQuote();
      el('filename').textContent = '';
      if (!files || files.length !== 1 || !/\.(dxf|svg)$/i.test(files[0].name)) {
        showError(message('file-error'));
        return;
      }
      if (files[0].size === 0 || files[0].size > 10 * 1024 * 1024) {
        showError(message('file-size-error'));
        return;
      }
      el('filename').textContent = files[0].name;
      calculate('upload', { drawing: files[0] });
    }

    function renderLibrary() {
      const container = el('library-results');
      container.replaceChildren();
      const query = el('library-search').value.trim().toLocaleLowerCase();
      const parts = (state.library || []).filter(function (part) {
        return (String(part.display_name) + ' ' + String(part.category)).toLocaleLowerCase().indexOf(query) !== -1;
      });
      if (!parts.length) {
        const empty = document.createElement('p');
        empty.textContent = message('empty-library');
        container.appendChild(empty);
        return;
      }
      parts.forEach(function (part) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-secondary plasma-library-part';
        button.setAttribute('aria-pressed', String(Number(state.libraryId) === Number(part.id_cutfile)));
        button.disabled = state.adding;
        const name = document.createElement('strong');
        name.textContent = part.display_name;
        const category = document.createElement('small');
        category.textContent = part.category;
        button.appendChild(name);
        button.appendChild(category);
        button.addEventListener('click', function () {
          calculate('quote', { library_id: part.id_cutfile });
          renderLibrary();
        });
        container.appendChild(button);
      });
    }

    function loadLibrary() {
      const search = el('library-search').value.trim();
      if (state.library && state.librarySearch === search) {
        renderLibrary();
        return;
      }
      const session = state.session;
      const revision = ++state.libraryRevision;
      el('library-results').textContent = message('library-loading');
      request('library', { search: search }, 'library').then(function (result) {
        if (session !== state.session || revision !== state.libraryRevision) {
          return;
        }
        if (!result.success || !Array.isArray(result.parts)) {
          throw new Error(result.error_message || message('error'));
        }
        state.library = result.parts;
        state.librarySearch = search;
        renderLibrary();
      }).catch(function (error) {
        if (session === state.session && revision === state.libraryRevision && state.source === 'library' && error.name !== 'AbortError') {
          el('library-results').textContent = '';
          showError(error.message);
        }
      });
    }

    function selectTab(source) {
      if (state.adding) {
        return;
      }
      if (source !== state.source) {
        clearQuote();
        el('drawing').value = '';
        el('filename').textContent = '';
      }
      state.source = source;
      ['upload', 'library'].forEach(function (name) {
        const selected = name === source;
        el(name + '-tab').classList.toggle('active', selected);
        el(name + '-tab').setAttribute('aria-selected', String(selected));
        el(name + '-tab').tabIndex = selected ? 0 : -1;
        el(name + '-panel').hidden = !selected;
      });
      if (source === 'library') {
        loadLibrary();
      }
    }

    $(document).on('click.msPlasma', '.js-plasma-open', function (event) {
      event.preventDefault();
      if (state.adding) {
        return;
      }
      state.session += 1;
      window.clearTimeout(state.libraryTimer);
      abort('library');
      clearQuote();
      state.productId = Number(this.getAttribute('data-product-id'));
      state.attributeId = Number(this.getAttribute('data-product-attribute-id')) || 0;
      state.opener = this;
      state.library = null;
      state.librarySearch = null;
      el('drawing').value = '';
      el('filename').textContent = '';
      el('library-search').value = '';
      el('quantity').value = '1';
      selectTab('upload');
      $modal.modal('show');
    });

    $modal.on('hide.bs.modal', function (event) {
      if (state.adding) {
        event.preventDefault();
      }
    });
    $modal.on('hidden.bs.modal', function () {
      state.session += 1;
      window.clearTimeout(state.libraryTimer);
      abort('library');
      clearQuote();
      if (state.opener && document.contains(state.opener)) {
        state.opener.focus();
      }
    });
    $modal.on('shown.bs.modal', function () { el('upload-tab').focus(); resizePreview(); });
    window.addEventListener('resize', resizePreview);
    modal.addEventListener('plasma:geometry-changed', invalidateDrawing);

    modal.querySelectorAll('[data-plasma-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () { selectTab(tab.getAttribute('data-plasma-tab')); });
      tab.addEventListener('keydown', function (event) {
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(event.key) !== -1) {
          event.preventDefault();
          const next = event.key === 'Home' ? 'upload' : event.key === 'End' ? 'library' : state.source === 'upload' ? 'library' : 'upload';
          selectTab(next);
          el(next + '-tab').focus();
        }
      });
    });

    el('drawing').addEventListener('change', function () {
      upload(this.files);
      this.value = '';
    });
    ['dragenter', 'dragover'].forEach(function (name) {
      el('dropzone').addEventListener(name, function (event) {
        event.preventDefault();
        if (!state.adding) {
          this.classList.add('is-dragging');
        }
      });
    });
    ['dragleave', 'drop'].forEach(function (name) {
      el('dropzone').addEventListener(name, function (event) {
        event.preventDefault();
        this.classList.remove('is-dragging');
      });
    });
    el('dropzone').addEventListener('drop', function (event) { upload(event.dataTransfer.files); });
    el('library-search').addEventListener('input', function () {
      window.clearTimeout(state.libraryTimer);
      renderLibrary();
      state.libraryTimer = window.setTimeout(function () {
        if (state.source === 'library' && !state.adding) {
          loadLibrary();
        }
      }, 200);
    });
    el('quantity').addEventListener('input', function () {
      updateAddButton();
      if (!state.adding && state.referenceQuoteId && quantity() !== null && quantity() !== state.quotedQuantity) {
        calculate('quote', { quote_id: state.referenceQuoteId, quantity: quantity() });
      }
    });
    ['offset-x', 'offset-y'].forEach(function (name) {
      el(name).addEventListener('input', function () {
        if (state.busy || state.adding || !state.editQuoteId) {
          return;
        }
        markDraftDirty();
        const position = draftPosition();
        if (position) {
          shiftDesign(position);
        } else {
          showError(message('position-error'));
        }
      });
    });
    el('apply').addEventListener('click', function () {
      if (state.busy || state.adding || !state.editQuoteId || !state.editDirty) {
        return;
      }
      const position = draftPosition();
      if (!position) {
        showError(message('position-error'));
        return;
      }
      calculate('configure', {
        quote_id: state.editQuoteId,
        enabled_contours: JSON.stringify(state.contours.filter(function (contour) { return contour.enabled; }).map(function (contour) { return contour.id; })),
        offset_x_mm: position.x,
        offset_y_mm: position.y,
        quantity: quantity() || 1
      });
    });

    el('add').addEventListener('click', function () {
      if (state.busy || state.adding || !state.safe || !state.quoteId || quantity() !== state.quotedQuantity) {
        return;
      }
      if (quantity() === null) {
        showError(message('quantity-error'));
        return;
      }
      const session = state.session;
      state.adding = true;
      showError('');
      el('status').textContent = message('adding');
      updateAddButton();
      request('add', { quote_id: state.quoteId, quantity: quantity() }, 'add').then(function (result) {
        if (session !== state.session) {
          return;
        }
        if (!result.success) {
          throw new Error(result.error_message || message('error'));
        }
        state.quoteId = null;
        state.referenceQuoteId = null;
        state.editQuoteId = null;
        el('editor').hidden = true;
        state.safe = false;
        el('status').textContent = message('added');
        if (result.cart_url) {
          const cartUrl = new URL(result.cart_url, window.location.href);
          if (cartUrl.origin === window.location.origin) {
            el('cart').href = cartUrl.href;
            el('cart').hidden = false;
          }
        }
        if (window.prestashop && typeof window.prestashop.emit === 'function') {
          window.prestashop.emit('updateCart', {
            reason: {
              idProduct: result.id_product || state.productId,
              idProductAttribute: result.id_product_attribute || state.attributeId,
              idCustomization: result.id_customization,
              linkAction: 'add-to-cart'
            },
            resp: result
          });
        }
      }).catch(function (error) {
        if (session === state.session) {
          el('status').textContent = '';
          showError(error.message);
        }
      }).finally(function () {
        if (session === state.session) {
          state.adding = false;
          updateAddButton();
        }
      });
    });
  });
})(window.jQuery);
