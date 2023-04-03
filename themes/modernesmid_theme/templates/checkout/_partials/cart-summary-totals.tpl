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
<div class="card-block cart-summary-totals">
  {block name='cart_summary_tax'}
      {if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS_NO_CALCULATION) > 0}
            <div class="cart-summary-line summary-total-discount">
              <span class="label sub">Korting</span><span class="value sub">{Context::getContext()->currentLocale->formatPrice(0-(float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS_NO_CALCULATION), 'EUR')}</span>
            </div>
      {/if}
    {if $cart.subtotals.tax}
      <div class="cart-summary-line summary-total-tax">
        <span class="label sub">Btw (21%)</span>
        <span class="value sub" {if (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) == 0}style="border-bottom:1px solid #c0c0c0c0;"{/if}>
      {if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS) > 0}
          {Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS)-Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR')}
      {else}
            {$cart.subtotals.tax.value}
      {/if}
          {if (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) == 0}<span style="position:absolute;right:5px;line-height:3;">+</span>{/if}</span>
      </div>
    {/if}
  {/block}
  {block name='cart_summary_total'}
    {if !$configuration.display_prices_tax_incl && $configuration.taxes_enabled}
      <div class="cart-summary-line  summary-total">
        <span class="label">{$cart.totals.total.label}&nbsp;{$cart.labels.tax_short}</span>
        <span class="value">{$cart.totals.total.value}</span>
      </div>
      <div class="cart-summary-line cart-total  summary-total">
        <span class="label">{$cart.totals.total_including_tax.label}</span>
        <span class="value">{$cart.totals.total_including_tax.value}</span>
      </div>
    {else}
      <div class="cart-summary-line cart-total">
                <span class="label">{$cart.totals.total.label}&nbsp;{if $configuration.taxes_enabled}{$cart.labels.tax_short}{/if}</span>
                <span class="value h6 font-weight-bolder">
              {if (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS) > 0}
                {Context::getContext()->currentLocale->formatPrice(0-Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_REMAINDER_OF_DISCOUNTS), 'EUR')}
              {else}
                  {$cart.totals.total.value}
              {/if}
        </span>
      </div>
    {/if}
  {/block}


</div>
