<?php
require_once(_PS_CORE_DIR_.'/config/config.inc.php');
require_once(_PS_CORE_DIR_.'/init.php');

class addtoorderAjaxModuleFrontController extends ModuleFrontController
{

  public function __construct()
  {
        parent::__construct();
        $this->action = Tools::getValue('action');
        $this->method = Tools::getValue('method');
    }

  public function initContent()
  {
      $this->ajax = true;
      if ($this->errors){
              die(json_encode(array('hasError' => true, 'errors' => $this->errors)));
       }

    switch ($this->method) {
        case 'fetchbyreference':

          $reference = Tools::getValue('reference');

          ob_end_clean();
          header('Content-Type: application/json');
          $orderArray = [];
          $result = Order::getByReference($reference)->getResults();
                            // {* $acceptedOrderStatusIds options are
                            //   2 - [Betaling ontvangen]
                            //   3 - Order afhalen
                            //   7 - [Uw order wordt verwerkt]
                            //   10 - [Bankoverschrijving]
                            //   16 - Order geprint


                            //   15 - [Uw bestelling ligt klaar voor verzending]
                            //   4 - [Uw bestelling is verzonden]
                            //   5 - Order afgerond
                            //   6 - Order geannuleerd
                            //   17 - Order vertraagd
                            //   18 - [INTERN: zie klantenservice]
                            //  *}

          $acceptedOrderStatusIds =explode(",", Configuration::get('ADDTOORDER_ORDER_STATUSES', null, null, null, "2,3,7,10,16"));
          $availableOrders =[];

          foreach ($result as $key => $order) {
            if(in_array($order->current_state, $acceptedOrderStatusIds) && (int)$order->id_carrier !== (int)Configuration::get('ADDTOORDER_DELIVERY_METHOD')){
              $addr = new Address($order->id_address_delivery);
              $postcode = $addr->postcode;
              array_push($availableOrders, ['order_reference' => $order->reference, 'address' => $addr, 'postcode'=>$postcode]);
            }
          }

          echo json_encode($availableOrders);
          die();
        break;
        default:
          die(json_encode( array('error'=>'no method')));
        }
  }
}
