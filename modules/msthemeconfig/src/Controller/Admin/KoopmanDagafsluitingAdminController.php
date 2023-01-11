<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
namespace MsThemeConfig\Controller\Admin;


if (!defined('_PS_VERSION_'))
	exit;

use MsThemeConfig\Class\ExportOrders;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\ModuleAdminController;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;


/**
 *
 */
class KoopmanDagafsluitingAdminController extends ModuleAdminController {

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
        $export = new ExportOrders();
	    $export->dagafsluiting();

		//Redirect to orders page
		$token = Tools::getAdminTokenLite('AdminOrders');
		Tools::redirectAdmin("index.php?controller=AdminOrders&token=".$token);
    }
}
