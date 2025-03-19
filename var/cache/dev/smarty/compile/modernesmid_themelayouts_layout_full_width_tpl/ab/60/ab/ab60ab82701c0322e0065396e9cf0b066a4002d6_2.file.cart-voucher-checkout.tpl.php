<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:14
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-voucher-checkout.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fca8e8287_92654460',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'ab60ab82701c0322e0065396e9cf0b066a4002d6' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-voucher-checkout.tpl',
      1 => 1729583382,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fca8e8287_92654460 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>

  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_205921972167bc1fca8e10b5_76211651', 'cart_voucher');
?>

<?php }
/* {block 'cart_voucher_list'} */
class Block_42390834067bc1fca8e2549_91500337 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <ul class="promo-name card-block list-unstyled">
              <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cart']->value['vouchers']['added'], 'voucher');
$_smarty_tpl->tpl_vars['voucher']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['voucher']->value) {
$_smarty_tpl->tpl_vars['voucher']->do_else = false;
?>
                <li class="cart-summary-line" data-toggle="tooltip" data-placement="top" title="Deze korting geeft u een reductie van <?php echo htmlspecialchars((string) str_replace('-','',$_smarty_tpl->tpl_vars['voucher']->value['reduction_formatted']), ENT_QUOTES, 'UTF-8');?>
 incl. btw">
                  <table class="w-100 text-muted">
                    <tr>
                      <td><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['name'], ENT_QUOTES, 'UTF-8');?>
</td>
                      <?php if (Context::getContext()->belongs_to_voucher_group) {?>
                      <td class="text-right"><a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['delete_url'], ENT_QUOTES, 'UTF-8');?>
" data-link-action="remove-voucher"><i class="fasl fa-trash text-danger"></i></a></td>
                      <?php }?>
                    </tr>
                  </table>
                </li>
              <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
            </ul>
          <?php
}
}
/* {/block 'cart_voucher_list'} */
/* {block 'cart_voucher'} */
class Block_205921972167bc1fca8e10b5_76211651 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_voucher' => 
  array (
    0 => 'Block_205921972167bc1fca8e10b5_76211651',
  ),
  'cart_voucher_list' => 
  array (
    0 => 'Block_42390834067bc1fca8e2549_91500337',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <div class="block-promo mb-2 pt-2 border-top" style="border-top-style:dashed!important;">
    <div class="cart-voucher">
    <?php if ($_smarty_tpl->tpl_vars['cart']->value['vouchers']['added']) {?>
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_42390834067bc1fca8e2549_91500337', 'cart_voucher_list', $this->tplIndex);
?>

        <?php }?>
  <?php
}
}
/* {/block 'cart_voucher'} */
}
