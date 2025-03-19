<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:46
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\_partials\shops-dropdown.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fe45d706_12647280',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '05d503343b46700fd699baa3dfaab64117550bef' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\_partials\\shops-dropdown.tpl',
      1 => 1730555022,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fe45d706_12647280 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- <div class="btn-group" id="store-switcher">
  <button type="button" class="btn btn-outline btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Bekijk onze andere winkels
  </button>
  <div class="dropdown-menu p-0">
    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, ShopGroup::getShopGroups(true), 'group', false, 'groupKey');
$_smarty_tpl->tpl_vars['group']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['groupKey']->value => $_smarty_tpl->tpl_vars['group']->value) {
$_smarty_tpl->tpl_vars['group']->do_else = false;
?>
      <?php if ($_smarty_tpl->tpl_vars['groupKey']->value > 0) {?>
        <a class="dropdown-item pl-1 pr-2" href="#" data-key="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['groupKey']->value, ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['group']->value->name, ENT_QUOTES, 'UTF-8');?>
</a>
        <div class="dropdown-divider px-1"></div>
      <?php }?>
      <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, Shop::getShops(true,$_smarty_tpl->tpl_vars['group']->value->id), 'shop', false, 'shopKey');
$_smarty_tpl->tpl_vars['shop']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['shopKey']->value => $_smarty_tpl->tpl_vars['shop']->value) {
$_smarty_tpl->tpl_vars['shop']->do_else = false;
?>
        <?php if ($_smarty_tpl->tpl_vars['shop']->value['active'] && $_smarty_tpl->tpl_vars['shop']->value['id_shop'] !== Context::getContext()->shop->id) {?>
          <a class="dropdown-item pl-1 pr-2" href="https://<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['domain_ssl'], ENT_QUOTES, 'UTF-8');?>
" data-key="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shopKey']->value, ENT_QUOTES, 'UTF-8');?>
">
            <img class="store-switcher-shop-logo mr-1" src="/themes/modernesmid_theme/assets/favicons/<?php echo htmlspecialchars((string) Context::getContext()->shop_favicon, ENT_QUOTES, 'UTF-8');?>
_favicons/favicon-32x32.png"/> <span class="font-weight-bold"> <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
</span></a>
        <?php }?>
      <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
  </div>
</div> -->
<?php }
}
