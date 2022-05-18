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

class BT_GapSearchTag extends BT_BaseGapFourTaglTags
{
    /**
     * __construct magic method assign
     *
     * @param array $aParams
     */
    public function __construct(array $aParams)
    {
        $this->bValid = true;
    }

    /**
     * method set the content type
     */
    public function setTrackingType()
    {
        $this->sTrakingType = 'search';
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
        $sQuery = empty(GAnalyticsPro::$bCompare17) ? Tools::getValue('search_query') : Tools::getValue('s');
        $this->sContent_name = $sQuery;
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
