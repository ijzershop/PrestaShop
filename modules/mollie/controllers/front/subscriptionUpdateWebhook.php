<?php
/**
 * Mollie       https://www.mollie.nl
 *
 * @author      Mollie B.V. <info@mollie.nl>
 * @copyright   Mollie B.V.
 * @license     https://github.com/mollie/PrestaShop/blob/master/LICENSE.md
 *
 * @see        https://github.com/mollie/PrestaShop
 * @codingStandardsIgnoreStart
 */

use Mollie\Controller\AbstractMollieController;
use Mollie\Errors\Http\HttpStatusCode;
use Mollie\Subscription\Handler\SubscriptionPaymentMethodUpdateHandler;

if (!defined('_PS_VERSION_')) {
    exit;
}

class MollieSubscriptionUpdateWebhookModuleFrontController extends AbstractMollieController
{
    /** @var Mollie */
    public $module;
    /** @var bool */
    public $ssl = true;
    /** @var bool */
    public $display_column_left = false;
    /** @var bool */
    public $display_column_right = false;

    /**
     * Prevent displaying the maintenance page.
     *
     * @return void
     */
    protected function displayMaintenancePage()
    {
    }

    public function initContent()
    {
        if (Configuration::get(Mollie\Config\Config::MOLLIE_DEBUG_LOG)) {
            PrestaShopLogger::addLog('Mollie incoming subscription webhook: ' . Tools::file_get_contents('php://input'));
        }

        exit($this->executeWebhook());
    }

    protected function executeWebhook()
    {
        $transactionId = Tools::getValue('id');
        $subscriptionId = Tools::getValue('subscription_id');

        if (!$transactionId) {
            $this->respond('failed', HttpStatusCode::HTTP_UNPROCESSABLE_ENTITY, 'Missing transaction id');
        }
        if (!$subscriptionId) {
            $this->respond('failed', HttpStatusCode::HTTP_UNPROCESSABLE_ENTITY, 'Missing subscription id');
        }

        /** @var SubscriptionPaymentMethodUpdateHandler $subscriptionPaymentMethodUpdateHandler */
        $subscriptionPaymentMethodUpdateHandler = $this->module->getService(SubscriptionPaymentMethodUpdateHandler::class);
        $subscriptionPaymentMethodUpdateHandler->handle($transactionId, $subscriptionId);

        return 'OK';
    }
}
