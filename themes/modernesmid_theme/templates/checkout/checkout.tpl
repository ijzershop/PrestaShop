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
<!doctype html>
<html lang="{$language.iso_code}">
<head>
  {block name='head'}
    {include file='_partials/head.tpl'}
  {/block}
</head>

<body id="{$page.page_name}" class="{$page.body_classes|classnames}">

{block name='hook_after_body_opening_tag'}
  {hook h='displayAfterBodyOpeningTag'}
{/block}

<header id="header">
  {block name='header'}
    {include file='checkout/_partials/header.tpl'}
  {/block}
</header>

{include file='_partials/loader.tpl'}

<section id="wrapper" class="w-100 bg-light">
  {hook h="displayWrapperTop"}
  <div class="container-fluid pt-2">
    {include file='custom_blocks/notification.tpl'}
  </div>
  <div class="container p-2">
    {block name='content'}
      {block name='notifications'}
        {include file='_partials/notifications.tpl'}
      {/block}
      <section id="content" class="bg-light p-2">
        <div class="row">
          <div class="cart-grid-body col-xs-12 col-lg-8">
            {block name='checkout_process'}
              {render file='checkout/checkout-process.tpl' ui=$checkout_process}
            {/block}
          </div>
          <div class="cart-grid-right col-xs-12 col-lg-4 pl-lg-0">
            {block name='cart_summary'}
              {include file='checkout/_partials/cart-summary.tpl' cart=$cart}
            {/block}
            {hook h='displayReassurance'}
          </div>
        </div>
      </section>

      <div class="modal" id="be-btw-msg" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-primary">Let op! Voor klanten uit België</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Ook vanuit belgië betaalt u altijd 21% btw.<br>
                Aangezien wij uitsluitend aan particuliere klanten in België leveren,<br> wordt het BTW-bedrag ook in België door berekend.<br><br>
                <strong>Het is daarom niet mogelijk om een factuur met 0% BTW te ontvangen.</strong>
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary w-100" data-dismiss="modal">OK, gelezen</button>
            </div>
          </div>
        </div>
      </div>


      <script>


        let required_error = "{l s='Verplicht veld' mod='msthemeconfig'}";
        let invalid_email = "{l s='Email is ongeldig' mod='msthemeconfig'}";
        let pwd_error = "{l s='(Minimaal vijf tekens)' mod='msthemeconfig'}";
        let invalid_city = "{l s='Speciale karakters!<>;?=+@#°{}_$% are not allowed' mod='msthemeconfig'}";
        let invalid_address = "{l s='Speciale tekens !<>?=+@{}_$% zijn niet toegestaan' mod='msthemeconfig'}";
        let invalid_title = "{l s='Speciale tekens <>={} zijn niet toegestaan in de titel' mod='msthemeconfig'}";
        let invalid_number = "{l s='Alleen +.-() en cijfers zijn toegestaan' mod='msthemeconfig'}";
        let invalid_other_info = "{l s='Speciale tekens <>{} zijn niet toegestaan' mod='msthemeconfig'}";
        let invalid_country_msg = "{l s='Ongeldig land' mod='msthemeconfig'}";
        let invalid_state_msg = "{l s='Ongeldige status' mod='msthemeconfig'}";
        let invalid_name = "{l s='Naam is ongeldig' mod='msthemeconfig'}";
        let number_error = "{l s='Nummers zijn niet toegestaan' mod='msthemeconfig'}";
        let toc_error = "{l s='Accepteer alstublieft onze algemene voorwaarden voordat u uw bestelling bevestigt' mod='msthemeconfig'}";
        let zipcode_error = "{l s='Sommige producten in uw winkelwagen kunnen niet op het geselecteerde adres worden afgeleverd. Verwijder deze alstublieft of wijzig uw adres.' mod='msthemeconfig'}";
        let order_place_confirmation = "{l s='Kloppen alle door u verstrekte gegevens?' mod='msthemeconfig'}";
        let splchar_error = "{l s='Speciale karakters!<>,;?=+()@#°{}_$%: zijn niet toegestaan' mod='msthemeconfig'}";
        let street_number_warning = "{l s='Het huisnummer in het adres ontbreekt. Weet u zeker dat u er geen heeft?' mod='msthemeconfig'}";
        let not_same_email = "{l s='De email adressen komen niet overeen!' mod='msthemeconfig'}";
        let not_valid_phone = "{l s='Het telefoonnummer is onjuist!' mod='msthemeconfig'}";


        if(typeof postcodeApiUrl === "undefined"){
          postcodeApiUrl= "{url entity='module' name='msthemeconfig' controller='ajax'}";
        }
      </script>
    {/block}

    {hook h="displayWrapperBottom"}
  </div>
</section>
<footer id="footer" class="w-100 p-0 m-0 border-top">
  {block name='footer'}
    {include file='_partials/footer.tpl'}
  {/block}
</footer>

{block name='javascript_bottom'}
  {include file="_partials/javascript.tpl" javascript=$javascript.bottom}

  <script type="text/javascript">
    {if Context::getContext()->country->iso_code === 'BE' && !Context::getContext()->cookie->accepted_vat_be}
      $('#be-btw-msg').modal('show');
      $('#be-btw-msg').on('hide.bs.modal', function (e) {
        // Set cookie data to show only once
        $.get(postcodeApiUrl+"?method=set-viewed-be-vat-msg");
      });
    {/if}
  </script>
{/block}

{block name='hook_before_body_closing_tag'}
  {hook h='displayBeforeBodyClosingTag'}
{/block}

</body>

</html>
