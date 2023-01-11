<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

if (!defined('_PS_VERSION_'))
	exit;

use MsThemeConfig\Class\ExportOrders;
use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\ModuleAdminController;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;

/**
 *
 */
class KoopmanOrderExportAdminController extends ModuleAdminController {

	public function __construct()
    {
        $this->module = 'koopmanorderexport';
	    $this->lang = true;
	    $this->context = Context::getContext();
	    $this->bootstrap = true;

		parent::__construct();

    }


	/**
	 *
	 **/
   public function display()
    {
        if($_SERVER['REQUEST_METHOD'] == 'POST' && Tools::getIsset('updateAddress')){
            $this->updateOrderDeliveryAddress(Tools::getAllValues());
        }


	    $export = new ExportOrders();
	    $export->export();

		//Redirect to orders page
      if($export->redirect){
          Tools::redirectAdmin(Context::getContext()->link->getAdminLink('AdminOrders',true));
      }else{
          ?>
          <html>
            <head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
              <title></title>
              <style type="text/css">
                  .large-text{
                      line-height:1.7em;
                      font-size:1.3em;
                  }
                  .address-input-text{
                      font-size:1.4em;
                  }
                * {
                    font-family: Arial, serif;
                }
              </style>
            </head>
            <body>
              <?php
                echo $export->output;
              ?>
            </body>
          </html>
          <?php
      }
    }

    public function initContent()
    {

	}


    /**
     */
    private function updateOrderDeliveryAddress($getAllValues)
    {
        try {
            $order = new Order($getAllValues['id_order']);
            if(!is_null($order->id_address_delivery)){
                $address = new Address($order->id_address_delivery);
                $address->address1 = $getAllValues['address1'];
                $address->house_number = $getAllValues['house_number'];
                $address->house_number_extension = $getAllValues['house_number_extension'];
                $address->postcode = $getAllValues['postcode'];
                $address->city = $getAllValues['city'];

                $address->update(false);
            }
        } catch (\PrestaShopDatabaseException|\PrestaShopException $e) {
        }


    }

}
