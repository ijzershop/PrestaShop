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
  {block name='header_banner'}
  <div class="header-banner">
    {hook h='displayBanner'}
  </div>
  {/block}



  {block name='header_nav'}
{*  <nav class="header-nav bg-dark">*}
{*    <div class="container">*}
{*      <div class="row">*}
{*        <div class="pl-0 col-md-12 col-xs-12">*}
{*          <div class="btn-group d-none d-sm-none d-md-block d-lg-block">*}
{*            <a class="btn btn-link" href="{Configuration::get('MSTHEMECONFIG_HEADER_WHATSAPP_LINK', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}" rel="noopener" target="_blank"><i class="fab fa-lg fa-whatsapp"></i> {Configuration::get('MSTHEMECONFIG_HEADER_WHATSAPP_TEXT', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}</a>*}
{*            <a class="btn btn-link" href="{Configuration::get('MSTHEMECONFIG_HEADER_PHONENUMBER_LINK', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"><i class="fa-sharp fa-lg fa-phone-square-alt"></i> {Configuration::get('MSTHEMECONFIG_HEADER_PHONENUMBER_TEXT', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}</a>*}
{*            <a class="btn btn-link" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"><i class="fa-sharp fa-lg fa-at"></i> {Configuration::get('MSTHEMECONFIG_HEADER_MAIL_TEXT', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}</a>*}
{*          {hook h='displayNav2'}*}
{*          </div>*}
{*        </div>*}
{*      </div>*}
{*    </div>*}
{*  </nav>*}
  {/block}


  {block name='header_top'}
    <div class="header-top">
    <div class="cart_body {if Context::getContext()->cart->nbProducts() == 0} no_show_empty {/if}">
      <div class="side_panel d-none" id="shoppingcart-side-panel">
        {include file='themes/modernesmid_theme/modules/ps_shoppingcart/ps_shoppingcart-list.tpl'}
      </div>
    </div>
    <div class="menu_body d-block">
      <div class="side_panel d-none" id="menu-side-panel">
        <div class="menu-title">
          <a class="text-white text-decoration-none d-none menu-chevron-close" href="#" id="navbar-menu-chevron"><i class="float-right mt-1 mb-1 mr-1 fa-sharp fa-chevron-left"></i> Menu</a>
          <a class="text-white text-decoration-none d-none menu-chevron-close" href="#" id="navbar-search-chevron"><i class="float-right mt-1 mb-1 mr-1 fa-sharp fa-chevron-left"></i> Zoeken</a>
        </div>
        <div class="row m-0">
          <div class="col-12 d-none p-0" id="side-panel-menu-block">
            {hook h="displayLeftColumn"}
          </div>
          <div class="col-12 d-none p-0" id="side-panel-search-block">
            {hook h="displaySearch"}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <table id="header-table" class="col m-0 ml-md-2 mr-md-2 ml-lg-3 mr-lg-3">
        <tr class="row">
          <td class="col col-xs-6 col-sm-6  col-lg-4 p-0">
              {*      Header column      *}
                {if in_array($urls.base_url, explode(',', Configuration::get('MSTHEMECONFIG_TEST_WEBSITES', Context::getContext()->language->id, null , Context::getContext()->shop->id, [])))}
                  <style type="text/css">
                    img.logo{
                      transform: rotate(180deg);
                    }
                  </style>
                {/if}
              <a href="{$urls.base_url}" class="header-logo-a w-100  pr-sm-5">
                <ul class="list-group mx-auto">
                  <li class="list-group-item border-0 p-0">
                    <img rel="preload" is="image" class="logo w-100 d-none d-md-block" src="{$shop.logo}" alt="{$shop.name}">
                    <img rel="preload" is="image" class="logo w-100 d-block d-md-none" src="/themes/modernesmid_theme/assets/logo/{strtolower($shop.name)}_mobile.svg" alt="{$shop.name}">
                  </li>
                </ul>
              </a>
              {*     / Header column      *}
          </td>
          <td id="kiyoh_header_column" class="{if Module::isEnabled('ps_shoppingcart')}col col-lg-4{else} col offset-lg-2 col-lg-4{/if} p-0 align-middle">
              {*      Kyio Column      *}
              {hook h='kiyohBanner'}
              {*     / Kyio Column      *}
          </td>
            {if Module::isEnabled('ps_shoppingcart')}
          <td class="d-none d-md-none d-lg-flex col  p-0 shoppingcart-header-box pr-md-2 pr-lg-4">
              {*    Winkelwagen Column        *}
            <style>
              .js-cart{
                width: 100%;
              }
            </style>
              {hook h='displayShoppingCart'}
              {*   / Winkelwagen Column        *}
          </td>
            {/if}
        </tr>
      </table>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mainmenu-navbar p-0 p-md-0" data-toggle="sticky-onscroll" id="main-menu-bar">
    <div class="container">
      <a id="navbar-brand-item-lg" class="navbar-brand d-none d-lg-block" href="/"><img  rel="preload" as="image" src="/themes/modernesmid_theme/assets/logo/{strtolower($shop.name)}-menu-logo.svg" width="auto" height="22px" alt="Home" title="Ga naar de startpagina"></a>
      <ul class="nav col d-flex d-lg-none p-0">
        <li id="navbar-brand-item-mobile" class="nav-item p-0 text-center col">
          <a class="navbar-brand d-block d-lg-none col p-0 m-0 pt-1" href="/"><img  rel="preload" as="image" src="/themes/modernesmid_theme/assets/logo/{strtolower($shop.name)}_mobile_white.svg" style="height:30px;width: auto;float: left;margin-left: 15px;" alt="Home" title="Ga naar de startpagina"></a>
        </li>
        {if Module::isEnabled('ps_categorytree') || (int)Configuration::get('MSTHEMECONFIG_HEADER_PHONENUMBER_LINK', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '') == 1}
        <li class="nav-item p-0 text-center col">
          <button class="navbar-toggler nav-link mx-auto" data-toggle="dropdown" type="button" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
              <i class="fak fa-menu-burger"></i>
            </span>
          </button>
        </li>
        {/if}
        <li class="nav-item p-0 text-center col">
{*          <div class="dropdown nav-contact mx-auto">*}
            <a aria-label="Contact Opnemen?" class="nav-link text-white bg-success navbar-contact-icon" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"><i class="fa-sharp fa-2x fa-envelope"></i><span class="d-none d-md-inline-block text"> Offerte Aanvraag</span></a>
{*          <div class="dropdown-menu" aria-labelledby="nav_contact_dropdown_mobile">*}
{*            <a class="dropdown-item" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"><i class="fa-sharp fa-envelope-open-dollar"></i> Offerte aanvragen</a>*}
{*            <a class="dropdown-item" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"> <i class="fa-sharp fa-info"></i> Informatie aanvragen</a>*}
{*            <a class="dropdown-item" href="/retour-aanvragen"> <i class="fa-sharp fa-warehouse"></i> Retour aanvragen</a>*}
{*            <a class="dropdown-item" href="{$urls.pages.guest_tracking}"><i class="fa-sharp fa-truck-fast"></i> Bestel status opvragen</a>*}
{*          </div>*}
{*          </div>*}
        </li>
          {if Module::isEnabled('ps_searchbar')}
            <li class="nav-item p-0 text-center col"><a aria-label="Zoeken" class="nav-link text-white navbar-search-icon" href="#"><i class="fa-sharp fa-2x fa-search"></i></a></li>
          {/if}
          {if Module::isEnabled('ps_shoppingcart')}
            <li class="nav-item p-0 col-5 col-sm-3"><a aria-label="Winkelwagen tonen/verbergen" class="nav-link text-white top-header-shoppingcart bg-success" id="top-header-shoppingcart-mobile" href="#"><i class="fa-sharp fa-shopping-cart"></i><span class="shoppingcart-header-total-price float-right text-white">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_PRODUCTS), 'EUR')} </span><span id="amount_circle" class="amount_circle">{if Context::getContext()->cart->nbProducts() > 99}99+{else}{Context::getContext()->cart->nbProducts()}{/if}</span></a></li>
          {/if}
      </ul>
      <div class="row collapse navbar-collapse">
        {if Module::isEnabled('ps_categorytree') || (int)Configuration::get('MSTHEMECONFIG_HEADER_PHONENUMBER_LINK', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '') == 1}
        <button class="navbar-toggler nav-link nav-item pl-3 float-md-left d-md-block" data-toggle="dropdown" type="button" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon desktop">
            <i class="fak fa-menu-burger"></i>
          </span>
        </button>
        {/if}
        <ul class="navbar-nav mr-2">
          <li id="request-offer-button" class="ml-2">
{*            <div class="dropdown nav-contact mx-auto">*}
            <a aria-label="Contact Opnemen?" class="nav-link text-white bg-success navbar-contact-icon" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"><i class="fa-sharp fa-2x fa-envelope"></i><span class="d-none d-md-inline-block text"> Offerte Aanvragen</span></a>

{*              <div class="dropdown-menu" aria-labelledby="nav_contact_dropdown_mobile">*}
{*                <a class="dropdown-item" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"><i class="fa-sharp fa-envelope-open-dollar"></i> Offerte aanvragen</a>*}
{*                <a class="dropdown-item" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"> <i class="fa-sharp fa-circle-info"></i> Informatie aanvragen</a>*}
{*                <a class="dropdown-item" href="/retour-aanvragen"> <i class="fa-sharp fa-warehouse"></i> Retour aanvragen</a>*}
{*                <a class="dropdown-item" href="{$urls.pages.guest_tracking}"><i class="fa-sharp fa-truck-fast"></i> Bestel status opvragen</a>*}
{*              </div>*}
{*            </div>*}


{*            <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}" class="btn btn-success"><i class="fa-sharp fa-envelope"></i> Offerte aanvragen</a>*}
          </li>
        </ul>
        {if Module::isEnabled('ps_searchbar')}
        {hook h='displaySearch'}
        {/if}
        <ul id="navbar-cart-item-mobile"  class="navbar-nav float-right d-none  col-2 pr-0">
        <li class="nav-item p-0 col"><a aria-label="Winkelwagen tonen/verbergen" class="nav-link text-white top-header-shoppingcart bg-success" id="top-header-shoppingcart-mobile" href="#"><i style="font-size: 1.7em;padding-right: 5px;" class="fa-sharp fa-shopping-cart"></i><span class="shoppingcart-header-total-price float-right text-white" style="font-size: 1.3em;">{Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal(true, Cart::ONLY_PRODUCTS), 'EUR')} </span><span id="amount_circle" class="amount_circle">{if Context::getContext()->cart->nbProducts() > 99}99+{else}{Context::getContext()->cart->nbProducts()}{/if}</span></a></li>
        </ul>
      </div>
    </div>
  </nav>

{if isset($geoip_msg) && !empty($geoip_msg)}
<div class="container mt-2">
  <div class="col-12 alert alert-warning alert-dismissible fade show" role="alert">
    <h4 class="alert-heading"><i class="fa-sharp fa-info-circle"></i> Uw locatie is niet zichtbaar!</h4><button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
    <p>{$geoip_msg}</p>
    <p class="mb-0">Hulp nodig of een offerte aanvragen? neem dan contact met ons op via het <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE', Context::getContext()->language->id, null,  Context::getContext()->shop->id, '')}"><i class="fa-sharp fa-chevron-right"></i> Offerte formulier</a></p>
  </div>
</div>
{/if}
    <script>
{literal}
const element = document.getElementById("main-menu-bar");
const stickyObserver = new IntersectionObserver(function(){

  if(element.classList.contains('is-sticky')){
    document.getElementById('navbar-brand-item-lg').classList.add('d-lg-block');
    document.getElementById('navbar-brand-item-mobile').classList.remove('d-none');
    document.getElementById('navbar-cart-item-mobile').classList.remove('d-none');
  } else {
    document.getElementById('navbar-brand-item-lg').classList.remove('d-lg-block');
    document.getElementById('navbar-brand-item-mobile').classList.add('d-none');
    document.getElementById('navbar-cart-item-mobile').classList.add('d-none');
  }

}, {
  rootMargin: '-1px 0px 0px 0px',
  threshold: [1],
});

stickyObserver.observe(element);

{/literal}

    </script>



  {/block}


