<?php
/**
 * Google Authenticator Security Module for Prestashop
 *
 * @author    Rinku Kazeno <development@kazeno.co>
 *
 * @copyright Copyright since 2012 Rinku Kazeno
 * @license   This module is licensed to the user, upon purchase
 *   from either Prestashop Addons or directly from the author,
 *   for use on a single commercial Prestashop install, plus an
 *   optional separate non-commercial install (for development/testing
 *   purposes only). This license is non-assignable and non-transferable.
 *   To use in additional Prestashop installations an additional
 *   license of the module must be purchased for each one.

 *   The user may modify the source of this module to suit their
 *   own business needs, as long as no distribution of either the
 *   original module or the user-modified version is made.
 *
 *  @file-version 1.26
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

if (!defined('_PS_ADMIN_DIR_')) {
    if (defined('PS_ADMIN_DIR')) {
        define('_PS_ADMIN_DIR_', PS_ADMIN_DIR);
    } else {
        exit;
    }
}


class AdminGauthController extends ModuleAdminController
{
    public $bootstrap = true;
    public $profilesArray = array();
    public $authTypes = array(
        'HOTP'=>'HOTP',
        'TOTP'=>'TOTP'
    );
    public $type, $enabled, $pending, $key;
    protected $restrict_edition = false;
    public $errors = array();
    public $warnings = array();

    public function __construct() 
    { 
        require_once  _PS_MODULE_DIR_.'gauthenticator/classes/GAuthenticatedEmployee.php';

        $this->context = Context::getContext();
        $this->table = 'employee';
        $this->className = 'GAuthenticatedEmployee';
        $this->lang = false;

        parent::__construct();

        $this->addRowAction('edit');
        $this->_select = 'pl.`name` AS profile, IFNULL(gatoken, \'\') AS type, IFNULL(gatoken, \'\') AS enabled';
        $this->_join = (
            'LEFT JOIN `'._DB_PREFIX_.'profile` p ON a.`id_profile` = p.`id_profile`
            LEFT JOIN `'._DB_PREFIX_.'profile_lang` pl ON (pl.`id_profile` = p.`id_profile` AND pl.`id_lang` = '.(int)$this->context->language->id.')'
        );
        if ($this->context->cookie->profile != 1) {     //show only own account if not admin
            $this->_where = 'AND `id_employee` = ' . (int)$this->context->employee->id;
        }
        $this->identifier = 'id_employee';
        $profiles = Profile::getProfiles((int)$this->context->language->id);
        foreach ($profiles AS $profile) {
            $this->profilesArray[$profile['name']] = $profile['name'];
        }

        $gauthe = new GAuthenticatedEmployee();
        $this->fields_list = array(
            'id_employee' => array(
                'title' => $this->l('ID'),
                'align' => 'center',
                'width' => 25
            ),
            'lastname' => array(
                'title' => $this->l('Last name'),
                'width' => 130
            ),
            'firstname' => array(
                'title' => $this->l('First name'),
                'width' => 130
            ),
            'email' => array(
                'title' => $this->l('E-mail address'),
                'width' => 180
            ),
            'profile' => array(
                'title' => $this->l('Profile'),
                'width' => 90,
                'type' => 'select',
                'list' => $this->profilesArray,
                'filter_key' => 'pl!name'
            ),
            'enabled' => array(
                'title' => $this->l('Enabled'),
                'width' => 60,
                'align' => 'center',
                'type' => 'bool',
                'filter_key' => 'gatoken',
                'orderby' => false,
                'search' => false,
                'callback' => 'getEnabledStatus',
                'callback_object' => $gauthe
            ),
            'type' => array(
                'title' => $this->l('Type'),
                'width' => 60,
                'type' => 'select',
                'list' => $this->authTypes,
                'filter_key' => 'gatoken',
                'orderby' => false,
                'search' => false,
                'callback' => 'getAuthType',
                'callback_object' => $gauthe
            ),
        );
    }


    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    public function postProcess()
    {
        parent::postProcess();

        if (
            !static::hasEditPermission(
                $this->id_object,
                $this->context->employee
            )
        ) {
            return false;
        }

        $this->object = $this->loadObject(true);
        if (!$this->id_object) {
            return false;
        }

        require_once(_PS_ROOT_DIR_.'/modules/gauthenticator/lib/gauth.php');
        $gauth = new GAuth();
        $gauth->importData($this->object->gatoken);
        if (Tools::getIsset('submitSync')) {
            if (!preg_match('/^\d{8}$/', Tools::getValue('rectoken', ''))) {
                $this->errors[] = $this->l('Error matching email recovery token');
                return false;
            }

            if (!preg_match('/^\d{6}$/', Tools::getValue('key1', '')) || !preg_match('/^\d{6}$/', Tools::getValue('key2', ''))) {
                $this->errors[] = $this->l('Key format error, each key should be comprised of 6 digits');
                $this->display = 'edit';

                return false;
            }

            if ($gauth->resync(Tools::getValue('key1'), Tools::getValue('key2')))  {
                $gauth->setUserData('status', true);
                $gauth->setUserData('recovery', Tools::getValue('rectoken'));
                $gauth->setUserData('sync', false);
                $this->object->gatoken = pSQL($gauth->exportData());
            } else {
                $this->errors[] = $gauth->_errors[0];
                $this->display = 'edit';

                return false;
            }

        } elseif (
            Tools::getValue('enabled', 0)
            && (
                Tools::getIsset('submitReset')
                || (
                    Tools::getIsset('submitSave')
                    && Tools::getValue('changed', 0)
                )
            )
        ) {
            if (!in_array(Tools::getValue('type', ''), array('HOTP', 'TOTP'))) {
                $this->errors[] = $this->l('Selected authentication type error');

                return false;
            }

            $gauth->createUser(Tools::getValue('type'));
            $gauth->setUserData('status', false);
            $gauth->setUserData('sync', true);
            $this->object->gatoken = pSQL($gauth->exportData());
        } elseif (Tools::getIsset('submitSave')) {
            if (
                !$gauth->getUserData('sync')
                && Tools::getValue('enabled', 0)
            ) {
                $gauth->setUserData('status', true);
            } else {
                $gauth->setUserData('status', false);
            }
            $this->object->gatoken = pSQL($gauth->exportData());
        } elseif (Tools::getIsset('submitReset')) {
            $this->object->gatoken = '';
        }

        if (
            Tools::getIsset('submitSave')
            || Tools::getIsset('submitReset')
            || Tools::getIsset('submitSync')
        ) {
            $result = $this->object->update();
            $this->afterUpdate($this->object);
            if (!$result) {
                $this->errors[] = Tools::displayError(Db::getInstance()->getMsgError());
                $this->display = 'edit';

                return false;
            }
        }

        return true;
    }


    public function processdisablePsAccountsLoginOverride()
    {
        Configuration::updateValue(GAuthenticator::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED', '1');
        Configuration::updateValue('PS_ACCOUNTS_LOGIN_ENABLED', '0');

        $this->redirect_after = self::$currentIndex . '&' . $this->identifier . '&token=' . $this->token;

    }


    public function processenablePsAccountsLoginOverride()
    {
        Configuration::updateValue(GAuthenticator::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED', '0');
        Configuration::updateValue('PS_ACCOUNTS_LOGIN_ENABLED', '1');

        $this->redirect_after = self::$currentIndex . '&' . $this->identifier . '&token=' . $this->token;
    }


    public function initToolbar() {         //Override to prevent displaying "add new" button on toolbar
        if ($this->display == 'edit') {
            $back = Tools::safeOutput(Tools::getValue('back', ''));
            if (empty($back))
                $back = self::$currentIndex.'&token='.$this->token;
            if (!Validate::isCleanHtml($back))
                die();
            if (!$this->lite_display) {
                $this->toolbar_btn['back'] = array(
                    'href' => $back,
                    'desc' => $this->l('Back to list')
                );
            }
        }
    }        


    public function initContent()
    {
        if (!$this->display && Tools::getValue('id_employee')) {
            $this->display = Tools::getIsset('updateemployee') ? 'edit' : 'list';
        }

        if ($this->context->employee->id == Tools::getValue('id_employee')) {
            $this->tabAccess['view'] = '1';
            if (!isset($this->tabAccess['edit']) || !$this->tabAccess['edit']) {
                $this->restrict_edition = true;
            }
            $this->tabAccess['edit'] = '1';
        }
        if (!Module::isEnabled('gauthenticator')) {
            $this->warnings[] = $this->l('The Google Authenticator module is currently disabled. Your Back Office will not be protected until you re-enable it in the Modules section.');
        }
        if (!file_exists(_PS_ROOT_DIR_.'/override/controllers/admin/templates/login/content.tpl')) {
            $this->errors[] = $this->l("The Google Authenticator module has been installed, but the login template was not copied successfully during install. Please follow the instructions in the module's manual for copying the template manually.");
        }

        if (Configuration::hasKey('PS_ACCOUNTS_LOGIN_ENABLED')) {
            if (Configuration::get('PS_ACCOUNTS_LOGIN_ENABLED')) {
                $this->warnings[] = sprintf(
                    $this->l('The Prestashop Accounts module is currently overriding your Back Office login page, allowing logins through your Prestashop.com account which can not be protected with 2-factor authentication. If you don\'t require that functionality you can disable it by clicking the following link: %s'),
                    sprintf(
                        '<br><a href="%s">%s</a>',
                        self::$currentIndex . '&action=disable_ps_accounts_login_override&token=' . $this->token,
                        $this->l('Disable unsecured PS Account logins')
                    )
                );
            } elseif (Configuration::get(GAuthenticator::CONFIG_PREFIX.'PS_ACCOUNTS_MODIFIED')) {
                $this->informations[] = sprintf(
                    $this->l('The Prestashop Accounts module login override has been disabled. If you need to allow Back Office logins through your Prestashop.com account which can not be protected with 2-factor authentication, you can enable it by clicking the following link: %s'),
                    sprintf(
                        '<br><a href="%s">%s</a>',
                        self::$currentIndex . '&action=enable_ps_accounts_login_override&token=' . $this->token,
                        $this->l('Enable unsecured PS Account logins')
                    )
                );
            }
        }

        parent::initContent();
    }


    /**
     * @throws Exception
     */
    public function renderForm()
    {
        $obj = $this->loadObject(true);
        if (!$obj) {
            return null;
        }

        require_once(_PS_MODULE_DIR_.'gauthenticator/lib/gauth.php');

        $this->enabled = false;     //if no gatoken, it's disabled
        $name = (
            $this->getFieldValue($obj, 'firstname')
            . ' '
            . $this->getFieldValue($obj, 'lastname')
        );
        $tkey = '';
        $qrcode = '';
        $url = '';
        if ($this->getFieldValue($obj, 'gatoken')) {
            $gauth = new GAuth();
            $gauth->importData(
                $this->getFieldValue($obj, 'gatoken')
            );
            $url = $gauth->createURL($name);
            $qrcode = $this->getQrCode($url);
            $tkey = $gauth->getKey();
            $this->type = $gauth->getType();
            $this->enabled = $gauth->getUserData('status');
            $this->pending = $gauth->getUserData('sync');
        }
        $this->fields_value['gaEmployee'] = $name;
        $this->fields_value['type'] = $this->type;
        $this->fields_value['enabled'] = $this->enabled;
        if ($this->pending) {       //edit confirm and key sync screen
            $type_array = array(
                'TOTP' => 'Time based',
                'HOTP' => 'Counter based'
            );
            $recovery = Tools::passwdGen(8, 'NUMERIC');
            $this->fields_value['tkey'] = $tkey;
            $this->fields_value['ttype'] = $type_array[$this->type];
            $this->fields_form = array(
                'legend' => array(
                    'title' => $this->l('Google Authenticator'),
                    'image' => '../img/t/AdminGauth.gif'
                ),
                'description' => $this->l('Please scan the QR Code or manually add an account in your Google Authenticator application, and input 2 consecutively generated codes below to sync your device and confirm your settings.'),
                'input' => array(
                    array(
                        'type' => 'hidden',
                        'name' => 'rectoken',
                    ),
                    array(
                        'type' => 'free',
                        'name' => 'gaEmployee',
                        'label' => $this->l('Employee').':',
                    ),
                    array(
                        'type' => 'free',
                        'name' => 'qrCode',
                        'label' => $this->l('QR Code').':',
                        'desc' => $this->l('Hover your mouse over the QR Code to display the URL')
                    ),
                    array(
                        'type' => 'free',
                        'name' => 'tkey',
                        'label' => $this->l('Key (for manual input)').':',
                    ),
                    array(
                        'type' => 'free',
                        'name' => 'ttype',
                        'label' => $this->l('Type (for manual input)').':',
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Enter first Verification Code').':',
                        'name' => 'key1',
                        'id' => 'ga_key1',
                        'size' => 7,
                        'maxlength' => 6,
                        'required' => true
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Enter second Verification Code').':',
                        'name' => 'key2',
                        'id' => 'ga_key2',
                        'size' => 7,
                        'maxlength' => 6,
                        'required' => true
                    ),
                    array(
                        'type' => 'free',
                        'name' => 'rectext',
                    ),
                    array(
                        'type' => 'free',
                        'name' => 'submitAndJs',
                    ),
                    array(
                        'type' => 'hidden',
                        'name' => 'enabled',
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Confirm'),
                    'name' => 'submitSync',
                ),
                'buttons' => array(
                    array(
                        'title' => $this->l('Reset Key'),
                        'icon' => 'process-icon-update',
                        'name' => 'submitReset',
                        'type' => 'submit'
                    )
                )
            );
            $this->fields_value['qrCode'] = (
                '<img src="data:image/gif;base64,'
                . GAuth::base64($qrcode, 'encode')
                . '" alt="' . $url
                . '" title="' . $url
                . '" />'
            );
            $this->fields_value['enabled'] = '0';   // this is to disable in case of reset
            $this->fields_value['rectoken'] = $recovery;
            $this->fields_value['rectext'] = (
                '<div class="alert alert-info">'
                . $this->l('Please write down and store the following Recovery Code somewhere safe. In case you lose access to your device you can use this Code to get a single-use recovery token sent to your email.')
                . '<br/><div class="text-center" style="font-size: 14px">'
                . $this->l('Recovery Code:')
                . ' <strong>'
                . $recovery
                . '</strong></div></div>'
            );
            $this->context->smarty->assign(array(
                'requiredTxt' => $this->l(
                    'Two consecutive Verification Codes are required in order to sync your device.'
                ),
                'differentTxt' => $this->l(
                    'The two Verification Codes must be different and generated consecutively.'
                ),
                'showReset' => (_PS_VERSION_ < '1.6')   // required for all PS versions
            ));
            $this->fields_value['submitAndJs'] = $this->module->display(
                _PS_MODULE_DIR_.$this->module->name.DIRECTORY_SEPARATOR.$this->module->name.'.php',
                'views/templates/admin/displayVerifyForm.tpl'
            );
        } else {            //main settings screen
            $this->fields_form = array(
                'legend' => array(
                    'title' => $this->l('Google Authenticator'),
                    'image' => '../img/t/AdminGauth.gif'
                ),
                'input' => array(
                    array(
                        'type' => 'free',
                        'name' => 'gaEmployee',
                        'label' => $this->l('Employee').':',
                    ),
                    array(
                        'type' => 'radio',
                        'label' => $this->l('Status').':',
                        'name' => 'enabled',
                        'required' => true,
                        'class' => 't',
                        'is_bool' => true,
                        'values' => array(
                            array(
                                'id' => 'ga_enabled',
                                'value' => 1,
                                'label' => $this->l('Enabled')
                            ),
                            array(
                                'id' => 'ga_disabled',
                                'value' => 0,
                                'label' => $this->l('Disabled')
                            )
                        )
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->l('Authentication Type').':',
                        'name' => 'type',
                        'id' => 'ga_type',
                        'options' => array(
                            'query' => array(
                                array(
                                    'id' => 'TOTP',
                                    'name' => $this->l('TOTP (time based) (default)')
                                ),
                                array(
                                    'id' => 'HOTP',
                                    'name' => $this->l('HOTP (counter based)')
                                )
                            ),
                            'id' => 'id',
                            'name' => 'name'
                        ),
                    ),
                    array(
                        'type' => 'free',
                        'name' => 'submitAndJs'
                    ),
                    array(
                        'type' => 'hidden',
                        'name' => 'changed'
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                    'name' => 'submitSave',
                ),
            );
            if ($this->type) {
                $this->fields_form['buttons'] = array(
                    array(
                        'title' => $this->l('Reset Key'),
                        'icon' => 'process-icon-update',
                        'name' => 'submitReset',
                        'type' => 'submit'
                    )
                );
            }
            $this->context->smarty->assign(array(
                'type' => $this->type,
                'retypeConf' => $this->l('You have changed the Authentication Type. This will make the current key stop working, and generate a new one. Continue?'),
                'resetConf' => $this->l('This will make the current key stop working, and generate a new one. Continue?'),
                'disableConf' => $this->l('This will disable and delete the current key. Continue?'),
                'showReset' => (_PS_VERSION_ < '1.6')   // required for all PS versions
            ));
            $this->fields_value['changed'] = !$this->type ? '1' : '0';
            $this->fields_value['submitAndJs'] = $this->module->display(
                _PS_MODULE_DIR_.$this->module->name.DIRECTORY_SEPARATOR.$this->module->name.'.php',
                'views/templates/admin/displayMainForm.tpl'
            );
        }

        return (
            implode("\n", $this->errors)
            . parent::renderForm()
        );
    }


    /**
     * Prevent unwanted updates to underlying employee object
     */
    public function processSave()
    {
        return false;
    }


    /**
     * Surcharge de la fonction de traduction sur PS 1.7 et supérieur.
     * La fonction globale ne fonctionne pas
     * @param $string
     * @param $class
     * @param $addslashes
     * @param $htmlentities
     * @return string
     */
    protected function l($string, $class = null, $addslashes = false, $htmlentities = true)
    {
        if (_PS_VERSION_ >= '1.7') {
            return Context::getContext()->getTranslator()->trans($string);
        } else {
            return parent::l($string, $class, $addslashes, $htmlentities);
        }
    }


    /**
     * @param $url
     * @return false|string
     */
    protected function getQrCode($url)
    {
        if (file_exists(_PS_ROOT_DIR_.'/vendor/tecnickcom/tcpdf/include/barcodes/qrcode.php')) {
            require_once(_PS_ROOT_DIR_.'/vendor/tecnickcom/tcpdf/include/barcodes/qrcode.php');
        } else {
            require_once(_PS_ROOT_DIR_.'/tools/tcpdf/qrcode.php');
        }

        $qrcode = new QRcode($url, 'H');
        $this->barcode_array = $qrcode->getBarcodeArray();
        $this->barcode_array['code'] = $url;

        return $this->getBarcodePngData();
    }


    /**
     * Return a PNG image representation of barcode (requires GD or Imagick library).
     * @param int $w Width of a single rectangle element in pixels.
     * @param int $h Height of a single rectangle element in pixels.
     * @param array $color RGB (0-255) foreground color for bar elements (background is transparent).
     * @return string|Imagick|false image or false in case of error.
     */
    protected function getBarcodePngData($w=3, $h=3, $color=array(0,0,0)) {
        // calculate image size
        $width = ($this->barcode_array['num_cols'] * $w);
        $height = ($this->barcode_array['num_rows'] * $h);
        if (function_exists('imagecreate')) {
            // GD library
            $imagick = false;
            $png = imagecreate($width, $height);
            $bgcol = imagecolorallocate($png, 255, 255, 255);
            imagecolortransparent($png, $bgcol);
            $fgcol = imagecolorallocate($png, $color[0], $color[1], $color[2]);
        } elseif (extension_loaded('imagick')) {
            $imagick = true;
            $bgcol = new imagickpixel('rgb(255,255,255');
            $fgcol = new imagickpixel('rgb('.$color[0].','.$color[1].','.$color[2].')');
            $png = new Imagick();
            $png->newImage($width, $height, 'none', 'png');
            $bar = new imagickdraw();
            $bar->setfillcolor($fgcol);
        } else {
            return false;
        }
        // print barcode elements
        $y = 0;
        // for each row
        for ($r = 0; $r < $this->barcode_array['num_rows']; ++$r) {
            $x = 0;
            // for each column
            for ($c = 0; $c < $this->barcode_array['num_cols']; ++$c) {
                if ($this->barcode_array['bcode'][$r][$c] == 1) {
                    // draw a single barcode cell
                    if ($imagick) {
                        $bar->rectangle($x, $y, ($x + $w - 1), ($y + $h - 1));
                    } else {
                        imagefilledrectangle($png, $x, $y, ($x + $w - 1), ($y + $h - 1), $fgcol);
                    }
                }
                $x += $w;
            }
            $y += $h;
        }
        if ($imagick) {
            $png->drawimage($bar);
            return $png;
        } else {
            ob_start();
            imagepng($png);
            $imagedata = ob_get_clean();
            imagedestroy($png);
            return $imagedata;
        }
    }


    /**
     * Check if $employee has permissions to edit configuration of employee with id $idObject
     * @param $idObject
     * @param $employee
     * @return bool
     */
    protected static function hasEditPermission($idObject, $employee)
    {
        if (
            !$idObject
            || !$employee
            || !$employee->id
            || !$employee->id_profile
        ) {
            return false;
        }

        $tabId = Tab::getIdFromClassName('AdminEmployees');
        $profile = Profile::getProfileAccess($employee->id_profile, $tabId);

        return (
            (int)$idObject === (int)$employee->id
            || (
                isset($profile['edit'])
                && $profile['edit']
            )
        );
    }
}