<?php
/* Smarty version 4.3.4, created on 2025-02-24 08:16:15
  from 'C:\wampserver\www\ijzershop8.local\modules\ps_accounts\views\templates\admin\login.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_67bc1cbfd622d9_19986044',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'c17b7a39069fe7bbd7e5f22c66472da14745dd7e' => 
    array (
      0 => 'C:\\wampserver\\www\\ijzershop8.local\\modules\\ps_accounts\\views\\templates\\admin\\login.tpl',
      1 => 1738158233,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_67bc1cbfd622d9_19986044 (Smarty_Internal_Template $_smarty_tpl) {
?><div class="psacc-grid psacc-h-screen lg:psacc-grid-cols-2">
    <div
        class="psacc-hidden lg:psacc-flex psacc-flex-col psacc-items-center psacc-justify-end psacc-bg-cover psacc-bg-no-repeat psacc-bg-bicycle"
    >
        <section
            id="psacc_slider"
            class="splide psacc-mb-10 psacc-w-11/12 psacc-bg-quote psacc-flex psacc-flex-col"
        >
            <div
                class="splide__arrows psacc-flex psacc-justify-between psacc-w-full psacc-my-5"
            >
                <img src="<?php echo $_smarty_tpl->tpl_vars['shopUrl']->value;?>
/modules/ps_accounts/views/img/quote-mark.svg" class="psacc-ml-10">
                <div class="psacc-flex psacc-justify-center psacc-items-center psacc-mr-10">
                    <button
                        class="splide__arrow splide__arrow--prev psacc-font-materialIcons psacc-opacity-100 psacc-rounded psacc-text-font-main psacc-text-4xl psacc-mr-5"
                    >
                        chevron_left
                    </button>
                    <button
                        class="splide__arrow splide__arrow--next psacc-font-materialIcons psacc-opacity-100 psacc-rounded psacc-text-font-main psacc-text-4xl"
                    >
                        chevron_right
                    </button>
                </div>
            </div>
            <div class="splide__track psacc-mb-5">
                <ul class="splide__list psacc-w-full">
                    <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['testimonials']->value, 'testimonial');
$_smarty_tpl->tpl_vars['testimonial']->do_else = true;
if ($_from !== null) foreach ($_from as $_smarty_tpl->tpl_vars['testimonial']->value) {
$_smarty_tpl->tpl_vars['testimonial']->do_else = false;
?>
                        <li class="splide__slide">
                            <div class="psacc-w-10/12 psacc-ml-10 psacc-font-primary">
                                <p class="psacc-mb-4 psacc-text-lg">
                                    <?php echo (($tmp = $_smarty_tpl->tpl_vars['testimonial']->value[$_smarty_tpl->tpl_vars['isoCode']->value]['sentence'] ?? null)===null||$tmp==='' ? $_smarty_tpl->tpl_vars['testimonial']->value[$_smarty_tpl->tpl_vars['defaultIsoCode']->value]['sentence'] ?? null : $tmp);?>

                                </p>
                                <p class="puik-body-default psacc-font-primary">
                                    <span class="psacc-font-bold"><?php echo (($tmp = $_smarty_tpl->tpl_vars['testimonial']->value[$_smarty_tpl->tpl_vars['isoCode']->value]['name'] ?? null)===null||$tmp==='' ? $_smarty_tpl->tpl_vars['testimonial']->value[$_smarty_tpl->tpl_vars['defaultIsoCode']->value]['name'] ?? null : $tmp);?>
</span>, <?php echo (($tmp = $_smarty_tpl->tpl_vars['testimonial']->value[$_smarty_tpl->tpl_vars['isoCode']->value]['enterprise'] ?? null)===null||$tmp==='' ? $_smarty_tpl->tpl_vars['testimonial']->value[$_smarty_tpl->tpl_vars['defaultIsoCode']->value]['enterprise'] ?? null : $tmp);?>

                                </p>
                            </div>
                        </li>
                    <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>
                </ul>
            </div>
            <ul class="splide__pagination"></ul>
        </section>
    </div>
    <div
        class="psacc-flex psacc-flex-col psacc-items-center psacc-justify-between psacc-bg-white psacc-py-24 psacc-shadow-[0_6px_12px_rgba(0, 0, 0, 0.1)]">
        <?php if ($_smarty_tpl->tpl_vars['loginError']->value != '') {?>
            <div class="psacc-flex psacc-flex-col psacc-space-y-4 psacc-mb-4 psacc-px-4">
                <div class="puik-alert puik-alert--danger" aria-live="polite">
                    <div class="puik-alert__content">
                        <span class="psacc-font-materialIcons">error</span>
                        <div class="puik-alert__text">
                            <span class="puik-alert__description">
                                <?php if ($_smarty_tpl->tpl_vars['loginError']->value == 'employee_not_found') {?>
                                    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'You cannot access the back office with this account. Try another account or contact your administrator.','mod'=>'ps_accounts'),$_smarty_tpl ) );?>

                                <?php } elseif ($_smarty_tpl->tpl_vars['loginError']->value == 'email_not_verified') {?>
                                    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'You need to activate your account first by clicking the link in the email. If you need to receive a new activation link,[1]please click here[/1]','tags'=>array("<a class=\"puik-link\" href=\"".((string)$_smarty_tpl->tpl_vars['ssoResendVerificationEmail']->value)."\" target=\"_blank\">"),'mod'=>'ps_accounts'),$_smarty_tpl ) );?>

                                <?php } elseif ($_smarty_tpl->tpl_vars['loginError']->value == 'error_from_hydra' || $_smarty_tpl->tpl_vars['loginError']->value == 'error_other') {?>
                                    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'An error occured during login, please contact PrestaShop support','mod'=>'ps_accounts'),$_smarty_tpl ) );?>

                                <?php } else { ?>
                                    <?php echo $_smarty_tpl->tpl_vars['loginError']->value;?>

                                <?php }?>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        <?php }?>
        <?php if (!(isset($_smarty_tpl->tpl_vars['wrong_folder_name']->value)) && !(isset($_smarty_tpl->tpl_vars['wrong_install_name']->value))) {?>
            <div class="psacc-flex psacc-flex-col psacc-items-start psacc-justify-start psacc-h-full">
                <h1 class="psacc-m-0 psacc-font-secondary psacc-text-5xl psacc-font-black psacc-mb-10">
                    PRESTASHOP
                </h1>

                <div class="psacc-flex psacc-flex-col psacc-items-start psacc-max-w-xl psacc-font-primary">
                    <h2 class="puik-h2 psacc-mb-10">
                        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Welcome,','mod'=>'ps_accounts'),$_smarty_tpl ) );?>
</br>
                    </h2>
                    <p class="psacc-mb-10 ">
                        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Access your back office to manage your store.','mod'=>'ps_accounts'),$_smarty_tpl ) );?>

                    </p>
                    <button id="ps-accounts-login" class="puik-button puik-button--primary puik-button--lg psacc-w-full">
                        <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Go to the back office','mod'=>'ps_accounts'),$_smarty_tpl ) );?>

                    </button>
                </div>
                <a class="puik-link psacc-mt-auto psacc-self-center" href="<?php echo $_smarty_tpl->tpl_vars['legacyLoginUri']->value;?>
">
                    <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Connect with another method','mod'=>'ps_accounts'),$_smarty_tpl ) );?>

                </a>
            </div>
        <?php } else { ?>
            <div class="puik-alert puik-alert--danger" aria-live="polite">
                <div class="puik-alert__content">
                    <span class="psacc-font-materialIcons">error</span>
                    <div class="puik-alert__text">
                        <p class="puik-alert__title">
                            <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'For security reasons, you cannot connect to the back office until you have:','d'=>'Admin.Login.Notification'),$_smarty_tpl ) );?>

                        </p>
                        <span class="puik-alert__description">
                            <ul class="psacc-list-disc psacc-pl-10">
                                <?php if ((isset($_smarty_tpl->tpl_vars['wrong_install_name']->value)) && $_smarty_tpl->tpl_vars['wrong_install_name']->value == true) {?>
                                    <li><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'deleted the /install folder','d'=>'Admin.Login.Notification'),$_smarty_tpl ) );?>
</li>
                                <?php }?>
                                <?php if ((isset($_smarty_tpl->tpl_vars['wrong_folder_name']->value)) && $_smarty_tpl->tpl_vars['wrong_folder_name']->value == true) {?>
                                    <li><?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'renamed the /admin folder (e.g. %s)','sprintf'=>array($_smarty_tpl->tpl_vars['randomNb']->value),'d'=>'Admin.Login.Notification'),$_smarty_tpl ) );?>

                                    </li>
                                <?php }?>
                            </ul>
                            <a class="puik-link" href="<?php echo call_user_func_array($_smarty_tpl->registered_plugins[ 'modifier' ][ 'escape' ][ 0 ], array( $_smarty_tpl->tpl_vars['adminUrl']->value,'html','UTF-8' ));?>
">
                                <?php echo call_user_func_array( $_smarty_tpl->smarty->registered_plugins[Smarty::PLUGIN_FUNCTION]['l'][0], array( array('s'=>'Please then access this page by the new URL (e.g. %s)','sprintf'=>array($_smarty_tpl->tpl_vars['adminUrl']->value),'d'=>'Admin.Login.Notification'),$_smarty_tpl ) );?>

                            </a>
                        </span>
                    </div>
                </div>
            </div>
        <?php }?>
    </div>
</div>
<?php echo '<script'; ?>
>
    document.addEventListener("DOMContentLoaded", function() {
        const returnTo = '<?php echo $_smarty_tpl->tpl_vars['redirect']->value;?>
';
        const redirectUri = "<?php echo $_smarty_tpl->tpl_vars['oauthRedirectUri']->value;?>
";
        const locale = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);
        const oauth2Uri = redirectUri + '&return_to=' + encodeURIComponent(returnTo) + '&locale=' + encodeURIComponent(locale);

        document.querySelector('#ps-accounts-login').addEventListener('click', function() {
            document.location = oauth2Uri;
        })
    });
<?php echo '</script'; ?>
>
<?php }
}
