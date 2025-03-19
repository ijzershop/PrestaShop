<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:45
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\_partials\header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fd0bf8c4_19972948',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'f28ca56a0445fd1f448d335b06a14e353719b9da' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\_partials\\header.tpl',
      1 => 1731407681,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:_partials/shops-dropdown.tpl' => 1,
  ),
),false)) {
function content_67a342fd0bf8c4_19972948 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_107512973167a342fd05f382_64411007', 'header_banner');
?>


  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_193797301167a342fd061c37_06164760', 'header_top');
?>



<?php }
/* {block 'header_banner'} */
class Block_107512973167a342fd05f382_64411007 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'header_banner' => 
  array (
    0 => 'Block_107512973167a342fd05f382_64411007',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <div class="header-banner">
    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayBanner'),$_smarty_tpl ) );?>

  </div>
  <?php
}
}
/* {/block 'header_banner'} */
/* {block 'header_top'} */
class Block_193797301167a342fd061c37_06164760 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'header_top' => 
  array (
    0 => 'Block_193797301167a342fd061c37_06164760',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_assignInScope('withTax', Context::getContext()->cookie->price_vat_settings_incl === "true");?>
    <div class="header-top">
    <div class="cart_body <?php if (Context::getContext()->cart->nbProducts() == 0) {?> no_show_empty <?php }?>">
      <div class="side_panel d-none" id="shoppingcart-side-panel">
          <?php if (Module::isEnabled('ps_shoppingcart')) {?>
                              <style>
                .js-cart{
                  width: 100%;
                }
              </style>
                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayShoppingCart','p'=>'top_header'),$_smarty_tpl ) );?>

          <?php }?>
      </div>
    </div>
    <div class="menu_body d-block">
      <div class="side_panel d-none" id="menu-side-panel">
        <div class="menu-title row">
          <div class="col-6">
            <div class="btw-slider float-left" style="margin-top: -5px;">
              <label class="toggle">
                <input type="checkbox" id="vat_toggler_menu" class="vat_toggler" <?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {?>checked="checked"<?php }?>>
                <span class="slider"></span>
                <span class="labels" data-on="Incl" data-off="Excl"></span>
              </label>
            </div>
          </div>
          <div class="col-6 pr-0">
            <div class="row">
              <a class="col-12 text-white text-decoration-none d-none menu-chevron-close" href="#" id="navbar-search-chevron"><i class="float-right mt-1 mb-1 mr-1 ml-1 fasl fa-times"></i> Zoeken</a>
              <a class="col-12 text-white text-decoration-none d-none menu-chevron-close" href="#" id="navbar-menu-chevron"><i class="float-right mt-1 mb-1 mr-3 fasl fa-times"></i></a>

            </div>
          </div>
          <a class="col-12 text-white text-decoration-none text-left" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['authentication'], ENT_QUOTES, 'UTF-8');?>
"><i class="fasl fa-user-circle" style="height: .8em;"></i>  Inloggen </a>
        </div>
        <div class="row m-0">
          <div class="col-12 d-none p-0" id="side-panel-menu-block">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>"displayLeftColumn"),$_smarty_tpl ) );?>

          </div>
          <div class="col-12 d-none p-0" id="side-panel-search-block">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>"displaySearch"),$_smarty_tpl ) );?>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <table id="header-table" class="col m-0 ml-md-2 mr-md-2 ml-lg-3 mr-lg-3">
        <tr class="row">
          <td class="col d-none d-md-flex col-sm-6  col-lg-4 p-0">
                              <?php if (in_array($_smarty_tpl->tpl_vars['urls']->value['base_url'],explode(',',Configuration::get('MSTHEMECONFIG_TEST_WEBSITES',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,array())))) {?>
                  <style type="text/css">
                    img.logo{
                      transform: rotate(180deg);
                    }
                  </style>
                <?php }?>
              <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['base_url'], ENT_QUOTES, 'UTF-8');?>
