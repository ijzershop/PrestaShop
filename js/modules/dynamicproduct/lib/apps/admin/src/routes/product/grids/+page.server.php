<?php
/**
 * 2007-2026 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct;
if (!defined('_PS_VERSION_')) {
    exit;
}

use DynamicProduct\classes\DynamicTools;
use DynamicProduct\classes\helpers\GridHelper;
use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\grids\Grid;
use DynamicProduct\classes\models\grids\GridColumn;
use DynamicProduct\classes\models\grids\GridRow;
use DynamicProduct\classes\models\grids\GridValue;

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    return [
        'grids' => Grid::getByIdProduct($id_product),
        'fields' => DynamicField::getFieldRowsByProduct($id_product),
    ];
}

class Actions
{
    public static $module;
    public static $context;

    public static function update()
    {
        $id_product = (int) \Tools::getValue('id_product');
        $action_name = \Tools::getValue('action_name');
        $action_value = \Tools::getValue('action_value');

        $grids = \Tools::getValue('grids');

        if ($action_name === 'update') {
            foreach ($grids as $grid) {
                $grid_obj = new Grid($grid['id']);
                $grid_obj->id_field_target = (int) $grid['id_field_target'];
                $grid_obj->id_field_column = (int) $grid['id_field_column'];
                $grid_obj->id_field_row = (int) $grid['id_field_row'];
                $grid_obj->save();

                foreach ($grid['columns'] as $column) {
                    $grid_column = new GridColumn($column['id']);
                    $grid_column->value = (float) $column['value'];
                    $grid_column->save();
                }

                foreach ($grid['rows'] as $row) {
                    $grid_row = new GridRow($row['id']);
                    $grid_row->value = (float) $row['value'];
                    $grid_row->save();
                }

                foreach ($grid['values'] as $id => $value) {
                    [$id_row, $id_column] = explode('-', $id);
                    $grid_value = GridValue::getByProperties($grid['id'], $id_column, $id_row);
                    $grid_value->value = (float) $value['value'];
                    $grid_value->save();
                }
            }
        }

        if ($action_name === 'add') {
            $grid = new Grid();
            $grid->id_product = (int) $id_product;
            $grid->save();

            $id_grid = (int) $grid->id;

            $grid_column = new GridColumn();
            $grid_column->id_grid = $id_grid;
            $grid_column->value = 0;
            $grid_column->save();

            $grid_column = new GridColumn();
            $grid_column->id_grid = $id_grid;
            $grid_column->value = 100;
            $grid_column->save();

            $grid_row = new GridRow();
            $grid_row->id_grid = $id_grid;
            $grid_row->value = 0;
            $grid_row->add();

            $grid_row = new GridRow();
            $grid_row->id_grid = $id_grid;
            $grid_row->value = 100;
            $grid_row->add();
        }

        if ($action_name === 'delete') {
            $grid = new Grid($action_value);
            $grid->delete();
        }

        if ($action_name === 'add-column') {
            $grid_column = new GridColumn();
            $grid_column->id_grid = $action_value;
            $grid_column->save();
        }

        if ($action_name === 'delete-column') {
            (new GridColumn($action_value))->delete();
        }

        if ($action_name === 'add-row') {
            $grid_row = new GridRow();
            $grid_row->id_grid = $action_value;
            $grid_row->add();
        }

        if ($action_name === 'delete-row') {
            (new GridRow($action_value))->delete();
        }

        return [
            'grids' => Grid::getByIdProduct($id_product),
        ];
    }

    public static function import()
    {
        $source = basename(__FILE__, '.php');

        $id_product = (int) \Tools::getValue('id_product');

        $uploader = new \Uploader();
        $uploader->setMaxSize(1024 * 1000 * 100);
        $uploader->setName('file');
        $uploader->setAcceptTypes(['csv']);
        $file = $uploader->process();
        if (!count($file)) {
            return [
                'error' => true,
                'message' => self::$module->l('Please select a file to import', $source),
            ];
        }
        $upload = $file[0];

        if ($upload['error']) {
            return [
                'error' => true,
                'message' => $upload['error'],
            ];
        }

        $save_path = $upload['save_path'];

        $csv_data = array_map('str_getcsv', file($save_path));
        $grid_helper = new GridHelper(self::$module, self::$context);
        try {
            $grid_helper->importCSVData($id_product, $csv_data);
        } catch (Exception $e) {
            return [
                'error' => true,
                'message' => DynamicTools::reportException($e),
            ];
        }

        return [
            'message' => self::$module->l('Grid imported successfully', $source),
            'grids' => Grid::getByIdProduct($id_product),
        ];
    }
}
