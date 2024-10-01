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
  <tr>
    <td class="grey" width="60%">
        {l s='Totaal Producten' d='Shop.Pdf' pdf='true'}
    </td>
    <td class="white" width="40%">
        {if $footer.products_before_discounts_tax_excl > 0}
            {displayPrice currency=$order->id_currency price=$footer.products_before_discounts_tax_excl}
        {else}
            {displayPrice currency=$order->id_currency price=0-$footer.total_refunded_tax_excl}
        {/if}
    </td>
  </tr>

    {if !$order->isVirtual()}
      <tr>
        <td class="grey" width="60%">
            {l s='Verzending' d='Shop.Pdf' pdf='true'}
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

    {if $footer.total_discount_tax_excl > 0}
      <tr>
        <td class="grey" width="60%">
            {l s='Korting' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white" width="40%">
            {displayPrice currency=$order->id_currency price=0-$footer.total_discount_tax_excl}
        </td>
      </tr>
    {/if}
    {if $footer.wrapping_tax_excl > 0}
      <tr>
        <td class="grey">
            {l s='Verpakking' d='Shop.Pdf' pdf='true'}
        </td>
        <td class="white">{displayPrice currency=$order->id_currency price=$footer.wrapping_tax_excl}</td>
      </tr>
    {/if}

  <tr class="bold">
    <td class="grey">
        {l s='BTW' d='Shop.Pdf' pdf='true'}
    </td>
    <td class="white">
        {if $footer.total_paid_tax_excl <= 0 && abs($footer.total_refunded_tax_excl) > $footer.total_paid_tax_excl}
            {displayPrice currency=$order->id_currency price=0-($footer.total_refunded_tax_incl-$footer.total_refunded_tax_excl)}
        {else}
            {displayPrice currency=$order->id_currency price=$footer.total_taxes}
        {/if}
    </td>
  </tr>
  <tr class="bold big">
    <td class="grey">
        {l s='Totaal' d='Shop.Pdf' pdf='true'}
    </td>
    <td class="white">
        {if $footer.total_paid_tax_excl <= 0 && abs($footer.total_refunded_tax_excl) > $footer.total_paid_tax_excl}
            {displayPrice currency=$order->id_currency price=0-$footer.total_refunded_tax_incl}
        {else}
            {displayPrice currency=$order->id_currency price=$footer.total_paid_tax_incl}
        {/if}
    </td>
  </tr>
</table>
