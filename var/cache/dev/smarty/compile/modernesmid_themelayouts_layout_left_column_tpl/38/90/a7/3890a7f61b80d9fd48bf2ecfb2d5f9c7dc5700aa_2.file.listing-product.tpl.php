<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:31
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\catalog\_partials\miniatures\listing-product.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1f9f7d0cf7_33646018',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '3890a7f61b80d9fd48bf2ecfb2d5f9c7dc5700aa' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\catalog\\_partials\\miniatures\\listing-product.tpl',
      1 => 1726217226,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:catalog/_partials/product-add-to-cart-mini.tpl' => 2,
    'file:catalog/_partials/variant-links.tpl' => 2,
  ),
),false)) {
function content_67bc1f9f7d0cf7_33646018 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_77191236067bc1f9f692d81_63093548', 'product_miniature_item');
?>

<?php }
/* {block 'product_name'} */
class Block_142255476067bc1f9f6ad1e2_98992245 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <table class="h-100 w-100">
            <tr>
              <td class="align-middle">
                  <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>
                      <?php $_smarty_tpl->_assignInScope('dynamicProductConfig', Module::getInstanceByName('modernesmiddynamicproduct')->returnProductInitData($_smarty_tpl->tpl_vars['product']->value));?>
                    <span class="h6 product-title p-0" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><a
                        class="text-decoration-none text-black" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a></span>
                    <br/>
                    <a class="help-text product-description-short text-decoration-none"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['dynamicProductConfig']->value['indication_msg'], ENT_QUOTES, 'UTF-8');?>
 <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a>
                    <br/>
                    <span class="product-description-short"><?php echo $_smarty_tpl->tpl_vars['product']->value['description_short'];?>
</span>
                  <?php } else { ?>
                    <span class="h6 product-title p-0" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><a
                        class="text-decoration-none text-black" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a></span>
                    <br/>
                    <span class="product-description-short"><?php echo $_smarty_tpl->tpl_vars['product']->value['description_short'];?>
</span>
                  <?php }?>
              </td>
            </tr>
          </table>
        <?php
}
}
/* {/block 'product_name'} */
/* {block 'product_thumbnail'} */
class Block_198896546067bc1f9f6b7cd7_26818682 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <div
              class="col-5 <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,'col-sm-4 col-md-2'), ENT_QUOTES, 'UTF-8');?>
 pl-0 pr-2 float-left"
              <?php if (Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) == 'col-sm-4 col-md-1') {?>style="max-width: 110px;margin:0 auto;"<?php }?>>
                <?php if ($_smarty_tpl->tpl_vars['product']->value['cover']) {?>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
" class="thumbnail product-thumbnail d-block d-md-flex" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" style="margin-top: 2.8em;">
                    <img data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" class="w-100 thumb"
                         src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['bySize']['medium_default']['url'], ENT_QUOTES, 'UTF-8');?>
"
                         alt="<?php if (!empty($_smarty_tpl->tpl_vars['product']->value['cover']['legend'])) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['legend'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'truncate' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],30,'...' )), ENT_QUOTES, 'UTF-8');
}?>"
                         data-full-size-image-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['large']['url'], ENT_QUOTES, 'UTF-8');?>
"/>
                  </a>
                <?php } else { ?>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
" class="thumbnail product-thumbnail" data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
                     data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
">
                    <img class="w-100 thumb" src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['no_picture_image']['bySize']['medium_default']['url'], ENT_QUOTES, 'UTF-8');?>
"/>
                  </a>
                <?php }?>
            </div>
          <?php
}
}
/* {/block 'product_thumbnail'} */
/* {block 'product_price_and_shipping'} */
class Block_81859811967bc1f9f6d0040_45334805 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                          <?php if ($_smarty_tpl->tpl_vars['product']->value['show_price']) {?>


                            <div class="product-price-and-shipping">
                              <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>

