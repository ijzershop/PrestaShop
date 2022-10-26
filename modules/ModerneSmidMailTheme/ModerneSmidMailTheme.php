
<?php
/**
* 2007-2021 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\Layout;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCatalogInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCollectionInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\FolderThemeScanner;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutVariablesBuilderInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutInterface;
use ModerneSmidMailTheme\Controller\MailTheme;
use ModerneSmidMailTheme\Controller\DmsMailThemeController;
use ModerneSmidMailTheme\Controller\TwigTemplateRendererController;

if (!defined('_PS_VERSION_')) {
    exit;
}


// Needed for installing process
require_once __DIR__ . '/vendor/autoload.php';

class ModerneSmidMailTheme extends Module
{

    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'ModerneSmidMailTheme';
        $this->tab = 'emailing';
        $this->version = '1.0.0';
        $this->author = 'JB Stoker';
        $this->need_instance = 1;
        $this->themeName = 'modernesmid';
        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Email theme van de Moderne Smid');
        $this->description = $this->l('De module voor alle email templates van de Moderne Smid Theme');

        $this->ps_versions_compliancy = array('min' => '1.6', 'max' => _PS_VERSION_);

        $this->MailThemeClass = new MailTheme();
    }

    /**
     * Don't forget to create update methods if needed:
     * http://doc.prestashop.com/display/PS16/Enabling+the+Auto-Update
     */
    public function install()
    {
        Configuration::updateValue('MODERNESMIDMAILTHEME_LIVE_MODE', false);

        return parent::install() &&
            $this->registerHook('displayHeader') &&
            $this->registerHook('backOfficeHeader') &&
            $this->registerHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK);
    }

    public function uninstall()
    {
        Configuration::deleteByName('MODERNESMIDMAILTHEME_LIVE_MODE');

        return parent::uninstall() && $this->unregisterHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK) && $this->unregisterHook(LayoutVariablesBuilderInterface::BUILD_MAIL_LAYOUT_VARIABLES_HOOK);
    }


    public function enable($force_all = false) {
        $result = $this->MailThemeClass->makeThemeSymlink();

        return $result && parent::enable()
            && $this->registerHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK) && $this->registerHook(LayoutVariablesBuilderInterface::BUILD_MAIL_LAYOUT_VARIABLES_HOOK)
            ;
    }

    public function disable($force_all = false) {
        $result = $this->MailThemeClass->removeThemeSymlink();
        return $result && parent::disable()
            && $this->unregisterHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK) && $this->unregisterHook(LayoutVariablesBuilderInterface::BUILD_MAIL_LAYOUT_VARIABLES_HOOK)
            ;
    }

    /**
     * @param array $hookParams
     */
    public function hookActionListMailThemes(array $hookParams)
    {
        if (!isset($hookParams['mailThemes'])) {
            return;
        }

        /** @var ThemeCollectionInterface $themes */
        $themes = $hookParams['mailThemes'];
        $scanner = new FolderThemeScanner();
        $moderneSmidTheme = $scanner->scan(__DIR__.'/mails/themes/modernesmid');

        if (null !== $moderneSmidTheme &&  $moderneSmidTheme->getName() !== 'modernesmid' && $moderneSmidTheme->getLayouts()->count() > 0) {
            $themes->add($moderneSmidTheme);
        }
    }

    /**
     * @param array $hookParams
     */
    public function hookActionBuildMailLayoutVariables(array $hookParams)
    {
        if (!isset($hookParams['mailLayout'])) {
            return;
        }

        /** @var LayoutInterface $mailLayout */
        $mailLayout = $hookParams['mailLayout'];
        if ($this->name !== 'ModerneSmidMailTheme') {
            return;
        }

        $route = '';
        if(array_key_exists('request', $hookParams) && isset($hookParams['request']->attributes->all()['_route']) && $hookParams['request']->attributes->all()['_route'] == 'admin_mail_theme_generate'){
            $route = $hookParams['request']->attributes->all()['_route'];
        }

        $hookParams['mailLayoutVariables']['footer_blocks'] = DmsMailThemeController::filterFooterBlocks($mailLayout, $route);

        $hookParams['mailLayoutVariables']['shop_name'] = Tools::safeOutput(Configuration::get('PS_SHOP_NAME'));
        $hookParams['mailLayoutVariables']['shop_url'] = Context::getContext()->link->getPageLink(
            'index',
            true,
            Context::getContext()->language->id,
            null,
            false,
            Context::getContext()->shop->id
        );
        $hookParams['mailLayoutVariables']['my_account_url'] = Context::getContext()->link->getPageLink(
            'my-account',
            true,
            Context::getContext()->language->id,
            null,
            false,
            Context::getContext()->shop->id
        );
        $hookParams['mailLayoutVariables']['guest_tracking_url'] = Context::getContext()->link->getPageLink(
            'guest-tracking',
            true,
            Context::getContext()->language->id,
            null,
            false,
            Context::getContext()->shop->id
        );
        $hookParams['mailLayoutVariables']['history_url'] = Context::getContext()->link->getPageLink(
            'history',
            true,
            Context::getContext()->language->id,
            null,
            false,
            Context::getContext()->shop->id
        );
        $hookParams['mailLayoutVariables']['order_slip_url'] = Context::getContext()->link->getPageLink(
            'order-slip',
            true,
            Context::getContext()->language->id,
            null,
            false,
            Context::getContext()->shop->id
        );
        $hookParams['mailLayoutVariables']['color'] = Tools::safeOutput(Configuration::get('PS_MAIL_COLOR', null, null, Context::getContext()->shop->id));

    }
    /**
     * Load the configuration form
     */
    public function getContent()
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitModerneSmidMailThemeModule')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output.$this->renderForm();
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitModerneSmidMailThemeModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                'title' => $this->l('Settings'),
                'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->l('Live mode'),
                        'name' => 'MODERNESMIDMAILTHEME_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->l('Use this module in live mode'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->l('Disabled')
                            )
                        ),
                    )
                ),
                'input' => array(
                    array(
                        'type' => 'hidden',
                        'name' => 'MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS',
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        $defaultBlocksData = json_encode([
            'account' => ['trace' => false, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
            'account_kb' => ['trace' => false, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
            'backoffice_order' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'bankwire' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'cheque' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'contact' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
            'contact_form' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'contact_information' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'contact_offer' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'credit_slip' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'download_product' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'employee_password' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
            'forward_msg' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'guest_to_customer' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'import' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
            'in_transit' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'log_alert' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
            'newsletter' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
            'order_canceled' => ['trace' => true, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
            'order_changed' => ['trace' => true, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
            'order_conf' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'order_customer_comment' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
            'order_merchant_comment' => ['trace' => false, 'add2order' => false, 'faq' => true, 'review' => false, 'contact' => true],
            'order_return_state' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'outofstock' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'password' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'password_query' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'payment' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'payment_error' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'pickup2' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'preparation' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'productoutofstock' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'refund' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'reply_msg' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'shipped' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'test' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'voucher' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'voucher_new' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            /**
             * Offer Integration Module
             */
            'offernotification' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            /**
             * gauthenticator Module
             */
            'recovery' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            /**
             * Follow Up Module
             */
            'followup_1' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'followup_2' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'followup_3' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'followup_4' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            /**
             * Email alerts module
             */
            'customer_qty' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'order_changed' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'new_order' => ['trace' => false, 'add2order' => false, 'faq' => false, 'review' => false, 'contact' => false],
            'return_slip' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'productoutofstock' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'productcoverage' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            /**
             * Email subscription Module
             */
            'newsletter_conf' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'newsletter_verif' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'newsletter_voucher' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'referralprogram-congratulations' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'referralprogram-invitation' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true],
            'referralprogram-voucher' => ['trace' => true, 'add2order' => true, 'faq' => true, 'review' => true, 'contact' => true]
        ]);

        return array(
            'MODERNESMIDMAILTHEME_LIVE_MODE' => Configuration::get('MODERNESMIDMAILTHEME_LIVE_MODE', Context::getContext()->language->id, null, Context::getContext()->shop->id, true),
            'MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS' => Configuration::get('MODERNESMIDMAILTHEME_EMAIL_TEMPLATE_BLOCKS', Context::getContext()->language->id, null, Context::getContext()->shop->id, $defaultBlocksData),
        );
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    /**
    * Add the CSS & JavaScript files you want to be loaded in the BO.
    */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('configure') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookDisplayHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }
}
