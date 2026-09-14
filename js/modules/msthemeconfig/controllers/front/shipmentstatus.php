<?php

use MsThemeConfig\Class\ShipmentStatusUpdater;

/**
 * Front controller: shows live shipment tracking status to the customer.
 *
 * URL: /module/msthemeconfig/shipmentstatus?order_reference=XYZ&secure_key=ABC
 *
 * The secure_key is Order::$secure_key — unique per order, prevents enumeration.
 */
class MsThemeConfigShipmentstatusModuleFrontController extends ModuleFrontController
{
    public function __construct()
    {
        parent::__construct();
        $this->ajax = false;
    }

    public function init(): void
    {
        parent::init();

        $orderReference = Tools::getValue('order_reference');
        $secureKey = Tools::getValue('secure_key');

        if (empty($orderReference) || empty($secureKey)) {
            Tools::redirect('index.php');
        }

        // Validate the order + secure key
        $order = Order::getByReference($orderReference)->getFirst();
        if (!$order || $order->secure_key !== $secureKey) {
            Tools::redirect('index.php');
        }

        $orderId = (int) $order->id;

        // Fetch stored statuses from DB
        $statuses = ShipmentStatusUpdater::getStatusesForOrder($orderId);

        // Build enriched status objects for the template
        $enrichedStatuses = [];
        foreach ($statuses as $row) {
            $statusCode = $row['status_code'];
            $fullHistory = [];
            if (!empty($row['full_history'])) {
                $fullHistory = json_decode($row['full_history'], true) ?: [];
            }

            $enrichedStatuses[] = [
                'tracking_number' => $row['tracking_number'],
                'status_code' => $statusCode,
                'status_description' => $row['status_description'],
                'status_date' => $row['status_date'],
                'status_time' => $row['status_time'],
                'eta_date' => $row['eta_date'],
                'eta_from' => $row['eta_from'],
                'eta_to' => $row['eta_to'],
                'is_completed' => (bool) $row['is_completed'],
                'date_upd' => $row['date_upd'],
                'full_history' => $fullHistory,
            ];
        }

        $this->context->smarty->assign([
            'order' => $order,
            'order_reference' => $orderReference,
            'shipment_statuses' => $enrichedStatuses,
            'has_statuses' => !empty($enrichedStatuses),
        ]);
    }

    public function initContent(): void
    {
        parent::initContent();
        $this->setTemplate('module:msthemeconfig/views/templates/front/shipmentstatus.tpl');
    }
}
