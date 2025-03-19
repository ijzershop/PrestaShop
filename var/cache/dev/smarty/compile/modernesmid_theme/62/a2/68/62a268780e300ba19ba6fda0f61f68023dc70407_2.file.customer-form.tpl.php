<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:11
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\customer\_partials\customer-form.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc7c47bb7_24683390',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '62a268780e300ba19ba6fda0f61f68023dc70407' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\customer\\_partials\\customer-form.tpl',
      1 => 1731057608,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:_partials/form-errors.tpl' => 1,
  ),
),false)) {
function content_67bc1fc7c47bb7_24683390 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>
  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_1708593767bc1fc7c29c11_71015395', 'customer_form');
?>



<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_169297297267bc1fc7c444e9_64652971', 'javascript_bottom');
?>

<?php }
/* {block 'customer_form_errors'} */
class Block_34408640067bc1fc7c2a659_43001834 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php $_smarty_tpl->_subTemplateRender('file:_partials/form-errors.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('errors'=>$_smarty_tpl->tpl_vars['errors']->value['']), 0, false);
?>
  <?php
}
}
/* {/block 'customer_form_errors'} */
/* {block 'customer_form_actionurl'} */
class Block_150488802367bc1fc7c2f722_82118376 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['action']->value, ENT_QUOTES, 'UTF-8');
}
}
/* {/block 'customer_form_actionurl'} */
/* {block "form_field"} */
class Block_174580208167bc1fc7c399c7_06903392 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['form_field'][0], array( array('field'=>$_smarty_tpl->tpl_vars['field']->value),$_smarty_tpl ) );?>

          <?php
}
}
/* {/block "form_field"} */
/* {block "form_fields"} */
class Block_116257915567bc1fc7c31ab4_32398179 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['formFields']->value, 'field');
$_smarty_tpl->tpl_vars['field']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['field']->value) {
$_smarty_tpl->tpl_vars['field']->do_else = false;
?>
        <?php if ($_smarty_tpl->tpl_vars['field']->value['name'] === 'id_gender' || $_smarty_tpl->tpl_vars['field']->value['name'] === 'company' || $_smarty_tpl->tpl_vars['field']->value['name'] === 'vat') {?>

        <?php } elseif ($_smarty_tpl->tpl_vars['field']->value['name'] != 'informer_identification') {?>
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_174580208167bc1fc7c399c7_06903392', "form_field", $this->tplIndex);
?>

        <?php }?>
      <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
      <?php echo $_smarty_tpl->tpl_vars['hook_create_account_form']->value;?>

      <?php
}
}
/* {/block "form_fields"} */
/* {block "form_buttons"} */
class Block_5240327267bc1fc7c40e39_16030758 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <button name="submitMessage" class="btn btn-primary form-control-submit w-100" data-link-action="save-customer" type="submit">
          <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Save','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>

        </button>
        <?php
}
}
/* {/block "form_buttons"} */
/* {block 'customer_form_footer'} */
class Block_141911486567bc1fc7c3fe80_29975015 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <div class="row">
      <footer class="form-footer col-12 pt-3">
        <input type="hidden" name="submitCreate" value="1">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_5240327267bc1fc7c40e39_16030758', "form_buttons", $this->tplIndex);
?>

      </footer>
    </div>
    <?php
}
}
/* {/block 'customer_form_footer'} */
/* {block 'customer_form'} */
class Block_1708593767bc1fc7c29c11_71015395 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'customer_form' => 
  array (
    0 => 'Block_1708593767bc1fc7c29c11_71015395',
  ),
  'customer_form_errors' => 
  array (
    0 => 'Block_34408640067bc1fc7c2a659_43001834',
  ),
  'customer_form_actionurl' => 
  array (
    0 => 'Block_150488802367bc1fc7c2f722_82118376',
  ),
  'form_fields' => 
  array (
    0 => 'Block_116257915567bc1fc7c31ab4_32398179',
  ),
  'form_field' => 
  array (
    0 => 'Block_174580208167bc1fc7c399c7_06903392',
  ),
  'customer_form_footer' => 
  array (
    0 => 'Block_141911486567bc1fc7c3fe80_29975015',
  ),
  'form_buttons' => 
  array (
    0 => 'Block_5240327267bc1fc7c40e39_16030758',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_34408640067bc1fc7c2a659_43001834', 'customer_form_errors', $this->tplIndex);
?>

  <?php $_smarty_tpl->_assignInScope('validate_email', false);?>
    <style>
      input[name="customer_privacy"], input[name="psgdpr"]{
        width: 15px!important;
        height: 15px!important;
        margin-right: 5px!important;
      }
      .custom-checkbox .form-check-label{
        width: calc(100% - 15px)!important;
      }
    </style>



  <form action="<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_150488802367bc1fc7c2f722_82118376', 'customer_form_actionurl', $this->tplIndex);
?>
" id="customer-form" class="js-customer-form" novalidate autocomplete="off" method="post">
    <section>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_116257915567bc1fc7c31ab4_32398179', "form_fields", $this->tplIndex);
?>

    </section>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_141911486567bc1fc7c3fe80_29975015', 'customer_form_footer', $this->tplIndex);
?>

  </form>
  <?php
}
}
/* {/block 'customer_form'} */
/* {block 'javascript_bottom'} */
class Block_169297297267bc1fc7c444e9_64652971 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'javascript_bottom' => 
  array (
    0 => 'Block_169297297267bc1fc7c444e9_64652971',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

<?php echo '<script'; ?>
 type="text/javascript">
  //Wrong password but existing customer at registration
  let checkoutLoginPassModal = [];
  <?php if (property_exists(Context::getContext(),'checkout')) {?>
      checkoutLoginPassModal = JSON.parse('<?php echo Context::getContext()->checkout;?>
');
  <?php }
echo '</script'; ?>
>
<?php
}
}
/* {/block 'javascript_bottom'} */
}
