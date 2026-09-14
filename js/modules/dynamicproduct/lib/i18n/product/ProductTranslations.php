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
namespace DynamicProduct\lib\i18n\product;
if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * Translations for the product config app
 */
class ProductTranslations
{
    /** @var \DynamicProduct */
    public $module;

    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * @return array
     */
    public function getTranslations()
    {
        $source = basename(__FILE__, '.php');

        return [
            '1544385387' => $this->module->l('An error occurred during the calculation', $source),
            '-649329027' => $this->module->l('An error occurred while saving the customization', $source),
            '472645665' => $this->module->l('An error occurred while saving your customization.', $source),
            '-72760859' => $this->module->l('Choose File', $source),
            '65193517' => $this->module->l('Clear', $source),
            '1824335046' => $this->module->l('Click the create customization button to insert this customization into the order.', $source),
            '-1839212624' => $this->module->l('Click to minimize section', $source),
            '65203672' => $this->module->l('Close', $source),
            '-1709226033' => $this->module->l('Create customization', $source),
            '-46030777' => $this->module->l('Customization link', $source),
            '-45978920' => $this->module->l('Customization name', $source),
            '1814419550' => $this->module->l('Drag and drop file to upload', $source),
            '555771296' => $this->module->l('Error uploading files', $source),
            '-193763338' => $this->module->l('Get link to share', $source),
            '1349131056' => $this->module->l('Hover over any field to check its name.', $source),
            '-1124310689' => $this->module->l('Imported image', $source),
            '-1893379118' => $this->module->l('Loading...', $source),
            '77124' => $this->module->l('Max', $source),
            '504390254' => $this->module->l('Max size: _max_size_ MB', $source),
            '1731115025' => $this->module->l('Max size: _max_size_ MB per file', $source),
            '77362' => $this->module->l('Min', $source),
            '-789585633' => $this->module->l('Misconfigured field: no allowed extensions defined', $source),
            '2424595' => $this->module->l('Next', $source),
            '1193955088' => $this->module->l('No fields to display. Please add some fields then check again.', $source),
            '-1942946089' => $this->module->l('No file chosen', $source),
            '1949421469' => $this->module->l('Only _max_files_ file(s) can be uploaded', $source),
            '-1623377699' => $this->module->l('Only admins can access the module debug mode.', $source),
            '842665892' => $this->module->l('Open the browser console to follow the calculation.', $source),
            '2057078771' => $this->module->l('Please complete all steps above before adding to cart.', $source),
            '1605937625' => $this->module->l('Please enter a name for your customization.', $source),
            '-131297247' => $this->module->l('Please fill in all the required fields then retry.', $source),
            '-979257952' => $this->module->l('Please pick a valid HEX color (#FFFFFF)', $source),
            '2130687160' => $this->module->l('Please select an option for the _label_ field', $source),
            '-1209131241' => $this->module->l('Previous', $source),
            '2569629' => $this->module->l('Save', $source),
            '1439070864' => $this->module->l('Save customization', $source),
            '2035175638' => $this->module->l('Saving this customization will change the order total.', $source),
            '1280161154' => $this->module->l('Saving your customization...', $source),
            '1962707131' => $this->module->l('Select a country...', $source),
            '-906759650' => $this->module->l('Some files were not accepted', $source),
            '-1847525622' => $this->module->l('The _label_ field is required', $source),
            '808509204' => $this->module->l('The _label_ field must be between _min_ and _max_', $source),
            '1900659510' => $this->module->l('The accepted file formats are', $source),
            '-604708888' => $this->module->l('The accepted file formats are: _extensions_', $source),
            '1375260106' => $this->module->l('The color format is #RRGGBB', $source),
            '1136995073' => $this->module->l('The customizations you save as an Admin can be viewed by anyone.', $source),
            '263556400' => $this->module->l('The date format is DD/MM/YYYY', $source),
            '-312382501' => $this->module->l('The field name is visible only in debug mode', $source),
            '1925664182' => $this->module->l('The value of the field _label_ must be at least _min_ characters long', $source),
            '260792128' => $this->module->l('The value of the field _label_ must be at most _max_ characters long', $source),
            '1695753420' => $this->module->l('This day is disabled', $source),
            '621646929' => $this->module->l('This message is displayed to admins only.', $source),
            '573578838' => $this->module->l('This product is no longer in stock with the selected values, please select smaller values.', $source),
            '2034149939' => $this->module->l('This section is displayed to admins only.', $source),
            '-1707725160' => $this->module->l('Weight', $source),
            '361237766' => $this->module->l('You can disable it in the main configuration page of the module', $source),
            '-1471171266' => $this->module->l('You can save this customization to your profile. Or share it with others.', $source),
            '1964022964' => $this->module->l('You can save this customization without adding it to cart.', $source),
            '-2053068223' => $this->module->l('You can select multiple options', $source),
            '572426603' => $this->module->l('You can upload up to _max_files_ files', $source),
            '-2120288485' => $this->module->l('Your customization has been saved.', $source),
            '-1826146145' => $this->module->l('[DynamicProduct] Debug mode enabled', $source),
            '1245424234' => $this->module->l('characters', $source),
            '518477297' => $this->module->l('field name', $source),
            '97434231' => $this->module->l('files', $source),
            '-79017120' => $this->module->l('optional', $source),
            '3555' => $this->module->l('or', $source),
            '-1171824737' => $this->module->l('read more', $source),
        ];
    }
}
