<?php
/* Smarty version 4.3.4, created on 2025-02-05 11:52:48
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\custom_blocks\footer-info-bottom.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67a343006ee7f4_70931852',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '33afbd9a0e7813c317065311b02134ecf4d4931d' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\custom_blocks\\footer-info-bottom.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67a343006ee7f4_70931852 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="container mt-4 mb-4 pl-0 pr-0">
    <div class="row">
            <section class="d-none d-sm-none d-md-flex col-12">
                    <!-- MODULE st easy content -->
                    <div class="row d-sm-none d-md-flex mx-auto w-100">
                    <?php if (Configuration::get('MSTHEMECONFIG_FIRST_FOOTERBOTTOM_BOX_ACTIVE',true)) {?>
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-4 pr-0 certainty-icon text-right">
                                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                                    <img rel="preload" is="image" data-src="<?php ob_start();
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['base_url'], ENT_QUOTES, 'UTF-8');
$_prefixVariable2 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable2, ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                            <div class="col-8 pl-0 certainty-text">
                                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                                    <span style="color: #777777;"><?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIRST_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                      <?php }?>
                    <?php if (Configuration::get('MSTHEMECONFIG_SECOND_FOOTERBOTTOM_BOX_ACTIVE',true)) {?>
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-4 pr-0 certainty-icon text-right">
                                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                                    <img rel="preload" is="image" data-src="<?php ob_start();
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['base_url'], ENT_QUOTES, 'UTF-8');
$_prefixVariable3 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable3, ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                            <div class="col-8 pl-0 pr-0 certainty-text">
                                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                                    <span style="color: #777777;"><?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_SECOND_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    <?php }?>
                    <?php if (Configuration::get('MSTHEMECONFIG_THIRD_FOOTERBOTTOM_BOX_ACTIVE',true)) {?>
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 certainty-icon text-center">
                                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                                    <img rel="preload" is="image" data-src="<?php ob_start();
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['base_url'], ENT_QUOTES, 'UTF-8');
$_prefixVariable4 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable4, ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_THIRD_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    <?php }?>
                    <?php if (Configuration::get('MSTHEMECONFIG_FOURTH_FOOTERBOTTOM_BOX_ACTIVE',true)) {?>
                      <div class="col">
                        <div class="row">
                          <div class="col-12">
                            <div class="row">
                              <div class="col-12 certainty-icon text-center">
                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                  <img style="opacity:.8;" rel="preload" is="image" data-src="<?php ob_start();
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['base_url'], ENT_QUOTES, 'UTF-8');
$_prefixVariable5 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable5, ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FOURTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload">
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <?php }?>
                    <?php if (Configuration::get('MSTHEMECONFIG_FIFTH_FOOTERBOTTOM_BOX_ACTIVE',true)) {?>
                        <div class="col">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-4 pr-0 certainty-icon text-right">
                                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                                    <img rel="preload" is="image" data-src="<?php ob_start();
echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['base_url'], ENT_QUOTES, 'UTF-8');
$_prefixVariable6 = ob_get_clean();
echo htmlspecialchars((string) $_prefixVariable6, ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload">
                                                </a>
                                            </div>
                                            <div class="col-8 pl-0 pr-0 certainty-text">
                                                <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="footer-info-bottom-icon text-decoration-none" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                                    <span style="color: #777777;"><?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_FOOTERBOTTOM_FIFTH_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    <?php }?>
                    </div>
            </section>
    </div>
</div>
<?php }
}
