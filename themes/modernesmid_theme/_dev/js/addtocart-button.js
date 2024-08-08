//Set the help text
const minAmountReachedMsg = "U heeft het minimale bestel aantal bereikt!";
const maxAmountReachedMsg = "U heeft het maximale bestel aantal bereikt!";

let setHelpText = function (text, idProduct) {
  $('#addToCartInputHelp[data-product-id="' + idProduct + '"]').text(text);
}

// Update Quantity Field
let updateQtyWantedInput = function (target) {
  let minValue = parseInt($(target).attr('min'));
  let maxValue = parseInt($(target).attr('max'));
  let valueCurrent = parseInt($(target).val());
  let idProduct = $(target).attr('data-product-id');

  if (valueCurrent > minValue && valueCurrent < maxValue) {
    $(".remove-cart-product-btn[data-product-id=" + idProduct + "]").hide();
    $(".minus-cart-product-btn[data-product-id=" + idProduct + "]").show();

    $(".btn-number[data-type='minus'][data-product-id=" + idProduct + "]").removeAttr('disabled')
    setHelpText('', idProduct);
  } else if (valueCurrent === minValue) {
    $(".remove-cart-product-btn[data-product-id=" + idProduct + "]").show();
    $(".minus-cart-product-btn[data-product-id=" + idProduct + "]").hide();

    $(".btn-number[data-type='minus'][data-product-id=" + idProduct + "]").attr('disabled', 'disabled')
    setHelpText(minAmountReachedMsg, idProduct);
  }
  if (valueCurrent < maxValue && valueCurrent > minValue) {
    $(".btn-number[data-type='plus'][data-product-id=" + idProduct + "]").removeAttr('disabled')
    setHelpText('', idProduct);
  } else if (valueCurrent === maxValue) {
    $(".btn-number[data-type='minus'][data-product-id=" + idProduct + "]").attr('disabled', 'disabled')
    setHelpText(maxAmountReachedMsg, idProduct);
  }
}

//Add/Remove values with plus minus buttons
let clickPlusMinusButton = function (target) {
  let fieldName = $(target).attr('data-field');
  let type = $(target).attr('data-type');
  let idProduct = $(target).attr('data-product-id');
  let input = $("input[name='" + fieldName + "'][data-product-id=" + idProduct + "]");
  let currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if (type === 'minus') {

      if (currentVal > input.attr('min')) {
        input.val(currentVal - 1).change();
      }
      if (parseInt(input.val()) === input.attr('min')) {
        $(target).attr('disabled', true);
      }

    } else if (type === 'plus') {

      if (currentVal < input.attr('max')) {
        input.val(currentVal + 1).change();
      }
      if (parseInt(input.val()) === input.attr('max')) {
        $(target).attr('disabled', true);
      }

    }
  } else {
    input.val(0);
  }
}

// Show/Hide Trash or minus button
$('#options_add_to_cart .btn.add-to-cart').on('click keypress', function (e) {
  let idProduct = $(e.currentTarget).attr('data-product-id');
  $('#multiple_qty_add_to_cart[data-product-id="' + idProduct + '"]').show();
  $('#options_add_to_cart[data-product-id="' + idProduct + '"]').hide();
  return true;
});

// On change quantity input
$('.add-to-cart-input-group .input-number').change(function (e) {
  updateQtyWantedInput(e.currentTarget);
});

// On Hold Mouse button as multiple clicks
let mouseDownLoop;
$('.add-to-cart-input-group .btn-number').on('mousedown mouseup keydown keyup', function mouseState(e) {
  if (e.type === "mousedown" || e.type === "keydown") {
    mouseDownLoop = setInterval(() => {
      clickPlusMinusButton(e.currentTarget);
    }, 150);
  } else {
    clearInterval(mouseDownLoop);
  }
});
