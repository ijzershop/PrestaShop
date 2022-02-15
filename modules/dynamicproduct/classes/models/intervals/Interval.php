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

namespace classes\models\intervals;

use classes\models\DynamicObject;
use classes\models\DynamicProductConfigLink;

class Interval extends DynamicObject
{

    public $id_product;

    /** @var IntervalField[] */
    public $intervalFields;

    /** @var IntervalConditionGroup[] */
    public $intervalConditionGroups;

    /** @var IntervalFormula[] */
    public $intervalFormulas;

    public static $definition = array(
        'table'     => 'dynamicproduct_interval',
        'primary'   => 'id_interval',
        'multilang' => false,
        'fields'    => array(
            'id_product' => array('type' => self::TYPE_INT),
        )
    );

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->assignIntervalFields();
        $this->assignConditionGroups();
        $this->assignIntervalFormulas();
    }

    public static function getByIdProduct($id_product, $order = false, $id_lang = null)
    {
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        return parent::getByIdProduct($id_source_product, $order, $id_lang);
    }

    private function assignIntervalFields()
    {
        $this->intervalFields = IntervalField::getByInterval($this->id);
    }

    private function assignConditionGroups()
    {
        $this->intervalConditionGroups = IntervalConditionGroup::getByInterval($this->id);
    }

    private function assignIntervalFormulas()
    {
        $this->intervalFormulas = IntervalFormula::getIntervalFormulas($this->intervalConditionGroups);
    }

    public function delete()
    {
        foreach ($this->intervalConditionGroups as $interval_condition_group) {
            $interval_condition_group->delete();
        }

        foreach ($this->intervalFields as $interval_field) {
            $interval_field->delete();
        }

        foreach ($this->intervalFormulas as $interval_field_formulas) {
            foreach ($interval_field_formulas as $interval_field_formula) {
                /** @var IntervalFormula $interval_field_formula */
                $interval_field_formula->delete();
            }
        }
        parent::delete();
    }
}
