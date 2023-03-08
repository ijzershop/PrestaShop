/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */
/* eslint-disable */
import 'bootstrap';
import 'flexibility';
import 'jquery-touchswipe';
import './selectors';
import './responsive';

// import './checkout';
// import './customer';
// import './listing';
// import './product';
// import './cart';

import prestashop from 'prestashop';
import EventEmitter from 'events';
// import DropDown from './components/drop-down';
import Form from './components/form';
import usePasswordPolicy from './components/usePasswordPolicy';
import ProductMinitature from './components/product-miniature';
import ProductSelect from './components/product-select';
// import TopMenu from './components/top-menu';

import './lib/bootstrap-filestyle.min';
import './lib/jquery.scrollbox.min';

// import './components/block-cart';
import $ from 'jquery';
/* eslint-enable */

// "inherit" EventEmitter
// eslint-disable-next-line
for (const i in EventEmitter.prototype) {
  prestashop[i] = EventEmitter.prototype[i];
}

$(document).ready(() => {
  // const dropDownEl = $('.js-dropdown');
  const form = new Form();
  const topMenuEl = $('.js-top-menu ul[data-depth="0"]');
  const productMinitature = new ProductMinitature();
  const productSelect = new ProductSelect();
  form.init();
  productMinitature.init();
  productSelect.init();
  usePasswordPolicy('.field-password-policy');

  $('.carousel[data-touch="true"]').swipe({
    swipe(event, direction) {
      if (direction === 'left') {
        $(this).carousel('next');
      }
      if (direction === 'right') {
        $(this).carousel('prev');
      }
    },
    allowPageScroll: 'vertical',
  });
});



// import '@fortawesome/fontawesome-pro/js/fontawesome.js';
// import '@fortawesome/fontawesome-pro/js/sharp-solid.js';
// import '@fortawesome/fontawesome-pro/js/light.js';
// import '@fortawesome/fontawesome-pro/js/duotone.js';
// import '@fortawesome/fontawesome-pro/js/brands.js';
// import '@fortawesome/fontawesome-pro/js/v4-shims.js';

import '../fontawesome/modified_files/fontawesome';
import '../fontawesome/modified_files/sharp-regular';
import '../fontawesome/modified_files/duotone';
import '../fontawesome/modified_files/brands';

/**
 *
 *
 *
 * Moderne Smid Thema custom javascript start
 *
 *
 *
 */
/*
/*
 * Custom code goes here.
 * A template should always ship with an empty custom.js
 */
