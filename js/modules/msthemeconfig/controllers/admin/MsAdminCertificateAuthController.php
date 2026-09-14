<?php
/**
 * Admin Controller for Certificate Authentication Management
 * Allows administrators to configure which employees require certificate authentication
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

require_once _PS_MODULE_DIR_ . 'msthemeconfig/src/Service/CertificateAuthService.php';

use MsThemeConfig\Service\CertificateAuthService;

class MsAdminCertificateAuthController extends ModuleAdminController
{
    /** @var CertificateAuthService */
    protected $certService;

    public function __construct()
    {
        $this->bootstrap = true;
        $this->table = 'employee';
        $this->className = 'Employee';
        $this->identifier = 'id_employee';
        $this->lang = false;

        parent::__construct();

        $this->certService = new CertificateAuthService();

        $this->addRowAction('toggle_cert');

        $this->fields_list = [
            'id_employee' => [
                'title' => $this->trans('ID', [], 'Admin.Global'),
                'align' => 'center',
                'class' => 'fixed-width-xs',
            ],
            'lastname' => [
                'title' => $this->trans('Last Name', [], 'Admin.Global'),
            ],
            'firstname' => [
                'title' => $this->trans('First Name', [], 'Admin.Global'),
            ],
            'email' => [
                'title' => $this->trans('Email', [], 'Admin.Global'),
            ],
            'has_2fa' => [
                'title' => $this->trans('2FA Enabled', [], 'Modules.MsThemeConfig.Admin'),
                'align' => 'center',
                'type' => 'bool',
                'class' => 'fixed-width-sm',
                'callback' => 'display2FAStatus',
            ],
            'require_certificate' => [
                'title' => $this->trans('Requires Certificate', [], 'Modules.MsThemeConfig.Admin'),
                'align' => 'center',
                'type' => 'bool',
                'class' => 'fixed-width-sm',
                'callback' => 'displayCertStatus',
            ],
        ];

        $this->bulk_actions = [
            'enableCert' => [
                'text' => $this->trans('Enable certificate requirement', [], 'Modules.MsThemeConfig.Admin'),
                'icon' => 'icon-power-off text-success',
            ],
            'disableCert' => [
                'text' => $this->trans('Disable certificate requirement', [], 'Modules.MsThemeConfig.Admin'),
                'icon' => 'icon-power-off text-danger',
            ],
        ];
    }

    public function initPageHeaderToolbar()
    {
        parent::initPageHeaderToolbar();

        $this->page_header_toolbar_btn['generate_cert'] = [
            'href' => '#',
            'desc' => $this->trans('Certificate Generation Guide', [], 'Modules.MsThemeConfig.Admin'),
            'icon' => 'process-icon-certificate',
            'js' => 'onclick="showCertificateGuide(); return false;"',
        ];

        $this->page_header_toolbar_btn['view_logs'] = [
            'href' => $this->context->link->getAdminLink('MsAdminCertificateAuth') . '&viewlogs=1',
            'desc' => $this->trans('View Login Logs', [], 'Modules.MsThemeConfig.Admin'),
            'icon' => 'process-icon-logs',
        ];
    }

    public function renderList()
    {
        $this->addJS($this->module->getPathUri() . 'views/js/certificate_auth.js');
        $this->addCSS($this->module->getPathUri() . 'views/css/certificate_auth.css');

        // Get all employees with their certificate status
        $employees = $this->certService->getEmployeesRequiringCertificate();

        $this->_list = $employees;
        $this->listTotal = count($employees);

        // Add info panel
        $infoPanel = $this->renderInfoPanel();

        return $infoPanel . parent::renderList();
    }

    protected function renderInfoPanel()
    {
        $html = '<div class="panel">
            <div class="panel-heading">
                <i class="icon-info-circle"></i> ' . $this->trans('Certificate Authentication', [], 'Modules.MsThemeConfig.Admin') . '
            </div>
            <div class="alert alert-info">
                <p><strong>' . $this->trans('How it works:', [], 'Modules.MsThemeConfig.Admin') . '</strong></p>
                <ul>
                    <li>' . $this->trans('Employees with 2FA enabled can log in from anywhere without certificates', [], 'Modules.MsThemeConfig.Admin') . '</li>
                    <li>' . $this->trans('Employees without 2FA must use a workstation with a valid client certificate', [], 'Modules.MsThemeConfig.Admin') . '</li>
                    <li>' . $this->trans('You can manually override certificate requirements for specific employees', [], 'Modules.MsThemeConfig.Admin') . '</li>
                    <li>' . $this->trans('Certificates must be installed in the browser and Apache must be configured to pass them to PHP', [], 'Modules.MsThemeConfig.Admin') . '</li>
                </ul>
                <p><strong>' . $this->trans('Setup Required:', [], 'Modules.MsThemeConfig.Admin') . '</strong></p>
                <ol>
                    <li>' . $this->trans('Generate certificates using the script: modules/msthemeconfig/cron_scripts/generate_certificates.sh', [], 'Modules.MsThemeConfig.Admin') . '</li>
                    <li>' . $this->trans('Configure Apache to require/request client certificates (see documentation)', [], 'Modules.MsThemeConfig.Admin') . '</li>
                    <li>' . $this->trans('Install client certificates on authorized workstations', [], 'Modules.MsThemeConfig.Admin') . '</li>
                </ol>
            </div>
        </div>';

        return $html;
    }

    public function displayCertStatus($value, $tr)
    {
        $required = (bool)$tr['require_certificate'];
        $has2fa = (bool)$tr['has_2fa'];

        if ($has2fa && !$required) {
            return '<i class="icon-check text-success"></i> <span class="badge badge-info">' .
                   $this->trans('2FA Active', [], 'Modules.MsThemeConfig.Admin') . '</span>';
        }

        if ($required) {
            return '<i class="icon-check text-success"></i> ' .
                   $this->trans('Required', [], 'Modules.MsThemeConfig.Admin');
        }

        return '<i class="icon-remove text-danger"></i> ' .
               $this->trans('Not Required', [], 'Modules.MsThemeConfig.Admin');
    }

    public function display2FAStatus($value, $tr)
    {
        $has2fa = (bool)$tr['has_2fa'];

        if ($has2fa) {
            return '<i class="icon-check text-success"></i>';
        }

        return '<i class="icon-remove text-danger"></i>';
    }

    public function displayToggleCertLink($token, $id, $name = null)
    {
        $employee = $this->certService->getEmployeesRequiringCertificate();
        $employee = array_filter($employee, function($e) use ($id) {
            return $e['id_employee'] == $id;
        });
        $employee = reset($employee);

        $required = isset($employee['require_certificate']) && $employee['require_certificate'];

        $tpl = $this->createTemplate('helpers/list/list_action_toggle_cert.tpl');
        $tpl->assign([
            'enabled' => $required,
            'url' => self::$currentIndex .
                    '&' . $this->identifier . '=' . $id .
                    '&toggle_cert&token=' . ($token != null ? $token : $this->token),
        ]);

        return $tpl->fetch();
    }

    public function processToggleCert()
    {
        $id_employee = (int)Tools::getValue($this->identifier);

        if (!$id_employee) {
            $this->errors[] = $this->trans('Invalid employee ID', [], 'Admin.Notifications.Error');
            return false;
        }

        $employee = new Employee($id_employee);
        if (!Validate::isLoadedObject($employee)) {
            $this->errors[] = $this->trans('Employee not found', [], 'Admin.Notifications.Error');
            return false;
        }

        // Get current status
        $currentStatus = $this->certService->requiresCertificate($id_employee);

        // Toggle
        $newStatus = !$currentStatus;

        if ($this->certService->setCertificateRequirement($id_employee, $newStatus)) {
            $this->confirmations[] = sprintf(
                $this->trans('Certificate requirement %s for %s', [], 'Modules.MsThemeConfig.Admin'),
                $newStatus ? $this->trans('enabled', [], 'Admin.Global') : $this->trans('disabled', [], 'Admin.Global'),
                $employee->firstname . ' ' . $employee->lastname
            );
        } else {
            $this->errors[] = $this->trans('Failed to update certificate requirement', [], 'Admin.Notifications.Error');
        }
    }

    protected function processBulkEnableCert()
    {
        $employees = Tools::getValue($this->table . 'Box');

        if (!is_array($employees) || empty($employees)) {
            $this->errors[] = $this->trans('You must select at least one element', [], 'Admin.Notifications.Error');
            return false;
        }

        $success = 0;
        foreach ($employees as $id_employee) {
            if ($this->certService->setCertificateRequirement((int)$id_employee, true)) {
                $success++;
            }
        }

        $this->confirmations[] = sprintf(
            $this->trans('Certificate requirement enabled for %d employee(s)', [], 'Modules.MsThemeConfig.Admin'),
            $success
        );
    }

    protected function processBulkDisableCert()
    {
        $employees = Tools::getValue($this->table . 'Box');

        if (!is_array($employees) || empty($employees)) {
            $this->errors[] = $this->trans('You must select at least one element', [], 'Admin.Notifications.Error');
            return false;
        }

        $success = 0;
        foreach ($employees as $id_employee) {
            if ($this->certService->setCertificateRequirement((int)$id_employee, false)) {
                $success++;
            }
        }

        $this->confirmations[] = sprintf(
            $this->trans('Certificate requirement disabled for %d employee(s)', [], 'Modules.MsThemeConfig.Admin'),
            $success
        );
    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);

        // Add certificate guide modal script
        $this->context->controller->addJqueryUI('ui.dialog');
    }
}
