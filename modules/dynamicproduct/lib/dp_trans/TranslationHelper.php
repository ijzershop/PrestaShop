<?php
/**
 * 2010-2022 Tuni-Soft
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
 * @author    Tuni-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace lib\dp_trans;

use Context;
use DynamicProduct;

class TranslationHelper
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function getAdminTranslations()
    {
        $source = 'TranslationHelper';

        return array(
            // start admin 739095778
            '65665'       => $this->module->l('Add', $source),
            '65921'       => $this->module->l('All', $source),
            '77124'       => $this->module->l('Max', $source),
            '77362'       => $this->module->l('Min', $source),
            '2106261'     => $this->module->l('Copy', $source),
            '2373894'     => $this->module->l('Load', $source),
            '2420395'     => $this->module->l('Name', $source),
            '2569629'     => $this->module->l('Save', $source),
            '2587372'     => $this->module->l('Step', $source),
            '2603341'     => $this->module->l('Text', $source),
            '2622298'     => $this->module->l('Type', $source),
            '2641316'     => $this->module->l('Unit', $source),
            '20170714'    => $this->module->l('Field groups', $source),
            '42216636'    => $this->module->l('Show less', $source),
            '42255992'    => $this->module->l('Show more', $source),
            '46603408'    => $this->module->l('Greater than or equal', $source),
            '65193517'    => $this->module->l('Clear', $source),
            '65203672'    => $this->module->l('Close', $source),
            '67634599'    =>
                $this->module->l('Any change will have an effect on the configuration of _nb_ products.', $source),
            '67875034'    => $this->module->l('Field', $source),
            '69070285'    => $this->module->l('Grids', $source),
            '70760763'    => $this->module->l('Image', $source),
            '73174740'    => $this->module->l('Label', $source),
            '78727453'    => $this->module->l('Range', $source),
            '80208647'    => $this->module->l('Steps', $source),
            '81768821'    => $this->module->l('Will show an error when no option is selected', $source),
            '82420049'    => $this->module->l('Value', $source),
            '94764465'    => $this->module->l('Checked by default', $source),
            '96215082'    => $this->module->l('Export configuration to a file', $source),
            '96634189'    => $this->module->l('empty', $source),
            '112524536'   => $this->module->l('Any change will have an effect on the linked configurations.', $source),
            '168044563'   => $this->module->l('Prefix with a space if needed', $source),
            '188877356'   => $this->module->l('Select a product', $source),
            '213777395'   =>
                $this->module->l('Use _Up__ / _Down__ arrows and _Tab__ / _Shift__ _Tab__ to navigate between fields', $source),
            '217062059'   => $this->module->l('Delete field formula', $source),
            '225214028'   => $this->module->l('Import configuration from a file', $source),
            '255574909'   => $this->module->l('Add a new condition', $source),
            '309632339'   => $this->module->l('Add a new option', $source),
            '341682506'   => $this->module->l('Example', $source),
            '342988778'   => $this->module->l('Collapsible', $source),
            '414080266'   => $this->module->l('Max date', $source),
            '415178366'   => $this->module->l('Options', $source),
            '448768363'   => $this->module->l('Refresh databases list', $source),
            '472144411'   => $this->module->l('Price unit', $source),
            '487485563'   => $this->module->l('Delete grid', $source),
            '499705571'   => $this->module->l('No steps configured yet!', $source),
            '501633139'   => $this->module->l('Display the calculated price in the category page', $source),
            '502849757'   => $this->module->l('Actions', $source),
            '512870211'   => $this->module->l('Remove field from favorites', $source),
            '524754236'   => $this->module->l('Add a row', $source),
            '539312109'   => $this->module->l('Formulas', $source),
            '551803430'   => $this->module->l('PrestaShop fields', $source),
            '556571664'   => $this->module->l('Available fields', $source),
            '593819435'   => $this->module->l('Available groups', $source),
            '616048556'   => $this->module->l('Save and close', $source),
            '642864804'   =>
                $this->module->l('If you choose to hide all fields for one or more combinations, make sure to disable the option "Required customization" above', $source),
            '674841376'   => $this->module->l('This product has no field groups', $source),
            '679767347'   => $this->module->l('Display secondary value as option price', $source),
            '683837713'   => $this->module->l('Open in a new tab', $source),
            '686245726'   => $this->module->l('Add interval field', $source),
            '694222335'   => $this->module->l('Interval field', $source),
            '707322317'   => $this->module->l('Instead of the currency symbol', $source),
            '714420990'   => $this->module->l('Values (separate by comma, use dot for decimal values)', $source),
            '717577136'   => $this->module->l('Edit summary', $source),
            '743137649'   => $this->module->l('Are you sure you want to delete the selected fields?', $source),
            '747570142'   => $this->module->l('Weight formula', $source),
            '751248134'   => $this->module->l('Edit description', $source),
            '818934447'   => $this->module->l('Click to toggle the option visibility', $source),
            '856190703'   => $this->module->l('The formula is valid', $source),
            '863835572'   => $this->module->l('Import/Export configuration', $source),
            '894228158'   => $this->module->l('Show in cart summary', $source),
            '896194968'   => $this->module->l('Advanced configuration', $source),
            '910258683'   => $this->module->l('Date after/before dd days', $source),
            '936109071'   =>
                $this->module->l('This name is a reserved Excel function name, please use another name', $source),
            '941456859'   => $this->module->l('add a new field group', $source),
            '955701460'   => $this->module->l('Delete interval field', $source),
            '956903001'   => $this->module->l('Delete interval group', $source),
            '967323594'   => $this->module->l('Unlink configurations', $source),
            '987228486'   => $this->module->l('Formula', $source),
            '1015824103'  => $this->module->l('The formula contains unknown fields', $source),
            '1018815151'  => $this->module->l('Combination', $source),
            '1023084919'  => $this->module->l('Select a field', $source),
            '1028005612'  => $this->module->l('Enable the module for this product', $source),
            '1035798281'  => $this->module->l('Unknown group', $source),
            '1062605528'  => $this->module->l('Conditions', $source),
            '1074180180'  => $this->module->l('No field groups configured yet!', $source),
            '1092758090'  => $this->module->l('Allow multiselection', $source),
            '1119619936'  => $this->module->l('Product Page', $source),
            '1128817579'  => $this->module->l('Copy configuration', $source),
            '1152371054'  => $this->module->l('Configure options visibility', $source),
            '1201193478'  => $this->module->l('Display the "Starting from" label in the category page', $source),
            '1224131978'  =>
                $this->module->l('No custom execution order is configured, the default order will be used', $source),
            '1299208205'  => $this->module->l('Delete this row', $source),
            '1365932015'  => $this->module->l('Steps Activation', $source),
            '1378058502'  => $this->module->l('Delete condition', $source),
            '1382863923'  => $this->module->l('Cost formula', $source),
            '1385751734'  =>
                $this->module->l('You can import/export a file containing the product configuration', $source),
            '1473269982'  => $this->module->l('Groups Visibility', $source),
            '1479721030'  => $this->module->l('Applies only if the product has a price of 0', $source),
            '1499275331'  => $this->module->l('Settings', $source),
            '1506518963'  => $this->module->l('Insert step', $source),
            '1507272505'  => $this->module->l('Demo mode enabled, only these types will be accepted', $source),
            '1518498724'  => $this->module->l('Combinations', $source),
            '1529599611'  => $this->module->l('Add field column', $source),
            '1539356550'  => $this->module->l('Cancel selection', $source),
            '1543324436'  => $this->module->l('Row field', $source),
            '1547472170'  => $this->module->l('Displayed price', $source),
            '1606304409'  => $this->module->l('Show or Hide the fields based on the selected combination', $source),
            '1611563307'  => $this->module->l('Interval formula', $source),
            '1616172285'  => $this->module->l('This group has already been added', $source),
            '1620484928'  => $this->module->l('Delete this item', $source),
            '1620782841'  => $this->module->l('Delete this step', $source),
            '1642806840'  => $this->module->l('Databases', $source),
            '1652081830'  => $this->module->l('Click to toggle the field visibility', $source),
            '1741737838'  => $this->module->l('Click to insert an option', $source),
            '1781676314'  => $this->module->l('Display weight to customers', $source),
            '1816510966'  => $this->module->l('Display label', $source),
            '1821258733'  => $this->module->l('Clear the current configuration', $source),
            '1880571668'  => $this->module->l('Minimum width', $source),
            '1884393516'  => $this->module->l('Will be added to the body classes when condition is true', $source),
            '1887918305'  => $this->module->l('unlimited', $source),
            '1890611904'  => $this->module->l('Custom suffix', $source),
            '1926535580'  => $this->module->l('Remove this column', $source),
            '1939070905'  => $this->module->l('Will show an error when set to 0', $source),
            '1939937161'  => $this->module->l('Delete selected fields', $source),
            '1962674479'  => $this->module->l('Use Ctrl + Enter to save formula', $source),
            '1970866633'  => $this->module->l('Unlink configuration', $source),
            '1991049567'  => $this->module->l('Hide in summary when unchecked', $source),
            '2005080793'  => $this->module->l('Fields Visibility', $source),
            '2008912283'  => $this->module->l('Add condition group', $source),
            '2030152089'  => $this->module->l('Minimum height', $source),
            '2043376075'  => $this->module->l('Delete', $source),
            '2089680852'  => $this->module->l('Export', $source),
            '2104126169'  => $this->module->l('Fields', $source),
            '2124186744'  => $this->module->l('Click to toggle the step visibility', $source),
            '2141373940'  => $this->module->l('Groups', $source),
            '-343092435'  =>
                $this->module->l('You can configure the visibility of each field based on the selected combination. A hidden field will have a null value in the formula', $source),
            '-360169678'  => $this->module->l('Visibility', $source),
            '-2057845645' => $this->module->l('Field Formulas', $source),
            '-984860935'  => $this->module->l('Proportions', $source),
            '-1787898834' => $this->module->l('Intervals', $source),
            '-258501236'  => $this->module->l('This step has already been added', $source),
            '-2047922448' => $this->module->l('Available steps', $source),
            '-936937268'  => $this->module->l('Manage steps', $source),
            '-1544869189' => $this->module->l('Refresh', $source),
            '-986386678'  => $this->module->l('add a new step', $source),
            '-1020392531' => $this->module->l('Start by inserting a step from the list above', $source),
            '-1213154046' => $this->module->l('Unknown step', $source),
            '-1072973150' => $this->module->l('Drag to reorder', $source),
            '-1003134522' => $this->module->l('There are no fields yet, add a new field in the fields tab.', $source),
            '-1920372430' => $this->module->l('Required customization', $source),
            '-1640250765' => $this->module->l('Hide quantity input', $source),
            '-911095655'  => $this->module->l('Multiply price & weight by quantity', $source),
            '-319880804'  =>
                $this->module->l('If activated, the displayed price & weight on the product page will be multiplied by the quantity', $source),
            '-567220177'  => $this->module->l('Per kilo, per litre', $source),
            '-1105717282' =>
                $this->module->l('You can configure a displayed price if your product has a price of 0', $source),
            '-72782714'   => $this->module->l('Copy configuration to clipboard', $source),
            '-2100928571' => $this->module->l('Import', $source),
            '-839043195'  => $this->module->l('Import configuration from clipboard', $source),
            '-1680464031' => $this->module->l('Select a category', $source),
            '-755060688'  =>
                $this->module->l('Will use the same configuration in multiple products instead of copying it', $source),
            '-969155480'  => $this->module->l('Link instead of copying', $source),
            '-743709137'  =>
                $this->module->l('Will not preserve the original configurations of the linked products', $source),
            '-198824349'  => $this->module->l('Clear the configurations of linked products', $source),
            '-77133620'   =>
                $this->module->l('You can copy or link this configuration to all products of the selected category', $source),
            '-1780637860' => $this->module->l('Load configuration', $source),
            '-97880005'   => $this->module->l('Will use the same configuration instead of copying it', $source),
            '-861552729'  => $this->module->l('Will not preserve the current configuration', $source),
            '-814503541'  =>
                $this->module->l('You can copy the selected product configuration to the current product', $source),
            '-376014216'  => $this->module->l('Add a new proportion', $source),
            '-1266890280' => $this->module->l('Add an interval group', $source),
            '-1739945662' => $this->module->l('Values', $source),
            '-167002208'  => $this->module->l('Interval condition', $source),
            '-1983196248' => $this->module->l('Less than', $source),
            '-530681616'  => $this->module->l('+Infinity (no upper limit)', $source),
            '-813310028'  => $this->module->l('Remove this condition group', $source),
            '-1754233898' =>
                $this->module->l('Allows the customer to expand/collapse the group by clicking on the group label', $source),
            '-1203478535' => $this->module->l('Start collapsed', $source),
            '-1306471438' => $this->module->l('Delete this group', $source),
            '-626105070'  => $this->module->l('Insert field group', $source),
            '-2074469771' => $this->module->l('Manage field groups', $source),
            '-912813020'  => $this->module->l('Add a grid', $source),
            '-177830133'  => $this->module->l('Import CSV', $source),
            '-1963285437' => $this->module->l('Delete this column', $source),
            '-1849538101' => $this->module->l('Target field', $source),
            '-1759411248' => $this->module->l('Column field', $source),
            '-1157161804' => $this->module->l('Add a column', $source),
            '-754551441'  => $this->module->l('Price formula', $source),
            '-1451894031' => $this->module->l('Quantity formula', $source),
            '-874003249'  =>
                $this->module->l('Some field names are duplicated. You can either rename them or delete them.', $source),
            '-1522567076' => $this->module->l('Add a new field', $source),
            '-2043405119' => $this->module->l('Displayed', $source),
            '-2133620278' => $this->module->l('Hidden', $source),
            '-871138304'  => $this->module->l('Load a field from favorites', $source),
            '-907353161'  => $this->module->l('Load a field from common fields', $source),
            '-827747024'  => $this->module->l('Click to select fields', $source),
            '-1162526551' => $this->module->l('Field settings', $source),
            '-192987258'  => $this->module->l('Summary', $source),
            '-2066126138' => $this->module->l('Delete image', $source),
            '-2071596850' => $this->module->l('Delete color', $source),
            '-1667496710' => $this->module->l('Click to upload an image', $source),
            '-403094350'  => $this->module->l('Click to pick a color', $source),
            '-56677412'   => $this->module->l('Description', $source),
            '-455739515'  => $this->module->l('Secondary Value', $source),
            '-1085510111' => $this->module->l('Default', $source),
            '-960466740'  => $this->module->l('Thumbnail', $source),
            '-328495169'  => $this->module->l('Required', $source),
            '-195866273'  => $this->module->l('Display value as option price', $source),
            '-1089197058' => $this->module->l('Thumbnail height (px)', $source),
            '-2110296218' => $this->module->l('Display info in a popup', $source),
            '-930467021'  => $this->module->l('Import images', $source),
            '-812471947'  => $this->module->l('Initial value', $source),
            '-124100328'  => $this->module->l('Min characters', $source),
            '-781016378'  => $this->module->l('Max characters', $source),
            '-563123098'  => $this->module->l('Hide in summary when empty or equal to zero', $source),
            '-1281023549' => $this->module->l('Display PrestaShop style buttons', $source),
            '-1732758869' => $this->module->l('Maximum size (MB)', $source),
            '-786546228'  => $this->module->l('Allowed Extensions', $source),
            '-1369255836' => $this->module->l('Thumbnail size (px)', $source),
            '-303839446'  => $this->module->l('Initial date', $source),
            '-2027417515' => $this->module->l('Current day', $source),
            '-1362116388' => $this->module->l('Min date', $source),
            '-829601945'  => $this->module->l('Initial color', $source),
            '-1339063232' => $this->module->l('View image', $source),
            '-1754727903' => $this->module->l('Upload', $source),
            '-929869225'  => $this->module->l('Add field to favorites', $source),
            '-772024966'  => $this->module->l('Remove field from common fields', $source),
            '-43752491'   => $this->module->l('Set as common field', $source),
            '-1470017715' => $this->module->l('Duplicate this field', $source),
            '-1208718378' => $this->module->l('This will not delete the original field', $source),
            '-1307672979' => $this->module->l('Delete this field', $source),
            '-2016607813' => $this->module->l('Filter field formulas', $source),
            '-1479771459' => $this->module->l('Create a new field formula', $source),
            '-505434665'  => $this->module->l('Click to edit', $source),
            '-345562080'  => $this->module->l('Field formula', $source),
            '-198258289'  => $this->module->l('Add an execution item', $source),
            '-1450803135' => $this->module->l('deletes all execution items', $source),
            '-1327547091' => $this->module->l('Reset to default', $source),
            '-1069635520' => $this->module->l('Filter conditions', $source),
            '-1840858600' => $this->module->l('Create a new condition', $source),
            '-27641343'   => $this->module->l('Click to toggle the group visibility', $source),
            '-184663564'  => $this->module->l('Options visibility', $source),
            '-1733472447' => $this->module->l('Condition formula', $source),
            '-1026363850' => $this->module->l('Name (optional)', $source),
            '-141573914'  => $this->module->l('Filter condition fields', $source),
            '-557346165'  => $this->module->l('Select the field that you want to add', $source),
            '-1095166702' => $this->module->l('Pick a custom color', $source),
            '-2029223687' => $this->module->l('Edit product', $source),
            '-885795230'  => $this->module->l('Module configuration', $source),
            '-865760232'  => $this->module->l('This configuration is linked to the product', $source),
            '-2090976550' => $this->module->l('Copy linked configuration', $source),
            '-781361040'  => $this->module->l('This configuration is linked to _nb_ products', $source),
            '-209324991'  => $this->module->l('Filter fields', $source),
            '-859165076'  => $this->module->l('You can use multiple filters separated by spaces', $source),
            '-1888060882' => $this->module->l('Check formula', $source),
            '-321013333'  => $this->module->l('Product original price', $source),
            '-1173076394' => $this->module->l('Product original weight', $source),
            '-91109833'   => $this->module->l('The quantity selected by the customer', $source),
            '-229417419'  => $this->module->l('Databases refreshed successfully', $source),
            '-377760440'  => $this->module->l('Product attributes', $source),
            '-590915474'  => $this->module->l('Product features', $source),
            '-274987431'  => $this->module->l('Long press to use the secondary value', $source),
            '-426186843'  => $this->module->l('Secondary value', $source),
            // end admin
        );
    }


    public function getFrontTranslations()
    {
        $source = 'TranslationHelper';

        return array(
            // start front 1338209049
            '2453'        => $this->module->l('MB', $source),
            '77124'       => $this->module->l('Max', $source),
            '77362'       => $this->module->l('Min', $source),
            '2062599'     => $this->module->l('Back', $source),
            '2424595'     => $this->module->l('Next', $source),
            '2641316'     => $this->module->l('Unit', $source),
            '65203672'    => $this->module->l('Close', $source),
            '78727453'    => $this->module->l('Range', $source),
            '234648590'   => $this->module->l('Click to expand/collapse this section', $source),
            '361237766'   =>
                $this->module->l('You can disable it in the main configuration page of the module', $source),
            '414535005'   => $this->module->l('Max size', $source),
            '573578838'   =>
                $this->module->l('This product is no longer in stock with the selected values, please select smaller values.', $source),
            '741835352'   => $this->module->l('Min width', $source),
            '1089064661'  => $this->module->l('Min height', $source),
            '1203730580'  => $this->module->l('Min length', $source),
            '1245424234'  => $this->module->l('characters', $source),
            '1439070864'  => $this->module->l('Save customization', $source),
            '1440457123'  => $this->module->l('Import an image', $source),
            '1620385193'  => $this->module->l('Delete this file', $source),
            '1964022964'  => $this->module->l('You can save this customization without adding it to cart.', $source),
            '2034149939'  => $this->module->l('This section is displayed to admins only.', $source),
            '-1739945662' => $this->module->l('Values', $source),
            '-1822154468' => $this->module->l('Select', $source),
            '-1268268734' => $this->module->l('Max length', $source),
            '-987857235'  => $this->module->l('pixels', $source),
            '-512469298'  => $this->module->l('Accepted file types', $source),
            '-1213154046' => $this->module->l('Unknown step', $source),
            '-1310964303' =>
                $this->module->l('An error prevented the dynamic product module from displaying the fields', $source),
            '-1893379118' => $this->module->l('Loading...', $source),
            '-116694267'  => $this->module->l('Dynamic Product: Debug mode enabled', $source),
            '-445468723'  => $this->module->l('Enlarge image', $source),
            '-1124310689' => $this->module->l('Imported image', $source),
            '-1304787250' => $this->module->l('Delete this image', $source),
            '-1230460266' => $this->module->l('Import a file', $source),
            '-36360968'   => $this->module->l('Imported file', $source),
            '-1095166702' => $this->module->l('Pick a custom color', $source),
            '-1707725160' => $this->module->l('Weight', $source),
            '-839945901'  => $this->module->l('Please complete all the steps above then try again', $source),
            '-596636880'  => $this->module->l('Saving this customization does not change the order total.', $source),
            // end front
        );
    }
}
