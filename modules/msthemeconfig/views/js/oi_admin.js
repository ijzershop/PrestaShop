$(function(){

  let table = `<div class="form-wrapper">
  <div class="form-group">
    <table class="table table-borderless table-condensed" id="selected-products-table">
      <thead>
      <tr>
        <th>Product Id</th>
        <th>Product</th>
        <th>Aantal</th>
        <th></th>
      </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>
</div>`;

  $('#selected_products').attr('list','found-product-items');
  $('#selected_products').attr('autocomplete','none');
  $('#selected_products').parent('div').append(table);

  function delay(callback, ms) {
    let timer = 0;
    return function() {
      let context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  $('#selected_products').keyup(delay(function (e) {
    e.stopPropagation();
    searchForProduct(e.target.value);
  }, 200));

  function searchForProduct(productNameString){
    if(productNameString.length > 0) {
      $.ajax({
        url: "//" + window.location.host + "/zoeken",
        type: "POST",
        dataType: "JSON",
        data: {'s': productNameString, 'resultsPerPage': 10},
        success: function (response) {
          $('#selected_products').parent("div").find("datalist").remove();
          let list = createList(response.products);
          $('#selected_products').after(list);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(textStatus, errorThrown);
        }
      });
    }
  }

  function createList(products){
    let list = '<datalist id="found-product-items">';
    for (let i = 0; i < products.length; i++) {
      list += '<option value="'+products[i].id_product+'">'+products[i].name+'</option>'
    }
    list += '</datalist>';
    return list;
  }

  $("#selected_products").on('input', function () {
    let inputValue = this.value;
    if($('datalist').find('option').filter(function(){
      if(this.value == inputValue){
        let productId = this.value;
        let productName = this.innerHTML;
        console.log();
        if($('#selected-products-table').find('td[data-id="'+productId+'"]').length === 0){
          let row = "<tr><td data-id='"+productId+"'>"+productId+"</td><td>"+productName+"</td>" +
            "<td><input onchange='updateQtyString(this)' type='number' class='form-control selected-product-table-row' data-id='"+productId+"' data-name='"+productName+"'/></td>" +
            "<td><button onclick='removeStockProduct(this)' class='btn btn-danger btn-sm'  type='button' data-id='"+productId+"' data-name='"+productName+"'>X</button></td></tr>";
          $('#selected-products-table').append(row);
        }

        return true;
      } else {
        return false;
      }
    }).length) {
      //your code as per need
      this.value = '';
    }
  });
});

function updateQtyString(e){
  let productId = $(e).attr('data-id');
  let productQty = e.value;
  updateStockProductList(productId, productQty);
}

function removeStockProduct(e){
  let productId = $(e).attr('data-id');
  let productName = $(e).attr('data-name');
  $(e).parents('tr').remove();
  updateStockProductList(productId, 0);
}

function updateStockProductList(productId, quantity){
  let inputElem = document.getElementById("linked_products");
  let stockProducts = inputElem.value;
  let stockProductList = [];
  if(stockProducts !== "" && stockProducts != "[]"){
    let stockProductList = JSON.parse(stockProducts);
  } else {

    let newProduct = {};
        newProduct.qty = quantity;

        newProduct.id_product = productId;
        stockProductList.push(newProduct)
  }

    const loopProducts = new Promise(function(resolve, reject) {
      let found = 0;
      for (let i = 0; i < stockProductList.length; i++){
            if (productId === stockProductList[i].id_product) {
              found = 1;
              if (quantity > 0) {
                stockProductList[i].qty = quantity;
                resolve(true);
              } else {
                stockProductList.splice(i, 1);
                resolve(true);
              }
            } else {
              if(found === 0 && i === stockProductList.length-1){
                let newProduct = {};
                newProduct.qty = quantity;

                newProduct.id_product = productId;
                stockProductList.push(newProduct)
                resolve(false);
              }
            }
      }
    });

    loopProducts.then(resolve => {
      inputElem.value = JSON.stringify(stockProductList);
    });
  }


function makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( let i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
