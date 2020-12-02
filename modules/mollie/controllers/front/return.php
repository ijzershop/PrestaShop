<?php
/**
 * Copyright (c) 2012-2020, Mollie B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
 * DAMAGE.
 *
 * @author     Mollie B.V. <info@mollie.nl>
 * @copyright  Mollie B.V.
 * @license    Berkeley Software Distribution License (BSD-License 2) http://www.opensource.org/licenses/bsd-license.php
 * @category   Mollie
 * @package    Mollie
 * @link       https://www.mollie.nl
 * @codingStandardsIgnoreStart
 */

use _PhpScoper5eddef0da618a\Mollie\Api\Types\PaymentMethod;
use _PhpScoper5eddef0da618a\Mollie\Api\Types\PaymentStatus;
use Mollie\Controller\AbstractMollieController;
use Mollie\Factory\CustomerFactory;
use Mollie\Repository\PaymentMethodRepository;
use Mollie\Service\RestorePendingCartService;
use Mollie\Utility\PaymentMethodUtility;
use Mollie\Utility\TransactionUtility;
use Mollie\Utility\ArrayUtility;
use Mollie\Service\PaymentReturnService;
use PrestaShop\PrestaShop\Adapter\CoreException;

if (!defined('_PS_VERSION_')) {
    exit;
}

require_once dirname(__FILE__) . '/../../mollie.php';

/**
 * Class MollieReturnModuleFrontController
 *
 * @property Context? $context
 * @property Mollie $module
 */
class MollieReturnModuleFrontController extends AbstractMollieController
{

    const FILE_NAME = 'return';

    /** @var bool $ssl */
    public $ssl = true;

