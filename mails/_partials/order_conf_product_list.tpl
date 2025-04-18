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
{foreach $list as $product}
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
    <tr>
      <td align="right" bgcolor="#4472c4" class="es-text-9909" style="text-align:right;padding:5px;Margin:0;padding-top:20px;padding-bottom:10px;Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#ffffff;font-size:16px">
           {$product['quantity']}X
      </td>
      <td align="left" bgcolor="#4472c4" class="es-text-9909" style="padding:0;Margin:0;padding-top:20px;padding-bottom:10px;Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#ffffff;font-size:16px">
        {AttributeGroup::stripSawCutModuleAttributeGroupName($product['name'])}
      </td>
    </tr>
    {if $product['customization']}
    <tr>
      <td align="left" bgcolor="#4472c4" class="es-text-9909"
          style="padding:0;Margin:0;padding-top:20px;padding-bottom:10px;Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#ffffff;font-size:16px">
      </td>
      <td <td align="left" bgcolor="#4472c4" class="es-text-9909"
              style="padding:0;Margin:0;padding-top:20px;padding-bottom:10px">
        {foreach $product['customization'] as $customization}
          {$customization['customization_text'] nofilter}
        {/foreach}
      </td>
    </tr>
    {/if}
    <tr>
      <td style="border-bottom: 1px solid rgba(255,255,255,0.50)" colspan="2"></td>
    </tr>
  </table>
{/foreach}
