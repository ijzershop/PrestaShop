<?php
class SisowReturnModuleFrontController extends ModuleFrontController
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
		$merchantid = Configuration::get('SISOW_MERCHANTID');
		$merchantkey = Configuration::get('SISOW_MERCHANTKEY');
		
		if($sha1 != sha1($trxid . $ec . $status . $merchantid . $merchantkey))
		{
			exit('Invalid Return');
		}
		
		if($status == 'Success')
		{
			$orderId = Order::getOrderByCartId($ec);
			$order = new Order($orderId);
			$customer = new Customer($order->id_customer);
			Tools::redirect('index.php?controller=order-confirmation&id_cart='.$ec.'&id_module='.$this->module->id.'&id_order='.$orderId.'&key='.$customer->secure_key);
		}
		else
		{
			$url = $this->context->link->getPageLink('order.php');
			Tools::redirectLink($url);
		}
		exit;
	}
}