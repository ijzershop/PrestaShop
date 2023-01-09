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
<table id="addresses-tab" cellspacing="0" cellpadding="0">
	<tr>
		{* {if !empty($invoice_address)}
			<td width="66%"><span class="bold" style="font-weight: bold; font-size: 13pt; color: #000;">FACTUURADRES:</span><br/>
				<span style="font-size:12pt;">{$invoice_address}</span>
			</td>
		{else} *}
			<td style="padding-bottom:20px;" width="66%">
				{if $delivery_address}
				<span class="bold" style="font-weight: bold; font-size: 13pt; color: #000;">AFLEVERADRES:</span><br/>
					<span style="font-size:12pt;">{$delivery_address}</span>
				{/if}
			</td>
		{* {/if} *}
			<td rowspan="2">

			</td>

	</tr>
		{if !empty($customer_contact)}
		<tr width="66%" colspan="2">
			<td><span style="font-size:12pt;">{$customer_contact['email']}</span></td>
		</tr>
      {if !empty($customer_contact['mobile'])}
      <tr width="66%" colspan="2">
        <td><span style="font-size:12pt;">{$customer_contact['mobile']}</span></td>
      </tr>
      {/if}
      {if !empty($customer_contact['phone'])}
        <tr width="66%" colspan="2">
          <td><span style="font-size:12pt;">{$customer_contact['phone']}</span></td>
        </tr>
      {/if}
		{/if}
</table>