$(function () {
//browser update function to check and report outdated browsers
  let $buoop = {
    required: {
      e: 11,
      f: 81,
      o: 68,
      s: 9,
      c: 83
    },
    reminder: 0,
    shift_page_down: true,
    test: false,
    insecure: true,
    unsupported: true,
    api: 2022.07,
    container: document.getElementById('header'),
    text: {
      msg: 'U bezoekt onze webshop momenteel met de {brow_name} browser. Hierdoor kan het zijn dat de webshop niet optimaal word weergegeven.',
      msgmore: '<br/>Omdat wij gebruik maken van de nieuwste technieken om voor u een optimale winkel ervaring te creeren, kunnen we helaas niet alle browser versies ondersteunen.',
      bupdate: 'Update nu uw browser',
      'bignore': 'Negeren',
      'remind': 'U krijgt een herinnering te zien over {days} dagen.',
      'bnever': 'Nooit meer tonen'
    }
  };
//Add swipe function to product thumnails
  $('#product-images-carousel').on('touchstart', function (event) {
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).one('touchmove', function (event) {
      const xMove = event.originalEvent.touches[0].pageX;
      const sensitivityInPx = 5;

      if (Math.floor(xClick - xMove) > sensitivityInPx) {
        $(this).carousel('next');
      } else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
        $(this).carousel('prev');
      }
    });
    $(this).on('touchend', function () {
      $(this).off('touchmove');
    });
  });


  function renderMoneyString(price) {
    const formatter = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    });
    return formatter.format(price);
  }

  $('#clearAllProductsFromCart').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      headers: {'cache-control': 'no-cache'},
      url: prestashop.urls.pages.cart,
      async: true,
      cache: false,
      data: 'deleteAll=1&token=' + prestashop.static_token + '&ajax=true',
      success: function (data) {
        window.location = prestashop.urls.base_url;
      },
    });
  });


  $('#fileUpload').on('change', function (event) {
    event.preventDefault();
    const val = $(this).val();
    $(this).removeClass('is-valid is-invalid');
    if (val) {
      const name = $('#fileUpload')[0].files[0].name;
      const type = $('#fileUpload')[0].files[0].type;
      if ($.inArray(type, ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/dxf', 'application/zip']) !== -1) {
        $(this).siblings('label').text(name);
        $(this).addClass('is-valid');
        $(this).after('<div class="upload-msg valid-feedback">Het bestand is gevalideerd en klaar om opgestuurd te worden.</div>');
      } else {
        $(this).siblings('label').text(' ');
        $(this).addClass('is-invalid');
        $(this).after('<div class="upload-msg invalid-feedback">Het door u geselecteerde bestand heeft niet het juiste formaat. U kunt alleen bestanden met één van de onderstaande (pdf, zip, jpg, png of dxf) formaten meesturen.</div>');
        $(this).val(null);


        // console.log('failed');
      }
    }
  });

  $('#printShoppingCartByEmployee').on('click', function (e) {
    e.preventDefault();
    window.open('/index.php?controller=pdf-physical-order-slip', '_blank');
  });

  $('#printShoppingCartByEmployeeAfterCheckout').on('click', function (e) {
    e.preventDefault();
    const order = $(this).attr('data-order');
    window.open('/index.php?controller=pdf-physical-order-slip?id_order=' + order, '_blank');
  });

  $('#printShoppingCartOnCreditByEmployeeAfterCheckout').on('click', function (e) {
    e.preventDefault();
    const order = $(this).attr('data-order');
    window.open('/index.php?controller=pdf-physical-on-credit-order-slip?id_order=' + order, '_blank');
  });


  $('.user-info').on('click', function (event) {
    event.stopPropagation();
    const clickedBtn = $(this).find('.dropdown');
    if (clickedBtn.hasClass('d-block')) {
      clickedBtn.removeClass('d-block');
      clickedBtn.find('.dropdown-toggle').attr('aria-expanded', 'false');
      clickedBtn.find('.dropdown-menu').removeClass('d-block');
    } else {
      clickedBtn.addClass('d-block');
      clickedBtn.find('.dropdown-toggle').attr('aria-expanded', 'true');
      clickedBtn.find('.dropdown-menu').addClass('d-block');
    }
  });

  // footer-block-top accordion
  $(document.body).on('click', '.title_block', function (event) {
    event.preventDefault();
    const $this = $(this);

    let iconSvg = $this.find('.opener > svg');
    let icon = iconSvg.attr('data-icon');

    console.log([iconSvg]);

    if(icon === 'plus'){
      iconSvg.attr('data-icon', 'minus');
    } else {
      iconSvg.attr('data-icon', 'plus');
    }

    $this.siblings('.footer_block_content').toggleClass('d-sm-block d-sm-none').toggleClass('d-none d-block');
    event.stopImmediatePropagation();
  });

  // Sidebar menu open close submenu
  $('button.arrows').on('click', function (event) {
    const $this = $(this);
    const target = $this.attr('data-target');

    let iconSvg = $this.children('svg');
    let icon = iconSvg.attr('data-icon');

    if(icon === 'plus'){
      iconSvg.attr('data-icon', 'minus');
    } else {
      iconSvg.attr('data-icon', 'plus');
    }

    $this.siblings('.collapse').toggleClass('show');

    event.stopImmediatePropagation();
  });

  $(document.body).on('click', '.shoppingcart-list-block > .menu-title > a#shoppingcart-chevron-close, .shoppingcart-list-block > .menu-title', function (event) {
    event.preventDefault();
    $('html').css({
      'overflow-y': 'scroll',
      'overflow-x': 'hidden',
    });
    $('#shoppingcart-list-items').css({
      'overflow-x': 'hidden',
      'overflow-y': 'hidden',
    });
    $('#shoppingcart-side-panel').addClass('d-none');
    $('.cart_body').css({
      opacity: '0',
      'z-index': '-1',
    });
  });
  $(document.body).on('click', '#my-account-link', function (event) {
    event.stopImmediatePropagation();
  });

  function calcShoppingCartListItemsColumnHeight(extraPadding) {
    var titleHeight = 0;
    if (document.getElementById('shoppingcart-list-title')) {
      titleHeight = document.getElementById('shoppingcart-list-title').clientHeight;
    }

    var headerHeight = 0;
    if (document.getElementById('shoppingcart-list-header-totals')) {
      headerHeight = document.getElementById('shoppingcart-list-header-totals').clientHeight;
    }

    var footerHeight = 0;
    if (document.getElementById('shoppingcart-list-footer-totals')) {
      footerHeight = document.getElementById('shoppingcart-list-footer-totals').clientHeight;
    }

    const totalHeight = titleHeight + headerHeight + footerHeight + extraPadding;
    const value = 'calc(100vh - ' + totalHeight + 'px)';
    return value;
  }

  //Search input
  $(document).on('focusin', '#main-menu-bar .header-search-box .ui-autocomplete-input', function (event) {
    $('#search_widget.ui-front').addClass('elevated-search');
    $('.cart_body').css({
      opacity: '1',
      'z-index': '1500',
    });
    $('#main-menu-bar ul.ui-autocomplete').css('opacity',1);
    $('form.header-search-box span.ui-helper-hidden-accessible').css('clip', 'rect(0 0 0 0)');

    event.stopImmediatePropagation();
  });

  $(document).on('focusout', '#main-menu-bar .header-search-box .ui-autocomplete-input', function (event) {
    $('#search_widget.ui-front').removeClass('elevated-search');
    $('.cart_body').css({
      opacity: '0',
      'z-index': '-1',
    });
    $('form.header-search-box span.ui-helper-hidden-accessible').css('clip', 'rect(0 0 0 0)');
    $('#main-menu-bar ul.ui-autocomplete').css('opacity',0);

    event.stopImmediatePropagation();
  });

//Header shopping cart button
  $(document).on('click', 'div.ajax_cart_bag .top-header-shoppingcart, .nav-link.top-header-shoppingcart', function (event) {
    event.preventDefault();
    let shoppingCartSidePanelElem = $('#shoppingcart-side-panel');

    if (shoppingCartSidePanelElem.hasClass('d-none')) {


      $('html').css({
        'overflow-x': 'hidden',
        'overflow-y': 'hidden',
      });
      if ($('#main-menu-bar').hasClass('is-sticky')) {
        var paddingTop = $('#main-menu-bar').height();
      } else {
        var paddingTop = 0;
      }
      shoppingCartSidePanelElem.removeClass("d-none");
      shoppingCartSidePanelElem.css({'margin-top': paddingTop, 'display': 'block'});

      const listHeight = calcShoppingCartListItemsColumnHeight(paddingTop);
      // console.log([paddingTop,parseInt(paddingTop), listHeight]);
      document.getElementById('shoppingcart-list-items').style.height = listHeight;

      var ulClientHeight = 0;
      if (document.getElementsByClassName('small_cart_product_list').length > 0 && document.getElementsByClassName('small_cart_product_list')[0]) {
        ulClientHeight = document.getElementsByClassName('small_cart_product_list')[0].clientHeight + 15;
      }
      const clientHeight = document.getElementById('shoppingcart-list-items').clientHeight;

      if (ulClientHeight > clientHeight) {
        document.getElementById('shoppingcart-list-items').style.overflowY = 'scroll';
        document.getElementById('shoppingcart-list-items').style.overflowX = 'hidden';
      } else {
        document.getElementById('shoppingcart-list-items').style.overflowY = 'hidden';
        document.getElementById('shoppingcart-list-items').style.overflowX = 'hidden';
      }
      $('.cart_body').css({
        'opacity': '1',
        'z-index': '1500',
      });
    } else {
      $('html').css({
        'overflow-x': 'hidden',
        'overflow-y': 'scroll',
      });
      document.getElementById('shoppingcart-list-items').style.overflowX = 'hidden';
      document.getElementById('shoppingcart-list-items').style.overflowY = 'hidden';
      shoppingCartSidePanelElem.addClass('d-none');
      $('.cart_body').css({
        opacity: '0',
        'z-index': '-1',
      });
    }
    event.stopImmediatePropagation();
  });

  $(window).on('resize', function (e) {
    if (!$('#shoppingcart-side-panel').hasClass('d-none')) {
      $('#shoppingcart-list-items').css({
        'overflow-x': 'hidden',
        'overflow-y': 'scroll',
      });
      var ulClientHeight = 0;
      if (document.getElementsByClassName('small_cart_product_list').length > 0 && document.getElementsByClassName('small_cart_product_list')[0]) {
        ulClientHeight = document.getElementsByClassName('small_cart_product_list')[0].clientHeight + 15;
      }
      var listHeight = 0;
      if (document.getElementById('shoppingcart-list-items') !== null && document.getElementById('shoppingcart-list-items')[0]) {
        listHeight = document.getElementById('shoppingcart-list-items').clientHeight;
      }

      if (listHeight < ulClientHeight) {
        $('#shoppingcart-list-items').css({
          'overflow-x': 'hidden',
          'overflow-y': 'scroll',
        });
      } else {
        $('#shoppingcart-list-items').css({
          'overflow-x': 'hidden',
          'overflow-y': 'hidden',
        });
      }
    }
    e.stopPropagation();
  });

  $('#menu-side-panel > .menu-title > a.menu-chevron-close').on('click', function (event) {
    event.preventDefault();
    if (!$('#navbar-menu-chevron').hasClass('d-none')) {
      $('#navbar-menu-chevron').addClass('d-none');
      $('#side-panel-menu-block').addClass('d-none');
    }
    if (!$('#navbar-search-chevron').hasClass('d-none')) {
      $('#navbar-search-chevron').addClass('d-none');
      $('#side-panel-search-block').addClass('d-none');
    }
    $('.menu_body > #menu-side-panel').toggleClass('d-none');
    $('.cart_body').css({
      opacity: '0',
      'z-index': '-1',
    });

    $('html').css({
      'overflow-x': 'hidden',
      'overflow-y': 'scroll',
    });

    event.stopImmediatePropagation();
  });

  $('.navbar-toggler-icon').on('click', function (event) {
    event.preventDefault();
    $('#navbar-menu-chevron').toggleClass('d-none');
    $('#side-panel-menu-block').toggleClass('d-none');
    if ($('#main-menu-bar').hasClass('is-sticky')) {
      var paddingHeight = 'calc(100vh - 48px - ' + $('#main-menu-bar').height() + ')';
      var paddingTop = '40px';
    } else {
      var paddingHeight = 'calc(100vh - 48px)';
      var paddingTop = '0px';
    }

    $('#side-panel-menu-block').css('height', paddingHeight);
    $('#menu-side-panel').css('top', paddingTop);
    $('#menu-side-panel').toggleClass('d-none');

    if ($('#menu-side-panel').hasClass('d-none')) {
      $('.cart_body').css({
        opacity: '0',
        'z-index': '-1',
      });

      $('html').css({
        'overflow-x': 'hidden',
        'overflow-y': 'scroll',
      });
    } else {
      $('html').css({
        'overflow-x': 'hidden',
        'overflow-y': 'hidden',
      });
      $('.cart_body').css({
        opacity: '1',
        'z-index': '1500',
      });
    }
    event.stopImmediatePropagation();
  });

  $('.navbar-search-icon').on('click', function (event) {
    $('#navbar-search-chevron').toggleClass('d-none');
    $('#side-panel-search-block').toggleClass('d-none');
    if ($('#main-menu-bar').hasClass('is-sticky')) {
      var paddingHeight = 'calc(100vh - 48px - ' + $('#main-menu-bar').height() + ')';
      var paddingTop = '40px';
    } else {
      var paddingHeight = 'calc(100vh - 48px)';
      var paddingTop = '0px';
    }

    $('#side-panel-search-block').css('height', paddingHeight);
    $('#menu-side-panel').css('top', paddingTop);
    $('#menu-side-panel').toggleClass('d-none');

    if ($('#menu-side-panel').hasClass('d-none')) {
      $('.cart_body').css({
        opacity: '0',
        'z-index': '-1',
      });

      $('html').css({
        'overflow-x': 'hidden',
        'overflow-y': 'scroll',
      });
    } else {
      $('html').css({
        'overflow-x': 'hidden',
        'overflow-y': 'hidden',
      });
      $('.cart_body').css({
        opacity: '1',
        'z-index': '1500',
      });
    }
    event.stopImmediatePropagation();
  });

  $(document.body).on('click', '.cart_details_toggle', function (event) {
    const checked = $(this).prop('checked');
    if (checked) {
      $('.cart_price_details').show();
    } else {
      $('.cart_price_details').hide();
    }
    const listHeight = calcShoppingCartListItemsColumnHeight();
    document.getElementById('shoppingcart-list-items').style.height = listHeight;
  });

  $('#search_filters .title').on('click', function (event) {
    event.stopPropagation();
    const clickedElem = $(this);
    const target = clickedElem.attr('data-target');
    clickedElem.find('svg.add').toggleClass('d-none');
    clickedElem.find('svg.remove').toggleClass('d-none');
    $('ul' + target).toggleClass('collapse show');
  });

  $('#search_filters .custom-control-input').on('click', function (event) {
    event.preventDefault();
    const target = $(this).attr('data-search-url');
    window.location = target;
  });

  $('#search_filters .js-search-filters-clear-all').on('click', function (event) {
    event.preventDefault();
    const target = $(this).attr('data-search-url');
    window.location = target;
  });

  // window.onclick = function (event) {
  //   if ($('.cart_body').css('opacity') == 1) {
  //     if (!$(event.target).hasClass('shoppingcart-ellipsis')
  //       && !$(event.target).hasClass('cart_product_item_row')
  //       && !$(event.target).hasClass('shoppingcart-dropdown-menu')
  //       && !$(event.target).hasClass('dropdown-item')
  //     ) {
  //       // close all shoppingcart dropdowns
  //       $('.shoppingcart-ellipsis').removeClass('show');
  //     }
  //   }
  // };

  // $(document.body).on('click', '.cart_product_item_row', function (event) {
  //   if (!$(event.target).hasClass('dropdown-item') && !$(event.target).hasClass('cart_quantity') && !$(event.target).hasClass('updateCartBurron') && !$(event.target).hasClass('fa-check') && !$(event.target).hasClass('dp_url')) {
  //
  //     const elem = $(this).find('.dropdown-menu');
  //     if (elem.is(':visible')) {
  //       $('.shoppingcart-dropdown-menu').hide();
  //     } else {
  //       $('.shoppingcart-dropdown-menu').hide();
  //       elem.toggle();
  //     }
  //   }
  // });

      $(document.body).on('click','a.updateCartBurron svg', function (event) {
        $(this).parents('a.updateCartBurron').click();
        event.stopImmediatePropagation();
      });

  $(document.body).on('click', 'a.updateCartBurron', function (event) {
    const qty = parseInt($(this).parents('.qty_wrap').find('input').val());
    const current = parseInt($(this).attr('data-current-value'));
    const product = parseInt($(this).attr('data-product-id'));
    const cust = parseInt($(this).attr('data-id-customization'));
    const attr = parseInt($(this).attr('data-id-product-attribute'));
    const $input = $(this).parents('.qty_wrap').find('input');
    if (typeof $input.attr('data-stock_quantity') !== undefined && parseInt($input.attr('data-stock_quantity')) < qty && parseInt($input.attr('data-stock_quantity')) !== -1) {
      $input.val($input.attr('data-stock_quantity'));
      $input.closest('.qty_wrap').find('.max_quantity').toggleClass('d-none');
      event.stopPropagation();
      return false;
    }
    var op = 'up';
    if (qty > current) { // add
      var quantity_wanted = qty - current;
    } else { // remove
      var quantity_wanted = current - qty;
      var op = 'down';
    }
    if (quantity_wanted === 0) {
      return false;
    }
    const link = $(this).attr('data-update-url') + '&add=1&action=update&id_product=' + product + '&id_product_attribute=' + attr + '&id_customization=' + cust + '&qty=' + quantity_wanted + '&op=' + op + '&ajax=1';
    $.ajax({
      url: link,
      type: 'POST',
      success: function (json) {
        const response = JSON.parse(json);
        if (!response.hasError) {
          // Display any messages
          prestashop.emit('updateCart', {
            reason: response,
          });
        } else {
          $input.siblings('.error-msg').remove();
          $input.siblings('.input-group-append').after('<small class="error-msg text-danger">' + response.errors[0] + '</small>');

        }
      },
    }).done(function (e) {
      $(this).parents('li').find('.qty_wrap').hide();
      $(this).parents('li').find('.customized_wrap').show();
    });
    event.stopImmediatePropagation();
  });


  $(document.body).on('click', '.shoppingcart-dropdown-menu a.dropdown-item', function (event) {
    const elem = $(this);
    if ($(event.target).hasClass('changeCartProductQty')) {
      $(elem).parents('li').find('.qty_wrap').show();
      $(elem).parents('li').find('.customized_wrap').hide();

      $(elem).parents('.dropdown-menu').toggle();
    } else {
      event.stopImmediatePropagation();
      $.ajax({
        url: $(event.target).attr('data-href'),
        type: 'POST',
        data: {
          ajax: 1,
          action: 'update',
        },
        success: function (json) {
          const response = JSON.parse(json);
          // Display any messages
          prestashop.emit('updateCart', {
            reason: response,
          });
        },
      }).done(function (e) {
        // $(this).parents('li').find('.qty_wrap').hide();
        // $(this).parents('li').find('.customized_wrap').show();
      });
    }
  });

  // show hide password at login
  $('button[data-action="show-password"]').on('click', function () {
    const elm = $(this).closest('.input-group').children('input.js-visible-password');
    if (elm.attr('type') === 'password') {
      elm.attr('type', 'text');
      $(this).html($(this).data('textHide')).text();
    } else {
      elm.attr('type', 'password');
      $(this).html($(this).data('textShow')).text();
    }
  });

  // sticky navbar
  const stickyToggle = function (sticky, stickyWrapper, scrollElement) {
    const stickyHeight = sticky.outerHeight();
    const stickyTop = stickyWrapper.offset().top;
    if (scrollElement.scrollTop() >= stickyTop) {
      stickyWrapper.height(stickyHeight);
      sticky.addClass('is-sticky');
    } else {
      sticky.removeClass('is-sticky');
      stickyWrapper.height('auto');
    }
  };

  $('[data-toggle="sticky-onscroll"]').each(function () {
    const sticky = $(this);
    const stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
    sticky.before(stickyWrapper);
    sticky.addClass('sticky');

    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
      stickyToggle(sticky, stickyWrapper, $(this));
    });
    // On page load
    stickyToggle(sticky, stickyWrapper, $(window));
  });

  // info icon open close
  $(document).on('click', '.info-icon-with-showhide', function (event) {
    event.preventDefault();
    const id = $(this).attr('data-id');
    $('#' + id).toggle();
  });

  $(document).on('change', 'input[name=qty]', function (event) {
    event.preventDefault();


    const quantity = $(this).val();
    const product_id = $(this).attr('data-product-id');
    const data = {
      'product_id': product_id,
      'quantity': quantity,
    };

    $.ajax({
      url: '/module/sawandcutmodule/ajax',
      type: 'GET',
      data: 'method=calculatestaffel&data=' + JSON.stringify(data) + '&ajax=true',
      dataType: 'json',
      success: function (json) {
        if (json.product_price_incl_w_reduction_w_tax !== json.product_price_incl) {
          $('.regular-price[data-product-id="' + json.id_product + '"]').html(renderMoneyString(json.product_price_incl) + '  ');
          $('.inclusive-price[data-product-id="' + json.id_product + '"]').html(renderMoneyString(json.product_price_incl_w_reduction_w_tax) + ' Incl. btw');
          $('.exclusive-price[data-product-id="' + json.id_product + '"]').html(renderMoneyString(json.product_price_incl_w_reduction) + ' Excl. btw');

          if ($('.discount').length > 0) {
            const discountBlock = '<span class="discount discount-amount">Bespaar ' + json.reduction_percentage * 100 + '% korting <br>vanaf ' + json.reduction_label + ' stuks</span>';
            $('.discount').html(discountBlock);
          }
        } else {
          $('.regular-price[data-product-id="' + json.id_product + '"]').html('');
          $('.inclusive-price[data-product-id="' + json.id_product + '"]').html(renderMoneyString(json.product_price_incl_w_reduction_w_tax) + ' Incl. btw');
          $('.exclusive-price[data-product-id="' + json.id_product + '"]').html(renderMoneyString(json.product_price_incl_w_reduction) + ' Excl. btw');
        }
      },
      error: function (json) {
        // console.log('Error occured during validation, pleae contact administrator.');
      },
    });

    event.stopImmediatePropagation();
  });

  $(document).on('change', '.js-cart-line-product-quantity', function (event) {
    const current = parseInt(event.currentTarget.getAttribute('data-current-value'));
    const $input = $(this);
    const value = parseInt(event.currentTarget.value);
    const update = event.currentTarget.getAttribute('data-update-url');
    if (parseInt($input.attr('max')) < value) {
      $input.val($input.attr('max'));
      $input.closest('.row').find('.max_quantity').toggleClass('d-none');
      event.stopPropagation();
      $input.trigger('change');
      return false;
    }


    if (current < value) {
      var newValue = value - current;
      window.location = update + '&qty=' + newValue + '&op=up';
    } else {
      var newValue = current - value;
      window.location = update + '&qty=' + newValue + '&op=down';
    }
  });

  const updateHeaderCart = function (cart) {
    // console.log(cart);
    console.log(cart.subtotals);
    $('#header-cart-vat').text(renderMoneyString(cart.subtotals.tax.amount));
    $('#header-cart-total').text(renderMoneyString(cart.totals.total.amount));

    $('.shoppingcart-header-total-price').text(renderMoneyString(cart.totals.total.amount));

    var countLabel = 'Product ';
    if (parseInt(cart.products_count) > 1) {
      const countlabel = 'Producten ';
    } else {
      var countLabel = 'Product ';
    }


    let productCount = Number(cart.products_count);

    if (cart.products_count > 99) {
      productCount = '99+';
    }


    $('#header-cart-total-products').text(countLabel + '(' + productCount + ')');
    $('.top-header-shoppingcart .amount_circle').text(productCount);

    var totalForAllProducts = 0;
    var productsTotal = 0;
    for (var i = cart.products.length - 1; i >= 0; i--) {
      productsTotal = cart.products[i].price_with_reduction_without_tax * cart.products[i].quantity;
      totalForAllProducts += productsTotal;
    }

    if (parseInt(productsTotal) === 0) {
      $('.top-header-shoppingcart').find('[data-fa-i2svg]').attr({'data-prefix': 'fad', 'data-icon': 'cart-shopping'});
    } else {
      $('.top-header-shoppingcart').find('[data-fa-i2svg]').attr({'data-prefix': 'fasr', 'data-icon': 'cart-shopping'});
    }
    $('#header-cart-subtotal').text(renderMoneyString(totalForAllProducts));

    let shippingCost = cart.subtotals.shipping.amount_without_tax;
    if (shippingCost == 0) {
      $('input.carrier-selection[value="pickup"]').prop('checked', true);
    } else {
      $('input.carrier-selection[value="shipping"]').prop('checked', true);
    }
    $('#header-cart-shipping').text(renderMoneyString(shippingCost));

    // if (totalForAllProducts === 0 || totalForAllProducts >= parseFloat($('#header-cart-small-order-fee').attr('data-amount'))) {
    //   $('#header-cart-vat').css("border-bottom", "2px solid #777777");
    //   $('#header-cart-small-order-fee').hide();
    // } else {
    //   $('#header-cart-vat').css("border-bottom", "none");
    //   $('#header-cart-small-order-fee').show();
    // }
    $('.info-icon-with-showhide').on('click', function (event) {
      event.preventDefault();
      const id = $(this).attr('data-id');
      $('#' + id).toggle();
    });
  };

  function updateSideBarCart(cart) {
    if (!cart) {
      return false;
    }
    return true;
  }

  prestashop.on('updateCart', function (event) {
    prestashop.cart = event.reason.cart;
    if (prestashop.cart) {
      updateHeaderCart(prestashop.cart);
    } else {
      updateHeaderCart(prestashop.summaryDetails);
    }

    const getCartViewUrl = $('.js-cart').data('refresh-url');
    if (!getCartViewUrl) {
      return;
    }

    var requestData = {};
    if (event && event.reason) {
      if (event.reason.idProductAttribute !== undefined) {
        requestData = {
          id_product_attribute: event.reason.idProductAttribute,
          id_product: event.reason.idProduct,
        };
      } else {
        requestData = {
          id_product_attribute: event.reason.id_product_attribute,
          id_product: event.reason.id_product,
        };
      }
    }
    $.post(getCartViewUrl, requestData).then(function (resp) {
      const product = $('a[data-product-id="' + requestData.id_product + '"]');
      showAddedToCartGlow(product);
      if (resp.cart_detailed_totals !== undefined) {
        $('.cart-detailed-totals').replaceWith(resp.cart_detailed_totals);
        $('.cart-summary-items-subtotal').replaceWith(resp.cart_summary_items_subtotal);
        $('.cart-summary-subtotals-container').replaceWith(resp.cart_summary_subtotals_container);
        $('.cart-summary-totals').replaceWith(resp.cart_summary_totals);
        $('.cart-detailed-actions').replaceWith(resp.cart_detailed_actions);
        $('.cart-voucher').replaceWith(resp.cart_voucher);
        $('.cart-overview').replaceWith(resp.cart_detailed);

        $('#product_customization_id').val(0);

        $('.js-cart-line-product-quantity').each(function (index, input) {
          const $input = $(input);
          $input.attr('value', $input.val());
        });

        if ($('.js-cart-payment-step-refresh').length) {
          // we get the refresh flag : on payment step we need to refresh page to be sure
          // amount is correctly updated on payment modules
          refreshCheckoutPage();
        }
      } else { // normal refresh cart
        $('#shoppingcart-side-panel').html(resp.modal);
        $('.cart_details_toggle').on('click', function (event) {
          const checked = $(this).prop('checked');
          if (checked) {
            $('.cart_price_details').show();
          } else {
            $('.cart_price_details').hide();
          }
          const listHeight = calcShoppingCartListItemsColumnHeight();
          document.getElementById('shoppingcart-list-items').style.height = listHeight;
        });
      }

      prestashop.emit('updatedCart', {
        eventType: 'updateCart',
        resp: resp,
      });
    }).fail(function (resp) {
      prestashop.emit('handleError', {
        eventType: 'updateCart',
        resp: resp,
      });
    });

    $('.info-icon-with-showhide').on('click', function (event) {
      event.preventDefault();
      const id = $(this).attr('data-id');
      $('#' + id).toggle();
    });
  });
  $('body').on('focusin', '[name="qty"]', function (event) {
    event.preventDefault();
    this.select();
  });
  // add to cart buttons actions
  $('body').on('click', '[data-button-action="add-to-cart"]', function (event) {
    event.preventDefault();
    $(this).addClass('active');
    const product_id = $(this).attr('data-product-id');
    const max_quantity = parseInt($('#quantity_wanted_' + product_id).attr('max'));
    var quantity = parseInt($('#quantity_wanted_' + product_id).val());

    if (quantity > max_quantity) {
      $('#quantity_wanted_' + product_id).val(max_quantity);
      event.stopPropagation();
      return false;
    }

    if (isNaN(quantity)) {
      quantity = 1;
    }

    const product_customization_id = $('#quantity_wanted_' + product_id).attr('data-product-customization');
    const clickedHref = $(this).attr('href');
    $('svg[data-product-id="' + product_id + '"]').attr('data-icon','rotate');

    if ($('#quantity_wanted_' + product_id).val() > $('[data-stock]').data('stock') && $('[data-allow-oosp]').data('allow-oosp').length === 0) {
      $('[data-button-action="add-to-cart"]').attr('disabled', 'disabled');
    } else {
      const clickedHref = $(this).attr('href');


      const query = {
        id_customization: product_customization_id,
        id_product: product_id,
        ajax: 1,
        add: 1,
        qty: quantity,
        action: 'update',
      };

      $.ajax({
        url: clickedHref + '&id_customization=' + product_customization_id + '&id_product=' + product_id + '&add=1&qty=' + quantity + '&action=update',
        type: 'POST',
        dataType: 'json',
        data: query,
      })
        .done(function (resp) {

          $('a.add-to-cart[data-product-id="' + product_id + '"]').removeClass('active');
          $('svg[data-product-id="' + product_id + '"]').attr('data-icon','cart-shopping');
          if (resp.hasError === true) {
            return false;
          }

          prestashop.emit('updateCart', {
            reason: {
              idProduct: resp.id_product,
              idProductAttribute: resp.id_product_attribute,
              idCustomization: resp.id_customization,
              linkAction: 'add-to-cart',
              cart: resp.cart,
            },
            resp: resp,
          });
        })
        .fail(function (resp) {
          prestashop.emit('handleError', {
            eventType: 'addProductToCart',
            resp: resp,
          });
        });
    }
    event.stopImmediatePropagation();
  });

  function fetchCitties(addresses) {
    const citties = [];
    for (var i = 0; i < addresses.length; i++) {
      citties.push({
        text: addresses[i].city,
        value: addresses[i].city,
      });
    }
    return citties;
  }

  // address forms
  var timeout;
  const delay = 500;
  //Api address check shipping
  $(document.body).on('keyup change input :-webkit-autofill', '#customer_address_form [name="postcode"], #customer_address_form [name="house_number"], #customer_address_form [name="address1"], #customer_address_form [name="house_number_extension"]', function (event) {
    event.preventDefault();

    if (event.currentTarget.name === 'postcode') {
      if (event.currentTarget.value.length > 4) {
        $('[name="postcode"]').val(event.currentTarget.value.replace(/(\d{4})/g, '$1 ').replace(/  +/g, ' '));
      }
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      const postcode = $('[name="postcode"]').val().replace(' ', '');
      const houseNumber = $('[name="house_number"]').val().replace(' ', '');
      const extension = $('[name="house_number_extension"]').val().replace(' ', '');
      // const street = encodeURIComponent($('[name="address1"]').val());
      const street = '';
      const id_country = $('[name="id_country"]').val().replace(' ', '');
      if (postcode.length > 3 || houseNumber.length > 0) {
        validateAddressApi(postcode, street, houseNumber, extension, id_country, event);
      }
      return false;
    }, delay);
  });

  // //Api address check payment
  // $(document.body).on('keyup change input :-webkit-autofill', '#customer_address_form [name="shipping_address[postcode]"], #customer_address_form [name="shipping_address[house_number]"], #customer_address_form [name="shipping_address[address1]"], #customer_address_form [name="shipping_address[house_number_extension]"]', function(event){
  //   event.preventDefault();
  //
  //   if (event.currentTarget.name === 'postcode') {
  //     if (event.currentTarget.value.length > 4) {
  //       $('[name="shipping_address[postcode]"]').val(event.currentTarget.value.replace(/(\d{4})/g, '$1 ').replace(/  +/g, ' '));
  //     }
  //   }
  //
  //   if (timeout) {
  //     clearTimeout(timeout);
  //   }
  //   timeout = setTimeout(function(){
  //     const postcode = $('[name="shipping_address[postcode]"]').val().replace(' ', '');
  //     const houseNumber = $('[name="shipping_address[house_number]"]').val().replace(' ', '');
  //     const extension = $('[name="shipping_address[house_number_extension]"]').val().replace(' ', '');
  //     // const street = encodeURIComponent($('[name="shipping_address[address1]"]').val());
  //     const street = '';
  //     const id_country = $('[name="shipping_address[id_country]"]').val().replace(' ', '');
  //     if (postcode.length > 3 || houseNumber.length > 0) {
  //       validateAddressApi(postcode, street, houseNumber, extension, id_country, "shipping_address");
  //     }
  //     return false;
  //   }, delay);
  // });

  $(document.body).on('click', '.selectStreetAutoFill', function (event) {
    event.preventDefault();
    const streetName = $(this).text();
    $('[name="address1"]').val(streetName).removeClass('is-invalid').addClass('was-validated is-valid');
    $('#suggesstion-box-street').html('');
  });


  function validateAddressApi(postcode, street, houseNumber, extension, country, event) {
    var postC = postcode.replace(' ', '');
    var houseN = houseNumber.replace(' ', '');
    if (extension) {
      extension = extension.replace(' ', '');
    }

    $.ajax({
      url: postcodeApiUrl,
      type: 'GET',
      dataType: 'json',
      data: {
        _token: prestashop.static_token,
        postcode: postcode,
        houseNumber: houseNumber,
        extension: extension,
        street: street,
        id_country: country,
        ajax: true,
      },
    })
      .done(function (e) {
        var isValidForConfirm = false;
        $('.address-error-msg').text(null);

        if (e.valid != false && e.address.length > 0 && e.address[0].hasOwnProperty('nl_sixpp')) { // is een nederlands adres

          $('[name="id_country"]').removeClass('is-invalid').addClass('was-validated is-valid');
          $('[name="postcode"]').removeClass('is-invalid').addClass('was-validated is-valid');
          $('[name="city"]').removeClass('is-invalid').addClass('was-validated is-valid');

          if (e.address[0].city != undefined) {
            $('[name="city"]').val(e.address[0].city).removeClass('is-invalid').addClass('was-validated is-valid');
          }

          if (e.address[0].street != 'undefined') {
            $('[name="address1"]').val(e.address[0].street).removeClass('is-invalid').addClass('was-validated is-valid');
            isValidForConfirm = true;
          } else {
            $('[name="address1"]').val('').removeClass('was-validated is-valid').addClass('is-invalid');
            isValidForConfirm = false;
          }

          if ($('[name="house_number"]').val().length > 0) {
            $('[name="house_number"]').removeClass('is-invalid').addClass('was-validated is-valid');
            $('[name="house_number_extension"]').removeClass('is-invalid').addClass('was-validated is-valid');
            isValidForConfirm = true;
          } else {
            $('[name="house_number"]').addClass('is-invalid');
            $('[name="house_number_extension"]').addClass('is-invalid');
            isValidForConfirm = false;
          }


        } else if (e.valid != false && e.address.length > 0 && e.address[0].hasOwnProperty('be_fourpp')) {

          if (e.address[0].city_nl != undefined) {
            $('[name="city"]').val(e.address[0].city_nl).removeClass('is-invalid').addClass('was-validated is-valid');
          }
          $('[name="address1"]').val(e.address[0].street_nl).removeClass('is-invalid').removeClass('was-validated is-valid');
          isValidForConfirm = true;

          // is een belgisch adres
          $('[name="postcode"]').removeClass('is-invalid').removeClass('was-validated is-valid');

          $('[name="id_country"]').removeClass('is-invalid').addClass('was-validated is-valid');
          $('[name="house_number"]').removeClass('is-invalid').removeClass('was-validated is-valid');

          $('[name="house_number_extension"]').removeClass('is-invalid').removeClass('was-validated is-valid');


        } else if (e.valid != false && e.address.length == 1 && e.address[0].hasOwnProperty('street_nl')) {


          $('[name="address1"]').val(e.address[0].street_nl).removeClass('is-invalid').addClass('was-validated is-valid');
          if ($('[name="house_number"]').val().length > 0) {
            $('[name="house_number"]').removeClass('is-invalid').addClass('was-validated is-valid');
            $('[name="house_number_extension"]').removeClass('is-invalid').addClass('was-validated is-valid');
            isValidForConfirm = true;
          } else {
            $('[name="house_number"]').addClass('is-invalid');

            $('[name="house_number_extension"]').addClass('is-invalid');
            isValidForConfirm = false;
          }
          // is een belgisch adres
        } else if (e.valid != false && e.address.length > 1) {
          isValidForConfirm = false;
          var htmlList = '<ul>';
          for (var i = 0; i < e.address.length; i++) {
            htmlList += '<li class="selectStreetAutoFill">' + e.address[i].street_nl + '</li>';
          }
          htmlList += '</ul>';
          $('#suggesstion-box-street').html(htmlList);
          // is een belgisch adres
        } else {
          if (e.msg == 'Fetching address failed') {
            $('[name="address1"]').val('').addClass('is-invalid').removeClass('was-validated is-valid');
            isValidForConfirm = false;
          }

          if (e.msg !== null && e.msg.hasOwnProperty('field') && e.msg.field !== undefined) {
            isValidForConfirm = false;
          }
          $('[name="postcode"]').removeClass('is-invalid').addClass('was-validated is-valid');

          $('[name="house_number"]').removeClass('is-invalid').removeClass('was-validated is-valid');
          $('[name="house_number_extension"]').removeClass('is-invalid').removeClass('was-validated is-valid');
          $('[name="address1"]').removeClass('is-invalid').removeClass('was-validated is-valid');

          $('[name="id_country"]').removeClass('is-invalid').addClass('was-validated is-valid');

          $('[name="city"]').removeClass('is-invalid').addClass('is-valid');

          if (e.msg !== 'ok') {
            if (e.msg !== null && e.msg.hasOwnProperty('field') && e.msg.field) {
              if (e.msg.field === 'house_number') {
                $('[name="house_number_extension"]').removeClass('is-valid').addClass('is-invalid');
                $('[name="address1"]').removeClass('is-valid').addClass('is-invalid');
                $('[name="address1"]').siblings('.address-error-msg').text(null).text('Het huisnummer kan niet gevonden worden mogelijk is de straat onjuist');
              }
              $('[name="' + e.msg.field + '"]').removeClass('is-valid').addClass('is-invalid');
              $('[name="' + e.msg.field + '"]').siblings('.address-error-msg').text(null).text(e.msg.msg);
              isValidForConfirm = false;
            }
          } else if (e.msg === 'ok' && e.valid) {
            $('[name="id_country"]').removeClass('is-invalid').addClass('was-validated is-valid');
            $('[name="postcode"]').removeClass('is-invalid').addClass('was-validated is-valid');

            if ($('[name="house_number"]').val().length > 0) {
              $('[name="house_number"]').removeClass('is-invalid').addClass('was-validated is-valid');
              $('[name="house_number_extension"]').removeClass('is-invalid').addClass('was-validated is-valid');
            } else {
              $('[name="house_number"]').addClass('is-invalid');
              $('[name="house_number_extension"]').addClass('is-invalid');
            }
            $('[name="city"]').removeClass('is-invalid').addClass('was-validated is-valid');
            $('[name="address1"]').removeClass('is-invalid').addClass('was-validated is-valid');
            isValidForConfirm = true;
          }
        }

        if (isValidForConfirm) {
          disEnConfirmButtonAddress(false);

          $('[name="id_country"]').removeClass('is-invalid').addClass('was-validated is-valid');
          $('[name="postcode"]').removeClass('is-invalid').addClass('was-validated is-valid');
          $('[name="city"]').removeClass('is-invalid').addClass('was-validated is-valid');
          $('[name="id_country"]').removeClass('is-invalid').addClass('was-validated is-valid');
        } else {
          disEnConfirmButtonAddress(true);

          $('[name="id_country"]').addClass('is-invalid').removeClass('was-validated is-valid');
          $('[name="postcode"]').addClass('is-invalid').removeClass('was-validated is-valid');
          $('[name="city"]').addClass('is-invalid').removeClass('was-validated is-valid');
          $('[name="id_country"]').addClass('is-invalid').removeClass('was-validated is-valid');
        }
      })
      .fail(function (e) {
        disEnConfirmButtonAddress(true);
        $('[name="address1"]').addClass('is-invalid').removeClass('was-validated is-valid');
        $('[name="house_number"]').addClass('is-invalid').removeClass('was-validated is-valid');
        $('[name="house_number_extension"]').addClass('is-invalid').removeClass('was-validated is-valid');
        $('[name="id_country"]').addClass('is-invalid').removeClass('was-validated is-valid');
        $('[name="postcode"]').addClass('is-invalid').removeClass('was-validated is-valid');
        $('[name="city"]').addClass('is-invalid').removeClass('was-validated is-valid');
        $('[name="id_country"]').addClass('is-invalid').removeClass('was-validated is-valid');
      });

    event.stopImmediatePropagation();
  }


  function disEnConfirmButtonAddress(disable) {
    // console.log(disable);
    if (disable) {
      $('button[name="confirm-addresses"]').attr('disabled', true);
    } else {
      $('button[name="confirm-addresses"]').attr('disabled', false);
    }
  }


  $('.delivery-option input[type=radio]').on('click', function (event) {
    if (!$(this).hasClass('add2order') && (parseInt($(this).val()) == shoppingcart.add2order_carrier)) {
      $('#added_to_order').val($(this).attr('data-order-reference'));
    }
    if (!$(this).hasClass('add2order') && (parseInt($(this).val()) != shoppingcart.add2order_carrier)) {
      $('#added_to_order').val(null);
    }

    if ($(this).hasClass('add2order')) {
      $('#order_number_validate').show();
      $('#add2order-msg').hide();
    } else {
      $('#order_number_validate').hide();
      $('#add2order-msg').show();
    }
  });

  $(document).on('click', 'button[name="confirmDeliveryOption"]', function (event) {
    if ($('input[type=radio]:checked').hasClass('add2order')) {
      if ($('#added_to_order').val().length <= 0) {
        event.preventDefault();
        htmlBlock = '<div class="alert alert-danger" role="alert"><strong>Er is geen bestelling geselecteerd!</strong> Zoek eerst een nog lopende bestelling of selecteer een andere verzendmethode</div>';
        $('#desired_reference_error').html(htmlBlock);
      }
    }
  });

  function searchForAddToOrder(event){
    event.preventDefault();
    const desiredReference = $('#desired_reference').val();

    if (typeof url === 'undefined') {
      var url = '/index.php?fc=module&module=addtoorder&controller=ajax&id_lang=1';
    }

    $.ajax({
      url: url,
      type: 'GET',
      data: {
        reference: desiredReference,
        method: 'fetchbyreference',
        ajax: true,
      },
    })
      .done(function (e) {
        var htmlBlock = '';
        $('#desired_reference_error').hide();
        $('#order_number_validate').find('.errorsmall').remove();
        $('#desired_reference').removeClass('error-form');
        if (e.length > 0) {
          addToOrderAddress.city = e[0].address.city;
          addToOrderAddress.country = e[0].address.id_country;
          addToOrderAddress.postcode = e[0].address.postcode;
          addToOrderAddress.address1 = e[0].address.address1;
          addToOrderAddress.house_number = e[0].address.house_number;
          addToOrderAddress.house_number_extension = e[0].address.house_number_extension;
          addToOrderAddress.company = e[0].address.company;
          addToOrderAddress.firstname = e[0].address.firstname;
          addToOrderAddress.lastname = e[0].address.lastname;
          addToOrderAddress.phone = e[0].address.phone;
          htmlBlock = 'De bestelling met referentie <strong>' + desiredReference + '</strong> is nog beschikbaar voor gratis toevoegen. ' +
            'De bestelling word geleverd op postcode <br/>' +
            '<span style="font-size:16px;" class="col-6 badge badge-success">' + e[0].postcode + '</span>' +
            '<span class="info-icon-add-to-order" data-id="add_to_order_info"><i class="icon-info ml-2"></i></span>' +
            '<br/>' +
            '<div style="display:none;" class="border-bottom-0 pb-1 row" id="add_to_order_info">' +
            '<span class="col-12 text-left width-100" style="color:blue;">Vanwege de AVG regels kunnen wij u niet meer informatie verschaffen dan de postcode. Kijk daarom de postcode en uw referentie goed na voordat u deze bestelling er aan toevoegd.</span>' +
            '</div><br/>'
            + '<div class="btn-group w-100"><a id="searchOrderByReferenceAgain" class="btn btn-sm btn-primary text-white" href="#"><i class="fasr fa-magnifying-glass"></i> Opnieuw Zoeken</a>';

          $('#order_number_validate').hide();
          $('#order_number_show_block').html(htmlBlock);
          $('#order_number_show').show();
          $('#added_to_order').val(desiredReference);
          $('.add-to-existing-order-form .add2order-allowed').removeClass('not-allowed');
          $('.add-to-existing-order-form input[type="radio"]').removeAttr('disabled').prop('checked', true);
          $('#desired_reference').addClass('ok-form');
        } else {
          htmlBlock = '<div class="alert alert-danger" role="alert"><strong>De gewenste bestelling is niet meer voor toevoegen beschikbaar!</strong> Zoek nogmaal op referentie of selecteer een andere verzendmethode</div>';
          $('#desired_reference_error').html(htmlBlock);
          $('#desired_reference_error').show();
          $('#desired_reference').addClass('error-form');
        }

        $('#searchOrderByReferenceAgain').on('click', function (event) {
          event.stopImmediatePropagation();
          $('#order_number_show').hide();
          $('#added_to_order').val(null);
          $('#order_number_show_block').html('');
          $('#order_number_validate').show();
        });

        $('.info-icon-add-to-order').on('click', function (event) {
          event.preventDefault();
          const block = $(this).attr('data-id');
          $('#' + block).toggle();
        });
      })
      .fail(function (e) {
        // console.log(['error', e]);
      });
  }


  // toevoegen aan order check
  // test reference failing: YS-53931, success: YS-53936, YS-53935
  $(document).on('click', '#search_order_for_shipping', function (event) {
      return searchForAddToOrder(event);
  });


  // toevoegen aan order check
  // test reference failing: YS-53931, success: YS-53936, YS-53935
  $(document).on('keyup', '#desired_reference', function (event) {
    if($(this).val().length === 9){
      $('#search_order_for_shipping').trigger('click');
    }
  });

  $('.showOrderTracking').on('click', function (event) {
    event.preventDefault();
    const ref = $(this).attr('data-order-reference');
    const history = JSON.parse($(this).attr('data-history'));
    $('#trackingModalLabel').text('Status informatie voor bestelling ' + ref);

    if (typeof url === 'undefined') {
      var url = '/index.php?fc=module&module=koopmanorderexport&controller=ajax&id_lang=1';
    }

    $.ajax({
      url: url,
      type: 'GET',
      data: {
        reference: ref,
        method: 'orderstatus',
        ajax: true,
      },
    }).done(function (e) {
      const data = JSON.parse(e);
      if (data.hasOwnProperty('error')) {
      } else {
        $('#trackingModalBarcode').text(data.barcode);

        if (data.package.weight !== '') {
          $('#trackingModalWeight').html(data.package.weight + '<sub>Kg</sub>');
        } else {
          $('#trackingModalWeight').html('');
        }

        if (data.package.length !== '' && data.package.height !== '') {
          $('#trackingModalPackageSize').html(data.package.length + '<small>cm</small> x ' + data.package.height + '<small>mm</small>');
        } else {
          $('#trackingModalPackageSize').html('');
        }

        if (data.delivered.signature_name === '') {
          $('#trackingModalDeliveryTimeEstimate').text(data.scheduled_delivery_moment.planned_delivery_date + ' tussen ' + data.scheduled_delivery_moment.from + ' - ' + data.scheduled_delivery_moment.to);
          $('#trackingModalDelivered').hide();

          $('#trackingModalSignature').html('');
          $('#trackingModalDeliveredOn').text('');
        } else {
          $('#trackingModalEstimateDelivery').hide();
          $('#trackingModalDelivered').show();
          $('#trackingModalSignatureBox').show();
          $('#trackingModalSignature').html('<img src="data:image/jpeg;base64,' + data.delivered.signature + '" class="w-100 border" alt="De handtekening van de ontvanger"><br><strong class="w-100">' + data.delivered.signature_name + '</strong>');
          $('#trackingModalDeliveredOn').text(data.delivered.delivered_at + ' om ' + data.delivered.delivered_on);

          $('#trackingModalDeliveryTimeEstimate').text('');
        }

        const latestHistory = data.history[data.history.length - 1];
        for (var i = 0, length = data.history.length; i < length; i++) {
          // console.log([latestHistory, data.history]);

          setTrackingLabel('#trackingModalOrderReceived', 'done');

          switch (data.history[i].state_id) {
            case '1': // Wachtend op betaling
              if (latestHistory.state_id === '1') {
                setTrackingLabel('#trackingModalPaymentReceived', 'failed');
              } else {
                setTrackingLabel('#trackingModalPaymentReceived', 'done');
              }
              break;
            case '2': // Betaling aanvaard
              setTrackingLabel('#trackingModalPaymentReceived', 'done');
              break;
            case '3': // Word voorbereid
              if (latestHistory.state_id === '3') {
                setTrackingLabel('#trackingModalOrderPicked', 'active');
              } else {
                setTrackingLabel('#trackingModalOrderPicked', 'done');
              }

              break;
            case '4': // Verzonden
              if (latestHistory.state_id === '4') {
                setTrackingLabel('#trackingModalOrderTransferredToTransmission', 'active');
              } else {
                setTrackingLabel('#trackingModalOrderTransferredToTransmission', 'done');
              }

              break;
            case '5': // Afgeleverd
              setTrackingLabel('trackingModalOrderDeliverd', 'done');
              break;
            case '6': // Geannulleerd
              setTrackingLabel('', 'done');
              break;
            case '7': // Terugbetaald
              if (latestHistory.state_id === '4') {
                setTrackingLabel('', 'done');
              } else {

              }
              break;
            case '8': // Betalingsfout
              if (latestHistory.state_id === '4') {
                setTrackingLabel('', 'done');
              } else {

              }
              break;
            case '9': // Momenteel in backorder (betaald)
              if (latestHistory.state_id === '4') {
                setTrackingLabel('', 'done');
              } else {

              }
              break;
            case '10': // In afwachting van bankoverschrijving
              if (latestHistory.state_id === '4') {
                setTrackingLabel('', 'done');
              } else {

              }
              break;
            case '11': // Betaling op afstand aanvaard
              if (latestHistory.state_id === '4') {
                setTrackingLabel('', 'done');
              } else {

              }
              break;
            case '12': // Momenteel in backorder (niet betaald)
              if (latestHistory.state_id === '4') {
                setTrackingLabel('', 'done');
              } else {

              }
              break;
            case '13': // Wachtend op bevastiging (rembours)
              if (latestHistory.state_id === '4') {
                setTrackingLabel('', 'done');
              } else {

              }
              break;
            case '14': // Klaar voor verzending
              if (latestHistory.state_id === '14') {
                setTrackingLabel('#trackingModalOrderReadyForShipping', 'active');
              } else {
                setTrackingLabel('#trackingModalOrderReadyForShipping', 'done');
              }
              break;

            // /Transmission stattussen
            case '20': // Op depot in friesland
              if (latestHistory.state_id === '20') {
                setTrackingLabel('#trackingModalOrderTransferredToTransmission', 'active');
              } else {
                setTrackingLabel('#trackingModalOrderTransferredToTransmission', 'done');
              }
              break;
            case '30': // Op uitleverings depot
              if (latestHistory.state_id === '30') {
                setTrackingLabel('#trackingModalOrderArivedTransmissionDepot', 'active');
              } else {
                setTrackingLabel('#trackingModalOrderArivedTransmissionDepot', 'done');
              }
              break;
            case '188': // In uitlevering
              if (latestHistory.state_id === '188') {
                setTrackingLabel('#trackingModalOrderDeliveryOnRoute', 'active');
              } else {
                setTrackingLabel('#trackingModalOrderDeliveryOnRoute', 'done');
              }
              break;
            case '39': // Afgeleverd
              setTrackingLabel('#trackingModalOrderDeliverd', 'done');
              break;
            case '0': // Afgeleverd
              setTrackingLabel('#trackingModalOrderDeliverd', 'done');
              break;
            // Default value
            default:
              // statements_def
              break;
          }
        }
        // $('#trackingModalOrderReceived').text();
        // $('#trackingModalPaymentReceived').text();
        // $('#trackingModalOrderPicked').text();
        // $('#trackingModalOrderReadyForShipping').text();
        // $('#trackingModalOrderTransferredToTransmission').text();
        // $('#trackingModalOrderArivedTransmissionDepot').text();
        // $('#trackingModalOrderDeliveryOnRoute').text();
        // $('#trackingModalOrderDeliverd').text();
      }
      // console.log(e);
    });
  });

  function setTrackingLabel(id, className) {
    if (!$(id).hasClass(className)) {
      $(id).addClass(className);
    }
  }

  // Faq page toggle
  $('.page-cms').on('click', '.accordion .faq-button', function (event) {
    event.stopImmediatePropagation();
    // console.log($(this).data());
    const id = $(this).data('target');
    $(this).toggleClass('collapsed');
    $(id).toggle();
  });

  $('#facets .nav-link').on('click', function (event) {
    event.stopImmediatePropagation();
    const clickedBtn = $(this);
    const id = '#facet_' + clickedBtn.attr('id');
    if (clickedBtn.siblings('.dropdown-menu').length > 0) {
      if (clickedBtn.siblings('.dropdown-menu').hasClass('d-block')) {
        $('#facets .nav-item .dropdown-menu').removeClass('d-block');
      } else {
        $('#facets .nav-item .dropdown-menu').removeClass('d-block');
        clickedBtn.siblings('.dropdown-menu').addClass('d-block');
      }
      event.preventDefault();
      $('body, html').animate({
        scrollTop: $(id).offset().top - 110,
      }, 800);
    }
  });

  $('.doFilter').on('click', function (event) {
    event.preventDefault();
    const id = $(this).attr('data-filter-id');
    var searchQuery = '';

    $('.facet-list').each(function (index, masterEl) {
      if (searchQuery === '') {
        searchQuery += masterEl.dataset.facetType.replace(' ', '+');
        $(masterEl).find('[type=checkbox]:checked').each(function (index, el) {
          searchQuery += '-' + el.dataset.filterValue.replace(' ', '+');
        });
      } else {
        searchQuery += '/' + masterEl.dataset.facetType.replace(' ', '+');
        $(masterEl).find('[type=checkbox]:checked').each(function (index, el) {
          searchQuery += '-' + el.dataset.filterValue.replace(' ', '+');
        });
      }
    });
    const match = RegExp('[?&]q=([^&]*)').exec(prestashop.urls.current_url);
    var prefix = '';

    if (match !== null) {
      if (match[0].indexOf('?') !== -1) {
        prefix = '?q=';
      } else {
        prefix = '&q=';
      }
      window.location = prestashop.urls.current_url.replace(/[?&]q=([^&]*)/, prefix + searchQuery);
    } else if (prestashop.urls.current_url.indexOf('?') > -1) {
      window.location = prestashop.urls.current_url + '&q=' + searchQuery.replace(' ', '+');
    } else {
      window.location = prestashop.urls.current_url + '?q=' + searchQuery.replace(' ', '+');
    }
  });
});



