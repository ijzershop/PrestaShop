(function ($) {
    "use strict";
    window.plateFirstLoaded = true;

    function renderMoneyString(price) {
        const formatter = new Intl.NumberFormat('nl-NL', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        });
        return formatter.format(price);
    }
    $(document).ready(function() {
    const sawModal = $('#saw-modal');

    // General functions
    $(document).on('click', '.show-hide-info .icon-info', function(event) {
        event.preventDefault();
        const id = $(this).data('id');
        $('#' + id).toggle();
    });
    $(document).on('click', '#show-hide-price-specification', function(event) {
        const checked = $(this).prop('checked');
        if (checked) {
            $('#price-specification').show();
        } else {
            $('#price-specification').hide();
        }
    });
    // Deduplicated handler: bind once for icons inside the cut modal
    $(document)
      .off('click.sawandcut.iconinfo')
      .on('click.sawandcut.iconinfo', '#cut-modal .icon-info', function(event) {
        event.preventDefault();
        const id = $(this).data('class');
        $('.' + id).toggle();
      });

    function setAiFormState($collapse, show) {
      const $modalBody = $collapse.closest('.modal-body');
      const $rest = $modalBody.find('[data-ai-form-body]');
      const $form = $collapse.closest('form');
      const keepSelector = '[data-ai-keep]';

      if ($rest.length) {
        $rest.css('display', show ? 'none' : '');
      }
      if (!$form.length) {
        return;
      }
      $form.find('input, select, textarea, button').each(function () {
        const $el = $(this);
        if ($el.closest('[data-ai-collapse]').is($collapse) || $el.is(keepSelector)) {
          return;
        }
        if (show) {
          $el.prop('disabled', true).attr('data-ai-disabled', '1');
        } else if ($el.attr('data-ai-disabled') === '1') {
          $el.prop('disabled', false).removeAttr('data-ai-disabled');
        }
      });
    }

    function bindAiContextModal($modal) {
      if (!$modal || !$modal.length) {
        return;
      }
      $modal.find('.js-ai-toggle').each(function () {
        const $btn = $(this);
        if ($btn.attr('data-ai-bound') === '1') {
          return;
        }
        $btn.attr('data-ai-bound', '1');
        $btn.on('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          if (typeof event.stopImmediatePropagation === 'function') {
            event.stopImmediatePropagation();
          }
          const target = $btn.data('ai-target');
          const ariaTarget = $btn.attr('aria-controls') ? ('#' + $btn.attr('aria-controls')) : '';
          const selector = target || ariaTarget;
          const $collapse = selector ? $modal.find(selector) : $modal.find('[data-ai-collapse]').first();
          if (!$collapse.length) {
            return;
          }
          const isOpen = $collapse.hasClass('show');
          $collapse.toggleClass('show', !isOpen);
          $collapse.css('display', isOpen ? 'none' : 'block');
          $btn.attr('aria-expanded', (!isOpen).toString());
          setAiFormState($collapse, !isOpen);
        });
      });

      $modal.find('.js-ai-context-send').each(function () {
        const $btn = $(this);
        if ($btn.attr('data-ai-bound') === '1') {
          return;
        }
        $btn.attr('data-ai-bound', '1');
        $btn.on('click', function (event) {
          event.preventDefault();
          const $collapse = $btn.closest('[data-ai-collapse]');
          const $response = $collapse.find('.js-ai-context-response');
          const $contextField = $collapse.find('textarea').first();
          const $form = $btn.closest('form');
          const contextValue = ($contextField.val() || '').trim();
          const productId = $form.find('input[name="product-id"]').val() || '';
          const contextType = $btn.data('ai-context-type') || '';

          if (!contextValue) {
            $response.removeClass('d-none alert-success').addClass('alert-warning');
            $response.text('Voer eerst context in.');
            return;
          }

          $btn.prop('disabled', true);
          const formData = new FormData();
          formData.append('ajax', 'true');
          formData.append('action', 'sendAiContext');
          formData.append('product_id', productId);
          formData.append('context_type', contextType);
          formData.append('context', contextValue);

          fetch('/index.php?fc=module&module=msthemeconfig&controller=ajax', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
          })
            .then((res) => res.json())
            .then((data) => {
              $response.removeClass('d-none alert-warning');
              if (data && data.ok) {
                $response.addClass('alert-success');
                $response.text(data.message || 'Context verzonden.');
              } else {
                $response.addClass('alert-warning');
                $response.text((data && data.error) ? data.error : 'Verzenden mislukt.');
              }
            })
            .catch(() => {
              $response.removeClass('d-none alert-success').addClass('alert-warning');
              $response.text('Verzenden mislukt.');
            })
            .finally(() => {
              $btn.prop('disabled', false);
            });
        });
      });
    }

    bindAiContextModal($('#cut-modal'));
    bindAiContextModal($('#saw-modal'));
    //------------------------------------------------- Start platecutting ----------------------------------------------------
    function calculateCuts() {
        const quantity = $('form.platecutting input#quantity').val();
        const product_id = $('form.platecutting input#product-id').val();
        let cutsArray = $('form.platecutting #cuts_array').val();
        let platesArray = $('form.platecutting #plates_array').val();
        if (typeof cutsArray !== 'undefined' && cutsArray.length > 0) {
            cutsArray = JSON.parse(cutsArray);
        }
        if (typeof platesArray !== 'undefined' && platesArray.length > 0) {
            platesArray = JSON.parse(platesArray);
        }
        const data = {
            'product_id': product_id,
            'quantity': quantity,
            'cuts': cutsArray,
            'plates': platesArray
        }

        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=calculatecutted&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
              // console.log(json);

                if (json.messages && json.messages.length > 0) {}
                $('#product_price span').html(renderMoneyString(json.price));
                $('#product_price_pre input').val(json.product_price);
                $('#product_price_pre span').html(renderMoneyString(json.product_price));
                $('#total_product_price_excl span').html(renderMoneyString(json.product_price));
                $('#total_product_price_incl span').html(renderMoneyString(json.product_price_incl));
                $('#subtotal_incl_pre input').val(json.subtotal_incl);
                $('#subtotal_incl_pre span').html(renderMoneyString(json.subtotal_incl));
                if (json.product_reduction > 0) {
                    $('#cut_discount_price span').html(renderMoneyString('-' + json.product_reduction));
                    $('#tr_cut_discount_price').show();
                } else {
                    $('#cut_discount_price span').html(renderMoneyString('-' + json.product_reduction));
                    $('#tr_cut_discount_price').hide();
                }
                let platecutForm = $('form.platecutting');

                platecutForm.find('#total_tax').html(renderMoneyString(json.product_tax));
                platecutForm.find('#subtotal_incl').html(renderMoneyString(json.subtotal_incl));
                platecutForm.find('#subtotal_excl').html(renderMoneyString(json.subtotal_excl));

                if(json.cut_price > 0){
                  platecutForm.find('#cut_price').html(renderMoneyString(json.cut_price));
                  $('#tr_cut_price').show();
                } else {
                  platecutForm.find('#cut_price').html(renderMoneyString(0));
                  $('#tr_cut_price').hide();
                }
            },
            error: function(json) {
                console.log('Error occurred during validation, please contact administrator.');
            }
        });
    }
    $(document).on('change', 'form.platecutting #quantity', function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        calculateCuts();
    });

    $(document).on('click', '#cut-modal  button.platecuttingAddToCart', function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      const analyticsCutMode = document.getElementById('sequence') !== null ? 'cut' : 'multi';
      let cutButton = $('button#cut');
      // Ensure at least one cut exists in a single mode
      if(document.getElementById('sequence') !== null){
        cutButton.trigger('click');
      }
      // If no cuts yet, trigger one to populate arrays
      if($('form.platecutting #cuts_array').val() === ""){
        cutButton.trigger('click');
      }

      // After any potential changes, force-generate a fresh black/white preview
      const proceedToSubmit = function(){
        const quantity = $('form.platecutting input#quantity').val();
        const product_id = $('form.platecutting input#product-id').val();
        let cutsArray = $('form.platecutting #cuts_array').val();
        let platesArray = $('form.platecutting #plates_array').val();

        const technicalReference = $('form.platecutting #machineCutList').val();
        const technicalImage = $('form.platecutting #machineCutPreview').val();

        if (typeof cutsArray !== 'undefined' && cutsArray.length > 0) {
            try { cutsArray = JSON.parse(cutsArray); } catch(e) {}
        }
        if (typeof platesArray !== 'undefined' && platesArray.length > 0) {
            try { platesArray = JSON.parse(platesArray); } catch(e) {}
        }
        const data = {
            'product_id': product_id,
            'quantity': quantity,
            'cuts': cutsArray,
            'plates': platesArray,
            'technical_reference': technicalReference,
            'technical_image': technicalImage,
            'technical_image_svg': ($('form.platecutting #machineCutPreviewSvg').val() || '')
        };
// console.log(data);
        $.ajax({
            url: url,
            type: 'POST',
            data: 'method=addcuttedtocart&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
                //Display any messages
                if (json.messages && Object.keys(json.messages).length > 0) {
                  $('#cut-modal .message-container-bottom').html(json.messages.message);
                } else {
                  if (typeof prestashop !== 'undefined' && typeof prestashop.emit === 'function') {
                    prestashop.emit('cutAddToCartAnalyticsPush', {
                      cart_id: json.cart_id,
                      mode: analyticsCutMode
                    });
                  }
                  const product = $('a[data-id-product="' + json.id_product + '"]');
                  $('#cut-modal').modal('hide');

                  window.updateHeaderCartVisual(json.cart);
                  // prestashop.emit('updateCart', { reason: json });
                }
            }
        });
      };

      if (typeof window.generatePlatecutPreview === 'function') {
        // Give the UI a frame to settle, then generate
        requestAnimationFrame(function(){
          window.generatePlatecutPreview(function(success){
            if (typeof window.generatePlatecutPreviewSVG === 'function') {
              window.generatePlatecutPreviewSVG(function(svgOk){
                proceedToSubmit();
              });
            } else {
              proceedToSubmit();
            }
          });
        });
      } else {
        // Fallback: proceed directly
        proceedToSubmit();
      }
    });




    //single cuts
    $(document).on('click', 'button.cut-button', function(e) {
      e.stopImmediatePropagation();
      window.plateFirstLoaded = true;
        $('#cut-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
                const plateHeight = parseInt($(this).data('cut-width'));
                const plateLength = parseInt($(this).data('cut-length'));
                const minCutSize = parseInt($(this).data('min-cut-size'));
                const maxCuts = parseInt($(this).data('max-cuts'));
                const combiPrices = $(this).data('combi-prices');
                const cutPrice = $(this).data('default-cut-price');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getcutmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {

                $('#cut-modal').html(html).modal('show');
                bindAiContextModal($('#cut-modal'));

                const configValues = {
                                    /**
                                     * Height of the whole plate
                                     * @type {number}
                                     */
                                    plateHeight: plateHeight,
                                    /**
                                     * Width of the hole plate
                                     * @type {number}
                                     */
                                    plateWidth: plateLength,
                                    /**
                                     * The minimum cut size for the remainder or desired plate
                                     * @type {number}
                                     */
                                    minCutSize: minCutSize,
                                    /**
                                     * The maximum total cuts per plate
                                     * @type {number}
                                     */
                                    maxCuts: maxCuts,
                                    /**
                                     * list of prices and combinations of the product
                                     * @type {array}
                                     */
                                    combiPrices: combiPrices,
                                    /**
                                     * price per single cut
                                     * @type {float}
                                     */
                                    cutPrice: cutPrice,
                                };

                const canvasEl = $('canvas');
                if (typeof canvasEl.singlePlateCutVisualizer === 'function') {
                    canvasEl.singlePlateCutVisualizer(configValues);
                } else if (typeof canvasEl.plateCutVisualizer === 'function') {
                    canvasEl.plateCutVisualizer(configValues);
                } else {
                    console.warn('Plate cut visualizer plugin is not available.');
                }
                window.plateFirstLoaded = false;
            }
        });
    });
  //Extended cuts
  $(document).on('click', 'button.extended-cut-button', function(e) {
    e.stopImmediatePropagation();
    window.plateFirstLoaded = true;
    const prev_quantity = $('form.platecutting input#quantity').val();
    const prev_product_id = $('form.platecutting input#product-id').val();
    const prev_cutsArray = $('form.platecutting #cuts_array').val();
    const prev_cutHistory = $('form.platecutting #cut_history').val();
    const prev_platesArray = $('form.platecutting #plates_array').val();

    const prev_technicalReference = $('form.platecutting #machineCutList').val();
    const prev_technicalImage = $('form.platecutting #machineCutPreview').val();

    $('#cut-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');

    const plateHeight = parseInt($(this).data('cut-width'));
    const plateLength = parseInt($(this).data('cut-length'));
    const minCutSize = parseInt($(this).data('min-cut-size'));
    const maxCuts = parseInt($(this).data('max-cuts'));
    const combiPrices = $(this).data('combi-prices');
    const cutPrice = $(this).data('default-cut-price');
    $.ajax({
      url: url,
      type: 'GET',
      data: 'method=getcutmodal&product=' + $(this).data('product-id') + '&extended=true&ajax=true',
      success: function(html) {
        $('#cut-modal').html(html).modal('show');
        bindAiContextModal($('#cut-modal'));

        const configValues = {
          /**
           * Height of the whole plate
           * @type {number}
           */
          plateHeight: plateHeight,
          /**
           * Width of the hole plate
           * @type {number}
           */
          plateWidth: plateLength,
          /**
           * The minimum cut size for the remainder or desired plate
           * @type {number}
           */
          minCutSize: minCutSize,
          /**
           * The maximum total cuts per plate
           * @type {number}
           */
          maxCuts: maxCuts,
          /**
           * list of prices and combinations of the product
           * @type {array}
           */
          combiPrices: combiPrices,
          /**
           * price per single cut
           * @type {float}
           */
          cutPrice: cutPrice,
          /**
           * Previous data to start with
           */
          prevData: {
            quantity: prev_quantity,
            product_id: prev_product_id,
            cuts_array: prev_cutsArray,
            cut_history: prev_cutHistory,
            plates_array: prev_platesArray,
            tech_reference: prev_technicalReference,
            tech_image: prev_technicalImage
          }
        };

        const canv = $('canvas').plateCutVisualizer(configValues);
        window.plateFirstLoaded = false;
      }
    });
  });
    // -------------------------------------------------------- End Platecutting --------------------------------------------------------
    //--------------------------------------------------------- Start Staffel form ------------------------------------------------------
    // $(document).on('click', 'button.staffel-button', function(e) {
    //     $('#staffel-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         data: 'method=getstaffelmodal&product=' + $(this).data('product-id') + '&ajax=true',
    //         success: function(html) {
    //             $('#staffel-modal').html(html).modal('show');
    //         }
    //     });
    // });
    // $(document).on('change', 'form.staffelform #quantity', function(event) {
    //     event.preventDefault();
    //     calculateStaffel();
    // });
    //
    // function calculateStaffel() {
    //     const quantity = $('form.staffelform input#quantity').val();
    //     const product_id = $('form.staffelform input#product-id').val();
    //     const data = {
    //         'product_id': product_id,
    //         'quantity': quantity
    //     };
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         data: 'method=calculatestaffel&data=' + JSON.stringify(data) + '&ajax=true',
    //         dataType: "json",
    //         success: function(json) {
    //             $('#price_excl_no_addition span').html(renderMoneyString(json.product_price_incl));
    //             $('#price_excl_no_addition input').val(json.product_price_incl);
    //             $('#staffel_discount_price span.subtotal-inc-price').html(renderMoneyString(json.total_reduction));
    //             $('#total_price_excl span.subtotal-inc-price').html(renderMoneyString(json.subtotal_excl));
    //             $('#total_price_incl span.subtotal-inc-price').html(renderMoneyString(json.subtotal_incl));
    //         },
    //         error: function(json) {
    //             console.log('Error occurred during validation, please contact administrator.');
    //         }
    //     });
    // }
    // $('#staffel-modal').on('click', 'button.addToCart', function(e) {
    //     let productId = $(this).closest('form').find('input.product-id').val();
    //     let form = $(this).closest('form');
    //     const quantity = $('form.staffelform input#quantity').val();
    //     const product_id = $('form.staffelform input#product-id').val();
    //     const attribute_id = $('form.staffelform input#product-attribute-id').val();
    //     const data = {
    //         'product_id': product_id,
    //         'quantity': quantity
    //     }
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         data: 'method=addstaffeltocart&data=' + JSON.stringify(data) + '&ajax=true',
    //         dataType: "json",
    //         success: function(json) {
    //             const product = $('a[data-id-product="' + json.id_product + '"]');
    //             prestashop.emit('updateCart', {
    //                 reason: json
    //             });
    //         }
    //     });
    // });
    //------------------------------------------- End staffel modal -------------------------------------------
    //------------------------------------------- Start Saw modal -------------------------------------------
    sawModal.on('click', 'button.addToCart', function(e) {
      e.stopImmediatePropagation();
        let productId = $(this).closest('form').find('input.product-id').val();
        let form = $(this).closest('form');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=addtocart&' + $(this).parents('form.sawform').serialize() + '&ajax=true',
            dataType: "json",
            success: function(json) {
                //Display any messages
                if (json.messages && json.messages.length > 0) {
                    sawModule.clearErrors(form);
                    sawModule.showErrors(form, json.messages);
                    sawModule.updateValues(form, json);
                } else {
                  if (typeof prestashop !== 'undefined' && typeof prestashop.emit === 'function') {
                    prestashop.emit('sawAddToCartAnalyticsPush', { cart_id: json.cart_id });
                  }
                  const product = $('a[data-id-product="' + json.id_product + '"]');
                  sawModal.modal('hide');

                  window.updateHeaderCartVisual(json.cart);
                }
            }
        });
    });
    $('button.saw-button').on('click', function(e) {
      e.stopImmediatePropagation();
        sawModal.html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {
                sawModal.html(html).modal('show');
                bindAiContextModal(sawModal);
                // $('canvas').sawCutVisualizer();
            }
        });
    });


    let inputChangeDelay;
    sawModal.on('keyup', 'input[type=number]', function(e) {
        let elem = $(this);
        clearTimeout(inputChangeDelay);
        inputChangeDelay = setTimeout(function() {
            sawModule.validateValues(elem);
        }, 1000);
    });
    sawModal.on('blur', 'input[type=number]', function(e) {
        clearTimeout(inputChangeDelay);
        sawModule.validateValues(this);
        clearTimeout(inputChangeDelay);
    });
    const sawModule = {
        validateValues: function(elem) {
          const valueArray = [];
          let inputChunks =  $('input.chunk[type=number]');
          inputChunks.each(function(index, el) {
              let insertedValue = el.value.replace(/[^\d.]/g, '');

              if(insertedValue !== el.value){
                el.value = insertedValue;
              }

              if (parseInt(insertedValue) > 0) {
                    valueArray.push(insertedValue);
                } else {
                    valueArray.push(null);
                    $(el).parents('.form-group').children('.input-price').removeClass('chosen');
                }
            });

            valueArray.sort(function(a, b) {
                return b - a;
            });
            inputChunks.each(function(index, el) {
                el.value = valueArray[index];
                if (valueArray[index] > 0) {
                    $(el).parents('.form-group').children('.input-price').addClass('chosen');
                }
            });
            let form = $(elem).parents('form.sawform');
            $.ajax({
                url: url,
                type: 'GET',
                data: 'method=calculate&' + form.serialize() + '&ajax=true',
                dataType: "json",
                success: function(json) {
                    sawModule.clearErrors(form);
                    //Display any messages
                    if (json.messages) {
                        sawModule.showErrors(form, json.messages);
                    }
                    sawModule.updateValues(form, json);
                },
                error: function(json) {
                    console.log('Error occurred during validation, please contact administrator.');
                }
            });
        },
        clearErrors: function(form) {
            //Clear all previous messages (if present)
            $(form).find('.message-container').html('');
            $(form).find('.form-group').each(function() {
                $(this).removeClass('form-error');
                $(this).find('.error-message').html('');
            })
        },
        showErrors: function(form, messages) {
          document.querySelectorAll('input.chunks, input.remainder').forEach(function (elem){
            elem.classList.remove('is-invalid');
          });
          const cartBtn = document.querySelector('#saw-modal .addToCart');
            //Display any messages
            if (messages && messages.length > 0) {

              cartBtn.classList.add('disabled');
              cartBtn.style.pointerEvents = 'none';

                messages.forEach(function(message) {
                    if (message.field) {
                        let formgroup = $(form).find('#' + message.field).closest('.form-group');
                        $(formgroup).addClass('form-error');
                        $(formgroup).find('input').addClass('is-invalid');
                        $(formgroup).find('.error-message').append('<span>' + message.message + ' </span>');
                    } else {
                        $(form).find('.message-container').append('<div class="alert alert-warning alert-dismissible" role="alert">' + message.message + '</div>');
                    }
                });
            } else {
              cartBtn.classList.remove('disabled');
              cartBtn.style.pointerEvents = 'all';
            }
        },
        updateValues: function(form, json) {
            $('#product_price span').html(renderMoneyString(json.price));
            $('#product_price_pre input').val(json.product_price);
            $('#product_price_pre span.subtotal-inc-price').html(renderMoneyString(json.product_price));
            $('#total_product_price_excl span.subtotal-inc-price').html(renderMoneyString(json.product_price));
            $('#total_product_price_incl span.subtotal-inc-price').html(renderMoneyString(json.product_price_incl));
            $('#subtotal_incl_pre input').val(json.subtotal_incl);
            $('#subtotal_incl_pre span.subtotal-inc-price').html(renderMoneyString(json.subtotal_incl));
            if (json.product_reduction > 0) {
                $('#saw_discount_price span.subtotal-inc-price').html(renderMoneyString('-' + json.product_reduction));
                $('#tr_saw_discount_price').show();
            } else {
                $('#saw_discount_price span.subtotal-inc-price').html(renderMoneyString('-' + json.product_reduction));
                $('#tr_saw_discount_price').hide();
            }
            $(form).find('#total_tax').html(renderMoneyString(json.product_tax));
            $(form).find('#subtotal_incl').html(renderMoneyString(json.subtotal_incl));
            $(form).find('#subtotal_excl').html(renderMoneyString(json.subtotal_excl));
            $(form).find('#remainder').val(json.remainder);
            $(form).find('#saw_price').html(renderMoneyString(json.saw_price));
            $(form).find('#saw-check').val($("<div>").html(json.order_description).text());
            $(form).find('#saw-loss').text(json.loss);
        }
    };


    //------------------------------------------- End Saw modal -------------------------------------------
    });
})(window.jQuery || window.$);
