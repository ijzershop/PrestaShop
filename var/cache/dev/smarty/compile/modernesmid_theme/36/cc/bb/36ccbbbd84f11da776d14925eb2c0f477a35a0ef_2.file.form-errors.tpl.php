<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:11
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\_partials\form-errors.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc7eb9ac1_18455445',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '36ccbbbd84f11da776d14925eb2c0f477a35a0ef' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\_partials\\form-errors.tpl',
      1 => 1731053101,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fc7eb9ac1_18455445 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.count.php','function'=>'smarty_modifier_count',),));
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
if (smarty_modifier_count($_smarty_tpl->tpl_vars['errors']->value)) {
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_79743328367bc1fc7eb5b09_58329694', 'form_errors');
?>

    <?php }?>

<?php }
/* {block 'notifications_error'} */
class Block_175286683067bc1fc7eb62a3_95325570 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <div class="invalid-feedback">
        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['errors']->value, 'error');
$_smarty_tpl->tpl_vars['error']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['error']->value) {
$_smarty_tpl->tpl_vars['error']->do_else = false;
?>
          <?php ob_start();
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['error']->value, ENT_QUOTES, 'UTF-8');
$_prefixVariable2 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable2, ENT_QUOTES, 'UTF-8');?>

        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
        </div>
      <?php
}
}
/* {/block 'notifications_error'} */
/* {block 'form_errors'} */
class Block_79743328367bc1fc7eb5b09_58329694 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'form_errors' => 
  array (
    0 => 'Block_79743328367bc1fc7eb5b09_58329694',
  ),
  'notifications_error' => 
  array (
    0 => 'Block_175286683067bc1fc7eb62a3_95325570',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_175286683067bc1fc7eb62a3_95325570', 'notifications_error', $this->tplIndex);
?>

<?php
}
}
/* {/block 'form_errors'} */
}
