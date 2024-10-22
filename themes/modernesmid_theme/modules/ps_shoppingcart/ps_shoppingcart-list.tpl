<div class="shoppingcart-list-block">
    <div class="menu-title" id="shoppingcart-list-title"><a class="text-white text-decoration-none" id="shoppingcart-chevron-close"><i class="float-left mt-1 mb-1 ml-1 fasl fa-chevron-right"></i> Winkelwagen</a>
        <a href="/mijn-account" id="my-account-link" title="Mijn Account" class="float-right text-white pr-2"><i class="fasl fa-user-circle"></i></a>
    </div>
    <div class="shoppingcart-list">
        <div class="row">
            <div class="col-12" id="shoppingcart-list-header-totals">
                <div class="shoppingcart-header-totals col-12 pt-2">
                    Totaal incl. btw
                </div>
                <div class="col-sm-8 float-left">
                    <div class="shoppingcart-header-total-price font-weight-bold">
                        {Context::getContext()->currentLocale->formatPrice(floatval(Context::getContext()->cart->getOrderTotal(true, Cart::BOTH)), 'EUR' )}
                    </div>
                </div>
                <div class="shoppingcart-top-checkout col-sm-4 float-right">
                    <a href="{if Context::getContext()->is_counter_customer}{$cart_url}{else}{if isset($urls.pages['order'])}{$urls.pages['order']}{else}{$cart_url}{/if}{/if}" rel="nofollow" class="btn btn-success w-100 enabled btn_to_checkout" title="{l s='Bestellen' d='Shop.Theme.Actions'}">{l s='Bestellen' d='Shop.Theme.Actions'}</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 divider">
                <div class="w-100 divider_item"></div>
            </div>
        </div>
        <div class="col-12" id="shoppingcart-list-items">
            {if Context::getContext()->cart->nbProducts()}
            <ul class="list-unstyled small_cart_product_list pt-3 mb-4 pb-4">
                {foreach from=Context::getContext()->cart->getProducts() item=product}
                <li class="pb-1">{include file='./ps_shoppingcart-product-line.tpl' product=$product cart_url=$cart_url}</li>
                {/foreach}
{*                {foreach from=Context::getContext()->cart->getDiscounts() item=voucher}*}
{*                <li class="pb-1">*}
{*                    <div class="row">*}
{*                        <span class="mar_r4">{$voucher.name}</span>*}
{*                        <span class="mar_r4">{Context::getContext()->currentLocale->formatPrice((float)$voucher.reduction_amount, 'EUR')}</span>*}
{*                        <a href="javascript:void(0)" onclick="removeDiscount({{$voucher.id_cart_rule}})" data-link-action="remove-voucher" class="flex_child" title="{l s='Remove' d='Shop.Theme.Actions'}"><i class="fasl fa-trash mar_l4"></i></a>*}
{*                    </div>*}
{*                </li>*}
{*                {/foreach}*}
            </ul>
        </div>
    </div>
    <div class="shoppingcart-list shoppingcart-list-totals" id="shoppingcart-list-footer-totals">
        <div class="cart_dark p-1 pt-2">
            <div class="col-12">
                {assign var="products_count" value=Context::getContext()->cart->nbProducts()}
                {assign var="tax" value=array('Btw (21%)', Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(true)-(float)Context::getContext()->cart->getOrderTotal(false), 'EUR'))}
                {assign var="products_subtotal" value=array("Producten",Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS), 'EUR'))}
                <div class="cart_price_details p-2" {if Context::getContext()->cookie->cart_toggle === 'false'}style="display:none;"{/if}>
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5">{$products_subtotal.0} ({if $products_count > 99}99+{else}{$products_count}{/if}) {if (float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS) > 0}<span class="info-icon-with-showhide" data-id="cart-info-1"><i class="icon-info cart-info-btn ml-2"></i></span>{/if}</span>
                        <span class="col-7 text-right price"> {Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_PRODUCTS), 'EUR')}</span>
                    </div>
                    <div style="display:none;" class="border-bottom-0 pb-1 row" id="cart-info-1">
                        <span class="col-12 text-left width-100" style="color:blue">
                            Bij sommige producten ontvangt u korting als u meer dan 5 of 10 bestelt. Dit is de staffelkorting.
                        </span>
                    </div>
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5"></span><span class="col-7 text-right"></span>
                    </div>
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5">
                            Verzending
                          <!-- <div class="row"> -->
                            <!-- <div class="form-check form-check-inline col-12 col-sm-6 p-0 m-0 pl-2 pl-sm-2 mb-1 mb-sm-0 justify-content-start">
                              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_bottom_cart" id="carrier_selection_bottom_cart1" value="shipping" {if Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)  || Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}checked{/if}>
                              <label class="form-check-label carrier-selection-label" for="carrier_selection_bottom_cart1">Verzenden</label>
                            </div>
                            <div class="form-check form-check-inline col-12 col-sm-6 p-0 m-0 pl-2 justify-content-start">
                              <input class="form-check-input carrier-selection" type="radio" name="carrier_selection_bottom_cart" id="carrier_selection_bottom_cart2" value="pickup" {if Context::getContext()->cart->id_carrier == (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PICKUP_CARRIER',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)  || Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) == 0}checked{/if}>
                              <label class="form-check-label carrier-selection-label" for="carrier_selection_bottom_cart2">Afhalen</label>
                            </div> -->
                          <!-- </div> -->
                        </span><span class="col-7 text-right price pt-2 pt-sm-0">{if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING) > 0}{Context::getContext()->currentLocale->formatPrice((float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_SHIPPING), 'EUR')}{else}€ 0,00{/if}</span>
                    </div>
                  {if (Context::getContext()->is_counter_customer) && Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS_NO_CALCULATION) > 0}
                      <div class="border-bottom-0 pb-1 row">
                        <span class="col-5">Korting</span><span class="col-7 text-right price">{Context::getContext()->currentLocale->formatPrice(0-(float)Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_DISCOUNTS_NO_CALCULATION), 'EUR')}</span>
                      </div>
                  {/if}
                    <div class="border-bottom-0 pb-1 row">
                        <span class="col-5">{$tax.0}</span><span class="col-7 text-right price">
                            {if (Context::getContext()->is_counter_customer) && Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0}
                              {Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS)-Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_REMAINDER_OF_DISCOUNTS),'EUR')}
                            {else}
                              {$tax.1}
                            {/if}
                      </span>
                    </div>
                        <div class="border-bottom-0 pb-1 row">
                            <span class="col-5"></span><span class="col-7"><span class="position-absolute text-dark" style="right:5px;">_________________ +</span></span>
                        </div>
                </div>
                {/if}
                <div class="border-bottom-0 pb-1 p-2 row">
                    {if Context::getContext()->cart->getOrderTotal(false, Cart::ONLY_REMAINDER_OF_DISCOUNTS) < 0}

                      <span class="col-5">Totaal (incl. btw)</span><span class="col-7 text-right price font-weight-bold">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_REMAINDER_OF_DISCOUNTS), 'EUR')}</span>
                    {else}

                      <span class="col-5">Totaal (incl. btw)</span><span class="col-7 text-right price font-weight-bold">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::BOTH), 'EUR')}</span>
                    {/if}
                </div>
                <div class="mt-3">
                    <a href="{if Context::getContext()->is_counter_customer}{$cart_url}{else}{if isset($urls.pages['order'])}{$urls.pages['order']}{else}{$cart_url}{/if}{/if}" rel="nofollow" class="btn btn-success w-100 enabled btn_to_checkout" title="{l s='Verder naar bestellen' d='Shop.Theme.Actions'}">{l s='Verder naar bestellen' d='Shop.Theme.Actions'}</a>
                </div>
                {if Context::getContext()->cart->getOrderTotal() > 0}
                <div class="text-center mt-3 p-1">Toon details (verzendkosten, korting & btw.) <label class="switch">
                        <input type="checkbox" class="cart_details_toggle" {if Context::getContext()->cookie->cart_toggle === 'false'}{else}checked{/if}>
                        <span class="slider round"></span>
                    </label>
                </div>
                {/if}
            </div>
        </div>
    </div>
