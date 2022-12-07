<?php

namespace MsThemeConfig\Controller;

use DateTime;
use Exception;
use JetBrains\PhpStorm\NoReturn;
use PrestaShop\PrestaShop\Adapter\Entity\AdminController;
use PrestaShop\PrestaShop\Adapter\Entity\CMS;
use PrestaShop\PrestaShop\Adapter\Entity\PDF;
use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\Entity\Carrier;
use PrestaShop\PrestaShop\Adapter\Entity\Cart;
use PrestaShop\PrestaShop\Adapter\Entity\CartRule;
use PrestaShop\PrestaShop\Adapter\Entity\Category;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Contact;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Customer;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\Dispatcher;
use PrestaShop\PrestaShop\Adapter\Entity\Feature;
use PrestaShop\PrestaShop\Adapter\Entity\FeatureValue;
use PrestaShop\PrestaShop\Adapter\Entity\FormField;
use PrestaShop\PrestaShop\Adapter\Entity\Mail;
use PrestaShop\PrestaShop\Adapter\Entity\Media;
use PrestaShop\PrestaShop\Adapter\Entity\Module;
use PrestaShop\PrestaShop\Adapter\Entity\ModuleAdminController;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopDatabaseException;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopLogger;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\SpecificPrice;
use PrestaShop\PrestaShop\Adapter\Entity\Store;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Entity\Validate;
use PrestaShop\PrestaShop\Adapter\Entity\Zone;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use PrestaShop\PrestaShop\Core\Localization\Exception\LocalizationException;
use PrestaShop\PrestaShop\Core\Module\Exception\ModuleErrorException;
use PrestaShopBundle\Form\Admin\Type\FormattedTextareaType;
use PrestaShopBundle\Form\Admin\Type\TranslatableType;
use SmartyException;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

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
     * @throws \PrestaShopException
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
        $this->currencyId = $this->context->currency->id;
        $this->currencyCode = $this->context->currency->iso_code;
        $this->smarty = $this->context->smarty;
        $this->link = $this->context->link;
    }

    /**
     * @param $params
     * @return void
     */
    public function hookActionAdminControllerSetMedia($params): void
    {
        // add necessary javascript to products back office
        if($this->controller->controller_name == 'AdminModules' && Tools::getValue('configure') == 'msthemeconfig')
        {
            $this->context->controller->addJqueryUI('ui.sortable');
            $this->controller->addJS('/admin-dev/themes/new-theme/public/msthemeconfig_admin.bundle.js');
            /**
             * All Stylesheet files
             */
            $this->controller->addCSS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/select2/dist/css/select2.min.css');
            $this->controller->addJS(_MODULE_DIR_.'/'.$this->module->name.'/node_modules/select2/dist/js/select2.min.js');
            $this->context->controller->addCss('modules/'.$this->module->name.'/views/css/msthemeconfig.css', 'all');
            /**
             * All Javascript files
             */
            $this->context->controller->addJs(_MODULE_DIR_.'/'.$this->module->name.'/views/js/msthemeconfig.js');
        }
    }

    /**
     * Hook Homepage
     *
     * Show categorie jsonld on homepage
     *
     * @param $hookArgs
     * @return string
     */
    public function hookDisplayHome($hookArgs): string
    {
        $selectedCats = explode(',', Configuration::get('MSTHEMECONFIG_HOMEPAGE_SELECTED_CATEGORIES'));
        $itemList = [];

        foreach ($selectedCats as $catId){
            $subCat = new Category($catId);
            $itemList[] =  $this->createCategoryJSONLD($subCat, false, true);
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
     * @throws \PrestaShopException
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

                $ruleObject = new CartRule($rule['id_cart_rule']);
                if ($ruleObject->reduction_amount != '0.000000') {
                    $total_discount += (float)$ruleObject->reduction_amount;
                } else {
                    $total_discount += (float)$rule['value_tax_excl'];
                }
            }

            $cartObject = new Cart($idCart);
            $shipping = $orderObject->getShipping();
            $discount_check = ($shipping[0]['shipping_cost_tax_excl'] + $cartObject->getOrderTotal(false, Cart::ONLY_PRODUCTS) - $total_discount) * 1.21;

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
        } catch (\PrestaShopDatabaseException|\PrestaShopException $e) {
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
        } catch (\PrestaShopDatabaseException|\PrestaShopException $e) {
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
     * @throws \PrestaShopException
     */
    private function createProductJSONLD($idProduct): array
    {
        $product = new Product($idProduct);

        if (!empty($product->description_short)) {
            $description = trim(strip_tags($product->description_short[$this->idLang]));
        } else {
            $description = trim(strip_tags($product->description[$this->idLang]));
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
                        'value' => $featVal->value[$this->idLang],
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_WIDTH', $this->idLang, $this->idShop, $this->idShopGroup):
                    $width = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $featVal->value[$this->idLang],
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_HEIGHT', $this->idLang, $this->idShop, $this->idShopGroup):
                    $height = ['@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $featVal->value[$this->idLang],
                        'unitCode' => 'MMT',
                        'unitText' => 'mm'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_WEIGHT', $this->idLang, $this->idShop, $this->idShopGroup):
                    $weight = [
                        '@context' => 'https://schema.org/',
                        '@type' => 'QuantitativeValue',
                        'value' => $featVal->value[$this->idLang],
                        'unitCode' => 'KGM',
                        'unitText' => 'Kg'
                    ];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_MATERIAL', $this->idLang, $this->idShop, $this->idShopGroup):
                    $material = $featVal->value[$this->idLang];
                    break;
                case Configuration::get('MSTHEMECONFIG_FEATURE_COLOR', $this->idLang, $this->idShop, $this->idShopGroup):
                    $color = $featVal->value[$this->idLang];
                    break;
                default:
                    if (str_contains($featVal->value[$this->idLang], 'mm')) {
                        $additionalProperty[] = [
                            '@context' => 'https://schema.org/',
                            '@type' => 'PropertyValue',
                            'name' => $feat->name[$this->idLang],
                            'value' => str_replace('mm', '', $featVal->value[$this->idLang]),
                            'unitCode' => 'MMT',
                            'unitText' => 'mm'
                        ];
                    } else {
                        $additionalProperty[] = [
                            '@context' => 'https://schema.org/',
                            '@type' => 'PropertyValue',
                            'name' => $feat->name[$this->idLang],
                            'value' => $featVal->value[$this->idLang]
                        ];
                    }
                    break;
            }
        }

        $specificPrices = SpecificPrice::getByProductId((int)$product->id);
        $priceSpecification = [];
        $price = $product->getPrice(true);

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
                    'price' => Product::getPriceStatic($product->id, true, null, 2, null, false, true, (int)$specificPrices[$key]['from_quantity']),
                    'priceCurrency' => 'EUR',
                    'valueAddedTaxIncluded' => true,
                    'billingIncrement' => 1,
                    'unitCode' => 'C62',
                    'eligibleQuantity' => [
                        '@type' => 'QuantitativeValue',
                        'minValue' => (int)$specificPrices[$key]['from_quantity'],
                        'maxValue' => (int)$specificPrices[$key + 1]['from_quantity'] - 1,
                        'unitCode' => 'C62'
                    ]
                ];
            } else {
                $priceSpecification[] = [
                    '@context' => 'https://schema.org/',
                    '@type' => 'UnitPriceSpecification',
                    'priceType' => 'https://schema.org/SalePrice',
                    'price' => Product::getPriceStatic($product->id, true, null, 2, null, false, true, (int)$specificPrices[$key]['from_quantity']),
                    'priceCurrency' => 'EUR',
                    'valueAddedTaxIncluded' => true,
                    'billingIncrement' => 1,
                    'unitCode' => 'C62',
                    'eligibleQuantity' => [
                        '@type' => 'QuantitativeValue',
                        'minValue' => (int)$specificPrices[$key]['from_quantity'],
                        'unitCode' => 'C62'
                    ]
                ];
            }
        }

        $carrier = new Carrier(Configuration::get('MSTHEMECONFIG_SHIPPING_CARRIER', $this->idLang, $this->idShop, $this->idShopGroup));
        $deliveryPrice = $carrier->getDeliveryPriceByPrice(5, Zone::getIdByName('Europe'), $this->currencyId);

        $availableStock = 'https://schema.org/InStock';

        $productCommentRepository = $this->controller->getContainer()->get('product_comment_repository');
        $productComments = $productCommentRepository->paginate(
            $product->id,
            1,
            500,
            true
        );
        $averageGrade = $productCommentRepository->getAverageGrade($product->id, true);
        $totalComments = $productCommentRepository->getCommentsNumber($product->id, true);

        $reviews = [];
        $reviews[] = [
            '@context' => 'https://schema.org/',
            '@type' => 'Review',
            'reviewRating' => ['@type' => 'Rating',
                'ratingValue' => '5',
                'bestRating' => '5'
            ],
            'author' => [
                '@context' => 'https://schema.org/',
                '@type' => 'Person',
                'name' => 'De Moderne Smid'
            ],
            'reviewBody' => 'Prima product, zorgvuldig voor u uitgezocht'
        ];

        foreach ($productComments as $productComment) {
            $reviews[] = [
                '@context' => 'https://schema.org/',
                '@type' => 'Review',
                'reviewRating' => [
                    '@context' => 'https://schema.org/',
                    '@type' => 'Rating',
                    'ratingValue' => $productComment['grade'],
                    'bestRating' => '5'
                ],
                'datePublished' => $productComment['date_add'],
                'author' => [
                    '@context' => 'https://schema.org/',
                    '@type' => 'Person',
                    'name' => $productComment['firstname'] . ' ' . $productComment['lastname']
                ],
                'reviewBody' => $productComment['content'],
                'publisher' => [
                    '@context' => 'https://schema.org/',
                    '@type' => 'Person',
                    'name' => 'De Moderne Smid'
                ]
            ];
        }
        if ($averageGrade == 0) {
            $grade = 5;
        } else {
            $grade = $averageGrade;
        }
        $rating = [
            '@context' => 'https://schema.org/',
            '@type' => 'AggregateRating',
            'ratingValue' => $grade,
            'reviewCount' => $totalComments + 1
        ];

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

        $jsonLD = [
            '@context' => 'https://schema.org/',
            '@type' => 'Product',
            'sku' => $this->shopName . '-' . $product->reference,
            'gtin14' => $this->shopName . '-' . $product->id,
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
            'offers' => [
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
                            'maxValue' => '1'
                        ],
                        'transitTime' => [
                            '@context' => 'https://schema.org/',
                            '@type' => 'QuantitativeValue',
                            'minValue' => '1',
                            'maxValue' => '7'
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
            ],
            'review' => $reviews,
            'aggregateRating' => $rating];

        return $jsonLD;
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
     * @throws \PrestaShopDatabaseException|\PrestaShopException
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
        global $kernel;

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

        return $this->module->get('twig')->render('@Modules\MsThemeConfig\views\templates\admin\custom-product-fields.html.twig', $jsonldForm);
    }

    /**
     *
     * @param $params
     * @return mixed
     * @throws \PrestaShopException
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
            die();
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
     * @throws \PrestaShopException
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

                        $data['{total_paid}'] = Context::getContext()->currentLocale->formatPrice((float)$order->total_paid,
                            'EUR');

                        // Attach invoice and / or delivery-slip if they exist and status is set to attach them
                        $invoice = $order->getInvoicesCollection();
                        $file_attachment = [];

                        if ($order->delivery_number) {
                            $pdf = new PDF($invoice, self::TEMPLATE_DELIVERY_SLIP, $this->context->smarty);
                            $file_attachment['content'] = $pdf->render(false);
                            $file_attachment['name'] = Configuration::get('PS_DELIVERY_PREFIX',
                                    $this->idLang, null, $order->id_shop) . sprintf('%06d',
                                    $order->delivery_number) . '.pdf';
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
     *
     * @param array $params
     *
     */
    public function hookActionAfterUpdateCustomerAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     * Update / Create custom address fields
     *
     * @param array $params
     *
     */
    private function updateCustomAddressFields(array $params): void
    {
        $addressId = (int)$params['id'];

        /** @var array $addressFormData */
        $addressFormData = $params['form_data'];
        $house_number = $addressFormData['house_number'];
        $house_number_extension = $addressFormData['house_number_extension'];

        $address = new Address($addressId);
        $address->house_number = $house_number;
        $address->house_number_extension = $house_number_extension;
        $address->update();
    }

    /**
     * Hook allows to modify Customers form and add additional form fields as well as modify or add new data to the forms.
     *
     *
     * @param array $params
     *
     * @throws ModuleErrorException
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
     * @throws ModuleErrorException
     */
    public function hookActionAfterCreateAddressFormHandler(array $params): void
    {
        $this->updateCustomAddressFields($params);
    }

    /**
     *
     * @param $params
     * @return void
     * @throws PrestaShopException
     * @throws \PrestaShopException
     */
    public function hookActionFrontControllerSetMedia($params): void
    {
        //check live mode to use minified files
        $liveMode = (bool)Configuration::get('IJZERSHOPKIYOH_LIVE_MODE', $this->idLang, $this->idShop, $this->idShopGroup);
        $reviewPage = Configuration::get('IJZERSHOPKIYOH_REVIEW_PAGE', $this->idLang, $this->idShop, $this->idShopGroup);

        $min = '';
        if($liveMode){
            $min='.min';
        }


            if (Dispatcher::getInstance()->getController() == 'cms') {

                if ((int)$this->controller->cms->id_cms == (int)$reviewPage) {


                    $this->controller->registerJavascript(
                        'module-ijzershopkiyoh-xmlconvert',
                        'modules/' . $this->module->name . '/views/js/xmlconvert' . $min . '.js',
                        [
                            'priority' => 1,
                            'attribute' => 'none',
                        ]
                    );

                    $this->controller->registerJavascript(
                        'module-ijzershopkiyoh-ijzershopkiyoh',
                        'modules/' . $this->module->name . '/views/js/ijzershopkiyoh' . $min . '.js',
                        [
                            'priority' => 10,
                            'attribute' => 'none',
                        ]
                    );

                    $this->controller->registerStylesheet(
                        'module-ijzershopkiyoh-style',
                        'modules/' . $this->module->name . '/views/css/ijzershopkiyoh' . $min . '.css',
                        [
                            'media' => 'all',
                            'priority' => 10,
                            'attribute' => 'none',
                        ]
                    );
                }
            }
    }

    /**
     * @return false|string
     * @throws PrestaShopDatabaseException
     * @throws SmartyException
     * @throws \PrestaShopDatabaseException
     */
    public function hookKiyohBanner(): bool|string
    {
        $query = 'SELECT * FROM `' . _DB_PREFIX_ . 'kiyoh_custom`';
        $results = Db::getInstance()->executeS($query);
        $interval = Configuration::get('IJZERSHOPKIYOH_UPDATE_INTERVAL', $this->idLang, $this->idShop, $this->idShopGroup);
        $reviewPage = Configuration::get('IJZERSHOPKIYOH_REVIEW_PAGE', $this->idLang, $this->idShop, $this->idShopGroup);

        if (empty($results)) {
            //table is empty set first record
            $data = $this->getXMLDataFromKiyohServer();
            if ($data != false) {
                $attr = [
                    'averageRating' => $data['averageRating'],
                    'averageRatingPercentage' => $data['percentageRecommendation'],
                    'totalReviews' => $data['totalReviews'],
                    'reviewPage' => $reviewPage,
                ];
                Media::addJsDef(['kiyohData' => $attr]);
                //set new values in database
                $query = 'INSERT INTO `' . _DB_PREFIX_ . 'kiyoh_custom` (`kiyoh_comments_total`, `kiyoh_average`, `kiyoh_average_percentage`, `kiyoh_updated`) VALUES (' . $attr['totalReviews'] . ',"' . $attr['averageRating'] . '",' . $attr['averageRatingPercentage'] . ', NOW())';
                $results = Db::getInstance()->execute($query);
            } else {
                $attr = [
                    'averageRating' => 10,
                    'averageRatingPercentage' => 99,
                    'totalReviews' => 2400,
                    'reviewPage' => $reviewPage,
                ];
            }
        } else {
            $updatedDate = $results[0]['kiyoh_updated'];
            $checkDate = new DateTime();

            $diff = abs(strtotime($updatedDate) - strtotime($checkDate->format('Y-m-d H:i:s')));
            $years = floor($diff / (365 * 60 * 60 * 24));
            $months = floor(($diff - $years * 365 * 60 * 60 * 24) / (30 * 60 * 60 * 24));
            $days = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24) / (60 * 60 * 24));
            $hours = floor(($diff - $years * 365 * 60 * 60 * 24 - $months * 30 * 60 * 60 * 24 - $days * 60 * 60 * 24) / (60 * 60));

            if ((int)$hours >= (int)$interval) {
                $data = $this->getXMLDataFromKiyohServer();
                if ($data != false) {
                    $attr = [
                        'averageRating' => $data['averageRating'],
                        'averageRatingPercentage' => $data['percentageRecommendation'],
                        'totalReviews' => $data['totalReviews'],
                        'reviewPage' => $reviewPage,
                    ];
                    //set new values in database
                    $query = 'UPDATE `' . _DB_PREFIX_ . 'kiyoh_custom` SET `kiyoh_comments_total`=' . $attr['totalReviews'] . ',  `kiyoh_average`="' . $attr['averageRating'] . '", `kiyoh_average_percentage`= ' . $attr['averageRatingPercentage'] . ', `kiyoh_updated`= NOW() WHERE `id`=1';
                    $results = Db::getInstance()->execute($query);
                } else {
                    $attr = [
                        'averageRating' => 10,
                        'averageRatingPercentage' => 99,
                        'totalReviews' => 2400,
                        'reviewPage' => $reviewPage,
                    ];
                }

            } else {
                $attr = [
                    'averageRating' => $results[0]['kiyoh_average'],
                    'averageRatingPercentage' => $results[0]['kiyoh_average_percentage'],
                    'totalReviews' => $results[0]['kiyoh_comments_total'],
                    'reviewPage' => $reviewPage,
                ];
            }
        }

        $this->smarty->assign('attr', $attr);

        return $this->smarty->fetch(_PS_MODULE_DIR_ . DIRECTORY_SEPARATOR . $this->module->name . '/views/templates/front/kiyoh-score-header-block.tpl');

    }

    /**
     * @return array|false
     */
    public function getXMLDataFromKiyohServer(): bool|array
    {
        $token = Configuration::get('IJZERSHOPKIYOH_TOKEN', $this->idLang, $this->idShop, $this->idShopGroup);

        $streamContext = stream_context_create(['https' => ['header' => 'Accept: application/xml']]);
        $url = 'https://www.kiyoh.com/v1/review/feed.xml?hash=' . $token . '&pageNumber=0&limit=1';
        try {
            $xml = file_get_contents($url, false, $streamContext);
            $response = simplexml_load_string($xml);

            if ($response) {
                return [
                    'averageRating' => $response->averageRating[0]->__toString(),
                    'totalReviews' => $response->numberReviews[0]->__toString(),
                    'percentageRecommendation' => $response->percentageRecommendation[0]->__toString(),
                ];
            } else {
                return false;
            }
        } catch (Exception $ex) {
            PrestaShopLogger::addLog($ex->getMessage());
            return false;
        }
    }

    /**
     * @return false|string|void
     * @throws PrestaShopDatabaseException
     * @throws SmartyException|\PrestaShopDatabaseException
     */
    public function hookDisplayCMSDisputeInformation()
    {
        $reviewPage = Configuration::get('IJZERSHOPKIYOH_REVIEW_PAGE', $this->idLang, $this->idShop, $this->idShopGroup);

        if ((int)$this->controller->cms->id_cms == (int)$reviewPage) {
            $query = 'SELECT `kiyoh_comments_total`, `kiyoh_latest_feed` FROM `' . _DB_PREFIX_ . 'kiyoh_custom`';
            $results = Db::getInstance()->executeS($query);

            $attr = [
                'latestSavedFeed' => addslashes($results[0]['kiyoh_latest_feed']),
                'totalReviewsInDatabase' => (int)$results[0]['kiyoh_comments_total'],
                'reviewsPerPage' => Configuration::get('IJZERSHOPKIYOH_TOTAL_PER_PAGE', $this->idLang, $this->idShop, $this->idShopGroup, '10'),
            ];

            $this->smarty->assign('attr', $attr);

            return $this->smarty->fetch(_PS_MODULE_DIR_ . DIRECTORY_SEPARATOR . $this->module->name . '/views/templates/front/reviews.tpl');
        }
    }

    /**
     * @throws Exception
     */
    public function hookActionFrontControllerInitAfter(): void
    {
        $filterManager = $this->module->get('prestashop.core.filter.front_end_object.search_result_product');
        $filterManager->whitelist(['quantity', 'minimal_quantity', 'out_of_stock', 'depends_on_stock']);

        return;
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

        $formBuilder->add('top_description', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Top Description', [],
                'Modules.MsThemeConfig'),
            'required' => false,
            'auto_initialize' => true,
            'type' => FormattedTextareaType::class,
            'attr' => ['class' => 'autoload_rte rte '],
        ]);

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
     * @param array $params
     * @return array
     */
    public function hookDisplayAdditionalCategoryFields(array $params): array
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
     * @throws ModuleErrorException
     */
    public function hookActionAfterUpdateCategoryFormHandler(array $params): void
    {
        $this->updateCustomCategoryFields($params);
    }

    /**
     * Update / Create
     *
     * @TODO check function
     *
     * @param array $params
     *
     * @throws ModuleErrorException
     */
    private function updateCustomCategoryFields(array $params): void
    {
        $customerId = (int)$params['id'];
        /** @var array $customerFormData */
        $customerFormData = $params['form_data'];

        $top_description = $customerFormData['top_description'];
        if (!$top_description) {
            $top_description = '';
        }




        $second_name = $customerFormData['second_name'];
        if (!empty($second_name)) {
            $second_name = '';
        }


        $jsonld = $customerFormData['jsonld'];
        if (!$jsonld) {
            $jsonld = '';
        }


        try {

            $customer = new Category($customerId);
            $customer->top_description = $top_description;
            $customer->second_name = $second_name;
            $customer->jsonld = $jsonld;
            $customer->update();

        } catch (PrestaShopException $exception) {
            throw new ModuleErrorException($exception->getMessage());
        } catch (\PrestaShopDatabaseException|\PrestaShopException $e) {
            throw new ModuleErrorException($e->getMessage());
        }
    }

    /**
     * Hook allows to modify Category's form and add additional form fields as well as modify or add new data to the forms.
     *
     * @TODO check function
     *
     * @param array $params
     *
     * @throws ModuleErrorException
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

        $formBuilder->add('top_description', TranslatableType::class, [
            'label' => $this->module->getTranslator()->trans('Top Description', [],
                'Modules.ModernesSmidThemeConfigurator'),
            'required' => false,
            'auto_initialize' => true,
            'type' => FormattedTextareaType::class,
            'attr' => ['class' => 'autoload_rte rte '],
        ]);

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
     * @param array $params
     * @return array
     */
    public function hookDisplayAdditionalRootCategoryFields(array $params): array
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
     * @throws ModuleErrorException
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
     * @throws ModuleErrorException
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


    private function createCategoryJSONLD($cat, $withProducts=true, $withSubCats = true): array
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
                    } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                    }
                }
            }
        } elseif ($withSubCats) {
            $subCategories = $cat->getSubCategories($this->idLang, true);
            $catTotalItems = count($subCategories);
            foreach ($subCategories as $category) {
                $cat = new Category($category['id_category']);
                $jsonLD[] = $this->createCategoryJSONLD($cat, $withProducts, false);
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
     * @param $params
     * @return void
     */
    public function hookDisplayBackOfficeHeader($params): void
    {

    }

    /**
     * @TODO check function
     *
     * @param $params
     * @return void
     */
    public function hookDisplayFooter($params): void
    {
        return;
    }

    /**
     * @TODO check function
     *
     * @param $params
     * @return void
     */
    public function hookActionAddressFormBuilderModifier($params): void
    {
        return;
    }

    /**
     * @param $params
     * @return void
     */
    public function hookDisplayHeader($params)
    {
        $this->context->controller->addCSS('modules/'.$this->module->name.'/views/css/ijzershopkiyoh.css', 'all');
    }

}



