<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:28:32
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\_partials\pagination.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fa0f27466_91746231',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '9a77b96caf53137ff65a3e530cd6593bfaebcee2' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\_partials\\pagination.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fa0f27466_91746231 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<nav class="w-100 pt-3 pb-3">
  <div class="col-12 text-center">
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_130390136367bc1fa0efccf5_56234653', 'pagination_summary');
?>

  </div>
  <?php if ($_smarty_tpl->tpl_vars['pagination']->value['pages_count'] > 1) {?>
  <div class="col-md-12 text-center">
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_157823057467bc1fa0f03f96_11634727', 'pagination_page_list');
?>

  </div>
  <?php }?>

</nav>
<?php }
/* {block 'pagination_summary'} */
class Block_130390136367bc1fa0efccf5_56234653 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'pagination_summary' => 
  array (
    0 => 'Block_130390136367bc1fa0efccf5_56234653',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Showing %from%-%to% of %total% item(s)','d'=>'Shop.Theme.Catalog','sprintf'=>array('%from%'=>$_smarty_tpl->tpl_vars['pagination']->value['items_shown_from'],'%to%'=>$_smarty_tpl->tpl_vars['pagination']->value['items_shown_to'],'%total%'=>$_smarty_tpl->tpl_vars['pagination']->value['total_items'])),$_smarty_tpl ) );?>

    <?php
}
}
/* {/block 'pagination_summary'} */
/* {block 'pagination_page_list'} */
class Block_157823057467bc1fa0f03f96_11634727 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'pagination_page_list' => 
  array (
    0 => 'Block_157823057467bc1fa0f03f96_11634727',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <div class="page-list clearfix text-sm-center btn-toolbar" style="justify-content: center; display: flex;">
          <div class="btn-group">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['pagination']->value['pages'], 'page');
$_smarty_tpl->tpl_vars['page']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['page']->value) {
$_smarty_tpl->tpl_vars['page']->do_else = false;
?>
              <div class="btn btn-secondary" <?php if (array_key_exists('current',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['current']) {?> class="current" <?php }?>>
                <?php if (array_key_exists('type',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['type'] === 'spacer') {?>
                  <span class="spacer">&hellip;</span>
                <?php } else { ?>
                  <a
                    rel="<?php if (array_key_exists('type',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['type'] === 'previous') {?>prev<?php } elseif (array_key_exists('type',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['type'] === 'next') {?>next<?php } else { ?>nofollow<?php }?>"
                    href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['url'], ENT_QUOTES, 'UTF-8');?>
"
                    class="text-decoration-none text-white <?php if (array_key_exists('type',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['type'] === 'previous') {?>previous <?php } elseif (array_key_exists('type',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['type'] === 'next') {?>next <?php }
echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'classnames' ][ 0 ], array( array('disabled'=>!$_smarty_tpl->tpl_vars['page']->value['clickable'],'js-search-link'=>true) )), ENT_QUOTES, 'UTF-8');?>
"
                  >
                    <?php if (array_key_exists('type',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['type'] === 'previous') {?>
                      <i class="fasl fa-chevron-left"></i> <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Previous','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>

                    <?php } elseif (array_key_exists('type',$_smarty_tpl->tpl_vars['page']->value) && $_smarty_tpl->tpl_vars['page']->value['type'] === 'next') {?>
                      <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Next','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
 <i class="fasl fa-chevron-right"></i>
                    <?php } else { ?>
                      <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['page'], ENT_QUOTES, 'UTF-8');?>

                    <?php }?>
                  </a>
                <?php }?>
              </div>
            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
          </div>
        </div>
    <?php
}
}
/* {/block 'pagination_page_list'} */
}
