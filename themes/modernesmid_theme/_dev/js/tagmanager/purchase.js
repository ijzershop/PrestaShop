
export default class purchaseAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data;
    dataLayer.push({ecommerce: null});

    console.log(['purchase', dataObject]);

    dataLayer.push({
      event: "purchase",
        ecommerce: {
          tax: 1.00, // tax bedrag
          shipping: 1.00, // shipping bedrag
          coupon: "5% korting", // of officiele coupon naam (deze is optioneel. Als het moeilijk is, laat dan maar zitten.)
          currency: 'EUR',
          value: dataObject.amount_tax_excl, // bedrag product ex btw
          items: [
            dataObject.items
          ],
        },
      })
  }
}
