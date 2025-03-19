<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:42
  from 'C:\wampserver\www\ijzershop8.local\modules\dynamicproduct\views\templates\hook\display-header.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fa554bb7_02040722',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '44a78f561cadbbba4742b7dc2cd7d79925861584' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\dynamicproduct\\views\\templates\\hook\\display-header.tpl',
      1 => 1738060473,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a342fa554bb7_02040722 (Smarty_Internal_Template $_smarty_tpl) {
if ((isset($_smarty_tpl->tpl_vars['dp_config']->value)) && $_smarty_tpl->tpl_vars['dp_config']->value->hide_qty) {?>
  <style>
    .product-add-to-cart > .control-label {
      display: none !important;
    }

    .product-quantity .qty {
      display: none !important;
    }
  </style>
  <?php echo '<script'; ?>
>
    document.addEventListener("DOMContentLoaded", function () {
      document.body.classList.add("dp-hide-qty")
    })
  <?php echo '</script'; ?>
>
<?php }
}
}
