<?php
/**
 * 2010-2020 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tuni-Soft
 * @copyright 2010-2020 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\module;

use classes\models\DynamicObject;
use Configuration;
use Context;
use DynamicProduct;
use HelperForm;
use Language;
use Tools;

class DynamicPresenter
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    protected $model;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function getCurrentAction()
    {
        $keys = array_keys($_GET);
        foreach ($keys as $key) {
            if (0 === strpos($key, 'display_')) {
                return str_replace('display_', '', $key);
            }
        }
        return false;
    }

    protected function getFormFields()
    {
    }

    protected function getFormHelper()
    {
        $default_lang = (int)Configuration::get('PS_LANG_DEFAULT');
        $helper = new HelperForm();
        $helper->module = $this->module;
        foreach (Language::getLanguages(false) as $lang) {
            $helper->languages[] = array(
                'id_lang'    => $lang['id_lang'],
                'iso_code'   => $lang['iso_code'],
                'name'       => $lang['name'],
                'is_default' => $default_lang === (int)$lang['id_lang'] ? 1 : 0
            );
        }
        $helper->default_form_language = $default_lang;
        $helper->title = $this->module->displayName;
        $helper->submit_action = "submit" . $this->model;
        return $helper;
    }

    protected function getFormValues()
    {
        $values = array();
        $id_object = (int)Tools::getValue('id_' . $this->model);
        $model_class = DynamicObject::getModelClass($this->model);
        if (class_exists($model_class)) {
            $object = new $model_class($id_object);
            $values = DynamicObject::getValues($object, true);
            $values['id_' . $this->model] = $id_object;
        }
        return $values;
    }

    public function display()
    {
        $helper = $this->getFormHelper();
        $helper->fields_value = $this->getFormValues();
        $helper->fields_value['method'] = 'save';
        /** @noinspection PhpVoidFunctionResultUsedInspection */
        return $helper->generateForm(array($this->getFormFields()));
    }
}
