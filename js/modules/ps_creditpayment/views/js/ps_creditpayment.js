function renderAddressOption(address){
  return '<option ' +
    'data-company="'+address.company+'" ' +
    'data-firstname="" ' +
    'data-lastname="" ' +
    'data-phone="" ' +
    'data-postcode="" ' +
    'data-house_number="" ' +
    'data-houser_number_extension=" " ' +
    'value="">  jelmer Stoker - Ceresweg 8938 BG 1  </option>';
}


$(document).ready(function(){




  let setSelect2ForOnCredit = function(){
    $('#on_credit_customer_select').select2({
      theme: "bootstrap",
      ajax: {
        url: prestashop.urls.base_url + 'index.php?fc=module&module=ps_creditpayment&controller=ajax',
        processResults: function (data, page) {
          return {results: JSON.parse(data).items};
        },
      },
      allowClear: true,
      cache: true,
    });
  }
  setSelect2ForOnCredit();
});
