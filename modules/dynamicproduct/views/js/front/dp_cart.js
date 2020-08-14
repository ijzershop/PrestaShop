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

var dp_cart = {

    replace: 1,

    cart_selector: '#cart_summary',
    cart_container: null,

    init: function(){
        dp_cart.setCartSelector();
        dp_cart.updateCartStructure();
        dp_cart.hideSpecialProduct();
        dp_cart.startTimer();
        dp_cart.handleEvents();
    },

    updateCartStructure: function () {
        if (!dp_cart.replace) {
            return false;
        }
        var dp_cart_divs = $('#cart_summary').find('.dp_cart');
        dp_cart_divs.each(function () {
            var customization = $(this);
            var input = customization.find('.dp_input_div');
            var customization_row = customization.closest('tr');
            var product_row = dp_cart.getProductRow(customization_row);
            dp_cart.setCustomizationProductRow(customization_row, product_row);
            dp_cart.setCustomizationQuantity(customization_row, input);
            dp_cart.setProductUnitPrice(customization_row, input);
            dp_cart.setProductTotalPrice(customization_row, input);
            dp_cart.setProductRowIdentifier(product_row, customization_row);
        });
        dp_cart.startProductRowIdentifierMonitor();
    },

    startProductRowIdentifierMonitor: function () {
        var product_rows = $('.dp_monitor_product_row');
        setInterval(function () {
            product_rows.each(function (index, product_row) {
                var product_row = $(product_row);
                var customization_id = product_row.data('customization_id');
                if (!$('#'+customization_id).length) {
                    product_row.fadeOut();
                }
            });
        }, 500);
    },

    setProductRowIdentifier: function (product_row, customization_row) {
        var customization_id = customization_row.prop('id');
        product_row.data('customization_id', customization_id).addClass('dp_monitor_product_row');
    },
    
    updateCustomizations: function (customizations) {
        customizations.each(function () {
            var customization = $(this);
            var id_input = customization.data('id_input');
            var customization_in_cart = dp_cart.cart_container.find('.dp_input_' + id_input);
            customization_in_cart.replaceWith(customization);
        });
    },

    getProductRow: function (customization_row) {
        var product_row = null;
        var product_row_selector = 'cart_item';
        var previous_row = customization_row.prev();
        if (!previous_row.find('.cart_product').length) {
            product_row = previous_row.prevAll('.'+product_row_selector).eq(0);
            product_row = dp_cart.insertProductRowBeforeCustomization(customization_row, product_row);
        } else {
            product_row = previous_row;
        }
        return product_row;
    },

    insertProductRowBeforeCustomization: function(customization_row, product_row) {
        var product_clone = product_row.clone();
        product_clone.insertBefore(customization_row);
        return product_clone;
    },

    setCustomizationProductRow: function (customization_row, product_row) {
        customization_row.data('product_row', product_row);
    },

    setCustomizationQuantity: function (customization_row, input) {
        var quantity = input.data('quantity');
        var product_row = customization_row.data('product_row');
        product_row.find('td.cart_quantity span').text(quantity);
    },

    setProductUnitPrice: function (customization_row, input) {
        var unit_price = input.data('unit_price');
        var product_row = customization_row.data('product_row');
        var unit_price_element = product_row.find('td.cart_unit ul.price');
        if (unit_price_element.length) {
            unit_price_element.html(unit_price);
        } else {
            unit_price = unit_price.replace('<li class="price">', '').replace('</li>', '');
            product_row.find('td.cart_unit .price').html(unit_price);
        }
    },

    setProductTotalPrice: function (customization_row, input) {
        var total_price = input.data('total_price');
        var product_row = customization_row.data('product_row');
        product_row.find('td.cart_total span.price').text(total_price);
    },

    startTimer: function(){
        setInterval(dp_cart.hideSpecialProduct, 500);
    },

    hideSpecialProduct: function(){
        if (window['dp_special']) {
            $('dt[data-id^="cart_block_product_'+dp_special+'_0_"]').hide();
            $('tr[id^="product_'+dp_special+'_0_"]').hide();
            $('.cart_item[id^="product_'+dp_special+'_0_"]').hide();
        }
    },

    refreshInputList: function(){
        $.get(dp_link, {action: 'refresh_input_list', ajax: true}, function(data){
            var customizations = $(data).find('> div');
            dp_cart.updateCustomizations(customizations);
            dp_cart.updateCartStructure();
        });
    },

    handleEvents: function () {
        $(document).ajaxComplete(dp_cart.checkAjaxCall);
    },

    checkAjaxCall: function(event, xhr, settings){
        if (!dp_cart.replace) return false;
        if(settings && typeof settings.data != 'undefined'){
            if(settings.data.indexOf('controller=cart') > -1){
                //fix for page unload
                if(typeof DpTools != 'undefined'){
                    dp_cart.refreshInputList();
                }
            }
        }
    },

    setCartSelector: function () {
        dp_cart.cart_container = $(dp_cart.cart_selector);
    }
};

$(dp_cart.init);