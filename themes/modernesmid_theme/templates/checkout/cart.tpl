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
{extends file=$layout}

{block name='content'}

  <section id="main" class="col-12">
    <div class="cart-grid row">

      <!-- Left Block: cart product informations & shpping -->
      <div class="cart-grid-body col-xs-12 col-lg-8">

        <!-- cart products detailed -->
        <div class="card cart-container">
          <div class="card-block p-2 border-bottom card-header">
            <a class="w-100">{l s='Shopping Cart' d='Shop.Theme.Checkout'}</a>
            <a id="clearAllProductsFromCart" href="#" class="text-decoration-none text-dark float-right"><i class="fasr fa-xmark"></i> Winkelwagen legen</a>
          </div>
          <hr class="separator">
          {block name='cart_overview'}
            {include file='checkout/_partials/cart-detailed.tpl' cart=$cart}
          {/block}
          <div class="card-footer">
            {block name='continue_shopping'}
              <a class="btn btn-dark mt-2" href="{$urls.pages.index}">
                <i class="fasr fa-chevron-left"></i> {l s='Continue shopping' d='Shop.Theme.Actions'}
              </a>
            {/block}
            {if Context::getContext()->customer->isLogged() && Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') == Context::getContext()->customer->id}
              {* Show print cart button *}
              <a href="#" id="addCustomProductByEmployee" data-cart="{Context::getContext()->cart->id}"  class="btn btn-success float-right mt-2" alt="Extra product toevoegen"><i class="fasr fa-plus"></i> Regel toevoegen</a>
{*              <a href="#" id="printShoppingCartByEmployee" data-cart="{Context::getContext()->cart->id}" class="btn btn-link text-dark float-right mt-1" alt="Winkelwagen als pdf opslaan"><i class="fa-2x fasr fa-file-pdf"></i></a>*}
              {/if}
            </div>
          </div>
          <br>
        <!-- shipping informations -->
        {block name='hook_shopping_cart_footer'}
          {hook h='displayShoppingCartFooter'}
        {/block}
      </div>
      <div class="cart-grid-right col-xs-12 col-lg-4">
        {block name='cart_summary'}
          <div class="card cart-summary">
            <div class="card-body">

            {block name='cart_totals'}
              {include file='checkout/_partials/cart-detailed-totals.tpl' cart=$cart}
            {/block}
            </div>
            {block name='cart_actions'}
              {include file='checkout/_partials/cart-detailed-actions.tpl' cart=$cart}
            {/block}
          </div>
        {/block}
      </div>

    </div>
  </section>
{/block}
