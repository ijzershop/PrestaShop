$(document).ready(function () {

  let moneyFormat = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  });

  function calculateNewPrice(startPrice = 0, formula = '') {
    let price = 0;

    if (formula !== '') {

    }
    return price;
  }

  function runFormula(price, formula) {
    return price;
  }

  $('.supplier_connected_product_selection').on('change', function (e) {
    let idProduct = $(this).val();
    let link = $(this).attr('data-link');
    let rowId = $(this).attr('data-rowid');

    $.ajax({
      type: 'POST',
      cache: false,
      dataType: 'json',
      url: link,
      data: {
        ajax: 1,
        id_product: idProduct
      },
      success: function (data) {
        $('.store_price[data-id="' + rowId + '"]').text(data.price);
        $('[name="new_price_' + rowId + '"').val(data.price);
      },
      error: function (data) {
        console.log(data);
      }
    });
  });

  $('.calculate_new_price').on('click', function (e) {
    e.preventDefault();
    let link = $(this).attr('data-link');
    let rowId = $(this).attr('data-rowid');

    let idProduct = $('[name="selected_product_' + rowId + '"').val();
    let supFormula = $('[name="formula_' + rowId + '"').val();
    let incrFormula = $('[name="increment_formula_' + rowId + '"').val();
    let storePrice = $('.store_price[data-id="' + rowId + '"]').text();
    let selectedPrice = $('[name="selected_formule_item_' + rowId + '"]:checked').attr('data-value');
    let selectedType = $('[name="selected_formule_item_' + rowId + '"]:checked').attr('data-type');

    let completedFormula = supFormula + '' + incrFormula;

    $.ajax({
      type: 'POST',
      cache: false,
      dataType: 'json',
      url: link,
      data: {
        ajax: 1,
        row: rowId,
        product: idProduct,
        formula: completedFormula,
        store_price: storePrice,
        selected_formule_item_price: selectedPrice,
        selected_formule_item: selectedType,
      },
      success: function (data) {
        $.growl({
          title: '',
          size: 'large',
          message: data.msg,
          duration: 500
        });
        $('#formula_result_' + rowId).text(data.generated_formula);
        $('[name="new_price_' + rowId + '"').val(data.total).trigger('change');
      },
      error: function (data) {
        console.log(data);
      }
    });
  });

  $('.price_mod_cart').each(function (index, elem) {
    let dataSet = elem.dataset;
    let rowId = dataSet.id;
    let oldSupPrice = Number(dataSet.old_supplier_price)
    let oldStorPrice = [];
    if (dataSet.old_store_price !== "") {
      try {
        oldStorPrice = JSON.parse(dataSet.old_store_price);
      } catch (e) {
        oldStorPrice = 0;
      }
    }
    let newSupPrice = Number(dataSet.new_supplier_price)
    let newStorPrice = Number($('[name="new_price_' + rowId + '"').val());

    let lastOldStorePrice = Number(0);
    if (oldStorPrice.length > 0 && oldStorPrice[0].hasOwnProperty('price')) {
      lastOldStorePrice = Number(oldStorPrice[0].price);
    }

    const chart = new Chartist.Bar(elem, {
      labels: ['Lever.', 'Winkel'],
      series: [
        [oldSupPrice, lastOldStorePrice],
        [newSupPrice, newStorPrice],
      ]
    }, {
      reverseData: true,
      horizontalBars: true,
      axisY: {
        offset: 60,
        position: 'start'
      },
      axisX: {
        offset: 60,
        position: 'start'
      },
      chartPadding: {
        top: 0,
        right: 100,
        bottom: 0,
        left: 10
      },
      plugins: [
        Chartist.plugins.barChartLabel()
      ]
    }, {}).on('draw', function (data) {
      if (data.type === 'bar') {
        data.element.attr({
          style: 'stroke-width: 10px'
        });
      }
      $('th#supplier_diff_' + rowId).text(moneyFormat.format(newSupPrice - oldSupPrice));
      $('th#store_diff_' + rowId).text(moneyFormat.format(newStorPrice - lastOldStorePrice));
      $('th#store_profit_old_' + rowId).text(moneyFormat.format(lastOldStorePrice - oldSupPrice));
      $('th#store_profit_new_' + rowId).text(moneyFormat.format(newStorPrice - newSupPrice));
    });

    $(document).on('change', '[name="selected_formule_item_' + rowId + '"],[name="new_price_' + rowId + '"]', function (e) {
      let dataSet = elem.dataset;
      let rowId = dataSet.id;
      let oldSupPrice = Number(dataSet.old_supplier_price)
      let oldStorPrice = Number(dataSet.old_store_price)

      let link = $('.calculate_new_price[data-rowid="' + rowId + '"]').attr('data-link');

      let idProduct = $('[name="selected_product_' + rowId + '"').val();
      let supFormula = $('[name="formula_' + rowId + '"').val();
      let incrFormula = $('[name="increment_formula_' + rowId + '"').val();
      let storePrice = $('.store_price[data-id="' + rowId + '"]').text();
      let selectedPrice = $('[name="selected_formule_item_' + rowId + '"]:checked').attr('data-value');
      let selectedType = $('[name="selected_formule_item_' + rowId + '"]:checked').attr('data-type');
      let newSupPrice = 0;
      let newStorPrice = 0;
      $.ajax({
        type: 'POST',
        cache: false,
        dataType: 'json',
        url: link,
        data: {
          ajax: 1,
          row: rowId,
          product: idProduct,
          formula: supFormula,
          store_price: storePrice,
          selected_formule_item_price: selectedPrice,
          selected_formule_item: selectedType,
        },
        success: function (data) {
          let newSupPrice = data.total

          $.ajax({
            type: 'POST',
            cache: false,
            dataType: 'json',
            url: link,
            data: {
              ajax: 1,
              row: rowId,
              product: idProduct,
              formula: supFormula + '' + incrFormula,
              store_price: storePrice,
              selected_formule_item_price: selectedPrice,
              selected_formule_item: selectedType,
            },
            success: function (data) {
              let newStorPrice = Number(data.total);

              chart.update({
                labels: ['Lever.', 'Winkel'], series: [
                  [oldSupPrice, oldStorPrice],
                  [newSupPrice, newStorPrice],
                ]
              });

              $('th#supplier_diff_' + rowId).text(moneyFormat.format(newSupPrice - oldSupPrice));
              $('th#store_diff_' + rowId).text(moneyFormat.format(newStorPrice - oldStorPrice));
              $('th#store_profit_old_' + rowId).text(moneyFormat.format(oldStorPrice - oldSupPrice));
              $('th#store_profit_new_' + rowId).text(moneyFormat.format(newStorPrice - newSupPrice));
            },
            error: function (data) {
              // console.log(data);
            }
          });
        },
        error: function (data) {
          // console.log(data);
        }
      });
    });
  });
});

