<?php
/**
 * 2008 - 2020 Presto-Changeo
 *
 * MODULE Single Stock Attributes
 *
 * @author    Presto-Changeo <info@presto-changeo.com>
 * @copyright Copyright (c) permanent, Presto-Changeo
 * @license   Addons PrestaShop license limitation
 * @link      http://www.presto-changeo.com
 * @version   2.1.0
 *
 * NOTICE OF LICENSE
 *
 * Don't use this module on several shops. The license provided by PrestaShop Addons
 * for all its modules is valid only once for a single shop.
 *
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class SingleStockAttributesPoco extends Module
{

    protected $html = '';
    protected $postErrors = array();
    protected $full_version = 21000;
    public $ssa_random;
    public $ssa_products_type;
    public $ssa_products;
    public $ssa_categories;

    public function __construct()
    {
        $this->name = 'singlestockattributespoco';
        $this->tab = 'front_office_features';
        $this->version = '2.1.0';

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
        $this->author = 'Presto-changeo';

        $this->bootstrap = true;
        parent::__construct();

        $this->refreshProperties();

        $this->displayName = $this->l('Single Stock Attributes');
        $this->description = $this->l('Use a single stock system for products with multiple attributes');
    }

    public function install()
    {
        $secure_key = md5(mt_rand() . time());

        if (!parent::install() ||
            !$this->registerHook('backOfficeHeader') ||
            !$this->registerHook('actionValidateOrder') ||
            !$this->registerHook('actionGetProductPropertiesAfter') ||
            !$this->installTab() ||
            !$this->registerHook('actionOrderStatusPostUpdate') ||
            !$this->registerHook('actionOrderEdited')) {
            return false;
        }
        return true;
    }

    public function uninstall()
    {
        $this->uninstallTab();

        if (!parent::uninstall()) {
            return false;
        }
        return true;
    }

    public function installTab()
    {
        $tab = new Tab();
        $tab->active = 0;
        $tab->name = array();
        $tab->class_name = 'AdminSingleStockAttributes';

        foreach (Language::getLanguages(true) as $lang) {
            $tab->name[$lang['id_lang']] = 'Single Stock Attributes';
        }

        $tab->id_parent = 0;
        $tab->module = $this->name;

        return $tab->add();
    }

    public function uninstallTab()
    {
        $id_tab = (int)Tab::getIdFromClassName('AdminSingleStockAttributes');

        if ($id_tab) {
            $tab = new Tab($id_tab);
            $tab->delete();
        }
    }

    private function refreshProperties()
    {
        $random = Configuration::get('SSA_RANDOM');
        if ($random != '') {
            $this->ssa_random = $random;
        } else {
            $random = md5(mt_rand() . time());
            Configuration::updateValue('SSA_RANDOM', $random);
            $this->ssa_random = $random;
        }

        $this->ssa_products_type = (int)Configuration::get('SSA_PRODUCTS_TYPE');
        $products = Tools::unSerialize(Configuration::get('SSA_PRODUCTS'));
        if ($products) {
            $this->ssa_products = $products;
        } else {
            $this->ssa_products = array();
        }

        $categories = Tools::unSerialize(Configuration::get('SSA_CATEGORIES'));
        if ($categories) {
            $this->ssa_categories = $categories;
        } else {
            $this->ssa_categories = array();
        }

        $this->last_updated = Configuration::get('PRESTO_CHANGEO_UC');
    }

    public function getContent()
    {
        $this->postProcess();
        $output = $this->displayForm();
        return $this->html . $output;
    }

    private function displayForm()
    {
        $this->prepareAdminVars();

        $topMenuDisplay = $this->display(__FILE__, 'views/templates/admin/top_menu.tpl');
        $leftMenuDisplay = $this->display(__FILE__, 'views/templates/admin/left_menu.tpl');

        $basicSettingsDisplay = $this->display(__FILE__, 'views/templates/admin/basic_settings.tpl');

        $installationInstructionsDisplay = $this->display(__FILE__, 'views/templates/admin/installation_instructions.tpl');

        return $topMenuDisplay . $leftMenuDisplay . $basicSettingsDisplay . $installationInstructionsDisplay;
    }

    private function prepareAdminVars()
    {

        $displayUpgradeCheck = '';
        if (file_exists(dirname(__FILE__) . '/PrestoChangeoClasses/PrestoChangeoUpgrade.php')) {
            if (!in_array('PrestoChangeoUpgrade', get_declared_classes())) {
                require_once(dirname(__FILE__) . '/PrestoChangeoClasses/PrestoChangeoUpgrade.php');
            }
            $initFile = new PrestoChangeoUpgrade($this, $this->_path, $this->full_version);

            $upgradeCheck = $initFile->displayUpgradeCheck('SSA2');
            if (isset($upgradeCheck) && !empty($upgradeCheck)) {
                $displayUpgradeCheck = $upgradeCheck;
            }
        }
        
        $getModuleRecommendations = '';
        if (file_exists(dirname(__FILE__) . '/PrestoChangeoClasses/PrestoChangeoUpgrade.php')) {
            if (!in_array('PrestoChangeoUpgrade', get_declared_classes())) {
                require_once(dirname(__FILE__) . '/PrestoChangeoClasses/PrestoChangeoUpgrade.php');
            }
            $initFile = new PrestoChangeoUpgrade($this, $this->_path, $this->full_version);

            $getModuleRecommendations = $initFile->getModuleRecommendations('SSA');
        }

        $logoPrestoChangeo = '';
        $contactUsLinkPrestoChangeo = '';
        if (file_exists(dirname(__FILE__) . '/PrestoChangeoClasses/PrestoChangeoUpgrade.php')) {
            if (!in_array('PrestoChangeoUpgrade', get_declared_classes())) {
                require_once(dirname(__FILE__) . '/PrestoChangeoClasses/PrestoChangeoUpgrade.php');
            }
            $initFile = new PrestoChangeoUpgrade($this, $this->_path, $this->full_version);

            $logoPrestoChangeo = $initFile->getPrestoChangeoLogo();
            $contactUsLinkPrestoChangeo = $initFile->getContactUsOnlyLink();
        }

        $psv = $this->getPSV();
        $ps_version3 = Tools::substr(_PS_VERSION_, 0, 5) . (Tools::substr(_PS_VERSION_, 5, 1) != "." ? Tools::substr(_PS_VERSION_, 5, 1) : "");

        if ($ps_version3 == '1.7.0' || $ps_version3 == '1.7.1' || $ps_version3 == '1.7.2') {
            $checkInstalledCart = $this->fileCheckLines('/override/classes/Cart.php', '/override/classes/Cart.php', array('24-27', '56-66', '89-92', 119, 169, 217, '231-237', 240, 285, '316-339'), $psv);
            $checkInstalledProduct = $this->fileCheckLines('/override/classes/Product.php', '/override/classes/Product.php', array('24-27', '52-61'), $psv);
            $checkInstalledOrderController = $this->fileCheckLines('/override/controllers/admin/AdminOrdersController.php', '/override/controllers/admin/AdminOrdersController.php', array('280-285', '556-561', 1230, '1351-1359', '1477-1482'), $psv);
            $checkInstalledCartController = $this->fileCheckLines('/override/controllers/front/CartController.php', '/override/controllers/front/CartController.php', array('24-27', '59-76'), $psv);

            $override_folder = '1.7';
        } else {
            $checkInstalledCart = $this->fileCheckLines('/override/classes/Cart.php', '/override/classes/Cart.php', array('24-27', '56-66', '90-93', 120, 170, 218, '232-238', 241, 286, '317-340'), '1.7.3');
            $checkInstalledProduct = $this->fileCheckLines('/override/classes/Product.php', '/override/classes/Product.php', array('24-27', '52-61'), '1.7.3');
            $checkInstalledOrderController = $this->fileCheckLines('/override/controllers/admin/AdminOrdersController.php', '/override/controllers/admin/AdminOrdersController.php', array('280-285', '556-561', 1230, '1351-1359', '1477-1482'), '1.7.3');
            $checkInstalledCartController = $this->fileCheckLines('/override/controllers/front/CartController.php', '/override/controllers/front/CartController.php', array('24-27', '78-95'), '1.7.3');

            $override_folder = '1.7.3';
        }

        $this->context->smarty->assign(array(
            'displayUpgradeCheck' => $displayUpgradeCheck,
            'getModuleRecommendations' => $getModuleRecommendations,
            'id_lang' => $this->context->cookie->id_lang,
            'id_employee' => $this->context->cookie->id_employee,
            'path' => $this->_path,
            'module_name' => $this->name,
            'module_dir' => _MODULE_DIR_,
            'module_basedir' => _MODULE_DIR_ . 'singlestockattributespoco/',
            'request_uri' => $_SERVER['REQUEST_URI'],
            'mod_version' => $this->version,
            'upgradeCheck' => (isset($upgradeCheck) && !empty($upgradeCheck) ? true : false),
            'logoPrestoChangeo' => $logoPrestoChangeo,
            'contactUsLinkPrestoChangeo' => $contactUsLinkPrestoChangeo,
            'base_uri' => __PS_BASE_URI__,
            'psv' => $psv,
            'checkInstalledCart' => $checkInstalledCart,
            'checkInstalledProduct' => $checkInstalledProduct,
            'checkInstalledOrderController' => $checkInstalledOrderController,
            'checkInstalledCartController' => $checkInstalledCartController,
            'override_folder' => $override_folder,
            'ssa_products_type' => $this->ssa_products_type,
            'ssa_admin_controller' => $this->context->link->getAdminLink('AdminSingleStockAttributes'),
            'ssa_random' => $this->ssa_random
        ));
    }

    private function postProcess()
    {
        $this->refreshProperties();
    }

    private function fileCheckLines($lfile, $mfile, $lines, $ps_version, $extra = "")
    {
        $return = array();

        if (!file_exists(_PS_ROOT_DIR_ . $lfile)) {
            $return[$lfile]['file_not_found'] = false;
        } else {
            $return[$lfile]['file_not_found'] = true;
        }

        $return[$lfile]['file_installed'] = false;

        $server_file = Tools::file_get_contents(_PS_ROOT_DIR_ . $lfile);
        $all_good = true;
        $module_lines = file(_PS_ROOT_DIR_ . "/modules/".$this->name."/modified_" . $ps_version . $mfile);

        $fullyInstalled = true;

        foreach ($lines as $line) {
            if (sizeof($module_lines) <= 1) {
                $all_good = false;
                $line_good = false;

                break;
            }
            $start = "";
            $end = "";
            if (strpos($line, "-") === false) {
                $start = max($line - 1, 0);
                $end = min($line + 1, sizeof($module_lines) - 1);
            } else {
                $tmp_arr = explode("-", $line);
                $start = max((int) ($tmp_arr[0]) - 1, 0);
                $end = min((int) ($tmp_arr[1] + 1), sizeof($module_lines) - 1);
            }
            $line_good = true;
            for ($i = $start; $i <= $end; $i++) {
                if (trim($module_lines[$i]) == "" || strpos($server_file, trim($module_lines[$i])) !== false) {
                    if (trim($module_lines[$i]) != "") {
                        $server_file = Tools::substr($server_file, strpos($server_file, trim($module_lines[$i])) + 1);
                    }
                } else {
                    $all_good = false;
                    $line_good = false;
                    break;
                }
            }
            if ($fullyInstalled && $all_good) {
                $fullyInstalled = true;
            } else {
                $fullyInstalled = false;
            }
            $return[$lfile][$line] = $line_good;
        }
        $return[$lfile]['file_installed'] = $fullyInstalled;

        return $return;
    }

    /**
     * get version of PrestaShop
     * return float value version
     */
    protected function getPSV()
    {
        return (float) Tools::substr($this->getRawPSV(), 0, 3);
    }

    /**
     * get raw version of PrestaShop
     */
    private function getRawPSV()
    {
        return _PS_VERSION_;
    }

    /**
     * Add the CSS & JavaScript files you want to be loaded in the BO.
     */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('configure') == $this->name) {
            $this->context->controller->addCSS($this->_path . 'views/css/globalBack.css');
            $this->context->controller->addCSS($this->_path . 'views/css/specificBack.css');
        }
    }

    public function getProductCombinationIDs($id_product)
    {
        return Db::getInstance()->executeS('
            SELECT id_product_attribute
            FROM '._DB_PREFIX_.'product_attribute
            WHERE id_product = '.(int)$id_product);
    }

    public function hookActionValidateOrder($params)
    {
        $cart = $params['cart'];
        foreach ($cart->getProducts() as $product) {
            if (Configuration::get('PS_STOCK_MANAGEMENT') != 1) {
                continue;
            }
            
            if (!$this->useSSA($product['id_product'])) {
                continue;
            }

            $combinations = $this->getProductCombinationIDs($product['id_product']);

            if (!$combinations) {
                continue;
            }

            foreach ($combinations as $combination) {
                if ($combination['id_product_attribute'] == $product['id_product_attribute']) {
                    continue;
                }

                $current_stock = StockAvailable::getQuantityAvailableByProduct($product['id_product'], $combination['id_product_attribute'], Context::getContext()->shop->id);

                $this->removeStock(new Product($product['id_product']), $combination['id_product_attribute'], Context::getContext()->shop->id, ($current_stock - $product['cart_quantity']));
            }
        }
    }

    public function removeStock($product, $id_ac, $id_shop, $stock)
    {
        StockAvailable::setQuantity((int)$product->id, (int)$id_ac, $stock, $id_shop);
    }

    public function addStock($product, $id_product_attribute, $stock)
    {
        $id_shop = Context::getContext()->shop->id;
        StockAvailable::setQuantity((int)$product->id, (int)$id_product_attribute, $stock, $id_shop);
    }

    public function getCombinationsForStockUpdate($id_product)
    {
        if (Configuration::get('PS_STOCK_MANAGEMENT') != 1) {
            return array();
        }

        if (!$this->useSSA($id_product)) {
            return array();
        }

        $combinations = $this->getProductCombinationIDs($id_product);

        if (!$combinations) {
            return array();
        }

        return $combinations;
    }

    public function updateStock($id_product, $id_product_attribute, $quantity, $decrease = true)
    {
        $combinations = $this->getCombinationsForStockUpdate($id_product);
        foreach ($combinations as $combination) {
            if ($combination['id_product_attribute'] == $id_product_attribute) {
                continue;
            }

            $current_stock = StockAvailable::getQuantityAvailableByProduct($id_product, $combination['id_product_attribute'], Context::getContext()->shop->id);

            if ($decrease) {
                StockAvailable::setQuantity((int)$id_product, (int)$combination['id_product_attribute'], ($current_stock - $quantity), Context::getContext()->shop->id);
            } else {
                StockAvailable::setQuantity((int)$id_product, (int)$combination['id_product_attribute'], ($current_stock + $quantity), Context::getContext()->shop->id);
            }
        }
    }

    public function hookActionGetProductPropertiesAfter($params)
    {
        if (!$this->useSSA($params['product']['id_product'])) {
            return;
        }
        $default_on = Product::getDefaultAttribute($params['product']['id_product']);
        $default_stock = StockAvailable::getQuantityAvailableByProduct($params['product']['id_product'], $default_on, Context::getContext()->shop->id);
        //Fixed error related to product availability message
        //We should take in consideration quantity that is added to cart.
        if ($cart_quantity = $this->containsProductInAllVariants($params['product']['id_product'])) {
            $default_stock -= (int)$cart_quantity['quantity'];
        }
        $params['product']['quantity'] = $default_stock;
        //Set this, because if admin have quantities then it sums them up and displays that product is available in different combinations
        $params['product']['quantity_all_versions'] = $default_stock;
    }

    //We cannot use override method of Class CART, since we need quantity in cart of all combinations at ALl times
    public function containsProductInAllVariants($id_product, $id_product_attribute = 0, $id_customization = 0, $id_address_delivery = 0)
    {
        $sql = 'SELECT cp.`quantity` FROM `'._DB_PREFIX_.'cart_product` cp';

        if ($id_customization) {
            $sql .= '
                LEFT JOIN `'._DB_PREFIX_.'customization` c ON (
                    c.`id_product` = cp.`id_product`
                    AND c.`id_product_attribute` = cp.`id_product_attribute`
                )';
        }

        $sql .= ' WHERE cp.`id_product` = '.(int)$id_product;
        if (!Module::isEnabled('singlestockattributespoco')) {
            $sql = ' AND cp.`id_product_attribute` = ' . (int)$id_product_attribute;
        }

        $sql .=' AND cp.`id_customization` = '.(int)$id_customization.'
            AND cp.`id_cart` = '.(int)$this->context->cart->id;
        if (Configuration::get('PS_ALLOW_MULTISHIPPING') && $this->isMultiAddressDelivery()) {
            $sql .= ' AND cp.`id_address_delivery` = '.(int)$id_address_delivery;
        }

        if ($id_customization) {
            $sql .= ' AND c.`id_customization` = '.(int)$id_customization;
        }
        /*
        * Modified to return the total products from the cart if the current attribute is already there.
        * This is needed because if this function returns a result, then PS will try to update the quantity
        * of the product in the cart, rather than add it to the cart.
        */
        $ret = Db::getInstance()->getRow($sql);
        if ($ret['quantity'] > 0) {
            $sql = 'SELECT sum(cp.`quantity`) as qty FROM `'._DB_PREFIX_.'cart_product` cp
                WHERE cp.`id_product` = '.(int)$id_product.'
                AND cp.`id_cart` = '. (int)$this->context->cart->id;
            $qty = Db::getInstance()->getRow($sql);
            if (isset($qty['qty'])) {
                $ret['quantity'] = $qty['qty'];
            }
        }
        return $ret;
    }

    public function addProduct($id_product)
    {
        $products = Tools::unSerialize(Configuration::get('SSA_PRODUCTS'));
        if ($products && in_array($id_product, $products)) {
            return -1;
        } else {
            $products[$id_product] = $id_product;
            Configuration::updateValue('SSA_PRODUCTS', serialize($products));
            return 1;
        }
    }

    public function removeProduct($id_product)
    {
        $products = Tools::unSerialize(Configuration::get('SSA_PRODUCTS'));
        if (!$products || !in_array($id_product, $products)) {
            return false;
        } else {
            unset($products[$id_product]);
            return Configuration::updateValue('SSA_PRODUCTS', serialize($products));
        }
    }

    public function removeAllProducts()
    {
        return Configuration::updateValue('SSA_PRODUCTS', serialize(array()));
    }

    public function loadProducts()
    {
        $prods = Tools::unSerialize(Configuration::get('SSA_PRODUCTS'));
        $products = array();
        if ($prods) {
            foreach ($prods as $key => $id_product) {
                $product = new Product($id_product, false, $this->context->language->id);
                $products[$key]['id_product'] = $id_product;
                $products[$key]['name'] = $product->name;
            }
        }
        $this->context->smarty->assign(
            array(
                'ps_version' => (float)Tools::substr(_PS_VERSION_, 0, 3),
                'products' => $products
            )
        );
        return $this->display(__FILE__, 'views/templates/admin/products.tpl');
    }

    public function addCategory($id_category)
    {
        $categories = Tools::unSerialize(Configuration::get('SSA_CATEGORIES'));
        if ($categories && in_array($id_category, $categories)) {
            return -1;
        } else {
            $categories[$id_category] = $id_category;
            Configuration::updateValue('SSA_CATEGORIES', serialize($categories));
            return 1;
        }
    }

    public function removeCategory($id_category)
    {
        $categories = Tools::unSerialize(Configuration::get('SSA_CATEGORIES'));
        if (!$categories || !in_array($id_category, $categories)) {
            return false;
        } else {
            unset($categories[$id_category]);
            return Configuration::updateValue('SSA_CATEGORIES', serialize($categories));
        }
    }

    public function removeAllCategories()
    {
        return Configuration::updateValue('SSA_CATEGORIES', serialize(array()));
    }

    public function loadCategories()
    {
        $cats = Tools::unSerialize(Configuration::get('SSA_CATEGORIES'));
        $categories = array();
        if ($cats) {
            foreach ($cats as $key => $id_category) {
                $category = new Category($id_category, $this->context->language->id);
                $categories[$key]['id_category'] = $id_category;
                $categories[$key]['name'] = $category->name;
            }
        }
        $this->context->smarty->assign(
            array(
                'ps_version' => (float)Tools::substr(_PS_VERSION_, 0, 3),
                'categories' => $categories
            )
        );
        return $this->display(__FILE__, 'views/templates/admin/categories.tpl');
    }

    public function useSSA($id_product)
    {
        if (!$this->ssa_products_type) {
            return true;
        }

        if ($this->ssa_products_type == 1) {
            if (in_array($id_product, $this->ssa_products)) {
                return true;
            }

            foreach ($this->ssa_categories as $id_category) {
                if ($this->categoryHasProduct($id_category, $id_product)) {
                    return true;
                }
            }

            return false;
        } else {
            if (in_array($id_product, $this->ssa_products)) {
                return false;
            }

            foreach ($this->ssa_categories as $id_category) {
                if ($this->categoryHasProduct($id_category, $id_product)) {
                    return false;
                }
            }

            return true;
        }
    }

    public function hookActionOrderStatusPostUpdate($params)
    {
        if (!defined('_PS_ADMIN_DIR_')) {
            return;
        }
        $order = new Order($params['id_order']);
        $cart = new Cart($order->id_cart);

        $new_order_status = $params['newOrderStatus'];
        $old_order_status_id = Db::getInstance()->getValue('SELECT id_order_state FROM ' . _DB_PREFIX_ . 'order_history
            WHERE id_order = ' . (int) $params['id_order'] . ' ORDER BY id_order_history desc');

        if (!$old_order_status_id) {
            return;
        }

        $old_order_status = new OrderState($old_order_status_id);
        $error_or_canceled_statuses = array(Configuration::get('PS_OS_ERROR'), Configuration::get('PS_OS_CANCELED'));

        $move_stock = false;

        if (!$new_order_status->logable && $old_order_status->logable && in_array($new_order_status->id, $error_or_canceled_statuses)) {
            $add_stock = true;
            $move_stock = true;
        } elseif ($new_order_status->logable && !$old_order_status->logable && in_array($old_order_status->id, $error_or_canceled_statuses)) {
            $add_stock = false;
            $move_stock = true;
        } elseif (!$new_order_status->logable && !$old_order_status->logable && in_array($new_order_status->id, $error_or_canceled_statuses) && !in_array($old_order_status->id, $error_or_canceled_statuses)) {
            $add_stock = true;
            $move_stock = true;
        }

        if (!$move_stock) {
            return;
        }

        foreach ($cart->getProducts() as $product) {
            $this->updateStock($product['id_product'], $product['id_product_attribute'], $product['cart_quantity'], !$add_stock);
        }
    }

    public function hookActionOrderEdited($params)
    {
        if (Tools::getValue('action') == 'addProductOnOrder') {
            $product = Tools::getValue('add_product');
            $id_product = $product['product_id'];
            $id_product_attribute = $product['product_attribute_id'];

            $this->updateStock($product['product_id'], $product['product_attribute_id'], $product['product_quantity']);
        }
    }
}
