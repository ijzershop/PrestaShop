{if isset($settings['hide_ship_pay']) && $settings['hide_ship_pay'] eq 1 && $address_selector == 'new'}
    <span class="permanent-warning" style="display: inline-block;"> {l s='Save your address first in order to check actual shipping methods & cost' mod='supercheckout'} </span>
{else}
    <div class="velsof_sc_overlay"></div>
    {if isset($is_virtual_cart) && $is_virtual_cart}
        <input id="input_virtual_carrier" class="hidden" type="hidden" name="id_carrier" value="0" />
        <div class="supercheckout-checkout-content" style="display:block">
            <div class="not-required-msg" style="display: block;">{l s='No Delivery Method Required' mod='supercheckout'}</div>
        </div>
    {else}
        {if isset($shipping_errors) && is_array($shipping_errors)}
            {foreach from=$shipping_errors item='shippig_error'}
                <div class="supercheckout-checkout-content" style="display:block">
                    <div class="permanent-warning" style="display: block;">{$shippig_error}</div>
                </div>
            {/foreach}
        {else}
            <div class="supercheckout-checkout-content" style="display:block"></div>
            <div id="hook-display-before-carrier">
                {$hookDisplayBeforeCarrier nofilter}{*escape not required as contains html*}
            </div>
            {if $delivery_options|count}
                {assign var='selected' value=0}
                <ul>

                    {foreach from=$delivery_options item=carrier key=carrier_id}

                      {if (int)$carrier.id != (int)Configuration::get('ADDTOORDER_DELIVERY_METHOD')}
                        <li class="highlight">
                            <div class="radio">
                                {if !empty($delivery_option) && $delivery_option == $carrier.id && $selected == 0}
                                    {* <li class="highlight alert-info">
                                    <div class="radio ">*}
                                    <input class='supercheckout_shipping_option delivery_option_radio' type="radio" name="delivery_option[{$id_address|intval}]" value="{$carrier.id nofilter}{*escape not required as contains html*}" id="shipping_method_{$id_address|intval}_{$carrier.id|intval}" checked="checked" />
                                    {assign var='selected' value=1}
                                {else if isset($default_shipping_method) && $carrier.id == $default_shipping_method && $selected == 0}
                                    {*<li class="highlight alert-info">
                                    <div class="radio ">*}
                                    <input class='supercheckout_shipping_option delivery_option_radio' type="radio" name="delivery_option[{$id_address|intval}]" value="{$carrier.id nofilter}{*escape not required as contains html*}" id="shipping_method_{$id_address|intval}_{$carrier.id|intval}" checked="checked" />
                                {else}
                                    {* <li class="highlight">
                                    <div class="radio ">*}
                                    <input class='supercheckout_shipping_option delivery_option_radio' type="radio" name="delivery_option[{$id_address|intval}]" value="{$carrier.id nofilter}{*escape not required as contains html*}" id="shipping_method_{$id_address|intval}_{$carrier.id|intval}" />
                                {/if}

                                <label for="shipping_method_{$id_address|intval}_{$carrier.id|intval}">
                                    {if $display_carrier_style neq 0}
                                        <img src="{$carrier.logo nofilter}{*escape not required as contains url*}" alt="{$carrier.name}" {if isset($carrier.logo_width) && $carrier.logo_width != "" && $carrier.logo_width != 'auto'}width="{$carrier.logo_width}"{else}width='50'{/if} {if isset($carrier.logo_height) && $carrier.logo_height != "" && $carrier.logo_height != "auto"}height="{$carrier.logo_height}"{/if}/>{if $display_carrier_style neq 2}{/if}
                                    {/if}
                                    {if $display_carrier_style neq 2}
                                        {$carrier.name}
                                    {/if}
                                    <span class="supercheckout-shipping-small-title shippingPrice">{if $carrier.price_without_tax > 0}{Context::getContext()->currentLocale->formatPrice($carrier.price_without_tax, 'EUR')}{else}Gratis{/if}</span></label>{*escape not required*}
                            </div>
                            {*Start Code Added By Priyanshu on 11-Feb-2021 to fix the issue of Extra Content not displaying for delivery Methods*}
                            <div class="kbshippingparceloption shipping_method_{$id_address|intval}_{$carrier.id|intval}">
                                {$carrier.extraContent nofilter}
                            </div>
                            {*End Code Added By Priyanshu on 11-Feb-2021 to fix the issue of Extra Content not displaying for delivery Methods*}
                        </li>
                      {else}
                        {*                      If is add2order   *}
                        {if Context::getContext()->cookie->logged == '1'}
                          {* Custommer is loggedin *}
                          {assign var="acceptedOrderStatusIds" value=(explode(',',Configuration::get('ADDTOORDER_ORDER_STATUSES')))}

                          {assign var="availableOrders" value=[]}
                          {assign var="availableOrdersLinks" value=[]}
                          {foreach from=Order::getCustomerOrders(Context::getContext()->customer->id, true, Context::getContext()) item=order}
                            {if in_array($order.id_order_state, $acceptedOrderStatusIds)}
                              {* $acceptedOrderStatusIds options are
                                2 - [Betaling ontvangen]
                                3 - Order afhalen
                                7 - [Uw order wordt verwerkt]
                                10 - [Bankoverschrijving]
                                16 - Order geprint
                                15 - [Uw bestelling ligt klaar voor verzending]
                                4 - [Uw bestelling is verzonden]
                                5 - Order afgerond
                                6 - Order geannuleerd
                                17 - Order vertraagd
                                18 - [INTERN: zie klantenservice]
                              *}
                              {append var="availableOrders" value=$order}
                            {/if}
                          {/foreach}

                        {/if}

                        <li class="highlight">
                          <div class="radio " id="add_to_order_method_radio" data-carrier-id="{{Configuration::get('ADDTOORDER_DELIVERY_METHOD')}}">
                            {if !empty($delivery_option) && $delivery_option == $carrier.id  && $selected == 0}
                              {* <li class="highlight alert-info">
                              <div class="radio ">*}
                              <input class='supercheckout_shipping_option delivery_option_radio' type="radio" name="delivery_option[{$id_address|intval}]" value="{$carrier.id nofilter}{*escape not required as contains html*}" id="shipping_method_{$id_address|intval}_{$carrier.id|intval}" checked="checked" />
                              {assign var='selected' value=1}
                            {else if isset($default_shipping_method) && $carrier.id == $default_shipping_method && $selected == 0}
                              {*<li class="highlight alert-info">
                              <div class="radio ">*}
                              <input class='supercheckout_shipping_option delivery_option_radio' type="radio" name="delivery_option[{$id_address|intval}]" value="{$carrier.id nofilter}{*escape not required as contains html*}" id="shipping_method_{$id_address|intval}_{$carrier.id|intval}" checked="checked" />
                            {else}
                              {* <li class="highlight">
                              <div class="radio ">*}
                              <input class='supercheckout_shipping_option delivery_option_radio' type="radio" name="delivery_option[{$id_address|intval}]" value="{$carrier.id nofilter}{*escape not required as contains html*}" id="shipping_method_{$id_address|intval}_{$carrier.id|intval}" />
                            {/if}

                            <label for="shipping_method_{$id_address|intval}_{$carrier.id|intval}">
                              {if $display_carrier_style neq 0}
                                <img src="{$carrier.logo nofilter}{*escape not required as contains url*}" alt="{$carrier.name}" {if isset($carrier.logo_width) && $carrier.logo_width != "" && $carrier.logo_width != 'auto'}width="{$carrier.logo_width}"{else}width='50'{/if} {if isset($carrier.logo_height) && $carrier.logo_height != "" && $carrier.logo_height != "auto"}height="{$carrier.logo_height}"{/if}/>{if $display_carrier_style neq 2}{/if}
                              {/if}
                              {if $display_carrier_style neq 2}
                                {$carrier.name}
                              {/if}
                              <span class="supercheckout-shipping-small-title shippingPrice">{if $carrier.price_without_tax > 0}{Context::getContext()->currentLocale->formatPrice($carrier.price_without_tax, 'EUR')}{else}Gratis{/if}</span></label>{*escape not required*}
                          </div>
                          {if Context::getContext()->cookie->logged == '1'}
                            {if count($availableOrders) > 0}
                            {assign var="addToOrderAddress" value=Address::initialize((int)$availableOrders[0].id_address_delivery)}
                            <script type="text/javascript">
                              var addToOrderAddress = {};
                              addToOrderAddress.city = "{$addToOrderAddress->city}";
                              addToOrderAddress.country = "{$addToOrderAddress->id_country}";
                              addToOrderAddress.postcode = "{$addToOrderAddress->postcode}";
                              addToOrderAddress.address1 = "{$addToOrderAddress->address1}";
                              addToOrderAddress.house_number = "{$addToOrderAddress->house_number}";
                              addToOrderAddress.house_number_extension = "{$addToOrderAddress->house_number_extension}";
                              addToOrderAddress.company = "{$addToOrderAddress->company}";
                              addToOrderAddress.firstname = "{$addToOrderAddress->firstname}";
                              addToOrderAddress.lastname = "{$addToOrderAddress->lastname}";
                              addToOrderAddress.phone = "{$addToOrderAddress->phone}";
                            </script>

                              <input type="hidden" name="added_to_order" id="added_to_order" value="{if (int)$delivery_option == (int)$carrier.id}{$availableOrders[0].reference}{/if}" data-latest="{$availableOrders[0].reference}">
                              <a style="color:#777777;" target="_blank" href="/index.php?controller=order-detail&id_order={$availableOrders[0].id_order}">Bekijk de lopende bestelling {$availableOrders[0].reference} waar u de huidige bestelling aan kunt toevoegen.</a>
                              {if Context::getContext()->country->iso_code == 'BE'}<span style="color:blue;"><i data-id="shipping-info-be" class="icon-info shipping-info-icon"></i> <span id="shipping-info-be" style="display:none;">Klanten in België betalen {Context::getContext()->currentLocale->formatPrice(12.25, 'EUR')} transport</span></span>{/if}
                            {else}
                              <a style="color:#777777;">Er is momenteel geen bestaande bestelling beschikbaar waar u deze aan toe kunt voegen.</a>
                            {/if}

                          {else}
{* Is guest *}
                            <div id="order_number_validate" {if $delivery_option == $carrier.id}style="display:block;"{else}style="display:none;"{/if}>
                              Wilt u uw bestelling graag toevoegen aan een bestaande bestelling, zoek hieronder naar de gewenste bestelling.

                              <script type="text/javascript">
                                var addToOrderAddress = {};
                                addToOrderAddress.city = "";
                                addToOrderAddress.country = "";
                                addToOrderAddress.postcode = "";
                                addToOrderAddress.address1 = "";
                                addToOrderAddress.house_number = "";
                                addToOrderAddress.house_number_extension = "";
                                addToOrderAddress.company = "";
                                addToOrderAddress.firstname = "";
                                addToOrderAddress.lastname = "";
                                addToOrderAddress.phone = "";
                              </script>
                              <div class="input-group">
                                <input type="text" class="form-control" id="desired_reference" placeholder="YS-000000" autocomplete="des-reference">
                                <input type="hidden" name="added_to_order" id="added_to_order" value="">
                                <div class="input-group-append">
                                  <button id="search_order_for_shipping" class="btn btn-sm btn-success"><i class="fas fa-search"></i></button>
                                </div>
                              </div>
                              <span class="col" id="desired_reference_error"></span>
                            </div>
                            <div class="row" style="display:none;" id="order_number_show">
                                <div class="col" id="order_number_show_block">
                              </div>
                            </div>
                            </div>
                          {/if}
                          {*Start Code Added By Priyanshu on 11-Feb-2021 to fix the issue of Extra Content not displaying for delivery Methods*}
                          <div class="kbshippingparceloption shipping_method_{$id_address|intval}_{$carrier.id|intval}">
                            {$carrier.extraContent nofilter}
                          </div>
                          {*End Code Added By Priyanshu on 11-Feb-2021 to fix the issue of Extra Content not displaying for delivery Methods*}
                        </li>
                      {/if}
                    {/foreach}
                </ul>
            {else}
                <div class="supercheckout-checkout-content" style="display:block">
                    <div class="permanent-warning" style="display: block;">{l s='No Delivery Method Available' mod='supercheckout'}</div>
                </div>
            {/if}
            <div id="hook-display-after-carrier">
                {$hookDisplayAfterCarrier nofilter}{*escape not required as contains html*}
            </div>
        {/if}
    {/if}
{/if}
{*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer tohttp://www.prestashop.com for more information.
* We offer the best and most useful modules PrestaShop and modifications for your online store.
*
* @category  PrestaShop Module
* @author    knowband.com <support@knowband.com>
* @copyright 2016 Knowband
*}
