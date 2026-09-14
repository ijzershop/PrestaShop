<?php
/**
 * 2007-2026 patworx.de
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade AmazonPay to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 *  @author    patworx multimedia GmbH <service@patworx.de>
 *  @copyright 2007-2026 patworx multimedia GmbH
 *  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function upgrade_module_3_3_13($module)
{
    $table = _DB_PREFIX_ . 'channable_stock_update';

    $sql = "SELECT 1
            FROM INFORMATION_SCHEMA.STATISTICS
            WHERE TABLE_SCHEMA = '" . pSQL(_DB_NAME_) . "'
              AND TABLE_NAME = '" . pSQL($table) . "'
              AND INDEX_NAME = 'idx_prod_attr'";
    if (!Db::getInstance()->getValue($sql)) {
        Db::getInstance()->execute("ALTER TABLE `" . pSQL($table) . "` ADD INDEX `idx_prod_attr` (`id_product`, `id_product_attribute`)");
    }

    return true;
}
