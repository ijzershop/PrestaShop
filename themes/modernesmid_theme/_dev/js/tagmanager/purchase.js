
export default class purchaseAnalyticsPush {
  static init() {
    let dataObject = prestashop.analytics_data.confirmation;
    dataLayer.push({ecommerce: null});

    let sendedData = {
      event: "purchase",
      ecommerce: {
        tax: dataObject.tax, // tax bedrag
        transaction_id: dataObject.transaction_id,
        shipping: dataObject.shipping, // shipping bedrag
        coupon: dataObject.coupon,
        discount: dataObject.discount,
        currency: 'EUR',
        value: dataObject.price, // bedrag product ex btw
        items: [
          dataObject.items
        ],
      },
    };

    console.log(['purchase', sendedData]);

    dataLayer.push(sendedData)
  }
}
