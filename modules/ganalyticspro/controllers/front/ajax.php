<?php
/**
 * Google Analyics Pro
 *
 * @author    BusinessTech.f
 * @copyright Business Tech
 * @license   Commercial
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

use GanalyticsPro\Models\orderRefund;
use GanalyticsPro\ModuleLib\moduleTools;
use GanalyticsPro\Models\orderPartialRefund;

class GanalyticsproAjaxModuleFrontController extends ModuleFrontController
{
    public $ssl = true;
    protected $jsonOutput = [];
    public $ajax = true;

    /**
     * init module front controller
     */
    public function init()
    {
        // exec parent
        parent::init();
        $this->ajax = true;
    }

    /**
     * set the ajax
     */
    public function displayAjax()
    {
        $sAction = \Tools::getValue('action', 'undefined');

        if (!empty($sAction) && method_exists($this, 'ajaxProcess' . \Tools::toCamelCase($sAction))) {
            $this->{'ajaxProcess' . \Tools::toCamelCase($sAction)}();
        } else {
            $this->errors[] = $this->module->l('Undefined action', 'ajax');
        }
    }

    /**
     * handle ajax for send carrier data
     */
    protected function ajaxProcessSendCarrier()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);

        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $idCarrier = \Tools::getValue('idCarrier');
            if (!empty($idCarrier)) {
                $idCarrier = str_replace(',', '', $idCarrier);

                $oCarrier = new \Carrier((int) $idCarrier);

                if (is_object($oCarrier) && !empty($oCarrier->name)) {
                    $this->jsonOutput['sCarrierName'] = $oCarrier->name;
                } else {
                    $oCarrier = new \Carrier((int) \Context::getContext()->cart->id_carrier);
                    $this->jsonOutput['sCarrierName'] = $oCarrier->name;
                }
            }

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the remove cart event
     */
    protected function ajaxProcessRemoveCart()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);

        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $iProductId = \Tools::getValue('iProductId');
            if (!empty($iProductId)) {
                $oProduct = new \Product((int) $iProductId, \GAnalyticsPro::$iCurrentLang);
                $oCategory = new \Category((int) $oProduct->id_category_default, \GAnalyticsPro::$iCurrentLang);
                $fPrice = \Product::getPriceStatic((int) $oProduct->id, true, false, 2, null, false, true);

                // $this->jsonOutput['sPaymentMethod'] = $oCarrier->name;
                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $fPrice;
                $this->jsonOutput['data'][] = [
                    'item_id' => $oProduct->id,
                    'item_name' => str_replace('\'', '', $oProduct->name[\GAnalyticsPro::$iCurrentLang]),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => $oCategory->name,
                    'price' => $fPrice,
                    'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                ];
            }

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the select item clicked
     */
    protected function ajaxProcessSelectItem()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $iProductId = \Tools::getValue('iProductId');
            if (!empty($iProductId)) {
                $oProduct = new \Product((int) $iProductId, \GAnalyticsPro::$iCurrentLang);
                $oCategory = new \Category((int) $oProduct->id_category_default, \GAnalyticsPro::$iCurrentLang);
                $fPrice = \Product::getPriceStatic((int) $oProduct->id, true, false, 2, null, false, true);

                // $this->jsonOutput['sPaymentMethod'] = $oCarrier->name;
                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $fPrice;
                $this->jsonOutput['data'][] = [
                    'item_id' => $oProduct->id,
                    'item_name' => str_replace('\'', '', $oProduct->name[\GAnalyticsPro::$iCurrentLang]),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => $oCategory->name,
                    'price' => $fPrice,
                    'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                ];
            }

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the select promotion clicked
     */
    protected function ajaxProcessSelectPromotion()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $iProductId = \Tools::getValue('iProductId');
            if (!empty($iProductId)) {
                $oProduct = new \Product((int) $iProductId, \GAnalyticsPro::$iCurrentLang);
                $oCategory = new \Category((int) $oProduct->id_category_default, \GAnalyticsPro::$iCurrentLang);
                $fPrice = \Product::getPriceStatic((int) $oProduct->id, true, false, 2, null, false, true);

                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $fPrice;
                $this->jsonOutput['data'][] = [
                    'item_id' => $oProduct->id,
                    'item_name' => str_replace('\'', '', $oProduct->name[\GAnalyticsPro::$iCurrentLang]),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => $oCategory->name,
                    'price' => $fPrice,
                    'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                ];
            }

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the refund
     */
    protected function ajaxProcessSendRefund()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $aRefunds = orderRefund::getRefundToSend(\GAnalyticsPro::$iShopId);
            $aOutputData = [];
            $orderId = 0;

            if (!empty($aRefunds)) {
                foreach ($aRefunds as $aRefund) {
                    $oOrder = new \Order((int) $aRefund['order_id']);
                    $fTax = $oOrder->total_paid_tax_incl - $oOrder->total_paid_tax_excl;

                    if (\GAnalyticsPro::$aConfiguration['GAP_PURCHASE_ID_PREF'] == 'order-reference') {
                        $orderId = $oOrder->reference;
                    } else {
                        $orderId = $oOrder->id;
                    }

                    $aOutputData[] = [
                        'currency' => \Context::getContext()->currency->iso_code,
                        'transaction_id' => $orderId,
                        'value' => number_format($oOrder->total_paid, 2, '.', ','),
                        'shipping' => number_format($oOrder->total_shipping, 2, '.', ','),
                        'tax' => number_format($fTax, 2, '.', ','),
                    ];

                    $idRefund = orderRefund::getIdRefund(\GAnalyticsPro::$iShopId, $aRefund['order_id']);

                    if (!empty($idRefund)) {
                        $orderRefund = new orderRefund((int) $idRefund);
                        $orderRefund->sent = '1';
                        $orderRefund->update();
                    }
                }
            }
            $this->jsonOutput['refunds'] = $aOutputData;

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the partial refund
     */
    protected function ajaxProcesssendPartialRefund()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $aRefunds = orderPartialRefund::getRefundPartialToSend(\GAnalyticsPro::$iShopId);
            $aOutputData = [];

            if (!empty($aRefunds)) {
                foreach ($aRefunds as $key => $aRefund) {
                    $iOrderSlip = \OrderSlip::getOrdersSlip((int) $aRefund['cust_id'], (int) $aRefund['order_id']);
                    $idRefund = orderPartialRefund::getIdPartialRefund(\GAnalyticsPro::$iShopId, $aRefund['order_id']);
                    $oOrder = new \Order((int) $aRefund['order_id']);
                    $fTax = $oOrder->total_paid_tax_incl - $oOrder->total_paid_tax_excl;

                    // Use case if we have have orderslip to get details product line refunded
                    if (!empty($iOrderSlip)) {
                        $aProductRefunded = \OrderSlip::getOrdersSlipProducts((int) $iOrderSlip, $oOrder);

                        if (!empty($aProductRefunded)) {
                            $aOutputData['refunds_partial'][$key]['has_product'] = true;
                            foreach ($aProductRefunded as $aProduct) {
                                $aOutputData['refunds_partial'][$key]['product'][] = [
                                    'item_id' => $aProduct['product_id'],
                                    'item_name' => $aProduct['product_name'],
                                    'currency' => \Context::getContext()->currency->iso_code,
                                    'price' => $aProduct['product_price'],
                                    'quantity' => $aProduct['product_quantity_refunded'],
                                ];
                            }
                        }

                        $aOutputData['refunds_partial'][$key]['refund_data'] = [
                            'currency' => \Context::getContext()->currency->iso_code,
                            'transaction_id' => $oOrder->reference,
                            'value' => number_format($oOrder->total_paid, 2, '.', ','),
                            'shipping' => number_format($oOrder->total_shipping, 2, '.', ','),
                            'tax' => number_format($fTax, 2, '.', ','),
                        ];
                    } else {
                        $aOutputData['refunds_partial'][$key]['refund_data'] = [
                            'currency' => \Context::getContext()->currency->iso_code,
                            'transaction_id' => $oOrder->reference,
                            'value' => number_format($oOrder->total_paid, 2, '.', ','),
                            'shipping' => number_format($oOrder->total_shipping, 2, '.', ','),
                            'tax' => number_format($fTax, 2, '.', ','),
                        ];
                    }

                    if (!empty($idRefund)) {
                        $orderRefund = new orderPartialRefund((int) $idRefund);
                        $orderRefund->sent = '1';
                        $orderRefund->update();
                    }
                }
            }

            $this->jsonOutput['refunds_partial'] = $aOutputData;

            die(json_encode($this->jsonOutput['refunds_partial']));
        }
    }

    /**
     * handle ajax for handle the select promotion clicked
     */
    protected function ajaxProcessUpdateConsent()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            // Set the user cookie
            \Context::getContext()->cookie->bt_gap_consent_lvl = true;

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the select promotion clicked
     */
    protected function ajaxProcessRemovedAcbReferrer()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $acb = moduleTools::isInstalled('pm_advancedcookiebanner', [], true);
            // Only handle acbCookie referrer if the version is geater than 2.1.6 (before class didn't exist)
            if (version_compare($acb->version, '2.1.6', '>')) {
                include_once _PS_ROOT_DIR_ . '/modules/pm_advancedcookiebanner/class/AcbReferrerCookie.php';

                // Clean AcbReferrerCookie
                AcbReferrerCookie::remove();

                $referrer = AcbReferrerCookie::getReferrer();
                $jsDefs['referer'] = $referrer;
            }
            $this->jsonOutput['success'] = true;
            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle the ajax on product combination update
     */
    protected function ajaxProcessUpdateCombination()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);

        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $id_product_attribute = \Tools::getValue('id_product_attribute');
            $id_product = \Tools::getValue('id_product');

            if (!empty($id_product_attribute) && !empty($id_product)) {
                $product = new \Product((int) $id_product);
                $combination = moduleTools::getProductCombinationName($id_product_attribute, \Context::getContext()->language->id, \Context::getContext()->shop->id);
                $price = \Product::getPriceStatic((int) $product->id, true, (int) $id_product_attribute, 2, null, false, true);
                $manufacturer = new \Manufacturer((int) $product->id_manufacturer);

                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $price;
                $this->jsonOutput['data'][] = [
                    'item_id' => $id_product . '_' . $id_product_attribute,
                    'item_name' => substr(str_replace('\'', '', $product->name[\Context::getContext()->language->id] . ' ' . $combination), 0, 149),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'price' => $price,
                    'item_brand' => !empty($manufacturer->name) ? $manufacturer->name : 'No brand',
                ];
            }

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle the ajax on product combination update
     */
    protected function ajaxProcessUpdateQuickView()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);

        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $id_product_attribute = \Tools::getValue('id_product_attribute');
            $id_product = \Tools::getValue('id_product');

            if (!empty($id_product_attribute) && !empty($id_product)) {
                $product = new \Product((int) $id_product);
                $combination = moduleTools::getProductCombinationName($id_product_attribute, \Context::getContext()->language->id, \Context::getContext()->shop->id);
                $price = \Product::getPriceStatic((int) $product->id, true, (int) $id_product_attribute, 2, null, false, true);
                $manufacturer = new \Manufacturer((int) $product->id_manufacturer);

                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $price;
                $this->jsonOutput['data'][] = [
                    'item_id' => $id_product . '_' . $id_product_attribute,
                    'item_name' => substr(str_replace('\'', '', $product->name[\Context::getContext()->language->id] . ' ' . $combination), 0, 149),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'price' => $price,
                    'item_brand' => !empty($manufacturer->name) ? $manufacturer->name : 'No brand',
                ];
            } elseif (!empty($id_product)) {
                $product = new \Product((int) $id_product);
                $price = \Product::getPriceStatic((int) $product->id, true, (int) $id_product_attribute, 2, null, false, true);
                $manufacturer = new \Manufacturer((int) $product->id_manufacturer);

                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $price;
                $this->jsonOutput['data'][] = [
                    'item_id' => $id_product,
                    'item_name' => substr(str_replace('\'', '', $product->name[\Context::getContext()->language->id]), 0, 149),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'price' => $price,
                    'item_brand' => !empty($manufacturer->name) ? $manufacturer->name : 'No brand',
                ];
            }

            die(json_encode($this->jsonOutput));
        }
    }

    /**
     * handle the ajax on product combination update
     */
    protected function ajaxProcessCartPageList()
    {
        $sToken = \Tools::getValue('token');
        $sModuleToken = \Tools::getToken(false);

        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $id_product_attribute = \Tools::getValue('id_product_attribute');
            $id_product = \Tools::getValue('id_product');

            if (!empty($id_product_attribute) && !empty($id_product)) {
                $product = new \Product((int) $id_product);
                $combination = moduleTools::getProductCombinationName($id_product_attribute, \Context::getContext()->language->id, \Context::getContext()->shop->id);
                $price = \Product::getPriceStatic((int) $product->id, true, (int) $id_product_attribute, 2, null, false, true);
                $manufacturer = new \Manufacturer((int) $product->id_manufacturer);

                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $price;
                $this->jsonOutput['data'][] = [
                    'item_id' => $id_product . '_' . $id_product_attribute,
                    'item_name' => substr(str_replace('\'', '', $product->name[\Context::getContext()->language->id] . ' ' . $combination), 0, 149),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'price' => $price,
                    'item_brand' => !empty($manufacturer->name) ? $manufacturer->name : 'No brand',
                ];
            } elseif (!empty($id_product)) {
                $product = new \Product((int) $id_product);
                $price = \Product::getPriceStatic((int) $product->id, true, (int) $id_product_attribute, 2, null, false, true);
                $manufacturer = new \Manufacturer((int) $product->id_manufacturer);

                $this->jsonOutput['currency'] = \Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = $price;
                $this->jsonOutput['data'][] = [
                    'item_id' => $id_product,
                    'item_name' => substr(str_replace('\'', '', $product->name[\Context::getContext()->language->id]), 0, 149),
                    'currency' => \Context::getContext()->currency->iso_code,
                    'item_category' => moduleTools::getCategoryName((int) $product->id_category_default, \GAnalyticsPro::$iCurrentLang),
                    'price' => $price,
                    'item_brand' => !empty($manufacturer->name) ? $manufacturer->name : 'No brand',
                ];
            }

            die(json_encode($this->jsonOutput));
        }
    }
}
