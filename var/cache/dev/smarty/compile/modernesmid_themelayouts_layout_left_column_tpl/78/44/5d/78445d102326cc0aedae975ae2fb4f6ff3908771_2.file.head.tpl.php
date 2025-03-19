<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:44
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\_partials\head.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fc3c4c48_72047125',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '78445d102326cc0aedae975ae2fb4f6ff3908771' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\_partials\\head.tpl',
      1 => 1730186028,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:_partials/stylesheets.tpl' => 1,
    'file:_partials/javascript.tpl' => 1,
    'file:custom_blocks/cookie-check.tpl' => 1,
  ),
),false)) {
function content_67a342fc3c4c48_72047125 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_13303053067a342fc38a087_36080939', 'head_charset');
?>

<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_153222495067a342fc38bb99_44230621', 'head_ie_compatibility');
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_116992001567a342fc38cca0_56900933', 'head_seo');
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_31560432967a342fc39fa61_49291100', 'head_viewport');
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_105565901767a342fc3a07d3_53286736', 'head_icons');
?>

<link rel="manifest"
      href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/manifest.json"
      crossorigin="use-credentials">
<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_37147377467a342fc3ab050_76903798', 'stylesheets');
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_70245058967a342fc3acc61_72855555', 'javascript_head');
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_195097262367a342fc3aedf5_89175392', 'hook_header');
?>


<!-- Google Tag Manager -->
<?php echo '<script'; ?>
 type="text/javascript">
    
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://sst.ijzershop.nl/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PZJB8L3');
  
<?php echo '</script'; ?>
>
<!-- End Server Side Tagging (noscript) -->

<?php echo '<script'; ?>
 type="text/javascript">
    
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


<?php echo '</script'; ?>
>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_73897771667a342fc3b2571_41313724', 'hook_extra');
?>


<style type="text/css">
  [class*="bg-primary"] {
    background-color: <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_PRIMARY_COLOR',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
 !important;
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
    <tr id="info-row-mail"><td><a class="btn btn-primary rounded-0 w-100" href="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
"><i class="fasl fa-envelope float-left fa-2x"></i> Mail met ons</a></td></tr>
    <tr style="display: none;" id="info-row-phone"><td><a class="btn btn-primary rounded-0 w-100" href="tel://<?php echo htmlspecialchars((string) str_replace(' ','',Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
"><i class="fasl fa-phone float-left fa-2x"></i> Bel met ons</a></td></tr>
    <tr style="display: none;" id="info-row-whatsapp"><td><a target="_blank" class="btn btn-primary rounded-0 w-100" href="<?php echo htmlspecialchars((string) str_replace(' ','',Configuration::get('MSTHEMECONFIG_HEADER_WHATSAPP_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
"><i class="fab fa-whatsapp float-left fa-2x"></i> App met ons</a></td></tr>
    <tr style="display: none;" id="info-row-chat"><td><a class="btn btn-primary rounded-0 w-100" href="#"><i class="fa-tawkto-bubble float-left"></i> Chat met ons</a></td></tr>
    <tr id="info-row-maps"><td><a class="btn btn-primary rounded-0 w-100" target="_blank" href="https://www.google.com/maps/place/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_GOOGLE_STRING',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
"><i class="fasl fa-location-dot fa-2x float-left"></i> Vind ons</a></td></tr>
  </table>
</div>

<div id="contact-info-bubble" class="small d-block" title="Neem contact op met ons">
  <div class="contact-info-bubble">
    <div class="contact-info-text">
      <p id="contact-info-p">...</p>
    </div>
  </div>
</div>

<?php $_smarty_tpl->_subTemplateRender("file:custom_blocks/cookie-check.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
/* {block 'head_charset'} */
class Block_13303053067a342fc38a087_36080939 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'head_charset' => 
  array (
    0 => 'Block_13303053067a342fc38a087_36080939',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <meta charset="utf-8">
<?php
}
}
/* {/block 'head_charset'} */
/* {block 'head_ie_compatibility'} */
class Block_153222495067a342fc38bb99_44230621 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'head_ie_compatibility' => 
  array (
    0 => 'Block_153222495067a342fc38bb99_44230621',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <meta http-equiv="x-ua-compatible" content="ie=edge">
<?php
}
}
/* {/block 'head_ie_compatibility'} */
/* {block 'head_seo_title'} */
class Block_119075019067a342fc38d418_02143210 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['meta']['title'], ENT_QUOTES, 'UTF-8');
}
}
/* {/block 'head_seo_title'} */
/* {block 'head_seo_description'} */
class Block_205960271567a342fc38f883_05715225 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['meta']['description'], ENT_QUOTES, 'UTF-8');
}
}
/* {/block 'head_seo_description'} */
/* {block 'head_seo_keywords'} */
class Block_40012099567a342fc391356_98798709 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['meta']['keywords'], ENT_QUOTES, 'UTF-8');
}
}
/* {/block 'head_seo_keywords'} */
/* {block 'head_hreflang'} */
class Block_176519022667a342fc39a811_19302238 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['urls']->value['alternative_langs'], 'pageUrl', false, 'code');
$_smarty_tpl->tpl_vars['pageUrl']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['code']->value => $_smarty_tpl->tpl_vars['pageUrl']->value) {
$_smarty_tpl->tpl_vars['pageUrl']->do_else = false;
?>
          <link rel="alternate" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['pageUrl']->value, ENT_QUOTES, 'UTF-8');?>
