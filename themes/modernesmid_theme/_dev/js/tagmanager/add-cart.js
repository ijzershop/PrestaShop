export default class addToCartAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    dataLayer.push({ecommerce: null});

    // console.log(['add_to_cart', dataObject]);

    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: 'EUR',
        value: dataObject.amount_tax_excl, // bedrag product ex btw
        items: [
          dataObject.items
        ],
      },
    })
  }
}
