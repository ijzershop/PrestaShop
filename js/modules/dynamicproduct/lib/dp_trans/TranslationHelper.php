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
namespace DynamicProduct\lib\dp_trans;
if (!defined('_PS_VERSION_')) {
    exit;
}

class TranslationHelper
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    public function getAdminTranslations()
    {
        $source = 'TranslationHelper';

        return [
            // start admin 1945754001
            '449032306' => $this->module->l('Please select a product first', $source),
            '970976852' => $this->module->l('Customization added successfully', $source),
            '-1076613361' => $this->module->l('Please add a customization first', $source),
            '-1893379118' => $this->module->l('Loading...', $source),
            // end admin
        ];
    }
}
