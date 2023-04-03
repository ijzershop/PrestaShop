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
<div class="cart-detailed-totals">
  {assign var='deliveryMethodCarriers' value=unserialize(Configuration::get('koopmanOrderExport'))}
  <div class="card-block">
    <div class="cart-summary-line clearfix cart-total products-total">
        <span class="label">{if (int)$cart.products_count > 1}Producten{else}Product{/if} ({$cart.products_count})</span>
        </span>
        <span class="value price">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING), 'EUR')}</span>
    </div>
    <div class="cart-summary-line clearfix cart-total shipping-total">
        <span class="label">
            <div class="form-check form-check-inline p-0 m-0 justify-content-start">
              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_checkout_cart" id="carrier_selection_checkout_cart1" value="shipping" {if Context::getContext()->cart->id_carrier == (int)$deliveryMethodCarriers['select_carrier'] || Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}checked{/if}>
              <label class="form-check-label carrier-selection-label" for="carrier_selection_checkout_cart1">Verzenden</label>
            </div>
            <div class="form-check form-check-inline p-0 m-0 pl-2 justify-content-start">
              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_checkout_cart" id="carrier_selection_checkout_cart2" value="pickup" {if Context::getContext()->cart->id_carrier == (int)$deliveryMethodCarriers['select_pickup_carrier']|| Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) == 0}checked{/if}>
              <label class="form-check-label carrier-selection-label" for="carrier_selection_checkout_cart2">Afhalen</label>
            </div>
        </span>
        <span class="value price justify-content-end">
          {if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}
            {Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING), 'EUR')}
          {else}
            {Context::getContext()->currentLocale->formatPrice("0.00", 'EUR')}
          {/if}
        </span>
    </div>
  </div>

  {block name='cart_summary_totals'}
    {include file='checkout/_partials/cart-summary-totals.tpl' cart=$cart}
  {/block}
</div>
{/block}
