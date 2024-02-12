export default class startCheckoutAddressAnalyticsPush {
  static init(checkoutFormElem) {
    if (checkoutFormElem.attr('analytics_send_address') !== '1') {
      checkoutFormElem.attr('analytics_send_address', '1');
        let dataObject = prestashop.analytics_data;
        dataLayer.push({ecommerce: null});

        console.log(['add_shipping_info', dataObject]);

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
