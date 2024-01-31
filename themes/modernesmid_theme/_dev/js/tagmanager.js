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
    if ($("body#product").length > 0) {
      viewProductAnalyticsPush.init();
    }

  // wanneer iemand winkelmand bekijkt
// 2 verschillen met hierboven: event en items kunnen meerdere producten zijn.
  if ($("body#cart").length > 0) {
    viewCartAnalyticsPush.init();
  }

  // wanneer er een aankoop is gedaan
  if ($("body#order-confirmation").length > 0) {
    purchaseAnalyticsPush.init();
  }

  // wanneer iemand op de pagina /bestellen komt
  if ($("body#module-supercheckout-supercheckout, body#checkout").length > 0) {
    startCheckoutAnalyticsPush.init();
  }

  // wanneer iemand aan stap 4 "Bezorgadres" begint
  $(document).on('change', '[name="payment_address[postcode]"]',function() {
    startCheckoutAddressAnalyticsPush.init();
  });

  // wanneer iemand betaalwijze selecteert
  $(document).on('change', '[name="payment_method"]',function() {
    selectCheckoutPaymentAnalyticsPush.init();
  });

  // wanneer iemand een product verwijderd uit de winkelwagen
  $(document).on('mouseup', '.product-cart-delete-button',function() {
    removeFromCartAnalyticsPush.init();
  });

  // wanneer iemand een product toevoegde aan de winkelwagen
  $(document).on('mouseup', '.add-to-cart',function() {
    addToCartAnalyticsPush.init();
  });




})

