<?php
/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2015 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

/**
 * @property Employee $object
 */
class AdminEmployeesControllerCore extends AdminController
{
    /** @var array profiles list */
    protected $profiles_array = array();

    /** @var array themes list*/
    protected $themes = array();

    /** @var array tabs list*/
    protected $tabs_list = array();

    protected $restrict_edition = false;

    public function __construct()
    {
        $this->bootstrap = true;
        $this->table = 'employee';
        $this->className = 'Employee';
        $this->lang = false;

        parent::__construct();

        $this->addRowAction('edit');
        $this->addRowAction('delete');
        $this->addRowActionSkipList('delete', array((int)$this->context->employee->id));

        $this->bulk_actions = array(
            'delete' => array(
                'text' => $this->l('Delete selected'),
                'confirm' => $this->l('Delete selected items?'),
                'icon' => 'icon-trash'
            )
        );
        /*
        check if there are more than one superAdmin
        if it's the case then we can delete a superAdmin
        */
        $super_admin = Employee::countProfile(_PS_ADMIN_PROFILE_, true);
        if ($super_admin == 1) {
            $super_admin_array = Employee::getEmployeesByProfile(_PS_ADMIN_PROFILE_, true);
            $super_admin_id = array();
            foreach ($super_admin_array as $key => $val) {
                $super_admin_id[] = $val['id_employee'];
            }
            $this->addRowActionSkipList('delete', $super_admin_id);
        }

        $profiles = Profile::getProfiles($this->context->language->id);
        if (!$profiles) {
            $this->errors[] = Tools::displayError('No profile.');
        } else {
            foreach ($profiles as $profile) {
                $this->profiles_array[$profile['name']] = $profile['name'];
            }
        }

        $this->fields_list = array(
            'id_employee' => array('title' => $this->trans('ID', array(), 'Admin.Global'), 'align' => 'center', 'class' => 'fixed-width-xs'),
            'firstname' => array('title' => $this->l('First Name')),
            'lastname' => array('title' => $this->l('Last Name')),
            'email' => array('title' => $this->l('Email address')),
            'profile' => array('title' => $this->l('Profile'), 'type' => 'select', 'list' => $this->profiles_array,
                'filter_key' => 'pl!name', 'class' => 'fixed-width-lg'),
            'active' => array('title' => $this->l('Active'), 'align' => 'center', 'active' => 'status',
                'type' => 'bool', 'class' => 'fixed-width-sm'),
        );

        $this->fields_options = array(
            'general' => array(
                'title' =>    $this->l('Employee options'),
                'fields' =>    array(
                    'PS_PASSWD_TIME_BACK' => array(
                        'title' => $this->l('Password regeneration'),
                        'hint' => $this->l('Security: Minimum time to wait between two password changes.'),
                        'cast' => 'intval',
                        'type' => 'text',
                        'suffix' => ' '.$this->l('minutes'),
                        'visibility' => Shop::CONTEXT_ALL
                    ),
                    'PS_BO_ALLOW_EMPLOYEE_FORM_LANG' => array(
                        'title' => $this->l('Memorize the language used in Admin panel forms'),
                        'hint' => $this->l('Allow employees to select a specific language for the Admin panel form.'),
                        'cast' => 'intval',
                        'type' => 'select',
                        'identifier' => 'value',
                        'list' => array(
                            '0' => array('value' => 0, 'name' => $this->trans('No', array(), 'Admin.Global')),
                            '1' => array('value' => 1, 'name' => $this->trans('Yes', array(), 'Admin.Global')
                        )
                    ), 'visibility' => Shop::CONTEXT_ALL)
                ),
                'submit' => array('title' => $this->trans('Save', array(), 'Admin.Actions'))
            )
        );
        $rtl = $this->context->language->is_rtl ? '_rtl' : '';
        $path = _PS_ADMIN_DIR_.DIRECTORY_SEPARATOR.'themes'.DIRECTORY_SEPARATOR;
        foreach (scandir($path) as $theme) {
            if ($theme[0] != '.' && is_dir($path.$theme) && (@filemtime($path.$theme.DIRECTORY_SEPARATOR.'css'.DIRECTORY_SEPARATOR.'admin-theme.css'))) {
                $this->themes[] = array('id' => $theme.'|admin-theme'.$rtl.'.css', 'name' => $theme == 'default' ? $this->l('Default') : ucfirst($theme));
                if (file_exists($path.$theme.DIRECTORY_SEPARATOR.'css'.DIRECTORY_SEPARATOR.'schemes'.$rtl)) {
                    foreach (scandir($path.$theme.DIRECTORY_SEPARATOR.'css'.DIRECTORY_SEPARATOR.'schemes'.$rtl) as $css) {
                        if ($css[0] != '.' && preg_match('/\.css$/', $css)) {
                            $name = strpos($css, 'admin-theme-') !== false ? Tools::ucfirst(preg_replace('/^admin-theme-(.*)\.css$/', '$1', $css)) : $css;
                            $this->themes[] = array('id' => $theme.'|schemes'.$rtl.'/'.$css, 'name' => $name);
                        }
                    }
                }
            }
        }

        $home_tab = Tab::getInstanceFromClassName('AdminDashboard', $this->context->language->id);
        $this->tabs_list[$home_tab->id] = array(
            'name' => $home_tab->name,
            'id_tab' => $home_tab->id,
            'children' => array(array(
                'id_tab' => $home_tab->id,
                'name' => $home_tab->name
            ))
        );
        foreach (Tab::getTabs($this->context->language->id, 0) as $tab) {
            if (Tab::checkTabRights($tab['id_tab'])) {
                $this->tabs_list[$tab['id_tab']] = $tab;
                foreach (Tab::getTabs($this->context->language->id, $tab['id_tab']) as $children) {
                    if (Tab::checkTabRights($children['id_tab'])) {
                        $this->tabs_list[$tab['id_tab']]['children'][] = $children;
                    }
                }
            }
        }

        // An employee can edit its own profile
        if ($this->context->employee->id == Tools::getValue('id_employee')) {
            $this->tabAccess['view'] = '1';
            $this->restrict_edition = true;
            $this->tabAccess['edit'] = '1';
        }
    }

