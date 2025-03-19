<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:32
  from 'C:\wampserver\www\ijzershop8.local\modules\sawandcutmodule\views\templates\front\cut-action-buttons.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fa0c17686_05804610',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '09c45fc95ef78b42c7715c643f10edd42fb056a5' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\sawandcutmodule\\views\\templates\\front\\cut-action-buttons.tpl',
      1 => 1730560707,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fa0c17686_05804610 (Smarty_Internal_Template $_smarty_tpl) {
if ((isset($_smarty_tpl->tpl_vars['product']->value->id))) {?>
	<?php $_smarty_tpl->_assignInScope('id_product', $_smarty_tpl->tpl_vars['product']->value->id);
} else { ?>
	<?php $_smarty_tpl->_assignInScope('id_product', $_smarty_tpl->tpl_vars['product']->value['id_product']);
}?>

	<button type="button" class="btn btn-default rounded-0 <?php if ($_smarty_tpl->tpl_vars['singleCutEnabled']->value) {?>cut-button<?php } else { ?>extended-cut-button<?php }?>" data-toggle="modal" data-target="#cut-modal" data-min-cut-size="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['minCutSize']->value, ENT_QUOTES, 'UTF-8');?>
" <?php if ($_smarty_tpl->tpl_vars['maxCuts']->value >= 0) {?>data-max-cuts="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['maxCuts']->value, ENT_QUOTES, 'UTF-8');?>
"<?php } else { ?>data-max-cuts="6"<?php }?>  data-cut-width="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cutWidth']->value, ENT_QUOTES, 'UTF-8');?>
" data-cut-length="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['cutLength']->value, ENT_QUOTES, 'UTF-8');?>
" data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['id_product']->value, ENT_QUOTES, 'UTF-8');?>
" data-default-cut-price="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value->default_cut_price, ENT_QUOTES, 'UTF-8');?>
" data-combi-prices="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['combiPrices']->value, ENT_QUOTES, 'UTF-8');?>
">
		<span class="fasl fa-cut"></span> <span class="info d-inline-block d-md-none d-sm-inline-block d-lg-none">Knip dit product</span>
	</button>

<?php }
}
