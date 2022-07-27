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

class GanalyticsproAjaxModuleFrontController extends ModuleFrontController
{

    public $ssl = true;
    protected $jsonOutput = array();
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
        $sAction = Tools::getValue('action', 'undefined');

        if (!empty($sAction) && method_exists($this, 'ajaxProcess' . Tools::toCamelCase($sAction))) {
            $this->{'ajaxProcess' . Tools::toCamelCase($sAction)}();
        } else {
            $this->errors[] = $this->module->l('Undefined action', 'ajax');
        }
    }

    /**
     * handle ajax for send carrier data
     */
    protected function ajaxProcessSendCarrier()
    {
        $sToken = Tools::getValue('token');
        $sModuleToken =  Tools::getToken(false);

        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $idCarrier = Tools::getValue('idCarrier');
            if (!empty($idCarrier)) {
                $idCarrier = str_replace(',', '', $idCarrier);

                $oCarrier = new Carrier((int)$idCarrier);

                if (is_object($oCarrier) && !empty($oCarrier->name)) {
                    $this->jsonOutput['sCarrierName'] = $oCarrier->name;
                } else {

                    $oCarrier = new Carrier((int)Context::getContext()->cart->id_carrier);
                    $this->jsonOutput['sCarrierName'] = $oCarrier->name;
                }
            }

            die(Tools::jsonEncode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the remove cart event
     */
    protected function ajaxProcessRemoveCart()
    {
        $sToken = Tools::getValue('token');
        $sModuleToken =  Tools::getToken(false);

        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {

            $iProductId = Tools::getValue('iProductId');
            if (!empty($iProductId)) {

                $oProduct = new Product((int)$iProductId, GAnalyticsPro::$iCurrentLang);
                $oCategory = new Category((int)$oProduct->id_category_default, GAnalyticsPro::$iCurrentLang);
                $fPrice = Product::getPriceStatic((int)$oProduct->id, true, false, 2, null, false, true);

                //$this->jsonOutput['sPaymentMethod'] = $oCarrier->name;
                $this->jsonOutput['currency'] = Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = number_format($fPrice, 2, '.', ',');
                $this->jsonOutput['data'][] = array(
                    'item_id' => $oProduct->id,
                    'item_name' => str_replace('\'', '', $oProduct->name[GAnalyticsPro::$iCurrentLang]),
                    'currency' => Context::getContext()->currency->iso_code,
                    'item_category' => $oCategory->name,
                    'price' => number_format($fPrice, 2, '.', ','),
                    'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                );
            }

            die(Tools::jsonEncode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the select item clicked
     */
    protected function ajaxProcessSelectItem()
    {
        $sToken = Tools::getValue('token');
        $sModuleToken =  Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $iProductId = Tools::getValue('iProductId');
            if (!empty($iProductId)) {

                $oProduct = new Product((int)$iProductId, GAnalyticsPro::$iCurrentLang);
                $oCategory = new Category((int)$oProduct->id_category_default, GAnalyticsPro::$iCurrentLang);
                $fPrice = Product::getPriceStatic((int)$oProduct->id, true, false, 2, null, false, true);

                //$this->jsonOutput['sPaymentMethod'] = $oCarrier->name;
                $this->jsonOutput['currency'] = Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = number_format($fPrice, 2, '.', ',');
                $this->jsonOutput['data'][] = array(
                    'item_id' => $oProduct->id,
                    'item_name' => str_replace('\'', '', $oProduct->name[GAnalyticsPro::$iCurrentLang]),
                    'currency' => Context::getContext()->currency->iso_code,
                    'item_category' => $oCategory->name,
                    'price' => number_format($fPrice, 2, '.', ','),
                    'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                );
            }

            die(Tools::jsonEncode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the select promotion clicked
     */
    protected function ajaxProcessSelectPromotion()
    {
        $sToken = Tools::getValue('token');
        $sModuleToken =  Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $iProductId = Tools::getValue('iProductId');
            if (!empty($iProductId)) {

                $oProduct = new Product((int)$iProductId, GAnalyticsPro::$iCurrentLang);
                $oCategory = new Category((int)$oProduct->id_category_default, GAnalyticsPro::$iCurrentLang);
                $fPrice = Product::getPriceStatic((int)$oProduct->id, true, false, 2, null, false, true);

                //$this->jsonOutput['sPaymentMethod'] = $oCarrier->name;
                $this->jsonOutput['currency'] = Context::getContext()->currency->iso_code;
                $this->jsonOutput['value'] = number_format($fPrice, 2, '.', ',');
                $this->jsonOutput['data'][] = array(
                    'item_id' => $oProduct->id,
                    'item_name' => str_replace('\'', '', $oProduct->name[GAnalyticsPro::$iCurrentLang]),
                    'currency' => Context::getContext()->currency->iso_code,
                    'item_category' => $oCategory->name,
                    'price' => number_format($fPrice, 2, '.', ','),
                    'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                );
            }

            die(Tools::jsonEncode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the refund
     */
    protected function ajaxProcessSendRefund()
    {
        require_once(_GAP_PATH_LIB . 'module-dao_class.php');

        $sToken = Tools::getValue('token');
        $sModuleToken =  Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {

            $aRefunds = BT_GapModuleDao::getRefundToSend(GAnalyticsPro::$iShopId);
            $aOutputData = array();

            if (!empty($aRefunds)) {
                foreach ($aRefunds as $aRefund) {
                    $oOrder = new Order((int)$aRefund['order_id']);
                    $fTax = $oOrder->total_paid_tax_incl - $oOrder->total_paid_tax_excl;

                    $aOutputData[] = array(
                        'currency' => Context::getContext()->currency->iso_code,
                        'transaction_id' => $oOrder->reference,
                        'value' => number_format($oOrder->total_paid, 2, '.', ','),
                        'shipping' => number_format($oOrder->total_shipping, 2, '.', ','),
                        'tax' => number_format($fTax, 2, '.', ','),
                    );

                    // Set the order send status
                    BT_GapModuleDao::updateSentOrders(GAnalyticsPro::$iShopId, $aRefund['order_id']);
                }
            }
            $this->jsonOutput['refunds'] = $aOutputData;

            die(Tools::jsonEncode($this->jsonOutput));
        }
    }

    /**
     * handle ajax for handle the partial refund
     */
    protected function ajaxProcesssendPartialRefund()
    {
        require_once(_GAP_PATH_LIB . 'module-dao_class.php');

        $sToken = Tools::getValue('token');
        $sModuleToken =  Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            $aRefunds = BT_GapModuleDao::getRefundPartialToSend(GAnalyticsPro::$iShopId);
            $aOutputData = array();

            if (!empty($aRefunds)) {
                foreach ($aRefunds as $key => $aRefund) {

                    $iOrderSlip = OrderSlip::getOrdersSlip((int)$aRefund['cust_id'], (int)$aRefund['order_id']);

                    if (!empty($iOrderSlip)) {

                        $oOrder = new Order((int)$aRefund['order_id']);
                        $aProductRefunded = OrderSlip::getOrdersSlipProducts((int)$iOrderSlip, $oOrder);
                        $fTax = $oOrder->total_paid_tax_incl - $oOrder->total_paid_tax_excl;

                        if (!empty($aProductRefunded)) {
                            $aOutputData['refunds_partial'][$key]['has_product'] = true;
                            foreach ($aProductRefunded as $aProduct) {
                                $aOutputData['refunds_partial'][$key]['product'][] = array(
                                    'item_id' => $aProduct['product_id'],
                                    'item_name' => $aProduct['product_name'],
                                    'currency' => Context::getContext()->currency->iso_code,
                                    'price' => $aProduct['product_price'],
                                    'quantity' => $aProduct['product_quantity_refunded'],
                                );
                            }
                        }
                        
                        $aOutputData['refunds_partial'][$key]['refund_data'] = array(
                            'currency' => Context::getContext()->currency->iso_code,
                            'transaction_id' => $oOrder->reference,
                            'value' => number_format($oOrder->total_paid, 2, '.', ','),
                            'shipping' => number_format($oOrder->total_shipping, 2, '.', ','),
                            'tax' => number_format($fTax, 2, '.', ','),
                        );
                    }
                    // Set the order send status
                    BT_GapModuleDao::updateSentPartialOrders(GAnalyticsPro::$iShopId, $aRefund['order_id']);
                }
            }

            $this->jsonOutput['refunds_partial'] = $aOutputData;

            die(Tools::jsonEncode($this->jsonOutput['refunds_partial']));
        }
    }

    /**
     * handle ajax for handle the select promotion clicked
     */
    protected function ajaxProcessUpdateConsent()
    {
        require_once(_GAP_PATH_LIB . 'module-dao_class.php');

        $sToken = Tools::getValue('token');
        $sModuleToken =  Tools::getToken(false);
        // Do not execute if token is missing or false
        if (!empty($sToken) && $sModuleToken == $sToken) {
            // Set the user cookie
            Context::getContext()->cookie->bt_gap_consent_lvl = true;

            die(Tools::jsonEncode($this->jsonOutput));
        }
    }
}