" hreflang="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['code']->value, ENT_QUOTES, 'UTF-8');?>
">
        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
    <?php
}
}
/* {/block 'head_hreflang'} */
/* {block 'head_seo'} */
class Block_116992001567a342fc38cca0_56900933 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'head_seo' => 
  array (
    0 => 'Block_116992001567a342fc38cca0_56900933',
  ),
  'head_seo_title' => 
  array (
    0 => 'Block_119075019067a342fc38d418_02143210',
  ),
  'head_seo_description' => 
  array (
    0 => 'Block_205960271567a342fc38f883_05715225',
  ),
  'head_seo_keywords' => 
  array (
    0 => 'Block_40012099567a342fc391356_98798709',
  ),
  'head_hreflang' => 
  array (
    0 => 'Block_176519022667a342fc39a811_19302238',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <title><?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_119075019067a342fc38d418_02143210', 'head_seo_title', $this->tplIndex);
?>
</title>
  <meta name="description" content="<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_205960271567a342fc38f883_05715225', 'head_seo_description', $this->tplIndex);
?>
">
  <meta name="keywords" content="<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_40012099567a342fc391356_98798709', 'head_seo_keywords', $this->tplIndex);
?>
">
<?php if ($_smarty_tpl->tpl_vars['page']->value['meta']['robots'] !== 'index') {?>
      <meta name="robots" content="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['meta']['robots'], ENT_QUOTES, 'UTF-8');?>
">
      <?php } elseif (((isset($_smarty_tpl->tpl_vars['robots_follow']->value)) && $_smarty_tpl->tpl_vars['robots_follow']->value === 'nofollow') || $_smarty_tpl->tpl_vars['page']->value['page_name'] === 'contactinformation' || $_smarty_tpl->tpl_vars['page']->value['page_name'] === 'contactoffer') {?>
      <meta name="googlebot" content="noindex,nofollow"/>
      <meta name="robots" content="noindex,nofollow"/>
    <?php } else { ?>
      <meta name="robots" content="index,follow">
      <meta name="googlebot" content="index,follow">
    <?php }?>
    <?php if ($_smarty_tpl->tpl_vars['page']->value['canonical']) {?>
      <link rel="canonical" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['canonical'], ENT_QUOTES, 'UTF-8');?>
">
    <?php }?>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_176519022667a342fc39a811_19302238', 'head_hreflang', $this->tplIndex);
?>

<?php
}
}
/* {/block 'head_seo'} */
/* {block 'head_viewport'} */
class Block_31560432967a342fc39fa61_49291100 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'head_viewport' => 
  array (
    0 => 'Block_31560432967a342fc39fa61_49291100',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <meta name="viewport" content="width=device-width, initial-scale=1">
<?php
}
}
/* {/block 'head_viewport'} */
/* {block 'head_icons'} */
class Block_105565901767a342fc3a07d3_53286736 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'head_icons' => 
  array (
    0 => 'Block_105565901767a342fc3a07d3_53286736',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php $_smarty_tpl->_assignInScope('favicon', Context::getContext()->shop_favicon);?>
  <link rel="icon" type="image/vnd.microsoft.icon" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['favicon'], ENT_QUOTES, 'UTF-8');?>
?<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['favicon_update_time'], ENT_QUOTES, 'UTF-8');?>
">
  <link rel="shortcut icon" type="image/x-icon" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['favicon'], ENT_QUOTES, 'UTF-8');?>
?<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['favicon_update_time'], ENT_QUOTES, 'UTF-8');?>
">
  <link rel="apple-touch-icon" sizes="57x57"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="60x60"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="72x72"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-72x72.png">
  <link rel="apple-touch-icon" sizes="76x76"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="114x114"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-114x114.png">
  <link rel="apple-touch-icon" sizes="120x120"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="144x144"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-144x144.png">
  <link rel="apple-touch-icon" sizes="152x152"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/apple-icon-180x180.png">
  <link rel="icon" type="image/png" sizes="192x192"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="32x32"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/favicon-16x16.png">
  <link rel="manifest"
        href="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/manifest.json"
        crossorigin="use-credentials">
  <meta name="msapplication-TileColor" content="#3b56ad">
  <meta name="msapplication-TileImage"
        content="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['favicon']->value, ENT_QUOTES, 'UTF-8');?>
_favicons/ms-icon-144x144.png">
  <meta name="theme-color" content="#3b56ad"/>
<?php
}
}
/* {/block 'head_icons'} */
/* {block 'stylesheets'} */
class Block_37147377467a342fc3ab050_76903798 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'stylesheets' => 
  array (
    0 => 'Block_37147377467a342fc3ab050_76903798',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender("file:_partials/stylesheets.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('stylesheets'=>$_smarty_tpl->tpl_vars['stylesheets']->value), 0, false);
}
}
/* {/block 'stylesheets'} */
/* {block 'javascript_head'} */
class Block_70245058967a342fc3acc61_72855555 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'javascript_head' => 
  array (
    0 => 'Block_70245058967a342fc3acc61_72855555',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender("file:_partials/javascript.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('javascript'=>$_smarty_tpl->tpl_vars['javascript']->value['head'],'vars'=>$_smarty_tpl->tpl_vars['js_custom_vars']->value), 0, false);
}
}
/* {/block 'javascript_head'} */
/* {block 'hook_header'} */
class Block_195097262367a342fc3aedf5_89175392 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'hook_header' => 
  array (
    0 => 'Block_195097262367a342fc3aedf5_89175392',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php echo $_smarty_tpl->tpl_vars['HOOK_HEADER']->value;?>

<?php
}
}
/* {/block 'hook_header'} */
/* {block 'hook_extra'} */
class Block_73897771667a342fc3b2571_41313724 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'hook_extra' => 
  array (
    0 => 'Block_73897771667a342fc3b2571_41313724',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'hook_extra'} */
}
