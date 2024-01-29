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

namespace classes\models\grids;

use classes\models\DynamicObject;
use classes\models\DynamicProductConfigLink;

class Grid extends DynamicObject
{
    public $id_product;
    public $id_field_target;
    public $id_field_column;
    public $id_field_row;

    public static $definition = array(
        'table'     => 'dynamicproduct_grid',
        'primary'   => 'id_grid',
        'multilang' => false,
        'fields'    => array(
            'id_product'      => array('type' => self::TYPE_INT),
            'id_field_target' => array('type' => self::TYPE_INT),
            'id_field_column' => array('type' => self::TYPE_INT),
            'id_field_row'    => array('type' => self::TYPE_INT),
        )
    );

    /** @var GridColumn[] */
    public $columns;

    /** @var GridRow[] */
    public $rows;
    /** @var GridValue[] */
    public $values;

    public function __construct($id = null, $id_lang = null, $id_shop = null)
    {
        parent::__construct($id, $id_lang, $id_shop);
        $this->assignColumns();
        $this->assignRows();
        $this->assignValues();
    }

    public static function getByIdProduct($id_product, $order = false, $id_lang = null)
    {
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        return parent::getByIdProduct($id_source_product, $order, $id_lang);
    }

    private function assignColumns()
    {
        $this->columns = GridColumn::getByGrid($this->id);
    }

    private function assignRows()
    {
        $this->rows = GridRow::getByGrid($this->id);
    }

    private function assignValues()
    {
        $this->values = GridValue::getByGrid($this->id);
    }

    public function delete()
    {
        foreach ($this->columns as $column) {
            $column->delete();
        }
        foreach ($this->rows as $row) {
            $row->delete();
        }
        foreach ($this->values as $value) {
            $value->delete();
        }
        parent::delete();
    }

    /**
     * @param GridColumn[]|GridRow[] $item_values
     * @param float $value
     */
    public static function findValue($items, $value)
    {
        /** @var GridColumn[]|GridRow[] $item_values */
        $item_values = array_values($items);
        $count = count($item_values);
        for ($i = 0; $i < $count - 1; $i++) {
            if ($value >= $item_values[$i]->value && $value < $item_values[$i + 1]->value) {
                return $item_values[$i]->id;
            }
        }
        if ($value >= $item_values[$count - 1]->value) {
            return $item_values[$count - 1]->id;
        }
        return null;
    }
}
