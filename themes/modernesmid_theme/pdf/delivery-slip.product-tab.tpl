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
* @author    PrestaShop SA
<contact@prestashop.com>
  * @copyright 2007-2018 PrestaShop SA
  * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
      <tr nobr="true">
        <th class="left" width="4%"></th>
        <th class="left" width="8%">Plaats</th>
        <th class="left" width="70%">Product</th>
        <th class="left" style="text-align:center" width="8%">Aantal</th>
        <th class="left" width="10%" style="text-align:right;">Gewicht</th>
      </tr>
      {foreach $order_details as $idx => $order_detail}
      <tr nobr="true">
        <td></td>
        <td style="{if count($order_details) > $idx+1}border-bottom:1px solid #d6d4d4;{/if}font-size:11pt;" class="left"> <br><br>{if empty($order_detail.reference)}{else}{$order_detail.reference}{/if}</td>
        <td style="{if count($order_details) > $idx+1}border-bottom:1px solid #d6d4d4;{/if}font-size:11pt;" class="left"><br><br><span style="color:#000; font-weight: bold;line-height: 12pt">{AttributeGroup::stripSawCutModuleAttributeGroupName($order_detail.product_name)}</span>, <span style="color:#000;">{if isset($order_detail.product_desc_short)}{if (int)$order_detail.id_category_default != (int)Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY')}{$order_detail.product_desc_short nofilter}{else}{$order_detail.product_desc_short nofilter}{/if}{/if}</span><br/>
          {foreach $order_detail.customizedDatas as $customizationPerAddress}
          {foreach $customizationPerAddress as $customizationId => $customization}
          {if isset($customization.datas[Product::CUSTOMIZE_TEXTFIELD]) && count($customization.datas[Product::CUSTOMIZE_TEXTFIELD]) > 0}
          {foreach $customization.datas[Product::CUSTOMIZE_TEXTFIELD] as $customization_infos}{if !empty($customization_infos.value)}


            {if !empty($customization_infos.technical_image)}
                  <table>
                    <tr>
                      <td colspan="2">
                        {$customization_infos.value|strip_tags:true|strip}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <br/>
                        <br/>
                        <img src="{Context::getContext()->shop->getBaseURL(false, false)}{$customization_infos.technical_image}.png" width="200" />
                      </td>
                    </tr>
                  </table>
                {else}
                  {$customization_infos.value|strip_tags:true|strip}
                {/if}
              {/if}
            {/foreach}
          {/if}
          {if isset($customization.datas[Product::CUSTOMIZE_FILE]) && count($customization.datas[Product::CUSTOMIZE_FILE]) > 0}
              {count($customization.datas[Product::CUSTOMIZE_FILE])}
          {/if}
          {/foreach}
          {/foreach}
        </td>
        <td style="{if count($order_details) > $idx+1}border-bottom:1px solid #d6d4d4;{/if}font-size:11pt;font-weight:bold;text-align:center;" class="left"><br><br>{$order_detail.product_quantity}</td>
        <td style="{if count($order_details) > $idx+1}border-bottom:1px solid #d6d4d4;{/if}font-size:11pt;text-align:right;" class="left"><br><br>{round(($order_detail.weight*$order_detail.product_quantity), 2)} {Configuration::get('PS_WEIGHT_UNIT')}</td>
      </tr>
      {/foreach}
      <tr nobr="true"><td colspan="5"></td></tr>

