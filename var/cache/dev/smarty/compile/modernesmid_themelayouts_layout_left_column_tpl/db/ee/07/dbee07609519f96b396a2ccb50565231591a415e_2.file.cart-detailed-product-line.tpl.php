<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:55
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\cart-detailed-product-line.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fb7d6a5f2_92123416',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'dbee07609519f96b396a2ccb50565231591a415e' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\cart-detailed-product-line.tpl',
      1 => 1730109078,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fb7d6a5f2_92123416 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.count.php','function'=>'smarty_modifier_count',),));
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<div class="product-line-grid col-12">
  <?php $_smarty_tpl->_assignInScope('has_remaining_stock', json_decode(Product::hasMaxProductsRemainingStock($_smarty_tpl->tpl_vars['product']->value['id_product'],50)));?>
  <div class="row">
    <!--  product left content: image-->
    <div class="product-line-grid-left col-12 col-sm-2 col-md-2 col-lg-2 my-auto">
      <span class="product-image media-middle row mx-auto">
      <?php if ((isset($_smarty_tpl->tpl_vars['product']->value['cover']['bySize']['medium_default']['url']))) {?>
        <img src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['bySize']['medium_default']['url'], ENT_QUOTES, 'UTF-8');?>
" class="cart-img col-12 mx-auto"
             alt="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],'quotes' )), ENT_QUOTES, 'UTF-8');?>
">
      <?php }?>
    </span>
    </div>
    <!--  product left body: description -->
    <div class="product-line-grid-body col-12 col-sm-10 col-md-10 col-lg-10 pl-lg-0 pr-0 text-center text-sm-left">
      <div class="row">
        <div class="product-line-info col-12 col-sm-6 col-md-6 col-lg-6 pl-3 pr-3 pl-sm-0 pr-sm-0 pt-2">
          <a class="label text-decoration-none text-dark" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
"
             data-id_customization="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'intval' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['id_customization'] )), ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a>
          <div class="product-line-grid-right product-line-actions pl-0 col-12 float-right">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['product']->value['attributes'], 'value', false, 'attribute');
$_smarty_tpl->tpl_vars['value']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['attribute']->value => $_smarty_tpl->tpl_vars['value']->value) {
$_smarty_tpl->tpl_vars['value']->do_else = false;
?>
              <?php if (!in_array($_smarty_tpl->tpl_vars['attribute']->value,AttributeGroup::getSawCutModuleAttributeGroupNames(Context::getContext()->cookie->id_lang))) {?>
                <tr class="small_cart_attr_attr font-italic">
                  <td class="small_cart_attr_k font-italic"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['attribute']->value, ENT_QUOTES, 'UTF-8');?>
:</td>
                  <td class="value font-italic"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['value']->value, ENT_QUOTES, 'UTF-8');?>
</td>
                </tr>
              <?php }?>
            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
            <?php if (is_array($_smarty_tpl->tpl_vars['product']->value['customizations']) && smarty_modifier_count($_smarty_tpl->tpl_vars['product']->value['customizations'])) {?>
              <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_50026016267bc1fb7d46337_66272366', 'cart_detailed_product_line_customization');
?>

            <?php }?>
            <div class="clearfix"></div>
          </div>


        </div>
        <!--  product left body: description -->
        <div class="product-line-grid-right product-line-actions col-12 col-sm-6 col-md-6 col-lg-6">
          <div class="row">
            <div class="col-md-10 col-sm-10 col-12 pl-3 pl-sm-2 pr-3 pr-sm-2">
              <div class="row">
                <div class="col-7 col-sm-6 qty">
                  <div class="row">
                    <div class="col-2 p-0 pt-1">
                      <a
                        class="remove-from-cart text-dark"
                        rel="nofollow"
                        href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['remove_from_cart_url'], ENT_QUOTES, 'UTF-8');?>
"
                        data-link-action="delete-from-cart"
                        data-id-product="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['id_product'],'javascript' )), ENT_QUOTES, 'UTF-8');?>
"
                        data-id-product-attribute="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],'javascript' )), ENT_QUOTES, 'UTF-8');?>
"
                        data-id-customization="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['id_customization'],'javascript' )), ENT_QUOTES, 'UTF-8');?>
