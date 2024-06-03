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

  {block name='cart_voucher'}
      {if $cart.vouchers.added}
        <div class="block-promo mb-2 pt-2 border-top" style="border-top-style:dashed!important;">
        <div class="cart-voucher">
          {block name='cart_voucher_list'}
            <ul class="promo-name card-block list-unstyled">
              {foreach from=$cart.vouchers.added item=voucher}
                <li class="cart-summary-line" data-toggle="tooltip" data-placement="top" title="Deze korting geeft u een reductie van {str_replace('-','', $voucher.reduction_formatted)} incl. btw">
                  <table class="w-100 text-muted">
                    <tr>
                      <td>{$voucher.name}</td>
                      {if in_array((int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_VOUCHER_GROUP',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id), Customer::getGroupsStatic(Context::getContext()->cart->id_customer)) || (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}
                      <td class="text-right"><a href="{$voucher.delete_url}" data-link-action="remove-voucher"><i class="fasl fa-trash text-danger"></i></a></td>
                      {/if}
                    </tr>
                  </table>
                </li>
              {/foreach}
            </ul>
          {/block}
        {/if}
    {if $cart.vouchers.allowed && (in_array((int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_VOUCHER_GROUP',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id), Customer::getGroupsStatic(Context::getContext()->cart->id_customer)) || (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE',  Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}

        <div id="promo-code" class="collapse show">
          <div class="promo-code">
            {block name='cart_voucher_form'}
              <form action="{$urls.pages.cart}" data-link-action="add-voucher" method="post">
                <input type="hidden" name="token" value="{$static_token}">
                <input type="hidden" name="addDiscount" value="1">
                <div class="input-group">
                  <input class="form-control" type="text" name="discount_name" placeholder="{l s='Vul hier uw kortingscode in' d='Shop.Theme.Checkout'}">
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-success"><i class="fasl fa-check"></i></button>
                  </div>
                </div>
              </form>
            {/block}

{*            {block name='cart_voucher_notifications'}*}
{*              <div class="alert alert-danger js-error" role="alert">*}
{*                <i class="material-icons">&#xE001;</i><span class="ml-1 js-error-text"></span>*}
{*              </div>*}
{*            {/block}*}

{*            <a class="collapse-button promo-code-button cancel-promo" role="button" data-toggle="collapse" data-target="#promo-code" aria-expanded="true" aria-controls="promo-code">*}
{*              {l s='Close' d='Shop.Theme.Checkout'}*}
{*            </a>*}
          </div>
        </div>

        {if $cart.discounts|count > 0}
          <p class="block-promo promo-highlighted">
            {l s='Take advantage of our exclusive offers:' d='Shop.Theme.Actions'}
          </p>
          <ul class="js-discount card-block promo-discounts">
            {foreach from=$cart.discounts item=discount}
              <li class="cart-summary-line">
                <span class="label">
                  <span class="code">{$discount.code}</span> - {$discount.name}
                </span>
              </li>
            {/foreach}
          </ul>
        {/if}
      </div>
    </div>
{/if}
  {/block}
