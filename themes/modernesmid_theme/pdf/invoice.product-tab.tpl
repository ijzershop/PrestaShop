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
    <th class="product header small" width="40%" style="text-align: left;">{l s='Product' d='Shop.Pdf' pdf='true'}</th>
    <th class="product header center small" width="10%">{l s='BTW' d='Shop.Pdf' pdf='true'}</th>
    <th class="product header center small" width="10%">{l s='Prijs/Stuk' d='Shop.Pdf' pdf='true'}
      <br/> {l s='(excl. btw)' d='Shop.Pdf' pdf='true'}</th>
    <th class="product header center small" width="10%">{l s='Aantal' d='Shop.Pdf' pdf='true'}</th>
    <th class="product header-right small" width="15%">{l s='Totaal' d='Shop.Pdf' pdf='true'}
      <br/> {l s='(incl. btw)' d='Shop.Pdf' pdf='true'}</th>
    <th class="product header-right small" width="15%">{l s='Totaal' d='Shop.Pdf' pdf='true'}
      <br/> {l s='(excl. btw)' d='Shop.Pdf' pdf='true'}</th>
  </tr>
  </thead>
  <tbody>
  <!-- PRODUCTS -->
  {foreach $order_details as $order_detail}
      {cycle values=["color_line_even", "color_line_odd"] assign=bgcolor_class}
    <tr class="product {$bgcolor_class}">
      <td {if isset($layout.before_discount)} colspan="7" {else} colspan="6" {/if}>
        <table width="100%" style="border-spacing: 0;">
          <tr class="{$bgcolor_class}">
            <td class="product left"
                width="40%">{AttributeGroup::stripSawCutModuleAttributeGroupName($order_detail.product_name)} <span
                style="color:#000;">{if isset($order_detail.product_desc_short)}{if (int)$order_detail.id_category_default != (int)Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY')}{$order_detail.product_desc_short|strip_tags}{else}{$order_detail.product_desc_short nofilter}{/if}{/if}</span><br/>
            </td>
            <td class="product center" width="10%">21%</td>
            <td class="product center" width="10%">
                {displayPrice currency=$order->id_currency price=$order_detail.unit_price_tax_excl_including_ecotax}
                {if $order_detail.ecotax_tax_excl > 0}
                  <br>
                  <small>{{displayPrice currency=$order->id_currency price=$order_detail.ecotax_tax_excl}|string_format:{l s='ecotax: %s' d='Shop.Pdf' pdf='true'}}</small>
                {/if}
            </td>
            <td class="product center" width="10%">
                {$order_detail.product_quantity}
            </td>
            <td class="product right" width="15%">
                {displayPrice currency=$order->id_currency price=$order_detail.total_price_tax_incl_including_ecotax}
            </td>
            <td class="product right" width="15%">
                {displayPrice currency=$order->id_currency price=$order_detail.total_price_tax_excl_including_ecotax}
            </td>
          </tr>
            {foreach $order_detail.customizedDatas as $customizationPerAddress}
                    {foreach $customizationPerAddress as $customizationId => $customization}
                        {if isset($customization.datas[Product::CUSTOMIZE_TEXTFIELD]) && count($customization.datas[Product::CUSTOMIZE_TEXTFIELD]) > 0}
                            {foreach $customization.datas[Product::CUSTOMIZE_TEXTFIELD] as $customization_infos}{if !empty($customization_infos.value)}
                                {if !empty($customization_infos.technical_image)}
                                  <tr>
                                    <td colspan="4" style="padding:0;margin:0">{$customization_infos.value|strip_tags:true|strip}</td>
                                      <td class="right" colspan="2">
                                        <img
                                          src="{Context::getContext()->shop->getBaseURL(false, false)}{$customization_infos.technical_image}.png"
                                          width="150"/>
                                      </td>
                                      </tr>
                                {else}
                                  <tr>
                                    <td colspan="4">{$customization_infos.value|strip_tags:true|strip}</td>
                                  </tr>
                                {/if}
                            {/if}
                            {/foreach}
                        {/if}
                        {if isset($customization.datas[Product::CUSTOMIZE_FILE]) && count($customization.datas[Product::CUSTOMIZE_FILE]) > 0}
                            {count($customization.datas[Product::CUSTOMIZE_FILE])}
                        {/if}
                    {/foreach}

            {/foreach}
        </table>
      </td>
    </tr>
  {/foreach}
  <!-- END PRODUCTS -->

  <!-- CART RULES -->
  {assign var="shipping_discount_tax_incl" value="0"}
  {foreach from=$cart_rules item=cart_rule name="cart_rules_loop"}
      {if $smarty.foreach.cart_rules_loop.first}
        <tr class="discount">
          <th class="header" colspan="3" style="text-align: left;">{l s='Korting' d='Shop.Pdf' pdf='true'}</th>
          <th class="header header-right" colspan="2">
            Totaal<br>
            (incl. btw)
          </th>
          <th class="header header-right" colspan="2">
            Totaal<br>
            (excl. btw)
          </th>
        </tr>
      {/if}
    <tr class="discount">
      <td class="white left" colspan="3">{$cart_rule.name}</td>
        {if (float)$cart_rule.reduction_amount > 0}
          <td class="right white" colspan="2">
            - {displayPrice currency=$order->id_currency price=$cart_rule.reduction_amount}</td>
          <td class="right white" colspan="2">
            - {displayPrice currency=$order->id_currency price=($cart_rule.reduction_amount/1.21)}</td>
        {else}
          <td class="right white" colspan="2">- {displayPrice currency=$order->id_currency price=$cart_rule.value}</td>
          <td class="right white" colspan="2">
            - {displayPrice currency=$order->id_currency price=($cart_rule.value_tax_excl)}</td>
        {/if}
    </tr>
  {/foreach}
  </tbody>
</table>
