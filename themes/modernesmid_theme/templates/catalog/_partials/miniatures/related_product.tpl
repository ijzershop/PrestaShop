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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{block name='product_miniature_item'}
  <article class="product-miniature js-product-miniature col-12 p-0 pb-1" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}">
    <div class="thumbnail-container col-12">
      <div class="row">
      {block name='product_thumbnail'}
      <div class="col-4 col-md-2">

        {if $product.cover}
          <a href="{$product.url}" class="thumbnail product-thumbnail">
            <img
              data-product-id="{$product.id_product}"
              class="w-100 thumb"
              src="{$product.cover.bySize.medium_default.url}"
              alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
              data-full-size-image-url="{$product.cover.large.url}"
            />
          </a>
        {else}
          <a href="{$product.url}" class="thumbnail product-thumbnail" data-product-id="{$product.id_product}">
            <img class="w-100" src="{$urls.no_picture_image.bySize.medium_default.url}" />
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

      <div class="product-description col-8 col-md-6 pl-0">
        {block name='product_name'}
          <table class="h-100 w-100">
            <tr>
              <td class="align-middle">
              {if $page.page_name == 'index'}
                <span class="h6 product-title p-0"><a class="text-decoration-none text-dark" href="{$product.url}">{$product.name}</a><br/></span><span class="product-description-short">{$product.description_short nofilter}</span>
              {else}
                <span class="h6 product-title p-0"><a class="text-decoration-none text-dark" href="{$product.url}">{$product.name}</a><br/></span><span class="product-description-short">{$product.description_short nofilter}</span>
              {/if}
              </td>
            </tr>
          </table>
        {/block}
      </div>
      <div class="product-price col-6 col-md-2">
        {if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')}
        <table class="h-100 w-100">
            <tr>
              <td class="align-middle">
        {block name='product_price_and_shipping'}
          {if $product.show_price}
            <div class="product-price-and-shipping">
              {if $product.has_discount}
              {* {var_export($product)} *}
                {hook h='displayProductPriceBlock' product=$product type="old_price"}
                <span class="regular-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction, 'EUR')} </span><span class="inclusive-price" data-product-id="{$product.id_product}"> {$product.price} {l s='Incl btw' d='Shop.Theme.Catalog'}</span><br>
                <span class="exclusive-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')} {l s='Excl btw' d='Shop.Theme.Catalog'}</span>
              {else}
              {hook h='displayProductPriceBlock' product=$product type="before_price"}
              <span class="regular-price" data-product-id="{$product.id_product}"></span><span class="inclusive-price" data-product-id="{$product.id_product}">{$product.regular_price} {l s='Incl btw' d='Shop.Theme.Catalog'}</span><br>
              <span class="exclusive-price" data-product-id="{$product.id_product}">{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')} {l s='Excl btw' d='Shop.Theme.Catalog'}</span>

              {hook h='displayProductPriceBlock' product=$product type='unit_price'}

              {hook h='displayProductPriceBlock' product=$product type='weight'}
              {/if}
            </div>
          {/if}
        {/block}
              </td>
            </tr>
          </table>
        {/if}
      </div>
      <div class="product_buttons col-6 col-md-1 p-md-0 pl-0">
        {if !Configuration::get('PS_CATALOG_MODE')}
        <table class="h-100 w-100">
            <tr>
      <td class="align-middle">
                  {block name='product_add_to_cart_product_list'}
                    {include file='catalog/_partials/product-add-to-cart-mini.tpl' product=$product configuration=$configuration}
                  {/block}
      </td>
    </tr>
  </table>
{/if}

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
