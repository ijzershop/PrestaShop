<?php
/**
 * 2010-2019 Tuni-Soft
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
 * @copyright 2010-2019 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\models\input_fields;

use classes\models\DynamicInputField;
use classes\models\DynamicThumbnailsOption;

class ThumbnailsInputField extends DynamicInputField
{
    public function isSkipped()
    {
        return parent::isSkipped() || count($this->selected_options) === 0;
    }

    public function getDisplayedValues()
    {
        $displayed_values = array();
        foreach ($this->selected_options as $id_thumbnail_option) {
            $thumbnails_option = new DynamicThumbnailsOption((int)$id_thumbnail_option, $this->id_lang);
            $displayed_values[] = $thumbnails_option->label;
        }
        return $displayed_values;
    }
}
