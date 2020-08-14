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

/** @noinspection PhpUnusedParameterInspection */

namespace classes\models;

use classes\DynamicTools;
use classes\parser\MathParser;
use Db;
use DbQuery;
use DynamicProduct;
use Exception;
use Product;
use StockAvailable;
use Tools;
use Validate;

class DynamicEquation extends DynamicObject
{

    const _DP_PRICE_EQ_ = 0;
    const _DP_WEIGHT_EQ_ = 1;
    const _DP_QUANTITY_EQ_ = 2;

    public $id_product;
    public $id_formula;
    public $formula;

    public static $definition = array(
        'table'   => 'dynamicproduct_equation',
        'primary' => 'id_equation',
        'fields'  => array(
            'id_product' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_formula' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'formula'    => array('type' => self::TYPE_STRING)
        )
    );

    /**
     * @param $id_product
     * @return DynamicEquation[]
     */
    public static function getEquationsByIdProduct($id_product)
    {
        $dynamic_equations = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int)$id_product);
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_equation = $row['id_equation'];
            $id_formula = $row['id_formula'];
            $dynamic_equation = new self($id_equation);
            if (Validate::isLoadedObject($dynamic_equation)) {
                $dynamic_equations[$id_formula] = $dynamic_equation;
            }
        }
        return $dynamic_equations;
    }

    /**
     * @param $id_product
     * @param $id_formula
     * @return DynamicEquation
     */
    public static function getEquationByIdFormula($id_product, $id_formula)
    {
        $sql = new DbQuery();
        $sql->select('id_equation');
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int)$id_product);
        $sql->where('id_formula = ' . (int)$id_formula);
        $id_equation = Db::getInstance()->getValue($sql, false);
        return new self($id_equation);
    }

    /**
     * @param $id_product
     * @return DynamicEquation
     */
    public static function getPriceEquation($id_product)
    {
        return self::getEquationByIdFormula($id_product, self::_DP_PRICE_EQ_);
    }

    /**
     * @param $id_product
     * @return DynamicEquation
     */
    public static function getWeightEquation($id_product)
    {
        return self::getEquationByIdFormula($id_product, self::_DP_WEIGHT_EQ_);
    }

    /**
     * @param $id_product
     * @return DynamicEquation
     */
    public static function getQuantityEquation($id_product)
    {
        return self::getEquationByIdFormula($id_product, self::_DP_QUANTITY_EQ_);
    }

    /**
     * @param $id_product
     * @param int $id_attribute
     * @param $formula
     * @param DynamicInputField[] $input_fields
     * @return float
     */
    public static function evaluateFormula($id_product, $id_attribute, $formula, $input_fields)
    {
        $literal_expression = self::getFormulaLiteral($id_product, $id_attribute, $formula, $input_fields);

        if (!trim($literal_expression)) {
            $result = 0;
        } else {
            $parser = new MathParser();
            $parser->setExpression($literal_expression);
            $result = $parser->getValue();
        }
        return $result;
    }

    public static function checkFormula($id_product, $formula)
    {
        if (!Tools::strlen($formula)) {
            return true;
        }
        $matches = array();
        preg_match_all('/\\[.*?\\]/', $formula, $matches);
        $formula = str_replace(array('[', ']'), array('(', ')'), $formula);
        $parser = new MathParser();
        if (is_array($matches) && isset($matches[0])) {
            $matches = $matches[0];
            if (is_array($matches)) {
                foreach ($matches as $field_name) {
                    $field_name = str_replace(array('[', ']'), '', $field_name);
                    try {
                        $field = new DynamicField();
                        if ((int)$id_product) {
                            $field = DynamicField::getFieldByName($id_product, $field_name);
                        }
                        if (in_array((int)$field->type, array(_DP_TEXT_, _DP_DATE_, _DP_TEXTAREA_), true)) {
                            $formula = str_replace('(' . $field_name . ')', $field_name, $formula);
                        } else {
                            $parser->setVariable($field_name, 1);
                        }
                    } catch (Exception $e) {
                        return $e->getMessage();
                    }
                }
            }
        }

        $parser->setExpression($formula);

        try {
            $parser->getValue();
        } catch (Exception $e) {
            $message = $e->getMessage();
            if (is_array($matches)) {
                foreach ($matches as $match) {
                    $string = $match;
                    $match = Tools::strtoupper($match);
                    $match = str_replace(array('[', ']'), array('(', ')'), $match);
                    $message = str_replace($match, $string, $message);
                }
            }
            return $message;
        }
        return true;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $formula
     * @param DynamicInputField[] $input_fields
     * @return string
     */
    public static function getFormulaLiteral($id_product, $id_attribute, $formula, $input_fields)
    {
        foreach ($input_fields as $input_field) {
            $value = $input_field->value;
            if ($input_field->isExcluded()) {
                $value = $input_field->getNullValue();
            }
            $formula = str_replace('[' . $input_field->name . ']', $value, $formula);
        }

        return self::replaceExtraVariables($id_product, $id_attribute, $formula);
    }

    /**
     * @param DynamicInputField[] $input_fields
     */
    private static function getInputFieldsAsVariables($input_fields)
    {
        $variables = array();
        foreach ($input_fields as $input_field) {
            //check if $name can be used as a PHP variable name
            if (preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $input_field->name)) {
                $variables[$input_field->name] = $input_field->getValueForCalculation();
            }
        }
        return $variables;
    }

    /**
     * @param DynamicEquation $equation
     * @param $values
     * @param $id_product
     * @param $id_attribute
     * @param int $quantity
     * @return float
     */
    public static function calculatePriceFormula(
        $id_product,
        $id_attribute,
        $equation,
        $input_fields
    ) {
        $result = 0;

        if (Validate::isLoadedObject($equation)) {
            $result = self::evaluateFormula($id_product, $id_attribute, $equation->formula, $input_fields);
        }

        //try to use the calculator
        $result = self::hookPriceCalculator($id_product, $id_attribute, $input_fields, $result);

        if ($result !== false) {
            return $result;
        }
        return 0;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     * @param float $result
     * @return float
     */
    public static function hookPriceCalculator($id_product, $id_attribute, $input_fields, $result = false)
    {
        $module = DynamicTools::getModule();
        $calculator_global = $module->provider->getDataFile('calculator/products.php');
        $calculator = $module->provider->getDataFile('calculator/product' . (int)$id_product . '.php');

        if (!file_exists($calculator) && !file_exists($calculator_global)) {
            return $result;
        }

        extract(self::getInputFieldsAsVariables($input_fields), EXTR_OVERWRITE);

        if (file_exists($calculator_global)) {
            include $calculator_global;
        }
        if (file_exists($calculator)) {
            include $calculator;
        }
        return (float)$result;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $equation
     * @param DynamicInputField[] $input_fields
     * @return float
     */
    public static function calculateWeightFormula($id_product, $id_attribute, $equation, $input_fields)
    {
        $weight = 0;

        if (Validate::isLoadedObject($equation)) {
            $weight = self::evaluateFormula($id_product, $id_attribute, $equation->formula, $input_fields);
        }

        //try to use the calculator
        $weight = self::hookWeightCalculator($id_product, $id_attribute, $input_fields, $weight);

        if ($weight !== false) {
            return $weight;
        }
        return 0;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     * @param float $weight
     * @return float
     */
    public static function hookWeightCalculator($id_product, $id_attribute, $input_fields, $weight = false)
    {
        $module = DynamicTools::getModule();
        $calculator_global = $module->provider->getDataFile('calculator/weights.php');
        $calculator = $module->provider->getDataFile('calculator/weight' . (int)$id_product . '.php');

        if (!file_exists($calculator) && !file_exists($calculator_global)) {
            return $weight;
        }

        extract(self::getInputFieldsAsVariables($input_fields), EXTR_OVERWRITE);

        if (file_exists($calculator_global)) {
            include $calculator_global;
        }
        if (file_exists($calculator)) {
            include $calculator;
        }
        return (float)$weight;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param $equation
     * @param DynamicInputField[] $input_fields
     * @return int
     */
    public static function calculateQuantityFormula($id_product, $id_attribute, $equation, $input_fields)
    {
        $qty = 0;

        if (Validate::isLoadedObject($equation)) {
            $qty = self::evaluateFormula($id_product, $id_attribute, $equation->formula, $input_fields);
        }

        //try to use the calculator
        $qty = self::hookQuantityCalculator($id_product, $id_attribute, $input_fields, $qty);

        if ($qty !== false) {
            return (float)$qty;
        }
        return 0;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     * @param int $qty
     * @return int
     */
    public static function hookQuantityCalculator($id_product, $id_attribute, $input_fields, $qty = false)
    {
        $module = DynamicTools::getModule();
        $calculator_global = $module->provider->getDataFile('calculator/quantity.php');
        $calculator = $module->provider->getDataFile('calculator/quantity' . (int)$id_product . '.php');

        if (!file_exists($calculator) && !file_exists($calculator_global)) {
            return $qty;
        }

        extract(self::getInputFieldsAsVariables($input_fields), EXTR_OVERWRITE);

        if (file_exists($calculator_global)) {
            include $calculator_global;
        }
        if (file_exists($calculator)) {
            include $calculator;
        }
        return (float)$qty;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     */
    public static function hookAllocator($id_product, $id_attribute, &$input_fields, $field)
    {
        $module = DynamicTools::getModule();
        $allocator_global = $module->provider->getDataFile('allocations/products.php');
        $allocator = $module->provider->getDataFile('allocations/product' . (int)$id_product . '.php');

        if (!file_exists($allocator) && !file_exists($allocator_global)) {
            return;
        }

        extract(self::getInputFieldsAsVariables($input_fields), EXTR_OVERWRITE);

        ${'product_price'} = Product::getPriceStatic($id_product, false, $id_attribute, 6, null, false, false);

        if (file_exists($allocator_global)) {
            include $allocator_global;
        }
        if (file_exists($allocator)) {
            include $allocator;
        }

        foreach ($input_fields as $input_field) {
            //check if $name can be used as a PHP variable name
            if (preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $input_field->name)) {
                /** @noinspection NestedPositiveIfStatementsInspection */
                if (${$input_field->name} !== $input_field->value) {
                    $input_field->setValue(${$input_field->name});
                }
            }
        }
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     */
    public static function execFieldFormulas($id_product, $id_attribute, &$input_fields)
    {
        $field_formulas = FieldFormula::getByProduct($id_product);
        foreach ($field_formulas as $field_formula) {
            $target_field = $field_formula->getTargetField();
            $target_formula = $field_formula->getTargetFormula();
            if ($target_field && $target_formula && isset($input_fields[$target_field])) {
                $result = self::evaluateFormula($id_product, $id_attribute, $target_formula, $input_fields);
                $input_fields[$target_field]->setValue($result);
            }
        }
    }

    private static function replaceExtraVariables($id_product, $id_attribute, $result)
    {
        /** @var DynamicProduct $module */
        $module = DynamicTools::getModule();

        $product_price = Product::getPriceStatic($id_product, false, $id_attribute, 6, null, false, false);
        $result = str_replace('[product_price]', $product_price, $result);

        $product_weight = $module->provider->getProductWeight($id_product, $id_attribute);
        $result = str_replace('[product_weight]', $product_weight, $result);

        return $result;
    }

    public static function getUserJsDefinitions($id_product)
    {
        $module = DynamicTools::getModule();
        $declaration_global = $module->provider->getDataFile('declarations/products.php');
        $declaration = $module->provider->getDataFile('declarations/product' . (int)$id_product . '.php');

        // declarations arrays
        $declarations = array();
        $global_declarations = array();
        $product_declarations = array();

        if (!file_exists($declaration) && !file_exists($declaration_global)) {
            return $declarations;
        }

        if (file_exists($declaration_global)) {
            include $declaration_global;
        }

        if (is_array($declarations)) {
            $global_declarations = array_merge(array(), $declarations);
        }

        if (file_exists($declaration)) {
            include $declaration;
        }

        if (is_array($declarations)) {
            $product_declarations = array_merge(array(), $declarations);
        }

        return array_merge($global_declarations, $product_declarations);
    }

    /**
     * @param DynamicInput $dynamic_input
     */
    public static function getDynamicQuantity($dynamic_input, $input_fields = null)
    {
        $equation = self::getQuantityEquation($dynamic_input->id_product);
        $dynamic_quantity = self::calculateQuantityFormula(
            $dynamic_input->id_product,
            $dynamic_input->id_attribute,
            $equation,
            $input_fields ?: $dynamic_input->input_fields
        );
        return $dynamic_quantity;
    }

    /**
     * @param DynamicInput $dynamic_input
     * @param int $dynamic_quantity
     * @return bool
     */
    public static function checkProductStock($dynamic_input, $dynamic_quantity = 0)
    {
        if (!$dynamic_quantity) {
            $dynamic_quantity = self::getDynamicQuantity($dynamic_input) * $dynamic_input->cart_quantity;
            if (!$dynamic_quantity) {
                return true;
            }
        }
        $available_quantity = StockAvailable::getQuantityAvailableByProduct(
            $dynamic_input->id_product,
            $dynamic_input->id_attribute
        );
        return $available_quantity >= $dynamic_quantity;
    }

    public static function getConditionsVisibility($id_product, $input_fields)
    {
        $visibility_values = array();
        $dynamic_conditions = DynamicCondition::getByProduct($id_product);
        foreach ($dynamic_conditions as $dynamic_condition) {
            $condition_visibility = $dynamic_condition->getVisibilityValues();
            if (count($condition_visibility)) {
                $formula = $dynamic_condition->formula;
                $condition_result = self::evaluateFormula($id_product, 0, $formula, $input_fields);
                if ($condition_result) {
                    $visibility_values += $condition_visibility;
                }
            }
        }
        return $visibility_values;
    }

    public static function getMetConditions($id_product, $input_fields)
    {
        $met_conditions = array();
        $dynamic_conditions = DynamicCondition::getByProduct($id_product);
        foreach ($dynamic_conditions as $dynamic_condition) {
            $formula = $dynamic_condition->formula;
            $condition_result = self::evaluateFormula($id_product, 0, $formula, $input_fields);
            if ($condition_result) {
                $met_conditions[] = $dynamic_condition->name;
            }
        }
        return $met_conditions;
    }
}