                                <?php $_smarty_tpl->_assignInScope('productPrices', Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($_smarty_tpl->tpl_vars['product']->value,$_smarty_tpl->tpl_vars['product']->value['id_attribute']));?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"old_price"),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"before_price"),$_smarty_tpl ) );?>

                                <span class="inclusive-price"
                                      data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {
ob_start();
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)$_smarty_tpl->tpl_vars['productPrices']->value['final_prices']['price_ttc'],'EUR'), ENT_QUOTES, 'UTF-8');
$_prefixVariable1 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable1, ENT_QUOTES, 'UTF-8');
} else {
ob_start();
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)$_smarty_tpl->tpl_vars['productPrices']->value['final_prices']['price_ht'],'EUR'), ENT_QUOTES, 'UTF-8');
$_prefixVariable2 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable2, ENT_QUOTES, 'UTF-8');
}?>  </span>
                                <br>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'unit_price'),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'weight'),$_smarty_tpl ) );?>

                              <?php } else { ?>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"old_price"),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"before_price"),$_smarty_tpl ) );?>

                                <span class="inclusive-price"
                                      data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice($_smarty_tpl->tpl_vars['product']->value['price_after_cartrule_reduction_with_tax'],'EUR'), ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice($_smarty_tpl->tpl_vars['product']->value['price_after_cartrule_reduction_without_tax'],'EUR'), ENT_QUOTES, 'UTF-8');
}?>  </span>
                                <br>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'unit_price'),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'weight'),$_smarty_tpl ) );?>

                              <?php }?>
                            </div>
                          <?php }?>
                      <?php
}
}
/* {/block 'product_price_and_shipping'} */
/* {block 'product_add_to_cart_product_list'} */
class Block_94096891567bc1f9f6f0763_25619828 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                          <?php $_smarty_tpl->_subTemplateRender('file:catalog/_partials/product-add-to-cart-mini.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('product'=>$_smarty_tpl->tpl_vars['product']->value,'configuration'=>$_smarty_tpl->tpl_vars['configuration']->value), 0, false);
?>
                      <?php
}
}
/* {/block 'product_add_to_cart_product_list'} */
/* {block 'product_variants'} */
class Block_175750504867bc1f9f6f3597_13674772 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                  <?php if ($_smarty_tpl->tpl_vars['product']->value['main_variants']) {?>
                      <?php $_smarty_tpl->_subTemplateRender('file:catalog/_partials/variant-links.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('variants'=>$_smarty_tpl->tpl_vars['product']->value['main_variants']), 0, false);
?>
                  <?php }?>
              <?php
}
}
/* {/block 'product_variants'} */
/* {block 'product_thumbnail'} */
class Block_196114475067bc1f9f706f57_73088795 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <div
              class="col-6 <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,'col-sm-4 col-md-2'), ENT_QUOTES, 'UTF-8');?>
 pl-0 pr-2 float-left"
              <?php if (Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) == 'col-sm-4 col-md-1') {?>style="max-width: 110px;margin:0 auto;"<?php }?>>
                <?php if ($_smarty_tpl->tpl_vars['product']->value['cover']) {?>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
" class="thumbnail product-thumbnail" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
">
                    <img data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" class="w-100 thumb"
                         src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['bySize']['medium_default']['url'], ENT_QUOTES, 'UTF-8');?>
"
                         alt="<?php if (!empty($_smarty_tpl->tpl_vars['product']->value['cover']['legend'])) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['legend'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'truncate' ][ 0 ], array( $_smarty_tpl->tpl_vars['product']->value['name'],30,'...' )), ENT_QUOTES, 'UTF-8');
}?>"
                         data-full-size-image-url="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['cover']['large']['url'], ENT_QUOTES, 'UTF-8');?>
"/>
                  </a>
                <?php } else { ?>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
" class="thumbnail product-thumbnail" data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
                     data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
">
                    <img class="w-100 thumb" src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['no_picture_image']['bySize']['medium_default']['url'], ENT_QUOTES, 'UTF-8');?>
"/>
                  </a>
                <?php }?>
              <!-- @todo: use include file='catalog/_partials/product-flags.tpl'} -->
                            </div>
          <?php
}
}
/* {/block 'product_thumbnail'} */
/* {block 'product_name'} */
class Block_94340378167bc1f9f734a63_02039814 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

              <table class="h-100 w-100">
                <tr>
                  <td class="align-middle">
                      <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>
                          <?php $_smarty_tpl->_assignInScope('dynamicProductConfig', Module::getInstanceByName('modernesmiddynamicproduct')->returnProductInitData($_smarty_tpl->tpl_vars['product']->value));?>
                        <span class="h6 product-title p-0" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><a
                            class="text-decoration-none text-black" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a></span>
                        <br/>
                        <a class="help-text product-description-short text-decoration-none"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['dynamicProductConfig']->value['indication_msg'], ENT_QUOTES, 'UTF-8');?>
</a>
                        <br/>
                        <span class="product-description-short"><?php echo $_smarty_tpl->tpl_vars['product']->value['description_short'];?>
