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

use Mollie\Adapter\ToolsAdapter;
use Mollie\Controller\AbstractMollieController;
use Mollie\Errors\Http\HttpStatusCode;
use Mollie\Handler\ErrorHandler\ErrorHandler;
use Mollie\Infrastructure\Response\JsonResponse;
use Mollie\Logger\PrestaLoggerInterface;
use Mollie\Subscription\Handler\SubscriptionPaymentMethodUpdateHandler;

if (!defined('_PS_VERSION_')) {
    exit;
}

class MollieSubscriptionUpdateWebhookModuleFrontController extends AbstractMollieController
{
    private const FILE_NAME = 'subscriptionUpdateWebhook';

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
        /** @var PrestaLoggerInterface $logger */
        $logger = $this->module->getService(PrestaLoggerInterface::class);

        /** @var ErrorHandler $errorHandler */
        $errorHandler = $this->module->getService(ErrorHandler::class);

        /** @var ToolsAdapter $tools */
        $tools = $this->module->getService(ToolsAdapter::class);

        $logger->info(sprintf('%s - Controller called', self::FILE_NAME));

        if (!$this->module->getApiClient()) {
            $logger->error(sprintf('Unauthorized in %s', self::FILE_NAME));

            $this->ajaxResponse(JsonResponse::error(
                $this->module->l('Unauthorized', self::FILE_NAME),
                HttpStatusCode::HTTP_UNAUTHORIZED
            ));
        }

        $transactionId = (string) $tools->getValue('id');

        if (!$transactionId) {
            $logger->error(sprintf('Missing transaction id in %s', self::FILE_NAME));

            $this->ajaxResponse(JsonResponse::error(
                $this->module->l('Missing transaction id', self::FILE_NAME),
                HttpStatusCode::HTTP_UNPROCESSABLE_ENTITY
            ));
        }

        $subscriptionId = (string) $tools->getValue('subscription_id');

        if (!$subscriptionId) {
            $logger->error(sprintf('Missing subscription id in %s', self::FILE_NAME));

            $this->ajaxResponse(JsonResponse::error(
                $this->module->l('Missing subscription id', self::FILE_NAME),
                HttpStatusCode::HTTP_UNPROCESSABLE_ENTITY
            ));
        }

        $lockResult = $this->applyLock(sprintf(
            '%s-%s-%s',
            self::FILE_NAME,
            $transactionId,
            $subscriptionId
        ));

        if (!$lockResult->isSuccessful()) {
            $logger->error(sprintf('Resource conflict in %s', self::FILE_NAME));

            $this->ajaxResponse(JsonResponse::error(
                $this->module->l('Resource conflict', self::FILE_NAME),
                HttpStatusCode::HTTP_CONFLICT
            ));
        }

        /** @var SubscriptionPaymentMethodUpdateHandler $subscriptionPaymentMethodUpdateHandler */
        $subscriptionPaymentMethodUpdateHandler = $this->module->getService(SubscriptionPaymentMethodUpdateHandler::class);

        try {
            $subscriptionPaymentMethodUpdateHandler->handle($transactionId, $subscriptionId);
        } catch (\Throwable $exception) {
            $logger->error('Failed to handle subscription update', [
                'Exception message' => $exception->getMessage(),
                'Exception code' => $exception->getCode(),
            ]);

            $errorHandler->handle($exception, null, false);

            $this->releaseLock();

            $this->ajaxResponse(JsonResponse::error(
                $this->module->l('Failed to handle subscription update', self::FILE_NAME),
                $exception->getCode()
            ));
        }

        $this->releaseLock();

        $logger->info(sprintf('%s - Controller action ended', self::FILE_NAME));

        $this->ajaxResponse(JsonResponse::success([]));
    }
}
