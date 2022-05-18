<?php
/**
 * Google Analyics Pro
 *
 * @author    BusinessTech.fr -  
 * @license   Commercial
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

class BT_GapShippingTag extends BT_BaseGapFourTaglTags
{
    /**
     * __construct magic method assign
     *
     * @param array $aParams
     */
    public function __construct(array $aParams)
    {
        $this->bValid = false;

        // use case - detect if we've got JS params
        $this->aJsParams = !empty($aParams['js']) && is_array($aParams['js']) ? $aParams['js'] : false;

        //get the cart id
        $this->iCartId = $aParams['iCartId'];

        $this->oCart = new Cart((int) $this->iCartId);

        if (!empty($this->oCart)) {
            $this->aProducts = $this->oCart->getProducts();

            if (!empty($this->aProducts)) {
                $this->bValid = true;

                //get the context information
                $this->sCurrentLang = new Language((int) Context::getContext()->cookie->id_lang);
            }
        }
    }

    /**
     * method set the content type
     */
    public function setTrackingType()
    {
        $this->sTrakingType = 'add_shipping_info';
    }

    /**
     * method set the content type
     */
    public function setContentType()
    {
    }

    /**
     * method set the content id
     */
    public function setContentId()
    {
        $aData = array();
        //init
        if (!empty($this->aProducts)) {

            reset($this->aProducts);

            foreach ($this->aProducts as $key => $aProduct) {
                $oProduct = new Product((int)$aProduct['id_product'], GAnalyticsPro::$iCurrentLang);
                $fPrice = Product::getPriceStatic($oProduct->id, true, false, 2, null, false, true);
                if (!empty(GAnalyticsPro::$aConfiguration['GAP_USE_UA'])) {
                    $aData[$key] = array(
                        'item_id' => $aProduct['id_product'],
                        'item_name' => str_replace('\'', '', $oProduct->name[GAnalyticsPro::$iCurrentLang]),
                        'currency' => Context::getContext()->currency->iso_code,
                        'item_category' => BT_GapModuleTools::getCategoryName((int)$oProduct->id_category_default, GAnalyticsPro::$iCurrentLang),
                        'price' => number_format($fPrice, 2, '.', ','),
                        'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                        'quantity' => (int)$aProduct['cart_quantity'],
                        'id' => $aProduct['id_product'],
                        'name' => str_replace('\'', '', $oProduct->name[GAnalyticsPro::$iCurrentLang]),
                        'brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                        'category' => BT_GapModuleTools::getCategoryName((int)$oProduct->id_category_default, GAnalyticsPro::$iCurrentLang),
                        'list_name' => BT_GapModuleTools::getCategoryName((int)$oProduct->id_category_default, GAnalyticsPro::$iCurrentLang),
                    );
                } else {
                    $aData[$key] = array(
                        'item_id' => $aProduct['id_product'],
                        'item_name' => str_replace('\'', '', $oProduct->name[GAnalyticsPro::$iCurrentLang]),
                        'currency' => Context::getContext()->currency->iso_code,
                        'item_category' => BT_GapModuleTools::getCategoryName((int)$oProduct->id_category_default, GAnalyticsPro::$iCurrentLang),
                        'price' => number_format($fPrice, 2, '.', ','),
                        'item_brand' => !empty($oProduct->manufacturer_name) ? $oProduct->manufacturer_name : 'No brand',
                        'quantity' => (int)$aProduct['cart_quantity'],
                    );
                }
            }
        }

        //init the string
        $this->sContents =  $aData;
    }

    /**
     * method set the contents
     */
    public function setContents()
    {
    }

    /**
     * method set the content name
     */
    public function setContentName()
    {
        $this->sTrakingType = 'add_shipping_info';
    }

    /**
     * method set the coupon name
     */
    public function setCouponCodeName()
    {
        $aCartRules = $this->oCart->getCartRules();

        if (!empty($aCartRules)) {
            $this->sCoupon_name  = $aCartRules[0]['description'];
        }
    }

    /**
     * method set total value
     */
    public function setValue()
    {
        $this->fValue = parent::$sQuote . $this->oCart->getOrderTotal() . parent::$sQuote;
    }

    /**
     * method set shipping value
     */
    public function setValueShipping()
    {
    }

    /**
     * method set tax value
     */
    public function setValueTax()
    {
    }

    /**
     * method the currency
     */
    public function setCurrency()
    {
        $this->sCurrency = Context::getContext()->currency->iso_code;
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
