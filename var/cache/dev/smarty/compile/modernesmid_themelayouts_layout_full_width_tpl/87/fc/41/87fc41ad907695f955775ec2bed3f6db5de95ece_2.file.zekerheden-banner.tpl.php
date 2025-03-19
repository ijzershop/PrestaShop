<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:29:14
  from 'C:\wampserver\www\ijzershop8.local\themes\modernesmid_theme\templates\custom_blocks\zekerheden-banner.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1fcac7dbb8_35966549',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '87fc41ad907695f955775ec2bed3f6db5de95ece' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\themes\\modernesmid_theme\\templates\\custom_blocks\\zekerheden-banner.tpl',
      1 => 1720434468,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1fcac7dbb8_35966549 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="container <?php if (Configuration::get('MSTHEMECONFIG_FIRST_BOX_ACTIVE',true) || Configuration::get('MSTHEMECONFIG_SECOND_BOX_ACTIVE',true) || Configuration::get('MSTHEMECONFIG_THIRD_BOX_ACTIVE',true) || Configuration::get('MSTHEMECONFIG_FOURTH_BOX_ACTIVE',true) || Configuration::get('MSTHEMECONFIG_FIFTH_BOX_ACTIVE',true)) {?>border-bottom pb-4 mt-4 <?php }?>">
    <div class="row">
        <div class="col-md-12">
            <div class="row hidden-md-down zekerheden-banner-container">
                <!-- Levering -->
                <?php if (Configuration::get('MSTHEMECONFIG_FIRST_BOX_ACTIVE',true)) {?>
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right pl-0">
                            <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="zekerheden-banner-img" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                <img rel="preload" is="image" data-src="<?php echo htmlspecialchars((string) Context::getContext()->shop->getBaseURL(true), ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIRST_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FIRST_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
">
                                            <span class="zekerheden-banner-text text-dark"><?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIRST_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php }?>
                <!-- Levering -->
                <?php if (Configuration::get('MSTHEMECONFIG_SECOND_BOX_ACTIVE',true)) {?>
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                            <a href="/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_SECOND_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="zekerheden-banner-img" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                <img rel="preload" is="image" data-src="<?php echo htmlspecialchars((string) Context::getContext()->shop->getBaseURL(true), ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_SECOND_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_SECOND_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                            <span class="zekerheden-banner-text text-dark"><?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_SECOND_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php }?>
                <!-- Diensten -->
                <?php if (Configuration::get('MSTHEMECONFIG_THIRD_BOX_ACTIVE',true)) {?>
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                            <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_THIRD_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="zekerheden-banner-img" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                <img rel="preload" is="image" data-src="<?php echo htmlspecialchars((string) Context::getContext()->shop->getBaseURL(true), ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_THIRD_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_THIRD_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
">
                                            <span class="zekerheden-banner-text text-dark"><?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_THIRD_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php }?>
                <!-- Verzending -->
                <?php if (Configuration::get('MSTHEMECONFIG_FOURTH_BOX_ACTIVE',true)) {?>
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                                                        <?php $_smarty_tpl->_assignInScope('transmissionCarrier', Carrier::getCarrierByReference(2,Context::getContext()->cookie->id_lang));?>
                                                      <?php if (Context::getContext()->country->id === '3') {?>
                              <?php $_smarty_tpl->_assignInScope('customerCountry', "België");?>
                          <?php } else { ?>
                              <?php $_smarty_tpl->_assignInScope('customerCountry', "Nederland");?>
                          <?php }?>
                                    <?php if (Context::getContext()->cookie->price_vat_settings_incl === "true") {?>
                                        <?php $_smarty_tpl->_assignInScope('defaultShippingPrice', $_smarty_tpl->tpl_vars['transmissionCarrier']->value->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone)*1.21);?>
                                        <?php $_smarty_tpl->_assignInScope('shippingPrice', number_format(Tools::convertPrice($_smarty_tpl->tpl_vars['defaultShippingPrice']->value),0,',','.'));?>
                                    <?php } else { ?>
                                        <?php $_smarty_tpl->_assignInScope('defaultShippingPrice', $_smarty_tpl->tpl_vars['transmissionCarrier']->value->getMaxDeliveryPriceByPrice(Context::getContext()->country->id_zone));?>
                                        <?php $_smarty_tpl->_assignInScope('shippingPrice', number_format(Tools::convertPrice($_smarty_tpl->tpl_vars['defaultShippingPrice']->value),2,',','.'));?>
                                    <?php }?>

                                    <?php if (is_array($_smarty_tpl->tpl_vars['customerCountry']->value)) {?>
                                        <?php $_smarty_tpl->_assignInScope('customerCountry', $_smarty_tpl->tpl_vars['customerCountry']->value[1]);?>
                                    <?php }?>
                            <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
" class="zekerheden-banner-img" title="<?php echo htmlspecialchars((string) sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id),$_smarty_tpl->tpl_vars['customerCountry']->value,$_smarty_tpl->tpl_vars['shippingPrice']->value), ENT_QUOTES, 'UTF-8');?>
">
                                <img rel="preload" is="image" data-src="<?php echo htmlspecialchars((string) Context::getContext()->shop->getBaseURL(true), ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id),$_smarty_tpl->tpl_vars['customerCountry']->value,$_smarty_tpl->tpl_vars['shippingPrice']->value), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['link']->value->getCMSLink(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id)), ENT_QUOTES, 'UTF-8');?>
">
                                            <span class="zekerheden-banner-text text-dark">
                                            <?php echo htmlspecialchars((string) sprintf(Configuration::get('MSTHEMECONFIG_BANNER_FOURTH_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id),$_smarty_tpl->tpl_vars['customerCountry']->value,$_smarty_tpl->tpl_vars['shippingPrice']->value), ENT_QUOTES, 'UTF-8');?>
</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php }?>
                <!-- Advies -->
                <?php if (Configuration::get('MSTHEMECONFIG_FIFT_BOX_ACTIVE',true)) {?>
                <div class="col certainty">
                    <div class="row">
                        <div class="pr-0 certainty-icon text-right">
                            <a href="/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="zekerheden-banner-img" title="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                <img rel="preload" is="image" data-src="<?php echo htmlspecialchars((string) Context::getContext()->shop->getBaseURL(true), ENT_QUOTES, 'UTF-8');?>
upload/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_IMAGE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" alt="<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TITLE',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
" class="hover_effect_target img-fluid lazyload"/>
                            </a>
                        </div>
                        <div class="col-8 pl-0 pr-0 certainty-text">
                            <div class="sttext_item_content">
                                <span>
                                    <span>
                                        <a class="text-decoration-none" href="/<?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_LINK',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
">
                                            <span class="zekerheden-banner-text text-dark"><?php echo htmlspecialchars((string) Configuration::get('MSTHEMECONFIG_BANNER_FIFTH_TEXT',Context::getContext()->language->id,Context::getContext()->shop->id_shop_group,Context::getContext()->shop->id), ENT_QUOTES, 'UTF-8');?>
</span>
                                        </a>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
              <?php }?>
            </div>
        </div>
    </div>
</div>
<?php }
}
