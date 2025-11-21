<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
use PrestaShop\PrestaShop\Adapter\Presenter\Order\OrderPresenter;

class OrderDetailController extends OrderDetailControllerCore
{
    /** @var string */
    public $php_self = 'order-detail';
    /** @var bool */
    public $auth = true;
    /** @var string */
    public $authRedirection = 'history';
    /** @var bool */
    public $ssl = true;

    protected $order_to_display;

    protected $reference;



    /**
     * Assign template vars related to page content.
     *
     * @see FrontController::initContent()
     */
    public function initContent(): void
    {
        parent::initContent();
        if (Configuration::isCatalogMode()) {
            Tools::redirect('index.php');
        }

        $id_order = (int) Tools::getValue('id_order');
        $id_order = $id_order && Validate::isUnsignedId($id_order) ? $id_order : false;

        if (!$id_order) {
            $reference = Tools::getValue('reference');
            $reference = $reference && Validate::isReference($reference) ? $reference : false;
            $order = $reference ? Order::getByReference($reference)->getFirst() : false;
            $id_order = $order ? $order->id : false;
        }

        if (!$id_order) {
            $this->redirect_after = '404';
            $this->redirect();
        } else {
            if (Tools::getIsset('errorQuantity')) {
                $this->errors[] = $this->trans('You do not have enough products to request an additional merchandise return.', [], 'Shop.Notifications.Error');
            } elseif (Tools::getIsset('errorMsg')) {
                $this->errors[] = $this->trans('Please provide an explanation for your RMA.', [], 'Shop.Notifications.Error');
            } elseif (Tools::getIsset('errorDetail1')) {
                $this->errors[] = $this->trans('Please check at least one product you would like to return.', [], 'Shop.Notifications.Error');
            } elseif (Tools::getIsset('errorDetail2')) {
                $this->errors[] = $this->trans('For each product you wish to add, please specify the desired quantity.', [], 'Shop.Notifications.Error');
            } elseif (Tools::getIsset('errorNotReturnable')) {
                $this->errors[] = $this->trans('This order cannot be returned', [], 'Shop.Notifications.Error');
            } elseif (Tools::getIsset('messagesent')) {
                $this->success[] = $this->trans('Message successfully sent', [], 'Shop.Notifications.Success');
            }

            $order = new Order($id_order);
            if (Validate::isLoadedObject($order) && $order->id_customer == $this->context->customer->id) {
                if ($order->id_shop != $this->context->shop->id && $this->context->customer->id_shop_group == $this->context->shop->id_shop_group) {
                    $shopGroup = new ShopGroup($this->context->customer->id_shop_group);
                    if (!$shopGroup->share_order) {
                        $this->redirect_after = '404';
                        $this->redirect();
                    }
                }
                $this->order_to_display = (new OrderPresenter())->present($order);

                $this->reference = $order->reference;


                $shipping = $order->getShipping();
                // Process tracking data with better string cleaning
                $trackingData = [];
                foreach ($shipping as $shipment) {
                    if(empty($shipment['tracking_number']) || empty($shipment['tracking_url'])) {
                        continue;
                    }
                    // Clean and split the tracking numbers and URLs
                    $trackingNumbersString = ltrim($shipment['tracking_number'], '^, '); // Remove leading ^, and spaces
                    $trackingUrlsString = ltrim($shipment['tracking_url'], '^, '); // Remove leading ^, and spaces

                    $trackingNumbers = array_filter(array_map('trim', explode(',', $trackingNumbersString)));
                    $trackingUrls = array_filter(array_map('trim', explode(',', $trackingUrlsString)));

                    // Combine tracking numbers with their corresponding URLs
                    for ($i = 0; $i < count($trackingNumbers); $i++) {
                        $trackingData[] = [
                            'tracking_number' => $trackingNumbers[$i],
                            'tracking_url' => isset($trackingUrls[$i]) ? $trackingUrls[$i] : ''
                        ];
                    }
                }

                $this->context->smarty->assign([
                    'order' => $this->order_to_display,
                    'trackingData' => $trackingData,
                    'orderObject' => $order,
                    'orderIsVirtual' => $order->isVirtual(),
                    'HOOK_DISPLAYORDERDETAIL' => Hook::exec('displayOrderDetail', ['order' => $order]),
                ]);
            } else {
                $this->redirect_after = '404';
                $this->redirect();
            }
            unset($order);
        }

        $this->setTemplate('customer/order-detail');
    }

}
