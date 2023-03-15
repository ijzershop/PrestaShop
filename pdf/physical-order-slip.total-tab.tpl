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
<table nobr="true" id="total-tab" width="100%">
    {assign var="remaining_amount" value=0}
    {assign var="discount_amount" value=0}
    {assign var="reduction_amount" value=0}
    {assign var="reduction_amount_tax_excl" value=0}

    {if is_array($cart_rules) && count($cart_rules)}
        {foreach $cart_rules as $cart_rule}
            {if $cart_rule.reduction_amount != '0.000000'}
                {assign var="discount_amount" value=($discount_amount+(float)$cart_rule.reduction_amount)}
                {assign var="remaining_amount" value=($remaining_amount+((float)$cart_rule.reduction_amount - (float)$cart_rule.value))}
                {assign var="reduction_amount" value=($reduction_amount+(float)$cart_rule.value)}
                {assign var="reduction_amount_tax_excl" value=($reduction_amount_tax_excl+(float)$cart_rule.value_tax_excl)}
            {else}
                {assign var="discount_amount" value=($discount_amount+(float)$cart_rule.value)}
                {assign var="reduction_amount" value=($reduction_amount+(float)$cart_rule.value)}
            {/if}
        {/foreach}
    {/if}

  <tr>
    <td class="grey" width="60%">
        {l s='Total Products' d='Shop.Pdf' pdf='true'}
    </td>
    <td class="white" width="40%">
        {if $footer.products_before_discounts_tax_excl > 0}
            {displayPrice currency=$order->id_currency price=$footer.products_before_discounts_tax_excl}
        {else}
          - {displayPrice currency=$order->id_currency price=($remaining_amount/1.21)}
        {/if}
    </td>
  </tr>

    {if !$order->isVirtual()}
      <tr>
        <td class="grey" width="60%">
            {l s='Shipping' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white" width="40%">
            {if $footer.shipping_tax_excl > 0}
                {displayPrice currency=$order->id_currency price=$footer.shipping_tax_excl}
            {else}
                {displayPrice currency=$order->id_currency price='0.00'}
            {/if}
        </td>
      </tr>
    {/if}

    {if $reduction_amount > 0}
      <tr>
        <td class="grey" width="60%">
            {l s='Korting' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white" width="40%">
            {displayPrice currency=$order->id_currency price=0-$reduction_amount_tax_excl}
        </td>
      </tr>
    {/if}
    {if $footer.wrapping_tax_excl > 0}
      <tr>
        <td class="grey">
            {l s='Wrapping Costs' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white">{displayPrice currency=$order->id_currency price=$footer.wrapping_tax_excl}</td>
      </tr>
    {/if}


      <tr class="bold" >
        <td class="grey">
            {l s='Total (Tax excl.)' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white">
            {displayPrice currency=$order->id_currency price=$footer.total_paid_tax_excl}
        </td>
      </tr>

    {if $footer.total_taxes > 0}
      <tr class="bold">
        <td class="grey">
            {l s='Total Tax' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white">
            {displayPrice currency=$order->id_currency price=$footer.total_taxes-(abs($remaining_amount)-(abs($remaining_amount)/1.21))}
        </td>
      </tr>
    {elseif $remaining_amount > 0 && (abs($remaining_amount)-(abs($remaining_amount)/1.21)) > 0}
      <tr class="bold">
        <td class="grey">
            {l s='Total Tax' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white">
          - {displayPrice currency=$order->id_currency price=(abs($remaining_amount)-(abs($remaining_amount)/1.21))}
        </td>
      </tr>
    {/if}

    {assign var="new_total" value=($footer.total_paid_tax_incl-$remaining_amount)}

  <tr class="bold big">
    <td class="grey">
        {if $new_total > 0}
            {l s='Total' d='Shop.Pdf' pdf='true'}
        {else}
            {l s='Terugbetaling' d='Shop.Pdf' pdf='true'}
        {/if}
    </td>
    <td class="white">
        {if $new_total > 0}
            {displayPrice currency=$order->id_currency price=$new_total}
        {else}
            {displayPrice currency=$order->id_currency price=abs($new_total)}
        {/if}
    </td>
  </tr>
</table>
