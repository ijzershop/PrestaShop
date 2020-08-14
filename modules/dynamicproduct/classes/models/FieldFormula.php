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

namespace classes\models;

use Db;
use DbQuery;
use Validate;

class FieldFormula extends DynamicObject
{

    public $id_product;
    public $formula;
    public $position;

    public static $definition = array(
        'table'   => 'dynamicproduct_field_formula',
        'primary' => 'id_field_formula',
        'fields'  => array(
            'id_product' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedInt'),
            'formula'    => array('type' => self::TYPE_STRING),
            'position'    => array('type' => self::TYPE_INT),
        )
    );

    /**
     * @param $id_product
     * @return FieldFormula[]
     */
    public static function getByProduct($id_product)
    {
        $field_formulas = array();
        $sql = new DbQuery();
        $sql->from(self::$definition['table']);
        $sql->where('id_product = ' . (int)$id_product);
        $sql->orderBy('position ASC');
        $rows = Db::getInstance()->executeS($sql, false);
        while ($row = Db::getInstance()->nextRow($rows)) {
            $id_field_formula = $row['id_field_formula'];
            $field_formula = new self($id_field_formula);
            if (Validate::isLoadedObject($field_formula)) {
                $field_formulas[$id_field_formula] = $field_formula;
            }
        }
        return $field_formulas;
    }

    public static function deleteByProduct($id_product)
    {
        return Db::getInstance()->delete(self::$definition['table'], 'id_product = ' . (int)$id_product);
    }

    public function getTargetField()
    {
        $formula = $this->formula;
        preg_match("/\[\s*(.*?)\s*\]\s*\=/", $formula, $matches);
        if ($matches && isset($matches[1])) {
            return $matches[1];
        }
        return null;
    }

    public function getTargetFormula()
    {
        $sides = explode('=', $this->formula, 2);
        if (isset($sides[1])) {
            return $sides[1];
        }
        return null;
    }
}
