<?php
/**
 * @author    N1ED http://n1ed.com
 * @copyright N1ED/EdSDK
 * @license   Proprietary license
 * @file      N1 TinyMCE - TinyMCE+N1ED module for PrestaShop
 */

if (!defined('_PS_VERSION_')) {
    exit();
}

class N1ed extends Module {

    /**
     * N1ED::__construct()
     *
     * @return
     */
    public function __construct() {
        $this->module_key = 'd1ee92c6de9a406001b8055c8d340a39';
        $this->name = 'n1ed';
        $this->tab = 'administration';
        $this->version = '1.0.2';
        $this->author = 'N1ED/EdSDK';
        $this->need_instance = 1;
        $this->bootstrap = TRUE;

        parent::__construct();

        $this->displayName = $this->l('N1 TinyMCE');
        $this->description = $this->l('N1 TinyMCE - create engaging content with TinyMCE + N1ED');

        $this->confirmUninstall = $this->l(
            'You will lose all advanced editor features. Are you sure you want to uninstall the module? '
        );

        $this->ps_versions_compliancy = ['min' => '1.6', 'max' => _PS_VERSION_];
    }

    /**
     * N1ED::install()
     *
     * @return
     */
    public function install() {

        $sql = 'UPDATE ' . _DB_PREFIX_ . 'configuration SET value = NULL WHERE (name =  "PS_USE_HTMLPURIFIER")';
        Db::getInstance()->execute($sql);

        $sql = 'UPDATE ' . _DB_PREFIX_ . 'configuration SET value = 1 WHERE (name = "PS_ALLOW_HTML_IFRAME")';
        Db::getInstance()->execute($sql);

        if (!Configuration::hasKey('N1ED_APIKEY') || Configuration::get('N1ED_APIKEY') === "oLYgeawoG7PR53HJ58cjWLzX") {
            Configuration::updateGlobalValue('N1ED_APIKEY', 'oLYgeawoG7PR53HJ58cjWLzX');
            Configuration::updateGlobalValue('N1ED_TOKEN', '');
        }

        if (!parent::install() ||
            !$this->fixLegacyTemplate() ||
            !$this->registerHook('actionObjectCMSCategoryAddAfter') ||
            !$this->registerHook('actionObjectCMSCategoryUpdateAfter') ||
            !$this->registerHook('displayBackOfficeHeader') ||
            !$this->registerHook('displayHeader') ||
            !$this->registerHook('actionAdminControllerSetMedia')
        ) {
            return FALSE;
        }
        return TRUE;
    }

    /**
     * N1ED::uninstall()
     *
     * @return
     */
    public function uninstall() {
        $sql = 'UPDATE ' . _DB_PREFIX_ . 'configuration SET value = NULL WHERE (name = "PS_USE_HTMLPURIFIER")';
        Db::getInstance()->execute($sql);

        $sql = 'UPDATE ' . _DB_PREFIX_ . 'configuration SET value = 0 WHERE (name = "PS_ALLOW_HTML_IFRAME")';
        Db::getInstance()->execute($sql);

        if (
            !parent::uninstall() ||
            !$this->restoreLegacyTemplate()
        ) {
            return FALSE;
        }

        return TRUE;
    }

    /**
     * N1ED::getContent()
     *
     * @return
     */
    public function getContent() {
        $this->context->smarty->assign(
            'APIKEY',
            Configuration::get('N1ED_APIKEY') ?: Configuration::getGlobalValue('N1ED_APIKEY') ?: 'oLYgeawo'
        );
        $this->context->smarty->assign(
            'TOKEN',
            Configuration::get('N1ED_TOKEN') ?: Configuration::getGlobalValue('N1ED_TOKEN') ?: ''
        );
        $header = $this->context->smarty->fetch(
            $this->local_path . 'views/templates/admin/configure.tpl'
        );

        return $header . $this->renderForm();
    }

    /**
     * N1ED::renderForm()
     *
     * @return
     */
    protected function renderForm() {
        $helper = new HelperForm();

        $helper->show_toolbar = FALSE;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get(
            'PS_BO_ALLOW_EMPLOYEE_FORM_LANG',
            0
        );

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submit_' . $this->name;
        $helper->currentIndex =
            $this->context->link->getAdminLink('AdminModules', FALSE) . '&' .
            'configure=' . $this->name . '&' .
            'tab_module=' . $this->tab . '&' .
            'module_name=' . $this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = [
            'id_language' => $this->context->language->id,
        ];
        $helper->multiple_fieldsets = TRUE;
        return $helper->generateForm([]);
    }


    /**
     * N1ED::hookDisplayBackOfficeHeader()
     *
     * @return
     */
    public function hookDisplayBackOfficeHeader() {
        if (!($this->context->controller instanceof AdminController)) {
            return;
        }
        if (Tools::getValue('controller') == 'VC_frontend') {
            Hook::exec('actionAdminControllerSetMedia');
        }
    }