function indexOfAll(string, searchItem) {
  let searchArray = searchItem.split(' ');
  let indexes = 0;
  for (let i = 0; i < searchArray.length; i++) {
    if (string.indexOf(searchArray[i]) >= 0) {
      indexes++;
    }
  }
  return indexes === searchArray.length;
}


function matchCustom(params, data) {
  // If there are no search terms, return all of the data
  if ($.trim(params.term) === '') {
    return data;
  }

  // Do not display the item if there is no 'text' property
  if (typeof data.text === 'undefined') {
    return null;
  }

  // `params.term` should be the term that is used for searching
  // `data.text` is the text that is displayed for the data object

  if (indexOfAll(data.text, params.term)) {
    // This includes matching the `children` how you want in nested data sets
    return $.extend({}, data, true);
  }

  // Return `null` if the term should not be displayed
  return null;
}




$(window).on("load", function () {
  let adminSelect2DataLink = $('#select2_data_link').attr('data-link');
  $('#product_price_modification_id_store_product').select2({
    matcher: matchCustom,
    allowClear: true,
    width: 300,
    cache: false,
    placeholder: "Selecteer een product",
    placeholderOption: ""
  });

  $('#product_price_modification_id_category_default').select2({
    allowClear: true,
    matcher: matchCustom,
    width: 300,
    cache: false,
    placeholder: {
      id: '',
      text: 'Selecteer een categorie'
    },
    placeholderOption: ""
  });


  $('.supplier_connected_product_selection').each(function (index, elem) {

    $(elem).select2({
      ajax: {
        url: adminSelect2DataLink,
        processResults: function (data, page) {
          return {results: JSON.parse(data).items};
        },
      },
      allowClear: true,
      minimumInputLength: 2,
      width: 300,
      cache: true,
    });

    let value = elem.dataset.value;
    let name = elem.dataset.name;
    if (value.length > 0 && name.length > 0) {

      var data = {
        id: value,
        text: name
      };

      var newOption = new Option(data.text, data.id, false, false);
      $(elem).append(newOption).trigger('change');
    }
  })


  $(document).on('select2:open', (e) => {

    setTimeout(function () {
      $('.select2-search__field').first().focus();

    }, 200)
  });


  $(document).on('click', '#bulk-update-clear', function (e) {
    $('#price-formula-bulk-input').val(void (0));
    $('#increment-formula-bulk-input').val(void (0));
  });

  $(document).on('click', '#bulk-update-update', function (e) {
    let priceFormula = $('#price-formula-bulk-input').val();
    let incrFormula = $('#increment-formula-bulk-input').val();

    $('.js-bulk-action-checkbox:checked').each(function (index, element) {
      let rowId = element.value;
      $('input[name="formula_' + rowId + '"]').val(priceFormula);
      $('input[name="increment_formula_' + rowId + '"]').val(incrFormula);

    })


  });


  $(document).on('click', '.history_price_row', function (e) {
    let hisDate = e.currentTarget.dataset.date;
    let hisPrice = e.currentTarget.dataset.price;
    let rowId = e.currentTarget.dataset.rowId;

    $('[name="new_price_' + rowId + '"]').val(hisPrice);
  });


});


