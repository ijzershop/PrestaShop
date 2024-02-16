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
  <article
    class="product-miniature js-product-miniature d-flex d-md-none border-bottom row pt-2 pt-sm-1 pb-1 ml-sm-1 mr-sm-2 m-0"
    id="product_{$product.id_product}" data-id-product="{$product.id_product}"
    data-id-product-attribute="{$product.id_product_attribute}">
      {assign var="productFeatures" value=unserialize(Configuration::get('SAWANDCUTMODULE'))}
      {assign var="sawButtonVisible" value=in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}
    <div style="{if $sawButtonVisible}min-height: 55px;{else}min-height: 105px;{/if}"
         class="product-description col-12 {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}col-sm-8 {if Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')}col-md-7{elseif Configuration::get('PS_CATALOG_MODE') && !Configuration::get('PS_CATALOG_MODE_WITH_PRICES')}col-md-9{else}col-md-4{/if}{else} {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) == 'col-sm-4 col-md-2'}col-sm-8 col-md-5{else}col-sm-4 col-md-4{/if}{/if} pl-0  pl-sm-2 pr-0 mb-0 mb-sm-3 mb-md-0 float-right">
        {block name='product_name'}
          <table class="h-100 w-100">
            <tr>
              <td class="align-middle">
                  {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                      {assign var="dynamicProductConfig" value=Module::getInstanceByName('modernesmiddynamicproduct')->returnProductInitData($product)}
                    <span class="h6 product-title p-0" data-id-product="{$product.id_product}"><a
                        class="text-decoration-none text-black" href="{$product.url}">{$product.name}</a></span>
                    <br/>
                    <a class="help-text product-description-short">Indicatie prijs
                      € {$dynamicProductConfig.default_price} is op basis van {$dynamicProductConfig.lengte}
                      mm {$dynamicProductConfig.behandeling} {$product.name}</a>
                    <br/>
                    <span class="product-description-short">{$product.description_short nofilter}</span>
                  {else}
                    <span class="h6 product-title p-0" data-id-product="{$product.id_product}"><a
                        class="text-decoration-none text-black" href="{$product.url}">{$product.name}</a></span>
                    <br/>
                    <span class="product-description-short">{$product.description_short nofilter}</span>
                  {/if}
              </td>
            </tr>
          </table>
        {/block}
    </div>
    <div class="thumbnail-container col-12">
      <div class="row d-block d-md-flex">
          {block name='product_thumbnail'}
            <div
              class="col-5 {Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id,'col-sm-4 col-md-2')} pl-0 pr-2 float-left"
              {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)=='col-sm-4 col-md-1'}style="max-width: 110px;margin:0 auto;"{/if}>
                {if $product}
                  <a href="{$product.url}" class="thumbnail product-thumbnail d-block d-md-flex" data-id-product="{$product.id_product}" style="margin-top: 2.8em;">
                    <img data-product-id="{$product.id_product}" class="w-100 thumb"
                         src="{$product.cover.bySize.medium_default.url}"
                         alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
                         data-full-size-image-url="{$product.cover.large.url}"/>
                  </a>
                {else}
                  <a href="{$product.url}" class="thumbnail product-thumbnail" data-product-id="{$product.id_product}"
                     data-id-product="{$product.id_product}">
                    <img src="{$urls.no_picture_image.bySize.medium_default.url}"/>
                  </a>
                {/if}
            </div>
          {/block}
          {if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')}
            <div
              class="product-price col-7 d-flex d-sm-flex d-md-none {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}col-sm-8{/if} col-md-2 pr-2 float-right text-right text-sm-right">
              <table class="h-100 w-100">
                <tr>
                  <td class="align-right">
                      {block name='product_price_and_shipping'}
                          {if $product.show_price}
                            <div class="product-price-and-shipping">
                                {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                                    {assign var="productPrices" value=Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($product, $product.id_attribute)}
                                    {if $product.has_discount}
                                        {hook h='displayProductPriceBlock' product=$product type="old_price"}
                                      <span class="regular-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} {else} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {/if} </span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}"> {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc ,'EUR')} </span>
                                      <br>
                                    {else}
                                        {hook h='displayProductPriceBlock' product=$product type="before_price"}
                                      <span class="regular-price" data-product-id="{$product.id_product}"></span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} {else} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {/if}</span>
                                      <br>
                                        {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                                        {hook h='displayProductPriceBlock' product=$product type='weight'}
                                    {/if}
                                {else}
                                    {if $product.has_discount}
                                        {hook h='displayProductPriceBlock' product=$product type="old_price"}
                                      <span class="regular-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction, 'EUR')}{else}{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')}{/if} </span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}"> {Context::getContext()->currentLocale->formatPrice($product.price, 'EUR')} </span>
                                      <br>
                                    {else}
                                        {hook h='displayProductPriceBlock' product=$product type="before_price"}
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{$product.regular_price}{else}{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')}{/if}  </span>
                                      <br>
                                        {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                                        {hook h='displayProductPriceBlock' product=$product type='weight'}
                                    {/if}
                                {/if}
                            </div>
                          {/if}
                      {/block}
                  </td>
                </tr>
                <tr>
                  <td>


                  </td>
                </tr>
              </table>
            </div>
          {/if}


        <div class="product_buttons col-7 col-sm-8 col-md-3 p-0 pt-2 pt-sm-2 pt-md-0  float-right">
          <table class="h-100 w-100"
                 {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) == 'col-sm-8 col-md-4'}style="margin-right:0px"{/if}>
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
        <div class="product_variations col-8">
          <div class="highlighted-informations{if !$product.main_variants} no-variants{/if} hidden-sm-down">
              {block name='product_variants'}
                  {if $product.main_variants}
                      {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
                  {/if}
              {/block}
          </div>
        </div>


          {if !Configuration::get('PS_CATALOG_MODE')}
              {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}
                <div class="pl-0 pl-sm-2 pr-0 col-7 col-sm-8 col-md-1 float-right mb-3 mb-sm-3 mb-md-0"
                     style="pointer-events:{if !$product.add_to_cart_url}none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') &&  (int)$product.quantity <= 0 && (int)$product.out_of_stock == 0}none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') && (int)$product.quantity != 0 && (int)$product.quantity < 100 && (int)$product.quantity < 0 && (int)$product.out_of_stock == 0}none;{/if}">
                    {hook h='displayProductSawAndCutButtons' product=$product}
                </div>
              {/if}
          {/if}


        <div class="pl-0 pl-sm-2 pr-0 col-7 col-sm-8 mb-3 mb-sm-3 mb-md-0 float-right d-flex d-sm-flex d-md-none">
          <a href="{$product.url}" type="button" class="btn staffel-button text-center">
            <i class="fasl fa-info-circle"></i> Bekijk info
          </a>
        </div>



      </div>
    </div>
  </article>
  <article
    class="product-miniature js-product-miniature d-none d-md-flex border-bottom row pt-2 pt-sm-1 pb-1 ml-sm-1 mr-sm-2 m-0"
    id="product_{$product.id_product}" data-id-product="{$product.id_product}"
    data-id-product-attribute="{$product.id_product_attribute}">
    <div class="thumbnail-container col-12">
      <div class="row d-block d-md-flex">
          {block name='product_thumbnail'}
            <div
              class="col-6 {Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id,'col-sm-4 col-md-2')} pl-0 pr-2 float-left"
              {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)=='col-sm-4 col-md-1'}style="max-width: 110px;margin:0 auto;"{/if}>
                {if $product}
                  <a href="{$product.url}" class="thumbnail product-thumbnail" data-id-product="{$product.id_product}">
                    <img data-product-id="{$product.id_product}" class="w-100 thumb"
                         src="{$product.cover.bySize.medium_default.url}"
                         alt="{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
                         data-full-size-image-url="{$product.cover.large.url}"/>
                  </a>
                {else}
                  <a href="{$product.url}" class="thumbnail product-thumbnail" data-product-id="{$product.id_product}"
                     data-id-product="{$product.id_product}">
                    <img src="{$urls.no_picture_image.bySize.medium_default.url}"/>
                  </a>
                {/if}
              <!-- @todo: use include file='catalog/_partials/product-flags.tpl'} -->
                {* {block name='product_flags'}
                <ul class="product-flags position-absolute list-unstyled">
                  {foreach from=$product.flags item=flag}
                  <li class="badge badge-danger product-flag {$flag.type}">{$flag.label}</li>
                  {/foreach}
                </ul>
                {/block} *}
            </div>
          {/block}
          {assign var="productFeatures" value=unserialize(Configuration::get('SAWANDCUTMODULE'))}
          {assign var="sawButtonVisible" value=in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}
        <div style="{if $sawButtonVisible}min-height: 55px;{else}min-height: 105px;{/if}"
             class="product-description col-12 {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}col-sm-8 {if Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')}col-md-7{elseif Configuration::get('PS_CATALOG_MODE') && !Configuration::get('PS_CATALOG_MODE_WITH_PRICES')}col-md-9{else}col-md-4{/if}{else} {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) == 'col-sm-4 col-md-2'}col-sm-8 col-md-5{else}col-sm-4 col-md-4{/if}{/if} pl-0  pl-sm-2 pr-0 mb-3 mb-sm-3 mb-md-0 float-right">
            {block name='product_name'}
              <table class="h-100 w-100">
                <tr>
                  <td class="align-middle">
                      {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                          {assign var="dynamicProductConfig" value=Module::getInstanceByName('modernesmiddynamicproduct')->returnProductInitData($product)}
                        <span class="h6 product-title p-0" data-id-product="{$product.id_product}"><a
                            class="text-decoration-none text-black" href="{$product.url}">{$product.name}</a></span>
                        <br/>
                        <a class="help-text product-description-short">Indicatie prijs
                          € {$dynamicProductConfig.default_price} is op basis van {$dynamicProductConfig.lengte}
                          mm {$dynamicProductConfig.behandeling} {$product.name}</a>
                        <br/>
                        <span class="product-description-short">{$product.description_short nofilter}</span>
                      {else}
                        <span class="h6 product-title p-0" data-id-product="{$product.id_product}"><a
                            class="text-decoration-none text-black" href="{$product.url}">{$product.name}</a></span>
                        <br/>
                        <span class="product-description-short">{$product.description_short nofilter}</span>
                      {/if}
                  </td>
                </tr>
              </table>
            {/block}
        </div>
        <div class="pl-0 pl-sm-2 pr-0 col-sm-8 mb-3 mb-sm-3 mb-md-0 float-right d-flex d-sm-flex d-md-none">
          <a href="{$product.url}" type="button" class="btn staffel-button text-center">
            <i class="fasl fa-info-circle"></i> Bekijk info
          </a>
        </div>
          {if !Configuration::get('PS_CATALOG_MODE')}
              {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}
                <div class="pl-0 pl-sm-2 pr-0 col-12 col-sm-8 col-md-1 float-right mb-3 mb-sm-3 mb-md-0"
                     style="pointer-events:{if !$product.add_to_cart_url}none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') &&  (int)$product.quantity <= 0 && (int)$product.out_of_stock == 0}none;{elseif Configuration::get('PS_STOCK_MANAGEMENT') && (int)$product.quantity != 0 && (int)$product.quantity < 100 && (int)$product.quantity < 0 && (int)$product.out_of_stock == 0}none;{/if}">
                    {hook h='displayProductSawAndCutButtons' product=$product}
                </div>
              {/if}
          {/if}

          {if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')}
            <div
              class="product-price col-12 d-flex d-sm-none d-md-block {if in_array((int)$productFeatures.id_attribute_group,array_keys($product->getAttributes())) || in_array((int)$productFeatures.id_attribute_group_cut,array_keys($product->getAttributes())) || !empty(SpecificPrice::getByProductId($product->id_product))}col-sm-8{/if} col-md-2 pr-2 float-right text-center text-sm-right">
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
                                      <span class="regular-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} {else} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {/if} </span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}"> {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc ,'EUR')} </span>
                                      <br>
                                    {else}
                                        {hook h='displayProductPriceBlock' product=$product type="before_price"}
                                      <span class="regular-price" data-product-id="{$product.id_product}"></span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} {else} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {/if}</span>
                                      <br>
                                        {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                                        {hook h='displayProductPriceBlock' product=$product type='weight'}
                                    {/if}
                                {else}
                                    {if $product.has_discount}
                                        {hook h='displayProductPriceBlock' product=$product type="old_price"}
                                      <span class="regular-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction, 'EUR')}{else}{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')}{/if} </span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}"> {Context::getContext()->currentLocale->formatPrice($product.price, 'EUR')} </span>
                                      <br>
                                    {else}
                                        {hook h='displayProductPriceBlock' product=$product type="before_price"}
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{$product.regular_price}{else}{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')}{/if}  </span>
                                      <br>
                                        {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                                        {hook h='displayProductPriceBlock' product=$product type='weight'}
                                    {/if}
                                {/if}
                            </div>
                          {/if}
                      {/block}
                  </td>
                </tr>
                <tr>
                  <td>


                  </td>
                </tr>
              </table>
            </div>
          {/if}
        <div class="product_buttons col-12 col-sm-8 col-md-3 p-0 pt-2 pt-sm-2 pt-md-0  float-right">
          <table class="h-100 w-100"
                 {if Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) == 'col-sm-8 col-md-4'}style="margin-right:0px"{/if}>
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
              {if !Product::productIsOrderable($product.id_product)}
                <tr class="d-block d-md-none">
                  <td>
                    <div class="w-100">

                        {*                    Dit product is momenteel niet op vooraad, <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}"vertical-align: top;width:20%;>neem contact met ons op</a> of <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}"vertical-align: top;width:20%;>vraag een offerte aan</a> voor een alternatief en/of de mogelijke levertijden*}
                      <span class="help-text text-warning">
                      <span class="d-inline-block" data-toggle="popover" data-content="Disabled popover">
                        <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Geen Vooraad</button>
                      </span>
                    </span>
                    </div>
                  </td>
                </tr>
              {/if}
          </table>
        </div>
          {if !Product::productIsOrderable($product.id_product)}
            <div class="col-12 d-none d-md-block">
              <div class="w-100">
              <span class="help-text text-warning">
                      <span class="d-inline-block" data-toggle="popover" data-content="Disabled popover">
                        <button class="btn btn-primary" style="pointer-events: none;" type="button" disabled>Geen Vooraad</button>
                      </span>
              </span>
              </div>
            </div>
          {/if}
        <div class="product_variations col-12">
          <div class="highlighted-informations{if !$product.main_variants} no-variants{/if} hidden-sm-down">
              {block name='product_variants'}
                  {if $product.main_variants}
                      {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
                  {/if}
              {/block}
          </div>
        </div>


          {if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')}
            <div
              class="product-price col-12 d-none d-sm-flex d-md-none pt-1 col-sm-4 col-md-2 pr-0 float-left text-center text-sm-right">
              <table class="h-100 w-100">
                <tr>
                  <td class="align-middle text-center text-sm-right">
                      {block name='product_price_and_shipping'}
                          {if $product.show_price}
                            <div class="product-price-and-shipping">
                                {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                                    {assign var="productPrices" value=Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($product, $product.id_attribute)}
                                    {if $product.has_discount}
                                        {hook h='displayProductPriceBlock' product=$product type="old_price"}
                                      <span class="regular-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} {else} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {/if} </span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}"> {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc ,'EUR')} </span>
                                      <br>
                                    {else}
                                        {hook h='displayProductPriceBlock' product=$product type="before_price"}
                                      <span class="regular-price" data-product-id="{$product.id_product}"></span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ttc_nr, 'EUR')} {else} {Context::getContext()->currentLocale->formatPrice($productPrices.final_prices.price_ht_nr, 'EUR')} {/if}</span>
                                      <br>
                                        {hook h='displayProductPriceBlock' product=$product type='unit_price'}
                                        {hook h='displayProductPriceBlock' product=$product type='weight'}
                                    {/if}
                                {else}
                                    {if $product.has_discount}
                                        {hook h='displayProductPriceBlock' product=$product type="old_price"}
                                      <span class="regular-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction, 'EUR')}{else}{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')}{/if} </span>
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}"> {Context::getContext()->currentLocale->formatPrice($product.price, 'EUR')} </span>
                                      <br>
                                    {else}
                                        {hook h='displayProductPriceBlock' product=$product type="before_price"}
                                      <span class="inclusive-price"
                                            data-product-id="{$product.id_product}">{if Context::getContext()->cookie->price_vat_settings_incl === "true"}{$product.regular_price}{else}{Context::getContext()->currentLocale->formatPrice(Product::getPriceStatic($product.id_product, false), 'EUR')}{/if}  </span>
                                      <br>
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
          {/if}


      </div>
    </div>
  </article>
{/block}
