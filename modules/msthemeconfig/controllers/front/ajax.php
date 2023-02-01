<?php
if (!defined('_PS_CORE_DIR_')) {
    define('_PS_CORE_DIR_', realpath('../../../../'));
}

require_once _PS_CORE_DIR_ . '/config/config.inc.php';
require_once _PS_CORE_DIR_ . '/init.php';


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
        require_once _PS_ROOT_DIR_.'/app/AppKernel.php';
        $this->token = 'JNtOUInXJD27nRgH';
        $this->apiPath = 'https://api.pro6pp.nl/v1/autocomplete?auth_key=' . $this->token;
        $this->kernel = new \AppKernel('dev', true);
        $this->kernel->boot();

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
        if ($this->errors) {
            die(json_encode(['hasError' => true, 'errors' => $this->errors]));
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


        if (Tools::getValue('method') == 'orderstatus') {
            return $this->_getKoopmanOrderStatus();
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


        if (Tools::getValue('action') == 'fetch_products_for_retour') {
            $idOrder = $_POST['id_order'];
            $postcode = $_POST['postalcode'];
            return $this->_fetchProductsForRetourForm($idOrder, $postcode);
        }


        $postcode = Tools::getValue('postcode');
        $houseNumber = Tools::getValue('houseNumber');
        $extension = Tools::getValue('extension');
        $id_country = Tools::getValue('id_country');
        $street = str_replace(' ', '%', Tools::getValue('street'));
        $city = str_replace(' ', '%', Tools::getValue('city'));

        $urlNl = $this->apiPath . '&nl_sixpp=' . $postcode . '&streetnumber=' . $houseNumber . '&extension=' . $extension;

        $urlBe = $this->apiPath . '&be_fourpp=' . $postcode . '&streetnumber=' . $houseNumber . '&subaddress=' . $extension . '&language=nl';


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


        if (!$result) {
            die(json_encode(['warning' => 'connection failed']));
        } else {
            $data = json_decode($result);

            if (!is_null($data)) {
                if ($data->status == 'error') {
                    $returnedAddressMsg = $this->getMatchingMessage(strtolower($data->error->message));
                    $returnedAddress = [];
                }

                if ($data->status == 'ok') {
                    $returnedAddressMsg = 'ok';
                    $returnedAddress = (array)$data->results;

                    $valid = true;
                }
            } else {
                $returnedAddressMsg = 'Fetching address failed';
                $returnedAddress = [];
            }
            curl_close($curl);

            if ($this->testCountry($id_country) == 'be' && !empty($street)) {
                $streetData = $this->fetchStreetForBelgicAddress($city, $postcode, $street);
                if (isset($streetData[0]->street)) {
                    $returnedAddress[0]->street = $streetData[0]->street;
                }
            }


            header('Content-Type: application/json');
            die(json_encode(['address' => $returnedAddress, 'msg' => $returnedAddressMsg, 'valid' => $valid]));
        }
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
        $price = $_POST['price'];
        $description = $_POST['description'];
        $paid = $_POST['switchinput'];
        $withTax = $_POST['with_tax'];

        $reference = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_REFERENCE');
        $category = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY');

        $cart = Context::getContext()->cart;
        if ($cart->id == NULL) {
            $cart->add(true, false);
            Context::getContext()->cookie->id_cart = $cart->id;
        }

        if ($withTax == 'true') {
            $productPrice = number_format($price - ($price / 121) * 21, 6, '.', '');
        } else {
            $productPrice = number_format($price, 6, '.', '');
        }

        if ($paid == 'true') {
            //is paid add product to cart
            $product = new ProductCore();
            $product->ean13 = '';
            $product->name = [(int)Configuration::get('PS_LANG_DEFAULT') => $label];
            $product->link_rewrite = [(int)Configuration::get('PS_LANG_DEFAULT') => uniqid()];
            $product->description_short = [1=> $description];
            $product->reference = $reference;
            $product->id_category_default = $category;
            $product->redirect_type = '301';
            $product->quantity = $qty + 10;
            $product->price = $productPrice;
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
            $productAdded = $product->save(true);
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

            return json_encode(['valid' => $res, 'cart' => $cart]);
        } else {
            $creditPrice = (int)$qty * (float)$price;

            //is credit add voucher to cart
            $credit = new CartRule();
            $credit->name = [(int)Configuration::get('PS_LANG_DEFAULT') => $label];
            $credit->description = strip_tags($description);
            $credit->id_customer = 0;
            $credit->date_from = date('Y-m-d H:i:s');
            $credit->date_to = date('Y-m-d H:i:s', strtotime("+3 hour"));
            $credit->quantity = 1;
            $credit->quantity_per_user = 1;
            $credit->priority = 1;
            $credit->partial_use = 0;

            //Make a random code
            $exist = true;
            while ($exist) {
                $credit->code = strtoupper("EGC-" . Tools::passwdGen(5)); //Code
                $exist = $credit->cartRuleExists($credit->code);
            }

            $credit->minimum_amount = 0.00;
            $credit->minimum_amount_tax = 1;
            $credit->minimum_amount_currency = 1;
            $credit->minimum_amount_shipping = 0;
            $credit->country_restriction = 0;
            $credit->carrier_restriction = 0;
            $credit->group_restriction = 1;
            $credit->cart_rule_restriction = 0;
            $credit->product_restriction = 0;
            $credit->shop_restriction = 0;
            $credit->free_shipping = false;
            $credit->reduction_percent = 0.00;
            $credit->reduction_amount = $creditPrice;
            $credit->reduction_tax = false;
            $credit->reduction_currency = 1;
            $credit->reduction_product = 0;
            $credit->reduction_exlude_special = 0;
            $credit->gift_product = 0;
            $credit->gift_product_attribute = 0;
            $credit->highlight = 0;
            $credit->active = 1;
            $credit->add(true);

            $creditGroupRestiction = Db::getInstance()->insert('cart_rule_group', ['id_cart_rule' => (int)$credit->id, 'id_group' => Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_BALIE_GROUP')]);

            $cart->addCartRule($credit->id);


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
        $watermark_types = explode(',', Configuration::get('WATERMARK_TYPES'));

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
                            $path_infos[] = array($tgt_width, $tgt_height, $path . '-' . stripslashes($image_type['name']) . '.jpg');
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
                        Hook::exec('actionWatermark', array('id_image' => $id_image, 'id_product' => $id_entity));
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
            $filename = filter_var($filename, FILTER_SANITIZE_STRING);
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

        $configStatus = unserialize(Configuration::get("MsThemeConfig"));
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
    private function _getKoopmanOrderStatus()
    {
        try {
            $client = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL'), $this->soapoptions);
        } catch (Exception $e) {
            echo 'error (new SoapClient) - ' . $e->getMessage();

            return false;
        }

        $login = new stdClass();
        $login->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME');
        $login->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD');
        $login->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT');
        $login->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER');

        $date = date('YYYY-MM-DD hh:mm');
        $zendingnr = null;
        $renderTemplate = Tools::getValue('render_template', false);
        $ref = Tools::getValue('reference');

//                $ref = 'YS-092466';
//                $ref = 'YS-092467';

        try {
            $status = $client->getOpdrachtStatus($login, $date, $zendingnr, $ref);


        } catch (Exception $e) {
            if ($renderTemplate) {
                die('<div class="w-100 mt-4 text-center text-danger h2">' . $e->getMessage() . '</div>');
            } else {
                die(json_encode(['error' => $e->getMessage()]));
            }
        }

        $data = [];
        $referencedOrder = Order::getByReference($ref)->getFirst();
        $mainHistory = [];
        if ($referencedOrder) {
            $statussesModerneSmid = $referencedOrder->getHistory($this->context->language->id);

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
        $data['shipping_number'] = $status[0]->Zendingnummer;
        $data['main_history'] = $mainHistory;

        if(isset($status[0]->Plandatum)){
            $data['scheduled_delivery_moment'] = [
                'planned_delivery_date' => $status[0]->Plandatum,
                'from' => $status[0]->Plantijdvan,
                'to' => $status[0]->Plantijdtot,
            ];
        } else {
            $data['scheduled_delivery_moment'] = [
                'planned_delivery_date' => '',
                'from' => '',
                'to' => '',
            ];
        }

        $colliesData = [];

        for ($s = 0; $s < count($status[0]->aOpdrachtStatusRegel); $s++) {
            $history = [];
            $apiHist = $status[0]->aOpdrachtStatusRegel[$s]->aRegelHistorie;
            for ($i = 0; $i < count($apiHist); $i++) {
                $history[] = [
                    'state_id' => $apiHist[$i]->Status,
                    'depot' => $apiHist[$i]->Depot,
                    'date' => $apiHist[$i]->Datum,
                    'time' => $apiHist[$i]->Tijd,
                    'name' => $apiHist[$i]->Omschrijving,
                    'from' => 'api'
                ];
            }

            $Mgewicht = '';
            $Mlengte = '';
            $Mhoogte = '';
            $Mbreedte = '';

            if (isset($status[0]->aOpdrachtStatusRegel[$s]->Mgewicht)) {
                $Mgewicht = $status[0]->aOpdrachtStatusRegel[$s]->Mgewicht;
            }
            if (isset($status[0]->aOpdrachtStatusRegel[$s]->Mlengte)) {
                $Mlengte = $status[0]->aOpdrachtStatusRegel[$s]->Mlengte;
            }
            if (isset($status[0]->aOpdrachtStatusRegel[$s]->Mhoogte)) {
                $Mhoogte = $status[0]->aOpdrachtStatusRegel[$s]->Mhoogte;
            }

            if (isset($status[0]->aOpdrachtStatusRegel[$s]->Mbreedte)) {
                $Mbreedte = $status[0]->aOpdrachtStatusRegel[$s]->Mbreedte;
            }

            $Hnaam = '';
            $Htekening = '';
            $Hdatum = '';
            $Htijd = '';

            if (isset($status[0]->aHandtekening[0]->Naam)) {
                $Hnaam = $status[0]->aHandtekening[0]->Naam;
                $Htekening = base64_decode($status[0]->aHandtekening[0]->Handtekening);
                $Hdatum = $status[0]->aHandtekening[0]->Datum;
                $Htijd = $status[0]->aHandtekening[0]->Tijd;
            }
            $schedule = [];
            if (isset($status[0]->Plandatum)) {
                $schedule = [
                    'planned_delivery_date' => $status[0]->Plandatum,
                    'from' => $status[0]->Plantijdvan,
                    'to' => $status[0]->Plantijdtot,
                ];
            } else {
                $schedule = [
                    'planned_delivery_date' => '',
                    'from' => '',
                    'to' => '',
                ];
            }

            array_unshift($colliesData,  [
                'history' => $history,
                'current_state' => end($status[0]->aOpdrachtStatusRegel[$s]->aRegelHistorie),
                'scheduled_delivery_moment' => $schedule,
                'barcode' => $status[0]->aOpdrachtStatusRegel[$s]->Barcode,
                'package' => [
                    'weight' => $Mgewicht,
                    'length' => $Mlengte,
                    'height' => $Mhoogte,
                ],
                'delivered' => [
                    'signature_name' => $Hnaam,
                    'signature' => $Htekening,
                    'delivered_on' => $Hdatum,
                    'delivered_at' => $Htijd,
                ],
            ]);


        }
        $data['collies'] = $colliesData;

        die($this->kernel->getContainer()->get('twig')->render('@Modules/koopmanorderexport/views/templates/admin/shipping_state_form.html.twig',$data));

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
            $client = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL'), $this->soapoptions);
        } catch (Exception $e) {
            echo 'error (new SoapClient) - ' . $e->getMessage();

            return false;
        }

        $login = new stdClass();
        $login->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME');
        $login->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD');
        $login->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT');
        $login->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER');

        $ref = $order->reference;
//        $ref = 'YS-091779';
        try {
            $status = $client->getOpdrachtStatus($login, null, null, $ref);
        } catch (Exception $e) {
            die('<h3 style="color:red;font-weight:bold;width:100%;text-align:center;">' . $e->getMessage() . '</h3>');
        }

        $packages = [];

        foreach ($status[0]->aOpdrachtStatusRegel as $key => $value) {
            if (isset($value->Nrcollo)) {
                $Nrcollo = $value->Nrcollo;
            } else {
                $Nrcollo = '';
            }
            if (isset($value->Mgewicht)) {
                $Mgewicht = $value->Mgewicht;
            } else {
                $Mgewicht = '';
            }
            if (isset($value->Mhoogte)) {
                $Mhoogte = $value->Mhoogte;
            } else {
                $Mhoogte = '';
            }
            if (isset($value->Mlengte)) {
                $Mlengte = $value->Mlengte;
            } else {
                $Mlengte = '';
            }

            if (isset($value->Mbreedte)) {
                $Mbreedte = $value->Mbreedte;
            } else {
                $Mbreedte = '';
            }
            $packages[] = [
                'shipping_number' => $value->Barcode,
                'nr_collo' => $Nrcollo,
                'weight' => $Mgewicht,
                'height' => $Mhoogte,
                'width' => $Mbreedte,
                'length' => $Mlengte,
            ];
        }
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

        die($this->context->smarty->fetch(_PS_MODULE_DIR_ . 'koopmanorderexport/views/templates/admin/retourform.tpl'));
    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanAfgehaald()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKEDUP_STATUS');

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
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_STATUS');

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
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_WAITING_STOCK_STATUS');

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
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_STATUS');

        $history = new OrderHistory();
        $history->id_order = (int)$id_order;
        $check = $history->changeIdOrderState((int)$new_status, (int)$id_order);
        $history->add();

        $this->makeApiCallToDashboard('set-being-prepared', $id_order, Order::getUniqReferenceOf($id_order));

        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De status is gewijzigd naar word voorbereid</h3>');
    }

    /**
     * @return false|void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanSubmitRetour()
    {
        $reference = Tools::getValue('order_reference');
        $orderId = Tools::getValue('id_order');
        $orderMsg = Tools::getValue('order_msg');
        try {
            $client = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL'), $this->soapoptions);
        } catch (Exception $e) {
            echo 'error (new SoapClient) - ' . $e->getMessage();

            return false;
        }

        $order = new Order($orderId);
        $deliveryAddress = new Address($order->id_address_delivery);

        $login = new stdClass();
        $login->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME');
        $login->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD');
        $login->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT');
        $login->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER');

        $opdracht = new stdClass();
        $opdracht->type = 'A'; // A = retour
        $opdracht->nrorder = $reference;
        $opdracht->afzender = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDER');
        $opdracht->afznaam = 'De Moderne Smid';
        $opdracht->afzastraat = 'Venusweg';
        $opdracht->afzhuisnr = '15';
        $opdracht->afzpostcode = '8938BC';
        $opdracht->afzplaats = 'Leeuwarden';
        $opdracht->afzland = 'NL';
        $opdracht->geanaam = $deliveryAddress->firstname;
        $opdracht->geanaam2 = $deliveryAddress->lastname;
        $opdracht->geastraat = $deliveryAddress->address1;
        $opdracht->geahuisnr = $deliveryAddress->house_number . '' . $deliveryAddress->house_number_extension;
        $opdracht->geapostcode = $deliveryAddress->postcode;
        $opdracht->geaplaats = $deliveryAddress->city;
        $opdracht->geatelefoon = $deliveryAddress->phone;
        $cust = new Customer($deliveryAddress->id_customer);
        if (isset($cust->email)) {
            $opdracht->geaemail = $cust->email;
        }

        $country = new Country($deliveryAddress->id_country);
        if (isset($country->iso_code)) {
            $opdracht->gealand = $country->iso_code;
        }

        $opdracht->instructie = $orderMsg;

        if (!empty($opdracht->geaplaats)) {
            $collie_type = Tools::getValue('collie_type');
            $collie_total = Tools::getValue('collie_total');
            $collie_reference = Tools::getValue('collie_reference');
            $collie_length = Tools::getValue('collie_length');
            $collie_width = Tools::getValue('collie_width');
            $collie_height = Tools::getValue('collie_height');
            $collie_weight = Tools::getValue('collie_weight');

            $collie_number = 1;
            $packagesTotal = count($collie_type);
            $loop = $packagesTotal - 1;
            for ($x = 0; $x <= $loop; $x++) {
                for ($t = 0; $t <= (int)$collie_total[$x] - 1; $t++) {
                    $regel = new stdClass();
                    $regel->nrcollo = $collie_number;
                    $regel->vrzenh = 'COL';

                    if (isset($collie_weight[$x])) {
                        $regel->gewicht = $collie_weight[$x];
                    }
                    if (isset($collie_length[$x])) {
                        $regel->lengte = $collie_length[$x];
                    }
                    if (isset($collie_width[$x])) {
                        $regel->breedte = $collie_width[$x];
                    }
                    if (isset($collie_height[$x])) {
                        $regel->hoogte = $collie_height[$x];
                    }

                    if (isset($collie_reference[$x])) {
                        $regel->referentie = $collie_reference[$x];
                    }

                    $opdracht->aRegel[] = $regel;
                    $collie_number++;
                }
            }

            $transport = false;
            try {
                $transport = $client->addOpdracht($login, $opdracht);
            } catch (Exception $e) {
                session_start();
                $_SESSION['koopmanError'] = $e->getMessage();
            }
        }
        die('<h3 style="color:green;font-weight:bold;width:100%;text-align:center;">De retour aanvraag is geslaagd</h3>');

    }

    /**
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function _getKoopmanToegevoegd()
    {
        $id_order = Tools::getValue('id_order');
        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS');

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
            $trello_url = Configuration::get('MSTHEMECONFIG_TRELLO_URL');
            $trello_secret = Configuration::get('MSTHEMECONFIG_TRELLO_SECRET');
            $trello_token = Configuration::get('MSTHEMECONFIG_TRELLO_TOKEN');

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

        $new_status = Configuration::get('KOOPMANORDEREXPORT_SELECT_WORKSHOP_STATUS');

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
            CURLOPT_URL => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_URL') . '/api/' . $route,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
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
            'email' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_USER'),
            'password' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_PASS')
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
                'profile' => Context::getContext()->shop->getUrls()[0]['domain'],
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
}
