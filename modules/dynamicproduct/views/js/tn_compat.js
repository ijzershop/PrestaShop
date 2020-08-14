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

var TnCompat = {

  id_product: 0,

  id_attribute: 0,

  id_default_image: null,

  isSeven: function () {
    return typeof is_seven !== 'undefined' && is_seven;
  },

  getProduct: function () {
    return $('#product-details').data('product');
  },

  getProductID: function () {
    if (TnCompat.id_product) {
      return TnCompat.id_product;
    }
    if (typeof id_product !== 'number') {
      TnCompat.id_product = $('#add-to-cart-or-refresh input[name=id_product]').val();
      if (!TnCompat.id_product) {
        TnCompat.id_product = $('#form_id_product').val();
      }
    } else {
      TnCompat.id_product = id_product;
    }
    return TnCompat.id_product;
  },

  getAttributeID: function () {
    if ($('#idCombination').length) {
      return +$('#idCombination').val();
    } else {
      return TnCompat.id_attribute;
    }
  },

  getDefaultImage: function () {
    if (ctdTools.isset('idDefaultImage')) {
      return idDefaultImage;
    }
    if (TnCompat.id_default_image !== null) {
      return TnCompat.id_default_image;
    }
    if (product = TnCompat.getProduct()) {
      var images = product.images;
      if (images && images.length) {
        var ln = images.length;
        for (i = 1; i < ln; i++) {
          var image = images[ i ];
          if (image.cover) {
            return TnCompat.id_default_image = image.id_image;
          }
        }
      }
    }
  },

  addProductAttributes: function () {
    var form = $('#add-to-cart-or-refresh');
    if (form.length) {
      var attributes = {};
      var data = form.serializeArray();
      $(data).each(function (key, obj) {
        if (obj.name.indexOf('group[') === 0) {
          attributes[ obj.name ] = obj.value;
        }
      });
      return attributes;
    }
    return null;
  }
};