"
                      >
                        <?php if (!(isset($_smarty_tpl->tpl_vars['product']->value['is_gift'])) || !$_smarty_tpl->tpl_vars['product']->value['is_gift']) {?>
                          <i class="fasl fa-trash fa-2x float-xs-left"></i>
                        <?php }?>
                      </a>
                    </div>
                    <div class="col-10 col-sm-10">

                      <?php if ((isset($_smarty_tpl->tpl_vars['product']->value['is_gift'])) && $_smarty_tpl->tpl_vars['product']->value['is_gift']) {?>
                        <span class="gift-quantity"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
</span>
                      <?php } else { ?>
                        <input
                          onclick="this.select()"
                          class="js-cart-line-product-quantity form-control"
                          data-down-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['down_quantity_url'], ENT_QUOTES, 'UTF-8');?>
"
                          data-up-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['up_quantity_url'], ENT_QUOTES, 'UTF-8');?>
"
                          data-update-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['update_quantity_url'], ENT_QUOTES, 'UTF-8');?>
"
                          data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
                          type="text"
                          value="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
"
                          data-current-value="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
"
                          name="product-quantity-spin"
                          min="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['minimal_quantity'], ENT_QUOTES, 'UTF-8');?>
"
                          <?php if ($_smarty_tpl->tpl_vars['product']->value['out_of_stock'] === 0) {?>max="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['has_remaining_stock']->value->remaining_stock, ENT_QUOTES, 'UTF-8');?>
"<?php }?>
                          pattern="\d*"
                        />
                      <?php }?>
                    </div>
                  </div>

                </div>
                <div class="col-5 col-sm-6 price pl-0 mt-sm-0 pt-1">
            <span class="product-price" style="line-height: .7rem;">
              <strong>
                <?php if ((isset($_smarty_tpl->tpl_vars['product']->value['is_gift'])) && $_smarty_tpl->tpl_vars['product']->value['is_gift']) {?>
                  <span class="gift"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Gift','d'=>'Shop.Theme.Checkout'),$_smarty_tpl ) );?>
</span>


<?php } else { ?>


                  <span class="product-price" style="line-height: .7rem;">
 
                  <span class="inclusive-price"
                        data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
">
                    <?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {?>
                      <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)$_smarty_tpl->tpl_vars['product']->value['total_wt'],'EUR'), ENT_QUOTES, 'UTF-8');?>

                    <?php } else { ?>
                      <?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(((float)$_smarty_tpl->tpl_vars['product']->value['total_wt']/1.21),'EUR'), ENT_QUOTES, 'UTF-8');?>

                    <?php }?>
                  </span>
                  </span>
                <?php }?>
              </strong>
            </span>
                </div>
                                                              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <hr class="text-dark" style="opacity: 0.8"></hr>
<?php }
/* {block 'cart_detailed_product_line_customization'} */
class Block_50026016267bc1fb7d46337_66272366 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'cart_detailed_product_line_customization' => 
  array (
    0 => 'Block_50026016267bc1fb7d46337_66272366',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['product']->value['customizations'], 'customization');
$_smarty_tpl->tpl_vars['customization']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['customization']->value) {
$_smarty_tpl->tpl_vars['customization']->do_else = false;
?>
                  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['customization']->value['fields'], 'field');
$_smarty_tpl->tpl_vars['field']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['field']->value) {
$_smarty_tpl->tpl_vars['field']->do_else = false;
?>
                    <div class="w-100">
                      <?php if ($_smarty_tpl->tpl_vars['field']->value['label'] === 'zaaginstructies' || $_smarty_tpl->tpl_vars['field']->value['label'] === 'instructies' || $_smarty_tpl->tpl_vars['field']->value['label'] === 'knipinstructies') {?>
                        <div class="col-12 pl-0 font-italic">
                                                    <?php echo $_smarty_tpl->tpl_vars['field']->value['text'];?>

                                                  </div>
                      <?php } else { ?>
                        <div class="font-italic"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['field']->value['label'], ENT_QUOTES, 'UTF-8');?>
</div>
                        <?php if ($_smarty_tpl->tpl_vars['field']->value['type'] == 'text') {?>
                          <div class="font-italic"><?php echo $_smarty_tpl->tpl_vars['field']->value['text'];?>
</div>
                        <?php } elseif ($_smarty_tpl->tpl_vars['field']->value['type'] == 'image') {?>
                          <div><img src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['field']->value['image']['small']['url'], ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['field']->value['label'], ENT_QUOTES, 'UTF-8');?>
"/></div>
                        <?php }?>
                      <?php }?>
                    </div>
                  <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
              <?php
}
}
/* {/block 'cart_detailed_product_line_customization'} */
}
