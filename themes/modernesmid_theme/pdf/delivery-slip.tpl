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
{* {$style_tab} *}

{assign var="messages" value=Message::getMessagesByOrderId($order->id, false)}
<table width="100%" id="body" border="0" cellpadding="0" cellspacing="0" style="margin:0;padding:0;">
	<!-- Addresses -->
	<tr><td colspan="12">{$addresses_tab}<br/></td></tr>
	<tr><td colspan="12" height="5" style="border-top:1px solid #000;"></td></tr>
  {if (is_array($messages) && count($messages) > 0) || (!empty($order->desired_delivery_date) && !is_null($order->desired_delivery_date) && $order->desired_delivery_date != '0000-00-00')}
      {if !empty($order->desired_delivery_date) && !is_null($order->desired_delivery_date) && $order->desired_delivery_date != '0000-00-00'}
	<tr><td style="{if !empty($order->desired_delivery_date) && !is_null($order->desired_delivery_date) && $order->desired_delivery_date != '0000-00-00'}background-color:#c0c0c0;{/if}" colspan="12"><br/><br/>
			<span style="width:100%;text-align:center;font-weight:bold;font-size:14px;">Uiterlijke leverdatum: {date_format(date_create($order->desired_delivery_date), 'd-m-Y')}<br/>1 dag vtv bellen.</span><br/>
    </td></tr>
      {/if}
      {foreach from=$messages item='message'}<tr><td colspan="12">{$message.message}</td></tr>{/foreach}
  <tr><td  style="border-bottom:1px solid #000;" colspan="12"></td></tr>
  {/if}
	<tr><td colspan="12" height="5">&nbsp;</td></tr>
	<!-- Products -->
	{$product_tab|strip}
	<tr><td colspan="12" height="30">&nbsp;</td></tr>
</table>

