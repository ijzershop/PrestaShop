{*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

{* {block name="page_title"}
  {l s='Customer service - Contact us' d='Modules.Contactform.Shop'}
{/block} *}

<section class="contact-form text-left">
{if Context::getContext()->controller->php_self == 'category' || Context::getContext()->controller->php_self == 'contact' || Context::getContext()->controller->php_self == 'search' }
     <div class="col-12 ">
      <div class="row justify-content-center">
      <div class="mx-auto col-12">
      <div class="h5 w-100 text-center">{if Context::getContext()->controller->php_self == 'search'}Uw zoekopdracht heeft geen resultaten opgeleverd. Wilt u weten of de {Configuration::get('PS_SHOP_NAME')} een alternatief kan leveren?{else}Mist u een product of wilt u weten of de {Configuration::get('PS_SHOP_NAME')} een alternatief kan leveren?{/if} Vraag het ons via het onderstaande formulier.</div>
      </div>
        <div class="col-12 text-left">
{/if}
 <div class="card card-block bg-info">
    {if Context::getContext()->controller->php_self == 'contactoffer'}
      <form action="/offerte-aanvragen" class="needs-validation" novalidate method="post" {if $contact.allow_file_upload}enctype="multipart/form-data"{/if}>
        <input type="hidden" value="offer" name="template_type"/>
    {else if Context::getContext()->controller->php_self == 'contactinformation'}
      <form action="/informatie-aanvragen" class="needs-validation" novalidate  method="post" {if $contact.allow_file_upload}enctype="multipart/form-data"{/if}>
        <input type="hidden" value="information" name="template_type"/>

          {else if Context::getContext()->controller->php_self == 'contactretour'}
        <form action="/herroeping-aanvragen" class="needs-validation" novalidate  method="post" {if $contact.allow_file_upload}enctype="multipart/form-data"{/if}>
          <input type="hidden" value="retour" name="template_type"/>
          <input type="hidden" value="" name="id_customer"/>
            {else}
        <form action="{$urls.pages.contact}" class="needs-validation" novalidate method="post" {if $contact.allow_file_upload}enctype="multipart/form-data"{/if}>
        <input type="hidden" value="contact" name="template_type"/>
    {/if}

    <header class="card-header bg-primary p-2 pl-3">
      {if Context::getContext()->controller->php_self == 'contactoffer'}
      <h5 class="h5 text-white m-0">{l s='Offerte aanvraag' d='Modules.Contactform.Shop'}</h5>
      {else if Context::getContext()->controller->php_self == 'contactinformation'}
      <h5 class="h5 text-white m-0">{l s='Informatie aanvraag' d='Modules.Contactform.Shop'}</h5>
      {else if Context::getContext()->controller->php_self == 'contactretour'}
      <h5 class="h5 text-white m-0">{l s='Herroepingformulier' d='Modules.Contactform.Shop'}</h5>
      {else if Context::getContext()->controller->php_self == 'category'}
      <h5 class="h5 text-white m-0">{l s='Alternatief product ?' d='Modules.Contactform.Shop'}</h5>
      {else}
      <h5 class="h5 text-white m-0">{l s='Alternatief product ?' d='Modules.Contactform.Shop'}</h5>
      {/if}
    </header>
    <div class="card-body">
    {if $notifications}

      <div id="contact-form-notifications" class="notification alert {if $notifications.nw_error}alert-danger{else}alert-success{/if}" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="alert-heading">{if $notifications.nw_error}Er ging iets mis!{else}Geslaagd!{/if}</h4>
        <p>
        <ul class="list-unstyled">
            {foreach $notifications.messages as $notif}
              <li>{$notif}</li>
            {/foreach}
        </ul>
        </p>
      </div>



{*      <div class="notification {if $notifications.nw_error}notification-error{else}notification-success{/if}">*}
{*        <ul class="list-unstyled">*}
{*          {foreach $notifications.messages as $notif}*}
{*            <li>{$notif}</li>*}
{*          {/foreach}*}
{*        </ul>*}
{*      </div>*}
    {/if}

    {if !$notifications || $notifications.nw_error}
      <section class="form-fields">
        {if Context::getContext()->controller->php_self == 'contactinformation'}
          <input type="hidden" value="2" class="form-control" name="id_contact">
        {elseif Context::getContext()->controller->php_self == 'contactoffer'}
          <input type="hidden" value="3" class="form-control" name="id_contact">
        {else}
          <input type="hidden" value="2" class="form-control" name="id_contact">
        {/if}
        <label class="text-dark">{l s='Your name or Company name' d='Modules.Contactform.Shop'}</label>
          <input class="form-control mb-2" type="text" name="name" value="{$contact.email}" />

        <label class="text-dark">{l s='Email address' d='Modules.Contactform.Shop'}</label>
          <input class="form-control mb-2" type="email" name="from" value="" />

        {if Context::getContext()->controller->php_self == 'contactretour' }
          <label class="text-dark">{l s='Phonenumber' d='Modules.Contactform.Shop'}</label>
          <input class="form-control mb-2" type="text" name="phonenumber" value="" />
        {/if}


        {if Context::getContext()->controller->php_self == 'contactinformation' || Context::getContext()->controller->php_self == 'contactoffer'}
        <label class="text-dark">{l s='Postalcode' d='Modules.Contactform.Shop'}</label>
          <input class="form-control mb-2" type="text" name="postalcode" value="" required/>
          <div class="invalid-feedback">
            Vul a.u.b. uw postcode in dan kunnen wij u beter helpen.
          </div>
        <label class="text-dark">{l s='Phonenumber' d='Modules.Contactform.Shop'}</label>
          <input class="form-control mb-2" type="text" name="phonenumber" value="" />
        {/if}

        {if Context::getContext()->controller->php_self == 'contactretour' }
          {if $contact.orders}
{*            <label class="text-dark">{l s='Order reference' d='Modules.Contactform.Shop'}</label>*}
            <div class="card car-body col">


            <div class="form-row mb-2">
              <span class="col form-text text-muted">Selecteer een bestelling om de bijhorende producten op te halen. U kunt dan per product aangeven welke u wilt retourneren.</span>
              <br/>
            </div>
            <select class="form-control mb-2" name="id_order">
                <option value="">{l s='Select reference' d='Modules.Contactform.Shop'}</option>
                {foreach from=$contact.orders item=order}
                  <option value="{$order.id_order}">{$order.reference}</option>
                {/foreach}
              </select>
            </div>
              {else}
            <div class="card card-body">
            <div class="form-row">
              <span class="col form-text text-muted">Vul eerst uw bestelling referentie en bijhorende postcode in. Klik daarna op <button disabled onclick="void(0)" type="button" style="font-size: .5rem;" class="btn-sm btn btn-success"><i class="fa-sharp fa-search"></i></button> om de producten van uw bestelling op te halen. U kunt dan per product aangeven welke u wilt retourneren</span>
              <br/>
            </div>
            <div class="form-row">
              <input type="hidden" value="" name="id_order">
              <div class="col">
              <input class="form-control mb-2" type="text" name="order_referenc" value="" placeholder="{l s='YS-*******' d='Modules.Contactform.Shop'}"/>
              </div>
              <div class="col">
                <input class="form-control mb-2" type="text" name="postcode" value="" placeholder="{l s='Postalcode' d='Modules.Contactform.Shop'}" />
              </div>
              <div class="">
                <button id="retour_order_search" type="button" class="btn btn-success"><i class="fa-sharp fa-search"></i></button>
              </div>
            </div>
            </div>
          {/if}

          {if Context::getContext()->controller->php_self == 'contactretour' }

            <div id="contact_return_alert"  style="display:none;"  class="alert alert-warning alert-dismissible fade show w-100" role="alert">
              <strong>Er ging iets mis!</strong>
              <span id="error_msg_contact"></span>
              <span>Probeer het nogmaal of neem contact op met ons.</span>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div id="retourform-table" class="form-row mt-2">
            <div class="col">
              <label class="text-dark">{l s='Producten te retourneren' d='Modules.Contactform.Shop'}</label>
              <div class="collapse" id="retour_table_customized_info">
              <div class="card-body card bg-transparent">
                <div class="row  text-primary align-middle">
                  <div class="blockquote col-2 text-center"><i class="fa-sharp fa-info fa-2x"></i></div><div class="col-10 pl-0">Alleen onbewerkte producten kunnen geretourneerd worden. Alle producten die geknipt gezaagd of op andere wijze bewerkt zijn zullen niet vergoed worden</div>
                </div>
              </div>
            </div>
              <table class="table disabled">
                <thead>
                <tr>
                  <th class="col-2 col-md-1 align-middle">#</th>
                  <th class="col-7 col-md-8 align-middle">Naam</th>
                  <th class="col-3 align-middle">Aantal</th>
                </tr>
                </thead>
               <tbody></tbody>
              </table>
            </div>
          </div>
          {/if}

        {/if}




        {if $contact.allow_file_upload}
          <label class="text-dark">{if Context::getContext()->controller->php_self == 'contactretour' }Eventuele Foto{else}{l s='Attach File' d='Modules.Contactform.Shop'}{/if}</label>
            <div class="custom-file mb-4">
              <input class="custom-file-input" type="file" name="fileUpload" id="fileUpload"/>
              <label class="custom-file-label" for="fileUpload">{l s='Attach File' d='Modules.Contactform.Shop'}</label>
              <small class="">Beschikbaar types: .pdf,.zip,.png,.jpeg,.gif,.dxf</small>
            </div>
        {/if}

        <label class="text-dark">{if Context::getContext()->controller->php_self != 'category' && Context::getContext()->controller->php_self != 'contact' }{if Context::getContext()->controller->php_self == 'contactretour' }Extra Toelichting{else}{l s='Message' d='Modules.Contactform.Shop'}{/if}{else}Bericht ("Ik mis het volgende product"){/if}</label>
          <textarea class="form-control" cols="67" rows="13" name="message">{if $contact.message}{$contact.message}{/if}</textarea>

        <div class="pt-2">
          {hook h='displayRecaptcha'}
        </div>
        <div class="pt-2">
          {hook h='displayGDPRConsent' id_module=$id_module}
        </div>
      </section>

      <footer class="form-footer">
        <style>
          input[name=url] {
            display: none !important;
          }
        </style>
        <input class="form-control" type="text" name="url" value=""/>
        <input type="hidden" name="token" value="{$token|escape:'htmlall':'UTF-8'}" />
        <button type="submit"  class="btn btn-primary w-100"  name="submitMessage" disabled="disabled" value="{l s='Send' d='Modules.Contactform.Shop'}">
            {l s='Send' d='Modules.Contactform.Shop'}
        </button>

      </footer>
    {/if}
  </form>
  </div>
  </div>
{if Context::getContext()->controller->php_self == 'category' || Context::getContext()->controller->php_self == 'contact' }
</div>
      {block name='hook_not_found'}
      {hook h='displayNotFound'}
      {/block}
    </div>
      </div>
{/if}
</section>
  {include file="schema_org/organisation.tpl"}
