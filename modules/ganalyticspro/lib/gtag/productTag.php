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

class productTag extends baseTag
{
    /**
     * __construct magic method assign
     *
     * @param array $aParams
     */
    public function __construct(array $aParams)
    {
        $this->bValid = false;

        // get the product id
        $this->iProductId = isset($aParams['iProductId']) ? $aParams['iProductId'] : false;

        if (!empty($this->iProductId)) {
            $this->bValid = true;

            // use case - detect if we've got JS params
            $this->aJsParams = !empty($aParams['js']) && is_array($aParams['js']) ? $aParams['js'] : false;

            // get the current object
            $this->oProduct = new \Product($this->iProductId, true);
            // get context information
            $this->sCurrentLang = new \Language(\Context::getContext()->cookie->id_lang);
        }
    }

    /**
     * method set the content type
     */
    public function setTrackingType()
    {
        $this->sTrakingType = 'view_item';
    }

    /**
     * method set the content type
     */
    public function setContentType()
    {
        $this->sContent_type = parent::$sQuote . 'product' . parent::$sQuote;
    }

    /**
     * method set the content id
     */
    public function setContentId()
    {
        $this->sContents = moduleTools::buildJsTagContent('product', $this->oProduct);
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
    }

    /**
     * method set the coupon name
     */
    public function setCouponCodeName()
    {
    }

    /**
     * method set total value
     */
    public function setValue()
    {
        $this->fValue = (float)\Product::getPriceStatic($this->iProductId, true, false, 2, null, false, true);
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
        $this->sCurrency = \Context::getContext()->currency->iso_code;
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
