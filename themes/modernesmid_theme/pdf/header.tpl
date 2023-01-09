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


{if isset($reference)}
<table style="width:100%">
	<tr><td colspan="2" heigth="40"><br><br><br></td>
    <td style="text-align: center;">
      <table>
        {if isset($added_to_order) && !empty($added_to_order)}
          <tr>
            <td style="width:100%;font-size:8pt;text-align:center;"><span style="background-color:#3b56ad;color:#ffffff;"><br><br> Toegevoegd aan {$added_to_order} </span></td>
          </tr>
        {/if}
      </table>
    </td>
  </tr>
	<tr>
		<td style="width: 40%;border-bottom:1px solid #000;color:#000;">
			{if $logo_path}
				<img src="{$logo_path}" />
			{/if}
		</td>
		<td style="width: 30%;border-bottom:1px solid #000;color:#000; text-align: right;">
			<table style="width: 100%">
				<tr>
					<td style="font-weight: bold; font-size: 18pt; color: #000; width: 100%;">{if isset($reference)}{$reference}<br>
              {$invoice_date|date_format:"%d-%m-%Y"}{/if}</td>
				</tr>
			</table>
		</td>
		<td style="width: 30%;border-bottom:1px solid #000;color:#000; text-align: right;">
			<table style="width: 100%">
				<tr>
					<td style="font-weight: bold; font-size: 18pt; color: #000; width: 100%; text-align: center;">
						{if isset($header)}
							<table style="width:100%;">
								<tr>
									<td style="width:100%;">{$header|escape:'html':'UTF-8'|upper}</td>
								</tr>
								<tr>
									<td style="width:100%;">{round($total_weight,2)}Kg</td>
								</tr>
							</table>
						{/if}
					</td>
				</tr>

			</table>
		</td>
	</tr>
</table>
{else}
<table style="width:100%">
	<tr>
		<td style="width: 50%">
			{if $logo_path}
				<img src="{$logo_path}" />
			{/if}
		</td>
		<td style="width: 50%; text-align: right;">
			<table style="width: 100%">
				<tr>
					<td style="font-weight: bold; font-size: 14pt; color: #000; width: 100%;">{if isset($header)}{$header|escape:'html':'UTF-8'|upper}{/if}</td>
				</tr>

			</table>
		</td>
	</tr>
</table>
{/if}
