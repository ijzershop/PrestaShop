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

var dp_history = {

  updateCartStructure: function () {
    dp_history.hideSpecialProduct();
    var dp_cart_divs = $('.dp_cart');
    dp_history.identifyRows(dp_cart_divs);
    dp_cart_divs.each(function () {
      dp_history.setCustomization($(this));
    });
  },

  hideSpecialProduct: function () {
    $('tr:contains("' + product_label + '")').hide();
  },

  setCustomization: function (dp_cart) {
    var input = dp_cart.find('.dp_input_div');
    var customization_row = dp_history.getCustomizationRow(dp_cart);
    if (!dp_history.hasProductRowPrev(customization_row)) {
      dp_history.setProductRow(customization_row);
    }
    var product_row = dp_history.getProductRow(customization_row);
    dp_history.setCustomizationProductRow(customization_row, product_row);
    dp_history.setCustomizationQuantity(customization_row, input);
    dp_history.setProductUnitPrice(customization_row, input);
    dp_history.setProductTotalPrice(customization_row, input);
  },

  setCustomizationProductRow: function (customization_row, product_row) {
    customization_row.data('product_row', product_row);
  },

  setCustomizationQuantity: function (customization_row, input) {
    var quantity = input.data('quantity');
    var product_row = customization_row.data('product_row');
    if (product_row) {
      product_row.find('.order_qte_span').text(quantity);
    }
  },

  setProductUnitPrice: function (customization_row, input) {
    var unit_price = input.data('unit_price');
    var product_row = customization_row.data('product_row');
    if (product_row) {
      product_row.find('label.price').html($(unit_price).text());
    }
  },

  setProductTotalPrice: function (customization_row, input) {
    var total_price = input.data('total_price');
    var product_row = customization_row.data('product_row');
    if (product_row) {
      var unit_price = product_row.find('label.price');
      var total_price_label = unit_price.closest('td').next().find('label.price');
      total_price_label.text(total_price);
    }
  },

  setProductRow: function (customization_row) {
    var product_row = dp_history.getProductRow(customization_row);
    var clone = product_row.clone();
    clone.insertBefore(customization_row);
    return clone;
  },

  getProductRow: function (customization_row) {
    return customization_row.prevAll('tr.product_row:eq(0)');
  },

  hasProductRowPrev: function (customization_row) {
    return customization_row.prev().hasClass('product_row');
  },

  getCustomizationRow: function (dp_cart) {
    return dp_cart.closest('tr');
  },

  identifyRows: function (dp_cart_divs) {
    // identify customization rows
    dp_cart_divs.each(function () {
      dp_history.getCustomizationRow($(this)).addClass('dp_customization_row');
    });
    // identify product rows
    $('#order-detail-content').find('tr:not(.dp_customization_row)').addClass('product_row');
  }

};