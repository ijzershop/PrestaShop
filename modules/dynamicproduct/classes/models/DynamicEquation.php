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

/** @noinspection PhpUnusedParameterInspection */

namespace classes\models;

use classes\DynamicTools;
use classes\helpers\FieldsVisibilityHelper;
use classes\helpers\MathParserHelper;
use classes\helpers\ProductHelper;
use classes\models\grids\Grid;
use classes\models\grids\GridValue;
use classes\models\intervals\Interval;
use classes\models\intervals\IntervalCondition;
use classes\models\intervals\IntervalConditionGroup;
use classes\models\intervals\IntervalField;
use classes\models\intervals\IntervalFormula;
use Db;
use DbQuery;
use DynamicProduct;
use Exception;
use RuntimeException;
use StockAvailable;
use Tools;
use Validate;

class DynamicEquation extends DynamicObject
{

    const _DP_PRICE_EQ_ = 0;
    const _DP_WEIGHT_EQ_ = 1;
    const _DP_QUANTITY_EQ_ = 2;
    const _DP_COST_EQ_ = 3;

    public $id_product;
    public $id_formula;
    public $formula;

    public static $extraFields = array('product_price', 'product_weight', 'quantity');

    public static $definition = array(
        'table'   => 'dynamicproduct_equation',
        'primary' => 'id_equation',
        'fields'  => array(
            'id_product' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'id_formula' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'formula'    => array('type' => self::TYPE_HTML)
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
        $sql->where('id_product = ' . (int) $id_product);
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
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $sql = new DbQuery();
        $sql->select('id_equation');
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int) $id_source_product);
        $sql->where('id_formula = ' . (int) $id_formula);
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
     * @return DynamicEquation
     */
    public static function getCostEquation($id_product)
    {
        return self::getEquationByIdFormula($id_product, self::_DP_COST_EQ_);
    }

    /**
     * @param $formula
     * @param DynamicInputField[] $input_fields
     * @return float
     */
    public static function evaluateFormula($formula, $input_fields, $name = null)
    {
        $literal_expression = self::getFormulaLiteral($formula, $input_fields);
        if (!trim($literal_expression)) {
            $result = 0;
        } else {
            $parser = MathParserHelper::getMathParser();
            $parser->setExpression($literal_expression);
            $result = $parser->getValue();
            if ($name) {
                DynamicProduct::$debug_messages['formulas'][$name] = array(
                    'name'    => $name,
                    'formula' => $formula,
                    'literal' => $literal_expression,
                    'result'  => $result,
                );
            }
        }
        return $result;
    }

    public static function matchFields($formula)
    {
        preg_match_all('/\[+(.*?)\]+/', $formula, $matches);
        return $matches;
    }

    public static function shouldReplaceWithValue($formula_field)
    {
        return !preg_match('/\[\[/', $formula_field) && !preg_match('/\]\]/', $formula_field);
    }