</span>
                      <?php } else { ?>
                        <span class="h6 product-title p-0" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><a
                            class="text-decoration-none text-black" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['name'], ENT_QUOTES, 'UTF-8');?>
</a></span>
                        <br/>
                        <span class="product-description-short"><?php echo $_smarty_tpl->tpl_vars['product']->value['description_short'];?>
</span>
                      <?php }?>
                  </td>
                </tr>
              </table>
            <?php
}
}
/* {/block 'product_name'} */
/* {block 'product_price_and_shipping'} */
class Block_38950104267bc1f9f767d94_72124189 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                        <?php if ($_smarty_tpl->tpl_vars['product']->value['show_price']) {?>
                            <div class="product-price-and-shipping">
                              <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>

                                <?php $_smarty_tpl->_assignInScope('productPrices', Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($_smarty_tpl->tpl_vars['product']->value,$_smarty_tpl->tpl_vars['product']->value['id_attribute']));?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"old_price"),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"before_price"),$_smarty_tpl ) );?>

                                <span class="inclusive-price"
                                      data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {
ob_start();
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)$_smarty_tpl->tpl_vars['productPrices']->value['final_prices']['price_ttc'],'EUR'), ENT_QUOTES, 'UTF-8');
$_prefixVariable3 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable3, ENT_QUOTES, 'UTF-8');
} else {
ob_start();
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)$_smarty_tpl->tpl_vars['productPrices']->value['final_prices']['price_ht'],'EUR'), ENT_QUOTES, 'UTF-8');
$_prefixVariable4 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable4, ENT_QUOTES, 'UTF-8');
}?>  </span>
                                <br>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'unit_price'),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'weight'),$_smarty_tpl ) );?>

                              <?php } else { ?>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"old_price"),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"before_price"),$_smarty_tpl ) );?>

                                <span class="inclusive-price"
                                      data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice($_smarty_tpl->tpl_vars['product']->value['price_after_cartrule_reduction_with_tax'],'EUR'), ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice($_smarty_tpl->tpl_vars['product']->value['price_after_cartrule_reduction_without_tax'],'EUR'), ENT_QUOTES, 'UTF-8');
}?>  </span>
                                <br>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'unit_price'),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'weight'),$_smarty_tpl ) );?>

                              <?php }?>
                            </div>
                          <?php }?>
                      <?php
}
}
/* {/block 'product_price_and_shipping'} */
/* {block 'product_add_to_cart_product_list'} */
class Block_98844362867bc1f9f798e43_46573406 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                          <?php $_smarty_tpl->_subTemplateRender('file:catalog/_partials/product-add-to-cart-mini.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('product'=>$_smarty_tpl->tpl_vars['product']->value,'configuration'=>$_smarty_tpl->tpl_vars['configuration']->value), 0, true);
?>
                      <?php
}
}
/* {/block 'product_add_to_cart_product_list'} */
/* {block 'product_variants'} */
class Block_53880932467bc1f9f79f578_64874464 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                  <?php if ($_smarty_tpl->tpl_vars['product']->value['main_variants']) {?>
                      <?php $_smarty_tpl->_subTemplateRender('file:catalog/_partials/variant-links.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('variants'=>$_smarty_tpl->tpl_vars['product']->value['main_variants']), 0, true);
?>
                  <?php }?>
              <?php
}
}
/* {/block 'product_variants'} */
/* {block 'product_price_and_shipping'} */
class Block_75811028667bc1f9f7a7869_27069597 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                          <?php if ($_smarty_tpl->tpl_vars['product']->value['show_price']) {?>
                            <div class="product-price-and-shipping">
                              <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>

