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
    <tr><td rowspan="3" class="" style="width: 50px;vertical-align: middle;text-align: center; ">
        <span class="product-quantity" style="font-size:.8rem;font-weight:bold;border-radius: 50%;background-color: #3b56ad;padding:3px;color:#fff;display:inline-block;
   height:30px;
   line-height:23px;
   min-width:30px;
   text-align: center;">
          {$product.quantity}</span>

             <a href="{$product.url}" title="{$product.name}">
          {if isset($product.cover.bySize.medium_default.url)}
            <picture>
              <img class="media-object" width="100%" height="auto" src="{$product.cover.bySize.medium_default.url}" alt="{$product.name}">
            </picture>
          {/if}
        </a>
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <div class="product-title text-left">
          <a class="pl-1" href="{$product.url|escape:'quotes'}">{$product.name|escape:'quotes'}</a>
        </div>
      </td>

    </tr>
    <tr class="text-condensed">
      <td colspan="2" class="text-left" style="font-size: 1.2rem;
  line-height: 1.5rem;
  font-weight: 600 !important;
  color: #000 !important;
  vertical-align: text-top;">
        <span class="product-price font-weight-bold">{Context::getContext()->currentLocale->formatPrice($product.price_with_reduction_without_tax*(int)$product.quantity, 'EUR')}</span>
{*        {if $product.price_without_reduction_without_tax != $product.price_with_reduction_without_tax}*}
{*          <br><span class="product-price regular-price">*}
{*          {Context::getContext()->currentLocale->formatPrice($product.price_without_reduction_without_tax*(int)$product.quantity, 'EUR')}</span>*}
{*        {/if}*}

      </td>
    </tr>
    {if is_array($product.customizations) && $product.customizations|count}
    {foreach from=$product.customizations item="customization"}
    {foreach from=$customization.fields item="field"}<li>
      <tr class="text-sm">
        {if ($field.label === 'zaaginstructies' || $field.label === 'instructies' || $field.label === 'knipinstructies') && !Product::isDynamicProduct($product) }
        <td colspan="2" class="font-italic pl-1">{$field.label}: {$field.text nofilter}</td>
        {else}
        <td colspan="2">{if !Product::isDynamicProduct($product)}{$field.label}{/if}
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
