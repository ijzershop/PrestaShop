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
<div class="product-line-grid col-12">
    {assign var="has_remaining_stock" value=json_decode(Product::hasMaxProductsRemainingStock($product.id_product, 50))}
  <div class="row">
    <!--  product left content: image-->
    <div class="product-line-grid-left col-12 col-sm-3 col-md-3 col-lg-3">
      <a
        class="remove-from-cart text-dark pr-3 d-block d-sm-none"
        rel="nofollow"
        href="{$product.remove_from_cart_url}"
        data-link-action="delete-from-cart"
        data-id-product="{$product.id_product|escape:'javascript'}"
        data-id-product-attribute="{$product.id_product_attribute|escape:'javascript'}"
        data-id-customization="{$product.id_customization|escape:'javascript'}"
      >
          {if !isset($product.is_gift) || !$product.is_gift}
            <i class="fa-sharp fa-times float-right"></i>
          {/if}
      </a>
      <span class="product-image media-middle row mx-auto">
      {if isset($product.cover.bySize.medium_default.url)}
        <img src="{$product.cover.bySize.medium_default.url}" class="col-12 mx-auto"
             alt="{$product.name|escape:'quotes'}" style="max-width:200px">
      {/if}
    </span>
    </div>
    <!--  product left body: description -->
    <div class="product-line-grid-body col-12 col-sm-9 col-md-9 col-lg-9 pl-lg-0 text-center text-sm-left">
      <div class="row">
        <div class="product-line-info col-12 col-sm-7 col-md-7 col-lg-7 pl-3 pr-3 pl-sm-0 pr-sm-0 pt-2">
          <a class="label text-decoration-none text-dark" href="{$product.url}"
             data-id_customization="{$product.id_customization|intval}">{$product.name}</a>
          <div class="product-line-info product-price {if $product.has_discount}has-discount{/if}">
              {if $product.has_discount}
                <div class="product-discount">
                  <span
                    class="regular-price pr-2">{Context::getContext()->currentLocale->formatPrice($product.price_without_reduction_without_tax, 'EUR')}</span>
                  <span
                    class="product-price pr-2">{Context::getContext()->currentLocale->formatPrice($product.price_with_reduction_without_tax, 'EUR')}</span>
                </div>
              {/if}
          </div>
        </div>
        <!--  product left body: description -->
        <div class="product-line-grid-right product-line-actions col-12 col-sm-5 col-md-5 col-lg-5">
          <div class="row">
            <div class="col-md-10 col-sm-10 col-12 pl-3 pl-sm-2 pr-3 pr-sm-2">
              <div class="row">
                <div class="col-12 col-sm-6 qty">
                    {if isset($product.is_gift) && $product.is_gift}
                      <span class="gift-quantity">{$product.quantity}</span>
                    {else}
                      <input
                        onclick="this.select()"
                        class="js-cart-line-product-quantity form-control"
                        data-down-url="{$product.down_quantity_url}"
                        data-up-url="{$product.up_quantity_url}"
                        data-update-url="{$product.update_quantity_url}"
                        data-product-id="{$product.id_product}"
                        type="text"
                        value="{$product.quantity}"
                        data-current-value="{$product.quantity}"
                        name="product-quantity-spin"
                        min="{$product.minimal_quantity}"
                        {if  $has_remaining_stock->is_orderable && $has_remaining_stock->remaining_qty_msg != ''}max="{$has_remaining_stock->remaining_stock}"{/if}
                        pattern="\d*"
                      />
                    {/if}
                </div>
                <div class="col-12 col-sm-6 price pl-0">
            <span class="product-price" style="line-height: 38px;">
              <strong>
                {if isset($product.is_gift) && $product.is_gift}
                  <span class="gift">{l s='Gift' d='Shop.Theme.Checkout'}</span>

{else}

                  <span class="product-price">
                    {Context::getContext()->currentLocale->formatPrice($product.price_with_reduction_without_tax*$product.quantity, 'EUR')}
                  </span>

{if $product.has_discount}
                  <br>
                  <span class="regular-price">
                      {Context::getContext()->currentLocale->formatPrice($product.price_without_reduction_without_tax*$product.quantity, 'EUR')}
                    </span>
                {/if}
                {/if}
              </strong>
            </span>
                </div>
                  {if $has_remaining_stock->is_orderable}
                      {$has_remaining_stock->remaining_qty_msg nofilter}
                  {/if}
              </div>
            </div>
            <div class="col-2 text-xs-right pl-0 pt-2 d-none d-sm-block">
              <div class="cart-line-product-actions">
                <a
                  class="remove-from-cart text-dark"
                  rel="nofollow"
                  href="{$product.remove_from_cart_url}"
                  data-link-action="delete-from-cart"
                  data-id-product="{$product.id_product|escape:'javascript'}"
                  data-id-product-attribute="{$product.id_product_attribute|escape:'javascript'}"
                  data-id-customization="{$product.id_customization|escape:'javascript'}"
                >
                    {if !isset($product.is_gift) || !$product.is_gift}
                      <i class="fa-sharp fa-times float-xs-left"></i>
                    {/if}
                </a>
                  {block name='hook_cart_extra_product_actions'}
                      {hook h='displayCartExtraProductActions' product=$product}
                  {/block}
              </div>
            </div>
          </div>
        </div>
        <div class="product-line-grid-right product-line-actions pl-0 pt-1 col-12 float-right">
            {foreach from=$product.attributes key="attribute" item="value"}
                {if !in_array($attribute, AttributeGroup::getSawCutModuleAttributeGroupNames(Context::getContext()->cookie->id_lang))}
                  <tr class="small_cart_attr_attr font-italic">
                    <td class="small_cart_attr_k font-italic">{$attribute}:</td>
                    <td class="value font-italic">{$value}</td>
                  </tr>
                {/if}
            {/foreach}
            {if is_array($product.customizations) && $product.customizations|count}
                {block name='cart_detailed_product_line_customization'}
                    {foreach from=$product.customizations item="customization"}
                        {foreach from=$customization.fields item="field"}
                          <div class="w-100">
                              {if $field.label === 'zaaginstructies' || $field.label === 'instructies' || $field.label === 'knipinstructies'}
                                <div class="col-12 pl-0 font-italic">{$field.label}: {$field.text nofilter} (± 5mm)
                                </div>
                              {else}
                                <div class="font-italic">{$field.label}</div>
                                  {if $field.type == 'text'}
                                    <div class="font-italic">{$field.text nofilter}</div>
                                  {elseif $field.type == 'image'}
                                    <div><img src="{$field.image.small.url}" alt="{$field.label}"/></div>
                                  {/if}
                              {/if}
                          </div>
                        {/foreach}
                    {/foreach}
                {/block}
            {/if}
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <hr class="text-dark" style="opacity: 0.8"></hr>
