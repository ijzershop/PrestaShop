window.dataLayer = window.dataLayer || [];window.dataLayer = window.dataLayer || [];

export default class addToCartAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    window.dataLayer.push({ecommerce: null});

    console.log(['add_to_cart', dataObject]);

    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: dataObject.currency,
        value: dataObject.amount_tax_excl, // bedrag product ex btw
        items: [
          dataObject.items
        ],
      },
    })
  }
}
