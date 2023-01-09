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
  {if $product.show_price}
  <div class="product-prices">
    {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
    {assign var="productPrices" value=Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($product, $product.id_product_attribute)}
    {block name='product_discount'}
    {if $product.reduction > 0}
    <div class="product-discount">
      {* {hook h='displayProductPriceBlock' product=$product type="old_price"} *}
      <span class="regular-price">{Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')}</span>
      {* {var_export($product)} *}
    </div>
    {/if}
    {/block}
    {block name='product_price'}
    <div class="product-price {if $product.reduction > 0}has-discount{/if}">
      <div class="current-price">
        <span content="{$productPrices.final_prices.price_ttc}"><span class="inclusive-price">{Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc, 'EUR')} {l s='Incl btw' d='Shop.Theme.Catalog'}</span></span><br>
        <span class="exclusive-price">{Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht, 'EUR')} {l s='Excl btw' d='Shop.Theme.Catalog'}</span>
      </div>
      {block name='product_unit_price'}
      {if $displayUnitPrice}
      <p class="product-unit-price sub">{l s='(%unit_price%)' d='Shop.Theme.Catalog' sprintf=['%unit_price%' => $productPrices.final_unit_prices.price_ttc]}</p>
      {/if}
      {/block}
    </div>
    {/block}
    {block name='product_pack_price'}
    {if $displayPackPrice}
    <p class="product-pack-price"><span>{l s='Instead of %price%' d='Shop.Theme.Catalog' sprintf=['%price%' => $noPackPrice]}</span></p>
    {/if}
    {/block}
    {block name='product_ecotax'}
    {if $product.ecotax > 0}
    <p class="price-ecotax">{l s='Including %amount% for ecotax' d='Shop.Theme.Catalog' sprintf=['%amount%' => $product.ecotax]}
      {if $product.reduction > 0}
      {l s='(not impacted by the discount)' d='Shop.Theme.Catalog'}
      {/if}
    </p>
    {/if}
    {/block}
    {else}
    {block name='product_discount'}
    {if $product.reduction > 0}
    <div class="product-discount">
      {* {hook h='displayProductPriceBlock' product=$product type="old_price"} *}
      <span class="regular-price">{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction, 'EUR')}</span>
      {* {var_export($product)} *}
    </div>
    {/if}
    {/block}
    {block name='product_price'}
    <div class="product-price {if $product.reduction > 0}has-discount{/if}">
      <div class="current-price">
        <span content="{$product.orderprice}"><span class="inclusive-price">{Context::getContext()->currentLocale->formatPrice($product.price, 'EUR')} {l s='Incl btw' d='Shop.Theme.Catalog'}</span></span><br>
        <span class="exclusive-price">{Context::getContext()->currentLocale->formatPrice($product.price_tax_exc, 'EUR')} {l s='Excl btw' d='Shop.Theme.Catalog'}</span>
      </div>
      {block name='product_unit_price'}
      {if $displayUnitPrice}
      <p class="product-unit-price sub">{l s='(%unit_price%)' d='Shop.Theme.Catalog' sprintf=['%unit_price%' => $product.unit_price_full]}</p>
      {/if}
      {/block}
    </div>
    {/block}
    {block name='product_pack_price'}
    {if $displayPackPrice}
    <p class="product-pack-price"><span>{l s='Instead of %price%' d='Shop.Theme.Catalog' sprintf=['%price%' => $noPackPrice]}</span></p>
    {/if}
    {/block}
    {block name='product_ecotax'}
    {if $product.ecotax > 0}
    <p class="price-ecotax">{l s='Including %amount% for ecotax' d='Shop.Theme.Catalog' sprintf=['%amount%' => $product.ecotax]}
      {if $product.reduction > 0}
      {l s='(not impacted by the discount)' d='Shop.Theme.Catalog'}
      {/if}
    </p>
    {/if}
    {/block}
    {/if}
  </div>
  {/if}
