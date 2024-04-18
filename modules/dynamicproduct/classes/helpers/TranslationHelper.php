<?php
/**
 * 2007-2024 TuniSoft
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
 * @copyright 2007-2024 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\helpers;

if (!defined('_PS_VERSION_')) {
    exit;
}

class TranslationHelper
{
    /** @var \DynamicProduct */
    public $module;
    /** @var \Context */
    public $context;
    protected $id_default_lang;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
        $this->id_default_lang = (int) \Configuration::get('PS_LANG_DEFAULT');
    }

    public function fillEmpty(&$translations)
    {
        if (is_array($translations)) {
            foreach ($translations as $id_trans_lang => &$translation) {
                if (((int) $id_trans_lang !== $this->id_default_lang) && empty($translation)) {
                    $translation = $translations[$this->id_default_lang];
                }
            }
        }
    }
}