                                <?php $_smarty_tpl->_assignInScope('productPrices', Module::getInstanceByName('modernesmiddynamicproduct')->fetchDefaultDynamicProductPrice($_smarty_tpl->tpl_vars['product']->value,$_smarty_tpl->tpl_vars['product']->value['id_attribute']));?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"old_price"),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"before_price"),$_smarty_tpl ) );?>

                                <span class="inclusive-price"
                                      data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {
ob_start();
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)$_smarty_tpl->tpl_vars['productPrices']->value['final_prices']['price_ttc'],'EUR'), ENT_QUOTES, 'UTF-8');
$_prefixVariable5 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable5, ENT_QUOTES, 'UTF-8');
} else {
ob_start();
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)$_smarty_tpl->tpl_vars['productPrices']->value['final_prices']['price_ht'],'EUR'), ENT_QUOTES, 'UTF-8');
$_prefixVariable6 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable6, ENT_QUOTES, 'UTF-8');
}?>  </span>
                                <br>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'unit_price'),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'weight'),$_smarty_tpl ) );?>

                              <?php } else { ?>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"old_price"),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>"before_price"),$_smarty_tpl ) );?>

                                <span class="inclusive-price"
                                      data-product-id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"><?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['price'], ENT_QUOTES, 'UTF-8');
} else {
echo htmlspecialchars((string) Context::getContext()->currentLocale->formatPrice((float)Product::getPriceStatic($_smarty_tpl->tpl_vars['product']->value['id_product'],false),'EUR'), ENT_QUOTES, 'UTF-8');
}?>  </span>
                                <br>
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'unit_price'),$_smarty_tpl ) );?>

                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductPriceBlock','product'=>$_smarty_tpl->tpl_vars['product']->value,'type'=>'weight'),$_smarty_tpl ) );?>

                              <?php }?>
                            </div>
                          <?php }?>
                      <?php
}
}
/* {/block 'product_price_and_shipping'} */
/* {block 'product_miniature_item'} */
class Block_77191236067bc1f9f692d81_63093548 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'product_miniature_item' => 
  array (
    0 => 'Block_77191236067bc1f9f692d81_63093548',
  ),
  'product_name' => 
  array (
    0 => 'Block_142255476067bc1f9f6ad1e2_98992245',
    1 => 'Block_94340378167bc1f9f734a63_02039814',
  ),
  'product_thumbnail' => 
  array (
    0 => 'Block_198896546067bc1f9f6b7cd7_26818682',
    1 => 'Block_196114475067bc1f9f706f57_73088795',
  ),
  'product_price_and_shipping' => 
  array (
    0 => 'Block_81859811967bc1f9f6d0040_45334805',
    1 => 'Block_38950104267bc1f9f767d94_72124189',
    2 => 'Block_75811028667bc1f9f7a7869_27069597',
  ),
  'product_add_to_cart_product_list' => 
  array (
    0 => 'Block_94096891567bc1f9f6f0763_25619828',
    1 => 'Block_98844362867bc1f9f798e43_46573406',
  ),
  'product_variants' => 
  array (
    0 => 'Block_175750504867bc1f9f6f3597_13674772',
    1 => 'Block_53880932467bc1f9f79f578_64874464',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <article
    class="product-miniature js-product-miniature d-flex d-md-none border-bottom row pt-2 pt-sm-1 pb-1 ml-sm-1 mr-sm-2 m-0"
    id="product_<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
    data-id-product-attribute="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product_attribute'], ENT_QUOTES, 'UTF-8');?>
">
      <?php $_smarty_tpl->_assignInScope('productFeatures', unserialize(Configuration::get('SAWANDCUTMODULE')));?>
      <?php $_smarty_tpl->_assignInScope('sawButtonVisible', is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product))));?>
    <div style="<?php if ($_smarty_tpl->tpl_vars['sawButtonVisible']->value) {?>min-height: 55px;<?php } else { ?>min-height: 105px;<?php }?>"
         class="product-description col-12 <?php if (is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product)))) {?>col-sm-8 <?php if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) {?>col-md-7<?php } elseif (Configuration::get('PS_CATALOG_MODE') && !Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) {?>col-md-9<?php } else { ?>col-md-4<?php }
} else { ?> <?php if (Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) == 'col-sm-4 col-md-2') {?>col-sm-8 col-md-5<?php } else { ?>col-sm-4 col-md-4<?php }
}?> pl-0  pl-sm-2 pr-0 mb-0 mb-sm-3 mb-md-0 float-right">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_142255476067bc1f9f6ad1e2_98992245', 'product_name', $this->tplIndex);
?>

    </div>
    <div class="thumbnail-container col-12">
      <div class="row d-block d-md-flex">
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_198896546067bc1f9f6b7cd7_26818682', 'product_thumbnail', $this->tplIndex);
?>

          <?php if ((Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')) {?>
            <div
              class="product-price col-7 d-flex d-sm-flex d-md-none <?php if (is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product)))) {?>col-sm-8<?php }?> col-md-2 pr-2 float-right text-right text-sm-right">
              <table class="h-100 w-100">
                <tr>
                  <td class="align-right">
                      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_81859811967bc1f9f6d0040_45334805', 'product_price_and_shipping', $this->tplIndex);
?>

                  </td>
                </tr>
                <tr>
                  <td>


                  </td>
                </tr>
              </table>
            </div>
          <?php }?>


        <div class="product_buttons col-7 col-sm-8 col-md-3 p-0 pt-2 pt-sm-2 pt-md-0  float-right">
          <table class="h-100 w-100"
                 <?php if (Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) == 'col-sm-8 col-md-4') {?>style="margin-right:0px"<?php }?>>
            <tr>
                <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>
                  <td class="align-middle">
                      <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayDynamicProductBox','product'=>$_smarty_tpl->tpl_vars['product']->value),$_smarty_tpl ) );?>

                  </td>
                <?php } else { ?>
                  <td class="align-middle">
                      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_94096891567bc1f9f6f0763_25619828', 'product_add_to_cart_product_list', $this->tplIndex);
?>

                  </td>
                <?php }?>
            </tr>
          </table>
        </div>
        <div class="product_variations col-8">
          <div class="highlighted-informations<?php if (!$_smarty_tpl->tpl_vars['product']->value['main_variants']) {?> no-variants<?php }?> hidden-sm-down">
              <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_175750504867bc1f9f6f3597_13674772', 'product_variants', $this->tplIndex);
