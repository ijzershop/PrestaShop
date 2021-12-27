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

namespace Mollie\Service;

use Configuration;
use Exception;
use Mollie\Adapter\ConfigurationAdapter;
use Mollie\Api\Exceptions\ApiException;
use Mollie\Api\MollieApiClient;
use Mollie\Api\Resources\BaseCollection;
use Mollie\Api\Resources\Method;
use Mollie\Api\Resources\MethodCollection;
use Mollie\Api\Resources\Order as MollieOrderAlias;
use Mollie\Api\Resources\Payment;
use Mollie\Api\Resources\PaymentCollection;
use Mollie\Config\Config;
use Mollie\Repository\CountryRepository;
use Mollie\Repository\PaymentMethodRepository;
use Mollie\Service\PaymentMethod\PaymentMethodSortProviderInterface;
use MolPaymentMethod;
use PrestaShopDatabaseException;
use PrestaShopException;

class ApiService
{
    private $errors = [];

    /**
     * @var PaymentMethodRepository
     */
    private $methodRepository;

    /**
     * @var CountryRepository
     */
    private $countryRepository;

    /**
     * @var PaymentMethodSortProviderInterface
     */
    private $paymentMethodSortProvider;

    /**
     * @var ConfigurationAdapter
     */
    private $configurationAdapter;

    /**
     * @var int
     */
    private $environment;

    /*
     * @var TransactionService
     */
    private $transactionService;

    public function __construct(
        PaymentMethodRepository $methodRepository,
        CountryRepository $countryRepository,
        PaymentMethodSortProviderInterface $paymentMethodSortProvider,
        ConfigurationAdapter $configurationAdapter,
        TransactionService $transactionService
    ) {
        $this->countryRepository = $countryRepository;
        $this->paymentMethodSortProvider = $paymentMethodSortProvider;
        $this->methodRepository = $methodRepository;
        $this->configurationAdapter = $configurationAdapter;
        $this->environment = (int) $this->configurationAdapter->get(Config::MOLLIE_ENVIRONMENT);
        $this->transactionService = $transactionService;
    }

    /**
     * Get payment methods to show on the configuration page.
     *
     * @param MollieApiClient $api
     * @param string $path
     *
     * @return array
     *
     * @since 3.0.0
     * @since 3.4.0 public
     *
     * @public ✓ This method is part of the public API
     */
    public function getMethodsForConfig(MollieApiClient $api, $path)
    {
        $notAvailable = [];
        try {
            /** @var BaseCollection|MethodCollection $apiMethods */
            $apiMethods = $api->methods->allActive(['resource' => 'orders', 'include' => 'issuers', 'includeWallets' => 'applepay']);
            $apiMethods = $apiMethods->getArrayCopy();
        } catch (Exception $e) {
            $errorHandler = \Mollie\Handler\ErrorHandler\ErrorHandler::getInstance();
            $errorHandler->handle($e, $e->getCode(), false);
            $this->errors[] = $e->getMessage();

            return [];
        }

        if (!count($apiMethods)) {
            return [];
        }

        $methods = [];
        $deferredMethods = [];
        $isSSLEnabled = $this->configurationAdapter->get('PS_SSL_ENABLED_EVERYWHERE');
        foreach ($apiMethods as $apiMethod) {
            $tipEnableSSL = false;
            if (Config::APPLEPAY === $apiMethod->id && !$isSSLEnabled) {
                $notAvailable[] = $apiMethod->id;
                $tipEnableSSL = true;
            }
            $deferredMethods[] = [
                'id' => $apiMethod->id,
                'name' => $apiMethod->description,
                'available' => !in_array($apiMethod->id, $notAvailable),
                'image' => (array) $apiMethod->image,
                'issuers' => $apiMethod->issuers,
                'tipEnableSSL' => $tipEnableSSL,
            ];
        }

        ksort($methods);
        $methods = array_values($methods);
        foreach ($deferredMethods as $deferredMethod) {
            $methods[] = $deferredMethod;
        }

        $methods = $this->getMethodsObjForConfig($methods);
        $methods = $this->getMethodsCountriesForConfig($methods);
        $methods = $this->getExcludedCountriesForConfig($methods);
        $methods = $this->paymentMethodSortProvider->getSortedInAscendingWayForConfiguration($methods);

        return $methods;
    }

