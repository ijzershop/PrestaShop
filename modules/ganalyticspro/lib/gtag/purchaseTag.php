<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

namespace GanalyticsPro\Tag;

use GanalyticsPro\ModuleLib\moduleTools;

class purchaseTag extends baseTag
{
    /**
     * @var bool : current object is a cart
     */
    public $iCartId = 0;

    /**
     * __construct magic method assign
     *
     * @param array $aParams
     */
    public function __construct(array $aParams)
    {
        try {
            $this->bValid = true;

            $iCartId = \Tools::getValue('id_cart');
            $iOrderId = $aParams['iOrderId'];
            $this->oCart = new \Cart((int) $iCartId);

            // Use case to handle module payement doesn't return order id on
            if (!empty(\GAnalyticsPro::$bCompare17)) {
                if (!empty($iOrderId)) {
                    $this->iOrderId = $iOrderId;
                } elseif (!empty($iCartId)) {
                    $this->iOrderId = \Order::getIdByCartId($iCartId);
                }
            } else {
                if (!empty($iOrderId)) {
                    $this->iOrderId = $iOrderId;
                } elseif (!empty($iCartId)) {
                    $this->iOrderId = moduleTools::getIdByCartId($iCartId);
                }
            }

            if (!empty($this->iOrderId)) {
                $this->oOrder = new \Order((int) $this->iOrderId);
                $aProductInfo['order_information'] = $this->oOrder;
                $aProductInfo['products'] = $this->oOrder->getCartProducts();
            }

            // Use case set the valid to false and do not send the tag if this is PS order status error
            if ($this->oOrder->getCurrentState() == \Configuration::get('PS_OS_ERROR')) {
                $this->bValid = false;
            }

            // get context information
            $this->sCurrentLang = new \Language((int) \Context::getContext()->cookie->id_lang);

            // build the tag
            $this->aProducts = !empty($aProductInfo['products']) ? $aProductInfo['products'] : [];
            $this->oOrder = !empty($aProductInfo['order_information']) ? $aProductInfo['order_information'] : [];
        } catch (\Exception $e) {
            \PrestaShopLogger::addLog($e->getMessage(), 2, $e->getCode(), null, null, true);
        }
    }

    /**
     * method set the content type
     */
    public function setTrackingType()
    {
        if (!empty($this->bValid)) {
            $this->sTrakingType = 'purchase';
        }
    }

    /**
     * method set the content type
     */
    public function setContentType()
    {
    }

    /**
     * method set the contents
     */
    public function setContents()
    {
        $this->sContents = moduleTools::buildJsTagContent('page_list', $this->aProducts);
    }

    /**
     * method set the content id
     */
    public function setContentId()
    {
        if (!empty($this->bValid)) {
            if (\GAnalyticsPro::$aConfiguration['GAP_PURCHASE_ID_PREF'] == 'order-reference') {
                $this->sContent_id = $this->oOrder->reference;
            } else {
                $this->sContent_id = $this->oOrder->id;
            }
        }
    }

    /**
     * method set the content name
     */
    public function setContentName()
    {
    }

    /**
     * method set the coupon name
     */
    public function setCouponCodeName()
    {
        if (!empty($this->bValid)) {
            $aCartRules = $this->oOrder->getCartRules();

            if (!empty($aCartRules)) {
                $this->sCoupon_name = $aCartRules[0]['name'];
            }
        }
    }

    /**
     * method set total value
     */
    public function setValue()
    {
        if (!empty($this->bValid)) {
            $this->fValue = moduleTools::getOrderPrice($this->oOrder, \GAnalyticsPro::$aConfiguration['GAP_USE_TAX'], \GAnalyticsPro::$aConfiguration['GAP_USE_SHIPPING'], \GAnalyticsPro::$aConfiguration['GAP_USE_WRAPPING']);
        }
    }

    /**
     * method set shipping value
     */
    public function setValueShipping()
    {
        if (!empty($this->bValid)) {
            if (!empty(\GAnalyticsPro::$aConfiguration['GAP_USE_TAX'])) {
                $this->fValueShipping = number_format($this->oOrder->total_shipping_tax_incl, 2, ',', '');
            } else {
                $this->fValueShipping = number_format($this->oOrder->total_shipping_tax_excl, 2, ',', '');
            }
        }
    }

    /**
     * method set tax value
     */
    public function setValueTax()
    {
        if (!empty($this->bValid)) {
            $this->fValueTax = number_format($this->oOrder->total_paid_tax_incl - $this->oOrder->total_paid_tax_excl, 2, ',', '');
        }
    }

    /**
     * method the currency
     */
    public function setCurrency()
    {
        if (!empty($this->bValid)) {
            $this->sCurrency = \Context::getContext()->currency->iso_code;
        }
    }

    /**
     * method the query search
     */
    public function setQuerySearch()
    {
    }

    /**
     * method set the category values
     */
    public function setContentCategory()
    {
    }

    /**
     * method set JS code if needed by some tags object as category for add to cart and add to wishlist events
     */
    public function setJsCode()
    {
    }
}
