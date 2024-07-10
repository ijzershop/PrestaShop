<?php

use DynamicProduct\classes\controllers\front\DynamicFrontController;

require_once(_PS_CORE_DIR_.'/config/config.inc.php');
require_once(_PS_CORE_DIR_.'/init.php');

/**
 *
 */
class modernesmiddynamicproductAjaxModuleFrontController extends ModuleFrontController
{

  public function __construct()
  {
      $this->action = Tools::getValue('action');
      $this->method = Tools::getValue('method');
      $this->dynamicProductController =  new DynamicProductController();

      parent::__construct();
  }

  public function initContent()
  {


      $this->ajax = true;
      if ($this->errors){
              die(json_encode(array('hasError' => true, 'errors' => $this->errors)));
       }

    switch ($this->method) {
        case 'adddynamicproducttocart':
          die( $this->dynamicProductController->ajaxRequest(true));
        break;
        case 'getdynamicproductmodal' :
          die((new ModerneSmidDynamicProduct())->renderDynamicProductModal());
          break;
        case 'getdynamicproductdefaultprice' :
            $id_product = Tools::getValue('product');
            $attribute = '';
            $product = (array)new Product($id_product);
            $product['id_product'] = $id_product;
            echo json_encode($this->module->fetchDefaultDynamicProductPrice($product, $attribute));
            die();
            break;
        default:
          die(json_encode( array('error'=>'no method')));
        }
  }
}
