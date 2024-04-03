export default class addToCartAnalyticsPush {
  static init(dataObject = null) {

    dataLayer.push({ecommerce: null});
    if(dataObject === null){
      dataObject = prestashop.analytics_data.add_to_cart_product;
      if(dataObject === undefined){
        return;
      }
    }

    let type = 'add_to_cart';
    if(dataObject.op === 'down' || dataObject.event_type === 'delete'){
      type = 'remove_from_cart';
    }

    let sendedData = {
      event: type,
      ecommerce: {
        currency: 'EUR',
        value: parseFloat(dataObject.price)*parseInt(dataObject.quantity),
        coupon: dataObject.coupon,
        discount: dataObject.discount,
        items: [
          dataObject
        ],
      },
    };

    //console.log(['add_to_cart_product', sendedData, dataObject]);
    let newURL = location.href.split("?")[0];
    window.history.pushState('object', document.title, newURL);
    dataLayer.push(sendedData)
  }
}
