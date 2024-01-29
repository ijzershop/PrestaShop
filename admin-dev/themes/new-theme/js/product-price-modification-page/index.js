// admin-dev/themes/new-theme/js/pages/tax/index.js

// 1. import the grid component
import Grid from '@components/grid/grid';
import SortingExtension from '@components/grid/extension/sorting-extension';
import FiltersResetExtension from '@components/grid/extension/filters-reset-extension';
import ReloadListActionExtension from '@components/grid/extension/reload-list-extension';
import ColumnTogglingExtension from '@components/grid/extension/column-toggling-extension';
import SubmitRowActionExtension
  from '@components/grid/extension/action/row/product-price-modifier-submit-row-action-extension';
import SubmitBulkExtension from '@components/grid/extension/product-price-modifier-submit-bulk-action-extension';
import FiltersSubmitButtonEnablerExtension from '@components/grid/extension/filters-submit-button-enabler-extension';
import LinkRowActionExtension from '@components/grid/extension/link-row-action-extension';
import TranslatableInput from "@components/translatable-input";
import BulkActionCheckboxExtension from "@components/grid/extension/bulk-action-checkbox-extension";


const $ = window.$;

$(() => {
// 2. initialize the grid component by providing grid id
  const productPriceModificationGrid = new Grid('product_price_modification');


  productPriceModificationGrid.addExtension(new ReloadListActionExtension());
  productPriceModificationGrid.addExtension(new SortingExtension());
  productPriceModificationGrid.addExtension(new FiltersResetExtension());
  productPriceModificationGrid.addExtension(new ColumnTogglingExtension());
  productPriceModificationGrid.addExtension(new SubmitRowActionExtension());
  productPriceModificationGrid.addExtension(new SubmitBulkExtension());
  productPriceModificationGrid.addExtension(new BulkActionCheckboxExtension());
  productPriceModificationGrid.addExtension(new FiltersSubmitButtonEnablerExtension());
  productPriceModificationGrid.addExtension(new LinkRowActionExtension());

  new TranslatableInput();
});


