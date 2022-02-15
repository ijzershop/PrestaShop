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
 * @author    Tunis-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use classes\models\DynamicEquation;
use classes\models\DynamicInput;
use Context;
use Db;
use DynamicProduct;
use OrderDetail;
use Validate;

class DynamicProductCost
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

    public function updateCost($id_order)
    {
        $order_details = OrderDetail::getList($id_order);
        foreach ($order_details as $order_detail) {
            $id_product = (int) $order_detail['product_id'];

            $id_customization = (int) $order_detail['id_customization'];
            if (!$id_customization) {
                continue;
            }

            $dynamic_input = DynamicInput::getInputByCustomization($id_customization);
            if (!$dynamic_input) {
                continue;
            }

            $cost_equation = DynamicEquation::getEquationByIdFormula($id_product, DynamicEquation::_DP_COST_EQ_);
            if (!Validate::isLoadedObject($cost_equation)) {
                continue;
            }

            $formula = $cost_equation->formula;
            if (!$formula) {
                continue;
            }
            $cost = DynamicEquation::evaluateFormula($formula, $dynamic_input->getInputFields(), 'Cost formula');
            Db::getInstance()->update(
                'order_detail',
                array('purchase_supplier_price' => (float) $cost),
                'id_order_detail = ' . (int) $order_detail['id_order_detail']
            );
        }
    }
}
