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

<table class="product" width="100%" cellpadding="4" cellspacing="0">

	<thead>
		<tr>
			<th class="product header small" width="10%">Plaats</th>
			<th class="product header small" width="50%">{l s='Product / Reference' d='Shop.Pdf' pdf='true'}</th>
			<th class="product header small" width="10%">{l s='Qty' d='Shop.Pdf' pdf='true'}</th>
			<th class="product header-right small" width="15%">{l s='Unit price' d='Shop.Pdf' pdf='true'}<br />{if $tax_excluded_display}{l s='(Tax Excl.)' d='Shop.Pdf' pdf='true'}{else}{l s='(Tax Incl.)' d='Shop.Pdf' pdf='true'}{/if}</th>
			<th class="product header-right small" width="15%">{l s='Price' d='Shop.Pdf' pdf='true'}<br />{if $tax_excluded_display}{l s='(Tax Excl.)' d='Shop.Pdf' pdf='true'}{else}{l s='(Tax Incl.)' d='Shop.Pdf' pdf='true'}{/if}</th>
		</tr>
	</thead>

	<tbody>
		{if !isset($order_details) || count($order_details) == 0}
			<tr class="product" colspan="5">
				<td class="product center">
					{l s='No details' d='Shop.Pdf' pdf='true'}
				</td>
			</tr>
		{else}
			{foreach $order_details as $order_detail}
				{cycle values=["color_line_even", "color_line_odd"] assign=bgcolor_class}
				<tr class="product {$bgcolor_class}">
          <td class="product left">
            {$order_detail.reference}
          </td>
          <td class="product left">
						{$order_detail.name}
					</td>
					<td class="product center">
						{$order_detail.cart_quantity}
					</td>
					<td class="product right">
						{if $tax_excluded_display}
							{displayPrice currency=$order->id_currency price=$order_detail.price_with_reduction_without_tax}
						{else}
							{displayPrice currency=$order->id_currency price=$order_detail.price_with_reduction}
						{/if}
					</td>
					<td class="product right">
						{if $tax_excluded_display}
							{displayPrice currency=$order->id_currency price=$order_detail.total}
						{else}
							{displayPrice currency=$order->id_currency price=$order_detail.total_wt}
						{/if}
					</td>
				</tr>
        {if is_array($order_detail['customizedDatas'])}
						<tr class="customization_data {$bgcolor_class}">
							<td colspan="2">
								<table style="width: 100%;"><tr><td>
									{foreach $order_detail['customizedDatas'][$order_detail['id_product']][$order_detail['id_product_attribute']][$order_detail['id_address_delivery']][$order_detail['id_customization']] as $customization}
											{foreach $customization[1] as $customization_infos}
												{$customization_infos.name}: {$customization_infos.value}
												{if !$smarty.foreach.custo_foreach.last}<br />{/if}
											{/foreach}
									{/foreach}
								</td></tr></table>
							</td>

							<td class="center">{$order_detail.customization_quantity}</td>
							<td class="product"></td>
							<td class="product"></td>
						</tr>
        {/if}
			{/foreach}
		{/if}

		{if is_array($cart_rules) && count($cart_rules)}
			{foreach $cart_rules as $cart_rule}
				<tr class="discount">
					<td class="white left" colspan="4">{$cart_rule.name}</td>
					<td class="white right">
						{if $tax_excluded_display}
							+ {$cart_rule.value_tax_excl}
						{else}
							+ {$cart_rule.value}
						{/if}
					</td>
				</tr>
			{/foreach}
		{/if}

	</tbody>

</table>
