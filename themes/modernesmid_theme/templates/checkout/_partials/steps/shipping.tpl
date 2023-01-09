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
  {extends file='checkout/_partials/steps/checkout-step.tpl'}
  {block name='step_content'}
  <div id="hook-display-before-carrier">
    {$hookDisplayBeforeCarrier nofilter}
  </div>
  <div class="delivery-options-list col-12">
    {if $delivery_options|count}
    <form class="clearfix" id="js-delivery" data-url-update="{url entity='order' params=['ajax' => 1, 'action' => 'selectDeliveryOption']}" method="post">
      <div class="form-fields">
        {block name='delivery_options'}
        <div class="delivery-options">
          {assign var="a" value=array_multisort(array_column($delivery_options, 'position'), SORT_ASC, $delivery_options)}
          {foreach from=$delivery_options item=carrier key=carrier_id}
          {if (int)$carrier_id != (int)Configuration::get('ADDTOORDER_DELIVERY_METHOD')}
          <div class="row delivery-option pb-4">
            <div class="col-sm-1">
              <span class="custom-radio float-xs-left">
                <input type="radio" name="delivery_option[{$id_address}]" id="delivery_option_{$carrier.id}" value="{$carrier_id}" {if $delivery_option==$carrier_id} checked{/if}> <span></span>
              </span>
            </div>
            <label for="delivery_option_{$carrier.id}" class="col-sm-11 delivery-option-2">
              <div class="row">
                <div class="col-sm-5 col-xs-12">
                  <div class="row">
                    {if $carrier.logo}
                    <div class="col-xs-3">
                      <img src="{$carrier.logo}" alt="{$carrier.name}" />
                    </div>
                    {/if}
                    <div class="{if $carrier.logo}col-xs-9{else}col-xs-12{/if}">
                      <span class="h6 carrier-name">{$carrier.name}</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 col-xs-12">
                  <span class="carrier-delay">{$carrier.delay}
                    {if Context::getContext()->country->iso_code == 'BE'}<span style="color:blue;"><i data-id="shipping-info-be" class="icon-info shipping-info-icon"></i> <span id="shipping-info-be" style="display:none;">Klanten in België betalen {Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getTotalShippingCost($carrier.id, false), 'EUR')} transport</span></span>{/if}
                  </span>
                </div>
                <div class="col-sm-3 col-xs-12">
                  <span class="carrier-price float-right">{if floatval($carrier.price_without_tax) > 0}{Context::getContext()->currentLocale->formatPrice(floatval(Context::getContext()->cart->getTotalShippingCost(null, false)), 'EUR')}{else}Gratis{/if}</span>
                </div>
              </div>
            </label>
          </div>
          <div class="row carrier-extra-content" {if $delivery_option !=$carrier_id} style="display:none;" {/if}> {$carrier.extraContent nofilter} </div> <div class="clearfix"></div>
          {else}
          {if !$customer.is_guest}
          {* Custommer is loggedin *}
          {assign var="acceptedOrderStatusIds" value=explode(',',Configuration::get('ADDTOORDER_ORDER_STATUSES'))}
          {assign var="availableOrders" value=[]}
          {assign var="availableOrdersLinks" value=[]}

          {foreach from=Order::getCustomerOrders($customer.id, true, Context::getContext()) item=order}
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
          {if count($availableOrders) > 0}
          <div class="row delivery-option pb-4">
            <div class="col-sm-1">
              <span class="custom-radio float-xs-left">
                <input type="radio" name="delivery_option[{$id_address}]" data-order-reference="{$availableOrders[0].reference}" id="delivery_option_{$carrier.id}" value="{$carrier_id}" {if (int)$delivery_option==(int)$carrier_id} checked{/if}> <span></span>
              </span>
            </div>
            <label for="delivery_option_{$carrier.id}" class="col-sm-11 delivery-option-2">
              <div class="row">
                <div class="col-sm-5 col-xs-12">
                  <div class="row">
                    {if $carrier.logo}
                    <div class="col-xs-3">
                      <img src="{$carrier.logo}" alt="{$carrier.name}" />
                    </div>
                    {/if}
                    <div class="{if $carrier.logo}col-xs-9{else}col-xs-12{/if}">
                      <span class="h6 carrier-name">{$carrier.name}</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 col-xs-12">
                  <span class="carrier-delay">{$carrier.delay}<br />
                    <input type="hidden" name="added_to_order" id="added_to_order" value="{if (int)$delivery_option == (int)$carrier_id}{$availableOrders[0].reference}{/if}">
                    <a style="color:#777777;" target="_blank" href="/index.php?controller=order-detail&id_order={$availableOrders[0].id_order}">Bekijk de lopende bestelling {$availableOrders[0].reference} waar u de huidige bestelling aan wilt toevoegen.</a>
                    {if Context::getContext()->country->iso_code == 'BE'}<span style="color:blue;"><i data-id="shipping-info-be" class="icon-info shipping-info-icon"></i> <span id="shipping-info-be" style="display:none;">Klanten in België betalen {Context::getContext()->currentLocale->formatPrice(12.25, 'EUR')} transport</span></span>{/if}
                  </span>
                </div>
                <div class="col-sm-3 col-xs-12">
                  <span class="carrier-price float-right">{if floatval($carrier.price_without_tax) > 0}{Context::getContext()->currentLocale->formatPrice(floatval($carrier.price_without_tax), 'EUR')}{else}Gratis{/if}</span>
                </div>
              </div>
            </label>
          </div>
          <div class="row carrier-extra-content" {if $delivery_option !=$carrier_id} style="display:none;" {/if}> {$carrier.extraContent nofilter} </div> <div class="clearfix"></div>
          {else}
          <div class="row">
            <div class="col-sm-1">
              <span class="custom-radio float-xs-left">
                <input type="radio" name="delivery_option[{$id_address}]" id="delivery_option_{$carrier.id}" value="{$carrier_id}">
                <span></span>
              </span>
            </div>
            <label for="delivery_option_{$carrier.id}" class="col-sm-11 delivery-option-2">
              <div class="row">
                <div class="col-sm-5 col-xs-12">
                  <div class="row">
                    {if $carrier.logo}
                    <div class="col-xs-3">
                      <img src="{$carrier.logo}" alt="{$carrier.name}" />
                    </div>
                    {/if}
                    <div class="{if $carrier.logo}col-xs-9{else}col-xs-12{/if}">
                      <span class="h6 carrier-name">{$carrier.name}</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 col-xs-12">
                    <a style="color:#777777;">Er is momenteel geen bestaande bestelling beschikbaar waar u deze aan toe kunt voegen.</a>
                  </span>
                </div>
                <div class="col-sm-3 col-xs-12">
                  <span class="carrier-price float-right">{if floatval($carrier.price_without_tax) > 0}{Context::getContext()->currentLocale->formatPrice(floatval($carrier.price_without_tax), 'EUR')}{else}Gratis{/if}</span>
                </div>
              </div>
            </label>
          </div>
        </div>
        {/if}
        {else}
        {* Customer is guest *}
        <div class="add-to-existing-order-form">
          <div class="row delivery-option pb-4">
            <div class="col-sm-1">
              <span class="custom-radio float-xs-left not-allowed add2order-allowed">
                <input type="radio" class="add2order" name="delivery_option[{$id_address}]" id="delivery_option_{$carrier.id}" value="{$carrier_id}" {if $delivery_option==$carrier_id} checked{/if} >
                <span></span>
              </span>
            </div>
            <label for="delivery_option_{$carrier.id}" class="col-sm-11 delivery-option-2">
              <div class="row">
                <div class="col-sm-5 col-xs-12 not-allowed add2order-allowed">
                  <div class="row">
                    {if $carrier.logo}
                    <div class="col-xs-3">
                      <img src="{$carrier.logo}" alt="{$carrier.name}" />
                    </div>
                    {/if}
                    <div class="{if $carrier.logo}col-xs-9{else}col-xs-12{/if}">
                      <span class="h6 carrier-name">{$carrier.name}</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-7 col-xs-12" id="add2order-msg" {if $delivery_option==$carrier_id}style="display:none;"{else}style="display:block;"{/if}>
                  <div class="row">
                    <div class="col-sm-7 col-xs-12">
                        <a style="color:#777777;">Toevoegen aan lopende order.</a>
                      </span>
                    </div>
                    <div class="col-sm-5 col-xs-12">
                      <span class="carrier-price float-right">Gratis</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-7 col-xs-12" id="order_number_validate" {if $delivery_option==$carrier_id}style="display:block;"{else}style="display:none;"{/if}>
                  Wilt u uw bestelling graag toevoegen aan een bestaande bestelling, zoek hieronder naar de gewenste bestelling.
                  <div class="input-group">
                    <input type="text" class="form-control" id="desired_reference" placeholder="YS-000000">
                    <input type="hidden" name="added_to_order" id="added_to_order" value="">
                   <div class="input-group-append">
                      <button id="search_order_for_shipping" class="btn btn-sm btn-success"><i class="fa-sharp fa-search"></i></button>
                   </div>
                  </div>
                  <span class="col-md-12" id="desired_reference_error"></span>
                </div>
                <div class="col-sm-7 col-xs-12" style="display:none;" id="order_number_show">
                  <div class="row">
                    <div class="col-12" id="order_number_show_block">
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        </label>
      </div>
      <div class="row carrier-extra-content" {if $delivery_option !=$carrier_id} style="display:none;" {/if}> {$carrier.extraContent nofilter} </div> <div class="clearfix"></div>
      {/if}
      {/if}
      {/foreach}
  </div>
  {/block}
  <div class="order-options">
    <div id="delivery">
      <label for="delivery_message">{l s='If you would like to add a comment about your order, please write it in the field below.' d='Shop.Theme.Checkout'}</label>
      <textarea maxlength="70" class="form-control w-100" rows="2" cols="120" id="delivery_message" name="delivery_message">{$delivery_message}</textarea>
      <small class="text-muted">Max. 70 karakters</small>
    </div>
    {if $recyclablePackAllowed}
    <span class="custom-checkbox">
      <input type="checkbox" id="input_recyclable" name="recyclable" value="1" {if $recyclable} checked {/if}> <span><i class="material-icons rtl-no-flip checkbox-checked">&#xE5CA;</i></span>
    <label for="input_recyclable">{l s='I would like to receive my order in recycled packaging.' d='Shop.Theme.Checkout'}</label>
    </span>
    {/if}
    {if $gift.allowed}
    <span class="custom-checkbox">
      <input class="js-gift-checkbox" id="input_gift" name="gift" type="checkbox" value="1" {if $gift.isGift}checked="checked" {/if}> <span><i class="fa-sharp fa-check rtl-no-flip checkbox-checked"></i></span>
    <label for="input_gift">{$gift.label}</label>
    </span>
    <div id="gift" class="collapse{if $gift.isGift} in{/if}">
      <label for="gift_message">{l s='If you\'d like, you can add a note to the gift:' d='Shop.Theme.Checkout'}</label>
      <textarea  maxlength="70" rows="2" cols="120" id="gift_message" name="gift_message">{$gift.message}</textarea>
    </div>
    {/if}
  </div>
  </div>
  <button type="submit" class="continue btn btn-success w-100 float-xs-right mt-2" name="confirmDeliveryOption" value="1">
    {l s='Continue' d='Shop.Theme.Actions'}
  </button>
  </form>
  {else}
  <p class="alert alert-danger">{l s='Unfortunately, there are no carriers available for your delivery address.' d='Shop.Theme.Checkout'}</p>
  {/if}
  </div>
  <div id="hook-display-after-carrier">
    {$hookDisplayAfterCarrier nofilter}
  </div>
  <div id="extra_carrier"></div>
  {/block}
