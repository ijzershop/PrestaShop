<?php
/**
 * 2007-2021 PayPal
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
 * @author 2007-2021 PayPal
 * @copyright PayPal
 * @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

use PaypalAddons\classes\AbstractMethodPaypal;
use PaypalPPBTlib\Install\ModuleInstaller;

/**
 * @param $module PayPal
 * @return bool
 */
function upgrade_module_5_0_0($module)
{
    $installer = new ModuleInstaller($module);
    $installer->registerHooks();
    $installer->installAdminControllers();
    $module->renameTabParent();
    $method = AbstractMethodPaypal::load('EC');
    $method->checkCredentials();
    $tabConfiguration = Tab::getInstanceFromClassName('AdminPaypalConfiguration');

    if (Validate::isLoadedObject($tabConfiguration) == false) {
        return false;
    }

    $tabConfiguration->active = false;
    return $tabConfiguration->save();
}
