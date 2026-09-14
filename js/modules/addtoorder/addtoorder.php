<?php
/**
* 2007-2020 PrestaShop
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
*  @copyright 2007-2020 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

class AddToOrder extends Module
{
    protected $config_form = false;

    public function __construct()
    {
        $this->name = 'addtoorder';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'ijzershop';
        $this->need_instance = 1;

        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->context = Context::getContext();

        $this->displayName = $this->trans('Add to order delivery option extended', [], 'Modules.AddToOrder.addtoorder');
        $this->description = $this->trans('Module for the configurations of the Moderne Smid BV', [], 'Modules.AddToOrder.addtoorder');

        $this->confirmUninstall = $this->trans('Are you sure to remove this module, all records from the database wil be removed', [], 'Modules.AddToOrder.addtoorder');

        $this->ps_versions_compliancy = array('min' => '8.0.0', 'max' => '9.99.99');
    }

    private function executeSQL($requests): bool
    {
        foreach ($requests as $q) {
            if (!Db::getInstance()->execute($q)) {
                return false;
            }
        }
        return true;
    }

    public function install(): bool
    {
        if (!parent::install()) {
            return false;
        }

        Configuration::updateValue('ADDTOORDER_LIVE_MODE', false);
        Configuration::updateValue('ADDTOORDER_DELIVERY_METHOD', 14);
        Configuration::updateValue('ADDTOORDER_ORDER_STATUSES', implode(',', [2,3,7,10,16]));
        Configuration::updateValue('ADDTOORDER_ACCEPTED_CARRIERS', '');

        if (!$this->registerHook('addToOrderDelivery') ||
            !$this->registerHook('addToOrderAdmin') ||
            !$this->registerHook('actionCarrierProcess')) {
            return false;
        }

        $prefix = _DB_PREFIX_;

        // Add column to cart if missing
        $existsCart = (bool) Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = "' . pSQL($prefix) . 'cart"
               AND COLUMN_NAME = "added_to_order"'
        );
        if (!$existsCart) {
            if (!Db::getInstance()->execute('ALTER TABLE `'.$prefix.'cart` ADD COLUMN `added_to_order` VARCHAR(100) NULL DEFAULT NULL')) {
                return false;
            }
        }

        // Add column to orders if missing
        $existsOrders = (bool) Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = "' . pSQL($prefix) . 'orders"
               AND COLUMN_NAME = "added_to_order"'
        );
        if (!$existsOrders) {
            if (!Db::getInstance()->execute('ALTER TABLE `'.$prefix.'orders` ADD COLUMN `added_to_order` VARCHAR(100) NULL DEFAULT NULL')) {
                return false;
            }
        }

        return true;
    }

    public function uninstall(): bool
    {
        Configuration::deleteByName('ADDTOORDER_LIVE_MODE');
        Configuration::deleteByName('ADDTOORDER_DELIVERY_METHOD');
        Configuration::deleteByName('ADDTOORDER_ORDER_STATUSES');
        Configuration::deleteByName('ADDTOORDER_ACCEPTED_CARRIERS');

        $prefix = _DB_PREFIX_;

        // Drop columns only if they exist to avoid version-specific SQL IF EXISTS
        $existsCart = (bool) Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = "' . pSQL($prefix) . 'cart"
               AND COLUMN_NAME = "added_to_order"'
        );
        if ($existsCart) {
            Db::getInstance()->execute('ALTER TABLE `'.$prefix.'cart` DROP COLUMN `added_to_order`');
        }

        $existsOrders = (bool) Db::getInstance()->getValue(
            'SELECT COUNT(*) FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = "' . pSQL($prefix) . 'orders"
               AND COLUMN_NAME = "added_to_order"'
        );
        if ($existsOrders) {
            Db::getInstance()->execute('ALTER TABLE `'.$prefix.'orders` DROP COLUMN `added_to_order`');
        }

        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent(): string
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitAddToOrderModule')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output.$this->renderForm();
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm(): string
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitAddToOrderModule';
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
    protected function getConfigForm(): array
    {
        $carrierOptions = $this->getCarrierSelectOptions();

        return array(
            'form' => array(
                'legend' => array(
                'title' => $this->trans('Settings', [], 'Admin.Global'),
                'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'switch',
                        'label' => $this->trans('Live mode', [], 'Modules.AddToOrder.Admin'),
                        'name' => 'ADDTOORDER_LIVE_MODE',
                        'is_bool' => true,
                        'desc' => $this->trans('Use this module in live mode', [], 'Modules.AddToOrder.Admin'),
                        'values' => array(
                            array(
                                'id' => 'active_on',
                                'value' => true,
                                'label' => $this->trans('Enabled', [], 'Admin.Global')
                            ),
                            array(
                                'id' => 'active_off',
                                'value' => false,
                                'label' => $this->trans('Disabled', [], 'Admin.Global')
                            )
                        ),
                    ),
                    array(
                        'col' => 3,
                        'type' => 'select',
                        'name' => 'ADDTOORDER_DELIVERY_METHOD',
                        'label' => $this->trans('Delivery method', [], 'Modules.AddToOrder.Admin'),
                        'desc' => $this->trans('Select the carrier reference to use for add-to-order shipments.', [], 'Modules.AddToOrder.Admin'),
                        'options' => array(
                            'query' => $carrierOptions,
                            'id' => 'id_reference',
                            'name' => 'name',
                        ),
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->trans('Order statuses', [], 'Modules.AddToOrder.Admin'),
                        'desc' => $this->trans('Choose the order statuses', [], 'Modules.AddToOrder.Admin'),
                        'name' => 'ADDTOORDER_ORDER_STATUSES[]',
                        'multiple' => true,
                        'options' => array(
                            'query' => OrderState::getOrderStates($this->context->language->id),
                            'id' => 'id_order_state',
                            'name' => 'name'
                        )
                    ),
                    array(
                        'type' => 'select',
                        'label' => $this->trans('Accepted carriers', [], 'Modules.AddToOrder.Admin'),
                        'desc' => $this->trans('Choose the carriers on which the order can be added', [], 'Modules.AddToOrder.Admin'),
                        'name' => 'ADDTOORDER_ACCEPTED_CARRIERS[]',
                        'multiple' => true,
                        'options' => array(
                            'query' => $carrierOptions,
                            'id' => 'id_reference',
                            'name' => 'name'
                        )
                    ),
                ),
                'submit' => array(
                    'title' => $this->trans('Save', [], 'Admin.Actions'),
                ),
            ),
        );
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues(): array
    {
        $orderStatuses = Configuration::get('ADDTOORDER_ORDER_STATUSES');
        $acceptedCarriers = Configuration::get('ADDTOORDER_ACCEPTED_CARRIERS');
        $configuredCarrierId = (int) Configuration::get('ADDTOORDER_DELIVERY_METHOD', 14);
        $carrierByReference = Carrier::getCarrierByReference($configuredCarrierId);
        $carrierIdByReference = (Validate::isLoadedObject($carrierByReference))
            ? (int) $carrierByReference->id
            : 0;
        if ($carrierIdByReference > 0) {
            $configuredCarrierReference = $configuredCarrierId;
        } else {
            $carrier = new Carrier($configuredCarrierId);
            $configuredCarrierReference = Validate::isLoadedObject($carrier)
                ? (int) ($carrier->id_reference ?: $configuredCarrierId)
                : $configuredCarrierId;
        }

        return array(
            'ADDTOORDER_LIVE_MODE' => Configuration::get('ADDTOORDER_LIVE_MODE', true),
            'ADDTOORDER_DELIVERY_METHOD' => $configuredCarrierReference,
            'ADDTOORDER_ORDER_STATUSES[]' => !empty($orderStatuses) ? explode(',', $orderStatuses) : [2,3,7,10,16],
            'ADDTOORDER_ACCEPTED_CARRIERS[]' => !empty($acceptedCarriers) ? explode(',', $acceptedCarriers) : [],
        );
    }

    /**
     * Save form data.
     */
    protected function postProcess(): void
    {
        $form_values = $this->getConfigFormValues();
        foreach (array_keys($form_values) as $key) {
             //check if is multiple select
            if (in_array($key, array('ADDTOORDER_ORDER_STATUSES[]'))) {
                    $statuses = Tools::getValue('ADDTOORDER_ORDER_STATUSES');
                    if(!is_array($statuses)){
                        $selectedStatuses = implode(',', [2,3,7,10,16]);
                    } else {
                        $selectedStatuses = implode(',', $statuses);
                    }
                    Configuration::updateValue('ADDTOORDER_ORDER_STATUSES', $selectedStatuses, false);
                continue;
            } elseif (in_array($key, array('ADDTOORDER_ACCEPTED_CARRIERS[]'))) {
                $carriers = Tools::getValue('ADDTOORDER_ACCEPTED_CARRIERS');
                if (!is_array($carriers)) {
                    $selectedCarriers = '';
                } else {
                    $selectedCarriers = implode(',', $carriers);
                }
                Configuration::updateValue('ADDTOORDER_ACCEPTED_CARRIERS', $selectedCarriers, false);
                continue;
            } else {
                if ($key === 'ADDTOORDER_DELIVERY_METHOD') {
                    $inputCarrierId = (int) Tools::getValue($key);
                    if ($inputCarrierId > 0) {
                        $carrier = new Carrier($inputCarrierId);
                        if (Validate::isLoadedObject($carrier)) {
                            $inputCarrierId = (int) ($carrier->id_reference ?: $carrier->id);
                        } else {
                            $carrierByRef = Carrier::getCarrierByReference($inputCarrierId);
                            if (Validate::isLoadedObject($carrierByRef)) {
                                $inputCarrierId = (int) $inputCarrierId;
                            }
                        }
                    }
                    Configuration::updateValue($key, $inputCarrierId, false);
                } else {
                    Configuration::updateValue($key, Tools::getValue($key), false);
                }
            }
        }
    }

    public function hookActionCarrierProcess(array $params): void
    {
        $cart = $params['cart'];
        if (!($cart instanceof Cart)) {
            return;
        }

        if (isset($params['cart']->added_to_order)) {
            $cart->added_to_order = $params['cart']->added_to_order;
        }
        $cart->save();
    }

    public function hookAddToOrderDelivery(array $params): string
    {
        return 'addToOrderDelivery';
    }

    public function hookAddToOrderAdmin(array $params): string
    {
        return 'addToOrderAdmin';
    }

    private function getCarrierSelectOptions(): array
    {
        $carriers = Carrier::getCarriers(
            $this->context->language->id,
            true,
            false,
            false,
            null,
            Carrier::ALL_CARRIERS
        );

        $options = [];
        $seen = [];

        foreach ($carriers as $carrier) {
            $reference = (int) $carrier['id_reference'];
            if ($reference <= 0 || isset($seen[$reference])) {
                continue;
            }

            $seen[$reference] = true;
            $options[] = [
                'id_reference' => $reference,
                'name' => $carrier['name'] . ' (#' . $reference . ')',
            ];
        }

        return $options;
    }
}
