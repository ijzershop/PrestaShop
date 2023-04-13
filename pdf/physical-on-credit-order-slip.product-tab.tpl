{**
 * 2007-2018 PrestaShop
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
<table class="product" width="100%" cellpadding="4" cellspacing="0">
  <thead>
  <tr>
    <th class="product header small" width="70%"  style="text-align: left;">{l s='Product' d='Shop.Pdf' pdf='true'}</th>
    <th class="product header center small" width="30%">{l s='Qty' d='Shop.Pdf' pdf='true'}</th>
  </tr>
  </thead>
  <tbody>
  <!-- PRODUCTS -->
  {foreach $order_details as $order_detail}
      {cycle values=["color_line_even", "color_line_odd"] assign=bgcolor_class}
    <tr class="product {$bgcolor_class}">
      <td {if isset($layout.before_discount)} colspan="7" {else} colspan="6" {/if}>
        <table width="100%">
          <tr class="{$bgcolor_class}">
            <td class="product left" width="70%">{AttributeGroup::stripSawCutModuleAttributeGroupName($order_detail.product_name)} <span style="color:#000;">{if isset($order_detail.product_desc_short)}{if (int)$order_detail.id_category_default != (int)Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY')}{$order_detail.product_desc_short|strip_tags}{else}{$order_detail.product_desc_short nofilter}{/if}{/if}</span><br/></td>
            <td class="product center" width="30%">
                {$order_detail.product_quantity}
            </td>
          </tr>
            {foreach $order_detail.customizedDatas as $customizationPerAddress}
                {foreach $customizationPerAddress as $customizationId => $customization}
                  <tr class="customization_data {$bgcolor_class}">
                    <td class="product left" colspan="7">{if array_key_exists($smarty.const._CUSTOMIZE_TEXTFIELD_, $customization.datas) && count($customization.datas[$smarty.const._CUSTOMIZE_TEXTFIELD_]) > 0}{foreach $customization.datas[$smarty.const._CUSTOMIZE_TEXTFIELD_] as $customization_infos}{if !empty($customization_infos.value)}<b>{$customization_infos.name|string_format:{l s='%s:' d='Shop.Pdf' pdf='true'}}</b> <span style="font-style:italic;">{if (int)$customization_infos.id_module}{$customization_infos.value nofilter}{else}{$customization_infos.value}{/if}</span>{/if}{/foreach}{/if}
                        {if array_key_exists($smarty.const._CUSTOMIZE_FILE_, $customization.datas) && count($customization.datas[$smarty.const._CUSTOMIZE_FILE_]) > 0}{l s='image(s):' d='Shop.Pdf' pdf='true'}{count($customization.datas[$smarty.const._CUSTOMIZE_FILE_])}{/if}
                    </td>
                  </tr>
                  <!--if !$smarty.foreach.custo_foreach.last-->
                {/foreach}
            {/foreach}
        </table>
      </td>
    </tr>
  {/foreach}
  <!-- END PRODUCTS -->
  </tbody>
</table>
