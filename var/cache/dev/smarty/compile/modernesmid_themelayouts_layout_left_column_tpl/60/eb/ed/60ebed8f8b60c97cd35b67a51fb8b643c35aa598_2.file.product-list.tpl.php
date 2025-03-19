<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:31
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\catalog\listing\product-list.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1f9f0088d0_65886230',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '60ebed8f8b60c97cd35b67a51fb8b643c35aa598' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\catalog\\listing\\product-list.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:custom_blocks/notification.tpl' => 1,
    'file:catalog/_partials/products.tpl' => 1,
    'file:catalog/_partials/products-bottom.tpl' => 1,
    'file:errors/not-found.tpl' => 1,
  ),
),false)) {
function content_67bc1f9f0088d0_65886230 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_4394778867bc1f9ef3aa68_63598812', 'content');
?>



<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, $_smarty_tpl->tpl_vars['layout']->value);
}
/* {block 'product_list_header'} */
class Block_71745843667bc1f9ef3ce49_05993659 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <h2 id="js-product-list-header" class="h2 mb-4 col-12 p-0"><?php if (strtolower($_smarty_tpl->tpl_vars['listing']->value['label']) != 'zoekresultaten') {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['listing']->value['label'], ENT_QUOTES, 'UTF-8');
}?></h2>
    <?php
}
}
/* {/block 'product_list_header'} */
/* {block 'product_list_active_filters'} */
class Block_108333217267bc1f9f0017c7_46416046 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <div id="" class="hidden-sm-down">
            <?php echo $_smarty_tpl->tpl_vars['listing']->value['rendered_active_filters'];?>

          </div>
        <?php
}
}
/* {/block 'product_list_active_filters'} */
/* {block 'product_list'} */
class Block_183256575567bc1f9f003232_20646340 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <?php $_smarty_tpl->_subTemplateRender('file:catalog/_partials/products.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('listing'=>$_smarty_tpl->tpl_vars['listing']->value), 0, false);
?>
          <?php
}
}
/* {/block 'product_list'} */
/* {block 'product_list_bottom'} */
class Block_214247876767bc1f9f004a48_01210189 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <div id="js-product-list-bottom">
            <?php $_smarty_tpl->_subTemplateRender('file:catalog/_partials/products-bottom.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('listing'=>$_smarty_tpl->tpl_vars['listing']->value), 0, false);
?>
        </div>
          <?php
}
}
/* {/block 'product_list_bottom'} */
/* {block 'content'} */
class Block_4394778867bc1f9ef3aa68_63598812 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'content' => 
  array (
    0 => 'Block_4394778867bc1f9ef3aa68_63598812',
  ),
  'product_list_header' => 
  array (
    0 => 'Block_71745843667bc1f9ef3ce49_05993659',
  ),
  'product_list_active_filters' => 
  array (
    0 => 'Block_108333217267bc1f9f0017c7_46416046',
  ),
  'product_list' => 
  array (
    0 => 'Block_183256575567bc1f9f003232_20646340',
  ),
  'product_list_bottom' => 
  array (
    0 => 'Block_214247876767bc1f9f004a48_01210189',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_checkPlugins(array(0=>array('file'=>'C:\\wampserver\\www\\ijzershop8.local\\vendor\\smarty\\smarty\\libs\\plugins\\modifier.count.php','function'=>'smarty_modifier_count',),));
?>


  <section id="main" class="w-100">
    <?php $_smarty_tpl->_subTemplateRender('file:custom_blocks/notification.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    <?php if (smarty_modifier_count($_smarty_tpl->tpl_vars['listing']->value['products'])) {?>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_71745843667bc1f9ef3ce49_05993659', 'product_list_header', $this->tplIndex);
?>

    <?php }?>
    <section id="products" class="col">

      <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>"displayFilter"),$_smarty_tpl ) );?>


      <?php if (smarty_modifier_count($_smarty_tpl->tpl_vars['listing']->value['products'])) {?>
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_108333217267bc1f9f0017c7_46416046', 'product_list_active_filters', $this->tplIndex);
?>


          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_183256575567bc1f9f003232_20646340', 'product_list', $this->tplIndex);
?>


          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_214247876767bc1f9f004a48_01210189', 'product_list_bottom', $this->tplIndex);
?>

      <?php } else { ?>
        <div id="js-product-list-top"></div>

        <div id="js-product-list">
          <?php $_smarty_tpl->_subTemplateRender('file:errors/not-found.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
        </div>

        <div id="js-product-list-bottom"></div>
      <?php }?>
    </section>
  </section>

      <?php echo '<script'; ?>
 type="application/ld+json"><?php echo $_smarty_tpl->tpl_vars['listing']->value['result']->jsonld_category_seo;
echo '</script'; ?>
>
<?php
}
}
/* {/block 'content'} */
}
