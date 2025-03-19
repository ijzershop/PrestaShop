<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:32
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\catalog\_partials\product-add-to-cart-mini.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fa06b9a60_54681378',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '144b34bb4bd8257f2b59977afd9249a10d14a6b7' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\catalog\\_partials\\product-add-to-cart-mini.tpl',
      1 => 1723108974,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fa06b9a60_54681378 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>


<div class="product-add-to-cart">
  <?php if (!$_smarty_tpl->tpl_vars['configuration']->value['is_catalog']) {?>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_21167744067bc1fa06a21d8_26230518', 'product_quantity');
?>

  <?php }?>
</div>
<?php }
/* {block 'product_quantity'} */
class Block_21167744067bc1fa06a21d8_26230518 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'product_quantity' => 
  array (
    0 => 'Block_21167744067bc1fa06a21d8_26230518',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <div class="product-quantity clearfix">
        <div class="qty col-12 col-sm-6 float-left p-0 pr-sm-1 pl-sm-2">
            <?php if (!Product::isAvailableForOrderCustom((int)$_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'])) {?>
            <span class="help-text text-warning col-12 p-0">
                      <span class="d-inline-block w-100  mb-3 mb-md-0" data-toggle="popover" data-title="Geen vooraad" data-content="Disabled popover">
                        <button class="badge badge-danger w-100 text-wrap border-0" style="min-height: 2.67em;pointer-events: none;font-size: 0.9rem;font-weight: inherit;" type="button" disabled>
                         <i class="fasl fa-ban"></i> Geen vooraad
                        </button>
                      </span>
                    </span>
            <?php } else { ?>
          <input
            data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
            type="number"
            name="qty_<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
            id="quantity_wanted_<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
            value="1"
            class="form-control mb-3 mb-md-0 input-group <?php echo htmlspecialchars((string) Product::isAvailableForOrderCustom((int)$_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],'class'), ENT_QUOTES, 'UTF-8');?>
"
            min="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['minimal_quantity'], ENT_QUOTES, 'UTF-8');?>
"
            max="<?php echo htmlspecialchars((string) Product::isAvailableForOrderCustom((int)$_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],'max'), ENT_QUOTES, 'UTF-8');?>
"
            aria-label="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Quantity','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
"
            style="<?php echo htmlspecialchars((string) Product::isAvailableForOrderCustom((int)$_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],'style'), ENT_QUOTES, 'UTF-8');?>
"
            <?php echo htmlspecialchars((string) Product::isAvailableForOrderCustom((int)$_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],'attr'), ENT_QUOTES, 'UTF-8');?>

          >
            <?php }?>
        </div>

        <div class="add col-12 col-sm-6 float-right p-0 pl-sm-1 pr-sm-0 pr-lg-2 mb-3 mb-sm-0">
          <a aria-label="Voeg <?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'truncate' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],30,'...' )), ENT_QUOTES, 'UTF-8');?>
 toe aan winkelwagen" alt="Voeg <?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'truncate' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],30,'...' )), ENT_QUOTES, 'UTF-8');?>
 toe aan winkelwagen" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getPageLink('cart',null,Context::getContext()->language->id,array('token'=>$_smarty_tpl->tpl_vars['static_token']->value),false,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
"
            data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
            data-product-customization="<?php echo htmlspecialchars((string) json_encode($_smarty_tpl->tpl_vars['product']->value['id_customization']), ENT_QUOTES, 'UTF-8');?>
"
            class="btn btn-success add-to-cart w-100 text-nowrap <?php echo htmlspecialchars((string) Product::isAvailableForOrderCustom((int)$_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],'class'), ENT_QUOTES, 'UTF-8');?>
"
            data-button-action="add-to-cart"
            <?php echo htmlspecialchars((string) Product::isAvailableForOrderCustom((int)$_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],'attr'), ENT_QUOTES, 'UTF-8');?>

          ><i data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" class="fasl fa-cart-shopping shopping-cart"></i></a>
        </div>
        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductActions','product'=>$_smarty_tpl->tpl_vars['product']->value),$_smarty_tpl ) );?>

      </div>

    <?php
}
}
/* {/block 'product_quantity'} */
}