    public static function checkFormula($id_product, $formula, $fields)
    {
        $source = DynamicTools::getSource();
        $module = DynamicTools::getModule();

        if (!Tools::strlen($formula)) {
            return true;
        }

        $matches = self::matchFields($formula);
        $formula = str_replace(array('[', ']'), array('(', ')'), $formula);
        $parser = MathParserHelper::getMathParser();
        if (is_array($matches) && isset($matches[0])) {
            $matches = $matches[0];
            if (is_array($matches)) {
                foreach ($matches as $formula_field) {
                    $field_name = str_replace(array('[', ']'), '', $formula_field);
                    try {
                        if (!in_array($field_name, $fields, true) && !in_array($field_name, self::$extraFields, true)) {
                            throw new RuntimeException(
                                $module->l('Validation', $source) . ': ' .
                                sprintf($module->l('Field %s not found', $source), $formula_field)
                            );
                        }
                        $field = new DynamicField();
                        if ((int) $id_product) {
                            $field = DynamicField::getFieldByName($id_product, $field_name);
                        }
                        if (in_array((int) $field->type, array(_DP_TEXT_, _DP_DATE_, _DP_TEXTAREA_), true)) {
                            $formula = str_replace('(' . $field_name . ')', $field_name, $formula);
                            $parser->setVariable($field_name, "A");
                        } else {
                            $parser->setVariable($field_name, 1);
                        }
                    } catch (Exception $e) {
                        return DynamicTools::reportException($e, true);
                    }
                }
            }
        }

        $parser->setExpression($formula);

        try {
            $parser->getValue();
        } catch (Exception $e) {
            $message = DynamicTools::reportException($e, true);
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
     * @param $formula
     * @param DynamicInputField[] $input_fields
     * @return string
     */
    public static function getFormulaLiteral($formula, $input_fields)
    {
        if (empty($formula)) {
            return $formula;
        }
        $matches = self::matchFields($formula);
        if (!count($matches)) {
            return $formula;
        }

        $source = DynamicTools::getSource();
        $module = DynamicTools::getModule();

        list($formula_fields, $field_names) = $matches;
        foreach ($formula_fields as $index => $formula_field) {
            $field_name = trim($field_names[$index]);
            if (!isset($input_fields[$field_name]) && !in_array($field_name, self::$extraFields, true)) {
                throw new RuntimeException(
                    sprintf($module->l('Field %s not found', $source), $formula_field)
                );
            }
            if (isset($input_fields[$field_name])) {
                $input_field = $input_fields[$field_name];
                if (self::shouldReplaceWithValue($formula_field)) {
                    $value = $input_field->getValueForCalculation();
                    $secondary_value = $input_field->getSecondaryValueForCalculation();
                    $formula = str_replace("[$formula_field]", $secondary_value, $formula);
                    $formula = str_replace($formula_field, $value, $formula);
                } else {
                    $secondary_value = $input_field->getSecondaryValueForCalculation();
                    $formula = str_replace($formula_field, $secondary_value, $formula);
                }
            }
        }

        return $formula;
    }

    public static function containsQuantityField($formula)
    {
        return strpos($formula, '[quantity]') !== false;
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
                $variables['_' . $input_field->name] = $input_field->getSecondaryValueForCalculation();
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
            $result = self::evaluateFormula($equation->formula, $input_fields);
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
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $calculator = $module->provider->getDataFile('calculator/product' . (int) $id_source_product . '.php');

        if (!file_exists($calculator) && !file_exists($calculator_global)) {
            return $result;
        }

        $variables = self::getInputFieldsAsVariables($input_fields);
        extract($variables, EXTR_OVERWRITE);

        if (file_exists($calculator_global)) {
            include $calculator_global;
        }
        if (file_exists($calculator)) {
            include $calculator;
        }

        foreach ($input_fields as $input_field) {
            //check if $name can be used as a PHP variable name
            if (preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $input_field->name)) {
                if (!$input_field->isExcluded()) {
                    if (isset(${$input_field->name}) && ${$input_field->name} !== $input_field->value) {
                        $input_field->setValue(${$input_field->name});
                    }
                    if (isset(${'_' . $input_field->name}) &&
                        ${'_' . $input_field->name} !== $input_field->secondary_value) {
                        $input_field->setSecondaryValue(${'_' . $input_field->name});
                    }
                }
            }
        }

        return (float) $result;
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
            $weight = self::evaluateFormula($equation->formula, $input_fields);
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
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $calculator_global = $module->provider->getDataFile('calculator/weights.php');
        $calculator = $module->provider->getDataFile('calculator/weight' . (int) $id_source_product . '.php');

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

        foreach ($input_fields as $input_field) {
            //check if $name can be used as a PHP variable name
            if (preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $input_field->name)) {
                if (${$input_field->name} !== $input_field->value) {
                    $input_field->setValue(${$input_field->name});
                }
                if (${'_' . $input_field->name} !== $input_field->secondary_value) {
                    $input_field->setSecondaryValue(${'_' . $input_field->name});
                }
            }
        }

        return (float) $weight;
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
            $qty = self::evaluateFormula($equation->formula, $input_fields);
        }

        //try to use the calculator
        $qty = self::hookQuantityCalculator($id_product, $id_attribute, $input_fields, $qty);

        if ($qty !== false) {
            /** @noinspection UnnecessaryCastingInspection */
            return (int) $qty;
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
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $calculator = $module->provider->getDataFile('calculator/quantity' . (int) $id_source_product . '.php');

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

        foreach ($input_fields as $input_field) {
            //check if $name can be used as a PHP variable name
            if (preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $input_field->name)) {
                if (${$input_field->name} !== $input_field->value) {
                    $input_field->setValue(${$input_field->name});
                }
                if (${'_' . $input_field->name} !== $input_field->secondary_value) {
                    $input_field->setSecondaryValue(${'_' . $input_field->name});
                }
            }
        }

