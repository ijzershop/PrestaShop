import $ from 'jquery';
import prestashop from 'prestashop';
import setUpAddress from './checkout-payment'
import setUpDelivery from './checkout-delivery'
import setUpPayment from './checkout-payment'

function setupCheckoutScripts () {
  setUpAddress();
  setUpDelivery();
  let payment = setUpPayment();

  changeCheckoutStep();
  payment.collapseOptions();
}

function changeCheckoutStep() {
  $('.checkout-step').off('click');

  let currentStepClass = 'js-current-step';
  let currentStepSelector = '.' + currentStepClass;
  let stepsAfterPersonalInformation = $('#checkout-personal-information-step' + currentStepSelector).nextAll();

  $(currentStepSelector).prevAll().add(stepsAfterPersonalInformation).on(
    'click',
    (event) => {
      $(currentStepSelector + ', .-current').removeClass(currentStepClass + ' -current');
      $(event.target).closest('.checkout-step').toggleClass('-current');
      $(event.target).closest('.checkout-step').toggleClass(currentStepClass);
      prestashop.emit('changedCheckoutStep');
    }
  );

  $(currentStepSelector + ':not(#checkout-personal-information-step)').nextAll().on(
    'click',
    () => {
      $(currentStepSelector + ' button.continue').click();
      prestashop.emit('changedCheckoutStep');
    }
  );
}

$(document).ready(() => {
  if ($('#checkout').length === 1) {
    setupCheckoutScripts();
  }
});
