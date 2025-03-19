<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:11
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\_partials\notifications.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fc72b8390_95998578',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '50e298aaf7ef8010d0167150a32dbd099f3e2983' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\_partials\\notifications.tpl',
      1 => 1730977490,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fc72b8390_95998578 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>

<?php if ((isset($_smarty_tpl->tpl_vars['notifications']->value))) {?>
<aside id="notifications" class="w-100 text-center">
  <div class="row">
    <?php if ($_smarty_tpl->tpl_vars['notifications']->value['error']) {?>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_159983673067bc1fc72a27d3_24647628', 'notifications_error');
?>

    <?php }?>

    <?php if ($_smarty_tpl->tpl_vars['notifications']->value['warning']) {?>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_2448894467bc1fc72a8777_89303584', 'notifications_warning');
?>

    <?php }?>

    <?php if ($_smarty_tpl->tpl_vars['notifications']->value['success']) {?>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_199345662567bc1fc72adc42_73687971', 'notifications_success');
?>

    <?php }?>

    <?php if ($_smarty_tpl->tpl_vars['notifications']->value['info']) {?>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_199318910567bc1fc72b2f25_41555029', 'notifications_info');
?>

    <?php }?>
  </div>
</aside>
<?php }
}
/* {block 'notifications_error'} */
class Block_159983673067bc1fc72a27d3_24647628 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'notifications_error' => 
  array (
    0 => 'Block_159983673067bc1fc72a27d3_24647628',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <article class="alert alert-danger col-12" style="z-index:9999999;" role="alert" data-alert="danger">
          <div class="row">
            <div class="col-2 my-auto"><i class="fasl fa-warning w-100 fa-4x"></i></div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                <h4 class="alert-heading">Er ging iets fout!
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button></h4>
                <ul class="list-unstyled mb-0">
                  <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notifications']->value['error'], 'notif');
$_smarty_tpl->tpl_vars['notif']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['notif']->value) {
$_smarty_tpl->tpl_vars['notif']->do_else = false;
?>
                      <?php if (is_array($_smarty_tpl->tpl_vars['notif']->value)) {?>
                        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notif']->value, 'line');
$_smarty_tpl->tpl_vars['line']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['line']->value) {
$_smarty_tpl->tpl_vars['line']->do_else = false;
?>
                        <li><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['line']->value, ENT_QUOTES, 'UTF-8');?>
</li>
                        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                      <?php } else { ?>
                        <li><?php echo $_smarty_tpl->tpl_vars['notif']->value;?>
</li>
                      <?php }?>
                  <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-1">
                  <p class="contact-msg">Komt u er niet uit? Neem dan even contact met ons op. We helpen u graag verder.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      <?php
}
}
/* {/block 'notifications_error'} */
/* {block 'notifications_warning'} */
class Block_2448894467bc1fc72a8777_89303584 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'notifications_warning' => 
  array (
    0 => 'Block_2448894467bc1fc72a8777_89303584',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <article class="alert alert-warning col-12" role="alert" data-alert="warning">
          <div class="row">
            <div class="col-2 my-auto"><i class="fasl fa-exclamation-triangle w-100 fa-4x"></i></div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <h4 class="alert-heading">Let op!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></h4>
                  <ul class="list-unstyled mb-0">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notifications']->value['warning'], 'notif');
$_smarty_tpl->tpl_vars['notif']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['notif']->value) {
$_smarty_tpl->tpl_vars['notif']->do_else = false;
?>
                      <?php if (is_array($_smarty_tpl->tpl_vars['notif']->value)) {?>
                        <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notif']->value, 'line');
$_smarty_tpl->tpl_vars['line']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['line']->value) {
$_smarty_tpl->tpl_vars['line']->do_else = false;
?>
                        <li><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['line']->value, ENT_QUOTES, 'UTF-8');?>
</li>
                        <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                      <?php } else { ?>
                        <li><?php echo $_smarty_tpl->tpl_vars['notif']->value;?>
</li>
                      <?php }?>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-1">
                  <p class="contact-msg">Komt u er niet uit? Neem dan even contact met ons op. We helpen u graag verder.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      <?php
}
}
/* {/block 'notifications_warning'} */
/* {block 'notifications_success'} */
class Block_199345662567bc1fc72adc42_73687971 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'notifications_success' => 
  array (
    0 => 'Block_199345662567bc1fc72adc42_73687971',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <article class="alert alert-success col-12" role="alert" data-alert="success">
          <div class="row">
            <div class="col-2 my-auto"><i class="fasl fa-shield-check w-100 fa-4x"></i></div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <h4 class="alert-heading">Succes!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></h4>
                  <ul class="list-unstyled mb-0">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notifications']->value['success'], 'notif');
$_smarty_tpl->tpl_vars['notif']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['notif']->value) {
$_smarty_tpl->tpl_vars['notif']->do_else = false;
?>
                        <?php if (is_array($_smarty_tpl->tpl_vars['notif']->value)) {?>
                          <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notif']->value, 'line');
$_smarty_tpl->tpl_vars['line']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['line']->value) {
$_smarty_tpl->tpl_vars['line']->do_else = false;
?>
                        <li><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['line']->value, ENT_QUOTES, 'UTF-8');?>
</li>
                          <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                      <?php } else { ?>
                        <li><?php echo $_smarty_tpl->tpl_vars['notif']->value;?>
</li>
                      <?php }?>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-1">
                  <p class="contact-msg">Heeft u nog vragen? Neem dan even contact met ons op. We helpen u graag verder.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      <?php
}
}
/* {/block 'notifications_success'} */
/* {block 'notifications_info'} */
class Block_199318910567bc1fc72b2f25_41555029 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'notifications_info' => 
  array (
    0 => 'Block_199318910567bc1fc72b2f25_41555029',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <article class="alert alert-info col-12" role="alert" data-alert="info">
          <div class="row">
            <div class="col-2 my-auto">
              <i class="fasl fa-megaphone w-100 fa-4x"></i>
            </div>
            <div class="col-10">
              <div class="row">
                <div class="col-12">
                  <h4 class="alert-heading">Informatie!
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button></h4>
                  <ul class="list-unstyled mb-0">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notifications']->value['info'], 'notif');
$_smarty_tpl->tpl_vars['notif']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['notif']->value) {
$_smarty_tpl->tpl_vars['notif']->do_else = false;
?>
                        <?php if (is_array($_smarty_tpl->tpl_vars['notif']->value)) {?>
                          <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notif']->value, 'line');
$_smarty_tpl->tpl_vars['line']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['line']->value) {
$_smarty_tpl->tpl_vars['line']->do_else = false;
?>
                        <li><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['line']->value, ENT_QUOTES, 'UTF-8');?>
</li>
                          <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                      <?php } else { ?>
                        <li><?php echo $_smarty_tpl->tpl_vars['notif']->value;?>
</li>
                      <?php }?>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr class="mt-1">
                  <p class="contact-msg">Heeft u nog vragen? Neem dan even contact met ons op. We helpen u graag verder.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      <?php
}
}
/* {/block 'notifications_info'} */
}
