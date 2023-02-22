<?php
/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
use PrestaShop\PrestaShop\Adapter\Presenter\Order\OrderPresenter;

class OrderConfirmationController extends OrderConfirmationControllerCore
{
    public $ssl = true;
    public $php_self = 'order-confirmation';
    public $id_cart;
    public $id_module;
    public $id_order;
    public $reference;
    public $secure_key;
    public $order_presenter;

    /**
     * Initialize order confirmation controller.
     *
     * @see FrontController::init()
     */
    public function init()
    {
        parent::init();

        // Test below to prevent unnecessary logs from "parent::init()"
        $this->id_cart = (int) Tools::getValue('id_cart', 0);
        if (!empty($this->context->cookie->id_cart) && $this->context->cookie->id_cart == $this->id_cart) {
            $cart = new Cart($this->id_cart);
            if ($cart->orderExists()) {
                unset($this->context->cookie->id_cart);
            }
        }


        if (true === (bool) Tools::getValue('free_order')) {
            $this->checkFreeOrder();
        }

        $this->id_cart = (int) (Tools::getValue('id_cart', 0));

        $this->id_module = (int) (Tools::getValue('id_module', 0));
        $this->id_order = Order::getIdByCartId((int) ($this->id_cart));
        $this->secure_key = Tools::getValue('key', false);
        $this->order = new Order((int) ($this->id_order));
        $this->context->currency = new Currency($this->order->id_currency);
        // This data is kept only for backward compatibility purposes
        $this->reference = (string) $this->order->reference;

        $redirectLink = $this->context->link->getPageLink('history', $this->ssl);
        // The confirmation link must contain a unique order secure key matching the key saved in database,
        // this prevents user to view other customer's order confirmations
        if (!$this->id_order || !$this->id_module || !$this->secure_key || empty($this->secure_key) && (int)$this->id_module !== (int)Module::getModuleIdByName('ps_creditpayment')) {
            Tools::redirect($redirectLink . (Tools::isSubmit('slowvalidation') ? '&slowvalidation' : ''));
        }
        $this->reference = $this->order->reference;

        if(isset($this->context->cookie->selected_customer_id_customer) && !empty($this->context->cookie->selected_customer_id_customer)){
            if (!Validate::isLoadedObject($this->order) || $this->order->id_customer != (int)$this->context->cookie->selected_customer_id_customer || $this->context->cookie->selected_customer_secure_key != $this->order->secure_key) {
                Tools::redirect($redirectLink);
            }
        } else {
            if (!Validate::isLoadedObject($this->order) || $this->order->id_customer != $this->context->customer->id || $this->secure_key != $this->order->secure_key) {
                Tools::redirect($redirectLink);
            }
        }


        // Free order uses -1 as id_module, it has a special check here
        if ($this->id_module == -1) {
            if ($this->order->module !== 'free_order') {
                Tools::redirect($redirectLink);
            }
        } else {
            // Otherwise we run a normal check that module matches
            $module = Module::getInstanceById((int) ($this->id_module));
            if ($this->order->module !== $module->name) {
                Tools::redirect($redirectLink);
            }
        }

        // If checks passed, initialize customer, we will need him anyway
        $this->customer = new Customer((int) ($this->order->id_customer));
//        $this->order_presenter = new OrderPresenter($this->order);
    }
}
