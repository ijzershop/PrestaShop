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
          <div class="modal-content border-0">



            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h5 class="modal-title text-primary">Informatie voor klanten uit België!</h5>
              <hr class="w-100 border-bottom border-3 border-dark">
              <p>Wij leveren uitsluitend aan particuliere klanten in België.<br>
                <strong>Het is daarom niet mogelijk om een factuur met 0% BTW te ontvangen of aan te vragen.</strong><br/><br/>
                Levertijd in België is 5-7 werkdagen.<br/>
              </p>
              <br/>
              <br/>
              <h5 class="modal-title text-primary">Informations pour les clients Belges!</h5>
              <hr class="w-100 border-bottom border-3 border-dark">
              <p>Nous livrons uniquement aux clients privés en Belgique.<br>
                <strong>Il nést pas possible de recevoir ou de demander une facture avec 0% de TVA</strong><br/><br/>
                Le délai de livraison en Belgique est d'environ 5 á 7 jours ouvrables<br/>
              </p>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary w-100" data-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal" id="geo-shipping-msg" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content border-0">
            <div class="modal-body">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <p>
                <h5 class="text-primary">Wij verzenden uitsluitend naar Nederland en België</h5>
              </p>
              <hr class="w-100 border-bottom border-3 border-dark"/>
              <p>
              <h5 class="text-primary">We only ship to the Netherlands and Belgium</h5>
              </p>
              <hr class="w-100 border-bottom border-3 border-dark"/>
              <p>
              <h5 class="text-primary">Wir versenden nur in die Niederlande und nach Belgien</h5>
              </p>
              <hr class="w-100 border-bottom border-3 border-dark"/>
              <p>
              <h5 class="text-primary">Nous expéditions uniquement aux Pays-Bas et en Belgique</h5>
              </p>
              <hr class="w-100 border-bottom border-3 border-dark"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary w-100" data-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>

      <script>




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


{if Context::getContext()->country->iso_code != 'BE' &&  Context::getContext()->country->iso_code !== 'NL' && !Context::getContext()->cookie->accepted_shipping_msg}
      $('#geo-shipping-msg').modal('show');
      $('#geo-shipping-msg').on('hide.bs.modal', function (e) {
        // Set cookie data to show only once
        $.get(postcodeApiUrl+"?method=set-viewed-geo-shipping-msg");
      });
    {/if}
  </script>
{/block}

{block name='hook_before_body_closing_tag'}
  {hook h='displayBeforeBodyClosingTag'}
{/block}

</body>

</html>
