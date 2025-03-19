<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:11
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\steps\personal-information.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc7715d63_96070536',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '27b09d37cc610f917193c9ca9d6d7b42dd7db63e' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\steps\\personal-information.tpl',
      1 => 1717575896,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fc7715d63_96070536 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_15831547667bc1fc76fb111_23533893', 'step_content');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, 'checkout/_partials/steps/checkout-step.tpl');
}
/* {block 'step_content'} */
class Block_15831547667bc1fc76fb111_23533893 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'step_content' => 
  array (
    0 => 'Block_15831547667bc1fc76fb111_23533893',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayPersonalInformationTop','customer'=>$_smarty_tpl->tpl_vars['customer']->value),$_smarty_tpl ) );?>

  <?php if ($_smarty_tpl->tpl_vars['customer']->value['is_logged'] && !$_smarty_tpl->tpl_vars['customer']->value['is_guest']) {?>

    <p class="identity">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Connected as [1]%firstname% %lastname%[/1].','d'=>'Shop.Theme.Customeraccount','sprintf'=>array('[1]'=>"<a href='".((string)$_smarty_tpl->tpl_vars['urls']->value['pages']['identity'])."'>",'[/1]'=>"</a>",'%firstname%'=>$_smarty_tpl->tpl_vars['customer']->value['firstname'],'%lastname%'=>$_smarty_tpl->tpl_vars['customer']->value['lastname'])),$_smarty_tpl ) );?>

    </p>
    <p>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Not you? [1]Log out[/1]','d'=>'Shop.Theme.Customeraccount','sprintf'=>array('[1]'=>"<a href='".((string)$_smarty_tpl->tpl_vars['urls']->value['actions']['logout'])."'>",'[/1]'=>"</a>")),$_smarty_tpl ) );?>

    </p>
    <?php if (!(isset($_smarty_tpl->tpl_vars['empty_cart_on_logout']->value)) || $_smarty_tpl->tpl_vars['empty_cart_on_logout']->value) {?>
      <p><small><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'If you sign out now, your cart will be emptied.','d'=>'Shop.Theme.Checkout'),$_smarty_tpl ) );?>
</small></p>
    <?php }?>

    <div class="clearfix">
      <form method="GET" action="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['order'], ENT_QUOTES, 'UTF-8');?>
">
        <button
          class="continue w-100 btn btn-success float-xs-right"
          name="controller"
          type="submit"
          value="order"
        >
          <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Continue','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>

        </button>
      </form>

    </div>

  <?php } else { ?>
    <ul class="nav nav-inline my-2" role="tablist">
      <li style="border-color:#3b56ad !important;" class="nav-item col-6 text-center <?php if (!$_smarty_tpl->tpl_vars['show_login_form']->value) {?>border-right border-top border-left<?php } else { ?>border-bottom<?php }?>">
        <a
          class="nav-link h5 mt-2 <?php if (!$_smarty_tpl->tpl_vars['show_login_form']->value) {?> text-dark active user-select-none <?php } else { ?> btn btn-outline-white <?php }?>"
          data-toggle="tab"
          href="#checkout-guest-form"
          role="tab"
          aria-controls="checkout-guest-form"
          <?php if (!$_smarty_tpl->tpl_vars['show_login_form']->value) {?> aria-selected="true"<?php }?>
          >
          <?php if ($_smarty_tpl->tpl_vars['guest_allowed']->value) {?>
            Gast<?php if ($_smarty_tpl->tpl_vars['show_login_form']->value) {
}?>
          <?php } else { ?>
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Create an account','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );
if (!$_smarty_tpl->tpl_vars['show_login_form']->value) {
}?>
          <?php }?>
        </a>
      </li>


      <li style="border-color:#3b56ad !important;" class="nav-item col-6 text-center <?php if ($_smarty_tpl->tpl_vars['show_login_form']->value) {?>border-left border-top border-right<?php } else { ?>border-bottom<?php }?>">
        <a
          class="nav-link h5 mt-2 <?php if ($_smarty_tpl->tpl_vars['show_login_form']->value) {?>text-dark active user-select-none<?php } else { ?> btn btn-outline-white <?php }?>"
          data-link-action="show-login-form"
          data-toggle="tab"
          href="#checkout-login-form"
          role="tab"
          aria-controls="checkout-login-form"
          <?php if ($_smarty_tpl->tpl_vars['show_login_form']->value) {?> aria-selected="true"<?php }?>
        >
          Account<?php if (!$_smarty_tpl->tpl_vars['show_login_form']->value) {
}?>
        </a>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane <?php if (!$_smarty_tpl->tpl_vars['show_login_form']->value) {?>active<?php }?>" id="checkout-guest-form" role="tabpanel" <?php if ($_smarty_tpl->tpl_vars['show_login_form']->value) {?>aria-hidden="true"<?php }?>>
        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['render'][0], array( array('file'=>'checkout/_partials/customer-form.tpl','ui'=>$_smarty_tpl->tpl_vars['register_form']->value,'guest_allowed'=>$_smarty_tpl->tpl_vars['guest_allowed']->value),$_smarty_tpl ) );?>

      </div>
      <div class="tab-pane <?php if ($_smarty_tpl->tpl_vars['show_login_form']->value) {?>active<?php }?>" id="checkout-login-form" role="tabpanel" <?php if (!$_smarty_tpl->tpl_vars['show_login_form']->value) {?>aria-hidden="true"<?php }?>>
        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['render'][0], array( array('file'=>'checkout/_partials/login-form.tpl','ui'=>$_smarty_tpl->tpl_vars['login_form']->value),$_smarty_tpl ) );?>

      </div>
    </div>


  <?php }
}
}
/* {/block 'step_content'} */
}
