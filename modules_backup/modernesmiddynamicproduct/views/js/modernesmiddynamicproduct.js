$(function() {
  function getMoneyString(price) {
    const formatter = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return formatter.format(price);
  }
  //--------------------------- Product list functions
  $(document).on('click', 'button.dynamicproduct-button', function(e) {
    $.ajax({
      url: '/index.php',
      type: 'GET',
      data: 'fc=module&module=modernesmiddynamicproduct&controller=ajax&method=getdynamicproductmodal&product=' + $(this).data('product-id') + '&ajax=true',
      success: function(html) {

        $('#dynamicproduct-modal').html(html);
        $('#dynamicproduct-modal').modal('show');
        _updateFormValuesProduct();
      }
    });
  });

  $(document).on('change', '.modal-dialog #dynamicproductform .dp-entry, .modal-dialog  #dynamicproductform .quantity', function(event) {
    event.preventDefault();
    let elem = $(this);
    let val = Number(elem.val());
    let max = Number(elem.attr('data-max'));
    let min = Number(elem.attr('data-min'));
    if (max > 0) {
      if (val < min) {
        elem.val(min);
      }

      if (val > max) {
        elem.val(max);
      }

    }
    _updateFormValuesProduct($(this));
  });
  $(document).on('click', '#dynamicproduct-modal #dynamicproductform .addToCart', function(event) {
    _setCustomizationProductList();
    event.stopImmediatePropagation();
  });

  function _updateFormValuesProduct(changedFieldElement) {
    $('.modal-body').addClass('updating');
    $.ajax({
        url: '/index.php?fc=module&module=dynamicproduct&controller=calculator&ajax=true&id_lang=1',
        type: 'POST',
        dataType: 'JSON',
        data: _getObjectValuesProduct(changedFieldElement),
      })
      .done(function(e) {
          if (e.success) {
            let inclVat = $('#vat_toggler').prop('checked');
            let weight = Number(e.weight);
            $('#dynamicproductform span.dp-weight').text(weight.toFixed(2));

              if(inclVat){
                $('#dynamicproductform #price_excl_no_addition span.subtotal-inc-price').text(e.formatted_prices.price_ttc_nr);
                $('#dynamicproductform #dynamicproduct_discount_price span.subtotal-inc-price').text('€ ' + (Number(e.final_prices.price_ttc_nr) - Number(e.final_prices.price_ttc)));
                $('#dynamicproductform #total span.subtotal-inc-price').text(e.formatted_prices.price_ttc);
              } else {
                $('#dynamicproductform #price_excl_no_addition span.subtotal-inc-price').text(e.formatted_prices.price_ht_nr);
                $('#dynamicproductform #dynamicproduct_discount_price span.subtotal-inc-price').text('€ ' + (Number(e.final_prices.price_ht_nr) - Number(e.final_prices.price_ht)));
                $('#dynamicproductform #total span.subtotal-inc-price').text(e.formatted_prices.price_ht);
              }
            $('.modal-body').removeClass('updating');
          }
      });
  }

  function _setCustomizationProductList() {
    let formData = _getObjectValuesProduct('', 'customization', 'save_customization', 1);

    $.ajax({
        url: '/index.php?fc=module&module=dynamicproduct&controller=customization&ajax=true&id_lang=1',
        type: 'POST',
        dataType: 'JSON',
        data: formData,
      })
      .done(function(customizationData) {
        let productId = formData.id_product;
        if (customizationData.success === 1) {
          let productBtn = $('.dynamicproduct-button[data-product-id="' + productId + '"]');
          showAddedToCartGlow(productBtn);
          $.ajax({
            url: '/index.php?controller=cart?token='+prestashop.static_token,
            type: 'GET',
            data: {
              ajax: 1,
              action: 'update'
            },
          })
            .done(function(shoppingCartData) {
              let response = JSON.parse(shoppingCartData);
              //Display any messages
              prestashop.emit('updateCart', {
                reason: response
              });
            });
        }
      });
  }
  //---------------------------  End Product list functions

  function _getObjectValuesProduct(changedFieldElement, model, action, addCustomizationToCart) {
    if(typeof addCustomizationToCart === 'undefined'){
      addCustomizationToCart = 0;
    }

    if(typeof model === 'undefined'){
      model = 'calculator';
    }

    if(typeof action === 'undefined'){
      action = 'calculate_result';
    }

    let dp_id_input;
    if (typeof dp_id_input === 'undefined') {
      dp_id_input = null;
    }

    let quantity = $('#dynamicproductform .quantity');
    let productId = $('#dynamicproductform #product-id').val();
    let idCart = $('#dynamicproductform #cart-id').val();
    let dpIdCart = $('#dynamicproductform #dp_cart').val();
    let idCustomer = $('#dynamicproductform #customer-id').val();
    let idCustomization = $('#dynamicproductform #customization-id').val();
    let customizations = []
    customizations.push($('#dynamicproductform #customization-id').val());

    let idInput = $('#dynamicproductform #input-id').val();
    let dpIdInput = $('#dynamicproductform #dp_id_input').val();
    let changedField = '';

    if ($(changedFieldElement).attr('data-name')) {
      changedField = $(changedFieldElement).attr('data-name');
    }

    let data =  {
      'model': model,
      'action': action,
      'changed_field': changedField,
      'id_product': productId,
      'id_customization': idCustomization,
      'id_attribute': 0,
      'dp_id_input': dpIdInput,
      'id_cart': idCart,
      'dp_cart': dpIdCart,
      'ajax': true,
      'hash': prestashop.static_token,
      '_token': prestashop.static_token,
      'dp_customer': idCustomer,
      'quantity': Number(quantity.val()),
      'add_to_cart': addCustomizationToCart,
      'fields[quantity][id_product]': Number(productId),
      'fields[quantity][id_field]': 0,
      'fields[quantity][name]': 'quantity',
      'fields[quantity][value]': Number(quantity.val()),
      'fields[quantity][options]': "[]",
      'fields[quantity][type]': 0,
      'fields[quantity][visible]': Number(quantity.length),
      'fields[quantity][disabled]': quantity.attr('disabled') === undefined ? 0 : Number(quantity.attr('disabled')),
      'fields[quantity][width]': quantity.attr('width') === undefined ? 0 : Number(quantity.attr('width')),
      'fields[quantity][height]': quantity.attr('height') === undefined ? 0 : Number(quantity.attr('height')),
      'fields[quantity][size]': quantity.attr('size') === undefined ? 0 : Number(quantity.attr('size')),
    };

    $('.form-control.dp-entry').each(function(index, item){
      let itemData = JSON.parse(item.dataset.field);

      let itemValue = itemData.value;
      let selectedValue = itemData.selected_options.toString();
      let selectedOptions = "[]";

      if(item.tagName === 'INPUT'){
        itemValue = item.value;
      }

      if(item.tagName === 'SELECT'){
        selectedValue = item.selectedIndex;
        let selectedOptionId = item[selectedValue].id;
        selectedOptions = "[" + selectedOptionId.replace('dp-option-','') + "]";
        itemValue = item.value;
      }

      let entryField = {
        ['fields[' + itemData.name + '][position]'] : itemData.position,
        ['fields[' + itemData.name + '][id_input]'] : idInput,
        ['fields[' + itemData.name + '][id_field]'] : itemData.id_field,
        ['fields[' + itemData.name + '][name]'] : itemData.name,
        ['fields[' + itemData.name + '][label]'] : itemData.label,
        ['fields[' + itemData.name + '][options]'] : itemData.options,
        ['fields[' + itemData.name + '][type]'] : itemData.type,
        ['fields[' + itemData.name + '][visible]'] : itemData.visible,
        ['fields[' + itemData.name + '][data]'] : itemData.data,
        ['fields[' + itemData.name + '][data_obj]'] : itemData.data_obj,
        ['fields[' + itemData.name + '][data_value]'] : itemData.data_value,
        ['fields[' + itemData.name + '][sku]'] : itemData.sku,
        ['fields[' + itemData.name + '][duplicated]'] : itemData.duplicated,
        ['fields[' + itemData.name + '][image_url]'] : itemData.image_url,
        ['fields[' + itemData.name + '][thumb_url]'] : itemData.thumb_url,
        ['fields[' + itemData.name + '][image_size]'] : itemData.image_size,
        ['fields[' + itemData.name + '][value]'] : itemValue,
        ['fields[' + itemData.name + '][display_value]'] : item.display_value,
        ['fields[' + itemData.name + '][value_formatted]'] : itemValue,
        ['fields[' + itemData.name + '][secondary_value]'] : itemData.secondary_value,
        ['fields[' + itemData.name + '][selected_options]'] : selectedOptions
      };
      Object.assign(data, entryField);
    });

    return data;
  }

  // Start product view
  $(document).on('change', '.product-information #dynamicproductform .dp-entry,.product-information #dynamicproductform .quantity', function(event) {
    event.preventDefault();
    var elem = $(this);
    var val = Number(elem.val());
    var max = Number(elem.attr('data-max'));
    var min = Number(elem.attr('data-min'));
    if (max > 0) {
      if (val < min) {
        elem.val(min);
      }

      if (val > max) {
        elem.val(max);
      }

    }
    _updateFormValuesProductView($(this));
  });
  $(document).on('click', '.addToCartProductView', function(event) {
    _setCustomizationProductView();
    event.stopImmediatePropagation();
  });

  function _updateFormValuesProductView(changedFieldElement) {
    $.ajax({
        url: '/index.php?fc=module&module=dynamicproduct&controller=calculator&ajax=true&id_lang=1',
        type: 'POST',
        dataType: 'JSON',
        data: _getObjectValuesProduct(changedFieldElement),
      })
      .done(function(e) {
        if (e.success) {
          let inclVat = $('#vat_toggler').prop('checked');
          let weight = Number(e.weight);

          $('.product-information.row  .dp_weight_str .weight').text(weight.toFixed(2));

          if(inclVat){
            $('.product-information.row .product-price span.inclusive-price').text(getMoneyString(e.final_prices.price_ttc));
          } else {
            $('.product-information.row .product-price span.inclusive-price').text(getMoneyString(e.final_prices.price_ht));
          }
        }
      });
  }

  function _setCustomizationProductView() {
    let formData = _getObjectValuesProduct('', 'customization', 'save_customization', 1);

    $.ajax({
        url: '/index.php?fc=module&module=dynamicproduct&controller=customization&ajax=true&id_lang=1',
        type: 'POST',
        dataType: 'JSON',
        data: formData,
      })
      .done(function(customizationData) {
        // let productId = formData.id_product;
        if (customizationData.success === 1) {
          // let productBtn = $('.dynamicproduct-button[data-product-id="' + productId + '"]');
          $.ajax({
            url: '/index.php?controller=cart?token='+prestashop.static_token,
            type: 'GET',
            data: {
              ajax: 1,
              action: 'update'
            },
          }).done(function(shoppingCartData) {
              let response = JSON.parse(shoppingCartData);
              //Display any messages
              prestashop.emit('updateCart', {
                reason: response
              });
            });
        }
      });
    }
});
