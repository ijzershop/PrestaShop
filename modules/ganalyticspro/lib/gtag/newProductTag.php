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

class newProductTag extends baseTag
{
    /**
     * __construct magic method assign
     *
     * @param array $aParams
     */
    public function __construct(array $aParams)
    {
        $this->bValid = false;

        $iPostPage = \Tools::getValue('p');
        $iPostProductPerPage = \Tools::getValue('n');

        $iPage = !empty($iPostPage) ? $iPostPage : 0;
        $iProductPerPage = !empty($iPostProductPerPage) ? $iPostProductPerPage : \Configuration::get('PS_PRODUCTS_PER_PAGE');

        $this->aProducts = \Product::getNewProducts(\GAnalyticsPro::$iCurrentLang, $iPage, $iProductPerPage);

        if (!empty($this->aProducts)) {
            $this->bValid = true;
            // use case - detect if we've got JS params
            $this->aJsParams = !empty($aParams['js']) && is_array($aParams['js']) ? $aParams['js'] : false;

            // get context information
            $this->sCurrentLang = new \Language((int) \Context::getContext()->cookie->id_lang);
        }
    }

    /**
     * method set the content type
     */
    public function setTrackingType()
    {
        $this->sTrakingType = 'view_item_list';
    }

    /**
     * method set the content type
     */
    public function setContentType()
    {
        $this->sContent_type = parent::$sQuote . 'new_products' . parent::$sQuote;
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
        $this->sContents = moduleTools::buildJsTagContent('page_list', $this->aProducts);
    }

    /**
     * method set the content name
     */
    public function setContentName()
    {
        $this->sContent_name = parent::$sQuote . 'new_products' . parent::$sQuote;
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
