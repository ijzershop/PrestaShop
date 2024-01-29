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

namespace classes\helpers;

use classes\models\DynamicEquation;
use classes\models\DynamicInputField;
use Context;
use DynamicProduct;

class FieldsVisibilityHelper
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

    public function getFieldsVisibility($id_product, $id_attribute, $input_fields)
    {
        $conditions_visibility = DynamicEquation::getHiddenItems($id_product, $input_fields);
        $hidden_fields_by_attribute = $this->module->provider->getVisibilityValues($id_product, $id_attribute);
        $hidden_fields = array_merge($conditions_visibility['fields'], array_keys($hidden_fields_by_attribute));
        $conditions_visibility['fields'] = $hidden_fields;
        return $conditions_visibility;
    }

    public function getMetConditions($id_product, $input_fields)
    {
        return DynamicEquation::getMetConditions($id_product, $input_fields);
    }

    /**
     * @param DynamicInputField[] $input_fields
     * @param $fields_visibility
     */
    public function setExcludedFields(&$input_fields, $fields_visibility)
    {
        foreach ($input_fields as &$input_field) {
            if ($this->isHidden($fields_visibility, $input_field->id_field)
                || $this->belongsToHiddenGroup($fields_visibility, $input_field->getDynamicField()->id_group)) {
                $input_field->setExcluded();
            }
            if ($this->hasHiddenOptions($fields_visibility, $input_field->id_field)) {
                $input_field->setExcludedOptions($fields_visibility[$input_field->id_field]);
                if ($input_field->type === _DP_DROPDOWN_ && $input_field->isSelectedOptionExcluded()) {
                    $input_field->selectFirstVisibleOption();
                }
                if ($input_field->type === _DP_RADIO_ && $input_field->isSelectedOptionExcluded()) {
                    $input_field->selectFirstVisibleOption();
                }
            }
        }
    }

    private function isHidden($visibility, $id_field)
    {
        return isset($visibility[$id_field]) && (int) $visibility[$id_field] === 0;
    }

    private function hasHiddenOptions($visibility, $id_field)
    {
        return isset($visibility[$id_field]) && is_array($visibility[$id_field]);
    }

    private function belongsToHiddenGroup($visibility, $id_group)
    {
        return isset($visibility['groups'])
            && isset($visibility['groups'][$id_group])
            && (int) $visibility['groups'][$id_group] === 0;
    }
}
