var showAddedToCartGlow = function (caller_element) {
  var i = 1;
  var times = 0;

  var glowCircle = $('#amount_circle');
  glowCircle.addClass('glow');
  // topHeaderCart.addClass('glow');

  var glowInt = setInterval(function () {

    if (times < 3) {
      if (i == 0) {
        glowCircle.addClass('glow');
        // topHeaderCart.addClass('glow');
        i++;
      } else {
        glowCircle.removeClass('glow');
        // topHeaderCart.removeClass( 'glow');
        i = 0;
      }
      times++;
    } else {
      glowCircle.removeClass('glow');
      // topHeaderCart.removeClass('glow');
      clearInterval(glowInt);
    }
  }, 800);

  return true;
};

function renderMoneyString(price) {
    const formatter = new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
    });
    return formatter.format(price);
}
$(document).ready(function() {
    // General functions
    $(document).on('click', '.show-hide-info .icon-info', function(event) {
        event.preventDefault();
        var id = $(this).data('id');
        $('#' + id).toggle();
    });
    $(document).on('click', '#show-hide-price-specification', function(event) {
        var checked = $(this).prop('checked');
        if (checked) {
            $('#price-specification').show();
        } else {
            $('#price-specification').hide();
        }
    });
    //------------------------------------------------- Start platecutting ----------------------------------------------------
    function calculateCuts() {
        var quantity = $('form.platecutting input#quantity').val();
        var product_id = $('form.platecutting input#product-id').val();
        var cutsArray = $('form.platecutting #cuts_array').val();
        var platesArray = $('form.platecutting #plates_array').val();
        if (typeof cutsArray !== 'undefined' && cutsArray.length > 0) {
            cutsArray = JSON.parse(cutsArray);
        }
        if (typeof platesArray !== 'undefined' && platesArray.length > 0) {
            platesArray = JSON.parse(platesArray);
        }
        var data = {
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
                $('form.platecutting').find('#total_tax').html(renderMoneyString(json.product_tax));
                $('form.platecutting').find('#subtotal_incl').html(renderMoneyString(json.subtotal_incl));
                $('form.platecutting').find('#subtotal_excl').html(renderMoneyString(json.subtotal_excl));

                if(json.cut_price > 0){
                  $('form.platecutting').find('#cut_price').html(renderMoneyString(json.cut_price));
                  $('#tr_cut_price').show();
                } else {
                  $('form.platecutting').find('#cut_price').html(renderMoneyString(0));
                  $('#tr_cut_price').hide();
                }
            },
            error: function(json) {
                console.log('Error occured during validation, please contact administrator.');
            }
        });
    }
    $(document).on('change', 'form.platecutting #quantity', function(event) {
        event.preventDefault();
        calculateCuts();
    });

    $(document).on('click', '#cut-modal  button.platecuttingAddToCart', function(e) {
      // console.log(document.getElementById('sequence'));
      if(document.getElementById('sequence') !== null){
        $('button#cut').trigger('click');
          // console.log('is single')
        } else {
          // console.log('is extended')
        }

        if($('form.platecutting #cuts_array').val() === ""){
          $('button#cut').trigger('click');
        }

        var quantity = $('form.platecutting input#quantity').val();
        var product_id = $('form.platecutting input#product-id').val();
        var cutsArray = $('form.platecutting #cuts_array').val();
        var platesArray = $('form.platecutting #plates_array').val();

        var technicalReference = $('form.platecutting #machineCutList').val();
        var technicalImage = $('form.platecutting #machineCutPreview').val();

        if (typeof cutsArray !== 'undefined' && cutsArray.length > 0) {
            cutsArray = JSON.parse(cutsArray);
        }
        if (typeof platesArray !== 'undefined' && platesArray.length > 0) {
            platesArray = JSON.parse(platesArray);
        }
        var data = {
            'product_id': product_id,
            'quantity': quantity,
            'cuts': cutsArray,
            'plates': platesArray,
            'technical_reference': technicalReference,
            'technical_image': technicalImage
        }

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
                  var product = $('a[data-id-product="' + json.id_product + '"]');
                  showAddedToCartGlow(product);
                  $('#cut-modal').modal('hide');
                  prestashop.emit('updateCart', {
                        reason: json,
                    });
                }
            }
        });
    });




    //single cuts
    $(document).on('click', 'button.cut-button', function(e) {
        $('#cut-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
                var plateWidth = parseInt($(this).data('cut-width'));
                var plateLength = parseInt($(this).data('cut-length'));
                var minCutSize = parseInt($(this).data('min-cut-size'));
                var maxCuts = parseInt($(this).data('max-cuts'));
                var combiPrices = $(this).data('combi-prices');
                var cutPrice = $(this).data('default-cut-price');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getcutmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {

                $('#cut-modal').html(html).modal('show');

                var configValues = {
                                    /**
                                     * Height of the whole plate
                                     * @type {number}
                                     */
                                    plateHeight: plateWidth,
                                    /**
                                     * Width of the hole plate
                                     * @type {number}
                                     */
                                    plateWidth: plateLength,
                                    /**
                                     * The minimum cut size for remainder or desired plate
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

                var canv = $('canvas').singlePlateCutVisualizer(configValues);
                $(document).on('click', '.icon-info', function(event) {
                    event.preventDefault();
                    var id = $(this).data('class');
                    $('.' + id).toggle();
                });
            }
        });
    });
  //Extended cuts
  $(document).on('click', 'button.extended-cut-button', function(e) {


    var prev_quantity = $('form.platecutting input#quantity').val();
    var prev_product_id = $('form.platecutting input#product-id').val();
    var prev_cutsArray = $('form.platecutting #cuts_array').val();
    var prev_cutHistory = $('form.platecutting #cut_history').val();
    var prev_platesArray = $('form.platecutting #plates_array').val();

    var prev_technicalReference = $('form.platecutting #machineCutList').val();
    var prev_technicalImage = $('form.platecutting #machineCutPreview').val();

    $('#cut-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');



    var plateWidth = parseInt($(this).data('cut-width'));
    var plateLength = parseInt($(this).data('cut-length'));
    var minCutSize = parseInt($(this).data('min-cut-size'));
    var maxCuts = parseInt($(this).data('max-cuts'));
    var combiPrices = $(this).data('combi-prices');
    var cutPrice = $(this).data('default-cut-price');
    $.ajax({
      url: url,
      type: 'GET',
      data: 'method=getcutmodal&product=' + $(this).data('product-id') + '&extended=true&ajax=true',
      success: function(html) {
        $('#cut-modal').html(html).modal('show');

        const configValues = {
          /**
           * Height of the whole plate
           * @type {number}
           */
          plateHeight: plateWidth,
          /**
           * Width of the hole plate
           * @type {number}
           */
          plateWidth: plateLength,
          /**
           * The minimum cut size for remainder or desired plate
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

        var canv = $('canvas').plateCutVisualizer(configValues);
        $(document).on('click', '.icon-info', function(event) {
          event.preventDefault();
          var id = $(this).data('class');
          $('.' + id).toggle();
        });
      }
    });
  });
    // -------------------------------------------------------- End Platecutting --------------------------------------------------------
    //--------------------------------------------------------- Start Staffel form ------------------------------------------------------
    $(document).on('click', 'button.staffel-button', function(e) {
        $('#staffel-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getstaffelmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {
                $('#staffel-modal').html(html).modal('show');
            }
        });
    });
    $(document).on('change', 'form.staffelform #quantity', function(event) {
        event.preventDefault();
        calculateStaffel();
    });

    function calculateStaffel() {
        var quantity = $('form.staffelform input#quantity').val();
        var product_id = $('form.staffelform input#product-id').val();
        var data = {
            'product_id': product_id,
            'quantity': quantity
        };
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=calculatestaffel&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
                $('#price_excl_no_addition span').html(renderMoneyString(json.product_price_incl));
                $('#price_excl_no_addition input').val(json.product_price_incl);
                $('#staffel_discount_price span.subtotal-inc-price').html(renderMoneyString(json.total_reduction));
                $('#total_price_excl span.subtotal-inc-price').html(renderMoneyString(json.subtotal_excl));
                $('#total_price_incl span.subtotal-inc-price').html(renderMoneyString(json.subtotal_incl));
            },
            error: function(json) {
                console.log('Error occured during validation, pleae contact administrator.');
            }
        });
    }
    $('#staffel-modal').on('click', 'button.addToCart', function(e) {
        productId = $(this).closest('form').find('input.product-id').val();
        form = $(this).closest('form');
        var quantity = $('form.staffelform input#quantity').val();
        var product_id = $('form.staffelform input#product-id').val();
        var attribute_id = $('form.staffelform input#product-attribute-id').val();
        var data = {
            'product_id': product_id,
            'quantity': quantity
        }
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=addstaffeltocart&data=' + JSON.stringify(data) + '&ajax=true',
            dataType: "json",
            success: function(json) {
                var product = $('a[data-id-product="' + json.id_product + '"]');
                showAddedToCartGlow(product);
                prestashop.emit('updateCart', {
                    reason: json
                });
            }
        });
    });
    //------------------------------------------- End staffel modal -------------------------------------------
    //------------------------------------------- Start Saw modal -------------------------------------------
    $('#saw-modal').on('click', 'button.addToCart', function(e) {
        productId = $(this).closest('form').find('input.product-id').val();
        form = $(this).closest('form');
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
                    var product = $('a[data-id-product="' + json.id_product + '"]');
                    showAddedToCartGlow(product);
                  $('#saw-modal').modal('hide');
                    prestashop.emit('updateCart', {
                        reason: json
                    });
                }
            }
        });
    });
    $('button.saw-button').on('click', function(e) {
        $('#saw-modal').html('<div id="spinner"><span class="icon icon-cog icon-spin"></span></div>');
        $.ajax({
            url: url,
            type: 'GET',
            data: 'method=getmodal&product=' + $(this).data('product-id') + '&ajax=true',
            success: function(html) {
                $('#saw-modal').html(html).modal('show');
                // $('canvas').sawCutVisualizer();
            }
        });
    });


    var inputChangeDelay;
    $('#saw-modal').on('keyup', 'input[type=number]', function(e) {
        elem = $(this);
        clearTimeout(inputChangeDelay);
        inputChangeDelay = setTimeout(function() {
            sawModule.validateValues(elem);
        }, 1000);
    });
    $('#saw-modal').on('blur', 'input[type=number]', function(e) {
        clearTimeout(inputChangeDelay);
        sawModule.validateValues(this);
        clearTimeout(inputChangeDelay);
    });
    var sawModule = {
        validateValues: function(elem) {
          const valueArray = [];
          $('input.chunk[type=number]').each(function(index, el) {
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
            $('input.chunk[type=number]').each(function(index, el) {
                el.value = valueArray[index];
                if (valueArray[index] > 0) {
                    $(el).parents('.form-group').children('.input-price').addClass('chosen');
                }
            });
            form = $(elem).parents('form.sawform');
            $.ajax({
                url: url,
                type: 'GET',
                data: 'method=calculate&' + form.serialize() + '&ajax=true',
                dataType: "json",
                success: function(json) {
                    // //console.log(json);
                    sawModule.clearErrors(form);
                    //Display any messages
                    if (json.messages) {
                        sawModule.showErrors(form, json.messages);
                    }
                    sawModule.updateValues(form, json);
                },
                error: function(json) {
                    //console.log('Error occured during validation, pleae contact administrator.');
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
          var cartBtn = document.querySelector('#saw-modal .addToCart');
            //Display any messages
            if (messages && messages.length > 0) {

              cartBtn.classList.add('disabled');
              cartBtn.style.pointerEvents = 'none';

                messages.forEach(function(message) {
                    if (message.field) {
                        formgroup = $(form).find('#' + message.field).closest('.form-group');
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