?>

          </div>
        </div>


          <?php if (!Configuration::get('PS_CATALOG_MODE')) {?>
              <?php if (is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product)))) {?>
                <div class="pl-0 pl-sm-2 pr-0 col-7 col-sm-8 col-md-1 float-right mb-3 mb-sm-3 mb-md-0"
                     style="pointer-events:<?php if (!$_smarty_tpl->tpl_vars['product']->value['add_to_cart_url']) {?>none;<?php } elseif (Configuration::get('PS_STOCK_MANAGEMENT') && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] <= 0 && (int)$_smarty_tpl->tpl_vars['product']->value['out_of_stock'] == 0) {?>none;<?php } elseif (Configuration::get('PS_STOCK_MANAGEMENT') && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] != 0 && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] < 100 && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] < 0 && (int)$_smarty_tpl->tpl_vars['product']->value['out_of_stock'] == 0) {?>none;<?php }?>">
                    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductSawAndCutButtons','product'=>$_smarty_tpl->tpl_vars['product']->value),$_smarty_tpl ) );?>

                </div>
              <?php }?>
          <?php }?>


        <div class="pl-0 pl-sm-2 pr-0 col-7 col-sm-8 mb-3 mb-sm-3 mb-md-0 float-right d-flex d-sm-flex d-md-none">
          <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
" type="button" class="btn staffel-button text-center rounded-0">
            <i class="fasl fa-info-circle"></i> Bekijk info
          </a>
        </div>



      </div>
    </div>
  </article>
  <article
    class="product-miniature js-product-miniature d-none d-md-flex border-bottom row pt-2 pt-sm-1 pb-1 ml-sm-1 mr-sm-1 m-0"
    id="product_<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
" data-id-product="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product'], ENT_QUOTES, 'UTF-8');?>
"
    data-id-product-attribute="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['id_product_attribute'], ENT_QUOTES, 'UTF-8');?>
">
    <div class="thumbnail-container col-12 p-0">
      <div class="row d-block d-md-flex">
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_196114475067bc1f9f706f57_73088795', 'product_thumbnail', $this->tplIndex);
?>

          <?php $_smarty_tpl->_assignInScope('productFeatures', unserialize(Configuration::get('SAWANDCUTMODULE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)));?>

        <?php $_smarty_tpl->_assignInScope('sawButtonVisible', is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product)))));?>
        <div style="<?php if ($_smarty_tpl->tpl_vars['sawButtonVisible']->value) {?>min-height: 55px;<?php } else { ?>min-height: 105px;<?php }?>"
             class="product-description col-12 <?php if (is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product)))) {?>col-sm-8 <?php if (Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) {?>col-md-7<?php } elseif (Configuration::get('PS_CATALOG_MODE') && !Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) {?>col-md-9<?php } else { ?>col-md-4<?php }
} else { ?> <?php if (Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) == 'col-sm-4 col-md-2') {?>col-sm-8 col-md-5<?php } else { ?>col-sm-4 col-md-4<?php }
}?> pl-0  pl-sm-2 pr-0 mb-3 mb-sm-3 mb-md-0 float-right">
            <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_94340378167bc1f9f734a63_02039814', 'product_name', $this->tplIndex);
?>

        </div>
        <div class="pl-0 pl-sm-2 pr-0 col-sm-8 mb-3 mb-sm-3 mb-md-0 float-right d-flex d-sm-flex d-md-none">
          <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['product']->value['url'], ENT_QUOTES, 'UTF-8');?>
