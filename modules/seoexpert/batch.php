<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */
if (defined('_PS_VERSION_') === false) {
    exit;
}

$_SERVER['REMOTE_ADDR'] = '';

include dirname(__FILE__) . '/../../config/config.inc.php';
include dirname(__FILE__) . '/seoexpert.php';

if (Tools::strtolower(php_sapi_name()) == 'cli') {
    $seo = new SeoExpert();

    $all_rules = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('SELECT SQL_BIG_RESULT msr.id_rule
	FROM `' . _DB_PREFIX_ . 'module_seohelping_rules` msr
	LEFT JOIN `' . _DB_PREFIX_ . 'module_seohelping_objects` mso ON (msr.id_rule = mso.id_rule)
	LEFT JOIN `' . _DB_PREFIX_ . 'module_seohelping_patterns` msp ON (msr.id_rule = msp.id_rule)
	WHERE msr.type = "product"
	AND msr.active = 1
	AND (msp.field NOT LIKE "fb_%" AND msp.field NOT LIKE "tw_%")
	GROUP BY msr.id_rule');

    foreach ($all_rules as &$rules) {
        $seo->cronProcessGenerateRule((int) $rules['id_rule']);
    }
    unset($all_rules, $rules, $seo);
}