var showAddedToCartGlow = function (caller_element) {
  var i = 1;
  var times = 0;

  var glowCircle = $('.amount_circle');
  // var topHeaderCart = $('#top-header-shoppingcart');


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


// Voeg regel toe aan winkel wagen
$(document).on('click', '#addCustomProductByEmployee', function (event) {
  event.stopImmediatePropagation();

  var rowId = Math.random().toString(36).substr(2, 9);
  const cart = $(this).attr('data-cart');
  const htmlBlock = '<li class="cart-item w-100 p-2"> ' +
    '<div class="product-line-grid col-12">' +
    '<div class="row pb-1"> ' +
    '<input type="text" class="col-12 form-control" name="custom_product_label" placeholder="Titel"/> ' +
    '</div> ' +
    '<div class="row"> ' +
    '<div class="product-line-grid-body col-12 text-center text-sm-left"> ' +
    '<div class="row"> <div class="col-3 pl-0"> ' +
    '<input type="number" class="form-control" min="1" step="0.5" name="custom_product_total" placeholder="Aantal"/> </div>' +
    '<div class="col-5 mx-auto pr-0 pl-0"> <div class="input-group"><div class="input-group-prepend">' +
    '<span class="input-group-text">€</span></div>' +
    '<input type="number" min="0.05" max="999999999999" step="0.05" class="form-control" name="custom_product_price" placeholder="Prijs"/>' +
    '<div class="input-group-append" id="tax_check" data-id="' + rowId + '">' +
    '<span class="input-group-text" id="custom_product_tax_text">excl. btw</span>' +
    '<span class="input-group-text"><input name="custom_product_tax_checkbox" id="custom_product_tax_checkbox"  data-id="' + rowId + '" type="checkbox" aria-label="incl./excl btw checkbox"></span>' +
    '</div>' +
    '</div> ' +
    '</div><div class="col-3 pr-0"> <div class="btn-group float-right"> ' +
    '    <div class="onoffswitch float-right">' +
    '        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" data-id="' + rowId + '" id="switch_' + rowId + '" tabindex="0" checked>' +
    '        <label class="onoffswitch-label mb-0" for="switch_' + rowId + '">' +
    '            <span class="onoffswitch-inner"></span>' +
    '            <span class="onoffswitch-switch"></span>' +
    '        </label>' +
    '    </div>' +
    '<button  data-cart="' + cart + '" class="btn btn-secondary btn-danger removeCustomProductEmployee"><i class="fasr fa-xmark"></i></button> ' +
    '<button data-cart="' + cart + '" class="btn btn-secondary btn-success saveCustomProductEmployee" data-id="' + rowId + '"><i class="fasr fa-check"></i></button> ' +
    '</div></div></div>' +
    '</div>' +
    '<div class="product-line-grid-left col-12 mt-1"> ' +
    '<div class="row"> ' +
    '<textarea class="col-12 form-control customer_product_description" rows="5" name="custom_product_description" id="' + rowId + 'custom_product_description" placeholder="Omschrijving"></textarea> ' +
    '</div></div>' +
    '<div class="row"><hr class="col-12"/></div></div></div></li>';

  var cartItems = '<ul class="cart-items list-unstyled col-12"></ul>';
  if ($('.cart-overview.js-cart.row .cart-items').length === 0) {
    $('.cart-overview.js-cart.row .no-items').remove();
    $('.cart-overview.js-cart.row').append(cartItems);
  }
  $('.cart-overview.js-cart.row .cart-items').append(htmlBlock);

  tinymce.suffix = '.min';
  tinymce.baseURL = window.location.origin + '/js/tiny_mce';
  tinymce.init({
    theme_url: '/js/tiny_mce/themes/silver/theme.min.js',
    theme: 'silver',
    relative_urls: true,
    remove_script_host: false,
    selector: '#' + rowId + 'custom_product_description',
    branding: false,
    toolbar_mode: 'sliding',
    menubar: false,
    width: "100%",
    plugins: 'lists fullscreen',
    toolbar: 'fullscreen | bold italic underline striketrough subscript superscript | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent'
  });

  $(document).on('click', '#custom_product_tax_checkbox', function (e) {
    var checked = $(this).prop('checked');
    if (checked) {
      $('#custom_product_tax_text').text('incl. btw');
    } else {
      $('#custom_product_tax_text').text('excl. btw');
    }
  });

  $(document).on('change', '.onoffswitch-checkbox', function (e) {

    var rowId = $(this).attr('data-id');
    var checked = $(this).is(':checked');

    if (checked) {
      $('#custom_product_tax_checkbox[data-id="' + rowId + '"]').prop('checked', false);
    } else {
      $('#custom_product_tax_checkbox[data-id="' + rowId + '"]').prop('checked', false);
    }
  });


});


$(document).on('click', '.removeCustomProductEmployee', function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  const parentLI = $(this).parents('li');
  parentLI.remove();
});
$(document).on('click', '.saveCustomProductEmployee', function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  var rowId = $(this).attr('data-id');
  const parentRow = $(this).parents('.product-line-grid');
  const label = parentRow.find('[name="custom_product_label"]').val();
  const qty = parentRow.find('[name="custom_product_total"]').val();
  const price = parentRow.find('[name="custom_product_price"]').val();
  const switchInput = parentRow.find('[name="onoffswitch"]').is(':checked');
  const withTax = parentRow.find('[name="custom_product_tax_checkbox"]').is(':checked');

  parentRow.find('.error-msg-custom-product').remove();

  if (isNaN(Number(qty))) {
    parentRow.prepend('<span class="text-danger row mb-1 error-msg-custom-product">Er is geen aantal ingevuld</span>')
    return;
  }

  if (isNaN(Number(price))) {
    parentRow.prepend('<span class="text-danger row mb-1 error-msg-custom-product">Er is geen prijs ingevuld</span>')
    return;
  }

  if (label.length == 0) {
    parentRow.prepend('<span class="text-danger row mb-1 error-msg-custom-product">Er is geen titel ingevuld</span>')
    return;
  }

  var description = tinymce.get(rowId + "custom_product_description").getContent();

  const url = '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1';

  $.ajax({
    url: url,
    type: 'POST',
    data: {
      _token: prestashop.static_token,
      action: 'add_custom_product_to_cart',
      label: label,
      qty: qty,
      price: price,
      description: description,
      switchinput: switchInput,
      with_tax: withTax,
    },
  })
    .done(function (e) {
      location.reload();
    })
    .fail(function () {
      // console.log('error');
    });


});