    private function getMethodsObjForConfig($apiMethods)
    {
        $this->environment = (int) $this->configurationAdapter->get(Config::MOLLIE_ENVIRONMENT);

        $methods = [];
        $defaultPaymentMethod = new MolPaymentMethod();
        $defaultPaymentMethod->enabled = false;
        $defaultPaymentMethod->title = '';
        $defaultPaymentMethod->method = 'payments';
        $defaultPaymentMethod->description = '';
        $defaultPaymentMethod->is_countries_applicable = false;
        $defaultPaymentMethod->minimal_order_value = '';
        $defaultPaymentMethod->max_order_value = '';
        $defaultPaymentMethod->surcharge = 0;
        $defaultPaymentMethod->surcharge_fixed_amount = '';
        $defaultPaymentMethod->surcharge_percentage = '';
        $defaultPaymentMethod->surcharge_limit = '';

        foreach ($apiMethods as $apiMethod) {
            $paymentId = $this->methodRepository->getPaymentMethodIdByMethodId($apiMethod['id'], $this->environment);
            if ($paymentId) {
                $paymentMethod = new MolPaymentMethod((int) $paymentId);
                $methods[$apiMethod['id']] = $apiMethod;
                $methods[$apiMethod['id']]['obj'] = $paymentMethod;
                continue;
            }
            $defaultPaymentMethod->id_method = $apiMethod['id'];
            $defaultPaymentMethod->method_name = $apiMethod['name'];
            $methods[$apiMethod['id']] = $apiMethod;
            $methods[$apiMethod['id']]['obj'] = $defaultPaymentMethod;
        }

        return $methods;
    }

    private function getMethodsCountriesForConfig(&$methods)
    {
        foreach ($methods as $key => $method) {
            $methods[$key]['countries'] = $this->countryRepository->getMethodCountryIds($method['obj']->id);
        }

        return $methods;
    }

    private function getExcludedCountriesForConfig(&$methods)
    {
        foreach ($methods as $key => $method) {
            $methods[$key]['excludedCountries'] = $this->countryRepository->getExcludedCountryIds($method['obj']->id);
        }

        return $methods;
    }

    /**
     * @param MollieApiClient $api
     * @param string $transactionId
     * @param bool $process Process the new payment/order status
     *
     * @return array|null
     *
     * @throws ApiException
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     *
     * @since 3.3.0
     * @since 3.3.2 $process option
     */
    public function getFilteredApiPayment($api, $transactionId, $process = false)
    {
        $payment = $api->payments->get($transactionId);
        if ($process) {
            $this->transactionService->processTransaction($payment);
        }

        if (method_exists($payment, 'refunds')) {
            $refunds = $payment->refunds();
            if (empty($refunds)) {
                $refunds = [];
            }
            $refunds = array_map(function ($refund) {
                return array_intersect_key(
                    (array) $refund,
                    array_flip([
                        'resource',
                        'id',
                        'amount',
                        'createdAt',
                    ]));
            }, (array) $refunds);
            $payment = array_intersect_key(
                (array) $payment,
                array_flip([
                    'resource',
                    'id',
                    'mode',
                    'amount',
                    'settlementAmount',
                    'amountRefunded',
                    'amountRemaining',
                    'description',
                    'method',
                    'status',
                    'createdAt',
                    'paidAt',
                    'canceledAt',
                    'expiresAt',
                    'failedAt',
                    'metadata',
                    'isCancelable',
                ])
            );
            $payment['refunds'] = (array) $refunds;
        } else {
            $payment = null;
        }

        return $payment;
    }

    /**
     * @param MollieApiClient $api
     * @param string $transactionId
     *
     * @return array|MollieOrderAlias|null
     *
     * @throws ApiException
     */
    public function getFilteredApiOrder($api, $transactionId)
    {
        /** @var MollieOrderAlias $order */
        $mollieOrder = $api->orders->get(
            $transactionId,
            [
                'embed' => 'payments',
                'include' => [
                        'details' => 'remainderDetails',
                    ],
            ]
        );

        if (method_exists($mollieOrder, 'refunds')) {
            $refunds = $mollieOrder->refunds();
            if (empty($refunds)) {
                $refunds = [];
            }
            $refunds = array_map(function ($refund) {
                return array_intersect_key(
                    (array) $refund,
                    array_flip([
                        'resource',
                        'id',
                        'amount',
                        'createdAt',
                    ]));
            }, (array) $refunds);
            $order = array_intersect_key(
                (array) $mollieOrder,
                array_flip([
                    'resource',
                    'id',
                    'mode',
                    'amount',
                    'settlementAmount',
                    'amountCaptured',
                    'status',
                    'method',
                    'metadata',
                    'isCancelable',
                    'createdAt',
                    'lines',
                ])
            );
            $order['refunds'] = (array) $refunds;
        } else {
            $order = null;
        }

        /** @var PaymentCollection $molliePayments */
        $molliePayments = $mollieOrder->payments();

        /** @var Payment $payment */
        foreach ($molliePayments as $payment) {
            $amountRemaining = [
                'value' => '0.00',
                'currency' => $payment->amount->currency,
            ];
            $order['availableRefundAmount'] = $payment->amountRemaining ?: $amountRemaining;
            $order['details'] = $payment->details !== null ? $payment->details : new \stdClass();
        }

        return $order;
    }
}
