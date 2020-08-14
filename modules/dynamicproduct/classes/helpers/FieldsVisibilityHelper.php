<?php
/**
 * 2010-2019 Tuni-Soft
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
 * @copyright 2010-2019 Tuni-Soft
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
        $conditions_visibility = DynamicEquation::getConditionsVisibility($id_product, $input_fields);
        $attribute_visibility = $this->module->provider->getVisibilityValues($id_product, $id_attribute);
        return $this->mergeVisibility($attribute_visibility, $conditions_visibility);
    }

    private function mergeVisibility($attribute_visibility, array $conditions_visibility)
    {
        $visibility = $attribute_visibility + $conditions_visibility;
        $ids = array_keys($visibility);
        foreach ($ids as $id_field) {
            if ($this->isHidden($attribute_visibility, $id_field) ||
                $this->isHidden($conditions_visibility, $id_field)) {
                $visibility[$id_field] = 0;
            } else {
                unset($visibility[$id_field]);
            }
        }
        return $visibility;
    }

    public function getMetConditions($id_product, $input_fields)
    {
        return array(
            'met_conditions' => DynamicEquation::getMetConditions($id_product, $input_fields)
        );
    }

    /**
     * @param DynamicInputField[] $input_fields
     * @param $fields_visibility
     */
    public function setExcludedFields(&$input_fields, $fields_visibility)
    {
        foreach ($input_fields as $input_field) {
            if ($this->isHidden($fields_visibility, $input_field->id_field)) {
                $input_field->setExcluded();
            }
        }
    }

    private function isHidden($visibility, $id_field)
    {
        return isset($visibility[$id_field]) && (int)$visibility[$id_field] === 0;
    }
}
