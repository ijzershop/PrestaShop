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
  {extends file=$layout}
  {block name='head_seo' prepend}
  <link rel="canonical" href="{$product.canonical_url}">
  {/block}
  {block name='head' append}
  <meta property="og:type" content="product">
  <meta property="og:url" content="{$urls.current_url}">
  <meta property="og:title" content="{$page.meta.title}">
  <meta property="og:site_name" content="{$shop.name}">
  <meta property="og:description" content="{$page.meta.description}">
  <meta property="og:image" content="{$product.cover.large.url}">
  {if $product.show_price}
  <meta property="product:pretax_price:amount" content="{$product.price_tax_exc}">
  <meta property="product:pretax_price:currency" content="{$currency.iso_code}">
  <meta property="product:price:amount" content="{$product.price_amount}">
  <meta property="product:price:currency" content="{$currency.iso_code}">
  {/if}
  {if isset($product.weight) && ($product.weight != 0)}
  <meta property="product:weight:value" content="{$product.weight}">
  <meta property="product:weight:units" content="{$product.weight_unit}">
  {/if}
  {/block}
  {block name='content'}
  <section class="row">
    <div class="col-12">
      {include file='custom_blocks/notification.tpl'}
      <div class="row">
        <div class="col-12 col-lg-5">
          {block name='page_content_container'}
          <section class="page-content" id="content">
            {block name='page_content'}
            {block name='product_cover_thumbnails'}
            {include file='catalog/_partials/product-cover-thumbnails.tpl'}
            {/block}
            {*
            <!-- @todo: use include file='catalog/_partials/product-flags.tpl'} -->
            {block name='product_flags'}
            <ul class="product-flags">
              {foreach from=$product.flags item=flag}
              <li class="product-flag {$flag.type}">{$flag.label}</li>
              {/foreach}
            </ul>
            {/block} *}
            {/block}
          </section>
          {/block}
        </div>
        <div class="col-12 col-lg-7 mt-4 mt-lg-0">
          <div class="row">
            <div class="col-12">
              {block name='page_header_container'}
              {block name='page_header'}
              <h1 class="h3">{block name='page_title'}{$product.name}{/block}</h1>
              {/block}
              {/block}
            </div>
            <div class="col-12">
              <div class="product-information row">
                <div class="col-12 col-sm-9">
                  {block name='product_description_short'}
                  <div id="product-description-short-{$product.id}">{if !empty($product.description_short)}{$product.description_short nofilter}{else}<span class="d-none">null<span>{/if}</div>
                  {/block}
                </div>
                <div class="col-12 col-sm-3 align-right">
                  {hook h='displayRating' product=$product withtext=false}
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-6 col-md-5">
                    {if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')}
                      {block name='product_prices'}
                      {include file='catalog/_partials/product-prices.tpl'}
                      {/block}
                    {/if}
                    </div>
                    <div class="col-6 col-md-4">
                      {if $product.quantity_discounts}
                      <div class="row">
                        <table class="border-0 w-100">
                          <tr>
                            <td>
                              <span class="info-icon-with-showhide" data-id="product-staffelinfo-1">
                                <i class="icon-info cart-info-btn ml-2"></i>
                              </span>
                            </td>
                            <td>
                              <span class="discount" style="font-size:14px;font-weight:600;">
                                {if $product.quantity_discounts}
                                {if $product.discount_type === 'percentage'}
                                <span class="discount discount-percentage">{l s='Krijg %percentage%' d='Shop.Theme.Catalog' sprintf=['%percentage%' => $product.discount_percentage_absolute]}</span>
                                {else}
                                <span class="discount discount-amount">
                                  {l s='Krijg %amount%' d='Shop.Theme.Catalog' sprintf=['%amount%' => $product.discount_to_display]}
                                  {/if}
                                  {if $product.quantity_discounts[0].quantity > 1}
                                  {(float)$product.quantity_discounts[0].reduction*100}% korting <br />
                                  vanaf {$product.quantity_discounts[0].quantity} stuks
                                  {else}
                                  {(float)$product.quantity_discounts[0].reduction*100}%} korting <br />
                                  vanaf {$product.quantity_discounts[0].quantity} stuks
                                  {/if}
                                  {/if}
                                </span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2">
                              <div style="display:none;" class="border-bottom-0 pb-1 row" id="product-staffelinfo-1">
                                <span class="col-12 text-left width-100" style="color:blue">
                                  Bij sommige producten ontvangt u korting als u meer dan 5 of 10 bestelt. Dit is de staffelkorting.
                                </span>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      {/if}
                    </div>
                    <div class="product-actions col-12 col-sm-3">
                      {block name='product_buy'}
                      <form action="{$urls.pages.cart}" method="post" id="add-to-cart-or-refresh">
                        <input type="hidden" name="token" value="{$static_token}">
                        <input type="hidden" name="id_product" value="{$product.id}" id="product_page_product_id">
                        <input type="hidden" name="id_customization" value="{$product.id_customization}" id="product_customization_id">
                        {if !Module::isEnabled('dynamicproduct') || !Product::isDynamicProduct($product)}
                        {block name='product_pack'}
                        {if $packItems}
                        <section class="product-pack">
                          <p class="h4">{l s='This pack contains' d='Shop.Theme.Catalog'}</p>
                          {foreach from=$packItems item="product_pack"}
                          {block name='product_miniature'}
                          {include file='catalog/_partials/miniatures/pack-product.tpl' product=$product_pack}
                          {/block}
                          {/foreach}
                        </section>
                        {/if}
                        {/block}
                        {block name='product_add_to_cart'}
                        {include file='catalog/_partials/product-add-to-cart.tpl'}
                        {/block}
                        {block name='product_refresh'}{/block}
                        {/if}
                      </form>
                      {/block}
                    </div>
                  </div>
                  {if !Configuration::get('PS_CATALOG_MODE')}
                  {if Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($product)}
                    {* dynamic product *}
                    {hook h="displayDynamicProductForm" product=$product}
                  {else}
                  <div class="row">
                    <div class="add col-12">
                      <a class="btn btn-success add-to-cart w-100 {if !$product.add_to_cart_url}disabled{elseif !$product.available_for_order}disabled{/if}" data-button-action="add-to-cart" data-product-id="{$product.id_product}" type="button" {if !$product.add_to_cart_url} disabled {/if} href="{$link->getPageLink('cart')}?token={$static_token}">
                        <i class="fass fa-shopping-cart shopping-cart" data-product-id="{$product.id_product}"></i>
                        <span class="d-none d-sm-inline"> {l s='Add to cart' d='Shop.Theme.Actions'} </span>
                      </a>
                    </div>
                    {if !$product.add_to_cart_url || !$product.available_for_order}
                      <div class="col-12">
                        <span class="help-text text-warning">Dit product is momenteel niet op vooraad, <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE')}"vertical-align: top;width:20%;>neem contact met ons op</a> of <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE')}"vertical-align: top;width:20%;>vraag een offerte aan</a> voor een alternatief en/of de mogelijke levertijden</span>
                      </div>
                    {/if}
                  </div>
                  {/if}
                  <div class="row">
                    <div class="col-12">
                      <div class="border-bottom pt-3"></div>
                    </div>
                  </div>
                  <div class="row" {if !$product.add_to_cart_url || !$product.available_for_order}style="pointer-events:none;" {/if}>
                    <div class="col-12 pt-3">
                      {hook h='displayProductSawAndCutButtons' product=$product}
                    </div>
                  </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 border-bottom pt-3 pb-4">
          {if !empty($product.description)}
            {block name='product_description'}
              <div class="product-description border-bottom pb-4 pt-4 row">
{*                <span class="description-title font-weight-bold h5 col-12">Beschrijving</span>*}
                <div class="col-12">{$product.description nofilter}</div>
              </div>
            {/block}
          {else}
            {block name='product_description'}
{*              <div class="product-description border-bottom row">*}
{*                <span class="description-title font-weight-bold h5 col-12"></span>*}
{*                <div class="col-12"></div>*}
{*              </div>*}
            {/block}
          {/if}

          {if Configuration::get('SHOW_PRODUCT_FEATURES') === 'category'}
              {assign var='cat' value=Category::getNestedCategories($product.id_category_default)}
              {if is_null($cat[$product.id_category_default].top_description)}
              {assign var='catParent' value=Category::getNestedCategories($cat[$product.id_category_default].id_parent)}
              {if !is_null($catParent[$cat[$product.id_category_default].id_parent].top_description)}
              {foreach from=$product.images item=image key=key}
              {if strpos($image.legend, 'techntabel') != false}
              {assign var="technImage" value=$image}
              {/if}
              {/foreach}
              <div class="row">
                <span class="description-title font-weight-bold h5 col-12 pt-4">Technische gegevens</span>
                {if isset($technImage)}
                <div class="col-12 col-sm-4">
                  <img src="{$technImage.bySize.home_default.url}" alt="{$product.name} technische afbeelding" title="{$product.name} technische afbeelding" width="100" class="img-responsive w-100">
                </div>
                {/if}
                <div class="col-12 {if isset($technImage)} col-sm-8 {else} col-sm-12 {/if}">
                  {html_entity_decode($catParent[$cat[$product.id_category_default].id_parent].top_description) nofilter}
                </div>
              </div>
              {/if}
              {else}
              {foreach from=$product.images item=image key=key}
              {if strpos($image.legend, 'techntabel') != false}
              {assign var="technImage" value=$image}
              {/if}
              {/foreach}
              <div class="row">
                <span class="description-title font-weight-bold h5 col-12 pt-4">Technische gegevens</span>
                {if isset($technImage)}
                <div class="col-12 col-sm-4">
                  <img src="{$technImage.bySize.home_default.url}" alt="{$product.name} technische afbeelding" title="{$product.name} technische afbeelding" width="100" class="img-responsive w-100">
                </div>
                {/if}
                <div class="col-12 {if isset($technImage)} col-sm-8 {else} col-sm-12 {/if}">
                  {html_entity_decode($cat[$product.id_category_default].top_description) nofilter}
                </div>
              </div>
              {/if}
          {else}


            {foreach from=$product.images item=image key=key}
              {if strpos($image.legend, 'techntabel') != false}
                {assign var="technImage" value=$image}
              {/if}
            {/foreach}
            <div class="row">
              {if isset($technImage)}
                <span class="description-title font-weight-bold h5 col-12 pt-4">Technische gegevens</span>
              {/if}
              {if isset($technImage)}
              <div class="col-12 col-md-12">
                <img src="{$technImage.bySize.home_default.url}" alt="{$product.name}"
                     title="{$product.name}" width="100"
                     class="img-responsive w-100">
              </div>
              {/if}
              <div class="col-12 {if isset($technImage)} col-md-12 {else} col-sm-12 {/if}">
                <div class="table-responsive">
                  <table class="table table-striped table-hover table-sm">
                    <tbody>
                    {assign var="enabledFeatures" value=Configuration::get('MSTHEMECONFIG_FEATURE_ENABLED')}
                    {assign var="enabledFeaturesList" value=""}
                    {if $enabledFeatures}
                      {assign var="enabledFeaturesList" value=explode(",", $enabledFeatures)}
                    {/if}
                    {assign var="sizeString" value=""}
                    {assign var="width" value=""}
                    {assign var="height" value=""}
                    {assign var="weight" value=""}
                    {assign var="length" value=""}
                    {foreach from=$product.grouped_features item=feature}
                      {if is_array($enabledFeaturesList) && in_array($feature.id_feature, $enabledFeaturesList) || empty($enabledFeaturesList)}
                        {if $feature.id_feature == Configuration::get('MSTHEMECONFIG_FEATURE_WIDTH')}
                          {assign var="width" value=$feature.value}
                        {elseif $feature.id_feature == Configuration::get('MSTHEMECONFIG_FEATURE_HEIGHT')}
                          {assign var="height" value=$feature.value}

                        {elseif $feature.id_feature == Configuration::get('MSTHEMECONFIG_FEATURE_LENGTH')}
                          {assign var="length" value=$feature.value}

                        {elseif $feature.id_feature == Configuration::get('MSTHEMECONFIG_FEATURE_WEIGHT')}
                          {assign var="weight" value=$feature.value}
                        {else}
                          <tr>
                            <th style="vertical-align: top;width:20%;">{$feature.name}</th>
                            <td style="vertical-align: top;">{$feature.value|escape:'htmlall'|nl2br nofilter}</td>
                          </tr>
                        {/if}
                      {/if}
                    {/foreach}
                    {if !empty($length) || !empty($width) || !empty($height)}
                    <tr>
                      <th style="vertical-align: top;width:20%;">Formaat ({if !empty($length)}h{/if}{if !empty($width)} x b{/if}{if !empty($height)}x h{/if})</th>
                      <td style="vertical-align: top;">{if !empty($length)}{$length}{/if}{if !empty($width)} x {$width}{/if}{if !empty($height)} x {$height}{/if}</td>
                    </tr>
                    {/if}
                    {if $weight != ""}
                      <tr>
                        <th style="vertical-align: top;width:20%;">Gewicht</th>
                        <td style="vertical-align: top;">{$weight} Kg</td>
                      </tr>
                    {/if}
                    </tbody>
                  </table>
                </div>
              </div>
          {/if}
        </div>
      </div>
    </div>
    {block name='product_accessories'}
    {if $accessories}
    <div class="col-12 border-bottom pb-4">
      <section class="product-accessories clearfix w-100 mt-4 p-0">
        <p style="font-size:15px;font-weight:bold;" class="w-100 m-0 mt-3">Aanbevolen toebehoren voor dit product</p>
        <div class="products col-12 p-0 mx-auto my-auto">
          <div id="accessories-carousel" class="carousel slide w-100" data-ride="false">
            <div class="carousel-inner mx-auto">
              {foreach from=$accessories item=accessory key="index2"}
              {if count($accessory) >= 2}
              <div class="carousel-item {if $index2 == 0}active{/if}">
                <div class="row">
                  {include file="catalog/_partials/miniatures/related_product.tpl" product=$accessory}
                </div>
              </div>
              {/if}
              {/foreach}
            </div>
            <ol class="carousel-indicators">
              {foreach from=$accessories item="product" key="index3"}
              <li data-target="#accessories-carousel" data-slide-to="{$index3}" class="rounded {if $index3 == 0}active{/if}"></li>
              {/foreach}
            </ol>
            <a class="carousel-control-prev" href="#accessories-carousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </a>
            <a class="carousel-control-next" href="#accessories-carousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </a>
          </div>
        </div>
    </div>
  {/if}
    {block name='product_footer'}
      {if !in_array((int)$category->id_category, [6, (int)Configuration::get('MSTHEMECONFIG_CUSTOM_PRODUCT_CATEGORY', Context::getContext()->cookie->id_lang, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id, 382)]) }
    <div class="d-none d-sm-block {if count($category->getProductsNoCurrent(Context::getContext()->language->id, 0, 11, $product.id_product)) > 0}border-bottom{/if} pb-4 w-100">
      {include file="themes/modernesmid_theme/modules/ps_crossselling/views/templates/hook/ps_crossselling.tpl" category=$category}
    </div>
    {/if}
    {/block}
      {hook h='displayFooterProduct' product=$product}
            {if Configuration::get('MSTHEMECONFIG_CATEGORY_SHOW_PRODUCT_PAGE') && Configuration::get('MSTHEMECONFIG_CATEGORY_BOTTOM_TEXT') != ""}
              <div class="row bg-info mt-4">
                <div  class="col-12">

                      {Configuration::get('MSTHEMECONFIG_CATEGORY_BOTTOM_TEXT') nofilter}
                </div>
              </div>
              {/if}


  </section>
  {/block}
  {block name='page_footer_container'}
  <footer class="page-footer">
    {block name='page_footer'}
{*  Product data JSON+ld  *}
<script type="application/ld+json">{$product->jsonld_product_seo nofilter}</script>
{*  Product questions JSON+ld  *}
{if !empty($product->jsonld)}
<script type="application/ld+json">{$product->jsonld nofilter}</script>
{/if}
    {/block}
  </footer>
  {/block}
  </div>
  </section>
  {/block}