    public function setMedia()
    {
        parent::setMedia();
        $this->addJS(__PS_BASE_URI__.$this->admin_webpath.'/themes/'.$this->bo_theme.'/js/vendor/jquery-passy.js');
        $this->addjQueryPlugin('validate');
        $this->addJS(_PS_JS_DIR_.'jquery/plugins/validate/localization/messages_'.$this->context->language->iso_code.'.js');
    }

    public function initPageHeaderToolbar()
    {
        parent::initPageHeaderToolbar();

        if (empty($this->display)) {
            $this->page_header_toolbar_btn['new_employee'] = array(
                'href' => self::$currentIndex.'&addemployee&token='.$this->token,
                'desc' => $this->l('Add new employee', null, null, false),
                'icon' => 'process-icon-new'
            );
        }

        if ($this->display == 'edit') {
            $obj = $this->loadObject(true);
            if (Validate::isLoadedObject($obj)) {
                /** @var Employee $obj */
                array_pop($this->toolbar_title);
                $this->toolbar_title[] = sprintf($this->l('Edit: %1$s %2$s'), $obj->lastname, $obj->firstname);
                $this->page_header_toolbar_title = implode(' '.Configuration::get('PS_NAVIGATION_PIPE').' ',
                    $this->toolbar_title);
            }
        }
    }

