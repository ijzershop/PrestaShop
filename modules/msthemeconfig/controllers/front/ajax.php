<?php
if (!defined('_PS_CORE_DIR_')) {
    define('_PS_CORE_DIR_', realpath('../../../../'));
}

require_once _PS_CORE_DIR_ . '/config/config.inc.php';
require_once _PS_CORE_DIR_ . '/init.php';

use MsThemeConfig\Class\ExportOrdersMultipleCollies;
use PrestaShop\PrestaShop\Core\Domain\Product\Pack\ValueObject\PackStockType;

/**
 *
 */
class msthemeconfigAjaxModuleFrontController extends ModuleFrontController
{
    public $soapoptions;

    public $redirect = true;
    public $output = '';
    private $kernal;
    private string $apiPath;
    private string $token;
    private AppKernel $kernel;

    public function __construct()
    {
        require_once _PS_ROOT_DIR_ . '/app/AppKernel.php';
        $this->token = 'JNtOUInXJD27nRgH';
        $this->apiPath = 'https://api.pro6pp.nl/v2/autocomplete';
        $this->kernel = new \AppKernel('dev', true);
        $this->kernel->boot();
        $this->context = Context::getContext();
        $this->soapoptions = [
            'stream_context' => stream_context_create(
                [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ],
                ]
            ),
        ];

