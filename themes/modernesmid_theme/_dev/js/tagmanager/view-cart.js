window.dataLayer = window.dataLayer || [];

export default class viewCartAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    window.dataLayer.push({ecommerce: null});

    console.log(['view_cart', dataObject]);

    window.dataLayer.push({
      event: "view_cart",
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
