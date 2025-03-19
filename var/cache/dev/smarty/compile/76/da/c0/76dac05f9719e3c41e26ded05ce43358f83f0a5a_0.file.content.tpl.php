<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:54:22
  from 'C:\wampserver\www\ijzershop8.local\admin-dev\themes\new-theme\template\content.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a3435e97fb60_48286294',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '76dac05f9719e3c41e26ded05ce43358f83f0a5a' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\admin-dev\\themes\\new-theme\\template\\content.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a3435e97fb60_48286294 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div id="ajax_confirmation" class="alert alert-success" style="display: none;"></div>
<div id="content-message-box"></div>


<?php if ((isset($_smarty_tpl->tpl_vars['content']->value))) {?>
  <?php echo $_smarty_tpl->tpl_vars['content']->value;?>

<?php }
}
}
