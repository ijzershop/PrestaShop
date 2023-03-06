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
<section id="js-checkout-summary" class="js-cart" data-refresh-url="{$urls.pages.cart}?ajax=1&action=refresh">
  <div class="card">
    <div class="card-body">
      {block name='hook_checkout_summary_top'}
        {hook h='displayCheckoutSummaryTop'}
      {/block}

      {block name='cart_summary_products'}
        <div class="cart-summary-products">
          <span class="label font-weight-bold text-dark">{if (int)$cart.products_count > 1}Producten{else}Product{/if} ({$cart.products_count})</span>  <a href="#" data-toggle="collapse" class="text-dark text-decoration-none" data-target="#cart-summary-product-list"><i class="fasr fa-chevron-down"></i></a>


          {block name='cart_summary_product_list'}
            <div class="collapse" id="cart-summary-product-list">
              <ul class="media-list list-unstyled row">
                {assign var='totalForAllProducts' value=0}
                {foreach from=$cart.products item=product key=key}
                    {assign var='productTotal' value=$product.price_with_reduction_without_tax * $product.quantity}
                    {assign var='totalForAllProducts' value=$totalForAllProducts + $productTotal}
                  <li class="media col-12 {if $key > 0}border-top{/if} pt-1 pb-1">{include file='checkout/_partials/cart-summary-product-line.tpl' product=$product}</li>
                {/foreach}
              </ul>
            </div>
          {/block}
        </div>
      {/block}
    </div>
  </div>
  <div class="card border-0">
    <div class="card-body bg-light">
      {block name='cart_summary_subtotals'}
        {include file='checkout/_partials/cart-summary-subtotals.tpl' cart=$cart totalForAllProducts=$totalForAllProducts}
      {/block}

      {block name='cart_summary_totals'}
        {include file='checkout/_partials/cart-summary-totals.tpl' cart=$cart}
      {/block}
    </div>
  </div>


</section>
