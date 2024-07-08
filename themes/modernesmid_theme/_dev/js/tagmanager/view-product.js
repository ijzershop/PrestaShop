
export default class viewProductAnalyticsPush {
  static init(bodyElemIdProduct) {
    if(bodyElemIdProduct.attr('analytics_send') !== '1'){
      bodyElemIdProduct.attr('analytics_send', '1');

      let dataObject = prestashop.analytics_data.product;

      dataLayer.push({ecommerce: null});

      let sendedData = {
        event: "view_item",
        ecommerce: {
          currency: 'EUR',
          coupon: dataObject.coupon,
          discount: dataObject.discount,
          value: parseFloat(dataObject.price)*parseInt(dataObject.quantity),
          items: [
            {
              item_id: dataObject.item_id, //SKU / ID
              item_name: dataObject.item_name, // bv. Stalen koker 20x20x2mm
              discount: dataObject.discount, // number, indien van toepassing
              index: 0,
              item_category: dataObject.item_category, // bv. Profielen
              item_category2: dataObject.item_category2, // bv. Staal
              price: dataObject.price, // non-discounted price. Dus value = price - discount
              quantity: dataObject.quantity, // hier is het altijd 1
            },
          ],
        },
      };
      //console.log(['view_item', sendedData]);
      dataLayer.push(sendedData);
    }
  }
}


