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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{block name='head_charset'}
  <meta charset="utf-8">
{/block}
{block name='head_ie_compatibility'}
  <meta http-equiv="x-ua-compatible" content="ie=edge">
{/block}

{block name='head_seo'}
  <title>{block name='head_seo_title'}{$page.meta.title}{/block}</title>
  <meta name="description" content="{block name='head_seo_description'}{$page.meta.description}{/block}">
  <meta name="keywords" content="{block name='head_seo_keywords'}{$page.meta.keywords}{/block}">
{if $page.meta.robots !== 'index'}
      <meta name="robots" content="{$page.meta.robots}">
      {elseif (isset($robots_follow) && $robots_follow === 'nofollow') ||
      $page.page_name === 'contactinformation' ||
      $page.page_name === 'contactoffer'
      }
      <meta name="googlebot" content="noindex,nofollow"/>
      <meta name="robots" content="noindex,nofollow"/>
    {else}
      <meta name="robots" content="index,follow">
      <meta name="googlebot" content="index,follow">
    {/if}
    {if $page.canonical}
      <link rel="canonical" href="{$page.canonical}">
    {/if}
    {block name='head_hreflang'}
        {foreach from=$urls.alternative_langs item=pageUrl key=code}
          <link rel="alternate" href="{$pageUrl}" hreflang="{$code}">
        {/foreach}
    {/block}
{/block}

{block name='head_viewport'}
  <meta name="viewport" content="width=device-width, initial-scale=1">
{/block}

{block name='head_icons'}
  {assign var="favicon" value=Context::getContext()->shop_favicon}
  <link rel="icon" type="image/vnd.microsoft.icon" href="{$shop.favicon}?{$shop.favicon_update_time}">
  <link rel="shortcut icon" type="image/x-icon" href="{$shop.favicon}?{$shop.favicon_update_time}">
  <link rel="apple-touch-icon" sizes="57x57"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/favicon-16x16.png">
  <link rel="manifest"
        href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/manifest.json"
        crossorigin="use-credentials">
  <meta name="msapplication-TileColor" content="#3b56ad">
  <meta name="msapplication-TileImage"
        content="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/ms-icon-144x144.png">
  <meta name="theme-color" content="#3b56ad"/>
{/block}
<link rel="manifest"
      href="/themes/modernesmid_theme/assets/favicons/{$favicon}_favicons/manifest.json"
      crossorigin="use-credentials">
{block name='stylesheets'}
    {include file="_partials/stylesheets.tpl" stylesheets=$stylesheets}
{/block}

{block name='javascript_head'}
    {include file="_partials/javascript.tpl" javascript=$javascript.head vars=$js_custom_vars}
{/block}

{block name='hook_header'}
    {$HOOK_HEADER nofilter}
{/block}

<!-- Google Tag Manager -->
<script type="text/javascript">
    {literal}
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://sst.ijzershop.nl/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PZJB8L3');
  {/literal}
</script>
<!-- End Server Side Tagging (noscript) -->
{*<!-- Server Side Tagging (noscript) -->*}
{*<noscript><iframe src=https://sst.ijzershop.nl/ns.html?id=GTM-PZJB8L3 height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>*}
{*<!-- End Google Tag Manager -->*}

<script type="text/javascript">
    {literal}
  document.addEventListener('DOMContentLoaded', function(){
// week days and times definitions
let workingDays = [1,2,3,4,5];
let startHour = 8;
let endHour = 17;

let currentTime = new Date();
let currentHour = currentTime.getUTCHours();
let currentDay = currentTime.getUTCDay();

  let pageStatus = 'away';


if ((workingDays.indexOf(currentDay) !== -1 && (currentHour >= startHour && currentHour < endHour))) {
  document.getElementById('info-row-mail').style.display = 'table-row';
  document.getElementById('info-row-maps').style.display = 'table-row';
  document.getElementById('info-row-phone').style.display = 'table-row';
  document.getElementById('info-row-whatsapp').style.display = 'table-row';
  document.getElementById('info-row-chat').style.display = 'none';
} else {
  document.getElementById('info-row-mail').style.display = 'table-row';
  document.getElementById('info-row-maps').style.display = 'table-row';
  document.getElementById('info-row-phone').style.display = 'table-row';
  document.getElementById('info-row-whatsapp').style.display = 'table-row';
  document.getElementById('info-row-chat').style.display = 'none';
}
  }, false);

{/literal}
</script>


{block name='hook_extra'}{/block}

<style type="text/css">
  [class*="bg-primary"] {
    background-color: {Configuration::get('MSTHEMECONFIG_PRIMARY_COLOR', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)} !important;
  }
</style>

<div id="contact-info-box" class="d-none">
  <table width="100%" height="100%" style="border-color:#3b56ad;border-style:solid;border-width:1px 1px 0px 1px;">
    <tr><td class="pt-2 pb-2" >
        <h4 class="text-center text-bold">Openingstijden</h4>
        <table id="open-schedule" class="mx-auto">
          <tr><th>Maandag</th><td>8:00 - 17:00</td></tr>
          <tr><th>Dinsdag</th><td>8:00 - 17:00</td></tr>
          <tr><th>Woensdag</th><td>8:00 - 17:00</td></tr>
          <tr><th>Donderdag</th><td>8:00 - 17:00</td></tr>
          <tr><th>Vrijdag</th><td>8:00 - 17:00</td></tr>
          <tr><th>Zaterdag</th><td>Gesloten</td></tr>
          <tr><th>Zondag</th><td>Gesloten</td></tr>
        </table>
      </td>
    </tr>
    <table width="100%" height="100%">
    <tr id="info-row-mail"><td><a class="btn btn-primary rounded-0 w-100" href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}"><i class="fasl fa-envelope float-left fa-2x"></i> Mail met ons</a></td></tr>
    <tr style="display: none;" id="info-row-phone"><td><a class="btn btn-primary rounded-0 w-100" href="tel://{str_replace(' ','',Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}"><i class="fasl fa-phone float-left fa-2x"></i> Bel met ons</a></td></tr>
    <tr style="display: none;" id="info-row-whatsapp"><td><a target="_blank" class="btn btn-primary rounded-0 w-100" href="{str_replace(' ','',Configuration::get('MSTHEMECONFIG_HEADER_WHATSAPP_LINK', Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id))}"><i class="fab fa-whatsapp float-left fa-2x"></i> App met ons</a></td></tr>
    <tr style="display: none;" id="info-row-chat"><td><a class="btn btn-primary rounded-0 w-100" href="#"><i class="fa-tawkto-bubble float-left"></i> Chat met ons</a></td></tr>
    <tr id="info-row-maps"><td><a class="btn btn-primary rounded-0 w-100" target="_blank" href="https://www.google.com/maps/place/{Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_GOOGLE_STRING',Context::getContext()->language->id, Context::getContext()->shop->id_shop_group, Context::getContext()->shop->id)}"><i class="fasl fa-location-dot fa-2x float-left"></i> Vind ons</a></td></tr>
  </table>
</div>

<div id="contact-info-bubble" class="small d-block" title="Neem contact op met ons">
  <div class="contact-info-bubble">
    <div class="contact-info-text">
      <p id="contact-info-p">...</p>
    </div>
  </div>
</div>

{include file="custom_blocks/cookie-check.tpl"}
