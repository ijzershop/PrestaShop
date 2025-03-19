<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:11
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc70ae702_04312712',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '1968fd5240723f7aa5bdc7ffe0b5020e99310030' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\header.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fc70ae702_04312712 (Smarty_Internal_Template $_smarty_tpl) {
?>
    <nav class="header-nav">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6 p-0 mx-auto" id="desktop_logo">
            <a class="header-logo-a" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['base_url'], ENT_QUOTES, 'UTF-8');?>
">
              <img id="header-logo-img" class="logo w-100" src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo'], ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
">
            </a>
          </div>
        </div>
      </div>
    </nav>

<?php }
}
