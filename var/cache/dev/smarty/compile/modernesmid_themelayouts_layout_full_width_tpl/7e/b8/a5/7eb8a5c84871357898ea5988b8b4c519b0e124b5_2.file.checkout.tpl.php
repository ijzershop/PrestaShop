<?php
/* Smarty version 4.3.4, created on 2025-03-11 11:58:47
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\checkout.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67d01767645d19_41494327',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '7eb8a5c84871357898ea5988b8b4c519b0e124b5' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\checkout.tpl',
      1 => 1741690679,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:_partials/head.tpl' => 1,
    'file:checkout/_partials/header.tpl' => 1,
    'file:_partials/loader.tpl' => 1,
    'file:custom_blocks/notification.tpl' => 1,
    'file:_partials/notifications.tpl' => 1,
    'file:checkout/_partials/cart-summary.tpl' => 1,
    'file:_partials/footer.tpl' => 1,
    'file:_partials/javascript.tpl' => 1,
  ),
),false)) {
function content_67d01767645d19_41494327 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
<!doctype html>
<html lang="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['language']->value['iso_code'], ENT_QUOTES, 'UTF-8');?>
">
<head>
  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_115314614267d0176762b793_29340996', 'head');
?>

</head>

<body id="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['page']->value['page_name'], ENT_QUOTES, 'UTF-8');?>
" class="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'classnames' ][ 0 ], array( $_smarty_tpl->tpl_vars['page']->value['body_classes'] )), ENT_QUOTES, 'UTF-8');?>
">

<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_144337718967d0176762f7e3_36144430', 'hook_after_body_opening_tag');
?>


<header id="header">
  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_203098903467d01767632438_22184836', 'header');
?>

</header>

<?php $_smarty_tpl->_subTemplateRender('file:_partials/loader.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>

<section id="wrapper" class="w-100 bg-light">
  <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>"displayWrapperTop"),$_smarty_tpl ) );?>

  <div class="container-fluid pt-2">
    <?php $_smarty_tpl->_subTemplateRender('file:custom_blocks/notification.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  </div>
  <div class="container p-2">
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_63635923967d01767635d15_74469463', 'content');
?>


    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>"displayWrapperBottom"),$_smarty_tpl ) );?>

  </div>
</section>
<footer id="footer" class="w-100 p-0 m-0 border-top">
  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_110644151367d0176763e5e3_10385562', 'footer');
?>

</footer>

<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_23627757467d0176763f8b9_19562297', 'javascript_bottom');
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_93334692167d01767644848_40052580', 'hook_before_body_closing_tag');
?>


</body>

</html>
<?php }
/* {block 'head'} */
class Block_115314614267d0176762b793_29340996 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'head' => 
  array (
    0 => 'Block_115314614267d0176762b793_29340996',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender('file:_partials/head.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  <?php
}
}
/* {/block 'head'} */
/* {block 'hook_after_body_opening_tag'} */
class Block_144337718967d0176762f7e3_36144430 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'hook_after_body_opening_tag' => 
  array (
    0 => 'Block_144337718967d0176762f7e3_36144430',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayAfterBodyOpeningTag'),$_smarty_tpl ) );?>

<?php
}
}
/* {/block 'hook_after_body_opening_tag'} */
/* {block 'header'} */
class Block_203098903467d01767632438_22184836 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'header' => 
  array (
    0 => 'Block_203098903467d01767632438_22184836',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/header.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  <?php
}
}
/* {/block 'header'} */
/* {block 'notifications'} */
class Block_187301692367d017676363e0_08570548 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <?php $_smarty_tpl->_subTemplateRender('file:_partials/notifications.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
      <?php
}
}
/* {/block 'notifications'} */
/* {block 'checkout_process'} */
class Block_111424596367d017676375d6_88865413 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

              <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['render'][0], array( array('file'=>'checkout/checkout-process.tpl','ui'=>$_smarty_tpl->tpl_vars['checkout_process']->value),$_smarty_tpl ) );?>

            <?php
}
}
/* {/block 'checkout_process'} */
/* {block 'cart_summary'} */
class Block_92992669967d01767639af0_27266117 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

              <?php $_smarty_tpl->_subTemplateRender('file:checkout/_partials/cart-summary.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('cart'=>$_smarty_tpl->tpl_vars['cart']->value), 0, false);
?>
            <?php
}
}
/* {/block 'cart_summary'} */
/* {block 'content'} */
class Block_63635923967d01767635d15_74469463 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'content' => 
  array (
    0 => 'Block_63635923967d01767635d15_74469463',
  ),
  'notifications' => 
  array (
    0 => 'Block_187301692367d017676363e0_08570548',
  ),
  'checkout_process' => 
  array (
    0 => 'Block_111424596367d017676375d6_88865413',
  ),
  'cart_summary' => 
  array (
    0 => 'Block_92992669967d01767639af0_27266117',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_187301692367d017676363e0_08570548', 'notifications', $this->tplIndex);
?>

      <section id="content" class="bg-light p-2">
        <div class="row">
          <div class="cart-grid-body col-xs-12 col-lg-8">
            <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_111424596367d017676375d6_88865413', 'checkout_process', $this->tplIndex);
?>

          </div>
          <div class="cart-grid-right col-xs-12 col-lg-4 pl-lg-0">
            <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_92992669967d01767639af0_27266117', 'cart_summary', $this->tplIndex);
?>

            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayReassurance'),$_smarty_tpl ) );?>

          </div>
        </div>
      </section>

      <div class="modal" id="be-btw-msg" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-primary">Informatie voor klanten uit België!</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Ook vanuit belgië betaalt u altijd 21% btw.<br>
                Aangezien wij uitsluitend aan particuliere klanten in België leveren,<br> wordt het BTW-bedrag ook in België door berekend.<br><br>
                <strong>Het is daarom niet mogelijk om een factuur met 0% BTW te ontvangen.</strong>
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary w-100" data-dismiss="modal">OK, gelezen</button>
            </div>
          </div>
        </div>
      </div>


      <?php echo '<script'; ?>
>




        if(typeof postcodeApiUrl === "undefined"){
          postcodeApiUrl= "<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['url'][0], array( array('entity'=>'module','name'=>'msthemeconfig','controller'=>'ajax'),$_smarty_tpl ) );?>
";
        }
      <?php echo '</script'; ?>
>
    <?php
}
}
/* {/block 'content'} */
/* {block 'footer'} */
class Block_110644151367d0176763e5e3_10385562 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'footer' => 
  array (
    0 => 'Block_110644151367d0176763e5e3_10385562',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender('file:_partials/footer.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
?>
  <?php
}
}
/* {/block 'footer'} */
/* {block 'javascript_bottom'} */
class Block_23627757467d0176763f8b9_19562297 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'javascript_bottom' => 
  array (
    0 => 'Block_23627757467d0176763f8b9_19562297',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php $_smarty_tpl->_subTemplateRender("file:_partials/javascript.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('javascript'=>$_smarty_tpl->tpl_vars['javascript']->value['bottom']), 0, false);
?>

  <?php echo '<script'; ?>
 type="text/javascript">
    <?php if (Context::getContext()->country->iso_code === 'BE' && !Context::getContext()->cookie->accepted_vat_be) {?>
      $('#be-btw-msg').modal('show');
      $('#be-btw-msg').on('hide.bs.modal', function (e) {
        // Set cookie data to show only once
        $.get(postcodeApiUrl+"?method=set-viewed-be-vat-msg");
      });
    <?php }?>
  <?php echo '</script'; ?>
>
<?php
}
}
/* {/block 'javascript_bottom'} */
/* {block 'hook_before_body_closing_tag'} */
class Block_93334692167d01767644848_40052580 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'hook_before_body_closing_tag' => 
  array (
    0 => 'Block_93334692167d01767644848_40052580',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayBeforeBodyClosingTag'),$_smarty_tpl ) );?>

<?php
}
}
/* {/block 'hook_before_body_closing_tag'} */
}
