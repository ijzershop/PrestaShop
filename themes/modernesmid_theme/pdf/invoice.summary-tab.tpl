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
<table id="summary-tab" width="100%">
	<tr>
    <th class="header small" valign="middle">{l s='Besteldatum' d='Shop.Pdf' pdf='true'}</th>
    <th class="header small" valign="middle">{l s='Factuurdatum' d='Shop.Pdf' pdf='true'}</th>
    <th class="header small" valign="middle">{l s='Factuurnummer' d='Shop.Pdf' pdf='true'}</th>
	</tr>
	<tr>
    <td class="center small white">{dateFormat date=$order->date_add full=0}</td>
    <td class="center small white">{dateFormat date=$order->invoice_date full=0}</td>
    <td class="center small white">{$order->reference}</td>
{*		{if $addresses.invoice->vat_number}*}
{*			<td class="center small white">*}
{*				{$addresses.invoice->vat_number}*}
{*			</td>*}
{*		{/if}*}
	</tr>
</table>
