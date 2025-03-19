<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:32
  from 'C:\wampserver\www\ijzershop8.local\modules\dynamicproduct\views\templates\hook\vite-script.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fdc4e8823_68025588',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'bde927bcc89181a570c7f8ac4fdcbdcf871abfc5' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\dynamicproduct\\views\\templates\\hook\\vite-script.tpl',
      1 => 1738060473,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fdc4e8823_68025588 (Smarty_Internal_Template $_smarty_tpl) {
echo '<script'; ?>
 type="module" src="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['script']->value,'htmlall','UTF-8' ));?>
"><?php echo '</script'; ?>
>
<?php }
}
