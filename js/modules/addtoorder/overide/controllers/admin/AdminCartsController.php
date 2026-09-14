<?php
/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

/**
 * @property Cart $object
 */
class AdminCartsController extends AdminCartsControllerCore
{
   
    public function ajaxProcessUpdateDeliveryOption()
    {
        if ($this->access('edit')) {
            $delivery_option = Tools::getValue('delivery_option');
            if ($delivery_option !== false) {
                $this->context->cart->setDeliveryOption(array($this->context->cart->id_address_delivery => $delivery_option));
            }
            if (Validate::isBool(($recyclable = (int) Tools::getValue('recyclable')))) {
                $this->context->cart->recyclable = $recyclable;
            }
            if (Validate::isBool(($gift = (int) Tools::getValue('gift')))) {
                $this->context->cart->gift = $gift;
            }
            if (Validate::isMessage(($gift_message = pSQL(Tools::getValue('gift_message'))))) {
                $this->context->cart->gift_message = $gift_message;
            }
            if (Validate::isMessage(($added_to_order = pSQL(Tools::getValue('added_to_order'))))) {
                $this->context->cart->added_to_order = $added_to_order;
            }
            $this->context->cart->save();
            echo json_encode($this->ajaxReturnVars());
        }
    }
}
