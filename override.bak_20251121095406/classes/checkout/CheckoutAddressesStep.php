<?php
/**
 *
 */
class CheckoutAddressesStep extends CheckoutAddressesStepCore{
    private $addressForm;
    private $use_same_address = true;
    private $show_delivery_address_form = false;
    private $show_invoice_address_form = false;
    private $form_has_continue_button = false;

    /**
     * @param  $context
     * @param  $translator
     * @param  $addressForm
     */
    public function __construct(
        $context,
        $translator,
        $addressForm
    ) {
        $this->addressForm = $addressForm;
        parent::__construct($context, $translator, $addressForm);
    }

      /**
       * @param array $requestParams
       * @return $this
       */
      public function handleRequest(array $requestParams = [])
      {
          $this->addressForm->setAction($this->getCheckoutSession()->getCheckoutURL());

          if (array_key_exists('use_same_address', $requestParams)) {
              $this->use_same_address = (bool) $requestParams['use_same_address'];
              if (!$this->use_same_address) {
                  $this->setCurrent(true);
              }
          }

          if (isset($requestParams['cancelAddress'])) {
              if ($requestParams['cancelAddress'] === 'invoice') {
                  if ($this->getCheckoutSession()->getCustomerAddressesCount() < 2) {
                      $this->use_same_address = true;
                  }
              }
              $this->setCurrent(true);
          }

          // Can't really hurt to set the firstname and lastname.
          $this->addressForm->fillWith([
              'firstname' => $this->getCheckoutSession()->getCustomer()->firstname,
              'lastname' => $this->getCheckoutSession()->getCustomer()->lastname,
          ]);

          if (isset($requestParams['saveAddress'])) {
              // Get the correct address ID based on the address type being saved
              $addressType = $requestParams['saveAddress'];
              $addressId = isset($requestParams['id_address']) ? (int)$requestParams['id_address'] : 0;
              // If we're saving an invoice address, make sure we're not using the delivery address ID
              if ($addressType === 'invoice' && $addressId === (int)$this->getCheckoutSession()->getIdAddressDelivery()) {
                  // If the ID matches the delivery address, set it to 0 or the current invoice address ID
                  $addressId = !$this->use_same_address  ? 0 : (int)$this->getCheckoutSession()->getIdAddressInvoice();
              }

              // Update the request parameters with the correct address ID
              if ($addressId >= 0) {
                  $requestParams['id_address'] = $addressId;
              }

              $saved = $this->addressForm->fillWith($requestParams)->submit();


              if (!$saved) {
                  $this->setCurrent(true);
                  $this->getCheckoutProcess()->setHasErrors(true);
                  if ($requestParams['saveAddress'] === 'delivery') {
                      $this->show_delivery_address_form = true;
                  } else {
                      $this->show_invoice_address_form = true;
                  }
              } else {
                  if ($requestParams['saveAddress'] === 'delivery') {
                      $this->use_same_address = isset($requestParams['use_same_address']);
                  }

                  $id_address = $this->addressForm->getAddress()->id;
                  if ($requestParams['saveAddress'] === 'delivery') {
                      $this->getCheckoutSession()->setIdAddressDelivery($id_address);
                      $idAddressInvoice = $this->use_same_address ? $id_address : null;
                      $this->getCheckoutSession()->setIdAddressInvoice($idAddressInvoice);
                  } else {
                      // This is an invoice address, so only set the invoice address ID
                      // and make sure we don't change the delivery address
                      $this->getCheckoutSession()->setIdAddressInvoice($id_address);
                      // Ensure we're not using the same address
                      $this->use_same_address = false;
                  }
              }
          } elseif (isset($requestParams['newAddress'])) {
              // while a form is open, do not go to next step
              $this->setCurrent(true);
              if ($requestParams['newAddress'] === 'delivery') {
                  $this->show_delivery_address_form = true;
              } else {
                  $this->show_invoice_address_form = true;
              }
              $this->addressForm->fillWith($requestParams);
              $this->form_has_continue_button = $this->use_same_address;
          } elseif (isset($requestParams['editAddress'])) {
              // while a form is open, do not go to next step
              $this->setCurrent(true);
              if ($requestParams['editAddress'] === 'delivery') {
                  $this->show_delivery_address_form = true;
              } else {
                  $this->show_invoice_address_form = true;
              }
              $this->addressForm->loadAddressById($requestParams['id_address']);
          } elseif (isset($requestParams['deleteAddress'])) {
              $addressPersister = new CustomerAddressPersister(
                  $this->context->customer,
                  $this->context->cart,
                  Tools::getToken(true, $this->context)
              );

              $deletionResult = (bool) $addressPersister->delete(
                  new Address((int) Tools::getValue('id_address'), $this->context->language->id),
                  Tools::getValue('token')
              );
              if ($deletionResult) {
                  $this->context->controller->success[] = $this->getTranslator()->trans(
                      'Address successfully deleted.',
                      [],
                      'Shop.Notifications.Success'
                  );
                  $this->context->controller->redirectWithNotifications(
                      $this->getCheckoutSession()->getCheckoutURL()
                  );
              } else {
                  $this->getCheckoutProcess()->setHasErrors(true);
                  $this->context->controller->errors[] = $this->getTranslator()->trans(
                      'Could not delete address.',
                      [],
                      'Shop.Notifications.Error'
                  );
              }
          }

          if (isset($requestParams['confirm-addresses'])) {
              if (isset($requestParams['id_address_delivery'])) {
                  $id_address = $requestParams['id_address_delivery'];

                  if (!Customer::customerHasAddress($this->getCheckoutSession()->getCustomer()->id, $id_address)) {
                      $this->getCheckoutProcess()->setHasErrors(true);
                  } else {
                      if ($this->getCheckoutSession()->getIdAddressDelivery() != $id_address) {
                          $this->setCurrent(true);
                          $this->getCheckoutProcess()->invalidateAllStepsAfterCurrent();
                      }

                      $this->getCheckoutSession()->setIdAddressDelivery($id_address);
                      if ($this->use_same_address) {
                          $this->getCheckoutSession()->setIdAddressInvoice($id_address);
                      }
                  }
              }

              if (isset($requestParams['id_address_invoice'])) {
                  $id_address = $requestParams['id_address_invoice'];
                  if (!Customer::customerHasAddress($this->getCheckoutSession()->getCustomer()->id, $id_address)) {
                      $this->getCheckoutProcess()->setHasErrors(true);
                  } else {
                      $this->getCheckoutSession()->setIdAddressInvoice($id_address);
                  }
              }

              if (!$this->getCheckoutProcess()->hasErrors()) {
                  $this->setNextStepAsCurrent();
                  $this->setComplete(
                      $this->getCheckoutSession()->getIdAddressInvoice() &&
                      $this->getCheckoutSession()->getIdAddressDelivery()
                  );

                  // if we just pushed the invoice address form, we are using another address for invoice
                  // (param 'id_address_delivery' is only pushed in invoice address form)
                  if (isset($requestParams['saveAddress'], $requestParams['id_address_delivery'])) {
                      $this->use_same_address = false;
                  }
              }
          }

          $addresses_count = $this->getCheckoutSession()->getCustomerAddressesCount();

          if ($addresses_count === 0) {
              $this->show_delivery_address_form = true;
          } elseif ($addresses_count < 2 && !$this->use_same_address) {
              $this->show_invoice_address_form = true;
              $this->setComplete(false);
          }

          if ($this->show_invoice_address_form) {
              // show continue button because form is at the end of the step
              $this->form_has_continue_button = true;
          } elseif ($this->show_delivery_address_form) {
              // only show continue button if we're sure
              // our form is at the bottom of the step
              if ($this->use_same_address || $addresses_count < 2) {
                  $this->form_has_continue_button = true;
              }
          }

          $this->setTitle($this->getTranslator()->trans('Addresses', [], 'Shop.Theme.Checkout'));

          return $this;
      }


