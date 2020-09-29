<?php
/**
 * 2010-2020 Tuni-Soft
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
 * @copyright 2010-2020 Tuni-Soft
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

    public function getTranslations()
    {
        $source = 'TranslationHelper';

        return array(
            // start
            '77124' => $this->module->l('Max', $source),
            '77362' => $this->module->l('Min', $source),
            '2622298' => $this->module->l('Type', $source),
            '20170714' => $this->module->l('Field groups', $source),
            '46603408' => $this->module->l('Greater than or equal', $source),
            '67875034' => $this->module->l('Field', $source),
            '78727453' => $this->module->l('Range', $source),
            '255574909' => $this->module->l('Add a new condition', $source),
            '336650556' => $this->module->l('loading', $source),
            '487485563' => $this->module->l('Delete grid', $source),
            '524754236' => $this->module->l('Add a row', $source),
            '556571664' => $this->module->l('Available fields', $source),
            '593819435' => $this->module->l('Available groups', $source),
            '686245726' => $this->module->l('Add interval field', $source),
            '694222335' => $this->module->l('Interval field', $source),
            '714420990' => $this->module->l('Values (separate by comma, use dot for decimal values)', $source),
            '941456859' => $this->module->l('add a new field group', $source),
            '955701460' => $this->module->l('Delete interval field', $source),
            '956903001' => $this->module->l('Delete interval group', $source),
            '1035798281' => $this->module->l('Unknown group', $source),
            '1074180180' => $this->module->l('No field groups configured yet!', $source),
            '1224131978' =>
                 $this->module->l('No custom execution order is configured, the default order will be used', $source),
            '1299208205' => $this->module->l('Delete this row', $source),
            '1517533230' => $this->module->l('Loading data', $source),
            '1543324436' => $this->module->l('Row field', $source),
            '1620484928' => $this->module->l('Delete this item', $source),
            '2008912283' => $this->module->l('Add condition group', $source),
            '-1739945662' => $this->module->l('Values', $source),
            '-1266890280' => $this->module->l('Add an interval group', $source),
            '-167002208' => $this->module->l('Interval condition', $source),
            '-1983196248' => $this->module->l('Less than', $source),
            '-813310028' => $this->module->l('Remove this condition group', $source),
            '-1963285437' => $this->module->l('Delete this column', $source),
            '-1849538101' => $this->module->l('Target field', $source),
            '-1759411248' => $this->module->l('Column field', $source),
            '-1157161804' => $this->module->l('Add a column', $source),
            '-912813020' => $this->module->l('Add a grid', $source),
            '-177830133' => $this->module->l('Import CSV', $source),
            '-1306471438' => $this->module->l('Delete this group', $source),
            '-1072973150' => $this->module->l('Drag to reorder', $source),
            '-626105070' => $this->module->l('Insert field group', $source),
            '-2074469771' => $this->module->l('Manage field groups', $source),
            '-1544869189' => $this->module->l('Refresh', $source),
            '-198258289' => $this->module->l('Add an execution item', $source),
            '-1450803135' => $this->module->l('deletes all execution items', $source),
            '-1327547091' => $this->module->l('Reset to default', $source),
            // end
        );
    }
}
