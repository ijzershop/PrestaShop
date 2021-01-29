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
 * @version   2.0.3
 *
 * NOTICE OF LICENSE
 *
 * Don't use this module on several shops. The license provided by PrestaShop Addons
 * for all its modules is valid only once for a single shop.
 *
 */

class AdminSingleStockAttributesController extends ModuleAdminController
{
    public function __construct()
    {
        $this->random = Tools::getValue('random');
        parent::__construct();
    }

    public function init()
    {
        parent::init();

        if (!$this->ajax) {
            $module_config_url = $this->context->link->getAdminLink('AdminModules', true).'&configure='.$this->module->name.'&tab_module='.$this->module->tab.'&module_name='.$this->module->name;
            Tools::redirectAdmin($module_config_url);
        }

        if ($this->random != $this->module->ssa_random) {
            die(Tools::jsonEncode(array(
                'hasError' => true,
                'error' => $this->module->l('No permission')
            )));
        }

        if (Tools::getValue('action') == 'productSearch') {
            $q = Tools::getValue('q');
            $ret = '';
            if ($q && !is_array($q)) {
                $result = Search::find((int)Tools::getValue('id_lang'), $q, 1, 20, 'position', 'desc', true, false);
                if ($result) {
                    foreach ($result as $product) {
                        $ret .= $product['id_product'].'|'.$product['pname'].'|'.$product['cname']."\n";
                    }
                }
            }
            die($ret);
        } elseif (Tools::getValue('action') == 'addProduct') {
            $id_product = (int)Tools::getValue('id_product');
            $product = new Product($id_product);
            if (!Validate::isLoadedObject($product)) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('The product ID is invalid')
                )));
            } elseif ($this->module->addProduct($id_product) == -1) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('This product already added')
                )));
            } else {
                die(Tools::jsonEncode(array(
                    'error' => '',
                    'message' => $this->module->l('Product successfully added')
                )));
            }
        } elseif (Tools::getValue('action') == 'loadProducts') {
            die(Tools::jsonEncode(array(
                'error' => '',
                'content' => $this->module->loadProducts()
            )));
        } elseif (Tools::getValue('action') == 'removeProduct') {
            $id_product = (int)Tools::getValue('id_product');

            if (!$this->module->removeProduct($id_product)) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('Something went wrong, please refresh the page and try again')
                )));
            }

            die(Tools::jsonEncode(array(
                'error' => '',
                'message' => $this->module->l('Product successfully removed')
            )));
        } elseif (Tools::getValue('action') == 'removeAllProducts') {
            if (!$this->module->removeAllProducts()) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('Something went wrong, please refresh the page and try again')
                )));
            }

            die(Tools::jsonEncode(array(
                'error' => '',
                'message' => $this->module->l('All products successfully removed')
            )));
        } elseif (Tools::getValue('action') == 'categorySearch') {
            $q = Tools::getValue('q');
            $search = Db::getInstance()->ExecuteS("SELECT id_category, name FROM `"._DB_PREFIX_."category_lang` WHERE `id_lang`=1 AND `name` Like '%".pSQL($q)."%'");
            if ($search) {
                foreach ($search as $category) {
                    echo $category['id_category'].'|'.$category['name']."\n";
                }
            }
            die;
        } elseif (Tools::getValue('action') == 'addCategory') {
            $id_category = (int)Tools::getValue('id_category');
            $category = new Category($id_category);
            if (!Validate::isLoadedObject($category)) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('The Category ID is invalid')
                )));
            } elseif ($this->module->addCategory($id_category) == -1) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('This category already added')
                )));
            } else {
                die(Tools::jsonEncode(array(
                    'error' => '',
                    'message' => $this->module->l('Category successfully added')
                )));
            }
        } elseif (Tools::getValue('action') == 'loadCategories') {
            die(Tools::jsonEncode(array(
                'error' => '',
                'content' => $this->module->loadCategories()
            )));
        } elseif (Tools::getValue('action') == 'removeCategory') {
            $id_category = (int)Tools::getValue('id_category');

            if (!$this->module->removeCategory($id_category)) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('Something went wrong, please refresh the page and try again')
                )));
            }

            die(Tools::jsonEncode(array(
                'error' => '',
                'message' => $this->module->l('Category successfully removed')
            )));
        } elseif (Tools::getValue('action') == 'removeAllCategories') {
            if (!$this->module->removeAllCategories()) {
                die(Tools::jsonEncode(array(
                    'error' => $this->module->l('Something went wrong, please refresh the page and try again')
                )));
            }

            die(Tools::jsonEncode(array(
                'error' => '',
                'message' => $this->module->l('All categories successfully removed')
            )));
        } elseif (Tools::getValue('action') == 'updateSettings') {
            Configuration::updateValue('SSA_PRODUCTS_TYPE', (int)Tools::getValue('products_type'));
            die(Tools::jsonEncode(array(
                'error' => '',
                'message' => $this->module->l('Successfully updated')
            )));
        } else {
            die(Tools::jsonEncode(array(
                'hasError' => true,
                'error' => $this->module->l('Action not found')
            )));
        }
    }
}
