<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:53:43
  from 'C:\wampserver\www\ijzershop8.local\admin-dev\themes\default\template\content.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a343376f5a64_87528662',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '8985b8aef84d5ded4bc9ce976155296303e82a4d' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\admin-dev\\themes\\default\\template\\content.tpl',
      1 => 1727254408,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a343376f5a64_87528662 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="ajax_confirmation" class="alert alert-success hide"></div>
<div id="ajaxBox" style="display:none"></div>
<div id="content-message-box"></div>

<?php if ((isset($_smarty_tpl->tpl_vars['content']->value))) {?>
	<?php echo $_smarty_tpl->tpl_vars['content']->value;?>

<?php }
}
}
