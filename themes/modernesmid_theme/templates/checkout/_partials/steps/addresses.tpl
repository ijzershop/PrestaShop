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
  <div class="js-address-form">
    <form
      method="POST"
      data-id-address="{$id_address}"
      action="{url entity='order' params=['id_address' => $id_address]}"
      data-refresh-url="{url entity='order' params=['ajax' => 1, 'action' => 'addressForm']}"
      novalidate
    >
      {if $use_same_address}
        <p>
          {if $cart.is_virtual}
            {l s='The selected address will be used as your personal address (for invoice).' d='Shop.Theme.Checkout'}
          {else}
            {l s='The selected address will be used both as your personal address (for invoice) and as your delivery address.' d='Shop.Theme.Checkout'}
          {/if}
        </p>
      {else}
        <h2 class="h4">{l s='Shipping Address' d='Shop.Theme.Checkout'}</h2>
      {/if}


      {if $show_delivery_address_form || $show_invoice_address_form}
        {*Switch for en/dis-able the postcode check*}
        <div style="font-size: .8rem;min-height: 35px;" class="form-group d-block col-12 col-lg-6 p-0" id="toggle-postcode-check">
          <label class="col-7 p-0">
          <span class="info-icon-with-showhide-address" data-id="postcode-check-info-delivery">
            <i class="icon-info cart-info-btn"></i>
          </span>
            <span id="postcode-check-switch-label">Postcode validatie <b class="text-success"><i class="fasl fa-check fa-2x"></i></b></span>
          </label>
          <label class="switch col-5 float-right">
            <input type="checkbox" id="cart-postcode-check-toggle" checked>
            <span class="slider round"></span>
          </label>
        </div>
        <div  style="font-size: .8rem;text-transform: initial;display:none;" id="postcode-check-info-delivery" class="col-12 mt-2 p-0" >
          <p class="card p-2">Bij het invullen van uw postcode en bijhorende huisnummer wordt uw adres automatisch aangevuld en gevalideerd.
            Zo helpen we u fouten in uw adres voorkomen. <br/>Mocht u hiervan hinder ondervinden, dan kunt u deze Postcode check uitzetten.<br/>
            <span class="mt-1"><b>Let op!</b> Het adres wordt niet gevalideerd als de postcode check <b>uit</b> staat, dus kijk uw adres goed na voordat u de bestelling afrekent.</span</p>
        </div>
      {/if}

      {if $show_delivery_address_form}
        <div id="delivery-address">
          {render file                      = 'checkout/_partials/address-form.tpl'
            ui                        = $address_form
            use_same_address          = $use_same_address
            type                      = "delivery"
            form_has_continue_button  = $form_has_continue_button
          }
        </div>
      {elseif $customer.addresses|count > 0}
        <div id="delivery-addresses" class="address-selector js-address-selector">
          {include  file        = 'checkout/_partials/address-selector-block.tpl'
            addresses   = $customer.addresses
            name        = "id_address_delivery"
            selected    = $id_address_delivery
            type        = "delivery"
            interactive = !$show_delivery_address_form and !$show_invoice_address_form
          }
        </div>

        {if isset($delivery_address_error)}
          <p class="alert alert-danger js-address-error" name="alert-delivery" id="id-failure-address-{$delivery_address_error.id_address}">{$delivery_address_error.exception}</p>
        {else}
          <p class="alert alert-danger js-address-error" name="alert-delivery" style="display: none">{l s="Your address is incomplete, please update it." d="Shop.Notifications.Error"}</p>
        {/if}

        <p class="add-address">
          <a class="btn btn-primary btn-sm text-white" href="{$new_address_delivery_url}"><i class="fasl fa-plus"></i> {l s='add new address' d='Shop.Theme.Actions'}</a>
        </p>

        {if $use_same_address && !$cart.is_virtual}
          <p>
            <a class="btn btn-primary btn-sm text-white" data-link-action="different-invoice-address" href="{$use_different_address_url}">
              {l s='Billing address differs from shipping address' d='Shop.Theme.Checkout'}
            </a>
          </p>
        {/if}

      {/if}

      {if !$use_same_address}

        <h2 class="h4">{l s='Your Invoice Address' d='Shop.Theme.Checkout'}</h2>

        {if $show_invoice_address_form}


          <div id="invoice-address">
            {render file                      = 'checkout/_partials/address-form.tpl'
              ui                        = $address_form
              use_same_address          = $use_same_address
              type                      = "invoice"
              form_has_continue_button  = $form_has_continue_button
            }
          </div>
        {else}
          <div id="invoice-addresses" class="address-selector js-address-selector">
            {include  file        = 'checkout/_partials/address-selector-block.tpl'
              addresses   = $customer.addresses
              name        = "id_address_invoice"
              selected    = $id_address_invoice
              type        = "invoice"
              interactive = !$show_delivery_address_form and !$show_invoice_address_form
            }
          </div>

          {if isset($invoice_address_error)}
            <p class="alert alert-danger js-address-error" name="alert-invoice" id="id-failure-address-{$invoice_address_error.id_address}">{$invoice_address_error.exception}</p>
          {else}
            <p class="alert alert-danger js-address-error" name="alert-invoice" style="display: none">{l s="Your address is incomplete, please update it." d="Shop.Notifications.Error"}</p>
          {/if}

          <p class="add-address">
            <a class="btn btn-primary btn-sm text-white" href="{$new_address_invoice_url}"><i class="fasl fa-plus"></i> {l s='add new address' d='Shop.Theme.Actions'}</a>
          </p>
        {/if}

      {/if}

      {if !$form_has_continue_button}
        <div class="clearfix">
          <button type="submit" class="btn btn-success continue w-100 mb-4" name="confirm-addresses" value="1">
            {l s='Continue' d='Shop.Theme.Actions'}
          </button>
          <input type="hidden" id="not-valid-addresses" class="js-not-valid-addresses" value="{$not_valid_addresses}">
        </div>
      {/if}

    </form>
    {hook h='displayAddressSelectorBottom'}
  </div>
{/block}
