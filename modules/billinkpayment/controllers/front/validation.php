<?php
/*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

/**
 * @since 1.5.0
 */
class BillinkPaymentValidationModuleFrontController extends ModuleFrontController
{

    /**
     * @see FrontController::postProcess()
     */
    public function postProcess()
    {
	/*
	 public function initContent()
    {
        parent::initContent();
		*/
		
        $billink = new BillinkPayment;

        $cart = $this->context->cart;
        global $cookie;
        if ($cart->id_customer == 0 OR $cart->id_address_delivery == 0 OR $cart->id_address_invoice == 0 OR !$billink->active)
            Tools::redirectLink(__PS_BASE_URI__.'order.php?step=1');

        $customer = new Customer((int)$cart->id_customer);

        if (!Validate::isLoadedObject($customer))
            Tools::redirectLink(__PS_BASE_URI__.'order.php?step=1');

        $total = (float)($cart->getOrderTotal(true, Cart::BOTH));
        $currency = new Currency(Tools::getValue('currency_payement', false) ? Tools::getValue('currency_payement') : $cookie->id_currency);

        $billink->validateOrder($cart->id, Configuration::get('BILLINK_STATUS'), $total, $billink->displayName, NULL, $mailVars = '', (int)$currency->id, false, $customer->secure_key);

        $billink->createOrder($billink->currentOrder);
        $order = new Order($billink->currentOrder);

        Tools::redirectLink(__PS_BASE_URI__.'order-confirmation.php?id_cart='.$cart->id.'&id_module='.$billink->id.'&id_order='.$billink->currentOrder.'&key='.$customer->secure_key);
    }
}
