window.dataLayer = window.dataLayer || [];

export default class startCheckoutAddressAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    window.dataLayer.push({ecommerce: null});

    console.log(['add_shipping_info', dataObject]);

    window.dataLayer.push({
      event: "add_shipping_info",
      ecommerce: {
        currency: dataObject.currency,
        value: prestashop.cart.amount_tax_excl, // bedrag product ex btw
        items: [
          dataObject.items
        ],
      },
    })
  }
}
