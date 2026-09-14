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

use DynamicProduct\classes\context\DynamicContext;
use DynamicProduct\classes\helpers\ConfigLinkHelper;

function load(\DynamicProduct $module): array
{
    $link = DynamicContext::getLink();
    $id_product = (int) \Tools::getValue('id_product');
    $id_lang = DynamicContext::getLanguageId();

    $id_source_product = ConfigLinkHelper::getSourceProduct($id_product);

    return [
        'translations' => [],
        'languages' => \Language::getLanguages(),
        'id_default_lang' => (int) \Configuration::get('PS_LANG_DEFAULT'),
        'has_combinations' => !empty(\Product::getProductAttributesIds($id_product, true)),

        'id_product' => $id_product,
        'product_name' => \Product::getProductName($id_product, null, $id_lang),
        'id_source_product' => $id_source_product,
        'source_product_name' => \Product::getProductName($id_source_product, null, $id_lang),
        'nb_linked_configs' => ConfigLinkHelper::getNbLinkedConfigs($id_source_product),
        'is_category_linked' => ConfigLinkHelper::isCategoryLinked($id_source_product),
        'original_configuration_link' => $link->getAdminLink(
            'AdminProducts',
            true,
            ['id_product' => $id_source_product, 'updateproduct' => '1']
        ),

        'links' => [
            'base_admin_url' => $link->getAdminLink('AdminProducts'),
            'admin_product_link' => $link->getAdminLink(
                'AdminProducts',
                true,
                ['id_product' => $id_product]
            ),
            'product_link' => $link->getAdminLink('AdminProducts', true, ['id_product' => $id_product]),
            'module_link' => $link->getAdminLink('AdminModules') . '&configure=' . $module->name,
            'troubleshooter' => $module->provider->getModuleAdminLink('view_troubleshooter'),
            'upgrade_checker' => $module->provider->getModuleAdminLink('view_upgrade_checker'),
        ],
    ];
}
