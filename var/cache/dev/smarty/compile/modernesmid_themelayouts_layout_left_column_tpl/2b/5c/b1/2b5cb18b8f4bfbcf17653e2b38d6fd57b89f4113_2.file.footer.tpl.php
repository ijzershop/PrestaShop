<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:47
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\_partials\footer.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a342ff6f2331_63465668',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '2b5cb18b8f4bfbcf17653e2b38d6fd57b89f4113' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\_partials\\footer.tpl',
      1 => 1712127308,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:custom_blocks/zekerheden-banner.tpl' => 1,
    'file:custom_blocks/footer-info-top.tpl' => 1,
    'file:custom_blocks/footer-info-bottom.tpl' => 1,
  ),
),false)) {
function content_67a342ff6f2331_63465668 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<div class="footer-container bg-light pt-1">
  <div class="container-fluid">
    <div class="bg-light">
      <div class="container-fluid d-none d-sm-none d-md-block">
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_93480178367a342ff6e4a08_02443919', 'header-info-block');
?>

      </div>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_24156243967a342ff6e6be1_20753884', 'footer-info-block');
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_14254399967a342ff6e83b3_83747443', 'footer-info-block');
?>

    </div>
    <div class="row bg-footer align-middle">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex d-sm-flex d-lg-none">
            <img class="mx-auto pt-2 lazyload" rel="preload" as="image" width="50px" data-src="/themes/modernesmid_theme/assets/img/200818_Betalingsmethoden_YS_R01.svg" alt="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"payment options",'d'=>'Shop.Theme.Global'),$_smarty_tpl ) );?>
" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"payment options from this shop",'d'=>'Shop.Theme.Global'),$_smarty_tpl ) );?>
">
          </div>
          <div class="col-12 col-lg-9">
            <p class="text-center text-lg-left">
              <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_48570250067a342ff6eb967_32200453', 'copyright_link');
?>

            </p>
          </div>
          <div class="d-none d-lg-block col-lg-3">
            <img class="float-right pt-2" rel="preload" as="image" width="50px" src="/themes/modernesmid_theme/assets/img/200818_Betalingsmethoden_YS_R01.svg" alt="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"payment options",'d'=>'Shop.Theme.Global'),$_smarty_tpl ) );?>
" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"payment options from this shop",'d'=>'Shop.Theme.Global'),$_smarty_tpl ) );?>
">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayFooter'),$_smarty_tpl ) );?>

<?php }
/* {block 'header-info-block'} */
class Block_93480178367a342ff6e4a08_02443919 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'header-info-block' => 
  array (
    0 => 'Block_93480178367a342ff6e4a08_02443919',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

              <?php $_smarty_tpl->_subTemplateRender("file:custom_blocks/zekerheden-banner.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
          <?php
}
}
/* {/block 'header-info-block'} */
/* {block 'footer-info-block'} */
class Block_24156243967a342ff6e6be1_20753884 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'footer-info-block' => 
  array (
    0 => 'Block_24156243967a342ff6e6be1_20753884',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php $_smarty_tpl->_subTemplateRender("file:custom_blocks/footer-info-top.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    <?php
}
}
/* {/block 'footer-info-block'} */
/* {block 'footer-info-block'} */
class Block_14254399967a342ff6e83b3_83747443 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'footer-info-block' => 
  array (
    0 => 'Block_14254399967a342ff6e83b3_83747443',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php $_smarty_tpl->_subTemplateRender("file:custom_blocks/footer-info-bottom.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
    <?php
}
}
/* {/block 'footer-info-block'} */
/* {block 'copyright_link'} */
class Block_48570250067a342ff6eb967_32200453 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'copyright_link' => 
  array (
    0 => 'Block_48570250067a342ff6eb967_32200453',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

                <a rel="nofollow" class="text-white">
                  <br>
                  <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'%copyright% %year% %modernesmid% | %kvknummer% | %btw%','sprintf'=>array('%modernesmid%'=>'De Moderne Smid BV','%kvknummer%'=>'KvK nummer: 075220555','%btw%'=>'BTW nr.: NL860193421B01','%year%'=>call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'date' ][ 0 ], array( 'Y' )),'%copyright%'=>'©'),'d'=>'Shop.Theme.Global'),$_smarty_tpl ) );?>

                </a>
              <?php
}
}
/* {/block 'copyright_link'} */
}
