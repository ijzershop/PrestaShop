<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:49
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\modules\contactform\views\templates\widget\contactform.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a34301aafe65_90951375',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'b300784ccb02898f209e1b089d1ab70cc4116e91' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\modules\\contactform\\views\\templates\\widget\\contactform.tpl',
      1 => 1728375870,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
    'file:schema_org/organisation.tpl' => 1,
  ),
),false)) {
function content_67a34301aafe65_90951375 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, false);
?>


<section class="contact-form text-left row w-100">
<?php if (Context::getContext()->controller->php_self == 'category' || Context::getContext()->controller->php_self == 'contact' || Context::getContext()->controller->php_self == 'search') {?>
     <div class="col-12 ">
      <div class="row justify-content-center">
      <div class="mx-auto col-12">
      <div class="h5 w-100 text-center"><?php if (Context::getContext()->controller->php_self == 'search') {?>Uw zoekopdracht heeft geen resultaten opgeleverd. Wilt u weten of de <?php echo htmlspecialchars((string) Configuration::get('PS_SHOP_NAME',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
 een alternatief kan leveren?<?php } else { ?>Mist u een product of wilt u weten of de <?php echo htmlspecialchars((string) Configuration::get('PS_SHOP_NAME',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
 een alternatief kan leveren?<?php }?> Vraag het ons via het onderstaande formulier.</div>
      </div>
        <div class="col-12 text-left">
<?php }?>
 <div class="card card-block bg-info col-12">
    <?php if (Context::getContext()->controller->php_self == 'contactoffer') {?>
      <form action="/offerte-aanvragen" class="needs-validation" novalidate method="post" <?php if ($_smarty_tpl->tpl_vars['contact']->value['allow_file_upload']) {?>enctype="multipart/form-data"<?php }?>>
        <input type="hidden" value="offer" name="template_type"/>
    <?php } elseif (Context::getContext()->controller->php_self == 'contactinformation') {?>
      <form action="/informatie-aanvragen" class="needs-validation" novalidate  method="post" <?php if ($_smarty_tpl->tpl_vars['contact']->value['allow_file_upload']) {?>enctype="multipart/form-data"<?php }?>>
        <input type="hidden" value="information" name="template_type"/>

          <?php } elseif (Context::getContext()->controller->php_self == 'contactretour') {?>
        <form action="/herroeping-aanvragen" class="needs-validation" novalidate  method="post" <?php if ($_smarty_tpl->tpl_vars['contact']->value['allow_file_upload']) {?>enctype="multipart/form-data"<?php }?>>
          <input type="hidden" value="retour" name="template_type"/>
          <input type="hidden" value="" name="id_customer"/>
            <?php } else { ?>
        <form action="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['contact'], ENT_QUOTES, 'UTF-8');?>
" class="needs-validation" novalidate method="post" <?php if ($_smarty_tpl->tpl_vars['contact']->value['allow_file_upload']) {?>enctype="multipart/form-data"<?php }?>>
        <input type="hidden" value="contact" name="template_type"/>
    <?php }?>

    <header class="card-header bg-primary p-2 pl-3 row">
      <?php if (Context::getContext()->controller->php_self == 'contactoffer') {?>
      <h5 class="h5 text-white m-0"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Offerte aanvraag','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</h5>
      <?php } elseif (Context::getContext()->controller->php_self == 'contactinformation') {?>
      <h5 class="h5 text-white m-0"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Informatie aanvraag','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</h5>
      <?php } elseif (Context::getContext()->controller->php_self == 'contactretour') {?>
      <h5 class="h5 text-white m-0"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Herroepingformulier','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</h5>
      <?php } elseif (Context::getContext()->controller->php_self == 'category') {?>
      <h5 class="h5 text-white m-0"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Alternatief product ?','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</h5>
      <?php } else { ?>
      <h5 class="h5 text-white m-0"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Alternatief product ?','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</h5>
      <?php }?>
    </header>
    <div class="card-body">
    <?php if ($_smarty_tpl->tpl_vars['notifications']->value) {?>

      <div id="contact-form-notifications" class="notification alert <?php if ($_smarty_tpl->tpl_vars['notifications']->value['nw_error']) {?>alert-danger<?php } else { ?>alert-success<?php }?>" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="alert-heading"><?php if ($_smarty_tpl->tpl_vars['notifications']->value['nw_error']) {?>Er ging iets mis!<?php } else { ?>Geslaagd!<?php }?></h4>
        <p>
        <ul class="list-unstyled">
            <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['notifications']->value['messages'], 'notif');
$_smarty_tpl->tpl_vars['notif']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['notif']->value) {
$_smarty_tpl->tpl_vars['notif']->do_else = false;
?>
              <li><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['notif']->value, ENT_QUOTES, 'UTF-8');?>
</li>
            <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
        </ul>
        </p>
      </div>
    <?php }?>

    <?php if ((!$_smarty_tpl->tpl_vars['notifications']->value || $_smarty_tpl->tpl_vars['notifications']->value['nw_error']) && !$_smarty_tpl->tpl_vars['geo_location_block']->value) {?>
      <section class="form-fields">
        <?php if (Context::getContext()->controller->php_self == 'contactinformation') {?>
          <input type="hidden" value="2" class="form-control" name="id_contact">
        <?php } elseif (Context::getContext()->controller->php_self == 'contactoffer') {?>
          <input type="hidden" value="3" class="form-control" name="id_contact">
        <?php } else { ?>
          <input type="hidden" value="2" class="form-control" name="id_contact">
        <?php }?>
        <label class="text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Your name or Company name','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
          <input class="form-control mb-2" type="text" name="name" value="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['contact']->value['email'], ENT_QUOTES, 'UTF-8');?>
" />

        <label class="text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Email address','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
          <input class="form-control mb-2" type="email" name="from" value="" />

        <?php if (Context::getContext()->controller->php_self == 'contactretour') {?>
          <label class="text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Phonenumber','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
          <input class="form-control mb-2" type="text" name="phonenumber" value="" />
        <?php }?>


        <?php if (Context::getContext()->controller->php_self == 'contactinformation' || Context::getContext()->controller->php_self == 'contactoffer') {?>
        <label class="text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Postalcode','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
          <input class="form-control mb-2" type="text" name="postalcode" value="" required/>
          <div class="invalid-feedback">
            Vul a.u.b. uw postcode in dan kunnen wij u beter helpen.
          </div>
        <label class="text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Phonenumber','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
          <input class="form-control mb-2" type="text" name="phonenumber" value="" />
        <?php }?>

        <?php if (Context::getContext()->controller->php_self == 'contactretour') {?>
          <?php if ($_smarty_tpl->tpl_vars['contact']->value['orders']) {?>
            <div class="card car-body col">


            <div class="form-row mb-2">
              <span class="col form-text text-muted">Selecteer een bestelling om de bijhorende producten op te halen. U kunt dan per product aangeven welke u wilt retourneren.</span>
              <br/>
            </div>
            <select class="form-control mb-2" name="id_order">
                <option value=""><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Select reference','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</option>
                <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['contact']->value['orders'], 'order');
$_smarty_tpl->tpl_vars['order']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['order']->value) {
$_smarty_tpl->tpl_vars['order']->do_else = false;
?>
                  <option value="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['order']->value['id_order'], ENT_QUOTES, 'UTF-8');?>
"><?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['order']->value['reference'], ENT_QUOTES, 'UTF-8');?>
</option>
                <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
              </select>
            </div>
              <?php } else { ?>
            <div class="card card-body">
            <div class="form-row">
              <span class="col form-text text-muted">Vul eerst uw bestelling factuurnummer en bijhorende postcode in. Klik daarna op <button disabled onclick="void(0)" type="button" style="font-size: .5rem;" class="btn-sm btn btn-success"><i class="fasl fa-magnifying-glass"></i></button> om de producten van uw bestelling op te halen. U kunt dan per product aangeven welke u wilt retourneren</span>
              <br/>
            </div>
            <div class="form-row">
              <input type="hidden" value="" name="id_order">
              <div class="col">
              <input class="form-control mb-2" type="text" name="order_referenc" value="" placeholder="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'YS-*******','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
"/>
              </div>
              <div class="col">
                <input class="form-control mb-2" type="text" name="postcode" value="" placeholder="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Postalcode','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
" />
              </div>
              <div class="">
                <button id="retour_order_search" type="button" class="btn btn-success"><i class="fasl fa-magnifying-glass"></i></button>
              </div>
            </div>
            </div>
          <?php }?>

          <?php if (Context::getContext()->controller->php_self == 'contactretour') {?>

            <div id="contact_return_alert"  style="display:none;"  class="alert alert-warning alert-dismissible fade show w-100" role="alert">
              <strong>Er ging iets mis!</strong>
              <span id="error_msg_contact"></span>
              <span>Probeer het nogmaal of neem contact op met ons.</span>
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div id="retourform-table" class="form-row mt-2">
            <div class="col">
              <label class="text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Producten te retourneren','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
              <div class="collapse" id="retour_table_customized_info">
              <div class="card-body card bg-transparent">
                <div class="row  text-primary align-middle">
                  <div class="blockquote col-2 text-center"><i class="fasl fa-info fa-2x"></i></div><div class="col-10 pl-0">Alleen onbewerkte producten kunnen geretourneerd worden. Alle producten die geknipt gezaagd of op andere wijze bewerkt zijn zullen niet vergoed worden</div>
                </div>
              </div>
            </div>
              <table class="table disabled">
                <thead>
                <tr>
                  <th class="col-2 col-md-1 align-middle">#</th>
                  <th class="col-7 col-md-8 align-middle">Naam</th>
                  <th class="col-3 align-middle">Aantal</th>
                </tr>
                </thead>
               <tbody></tbody>
              </table>
            </div>
          </div>
          <?php }?>

        <?php }?>




        <?php if ($_smarty_tpl->tpl_vars['contact']->value['allow_file_upload']) {?>
          <label class="text-dark"><?php if (Context::getContext()->controller->php_self == 'contactretour') {?>Eventuele Foto<?php } else {
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Attach File','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );
}?></label>
            <div class="custom-file mb-4">
              <input class="custom-file-input" type="file" name="fileUpload" id="fileUpload"/>
              <label class="custom-file-label" for="fileUpload"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Attach File','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
              <small class="">Beschikbaar types: .pdf,.zip,.png,.jpeg,.gif,.dxf</small>
            </div>
        <?php }?>

        <label class="text-dark"><?php if (Context::getContext()->controller->php_self != 'category' && Context::getContext()->controller->php_self != 'contact') {
if (Context::getContext()->controller->php_self == 'contactretour') {?>Extra Toelichting<?php } else {
echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Message','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );
}
} else { ?>Bericht ("Ik mis het volgende product")<?php }?></label>
          <textarea class="form-control" cols="67" rows="13" name="message"><?php if ($_smarty_tpl->tpl_vars['contact']->value['message']) {
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['contact']->value['message'], ENT_QUOTES, 'UTF-8');
}?></textarea>

        <div class="pt-2">
          <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayRecaptcha'),$_smarty_tpl ) );?>

        </div>
        <div class="pt-2">
          <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayGDPRConsent','id_module'=>$_smarty_tpl->tpl_vars['id_module']->value),$_smarty_tpl ) );?>

        </div>
      </section>

      <footer class="form-footer">
        <style>
          input[name=url] {
            display: none !important;
          }
        </style>
        <input class="form-control" type="text" name="url" value=""/>
        <input type="hidden" name="token" value="<?php echo htmlspecialchars((string) call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['token']->value,'htmlall','UTF-8' )), ENT_QUOTES, 'UTF-8');?>