// $(document).on('submit', '.contact-form form', function(event) {
//   console.log('clicked')
//   var postalCodeInput = $('[name="postalcode"]');
//   if(postalCodeInput.val() == ""){
//     event.preventDefault();
//     postalCodeInput.addClass('is-invalid');
//   } else {
//     postalCodeInput.removeClass('is-invalid');
//   }

// });

function removeDiscount(id_cart_rule) {
  $.ajax({
    type: "POST",
    headers: {
      "cache-control": "no-cache"
    },
    url: '/index.php?fc=module&module=supercheckout&controller=supercheckout',
    async: true,
    cache: false,
    data: '&ajax=true&deleteDiscount=' + id_cart_rule,
    dataType: 'json',
    beforeSend: function () {
      $('#cart_update_warning .permanent-warning').remove();
      // $('.kb_velsof_sc_overlay').show();$('.pay-loader').show();
      $('#confirmLoader').show();
    },
    complete: function () {
      //$('.kb_velsof_sc_overlay').hide();$('.pay-loader').hide();
      $('#confirmLoader').hide();
    },
    success: function (json) {
      if (json['success'] != undefined) {
        notifyAlert(notification, json['success'], 'success');
        $('#discount_name').attr('value', '');
        loadCarriers();
      } else if (json['error'] != undefined) {
        $('#cart_update_warning').html('<div class="permanent-warning">' + json['error'] + '</div>');
      }
      $('#highlighted_cart_rules').html(json['cart_rule']);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      var error = sprintf(ajaxRequestFailedMsg, XMLHttpRequest, textStatus);
      $('#cart_update_warning').html('<div class="permanent-warning">' + error + '</div>');
      //$('.kb_velsof_sc_overlay').hide();$('.pay-loader').hide();
    }
  });
}

