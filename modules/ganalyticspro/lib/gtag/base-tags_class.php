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

/**
 * declare Dynamic tags Exception class
 */
class BT_DynGapFourTaglException extends Exception
{
}

abstract class BT_BaseGapFourTaglTags
{
    /**
     * @var string $sName : stock tag type name
     */
    public static $sName = '';

    /**
     * @var string $sQuote : character used for tagging values
     */
    public static $sQuote = '\'';

    /**
     * @var string $sOpenTag : character used for open complex tag
     */
    public static $sOpenTag = '[';

    /**
     * @var string $sOpenTag : character used for open complex tag
     */
    public static $sCloseTag = ']';

    /**
     * @var bool $aPageInfo : current page information
     */
    public $aPageInfo = array();

    /**
     * @var bool $bValid : current object valid or not
     */
    public $bValid = false;

    /**
     * @var bool $bValid : current object valid or not
     */
    public $sTrakingType = '';

    /**
     * @var string $sContent_type : type of content ( see $GLOBALS['TKP_AUDIENCE_TYPE'] to have allow values )
     */
    public $sContent_type = null;

    /**
     * @var string $sContent_id : the content ids for the tag
     */
    public $sContent_id = null;

    /**
     * @var array $sContents : the content ids for the tag
     */
    public $sContents = array();

    /**
     * @var string $sContent_name : content the name
     */
    public $sContent_name = null;

    /**
     * @var string $sCoupon_name : content the name of the coupon
     */
    public $sCoupon_name = null;

    /**
     * @var string $sContent_Category : content cotent category path
     */
    public $sContent_Category = null;

    /**
     * @var string $fValue : the float value ex price
     */
    public $fValue = null;

    /**
     * @var string $float : content the shipping amount
     */
    public $fValueShipping = null;

    /**
     * @var string $float : content the value amount
     */
    public $fValueTax = null;

    /**
     * @var string $sCurrency : the currency
     */
    public $sCurrency = null;

    /**
     * @var string $sQuerySearch : the search result
     */
    public $sQuerySearch = null;

    /**
     * @var array $aJsParams : get the JS params for some pages need to include JS code
     */
    public $aJsParams = false;

    /**
     * @var string $sJsCode : the JS code
     */
    public $sJsCode = '';

    /**
     * @var array $aProducts : current products
     */
    public $aProducts = array();

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
     * setCategory() method set Content Categoru
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

        //set the content category
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
        $aProperties = array();

        if (!empty($this->sTrakingType)) {
            $aProperties['tracking_type'] = array('label' => 'tracking_type', 'value' => $this->sTrakingType);
        }

        if (!empty($this->sContent_type)) {
            $aProperties['content_type'] = array('label' => 'content_type', 'value' => $this->sContent_type);
        }

        if (!empty($this->sContent_id)) {
            $aProperties['content_id'] = array('label' => 'content_id', 'value' => $this->sContent_id);
        }

        if (!empty($this->sContents)) {
            $aProperties['contents'] = array('label' => 'contents', 'value' => $this->sContents);
        }

        if (!empty($this->sCoupon_name)) {
            $aProperties['coupon_name'] = array('label' => 'coupon', 'value' => $this->sCoupon_name);
        } else {
            $aProperties['coupon_name'] = array('label' => 'coupon', 'value' => 'no_coupon');
        }
        
        $aProperties['value'] = array('label' => 'value', 'value' => $this->fValue);
   
        if (!empty($this->fValueShipping)) {
            $aProperties['value_shipping'] = array('label' => 'shipping', 'value' => $this->fValueShipping);
        }

        if (!empty($this->fValueTax)) {
            $aProperties['value_tax'] = array('label' => ' tax', 'value' => $this->fValueTax);
        }

        if (!empty($this->sQuerySearch)) {
            $aProperties['query'] = array('label' => 'query', 'value' => $this->sQuerySearch);
        }

        if (!empty($this->sCurrency)) {
            $aProperties['currency'] = array('label' => 'currency', 'value' => $this->sCurrency);
        }

        if (!empty($this->sContent_name)) {
            $aProperties['content_name'] = array('label' => 'content_name', 'value' => $this->sContent_name);
        }

        if (!empty($this->sContent_Category)) {
            $aProperties['content_category'] = array(
                'label' => 'content_category',
                'value' => $this->sContent_Category
            );
        }

        if (!empty($this->sJsCode)) {
            $aProperties['js_code'] = array('label' => 'js_code', 'value' => $this->sJsCode);
        }

        return $aProperties;
    }

    /**
     * method instantiate matched connector object
     *
     * @param string $sEventType
     * @param array $aParams
     * @throws
     * @return obj tags type abstract type
     */
    public static function get($sTagsType, array $aParams = null)
    {
        // if valid tag class
        if (in_array($sTagsType, array_keys($GLOBALS['GAP_TAGS_TYPE']))) {
            // include
            require_once($sTagsType . '-tag_class.php');

            // set class name
            $sClassName = 'BT_Gap' . ucfirst($sTagsType) . 'Tag';

            // get tags type name
            self::$sName = $sTagsType;

            return (new $sClassName($aParams));
        } else {
            throw new BT_DynGapFourTaglException(GAnalyticsPro::$oModule->l('Internal server error => invalid dynamic tags type', 'base-dynamic-tags_class'), 510);
        }
    }
}
