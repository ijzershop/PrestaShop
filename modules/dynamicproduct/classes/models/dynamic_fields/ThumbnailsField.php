<?php
/**
 * 2007-2023 TuniSoft
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
 * @copyright 2007-2023 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
namespace DynamicProduct\classes\models\dynamic_fields;

use DynamicProduct\classes\models\DynamicField;
use DynamicProduct\classes\models\DynamicThumbnailsOption;

class ThumbnailsField extends DynamicField
{
    /** @var DynamicThumbnailsOption[] */
    public $options;

    public function getOptions()
    {
        return DynamicThumbnailsOption::getThumbnailsOptionsByIdField($this->id, $this->id_lang);
    }

    public function getInitialValue()
    {
        foreach ($this->options as $option) {
            if ($option['is_default']) {
                return $option['value'];
            }
        }

        return 0;
    }

    public function getInitialOptions($initial_value = null)
    {
        if ($initial_value) {
            foreach ($this->options as $option) {
                if ($option['value'] == $initial_value) {
                    return [$option['id']];
                }
            }
        }

        foreach ($this->options as $option) {
            if ($option['is_default']) {
                return [$option['id']];
            }
        }

        return [];
    }
}