        parent::__construct();
    }

    /**
     * @param $postcode
     * @return bool
     */
    public function testPostcode($postcode)
    {
        $postcodeRegex = '/^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$/';
        preg_match($postcodeRegex, $postcode, $check);
        if (empty($check)) {
            return false;
        }

        return true;
    }

    /**
     * Initializes common front page content: header, footer and side columns.
     */
    public function initContent()
    {
        $this->ajax = true;
        $employeeId = Tools::getValue('profile');
        $this->context->employee = new Employee($employeeId);

        if ($this->errors) {
            die(json_encode(['hasError' => true, 'errors' => $this->errors]));
        }

        if (Tools::getValue('action') == 'set_vat_visibility') {
            $vat = Tools::getValue('incl_vat');

            $this->_setVatInclExclContext(filter_var($vat, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE));
        }

        if (Tools::getValue('action') == 'remove_default_discount_cart_rule_counter_access') {
            $this->_removeDefaultCartDiscountRuleCounterAccess();
        }

        if (Tools::getValue('action') == 'check_for_existing_email_address') {
            $email = Tools::getValue('email');
            $this->_checkForExistingEmailAddress($email);
        }

        if (Tools::getValue('action') == 'add_custom_product_to_cart') {
            return $this->_addCustomProductToCart();
        }

        if (Tools::getValue('action') == 'remove_custom_product_to_cart') {
            return $this->_removeCustomProductToCart();
        }

        if (array_key_exists('action', $_GET) && $_GET['action'] == 'print_shoppingcart_by_employee') {
            $this->_generatePdfOfShoppingCartByEmployee();
        }

        if (array_key_exists('action', $_GET) && $_GET['action'] == 'remove_gdpr') {
            $this->_setPsGdprCustomerToRemove();
        }

        if (Tools::getValue('action') == 'upload_files') {
            $this->_uploadPastedFilesEditor();
        }

        if (Tools::getValue('action') == 'search_customer') {
            return $this->_searchCustomer();
        }


        if (isset($_POST['action']) && $_POST['action'] == 'add_data_to_google_check_csv') {
            return $this->_addGoogleDataToCsvForTesting();
        }


        if (Tools::getValue('method') == 'delivery_message') {
            return $this->_getDeliverySlipMessage($_GET['id']);
        }


        if (Tools::getValue('method') == 'save_delivery_message') {
            die($this->_updateDeliverySlipMessage());
        }


        if (Tools::getValue('method') == 'orderstatus') {
            return $this->_getKoopmanOrderStatus();
        }

        if (Tools::getValue('method') == 'orderlabelstatus') {
            return $this->_getKoopmanOrderLabelStatus();
        }


        if (Tools::getValue('method') == 'orderretourinit') {
            return $this->_getKoopmanInitRetour();
        }

        if (Tools::getValue('method') == 'orderretoursubmit') {
            return $this->_getKoopmanSubmitRetour();
        }

        if (Tools::getValue('method') == 'afhalen') {
            return $this->_getKoopmanAfTeHalen();
        }
        if (Tools::getValue('method') == 'afgehaald') {
            return $this->_getKoopmanAfgehaald();
        }
        if (Tools::getValue('method') == 'toegevoegd') {
            return $this->_getKoopmanToegevoegd();
        }
        if (Tools::getValue('method') == 'beingprepared_status') {
            return $this->_getKoopmanBeingPreparedStatus();
        }
        if (Tools::getValue('method') == 'workshop_status') {
            return $this->_getKoopmanWorkShopStatus();
        }
        if (Tools::getValue('method') == 'backorder_status') {
            return $this->_getKoopmanBackOrderStatus();
        }

        if (Tools::getValue('method') == 'print-label') {
            return $this->_getKoopmanPrintedLabel();
        }

        if (Tools::getValue('method') == 'dag-afsluiting') {
            return $this->_runKoopmanDayClosing();
        }

        if (Tools::getValue('method') == 'set-viewed-be-vat-msg') {
            Context::getContext()->cookie->accepted_vat_be = true;
            return true;
        }

        if (Tools::getValue('method') == 'set-viewed-geo-shipping-msg') {
            Context::getContext()->cookie->accepted_shipping_msg = true;
            return true;
        }


        if (Tools::getValue('action') === 'sendCustomerInfoToAdministration') {
            $customerData = json_decode(Tools::getValue('customerData'), true);

            $customerInfo = '';

            foreach ($customerData as $label => $data) {
                if(!empty($data)){
                    $customerInfo .= '<span style="width:30%;font-weight: bold;">'. $label . '</span>: <span style="width:70%">'. $data . '</span><br/>';
                }
            }

            $template_vars = [
                'customer_info' => $customerInfo,
                'shop_url' => Context::getContext()->shop->domain_ssl,
                'date' => date('d-m-Y H:i:s'),
            ];


            try {
                $result = Mail::send(
                    Context::getContext()->language->id,
                    'customer_info',
                    'Klant data rapport',
                    $template_vars,
                    'info@ijzershop.nl',
                    'Administrator',
                    'ijzershop nl',
                    'Webshop Ijzershop'
                );
                if($result){
                    die(json_encode(['success' => true]));
                } else {
                    die(json_encode(['success' => false]));
                }
            } catch (\Exception $e) {
                die(json_encode(['success' => false]));
            }


        }

        if (Tools::getValue('action') == 'fetch_products_for_retour') {
            $idOrder = $_POST['id_order'];
            $postcode = $_POST['postalcode'];

            return $this->_fetchProductsForRetourForm($idOrder, $postcode);
        }


        $postcode = Tools::getValue('postcode');
        $street = Tools::getValue('street');
        $houseNumber = Tools::getValue('houseNumber');
        $extension = Tools::getValue('extension');
        $id_country = Tools::getValue('id_country');
        $city = str_replace(' ', '%', Tools::getValue('city'));

        $urlNl = $this->apiPath . '/nl?authKey=' . $this->token . '&postalCode=' . urlencode($postcode) . '&streetNumber=' . urlencode($houseNumber) . '&premise=' . urlencode($extension);
        $urlBe = $this->apiPath . '/be?authKey=' . $this->token . '&postalCode=' . urlencode($postcode) . '&street=' . urlencode($street) . '&streetNumber=' . urlencode($houseNumber);

        $valid = false;
        $zip_code_format = Country::getZipCodeFormat((int)$id_country);

        if (Country::getNeedZipCode((int)$id_country)) {
            if ($zip_code_format !== '') {
                $zip_regexp = '/^' . $zip_code_format . '$/ui';
                $zip_regexp = str_replace(' ', '( |)', $zip_regexp);
                $zip_regexp = str_replace('-', '(-|)', $zip_regexp);
                $zip_regexp = str_replace('N', '[0-9]', $zip_regexp);
                $zip_regexp = str_replace('L', '[a-zA-Z]', $zip_regexp);
                $zip_regexp = str_replace('C', Country::getIsoById((int)$id_country), $zip_regexp);

                if (!preg_match($zip_regexp, $postcode)) {
                    $msg = $this->module->l('Invalid Zip Code', 'SupercheckoutCore') . '<br />'
                        . $this->module->l('Must be typed as follows:', 'SupercheckoutCore') . ' '
                        . str_replace(
                            'C',
                            Country::getIsoById((int)$id_country),
                            str_replace('N', '0', str_replace('L', 'A', $zip_code_format))
                        );
                } else {
                    $valid = true;
                }
            } elseif ($zip_code_format) {
                $msg = $this->module->l('Required Field', 'SupercheckoutCore');
            } elseif ($postcode && !preg_match('/^[0-9a-zA-Z -]{4,9}$/ui', $postcode)) {
                $msg = $this->module->l('Invalid Zip Code', 'SupercheckoutCore');
            } else {
                $valid = true;
            }
        } else {
            $valid = true;
        }

        $curl = curl_init();
        if ($this->testCountry($id_country) == 'nl') {
            curl_setopt($curl, CURLOPT_URL, $urlNl);
        } else {
            curl_setopt($curl, CURLOPT_URL, $urlBe);
        }

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'X-Api-Key:' . $this->token,
        ]);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($curl);
        curl_close($curl);
        if (!$result) {
            die(json_encode(['warning' => 'connection failed']));
        } else {
            $data = json_decode($result);
            if (!is_null($data)) {

                if (isset($data->errors)) {
                    $returnedAddressMsg = $this->getMatchingMessage(strtolower($data->error_id));
                    $returnedAddress = [];
                } elseif (strtolower($street) !== strtolower($data->street)) {
                    $returnedAddressMsg = 'De ingevoerde straat komt niet overeen met de postcode';
                    $returnedAddress = [];
                    $valid = false;
                } elseif (strtolower($city) !== strtolower($data->settlement)) {
                    $returnedAddressMsg = 'De ingevoerde stad komt niet overeen met de postcode';
                    $returnedAddress = [];
                    $valid = false;
                } else {
                    $returnedAddressMsg = 'ok';
                    $returnedAddress = (array)$data;

                    $valid = true;
                }
            } else {
                $returnedAddressMsg = 'Fetching address failed';
                $returnedAddress = [];
            }

            header('Content-Type: application/json');
            die(json_encode(['address' => $returnedAddress, 'msg' => $returnedAddressMsg, 'valid' => $valid]));
        }
    }


    public function _addGoogleDataToCsvForTesting(){
        $data = Tools::getValue('data');


        if($data != null){
            $event = $data['event'];
            $idEvent = $data['eventId'];
            $eventData = $data['data'];
            $idCustomer = Context::getContext()->customer->id;

            $date = new DateTime();
            $ip_customer = Tools::getRemoteAddr();

            $headerArray = ['Datum', 'Event Naam', 'Event Id', 'Klant Id', 'Klant IP', 'Doorgestuurde Data'];
            $dataArray = ['date'=>$date->format('D, d M Y H:i:s'),'event' => $event, 'id' => $idEvent, 'customer' => $idCustomer, 'ip_customer' => $ip_customer, 'data' => json_encode($eventData)];
            $data2Array = ['date'=>$date->format('D, d M Y H:i:s'),'event' => $event, 'id' => $idEvent, 'customer' => $idCustomer, 'ip_customer' => $ip_customer, 'data' => json_encode($eventData)];


            $dir = _PS_ROOT_DIR_.'/google_dumps/';
            $filesPurchase = array();
            $filesBulk = array();

            $ignored = array('.', '..', 'index.php', '.htaccess');

            foreach (scandir($dir) as $file) {
                if (in_array($file, $ignored)) continue;
                if(str_contains($file, 'Purchases')){
                    $filesPurchase[$file] = filemtime($dir . '/' . $file);
                } else {
                    $filesBulk[$file] = filemtime($dir . '/' . $file);
                }
            }
            asort($filesBulk);
            $filesBulk = array_keys($filesBulk);
            $lengthBulk = count($filesBulk);

            for ($i = $lengthBulk; $i > 15; $i--) {
                unlink($dir.$filesBulk[$i]);
            }

            if(filesize($dir.end($filesBulk)) >= 524288){
                $callback = function($matches) {
                    return $matches[1] . ($matches[2] + 1);
                };
                $csvBulkName = preg_replace_callback('/(\D*)(\d+)/', $callback, end($filesBulk));

                $file = new SplFileObject($dir.$csvBulkName, 'a');
                $file->fputcsv($headerArray);
                $file->fputcsv($dataArray);
                $file = null;
            } else {
                $csvBulkName = end($filesBulk);
                $file = new SplFileObject($dir.$csvBulkName, 'a');
                $file->fputcsv($dataArray);
                $file = null;
            }


            asort($filesPurchase);
            $filesPurchase = array_keys($filesPurchase);
            $lengthPurch = count($filesPurchase);


            for ($i = $lengthPurch; $i > 15; $i--) {
                unlink($dir.$filesPurchase[$i]);
            }




            if($event === 'purchase' || $event === 'refund'){
                if(filesize($dir.end($filesPurchase)) >= 524288){
                    $callbackPurchase = function($matches) {
                        return $matches[1] . ($matches[2] + 1);
                    };

                    $filesPurchaseName = preg_replace_callback('/(\D*)(\d+)/', $callbackPurchase, end($filesPurchase));

                    $purchaseFile = new SplFileObject($dir . $filesPurchaseName, 'a');
                    $purchaseFile->fputcsv($headerArray);
                    $purchaseFile->fputcsv($data2Array);
                    $purchaseFile = null;
                } else {
                    $filesPurchaseName = end($filesPurchase);
                    $purchaseFile = new SplFileObject($dir . $filesPurchaseName, 'a');
                    $purchaseFile->fputcsv($data2Array);
                    $purchaseFile = null;
                }


            }
        }

        die();
    }



    public function _checkForExistingEmailAddress($email)
    {
        $customerId = (int)Customer::customerExists($email, true);
        if ($customerId > 0) {
            die("true");
        } else {
            die("false");
        }
    }


    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function _addCustomProductToCart()
    {
        $label = $_POST['label'];
        $qty = (int)$_POST['qty'];
        $price = (float)$_POST['price']; // Ensure price is treated as float
        $discount = (float)$_POST['discount'];
        $description = $_POST['description'];
        $paid = (int)$_POST['switchinput'];
        $withTax = (int)$_POST['with_tax'];

        $reference = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_REFERENCE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
        $category = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $cart = Context::getContext()->cart;

        // Store original price for later use
        $originalPrice = $price;

        // Calculate discount - this should happen before tax calculations
        $discountAmount = 0;
        if($discount > 0){
            $discountAmount = ($price * $discount) / 100;
            $price = $price - $discountAmount;
        }

        if ($cart->id == NULL) {
            $cart->add(true, false);
            Context::getContext()->cookie->id_cart = $cart->id;
        }

        // Apply tax calculations to the already discounted price
        if ($withTax) {
            // If price includes tax, we need to extract the net price
            // Assuming 21% VAT rate
            $productPrice = number_format($price / 1.21, 6, '.', ''); // Convert from gross to net
        } else {
            // Price is already excluding tax
            $productPrice = number_format($price, 6, '.', '');
        }

        if ($paid) {
            //is paid add product to cart
            $product = new Product();
            $product->ean13 = '';
            $product->name = [(int)Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => $label];
            $product->link_rewrite = [(int)Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => uniqid()];
            $product->description_short = [1 => $description];
            $product->reference = $reference;
            $product->id_category_default = $category;
            $product->redirect_type = '301';
            $product->quantity = $qty + 10;
            $product->price = $productPrice; // This is the net price (excluding tax)
            $product->minimal_quantity = 1;
            $product->show_price = 1;
            $product->on_sale = 0;
            $product->id_tax_rules_group = '1';
            $product->online_only = 0;
            $product->meta_description = '';
            $product->pack_stock_type = PackStockType::STOCK_TYPE_DEFAULT;
            $product->out_of_stock = '1';
            $product->location = 'CP';
            $product->product_type = 'standard';
            $productAdded = $product->save(false, true);
            StockAvailable::setQuantity($product->id, (int)null, $qty + 10, Context::getContext()->shop->id);

            $product->addToCategories([$category]);

            $url_imagem = _PS_BASE_URL_ . '/themes/modernesmid_theme/assets/img/missing-product-image.jpg';
            $shops = Shop::getShops(true, NULL, true);
            $image = new Image();
            $image->id_product = $product->id;
            $image->position = Image::getHighestPosition($product->id) + 1;
            $image->cover = true; // or false;

            if (($image->validateFields(false, true)) === true &&
                ($image->validateFieldsLang(false, true)) === true &&
                $image->add()) {
                $image->associateTo($shops);

                if (!$this->copyImg((int)$product->id, (int)$image->id, $url_imagem, 'products', false)) {
                    $image->delete();
                }
            }

            $res = $cart->updateQty($qty, $product->id, false, false);

            // If there was a discount and the product was successfully added, add a cart rule for the discount
            if ($discount > 0 && $productAdded) {
                // Calculate discount amount for the cart rule (based on the quantity)
                $totalDiscountAmount = $discountAmount * $qty;

                // Create a cart rule for the discount
                $cartRule = new CartRule();
                $cartRule->name = [(int)Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => 'Korting op product ' . $label];
                $cartRule->description = 'Berekende korting voor product op maat: ' . $label;
                $cartRule->code = 'DISC-' . uniqid();
                $cartRule->quantity = 1;
                $cartRule->quantity_per_user = 1;
                $cartRule->id_customer = $cart->id_customer;
                $cartRule->date_from = date('Y-m-d H:i:s');
                $cartRule->date_to = date('Y-m-d H:i:s', strtotime('+1 day'));
                $cartRule->reduction_amount = $totalDiscountAmount;
                $cartRule->reduction_tax = $withTax ? 1 : 0; // Apply discount on tax included price
                $cartRule->reduction_currency = (int)Configuration::get('PS_CURRENCY_DEFAULT', null, Shop::getContext(), Shop::getContextShopID());
                $cartRule->active = 1;
                $cartRule->add();

                // Add the cart rule to the cart
                $cart->addCartRule($cartRule->id);
            }

            return json_encode(['valid' => $res, 'cart' => $cart]);
        } else {
            $creditPrice = (int)$qty * (float)$originalPrice;



            // If there's a discount, apply it to the credit price
            if ($discount > 0) {
                $discountAmount = ($creditPrice * $discount) / 100;
                $creditPrice = $creditPrice - $discountAmount;
            }

            // Create a unique identifier for this specific voucher
            $uniqueVoucherIdentifier = 'EGC-' . uniqid() . '-' . time();

            //is credit add voucher to cart
            $credit = new CartRule();
            $credit->name = [(int)Configuration::get('PS_LANG_DEFAULT', null, Shop::getContext(), Shop::getContextShopID()) => $label . ' (' . $uniqueVoucherIdentifier . ')'];
            $credit->description = strip_tags($description) . ' - Created at ' . date('Y-m-d H:i:s');
            $credit->id_customer = $cart->id_customer > 0 ? $cart->id_customer : 0;
            $credit->date_from = date('Y-m-d H:i:s');
            $credit->date_to = date('Y-m-d H:i:s', strtotime("+15 minutes"));
            $credit->quantity = 1;
            $credit->quantity_per_user = 1;
            $credit->priority = 1;
            $credit->partial_use = 0;

            // Use the unique identifier as the code
            $credit->code = $uniqueVoucherIdentifier;

            // Double-check that this code doesn't exist
            if ($credit->cartRuleExists($credit->code)) {
                // If by some chance it exists, add more randomness
                $credit->code = $uniqueVoucherIdentifier . '-' . mt_rand(1000, 9999);
            }

            $credit->minimum_amount = 0.00;
            $credit->minimum_amount_tax = 0;
            $credit->minimum_amount_currency = 0;
            $credit->minimum_amount_shipping = 0;
            $credit->country_restriction = 0;
            $credit->carrier_restriction = 0;
            $credit->group_restriction = 0;
            $credit->cart_rule_restriction = 0; // Changed from 1 to 0 to avoid restrictions
            $credit->product_restriction = 0;
            $credit->shop_restriction = 0;
            $credit->free_shipping = 0;
            $credit->reduction_percent = 0;
            $credit->reduction_amount = number_format($creditPrice, 6, '.', '');
            $credit->reduction_tax = $withTax ? 1 : 0; // Align with withTax variable
            $credit->reduction_currency = (int)Configuration::get('PS_CURRENCY_DEFAULT', null, Shop::getContext(), Shop::getContextShopID());
            $credit->reduction_product = 0;
            $credit->reduction_exlude_special = 0;
            $credit->gift_product = 0;
            $credit->gift_product_attribute = 0;
            $credit->highlight = 0;
            $credit->active = 1;
            $credit->id_connected_cart = $cart->id;
            // Save the cart rule
            if (!$credit->add(true, true)) {
                // Handle error if the cart rule couldn't be added
                return json_encode(['valid' => false, 'error' => 'Failed to create voucher']);
            }

            // Clear any existing cart rules with the same properties
            // This is a precaution to avoid conflicts
            $existingRules = $cart->getCartRules();
            foreach ($existingRules as $rule) {
                if ($rule['obj']->reduction_amount == $creditPrice && $rule['obj']->id != $credit->id) {
                    $cart->removeCartRule($rule['obj']->id);
                }
            }

            // Add the new cart rule to the cart
            $result = $cart->addCartRule($credit->id);

            // Verify the cart rule was added successfully
            if (!$result) {
                return json_encode(['valid' => false, 'error' => 'Failed to apply voucher to cart']);
            }

            // Force cart refresh to ensure the new rule is applied correctly
            $cart->update();

            return json_encode(['valid' => true]);
        }

    }



    /**
     * copyImg copy an image located in $url and save it in a path
     * according to $entity->$id_entity .
     * $id_image is used if we need to add a watermark.
     *
     * @param int $id_entity id of product or category (set in entity)
     * @param int $id_image (default null) id of the image if watermark enabled
     * @param string $url path or url to use
     * @param string $entity 'products' or 'categories'
     * @param bool $regenerate
     *
     * @return bool
     */
    function copyImg($id_entity, $id_image = null, $url = '', $entity = 'products', $regenerate = true)
    {
        $tmpfile = tempnam(_PS_TMP_IMG_DIR_, 'ps_import');
        $watermark_types = explode(',', Configuration::get('WATERMARK_TYPES', null, Shop::getContext(), Shop::getContextShopID()));

        switch ($entity) {
            default:
            case 'products':
                $image_obj = new Image($id_image);
                $path = $image_obj->getPathForCreation();

                break;
            case 'categories':
                $path = _PS_CAT_IMG_DIR_ . (int)$id_entity;

                break;
            case 'manufacturers':
                $path = _PS_MANU_IMG_DIR_ . (int)$id_entity;

                break;
            case 'suppliers':
                $path = _PS_SUPP_IMG_DIR_ . (int)$id_entity;

                break;
            case 'stores':
                $path = _PS_STORE_IMG_DIR_ . (int)$id_entity;

                break;
        }

        $url = urldecode(trim($url));
        $parced_url = parse_url($url);

        if (isset($parced_url['path'])) {
            $uri = ltrim($parced_url['path'], '/');
            $parts = explode('/', $uri);
            foreach ($parts as &$part) {
                $part = rawurlencode($part);
            }
            unset($part);
            $parced_url['path'] = '/' . implode('/', $parts);
        }

        if (isset($parced_url['query'])) {
            $query_parts = array();
            parse_str($parced_url['query'], $query_parts);
            $parced_url['query'] = http_build_query($query_parts);
        }

        if (!function_exists('http_build_url')) {
            require_once _PS_TOOL_DIR_ . 'http_build_url/http_build_url.php';
        }

        $url = http_build_url('', $parced_url);

        $orig_tmpfile = $tmpfile;

        if (Tools::copy($url, $tmpfile)) {
            // Evaluate the memory required to resize the image: if it's too much, you can't resize it.
            if (!ImageManager::checkImageMemoryLimit($tmpfile)) {
                @unlink($tmpfile);

                return false;
            }

            $tgt_width = $tgt_height = 0;
            $src_width = $src_height = 0;
            $error = 0;
            ImageManager::resize($tmpfile, $path . '.jpg', null, null, 'jpg', false, $error, $tgt_width, $tgt_height, 5, $src_width, $src_height);
            $images_types = ImageType::getImagesTypes($entity, true);

            if ($regenerate) {
                $previous_path = null;
                $path_infos = array();
                $path_infos[] = array($tgt_width, $tgt_height, $path . '.jpg');
                foreach ($images_types as $image_type) {
                    $tmpfile = self::get_best_path($image_type['width'], $image_type['height'], $path_infos);

                    if (ImageManager::resize(
                        $tmpfile,
                        $path . '-' . stripslashes($image_type['name']) . '.jpg',
                        $image_type['width'],
                        $image_type['height'],
                        'jpg',
                        false,
                        $error,
                        $tgt_width,
                        $tgt_height,
                        5,
                        $src_width,
                        $src_height
                    )) {
                        // the last image should not be added in the candidate list if it's bigger than the original image
                        if ($tgt_width <= $src_width && $tgt_height <= $src_height) {
                            $path_infos[] = [$tgt_width, $tgt_height, $path . '-' . stripslashes($image_type['name']) . '.jpg'];
                        }
                        if ($entity == 'products') {
                            if (is_file(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int)$id_entity . '.jpg')) {
                                unlink(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int)$id_entity . '.jpg');
                            }
                            if (is_file(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int)$id_entity . '_' . (int)Context::getContext()->shop->id . '.jpg')) {
                                unlink(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int)$id_entity . '_' . (int)Context::getContext()->shop->id . '.jpg');
                            }
                        }
                    }
                    if (in_array($image_type['id_image_type'], $watermark_types)) {
                        Hook::exec('actionWatermark', ['id_image' => $id_image, 'id_product' => $id_entity]);
                    }
                }
            }
        } else {
            @unlink($orig_tmpfile);

            return false;
        }
        unlink($orig_tmpfile);

        return true;
    }

    /**
     * @param $tgt_width
     * @param $tgt_height
     * @param $path_infos
     * @return mixed|string
     */
    protected static function get_best_path($tgt_width, $tgt_height, $path_infos)
    {
        $path_infos = array_reverse($path_infos);
        $path = '';
        foreach ($path_infos as $path_info) {
            list($width, $height, $path) = $path_info;
            if ($width >= $tgt_width && $height >= $tgt_height) {
                return $path;
            }
        }

        return $path;
    }

    public function _generatePdfOfShoppingCartByEmployee()
    {
        $cart = Context::getContext()->cart;
        $pdf = new PDF($cart, 'PhysicalOrderSlip', Context::getContext()->smarty);
        $pdf->render(false);
        die();
    }

    public function _setPsGdprCustomerToRemove()
    {
        Context::getContext()->cookie->__set('psgdpr_remove', 1);
        die(true);
    }

    public function _uploadPastedFilesEditor()
    {
        $file = $_FILES['file'];
        // Upload files
        $allowed = [
            'png',
            'jpeg',
            'gif',
            'jpg',
            'svg',
        ];
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        if (file_exists($file['tmp_name']) && in_array($extension, $allowed)) {
            $filename = uniqid() . '-' . basename($file['name']);
            $filename = str_replace(' ', '-', $filename);
            $filename = strtolower($filename);
            $filename = filter_var($filename, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
            $dest = Tools::getValue('path');

            $path = _PS_UPLOAD_DIR_ . $dest;

            $file['name'] = $filename;
            $uploader = new UploaderCore();
            $uploader->setSavePath($path);
            $a = $uploader->upload($file);

            die(json_encode(['valid' => true, 'location' => $dest . '/' . $file['name']]));
        }
        die(false);
    }

    public function _searchCustomer()
    {
        $searches = explode(' ', Tools::getValue('customer_search'));
        $limit = Tools::getValue('list_limit', 50);
        $customers = array();
        $searches = array_unique($searches);
        foreach ($searches as $search) {
            if (!empty($search) && ($results = Customer::searchByName($search, $limit))) {
                foreach ($results as $result) {
                    if ($result['active']) {
                        $result['fullname_and_email'] = $result['firstname'] . ' ' . $result['lastname'] . ' - ' . $result['email'];
                        $customers[$result['id_customer']] = $result;
                    }
                }
            }
        }
        if (count($customers) && Tools::getValue('sf2')) {
            $to_return = $customers;
        } elseif (count($customers) && !Tools::getValue('sf2')) {
            $to_return = array('customers' => $customers, 'found' => true);
        } else {
            $to_return = Tools::getValue('sf2') ? array() : array('found' => false);
        }
        die(json_encode($to_return));
    }

    public function _fetchProductsForRetourForm($idOrder, $postcode = '')
    {
        if (!empty($postcode)) {
            $order = Order::getByReference($idOrder)->getFirst();
        } else {
            $order = new Order($idOrder);
        }

        if (is_null($order->id)) {
            die(json_encode(['success' => false, 'msg' => 'U heeft nog geen bestelling geslecteerd']));
        }

        $configStatus = unserialize(Configuration::get("MsThemeConfig", null, Shop::getContext(), Shop::getContextShopID()));
        if (isset($configStatus['retour_accepted_statusses']) && !empty($configStatus['retour_accepted_statusses'])) {
            $states = explode(',', $configStatus['retour_accepted_statusses']);

            if (!in_array($order->getCurrentOrderState()->id, $states)) {
                die(json_encode(['success' => false, 'msg' => 'Bestelling niet beschikbaar voor retour. ']));
            }
        }


        if (empty($order)) {
            die(json_encode(['success' => false, 'msg' => 'Order not found']));
        }

        if (empty($postcode)) {
            if ($order->getCustomer()->id !== Context::getContext()->customer->id) {
                die(json_encode(['success' => false, 'msg' => 'Order is not connected to your account']));
            }
        } else {
            $address = new Address($order->id_address_delivery);

            if (str_replace(' ', '', $address->postcode) !== str_replace(' ', '', $postcode)) {
                die(json_encode(['success' => false, 'msg' => 'Postalcode is not the one wich this package is send']));
            }
        }

        $products = $order->getProductsDetail(true);

        die(json_encode(['success' => true, 'msg' => 'products available for retour', 'data' => $products, 'id_order' => $order->id, 'id_customer' => $order->getCustomer()->id]));

    }

    public function testCountry($id_country)
    {
        if (empty($id_country)) {
            return false;
        }

        if ($id_country == 13) {
            return 'nl';
        } else {
            return 'be';
        }

        return true;
    }

    /**
     * @param $key
     * @return string[]
     */
    public function getMatchingMessage($key)
    {
        $msgArray = [
            'invalid nl_sixpp format' => [
                'msg' => 'Het formaat dient te bestaan uit 4 cijfers en 2 letters. Extra spatiëring en gebruik van hoofd- of kleine letters worden automatisch gecorrigeerd.',
                'field' => 'postcode'
            ],
            'NO_RESULTS_FOUND' => [
                'msg' => 'Er zijn geen resultaten gevonden in de database',
                'field' => 'postcode'
            ],
            'nl_sixpp not found' => [
                'msg' => 'De opgevraagde postcode is niet bekend in de database.',
                'field' => 'postcode'
            ],
            'invalid be_fourpp format' => [
                'msg' => 'Het formaat dient te bestaan uit 4 cijfers. Extra spatiëring wordt automatisch gecorrigeerd.',
                'field' => 'postcode'
            ],
            'be_fourpp not found' => [
                'msg' => 'De opgevraagde postcode is niet bekend in de database.',
                'field' => 'postcode'
            ],
            'missing nl_fourpp or nl_sixpp parameter' => [
                'msg' => 'één van beide parameters opgeven is verplicht.',
                'field' => 'postcode'
            ],
            'streetnumber not found' => [
                'msg' => 'Het huisnummer is meegegeven maar het opgegeven huisnummer bestaat niet volgens onze database.',
                'field' => 'house_number'
            ],
            'streetnumber is missing a number' => [
                'msg' => 'Het huisnummer is meegegeven maar bevat geen (geldige) waarde.',
                'field' => 'house_number'
            ],
            'extension not found' => [
                'msg' => 'Het huisnummertoevoeging is meegegeven maar de opgegeven huisletter of huisnummertoevoeging bestaat niet volgens onze postcode database.',
                'field' => 'house_number'
            ],
            'streetnumber without extension not found' => [
                'msg' => 'Het huisnummertoevoeging is meegegeven maar het huisnummer bestaat niet met een huisletter of huisnummertoevoeging.',
                'field' => 'house_number'
            ],
        ];

        if (isset($msgArray[$key])) {
            return $msgArray[$key];
        } else {
            return '';
        }

    }

    public function fetchStreetForBelgicAddress($city, $postcode, $street)
    {
        $urlBeStreetCheck = $this->apiPath . '&be_city=' . $city . '&be_fourpp=' . $postcode . '&street=' . $street . '&language=nl';

        $curlBeStreetCheck = curl_init();
        curl_setopt($curlBeStreetCheck, CURLOPT_URL, $urlBeStreetCheck);
        curl_setopt($curlBeStreetCheck, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlBeStreetCheck, CURLOPT_HTTPHEADER, [
            'X-Api-Key:' . $this->token,
        ]);
        curl_setopt($curlBeStreetCheck, CURLOPT_SSL_VERIFYPEER, false);

        $resultStreetCheck = curl_exec($curlBeStreetCheck);

        if ($resultStreetCheck) {
            $data = json_decode($resultStreetCheck);

            if (!is_null($data)) {
                if ($data->status == 'error') {
                    $returnedAddress = [];
                }

                if ($data->status == 'ok') {
                    $returnedAddress = (array)$data->results;
                    $valid = true;
                }
            } else {
                $returnedAddress = [];
            }
            curl_close($curlBeStreetCheck);

            return $returnedAddress;
        }
    }

    /**
     * @return false|void
     */
    /**
     * @return false|void
     */
    private function _getKoopmanOrderStatus()
    {
        $date = date('YYYY-MM-DD hh:mm');
        $renderTemplate = Tools::getValue('render_template', false);
        $ref = Tools::getValue('reference');
        try {
            $order = Order::getByReference($ref)->getFirst();
            if (!$order) {
                if ($renderTemplate) {
                    die('<div class="w-100 mt-4 text-center text-danger h2">Bestelling niet gevonden!</div>');
                } else {
                    die(json_encode(['error' => 'Bestelling niet gevonden!']));
                }
            }

            $client = new ExportOrdersMultipleCollies($order->id);
            $statusList = json_decode($client->getShipmentStatus());


            if (empty($statusList)) {
                die('<div class="w-100 mt-4 text-center text-danger h2">De bestelling is nog niet aangemeld of is al verzonden!</div>');
            }

            // Find the shipment data for this specific order reference
            $shipmentData = null;
            foreach ($statusList as $key => $response) {
                if (isset($response->data) && is_array($response->data)) {
                    foreach ($response->data as $shipment) {
                        if (isset($shipment->order_reference) && $shipment->order_reference === $ref) {
                            $shipmentData = $shipment;
                            break 2;
                        }
                    }
                }
            }

            if (!$shipmentData) {
                die('<div class="w-100 mt-4 text-center text-danger h2">Geen verzendgegevens gevonden voor deze bestelling!</div>');
            }

        } catch (Exception $e) {
            if ($renderTemplate) {
                die('<div class="w-100 mt-4 text-center text-danger h2">' . $e->getMessage() . '</div>');
            } else {
                die(json_encode(['error' => $e->getMessage()]));
            }
        }

        $data = [];
        $mainHistory = [];

        // Get order history
        if ($order) {
            $statussesModerneSmid = $order->getHistory($this->context->language->id);

            for ($i = 0; $i < count($statussesModerneSmid); $i++) {
                array_unshift($mainHistory, [
                    'state_id' => $statussesModerneSmid[$i]['id_order_state'],
                    'date' => $statussesModerneSmid[$i]['date_add'],
                    'name' => $statussesModerneSmid[$i]['ostate_name'],
                    'color' => $statussesModerneSmid[$i]['color'],
                    'from' => 'web'
                ]);
            }
        }

        $data['reference'] = $ref;
        $data['shipping_number'] = isset($shipmentData->transport_number) ? $shipmentData->transport_number : '';
        $data['main_history'] = $mainHistory;

        // Set scheduled delivery moment if available
        if (isset($shipmentData->eta)) {
            $data['scheduled_delivery_moment'] = [
                'planned_delivery_date' => isset($shipmentData->eta->date) ? $shipmentData->eta->date : '',
                'from' => isset($shipmentData->eta->from) ? $shipmentData->eta->from : '',
                'to' => isset($shipmentData->eta->to) ? $shipmentData->eta->to : '',
            ];
        } else {
            $data['scheduled_delivery_moment'] = [
                'planned_delivery_date' => '',
                'from' => '',
                'to' => '',
            ];
        }

        $colliesData = [];

        // Process shipment units (collies)
        if (isset($shipmentData->shipment_units) && is_array($shipmentData->shipment_units)) {
            foreach ($shipmentData->shipment_units as $unit) {
                // Prepare history data from status information
                $history = [];

                // Add current status to history
                $history[] = [
                    'state_id' => isset($shipmentData->status_code) ? $shipmentData->status_code : '',
                    'depot' => isset($shipmentData->status_depot) ? $shipmentData->status_depot : '',
                    'date' => isset($shipmentData->status_date) ? $shipmentData->status_date : '',
                    'time' => isset($shipmentData->status_time) ? $shipmentData->status_time : '',
                    'name' => isset($shipmentData->status_description) ? $shipmentData->status_description : '',
                    'from' => 'api'
                ];

                // Prepare package information
                $packageInfo = [
                    'weight' => isset($unit->weight) ? $unit->weight : '',
                    'length' => '',
                    'height' => '',
                ];

                // Add measured dimensions if available
                if (isset($unit->measured) && is_array($unit->measured) && !empty($unit->measured)) {
                    $measured = $unit->measured[0];
                    $packageInfo['length'] = isset($measured->length) ? $measured->length : '';
                    $packageInfo['height'] = isset($measured->height) ? $measured->height : '';
                }

                // Prepare delivery information
                $deliveryInfo = [
                    'signature_name' => '',
                    'signature' => '',
                    'delivered_on' => '',
                    'delivered_at' => '',
                ];

                // If status is delivered, add delivery information
                if (isset($shipmentData->status_code) && $shipmentData->status_code == 200) { // Assuming 200 is the delivered status code
                    $deliveryInfo['delivered_on'] = isset($shipmentData->status_date) ? $shipmentData->status_date : '';
                    $deliveryInfo['delivered_at'] = isset($shipmentData->status_time) ? $shipmentData->status_time : '';
                }

                // Prepare scheduled delivery moment
                $schedule = [];
                if (isset($shipmentData->eta)) {
                    $schedule = [
                        'planned_delivery_date' => isset($shipmentData->eta->date) ? $shipmentData->eta->date : '',
                        'from' => isset($shipmentData->eta->from) ? $shipmentData->eta->from : '',
                        'to' => isset($shipmentData->eta->to) ? $shipmentData->eta->to : '',
                    ];
                } else {
                    $schedule = [
                        'planned_delivery_date' => '',
                        'from' => '',
                        'to' => '',
                    ];
                }

                // Add all collected information to collies data
                array_unshift($colliesData, [
                    'history' => $history,
                    'current_state' => end($history),
                    'scheduled_delivery_moment' => $schedule,
                    'barcode' => isset($unit->barcode) ? $unit->barcode : '',
                    'package' => $packageInfo,
                    'delivered' => $deliveryInfo,
                ]);
            }
        }

        $data['collies'] = $colliesData;

        // Render the template with all collected data
        die($this->kernel->getContainer()->get('twig')->render('@Modules/msthemeconfig/views/templates/admin/shipping_state_form.html.twig', $data));
    }

    /**
     * @return false|void
     */
    private function _getKoopmanOrderLabelStatus()
    {
        $date = date('YYYY-MM-DD hh:mm');
        $renderTemplate = Tools::getValue('render_template', false);
        $ref = Tools::getValue('reference');
        try {
            $order = Order::getByReference($ref)->getFirst();
            $orderDetails = $order->getOrderDetailList();
            $client = new ExportOrdersMultipleCollies($order->id);

            $statusList = json_decode($client->getShipmentStatus());

            // Check if we have a valid response
            if (empty($statusList)) {
                die('<div class="w-100 mt-4 text-center text-danger h2">De bestelling is nog niet aangemeld of is al verzonden!</div>');
            }

            $ref = 'YS-152083';
            // Find the shipment data for this specific order reference
            $shipmentData = null;
            foreach ($statusList as $key => $response) {
                if (isset($response->data) && is_array($response->data)) {
                    foreach ($response->data as $shipment) {
                        if (isset($shipment->order_reference) && $shipment->order_reference === $ref) {
                            $shipmentData = $shipment;
                            break 2;
                        }
                    }
                }
            }

            if (!$shipmentData) {
                die('<div class="w-100 mt-4 text-center text-danger h2">Geen verzendgegevens gevonden voor deze bestelling!</div>');
            }

        } catch (Exception $e) {
            if ($renderTemplate) {
                die('<div class="w-100 mt-4 text-center text-danger h2">' . $e->getMessage() . '</div>');
            } else {
                die(json_encode(['error' => $e->getMessage()]));
            }
        }

        $data = [];
        $colliesData = [];

        // Process shipment units (collies)
        if (isset($shipmentData->shipment_units) && is_array($shipmentData->shipment_units)) {
            foreach ($shipmentData->shipment_units as $unit) {
                $collieData = [
                    'nr' => isset($unit->unit_number) ? $unit->unit_number : '',
                    'type' => isset($unit->unit_type) ? $unit->unit_type : '',
                    'weight' => isset($unit->weight) ? $unit->weight : '',
                    'length' => '',
                    'height' => '',
                    'breedte' => '',
                ];

                // Check if we have measured dimensions
                if (isset($unit->measured) && is_array($unit->measured) && !empty($unit->measured)) {
                    $measured = $unit->measured[0];
                    $collieData['length'] = isset($measured->length) ? $measured->length : '';
                    $collieData['height'] = isset($measured->height) ? $measured->height : '';
                    $collieData['breedte'] = isset($measured->width) ? $measured->width : '';
                }

                $colliesData[] = $collieData;
            }
        }

        $data['collies'] = $colliesData;
        $data['products'] = $orderDetails;

        // Set basic shipment data
        $data['datum'] = isset($shipmentData->date_transport) ? $shipmentData->date_transport : '';
        $data['nrorder'] = $ref;
        $data['nrzend'] = isset($shipmentData->transport_number) ? $shipmentData->transport_number : '';

        // Set address data if available
        if (isset($shipmentData->address)) {
            $data['postcode'] = isset($shipmentData->address->postalcode) ? $shipmentData->address->postalcode : '';
            $data['plaats'] = isset($shipmentData->address->city) ? $shipmentData->address->city : '';
            $data['land'] = isset($shipmentData->address->country_code) ? $shipmentData->address->country_code : '';
        }

        // Set customer data from order if not in API response
        $customer = new Customer($order->id_customer);
        $address = new Address($order->id_address_delivery);

        $data['naam'] = $address->firstname;
        $data['naam2'] = $address->lastname;
        $data['straat'] = $address->address1;
        $data['huisnr'] = $address->house_number . ' ' . $address->house_number_extension;
        $data['telefoon'] = $address->phone;
        $data['email'] = $customer->email;

        // If we have ETA information, add it
        if (isset($shipmentData->eta)) {
            $data['eta'] = [
                'date' => isset($shipmentData->eta->date) ? $shipmentData->eta->date : '',
                'from' => isset($shipmentData->eta->from) ? $shipmentData->eta->from : '',
                'to' => isset($shipmentData->eta->to) ? $shipmentData->eta->to : '',
            ];
        }

        die($this->kernel->getContainer()->get('twig')->render('@Modules/msthemeconfig/views/templates/admin/label_state_form.html.twig', $data));
    }


    /**
     * @throws SmartyException
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    private function _getKoopmanInitRetour()
    {
        $orderId = Tools::getValue('id_order');
        $order = new Order($orderId);

        try {
            $client = new ExportOrdersMultipleCollies($orderId, []);
            $statusList = json_decode($client->getShipmentStatus());

            // Check if we have a valid response
            if (empty($statusList)) {
                die('<div class="w-100 mt-4 text-center text-danger h2">De bestelling is nog niet aangemeld of is al verzonden!</div>');
            }

            $ref = $order->reference;

            $ref = 'YS-152344';

            // Find the shipment data for this specific order reference
            $shipmentData = null;
            $packages = [];

            foreach ($statusList as $key => $response) {
                if (isset($response->data) && is_array($response->data)) {
                    foreach ($response->data as $shipment) {
                        if (isset($shipment->order_reference) && $shipment->order_reference === $ref) {
                            $shipmentData = $shipment;

                            // Process shipment units (collies)
                            if (isset($shipment->shipment_units) && is_array($shipment->shipment_units)) {
                                foreach ($shipment->shipment_units as $unit) {
                                    $packages[] = [
                                        'shipping_number' => isset($unit->barcode) ? $unit->barcode : '',
                                        'nr_collo' => isset($unit->unit_number) ? $unit->unit_number : '',
                                        'weight' => isset($unit->weight) ? $unit->weight : '',
                                        'height' => isset($unit->measured[0]->height) ? $unit->measured[0]->height : '',
                                        'width' => isset($unit->measured[0]->width) ? $unit->measured[0]->width : '',
                                        'length' => isset($unit->measured[0]->length) ? $unit->measured[0]->length : '',
                                    ];
                                }
                            }

                            break 2;
                        }
                    }
                }
            }

            if (!$shipmentData) {
                die('<div class="w-100 mt-4 text-center text-danger h2">Geen verzendgegevens gevonden voor deze bestelling!</div>');
            }

        } catch (Exception $e) {

            die('<h3 style="color:red;font-weight:bold;width:100%;text-align:center;">' . $e->getMessage() . '</h3>');
        }

        // Sort packages by collo number
        usort($packages, function ($a, $b) {
            if ($a['nr_collo'] === $b['nr_collo']) {
                return 0;
            }

            return ($a['nr_collo'] > $b['nr_collo']) ? 1 : -1;
        });

        $products = $this->cleanUpProductsList($order->getProducts(), $order);

        $data = [
            'invoice_address' => new Address($order->id_address_invoice),
            'delivery_address' => new Address($order->id_address_delivery),
            'packages' => $packages,
            'products' => $products,
        ];

        $this->context->smarty->assign(
            [
                'id_order' => $orderId,
                'order' => $order,
                'data' => $data,
            ]
        );

        die($this->context->smarty->fetch(_PS_MODULE_DIR_ . '/msthemeconfig/views/templates/admin/retourform.tpl'));
    }


    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanAfgehaald()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKEDUP_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int)$id_order;
        $history->changeIdOrderState((int)$new_status, (int)$id_order);
        $history->add();
        $this->makeApiCallToDashboard('set-picked-up', $id_order, Order::getUniqReferenceOf($id_order));
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar afgeleverd</h3>');

    }

    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    private function _getKoopmanAfTeHalen()
    {
        $id_order = Tools::getValue('id_order');
        $order = new Order($id_order);
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int)$id_order;
        $history->changeIdOrderState((int)$new_status, (int)$id_order);
        $history->addWithemail($order);
        $this->makeApiCallToDashboard('set-ready-for-pickup', $id_order, Order::getUniqReferenceOf($id_order));
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar af te halen</h3>');
    }

    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    private function _getKoopmanBackOrderStatus()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_WAITING_STOCK_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int)$id_order;
        $check = $history->changeIdOrderState((int)$new_status, (int)$id_order);
        $history->add();

        $this->makeApiCallToDashboard('set-backorder', $id_order, Order::getUniqReferenceOf($id_order));

        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar wachtend op vooraad</h3>');


    }

    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    private function _getKoopmanBeingPreparedStatus()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int)$id_order;
        $check = $history->changeIdOrderState((int)$new_status, (int)$id_order);
        $history->add();

        $this->makeApiCallToDashboard('set-being-prepared', $id_order, Order::getUniqReferenceOf($id_order));

        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar word voorbereid</h3>');
    }

    /**
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanSubmitRetour()
    {
        $reference = Tools::getValue('order_reference');
        $orderId = Tools::getValue('id_order');

        // Initialize the ExportOrdersMultipleCollies class with order ID and collies data
        $collies = [];

        // Process collie data from form
        $collie_type = Tools::getValue('collie_type');
        $collie_total = Tools::getValue('collie_total');
        $collie_reference = Tools::getValue('collie_reference');
        $collie_length = Tools::getValue('collie_length');
        $collie_width = Tools::getValue('collie_width');
        $collie_height = Tools::getValue('collie_height');
        $collie_weight = Tools::getValue('collie_weight');

        if (!empty($collie_type)) {
            $packagesTotal = count($collie_type);
            for ($x = 0; $x < $packagesTotal; $x++) {
                for ($t = 0; $t < (int)$collie_total[$x]; $t++) {
                    $collies[] = [
                        'name' => $collie_type[$x],
                        'reference' => isset($collie_reference[$x]) ? $collie_reference[$x] : '',
                        'length' => isset($collie_length[$x]) ? $collie_length[$x] : 0,
                        'width' => isset($collie_width[$x]) ? $collie_width[$x] : 0,
                        'height' => isset($collie_height[$x]) ? $collie_height[$x] : 0,
                        'weight' => isset($collie_weight[$x]) ? $collie_weight[$x] : 0,
                    ];
                }
            }
        }

        try {
            // Create instance of ExportOrdersMultipleCollies with order ID and collies
            $exportOrders = new ExportOrdersMultipleCollies($orderId, $collies);

            // Get order and delivery address information
            $order = new Order($orderId);
            $deliveryAddress = new Address($order->id_address_delivery);
            $customer = new Customer($deliveryAddress->id_customer);
            $country = new Country($deliveryAddress->id_country);

            // Ensure we have a company name (name2) for the pickup address
            $pickupName2 = !empty($deliveryAddress->company) ?
                $deliveryAddress->company :
                $deliveryAddress->firstname . ' ' . $deliveryAddress->lastname . ' (Klant)';

            // Ensure we have a phone number
            $phoneNumber = !empty($deliveryAddress->phone) ?
                $deliveryAddress->phone :
                (!empty($deliveryAddress->phone_mobile) ? $deliveryAddress->phone_mobile : '0000000000');

            // Prepare shipping data for return order
            $shippingData = [
                'type' => 'A', // A = retour (as specified in ExportOrdersMultipleCollies.php line 46)
                'depot' => $exportOrders->apiDepot,
                'customer_number' => $exportOrders->apiVerlader,
                'date' => date('Y-m-d'),
                'labels' => 'PDF',
                'references' => [
                    [
                        'type' => 'NRORDER',
                        'reference' => $reference,
                    ]
                ],
                'addresses' => [
                    [
                        'type' => 'pickup', // Where items will be picked up from (customer)
                        'name' => $deliveryAddress->firstname . ' ' . $deliveryAddress->lastname,
                        'name2' => $pickupName2, // Ensuring name2 is not empty
                        'address1' => $deliveryAddress->address1,
                        'housenumber' => $deliveryAddress->house_number . ' ' . $deliveryAddress->house_number_extension,
                        'postalcode' => $deliveryAddress->postcode,
                        'city' => $deliveryAddress->city,
                        'country_code' => $country->iso_code,
                        'contact' => [
                            'language' => 'nl',
                            'name' => $deliveryAddress->firstname . ' ' . $deliveryAddress->lastname,
                            'phonenumber' => $phoneNumber, // Ensuring phone number is not empty
                            'email' => $customer->email,
                        ]
                    ],
                    [
                        'type' => 'consignor', // Party responsible for the shipment
                        'name' => $exportOrders->afzenderNaam,
                        'name2' => $exportOrders->afzenderNaam2 ?: 'De Moderne Smid BV',
                        'address1' => $exportOrders->afzenderStraat,
                        'housenumber' => $exportOrders->afzenderHuisnr,
                        'postalcode' => $exportOrders->afzenderPostcode,
                        'city' => $exportOrders->afzenderPlaats,
                        'country_code' => $exportOrders->afzenderLand,
                    ]
                ],
                'shipment_units' => []
            ];

            // Add shipment units (collies) to the shipping data
            foreach ($collies as $i => $collie) {
                if(in_array($collie['name'], ['envelope', 'plaat', '1-meter', '2-meter'])) {
                    $collieType = 'COL';
                } else {
                    switch ($collie['name']) {
                        case 'balk-pallet':
                        case 'pallet':
                            $collieType = 'PLH';
                            break;
                        case 'plaat-pallet':
                            $collieType = 'MP';
                            break;
                        default:
                            $collieType = 'PLH';
                    }
                }

                $shippingData['shipment_units'][] = [
                    'number' => $i + 1,
                    'goods_description' => 'ModerneSmid metaal producten',
                    'packages' => '1',
                    'exchange' => '0',
                    'unit_type' => $collieType,
                    'measurements' => [
                        'weight' => $collie['weight'],
                        'length' => $collie['length'],
                        'width' => $collie['width'],
                        'height' => $collie['height'],
                        'volume' => '0.0000',
                        'loadingmeter' => '0.00'
                    ],
                    'exchange_unit' => 1,
                ];
            }

            // Make API request to create return shipment
            $response = $exportOrders->makeApiRequest($exportOrders->apiOrderEndpoint, $shippingData, 'POST');
            if (isset($response['status']) && $response['status'] === 200) {
                $resp = $response['data'];
                $trackingNumber = $resp['transport_number'];
                $trackingUrl = $resp['tracking_url'];

                // Add tracking number to order
                $exportOrders->addTrackingNumberToOrder($orderId, $trackingNumber, $trackingUrl);


                die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De retour aanvraag is geslaagd</h3>');
            } else {
                // Handle error response
                $errorMessage = '';
                if (isset($response['message'])) {
                    $errorMessage = $response['message'];

                    // Check for detailed error list
                    if (isset($response['meta']) && isset($response['meta']['error_list'])) {
                        $errorMessage .= ': ';
                        foreach ($response['meta']['error_list'] as $error) {
                            $errorMessage .= $error[1] . '; ';
                        }
                    }
                } else {
                    $errorMessage = 'Onbekende fout bij het aanmaken van de retour';
                }

                die('<h3 style="color:red;font-weight:bold;width:100%;text-align:center;">Fout: ' . $errorMessage . '</h3>');
            }

        } catch (Exception $e) {
            if (session_status() == PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION['koopmanError'] = $e->getMessage();
            die('<h3 style="color:red;font-weight:bold;width:100%;text-align:center;">Fout: ' . $e->getMessage() . '</h3>');
        }
    }




    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanPrintedLabel()
    {
        if(Tools::getIsset('updateAddress')){
            $this->updateOrderDeliveryAddress(Tools::getAllValues());
        }

        $id_order = (int)Tools::getValue('id_order');
        $collies = json_decode(str_replace("'", '"', (string)Tools::getValue('collies')), true);

        $export = new ExportOrdersMultipleCollies($id_order, $collies);

        $export->export();

        if($export->redirect){
            $readyForShippingStatus = Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

            $order = new Order($id_order);

            if((int)$readyForShippingStatus !== (int)$order->current_state){
                $history = new OrderHistory();
                $history->id_order = (int)$id_order;
                $history->changeIdOrderState((int)$readyForShippingStatus, (int)$id_order);
                $history->add();
            }

            die('printed');
        } else {
            die($export->output);
        }
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _runKoopmanDayClosing()
    {
        $export = new ExportOrdersMultipleCollies(0);
       die(json_encode($export->dagafsluiting()));
    }


    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanToegevoegd()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int)$id_order;
        $check = $history->changeIdOrderState((int)$new_status, (int)$id_order);
        $history->add();

        $this->makeApiCallToDashboard('set-added-to-order', $id_order, Order::getUniqReferenceOf($id_order));

        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar toegevoegd</h3>');
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanWorkShopStatus()
    {
        $type = Tools::getValue('type');
        $id_order = Tools::getValue('id_order');
        if ($type == 'statusandcard') {
            $trello_url = Configuration::get('MSTHEMECONFIG_TRELLO_URL', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id, Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
            $trello_secret = Configuration::get('MSTHEMECONFIG_TRELLO_SECRET', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id,  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);
            $trello_token = Configuration::get('MSTHEMECONFIG_TRELLO_TOKEN', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id,  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

            $action_type = '';
            $trello_card_lane = '';
            $trello_title = '';
            $trello_card_descr = '';
            $deliverySlip = null;

            if (!empty(Tools::getValue('action_type'))) {
                $action_type = Tools::getValue('action_type');
            }
            if (!empty(Tools::getValue('trello_card_lane'))) {
                $trello_card_lane = Tools::getValue('trello_card_lane');
            }
            if (!empty(Tools::getValue('trello_title'))) {
                $trello_title = Tools::getValue('trello_title');
            }
            if (!empty(Tools::getValue('trello_card_descr'))) {
                $trello_card_descr = Tools::getValue('trello_card_descr');
            }

            if ($trello_card_lane != "" && $trello_title != "") {
                //Generate delivery Slip
                $sql_query = new DbQuery();
                $sql_query->select('oi.*');
                $sql_query->from('order_invoice', 'oi');
                $sql_query->where('o.id_order = \'' . $id_order . '\'' . Shop::addSqlRestriction(Shop::SHARE_ORDER,
                        'o'));
                $sql_query->leftJoin('orders', 'o', 'o.id_order = oi.id_order');
                $sql_query->orderBy('oi.delivery_date ASC');

                $order_invoice_list = Db::getInstance()->executeS($sql_query);
                $orderModel = ObjectModel::hydrateCollection('OrderInvoice', $order_invoice_list);

                if (!count($orderModel)) {
                    return false;
                }

                $pdf_file = new PDFCore($orderModel, PDF::TEMPLATE_DELIVERY_SLIP, Context::getContext()->smarty);
                $delivery_slip_pdf = $pdf_file->render('S');
                $deliverySlipFilePath = '/upload/werkplaats/pakbon_' . $id_order . '.pdf';
                file_put_contents(dirname(__FILE__, 5) . $deliverySlipFilePath, $delivery_slip_pdf);

                //Create Card
                $query = [
                    'key' => $trello_secret,
                    'token' => $trello_token,
                    'idList' => $trello_card_lane,
                    'name' => $trello_title,
                    'desc' => $trello_card_descr,
                    'pos' => 'bottom'
                ];


                $curlCard = curl_init();
                curl_setopt_array($curlCard, [
                    CURLOPT_URL => $trello_url . '/1/cards',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 10,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'POST',
                    CURLOPT_POSTFIELDS => $query,
                ]);

                $info = curl_getinfo($curlCard);
                $response = curl_exec($curlCard);
                if (!curl_errno($curlCard)) {
                    $returnData = json_decode($response);
                } else {
                    $returnData = [];
                }
                $cardId = $returnData->id;
                curl_close($curlCard);

                //Create attachment
                $query2 = [
                    'key' => $trello_secret,
                    'token' => $trello_token,
                    'name' => 'pakbon_' . $id_order . '.pdf',
                    'url' => 'https://ijzershop.nl' . $deliverySlipFilePath,
                    'mimeType' => 'application/pdf',
                    'setCover' => false
                ];
                $curlAttach = curl_init();
                curl_setopt_array($curlAttach, [
                    CURLOPT_URL => $trello_url . '/1/cards/' . $cardId . '/attachments',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 10,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'POST',
                    CURLOPT_POSTFIELDS => $query2
                ]);
                $response = curl_exec($curlAttach);
                if (!curl_errno($curlAttach)) {
                    $returnData = json_decode($response);
                } else {
                    $returnData = [];
                }
                curl_close($curlAttach);
            }
        }

        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_WORKSHOP_STATUS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id);

        $history = new OrderHistory();
        $history->id_order = (int)$id_order;
        $check = $history->changeIdOrderState((int)$new_status, (int)$id_order);
        $history->add();

        $this->makeApiCallToDashboard('set-to-workshop', $id_order, Order::getUniqReferenceOf($id_order));

        if ($type == 'statusandcard') {
            die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar werkplaats en de trello card is aangemaakt</h3>');
        } else {
            die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar werkplaats</h3>');
        }
    }

    /**
     * @param $products
     * @param $order
     * @return array
     */
    private function cleanUpProductsList($products, $order): array
    {
        $filteredProducts = [];
        foreach ($products as $product) {
            $productArray = [];
            $productArray['name'] = $product['product_name'];
            $productArray['qty'] = $product['product_quantity'];
            $productArray['refunded'] = $product['product_quantity_refunded'];
            $productArray['price'] = $product['total_price_tax_incl'];
            $productArray['unit_price'] = $product['unit_price_tax_incl'];
            $customizationValue = [];
            if ($product['customizedDatas']) {
                foreach ($product['customizedDatas'][$order->id_address_delivery][$product['id_customization']]['datas'] as $customization) {
                    $customizationValue[] = $customization[0]['value'];
                }
            }
            $productArray['customization'] = implode(',', $customizationValue);
            $filteredProducts[] = $productArray;
        }

        return $filteredProducts;
    }


    /**
     * @param $route
     * @param $params
     * @param array $headerParams
     * @return array|mixed
     */
    public function doApiCall($route, $params, array $headerParams = []): mixed
    {
        $curl = curl_init();

        curl_setopt_array($curl, [
            CURLOPT_URL => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_URL', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) . '/api/' . $route,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_POSTFIELDS => $params,
            CURLOPT_HTTPHEADER => $headerParams,
        ]);
        $response = curl_exec($curl);

        // Check if any error occurred
        if (!curl_errno($curl)) {
            $returnData = json_decode($response);
        } else {
            $returnData = [];
        }

        curl_close($curl);
        return $returnData;
    }


    /**
     * @param string $type
     * @param $id_order
     * @param $reference
     * @return void
     */
    private function makeApiCallToDashboard(string $type = 'generate-label', $id_order = null, $reference = null): void
    {
        //Add new labels Api call
        $loginCall = $this->doApiCall('api-auth', [
            'email' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_USER', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id),
            'password' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_PASS', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)
        ], []);

        $firstname = "";
        if (isset($this->context->employee->firstname)) {
            $firstname = $this->context->employee->firstname;
        }
        if (isset($this->context->customer->firstname)) {
            $firstname = $this->context->customer->firstname;
        }

        if (!empty($loginCall)) {
            if (empty($reference)) {
                $successRecord = Order::getUniqReferenceOf($id_order);
            } else {
                $successRecord = $reference;
            }
            $message = [];
            $message['text'] = $firstname . " heeft op een koopman actie uitgevoerd";
            $message['status'] = 'success';
            $message['sub_type'] = $type;
            $message['error_records'] = null;
            $message['success_records'] = [$successRecord];
            $message['time'] = date("Y-m-d H:i:s");

            $call = $this->doApiCall('log-message', [
                'profile' => Context::getContext()->shop->getUrls()[0]['domain'].'test',
                'type' => "koopman-actions",
                'version' => _PS_VERSION_,
                'message' => json_encode($message),
            ], [
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Accept' => 'application/json',
                'Authorization: Bearer ' . $loginCall->access_token
            ]);
        }
    }

    /**
     * @param $id
     * @return void
     */
    private function _getDeliverySlipMessage($id)
    {
        $order = new Order($id);
        $firstMessage = $order->getFirstMessageWithId();

        if ($firstMessage) {
            $message = $firstMessage['message'];
            $message_id = $firstMessage['id_message'];
        } else {
            $message = '';
            $message_id = '';
        }

        $data = [
            'id_order' => $order->id,
            'id_cart' => $order->id_cart,
            'id_customer' => $order->id_customer,
            'id_message' => $message_id,
            'message' => $message,
        ];

        die($this->kernel->getContainer()->get('twig')->render('@Modules/msthemeconfig/views/templates/admin/delivery_slip_message_form.html.twig', $data));
    }

    /**
     */
    private function updateOrderDeliveryAddress($getAllValues)
    {
        try {
            $order = new Order($getAllValues['id_order']);

            if(!is_null($order->id_address_delivery)){
                $address = new Address($order->id_address_delivery);
                $address->address1 = $getAllValues['address1'];
                $address->house_number = $getAllValues['house_number'];
                $address->house_number_extension = $getAllValues['house_number_extension'];
                $address->postcode = $getAllValues['postcode'];
                $address->city = $getAllValues['city'];

                $address->update(false);
            }
        } catch (\PrestaShopDatabaseException|\PrestaShopException $e) {
        return false;
        }

        return true;
    }

    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    private function _updateDeliverySlipMessage()
    {
        try {
            $id_message = (int)$_GET['id_message'];
            $id_customer = (int)$_GET['customer'];
            $id_cart = (int)$_GET['cart'];
            $id_order = (int)$_GET['id_order'];
            $message = $_GET['message'];

            $db = Db::getInstance(_PS_USE_SQL_SLAVE_);

            if ($id_message == 0) {
                $db->insert('message', [
                    'id_employee' => 0,
                    'id_customer' => $id_customer,
                    'id_cart' => $id_cart,
                    'id_order' => $id_order,
                    'message' => $message,
                    'private' => 0,
                    'date_add' => date('NOW'),
                ], false, false, DB::INSERT, true);

                return die(json_encode(['msg' => $db->Affected_Rows() . ' pakbon bericht is aan de bestelling toegevoegd', 'success' => true]));
            } else {
                $db->update('message', [
                    'id_employee' => 0,
                    'id_customer' => $id_customer,
                    'id_cart' => $id_cart,
                    'id_order' => $id_order,
                    'message' => $message,
                    'private' => 0,
                    'date_add' => date('NOW'),
                ], '`id_message` = ' . $id_message);

                return die(json_encode(['msg' => $db->Affected_Rows() . ' pakbon bericht van de bestelling is gewijzigd', 'success' => true]));
            }
        } catch (Exception $exception) {
            return die(json_encode(['msg' => $exception->getMessage(), 'success' => false]));
        }
    }


    /**
     * @param bool $vat
     * @return void
     */
    private function _setVatInclExclContext(bool $vat = true){
        try {
            // Set new value for price_vat_settings_incl
            $this->context->cookie->__set('price_vat_settings_incl', json_encode($vat));
            // Persist cookie
            $this->context->cookie->write();
            // Clear cache
            Tools::clearCache();

            return die(json_encode(['msg' => 'Vat preference is set to '.json_encode($vat), 'success' => true]));
        } catch (Exception $exception){
            return die(json_encode(['msg' => $exception->getMessage(), 'success' => false]));
        }
    }

    private function _removeDefaultCartDiscountRuleCounterAccess()
    {
        $cart = new Cart($this->context->cart->id);
        $cartRuleId = Configuration::get('MSTHEMECONFIG_NO_DISCOUNT_RULE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id, '152');

        try {
            $cart->addCartRule((int)$cartRuleId);
                return die(json_encode(['msg' => 'Discount Rules are removed', 'success' => true]));
            } catch (Exception $exception){
                return die(json_encode(['msg' => $exception->getMessage(), 'success' => false]));
        }
    }


}
