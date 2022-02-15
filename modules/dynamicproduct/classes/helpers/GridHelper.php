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
 * @author    Tunis-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use classes\DynamicTools;
use classes\models\DynamicProductConfigLink;
use classes\models\grids\Grid;
use classes\models\grids\GridColumn;
use classes\models\grids\GridRow;
use classes\models\grids\GridValue;
use Context;
use DynamicProduct;
use RuntimeException;

class GridHelper
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

    public function importCSVData($id_product, $csv_data)
    {
        $id_source_product = DynamicProductConfigLink::getSourceProduct($id_product);
        $source = DynamicTools::getSource();
        $columns = $csv_data[0] ?: null;
        if (!$columns) {
            throw new RuntimeException($this->module->l('Invalid CSV data format', $source));
        }

        $grid = new Grid();
        $grid->id_product = (int) $id_source_product;
        $grid->save();
        $id_grid = $grid->id;

        /** @var GridColumn[] $grid_columns */
        $grid_columns = array();
        /** @var GridRow[] $grid_rows */
        $grid_rows = array();

        $columns_count = count($columns);
        for ($c = 1; $c < $columns_count; $c++) {
            $grid_column = new GridColumn();
            $grid_column->id_grid = $id_grid;
            $grid_column->value = (float) $columns[$c];
            $grid_column->save();
            $grid_columns[$c] = $grid_column;
        }

        $rows_count = count($csv_data);
        for ($r = 1; $r < $rows_count; $r++) {
            if (isset($csv_data[$r][0])) {
                $grid_row = new GridRow();
                $grid_row->id_grid = $id_grid;
                $grid_row->value = (float) $csv_data[$r][0];
                $grid_row->save();
                $grid_rows[$r] = $grid_row;
            }
        }

        for ($r = 1; $r < $rows_count; $r++) {
            $csv_row = $csv_data[$r];
            $count_values = count($csv_row);
            for ($c = 1; $c < $count_values; $c++) {
                $value = $csv_row[$c];
                if (isset($grid_columns[$c], $grid_rows[$r])) {
                    $grid_value = new GridValue();
                    $grid_value->id_grid = $id_grid;
                    $grid_value->id_grid_column = $grid_columns[$c]->id;
                    $grid_value->id_grid_row = $grid_rows[$r]->id;
                    $grid_value->value = (float) $value;
                    $grid_value->save();
                }
            }
        }
        return $id_grid;
    }
}
