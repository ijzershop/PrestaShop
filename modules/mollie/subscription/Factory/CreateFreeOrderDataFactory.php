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

declare(strict_types=1);

namespace Mollie\Subscription\Factory;

use Mollie\Adapter\Link;
use Mollie\Subscription\DTO\CreateFreeOrderData;
use MolRecurringOrder;

if (!defined('_PS_VERSION_')) {
    exit;
}

class CreateFreeOrderDataFactory
{
    /** @var Link */
    private $link;

    public function __construct(
        Link $link
    ) {
        $this->link = $link;
    }

    public function build(MolRecurringOrder $recurringOrder, $newMethod)
    {
        $currencyIso = new \Currency($recurringOrder->id_currency);
        $redirectUrl = $this->link->getModuleLink('mollie', 'recurringOrderDetail', ['id_mol_recurring_order' => $recurringOrder->id]);
        $webhookUrl = $this->link->getModuleLink('mollie', 'subscriptionUpdateWebhook', ['subscription_id' => $recurringOrder->mollie_subscription_id]);

        $description = implode('-', [
            'subscription-update-',
            $recurringOrder->mollie_subscription_id,
        ]);

        return new CreateFreeOrderData(
            $currencyIso->iso_code,
            $description,
            $redirectUrl,
            $webhookUrl,
            $newMethod,
            $recurringOrder->mollie_customer_id
        );
    }
}