//Home zekerheid blokken
$(document).on('click', '[data-target="#home-info-modal-offer"], [data-target="#home-info-modal-order"]', function (e) {
  $('.collapse').removeClass('show');
  var item = $(this).attr('data-item');
  $('#' + item).addClass('show');
  $('button[data-target="#' + item + '"]').addClass('show').triggerHandler('focus');
})

$('#contact-info-bubble').on('mouseenter', function (e) {
  if ($('#contact-info-box').hasClass('d-none')) {
    $('#contact-info-bubble').removeClass('small');
    $('#contact-info-p').html('<b>Meer informatie?</b><br/> Klik hier voor contact mogelijkheden');
  }
});

$('#contact-info-bubble').on('mouseleave', function (e) {
  $('#contact-info-bubble').addClass('small');
  $('#contact-info-p').text('...');
});

$('#contact-info-bubble').on('click', function (e) {
  $('#contact-info-box').toggleClass('d-none');
});

//retour form
$('[name="id_order"]').on('change', function (e) {
  let idOrder = $(this).val();
  let postalCode = '';
  const url = '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1';

  $.ajax({
    url: url,
    type: 'POST',
    data: {
      _token: prestashop.static_token,
      action: 'fetch_products_for_retour',
      id_order: idOrder,
      postalcode: postalCode
    },
  }).done(function (e) {
    let data = JSON.parse(e);
    if (data.success) {
      $('#retourform-table').removeClass('disabled');
      let optionList = '';
      let products = data.data;
      for (let i = 0; i < products.length; i++) {

        if (products[i].customization === null) {
          optionList += '<tr><td class="align-middle"><input name="product_checked[' + products[i].id_order_detail + ']" value="' + products[i].id_order_detail + '" type="checkbox"></td><td class="align-middle">' + products[i].name + '</td><td><div class="input-group input-group-sm"><input name="product_total[' + products[i].id_order_detail + ']" class="form-control" type="number" step="1" min="0" max="' + products[i].product_quantity + '" value="0"><div class="input-group-append"><span class="input-group-text">/ ' + products[i].product_quantity + '</span></div></div></td></tr>';
        } else {
          optionList += '<tr class="disabled"><td><button type="button" class="btn btn-sm btn-info"  data-toggle="collapse" data-toggle="true" data-target="#retour_table_customized_info" aria-expanded="false" aria-controls="retour_table_customized_info"><i class="fa-sharp fa-info"></button></td><td class="align-middle">' + products[i].name + ' - ' + products[i].customization + '<td>' + products[i].product_quantity + ' Stuk(s)</td></tr>';
        }
      }

      $('[name="id_customer"]').val(data.id_customer);
      $('#retourform-table table tbody').html(optionList);

      $('#error_msg_contact').text('');
      $('#contact_return_alert').hide();

      $('#contact-form-notifications').hide();
    } else {
      $('#error_msg_contact').text(data.msg);
      $('#contact_return_alert').show();
    }
  })
    .fail(function (e) {
      // console.log(JSON.parse(e));
    });
});