" />
        <button type="submit"  class="btn btn-primary w-100"  name="submitMessage" disabled="disabled" value="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Send','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
">
            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Send','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>

        </button>

      </footer>
    <?php }?>

      <div class="contactform-user-code-input">
        <label class="text-dark"><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'User Code','d'=>'Modules.Contactform.Shop'),$_smarty_tpl ) );?>
</label>
        <input class="form-control mb-2" type="text" name="gebruikers_informatie_nummer" value="" tabindex="-1" autocomplete="off"/>
        <div class="invalid-feedback">
          Vul a.u.b. uw gebruikercode in.
        </div>
      </div>


  </form>
  </div>
  </div>
<?php if (Context::getContext()->controller->php_self == 'category' || Context::getContext()->controller->php_self == 'contact') {?>
</div>
      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_20844898967a34301aab158_82254987', 'hook_not_found');
?>

    </div>
      </div>
<?php }?>
</section>
  <?php $_smarty_tpl->_subTemplateRender("file:schema_org/organisation.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, 0, $_smarty_tpl->cache_lifetime, array(), 0, false);
}
/* {block 'hook_not_found'} */
class Block_20844898967a34301aab158_82254987 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'hook_not_found' => 
  array (
    0 => 'Block_20844898967a34301aab158_82254987',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['hook'][0], array( array('h'=>'displayNotFound'),$_smarty_tpl ) );?>

      <?php
}
}
/* {/block 'hook_not_found'} */
}
