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
<table nobr="true" id="shipping-tab" width="100%">
	<tr>
		<td class="shipping left small grey bold" width="40%">{l s='Carrier' d='Shop.Pdf' pdf='true'}</td>
		<td class="shipping left small white" width="60%">{$carrier->name}</td>
	</tr>
	<tr>
		<td class="shipping left small grey bold" width="40%">{l s='Bericht' d='Shop.Pdf' pdf='true'}</td>
		<td class="shipping left small white" width="60%">{foreach from=Message::getMessagesByOrderId($order->id, false) key='key' item='message'}{$message.message}<br/>{/foreach}
		</td>
	</tr>
</table>