        return (float) $qty;
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param DynamicInputField[] $input_fields
     */
    public static function hookAllocator($id_product, $id_attribute, &$input_fields)
    {
        $module = DynamicTools::getModule();
        $allocator_global = $module->provider->getDataFile('allocations/products.php');
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $allocator = $module->provider->getDataFile('allocations/product' . (int) $id_source_product . '.php');

        if (!file_exists($allocator) && !file_exists($allocator_global)) {
            return;
        }

        extract(self::getInputFieldsAsVariables($input_fields), EXTR_OVERWRITE);

        ${'product_price'} = $module->provider->getProductPrice($id_product, $id_attribute);

        if (file_exists($allocator_global)) {
            include $allocator_global;
        }
        if (file_exists($allocator)) {
            include $allocator;
        }

        foreach ($input_fields as $input_field) {
            //check if $name can be used as a PHP variable name
            if (preg_match('/^[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*$/', $input_field->name)) {
                if (${$input_field->name} !== $input_field->value) {
                    $input_field->setValue(${$input_field->name});
                }
                if (${'_' . $input_field->name} !== $input_field->secondary_value) {
                    $input_field->setSecondaryValue(${'_' . $input_field->name});
                }
            }
        }
    }

    /**
     * @param $id_product
     * @param DynamicInputField[] $input_fields
     */
    public static function execFieldFormulas($id_product, &$input_fields)
    {
        $source = DynamicTools::getSource();
        $module = DynamicTools::getModule();
        $field_formulas = FieldFormula::getByProduct($id_product);
        foreach ($field_formulas as $field_formula) {
            if (empty($field_formula->formula)) {
                continue;
            }
            $target_field = $field_formula->getTargetField();
            $target_formula = $field_formula->getTargetFormula();
            if ($target_field && !isset($input_fields[$target_field])) {
                throw new RuntimeException(
                    $module->l('Field Formula', $source) . ': ' .
                    sprintf($module->l('Field [%s] not found', $source), $target_field)
                );
            }
            if ($target_field && $target_formula && isset($input_fields[$target_field])) {
                try {
                    $name = 'Field formula[' . $target_field . ']';
                    $result = self::evaluateFormula(
                        $target_formula,
                        $input_fields,
                        $name
                    );
                    if (isset(DynamicProduct::$debug_messages['formulas'][$name])) {
                        DynamicProduct::$debug_messages['formulas'][$name]['formula'] =
                            $field_formula->formula;
                    }
                } catch (Exception $e) {
                    throw new RuntimeException($module->l('Field Formula', $source) . ': ' .
                        DynamicTools::reportException($e, true));
                }
                $input_fields[$target_field]->unlockValue();
                $input_fields[$target_field]->setValue($result);
                $input_fields[$target_field]->lockValue();
            }
        }
    }

