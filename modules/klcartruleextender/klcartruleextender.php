<?php
/**
 * 2022 - Keyrnel
 *
 * NOTICE OF LICENSE
 *
 * The source code of this module is under a commercial license.
 * Each license is unique and can be installed and used on only one shop.
 * Any reproduction or representation total or partial of the module, one or more of its components,
 * by any means whatsoever, without express permission from us is prohibited.
 * If you have not received this module from us, thank you for contacting us.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future.
 *
 * @author    Keyrnel
 * @copyright 2022 - Keyrnel
 * @license   commercial
 * International Registered Trademark & Property of Keyrnel
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

use Keyrnel\CartRuleExtender\Core\Cart\Calculator;

class KlCartRuleExtender extends Module
{
    private $_html = '';

    public function __construct()
    {
        $this->name = 'klcartruleextender';
        $this->tab = 'others';
        $this->version = '1.0.2';
        $this->author = 'Keyrnel';
        $this->module_key = '5648da966a09f9f48cce03a931b84cfe';
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Cart rule extender - Add shipping and wrapping cost');
        $this->description = $this->l('Let the possibility to your customers to include shipping and wrapping cost with their discount codes.');
        $this->ps_versions_compliancy = ['min' => '1.7.7.0', 'max' => _PS_VERSION_];
    }

    public function install($delete_params = true)
    {
        if (!parent::install()
            || !$this->registerHook('actionObjectAddAfter')
            || !$this->registerHook('actionObjectUpdateAfter')
            || !$this->registerHook('actionObjectDeleteAfter')
            || !$this->registerHook('actionAdminControllerSetMedia')
        ) {
            return false;
        }

        if ($delete_params) {
            $sql = [];
            include dirname(__FILE__) . '/sql/install.php';

            if (!$this->executeSql($sql)
                || !$this->installConf()
            ) {
                return false;
            }
        }

        return true;
    }

    protected function executeSql($sql = [])
    {
        foreach ($sql as $s) {
            if (!Db::getInstance()->execute($s)) {
                return false;
            }
        }

        return true;
    }

    protected function installConf()
    {
        Configuration::updateGlobalValue('KL_CART_RULE_EXTENDER_SHIPPING_FEES', 1);
        Configuration::updateGlobalValue('KL_CART_RULE_EXTENDER_WRAPPING_FEES', 1);
        Configuration::updateGlobalValue('KL_CART_RULE_EXTENDER_ALL_CART_RULES', 1);
        Configuration::updateGlobalValue('KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY', 0);

        return true;
    }

    public function uninstall($delete_params = true)
    {
        if (!parent::uninstall()) {
            return false;
        }

        if ($delete_params) {
            $sql = [];
            include dirname(__FILE__) . '/sql/uninstall.php';

            if (!$this->executeSql($sql)
                || !$this->uninstallConf()
            ) {
                return false;
            }
        }

        return true;
    }

    protected function uninstallConf()
    {
        Configuration::deleteByName('KL_CART_RULE_EXTENDER_SHIPPING_FEES');
        Configuration::deleteByName('KL_CART_RULE_EXTENDER_WRAPPING_FEES');
        Configuration::deleteByName('KL_CART_RULE_EXTENDER_ALL_CART_RULES');
        Configuration::deleteByName('KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY');

        return true;
    }

    public function reset()
    {
        if (!$this->uninstall(false)) {
            return false;
        }

        if (!$this->install(false)) {
            return false;
        }

        return true;
    }

    public function getContent()
    {
        if (Tools::isSubmit('submitConfiguration')) {
            foreach ($this->getConfigFieldsValues() as $key => $val) {
                if (!Configuration::updateValue($key, $val)) {
                    $this->_errors[] = $this->l(sprintf('Unable to update configuration key: %s ', $key));
                }
            }

            if (!count($this->_errors)) {
                Tools::redirectAdmin($this->context->link->getAdminLink(
                    'AdminModules',
                    true,
                    [],
                    [
                        'configure' => $this->name,
                        'tab_module' => $this->tab,
                        'module_name' => $this->name,
                        'conf' => 4,
                    ]
                ));
            }
        }

        if ($this->isGiftCardModuleInstalled()) {
            $this->context->controller->addJS($this->_path . 'views/js/admin/bo-module.js');
        }

        foreach ($this->_errors as $error) {
            $this->_html .= $this->displayError($error);
        }

        $this->_html .= $this->renderConfigForm();

        return $this->_html;
    }

    public function getConfigFieldsValues()
    {
        $values = [
            'KL_CART_RULE_EXTENDER_SHIPPING_FEES' => (bool) Tools::getValue('KL_CART_RULE_EXTENDER_SHIPPING_FEES', Configuration::get('KL_CART_RULE_EXTENDER_SHIPPING_FEES')),
            'KL_CART_RULE_EXTENDER_WRAPPING_FEES' => (bool) Tools::getValue('KL_CART_RULE_EXTENDER_WRAPPING_FEES', Configuration::get('KL_CART_RULE_EXTENDER_WRAPPING_FEES')),
            'KL_CART_RULE_EXTENDER_ALL_CART_RULES' => (bool) Tools::getValue('KL_CART_RULE_EXTENDER_ALL_CART_RULES', Configuration::get('KL_CART_RULE_EXTENDER_ALL_CART_RULES')),
        ];

        if ($this->isGiftCardModuleInstalled()) {
            $values = array_merge($values, [
                'KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY' => (bool) Tools::getValue('KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY', Configuration::get('KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY')),
            ]);
        }

        return $values;
    }

    public function renderConfigForm()
    {
        $fields_form = [
            'form' => [
                'legend' => [
                    'title' => $this->l('Configuration'),
                    'icon' => 'icon-cogs',
                ],
                'input' => [
                    [
                        'type' => 'switch',
                        'label' => $this->l('Include shipping fees'),
                        'desc' => $this->l('Enable this option to include shipping cost in cart rules with "amount" reduction.'),
                        'name' => 'KL_CART_RULE_EXTENDER_SHIPPING_FEES',
                        'values' => [
                            [
                                'value' => 1,
                                'label' => $this->l('Yes'),
                            ],
                            [
                                'value' => 0,
                                'label' => $this->l('No'),
                            ],
                        ],
                    ],
                    [
                        'type' => 'switch',
                        'label' => $this->l('Include wrapping fees'),
                        'desc' => $this->l('Enable this option to include wrapping cost for cart rules with "amount" reduction.'),
                        'name' => 'KL_CART_RULE_EXTENDER_WRAPPING_FEES',
                        'values' => [
                            [
                                'value' => 1,
                                'label' => $this->l('Yes'),
                            ],
                            [
                                'value' => 0,
                                'label' => $this->l('No'),
                            ],
                        ],
                    ],
                    [
                        'type' => 'switch',
                        'label' => $this->l('Automatically applied to all cart rules'),
                        'desc' => $this->l('Enable this option to automatically include shipping or/and wrapping cost for all cart rules with "amount" reduction.'),
                        'name' => 'KL_CART_RULE_EXTENDER_ALL_CART_RULES',
                        'values' => [
                            [
                                'value' => 1,
                                'label' => $this->l('Yes'),
                            ],
                            [
                                'value' => 0,
                                'label' => $this->l('No'),
                            ],
                        ],
                    ],
                ],
                'submit' => [
                    'title' => $this->l('Save'),
                    'class' => 'btn btn-default pull-right',
                    'name' => 'submitConfiguration',
                ],
            ],
        ];

        if ($this->isGiftCardModuleInstalled()) {
            $fields_form['form']['input'][] = [
                'type' => 'switch',
                'form_group_class' => (bool) Configuration::get('KL_CART_RULE_EXTENDER_ALL_CART_RULES') ? 'hide' : 'show',
                'label' => $this->l('Automatically applied to gift cards'),
                'desc' => $this->l('Enable this option to automatically include shipping or/and wrapping cost for gift cards.'),
                'name' => 'KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY',
                'values' => [
                    [
                        'value' => 1,
                        'label' => $this->l('Yes'),
                    ],
                    [
                        'value' => 0,
                        'label' => $this->l('No'),
                    ],
                ],
            ];
        }

        $helper = new HelperForm();
        $helper->show_toolbar = false;
        $helper->table = $this->name;
        $lang = new Language((int) Configuration::get('PS_LANG_DEFAULT'));
        $helper->default_form_language = $lang->id;
        $helper->module = $this;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitConfiguration';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', true, [], ['configure' => $this->name, 'tab_module' => $this->tab, 'module_name' => $this->name]);
        $helper->token = Tools::getAdminTokenLite('AdminModules');
        $helper->tpl_vars = [
            'fields_value' => $this->getConfigFieldsValues(),
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        ];

        return $helper->generateForm([$fields_form]);
    }

    /**
     * Get a singleton instance of Calculator object.
     *
     * @return Calculator
     */
    public function getCalculator()
    {
        if (is_null(Calculator::$instance)) {
            Calculator::$instance = new Calculator($this);
        }

        return Calculator::$instance;
    }

    /**
     * Check if module 'The gift card' is installed
     *
     * @return bool
     */
    public static function isGiftCardModuleInstalled()
    {
        if (!($moduleClass = Module::getInstanceByName('thegiftcard'))
            || !$moduleClass->isEnabledForShopContext()
        ) {
            return false;
        }

        return true;
    }

    /**
     * Get cart rule ids linked to existing gift cards
     *
     * @return array<int>|array[]
     */
    public function getGiftcardCartRuleIds()
    {
        if (self::isGiftCardModuleInstalled()
            && class_exists(GiftCardModel::class)
            && method_exists(GiftCardModel::class, 'getGiftcardCartRuleIds')
        ) {
            return GiftCardModel::getGiftcardCartRuleIds();
        }

        return [];
    }

    /**
     * Check if a specific cart rule includes shipping/wrapping fees
     *
     * @param int $id_cart_rule
     * @param bool $checkDb
     *
     * @return bool
     */
    public function isCartRuleIncludingFees($id_cart_rule, $checkDb = true)
    {
        if (Configuration::get('KL_CART_RULE_EXTENDER_ALL_CART_RULES')) {
            return true;
        } else {
            if (Configuration::get('KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY')
                && ($cart_rule_ids = $this->getGiftcardCartRuleIds())
                && in_array($id_cart_rule, $cart_rule_ids)
            ) {
                return true;
            }
        }

        if (!$checkDb) {
            return false;
        }

        return (bool) Db::getInstance()->getValue('
      		SELECT crf.`id_cart_rule`
      		FROM `' . _DB_PREFIX_ . 'cart_rule_fees` crf
      		WHERE crf.`id_cart_rule` = ' . (int) $id_cart_rule
        );
    }

    public function getOrderFeesById($id_order)
    {
        return Db::getInstance()->getRow('
          SELECT of.`include_shipping`, of.`include_wrapping`
          FROM `' . _DB_PREFIX_ . 'order_fees` of
          WHERE of.`id_order` = ' . (int) $id_order
        );
    }

    public function addOrderFees($order_fees_values = [])
    {
        if (!$order_fees_values) {
            return true;
        }

        $values = [];
        foreach ($order_fees_values as $row) {
            $values[] = [
                'id_order' => (int) $row['id_order'],
                'include_shipping' => (int) $row['include_shipping'],
                'include_wrapping' => (int) $row['include_wrapping'],
            ];
        }

        return Db::getInstance()->insert(
            'order_fees',
            $values,
            false,
            true,
            Db::INSERT_IGNORE
        );
    }

    public function getCartRuleFeesList()
    {
        $ids = [];

        $cart_rules = Db::getInstance()->executeS('
          SELECT crf.`id_cart_rule`
          FROM `' . _DB_PREFIX_ . 'cart_rule_fees` crf'
        );

        foreach ($cart_rules as $cart_rule) {
            $ids[] = $cart_rule['id_cart_rule'];
        }

        return $ids;
    }

    public function addCartRuleFees($cart_rule_fees_value = [])
    {
        if (!$cart_rule_fees_value) {
            return true;
        }

        $values = [];
        foreach ($cart_rule_fees_value as $id_cart_rule) {
            $values[] = [
                'id_cart_rule' => (int) $id_cart_rule,
            ];
        }

        return Db::getInstance()->insert(
            'cart_rule_fees',
            $values,
            false,
            true,
            Db::INSERT_IGNORE
        );
    }

    public function deleteCartRuleFees($cart_rule_fees_value = [])
    {
        if (!$cart_rule_fees_value) {
            return true;
        }

        return Db::getInstance()->delete(
            'cart_rule_fees',
            '`id_cart_rule` IN (' . implode(',', array_map('intval', $cart_rule_fees_value)) . ')'
        );
    }

    public function hookActionObjectAddAfter($params)
    {
        $object = $params['object'];

        if ($object instanceof CartRuleCore) {
            if (!isset($this->context->controller->className)
                || 'CartRule' != $this->context->controller->className
            ) {
                return true;
            }

            $include_fees = (int) Tools::getValue('include_fees');

            if ($include_fees) {
                $this->addCartRuleFees([$object->id]);
            } else {
                $this->deleteCartRuleFees([$object->id]);
            }
        }

        if ($object instanceof OrderCore) {
            $order_fees = [
                'id_order' => (int) $object->id,
                'include_shipping' => (bool) Configuration::get('KL_CART_RULE_EXTENDER_SHIPPING_FEES'),
                'include_wrapping' => (bool) Configuration::get('KL_CART_RULE_EXTENDER_WRAPPING_FEES'),
            ];

            $this->addOrderFees([$order_fees]);
        }

        return true;
    }

    public function hookActionObjectUpdateAfter($params)
    {
        $object = $params['object'];

        if ($object instanceof CartRuleCore) {
            return $this->hookActionObjectAddAfter($params);
        }

        return true;
    }

    public function hookActionObjectDeleteAfter($params)
    {
        $object = $params['object'];

        if ($object instanceof CartRuleCore) {
            $this->deleteCartRuleFees([$object->id]);
        }

        return true;
    }

    public function hookActionAdminControllerSetMedia($params)
    {
        if ('AdminCartRules' != Tools::getValue('controller')
            || !($id_cart_rule = (int) Tools::getValue('id_cart_rule'))
        ) {
            return;
        }

        $cart_rule_fees = [
            'value' => (int) $this->isCartRuleIncludingFees($id_cart_rule),
            'disabled' => (int) $this->isCartRuleIncludingFees($id_cart_rule, false),
        ];

        $trans = [
            'yes' => $this->l('Yes'),
            'no' => $this->l('No'),
            'label' => $this->l('Include shipping and wrapping costs'),
            'tooltip' => $this->l('Include shipping and wrapping costs'),
        ];

        Media::addJsDefL('klCartRuleExtenderFees', json_encode($cart_rule_fees));
        Media::addJsDefL('klCartRuleExtenderTrans', json_encode($trans));

        $this->context->controller->addJS($this->_path . 'views/js/admin/bo-cart-rule.js');
    }
}
