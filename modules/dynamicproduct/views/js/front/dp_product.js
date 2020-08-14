/**
 * 2010-2018 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tuni-Soft
 * @copyright 2010-2018 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

var dp_product = {

  link: null,
  values: null,
  visibility: null,

  isForm: false,
  cartSelector: '#add_to_cart button',
  cartHandler: null,

  response: null,
  updateLayerBkp: null,

  customize: true,

  change: true,

  // store the last price value
  lastPrice: null,
  id_attribute: 0,

  null_values: {
    1: 0,
    4: '',
    5: '',
    6: '',
    8: 0,
    9: 0,
    10: '',
    11: 0,
    12: 0,
    13: '',
    16: 0,
    17: 0
  },

  ajaxRequests: {},

  init: function () {
    dp_product.link = dp_link;
    dp_product.visibility = dp_visibility;
    dp_product.moveContainer();
    DpTools.initCustomFunctions();
    dp_product.initSliders();
    dp_product.initSpinners();
    dp_product.initDatePickers();
    dp_product.initColorPickers();
    dp_product.initTooltips();
    dp_product.initPriceElement();
    dp_proportion.init();
    dp_product.handleEvents();
    dp_product.triggerEvents();
    dp_product.loadInput();
    dp_product.loadUrlParams();

    dp_product.initImageUpload();
    dp_product.initFileUpload();
  },

  moveContainer: function () {
    //no hook is available
    //move container under product attributes
    if (TnCompat.isSeven()) {
      $('.dp_container').insertAfter('.product-variants');
      $('#dp_oos').insertBefore('.product-add-to-cart');
    } else {
      if ($('#attributes').length) {
        $('.dp_container').insertAfter('#attributes');
      } else {
        $('.dp_container').appendTo('.product_attributes');
        $('.product_attributes').removeClass('hidden').show();
      }
    }
  },

  handleAddToCart: function () {
    //we hijack the cart button
    //get the current click handler to use it later
    var cart_button = $(dp_product.cartSelector);
    var events = $._data(document, "events");
    if (events && events.click) {
      var clickEvents = events.click;
      var handler = null;
      $.each(clickEvents, function (i, event) {
        if (event.selector === dp_product.cartSelector) {
          handler = event.handler;
        }
      });
    }

    if (!handler && TnCompat.isSeven()) {
      return dp_product.handleCartButton();
    }

    if (!handler) {
      var button = $('#add_to_cart input');
      if (button.length) {
        var events = $._data(button.get(0), "events");
        if (events && events.click) {
          var clickEvents = events.click;
          var handler = null;
          $.each(clickEvents, function (i, event) {
            handler = event.handler;
            dp_product.cartSelector = '#add_to_cart input';
            button.off('click').on('click', dp_product.save);
            return true;
          });
        }
      }
    }

    if (!handler && $('#buy_block').length) {
      var events = $._data($('#buy_block').get(0), "events");
      if (events && events.click) {
        var clickEvents = events.click;
        var handler = null;
        $.each(clickEvents, function (i, event) {
          if (event.selector === dp_product.cartSelector) {
            handler = event.handler;
          }
        });
      }
    }
    if (!handler) {
      if ($('#buy_block').length) {
        dp_product.isForm = true;
        $('#buy_block').on('submit', dp_product.submitForm);
        return true;
      }
      return false;
    }
    dp_product.cartHandler = handler;
    $(document).off('click', dp_product.cartSelector).on('click', dp_product.cartSelector, dp_product.save);
    return true;
  },

  handleCartButton: function () {
    dp_product.cartSelector = '.product-add-to-cart [data-button-action="add-to-cart"]';
    $('#add-to-cart-or-refresh').on('click', dp_product.cartSelector, dp_product.handleCartButtonClick);
    return true;
  },

  updateLayer: function (product, jsonData, addedFromProductPage, callerElement) {
    dp_product.updateLayerBkp(product, jsonData, addedFromProductPage, callerElement);
    $('#layer_cart_product_price').text($('#our_price_display').text());
    $('#layer_cart_product_quantity').closest('div').hide();
  },

  showSaveButton: function () {
    //if the add to cart was not handled correctly, show the old save button
    $('#dp_save_container').removeClass('dp_hidden');
  },

  initSpinners: function () {
    var inputs = $('.dp_input');
    inputs.each(function (i, input) {
      $input = $(input);
      var options = {};
      var min = DpTools.parseFloat($input.data('min'));
      var max = DpTools.parseFloat($input.data('max'));
      var step = DpTools.parseFloat($input.data('step'));
      options.min = min;
      if (max !== min) {
        options.max = max;
      }
      if (step) {
        options.step = step;
      } else {
        options.step = 1;
      }
      options.stop = function (event, ui) {
        if (event.which === 1 || event.which === 38 || event.which === 40) {
          $(this).trigger('change');
        }
      };
      if (!$input.hasClass('dp_slider')) {
        $input.spinner(options);
      }
    });
  },

  initSliders: function () {
    var inputs = $('.dp_slider');
    inputs.each(function (i, input) {
      $input = $(input);
      var options = {};
      var min = DpTools.parseFloat($input.data('min'));
      var max = DpTools.parseFloat($input.data('max'));
      var step = DpTools.parseFloat($input.data('step'));
      var init = DpTools.parseFloat($input.val());
      var id_input = $input.attr('id');
      var container = $input.closest('.dp_field_container');
      var slider_control = container.find('.dp_slider_control');
      // hide the unit and save it to the slider value data
      var $unit = container.find('.dp_unit').hide();
      var unit = $unit.text();
      var slider_value = container.find('.dp_slider_value');
      slider_value.data('unit', $unit.text());
      slider_value.text(init + ' ' + unit);

      var slide_handler = function (event, ui) {
        var container = $(event.target).closest('.dp_field_container');
        var input = container.find('.dp_slider');
        input.val(ui.value);
        var slider_value = container.find('.dp_slider_value');
        slider_value.text(ui.value + ' ' + slider_value.data('unit'));
      };

      var slide_stop = function (event, ui) {
        var input = $(event.target).closest('.dp_field_container').find('.dp_slider').change();
      };

      slider_control.slider({
        value: init,
        min: min,
        max: max,
        step: step,
        change: slide_handler,
        slide: slide_handler,
        stop: slide_stop
      });

      var slider_button_up = container.find('.dp_slider_up');
      var slider_button_down = container.find('.dp_slider_down');

      slider_button_up.off('click').on('click', function () {
        var value = slider_control.slider('value');
        var step = $input.data('step');
        slider_control.slider('option', 'value', value + step);
        slider_control.closest('.dp_field_container').find('.dp_slider').change();
        return false;
      });

      slider_button_down.off('click').on('click', function () {
        var value = slider_control.slider('value');
        var step = $input.data('step');
        slider_control.slider('option', 'value', value - step);
        slider_control.closest('.dp_field_container').find('.dp_slider').change();
        return false;
      });

    });
  },

  initDatePickers: function () {
    var inputs = $('.dp_date');
    inputs.each(function (i, input) {
      $input = $(input);
      var options = {};
      $input.datepicker(options);
    });
  },

  initColorPickers: function () {

    var dp_colors_list = dp_colors_list || [
      '#FFFFFF',
      '#C0C0C0',
      '#808080',
      '#000000',
      '#FF0000',
      '#FFFF00',
      '#00FF00',
      '#008000',
      '#00FFFF',
      '#0000FF',
      '#000080',
      '#FF00FF',
      '#800080'
    ];

    var options = {
      customBG: '#222',
      margin: '4px -2px 0',
      doRender: 'div div',
      preventFocus: true,
      animationSpeed: 0,

      // demo on how to make plugins... mobile support plugin
      buildCallback: function ($elm) {
        var colorInstance = this.color,
          colorPicker = this,
          random = function (n) {
            return Math.round(Math.random() * (n || 255));
          };
        this.$colorPatch = $elm.prepend('<div class="cp-disp">').find('.cp-disp');
        $('.color').on('click', function (e) {
          e.preventDefault && e.preventDefault();
        });

        var html = '<div class="cp-memory">';
        for (i = 0; i < dp_colors_list.length; i++) {
          html += '<div style="background: ' + dp_colors_list[ i ] + '"></div>';
        }
        html += '</div>';

        $elm.append(html).on('click', '.cp-memory div', function (e) {
          var $this = $(this);

          if (this.className) {
            $this.parent().prepend($this.prev()).children().eq(0).css('background-color', '#' + colorInstance.colors.HEX);
          } else {
            colorInstance.setColor($this.css('background-color'));
            colorPicker.render();
          }
        });
      },
      cssAddon: // could also be in a css file instead
        '.cp-color-picker{z-index:10}' +
        '.cp-disp{display: none; padding:10px; margin-bottom:6px; font-size:19px; height:37px; line-height:20px}' +
        '.cp-xy-slider{width:200px; height:200px;}' +
        '.cp-xy-cursor{width:16px; height:16px; border-width:2px; margin:-8px}' +
        '.cp-z-slider{height:200px; width:40px;}' +
        '.cp-z-cursor{border-width:8px; margin-top:-8px;}' +
        '.cp-alpha{display: none !important;}' +
        '.cp-memory {cursor:pointer;margin-bottom:6px; clear:both;}' +
        '.cp-memory div {float:left; width:17px; height:17px; margin-right:2px;' +
        'background:rgba(0,0,0,1); text-align:center; line-height:17px;}',

      renderCallback: function ($elm, toggled) {
        var colors = this.color.colors;
        var color = this.color.toString($elm._colorMode);
        var hex = '#' + colors.HEX;
        var target = $('#' + $elm.data('target'));
        target
          .val(hex)
          .css({
            backgroundColor: hex,
            color: colors.RGBLuminance > 0.22 ? '#222' : '#ddd'
          });
      }
    };

    $('.dp_colorpicker_handle').each(function () {
      var handle = $(this);
      var colorpicker = handle.colorPicker(options);
      var target = $('#' + handle.data('target'));
      target.on('change', function () {
        var input = $(this);
        var value = input.val();
        input.css({
          backgroundColor: value
        });
        colorpicker.val(value).trigger('change');
      });
    });
  },

  initTooltips: function () {
    $('.dp_tooltip').each(function () {
      var dp_field = $(this);
      var id_field = dp_field.data('id_field');
      var dp_content = $('.dp_content_' + id_field);
      dp_field.qtip({
        content: dp_content.html(),
        show: {
          event: 'click'
        },
        hide: 'unfocus',
        position: {
          my: 'bottom center',
          at: 'top center',
          viewport: $(window)
        },
        style: {classes: 'qtip-bootstrap dp_qtip dp_product_tooltip'}
      });
    });
  },

  initPriceElement: function () {
    if (TnCompat.isSeven()) {
      return false;
    }
    var price_element = $('#our_price_display');
    if (!price_element.length) {
      $('body').append('<span style="display: none !important;" id="our_price_display"></span>');
    }
  },

  handleEvents: function () {
    $('.dp_container')
      .on('click', '#dp_save', dp_product.save)
      .on('change', '.dp_entry', dp_product.dpChange)
      .on('keydown', '.dp_entry', dp_product.dpEnter)
      .on('click', '.dp_tooltip', dp_product.clickTooltip)
      .on('click', '.dp_image_remove', dp_product.removeImageUpload)
      .on('click', '.dp_file_remove', dp_product.removeFileUpload)
      .on('click', '.dp_thumbnails_list li a', dp_product.selectThumbnail)
      .on('click', '.dp_dropdown_icon ', DpTools.openDropdownIcon)
    ;

    if (!TnCompat.isSeven()) {
      $('#quantity_wanted').on('change keyup', dp_product.dpChange);
    }

    dp_product.handlePriceChange();

    $(window).on('load', dp_product.load);

    //upload handlers
    $('.dp_image_input').on('change', dp_product.startImageUpload);
    $('.dp_file_input').on('change', dp_product.startFileUpload);
    $('#dp_image_uploader').on('load', dp_product.endImageUpload);
    $('#dp_file_uploader').on('load', dp_product.endFileUpload);
  },

  load: function () {
    var handled = dp_product.handleAddToCart();
    if (!handled) {
      dp_product.showSaveButton();
    }
  },

  handlePriceChange: function () {
    var changed = false;

    function change() {
      changed = true;
    }

    $('#our_price_display').on('change', change);
    if (!changed && false) {
      var updateDisplayBkp = updateDisplay;
      updateDisplay = function () {
        updateDisplayBkp();
        $('#our_price_display').trigger('change');
      };
    }
    $('#our_price_display').on('change', dp_product.dpChange);
    if (TnCompat.isSeven()) {
      prestashop.on('updatedProduct', function (resp) {
        $('.product-prices span[itemprop="price"]').text(dp_product.lastPrice);
        TnCompat.id_attribute = resp.id_product_attribute;
        dp_product.dpChange();
        dp_product.execCustomFunctions();
      });
    }
  },

  triggerEvents: function () {
    dp_product.execCustomFunctions();
    if (!TnCompat.isSeven()) {
      $('#our_price_display').trigger('change');
    } else {
      if (dp_combinations_count > 1) {
        var $refresh_input = $("input[name$='refresh']");
        if ($refresh_input.length) {
          $refresh_input.click();
        } else {
          $('.product-variants *[name]').eq(0).trigger('change');
        }
      }
    }
  },

  execCustomFunction: function (input) {
    var extra = 0;
    var input = $(input);
    var name = input.data('name');
    var id_field = input.closest('.dp_field_container').data('id_field');
    var value = input.val();
    if (input.hasClass('dp_checkbox')) {
      value = +input.prop('checked');
    }
    if (value === '' && input.text() !== '') {
      value = input.text();
    }

    // check if value is NaN
    if (value !== value) {
      var type = DpTools.parseInt(input.data('type'));
      if (DpTools.isset(dp_product.null_values[ type ])) {
        value = dp_product.null_values[ type ];
      }
    }

    if (input.hasClass('dp_dropdown')) {
      extra = input.find('option:selected').data('id_dropdown_option');
    }
    // TODO: check this
    if (input.hasClass('dp_radio')) {
      extra = input.find('option:selected').data('id_radio_option');
    }
    if (input.hasClass('dp_thumbnails')) {
      extra = input.find('option:selected').data('id_thumbnails_option');
    }
    if (name) {
      DpTools.triggerFunction(input, name, value, extra, id_field);
    }
  },

  execCustomFunctions: function () {
    $('.dp_entry').each(function (i, input) {
      dp_product.execCustomFunction(input);
    });
  },

  clickTooltip: function (event) {
    DpTools.cancel(event);
  },

  checkStep: function (input) {
    var input_value = DpTools.clean(input.val(), 'float');
    var step = DpTools.parseFloat(input.data('step'));
    var value = DpTools.parseFloat(input_value);

    if (!step) {
      return true;
    }
    var new_value = DpTools.snapToStep(value, step);

    if (new_value !== value) {
      input.val(new_value);
    }
  },

  dpEnter: function (event) {
    var entry = $(event.target);
    if (event.keyCode === 13) {
      if (entry.hasClass('dp_textarea')) {
        return true;
      }
      event.stopPropagation();
      DpTools.cancel(event);
      dp_product.dpChange.call(this);
      return false;
    }
  },

  disableCartButton: function () {
    var cart_button = $(dp_product.cartSelector);
    if (cart_button.length) {
      cart_button.attr('disabled', 'disabled').addClass('disabled');
    }
  },

  enableCartButton: function () {
    var cart_button = $(dp_product.cartSelector);
    if (cart_button.length) {
      cart_button.removeAttr('disabled').removeClass('disabled');
    }
  },

  dpChange: function () {
    dp_product.disableCartButton();
    //dp_product.restorePrice();
    dp_product.checkVisibility();

    var input = $(this);
    var field_name = input.data('name');
    var type = input.data('type');

    var is_input = input.hasClass('dp_input');
    var is_entry = input.hasClass('dp_entry');

    if (is_entry) {
      dp_product.customize = true;
    }

    if (is_input) {
      dp_product.checkStep(input);

      var min = DpTools.parseFloat(input.data('min'));
      var max = DpTools.parseFloat(input.data('max'));

      var changed = false;
      var value = input.val();
      if (type === 1) {
        if (value.indexOf(',') > -1) {
          value = value.replace(',', '.');
          changed = true;
        }
      }
      if (value < min) {
        value = min;
        changed = true;
      }
      if (max !== min && value > max && max > min) {
        value = max;
        changed = true;
      }

      if (changed) {
        input.val(value);
      }
    }

    input.closest('.dp_input_container').removeClass('dp_invalid');

    var values = dp_product.getValues();
    if (field_name && DpTools.isset(values[ field_name ])) {
      var extra = 0;
      var field_value = values[ field_name ];
      if (values[ 'data_select_' + field_name ]) {
        extra = values[ 'data_select_' + field_name ];
      }
      if (values[ 'data_radio_' + field_name ]) {
        extra = values[ 'data_radio_' + field_name ];
      }
      if (values[ 'data_thumb_' + field_name ]) {
        extra = values[ 'data_thumb_' + field_name ];
      }
      DpTools.triggerFunction(input, field_name, field_value, extra);
      dp_proportion.processProportions(field_name, field_value, values);
    }

    if (input.hasClass('dp_dropdown')) {
      DpTools.showDropdownIcon(field_name, values[ 'data_select_' + field_name ]);
    }

    if (!dp_product.change) {
      dp_product.enableCartButton();
      return;
    }

    var values = dp_product.getValues();
    values[ 'field' ] = field_name;

    DpTools.abortAjaxRequests();

    DpTools.calculateFormula(values).done(function (response) {
      if (response.error) {
        console.error(response.message);
      }

      if (response.formula_values) {
        DpDebug.log('-------', '-------');
        DpDebug.log('Values:', response.formula_values);
        DpDebug.log('Formula:', response.formula);
        DpDebug.log('Numbers:', response.formula_literal);
      }

      if (response.success) {
        TnCompat.id_attribute = response.id_attribute;
        if (typeof dp_price_update === 'function') {
          dp_price_update(response.result);
        }
        if (typeof dp_calculation === 'function') {
          dp_calculation(response);
        }
        var result_formatted = response.result_formatted;
        var result_ntx_formatted = response.result_ntx_formatted;
        var result_nr_formatted = response.result_nr_formatted;
        var weight_str = response.weight_str;
        dp_product.showWeight(+response.weight, weight_str);
        if (dp_product.checkVATModule()) {
          if (response.use_taxes) {
            dp_product.showPrice(result_formatted);
            dp_product.showPriceNTX(result_ntx_formatted);
          } else {
            dp_product.showPrice(result_ntx_formatted);
            dp_product.showPriceNTX(result_formatted);
          }
          dp_product.showPriceNR(result_nr_formatted);
        } else {
          dp_product.showPrice(result_formatted);
          dp_product.showPriceNR(result_nr_formatted);
        }
        dp_product.checkStock(response.in_stock);
      }
      //dp_product.setCombinationValues(response.values);
      if (typeof response !== 'undefined' && typeof response.weight !== 'undefined') {
        var weight = DpTools.parseFloat(response.weight);
      }
    })
      .fail(function (jqXHR, textStatus, errorThrown) {
        DpTools.alertAdmin(errorThrown);
      })
      .always(dp_product.enableCartButton);

    DpTools.getPHPVariables(values).done(function (response) {
      if (typeof response !== 'undefined' && typeof response.values !== 'undefined') {
        var values = response.values;
        $('.dp_php_var').each(function () {
          var name = $(this).data('name');
          if (DpTools.isset(values[ name ])) {
            $(this).text(values[ name ]);
          }
        });
        $('.dp_entry').each(function () {
          var name = $(this).data('name');
          if (DpTools.isset(values[ '_' + name ])) {
            $(this).val(values[ '_' + name ]);
            dp_product.dpChange();
          }
        });
        $('.dp_fixed').each(function () {
          var name = $(this).data('name');
          if (DpTools.isset(values[ name ])) {
            var value = values[ name ];
            $(this).text(DpTools.getFloat(value));
          }
        });
        $('.dp_unit_price').each(function () {
          var name = $(this).data('name');
          if (DpTools.isset(values[ 'formatted_' + name ])) {
            $(this).text(values[ 'formatted_' + name ]);
          }
        });
      }
    }).always(dp_product.enableCartButton);

    if (!field_name) {
      DpTools.triggerCustomFunction('attribute', [ TnCompat.getAttributeID() ]);
    }
  },

  getValues: function () {
    var data = {};
    $('.dp_entry').each(function (i, input) {
      var input = $(input);
      var name = input.data('name');
      var value = input.val();

      if (input.hasClass('dp_input')) {
        value = DpTools.parseFloat(value);
      }

      if (input.hasClass('dp_checkbox')) {
        value = +input.prop('checked');
      }

      if (input.hasClass('dp_radio')) {
        value = +input.find('input:checked').val();
      }

      if ((value !== value || value === '') && input.text() !== '') {
        if (input.hasClass('dp_dropdown') || input.hasClass('dp_radio') || input.hasClass('dp_thumbnails')) {
          value = 0;
        } else {
          value = input.text();
        }
      }

      var field_container = input.closest('.dp_field_container');
      var is_fieldcontainer_hidden = field_container.is(':hidden');

      if (is_fieldcontainer_hidden && input.prop('type') !== 'hidden') {
        var type = DpTools.parseInt(input.data('type'));
        if (DpTools.isset(dp_product.null_values[ type ])) {
          value = dp_product.null_values[ type ];
        }
      }

      if (input.hasClass('dp_dropdown')) {
        data[ 'data_select_' + name ] = is_fieldcontainer_hidden ? 0 : input.find('option:selected').data('id_dropdown_option');
        data[ 'data_content_' + name ] = is_fieldcontainer_hidden ? '' : input.find('option:selected').text();
        DpTools.showDropdownIcon(name, data[ 'data_select_' + name ]);
      }

      if (input.hasClass('dp_radio')) {
        // TODO: adapt this
        data[ 'data_radio_' + name ] = is_fieldcontainer_hidden ? 0 : input.find('input:checked').data('id_radio_option');
        data[ 'data_content_' + name ] = is_fieldcontainer_hidden ? '' : input.find('input:checked').closest('label').text().trim();
      }

      if (input.hasClass('dp_thumbnails')) {
        var ul = $('#dp_thumbnails_' + name);
        ul.find('.selected').removeClass('selected');
        var selected_options = input.find('option:selected');
        var id_options = [];
        selected_options.each(function (index, option) {
          var id_option = $(option).data('id_thumbnails_option');
          id_options.push(id_option);
          ul.find('[data-id_thumbnails_option="' + id_option + '"]').parent().addClass('selected');
        });
        data[ 'data_thumb_' + name ] = is_fieldcontainer_hidden ? 0 : id_options;
      }

      if (is_fieldcontainer_hidden || input.is(':disabled') || input.hasClass('dp_hide_input')) {
        data[ 'data_hidden_' + name ] = 1;
      }

      if (input.hasClass('dp_checkbox') && !input.is(':checked')) {
        data[ 'data_hidden_' + name ] = 1;
      }

      data[ name ] = value;
    });
    return data;
  },

  setValues: function (input_fields) {
    // disable change event to avoid triggering price calculation for each field
    dp_product.change = false;

    $('.dp_entry').each(function (i, input) {
      var $input = $(input);
      var name = $input.data('name');
      var input_field = input_fields[ name ];
      if (!input_field) {
        return true;
      }
      var value = input_field.value;
      if ($input.hasClass('dp_checkbox')) {
        $input.prop('checked', +value === 1);
      } else {
        $input.val(value);
      }

      if ($input.hasClass('dp_slider')) {
        $input.closest('.dp_field_container').find('.dp_slider_control').slider('value', value);
      }

      if (input_fields[ 'data_select_' + name ]) {
        var id_object = input_fields[ 'data_select_' + name ].value;
        $('[data-id_dropdown_option="' + id_object + '"]').prop('selected', true).siblings().prop('selected', false);
      }

      if (input_fields[ 'data_radio_' + name ]) {
        var id_object = input_fields[ 'data_radio_' + name ].value;
        $('[data-id_radio_option="' + id_object + '"]').prop('checked', true).siblings().prop('checked', false);
      }

      if (input_fields[ 'data_thumb_' + name ]) {
        var id_object = input_fields[ 'data_thumb_' + name ].value;
        $('[data-id_thumbnails_option="' + id_object + '"]').prop('selected', true).siblings().prop('selected', false);
        $('.dp_thumb_' + id_object).addClass('selected').siblings().removeClass('selected');
      }

      if (input_field.upload) {
        if (input_field.image) {
          $input.val(input_field.image);
        }
        if (input_field.file) {
          $input.val(input_field.file);
        }
      }
    }).trigger('change');

    // enable change event
    dp_product.change = true;
    $('.dp_entry:eq(0)').trigger('change');
  },

  validateInputs: function (can_alert) {
    if (typeof can_alert === 'undefined') {
      can_alert = false;
    }
    var valid = true;
    $('.dp_input_container').removeClass('dp_invalid');

    $('.dp_input')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.val();
        var label = input.data('label');
        if (!value.length) {
          input.closest('.dp_input_container').addClass('dp_invalid');
          DpTools.message('required', {label: label}, input, can_alert);
          valid = false;
        }
      });

    $('.dp_image')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.val();
        var label = input.data('label');
        if (input.hasClass('dp_required')) {
          value = value.replace('upload-', '');
          if (!value.length) {
            input.closest('.dp_input_container').addClass('dp_invalid');
            DpTools.message('required', {label: label}, input, can_alert);
            valid = false;
            //return false;
          }
        }
      });

    $('.dp_file')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.val();
        var label = input.data('label');
        if (input.hasClass('dp_required')) {
          value = value.replace('upload-', '');
          if (!value.length) {
            input.closest('.dp_input_container').addClass('dp_invalid');
            DpTools.message('required', {label: label}, input, can_alert);
            valid = false;
            //return false;
          }
        }
      });

    $('.dp_date')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.val();
        var label = input.data('label');
        if (input.hasClass('dp_required')) {
          value = value.replace('upload-', '');
          if (!value.length) {
            input.closest('.dp_input_container').addClass('dp_invalid');
            DpTools.message('required', {label: label}, input, can_alert);
            valid = false;
            //return false;
          }
        }
      });

    $('.dp_dropdown')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.val();
        var label = input.data('label');
        if (!value.length) {
          input.closest('.dp_input_container').addClass('dp_invalid');
          DpTools.message('select', {label: label}, input, can_alert);
          valid = false;
          //return false;
        }
      });

    $('.dp_radio')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.find('input:checked').val();
        var label = input.data('label');
        if (!value.length) {
          input.closest('.dp_input_container').addClass('dp_invalid');
          DpTools.message('select', {label: label}, input, can_alert);
          valid = false;
          //return false;
        }
      });

    $('.dp_text')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.val();
        var min = DpTools.parseInt(input.data('min'));
        var max = DpTools.parseInt(input.data('max'));
        var label = input.data('label');
        var length = value.length;
        if (length < min) {
          input.closest('.dp_input_container').addClass('dp_invalid');
          DpTools.message('min_text', {label: label, min: min - 1}, input, can_alert);
          valid = false;
          //return false;
        }
        if (min !== max && length > max && max > min) {
          input.closest('.dp_input_container').addClass('dp_invalid');
          DpTools.message('max_text', {label: label, max: max + 1}, input, can_alert);
          valid = false;
          //return false;
        }
        if (input.hasClass('dp_required')) {
          if (!value.length) {
            input.closest('.dp_input_container').addClass('dp_invalid');
            DpTools.message('required', {label: label}, input, can_alert);
            valid = false;
            //return false;
          }
        }
      });

    $('.dp_textarea')
      .each(function (i, input) {
        var input = $(input);
        if (DpTools.isHidden(input)) {
          return true;
        }
        var value = input.val();
        var min = DpTools.parseInt(input.data('min'));
        var max = DpTools.parseInt(input.data('max'));
        var label = input.data('label');
        var length = value.length;
        if (length < min) {
          input.closest('.dp_input_container').addClass('dp_invalid');
          DpTools.message('min_text', {label: label, min: min - 1}, input, can_alert);
          valid = false;
          //return false;
        }
        if (min !== max && length > max && max > min) {
          input.closest('.dp_input_container').addClass('dp_invalid');
          DpTools.message('max_text', {label: label, max: max + 1}, input, can_alert);
          valid = false;
          //return false;
        }
        if (input.hasClass('dp_required')) {
          if (!value.length) {
            input.closest('.dp_input_container').addClass('dp_invalid');
            DpTools.message('required', {label: label}, input, can_alert);
            valid = false;
            //return false;
          }
        }
      });

    if (!valid) {
      return false;
    }

    return valid;
  },

  loadInput: function () {
    if (typeof dp_input !== 'object') {
      return false;
    }
    dp_product.setValues(dp_input);
    dp_product.dpChange();
  },

  loadUrlParams: function () {
    dp_product.setValues(dp_params);
    dp_product.dpChange();
  },

  save: function (callback) {
    if (($('.dp_container').is(':visible') || dp_required) && dp_product.customize) {
      var validate = dp_product.validateInputs(true);
      if (!validate) {
        return false;
      }
      var values = dp_product.getValues();
      var data = {};
      data[ 'dp_id_input' ] = (typeof dp_id_input !== 'undefined') ? dp_id_input : 0;
      data[ 'values' ] = values;
      data[ 'noclone' ] = true;
      data = DpTools.addProductDetails(data);
      dp_product.disableCartButton();
      DpTools.ajaxSave('save_values', data, function (context, response) {
        dp_product.enableCartButton();
        if (response.id_input) {
          DpTools.triggerGlobal('dp.id_input_received', {
            id_input: response.id_input,
            id_attribute: response.id_attribute,
            id_customization: response.id_customization
          });
        }
        if (+dp_id_cart) {
          return;
        }
        customizationId = null;
        $('.product-actions [name="id_customization"]').val(response.id_customization);
        dp_product.addToCart();
        dp_product.response = response;
        if (typeof callback === 'function') {
          callback.call(context, response);
        }
      });
    } else {
      dp_product.addToCart();
    }
    return false;
  },

  submitForm: function (e) {
    var form = $(this);

    e.preventDefault();
    e.returnValue = false;

    dp_product.save(function () {
      form.off('submit');
      form.submit();
      form.on('submit', dp_product.submitForm);
    });

    return false;
  },

  addToCart: function () {
    if (dp_product.isForm) {
      return false;
    }
    if (dp_product.cartHandler) {
      //create a fake click event
      var click = $.Event("click");
      var cart_button = $(dp_product.cartSelector);
      dp_product.cartHandler.call(cart_button, click);
    }
    else {
      $(dp_product.cartSelector).eq(0).trigger('click', [ "dp_click" ]);
    }
  },

  handleCartButtonClick: function (event, data) {
    if (data === 'dp_click') {
      return true;
    }
    event.preventDefault();
    event.stopPropagation();
    dp_product.save();
    return false;
  },

  setCombinationValues: function (values) {
    if (!values) {
      return false;
    }
    var product = DpTools.addProductDetails({});
    var id_attribute = product.id_attribute;
    $.each(values, function (id_combination_value, combination_value) {
      var id_field = combination_value.id_field;
      var value = combination_value.value;
      $('.dp_fixed_' + id_field).val(value).text(value);
    });
  },

  checkVATModule: function () {
    return true;
    return $('#pretaxe_price > span').length > 0;
  },

  showPrice: function (formatted) {
    $('#our_price_display').text(formatted);
    $('.product-prices span[itemprop="price"]').text(formatted);
    dp_product.lastPrice = formatted;
  },

  showPriceNTX: function (formatted_ntx) {
    var html = "<div class=\"st_second_price_box\">" +
      "<span class=\"price st_second_price\">" + formatted_ntx + "</span>" +
      "<span class=\"st_second_price_tax_label st_price_tax_label\">incl. BTW</span></div>";
    $('.tax-shipping-delivery-label').html(html);
  },

  showPriceNR: function (formatted_nr) {
    if ($('#old_price_display .price').length) {
      $('#old_price_display .price').text(formatted_nr);
    } else {
      $('#old_price_display').text(formatted_nr);
    }
    if (TnCompat.isSeven()) {
      $('.product-prices .regular-price').text(formatted_nr);
    }
  },

  showWeight: function (weight, weight_str) {
    $('#dp_weight_str').text(weight_str);
    if (weight) {
      $('.dp_weight_str').removeClass('dp_hidden');
    }
  },

  restorePrice: function () {
    if (dp_product.lastPrice !== null) {
      $('#our_price_display').text(dp_product.lastPrice);
    }
  },

  checkStock: function (in_stock) {
    var cart_button = $(dp_product.cartSelector);
    if (in_stock) {
      $('#dp_oos').hide();
      cart_button.show();
    } else {
      $('#dp_oos').show();
      cart_button.hide();
    }
  },

  checkVisibility: function () {
    var hidden = dp_product.isHidden(0);
    $('.dp_container').toggle(!hidden);

    // no need to hide the fields if everything is hidden
    if (!hidden) {
      $('.dp_field_container').each(function () {
        var field_container = $(this);
        var id_field = +field_container.data('id_field');
        if (id_field) {
          var hidden = dp_product.isHidden(id_field);
          hidden ? field_container.hide() : field_container.show();
        }
      });
    }
  },

  isHidden: function (id_field) {
    var id_attribute = DpTools.parseInt(TnCompat.getAttributeID());
    if (!id_attribute) {
      return false;
    }
    var attribute_has_config = DpTools.isset(dp_product.visibility[ id_attribute ]);
    if (!attribute_has_config) {
      return false;
    }
    var field_has_config = DpTools.isset(dp_product.visibility[ id_attribute ][ id_field ]);
    var field_is_hidden = !DpTools.parseInt(dp_product.visibility[ id_attribute ][ id_field ]);
    return attribute_has_config && field_has_config && field_is_hidden;
  },

  initImageUpload: function () {
    dp_product.loadImages();
    var thumbs = $('.dp_image_thumb');
    if (typeof thumbs.fancybox === 'function') {
      thumbs.fancybox({
        title: ''
      });
    }
    $('.dp_image_uploader').on('click', function () {
      var id_field = $(this).closest('.dp_uploader_div').data('id_field');
      $('.dp_file_input_' + id_field).click();
      return false;
    });
  },

  startImageUpload: function () {
    $('.dp_loader').fadeIn();
    var form = $(this).closest('form');
    var id_field = form.data('id_field');
    var uploader_div = $('.dp_uploader_div_' + id_field);
    form.submit().get(0).reset();
  },

  endImageUpload: function () {
    $('.dp_loader').fadeOut();
    var content = $(this).contents().find('body').text();
    if (!content) {
      return false;
    }
    var response = $.parseJSON(content);
    if (!response) {
      return false;
    }

    if (response.success) {
      //success
      dp_product.setImageUpload(response.id_field, response.image, response.thumb);
    }
    else {
      //error
      var uploader_div = $('.dp_uploader_div_' + response.id_field);
      uploader_div.find('.dp_thumb_container').hide();
      DpTools.alert(response.error);
    }
  },

  setImageUpload: function (id_field, image, thumb) {
    var uploader_div = $('.dp_uploader_div_' + id_field);
    var image_url = dp_module_dir + 'upload/' + image;
    var thumb_url = dp_module_dir + 'upload/' + thumb;
    uploader_div.find('.dp_image').val('upload-' + image).trigger('change');
    uploader_div.find('.dp_thumb_container').css({
      'display': 'inline-block'
    });
    uploader_div.find('.dp_image_thumb').css({
      'background-image': 'url(' + thumb_url + ')'
    }).prop('href', image_url);
  },

  removeImageUpload: function () {
    if (!confirm(dp_message.remove_image_upload)) {
      return false;
    }
    var uploader_div = $(this).closest('.dp_uploader_div');
    uploader_div.find('.dp_image').val('upload-').trigger('change');
    uploader_div.find('.dp_thumb_container').hide();
    uploader_div.find('.dp_image_thumb').css({
      'background-image': ''
    }).prop('href', '#');
    return false;
  },

  loadImages: function () {
    $('.dp_image').each(function () {
      var input = $(this);
      var image = input.val().replace('upload-', '');
      if (image.length) {
        var uploader_div = input.closest('.dp_uploader_div');
        var thumb = DpTools.getThumb(image);
        var thumb = dp_module_dir + 'upload/' + thumb;
        uploader_div.find('.dp_thumb_container').css({
          'display': 'inline-block'
        });
        var image = dp_module_dir + 'upload/' + image;
        uploader_div.find('.dp_image_thumb').css({
          'background-image': 'url(' + thumb + ')'
        }).prop('href', image);
      }
    });
  },

  initFileUpload: function () {
    dp_product.loadFiles();
    var thumbs = $('.dp_file_thumb');
    if (typeof thumbs.fancybox === 'function') {
      thumbs.fancybox({
        title: ''
      });
    }

    $('.dp_file_uploader').on('click', function () {
      var id_field = $(this).closest('.dp_uploader_div').data('id_field');
      $('.dp_file_input_' + id_field).click();
      return false;
    });
  },

  startFileUpload: function () {
    $('.dp_loader').fadeIn();
    var form = $(this).closest('form');
    var id_field = form.data('id_field');
    var uploader_div = $('.dp_uploader_div_' + id_field);
    form.submit().get(0).reset();
  },

  endFileUpload: function () {
    $('.dp_loader').fadeOut();
    var content = $(this).contents().find('body').text();
    if (!content) {
      return false;
    }
    var response = $.parseJSON(content);
    if (!response) {
      return false;
    }

    if (response.success) {
      //success
      dp_product.setFileUpload(response.id_field, response.file);
    }
    else {
      //error
      var uploader_div = $('.dp_uploader_div_' + response.id_field);
      uploader_div.find('.dp_thumb_container').hide();
      DpTools.alert(response.error);
    }
  },

  setFileUpload: function (id_field, file) {
    var uploader_div = $('.dp_uploader_div_' + id_field);
    uploader_div.find('.dp_file').val('upload-' + file).trigger('change');
    uploader_div.find('.dp_thumb_container').css({
      'display': 'inline-block'
    }).prop('title', file);
  },

  removeFileUpload: function () {
    if (!confirm(dp_message.remove_file_upload)) {
      return false;
    }
    var uploader_div = $(this).closest('.dp_uploader_div');
    uploader_div.find('.dp_file').val('upload-').trigger('change');
    uploader_div.find('.dp_thumb_container').hide();
    uploader_div.find('.dp_file_thumb').prop('href', '#');
    return false;
  },

  loadFiles: function () {
    $('.dp_file').each(function () {
      var input = $(this);
      var file = input.val().replace('upload-', '');
      if (file.length) {
        var uploader_div = input.closest('.dp_uploader_div');
        uploader_div.find('.dp_thumb_container').css({
          'display': 'inline-block'
        }).prop('title', file);
      }
    });
  },

  selectThumbnail: function () {
    var element = $(this);
    var id_thumbnails_option = element.data('id_thumbnails_option');
    var list = element.closest('.dp_thumbnails_list');
    var is_multiselect = list.hasClass('dp_multiselect');
    var container = element.closest('.dp_input_container');
    var select = container.find('select');
    var option = select.find('[data-id_thumbnails_option="' + id_thumbnails_option + '"]');
    var new_value = true;
    if (is_multiselect) {
      if (option.prop('selected')) {
        new_value = false;
      }
    }
    option.prop('selected', new_value);
    var li = element.parent();
    new_value ? li.addClass('selected') : li.removeClass('selected');
    if (!is_multiselect) {
      li.siblings().removeClass('selected');
      option.siblings().prop('selected', false);
    }
    select.trigger('change');
    return false;
  }
};

$(dp_product.init);