" class="header-logo-a w-100  pr-sm-5">
                <ul class="list-group mx-auto">
                  <li class="list-group-item border-0 p-0">
                    <img rel="preload" is="image" class="logo w-100 d-none d-md-block" src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo'], ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
">
                    <img rel="preload" is="image" class="logo w-100 d-block d-md-none" src="/themes/modernesmid_theme/assets/logo/<?php echo htmlspecialchars((string) strtolower($_smarty_tpl->tpl_vars['shop']->value['name']), ENT_QUOTES, 'UTF-8');?>
_mobile.svg" alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
">
                  </li>
                </ul>
              </a>
                          <?php $_smarty_tpl->_subTemplateRender('file:_partials/shops-dropdown.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
                        </td>
          <td id="kiyoh_header_column" class="<?php if (Module::isEnabled('ps_shoppingcart')) {?>col col-lg-4<?php } else { ?> col offset-lg-2 col-lg-4<?php }?> p-0 align-middle">
                            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'kiyohBanner'),$_smarty_tpl ) );?>

                        </td>
            <?php if (Module::isEnabled('ps_shoppingcart')) {?>
          <td class="d-none d-md-none d-lg-flex col  p-0 shoppingcart-header-box pr-md-2 pr-lg-0">
                          <style>
              .js-cart{
                width: 100%;
              }
            </style>
              <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayShoppingCart'),$_smarty_tpl ) );?>

                        </td>
            <?php }?>
        </tr>
      </table>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mainmenu-navbar p-0 p-md-0" data-toggle="sticky-onscroll" id="main-menu-bar">
    <div class="container">
      <a id="navbar-brand-item-lg" class="navbar-brand d-none d-lg-block" href="/"><img  rel="preload" as="image" src="/themes/modernesmid_theme/assets/logo/<?php echo htmlspecialchars((string) strtolower($_smarty_tpl->tpl_vars['shop']->value['name']), ENT_QUOTES, 'UTF-8');?>
-menu-logo.svg" class="" width="auto" height="22px" alt="Home" title="Ga naar de startpagina"></a>
      <ul class="nav col d-flex d-lg-none p-0">
        <li id="navbar-brand-item-mobile" class="nav-item p-0 text-center col">
          <a class="navbar-brand d-block d-lg-none col p-0 m-0 pt-1" href="/"><img  rel="preload" as="image" src="/themes/modernesmid_theme/assets/logo/<?php echo htmlspecialchars((string) strtolower($_smarty_tpl->tpl_vars['shop']->value['name']), ENT_QUOTES, 'UTF-8');?>