    /**
     * @param $id_product
     * @param DynamicInputField[] $input_fields
     */
    public static function execIntervalConditions($id_product, &$input_fields)
    {
        $source = DynamicTools::getSource();
        $module = DynamicTools::getModule();
        $intervals = Interval::getByIdProduct($id_product);
        foreach ($intervals as $interval) {
            $executed_group = false;
            $id_interval = $interval->id;
            $condition_groups = IntervalConditionGroup::getByInterval($id_interval);
            foreach ($condition_groups as $condition_group) {
                // if a group has already been executed, do not carry on iterating the rest of the groups
                if (!$executed_group) {
                    $conditions_true = true;
                    $id_condition_group = $condition_group->id;
                    $interval_conditions = IntervalCondition::getByIntervalConditionGroup($id_condition_group);
                    foreach ($interval_conditions as $interval_condition) {
                        // if a group condition is false, do not complete the rest of the iterations
                        if ($conditions_true) {
                            /** @noinspection NestedPositiveIfStatementsInspection */
                            if ((int) $interval_condition->id_field) {
                                $condition_field = new DynamicField($interval_condition->id_field);
                                /** @var DynamicInputField $input_field */
                                $input_field = $input_fields[$condition_field->name] ?: null;
                                if ($input_field) {
                                    if ($interval_condition->type === 'range') {
                                        $conditions_true &= $input_field->isWithinLimit($interval_condition);
                                    }
                                    if ($interval_condition->type === 'values') {
                                        $conditions_true &= $input_field->isWithinValues($interval_condition);
                                    }
                                }
                            }
                        }
                    }
                    if ($conditions_true) {
                        $executed_group = true;
                        $interval_fields = IntervalField::getByInterval($id_interval);
                        foreach ($interval_fields as $interval_field) {
                            if ((int) $interval_field->id_field) {
                                $target_field = new DynamicField($interval_field->id_field);
                                $target_field_name = $target_field->name;
                                if (isset($input_fields[$target_field_name]) &&
                                    Validate::isLoadedObject($target_field)) {
                                    $id_interval_field = $interval_field->id;
                                    $interval_formula = IntervalFormula::getIntervalFormula(
                                        $id_condition_group,
                                        $id_interval_field
                                    );
                                    try {
                                        $result = self::evaluateFormula($interval_formula->formula, $input_fields);
                                    } catch (Exception $e) {
                                        throw new RuntimeException(
                                            $module->l('Interval Formula', $source) . ': ' .
                                            DynamicTools::reportException($e, true)
                                        );
                                    }
                                    $input_fields[$target_field_name]->unlockValue();
                                    $input_fields[$target_field_name]->setValue($result);
                                    $input_fields[$target_field_name]->lockValue();
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * @param $id_product
     * @param DynamicInputField[] $input_fields
     */
    public static function execGrids($id_product, &$input_fields)
    {
        $grids = Grid::getByIdProduct($id_product);
        foreach ($grids as $grid) {
            $target_field = new DynamicField((int) $grid->id_field_target);
            $target_field_name = $target_field->name;
            if (isset($input_fields[$target_field_name])) {
                $column_field = new DynamicField((int) $grid->id_field_column);
                $row_field = new DynamicField((int) $grid->id_field_row);
                if (isset($input_fields[$column_field->name], $input_fields[$row_field->name])) {
                    $column_value = (float) $input_fields[$column_field->name]->getValueForCalculation();
                    $row_value = (float) $input_fields[$row_field->name]->getValueForCalculation();
                    $id_column = Grid::findValue($grid->columns, $column_value);
                    $id_row = Grid::findValue($grid->rows, $row_value);
                    $grid_value = GridValue::getByProperties($grid->id, $id_column, $id_row);
                    if (Validate::isLoadedObject($grid_value)) {
                        $input_fields[$target_field_name]->unlockValue();
                        $input_fields[$target_field_name]->setValue($grid_value->value);
                        $input_fields[$target_field_name]->lockValue();
                    }
                }
            }
        }
    }

    /**
     * @param $id_product
     * @param $id_attribute
     * @param ExecOrder[] $exec_order
     * @param $input_fields
     * @return array[]
     */
    public static function processExecOrder($id_product, $id_attribute, $exec_order, &$input_fields)
    {
        $module = DynamicTools::getModule();
        $context = DynamicTools::getContext();

        $fields_visibility = array();

        foreach ($exec_order as $item) {
            switch ($item->id_exec) {
                case ExecOrder::EXEC_INTERVAL:
                    self::execIntervalConditions($id_product, $input_fields);
                    break;
                case ExecOrder::EXEC_FIELD_FORMULAS:
                    self::execFieldFormulas($id_product, $input_fields);
                    break;
                case ExecOrder::EXEC_GRIDS:
                    self::execGrids($id_product, $input_fields);
                    break;
                case ExecOrder::EXEC_CONDITIONS:
                    $visibility_helper = new FieldsVisibilityHelper($module, $context);
                    $fields_visibility = $visibility_helper->getFieldsVisibility(
                        $id_product,
                        $id_attribute,
                        $input_fields
                    );
                    $visibility_helper->setExcludedFields($input_fields, $fields_visibility);
                    break;
            }
        }
        return [$fields_visibility];
    }

    public static function getUserJsDefinitions($id_product)
    {
        $module = DynamicTools::getModule();
        $declaration_global = $module->provider->getDataFile('declarations/products.php');
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $declaration = $module->provider->getDataFile('declarations/product' . (int) $id_source_product . '.php');

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
     * @param DynamicInputField[] $input_fields
     * @return int
     */
    public static function getDynamicQuantity($dynamic_input, $input_fields = null)
    {
        $dynamic_input->assignInputFields(DynamicTools::getContext()->language->id);
        $equation = self::getQuantityEquation($dynamic_input->id_product);
        return (int) self::calculateQuantityFormula(
            $dynamic_input->id_product,
            $dynamic_input->id_attribute,
            $equation,
            $input_fields ?: $dynamic_input->input_fields
        );
    }

    /**
     * @param DynamicInput $dynamic_input
     * @param int $dynamic_quantity
     * @return bool
     */
    public static function checkProductStock($dynamic_input, $dynamic_quantity = 0)
    {
        $product_helper = new ProductHelper(DynamicTools::getModule(), DynamicTools::getContext());
        if ($product_helper->isAvailableWhenOutOfStock($dynamic_input->id_product)) {
            return true;
        }
        if (!$dynamic_quantity) {
            $dynamic_quantity = self::getDynamicQuantity($dynamic_input) * (float) $dynamic_input->cart_quantity;
            if (!$dynamic_quantity) {
                return true;
            }

            $inputs_quantity = DynamicInput::getInputsDynamicQuantity(
                $dynamic_input->id_product,
                $dynamic_input->id_attribute
            );

            $dynamic_quantity += $inputs_quantity;
        }
        $available_quantity = StockAvailable::getQuantityAvailableByProduct(
            $dynamic_input->id_product,
            $dynamic_input->id_attribute
        );
        return $available_quantity >= $dynamic_quantity;
    }

    public static function getHiddenItems($id_product, $input_fields)
    {
        $source = DynamicTools::getSource();
        $module = DynamicTools::getModule();
        $hidden_items = array(
            'fields'  => array(),
            'options' => array(),
            'groups'  => array(),
            'steps'   => array(),
        );
        $dynamic_conditions = DynamicCondition::getByProduct($id_product);
        foreach ($dynamic_conditions as $dynamic_condition) {
            $hidden_fields = $dynamic_condition->getHiddenFields();
            list($hidden_options) = $dynamic_condition->getHiddenOptions();
            $hidden_groups = $dynamic_condition->getHiddenGroups();
            $hidden_steps = $dynamic_condition->getHiddenSteps();
            if (count($hidden_fields) ||
                count($hidden_options) ||
                count($hidden_groups) ||
                count($hidden_steps)) {
                $formula = $dynamic_condition->formula;
                try {
                    $name = 'Condition #' . $dynamic_condition->id;
                    $condition_result = self::evaluateFormula($formula, $input_fields, $name);
                    if (isset(DynamicProduct::$debug_messages['formulas'][$name])) {
                        $infos = DynamicProduct::$debug_messages['formulas'][$name];
                        DynamicProduct::$debug_messages['conditions'][$name] = $infos;
                        unset(DynamicProduct::$debug_messages['formulas'][$name]);
                    }
                } catch (Exception $e) {
                    throw new RuntimeException($module->l('Condition Formula', $source) . ': ' .
                        DynamicTools::reportException($e, true));
                }
                if ($condition_result) {
                    $hidden_items['fields'] = array_merge($hidden_items['fields'], $hidden_fields);
                    $hidden_items['options'] = array_merge($hidden_items['options'], $hidden_options);
                    $hidden_items['groups'] = array_merge($hidden_items['groups'], $hidden_groups);
                    $hidden_items['steps'] = array_merge($hidden_items['steps'], $hidden_steps);
                }
            }
        }
        return $hidden_items;
    }

    public static function getMetConditions($id_product, $input_fields)
    {
        $source = DynamicTools::getSource();
        $module = DynamicTools::getModule();
        $met_conditions = array();
        $dynamic_conditions = DynamicCondition::getByProduct($id_product);
        foreach ($dynamic_conditions as $dynamic_condition) {
            $formula = $dynamic_condition->formula;
            try {
                $condition_result = self::evaluateFormula($formula, $input_fields);
            } catch (Exception $e) {
                throw new RuntimeException($module->l('Condition Formula', $source) . ': ' .
                    DynamicTools::reportException($e, true));
            }
            if ($condition_result) {
                $met_conditions[] = $dynamic_condition->name;
            }
        }
        return $met_conditions;
    }
}