function priceFormat(price){
  let formatter = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  });

  return formatter.format(price);
}


$(document).ready(function () {
  let adminDataTableMissedLink = $('#datatable_missed_data_link').attr('data-link');


  let missingTable = $('#missed-products-table').DataTable({
    processing: true,
    serverSide: true,
    ajax: {
      url: adminDataTableMissedLink,
      method: 'POST'
    },
    pageLength: 5,
    lengthMenu: [

      [5, 10, 25, 50, -1],
      [5, 10, 25, 50, 'All'],
    ],
    columns: [{
      data: 'name_supplier',
    },{
      data: 'product_name',
    },{
      data: 'price',
      render: function(data, type){
        return priceFormat(data);
      }
    },{
      data: 'old_price_update',
    },{
      data: 'updated_at',
    }],
    drawCallback: function() {
      let tableData = missingTable.ajax.params();
      if(tableData.draw === 1 && tableData.search.value === ''){
      let dateFormatPrice = "yy-mm-dd";

      function getDate(element) {
        let date;
        try {
          date = $.datepicker.parseDate(dateFormatPrice, element.value);
        } catch (error) {
          date = null;
        }

        return date;
      }

        let today = new Date()
        let days = 86400000
        let filterDateTo = new Date(today - (16*7*days))
        document.getElementById('price_update_to').value = filterDateTo.getDate() + '/' + filterDateTo.getMonth() + '/' + filterDateTo.getFullYear();


        let price_update_from = $("#price_update_from")
          .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
          })
          .on("change", function () {
            price_update_to.datepicker("option", "minDate", getDate(this));
          }),
        price_update_to = $("#price_update_to").datepicker({
          defaultDate: filterDateTo,
          changeMonth: true,
          numberOfMonths: 1
        })
          .on("change", function () {
            price_update_from.datepicker("option", "maxDate", getDate(this));
          });

      let missing_records_from = $("#missing_records_from")
          .datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1
          })
          .on("change", function () {
            price_update_to.datepicker("option", "minDate", getDate(this));
          });

        $("#missing_records_to").datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 1
        })
          .on("change", function () {
            missing_records_from.datepicker("option", "maxDate", getDate(this));
          });


      }
    },
    initComplete: function (settings, json) {
      this.api()
        .columns()
        .every(function () {
          let that = this;
          $('input', this.footer()).on('keyup change clear', function () {
            let searchValue = this.value;
            if(that.index() === 3){
              //is modifier date
              let from = document.getElementById('missing_records_from').value;
              let to = document.getElementById('missing_records_to').value;
              searchValue = from+','+to;
            }
            if(that.index() === 4){
              //is product date
              let from = document.getElementById('price_update_from').value;
              let to = document.getElementById('price_update_to').value;
              searchValue = from+','+to;
            }
            if (that.search() !== searchValue) {
              that.search(searchValue).draw();
            }
          });
        });
    },
  });
});
