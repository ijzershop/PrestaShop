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

use GanalyticsPro\Configuration\moduleConfiguration;

abstract class baseTag
{
    /**
     * @var string : stock tag type name
     */
    public static $sName = '';

    /**
     * @var string : character used for tagging values
     */
    public static $sQuote = '\'';

    /**
     * @var string : character used for open complex tag
     */
    public static $sOpenTag = '[';

    /**
     * @var string : character used for open complex tag
     */
    public static $sCloseTag = ']';

    /**
     * @var bool : current page information
     */
    public $aPageInfo = [];

    /**
     * @var bool : current object valid or not
     */
    public $bValid = false;

    /**
     * @var bool : current object valid or not
     */
    public $sTrakingType = '';

    /**
     * @var string : type of content ( see['TKP_AUDIENCE_TYPE'] to have allow values )
     */
    public $sContent_type = null;

    /**
     * @var string : the content ids for the tag
     */
    public $sContent_id = null;

    /**
     * @var array : the content ids for the tag
     */
    public $sContents = [];

    /**
     * @var string : content the name
     */
    public $sContent_name = null;

    /**
     * @var string : content the name of the coupon
     */
    public $sCoupon_name = null;

    /**
     * @var string : content cotent category path
     */
    public $sContent_Category = null;

    /**
     * @var string : the float value ex price
     */
    public $fValue = null;

    /**
     * @var string : content the shipping amount
     */
    public $fValueShipping = null;

    /**
     * @var string : content the value amount
     */
    public $fValueTax = null;

    /**
     * @var string : the currency
     */
    public $sCurrency = null;

    /**
     * @var string : the search result
     */
    public $sQuerySearch = null;

    /**
     * @var array : get the JS params for some pages need to include JS code
     */
    public $aJsParams = false;

    /**
     * @var string : the JS code
     */
    public $sJsCode = '';

    /**
     * @var array : current products
     */
    public $aProducts = [];

    /**
     * get params keys
     *
     * @param array $aParams
     */
    abstract public function __construct(array $aParams);

    /**
     * method set content type
     */
    abstract public function setTrackingType();

    /**
     * method set content type
     */
    abstract public function setContentType();

    /**
     * method set ContentIds
     */
    abstract public function setContentId();

    /**
     * method set contents
     */
    abstract public function setContents();

    /**
     * method set content name
     */
    abstract public function setContentName();

    /**
     * method set coupon code name
     */
    abstract public function setCouponCodeName();

    /**
     * set\Category() method set Content Categoru
     */
    abstract public function setContentCategory();

    /**
     * method set value like a price
     */
    abstract public function setValue();

    /**
     * method set value of shipping
     */
    abstract public function setValueShipping();

    /**
     * method set value of tax
     */
    abstract public function setValueTax();

    /**
     * method set currency
     */
    abstract public function setCurrency();

    /**
     * method set query search
     */
    abstract public function setQuerySearch();

    /**
     * method set JS code if needed by some tags object as category for add to cart events
     */
    abstract public function setJsCode();

    /**
     * method set values
     *
     * @param string $sTagsType
     * @param array $aParams
     *
     * @return obj tags type abstract type
     */
    public function set()
    {
        // set tracking type
        $this->setTrackingType();

        // set content type
        $this->setContentType();

        // set Content ids
        $this->setContentId();

        // set Content ids
        $this->setContents();

        // set Content name
        $this->setContentName();

        // set coupon code name
        $this->setCouponCodeName();

        // set the content category
        $this->setContentCategory();

        // set price value
        $this->setValue();

        // set price shipping
        $this->setValueShipping();

        // set tax value
        $this->setValueTax();

        // set the currency
        $this->setCurrency();

        // set the query search
        $this->setQuerySearch();

        // set the JS code
        $this->setJsCode();
    }

    /**
     * method display properties
     *
     * @return array of properties + labels
     */
    public function display()
    {
        $aProperties = [];

        if (!empty($this->sTrakingType)) {
            $aProperties['tracking_type'] = ['label' => 'tracking_type', 'value' => $this->sTrakingType];
        }

        if (!empty($this->sContent_type)) {
            $aProperties['content_type'] = ['label' => 'content_type', 'value' => $this->sContent_type];
        }

        if (!empty($this->sContent_id)) {
            $aProperties['content_id'] = ['label' => 'content_id', 'value' => $this->sContent_id];
        }

        if (!empty($this->sContents)) {
            $aProperties['contents'] = ['label' => 'contents', 'value' => $this->sContents];
        }

        if (!empty($this->sCoupon_name)) {
            $aProperties['coupon_name'] = ['label' => 'coupon', 'value' => $this->sCoupon_name];
        } else {
            $aProperties['coupon_name'] = ['label' => 'coupon', 'value' => 'no_coupon'];
        }

        $aProperties['value'] = ['label' => 'value', 'value' => $this->fValue];

        if (!empty($this->fValueShipping)) {
            $aProperties['value_shipping'] = ['label' => 'shipping', 'value' => $this->fValueShipping];
        }

        if (!empty($this->fValueTax)) {
            $aProperties['value_tax'] = ['label' => ' tax', 'value' => $this->fValueTax];
        }

        if (!empty($this->sQuerySearch)) {
            $aProperties['query'] = ['label' => 'query', 'value' => $this->sQuerySearch];
        }

        if (!empty($this->sCurrency)) {
            $aProperties['currency'] = ['label' => 'currency', 'value' => $this->sCurrency];
        }

        if (!empty($this->sContent_name)) {
            $aProperties['content_name'] = ['label' => 'content_name', 'value' => $this->sContent_name];
        }

        if (!empty($this->sContent_Category)) {
            $aProperties['content_category'] = [
                'label' => 'content_category',
                'value' => $this->sContent_Category,
            ];
        }

        if (!empty($this->sJsCode)) {
            $aProperties['js_code'] = ['label' => 'js_code', 'value' => $this->sJsCode];
        }

        return $aProperties;
    }

    /**
     * method instantiate matched connector object
     *
     * @param string $sEventType
     * @param array $aParams
     *
     * @return obj tags type abstract type
     *
     * @throws
     */
    public static function get($sTagsType, array $aParams = null)
    {
        // if valid tag class
        if (in_array($sTagsType, array_keys(moduleConfiguration::GAP_TAGS_TYPE))) {
            switch ($sTagsType) {
                case 'home':
                    return new homeTag($aParams);
                    break;
                case 'bestsales':
                    return new bestSalesTag($aParams);
                    break;
                case 'category':
                    return new categoryTag($aParams);
                    break;
                case 'cart':
                    return new cartTag($aParams);
                    break;
                case 'checkout':
                    return new checkoutTag($aParams);
                    break;
                case 'lead':
                    return new leadTag($aParams);
                    break;
                case 'newproducts':
                    return new newProductTag($aParams);
                    break;
                case 'other':
                    return new otherTag($aParams);
                    break;
                case 'payment':
                    return new paymentTag($aParams);
                    break;
                case 'product':
                    return new productTag($aParams);
                    break;
                case 'promotion':
                    return new promotionTag($aParams);
                    break;
                case 'purchase':
                    return new purchaseTag($aParams);
                    break;
                case 'search':
                    return new searchTag($aParams);
                    break;
                case 'shipping':
                    return new shippingTag($aParams);
                    break;
                default:
                    break;
            }
        } else {
            throw new \Exception(\GanalyticsPro::$oModule->l('Internal server error => invalid dynamic tags type', 'base-dynamic-tags_class'), 510);
        }
    }
}