    /**
     * Unset the cart id from cookie if the order exists
     *
     * @throws PrestaShopException
     * @throws CoreException
     */
    public function init()
    {
        /** @var Context $context */
        $context = Context::getContext();
        /** @var Cart $cart */
        $cart = new Cart((int)$this->context->cookie->id_cart);
        if (Validate::isLoadedObject($cart) && !$cart->orderExists()) {
            unset($context->cart);
            unset($context->cookie->id_cart);
            unset($context->cookie->checkedTOS);
            unset($context->cookie->check_cgv);
        }

        parent::init();
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Adapter_Exception
     * @throws SmartyException
     * @throws CoreException
     */
    public function initContent()
    {
        $customerId = Tools::getValue('customerId');
        $customerSecureKey = Tools::getValue('key');

        /** @var CustomerFactory $customerFactory */
        $customerFactory = $this->module->getContainer(CustomerFactory::class);
        $this->context = $customerFactory->recreateFromRequest($customerId, $customerSecureKey, $this->context);
        if (Tools::getValue('ajax')) {
            $this->processAjax();
            exit;
        }

        parent::initContent();

        $data = [];
        $cart = null;

        /** @var PaymentMethodRepository $paymentMethodRepo */
        $paymentMethodRepo = $this->module->getContainer(PaymentMethodRepository::class);
        /**
         * Set ref is indicative of a payment that is tied to an order instead of a cart, which
         * we still support for transitional reasons.
         */
        if (Tools::getIsset('ref')) {
            $idOrder = (int)Tools::getValue('id');
            // Check if user is allowed to be on the return page
            $data['auth'] = $paymentMethodRepo->getUniqReferenceOf($idOrder) === Tools::getValue('ref');
            if ($data['auth']) {
                $data['mollie_info'] = $paymentMethodRepo->getPaymentBy('order_id', (int)$idOrder);
            }
        } elseif (Tools::getIsset('cart_id')) {
            $idCart = (int)Tools::getValue('cart_id');

            // Check if user that's seeing this is the cart-owner
            $cart = new Cart($idCart);
            $data['auth'] = (int)$cart->id_customer === $this->context->customer->id;
            if ($data['auth']) {
                $data['mollie_info'] = $paymentMethodRepo->getPaymentBy('cart_id', (int)$idCart);
            }
        }

        if (isset($data['auth']) && $data['auth']) {
            // any paid payments for this cart?

            if ($data['mollie_info'] === false) {
                $data['mollie_info'] = [];
                $data['msg_details'] = $this->l('The order with this id does not exist.');
            } elseif ($data['mollie_info']['method'] === PaymentMethod::BANKTRANSFER
                && $data['mollie_info']['bank_status'] === PaymentStatus::STATUS_OPEN
            ) {
                $data['msg_details'] = $this->l('We have not received a definite payment status. You will be notified as soon as we receive a confirmation of the bank/merchant.');
            } else {
                $data['wait'] = true;
            }
        } else {
            // Not allowed? Don't make query but redirect.
            $data['mollie_info'] = [];
            $data['msg_details'] = $this->l('You are not authorised to see this page.');
            Tools::redirect(Context::getContext()->link->getPageLink('index', true));
        }

        $this->context->smarty->assign($data);
        $this->context->smarty->assign('link', $this->context->link);

        if (!empty($data['wait'])) {
            $this->context->smarty->assign(
                'checkStatusEndpoint',
                $this->context->link->getModuleLink(
                    $this->module->name,
                    'return',
                    [
                        'ajax' => 1,
                        'action' => 'getStatus',
                        'transaction_id' => $data['mollie_info']['transaction_id'],
                        'key' => $this->context->customer->secure_key,
                        'customerId' => $this->context->customer->id
                    ],
                    true
                )
            );
            $this->setTemplate('mollie_wait.tpl');
        } else {
            $this->setTemplate('mollie_return.tpl');
        }
    }

    /**
     * Prepend module path if PS version >= 1.7
     *
     * @param string $template
     * @param array $params
     * @param string|null $locale
     *
     * @throws PrestaShopException
     *
     * @since 3.3.2
     */
    public function setTemplate($template, $params = [], $locale = null)
    {
        if (version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
            $template = "module:mollie/views/templates/front/17_{$template}";
        }

        parent::setTemplate($template, $params, $locale);
    }

    /**
     * Process ajax calls
     *
     * @throws Adapter_Exception
     * @throws PrestaShopException
     * @throws SmartyException
     *
     * @since 3.3.2
     */
    protected function processAjax()
    {
        if (empty($this->context->customer->id)) {
            return;
        }

        switch (Tools::getValue('action')) {
            case 'getStatus':
                $this->processGetStatus();
                break;
        }

        exit;
    }

    /**
     * Get payment status, can be regularly polled
     *
     * @throws PrestaShopException
     * @throws Adapter_Exception
     * @throws CoreException
     * @throws SmartyException
     *
     * @since 3.3.2
     */
    protected function processGetStatus()
    {
        header('Content-Type: application/json;charset=UTF-8');
        /** @var PaymentMethodRepository $paymentMethodRepo */
        $paymentMethodRepo = $this->module->getContainer(PaymentMethodRepository::class);

        $transactionId = Tools::getValue('transaction_id');
        $dbPayment = $paymentMethodRepo->getPaymentBy('transaction_id', $transactionId);
        $cart = new Cart($dbPayment['cart_id']);
        if (!Validate::isLoadedObject($cart)) {
            die(json_encode([
                'success' => false,
            ]));
        }
        $orderId = Order::getOrderByCartId((int)$cart->id);
        $order = new Order((int)$orderId);

        if (!Validate::isLoadedObject($cart)) {
            die(json_encode([
                'success' => false,
            ]));
        }

        if ((int)$cart->id_customer !== (int)$this->context->customer->id) {
            die(json_encode([
                'success' => false,
            ]));
        }

        if (!Tools::isSubmit('module')) {
            $_GET['module'] = $this->module->name;
        }

        $isOrder = TransactionUtility::isOrderTransaction($transactionId);
        if ($isOrder) {
            $transaction = $this->module->api->orders->get($transactionId, ['embed' => 'payments']);
        } else {
            $transaction = $this->module->api->payments->get($transactionId);
        }

        $orderStatus = $transaction->status;

        if ($transaction->resource === "order") {
            $payments = ArrayUtility::getLastElement($transaction->_embedded->payments);
            $orderStatus = $payments->status;
        }

        $notSuccessfulPaymentMessage = $this->module->l('Your payment was not successful, please try again.', self::FILE_NAME);
        $paymentMethod = PaymentMethodUtility::getPaymentMethodName($transaction->method);

        /** @var PaymentReturnService $paymentReturnService */
        $paymentReturnService = $this->module->getContainer(PaymentReturnService::class);
        $stockManagement = Configuration::get('PS_STOCK_MANAGEMENT');
        switch ($orderStatus) {
            case PaymentStatus::STATUS_OPEN:
            case PaymentStatus::STATUS_PENDING:
                $response = $paymentReturnService->handlePendingStatus(
                    $order,
                    $transaction,
                    $orderStatus,
                    $paymentMethod,
                    $stockManagement
                );
                break;
            case PaymentStatus::STATUS_AUTHORIZED:
            case PaymentStatus::STATUS_PAID:
                $response = $paymentReturnService->handlePaidStatus(
                    $order,
                    $transaction,
                    $paymentMethod,
                    $stockManagement
                );
                break;
            case PaymentStatus::STATUS_EXPIRED:
            case PaymentStatus::STATUS_CANCELED:
            case PaymentStatus::STATUS_FAILED:
                $this->setWarning($notSuccessfulPaymentMessage);
                /** @var RestorePendingCartService $restorePendingCart */
                $restorePendingCart = $this->module->getContainer(RestorePendingCartService::class);
                $restorePendingCart->restore($order);

                $response = $paymentReturnService->handleFailedStatus($order, $transaction, $orderStatus, $paymentMethod);
                break;
        }

        die(json_encode($response));
    }

    private function setWarning($message)
    {
        $this->warning[] = $message;

        $this->context->cookie->mollie_payment_canceled_error =
            json_encode($this->warning);
    }
}
