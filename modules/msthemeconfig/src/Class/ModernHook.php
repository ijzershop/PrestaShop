<?php
/** @noinspection ALL */
declare(strict_types=1);

namespace MsThemeConfig\Class;

use Address;
use AppKernel;
use Carrier;
use Cart;
use CartRule;
use Category;
use Configuration;
use Contact;
use Context;
use Currency;
use Customer;
use Db;
use Dispatcher;
use Exception;
use Feature;
use FeatureValue;
use FormField;
use Mail;
use Module;
use MsThemeConfig\Controller\Admin\DmsAdminOrderController;
use MsThemeConfig\Controller\Admin\DmsMailThemeController;
use MsThemeConfig\Grid\Action\Type\ShippingStateAction;
use MsThemeConfig\Grid\Column\ButtonColumn;
use MsThemeConfig\Grid\Column\LabelButtonColumn;
use Order;
use PDFCore;
use PrestaShopBundle\Form\Admin\Type\FormattedTextareaType;
use PrestaShopBundle\Form\Admin\Type\TranslatableType;
use PrestaShopBundle\Form\Admin\Type\TranslateType;
use PrestaShopDatabaseException;
use PrestaShopException;
use PrestaShop\PrestaShop\Core\ConstraintValidator\Constraints\CleanHtml;
use PrestaShop\PrestaShop\Core\Exception\FileNotFoundException;
use PrestaShop\PrestaShop\Core\Exception\TypeException;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnInterface;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\PreviewColumn;
use PrestaShop\PrestaShop\Core\Grid\Definition\GridDefinitionInterface;
use PrestaShop\PrestaShop\Core\Grid\Exception\ColumnNotFoundException;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Localization\Exception\LocalizationException;
use PrestaShop\PrestaShop\Core\MailTemplate\FolderThemeScanner;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCollectionInterface;
use Product;
use SmartyException;
use SpecificPrice;
use Store;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Tools;
use Validate;
use Zone;

/**
 *
 * Hooks Class for all hooks within the prestashop theme configurator
 *
 */
class ModernHook
{
    public $module;
    public $context;
    private $idShop;
    private $idShopGroup;
    private $idLang;
    private $shopName;
    private $currencyId;
    private $currencyCode;
    private $controller;
    private $smarty;
    private $link;

    public const TEMPLATE_INVOICE = 'Invoice';
    public const TEMPLATE_ORDER_RETURN = 'OrderReturn';
    public const TEMPLATE_ORDER_SLIP = 'OrderSlip';
    public const TEMPLATE_DELIVERY_SLIP = 'DeliverySlip';
    public const TEMPLATE_SUPPLY_ORDER_FORM = 'SupplyOrderForm';

    /**
     * @param $module
     * @param $context
     * @throws PrestaShopException
     */
    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
        $this->controller = $context->controller;
        $this->idShop = $this->context->shop->id;
        $this->idShopGroup = $this->context->shop->getGroup()->id;
        $this->idLang = $this->context->language->id;
        $this->shopName = $this->context->shop->name;

