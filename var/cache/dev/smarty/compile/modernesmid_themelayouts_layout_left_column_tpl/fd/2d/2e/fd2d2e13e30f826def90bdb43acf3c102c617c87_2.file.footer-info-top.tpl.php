<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:48
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\custom_blocks\footer-info-top.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a343000efd91_80803443',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'fd2d2e13e30f826def90bdb43acf3c102c617c87' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\custom_blocks\\footer-info-top.tpl',
      1 => 1726059106,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a343000efd91_80803443 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="container mt-4">
    <div class="row">
      <?php if (Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE',true)) {?>
      <div class="footer_block border-bottom pb-mb-4 col-lg-5 col-md-12 col-12 pr-md-5">
            <div class="title_block">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_ABOUTUS_HEADER',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>

                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasl fa-plus plus_sign"></i></div>
                </div>
            </div>
            <div class="footer_block_content d-sm-none d-none d-md-flex">
                <div class="easy_brother_block text-1 text-md-0">
                    <?php echo Configuration::get('MSTHEMECONFIG_FOOTERTOP_ABOUTUS_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id);?>

                </div>
            </div>
        </div>
      <?php }?>
      <?php if (Configuration::get('MSTHEMECONFIG_INFORMATION_FOOTERTOP_BOX_ACTIVE',true)) {?>
      <div class="footer_block border-bottom pb-mb-4 <?php if (Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,true)) {?>col-12 col-md-4 col-lg-2<?php } else { ?>col<?php }?> pl-lg-0 pt-0 pt-md-1 pt-lg-0">
            <div class="title_block ">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_INFORMATION_HEADER',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>

                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasl fa-plus plus_sign"></i></div>
                </div>
            </div>
             <?php echo Configuration::get('MSTHEMECONFIG_FOOTERTOP_INFORMATION',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id);?>

        </div>
      <?php }?>
      <?php if (Configuration::get('MSTHEMECONFIG_PARTNERS_FOOTERTOP_BOX_ACTIVE',true)) {?>
      <div class="footer_block border-bottom pb-mb-4 <?php if (Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id,true)) {?>col-12 col-md-4 col-lg-2<?php } else { ?>col<?php }?> pt-0 pt-md-1 pt-lg-0 pl-md-0">
            <div class="title_block ">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_PARTNERS_HEADER',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>

                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasl fa-plus plus_sign"></i></div>
                </div>
            </div>
             <?php echo Configuration::get('MSTHEMECONFIG_FOOTERTOP_PARTNERS',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id);?>

      </div>




      <?php }?>
      <?php if (Configuration::get('MSTHEMECONFIG_STORE_INFORMATION_FOOTERTOP_BOX_ACTIVE',true)) {?>
      <div class="footer_block border-bottom pb-mb-4 <?php if (Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE',true)) {?>col-12 col-md-4 col-lg-3<?php } else { ?>col<?php }?> pr-lg-0 pt-0 pt-md-1 pt-lg-0">
            <div class="title_block ">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"Store Information",'d'=>'Shop.Modernesmid'),$_smarty_tpl ) );?>

                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasl fa-plus plus_sign"></i></div>
                </div>
            </div>
            <ul class="footer_block_content bullet custom_links_list  list-unstyled d-sm-none d-none d-md-block">
                <li>
                    <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"Daily opened from %s",'sprintf'=>array(Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_OPENED',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)),'d'=>'Shop.Modernesmid'),$_smarty_tpl ) );?>
">
                        <i class="fasl fa-clock  list_arrow  st_custom_link_icon"></i> &nbsp;<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_OPENED',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>

                    </a>
                </li>
                <li>
                    <a href="https://www.google.com/maps/place/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_GOOGLE_STRING',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_ADDRESS'), ENT_QUOTES, 'UTF-8');?>
" rel="noopener" target="_blank">
                        <i class="fasl fa-location-dot  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_ADDRESS',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>

                    </a>
                </li>
                <li>
                    <a href="tel://<?php echo htmlspecialchars((string) str_replace(' ','',Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"Call us:",'d'=>'Shop.Modernesmid'),$_smarty_tpl ) );?>
 <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                        <i class="fasl fa-phone  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"Call us:",'d'=>'Shop.Modernesmid'),$_smarty_tpl ) );?>
 <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>

                    </a>
                </li>
                <li>
                    <a href="<?php echo htmlspecialchars((string) str_replace(' ','',Configuration::get('MSTHEMECONFIG_HEADER_WHATSAPP_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"Whatsapp:",'d'=>'Shop.Modernesmid'),$_smarty_tpl ) );?>
 <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_WHATSAPP',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                        <i class="fab fa-whatsapp  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"Whatsapp:",'d'=>'Shop.Modernesmid'),$_smarty_tpl ) );?>
 <?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_WHATSAPP',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>

                    </a>
                </li>
                <li>
                    <a href="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Contactformulier">
                        <i class="fasl fa-envelope  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>"Mail ons: contactformulier:",'d'=>'Shop.Modernesmid'),$_smarty_tpl ) );?>

                    </a>
                </li>
            </ul>


        <div class="d-none d-md-block">
          <ul class="footer_block_content bullet custom_links_list  list-unstyled ">
              <?php if (Context::getContext()->cookie->logged && !Context::getContext()->cookie->is_guest) {?>
                <li>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['my_account'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Uw account">
                    <i class="fasl fa-user list_arrow st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Your account','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );?>

                  </a>
                </li>
                <li>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['history'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Uw bestellingen">
                    <i class="fasl fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Uw Bestellingen
                  </a>
                </li>
                <li>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['actions']['logout'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Afmelden">
                    <i class="fasl fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Logout','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );?>

                  </a>
                </li>
              <?php } else { ?>
                <li>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['guest_tracking'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Gast bestelling status opvragen">
                    <i class="fasl fa-magnifying-glass list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Gast bestelling status opvragen
                  </a>
                </li>
                <li>
                  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['authentication'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Aanmelden">
                    <i class="fasl fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Login','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );?>

                  </a>
                </li>
              <?php }?>
          </ul>
        </div>

        </div>
      <?php }?>
        <div class="footer_block border-bottom pb-mb-4 d-block d-md-none col">
          <div class="title_block ">
            <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> Mijn Account
              <div class="opener float-right d-sm-flex d-md-none"><i class="fasl fa-plus plus_sign"></i></div>
            </div>
          </div>

          <ul class="footer_block_content bullet custom_links_list  list-unstyled d-none">
            <?php if (Context::getContext()->cookie->logged) {?>
            <li>
              <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['my_account'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Uw account">
                <i class="fasl fa-user list_arrow st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Your account','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );?>

              </a>
            </li>
              <li>
                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['history'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Uw bestellingen">
                  <i class="fasl fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Uw Bestellingen
                </a>
              </li>
            <li>
              <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['actions']['logout'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Afmelden">
                <i class="fasl fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Logout','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );?>

              </a>
            </li>
              <?php } else { ?>
              <li>
                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['guest_tracking'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Gast bestelling status opvragen">
                  <i class="fasl fa-magnifying-glass list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Gast bestelling status opvragen
                </a>
              </li>
              <li>
                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['authentication'], ENT_QUOTES, 'UTF-8');?>
" class="dropdown_list_item text-decoration-none text-dark" title="Aanmelden">
                  <i class="fasl fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;<?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Login','d'=>'Shop.Theme.Customeraccount'),$_smarty_tpl ) );?>

                </a>
              </li>
            <?php }?>
          </ul>
        </div>
    </div>
</div>


<?php }
}
