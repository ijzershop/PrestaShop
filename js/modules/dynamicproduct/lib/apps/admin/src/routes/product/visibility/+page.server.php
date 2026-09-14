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

use DynamicProduct\classes\models\DynamicField;

function getVisibility($module, $id_product)
{
    $visibility_values = $module->provider->getVisibilityValues($id_product);
    $visibility = [];
    foreach ($visibility_values as $visibility_value) {
        $visibility["{$visibility_value['id_attribute']}-{$visibility_value['id_field']}"]
          = $visibility_value['visible'];
    }

    return $visibility;
}

function load(\DynamicProduct $module)
{
    $id_product = (int) \Tools::getValue('id_product');

    $visibility = getVisibility($module, $id_product);

    return [
        'combinations' => $module->provider->getProductCombinations($id_product),
        'visibility' => $visibility,
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

        $visibility = \Tools::getValue('visibility');

        foreach ($visibility as $id => $visible) {
            [$id_attribute, $id_field] = explode('-', $id);

            if (!$visible) {
                \Db::getInstance()->insert(
                    self::$module->name . '_visibility',
                    [
                        'id_product' => (int) $id_product,
                        'id_attribute' => (int) $id_attribute,
                        'id_field' => (int) $id_field,
                        'visible' => $visible,
                    ],
                    false,
                    true,
                    \DbCore::REPLACE
                );
            } else {
                \Db::getInstance()->delete(
                    self::$module->name . '_visibility',
                    'id_product = ' . (int) $id_product . ' AND ' .
                    'id_attribute = ' . (int) $id_attribute . ' AND ' .
                    'id_field = ' . (int) $id_field
                );
            }
        }

        return [
            'visibility' => getVisibility(self::$module, $id_product),
        ];
    }
}
