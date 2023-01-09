<?php

namespace MsThemeConfig\QueryResult;

use PrestaShop\PrestaShop\Adapter\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Category;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use \PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderPreviewProductDetail;
use PrestaShop\PrestaShop\Core\Domain\Shop\ValueObject\ShopConstraint;
use PrestaShop\PrestaShop\Core\Domain\Shop\ValueObject\ShopId;

/**
 *
 */
class DmsOrderPreviewProductDetail extends OrderPreviewProductDetail
{
    /**
     * @var string
     */
    private $customization;
    /**
     * @var string
     */
    private $technical_image;

    private $reference;
    /**
     * @var int
     */
    private $id_product;

    /**
     * @param string $name
     * @param string $reference
     * @param string $location
     * @param int $quantity
     * @param string $unitPrice
     * @param string $totalPrice
     * @param string $totalTax
     */

    /**
     * @param string $customization
     */

    /**
     * @param string $technical_image
     */
    public function __construct(
        string $name,
        string $reference,
        string $location,
        int $quantity,
        string $unitPrice,
        string $totalPrice,
        string $totalTax,
        ?string $customization,
        ?string $technical_image,
        int $id_product
    ) {
        parent::__construct($name, $reference, $location, $quantity, $unitPrice, $totalPrice, $totalTax, $id_product);
        $this->customization = $customization;
        $this->technical_image = $technical_image;
        $this->reference = $reference;
        $this->id_product = $id_product;
    }

    /**
     * @return string
     */
    public function getCustomization(): ?string
    {
        $config = new \PrestaShop\PrestaShop\Adapter\Configuration();
        $custom_product_reference = $config->get('MODERNESMIDTHEMECONFIGURATOR_CUSTOM_PRODUCT_REFERENCE', 'CP');
        $offer_category = $config->get('MODERNESMIDTHEMECONFIGURATOR_CUSTOM_PRODUCT_CATEGORY', '6');

        $id_lang = Context::getContext()->cookie->id_lang;

        $product = new Product($this->id_product);

        $string_value = '';

        $leg_offer_cat = 0;
        $legacy_offers_category = Category::searchByName($id_lang, 'Offertes', false, false);

        if(isset($legacy_offers_category[0])){
            $leg_offer_cat = $legacy_offers_category[0]['id_category'];
        }

        if((int)$product->id_category_default == (int)$offer_category || (int)$product->id_category_default == (int)$leg_offer_cat){
            $string_value .= trim($product->description_short[$id_lang]);
        }

        if(gettype($this->customization) != 'NULL'){
            $string_value .= trim($this->customization);
        }

        return $string_value;
    }


    /**
     * @return string
     */
    public function getTechnicalImage(): ?string
    {
        $techImage = '';
        if(!empty($this->technical_image)){
            if(is_file($_SERVER['DOCUMENT_ROOT'] .$this->technical_image)){
                $domainUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://".$_SERVER['HTTP_HOST'];

                $techImage = '<img src="'.$domainUrl.$this->technical_image.'" width="auto" height="55">';
            }
        }
        return $techImage;
    }
}
