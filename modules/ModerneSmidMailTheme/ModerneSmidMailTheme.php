<<<<<<< HEAD
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

use PrestaShop\PrestaShop\Core\MailTemplate\Layout\Layout;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCatalogInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCollectionInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\FolderThemeScanner;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutVariablesBuilderInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutInterface;

require_once('src/MailTheme.php');



if (!defined('_PS_VERSION_')) {
    exit;
}

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
            $this->registerHook('header') &&
            $this->registerHook('backOfficeHeader') &&
            $this->registerHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK);
    }

    public function uninstall()
    {
        Configuration::deleteByName('MODERNESMIDMAILTHEME_LIVE_MODE');

        return parent::uninstall() && $this->unregisterHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK) && $this->registerHook(LayoutVariablesBuilderInterface::BUILD_MAIL_LAYOUT_VARIABLES_HOOK);
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

//        $scanner = new FolderThemeScanner();
//        $modernesmidTheme = $scanner->scan(__DIR__.'/mails/themes/modernesmid');
//        if (null !== $modernesmidTheme && $modernesmidTheme->getLayouts()->count() > 0) {
//            $themes->add($modernesmidTheme);
//        }
    }

    /**
     * @param array $hookParams
     */
    public function hookActionBuildMailLayoutVariables(array $hookParams)
    {
        if (!isset($hookParams['mailLayout'])) {
            return;
        }

        $hookParams['mailLayoutVariables']['order_name'] = 'YS-123456';
        $hookParams['mailLayoutVariables']['custom_footer_html'] = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMAIL_FOOTER_TEXT');
        $hookParams['mailLayoutVariables']['faq_page'] = Context::getContext()->link->getCMSLink(Configuration::get('MODERNESMIDTHEMECONFIGURATOR_CONTACTPAGE_FAQ'),null,true, '','');
        $hookParams['mailLayoutVariables']['add_to_order'] = '<span class="text-small"><strong><span class="font-arial"><span class="text-grey font-arial">Iets vergeten?</span></span></strong></span><br/><span class="text-small"><span class="font-arial"><span class="text-grey font-arial">Tot u bericht krijgt dat uw bestelling is verstuurd kunt u iets toevoegen aan uw bestelling zonder dat er extra verzendkosten in rekening worden gebracht. Maak hiervoor een nieuwe bestelling en kies bij verzending voor: "Toevoegen".</span></span></span>';

//        var_export($hookParams);
//die();
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
        return array(
            'MODERNESMIDMAILTHEME_LIVE_MODE' => Configuration::get('MODERNESMIDMAILTHEME_LIVE_MODE', true),
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
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }
}
=======
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

use PrestaShop\PrestaShop\Core\MailTemplate\Layout\Layout;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCatalogInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeCollectionInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\ThemeInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\FolderThemeScanner;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutVariablesBuilderInterface;
use PrestaShop\PrestaShop\Core\MailTemplate\Layout\LayoutInterface;

require_once('src/MailTheme.php');



if (!defined('_PS_VERSION_')) {
    exit;
}

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
            $this->registerHook('header') &&
            $this->registerHook('backOfficeHeader') &&
            $this->registerHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK);
    }

    public function uninstall()
    {
        Configuration::deleteByName('MODERNESMIDMAILTHEME_LIVE_MODE');

        return parent::uninstall() && $this->unregisterHook(ThemeCatalogInterface::LIST_MAIL_THEMES_HOOK) && $this->registerHook(LayoutVariablesBuilderInterface::BUILD_MAIL_LAYOUT_VARIABLES_HOOK);
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

//        $scanner = new FolderThemeScanner();
//        $modernesmidTheme = $scanner->scan(__DIR__.'/mails/themes/modernesmid');
//        if (null !== $modernesmidTheme && $modernesmidTheme->getLayouts()->count() > 0) {
//            $themes->add($modernesmidTheme);
//        }
    }

    /**
     * @param array $hookParams
     */
    public function hookActionBuildMailLayoutVariables(array $hookParams)
    {
        if (!isset($hookParams['mailLayout'])) {
            return;
        }

        $hookParams['mailLayoutVariables']['order_name'] = 'YS-123456';
        $hookParams['mailLayoutVariables']['custom_footer_html'] = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMAIL_FOOTER_TEXT');
        $hookParams['mailLayoutVariables']['faq_page'] = Context::getContext()->link->getCMSLink(Configuration::get('MODERNESMIDTHEMECONFIGURATOR_CONTACTPAGE_FAQ'),null,true, '','');
        $hookParams['mailLayoutVariables']['add_to_order'] = '<span class="text-small"><strong><span class="font-arial"><span class="text-grey font-arial">Iets vergeten?</span></span></strong></span><br/><span class="text-small"><span class="font-arial"><span class="text-grey font-arial">Tot u bericht krijgt dat uw bestelling is verstuurd kunt u iets toevoegen aan uw bestelling zonder dat er extra verzendkosten in rekening worden gebracht. Maak hiervoor een nieuwe bestelling en kies bij verzending voor: "Toevoegen".</span></span></span>';

//        var_export($hookParams);
//die();
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
        return array(
            'MODERNESMIDMAILTHEME_LIVE_MODE' => Configuration::get('MODERNESMIDMAILTHEME_LIVE_MODE', true),
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
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookHeader()
    {
        $this->context->controller->addJS($this->_path.'/views/js/front.js');
        $this->context->controller->addCSS($this->_path.'/views/css/front.css');
    }
}
>>>>>>> 3cadc099cd0fb203958e2fa0fd41b5d3f6e8fda4