$('#retour_order_search').on('click', function (e) {
  let idOrder = $('[name="order_referenc"]').val();
  let postalCode = $('[name="postcode"]').val();
  const url = '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1';

  $.ajax({
    url: url,
    type: 'POST',
    data: {
      _token: prestashop.static_token,
      action: 'fetch_products_for_retour',
      id_order: idOrder,
      postalcode: postalCode
    },
  })
    .done(function (e) {
      let data = JSON.parse(e);
      if (data.success) {
        $('#retourform-table').removeClass('disabled');
        let optionList = '';
        let products = data.data;
        for (let i = 0; i < products.length; i++) {

          if (products[i].customization === null) {
            optionList += '<tr><td class="align-middle"><input name="product_checked[' + products[i].id_order_detail + ']" value="' + products[i].id_order_detail + '" type="checkbox"></td><td class="align-middle">' + products[i].name + '</td><td><div class="input-group input-group-sm"><input name="product_total[' + products[i].id_order_detail + ']" class="form-control" type="number" step="1" min="0" max="' + products[i].product_quantity + '" value="0"><div class="input-group-append"><span class="input-group-text">/ ' + products[i].product_quantity + '</span></div></div></td></tr>';
          } else {
            optionList += '<tr class="disabled"><td><button type="button" class="btn btn-sm btn-info"  data-toggle="collapse" data-toggle="true" data-target="#retour_table_customized_info" aria-expanded="false" aria-controls="retour_table_customized_info"><i class="fa-sharp fa-info"></button></td><td class="align-middle">' + products[i].name + ' - ' + products[i].customization + '<td>' + products[i].product_quantity + ' Stuk(s)</td></tr>';
          }
        }

        $('[name="id_customer"]').val(data.id_customer);
        $('[name="id_order"]').val(data.id_order);
        $('#retourform-table table tbody').html(optionList);

        $('#error_msg_contact').text('');
        $('#contact_return_alert').hide();

        $('#contact-form-notifications').hide();
      } else {
        $('#error_msg_contact').text(data.msg);
        $('#contact_return_alert').show();
      }
    })
    .fail(function (e) {
      // console.log(JSON.parse(e));
    });

});


$('.nav-contact').on('mouseenter',function() {
  let $this = $(this);
  if(!$this.hasClass('hover-show')){
    $('.nav-contact').addClass('hover-show');
    $('.nav-contact .dropdown-menu').addClass('hover-show');
  }
});

$('.nav-contact').on('mouseleave',function() {
  let $this = $(this);
  if($this.hasClass('hover-show')){
    $('.nav-contact').removeClass('hover-show');
    $('.nav-contact .dropdown-menu').removeClass('hover-show');
  }
});