      public function getTemplateParameters()
      {
          $idAddressDelivery = (int) $this->getCheckoutSession()->getIdAddressDelivery();
          $idAddressInvoice = (int) $this->getCheckoutSession()->getIdAddressInvoice();

          $params = [
              'address_form' => $this->addressForm->getProxy(),
              'use_same_address' => $this->use_same_address,
              'use_different_address_url' => $this->context->link->getPageLink(
                  'order',
                  null,
                  null,
                  ['use_same_address' => 0]
              ),
              'new_address_delivery_url' => $this->context->link->getPageLink(
                  'order',
                  null,
                  null,
                  ['newAddress' => 'delivery']
              ),
              'new_address_invoice_url' => $this->context->link->getPageLink(
                  'order',
                  null,
                  null,
                  ['newAddress' => 'invoice']
              ),
              'id_address_delivery' => $idAddressDelivery,
              'id_address_invoice' => $idAddressInvoice,
              'show_delivery_address_form' => $this->show_delivery_address_form,
              'show_invoice_address_form' => $this->show_invoice_address_form,
              'form_has_continue_button' => $this->form_has_continue_button,
          ];

          /** @var OrderControllerCore $controller */
          $controller = $this->context->controller;
          if ($controller instanceof OrderController) {
              $warnings = $controller->checkoutWarning;
              $addressWarning = $warnings['address'] ?? false;
              $invalidAddresses = $warnings['invalid_addresses'] ?? [];

              $errors = [];
              if (in_array($idAddressDelivery, $invalidAddresses)) {
                  $errors['delivery_address_error'] = $addressWarning;
              }

              if (in_array($idAddressInvoice, $invalidAddresses)) {
                  $errors['invoice_address_error'] = $addressWarning;
              }

              if ($this->show_invoice_address_form
                  || $idAddressInvoice != $idAddressDelivery
                  || !empty($errors['invoice_address_error'])
              ) {
                  $this->use_same_address = false;
                  $idAddress = $idAddressInvoice;
              } else {
                  $idAddress = $idAddressDelivery;
              }

              // Add specific parameters
              $params = array_replace(
                  $params,
                  [
                      'not_valid_addresses' => implode(',', $invalidAddresses),
                      'use_same_address' => $this->use_same_address,
                      'id_address' => $idAddress,
                  ],
                  $errors
              );
          }
          $this->context->smarty->assign($params);

          return $params;
      }
  }