        if(is_null($this->context->currency)){
            $currency = new Currency($this->idLang);
            $this->currencyId = $currency->id;
            $this->currencyCode = $currency->iso_code;
        } else {
            $this->currencyId = $this->context->currency->id;
            $this->currencyCode = $this->context->currency->iso_code;
        }
        $this->smarty = $this->context->smarty;
        $this->link = $this->context->link;
    }

    /**
     *
     * add necessary javascript and stylesheets to products back office
     *
     * @param $params
     * @return void
     */
    public function hookActionAdminControllerSetMedia($params): void
    {
        if($this->controller->controller_name == 'AdminModules' && Tools::getValue('configure') == 'msthemeconfig')
        {

            $this->context->controller->addCSS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/jquery-ui/themes/base/theme.css');
            $this->context->controller->addCSS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/jquery-ui/themes/base/datepicker.css');
            $this->context->controller->addCSS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/jquery-ui-multidatespicker/jquery-ui.multidatespicker.css');
            $this->context->controller->addCSS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/select2/dist/css/select2.min.css');
            $this->context->controller->addCss(_MODULE_DIR_.'/'.$this->module->name.'/views/css/msthemeconfig.css', 'all');

            $this->context->controller->addJqueryUI('ui.sortable');
            $this->context->controller->addJqueryUI('ui.datepicker');

            $this->context->controller->addJS('/admin-dev/themes/new-theme/public/main.bundle.js');
            $this->context->controller->addJS('/admin-dev/themes/new-theme/public/msthemeconfig_offergrid.bundle.js');
//            $this->context->controller->addJs(_MODULE_DIR_.'/'.$this->module->name.'/views/js/datepicker-nl.js');
            $this->context->controller->addJS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/jquery-ui-multidatespicker/jquery-ui.multidatespicker.js');
            $this->context->controller->addJS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/select2/dist/js/select2.full.js');
            $this->context->controller->addJs(_MODULE_DIR_.'/'.$this->module->name.'/views/js/msthemeconfig.js');
        }

        if($this->controller->controller_name == 'AdminOfferController') {
            $this->controller->addCSS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/select2/dist/css/select2.min.css');
            $this->controller->addJS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/select2/dist/js/select2.full.min.js');
            $this->controller->addJS('/admin-dev/themes/new-theme/public/msthemeconfig_offergrid.bundle.js');
        }

        if($this->controller->controller_name == 'AdminModules' && Tools::getValue('configure') == 'offerrow') {
            $this->context->controller->addJquery();
            $this->context->controller->addJS(_MODULE_DIR_.'/'.$this->module->name.'/views/templates/admin/js/oi_admin.js');
        }

        if($this->controller->controller_name == 'AdminOrders') {
            $this->context->controller->addCSS(_MODULE_DIR_.'/'.$this->module->name.'/views/css/koopman-order-grid.css');
            $this->context->controller->addJS(_MODULE_DIR_.'/'.$this->module->name.'/views/js/koopman.js');
        }

        if ($this->context->controller->controller_name == 'AdminCustomers') {
            $this->context->controller->addJS(_MODULE_DIR_.'/'.$this->module->name.'/views/js/customer.js');
        }
    }


    /**
     * Hook Homepage
     *
     * Show categorie jsonld on homepage
     *
     * @return string
     */
    public function hookDisplayHome(): string
    {
        $selectedCats = explode(',', Configuration::get('MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES', $this->idLang, $this->idShop, $this->idShopGroup));
        $itemList = [];

        $position = 0;
        foreach ($selectedCats as $catId){
            $subCat = new Category($catId);
            $itemList[] =  $this->createCategoryJSONLD($subCat, false, true, $position);
            $position++;
        }

        $cat = new Category(2);

        $catDescription = '';
        if (isset($cat->top_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->top_description[$this->idLang]));
        }

        if (isset($cat->description_short[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->description_short[$this->idLang]));
        } elseif(isset($cat->description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->description[$this->idLang]));
        }

        $alternateName = '';
        if(isset($cat->second_name[$this->idLang])){
            $alternateName = $cat->second_name[$this->idLang];
        }


        $jsonLDCategory = [
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'url' => $this->link->getCategoryLink($cat->id),
            'numberOfItems' => count($itemList),
            'name' => $cat->name[$this->idLang],
            'alternateName' => $alternateName,
            'description' => $catDescription,
            'itemListElement' => $itemList
        ];

        $homeList = json_encode($jsonLDCategory, JSON_UNESCAPED_SLASHES);

        return '<script type="application/ld+json">'.$homeList.'</script>';
    }

    /**
     *
     * Hook to modify OrderConfirmation
     *
     * @param $params
     * @return void
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function hookDisplayOrderConfirmation($params): void
    {

        if (isset($params['order'])) {
            $idOrder = $params['order']->id;
            $idCart = $params['order']->id_cart;
            $orderObject = new Order($idOrder);
            $cartRules = $orderObject->getCartRules();

            $total_discount = 0;
            foreach ($cartRules as $rule) {

                if ((float)$rule['value_tax_excl'] != '0.000000') {
                    $total_discount += (float)$rule['value_tax_excl'];
                }
            }

            $cartObject = new Cart($idCart);
            $shipping = $orderObject->getShipping();
            $discount_check = ($shipping[0]['shipping_cost_tax_excl'] + $cartObject->getOrderTotal(false, Cart::ONLY_PRODUCTS, $orderObject->getCartProducts()) - (float)$total_discount) * 1.21;
            $this->smarty->assign(['total_discount' => $total_discount, 'discount_check' => $discount_check]);
        }
    }
    /**
     *
     * Hook to modify the delivery slip
     *
     * @param $hookArgs
     * @return void
     */
    public function hookDisplayPDFDeliverySlip($hookArgs): void
    {
        try {
            $order = new Order($hookArgs['object']->id_order);
            $hookArgs['object']->added_to_order = $order->added_to_order;
            $hookArgs['object']->desired_delivery_date = $order->desired_delivery_date;
        } catch (\PrestaShopDatabaseException|PrestaShopException) {
        }
    }
    /**
     * Filter to modify product page content
     *
     * Add JSON LD of product to product page
     *
     * @param array $params
     * @return array
     */
    public function hookFilterProductContent(array $params): array
    {
        if (empty($params['object']->id)) {
            return $params;
        }

        try {
            $jsonLD = $this->createProductJSONLD($params['object']['id_product']);
            $params['object']['jsonld_product_seo'] = json_encode($jsonLD, JSON_UNESCAPED_SLASHES);
        } catch (\PrestaShopDatabaseException|PrestaShopException) {
        }
        return $params;
    }

    /**
     * Create JSON LD for products
     *
     * Some needed variables are below, these are used because google wants shortcodes
     *
     * per pakket =  PK
     * per stuk = C62
     * kg per meter = KL
     * kg per m2 = 28
     * kg = KGM
     * mm = MMT
     * m = MTR
     * m2 = MTK
     * cmt = CMT
     *
     * @param $idProduct
     * @return array
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function createProductJSONLD($idProduct): array
    {
        $product = new Product($idProduct);

        if (isset($product->description_short[$this->idLang])) {
            $description = trim(strip_tags($product->description_short[$this->idLang]));
        } elseif(isset($product->description[$this->idLang])) {
            $description = trim(strip_tags($product->description[$this->idLang]));
        } else {
            $description = "";
        }
        $images = [];
        foreach ($product->getWsImages() as $image) {
            $images[] = $this->link->getImageLink($product->link_rewrite[$this->idLang], $image['id']);
        }

        $priceValidUntil = date('Y-m-d', strtotime("+2 day"));
        $features = [];
        $weight = [
            '@context' => 'https://schema.org/',
            '@type' => 'QuantitativeValue',
            'value' => $product->weight,
            'unitCode' => 'KGM',
            'unitText' => 'Kg'
        ];
        $width = [];
        $height = [];
        $depth = [];
        $material = '';
        $color = '';
        $additionalProperty = [];

        foreach ($product->getFeatures() as $feature) {
            $feat = new Feature($feature['id_feature']);
            $featVal = new FeatureValue($feature['id_feature_value']);

            switch ($feature['id_feature']) {
                case Configuration::get('MSTHEMECONFIG_FEATURE_LENGTH', $this->idLang, $this->idShop, $this->idShopGroup):
                    $depth = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_WIDTH', $this->idLang, $this->idShop, $this->idShopGroup):
                    $width = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_HEIGHT', $this->idLang, $this->idShop, $this->idShopGroup):
                    $height = ['@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_WEIGHT', $this->idLang, $this->idShop, $this->idShopGroup):
                    $weight = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $this->checkFeatVal($featVal->value, $this->idLang),
                        'unitCode' => 'KGM',
                        'unitText' => 'Kg'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_MATERIAL', $this->idLang, $this->idShop, $this->idShopGroup):
                    $material = $this->checkFeatVal($featVal->value, $this->idLang);
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_COLOR', $this->idLang, $this->idShop, $this->idShopGroup):
                    $color = $this->checkFeatVal($featVal->value, $this->idLang);
                    break;
                default:
                    if (str_contains($this->checkFeatVal($featVal->value, $this->idLang), 'mm')) {
                        $additionalProperty[] = [
                            '@context' => 'https://schema.org/',
                            '@type' => 'PropertyValue',
                            'name' => $feat->name[$this->idLang],
                            'value' => str_replace('mm', '', $this->checkFeatVal($featVal->value, $this->idLang)),
                            'unitCode' => 'MMT',
                            'unitText' => 'mm'
                        ];
                    } else {
                        $additionalProperty[] = [
                            '@context' => 'https://schema.org/',
                            '@type' => 'PropertyValue',
                            'name' => $feat->name[$this->idLang],
                            'value' => $this->checkFeatVal($featVal->value, $this->idLang)
                        ];
                    }
                    break;
            }
        }

        $specificPrices = SpecificPrice::getByProductId((int)$product->id);
        $priceSpecification = [];
        $price = $product->getPrice();

        if (empty($specificPrices)) {
            $priceSpecification[] = [
                '@context' => 'https://schema.org/',
                '@type' => 'UnitPriceSpecification',
                'priceType' => 'https://schema.org/SalePrice',
                'price' => round($price, 2),
                'priceCurrency' => 'EUR',
                'valueAddedTaxIncluded' => true,
                'billingIncrement' => 1,
                'unitCode' => 'C62',
                'eligibleQuantity' => [
                    '@type' => 'QuantitativeValue',
                    'minValue' => 1,
                    'unitCode' => 'C62'
                ]
            ];
        } else {
            $priceSpecification[] = [
                '@context' => 'https://schema.org/',
                '@type' => 'UnitPriceSpecification',
                'priceType' => 'https://schema.org/SalePrice',
                'price' => round($price, 2),
                'priceCurrency' => 'EUR',
                'valueAddedTaxIncluded' => true,
                'billingIncrement' => 1,
                'unitCode' => 'C62',
                'eligibleQuantity' => [
                    '@type' => 'QuantitativeValue',
                    'minValue' => 1,
                    'maxValue' => (int)$specificPrices[0]['from_quantity'] - 1,
                    'unitCode' => 'C62'
                ]
            ];
        }

        foreach ($specificPrices as $key => $item) {
            if (array_key_exists($key + 1, $specificPrices)) {
                $priceSpecification[] = [
                    '@context' => 'https://schema.org/',
                    '@type' => 'UnitPriceSpecification',
                    'priceType' => 'https://schema.org/SalePrice',
                    'price' => Product::getPriceStatic($product->id, true, null, 2, null, false, true, (int)$item['from_quantity']),
                    'priceCurrency' => 'EUR',
                    'valueAddedTaxIncluded' => true,
                    'billingIncrement' => 1,
                    'unitCode' => 'C62',
                    'eligibleQuantity' => [
                        '@type' => 'QuantitativeValue',
                        'minValue' => (int)$item['from_quantity'],
                        'maxValue' => (int)$specificPrices[$key + 1]['from_quantity'] - 1,
                        'unitCode' => 'C62'
                    ]
                ];
            } else {
                $priceSpecification[] = [
                    '@context' => 'https://schema.org/',
                    '@type' => 'UnitPriceSpecification',
                    'priceType' => 'https://schema.org/SalePrice',
                    'price' => Product::getPriceStatic($product->id, true, null, 2, null, false, true, (int)$item['from_quantity']),
                    'priceCurrency' => 'EUR',
                    'valueAddedTaxIncluded' => true,
                    'billingIncrement' => 1,
                    'unitCode' => 'C62',
                    'eligibleQuantity' => [
                        '@type' => 'QuantitativeValue',
                        'minValue' => (int)$item['from_quantity'],
                        'unitCode' => 'C62'
                    ]
                ];
            }
        }

        $carrier = new Carrier(Configuration::get('MSTHEMECONFIG_SHIPPING_CARRIER', $this->idLang, $this->idShop, $this->idShopGroup));
        $deliveryPrice = $carrier->getDeliveryPriceByPrice(5, Zone::getIdByName('Europe'), $this->currencyId);

        $availableStock = 'https://schema.org/InStock';

        $store = new Store($this->idShop, $this->idLang);

        $contacts = [];

        $contacts[] = [
            '@context' => 'https://schema.org/',
            '@type' => 'ContactPoint',
            'telephone' => Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_WHATSAPP', $this->idLang, $this->idShop, $this->idShopGroup),
            'contactType' => 'whatsapp'
        ];

        foreach (Contact::getContacts($this->idLang) as $contact) {
            $contacts[] = [
                '@context' => 'https://schema.org/',
                '@type' => 'ContactPoint',
                'telephone' => Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE', $this->idLang, $this->idShop, $this->idShopGroup),
                'email' => $contact['email'],
                'contactType' => $contact['name']
            ];
        }

        return [
            '@context' => 'https://schema.org/',
            '@type' => 'Product',
            'sku' => $this->shopName . '-' . $product->reference,
//            'gtin14' => (int)$this->shopName . '-' . $product->id,
            'image' => $images,
            'name' => $product->name[$this->idLang],
            'alternateName' => $product->alternate_name,
            'description' => $description,
            'keywords' => $product->seo_keywords,
            'material' => $material,
            'color' => $color,
            'weight' => $weight,
            'depth' => $depth,
            'height' => $height,
            'width' => $width,
            'additionalProperty' => $additionalProperty,
            'brand' => ['@type' => 'Brand',
                'name' => $this->shopName
            ],
            "review" => [],
              "aggregateRating" => [
                "@type" => "AggregateRating",
                "ratingValue" => 5,
                "reviewCount" => 1
            ],
            'offers' => [
                "hasMerchantReturnPolicy" => [
                    "@type" => "MerchantReturnPolicy",
                    "applicableCountry" => "NL",
                    "returnPolicyCategory" => "https://schema.org/MerchantReturnFiniteReturnWindow",
                    "merchantReturnDays" => 30,
                    "returnMethod" => "https://schema.org/ReturnByMail",
                    "returnShippingFeesAmount" => [
                        '@type' => 'MonetaryAmount',
                        'minValue' => '10',
                        'maxValue' => '250',
                        'value' => '35',
                        'currency' => 'EUR'
                    ],
                ],
                '@context' => 'http://schema.org',
                '@type' => 'Offer',
                'url' => $this->link->getProductLink($product->id),
                'itemCondition' => 'https://schema.org/NewCondition',
                'availability' => $availableStock,
                'priceValidUntil' => $priceValidUntil,
                'price' => round($price, 2),
                'priceCurrency' => $this->currencyCode,
                'priceSpecification' => [$priceSpecification],
                'seller' => [
                    '@context' => 'http://schema.org',
                    '@type' => 'Organization',
                    'url' => $this->context->shop->getBaseURL(true),
                    'logo' => $this->context->shop->getBaseURL(true) . 'img/' . Configuration::get('PS_LOGO', $this->idLang, $this->idShop, $this->idShopGroup),
                    'image' => [
                        'https://demodernesmid.nl/upload/uploaded_files/jota-570.png',
                        'https://ijzershop.nl/upload/supportdesk.png',
                        'https://constructiebalk.nl/upload/IJzershop-corten.png'
                    ],
                    'name' => $this->shopName,
                    'telephone' => $store->phone,
                    'email' => $store->email,
                    'contactPoint' => $contacts,
                    'address' => [
                        '@type' => 'PostalAddress',
                        'addressCountry' => 'Nederland',
                        'addressLocality' => $store->city,
                        'postalCode' => $store->postcode,
                        'streetAddress' => $store->address1
                    ], 'geo' => [
                        '@type' => 'GeoCoordinates',
                        'latitude' => $store->latitude,
                        'longitude' => $store->longitude
                    ],
                    'openingHoursSpecification' => [
                        [
                            '@type' => 'OpeningHoursSpecification',
                            'dayOfWeek' => [
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday'
                            ],
                            'opens' => '8:00',
                            'closes' => '17:00'
                        ]
                    ],
                ],
                'shippingDetails' => [
                    '@context' => 'http://schema.org',
                    '@type' => 'OfferShippingDetails',
                    'shippingLabel' => 'Verzending met Transmission',
                    'shippingRate' => [
                        '@type' => 'MonetaryAmount',
                        'value' => round($deliveryPrice * 1.21, 2),
                        'currency' => 'EUR'
                    ],
                    'shippingDestination' => [
                        '@context' => 'http://schema.org',
                        '@type' => 'DefinedRegion',
                        'addressCountry' => 'NL',
                        'postalCodeRange' => [
                            'context' => 'https://schema.org',
                            '@type' => 'PostalCodeRangeSpecification',
                            'postalCodeBegin' => '1000 AA',
                            'postalCodeEnd' => '9999 ZZ'
                        ]
                    ],
                    'deliveryTime' => [
                        '@context' => 'https://schema.org/',
                        '@type' => 'ShippingDeliveryTime',
                        'handlingTime' => [
                            '@type' => 'QuantitativeValue',
                            'minValue' => '0',
                            'maxValue' => '1',
                            'unitCode' => 'd'
                        ],
                        'transitTime' => [
                            '@context' => 'https://schema.org/',
                            '@type' => 'QuantitativeValue',
                            'minValue' => '1',
                            'maxValue' => '7',
                            'unitCode' => 'd'
                        ],
                        'cutoffTime' => '17:00-08:00',
                        'businessDays' => [
                            '@context' => 'http://schema.org',
                            '@type' => 'OpeningHoursSpecification',
                            'dayOfWeek' => [
                                'https://schema.org/Monday',
                                'https://schema.org/Tuesday',
                                'https://schema.org/Wednesday',
                                'https://schema.org/Thursday',
                                'https://schema.org/Friday'
                            ]
                        ]
                    ]
                ]
            ]
        ];
    }
    /**
     * Modify search result content
     *
     * Add json ld to category pages when search provider is used
     *
     * @param $hookArgs
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws \PrestaShopDatabaseException|PrestaShopException
     */
    public function hookActionProductSearchProviderRunQueryAfter($hookArgs): void
    {
        $cat = new Category($hookArgs['query']->getIdCategory());
        $catImages = [$this->link->getCatImageLink($cat->link_rewrite, $cat->id_category)];
        $catTotalProducts = 0;
        $catDescription = "";
        if (!empty($cat->top_description) && isset($cat->top_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->top_description[$this->idLang]));
        }

        if (!empty($cat->description_short) && isset($cat->description_short[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->description_short[$this->idLang]));
        } elseif(isset($cat->description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->description[$this->idLang]));
        }

        $jsonLD = [];
        $products = $cat->getProducts($this->idLang, 0, 100);
        if (is_countable($products)) {
            $catTotalProducts = count($products);
            foreach ($cat->getProducts($this->idLang, 0, 100) as $prod) {
                $jsonLD[] = $this->createProductJSONLD($prod['id_product']);
            }
        }

        $alternateName = '';
        if(isset($cat->second_name[$this->idLang])){
            $alternateName = $cat->second_name[$this->idLang];
        }


        $jsonLDCategory = [];
        if (!is_null($cat->id)) {
            $jsonLDCategory = [
                '@context' => 'https://schema.org',
                '@type' => 'ItemList',
                'url' => $this->link->getCategoryLink($cat->id),
                'numberOfItems' => $catTotalProducts,
                'name' => $cat->name[$this->idLang],
                'alternateName' => $alternateName,
                'description' => $catDescription,
                'image' => $catImages,
                'itemListElement' => $jsonLD
            ];
        }

        $hookArgs['result']->jsonld_category_seo = json_encode($jsonLDCategory, JSON_UNESCAPED_SLASHES);
    }
    /**
     * Modify the object of the front controller
     *
     * Add stock management data to configuration object, so it can be used in the templates
     *
     * @param $params
     * @return void
     */
    public function hookActionBuildFrontEndObject(&$params): void
    {
        $params['obj']['configuration']['stock_management'] = (int)Configuration::get('PS_STOCK_MANAGEMENT', $this->idLang, $this->idShop, $this->idShopGroup, 0);
        $params['obj']['configuration']['order_out_of_stock'] = (int)Configuration::get('PS_ORDER_OUT_OF_STOCK', $this->idLang, $this->idShop, $this->idShopGroup, 1);
    }

    /**
     *
     * @param $params
     * @return mixed
     */
    public function hookDisplayAdminProductsSeoStepBottom($params): mixed
    {
        $kernel = new AppKernel('prod', false);
        $kernel->boot();

        $id_product = (int)$params['id_product'];
        $productAdapter = $kernel->getContainer()->get('prestashop.adapter.data_provider.product');
        $product = $productAdapter->getProduct($id_product);

        $formData = [];

        $formData['alternate_name'] = $product->alternate_name;
        $formData['seo_keywords'] = $product->seo_keywords;

        if (!empty($product->jsonld)) {
            $formData['jsonld'] = $product->jsonld;
        } else {
            $formData['jsonld'] = "{}";
        }

        $formFactory = $kernel->getContainer()->get('form.factory');

        $form = $formFactory->createBuilder(FormType::class, $formData)
            ->add('alternate_name', TextType::class, [
                'required' => false,
                'label' => 'Alternate Name',
                'help' => 'Voeg hier de gewenste product alias naam in om toe te voegen aan de google schema',
                'label_attr' => [
                    'class' => 'text-left w-auto'
                ],
                'attr' => [
                    'class' => 'col-12',
                ]
            ])
            ->add('seo_keywords', TextType::class, [
                'required' => false,
                'label' => 'SEO Keywords',
                'help' => 'Voeg hier de gewenste extra SEO sleutelwoorden in om toe te voegen aan de google schema',
                'label_attr' => [
                    'class' => 'text-left w-auto'
                ],
                'attr' => [
                    'class' => 'col-12',
                ]
            ])->add('jsonld', TextareaType::class, [
                'required' => false,
                'label' => 'JSON+LD',
                'help' => 'Voeg hier de gewenste extra json+ld waarden in om toe te voegen aan de google',
                'label_attr' => [
                    'class' => 'text-left w-auto'
                ],
                'attr' => [
                    'class' => 'col-12',
                    'rows' => '20'
                ]
            ])
            ->getForm();

        $jsonldForm = [];
        $jsonldForm['form'] = $form->createView();

        return $this->module->get('twig')->render('@Modules\msthemeconfig\views\templates\admin\custom-product-fields.html.twig', $jsonldForm);
    }

    /**
     *
     * @param $params
     * @return mixed
     * @throws PrestaShopException
     */
    public function hookActionAdminProductsControllerSaveAfter($params): mixed
    {
        $idProduct = (int)Tools::getValue('id_product');
        $productObject = new Product($idProduct);

        $jsonLd = $_REQUEST['form']['jsonld'];
        if (!isset($params) || $params['controller']->controller_name != 'AdminProducts') { // Make sure datas come form this form
            return false;
        }
        $productObject->alternate_name = $_REQUEST['form']['alternate_name'];
        $productObject->seo_keywords = $_REQUEST['form']['seo_keywords'];

        json_decode($jsonLd);
        if (json_last_error() === JSON_ERROR_NONE) {
            $productObject->jsonld = $jsonLd;
//            die();
        }

        $productObject->save();

        if (!Validate::isLoadedObject($productObject)) {
            return false;
        }
        return true;
    }
    /**
     *
     * Send delivery slip to multiple email addresses set in de config page
     *
     * @TODO check function
     *
     * @param $data
     * @return bool|void
     * @throws LocalizationException
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function hookActionOrderStatusPostUpdate($data)
    {
        $conf = Configuration::get('MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON', $this->idLang, $this->idShopGroup, $this->idShop, '');
        if (!empty($conf)) {
            $dbData = json_decode($conf);
            $newOrderStateId = $data['newOrderStatus']->id;
            $orderId = $data['id_order'];
            $order = new Order($orderId);
            if (Validate::isLoadedObject($order)) {
                for ($i = 0; $i < count($dbData); $i++) {
                    if ((int)$dbData[$i]->id_order_state == (int)$newOrderStateId) {
                        //configured orderstate send delivery slip to emails
                        $firstEmail = $dbData[$i]->first_email_order_state; //send to email
                        $secondEmail = $dbData[$i]->second_email_order_state; //cc to email

                        $id_order_history = Db::getInstance()->getValue('
                        SELECT `id_order_history`
                        FROM `' . _DB_PREFIX_ . 'order_history`
                        WHERE `id_order` = ' . (int)$orderId . '
                        ORDER BY `date_add` DESC, `id_order_history` DESC');

                        $result = Db::getInstance()->getRow('
            SELECT osl.`template`, c.`lastname`, c.`firstname`, osl.`name` AS osname, c.`email`, os.`module_name`, os.`id_order_state`, os.`pdf_invoice`, os.`pdf_delivery`
            FROM `' . _DB_PREFIX_ . 'order_history` oh
                LEFT JOIN `' . _DB_PREFIX_ . 'orders` o ON oh.`id_order` = o.`id_order`
                LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON o.`id_customer` = c.`id_customer`
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON oh.`id_order_state` = os.`id_order_state`
                LEFT JOIN `' . _DB_PREFIX_ . 'order_state_lang` osl ON (os.`id_order_state` = osl.`id_order_state` AND osl.`id_lang` = o.`id_lang`)
            WHERE oh.`id_order_history` = ' . (int)$id_order_history . ' AND os.`send_email` = 1');

                        $carrierUrl = '';
                        if (Validate::isLoadedObject($carrier = new Carrier((int)$order->id_carrier,
                            $order->id_lang))) {
                            $carrierUrl = $carrier->url;
                        }

                        $data = [
                            '{lastname}' => $result['lastname'],
                            '{firstname}' => $result['firstname'],
                            '{id_order}' => (int)$orderId,
                            '{order_name}' => $order->getUniqReference(),
                            '{followup}' => str_replace('@', $order->getWsShippingNumber(), $carrierUrl),
                            '{shipping_number}' => $order->getWsShippingNumber(),
                            '{desired_delivery_date}' => date_format(date_create($order->desired_delivery_date),
                                'd-m-Y'),
                        ];

                        if ($result['module_name']) {
                            $module = Module::getInstanceByName($result['module_name']);
                            if (Validate::isLoadedObject($module) && isset($module->extra_mail_vars) && is_array($module->extra_mail_vars)) {
                                $data = array_merge($data, $module->extra_mail_vars);
                            }
                        }

                        $data['{total_paid}'] = $this->context->currentLocale->formatPrice((float)$order->total_paid,
                            'EUR');

                        // Attach invoice and / or delivery-slip if they exist and status is set to attach them
                        $invoice = $order->getInvoicesCollection();
                        $file_attachment = [];

                        if ($order->delivery_number) {
                            $pdf = new PDFCore($invoice, self::TEMPLATE_DELIVERY_SLIP, $this->context->smarty);
                            $file_attachment['content'] = $pdf->render(false);
                            $file_attachment['name'] = Configuration::get('PS_DELIVERY_PREFIX',
                                    $this->idLang, null, $order->id_shop) . '.pdf';
                            $file_attachment['mime'] = 'application/pdf';
                        }

                        $mail = Mail::send((int)$order->id_lang, 'dropshipping_request', 'Nieuwe bestelling', $data,
                            $firstEmail, 'Leverancier', 'De moderne smid', 'info@v15.nl', $file_attachment, 2,
                            _PS_MAIL_DIR_, false, (int)$order->id_shop, $secondEmail, 'info@v15.nl', 'de Moderne Smid');
                        if (!$mail) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }
        }
    }

    /**
     * Check if customer exists
     *
     * @param $customer
     * @return void
     */
    public function hookActionCustomerAccountAdd($customer): void
    {
        //warning the new customer is already created and added to this list
        $existingCustomersList = Customer::getCustomersByEmail($customer['newCustomer']->email);
        foreach ($existingCustomersList as $key => $customerObject) {
            if ((int)$customerObject['is_guest'] == 1) {
                Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . 'orders` SET `id_customer`=' . (int)$customer['newCustomer']->id . ' WHERE `id_customer` = ' . (int)$customerObject['id_customer']);
            }
        }
    }

    /**
     * Add house number and house number extension fields to address form
     *
     *
     * @param array $params
     *
     */
    public function hookActionCustomerAddressFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];

        $allFields = $formBuilder->all();
        foreach ($allFields as $inputField => $input) {
            $formBuilder->remove($inputField);
        }

        foreach ($allFields as $inputField => $input) {
            $formBuilder->add($input);
            if ($inputField == 'address1') {
                $formBuilder->add('house_number', TextType::class, [
                    'label' => $this->module->getTranslator()->trans('House Number', [],
                        'Modules.MsThemeConfig'),
                    'required' => true,
                ]);

                $formBuilder->add('house_number_extension', TextType::class,
                    [
                        'label' => $this->module->getTranslator()->trans('House Number Extension', [],
                            'Modules.MsThemeConfig'),
                        'required' => false,
                    ]);
            }
        }

        $address = new Address($params['id']);

        $params['data']['house_number'] = $address->house_number;
        $params['data']['house_number_extension'] = $address->house_number_extension;

        $formBuilder->setData($params['data']);
    }

    /**
     *
     * @param array $params
     * @return array
     */
    public function hookDisplayAdditionalCustomerAddressFields(array $params): array
    {
        return [
            (new FormField())
                ->setName('house_number')
                ->setType('text')
                ->setRequired(true)
                ->setLabel($this->module->l('House Number')),
            (new FormField())
                ->setName('house_number_extension')
                ->setType('text')
                ->setLabel($this->module->l('House Number Extension')),
        ];
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     *     * @todo remove hook
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateCustomerAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     *
     * @todo remove hook
     * Update / Create custom address fields
     *
     * @param array $params
     *
     */
    private function updateCustomAddressFields(array $params): void
    {
//        $addressId = (int)$params['id'];
//
//        /** @var array $addressFormData */
//        $addressFormData = $params['form_data'];
//        $house_number = $addressFormData['house_number'];
//        $house_number_extension = $addressFormData['house_number_extension'];
//
//        $address = new Address($addressId);
//        $address->house_number = $house_number;
//        $address->house_number_extension = $house_number_extension;
//        $address->update();
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateCustomerAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     *
     * @throws PrestaShopException
     * @throws PrestaShopException
     */
    public function hookActionFrontControllerSetMedia(): bool
    {
        //check live mode to use minified files
        $liveMode = false;
        $reviewPage = Configuration::get('IJZERSHOPKIYOH_REVIEW_PAGE', $this->idLang, $this->idShop, $this->idShopGroup);

        $min = '';
        if($liveMode){
            $min='.min';
        }



        if (Dispatcher::getInstance()->getController() == 'cart') {
            $this->controller->registerJavascript('tinymce', 'js/tiny_mce/tinymce.min.js', ['priority' => 200, 'attribute' => 'async']);
        } elseif (Dispatcher::getInstance()->getController() == 'cms') {
            if ((int)$this->controller->cms->id == (int)$reviewPage) {
                $this->controller->registerJavascript(
                    'module-msthemeconfig-kiyohxmlconvertjs',
                    'modules/' . $this->module->name . '/views/js/xmlconvert' . $min . '.js',
                    [
                        'priority' => 200,
                        'attribute' => 'async',
                    ]
                );

                $this->controller->registerJavascript(
                    'msthemeconfig-kiyohjs',
                    'modules/' . $this->module->name . '/views/js/ijzershopkiyoh' . $min . '.js',
                    [
                        'priority' => 200,
                        'attribute' => 'async'
                    ]
                );

                $this->controller->registerStyleSheet(
                    'module-msthemeconfig-kiyohstyle',
                    'modules/' . $this->module->name . '/views/css/ijzershopkiyoh' . $min . '.css');
            }
        }
        return true;
    }

    /**
     * @return false|string
     * @throws PrestaShopDatabaseException
     * @throws SmartyException
     * @throws \PrestaShopDatabaseException
     */
    public function hookKiyohBanner(): bool|string
    {
        $query = "SELECT * FROM `" . _DB_PREFIX_ . "kiyoh_custom` where `id` = '1'";
        $results = Db::getInstance()->executeS($query);

        if (empty($results)) {
                $attr = [
                    'averageRating' => 10,
                    'averageRatingPercentage' => 99,
                    'totalReviews' => 2400,
                ];
        } else {
            $attr = [
                'averageRating' => $results[0]['kiyoh_average'],
                'averageRatingPercentage' => $results[0]['kiyoh_average_percentage'],
                'totalReviews' => $results[0]['kiyoh_comments_total']
            ];
        }

        if ($attr['averageRating'] == 0) {
            $grade = 10;
        } else {
            $grade = $attr['averageRating'];
        }
        $rating = [
            '@context' => 'https://schema.org/',
            '@type' => 'AggregateRating',
            'ratingValue' => (float)$grade/2,
            'reviewCount' => $attr['totalReviews'] + 1
        ];

        $attr['shippingPage'] = Context::getContext()->link->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK', $this->idLang, $this->idShop, $this->idShopGroup), null, null, $this->idLang, $this->idShop);
        $attr['rating'] = json_encode($rating, JSON_UNESCAPED_SLASHES);
        $this->smarty->assign('attr', $attr);

        return $this->smarty->fetch(_PS_MODULE_DIR_ . DIRECTORY_SEPARATOR . $this->module->name . '/views/templates/front/kiyoh-score-header-block.tpl');
    }

    /**
     * @return array
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    protected function getDiscountAdvertisement(): array
    {
        $maxReductionPercent = 0;
        $idLang = Context::getContext()->language->id;
        $idShopGroup = Context::getContext()->shop->id_shop_group;
        $idShop = Context::getContext()->shop->id;

        $first = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_FIRST', $idLang, $idShopGroup, $idShop,  0);
        $second = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_SECOND', $idLang, $idShopGroup, $idShop,  0);
        $third = Configuration::get('MSTHEMECONFIG_DISCOUNT_RULE_THIRD', $idLang, $idShopGroup, $idShop,  0);
        $no = Configuration::get('MSTHEMECONFIG_NO_DISCOUNT_RULE', $idLang, $idShopGroup, $idShop);

        $firstRule = new CartRule($first);
        $secondRule = new CartRule($second);
        $thirdRule = new CartRule($third);
        $noRule = new CartRule($no);

        $isElegibleForDiscount = 0;
        $noDiscountCounterAction = 0;

        $withTax = Context::getContext()->cookie->price_vat_settings_incl;

        $currentCartValue = $this->context->cart->getOrderTotal(false, CART::ONLY_PHYSICAL_PRODUCTS_WITHOUT_SHIPPING);
        $activeDiscountRules = [];
        $discountText = [];

        $fmt = numfmt_create('nl_NL', \NumberFormatter::CURRENCY);

        $cartRules = $this->context->cart->getCartRules();
        $nextCartRule = $first;
        $vatText = " excl. btw";
        if(count($cartRules) > 0){
            foreach ($cartRules as $index => $cartRule){
                if ((int)$cartRule['id_cart_rule'] == (int)$first && $noDiscountCounterAction != 1) {
                    $isElegibleForDiscount = 1;
                    $nextCartRule = $second;
                } elseif ((int)$cartRule['id_cart_rule'] == (int)$second && $noDiscountCounterAction != 1) {
                    $isElegibleForDiscount = 2;
                    $nextCartRule = $third;
                } elseif ((int)$cartRule['id_cart_rule'] == (int)$third && $noDiscountCounterAction != 1) {
                    $isElegibleForDiscount = 3;
                }

                if ((int)$cartRule['id_cart_rule'] == (int)$no) {
                    $isElegibleForDiscount = 0;
                    $noDiscountCounterAction = 1;
                }

                $name = $cartRule['name'][(int)$idLang] ?? '';

                $activeDiscountRules[$index] = [
                    'id_cart_rule' => $cartRule['id_cart_rule'],
                    'order' => $index,
                    'name' => $name,
                    'minimum_amount' => $cartRule['minimum_amount'],
                    'discount' => $cartRule['reduction_percent'],
                    'next_discount' => $nextCartRule
                ];

                $nextCartRuleObject = new CartRule($nextCartRule);

                if((float)$currentCartValue <= (float)$nextCartRuleObject->minimum_amount){
                    $minAmountText = (int)$nextCartRuleObject->minimum_amount;
                    if($withTax !== "false"){
                        $vatText = " incl. btw";
                        $minAmountText = (int)$nextCartRuleObject->minimum_amount*1.21;
                    }

                    $activeDiscountRules[$index]['next_discount'] = $nextCartRule;
                    $discountText[] = (int)$nextCartRuleObject->reduction_percent.'% korting vanaf € '.$minAmountText.',-<sup>*</sup><br/>';
                    $isElegibleForDiscount = 1;
                }

                if((int)$cartRule['reduction_percent'] > (int)$maxReductionPercent){
                    $maxReductionPercent = $cartRule['reduction_percent'];
                }
            }
        } else {
            $name = $firstRule->name[(int)$idLang] ?? '';

            $activeDiscountRules[0] = [
                'id_cart_rule' => $firstRule->id,
                'order' => 0,
                'name' => $name,
                'minimum_amount' => $firstRule->minimum_amount,
                'discount' => $firstRule->reduction_percent,
                'next_discount' => $first
            ];

            if((float)$currentCartValue < (float)$firstRule->minimum_amount){

                $minAmountText = (int)$firstRule->minimum_amount;
                if($withTax !== "false"){
                    $vatText = " incl. btw";
                    $minAmountText = (int)$firstRule->minimum_amount*1.21;
                }

                $discountText[] = (int)$firstRule->reduction_percent.'% korting vanaf € '.$minAmountText.',-<sup>*</sup><br/>';
                $isElegibleForDiscount = 1;
            }

            if((int)$firstRule->reduction_percent > $maxReductionPercent){
                $maxReductionPercent = $firstRule->reduction_percent;
            }
        }

        $footer_msg = '<br/><br/><i><sup>*</sup>'. $vatText . ' & excl. bezorging</i>';


        $message = '';
        switch ($isElegibleForDiscount){
            case 1:
                    $message = '<a>Ontvang '.implode(' of ',$discountText).'</a>';
                break;
            case 3:
            case 2:
                    $message = '<a>U heeft de maximale korting van '.(int)$maxReductionPercent.'% al in uw winkelwagen! <br/><a class="text-decoration-none text-black font-weight-bold" href="/'.Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id, '').'">Toch graag een aanbod op maat,<br/> neem dan contact met ons op.</a></a>';
                break;
        }



        if($noDiscountCounterAction == 1){
            $message = 'De korting is verwijderd uit uw winkelwagen door de balie medewerker! Klopt dit niet? <br/><a class="text-decoration-none text-black font-weight-bold" href="/'.Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id, '').'"><br/> Neem dan contact met ons op.</a>';
            $remainingMessage = $this->getRemainingAmountBeforeNextDiscount([]);
        } else {
            $remainingMessage = $this->getRemainingAmountBeforeNextDiscount($activeDiscountRules);
        }

        return ['rules' => $activeDiscountRules, 'message' => $message.$remainingMessage['msg'].$footer_msg, 'order_total' => $remainingMessage['current_order_total']];
    }


    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    private function getRemainingAmountBeforeNextDiscount($discounts): array
    {
        $currentOrderTotal = Context::getContext()->cart->getOrderTotal(false, CART::ONLY_PRODUCTS);
        $withTax = Context::getContext()->cookie->price_vat_settings_incl;
        $msg = '';


        for ($i = 0; $i < count($discounts); $i++) {
            $nextCartRuleObject = new CartRule((int)$discounts[$i]['next_discount']);

            if((float)$nextCartRuleObject->minimum_amount >= (float)$currentOrderTotal){
                $remaining = (float)$nextCartRuleObject->minimum_amount - (float)$currentOrderTotal;
                if($withTax !== "false"){
                        $remaining = $remaining*1.21;
                }
                $fmt = numfmt_create('nl_NL', \NumberFormatter::CURRENCY);
                $remainingTotal =  numfmt_format_currency($fmt,  $remaining, "EUR");

                $msg = '<b id="next-discount-message">Bestel nog <span id="total-until-discount">'.$remainingTotal;


                $msg .='<sup>*</sup></span> extra voor <span id="percentage-next-discount">'.(int)$nextCartRuleObject->reduction_percent.'%</span> korting!  </b>';
//                $msg .='<sup>*</sup></span> aan producten voor meer korting!';
                $msgSet = 1;
            }

        }
//        dd($msg, (float)$discounts[0]['minimum_amount'] , (float)$currentOrderTotal);
        return ['msg' => $msg, 'current_order_total' => $currentOrderTotal];
    }

    /**
     * @throws Exception
     */
    public function hookActionFrontControllerInitAfter(): void
    {
        $filterManager = $this->module->get('prestashop.core.filter.front_end_object.search_result_product');
        $filterManager->whitelist(['quantity', 'minimal_quantity', 'out_of_stock', 'depends_on_stock']);
    }

    /**
     *
     * @param $params
     */
    public function hookDisplayBackOfficeHeader($params)
    {
//        $this->context->controller->addJS(_PS_ROOT_DIR_.'/modules/msthemeconfig/views/js/admin/analytics.js');
//        $this->context->smarty->assign([
//            'analytics_data' => $_SESSION['analytics_data'],
//        ]);
//
//        return $this->context->smarty->fetch(_PS_ROOT_DIR_.'/modules/msthemeconfig/views/templates/admin/analytics.tpl');
//        $_SESSION['analytics_data'] = null;
    }


    /**
     * @throws Exception
     */
    public function hookActionDispatcherAfter(&$param): void
    {
//        $result = null;
//        try {
//            $route = '';
//            $type = 'string';
//            if(is_array($param)){
//                $type = 'array';
//                if($param['request']->attributes !== null){
//                    $route = $param['request']->attributes->get('_route');
//                }
//            } elseif (is_object($param)) {
//                $type = 'object';
//                if(isset($param->route)){
//                    $route = $param->route;
//                }
//            }
//            switch ($route) {
//                case 'admin_orders_add_payment':
//                case 'admin_orders_update_product':
//                case 'admin_orders_update_shipping':
//                case 'admin_orders_partial_refund':
//                case 'admin_orders_standard_refund':
//                case 'admin_orders_return_product':
//                case 'admin_orders_add_product':
//                case 'admin_orders_delete_product':
//                case 'admin_orders_cancellation':
//                case 'admin_orders_remove_cart_rule':
//                case 'admin_orders_add_cart_rule':
//                    if($type == 'array'){
//                        $data = $param['request']->request->all();
//                        $attributes = $param['request']->attributes;
//                        $id_order = $attributes->get('orderId');
//
//                        $_SESSION['analytics_data'] = $this->sendAnalyticsDataToSession($data, $attributes, $id_order);
//
////                        var_export([$data, $attributes, $id_order, $result]);
//                    } else {
//                        var_dump('is Object',$param);
//                    }
//
//
////                    break;
//            }
//        } catch(\Exception $exception){
//            dd($exception);
//        }




    }

    /**
     * @param $data
     * @param $attributes
     * @param $id_order
     */
    private function sendAnalyticsDataToSession($data, $attributes, $id_order = null)
    {

        $addedProducts = [];
        $result = [];
        if($id_order){
            $order = new Order($id_order);
            $id_transaction = '';
            $coupon = '';
            foreach($order->getOrderPayments() as $payment){
                if($payment->transaction_id != ""){
                    $id_transaction = $payment->transaction_id;
                }
            }

            if(count($order->getCartRules()) > 0){
                $coupons = [];
                foreach($order->getCartRules() as $rule){
                    $coupons[] = $rule['name'];
                }
                $coupon = implode(',', $coupons);
            }

            if(array_key_exists('cancel_product', $data)){
                $postType= 'refund';
                $cancelProduct = $data['cancel_product'];
                $addProductRow = $data['add_product_row'];
                $editProductRow = $data['edit_product_row'];

                $total_refund = 0;
                $refunded_qty = 0;
                $cat1 = '';
                $cat2 = '';
                foreach ($order->getOrderDetailList() as $orderDetail) {
                    $orderDetailId = $orderDetail['id_order_detail'];

                    $product = new Product($orderDetail['product_id'], true, $this->context->cookie->id_lang);
                    $product_categories = $product->getParentCategories($this->context->cookie->id_lang);
                    if(count($product_categories) >= 2){
                        $cat1 = $product_categories[count($product_categories)-2];
                    }

                    if(count($product_categories) >= 3){
                        $cat2 = $product_categories[count($product_categories)-3];
                    }

                    if (!empty($cancelProduct['quantity_' . $orderDetailId]) || !empty((float) $cancelProduct['amount_' . $orderDetailId])) {
                        $refunded_qty = $cancelProduct['quantity_' . $orderDetailId] ?? 0;
                        $total_refund += (float)$cancelProduct['amount_' . $orderDetailId]/1.21 ?? 0;
                    }

                    $addedProducts[]  =  [
                        'currency' => 'EUR',
                        'price' => (float)$orderDetail['product_price'],
                        'item_id' => (int)$orderDetail['product_id'],
                        'item_name' => $orderDetail['product_name'],
                        'coupon' => '',
                        'discount' => '',
                        'item_category' => $cat2['name'],
                        'item_category2' => $cat1['name'],
                        'quantity' => (int)$refunded_qty
                    ];

                }

                $result['refund']['event_type'] = $postType;
                $result['refund']['transaction_id'] = $id_transaction;
                $result['refund']['currency'] = 'EU';
                $result['refund']['coupon'] = $coupon;
                $result['refund']['value'] = (float)$total_refund;
                $result['refund']['shipping'] = (float)$cancelProduct['shipping_amount'];
                $result['refund']['tax'] = ($total_refund*1.21)-$total_refund;
                $result['refund']['items'] = $addedProducts;

                return $result;
                //End Cancel Product
            }

        }
    }

/**
 * @param $param
 * @return void
 */
public function hookActionFrontControllerSetVariables(&$param): void
    {
        $param['templateVars']['analytics_data'] = [];
        switch ($param['templateVars']['page']['page_name']){
            case 'product':
                if(isset($_SESSION['analytics_data']['product']['type'])){
                    $param['templateVars']['analytics_data']['product'] =  [
                        'event_type' => $_SESSION['analytics_data']['product']['type'],
                        'currency' => $_SESSION['analytics_data']['product']['data']['currency'],
                        'price' => $_SESSION['analytics_data']['product']['data']['amount_tax_excl'],
                        'item_id' => $_SESSION['analytics_data']['product']['data']['item_id'],
                        'item_name' => $_SESSION['analytics_data']['product']['data']['item_name'],
                        'coupon' => $_SESSION['analytics_data']['product']['data']['coupon'],
                        'discount' => $_SESSION['analytics_data']['product']['data']['discount'],
                        'item_category' => $_SESSION['analytics_data']['product']['data']['item_category'],
                        'item_category2' => $_SESSION['analytics_data']['product']['data']['item_category2'],
                        'price_without_discount' => $_SESSION['analytics_data']['product']['data']['price_before_discount'],
                        'quantity' => $_SESSION['analytics_data']['product']['data']['quantity'],
                    ];
                    $_SESSION['analytics_data'] = null;
                } else {
                    $product = Context::getContext()->controller->getProduct();
                    $product_categories = $product->getParentCategories($this->context->cookie->id_lang);
                    $name1 = '';
                    $name2 = '';

                    if(count($product_categories) >= 2){
                        $cat1 = $product_categories[count($product_categories)-2];
                        $name2 = $cat1['name'];
                    }

                    if(count($product_categories) >= 3){
                        $cat2 = $product_categories[count($product_categories)-3];
                        $name1 = $cat2['name'];
                    }

                    $param['templateVars']['analytics_data']['product'] =  [
                        'event_type' => null,
                        'currency' => 'EUR',
                        'coupon' => '',
                        'price' => $product->getPrice(false),
                        'item_id' => $product->id,
                        'item_name' => $product->name,
                        'discount' => $product->getPrice(true, null, 6, null, true, false, 1),
                        'item_category' => $name1,
                        'item_category2' => $name2,
                        'quantity' => 1,
                    ];
                }

                break;
            case 'order-confirmation':
                $cart = new Cart($_GET['id_cart']);
                $transaction_id = '';
                $reference = '';
               if(isset($_GET['id_order'])) {
                   $order = new Order($_GET['id_order']);
                   $transIds = $order->getOrderPayments();
                   $reference = $order->reference;
                   if(isset($transIds[0]->transaction_id)){
                       $transaction_id = $transIds[0]->transaction_id;
                   }
               }

               $items = [];

                foreach ($cart->getProducts() as $product){
                    $prod = new Product($product['id_product']);
                    $product_categories = $prod->getParentCategories($this->context->cookie->id_lang);
                    $name1 = '';
                    $name2 = '';

                    if(count($product_categories) >= 2){
                        $cat1 = $product_categories[count($product_categories)-2];
                        $name2 = $cat1['name'];
                    }

                    if(count($product_categories) >= 3){
                        $cat2 = $product_categories[count($product_categories)-3];
                        $name1 = $cat2['name'];
                    }
                    $item = [];
                    $item['item_id'] = $product['id_product'];
                    $item['item_name'] = $product['name'];
                    $item['discount'] = $product['price_without_reduction_without_tax'] - $product['price_with_reduction_without_tax'];
                    $item['index'] = 0;
                    $item['item_category'] = $name1;
                    $item['item_category2'] = $name2;
                    $item['price'] = $product['price_with_reduction_without_tax'];
                    $item['quantity'] = $product['quantity'];
                    $items[] = $item;
                }

                $coupon = '';

                if(count($cart->getCartRules()) > 0){
                    $coupons = [];
                    foreach($cart->getCartRules() as $rule){
                        $coupons[] = $rule['name'];
                    }
                    $coupon = implode(',', $coupons);
                }

                $param['templateVars']['analytics_data']['confirmation'] = [
                    'transaction_id' => $transaction_id,
                    'reference' => $reference,
                    'currency' => 'EUR',
                    'price' => $cart->getOrderTotal(false),
                    'coupon' => $coupon,
                    'discount' => $cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS),
                    'shipping' => $cart->getOrderTotal(false, Cart::ONLY_SHIPPING),
                    'tax' => $cart->getOrderTotal() - $cart->getOrderTotal(false),
                    'items' => $items,
                ];
                break;
            case 'module-supercheckout-supercheckout':
            case 'checkout':
            case 'category':
            case 'cart':
                $cart = $param['templateVars']['cart'];
                $cartObject = new Cart(Context::getContext()->cart->id);

            $items = [];

            foreach ($cart['products'] as $product){
                $prod = new Product($product['id_product']);
                    $product_categories = $prod->getParentCategories($this->context->cookie->id_lang);
                $name1 = '';
                $name2 = '';

                if(count($product_categories) >= 2){
                    $cat1 = $product_categories[count($product_categories)-2];
                    $name2 = $cat1['name'];
                }

                if(count($product_categories) >= 3){
                    $cat2 = $product_categories[count($product_categories)-3];
                    $name1 = $cat2['name'];
                }
                    $item = [];

                    $item['item_id'] = $product['id_product'];
                    $item['item_name'] = $product['name'];
                    $item['discount'] = $product['discount_amount'];
                    $item['index'] = 0;
                    $item['item_category'] = $name1;
                    $item['item_category2'] = $name2;
                    $item['price'] = $product['price_with_reduction_without_tax'];
                    $item['quantity'] = $product['quantity'];
                    $items[] = $item;
                }

                $coupon = '';

                if(count($cartObject->getCartRules()) > 0){
                    $coupons = [];
                    foreach($cartObject->getCartRules() as $rule){
                        $coupons[] = $rule['name'];
                    }
                    $coupon = implode(',', $coupons);
                }

                $param['templateVars']['analytics_data']['cart'] = [
                    'currency' => 'EUR',
                    'coupon' => $coupon,
                    'discount' => $cartObject->getOrderTotal(false, CART::ONLY_DISCOUNTS),
                    'price' => $cart['totals']['total_excluding_tax']['amount'],
                    'items' => $items,
                ];

            if(isset($_SESSION['analytics_data']['product']['event_type'])){
                $param['templateVars']['analytics_data']['product'] =  [
                    'event_type' => $_SESSION['analytics_data']['product']['event_type'],
                    'currency' => $_SESSION['analytics_data']['product']['data']['currency'],
                    'price' => $_SESSION['analytics_data']['product']['data']['price'],
                    'item_id' => $_SESSION['analytics_data']['product']['data']['item_id'],
                    'item_name' => $_SESSION['analytics_data']['product']['data']['item_name'],
                    'coupon' => $_SESSION['analytics_data']['product']['data']['coupon'],
                    'discount' => $_SESSION['analytics_data']['product']['data']['discount'],
                    'item_category' => $_SESSION['analytics_data']['product']['data']['item_category'],
                    'item_category2' => $_SESSION['analytics_data']['product']['data']['item_category2'],
                    'quantity' => $_SESSION['analytics_data']['product']['data']['quantity'],
                ];
                $_SESSION['analytics_data'] = null;
            }

            if(isset($_SESSION['analytics_data']['add_to_cart_product']['event_type'])){
                $param['templateVars']['analytics_data']['add_to_cart_product'] =  [
                    'event_type' => $_SESSION['analytics_data']['add_to_cart_product']['event_type'],
                    'op' => $_SESSION['analytics_data']['add_to_cart_product']['op'],
                    'currency' => $_SESSION['analytics_data']['add_to_cart_product']['data']['currency'],
                    'price' => $_SESSION['analytics_data']['add_to_cart_product']['data']['price'],
                    'item_id' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_id'],
                    'item_name' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_name'],
                    'coupon' => $_SESSION['analytics_data']['add_to_cart_product']['data']['coupon'],
                    'discount' => $_SESSION['analytics_data']['add_to_cart_product']['data']['discount'],
                    'item_category' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_category'],
                    'item_category2' => $_SESSION['analytics_data']['add_to_cart_product']['data']['item_category2'],
                    'quantity' => $_SESSION['analytics_data']['add_to_cart_product']['data']['quantity'],
                ];
                $_SESSION['analytics_data'] = null;
            }

            break;
            case 'index'://Home
                break;
            case 'contactinformation'://Informatie aanvraag formulier
                break;
            case 'contactoffer'://Offerte aanvraag formulier
                break;
            case 'authentication'://Login scherm
                break;
            case 'password'://Wachtwoord vergeten scherm
                break;
            case 'cms'://cms pagina
                break;
            case 'search'://zoek pagina
                break;
            default:
//                die($param['templateVars']['page']['page_name']);
                break;
        }
    }

    /**
     * Modify category form
     *
     * @param array $params
     *
     */
    public function hookActionCategoryFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];

        $formBuilder->add('top_description', TranslateType::class, [
                'type' => FormattedTextareaType::class,
                'locales' => [
                  0 =>  [
                    "id_lang" => 1,
                    "name" => "Nederlands (Dutch)",
                    "active" => 1,
                    "iso_code" => "nl",
                    "language_code" => "nl-nl",
                    "locale" => "nl-NL",
                    "date_format_lite" => "d-m-Y",
                    "date_format_full" => "d-m-Y H:i:s",
                    "is_rtl" => 0,
                    "id_shop" => 1,
                    "shops" => [
                      1 => true,
                    ]
                  ]
                ],
                'hideTabs' => false,
                'required' => false,
                'options' => [
                    'limit' => 2500,
                    'constraints' => [
            new CleanHtml([
                'message' => $this->module->getTranslator()->trans('This field is invalid',[], 'Admin.Notifications.Error'),
            ]),
        ]]]);

        $formBuilder->add('second_name', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Second Name', [],
                'Modules.MsThemeConfig'),
            'type' => TextType::class,
            'required' => false,
        ]);

        $formBuilder->add('jsonld', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Top Description', [],
                'Modules.MsThemeConfig'),
            'required' => false,
            'auto_initialize' => false,
            'type' => TextareaType::class,
        ]);

        $category = new Category($params['id']);

        $params['data']['top_description'] = $category->top_description;
        $params['data']['second_name'] = $category->second_name;

        $params['data']['jsonld'][$this->idLang] = Category::getCategoryLdFaq($category->id_category, $this->idLang);

        $formBuilder->setData($params['data']);
    }


    /**
     * Hook to add addition fields to the category page
     *
     * @TODO check function
     *
     * @return array
     */
    public function hookDisplayAdditionalCategoryFields(): array
    {
        return [
            (new FormField())
                ->setName('top_description')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Top Description')),
            (new FormField())
                ->setName('second_name')
                ->setType('text')
                ->setRequired(false)
                ->setLabel($this->module->l('Second Name')),
            (new FormField())
                ->setName('jsonld')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Faq JSON+LD')),
        ];
    }


    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     *
     * @param array $params
     *
     */
    public function hookActionObjectCategoryUpdateAfter(array $params): array
    {
        return $this->updateCustomCategoryFields($params);
    }

    /**
     * Update / Create
     *
     * @param array $params
     *
     */
    private function updateCustomCategoryFields(array $params): array
    {
        $idLang = Context::getContext()->language->id;
        $form_values = Tools::getAllValues();

        $object = $params['object'] ?? new Category($params['id']);



        if(isset($form_values['category'])){
            $categoryFormData = $form_values['category'];
        }

        if(isset($form_values['root_category'])){
            $categoryFormData = $form_values['root_category'];
        }

        if(empty($categoryFormData)){
            return $params;
        }

        if (!isset($categoryFormData['top_description'][$idLang])) {
            $top_description = '';
        } else {
            $top_description = $categoryFormData['top_description'][$idLang];
        }

        if (!isset($categoryFormData['second_name'][$idLang])) {
            $second_name = '';
        } else {
            $second_name = $categoryFormData['second_name'][$idLang];
        }

        if (!isset($categoryFormData['jsonld'][$idLang])) {
            $jsonld = '';
        } else {
            $jsonld = $categoryFormData['jsonld'][$idLang];
        }

//        $fields = [
//            'top_description' => $top_description,
//            'second_name' => $second_name,
//            'jsonld' => $jsonld,
//        ];

//        Db::getInstance()->getValue('SELECT COUNT(*) FROM '._DB_PREFIX_.'category_lang WHERE id_category=' . $object->id .' AND id_lang='.$idLang)
//        $object->clearCache();

        return $params;
    }

    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateCategoryFormHandler(array $params): void
    {
        $this->updateCustomCategoryFields($params);
    }


    /**
     * Add category extra description
     */
    public function hookActionRootCategoryFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];

        $formBuilder->add('top_description', TranslateType::class, [
            'type' => FormattedTextareaType::class,
            'locales' => [
                0 =>  [
                    "id_lang" => 1,
                    "name" => "Nederlands (Dutch)",
                    "active" => 1,
                    "iso_code" => "nl",
                    "language_code" => "nl-nl",
                    "locale" => "nl-NL",
                    "date_format_lite" => "d-m-Y",
                    "date_format_full" => "d-m-Y H:i:s",
                    "is_rtl" => 0,
                    "id_shop" => 1,
                    "shops" => [
                        1 => true,
                    ]
                ]
            ],
            'hideTabs' => false,
            'required' => false,
            'options' => [
                'limit' => 2500,
                'constraints' => [
                    new CleanHtml([
                        'message' => $this->module->getTranslator()->trans('This field is invalid',[], 'Admin.Notifications.Error'),
                    ]),
                ]]]);

        $formBuilder->add('second_name', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Second Name', [],
                'Modules.ModernesSmidThemeConfigurator'),
            'type' => TextType::class,
            'required' => false,
        ]);


        $formBuilder->add('jsonld', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Top Description', [],
                'Modules.ModernesSmidThemeConfigurator'),
            'required' => false,
            'type' => TextareaType::class,
        ]);

        $category = new Category($params['id']);

        $params['data']['top_description'] = $category->top_description;
        $params['data']['second_name'] = $category->second_name;

        $params['data']['jsonld'][$this->idLang] = Category::getCategoryLdFaq($category->id_category, $this->idLang);

        $formBuilder->setData($params['data']);

    }


    /**
     * @TODO check function
     *
     * @return array
     */
    public function hookDisplayAdditionalRootCategoryFields(): array
    {
        return [
            (new FormField())
                ->setName('top_description')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Top Description')),
            (new FormField())
                ->setName('second_name')
                ->setType('text')
                ->setRequired(false)
                ->setLabel($this->module->l('Second Name')),
            (new FormField())
                ->setName('jsonld')
                ->setType('textarea')
                ->setRequired(false)
                ->setLabel($this->module->l('Faq JSON+LD')),
        ];
    }


    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateRootCategoryFormHandler(array $params): void
    {
        $this->updateCustomCategoryFields($params);
    }

    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateRootCategoryFormHandler(array $params): void
    {
        $this->updateCustomCategoryFields($params);
    }




    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateOrderAddressFormHandler(array $params): void
    {
//        var_export($params);
//        die('test');
//        $addressId = (int)$params['id'];
//
//        /** @var array $addressFormData */
//        $addressFormData = $params['form_data'];
//        $house_number = $addressFormData['house_number'];
//        $house_number_extension = $addressFormData['house_number_extension'];
//
//        try {
//            $address = new Address($addressId);
//            $address->house_number = $house_number;
//            $address->house_number_extension = $house_number_extension;
//            $address->save();
//
//        } catch (ReviewerException $exception) {
//            throw new \PrestaShop\PrestaShop\Core\Module\Exception\ModuleErrorException($exception);
//        }
    }




    /**
     * All needed function
     */


    private function createCategoryJSONLD($cat, $withProducts=true, $withSubCats = true, $position=0): array
    {
        $catImages = [$this->link->getCatImageLink($cat->link_rewrite, $cat->id_category)];

        $catDescription = "";
        if (isset($cat->top_description[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->top_description[$this->idLang]));
        }

        if (isset($cat->description_short[$this->idLang])) {
            $catDescription .= trim(strip_tags($cat->description_short[$this->idLang]));
        } elseif(isset($cat->description[$this->idLang])){
            $catDescription .= trim(strip_tags($cat->description[$this->idLang]));
        }

        $catTotalItems = 0;
        $jsonLD = [];
        if($withProducts){
            $products = $cat->getProducts($this->idLang, 0, 100);
            if(is_countable($products) && count($products) > 0){
                $catTotalItems = count($products);
                foreach ($products as $prod) {
                    try {
                        $jsonLD[] = $this->createProductJSONLD($prod['id_product']);
                    } catch (PrestaShopDatabaseException|PrestaShopException) {
                    }
                }
            }
        } elseif ($withSubCats) {
            $subCategories = $cat->getSubCategories($this->idLang, true);
            $catTotalItems = count($subCategories);
            $subPos = 0;
            foreach ($subCategories as $category) {
                $cat = new Category($category['id_category']);
                $jsonLD[] = $this->createCategoryJSONLD($cat, $withProducts, false, $subPos);
                $subPos++;
            }
        }

        $alternateName = '';
        if(isset($cat->second_name[$this->idLang])){
            $alternateName = $cat->second_name[$this->idLang];
        }


        $jsonLDCategory = [];
        if($cat->id){
            $jsonLDCategory = [
                '@context' => 'https://schema.org',
                '@type' => 'ItemList',
                'position' => $position,
                'url' => $this->link->getCategoryLink($cat->id),
                'numberOfItems' => $catTotalItems,
                'name' => $cat->name[$this->idLang],
                'alternateName' => $alternateName,
                'description' => $catDescription,
                'image' => $catImages,
                'itemListElement' => $jsonLD
            ];
        }
        return $jsonLDCategory;
    }



    /**
     * @TODO check function
     *
     * @return void
     */
    public function hookDisplayFooter(): void
    {
    }

    /**
     * @TODO check function
     *
     * @return void
     */
    public function hookActionAddressFormBuilderModifier(): void
    {
    }

    /**
     * @return void
     */
    public function hookDisplayHeader(): void
    {
        $this->context->controller->addCSS('modules/'.$this->module->name.'/views/css/ijzershopkiyoh.css', 'all');
        $consent_cookie = isset($_COOKIE['cookie-consent']);
        Context::getContext()->smarty->assign(['consent_cookie' => $consent_cookie,'discount_add' => $this->getDiscountAdvertisement()]);

    }


    /**
     * @param $params
     * @return void
     */
    public function hookActionCancelProductFormBuilderModifier($params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];
        $link = parse_url($this->context->link->getAdminLink('AdminOrders'));

        if(array_key_exists('query', $link)){
            $formBuilder->setAction('/admin-dev/sell/orders/'.$params['id'].'/partial-refund?'.$link['query']);
        } else {
            $formBuilder->setAction('/admin-dev/sell/orders/'.$params['id'].'/partial-refund');
        }

    }

    /**
     * @param $url
     * @param string $type
     * @return array
     */
    private function fetchDataFromInformerApi($url, string $type='payment_conditions'): array
    {
        $curlCard = curl_init();

        $security_code = Configuration::get('CREDITPAYMENT_INFORMER_SECURITY_CODE', $this->idLang, $this->idShopGroup, $this->idShop, "62356");
        $api_key = Configuration::get('CREDITPAYMENT_INFORMER_API_KEY', $this->idLang, $this->idShopGroup, $this->idShop, "MEUGbrj3nT8Z4orUVznSQRMCYFxP6SySePckp0tVfJPrcB1DjO2");

        $headers = [
            "accept: application/json",
            "Securitycode: " . $security_code,
            "Apikey: " . $api_key,
        ];

        curl_setopt_array($curlCard, [
            CURLOPT_URL => "https://api.informer.eu/v1/" . $url . "?records=500&page=0",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_POSTFIELDS => json_encode([]),
        ]);
        $info = curl_getinfo($curlCard);
        $response = curl_exec($curlCard);

        if (!curl_errno($curlCard)) {
            $returnData = json_decode($response);
            $arrayList = [];
            foreach ($returnData->{$type} as $index => $item){
                $name = $item->company_name . ' ('.$item->zip.'/'.$item->house_number.$item->house_number_suffix.')';
                if(!empty($item->firstname) || !empty($item->surname_prefix) || !empty($item->surname)){
                    $name .= ' - '.$item->firstname . ' ' . $item->surname_prefix.' '.$item->surname;
                }
                $arrayList[$name] = $index;
            }
        } else {
            $arrayList = [];
        }
        curl_close($curlCard);

        return $arrayList;
    }


    /**
     * Add house number and house number extension fields to address form
     *
     * @param array $params
     *
     */
    public function hookActionCustomerFormBuilderModifier(array $params): void
    {
        /** @var FormBuilderInterface $formBuilder */
        $formBuilder = $params['form_builder'];
        $relations = $this->fetchDataFromInformerApi('relations/', 'relation');

        $formBuilder->add('informer_identification', ChoiceType::class, [
            'label' => $this->context->getTranslator()->trans('Informer Identification', [],
                'Modules.ModernesSmidThemeConfigurator'),
            'required' => false,
            'choices' => $relations
        ]);

        $customer = new Customer($params['id']);
        $params['data']['informer_identification'] = $customer->informer_identification;

        $formBuilder->setData($params['data']);
    }


    /**
     * @return array
     */
    public function hookAdditionalCustomerFields(): array
    {
        return [
            (new FormField())
                ->setName('informer_identification')
                ->setType('select')
                ->setRequired(false)
                ->setLabel($this->context->getTranslator()->trans('Informer Identification',[],'MsThemeConfig.Hooks')),
        ];
    }


    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateCustomerFormHandler(array $params)
    {
//        return $this->updateCustomCustomerFields($params);
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     * @param array $params
     *
     */
    public function hookActionAfterCreateCustomerFormHandler(array $params)
    {
//        return $this->updateCustomCustomerFields($params);
    }

    /**
     * Update / Create
     *
     * @param array $params
     *
     * @throws \PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function updateCustomCustomerFields(array $params): array
    {
        $customerId = (int)$params['id'];
        /** @var array $customerFormData */
        $customerFormData = $params['form_data'];

        $informer_identification = $customerFormData['informer_identification'];
        if (!$informer_identification) {
            $informer_identification = 0;
        }
        $customer = new Customer($customerId);
        $customer->informer_identification = $informer_identification;
        $customer->update();

        return $params;
    }

    /**
     * @param $value
     * @return string
     */
    public function callbackMethod($value): string
    {
        if ($value) {
            return '<span class="label label-primary">Retour aangemaakt</span>';
        } else {
            return '<button class="btn btn-primary">Retour aanmaken</button>';
        }
    }

    /**
     *
     * Generate Label for koopman and other status changes
     *
     * @param $object
     * @return void
     */
    private function generateKoopmanLabelButtons($object): void
    {
        $shippingCarrier = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop);
        $pickupCarrier = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop);
        $addedCarrier = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop);

        $shipC = new Carrier($shippingCarrier);
        $pickC = new Carrier($pickupCarrier);
        $addC = new Carrier($addedCarrier);

        $readyForShippingState = (int)Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $shippingState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $workshopState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_WORKSHOP_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $waitingState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_WAITING_STOCK_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $pickupState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $pickedupState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKEDUP_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);
        $addedState = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS', $this->idLang, $this->idShopGroup, $this->idShop);

        $labelColumn = new LabelButtonColumn('label');
        $labelColumn->setName('Koopman Label');
        $labelColumn->setOptions([
            'ModuleClass' => new DmsAdminOrderController(),
            'label' => $this->context->getTranslator()->trans('Label',[],'MsThemeConfig.Hooks'),
            'stateCarrier' => [
                'shipping' => $shippingCarrier,
                'shipping_label' => $shipC->name,
                'pickup' => $pickupCarrier,
                'pickup_label' => $pickC->name,
                'added' => $addedCarrier,
                'added_label' => $addC->name
            ],
            'stateType' => [
                'ready' => $readyForShippingState,
                'shipping' => $shippingState,
                'workshop' => $workshopState,
                'waiting' => $waitingState,
                'pickup' => $pickupState,
                'pickedup' => $pickedupState,
                'added' => $addedState,

            ]
        ]);
        $object->addBefore('osname', $labelColumn);
        $object->remove('osname');
    }

    /**
     * @param array $params
     * @return void
     */
    public function hookActionAddressGridQueryBuilderModifier(array $params)
    {
        $searchQueryBuilder = $params['search_query_builder'];

        $searchQueryBuilder->addSelect('CONCAT(a.`address1`," ", a.`house_number`," ", a.`house_number_extension`) as address1');
    }

    /**
     * Hooks allows to modify Order grid definition.
     * This hook is a right place to add/remove columns or actions (bulk, grid).
     *
     * @param array $params
     * @throws ColumnNotFoundException
     */
    public function hookActionOrderGridDefinitionModifier(array $params): void
    {

        /** @var GridDefinitionInterface $definition */
        $definition = $params['definition'];

        /** @var ColumnCollection */
        $columns = $definition->getColumns();

        $f = $definition->getFilters();
        if(array_key_exists('osname',  $f->all())){
            $osNameFilter = $f->all()['osname'];
            $osNameFilter->setAssociatedColumn('label');
        }

        $this->generateKoopmanLabelButtons($columns);

        $addedToOrderColumn = new DataColumn('added_to_order');
        $addedToOrderColumn->setOptions(['sortable' => false, 'clickable' => false, 'field' => 'added_to_order']);
        $addedToOrderColumn->setName('Toegevoegd');
        $columns->addAfter('reference', $addedToOrderColumn);

        $states = [];
        $createdStates = [];
        $shippedStates = [];
        if (Configuration::get('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop) !== null && !empty(Configuration::get('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop))) {
            $states = explode(',', Configuration::get('KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop));
        }

        if (Configuration::get('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop) !== null && !empty(Configuration::get('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop))) {
            $createdStates = explode(',', Configuration::get('KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop));
        }

        if (Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop) !== null && !empty(Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop))) {
            $shippedStates = explode(',', Configuration::get('KOOPMANORDEREXPORT_SHIPPED_ACCEPTED_STATUSSES', $this->idLang, $this->idShopGroup, $this->idShop));
        }
        $retourColumn = new ButtonColumn('retour');
        $retourColumn->setName('Retour');
        $retourColumn->setOptions([
            'ModuleClass' => new DmsAdminOrderController(),
            'label' => $this->context->getTranslator()->trans('Retour',[],'MsThemeConfig.Hooks'),
            'acceptedStates' => $states,
            'createdStates' => $createdStates
        ]);
        $columns->addBefore('date_add', $retourColumn);

        //Profile 3 is werkplaats medewerkers admin is 1
        $workshopProfiles = Configuration::get('MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES', null, null, 1, "5,6,7");

        $profiles = [];
        if (!empty($workshopProfiles)) {
            $profiles = explode(',', $workshopProfiles);
        }
        if (in_array($this->context->cookie->profile, $profiles)) {
            $disabledArray = ['country_name', 'new', 'total_paid_tax_incl', 'payment', 'second_chance', 'retour'];
            foreach ($disabledArray as $column_name) {
                $columns->remove($column_name);
            }
        } else {
            //Adding filters
            $filters = $definition->getFilters();

            $emailFilter = new Filter('email', TextType::class);
            $emailFilter->setTypeOptions([
                'required' => false,
                'attr' => [
                    'placeholder' => $this->context->getTranslator()->trans('Zoek email', [], 'Admin.Actions'),
                ],
            ]);
            $emailFilter->setAssociatedColumn('email');
            $filters->add($emailFilter);

            $postcodeFilter = new Filter('postcode', TextType::class);
            $postcodeFilter->setTypeOptions([
                'required' => false,
                'attr' => [
                    'placeholder' => $this->context->getTranslator()->trans('Zoek postcode', [], 'Admin.Actions'),
                ],
            ]);
            $postcodeFilter->setAssociatedColumn('postcode');
            $filters->add($postcodeFilter);

            $columns->remove('new');
            $columns->remove('country_name');


            $previewColumn = new PreviewColumn('preview');
            $previewColumn->setOptions([
                'icon_expand' => 'keyboard_arrow_down',
                'icon_collapse' => 'keyboard_arrow_up',
                'preview_data_route' => 'admin_orders_preview',
                'preview_route_params' => [
                    'orderId' => 'id_order'
                ]
            ]);
            $columns->addAfter('id_order', $previewColumn);

            $emailColumn = new DataColumn('email');
            $emailColumn->setOptions(['sortable' => true, 'clickable' => false, 'field' => 'email']);
            $emailColumn->setName('Email');
            $columns->addAfter('customer', $emailColumn);

            $postcodeColumn = new DataColumn('postcode');
            $postcodeColumn->setOptions(['sortable' => true, 'clickable' => false, 'field' => 'postcode']);
            $postcodeColumn->setName('Postcode');
            $columns->addAfter('email', $postcodeColumn);
        }


        $shippingStateAction = new ShippingStateAction('shipping_state');
        $shippingStateAction->setName($this->context->getTranslator()->trans('Shipping Status', [], 'Admin.Actions'));
        $shippingStateAction->setIcon('truck');
        $shippingStateAction->setOptions([
            'label' => $this->context->getTranslator()->trans('Show current shipping status', [], 'Admin.Actions'),
            'acceptedStates' => $shippedStates,
        ]);

        $actionsCollectionColumn = $this->getActionsColumn($definition);
        $actionOptions = $actionsCollectionColumn->getOptions();
        $actionsCollection = $actionOptions['actions'];

        $actionsCollection->add($shippingStateAction);

        $columns->move('orders_bulk', 13);
        $columns->move('actions', 0);
    }

    /**
     * @param $gridDefinition
     * @param string $id
     * @return ColumnInterface
     * @throws ColumnNotFoundException
     */
    private function getColumnById($gridDefinition, string $id): ColumnInterface
    {
        /** @var ColumnInterface $column */
        foreach ($gridDefinition->getColumns() as $column) {
            if ($id === $column->getId()) {
                return $column;
            }
        }
        throw new ColumnNotFoundException(sprintf('Column with id "%s" not found', $id));
    }

    /**
     * @param $gridDefinition
     * @return ColumnInterface
     * @throws ColumnNotFoundException
     */
    private function getActionsColumn($gridDefinition): ColumnInterface
    {
        return $this->getColumnById($gridDefinition,'actions');
    }

    /**
     * @param array $params
     * @return void
     */
    public function hookActionOrderGridQueryBuilderModifier(array $params): void
    {
        $searchQueryBuilder = $params['search_query_builder'];
        $searchQueryBuilder->addSelect('o.added_to_order as added_to_order');
        $searchQueryBuilder->addSelect('cu.email as email');
        $searchQueryBuilder->addSelect('a.postcode as postcode');
        $searchQueryBuilder->addSelect('SUM(od.product_weight * od.product_quantity) as total_order_weight');
        $searchQueryBuilder->addSelect('GROUP_CONCAT(od.product_weight) as product_weight');
        $searchQueryBuilder->addSelect('GROUP_CONCAT(od.product_quantity) as product_quantity');
        $searchQueryBuilder->addSelect('oc.tracking_number as shipping_number');
        $searchQueryBuilder->leftJoin(
            'o',
            '`' . pSQL(_DB_PREFIX_) . 'order_detail`',
            'od',
            'o.`id_order` = od.`id_order`'
        );

        $searchQueryBuilder->leftJoin(
            'o',
            '`' . pSQL(_DB_PREFIX_) . 'order_carrier`',
            'oc',
            'o.`id_order` = oc.`id_order`'
        );

        $searchQueryBuilder->groupBy('o.id_order');

        $countQueryBuilder = $params['count_query_builder'];
        $countQueryBuilder->addSelect('o.added_to_order as added_to_order');
        $countQueryBuilder->addSelect('cu.email as email');
        $countQueryBuilder->addSelect('a.postcode as postcode');


        $searchCriteria = $params['search_criteria'];

        $searchQueryBuilder->addSelect(
            '`cu`.`email` as `email`'
        );

        $searchQueryBuilder->addSelect(
            '`a`.`postcode` as `postcode`'
        );

        $searchQueryBuilder->addSelect(
            '`o`.`id_carrier` as `carrier`'
        );


        if ('email' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('cu.`email`', $searchCriteria->getOrderWay());
        }

        if ('postcode' === $searchCriteria->getOrderBy()) {
            $searchQueryBuilder->orderBy('a.`postcode`', $searchCriteria->getOrderWay());
        }

        foreach ($searchCriteria->getFilters() as $filterName => $filterValue) {
            if ('email' === $filterName) {
                $searchQueryBuilder->andWhere("`cu`.`email` LIKE '%" . $filterValue . "%'");
            }

            if ('postcode' === $filterName) {
                $searchQueryBuilder->andWhere("`a`.`postcode` LIKE '%" . $filterValue . "%'");
            }
        }
    }

    /**
     * @param array $hookParams
     */
    public function hookActionListMailThemes(array $hookParams): void
    {
        if (!isset($hookParams['mailThemes'])) {
            return;
        }

        /** @var ThemeCollectionInterface $themes */
        $themes = $hookParams['mailThemes'];
        $scanner = new FolderThemeScanner();
        try {
            $moderneSmidTheme = $scanner->scan(realpath(_MODULE_DIR_.'/'.$this->module->name.'/mails/themes/modernesmid'));

            if (null !== $moderneSmidTheme &&  $moderneSmidTheme->getName() !== 'modernesmid' && $moderneSmidTheme->getLayouts()->count() > 0) {
                $themes->add($moderneSmidTheme);
            }
        } catch (FileNotFoundException|TypeException) {
        }
    }

    /**
     * @param array $hookParams
     */
    public function hookActionBuildMailLayoutVariables(array $hookParams)
    {
        if (!isset($hookParams['mailLayout'])) {
            return;
        }

        /** @var LayoutInterface $mailLayout */
        $mailLayout = $hookParams['mailLayout'];


        if ($this->module->name !== 'msthemeconfig') {
            return;
        }

        $route = '';
        if(array_key_exists('request', $hookParams) && isset($hookParams['request']->attributes->all()['_route']) && $hookParams['request']->attributes->all()['_route'] == 'admin_mail_theme_generate'){
            $route = $hookParams['request']->attributes->all()['_route'];
        }

        $hookParams['mailLayoutVariables']['footer_blocks'] = DmsMailThemeController::filterFooterBlocks($mailLayout, $route);

        $hookParams['mailLayoutVariables']['shop_name'] = Tools::safeOutput(Configuration::get('PS_SHOP_NAME', $this->idLang, $this->idShopGroup, $this->idShop));
        $hookParams['mailLayoutVariables']['shop_url'] = $this->context->link->getPageLink(
            'index',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['my_account_url'] = $this->context->link->getPageLink(
            'my-account',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['guest_tracking_url'] = $this->context->link->getPageLink(
            'guest-tracking',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['history_url'] = $this->context->link->getPageLink(
            'history',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['order_slip_url'] = $this->context->link->getPageLink(
            'order-slip',
            true,
            $this->context->language->id,
            null,
            false,
            $this->context->shop->id
        );
        $hookParams['mailLayoutVariables']['color'] = Tools::safeOutput(Configuration::get('PS_MAIL_COLOR', $this->idLang, $this->idShopGroup, $this->idShop));
        return $hookParams;
    }

    /**
     * @param array|null $value
     * @param mixed $idLang
     * @return mixed|string
     */
    private function checkFeatVal(?array $value, mixed $idLang)
    {
        if(!isset($value[$idLang])){
            return '';
        } else {
            return $value[$idLang];
        }
    }


    /*
     * Analitics hooks
     */


}



