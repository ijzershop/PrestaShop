<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:43
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342fb617959_56202222',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5dc4d3010c9fd7aa7d4bca84cceab58d88ec0cd4' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\index.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:schema_org/organisation.tpl' => 1,
    'file:schema_org/brand.tpl' => 1,
    'file:schema_org/website.tpl' => 1,
  ),
),false)) {
function content_67a342fb617959_56202222 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_152442512567a342fb5d0ee0_56697656', 'page_content_container');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, 'page.tpl');
}
/* {block 'page_content_top'} */
class Block_198354427467a342fb5d1d77_53695358 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_content_top'} */
/* {block 'hook_home'} */
class Block_207905978267a342fb5d3777_90907577 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>



            <div class="row">
              <?php $_smarty_tpl->_assignInScope('selectedCategories', explode(',',Configuration::get('MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)));?>

             <?php if (is_array($_smarty_tpl->tpl_vars['selectedCategories']->value) && count($_smarty_tpl->tpl_vars['selectedCategories']->value) >= 1 && $_smarty_tpl->tpl_vars['selectedCategories']->value[0] != '') {?>
              <?php $_smarty_tpl->_assignInScope('categoriesInfo', Category::getCategoryInformation($_smarty_tpl->tpl_vars['selectedCategories']->value));?>
              <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['selectedCategories']->value, 'category', false, 'key');
$_smarty_tpl->tpl_vars['category']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['key']->value => $_smarty_tpl->tpl_vars['category']->value) {
$_smarty_tpl->tpl_vars['category']->do_else = false;
?>
              <?php if ((isset($_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]))) {?>
               <?php if (strtolower($_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['name']) != 'home') {?>
               <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                <div class="row text-center category-list-item mb-1">
                 <div class="category-list-item-img mx-auto overflow-hidden">
                   <a class="text-decoration-none text-dark mx-auto" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCategoryLink($_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['id_category'],$_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['link_rewrite']), ENT_QUOTES, 'UTF-8');?>
">
                  <img src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCatImageLink($_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['link_rewrite'],$_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['id_category'],'category_default'), ENT_QUOTES, 'UTF-8');?>
" class="img-responsive"  width="140px" height="105px" alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['name'], ENT_QUOTES, 'UTF-8');?>
" title="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['name'], ENT_QUOTES, 'UTF-8');?>
">
                </a>
              </div>
                <a class="text-decoration-none text-dark w-100" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCategoryLink($_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['id_category'],$_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['link_rewrite']), ENT_QUOTES, 'UTF-8');?>
">
                    <span class="category-list-item-title mb-2 text-wordbreak d-block"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['categoriesInfo']->value[$_smarty_tpl->tpl_vars['category']->value]['name'], ENT_QUOTES, 'UTF-8');?>
</span>
                    </a>
                </div>
              </div>
              <?php }?>
              <?php }?>
              <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
              <?php }?>
            </div>
            <?php if (strlen(Configuration::get('MSTHEMECONFIG_HOMEPAGE_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)) > 3) {?>
            <div class="row mt-3" style="background-color:<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_HOMEPAGE_BACKGROUND_COLOR',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,'#efefef'), ENT_QUOTES, 'UTF-8');?>
;">
              <div class="col-12 p-4">
                <?php echo Configuration::get('MSTHEMECONFIG_HOMEPAGE_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id);?>

              </div>
            </div>
            <?php }?>



            <?php echo $_smarty_tpl->tpl_vars['HOOK_HOME']->value;?>

          <?php
}
}
/* {/block 'hook_home'} */
/* {block 'page_content'} */
class Block_54304566367a342fb5d2f61_94998815 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_207905978267a342fb5d3777_90907577', 'hook_home', $this->tplIndex);
?>

        <?php
}
}
/* {/block 'page_content'} */
/* {block 'page_content_container'} */
class Block_152442512567a342fb5d0ee0_56697656 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_content_container' => 
  array (
    0 => 'Block_152442512567a342fb5d0ee0_56697656',
  ),
  'page_content_top' => 
  array (
    0 => 'Block_198354427467a342fb5d1d77_53695358',
  ),
  'page_content' => 
  array (
    0 => 'Block_54304566367a342fb5d2f61_94998815',
  ),
  'hook_home' => 
  array (
    0 => 'Block_207905978267a342fb5d3777_90907577',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <section id="content" class="page-home">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_198354427467a342fb5d1d77_53695358', 'page_content_top', $this->tplIndex);
?>


        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_54304566367a342fb5d2f61_94998815', 'page_content', $this->tplIndex);
?>


      <?php $_smarty_tpl->_subTemplateRender("file:schema_org/organisation.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      <?php $_smarty_tpl->_subTemplateRender("file:schema_org/brand.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      <?php $_smarty_tpl->_subTemplateRender("file:schema_org/website.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      </section>
    <?php
}
}
/* {/block 'page_content_container'} */
}
