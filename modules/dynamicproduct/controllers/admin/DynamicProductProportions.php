<?php
/**
 * 2010-2022 Tuni-Soft
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
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

/** @noinspection PhpUnusedPrivateMethodInspection */

use classes\DynamicTools;
use classes\models\DynamicProportion;

class DynamicProductProportionsController extends ModuleAdminController
{

    /** @var DynamicProduct */
    public $module;
    public $action;

    /** @var Context $context */
    public $context;
    public $id_product;
    public $id_default_lang;

    public function __construct()
    {
        parent::__construct();
        $this->context = Context::getContext();
        $this->action = Tools::getValue('action');
        $this->id_product = (int) Tools::getValue('id_product');
        $this->id_default_lang = (int) Configuration::get('PS_LANG_DEFAULT');
    }

    public function postProcess()
    {
        $restricted = DynamicTools::getRestricted('_DP_RESTRICTED_');
        if ((int) $this->context->employee->id_profile !== 1 && in_array($this->id_product, $restricted, false)) {
            exit(Tools::jsonEncode(array(
                'error'   => true,
                'message' => $this->module->l('This product is for viewing only!')
            )));
        }

        $method = 'process' . Tools::toCamelCase($this->action, true);
        if (method_exists($this, $method)) {
            return $this->{$method}();
        }

        exit();
    }

    private function processAddProportion()
    {
        $dynamic_proportion = new DynamicProportion();
        $dynamic_proportion->id_product = $this->id_product;
        $dynamic_proportion->value = 1;
        $dynamic_proportion->save();
        $this->respond(array(
            'proportion' => $dynamic_proportion,
        ));
    }

    private function processSaveProportion()
    {
        $proportion = Tools::getValue('proportion');
        $dynamic_proportion = new DynamicProportion((int) $proportion['id']);
        $dynamic_proportion->id_field = (int) $proportion['id_field'];
        $dynamic_proportion->id_field_src = (int) $proportion['id_field_src'];
        $dynamic_proportion->value = (float) $proportion['value'];
        $dynamic_proportion->save();
        $this->respond();
    }

    private function processDeleteProportion()
    {
        $id_proportion = (int) Tools::getValue('id_proportion');
        $dynamic_proportion = new DynamicProportion($id_proportion);
        $dynamic_proportion->delete();
        $this->respond();
    }

    public function respond($data = array(), $success = 1)
    {
        $success = $success && (int) !array_key_exists('error', $data);
        $arr = array(
            'success' => $success,
        );
        $arr = array_merge($arr, $data);
        exit(Tools::jsonEncode($arr));
    }
}
