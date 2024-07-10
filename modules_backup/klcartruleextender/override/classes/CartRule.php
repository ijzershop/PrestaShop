<?php
/**
* 2022 - Keyrnel
*
* NOTICE OF LICENSE
*
* The source code of this module is under a commercial license.
* Each license is unique and can be installed and used on only one shop.
* Any reproduction or representation total or partial of the module, one or more of its components,
* by any means whatsoever, without express permission from us is prohibited.
* If you have not received this module from us, thank you for contacting us.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future.
*
* @author    Keyrnel
* @copyright 2022 - Keyrnel
* @license   commercial
* International Registered Trademark & Property of Keyrnel
*/
class CartRule extends CartRuleCore
{
    /**
     * Copy conditions from one CartRule to another.
     *
     * @param int $id_cart_rule_source Source CartRule ID
     * @param int $id_cart_rule_destination Destination CartRule ID
     */
    public static function copyConditions($id_cart_rule_source, $id_cart_rule_destination)
    {
        parent::copyConditions($id_cart_rule_source, $id_cart_rule_destination);

        if (($moduleClass = Module::getInstanceByName('klcartruleextender'))
            && $moduleClass instanceof KlCartRuleExtender
            && $moduleClass->isEnabledForShopContext()
            && $moduleClass->isCartRuleIncludingFees($id_cart_rule_source)
        ) {
            $moduleClass->addCartRuleFees([$id_cart_rule_destination]);
        }
    }
}
