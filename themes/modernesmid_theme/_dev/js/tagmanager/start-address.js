export default class startCheckoutAddressAnalyticsPush {
  static init(checkoutFormElem) {
    if (checkoutFormElem.attr('analytics_send_address') !== '1') {
      checkoutFormElem.attr('analytics_send_address', '1');
        let dataObject = prestashop.analytics_data;
        dataLayer.push({ecommerce: null});

<<<<<<< HEAD
        console.log(['add_shipping_info', dataObject]);
=======
        // console.log(['add_shipping_info', dataObject]);
>>>>>>> c8dd03977e6c3094edbf7e3dad0a467e27d4385a

        dataLayer.push({
          event: "add_shipping_info",
          ecommerce: {
            currency: 'EUR',
            value: prestashop.cart.amount_tax_excl, // bedrag product ex btw
            items: [
              dataObject.items
            ],
          },
        })
      }
    }
}
