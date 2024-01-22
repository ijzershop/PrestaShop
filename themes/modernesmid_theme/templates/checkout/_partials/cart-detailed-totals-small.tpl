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
{block name='cart_detailed_totals'}
    {assign var=withTax value=Context::getContext()->cookie->price_vat_settings_incl === "true"}
<div class="cart-detailed-totals">
  <div class="cart-summary-line cart-total row m-0">
<div class="col-6 pl-0">
    <span class="font-weight-bolder pt-3 text-black" style="font-size: 1.25rem;">
              {if (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS) > 0}
                  {Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal($withTax, Cart::ONLY_REMAINDER_OF_DISCOUNTS), 'EUR')}
              {else}
                  {Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal($withTax, Cart::BOTH), 'EUR')}
              {/if}
        </span>
  <br>
  <b class="text-black">({if !$withTax}exclusief BTW{else}inclusief BTW{/if})</b>
    </div>
      <div class="col-6 pr-0">

      {if $cart.minimalPurchaseRequired}
    <div class="alert alert-warning" role="alert">
        {$cart.minimalPurchaseRequired}
    </div>
    <div class="text-sm-center">
      <button type="button" class="btn btn-success w-100 disabled" disabled>{l s='Checkout' d='Shop.Theme.Actions'}</button>
    </div>
      {elseif empty($cart.products) }
    <div class="text-sm-center">
      <button type="button" class="btn btn-success w-100 disabled" disabled>{l s='Checkout' d='Shop.Theme.Actions'}</button>
    </div>
      {else}
        <div class="text-sm-center">
          <a href="{$urls.pages.order}" class="btn btn-success w-100">{l s='Checkout' d='Shop.Theme.Actions'}</a>
            {hook h='displayExpressCheckout'}
        </div>
      {/if}
      </div>
  </div>
</div>
{/block}
