(function ($) {
  "use strict";
  $(function() {

  function ensureDpModalStyles(assets) {
    if (!assets || !assets.css) {
      return;
    }
    assets.css.forEach(function(href) {
      if (!href) {
        return;
      }
      const selector = 'link[data-dp-modal-css="' + href + '"]';
      if (document.querySelector(selector)) {
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.setAttribute('data-dp-modal-css', href);
      document.head.appendChild(link);
    });
  }

  function ensureDpModalScripts(assets) {
    if (!assets) {
      return;
    }
    const loadScript = function(src, attrs) {
      if (!src) {
        return;
      }
      const selector = 'script[data-dp-modal-js="' + src + '"]';
      if (document.querySelector(selector)) {
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.setAttribute('data-dp-modal-js', src);
      if (attrs && attrs.type) {
        script.type = attrs.type;
      }
      document.body.appendChild(script);
    };

    (assets.js || []).forEach(function(src) {
      loadScript(src);
    });
    (assets.modules || []).forEach(function(src) {
      loadScript(src, { type: 'module' });
    });
  }

  function loadDpModalEntry(entryUrl) {
    if (!entryUrl) {
      return;
    }
    const existing = document.querySelector('script[data-dp-modal-entry="1"]');
    if (existing) {
      existing.remove();
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = entryUrl + '?v=' + Date.now();
    script.setAttribute('data-dp-modal-entry', '1');
    document.body.appendChild(script);
  }

  $(document).on('click', '.dynamicproduct-button', function(event) {
    event.stopImmediatePropagation();
    const productId = $(this).data('product-id');
    if (!productId || !window.dynamicProductModalUrl) {
      return;
    }
    const modal = $('#dynamicproduct-modal');
    modal.html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
    $.ajax({
      url: window.dynamicProductModalUrl,
      type: 'GET',
      dataType: 'json',
      data: {
        action: 'loadModal',
        id_product: productId
      },
      success: function(response) {
        if (!response || !response.ok) {
          modal.html('<div class="modal-dialog"><div class="modal-content"><div class="modal-body">Dynamic product form kon niet worden geladen.</div></div></div>');
          modal.modal('show');
          return;
        }

        modal.html(response.html).modal('show');

        window.dp = window.dp || {};
        window.dp.selectors = Object.assign(
          {
            price: '#dynamicproduct-modal #subtotal_incl_pre .subtotal-inc-price',
            regular_price: '#dynamicproduct-modal .regular-price',
            qty_input: '#quantity_wanted',
            form: '#dp-modal-form'
          },
          window.dp.selectors || {}
        );
        window.dp.hook = function(container) {
          const hook = document.querySelector('#dynamicproduct-modal .dp-modal-hook');
          if (hook) {
            hook.prepend(container);
          }
        };
        window.dp.preview_hook = function(container) {
          const preview = document.querySelector('#dynamicproduct-modal .images-container');
          if (preview) {
            preview.prepend(container);
          }
        };

        window.dp_vars = response.dp_vars || {};
        if (response.user_js_defs) {
          Object.keys(response.user_js_defs).forEach(function(key) {
            window[key] = response.user_js_defs[key];
          });
        }

        ensureDpModalStyles(response.assets);
        ensureDpModalScripts(response.assets);
        loadDpModalEntry(response.assets ? response.assets.entry : null);
      },
      error: function() {
        modal.html('<div class="modal-dialog"><div class="modal-content"><div class="modal-body">Dynamic product form kon niet worden geladen.</div></div></div>');
        modal.modal('show');
      }
    });
  });


  function getMoneyString(price) {
    const formatter = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return formatter.format(price);
  }


  $(document).on('change input', '#dynamicproductform .dp-entry, #dynamicproductform #quantity_wanted, .dynamicproductform .dp-entry, .dynamicproductform #quantity_wanted, #dp-modal-form .dp-entry, #dp-modal-form #quantity_wanted, [id^="dp-field-"], #dp-container [id^="dp-field-"], #add-to-cart-or-refresh .dp-entry, #add-to-cart-or-refresh #quantity_wanted', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let elem = $(this);
    let value = Number(elem.val());
    let max = Number(elem.attr('max'));
    let min = Number(elem.attr('min'));

    if(event.type === 'change' && value.toString().length >= 2) {
      if (min !== undefined && Number(value) < Number(min)) {
        elem.val(Number(min));
      }
      if (max !== undefined && Number(value) > Number(max)) {
        elem.val(Number(max));
      }
    }
    _updateFormValuesProduct($(this));
  });

  // Support Svelte slider repeat-click (mousedown-hold on +/- buttons) when present
  (function(){
    let waitTimer = null;
    let repeatTimer = null;
    let isTicking = false;
    let lastEventTime = 0;

    function clearTimers(){
      if (waitTimer) { clearTimeout(waitTimer); waitTimer = null; }
      if (repeatTimer) { clearInterval(repeatTimer); repeatTimer = null; }
      isTicking = false;
    }

    function startRepeat($btn){
      if (isTicking) return;
      isTicking = true;

      // Find the closest slider container, otherwise fallback to parent
      const $container = $btn.closest('.dp\\:slider').length ? $btn.closest('.dp\\:slider') : $btn.parent();
      // Prefer the range input in the same slider, fallback to number input
      const $input = $container.find('input[type="range"], input[type="number"]').first();

      const tick = function(){
        if ($input && $input.length) {
          _updateFormValuesProduct($input);
        }
      };

      // Trigger once immediately
      tick();

      // After a short delay start ticking if still down
      waitTimer = setTimeout(function(){
        repeatTimer = setInterval(tick, 100);
      }, 500);
    }

    // Start repeat on mousedown / pointerdown on slider +/- buttons
    $(document).on('mousedown pointerdown touchstart', '.dp\\:slider button', function(event){
      const now = Date.now();
      // Simple debounce/deduplication for mixed touch/mouse events
      if (now - lastEventTime < 100) return;
      lastEventTime = now;

      event.stopImmediatePropagation();
      startRepeat($(this));
    });

    // Stop when mouse/pointer is released or leaves the document
    $(document).on('mouseup pointerup touchend mouseleave blur', function(){
      clearTimers();
    });
  })();
  // Intercept all add-to-cart triggers inside the Dynamic Product modal (buttons and links)
  $(document).on('click', '#dynamicproduct-modal #dynamicproductform .addToCart, #dynamicproduct-modal [data-button-action="add-to-cart"], #dynamicproduct-modal .addToCartProductView, #dynamicproductform .addToCartProductView, .dynamicproductform .addToCartProductView, #dp-modal-form [data-button-action="add-to-cart"], #dp-modal-form .addToCartProductView, #add-to-cart-or-refresh [data-button-action="add-to-cart"]', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    _setCustomizationProductList();
  });

  // Also guard against direct form submission inside the modal
  $(document).on('submit', '#dynamicproduct-modal #dynamicproductform, #dynamicproductform, .dynamicproductform, #add-to-cart-or-refresh', function(event) {
    if ($(this).closest('#dynamicproduct-modal').length || $(this).hasClass('dynamicproductform') || $(this).attr('id') === 'dynamicproductform' || $(this).attr('id') === 'add-to-cart-or-refresh') {
        event.preventDefault();
        event.stopImmediatePropagation();
        _setCustomizationProductList();
    }
  });

  // Fallback: prevent anchors pointing to the cart from redirecting when inside the modal
  $(document).on('click', '#dynamicproduct-modal a[href*="controller=cart"]', function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    _setCustomizationProductList();
  });

  function _applyCalculationResults(e, $modalBody) {



      if (!e || e.error) {
          if (e && e.error && $modalBody) {
              _showDynamicProductErrors(e);
          }
          return;
      }



      if (!(e.success || (e.final_prices && e.formatted_prices))) {
          return;
      }

      // Normalize helpers
      const fp = e.formatted_prices || {};
      const cp = e.customization_prices || {};
      const fup = e.formatted_unit_prices || e.formatted_unit_prices || e.formatted_unit_prices || {}; // unit prices (formatted)
      const up = e.unit_prices || {};
      // Read VAT setting from the toggle input in header
      const vatToggleChecked = $('.vat_toggler').first().prop('checked');
      const useTax = (typeof vatToggleChecked !== 'undefined') ? vatToggleChecked : ((typeof e.use_tax !== 'undefined') ? !!e.use_tax : true);
    console.log([useTax, e]);
      // Weight update (if present)
      if (typeof e.weight !== 'undefined') {
        let weight = Number(e.weight);
        if (!isNaN(weight)) {
          $('.dp-weight').text(weight.toFixed(2));
        }
      }

      // Map values to modernesmid product-add-to-cart-dynamic.tpl elements
      // Left (Prijs per stuk)
      if (useTax) {
        $('#product_price_pre span.subtotal-inc-price').text(fup.price_ttc || fp.price_ttc || '€ 0,00');
        // Total (incl. btw)
        $('#subtotal_incl_pre span.subtotal-inc-price').text(fp.price_ttc || fup.price_ttc || '€ 0,00');
      } else {
        $('#product_price_pre span.subtotal-inc-price').text(fup.price_ht || fp.price_ht || '€ 0,00');
        $('#subtotal_incl_pre span.subtotal-inc-price').text(fp.price_ht || fup.price_ht || '€ 0,00');
      }

      // Detailed table inside #price-specification
      // Prijs per stuk (first row)
      $('#product_price span.subtotal-inc-price').text(
        useTax ? (fup.price_ttc || '€ 0,00') : (fup.price_ht || '€ 0,00')
      );
      // Prijs per stuk (excl. BTW)
      // $('#total_product_price_excl span.subtotal-inc-price').text(fup.price_ht || '€ 0,00');
      $('#total_customization_price_excl span.subtotal-inc-price').text(renderMoneyString(cp.price_ht) || '€ 0,00');
      // BTW (21%) — per unit
      (function() {
        let tax = 0;
        if (typeof up.price_ttc !== 'undefined' && typeof up.price_ht !== 'undefined') {
          tax = Number(up.price_ttc) - Number(up.price_ht);
        }
        // fallback if unit not present but final exists
        if (!tax && e.final_prices && typeof e.final_prices.price_ttc !== 'undefined' && typeof e.final_prices.price_ht !== 'undefined') {
          tax = Number(e.final_prices.price_ttc) - Number(e.final_prices.price_ht);
        }
        $('#total_tax span.subtotal-inc-price').text(getMoneyString(isNaN(tax) ? 0 : tax));
      })();
      // Prijs per stuk (incl. BTW)
      $('#total_product_price_incl span.subtotal-inc-price').text(useTax ? (fup.price_ttc || '€ 0,00') : (fup.price_ht || '€ 0,00'));
      $('.product-prices .product-price .current-price span.inclusive-price').text(useTax ? (fp.price_ttc || '€ 0,00') : (fp.price_ht || '€ 0,00'));

      // Insert chosen values (and option price if available) between EXCL and TAX rows
//       (function renderChosen() {
//         const $table = $('#price-specification-table');
//         if (!$table.length) { return; }
//         // cleanup old rows
//         $table.find('tr.dp-chosen-row').remove();
//
//         const inputFields = e.input_fields || {};
//         const keys = Object.keys(inputFields || {});
//         const exclude = { quantity:1, product_price:1, product_weight:1, changed:1 };
//         const afterRow = $table.find('#total_product_price_excl').closest('tr');
//
//         const rows = [];
//         let shownFields = [];
//         keys.forEach(function(k) {
//           const f = inputFields[k];
//           if (!f || exclude[f.name]) { return; }
//           if (typeof f.visible !== 'undefined' && !f.visible) { return; }
//           // Skip internal/technical types (0)
//           if (typeof f.type !== 'undefined' && Number(f.type) === 0) { return; }
//
//           const label = (f.label || f.name || '').toString();
// console.log(e);
//           if(shownFields.includes(label)) {
//             return;
//           }
//           let valueText = '';
//           if(f.selected_options.length > 0){
//             valueText = (f.display_value || f.value_formatted || '').toString();
//           } else {
//             valueText = (f.value_formatted || f.value || '').toString();
//           }
//
//
//           // Try to resolve option price (formatted)
//           let priceText = '';
//           try {
//             if (Array.isArray(f.selected_options) && f.options) {
//               const optId = f.selected_options[0];
//               const opt = f.options[optId];
//               if (opt) {
//                 // common fields in our data dumps
//                 priceText = opt.displayed_value || opt.price_formatted || '';
//               }
//             }
//             if (!priceText && f.value_price_formatted) {
//               priceText = f.value_price_formatted;
//             }
//           } catch (err) {}
//
//           const $row = $('<tr class="dp-chosen-row"></tr>');
//           const $tdLabel = $('<td></td>').text(label);
//           const $tdVal = $('<td class="price-td"></td>');
//           const $div = $('<div class="price product-price excl"></div>');
//           const $span = $('<span class="subtotal-inc-price"></span>');
//           let combined = valueText;
//           if (priceText) {
//             combined += ' (' + priceText + ')';
//           }
//           $span.text(combined);
//           $div.append($span);
//           $tdVal.append($div);
//           $row.append($tdLabel).append($tdVal);
//           rows.push($row);
//
//           shownFields.push(label);
//         });
//
//         // Insert after EXCL row, before TAX row
//         for (let i = rows.length - 1; i >= 0; i--) {
//           afterRow.after(rows[i]);
//         }
//       })();

      if ($modalBody) {
          $modalBody.removeClass('updating');
          // Remove any existing error alerts on success
          $('#dynamicproduct-alert').remove();
      }
  }

  let _isCalculating = false;
  function _updateFormValuesProduct(changedFieldElement) {
    if (_isCalculating) return;

    if (window.dp && window.dp.methods && typeof window.dp.methods.validateFields === 'function') {
        const validationResult = window.dp.methods.validateFields();
        // For calculation, we might not want to block everything,
        // but if there are errors, we should probably show them.
        // However, some fields might be empty while typing.
        // Let's at least clear previous errors if it's valid now.
        if (validationResult === true) {
            $('#dynamicproduct-alert').remove();
        }
    }

    let $modalBody = $('.modal-body');
    if (!$modalBody.length) {
        $modalBody = $('#dynamicproductform');
    }
    if (!$modalBody.length) {
        $modalBody = $('#add-to-cart-or-refresh');
    }
    $modalBody.addClass('updating');
    let data = _getObjectValuesProduct(changedFieldElement);
    data.action = 'CalculateResult';

    _isCalculating = true;
    $.ajax({
        url: '/index.php?fc=module&module=dynamicproduct&controller=calculator&ajax=true&id_lang=1',
        type: 'POST',
        dataType: 'JSON',
        data: data,
      })
      .done(function(e) {
          _isCalculating = false;
          _applyCalculationResults(e, $modalBody);
      })
      .fail(function() {
          _isCalculating = false;
          $modalBody.removeClass('updating');
      });
  }

  function _setCustomizationProductList() {
    if (window.dp && window.dp.methods && typeof window.dp.methods.validateFields === 'function') {
      const validationResult = window.dp.methods.validateFields();
      if (validationResult !== true) {
        // If the Svelte app is present and validation fails, let it handle the errors
        // or show them ourselves if needed.
        // We can trigger the UI error message in the Svelte app if possible,
        // but at least we should stop the process.
        console.log('Validation failed', validationResult);

        // Try to trigger the Svelte UI error display if possible
        if (window.dp.stores && window.dp.stores.validation && typeof window.dp.stores.validation.set === 'function') {
            window.dp.stores.validation.set(validationResult);
        }

        _showDynamicProductErrors({errors: validationResult});
        return;
      }
    }

    let formData = _getObjectValuesProduct('', 'customization', 'save_customization', 1);

    $.ajax({
        url: '/index.php?fc=module&module=dynamicproduct&controller=customization&ajax=true&id_lang=1',
        type: 'POST',
        dataType: 'JSON',
        data: formData,
      })
      .done(function(customizationData) {
        let productId = formData.id_product;
        if (!customizationData.error && (customizationData.id_input > 0 || customizationData.id_customization > 0)) {
          let productBtn = $('.dynamicproduct-button[data-product-id="' + productId + '"]');
          showAddedToCartGlow(productBtn);
          $('#dynamicproduct-modal').modal('hide');
          // Remove any existing error alerts on success
          $('#dynamicproduct-alert').remove();
          $.ajax({
            url: '/index.php?controller=cart&token=' + prestashop.static_token,
            type: 'GET',
            data: {
              ajax: 1,
              action: 'update'
            },
          })
            .done(function(shoppingCartData) {
              let response = {};
              try { response = JSON.parse(shoppingCartData); } catch (e) {}

              if (typeof updateHeaderCartVisual === 'function') {
                updateHeaderCartVisual(response);
              }

              prestashop.emit('updateCart', {
                reason: response
              });
            });
        } else {
          // Show form errors inside the modal
          _showDynamicProductErrors(customizationData);
        }
      })
      .fail(function() {
        _showDynamicProductErrors({message: 'Er is iets misgegaan bij het toevoegen. Probeer het opnieuw.'});
      });
  }
  //---------------------------  End Product list functions

  function _getObjectValuesProduct(changedFieldElement, model, action, addCustomizationToCart) {
    if(typeof addCustomizationToCart === 'undefined'){
      addCustomizationToCart = 0;
    }

    let $form = $('#dp-modal-form');
    if (!$form.length) {
      $form = $('#dynamicproductform');
    }
    if (!$form.length) {
      $form = $('#add-to-cart-or-refresh');
    }
    if (!$form.length) {
      $form = $('form.dynamicproductform');
    }

    let productId = parseInt($form.find('#product-id').val()) || parseInt($form.find('input[name="id_product"]').val()) || parseInt($('#dp-container').find('[data-field]').first().data('field')?.id_product) || parseInt($('input[name="id_product"]').val());
    let idAttribute = parseInt($form.find('input[name="id_product_attribute"]').val()) || parseInt($('input[name="id_product_attribute"]').val()) || 0;
    let customerID = parseInt($form.find('#customer-id').val()) || parseInt($('input[name="customer-id"]').val()) || 0;
    let idCart = parseInt($form.find('#cart-id').val()) || parseInt($('input[name="cart-id"]').val()) || 0;
    let quantity = parseInt($('#quantity_wanted').val()) || 1;

    let productParams = {
      id_product: productId,
      id_product_attribute: idAttribute,
      id_customer: customerID,
      id_cart: idCart,
      quantity: quantity,
      model: model,
      action: action,
      add_to_cart: addCustomizationToCart,
      fields: {}
    };


    if (changedFieldElement && $(changedFieldElement).length) {
        let $elem = $(changedFieldElement);
        let name = $elem.data('name') || $elem.attr('name') || $elem.attr('id');
        // Normalize quantity field name
        if ($elem.attr('id') === 'quantity_wanted') {
          name = 'quantity';
        }
        if (name) {
          if (name.startsWith('dp-field-')) {
            name = name.substring(9);
          }
          if (name.startsWith('dp_')) {
            name = name.substring(3);
          }
        }

        let fieldData = $elem.data('field') || $elem.closest('[data-field]').data('field');

        if (!fieldData || typeof fieldData !== 'object') {
            let fieldAttr = $elem.attr('data-field') || $elem.closest('[data-field]').attr('data-field');
            if (fieldAttr) {
                try {
                    fieldData = JSON.parse(fieldAttr);
                } catch (e) {
                    fieldData = {};
                }
            } else {
                fieldData = {};
            }
        }
        let type = fieldData.type || 0;

        productParams.fields['changed'] = {
          name: 'changed',
          value: name,
          type: type
        };
    }

    // Search for fields in the form and in the dp-container
    let $fieldSources = $form.find('.dp-entry, [id^="dp-field-"]');
    $fieldSources = $fieldSources.add($('#dp-container').find('.dp-entry, [id^="dp-field-"]'));
    $fieldSources = $fieldSources.add($('.dp-entry, [id^="dp-field-"]')); // Fallback to global search for these specific classes/ids

    $fieldSources.each(function() {
      let $this = $(this);
      let name = $this.data('name') || $this.attr('name') || $this.attr('id');
      if (name) {
          if (name.startsWith('dp-field-')) {
              name = name.substring(9);
          }
          if (name.startsWith('dp_')) {
              name = name.substring(3);
          }

          // Normalize quantity field name
          if (name === 'quantity_wanted' || $this.attr('id') === 'quantity_wanted') {
            name = 'quantity';
          }

          // Avoid duplicate 'changed' entry if it was already added
          if (name === 'changed' && productParams.fields['changed']) {
              return;
          }

          let fieldData = $this.data('field') || $this.closest('[data-field]').data('field');
          if (!fieldData || typeof fieldData !== 'object') {
              let fieldAttr = $this.attr('data-field') || $this.closest('[data-field]').attr('data-field');
              if (fieldAttr) {
                  try {
                      fieldData = JSON.parse(fieldAttr);
                  } catch (e) {
                      fieldData = {};
                  }
              } else {
                  fieldData = {};
              }
          }
          let val = $this.val();
          let selectedOptions = [];

          if ($this.is('select') && $this.prop('multiple')) {
              selectedOptions = $this.val() || [];
          } else if ($this.is('select')) {
              selectedOptions = [parseInt($this.val())];
          } else if (fieldData.type == 8 || fieldData.type == 12 || fieldData.type == 13) { // dropdown, thumbnails, radio
              selectedOptions = [parseInt(val)];
          }

          productParams.fields[name] = {
              id_input: productParams.id_input || null,
              id_field: fieldData.id || 0,
              name: name,
              value: val,
              secondary_value: 0,
              options: JSON.stringify(selectedOptions),
              type: fieldData.type || 0,
              visible: 1,
              data: null,
              data_obj: null,
              selected_options: selectedOptions,
              duplicated: 0
          };
      }
    });

    // Explicitly add quantity to fields if not already present
    if (!productParams.fields['quantity']) {
      productParams.fields['quantity'] = {
        id_input: productParams.id_input || null,
        id_field: 0,
        name: 'quantity',
        value: quantity,
        secondary_value: 0,
        options: '[]',
        type: 0,
        visible: 0,
        data: null,
        data_obj: null,
        selected_options: [],
        duplicated: 0
      };
    }

    // Capture id_input if it exists
    let idInput = parseInt($form.find('#dp_id_input').val()) || parseInt($form.find('#input-id').val()) || parseInt($('input[name="dp_id_input"]').val()) || 0;
    if (idInput) {
        productParams.id_input = idInput;
    }

    let dpCart = parseInt($form.find('#dp_cart').val()) || parseInt($form.find('#cart-id').val()) || parseInt($('input[name="dp_cart"]').val()) || parseInt($('input[name="cart-id"]').val()) || 0;
    if (dpCart) {
        productParams.dp_cart = dpCart;
    }

    let dpCustomer = parseInt($form.find('#customer-id').val()) || parseInt($('input[name="customer-id"]').val()) || 0;
    if (dpCustomer) {
        productParams.dp_customer = dpCustomer;
    }

    console.log([3, productParams]);
    return productParams;
  }

  function _showDynamicProductErrors(payload) {
    // Parse payload into general (top-level) errors and field-specific errors
    let generalErrors = [];
    let fieldErrors = {};

    if (payload) {
      if (Array.isArray(payload)) {
        generalErrors = payload;
      } else if (payload.errors && Array.isArray(payload.errors)) {
        generalErrors = payload.errors;
      } else if (payload.errors && typeof payload.errors === 'object') {
        fieldErrors = payload.errors;
      } else if (payload.validation && typeof payload.validation === 'object') {
        fieldErrors = payload.validation;
      } else if (payload.message) {
        generalErrors = [payload.message];
      }
    }

    // Normalize: drop non-error values
    generalErrors = (generalErrors || []).filter(function(err) {
      return err !== true && err !== null && err !== undefined && err !== '';
    });

    // Find a root container to scope DOM operations
    let $root = $('#dynamicproduct-modal .modal-body');
    if (!$root.length) { $root = $('#dp-container'); }
    if (!$root.length) { $root = $('#dynamicproductform'); }
    if (!$root.length) { $root = $('#add-to-cart-or-refresh'); }
    if (!$root.length) { $root = $('.product-add-to-cart'); }

    // Clear previous alerts and field-specific errors
    $('#dynamicproduct-alert').remove();
    if ($root.length) {
      $root.find('.dp-field-error-feedback').remove();
      $root.find('.is-invalid').removeClass('is-invalid');
    } else {
      // If no root, work on the whole document (fallback)
      $('.dp-field-error-feedback').remove();
      $('.is-invalid').removeClass('is-invalid');
    }

    function findFieldElement(name) {
      if (!name) { return $(); }
      // Build a selector list covering Svelte (dp-field-*) and Smarty (.dp-entry, dp_*) variants
      const sels = [
        '#dp-container #dp-field-' + name + '-input',
        '#dp-container #dp-field-' + name,
        '#dp-container [data-testid="' + name + '"]',
        '#dp-container [data-name="' + name + '"] input',
        '#dp-container [data-name="' + name + '"] select',
        '#dp_' + name,
        '[name="dp_' + name + '"]',
        '#dynamicproductform [data-name="' + name + '"] input',
        '#dynamicproductform [data-name="' + name + '"] select',
        '#add-to-cart-or-refresh [data-name="' + name + '"] input',
        '#add-to-cart-or-refresh [data-name="' + name + '"] select',
        // global fallbacks
        '[id="dp-field-' + name + '-input"]',
        '[id="dp-field-' + name + '"]'
      ];
      let $el = $();
      for (let i = 0; i < sels.length; i++) {
        $el = $(sels[i]);
        if ($el.length) { break; }
      }
      return $el;
    }

    function placeFieldError($el, message) {
      if (!$el || !$el.length || !message) { return false; }
      // Prefer a nearby container
      let $container = $el.closest('.dp-field-container, .dp_field_container, .dp-field, .form-group, .input-group');
      if (!$container.length) { $container = $el.parent(); }
      // Remove any existing error for this container
      $container.find('.dp-field-error-feedback').remove();
      const $msg = $('<div class="alert alert-danger  dp-field-error-feedback"></div>').text(message);
      // Mark input invalid for Bootstrap styling
      $el.addClass('is-invalid');
      // Place message after the control or inside container at the end
      if ($el.next().length) {
        $el.after($msg);
      } else {
        $container.append($msg);
      }
      return true;
    }

    // Track first field error to scroll into view
    let firstErrorAnchor = null;

    // Iterate field-specific errors and try to attach under each field
    if (fieldErrors && typeof fieldErrors === 'object') {
      Object.keys(fieldErrors).forEach(function(name) {
        let message = fieldErrors[name];
        if (message === true || message === null || message === undefined || message === '') {
          return;
        }
        // Some validators may return objects/arrays; stringify as fallback
        if (typeof message !== 'string') {
          try { message = String(message); } catch (e) { message = 'Invalid value'; }
        }
        const $el = findFieldElement(name);
        if ($el && $el.length) {
          if (!firstErrorAnchor) { firstErrorAnchor = $el; }
          placeFieldError($el, message);
        } else {
          // Could not map this error to a field; show it in top-level alert later
          generalErrors.push(message);
        }
      });
    }

    // Fallback generic message if nothing collected
    if (!generalErrors.length && !firstErrorAnchor) {
      generalErrors = ['Controleer de invoervelden en probeer het opnieuw.'];
    }

    // Render top-level alert for general/unmapped errors
    if (generalErrors.length) {
      const html = '<div class="alert alert-danger" role="alert" id="dynamicproduct-alert">' + generalErrors.map(function(e){return '<div>'+e+'</div>';}).join('') + '</div>';
      if ($root.length) {
        $root.prepend(html);
      } else {
        alert(generalErrors.join('\n'));
      }
    }

    // Scroll to the first field error if available, otherwise to the alert
    setTimeout(function() {
      let $target = null;
      if (firstErrorAnchor && firstErrorAnchor.length) {
        $target = firstErrorAnchor;
      } else {
        $target = $('#dynamicproduct-alert');
      }
      if ($target && $target.length) {
        $([document.documentElement, document.body]).animate({
          scrollTop: Math.max(0, $target.offset().top - 100)
        }, 500);
      }
    }, 0);
  }

  function showAddedToCartGlow(productBtn) {
    let btn = $(productBtn);
    btn.addClass('added-to-cart');
    setTimeout(function(){
      btn.removeClass('added-to-cart');
    }, 2000);
  }
  // Subscribe to Svelte app store if available
  function _initStoreSubscription() {
      if (window.dp && window.dp.stores && window.dp.stores.calculator && typeof window.dp.stores.calculator.subscribe === 'function') {
          console.log('Subscribing to window.dp.stores.calculator');
          window.dp.stores.calculator.subscribe(function(calc) {
              if (calc) {
                  console.log('Calculator store update detected', calc);
                  _applyCalculationResults(calc);
              }
          });
          return true;
      }
      return false;
  }

  // Polling to wait for Svelte app to be initialized
  let storeSubscriptionInterval = setInterval(function() {
      if (_initStoreSubscription()) {
          clearInterval(storeSubscriptionInterval);
      }
  }, 500);

  // Stop polling after 10 seconds
  setTimeout(function() {
      clearInterval(storeSubscriptionInterval);
  }, 10000);

  });
})(window.jQuery || window.$);
