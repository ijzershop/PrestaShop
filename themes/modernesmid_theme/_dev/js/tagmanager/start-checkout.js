window.dataLayer = window.dataLayer || [];

export default class startCheckoutAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    window.dataLayer.push({ecommerce: null});

    console.log(['begin_checkout', dataObject]);

    window.dataLayer.push({
      event: "begin_checkout",
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
