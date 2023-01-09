<?php
if (!defined('_PS_CORE_DIR_')) {
    define('_PS_CORE_DIR_', realpath('../../../../'));
}

require_once _PS_CORE_DIR_ . '/config/config.inc.php';
require_once _PS_CORE_DIR_ . '/init.php';

class msthemeconfigAjaxModuleFrontController extends ModuleFrontController
{

    public function __construct()
    {
        $this->token = 'JNtOUInXJD27nRgH';
        $this->apiPath = 'https://api.pro6pp.nl/v1/autocomplete?auth_key=' . $this->token;
        parent::__construct();
    }

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

        return $msgArray[$key];
    }

    public function testPostcode($postcode)
    {
        $postcodeRegex = '/^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$/';
        preg_match($postcodeRegex, $postcode, $check);
        if (empty($check)) {
            return false;
        }

        return true;
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

    public function initContent()
    {
        $this->ajax = true;
        if ($this->errors) {
            die(Tools::jsonEncode(['hasError' => true, 'errors' => $this->errors]));
        }

        if (array_key_exists('action', $_POST) && $_POST['action'] == 'check_for_existing_email_address') {
            $email = Tools::getValue('email');
            $this->_checkForExistingEmailAddress($email);
        }

        if (array_key_exists('action', $_POST) && $_POST['action'] == 'add_custom_product_to_cart') {
            return $this->_addCustomProductToCart();
        }

        if (array_key_exists('action', $_POST) && $_POST['action'] == 'remove_custom_product_to_cart') {
            return $this->_removeCustomProductToCart();
        }

        if (array_key_exists('action', $_GET) && $_GET['action'] == 'print_shoppingcart_by_employee') {
            $this->_generatePdfOfShoppingCartByEmployee();
        }

        if (array_key_exists('action', $_GET) && $_GET['action'] == 'remove_gdpr') {
            $this->_setPsGdprCustomerToRemove();
        }

        if (array_key_exists('action', $_POST) && $_POST['action'] == 'upload_files') {
            $this->_uploadPastedFilesEditor();
        }

        if (array_key_exists('action', $_POST) && $_POST['action'] == 'search_customer') {
            return $this->_searchCustomer();
        }




        $postcode = Tools::getValue('postcode');
        $houseNumber = Tools::getValue('houseNumber');
        $extension = Tools::getValue('extension');
        $id_country = Tools::getValue('id_country');
        $street = Tools::getValue('street');
        $urlNl = $this->apiPath . '&nl_sixpp=' . $postcode . '&streetnumber=' . $houseNumber . '&extension=' . $extension;
        $urlBe = $this->apiPath . '&be_fourpp=' . $postcode . '&street=' . $street . '&streetnumber=' . $houseNumber . '&subaddress=' . $extension . '&language=nl';
        $valid = false;

        $zip_code_format = Country::getZipCodeFormat((int) $id_country);
        if (Country::getNeedZipCode((int) $id_country)) {
            if ($zip_code_format) {
                $zip_regexp = '/^' . $zip_code_format . '$/ui';
                $zip_regexp = str_replace(' ', '( |)', $zip_regexp);
                $zip_regexp = str_replace('-', '(-|)', $zip_regexp);
                $zip_regexp = str_replace('N', '[0-9]', $zip_regexp);
                $zip_regexp = str_replace('L', '[a-zA-Z]', $zip_regexp);
                $zip_regexp = str_replace('C', Country::getIsoById((int) $id_country), $zip_regexp);

                if (!preg_match($zip_regexp, $postcode)) {
                    $msg = $this->module->l('Invalid Zip Code', 'SupercheckoutCore') . '<br />'
                        . $this->module->l('Must be typed as follows:', 'SupercheckoutCore') . ' '
                        . str_replace(
                            'C',
                            Country::getIsoById((int) $id_country),
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
            die(Tools::jsonEncode(['warning' => 'connection failed']));
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
            header('Content-Type: application/json');
            die(Tools::jsonEncode(['address' => $returnedAddress, 'msg' => $returnedAddressMsg, 'valid' => $valid]));
        }
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
            $filename = uniqid().'-'.basename($file['name']);
            $filename = str_replace(' ', '-', $filename);
            $filename = strtolower($filename);
            $filename = filter_var($filename, FILTER_SANITIZE_STRING);
            $dest = Tools::getValue('path');

            $path = _PS_UPLOAD_DIR_.$dest;

            $file['name'] = $filename;
            $uploader = new UploaderCore();
            $uploader->setSavePath($path);
            $a = $uploader->upload($file);

            die(Tools::jsonEncode(['valid' => true,'location' => $dest.'/'.$file['name']]));
        }
        die(false);
    }

    public function _checkForExistingEmailAddress($email)
    {
        $customerId = (int)Customer::customerExists($email, true);
        if($customerId > 0){
            die("true");
        } else {
            die("false");
        }
    }

    public function _generatePdfOfShoppingCartByEmployee()
    {
        $cart = Context::getContext()->cart;
        $pdf = new PDF($cart, 'PhysicalOrderSlip', Context::getContext()->smarty);
        $pdf->render(false);
        die();
    }

    public function _addCustomProductToCart()
    {
        $label = $_POST['label'];
        $qty = (int)$_POST['qty'];
        $price = $_POST['price'];
        $description = $_POST['description'];
        $paid = $_POST['switchinput'];
        $withTax = (bool)$_POST['with_tax'];

        $reference = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_REFERENCE');
        $category = Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY');

        $cart = Context::getContext()->cart;

        if($cart->id == NULL){
            $cart->add(true, false);
            Context::getContext()->cookie->id_cart = $cart->id;
        }

        if($withTax == 'true'){
            $productPrice = number_format($price/1.21, 6, '.', '');
        } else {
            $productPrice = number_format($price, 6, '.', '');
        }

        if($paid == 'true'){
            //is paid add product to cart
            $product = new Product();
            $product->ean13 = '';
            $product->name = [(int)Configuration::get('PS_LANG_DEFAULT') => $label];
            $product->link_rewrite = [(int)Configuration::get('PS_LANG_DEFAULT') => uniqid()];
            $product->description_short = $description;
            $product->reference = $reference;
            $product->id_category_default = $category;
            $product->redirect_type = '301';
            $product->quantity = $qty+10;
            $product->price = $productPrice;
            $product->minimal_quantity = 1;
            $product->show_price = 1;
            $product->on_sale = 0;
            $product->id_tax_rules_group = '1';
            $product->online_only = 0;
            $product->meta_description = '';
            $product->out_of_stock = '1';

            $product->add();

            StockAvailable::setQuantity($product->id, null, $qty+10, null);
            $product->addToCategories([$category]);

            $url_imagem = _PS_BASE_URL_.'/themes/modernesmid_theme/assets/img/missing-product-image.jpg';
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

            $res = $cart->updateQty($qty, $product->id, null, false);

            die(Tools::jsonEncode(['valid' => $res, 'cart' => $cart]));
        } else {
            $creditPrice = (int)$qty * (float)$price;

            //is credit add voucher to cart
            $credit = new CartRule();
            $credit->name = [(int)Configuration::get('PS_LANG_DEFAULT') => $label];
            $credit->description = strip_tags($description);
            $credit->id_customer = 0;
            $credit->date_from  =  date('Y-m-d H:i:s');
            $credit->date_to = date('Y-m-d H:i:s', strtotime("+3 hour"));
            $credit->quantity = 1;
            $credit->quantity_per_user = 1;
            $credit->priority = 1;
            $credit->partial_use = 0;

            //Make a random code
            $exist = true;
            while ($exist){
                $credit->code = strtoupper("EGC-".Tools::passwdGen(5)); //Code
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

            $creditGroupRestiction = Db::getInstance()->insert('cart_rule_group',  ['id_cart_rule' => (int)$credit->id, 'id_group' => Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_BALIE_GROUP')]);

            $cart->addCartRule($credit->id);
            die(Tools::jsonEncode(['valid' => true]));
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
                $path = _PS_CAT_IMG_DIR_ . (int) $id_entity;

                break;
            case 'manufacturers':
                $path = _PS_MANU_IMG_DIR_ . (int) $id_entity;

                break;
            case 'suppliers':
                $path = _PS_SUPP_IMG_DIR_ . (int) $id_entity;

                break;
            case 'stores':
                $path = _PS_STORE_IMG_DIR_ . (int) $id_entity;

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
                            if (is_file(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '.jpg')) {
                                unlink(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '.jpg');
                            }
                            if (is_file(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '_' . (int) Context::getContext()->shop->id . '.jpg')) {
                                unlink(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $id_entity . '_' . (int) Context::getContext()->shop->id . '.jpg');
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
}
