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
  {block name='product_miniature_item'}
  <article class="product-miniature js-product-miniature border-bottom row pt-2 pt-sm-1 pb-1" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}" itemscope itemtype="http://schema.org/Product">
    <div class="thumbnail-container col-12">
      <div class="row">
        {block name='product_thumbnail'}
        <div class="col-12 {Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE','col-sm-4 col-md-2')} pl-0 pr-2" {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE')=='col-sm-4 col-md-2'}style="max-width: 110px;margin:0 auto;"{/if}>
          {if $product}
          <a href="{$product.url}" class="thumbnail product-thumbnail">
            <img data-product-id="{$product.id_product}" class="w-100 thumb" src="{$product.cover.bySize.medium_default.url}" alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}" data-full-size-image-url="{$product.cover.large.url}" />
          </a>
          {else}
          <a href="{$product.url}" class="thumbnail product-thumbnail" data-product-id="{$product.id_product}">
            <img class="" src="{$urls.no_picture_image.bySize.medium_default.url}" />
          </a>
          {/if}
          <!-- @todo: use include file='catalog/_partials/product-flags.tpl'} -->
          {block name='product_flags'}
          <ul class="product-flags position-absolute list-unstyled">
            {foreach from=$product.flags item=flag}
            <li class="badge badge-danger product-flag {$flag.type}">{$flag.label}</li>
            {/foreach}
          </ul>
          {/block}
        </div>
        {/block}
        {assign var="productFeatures" value=unserialize(Configuration::get('SAWANDCUTMODULE'))}
        <div class="product-description col-12 {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes()))}col-sm-8 col-md-5{else} {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE') == 'col-sm-4 col-md-2'}col-sm-8 col-md-7{else}col-sm-4 col-md-5{/if}{/if} pl-0 pr-0">
          {block name='product_name'}
          <table class="h-100 w-100">
            <tr>
              <td class="align-middle">
                {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                  {assign var="dynamicProductConfig" value=Module::getInstanceByName('modernesmiddynamicproduct')->returnProductInitData($product)}
                <span class="h6 product-title p-0"><a class="text-decoration-none text-dark" href="{$product.url}">{$product.name}</a></span><br /><small class="help-text">Indicatie prijs € {$dynamicProductConfig.default_price} is op basis van {$dynamicProductConfig.lengte}mm {$dynamicProductConfig.behandeling} {$product.name}</small><br /><span class="product-description-short">{$product.description_short nofilter}</span>
                {else}
                <span class="h6 product-title p-0"><a class="text-decoration-none text-dark" href="{$product.url}">{$product.name}</a></span><br /><span class="product-description-short">{$product.description_short nofilter}</span>
                {/if}
              </td>
            </tr>
          </table>
          {/block}
        </div>
        {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes()))}
        <div class="pl-0 pr-0 col-12 col-sm-6 col-md-2">
          {hook h='displayProductSawAndCutButtons' product=$product}
        </div>
        {/if}
        <div class="product-price col-12 {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes()))}col-sm-6{else}col-sm-6{/if} col-md-2 pr-sm-2 pr-0">
          <table class="h-100 w-100">
            <tr>
              <td class="align-middle">
                {block name='product_price_and_shipping'}
                {if $product.show_price}
                <div class="product-price-and-shipping">
                  {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                  {assign var="productPrices" value=Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($product, $product.id_attribute)}
                  {if $product.has_discount}
                  {hook h='displayProductPriceBlock' product=$product type="old_price"}
                  <span class="regular-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} </span><span class="inclusive-price" data-product-id="{$product.id_product}"> {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc ,'EUR')} {l s='incl. BTW' d='Shop.Theme.Catalog'}</span><br>
                  <span class="exclusive-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {l s='excl. BTW' d='Shop.Theme.Catalog'}</span>
                  {else}
                  {hook h='displayProductPriceBlock' product=$product type="before_price"}
                  <span class="regular-price" data-product-id="{$product.id_product}"></span><span class="inclusive-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} {l s='incl. BTW' d='Shop.Theme.Catalog'}</span><br>
                  <span class="exclusive-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {l s='excl. BTW' d='Shop.Theme.Catalog'}</span>
                  {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                  {hook h='displayProductPriceBlock' product=$product type='weight'}
                  {/if}
                  {else}
                  {if $product.has_discount}
                  {hook h='displayProductPriceBlock' product=$product type="old_price"}
                  <span class="regular-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction, 'EUR')} </span><span class="inclusive-price" data-product-id="{$product.id_product}"> {$product.price} {l s='incl. BTW' d='Shop.Theme.Catalog'}</span><br>
                  <span class="exclusive-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')} {l s='excl. BTW' d='Shop.Theme.Catalog'}</span>
                  {else}
                  {hook h='displayProductPriceBlock' product=$product type="before_price"}
                  <span class="regular-price" data-product-id="{$product.id_product}"></span><span class="inclusive-price" data-product-id="{$product.id_product}">{$product.regular_price} {l s='incl. BTW' d='Shop.Theme.Catalog'}</span><br>
                  <span class="exclusive-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')} {l s='excl. BTW' d='Shop.Theme.Catalog'}</span>
                  {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                  {hook h='displayProductPriceBlock' product=$product type='weight'}
                  {/if}
                  {/if}
                </div>
                {/if}
                {/block}
              </td>
            </tr>
          </table>
        </div>
        <div class="product_buttons col-12 {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes()))}col-sm-4{else}col-sm-6{/if} col-md-1 pt-2 pt-sm-0 p-md-0 pl-0 pr-md-0">
          <table class="h-100 w-100" {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE') == 'col-sm-8 col-md-4'}style="margin-right:0px"{/if}>
            <tr>
              {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
              <td class="align-middle">
                {hook h='displayDynamicProductBox' product=$product}
              </td>
              {else}
              <td class="align-middle">
                {block name='product_add_to_cart_product_list'}
                {include file='catalog/_partials/product-add-to-cart-mini.tpl' product=$product configuration=$configuration}
                {/block}
              </td>
              {/if}
            </tr>
          </table>
        </div>
        <div class="product_variations col-12">
          <div class="highlighted-informations{if !$product.main_variants} no-variants{/if} hidden-sm-down">
            {block name='product_variants'}
            {if $product.main_variants}
            {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
            {/if}
            {/block}
          </div>
        </div>
      </div>
    </div>
  </article>
  {/block}
