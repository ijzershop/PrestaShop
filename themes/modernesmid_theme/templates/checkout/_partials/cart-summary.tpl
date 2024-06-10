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
<style>
  .dp_seven_cart {
    font-size: 0.8rem;
  }
  .dp_url{
    display:none;
  }
</style>

<section id="js-checkout-summary" class="js-cart" data-refresh-url="{$urls.pages.cart}?ajax=1&action=refresh">
  <div class="card">
    <div class="card-body">
      {block name='hook_checkout_summary_top'}
        {hook h='displayCheckoutSummaryTop'}
      {/block}

      {block name='cart_summary_products'}
        <div class="cart-summary-products cart-summary-line">
          <span class="label" style="font-size: .8rem;">{if (int)$cart.products_count > 1}Producten{else}Product{/if} ({$cart.products_count})</span>
            <a href="#" data-toggle="collapse" class="text-dark text-decoration-none"  style="font-size: .8rem;" data-target="#cart-summary-product-list"><i class="fasl fa-chevron-up"></i></a>
          <small class="float-right"  style="font-size: .8rem;">{{Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS), 'EUR')}}</small>

          {block name='cart_summary_product_list'}
            <div class="collapse show" id="cart-summary-product-list">
              <ul class="media-list list-unstyled row">
                {assign var='totalForAllProducts' value=0}
                {foreach from=$cart.products item=product key=key}
                    {assign var='productTotal' value=$product.price_with_reduction_without_tax * $product.quantity}
                    {assign var='totalForAllProducts' value=$totalForAllProducts + $productTotal}
                  <li class="media col-12 {if $key > 0}border-top{/if} p-1 pt-2">{include file='checkout/_partials/cart-summary-product-line.tpl' product=$product}</li>
                {/foreach}
              </ul>
            </div>
          {/block}
        </div>
      {/block}


      {block name='cart_summary_totals'}
       <div class="cart-summary-line summary-total-discount">
        <span class="label">
          {if Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id) || Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}
            Bezorging
          {elseif Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}
            Afhalen
          {else}
            Toevoegen
          {/if}
        </span>
        <span class="value price">{if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}
            {Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING), 'EUR')}
          {else}{Context::getContext()->currentLocale->formatPrice("0.00", 'EUR')}{/if}</span>
       </div>
        {include file='checkout/_partials/cart-summary-totals.tpl' cart=$cart}
      {/block}
    </div>
  </div>
</section>
