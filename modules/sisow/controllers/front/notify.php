<?php
class SisowNotifyModuleFrontController extends ModuleFrontController
{
    public $ssl = true;
    public $display_column_left = false;

    public function initContent()
    {
		parent::initContent();
		
		$ec = Tools::getValue('ec');
		$trxid = Tools::getValue('trxid');
		$status = Tools::getValue('status');
		$sha1 = Tools::getValue('sha1');
		$carrier = Tools::getValue('carrier');
		$merchantid = Configuration::get('SISOW_MERCHANTID');
		$merchantkey = Configuration::get('SISOW_MERCHANTKEY');
		
		if($sha1 != sha1($trxid . $ec . $status . $merchantid . $merchantkey))
		{
			exit('Invalid notify');
		}
		
		$this->module->processNotify($ec, $trxid, $carrier);
	}
}