" type="button" class="btn staffel-button text-center">
            <i class="fasl fa-info-circle"></i> Bekijk info
          </a>
        </div>
          <?php if (!Configuration::get('PS_CATALOG_MODE')) {?>
              <?php if (is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product)))) {?>
                <div class="pl-0 pl-sm-2 pr-0 col-12 col-sm-8 col-md-1 float-right mb-3 mb-sm-3 mb-md-0"
                     style="pointer-events:<?php if (!$_smarty_tpl->tpl_vars['product']->value['add_to_cart_url']) {?>none;<?php } elseif (Configuration::get('PS_STOCK_MANAGEMENT') && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] <= 0 && (int)$_smarty_tpl->tpl_vars['product']->value['out_of_stock'] == 0) {?>none;<?php } elseif (Configuration::get('PS_STOCK_MANAGEMENT') && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] != 0 && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] < 100 && (int)$_smarty_tpl->tpl_vars['product']->value['quantity'] < 0 && (int)$_smarty_tpl->tpl_vars['product']->value['out_of_stock'] == 0) {?>none;<?php }?>">
                    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayProductSawAndCutButtons','product'=>$_smarty_tpl->tpl_vars['product']->value),$_smarty_tpl ) );?>

                </div>
              <?php }?>
          <?php }?>

          <?php if ((Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')) {?>
            <div
              class="product-price col-12 d-flex d-sm-none d-md-block <?php if (is_array($_smarty_tpl->tpl_vars['productFeatures']->value) && (in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || in_array((int)$_smarty_tpl->tpl_vars['productFeatures']->value['id_attribute_group_cut'],array_keys($_smarty_tpl->tpl_vars['product']->value->getAttributes())) || !empty(SpecificPrice::getByProductId($_smarty_tpl->tpl_vars['product']->value->id_product)))) {?>col-sm-8<?php }?> col-md-2 pr-2 float-right text-center text-sm-right">
              <table class="h-100 w-100">
                <tr>
                  <td class="align-middle">
                    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_38950104267bc1f9f767d94_72124189', 'product_price_and_shipping', $this->tplIndex);
?>

                  </td>
                </tr>
                <tr>
                  <td>


                  </td>
                </tr>
              </table>
            </div>
          <?php }?>
        <div class="product_buttons col-12 col-sm-8 col-md-3 p-0 pt-2 pt-sm-2 pt-md-0  float-right">
          <table class="h-100 w-100"
                 <?php if (Configuration::get('MSTHEMECONFIG_CATEGORY_IMAGE_SIZE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id) == 'col-sm-8 col-md-4') {?>style="margin-right:0px"<?php }?>>
            <tr>
                <?php if (Module::isEnabled('dynamicproduct') && Product::isDynamicProduct($_smarty_tpl->tpl_vars['product']->value)) {?>
                  <td class="align-middle">
                      <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayDynamicProductBox','product'=>$_smarty_tpl->tpl_vars['product']->value),$_smarty_tpl ) );?>

                  </td>
                <?php } else { ?>
                  <td class="align-middle">
                      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_98844362867bc1f9f798e43_46573406', 'product_add_to_cart_product_list', $this->tplIndex);
?>

                  </td>
                <?php }?>
            </tr>

          </table>
        </div>
        <div class="product_variations col-12">
          <div class="highlighted-informations<?php if (!$_smarty_tpl->tpl_vars['product']->value['main_variants']) {?> no-variants<?php }?> hidden-sm-down">
              <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_53880932467bc1f9f79f578_64874464', 'product_variants', $this->tplIndex);
?>

          </div>
        </div>


          <?php if ((Configuration::get('PS_CATALOG_MODE') && Configuration::get('PS_CATALOG_MODE_WITH_PRICES')) || !Configuration::get('PS_CATALOG_MODE')) {?>
            <div
              class="product-price col-12 d-none d-sm-flex d-md-none pt-1 col-sm-4 col-md-2 pr-0 float-left text-center text-sm-right">
              <table class="h-100 w-100">
                <tr>
                  <td class="align-middle text-center text-sm-right">
                      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_75811028667bc1f9f7a7869_27069597', 'product_price_and_shipping', $this->tplIndex);
?>

                  </td>
                </tr>
              </table>
            </div>
          <?php }?>


      </div>
    </div>
  </article>
<?php
}
}
/* {/block 'product_miniature_item'} */
}
