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
{assign var='deliveryMethodCarriers' value=unserialize(Configuration::get('koopmanOrderExport'))}
  <div class="js-cart pl-5" data-refresh-url="{$refresh_url}">{strip}
    <div id="top-header-shoppingcart-box">
      <table width="100%">
        <tr>
          <td width="60%" class="text-nowrap" id="header-cart-total-products">{if (int)Context::getContext()->cart->nbProducts() > 1}Producten{else}Product{/if} ({if Context::getContext()->cart->nbProducts() > 99}99+{else}{Context::getContext()->cart->nbProducts()}{/if})</td>
          <td class="text-right" id="header-cart-subtotal">
            {Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING), 'EUR' )}
          </td>
        </tr>
        <tr>
          <td class="pt-1"> Bezorging
{*            <div class="form-check form-check-inline col-12 col-xl-6 p-0 pt-xl-1 m-0 justify-content-start">*}
{*              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_top" id="carrier_selection_top1" value="shipping" {if Context::getContext()->cart->id_carrier == (int)$deliveryMethodCarriers['select_carrier'] || Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}checked{/if}>*}
{*              <label class="form-check-label carrier-selection-label" for="carrier_selection_top1">Verzenden</label>*}
{*            </div>*}
{*            <div class="form-check form-check-inline col-12 col-xl-6 p-0 pt-xl-1 m-0 pl-xl-2 justify-content-start">*}
{*              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_top" id="carrier_selection_top2" value="pickup" {if Context::getContext()->cart->id_carrier == (int)$deliveryMethodCarriers['select_pickup_carrier'] || Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) == 0}checked{/if}>*}
{*              <label class="form-check-label carrier-selection-label" for="carrier_selection_top2">Afhalen</label>*}
{*            </div>*}
          </td>
          <td class="pt-1 text-right" id="header-cart-shipping">
            {assign var="customerCountry" value=Context::getContext()->country->name}
            {if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}
            {Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING), 'EUR')}
            {else}
              {Context::getContext()->currentLocale->formatPrice(0.00, 'EUR')}
            {/if}
          </td>
        </tr>

          {if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS) > 0}
              {if (int)Context::getContext()->cart->id_customer == (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE')}
                  {assign var="discounts" value=0}
                  {foreach Context::getContext()->cart->getCartRules() as $rule}
                      {assign var="discounts" value=$discounts+$rule['reduction_amount']}
                  {/foreach}

                <tr>
                  <td width="60%" class="text-nowrap" id="header-cart-total-products">Korting</td>
                  <td class="text-right" id="header-cart-subtotal">
                    - {Context::getContext()->currentLocale->formatPrice($discounts, 'EUR')}
                  </td>
                </tr>
              {else}
                <tr>
                  <td width="60%" class="text-nowrap" id="header-cart-total-products">Korting</td>
                  <td class="text-right" id="header-cart-subtotal">
                    - {Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS), 'EUR')}
                  </td>
                </tr>
              {/if}
          {/if}

{*        <tr>*}
          {*          <td width="60%">21% btw</td>*}
          {*          <td class="text-right" {if !Module::isEnabled('smallorderfee') || ((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) >= (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT',20)) || (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) == 0}style="border-bottom:2px solid #777777;"{/if} id="header-cart-vat">*}
          {*            {Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true)-(float)Context::getContext()->cart->getOrderTotal(false), 'EUR')}*}
          {*          </td>*}
          {*        </tr>*}
        {if Module::isEnabled('smallorderfee')}
          <tr id="header-cart-small-order-fee" {if !Module::isEnabled('smallorderfee') || ((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) >= (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT',20)) || (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) == 0}style="display:none"{/if} data-amount="{(double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT',20)}">
            <td width="60%">{Configuration::get('SMALLORDERFEE_ORDER_FEE_LABEL','Order toeslag')}</td>
            <td class="text-right" {if Module::isEnabled('smallorderfee') && ((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) <= (double)Configuration::get('SMALLORDERFEE_MIN_AMOUNT',20)) && (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS_WITHOUT_SHIPPING) != 0}style="border-bottom:2px solid #777777;"{/if}>{Context::getContext()->currentLocale->formatPrice((double)Configuration::get('SMALLORDERFEE_ORDER_FEE',20), 'EUR')}</td>
          </tr>
        {/if}
      </table>
    </div>
    <a href="{$cart_url}" title="{l s='View my shopping cart' d='Shop.Theme.Transformer'}" rel="nofollow" class="header_item rightbar_tri" data-name="side_products_cart" data-direction="open_bar_right">
      <div class="">
        <div class="ajax_cart_bag cart_icon_item">
          <table width="100%">
            <tr>
              <td>

                <a href="#" class="btn btn-success top-header-shoppingcart" id="top-header-shoppingcart">
                  <i class="{if (int)Context::getContext()->cart->nbProducts() > 0}fa-sharp fa-shopping-cart{else}fad fa-shopping-cart{/if} d-inline-block pr-1" style="font-size:1.3rem"></i> <span class="align-text-bottom d-inline-block d-lg-none d-xl-inline-block">Bestel</span>
                  <span class="float-right text-right" id="header-cart-total">
                    {Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(), 'EUR' )}
                  </span>
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </a>
    {strip}
  </div>


