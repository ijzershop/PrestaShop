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

namespace classes\module;

use classes\DynamicTools;
use classes\models\DynamicField;
use classes\models\DynamicFieldGroup;
use classes\models\DynamicStep;
use classes\models\DynamicUnit;
use Context;
use DynamicProduct;
use Tools;

class DynamicProcessor
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function getCurrentAction()
    {
        $request = array_merge($_GET, $_POST);
        $keys = array_keys($request);
        foreach ($keys as $key) {
            if (strpos($key, 'submit_') === 0) {
                // return current action
                return str_replace('submit_', '', $key);
            }
        }
        return false;
    }

    public function processAddUnit()
    {
        $unit = new DynamicUnit();
        $unit->saveFromPost();
    }

    public function processEditUnit()
    {
        $id_unit = (int) Tools::getValue('id_unit');
        if (DynamicTools::checkRestricted($id_unit, $this->module->restricted_units)) {
            $this->module->html_content .= $this->module->displayError('You do not have permission to edit this.');
            return;
        }
        $unit = new DynamicUnit($id_unit);
        $unit->saveFromPost();
        DynamicTools::redirect();
    }

    public function processDeleteUnit()
    {
        $id_unit = (int) Tools::getValue('id_unit');
        if (DynamicTools::checkRestricted($id_unit, $this->module->restricted_units)) {
            $this->module->html_content .= $this->module->displayError('You do not have permission to edit this.');
        } else {
            $unit = new DynamicUnit($id_unit);
            $unit->delete();
        }
    }

    public function processAddFieldGroup()
    {
        $field_group = new DynamicFieldGroup();
        $field_group->saveFromPost();
    }

    public function processEditFieldGroup()
    {
        $id_field_group = (int) Tools::getValue('id_field_group');
        $field_group = new DynamicFieldGroup($id_field_group);
        $field_group->saveFromPost();
        DynamicTools::redirect();
    }

    public function processEditStep()
    {
        $id_step = (int) Tools::getValue('id_step');
        $step = new DynamicStep($id_step);
        $step->saveFromPost();
        DynamicTools::redirect();
    }

    public function processDeleteFieldGroup()
    {
        $id_field_group = (int) Tools::getValue('id_field_group');
        $field_group = new DynamicFieldGroup($id_field_group);
        $field_group->delete();
    }

    public function processDeleteStep()
    {
        $id_step = (int) Tools::getValue('id_step');
        $step = new DynamicStep($id_step);
        $step->delete();
    }

    public function processRemoveFavoriteField()
    {
        $id_favorite_field = (int) Tools::getValue('id_favorite_field');
        $favorite_field = new DynamicField($id_favorite_field);
        $favorite_field->favorite = false;
        $favorite_field->save();
    }

    public function processRemoveCommonField()
    {
        $id_common_field = (int) Tools::getValue('id_common_field');
        $common_field = new DynamicField($id_common_field);
        $common_field->common = false;
        $common_field->save();
    }
}
