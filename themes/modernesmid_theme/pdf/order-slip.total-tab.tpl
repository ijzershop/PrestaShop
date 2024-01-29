{***}
{* * 2007-2018 PrestaShop*}
{* **}
{* * NOTICE OF LICENSE*}
{* **}
{* * This source file is subject to the Open Software License (OSL 3.0)*}
{* * that is bundled with this package in the file LICENSE.txt.*}
{* * It is also available through the world-wide-web at this URL:*}
{* * https://opensource.org/licenses/OSL-3.0*}
{* * If you did not receive a copy of the license and are unable to*}
{* * obtain it through the world-wide-web, please send an email*}
{* * to license@prestashop.com so we can send you a copy immediately.*}
{* **}
{* * DISCLAIMER*}
{* **}
{* * Do not edit or add to this file if you wish to upgrade PrestaShop to newer*}
{* * versions in the future. If you wish to customize PrestaShop for your*}
{* * needs please refer to http://www.prestashop.com for more information.*}
{* **}
{* * @author    PrestaShop SA <contact@prestashop.com>*}
{* * @copyright 2007-2018 PrestaShop SA*}
{* * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)*}
{* * International Registered Trademark & Property of PrestaShop SA*}
{* *}
{*<table nobr="true" id="total-tab" width="100%">*}
{*    {assign var="remaining_amount" value=0}*}
{*    {assign var="discount_amount" value=0}*}
{*    {assign var="reduction_amount" value=0}*}
{*    {assign var="reduction_amount_tax_excl" value=0}*}

{*    {if is_array($cart_rules) && count($cart_rules)}*}
{*        {foreach $cart_rules as $cart_rule}*}
{*            {if $cart_rule.reduction_amount != '0.000000'}*}
{*                {assign var="discount_amount" value=($discount_amount+(float)$cart_rule.reduction_amount)}*}
{*                {assign var="remaining_amount" value=($remaining_amount+((float)$cart_rule.reduction_amount - (float)$cart_rule.value))}*}
{*                {assign var="reduction_amount" value=($reduction_amount+(float)$cart_rule.value)}*}
{*                {assign var="reduction_amount_tax_excl" value=($reduction_amount_tax_excl+((float)$cart_rule.reduction_amount/1.21))}*}
{*            {else}*}
{*                {assign var="discount_amount" value=($discount_amount+(float)$cart_rule.value)}*}
{*                {assign var="reduction_amount" value=($reduction_amount+(float)$cart_rule.value)}*}
{*            {/if}*}
{*        {/foreach}*}
{*    {/if}*}

{*  <tr>*}
{*    <td class="grey" width="60%">*}
{*        {l s='Total Products' d='Shop.Pdf' pdf='true'}*}
{*    </td>*}
{*    <td class="white" width="40%">*}
{*        {if $footer.products_before_discounts_tax_excl > 0}*}
{*            {displayPrice currency=$order->id_currency price=$footer.products_before_discounts_tax_excl}*}
{*        {else}*}
{*          - {displayPrice currency=$order->id_currency price=($remaining_amount/1.21)}*}
{*        {/if}*}
{*    </td>*}
{*  </tr>*}

{*    {if !$order->isVirtual()}*}
{*      <tr>*}
{*        <td class="grey" width="60%">*}
{*            {l s='Shipping' d='Shop.Pdf' pdf='true'}*}
{*        </td>*}
{*        <td class="white" width="40%">*}
{*            {if $footer.shipping_tax_excl > 0}*}
{*                {displayPrice currency=$order->id_currency price=$footer.shipping_tax_excl}*}
{*            {else}*}
{*                {displayPrice currency=$order->id_currency price='0.00'}*}
{*            {/if}*}
{*        </td>*}
{*      </tr>*}
{*    {/if}*}

{*    {if $reduction_amount > 0}*}
{*      <tr>*}
{*        <td class="grey" width="60%">*}
{*            {l s='Korting' d='Shop.Pdf' pdf='true'}*}
{*        </td>*}
{*        <td class="white" width="40%">*}
{*            {displayPrice currency=$order->id_currency price=0-$reduction_amount_tax_excl}*}
{*        </td>*}
{*      </tr>*}
{*    {/if}*}
{*    {if $footer.wrapping_tax_excl > 0}*}
{*      <tr>*}
{*        <td class="grey">*}
{*            {l s='Wrapping Costs' d='Shop.Pdf' pdf='true'}*}
{*        </td>*}
{*        <td class="white">{displayPrice currency=$order->id_currency price=$footer.wrapping_tax_excl}</td>*}
{*      </tr>*}
{*    {/if}*}


{*  <tr class="bold">*}
{*    <td class="grey">*}
{*        {l s='Total (Tax excl.)' d='Shop.Pdf' pdf='true'}*}
{*    </td>*}
{*    <td class="white">*}
{*        {displayPrice currency=$order->id_currency price=$footer.total_paid_tax_excl}*}
{*    </td>*}
{*  </tr>*}


{*    {if $footer.total_taxes > 0}*}
{*      <tr class="bold">*}
{*        <td class="grey">*}
{*            {l s='Total Tax' d='Shop.Pdf' pdf='true'}*}
{*        </td>*}
{*        <td class="white">*}
{*            {displayPrice currency=$order->id_currency price=$footer.total_taxes-(abs($remaining_amount)-(abs($remaining_amount)/1.21))}*}
{*        </td>*}
{*      </tr>*}
{*    {elseif $remaining_amount > 0}*}
{*      <tr class="bold">*}
{*        <td class="grey">*}
{*            {l s='Total Tax' d='Shop.Pdf' pdf='true'}*}
{*        </td>*}
{*        <td class="white">*}
{*            {displayPrice currency=$order->id_currency price=0}*}
{*        </td>*}
{*      </tr>*}
{*    {/if}*}

{*    {assign var="new_total" value=($footer.total_paid_tax_incl-$remaining_amount)}*}
{*  <tr class="bold big">*}
{*    <td class="grey">*}
{*        {l s='Total' d='Shop.Pdf' pdf='true'}*}
{*    </td>*}
{*    <td class="white">*}
{*        {displayPrice currency=$order->id_currency price=$footer.total_paid_tax_incl}*}
{*    </td>*}
{*  </tr>*}

{*    {if $new_total < 0}*}
{*      <tr class="bold big">*}
{*        <td class="grey">*}
{*            {l s='Terugbetaling incl.' d='Shop.Pdf' pdf='true'} {displayPrice currency=$order->id_currency price=abs($footer.total_taxes-(abs($remaining_amount)-(abs($remaining_amount)/1.21)))} {l s='btw' d='Shop.Pdf' pdf='true'}*}
{*        </td>*}
{*        <td class="white">*}
{*            {displayPrice currency=$order->id_currency price=abs($new_total)}*}
{*        </td>*}
{*      </tr>*}
{*    {/if}*}
{*</table>*}


{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 *}
<table id="total-tab" width="100%">

    {if $order_slip->shipping_cost_amount > 0}
      <tr>
        <td class="grey" width="70%">{l s='Shipping' d='Shop.Pdf' pdf='true'}</td>
        <td class="white" width="30%">
          - {displayPrice currency=$order->id_currency price=$order_slip->shipping_cost_amount}
        </td>
      </tr>
    {/if}

    {if isset($order_details) && count($order_details) > 0}
        {if (($order->total_paid_tax_incl - $order->total_paid_tax_excl) > 0)}
              <tr>
                <td class="grey" width="70%">
                    {l s='Product(en) (excl. btw)' d='Shop.Pdf' pdf='true'}
                </td>
                <td class="white" width="30%">
                  - {displayPrice currency=$order->id_currency price=$order->total_products}
                </td>
              </tr>
        {else}
          <tr>
            <td class="grey" width="70%">
                {l s='Product(en)' d='Shop.Pdf' pdf='true'}
            </td>
            <td class="white" width="30%">
              - {displayPrice currency=$order->id_currency price=$order->total_products}
            </td>
          </tr>
        {/if}
    {/if}




      <tr class="bold">
        <td class="grey" width="70%">
            {l s='Total (Tax Excl.)' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white" width="30%">
            {if $total_cart_rule}
                {assign var=total_paid value=0}
                {$total_paid = $order->total_paid_tax_excl - $total_cart_rule}
              - {displayPrice currency=$order->id_currency price=$total_paid}
            {else}
              - {displayPrice currency=$order->id_currency price=$order->total_paid_tax_excl}
            {/if}
        </td>
      </tr>

    {if ($order->total_paid_tax_incl - $order->total_paid_tax_excl) > 0}
      <tr>
        <td class="grey" width="70%">
            {l s='BTW' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white" width="30%">
          - {displayPrice currency=$order->id_currency price=($order->total_paid_tax_incl - $order->total_paid_tax_excl)}
        </td>
      </tr>
    {/if}

  <tr class="bold">
    <td class="grey" width="70%">
        {l s='Total (Tax Incl.)' d='Shop.Pdf' pdf='true'}
    </td>
    <td class="white" width="30%">
        {if $total_cart_rule}
            {assign var=total_paid value=0}
            {$total_paid = $order->total_paid_tax_incl - $total_cart_rule}
          - {displayPrice currency=$order->id_currency price=$total_paid}
        {else}
          - {displayPrice currency=$order->id_currency price=$order->total_paid_tax_incl}
        {/if}
    </td>
  </tr>

</table>
