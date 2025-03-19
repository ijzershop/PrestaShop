<?php
/* Smarty version 4.3.4, created on 2025-02-05 12:20:52
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\modules\ps_shoppingcart\ps_shoppingcart-product-line.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a34994203d74_32253069',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9a9a9a08bf35eecf90c87c1de90339d4ea071068' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\modules\\ps_shoppingcart\\ps_shoppingcart-product-line.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a34994203d74_32253069 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.regex_replace.php','function'=>'smarty_modifier_regex_replace',),));
?>
<div class="row pl-1 cart_product_item_row">
  <?php if ((((Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default') !== null )) && Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default')) || (isset($_smarty_tpl->tpl_vars['urls']->value['no_picture_image']))) {?>
  <picture class="p-0 col-3 cart-product-thumbnail text-center">
    <?php if ((isset($_smarty_tpl->tpl_vars['stwebp']->value)) && (isset($_smarty_tpl->tpl_vars['stwebp']->value['small_default'])) && $_smarty_tpl->tpl_vars['stwebp']->value['small_default'] && ((Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default') !== null )) && Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default')) {?>
    <!--[if IE 9]><video style="display: none;"><![endif]-->
    <source srcset="<?php echo htmlspecialchars((string) smarty_modifier_regex_replace(Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default'),'/\.jpg$/','.webp'), ENT_QUOTES, 'UTF-8');?>
" title="<?php if (!empty($_smarty_tpl->tpl_vars['product']->value['cover']['legend'])) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['legend'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'truncate' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],30,'...' )), ENT_QUOTES, 'UTF-8');
}?>" type="image/webp">
    <!--[if IE 9]></video><![endif]-->
    <?php }?><img class="small_cart_product_image mx-auto" src="<?php if (((Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default') !== null )) && Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default')) {
echo htmlspecialchars((string) Context::getContext()->link->getImageLink($_smarty_tpl->tpl_vars['product']->value['link_rewrite'],$_smarty_tpl->tpl_vars['product']->value['id_image'],'cart_default'), ENT_QUOTES, 'UTF-8');
} elseif ((isset($_smarty_tpl->tpl_vars['urls']->value['no_picture_image']))) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['no_picture_image']['bySize']['small_default']['url'], ENT_QUOTES, 'UTF-8');
}?>" alt="<?php if (!empty($_smarty_tpl->tpl_vars['product']->value['cover']['legend'])) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['legend'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'truncate' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],30,'...' )), ENT_QUOTES, 'UTF-8');
}?>" title="<?php if (!empty($_smarty_tpl->tpl_vars['product']->value['cover']['legend'])) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['legend'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'truncate' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],30,'...' )), ENT_QUOTES, 'UTF-8');
}?>" itemprop="image">
  </picture><?php }?>
  <div class="col-9 pl-1">
    <div class="row">
      <div class="col-8 cart_product_item_text_row">
        <span class="product-quantity"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
x</span>
        <a title="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
" class="product-name text-decoration-none text-dark" style="word-break:break-all;"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a>
      </div>
      <div class="price col-2 cart_product_item_text_row" style="padding-right:0px;text-align:right;"><?php if ((isset($_smarty_tpl->tpl_vars['product']->value['is_gift'])) && $_smarty_tpl->tpl_vars['product']->value['is_gift']) {
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Gift','d'=>'Shop.Theme.Checkout'),$_smarty_tpl ) );?>

        <?php } else { ?>
        <span class="price float-right"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(floatval($_smarty_tpl->tpl_vars['product']->value['price_with_reduction_without_tax']*$_smarty_tpl->tpl_vars['product']->value['quantity']),'EUR'), ENT_QUOTES, 'UTF-8');?>
</span><br />
        <?php if ($_smarty_tpl->tpl_vars['product']->value['price_without_reduction_without_tax'] != $_smarty_tpl->tpl_vars['product']->value['price_with_reduction_without_tax']) {?>
        <span class="regular-price float-right"><?php echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice(floatval(($_smarty_tpl->tpl_vars['product']->value['price_without_reduction_without_tax'])*$_smarty_tpl->tpl_vars['product']->value['quantity']),'EUR'), ENT_QUOTES, 'UTF-8');?>
</span>
        <?php }?>
        <?php }?>
      </div>
      <?php if (!(isset($_smarty_tpl->tpl_vars['product']->value['is_gift'])) || !$_smarty_tpl->tpl_vars['product']->value['is_gift']) {?>
      <div class="col-2">
        <div class="dropdown" style="height:25px;margin-bottom:5px;">
          <button type="button" id="cart-product-row-toggle-<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" title="Bekijk, wijzig of verwijder product" class="d-block dropdown-toggle show shoppingcart-ellipsis text-dark" data-toggle="dropdown" aria-expanded="false"><i class="text-right align-top fa-2x fasl fa-ellipsis-v float-right"></i></button>
          <div class="dropdown-menu shoppingcart-dropdown-menu" aria-labelledby="cart-product-row-toggle-<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
">
            <a href="<?php echo htmlspecialchars((string) Context::getContext()->link->getProductLink($_smarty_tpl->tpl_vars['product']->value), ENT_QUOTES, 'UTF-8');?>
" rel="noopener" target="_blank" class="dropdown-item"><i class="fasl fa-question-circle"></i> Bekijk product</a>
            <a href="#" class="dropdown-item changeCartProductQty"><i class="fasl fa-edit"></i> Wijzig aantal: <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
</a>
            <a href="#" class="ajax_remove_button dropdown-item" rel="nofollow" data-href="<?php echo htmlspecialchars((string) Context::getContext()->link->getRemoveFromCartURL($_smarty_tpl->tpl_vars['product']->value['id_product'],$_smarty_tpl->tpl_vars['product']->value['id_product_attribute'],$_smarty_tpl->tpl_vars['product']->value['id_customization']), ENT_QUOTES, 'UTF-8');?>
" data-link-action="remove-from-cart" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>" Remove",'d'=>"Shop.Theme.Actions"),$_smarty_tpl ) );?>
"><i class="fasl fa-trash"></i>
              Verwijder
            </a>
          </div>
        </div>
      </div>
      <?php }?>
      <div class="col-12">
        <?php if (!(isset($_smarty_tpl->tpl_vars['product']->value['is_gift'])) || !$_smarty_tpl->tpl_vars['product']->value['is_gift']) {?>
        <div class="customized_wrap width-100" style="display:block;">
          <?php if ((isset($_smarty_tpl->tpl_vars['product']->value['attributes'])) && is_array($_smarty_tpl->tpl_vars['product']->value['attributes']) && count($_smarty_tpl->tpl_vars['product']->value['attributes'])) {?>
          <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['product']->value['attributes'], 'property_value', false, 'property');
$_smarty_tpl->tpl_vars['property_value']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['property']->value => $_smarty_tpl->tpl_vars['property_value']->value) {
$_smarty_tpl->tpl_vars['property_value']->do_else = false;
?>
          <?php if (!in_array($_smarty_tpl->tpl_vars['property']->value,AttributeGroup::getSawCutModuleAttributeGroupNames(Context::getContext()->cookie->id_lang))) {?>
          <div class="small_cart_attr_attr">
            <span class="small_cart_attr_k"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['property']->value, ENT_QUOTES, 'UTF-8');?>
:</span><span><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['property_value']->value, ENT_QUOTES, 'UTF-8');?>
</span>
          </div>
          <?php }?>
          <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
          <?php }?>
          <div class="customizations">
            <ul class="list-unstyled base_list_line">
              <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, Context::getContext()->cart->getProductCustomization($_smarty_tpl->tpl_vars['product']->value['id_product']), 'customization');
$_smarty_tpl->tpl_vars['customization']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['customization']->value) {
$_smarty_tpl->tpl_vars['customization']->do_else = false;
?>
              <?php if ($_smarty_tpl->tpl_vars['product']->value['id_customization'] == $_smarty_tpl->tpl_vars['customization']->value['id_customization']) {?>
              <li class="line_item">
                <?php if (Customization::getLabel($_smarty_tpl->tpl_vars['customization']->value['index'],Context::getContext()->cookie->id_lang) === 'zaaginstructies' || Customization::getLabel($_smarty_tpl->tpl_vars['customization']->value['index'],Context::getContext()->cookie->id_lang) === 'instructies' || Customization::getLabel($_smarty_tpl->tpl_vars['customization']->value['index'],Context::getContext()->cookie->id_lang) === 'knipinstructies') {?>
                <div class="input-group input-group-sm">
                  <input style="font-size:12px;border:1px solid rgba(0,0,0,.15);" type="text" class="form-control" value="<?php echo $_smarty_tpl->tpl_vars['customization']->value['value'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['customization']->value['value'];?>
" readonly>
                  <div class="input-group-append">
                    <div class="input-group-text pl-1 pr-1 pt-0 pb-0">mm</div>
                  </div>
                </div>
                <?php } else { ?>
                <span class="mar_r6 font-weight-bold"><?php echo htmlspecialchars((string) Customization::getLabel($_smarty_tpl->tpl_vars['customization']->value['index'],Context::getContext()->cookie->id_lang), ENT_QUOTES, 'UTF-8');?>
</span>
                  <?php if ($_smarty_tpl->tpl_vars['customization']->value['type'] == 1 && array_key_exists('text',$_smarty_tpl->tpl_vars['customization']->value)) {?>
                  <span><?php echo $_smarty_tpl->tpl_vars['customization']->value['text'];?>
</span>
                  <?php } elseif ($_smarty_tpl->tpl_vars['customization']->value['type'] == 0) {?>
                  <img src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['customization']->value['image']['small']['url'], ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Customization::getLabel($_smarty_tpl->tpl_vars['customization']->value['index'],Context::getContext()->cookie->id_lang), ENT_QUOTES, 'UTF-8');?>
" />
                  <?php }?>
                <?php }?>
                <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>
                  <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>"displayCustomization",'customization'=>$_smarty_tpl->tpl_vars['customization']->value),$_smarty_tpl ) );?>

                <?php }?>
              </li>
              <?php }?>
              <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
            </ul>
          </div>
        </div>
        <div class="qty_wrap width-100" style="display:none;">
          <div class="input-group input-group-sm">
            <input onclick="this.select()" class="form-control cart_quantity cart_quantity_<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" type="number" min="1" width="auto" value="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
" name="cart_quantity" data-update-url="<?php echo htmlspecialchars((string) Context::getContext()->link->getPageLink('cart'), ENT_QUOTES, 'UTF-8');?>
?token=<?php echo htmlspecialchars((string) Tools::getToken(false), ENT_QUOTES, 'UTF-8');?>
" data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" data-minimal-quantity="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['minimal_quantity'], ENT_QUOTES, 'UTF-8');?>
" <?php if (Configuration::get('PS_STOCK_MANAGEMENT')) {?>data-stock_quantity="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['stock_quantity'], ENT_QUOTES, 'UTF-8');?>
"<?php }?> data-id-product-attribute="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product_attribute'], ENT_QUOTES, 'UTF-8');?>
" data-id-customization="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_customization'], ENT_QUOTES, 'UTF-8');?>
" data-allow-oosp="<?php if ((isset($_smarty_tpl->tpl_vars['product']->value['add_to_cart_url'])) && $_smarty_tpl->tpl_vars['product']->value['allow_oosp']) {?>1<?php } else { ?>0<?php }?>" <?php if ($_smarty_tpl->tpl_vars['product']->value['out_of_stock'] == 0) {?>max="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['stock_quantity'], ENT_QUOTES, 'UTF-8');?>
"<?php }?> data-allow-oosp="1" />
            <div class="input-group-append">
              <a class="btn btn-success updateCartBurron" href="#" data-update-url="<?php echo htmlspecialchars((string) Context::getContext()->link->getPageLink('cart'), ENT_QUOTES, 'UTF-8');?>
?token=<?php echo htmlspecialchars((string) Tools::getToken(false), ENT_QUOTES, 'UTF-8');?>
" data-current-value="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['quantity'], ENT_QUOTES, 'UTF-8');?>
" data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" data-id-product-attribute="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product_attribute'], ENT_QUOTES, 'UTF-8');?>
" data-id-customization="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_customization'], ENT_QUOTES, 'UTF-8');?>
">
                <i class="fasl fa-check"></i>
              </a>
            </div>
          </div>
            <?php $_smarty_tpl->_assignInScope('has_remaining_stock', json_decode(Product::hasMaxProductsRemainingStock($_smarty_tpl->tpl_vars['product']->value['id_product'],50)));?>
        </div>
      </div>
            <div class="col-2"></div>
      <?php }?>
    </div>
  </div>
<?php }
}