_mobile_white.svg" class="" style="height:30px;width: auto;float: left;margin-left: 15px;" alt="Home" title="Ga naar de startpagina"></a>
        </li>
        <?php if (Module::isEnabled('ps_categorytree') || (int)Configuration::get('MSTHEMECONFIG_HEADER_PHONENUMBER_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,'') == 1) {?>
        <li class="nav-item p-0 text-center col">
          <button class="navbar-toggler nav-link mx-auto" data-toggle="dropdown" type="button" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
              <i class="fak fa-menu-burger"></i>
            </span>
          </button>
        </li>
        <?php }?>
        <li class="nav-item p-0 text-center col d-none d-sm-block">
            <a aria-label="Contact Opnemen?" class="nav-link text-white bg-success navbar-contact-icon" href="/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,''), ENT_QUOTES, 'UTF-8');?>
"><i class="fasl fa-2x fa-envelope"></i><span class="d-none d-md-inline-block text"> Offerte Aanvraag</span></a>
        </li>
          <?php if (Module::isEnabled('ps_searchbar')) {?>
            <li class="nav-item p-0 text-center col"><a aria-label="Zoeken" class="nav-link text-white navbar-search-icon" href="#"><i class="fasl fa-2x fa-magnifying-glass"></i></a></li>
          <?php }?>
          <?php if (Module::isEnabled('ps_shoppingcart')) {?>
            <li class="nav-item p-0 col-5 col-sm-3"><a aria-label="Winkelwagen tonen/verbergen" class="nav-link text-white top-header-shoppingcart bg-success" id="top-header-shoppingcart-mobile-1" href="/winkelmandje?action=show"><i class="fasl fa-cart-shopping"></i><span class="shoppingcart-header-total-price float-right text-white"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::ONLY_PRODUCTS),'EUR'), ENT_QUOTES, 'UTF-8');?>
 </span><span id="amount_circle" class="amount_circle"><?php if (Context::getContext()->cart->nbProducts() > 99) {?>99+<?php } else {
echo htmlspecialchars((string) Context::getContext()->cart->nbProducts(), ENT_QUOTES, 'UTF-8');
}?></span></a></li>
          <?php }?>
      </ul>
      <div class="row collapse navbar-collapse">
        <?php if (Module::isEnabled('ps_categorytree') || (int)Configuration::get('MSTHEMECONFIG_HEADER_PHONENUMBER_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,'') == 1) {?>
        <button class="navbar-toggler nav-link nav-item pl-3 float-md-left d-md-block" data-toggle="dropdown" type="button" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon desktop">
            <i class="fak fa-menu-burger"></i>
          </span>
        </button>
        <?php }?>
        <ul class="navbar-nav mr-2">
          <li id="request-offer-button" class="ml-2">
            <a aria-label="Contact Opnemen?" class="nav-link text-white bg-success navbar-contact-icon" href="/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTOFFER_PAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,''), ENT_QUOTES, 'UTF-8');?>
"><i class="fasl fa-2x fa-envelope"></i><span class="d-none d-md-inline-block text"></span></a>
        </li>
        </ul>
        <?php if (Module::isEnabled('ps_searchbar')) {?>
        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displaySearch'),$_smarty_tpl ) );?>

        <?php }?>
        <div class="btw-slider nav-link col">
          <label class="toggle">
            <input type="checkbox" id="vat_toggler" class="vat_toggler" <?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {?>checked="checked"<?php }?>>
            <span class="slider"></span>
            <span class="labels" data-on="Incl" data-off="Excl"></span>
          </label>
        </div>

        <ul id="navbar-cart-item-mobile"  class="navbar-nav float-right d-none  col-2 pr-0">
        <li class="nav-item p-0 col"><a aria-label="Winkelwagen tonen/verbergen" class="nav-link text-white top-header-shoppingcart bg-success" id="top-header-shoppingcart-mobile-2" href="/winkelmandje?action=show"><i style="font-size: 1.7em;padding-right: 5px;" class="fasl fa-cart-shopping"></i><span class="shoppingcart-header-total-price float-right text-white" style="font-size: 1.3em;"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(Context::getContext()->cart->getOrderTotal($_smarty_tpl->tpl_vars['withTax']->value,Cart::BOTH),'EUR'), ENT_QUOTES, 'UTF-8');?>
 </span><span id="amount_circle" class="amount_circle"><?php if (Context::getContext()->cart->nbProducts() > 99) {?>99+<?php } else {
echo htmlspecialchars((string) Context::getContext()->cart->nbProducts(), ENT_QUOTES, 'UTF-8');
}?></span></a></li>
        </ul>
      </div>
    </div>
  </nav>

<?php if ((isset($_smarty_tpl->tpl_vars['geoip_msg']->value)) && !empty($_smarty_tpl->tpl_vars['geoip_msg']->value)) {?>
<div class="container mt-2">
  <div class="col-12 alert alert-warning alert-dismissible fade show" style="z-index:9999;position: absolute;top:10%;left:2em;right:2em;width: auto" role="alert">
    <h4 class="alert-heading w-100 text-center"><i class="fasl fa-info-circle"></i> Wij leveren alleen binnen Nederland en Belgie!</h4><button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
    <p><?php echo $_smarty_tpl->tpl_vars['geoip_msg']->value;?>
</p>
  </div>
</div>
<?php }?>
  <?php
}
}
/* {/block 'header_top'} */
}
