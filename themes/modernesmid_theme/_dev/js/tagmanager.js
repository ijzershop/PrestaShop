import viewProductAnalyticsPush from "./tagmanager/view-product";
import viewCartAnalyticsPush from "./tagmanager/view-cart";
import startCheckoutAnalyticsPush from "./tagmanager/start-checkout";
import prestashop from 'prestashop';
import startCheckoutAddressAnalyticsPush from "./tagmanager/start-address";
import selectCheckoutPaymentAnalyticsPush from "./tagmanager/select-payment";
import removeFromCartAnalyticsPush from "./tagmanager/remove-cart";
import purchaseAnalyticsPush from "./tagmanager/purchase";
import addToCartAnalyticsPush from "./tagmanager/add-cart";

$(document).ready(function () {

    //  wanneer iemand een product bekijkt
    const bodyElemIdProduct = $("body#product");
    if (bodyElemIdProduct.length > 0 && bodyElemIdProduct.attr('analytics_send') !== '1') {
        viewProductAnalyticsPush.init(bodyElemIdProduct);
    }

  // wanneer iemand winkelmand bekijkt
  const bodyElemIdCart = $("body#cart");
  if (bodyElemIdCart.length > 0 && bodyElemIdCart.attr('analytics_send') !== '1') {
    viewCartAnalyticsPush.init(bodyElemIdCart);
  }

  // wanneer er een aankoop is gedaan
  const bodyElemIdPurchase = $("body#order-confirmation");
  if (bodyElemIdPurchase.length > 0 && bodyElemIdPurchase.attr('analytics_send') !== '1') {
    purchaseAnalyticsPush.init(bodyElemIdPurchase);
  }

  // wanneer iemand op de pagina /bestellen komt
  const bodyElemIdStartCheckout = $("body#module-supercheckout-supercheckout, body#checkout");
  if (bodyElemIdStartCheckout.length > 0 && bodyElemIdStartCheckout.attr('analytics_send') !== '1') {
    startCheckoutAnalyticsPush.init(bodyElemIdStartCheckout);
  }

  const checkoutFormElem = $('form#velsof_supercheckout_form');
  // wanneer iemand aan stap 4 "Bezorgadres" begint
  $(document).on('change', '[name^="shipping_address"], [name^="payment_address"]',function(e) {
    e.preventDefault();
    if(checkoutFormElem.attr('analytics_send_address') !== '1'){
        startCheckoutAddressAnalyticsPush.init(checkoutFormElem);
    }
  });

  // wanneer iemand betaalwijze selecteert
  $(document).on('change', '[name="payment_method"]',function() {
    if(checkoutFormElem.attr('analytics_send_payment') !== '1') {
      selectCheckoutPaymentAnalyticsPush.init(checkoutFormElem);
    }
  });

  // wanneer iemand een product verwijderd uit de winkelwagen
  $(document).on('mouseup', '.product-cart-delete-button, .remove-from-cart',function(e) {
    e.stopImmediatePropagation();
    removeFromCartAnalyticsPush.init();
  });

  // wanneer iemand een product verwijderd uit de winkelwagen doormiddel van input op nul plaatsen
  $(document).on('keyup', '.js-cart-line-product-quantity',function(e) {
    e.stopImmediatePropagation();
    let elem = $(this);
    if(elem.val() <= 0 || elem.val() < elem.attr('data-current-value')){
      removeFromCartAnalyticsPush.init();
    }
    if(elem.val() > elem.attr('data-current-value')){
      addToCartAnalyticsPush.init();
    }
  });

  // wanneer iemand een product toevoegde aan de winkelwagen
  $(document).on('mouseup', '.add-to-cart',function(e) {
    e.stopImmediatePropagation();
    addToCartAnalyticsPush.init();
  });
})

