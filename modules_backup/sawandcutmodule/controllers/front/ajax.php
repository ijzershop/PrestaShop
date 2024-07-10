<?php
require_once(_PS_CORE_DIR_.'/config/config.inc.php');
require_once(_PS_CORE_DIR_.'/init.php');

class sawandcutmoduleAjaxModuleFrontController extends ModuleFrontController
{

  public function __construct()
  {
        parent::__construct();
        $this->action = Tools::getValue('action');
        $this->method = Tools::getValue('method');
        $this->sawController =  new SawController();
        $this->cutController =  new CutController();
        $this->staffelController =  new StaffelController();
    }

  public function initContent()
  {
      $this->ajax = true;
      if ($this->errors){
              die(json_encode(array('hasError' => true, 'errors' => $this->errors)));
       }

    switch ($this->method) {
        case 'addtocart':
          die( $this->sawController->ajaxRequest(true));
        break;
        case 'getmodal' :
          echo ($this->module->renderSawModal());
          die();
          break;
         case 'getcutmodal' :
          echo ($this->module->renderCutModal());
          die();
          break;
          case 'getstaffelmodal' :
          echo ($this->module->renderStaffelModal());
          die();
          break;
         case 'addstaffeltocart' :
          echo ($this->staffelController->ajaxRequest(true));
          die();
          break;
         case 'addcuttedtocart' :
          echo ($this->cutController->ajaxRequest(true));
          die();
          break;
        case 'calculatecutted' :
          echo ($this->cutController->ajaxRequest());
          die();
          break;
        case 'calculatestaffel' :
          echo ($this->staffelController->ajaxRequest());
          die();
          break;
        case 'calculate' :
          die( $this->sawController->ajaxRequest());
          break;
        default:
          die(json_encode( array('error'=>'no method')));
        }
  }
}
