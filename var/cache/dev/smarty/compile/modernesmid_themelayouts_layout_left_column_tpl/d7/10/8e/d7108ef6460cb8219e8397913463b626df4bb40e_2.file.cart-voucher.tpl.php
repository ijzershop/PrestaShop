<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:56
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-voucher.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fb81ac5c4_85656103',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd7108ef6460cb8219e8397913463b626df4bb40e' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-voucher.tpl',
      1 => 1729583382,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fb81ac5c4_85656103 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>

  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_72814892367bc1fb81962e9_98023865', 'cart_voucher');
?>

<?php }
/* {block 'cart_voucher_list'} */
class Block_156735073267bc1fb819a5e1_46313838 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <div class="col-12"><h6>Toegepaste korting</h6></div>
<?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['cart']->value['vouchers']['added'], 'voucher');
$_smarty_tpl->tpl_vars['voucher']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['voucher']->value) {
$_smarty_tpl->tpl_vars['voucher']->do_else = false;
?>
<div class="product-line-grid col-12">
  <div class="row">
    <!--  product left content: image-->
    <div class="product-line-grid-left col-12 col-sm-2 col-md-2 col-lg-2">
      <span class="product-image media-middle row mx-auto"></span>
    </div>
    <!--  product left body: description -->
    <div class="product-line-grid-body col-12 col-sm-10 col-md-10 col-lg-10 pl-lg-0 pr-0 text-center text-sm-left">
      <div class="row">
        <div class="product-line-info col-12 col-sm-6 col-md-6 col-lg-6 pl-3 pr-3 pl-sm-0 pr-sm-0 pt-2">
          <a class="label text-decoration-none text-dark" data-toggle="tooltip" data-placement="top" title="Deze korting geeft u een reductie van <?php echo htmlspecialchars((string) str_replace('-','',$_smarty_tpl->tpl_vars['voucher']->value['reduction_formatted']), ENT_QUOTES, 'UTF-8');?>
 incl. btw"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a></div>

        <!--  product left body: description -->
        <div class="product-line-grid-right product-line-actions col-12 col-sm-6 col-md-6 col-lg-6">
          <div class="row">
            <div class="col-md-10 col-sm-10 col-12 pl-3 pl-sm-2 pr-3 pr-sm-2">
              <div class="row">
                <div class="col-12 col-sm-6 qty">
                  <div class="row">
                    <div class="col-2 p-0 pt-2">
                      <?php if (Context::getContext()->belongs_to_voucher_group) {?>
                        <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['delete_url'], ENT_QUOTES, 'UTF-8');?>
" data-link-action="remove-voucher" class="text-dark"><i class="fasl fa-trash fa-2x"></i></a>
                      <?php }?>
                    </div>
                    <div class="col-10">

                    </div>
                  </div>

                </div>
                <div class="col-12 col-sm-6 price pl-0 mt-2 mt-sm-0">
            <span class="product-price" style="line-height: .7rem;">
              <strong>
                    <span class="inclusive-price">
                      <?php if ($_smarty_tpl->tpl_vars['withTax']->value) {?>
                        <?php if ($_smarty_tpl->tpl_vars['voucher']->value['reduction_percentage'] > 0) {?>
                          <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['reduction_value'], ENT_QUOTES, 'UTF-8');?>

                        <?php } else { ?>
                          <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['reduction_amount_full'], ENT_QUOTES, 'UTF-8');?>

                        <?php }?>
                      <?php } else { ?>
                        <?php if ($_smarty_tpl->tpl_vars['voucher']->value['reduction_percentage'] > 0) {?>
                          <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['reduction_value_tax_excl'], ENT_QUOTES, 'UTF-8');?>

                        <?php } else { ?>
                          <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['voucher']->value['reduction_amount_full_tax_exc'], ENT_QUOTES, 'UTF-8');?>

                        <?php }?>
                      <?php }?>
                    </span>
              </strong>
            </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <hr class="text-dark" style="opacity: 0.8">
  </div>
</div>
    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
    <?php
}
}
/* {/block 'cart_voucher_list'} */
/* {block 'cart_voucher'} */
class Block_72814892367bc1fb81962e9_98023865 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_voucher' => 
  array (
    0 => 'Block_72814892367bc1fb81962e9_98023865',
  ),
  'cart_voucher_list' => 
  array (
    0 => 'Block_156735073267bc1fb819a5e1_46313838',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>


    <?php $_smarty_tpl->_assignInScope('withTax', Context::getContext()->cookie->price_vat_settings_incl === "true");
if ($_smarty_tpl->tpl_vars['cart']->value['vouchers']['added']) {
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_156735073267bc1fb819a5e1_46313838', 'cart_voucher_list', $this->tplIndex);
?>

    <?php }?>
  <?php
}
}
/* {/block 'cart_voucher'} */
}