    public function renderList()
    {
        $this->_select = 'pl.`name` AS profile';
        $this->_join = 'LEFT JOIN `'._DB_PREFIX_.'profile` p ON a.`id_profile` = p.`id_profile`
		LEFT JOIN `'._DB_PREFIX_.'profile_lang` pl ON (pl.`id_profile` = p.`id_profile` AND pl.`id_lang` = '
            .(int)$this->context->language->id.')';
        $this->_use_found_rows = false;

        return parent::renderList();
    }

    public function renderForm()
    {
        /** @var Employee $obj */
        if (!($obj = $this->loadObject(true))) {
            return;
        }

        $available_profiles = Profile::getProfiles($this->context->language->id);

        if ($obj->id_profile == _PS_ADMIN_PROFILE_ && $this->context->employee->id_profile != _PS_ADMIN_PROFILE_) {
            $this->errors[] = $this->trans('You cannot edit the SuperAdmin profile.', array(), 'Admin.Parameters.Notification');
            return parent::renderForm();
        }

        $this->fields_form = array(
            'legend' => array(
                'title' => $this->l('Employees'),
                'icon' => 'icon-user'
            ),
            'input' => array(
                array(
                    'type' => 'text',
                    'class' => 'fixed-width-xl',
                    'label' => $this->l('First Name'),
                    'name' => 'firstname',
                    'required' => true
                ),
                array(
                    'type' => 'text',
                    'class' => 'fixed-width-xl',
                    'label' => $this->l('Last Name'),
                    'name' => 'lastname',
                    'required' => true
                ),
                array(
                    'type' => 'html',
                    'name' => 'employee_avatar',
                    'html_content' => '<div id="employee-thumbnail"><a href="http://www.prestashop.com/forums/index.php?app=core&amp;module=usercp" target="_blank" style="background-image:url('.$obj->getImage().')"></a></div>
					<div class="alert alert-info">'.sprintf($this->l('Your avatar in PrestaShop 1.6.x is your profile picture on %1$s. To change your avatar, log in to PrestaShop.com with your email %2$s and follow the on-screen instructions.'), '<a href="http://www.prestashop.com/forums/index.php?app=core&amp;module=usercp" class="alert-link" target="_blank">PrestaShop.com</a>', $obj->email).'</div>',
                ),
                array(
                    'type' => 'text',
                    'class'=> 'fixed-width-xxl',
                    'prefix' => '<i class="icon-envelope-o"></i>',
                    'label' => $this->l('Email address'),
                    'name' => 'email',
                    'required' => true,
                    'autocomplete' => false
                ),
            ),
        );

        if ($this->restrict_edition) {
            $this->fields_form['input'][] = array(
                'type' => 'change-password',
                'label' => $this->l('Password'),
                'name' => 'passwd'
                );

            if (Tab::checkTabRights(Tab::getIdFromClassName('AdminModulesController'))) {
                $this->fields_form['input'][] = array(
                    'type' => 'prestashop_addons',
                    'label' => 'PrestaShop Addons',
                    'name' => 'prestashop_addons',
                );
            }
        } else {
            $this->fields_form['input'][] = array(
                'type' => 'password',
                'label' => $this->l('Password'),
                'hint' => sprintf($this->l('Password should be at least %s characters long.'), Validate::ADMIN_PASSWORD_LENGTH),
                'name' => 'passwd'
                );
        }

        $this->fields_form['input'] = array_merge($this->fields_form['input'], array(
            array(
                'type' => 'switch',
                'label' => $this->l('Subscribe to PrestaShop newsletter'),
                'name' => 'optin',
                'required' => false,
                'is_bool' => true,
                'values' => array(
                    array(
                        'id' => 'optin_on',
                        'value' => 1,
                        'label' => $this->trans('Yes', array(), 'Admin.Global')
                    ),
                    array(
                        'id' => 'optin_off',
                        'value' => 0,
                        'label' => $this->trans('No', array(), 'Admin.Global')
                    )
                ),
                'hint' => $this->l('PrestaShop can provide you with guidance on a regular basis by sending you tips on how to optimize the management of your store which will help you grow your business. If you do not wish to receive these tips, you can disable this option.')
            ),
            array(
                'type' => 'default_tab',
                'label' => $this->l('Default page'),
                'name' => 'default_tab',
                'hint' => $this->l('This page will be displayed just after login.'),
                'options' => $this->tabs_list
            ),
            array(
                'type' => 'select',
                'label' => $this->l('Language'),
                'name' => 'id_lang',
                //'required' => true,
                'options' => array(
                    'query' => Language::getLanguages(false),
                    'id' => 'id_lang',
                    'name' => 'name'
                )
            ),
            array(
                'type' => 'select',
                'label' => $this->l('Theme'),
                'name' => 'bo_theme_css',
                'options' => array(
                    'query' => $this->themes,
                    'id' => 'id',
                    'name' => 'name'
                ),
                'onchange' => 'var value_array = $(this).val().split("|"); $("link").first().attr("href", "themes/" + value_array[0] + "/css/" + value_array[1]);',
                'hint' => $this->l('Back office theme.')
            ),
            array(
                'type' => 'radio',
                'label' => $this->l('Admin menu orientation'),
                'name' => 'bo_menu',
                'required' => false,
                'is_bool' => true,
                'values' => array(
                    array(
                        'id' => 'bo_menu_on',
                        'value' => 0,
                        'label' => $this->l('Top')
                    ),
                    array(
                        'id' => 'bo_menu_off',
                        'value' => 1,
                        'label' => $this->l('Left')
                    )
                )
            )
        ));

        if ((int)$this->access('edit') && !$this->restrict_edition) {
            $this->fields_form['input'][] = array(
                'type' => 'switch',
                'label' => $this->l('Active'),
                'name' => 'active',
                'required' => false,
                'is_bool' => true,
                'values' => array(
                    array(
                        'id' => 'active_on',
                        'value' => 1,
                        'label' => $this->trans('Enabled', array(), 'Admin.Global')
                    ),
                    array(
                        'id' => 'active_off',
                        'value' => 0,
                        'label' => $this->trans('Disabled', array(), 'Admin.Global')
                    )
                ),
                'hint' => $this->l('Allow or disallow this employee to log in to the Admin panel.')
            );

            // if employee is not SuperAdmin (id_profile = 1), don't make it possible to select the admin profile
            if ($this->context->employee->id_profile != _PS_ADMIN_PROFILE_) {
                foreach ($available_profiles as $i => $profile) {
                    if ($available_profiles[$i]['id_profile'] == _PS_ADMIN_PROFILE_) {
                        unset($available_profiles[$i]);
                        break;
                    }
                }
            }
            $this->fields_form['input'][] = array(
                'type' => 'select',
                'label' => $this->l('Permission profile'),
                'name' => 'id_profile',
                'required' => true,
                'options' => array(
                    'query' => $available_profiles,
                    'id' => 'id_profile',
                    'name' => 'name',
                    'default' => array(
                        'value' => '',
                        'label' => $this->l('-- Choose --')
                    )
                )
            );

            if (Shop::isFeatureActive()) {
                $this->context->smarty->assign('_PS_ADMIN_PROFILE_', (int)_PS_ADMIN_PROFILE_);
                $this->fields_form['input'][] = array(
                    'type' => 'shop',
                    'label' => $this->l('Shop association'),
                    'hint' => $this->l('Select the shops the employee is allowed to access.'),
                    'name' => 'checkBoxShopAsso',
                );
            }
        }

        $this->fields_form['submit'] = array(
            'title' => $this->trans('Save', array(), 'Admin.Actions'),
        );

        $this->fields_value['passwd'] = false;
        $this->fields_value['bo_theme_css'] = $obj->bo_theme.'|'.$obj->bo_css;

        if (empty($obj->id)) {
            $this->fields_value['id_lang'] = $this->context->language->id;
        }

        return parent::renderForm();
    }

    protected function _childValidation()
    {
        if (!($obj = $this->loadObject(true))) {
            return false;
        }

        if (Tools::getValue('id_profile') == _PS_ADMIN_PROFILE_ && $this->context->employee->id_profile != _PS_ADMIN_PROFILE_) {
            $this->errors[] = $this->trans('The provided profile is invalid', array(), 'Admin.Parameters.Notification');
        }

        $email = $this->getFieldValue($obj, 'email');
        if (Validate::isEmail($email) && Employee::employeeExists($email) && (!Tools::getValue('id_employee')
            || ($employee = new Employee((int)Tools::getValue('id_employee'))) && $employee->email != $email)) {
            $this->errors[] = $this->trans('An account already exists for this email address:', array(), 'Admin.OrdersCustomers.Notification').' '.$email;
        }
    }

    public function processDelete()
    {
        if (!$this->canModifyEmployee()) {
            return false;
        }

        return parent::processDelete();
    }

    public function processStatus()
    {
        if (!$this->canModifyEmployee()) {
            return false;
        }

        parent::processStatus();
    }

    protected function processBulkDelete()
    {
        if (is_array($this->boxes) && !empty($this->boxes)) {
            foreach ($this->boxes as $id_employee) {
                if ((int)$this->context->employee->id == (int)$id_employee) {
                    $this->restrict_edition = true;
                    return $this->canModifyEmployee();
                }
            }
        }

        return parent::processBulkDelete();
    }

    protected function canModifyEmployee()
    {
        if ($this->restrict_edition) {
            $this->errors[] = $this->trans('You cannot disable or delete your own account.', array(), 'Admin.Parameters.Notification');
            return false;
        }

        $employee = new Employee(Tools::getValue('id_employee'));
        if ($employee->isLastAdmin()) {
            $this->errors[] = $this->trans('You cannot disable or delete the administrator account.', array(), 'Admin.Parameters.Notification');
            return false;
        }

        // It is not possible to delete an employee if he manages warehouses
        $warehouses = Warehouse::getWarehousesByEmployee((int)Tools::getValue('id_employee'));
        if (Tools::isSubmit('deleteemployee') && count($warehouses) > 0) {
            $this->errors[] = $this->trans('You cannot delete this account because it manages warehouses. Check your warehouses first.', array(), 'Admin.Parameters.Notification');
            return false;
        }

        return true;
    }

    public function processSave()
    {
        $employee = new Employee((int)Tools::getValue('id_employee'));

        // If the employee is editing its own account
        if ($this->restrict_edition) {
            $current_password = trim(Tools::getValue('old_passwd'));
            if (Tools::getValue('passwd') && (empty($current_password) || !Validate::isPasswdAdmin($current_password) || !$employee->getByEmail($employee->email, $current_password))) {
                $this->errors[] = $this->trans('Your current password is invalid.', array(), 'Admin.Parameters.Notification');
            } elseif (Tools::getValue('passwd') && (!Tools::getValue('passwd2') || Tools::getValue('passwd') !== Tools::getValue('passwd2'))) {
                $this->errors[] = $this->trans('The confirmation password does not match.', array(), 'Admin.Parameters.Notification');
            }

            $_POST['id_profile'] = $_GET['id_profile'] = $employee->id_profile;
            $_POST['active'] = $_GET['active'] = $employee->active;

            // Unset set shops
            foreach ($_POST as $postkey => $postvalue) {
                if (strstr($postkey, 'checkBoxShopAsso_'.$this->table) !== false) {
                    unset($_POST[$postkey]);
                }
            }
            foreach ($_GET as $postkey => $postvalue) {
                if (strstr($postkey, 'checkBoxShopAsso_'.$this->table) !== false) {
                    unset($_GET[$postkey]);
                }
            }

            // Add current shops associated to the employee
            $result = Shop::getShopById((int)$employee->id, $this->identifier, $this->table);
            foreach ($result as $row) {
                $key = 'checkBoxShopAsso_'.$this->table;
                if (!isset($_POST[$key])) {
                    $_POST[$key] = array();
                }
                if (!isset($_GET[$key])) {
                    $_GET[$key] = array();
                }
                $_POST[$key][$row['id_shop']] = 1;
                $_GET[$key][$row['id_shop']] = 1;
            }
        } else {
            $_POST['id_last_order'] = $employee->getLastElementsForNotify('order');
            $_POST['id_last_customer_message'] = $employee->getLastElementsForNotify('customer_message');
            $_POST['id_last_customer'] = $employee->getLastElementsForNotify('customer');
        }

        //if profile is super admin, manually fill checkBoxShopAsso_employee because in the form they are disabled.
        if ($_POST['id_profile'] == _PS_ADMIN_PROFILE_) {
            $result = Db::getInstance()->executeS('SELECT id_shop FROM '._DB_PREFIX_.'shop');
            foreach ($result as $row) {
                $key = 'checkBoxShopAsso_'.$this->table;
                if (!isset($_POST[$key])) {
                    $_POST[$key] = array();
                }
                if (!isset($_GET[$key])) {
                    $_GET[$key] = array();
                }
                $_POST[$key][$row['id_shop']] = 1;
                $_GET[$key][$row['id_shop']] = 1;
            }
        }

        if ($employee->isLastAdmin()) {
            if (Tools::getValue('id_profile') != (int)_PS_ADMIN_PROFILE_) {
                $this->errors[] = $this->trans('You should have at least one employee in the administrator group.', array(), 'Admin.Parameters.Notification');
                return false;
            }

            if (Tools::getvalue('active') == 0) {
                $this->errors[] = $this->trans('You cannot disable or delete the administrator account.', array(), 'Admin.Parameters.Notification');
                return false;
            }
        }

        if (Tools::getValue('bo_theme_css')) {
            $bo_theme = explode('|', Tools::getValue('bo_theme_css'));
            $_POST['bo_theme'] = $bo_theme[0];
            if (!in_array($bo_theme[0], scandir(_PS_ADMIN_DIR_.DIRECTORY_SEPARATOR.'themes'))) {
                $this->errors[] = $this->trans('Invalid theme', array(), 'Admin.Parameters.Notification');
                return false;
            }
            if (isset($bo_theme[1])) {
                $_POST['bo_css'] = $bo_theme[1];
            }
        }

        $assos = $this->getSelectedAssoShop($this->table);
        if (!$assos && $this->table = 'employee') {
            if (Shop::isFeatureActive() && _PS_ADMIN_PROFILE_ != $_POST['id_profile']) {
                $this->errors[] = $this->trans('The employee must be associated with at least one shop.', array(), 'Admin.Parameters.Notification');
            }
        }

        if (count($this->errors)) {
            return false;
        }

        return parent::processSave();
    }

    public function validateRules($class_name = false)
    {
        $employee = new Employee((int)Tools::getValue('id_employee'));

        if (!Validate::isLoadedObject($employee) && !Validate::isPasswd(Tools::getvalue('passwd'), Validate::ADMIN_PASSWORD_LENGTH)) {
            return !($this->errors[] = sprintf($this->trans('The password must be at least %s characters long.', array(), 'Admin.Parameters.Notification'),
                Validate::ADMIN_PASSWORD_LENGTH));
        }

        return parent::validateRules($class_name);
    }

    public function postProcess()
    {
        /* PrestaShop demo mode */
        if ((Tools::isSubmit('submitBulkdeleteemployee') || Tools::isSubmit('submitBulkdisableSelectionemployee') || Tools::isSubmit('deleteemployee') || Tools::isSubmit('status') || Tools::isSubmit('statusemployee') || Tools::isSubmit('submitAddemployee')) && _PS_MODE_DEMO_) {
            $this->errors[] = $this->trans('This functionality has been disabled.', array(), 'Admin.Notifications.Error');
            return;
        }

        return parent::postProcess();
    }

    public function initContent()
    {
        if ($this->context->employee->id == Tools::getValue('id_employee')) {
            $this->display = 'edit';
        }

        return parent::initContent();
    }

    /**
     * @param Employee $object
     *
     * @return bool
     */
    protected function afterUpdate($object)
    {
        $res = parent::afterUpdate($object);
        // Update cookie if needed
        if (Tools::getValue('id_employee') == $this->context->employee->id && Tools::getValue('passwd')
            && $object->passwd != $this->context->employee->passwd) {
            $this->context->cookie->passwd = $this->context->employee->passwd = $object->passwd;
        }

        return $res;
    }

    protected function ajaxProcessFormLanguage()
    {
        $this->context->cookie->employee_form_lang = (int)Tools::getValue('form_language_id');
        if (!$this->context->cookie->write()) {
            die('Error while updating cookie.');
        }
        die('Form language updated.');
    }

    protected function ajaxProcessToggleMenu()
    {
        $this->context->cookie->collapse_menu = (int)Tools::getValue('collapse');
        $this->context->cookie->write();
    }
    public function ajaxProcessGetTabByIdProfile()
    {
        $id_profile = Tools::getValue('id_profile');
        $tabs = Tab::getTabByIdProfile(0, $id_profile);
        $this->tabs_list = array();
        foreach ($tabs as $tab) {
            if (Tab::checkTabRights($tab['id_tab'])) {
                $this->tabs_list[$tab['id_tab']] = $tab;
                foreach (Tab::getTabByIdProfile($tab['id_tab'], $id_profile) as $children) {
                    if (Tab::checkTabRights($children['id_tab'])) {
                        $this->tabs_list[$tab['id_tab']]['children'][] = $children;
                    }
                }
            }
        }
        die(json_encode($this->tabs_list));
    }
}
