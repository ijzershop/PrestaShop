{**
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
 *}
<table id="total-tab" width="100%">
			<tr>
				<td class="grey" width="70%">
					{l s='Product Total' d='Shop.Pdf' pdf='true'}
				</td>
				<td class="white" width="30%">
					{displayPrice currency=$order->id_currency price=$order->total_products}
				</td>
			</tr>

	{if ($order->total_paid_tax_incl - $order->total_paid_tax_excl) > 0}
		<tr>
			<td class="grey" width="70%">
				{l s='Total Tax' d='Shop.Pdf' pdf='true'}
			</td>
			<td class="white" width="30%">
				{displayPrice currency=$order->id_currency price=($order->total_paid_tax_incl - $order->total_paid_tax_excl)}
			</td>
		</tr>
	{/if}

  <tr class="bold">
    <td class="grey" width="70%">
      {l s='Total (Tax Incl.)' d='Shop.Pdf' pdf='true'}
    </td>
    <td class="white" width="30%">
        {displayPrice currency=$order->id_currency price=$order->total_paid_tax_incl}
    </td>
  </tr>

</table>