$(document).ready(function () {
  let moneyFormat = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  });


  function priceFormat(price) {
    let formatter = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    });

    return formatter.format(price);
  }

  function calculateNewPrice(startPrice = 0, formula = '') {
    let price = 0;

    if (formula !== '') {

    }
    return price;
  }

  function runFormula(price, formula) {
    return price;
  }

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


  let adminSelect2DataLink = $('#select2_data_link').attr('data-link');
  let adminDataTableMissedLink = $('#datatable_missed_data_link').attr('data-link');
  let generateNewPriceModificationRulesLink = $('#datatable_new_rules_link').attr('data-link');

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
        sup_formula: supFormula,
        incr_formula: incrFormula,
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
        $('#sup_formula_result_' + rowId).html("<small>"+data.generated_sub_formula+"</small> = <b>"+data.sup_total+"</b>");
        $('#increment_formula_result_' + rowId).html("<small>"+data.generated_incr_formula+"</small> = <b>"+data.incr_total+"</b>");
        $('[name="new_price_' + rowId + '"').val(data.total).trigger('change');
      },
      error: function (data) {
        console.log(data);
      }
    });
  });

  // $('.price_mod_cart').each(function (index, elem) {
  //   let dataSet = elem.dataset;
  //   let rowId = dataSet.id;
  //   let oldSupPrice = Number(dataSet.old_supplier_price)
  //   let oldStorPrice = [];
  //   if (dataSet.old_store_price !== "") {
  //     try {
  //       oldStorPrice = JSON.parse(dataSet.old_store_price);
  //     } catch (e) {
  //       oldStorPrice = 0;
  //     }
  //   }
  //   let newSupPrice = Number(dataSet.new_supplier_price)
  //   let newStorPrice = Number($('[name="new_price_' + rowId + '"').val());
  //
  //   let lastOldStorePrice = Number(0);
  //   if (oldStorPrice.length > 0 && oldStorPrice[0].hasOwnProperty('price')) {
  //     lastOldStorePrice = Number(oldStorPrice[0].price);
  //   }
  //
  //   new Chartist.Bar(elem, {
  //     labels: ['Lever.', 'Winkel'],
  //     series: [
  //       [oldSupPrice, lastOldStorePrice],
  //       [newSupPrice, newStorPrice],
  //     ]
  //   }, {
  //     reverseData: true,
  //     horizontalBars: true,
  //     axisY: {
  //       offset: 60,
  //       position: 'start'
  //     },
  //     axisX: {
  //       offset: 60,
  //       position: 'start'
  //     },
  //     chartPadding: {
  //       top: 0,
  //       right: 100,
  //       bottom: 0,
  //       left: 10
  //     },
  //     plugins: [
  //       Chartist.plugins.barChartLabel()
  //     ]
  //   }, {}).on('draw', function (data) {
  //     if (data.type === 'bar') {
  //       data.element.attr({
  //         style: 'stroke-width: 10px'
  //       });
  //     }
  //     $('th#supplier_diff_' + rowId).text(moneyFormat.format(newSupPrice - oldSupPrice));
  //     $('th#store_diff_' + rowId).text(moneyFormat.format(newStorPrice - lastOldStorePrice));
  //     $('th#store_profit_old_' + rowId).text(moneyFormat.format(lastOldStorePrice - oldSupPrice));
  //     $('th#store_profit_new_' + rowId).text(moneyFormat.format(newStorPrice - newSupPrice));
  //   });
  //
  //   $(document).on('change', '[name="selected_formule_item_' + rowId + '"],[name="new_price_' + rowId + '"]', function (e) {
  //     let dataSet = elem.dataset;
  //     let rowId = dataSet.id;
  //     let oldSupPrice = Number(dataSet.old_supplier_price)
  //     let oldStorPrice = Number(dataSet.old_store_price)
  //
  //     let link = $('.calculate_new_price[data-rowid="' + rowId + '"]').attr('data-link');
  //
  //     let idProduct = $('[name="selected_product_' + rowId + '"').val();
  //     let supFormula = $('[name="formula_' + rowId + '"').val();
  //     let incrFormula = $('[name="increment_formula_' + rowId + '"').val();
  //     let storePrice = $('.store_price[data-id="' + rowId + '"]').text();
  //     let selectedPrice = $('[name="selected_formule_item_' + rowId + '"]:checked').attr('data-value');
  //     let selectedType = $('[name="selected_formule_item_' + rowId + '"]:checked').attr('data-type');
  //     let newSupPrice = 0;
  //     let newStorPrice = 0;
  //     $.ajax({
  //       type: 'POST',
  //       cache: false,
  //       dataType: 'json',
  //       url: link,
  //       data: {
  //         ajax: 1,
  //         row: rowId,
  //         product: idProduct,
  //         formula: supFormula,
  //         store_price: storePrice,
  //         selected_formule_item_price: selectedPrice,
  //         selected_formule_item: selectedType,
  //       },
  //       success: function (data) {
  //         let newSupPrice = data.total
  //
  //         $.ajax({
  //           type: 'POST',
  //           cache: false,
  //           dataType: 'json',
  //           url: link,
  //           data: {
  //             ajax: 1,
  //             row: rowId,
  //             product: idProduct,
  //             formula: supFormula + '' + incrFormula,
  //             store_price: storePrice,
  //             selected_formule_item_price: selectedPrice,
  //             selected_formule_item: selectedType,
  //           },
  //           success: function (data) {
  //             let newStorPrice = Number(data.total);
  //
  //             chart.update({
  //               labels: ['Lever.', 'Winkel'], series: [
  //                 [oldSupPrice, oldStorPrice],
  //                 [newSupPrice, newStorPrice],
  //               ]
  //             });
  //
  //             $('th#supplier_diff_' + rowId).text(moneyFormat.format(newSupPrice - oldSupPrice));
  //             $('th#store_diff_' + rowId).text(moneyFormat.format(newStorPrice - oldStorPrice));
  //             $('th#store_profit_old_' + rowId).text(moneyFormat.format(oldStorPrice - oldSupPrice));
  //             $('th#store_profit_new_' + rowId).text(moneyFormat.format(newStorPrice - newSupPrice));
  //           },
  //           error: function (data) {
  //             // console.log(data);
  //           }
  //         });
  //       },
  //       error: function (data) {
  //         // console.log(data);
  //       }
  //     });
  //   });
  // });

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
  }).on('change', function (e) {
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

  $(document).on('select2:open', (e) => {
    setTimeout(function () {
      $('.select2-search__field').first().focus();
    }, 200)
  });

  $(document).on('click', '.history_price_row', function (e) {
    let hisDate = e.currentTarget.dataset.date;
    let hisPrice = e.currentTarget.dataset.price;
    let rowId = e.currentTarget.dataset.rowId;

    $('[name="new_price_' + rowId + '"]').val(hisPrice);
  });

  var createPriceModifierRules = function(products){
    $.ajax({
      type: 'POST',
      cache: false,
      dataType: 'json',
      url: generateNewPriceModificationRulesLink,
      data: {
        ajax: 1,
        products: products
      },
      success: function (data) {
        window.location = window.location.href + '?product_price_modification[orderBy]=id&product_price_modification[sortOrder]=desc';
      },
      error: function (data) {
        console.log(data);
      }
    });

  };

  let missingTable = $('#missed-products-table').DataTable({
    processing: true,
    serverSide: true,
    stateSave: true,
    select: true,
    dom: "<'row'<'col-sm-12 col-md-3'l><'col-sm-12 col-md-9 text-right'fB>>" + "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    buttons: [
      {
        text: 'Selecteer alle regels',
        action: function (e, dt, node, config ) {
          dt.rows().select();
        }
      },
      {
        text: 'De-selecteer alles',
        action: function (e, dt, node, config ) {
          dt.rows().deselect();
        }
      },
      {
        text: 'Voeg regels toe',
        action: function (e, dt ) {
          let products = dt.rows( { selected: true } ).data().toArray();

          createPriceModifierRules(products);
        }
      }
    ],
    ajax: {
      url: adminDataTableMissedLink,
      method: 'POST'
    },
    paging: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    lengthMenu: [
      [5, 10, 25, 50, -1],
      [5, 10, 25, 50, 'All'],
    ],
    columns: [{
      data: 'id',
      width: '100'
    },{
      data: 'active',
      width: '100',
      render: function (e, data, row) {
        let checked = '';
        if(e > 0){
          checked = 'checked="checked"';
        }
        return '<input type="checkbox" disabled="true" '+checked+'>';
      }
    }, {
      data: 'product_name',
    }, {
      data: 'price',
      width: '100',
      render: function (data, type) {
        return priceFormat(data);
      }
    }],
    initComplete: function (settings, json) {
      this.api()
        .columns()
        .every(function () {
          let that = this;
          $('input', this.footer()).on('keyup change clear', function () {
            let searchValue = this.value;
            if (that.search() !== searchValue) {
              that.search(searchValue).draw();
            }
          });
        });
    },
  });
});
