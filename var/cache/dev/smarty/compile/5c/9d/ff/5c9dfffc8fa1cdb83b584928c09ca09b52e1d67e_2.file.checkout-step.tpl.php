<?php
/* Smarty version 4.3.4, created on 2025-03-13 11:21:25
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\checkout\_partials\steps\checkout-step.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67d2b1a5bf9050_91157096',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '5c9dfffc8fa1cdb83b584928c09ca09b52e1d67e' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\checkout\\_partials\\steps\\checkout-step.tpl',
      1 => 1741861237,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67d2b1a5bf9050_91157096 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_136183594767d2b1a5be0717_40680290', 'step');
?>

<?php }
/* {block 'step_content'} */
class Block_16117222867d2b1a5bf7886_35405046 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>
DUMMY STEP CONTENT<?php
}
}
/* {/block 'step_content'} */
/* {block 'step'} */
class Block_136183594767d2b1a5be0717_40680290 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'step' => 
  array (
    0 => 'Block_136183594767d2b1a5be0717_40680290',
  ),
  'step_content' => 
  array (
    0 => 'Block_16117222867d2b1a5bf7886_35405046',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

  <style>
    #toggle-postcode-check .switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 12px;
      line-height: 12px;
      margin-top:.6rem;
    }

    /* Hide default HTML checkbox */
    #toggle-postcode-check .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    #toggle-postcode-check .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }

    #toggle-postcode-check .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 0px;
      bottom: -4px;
      border: 1px solid #ccc;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    #cart-postcode-check-toggle:checked+.slider {
      background-color: #2196F3;
    }

    #cart-postcode-check-toggle:focus+.slider {
      box-shadow: 0 0 1px #2196F3;
    }

    #cart-postcode-check-toggle:checked+.slider:before {
      border: 1px solid #2196F3;
      -webkit-transform: translateX(30px);
      -ms-transform: translateX(30px);
      transform: translateX(30px);
    }

    /* Rounded sliders */
    #toggle-postcode-check .slider.round {
      border-radius: 12px;
    }

    #toggle-postcode-check .slider.round:before {
      border-radius: 50%;
    }
    #toggle-postcode-check label:first-child {
      line-height: 27px;
    }
    #toggle-postcode-check label svg{
      vertical-align: -.3em!important;
    }
    #postcode-check-info{
      color:#3b56ad;
      display:none;
    }
    .selected{
      background-color: #f0f0f0;
      color:#000000;
    }
  </style>



  <section  id    = "<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['identifier']->value, ENT_QUOTES, 'UTF-8');?>
"
            class = "<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'classnames' ][ 0 ], array( array('checkout-step'=>true,'-current'=>$_smarty_tpl->tpl_vars['step_is_current']->value,'-reachable'=>$_smarty_tpl->tpl_vars['step_is_reachable']->value,'-complete'=>$_smarty_tpl->tpl_vars['step_is_complete']->value,'js-current-step'=>$_smarty_tpl->tpl_vars['step_is_current']->value) )), ENT_QUOTES, 'UTF-8');?>
"
  >
    <h1 class="step-title js-step-title h5 w-100 text-dark p-2 pt-3 pb-3 <?php if ($_smarty_tpl->tpl_vars['identifier']->value === 'checkout-personal-information-step') {?>border-0<?php }?>">
      <div class="w-100">
        <table class="w-100">
          <tr class="row">
            <td class="col-1 text-success" style="min-width:35px; max-width: 35px;text-align: center;vertical-align: center;">
              <i class="fasl fa-check rtl-no-flip done pl-2 pr-1"></i>
              <span class="step-number m-0"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['position']->value, ENT_QUOTES, 'UTF-8');?>
</span>
            </td>
            <td class="col-9" style="padding-left: 1.2rem;padding-top: .2rem;">
              <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['title']->value, ENT_QUOTES, 'UTF-8');?>

            </td>
            <td class="col-2 text-right">
              <span class="step-edit text-muted"><i class="fasl fa-pen-to-square edit"></i> <span class="d-none d-xl-inline"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Edit','d'=>'Shop.Theme.Actions'),$_smarty_tpl ) );?>
</span></span>
            </td>
          </tr>
          <?php if ($_smarty_tpl->tpl_vars['position']->value == 4) {?>
            <tr>
              <td style="font-size: initial;" colspan="3">
                <div class="w-100">
                  <div class="d-flex align-items-center p-0" role="alert">
                    <div class="p-1 text-center border-danger mx-auto" style="border:3px solid red;">
                      Lukt het afrekenen niet? Geen probleem! <a href="/informatie-aanvragen?winkelwagen=<?php echo htmlspecialchars((string) Context::getContext()->cart->id, ENT_QUOTES, 'UTF-8');?>
">Klik hier</a>
                      om ons een bericht te sturen, dan lossen wij het op. (winkelwagen code  <?php echo htmlspecialchars((string) Context::getContext()->cart->id, ENT_QUOTES, 'UTF-8');?>
)
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          <?php }?>
        </table>
      </div>
    </h1>

    <div class="content p-2">
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_16117222867d2b1a5bf7886_35405046', 'step_content', $this->tplIndex);
?>

    </div>
  </section>
<?php
}
}
/* {/block 'step'} */
}