    public function hookDisplayHeader() {
        if ($this->context->controller instanceof FrontController) {
            $this->context->controller->unregisterJavascript('n1ed-tinymce');
            // tinymce.js is usually added via addJS which might use the path as ID or a specific ID
            // In n1ed.php it's added as $this->_path . 'views/js/tinymce.js'
        }
        return;
    }

    /**
     * N1ED::hookActionObjectCMSCategoryAddAfter()
     *
     * @return
     */
    public function hookActionObjectCMSCategoryAddAfter($params) {
        $descriptions = $params['object']->description;
        foreach ($descriptions as $lang => $description) {
            Db::getInstance()->update(
                'cms_category_lang',
                ['description' => $description],
                'id_cms_category=' .
                (int) $params['object']->id_cms_category .
                ' AND id_lang=' .
                (int) $lang
            );
        }
    }

    /**
     * N1ED::hookActionObjectCMSCategoryUpdateAfter()
     *
     * @return
     */
    public function hookActionObjectCMSCategoryUpdateAfter($params) {
        $descriptions = $params['object']->description;
        foreach ($descriptions as $lang => $description) {
            Db::getInstance()->update(
                'cms_category_lang',
                ['description' => $description],
                'id_cms_category=' .
                (int) $params['object']->id_cms_category .
                ' AND id_lang=' .
                (int) $lang
            );
        }
    }

    /**
     * N1ED::hookActionAdminControllerSetMedia()
     *
     * @return
     */
    public function hookActionAdminControllerSetMedia() {
        if (!($this->context->controller instanceof AdminController)) {
            return;
        }
        Media::addJsDef([
            'controller' => Tools::getValue('controller'),
            'N1ED_MODULE_URL' => $this->_path,
            'N1ED_FILES_URL' => __PS_BASE_URI__ . 'img/cms/',
            'N1ED_APIKEY' => Configuration::get('N1ED_APIKEY') ?: Configuration::getGlobalValue('N1ED_APIKEY'),
            'N1ED_TOKEN' => Configuration::get('N1ED_TOKEN') ?: Configuration::getGlobalValue('N1ED_TOKEN'),
            'OVERRIDE_API_KEY' => Configuration::get('N1ED_APIKEY') ?: Configuration::getGlobalValue('N1ED_APIKEY'),
            'prestashop_16' => version_compare(_PS_VERSION_, '1.7.0.0', '<'),
        ]);

        $this->context->controller->addJS(
            $this->_path . 'views/js/tinymce.js'
        );
    }

    const FILE_TEMPLATE = _PS_THEME_DIR_ . 'cms.tpl';
    const FIX_FROM = '$cms_category->description|escape:\'html\'';
    const FIX_TO = '$cms_category->description|escape:\'all\'';
    const FIX_MARKER = '// fixed for compatibility';

    protected function fixLegacyTemplate() {
        if (
            (version_compare(_PS_VERSION_, '1.7.0.0', '<')) &&
            file_exists(self::FILE_TEMPLATE) &&
            strpos(Tools::file_get_contents(self::FILE_TEMPLATE), self::FIX_FROM)
        ) {

            $strTemplate = Tools::file_get_contents(self::FILE_TEMPLATE);

            $lines = explode("\n", $strTemplate);
            for ($i=0; $i<count($lines); $i++)
                if (strpos($lines[$i], self::FIX_FROM) !== FALSE) {
                    $lines[$i] = str_replace(self::FIX_FROM, self::FIX_TO, $lines[$i]) . self::FIX_MARKER;
                }
            $strTemplate = implode("\n", $lines);

            if (!file_put_contents(self::FILE_TEMPLATE, $strTemplate)) {
                $this->_errors[] = self::FILE_TEMPLATE .  ' ' . $this->l(
                        'is not writable, unable to make compatibility changes'
                    );
                return FALSE;
            }

        }
        return TRUE;
    }

    protected function restoreLegacyTemplate() {
        if (
            (version_compare(_PS_VERSION_, '1.7.0.0', '<')) &&
            file_exists(self::FILE_TEMPLATE) &&
            strpos(Tools::file_get_contents(self::FILE_TEMPLATE), self::FIX_MARKER)
        ) {

            $strTemplate = Tools::file_get_contents(self::FILE_TEMPLATE);

            $lines = explode("\n", $strTemplate);
            for ($i=0; $i<count($lines); $i++)
                if (strpos($lines[$i], self::FIX_MARKER) !== FALSE) {
                    $lines[$i] = str_replace(self::FIX_TO, self::FIX_FROM, $lines[$i]);
                    $lines[$i] = str_replace(self::FIX_MARKER, '', $lines[$i]);
                }
            $strTemplate = implode("\n", $lines);

            if (!file_put_contents(self::FILE_TEMPLATE, $strTemplate)) {
                $this->_errors[] = self::FILE_TEMPLATE .  ' ' . $this->l(
                        'is not writable, unable to make compatibility changes'
                    );
                return FALSE;
            }

        }
        return TRUE;
    }

}
