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

class BT_GapPromotionTag extends BT_BaseGapFourTaglTags
{
    /**
     * __construct magic method assign
     *
     * @param array $aParams
     */
    public function __construct(array $aParams)
    {
        $this->bValid = false;

        $this->iCategoryId = (int)$aParams['iCategoryId'];
        $this->oCategory = new Category($this->iCategoryId, GAnalyticsPro::$iCurrentLang);

        if (!empty($this->oCategory)) {

            //handle the pagnitation
            $iPostPage = Tools::getValue('p');
            $iPostProductPerPage = Tools::getValue('n');
            $sPostOrderBy = Tools::getValue('orderby');
            $sPostOrderWay = Tools::getValue('orderby');

            $iPage = !empty($iPostPage) ? $iPostPage : 0;
            $iProductPerPage = !empty($iPostProductPerPage) ? $iPostProductPerPage : Configuration::get('PS_PRODUCTS_PER_PAGE');
            $sOrderby = !empty($sPostOrderBy) ? $sPostOrderBy : null;
            $sOrderway = !empty($sPostOrderWay) ? $sPostOrderWay : null;

            $this->aProducts = Product::getPricesDrop(GAnalyticsPro::$iCurrentLang, $iPage, $iProductPerPage);

            if (!empty($this->aProducts)) {
                //get the context information
                $this->sCurrentLang = new Language(GAnalyticsPro::$iCurrentLang);
                $this->bValid = true;
            }
        }
    }

    /**
     * method set the content type
     */
    public function setTrackingType()
    {
        $this->sTrakingType =  'view_promotion';
    }

    /**
     * method set the content type
     */
    public function setContentType()
    {}

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
                    );
                }
            }

            //init the string
            $this->sContents =  $aData;
        }
    }

    /**
     * method set the content name
     */
    public function setContentName()
    {
        $this->sContent_name = 'promotion';
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
