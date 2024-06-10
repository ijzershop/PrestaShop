{**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 *}
{extends file='checkout/_partials/steps/checkout-step.tpl'}

{block name='step_content'}
  <div id="hook-display-before-carrier">
    {$hookDisplayBeforeCarrier nofilter}
  </div>

  <div class="delivery-options-list">
    {if $delivery_options|count}
      <form
        class="clearfix"
        id="js-delivery"
        data-url-update="{url entity='order' params=['ajax' => 1, 'action' => 'selectDeliveryOption']}"
        method="post"
      >
        <div class="form-fields">
          {block name='delivery_options'}
            <div class="delivery-options">
              {foreach from=$delivery_options item=carrier key=carrier_id}
                {if (int)$carrier_id != (int)Configuration::get('ADDTOORDER_DELIVERY_METHOD')}
                  <div class="row delivery-option js-delivery-option {if $delivery_option == $carrier_id} selected {/if}">
                    <div class="col-sm-1 text-center p-2 p-md-0">
                      <span class="custom-radio float-xs-left">
                        <input type="radio" name="delivery_option[{$id_address}]" id="delivery_option_{$carrier.id}" value="{$carrier_id}"{if $delivery_option == $carrier_id} checked{/if}>
                        <span></span>
                      </span>
                    </div>
                    <label for="delivery_option_{$carrier.id}" class="col-xs-9 col-sm-11 delivery-option-2">
                      <div class="row">
                        <div class="col-sm-1 col-xs-12 pl-0">
                          <div class="row carrier{if $carrier.logo} carrier-hasLogo{/if} ">
                            {if $carrier.logo}
                            <div class="col-xs-12 carrier-logo mx-auto">
                                <img src="{$carrier.logo}" alt="{$carrier.name}" loading="lazy" />
                            </div>
                            {/if}
                          </div>
                        </div>
                        <div class="col-sm-8 col-xs-12 text-center text-md-left">
                          <span class="carrier-delay">{$carrier.delay}</span>
                        </div>
                        <div class="col-sm-3 col-xs-12 text-center text-md-right">
                          <span class="carrier-price  font-weight-bold">{$carrier.price}</span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div class="row carrier-extra-content js-carrier-extra-content"{if $delivery_option != $carrier_id} style="display:none;"{/if}>
                    {$carrier.extraContent nofilter}
                  </div>
                  <div class="clearfix"></div>
                {else}
                  <div class="row delivery-option js-delivery-option pb-0 {if $delivery_option == $carrier_id} selected {/if} {if $added_to_order_msg.field == $delivery_option}border-danger{/if}">
                    <div class="col-sm-1 text-center p-2 p-md-0">
                      <span class="custom-radio float-xs-left">
                        <input type="radio" name="delivery_option[{$id_address}]" id="delivery_option_{$carrier.id}" value="{$carrier_id}"{if $delivery_option == $carrier_id} checked{/if}>
                        <span></span>
                      </span>
                    </div>
                    <label for="delivery_option_{$carrier.id}" class="col-xs-9 col-sm-11 delivery-option-2">
                      <div class="row">
                        <div class="col-sm-1 col-xs-12 pl-0">
                          <div class="row carrier {if $carrier.logo} carrier-hasLogo{/if}">
                            {if $carrier.logo}
                              <div class="col-xs-12 carrier-logo mx-auto">
                                <img src="{$carrier.logo}" alt="{$carrier.name}" loading="lazy" />
                              </div>
                            {/if}
                          </div>
                        </div>
                        <div class="col-sm-8 col-xs-12 text-center text-md-left">
                          <span class="carrier-delay">{$carrier.delay}</span>
                        </div>
                        <div class="col-sm-3 col-xs-12 text-center text-md-right">
                          <span class="carrier-price  font-weight-bold">{$carrier.price}</span>
                        </div>
                      </div>
                    </label>



                {*                Start add2Order     *}


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
{*                Orders available *}
                  {foreach $availableOrders as $key => $addToOrder}
                    {if Address::addressExists($addToOrder.id_address_delivery)}
                      {assign var="addToOrderAddress" value=Address::initialize((int)$addToOrder.id_address_delivery)}
                      {break}
                    {/if}
                  {/foreach}

                  <script type="text/javascript">
                    let addToOrderAddress = {};
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


                  <div class="col-12 col-md-9 offset-md-2 pl-2 pt-2 added-to-order-block" data-id="{$carrier_id}">
                    <input type="hidden" name="added_to_order" data-id="{$carrier_id}" id="added_to_order" value="{if $delivery_option != $carrier_id}{$availableOrders[0].reference}{/if}">
                    <a style="color:#777777;" target="_blank" href="/index.php?controller=order-detail&id_order={$availableOrders[0].id_order}">Bekijk de lopende bestelling {$availableOrders[0].reference} waar u de huidige bestelling aan wilt toevoegen.</a>
                  </div>

                {else}
{*                  No orders available  *}
                  <div class="col-12 col-md-9 offset-md-2 pl-2 pt-2 added-to-order-block text-center text-md-left" data-id="{$carrier_id}">
                    <a style="color:#777777;">Er is momenteel geen bestaande bestelling beschikbaar waar u deze aan toe kunt voegen.</a>
                  </div>

                {/if}
                {else}
                  {* Customer is guest *}
                  <div class="col-12 col-md-9 offset-md-2 pl-2 pt-2 added-to-order-block text-center text-md-left" id="order_number_validate" data-id="{$carrier_id}" style="{if $delivery_option != $carrier_id}display:none;{/if}">
                    Wilt u uw bestelling graag toevoegen aan een bestaande bestelling, zoek hieronder naar de gewenste bestelling.
                    <script type="text/javascript">
                      let addToOrderAddress = {};
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
                    <div class="input-group mb-2">
                      <input type="text" class="form-control {if $added_to_order_msg.field == $delivery_option}{$added_to_order_msg.class}{/if}" id="desired_reference" placeholder="YS-000000">
                      <input type="hidden" name="added_to_order" id="added_to_order" value="">
                      <div class="input-group-append">
                        <button id="search_order_for_shipping" class="btn btn-sm btn-success"><i class="fasl fa-magnifying-glass"></i></button>
                      </div>
                    </div>
                    <span class="w-100 text-danger text-center text-md-left" id="desired_reference_error">
                      {if $added_to_order_msg.field == $delivery_option}
                        {$added_to_order_msg.validation_msg}
                      {/if}
                    </span>


                  </div>
                  <div class="col-11 offset-1 pl-4 pt-2  added-to-order-block" style="display:none;" id="order_number_show">
                    <div class="row">
                      <div class="col-12" id="order_number_show_block">
                      </div>
                    </div>
                  </div>
                {/if}
                  </div>
                {*                End add2Order     *}
                {/if}
              {/foreach}
              <div class="row carrier-extra-content js-carrier-extra-content"{if $delivery_option != $carrier_id} style="display:none;"{/if}>
                {$carrier.extraContent nofilter}
              </div>
              <div class="clearfix"></div>
            </div>
          {/block}
          <div class="order-options mt-4 border-top-1">
            <div id="delivery">
              <label for="delivery_message"><b>{l s='bericht voor de pakketbezorger toevoegen (70 tekens)' d='Shop.Theme.Checkout'}</b></label>
              <textarea class="form-control" maxlength="70" rows="2" cols="120" id="delivery_message" name="delivery_message" placeholder="...">{$delivery_message}</textarea>
            </div>

            {if $recyclablePackAllowed}
              <span class="custom-checkbox">
                <input type="checkbox" id="input_recyclable" name="recyclable" value="1" {if $recyclable} checked {/if}>
                <span><i class="fasl fa-check checkbox-checked"></i></span>
                <label for="input_recyclable">{l s='I would like to receive my order in recycled packaging.' d='Shop.Theme.Checkout'}</label>
              </span>
            {/if}

            {if $gift.allowed}
              <span class="custom-checkbox">
                <input class="js-gift-checkbox" id="input_gift" name="gift" type="checkbox" value="1" {if $gift.isGift}checked="checked"{/if}>
                <span><i class="fasl fa-check checkbox-checked"></i></span>
                <label for="input_gift">{$gift.label}</label >
              </span>

              <div id="gift" class="collapse{if $gift.isGift} in{/if}">
                <label for="gift_message">{l s='If you\'d like, you can add a note to the gift:' d='Shop.Theme.Checkout'}</label>
                <textarea class="form-control" rows="2" cols="120" id="gift_message" name="gift_message">{$gift.message}</textarea>
              </div>
            {/if}

          </div>
        </div>
        <button type="submit" class="continue btn btn-success w-100" name="confirmDeliveryOption" value="1">
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
