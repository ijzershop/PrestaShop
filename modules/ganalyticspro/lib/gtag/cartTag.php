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

class cartTag extends baseTag
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
        $this->bValid = false;

        // use case - detect if we've got JS params
        $this->aJsParams = !empty($aParams['js']) && is_array($aParams['js']) ? $aParams['js'] : false;

        // get the cart id
        $this->iCartId = $aParams['iCartId'];

        $this->oCart = new \Cart((int) $this->iCartId);

        if (!empty($this->oCart)) {
            $this->aProducts = $this->oCart->getProducts();

            if (!empty($this->aProducts)) {
                $this->bValid = true;

                // get the context information
                $this->sCurrentLang = new \Language((int) \Context::getContext()->cookie->id_lang);
            }
        }
    }

    /**
     * method set the content type
     */
    public function setTrackingType()
    {
        $this->sTrakingType = 'view_cart';
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
        $this->fValue = (float)$this->oCart->getOrderTotal();
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
