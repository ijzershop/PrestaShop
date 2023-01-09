{**
* 2007-2019 PrestaShop and Contributors
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License 3.0 (AFL-3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* https://opensource.org/licenses/AFL-3.0
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
* @author PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA and Contributors
  * @license https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
  {block name='cart_summary_product_line'}
  <table class="w-100">
    <tr>
      <td class="text-center" width="90px" {if is_array($product.customizations) && $product.customizations|count}rowspan="2" {/if}> <a href="{$product.url}" title="{$product.name}">
        <picture>
          <img class="media-object" width="50px" height="auto" src="{$product.cover.bySize.medium_default.url}" alt="{$product.name}">
        </picture>
        </a>
      </td>
      <td class="pl-1"><span class="product-quantity font-weight-bold">{$product.quantity}x</span> <span class="product-name font-weight-bold">{$product.name}</span>
      </td>
      <td class="text-right">
        <span class="product-price float-xs-right font-weight-bold">{Context::getContext()->currentLocale->formatPrice($product.price_with_reduction_without_tax*(int)$product.quantity, 'EUR')}</span>
        {if $product.price_without_reduction_without_tax != $product.price_with_reduction_without_tax}
        <br><span class="product-price regular-price float-xs-right">{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction_without_tax*(int)$product.quantity, 'EUR')}</span>
        {/if}
      </td>
    </tr>
    {if is_array($product.customizations) && $product.customizations|count}
    {foreach from=$product.customizations item="customization"}
    {foreach from=$customization.fields item="field"}<li>
      <tr>
        {if $field.label === 'zaaginstructies' || $field.label === 'instructies' || $field.label === 'knipinstructies'}
        <td colspan="2" class="font-italic pl-1">{$field.label}: {$field.text nofilter}</td>{else}
        <td>{$field.label}
          {if $field.type == 'text'}
          {$field.text nofilter}</td>
        {elseif $field.type == 'image'}
        <img src="{$field.image.small.url}" alt="{$field.label}" /></td>
        {/if}
        {/if}
      </tr>
      {/foreach}
      {/foreach}
      {/if}
  </table>
  {/block}
