<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:12
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\customer\_partials\login-form.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc8b45757_22195821',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '177e234dfb180f8bd64c7339be9bd053e396a106' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\customer\\_partials\\login-form.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:_partials/form-errors.tpl' => 1,
  ),
),false)) {
function content_67bc1fc8b45757_22195821 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_207110041267bc1fc8b364b4_83319746', 'login_form');
?>

<?php }
/* {block 'login_form_errors'} */
class Block_124787174567bc1fc8b37493_60795040 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

    <?php $_smarty_tpl->_subTemplateRender('file:_partials/form-errors.tpl', $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array('errors'=>$_smarty_tpl->tpl_vars['errors']->value['']), 0, false);
?>
  <?php
}
}
/* {/block 'login_form_errors'} */
/* {block 'login_form_actionurl'} */
class Block_35974371767bc1fc8b3a8b4_55148813 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['action']->value, ENT_QUOTES, 'UTF-8');
}
}
/* {/block 'login_form_actionurl'} */
/* {block 'form_field'} */
class Block_137671939367bc1fc8b3e514_78692009 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['form_field'][0], array( array('field'=>$_smarty_tpl->tpl_vars['field']->value),$_smarty_tpl ) );?>

          <?php
}
}
/* {/block 'form_field'} */
/* {block 'login_form_fields'} */
class Block_208427441267bc1fc8b3c0f4_93501253 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['formFields']->value, 'field');
$_smarty_tpl->tpl_vars['field']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['field']->value) {
$_smarty_tpl->tpl_vars['field']->do_else = false;
?>
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_137671939367bc1fc8b3e514_78692009', 'form_field', $this->tplIndex);
?>

        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
      <?php
}
}
/* {/block 'login_form_fields'} */
/* {block 'form_buttons'} */
class Block_74446101167bc1fc8b43622_84903238 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <button id="submit-login" class="btn btn-primary col-12" data-link-action="sign-in" type="submit" class="form-control-submit">
              <i class="fasl fa-lock"></i> <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Sign in','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>

            </button>
          <?php
}
}
/* {/block 'form_buttons'} */
/* {block 'login_form_footer'} */
class Block_113682473767bc1fc8b42d58_79852839 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <footer class="form-footer form-group pt-2 pb-3 row">
        <div class="col-12">
          <input type="hidden" name="submitLogin" value="1">
          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_74446101167bc1fc8b43622_84903238', 'form_buttons', $this->tplIndex);
?>

        </div>
      </footer>
    <?php
}
}
/* {/block 'login_form_footer'} */
/* {block 'login_form'} */
class Block_207110041267bc1fc8b364b4_83319746 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'login_form' => 
  array (
    0 => 'Block_207110041267bc1fc8b364b4_83319746',
  ),
  'login_form_errors' => 
  array (
    0 => 'Block_124787174567bc1fc8b37493_60795040',
  ),
  'login_form_actionurl' => 
  array (
    0 => 'Block_35974371767bc1fc8b3a8b4_55148813',
  ),
  'login_form_fields' => 
  array (
    0 => 'Block_208427441267bc1fc8b3c0f4_93501253',
  ),
  'form_field' => 
  array (
    0 => 'Block_137671939367bc1fc8b3e514_78692009',
  ),
  'login_form_footer' => 
  array (
    0 => 'Block_113682473767bc1fc8b42d58_79852839',
  ),
  'form_buttons' => 
  array (
    0 => 'Block_74446101167bc1fc8b43622_84903238',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_124787174567bc1fc8b37493_60795040', 'login_form_errors', $this->tplIndex);
?>


  <form id="login-form" class="col-12" action="<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_35974371767bc1fc8b3a8b4_55148813', 'login_form_actionurl', $this->tplIndex);
?>
" method="post">
    <section>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_208427441267bc1fc8b3c0f4_93501253', 'login_form_fields', $this->tplIndex);
?>

      <div class="forgot-password form-group row mt-4 mt-mb-0">
        <div class="col-md-3 form-control-label"></div>
        <div class="col-md-9">
          <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['password'], ENT_QUOTES, 'UTF-8');?>
" class="w-100 btn btn-sm btn-outline-primary rounded-0" rel="nofollow">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Forgot your password?','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );?>
?
          </a>
        </div>
      </div>
    </section>
    <br>
    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_113682473767bc1fc8b42d58_79852839', 'login_form_footer', $this->tplIndex);
?>


  </form>
<?php
}
}
/* {/block 'login_form'} */
}
