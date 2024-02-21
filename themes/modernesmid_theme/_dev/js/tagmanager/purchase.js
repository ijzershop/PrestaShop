
export default class purchaseAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data.confirmation;
    dataLayer.push({ecommerce: null});

    // console.log(['purchase', dataObject]);

    dataLayer.push({
      event: "purchase",
        ecommerce: {
          tax: dataObject.tax, // tax bedrag
          shipping: dataObject.shipping, // shipping bedrag
          coupon: dataObject.discount, // of officiele coupon naam (deze is optioneel. Als het moeilijk is, laat dan maar zitten.)
          currency: 'EUR',
          value: dataObject.amount_tax_excl, // bedrag product ex btw
          items: [
            dataObject.items
          ],
        },
      })
  }
}
