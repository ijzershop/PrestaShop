<?php

/**
 *
 */
class AdminStatusesController extends AdminStatusesControllerCore
{
    public function __construct()
    {
        parent::__construct();
        $this->bootstrap = true;
        $this->table = 'order_state';
        $this->className = 'OrderState';
        $this->lang = true;
        $this->deleted = true;
        $this->colorOnBackground = false;
        $this->multishop_context = Shop::CONTEXT_ALL;
        $this->imageType = 'gif';
        $this->fieldImageSettings = [
            'name' => 'icon',
            'dir' => 'os',
        ];
    }


    /**
     * Function used to render the list to display for this controller.
     */
    public function renderList()
    {
        //init and render the first list
        $this->addRowAction('edit');
        $this->addRowAction('delete');
        $this->addRowActionSkipList('delete', $this->getUnremovableStatuses());
        $this->bulk_actions = [
            'delete' => [
                'text' => $this->trans('Delete selected', [], 'Admin.Actions'),
                'confirm' => $this->trans('Delete selected items?', [], 'Admin.Notifications.Warning'),
                'icon' => 'icon-trash',
            ],
        ];
        $this->initOrderStatusList();

        $lists = AdminControllerCore::renderList();

        //init and render the second list
        $this->list_skip_actions = [];
        $this->_filter = false;
        $this->addRowActionSkipList('delete', [1, 2, 3, 4, 5]);
        $this->initOrdersReturnsList();
        $this->checkFilterForOrdersReturnsList();

        // call postProcess() to take care of actions and filters
        $this->postProcess();
        $this->toolbar_title = $this->trans('Return statuses', [], 'Admin.Shopparameters.Feature');

        AdminControllerCore::initToolbar();
        $lists .= AdminControllerCore::renderList();
        return $lists;
    }

    /**
     * Init all variables to render the order status list.
     *
     * @deprecated Use `initOrderStatusList`
     */
    protected function initOrderStatutsList()
    {
        $this->initOrderStatusList();
    }


    protected function filterToField($key, $filter)
    {
        if ($this->table == 'order_state') {
            $this->initOrderStatusList();
        } elseif ($this->table == 'order_return_state') {
            $this->initOrdersReturnsList();
        }

        return AdminControllerCore::filterToField($key, $filter);
    }
    /**
     * init all variables to render the order status list.
     */
    protected function initOrderStatusList(): void
    {
        $this->table = 'order_state';
        $this->className = 'OrderState';
        $this->_defaultOrderBy = $this->identifier = 'id_order_state';
        $this->list_id = 'order_state';
        $this->deleted = true;
        $this->_orderBy = null;
        $this->fields_list = [
            'id_order_state' => [
                'title' => $this->trans('ID', [], 'Admin.Global'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ],
            'name' => [
                'title' => $this->trans('Name', [], 'Admin.Global'),
                'width' => 'auto',
                'color' => 'color',
            ],
            'logo' => [
                'title' => $this->trans('Icon', [], 'Admin.Shopparameters.Feature'),
                'align' => 'text-center',
                'image' => 'os',
                'orderby' => false,
                'search' => false,
                'class' => 'fixed-width-xs',
            ],
            'send_email' => [
                'title' => $this->trans('Send email to customer', [], 'Admin.Shopparameters.Feature'),
                'align' => 'text-center',
                'active' => 'sendEmail',
                'type' => 'bool',
                'ajax' => true,
                'orderby' => false,
                'class' => 'fixed-width-sm',
            ],
            'delivery' => [
                'title' => $this->trans('Delivery', [], 'Admin.Global'),
                'align' => 'text-center',
                'active' => 'delivery',
                'type' => 'bool',
                'ajax' => true,
                'orderby' => false,
                'class' => 'fixed-width-sm',
            ],
            'invoice' => [
                'title' => $this->trans('Invoice', [], 'Admin.Global'),
                'align' => 'text-center',
                'active' => 'invoice',
                'type' => 'bool',
                'ajax' => true,
                'orderby' => false,
                'class' => 'fixed-width-sm',
            ],
            'visible_in_select_box' => [
                'title' => 'Is zichtbaar in select-box',
                'align' => 'text-center',
                'type' => 'bool',
                'orderby' => false,
                'search' => true,
                'class' => 'fixed-width-sm',
            ],
            'template' => [
                'title' => $this->trans('Email template', [], 'Admin.Shopparameters.Feature')
            ]
        ];
    }

    public function renderForm()
    {
        $this->fields_form = [
            'tinymce' => true,
            'legend' => [
                'title' => $this->trans('Order status', [], 'Admin.Shopparameters.Feature'),
                'icon' => 'icon-time',
            ],
            'input' => [
                [
                    'type' => 'text',
                    'label' => $this->trans('Status name', [], 'Admin.Shopparameters.Feature'),
                    'name' => 'name',
                    'lang' => true,
                    'required' => true,
                    'hint' => [
                        $this->trans('Order status (e.g. \'Pending\').', [], 'Admin.Shopparameters.Help'),
                        $this->trans('Invalid characters: numbers and', [], 'Admin.Shopparameters.Help') . ' !<>,;?=+()@#"{}_$%:',
                    ],
                ],
                [
                    'type' => 'file',
                    'label' => $this->trans('Icon', [], 'Admin.Shopparameters.Feature'),
                    'name' => 'icon',
                    'hint' => $this->trans('Upload an icon from your computer (File type: .gif, suggested size: 16x16).', [], 'Admin.Shopparameters.Help'),
                ],
                [
                    'type' => 'color',
                    'label' => $this->trans('Color', [], 'Admin.Shopparameters.Feature'),
                    'name' => 'color',
                    'hint' => $this->trans('Status will be highlighted in this color. HTML colors only.', [], 'Admin.Shopparameters.Help') . ' "lightblue", "#CC6600")',
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'logable',
                    'values' => [
                        'query' => [
                            ['id' => 'on', 'name' => $this->trans('Consider the associated order as validated.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'invoice',
                    'values' => [
                        'query' => [
                            ['id' => 'on', 'name' => $this->trans('Allow a customer to download and view PDF versions of their invoices.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'hidden',
                    'values' => [
                        'query' => [
                            ['id' => 'on', 'name' => $this->trans('Hide this status in all customer orders.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'send_email',
                    'values' => [
                        'query' => [
                            ['id' => 'on', 'name' => $this->trans('Send an email to the customer when their order status has changed.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'pdf_invoice',
                    'values' => [
                        'query' => [
                            ['id' => 'on',  'name' => $this->trans('Attach invoice PDF to email.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'pdf_delivery',
                    'values' => [
                        'query' => [
                            ['id' => 'on',  'name' => $this->trans('Attach delivery slip PDF to email.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'shipped',
                    'values' => [
                        'query' => [
                            ['id' => 'on',  'name' => $this->trans('Set the order as shipped.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'paid',
                    'values' => [
                        'query' => [
                            ['id' => 'on', 'name' => $this->trans('Set the order as paid.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],
                [
                    'type' => 'checkbox',
                    'name' => 'delivery',
                    'values' => [
                        'query' => [
                            ['id' => 'on', 'name' => $this->trans('Show delivery PDF.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],[
                    'type' => 'checkbox',
                    'name' => 'visible_in_select_box',
                    'values' => [
                        'query' => [
                            ['id' => 'on', 'name' => $this->trans('Zichtbaar in selectbox in de backoffice.', [], 'Admin.Shopparameters.Feature'), 'val' => '1'],
                        ],
                        'id' => 'id',
                        'name' => 'name',
                    ],
                ],[
                    'type' => 'select_template',
                    'label' => $this->trans('Template', [], 'Admin.Shopparameters.Feature'),
                    'name' => 'template',
                    'lang' => true,
                    'options' => [
                        'query' => $this->getTemplates(),
                        'id' => 'id',
                        'name' => 'name',
                        'folder' => 'folder',
                    ],
                    'hint' => [
                        $this->trans('Only letters, numbers and underscores ("_") are allowed.', [], 'Admin.Shopparameters.Help'),
                        $this->trans('Email template for both .html and .txt.', [], 'Admin.Shopparameters.Help'),
                    ],
                ],
            ],
            'submit' => [
                'title' => $this->trans('Save', [], 'Admin.Actions'),
            ],
        ];

        if (Tools::isSubmit('updateorder_state') || Tools::isSubmit('addorder_state')) {
            return $this->renderOrderStatusForm();
        } elseif (Tools::isSubmit('updateorder_return_state') || Tools::isSubmit('addorder_return_state')) {
            return $this->renderOrderReturnsForm();
        } else {
            return AdminControllerCore::renderForm();
        }
    }

    protected function renderOrderStatusForm()
    {
        if (!($obj = $this->loadObject(true))) {
            return;
        }

        $this->fields_value = [
            'logable_on' => $this->getFieldValue($obj, 'logable'),
            'invoice_on' => $this->getFieldValue($obj, 'invoice'),
            'hidden_on' => $this->getFieldValue($obj, 'hidden'),
            'send_email_on' => $this->getFieldValue($obj, 'send_email'),
            'shipped_on' => $this->getFieldValue($obj, 'shipped'),
            'paid_on' => $this->getFieldValue($obj, 'paid'),
            'delivery_on' => $this->getFieldValue($obj, 'delivery'),
            'pdf_delivery_on' => $this->getFieldValue($obj, 'pdf_delivery'),
            'pdf_invoice_on' => $this->getFieldValue($obj, 'pdf_invoice'),
            'visible_in_select_box_on' => $this->getFieldValue($obj, 'visible_in_select_box'),
        ];

        if ($this->getFieldValue($obj, 'color') !== false) {
            $this->fields_value['color'] = $this->getFieldValue($obj, 'color');
        } else {
            $this->fields_value['color'] = '#ffffff';
        }

        return AdminControllerCore::renderForm();
    }

    public function postProcess()
    {
        if (Tools::isSubmit($this->table . 'Orderby') || Tools::isSubmit($this->table . 'Orderway')) {
            $this->filter = true;
        }

        if (Tools::isSubmit('submitAddorder_return_state')) {
            if (!$this->access('add')) {
                return;
            }

            $id_order_return_state = Tools::getValue('id_order_return_state');

            // Create Object OrderReturnState
            $order_return_state = new OrderReturnState((int) $id_order_return_state);

            $order_return_state->color = Tools::getValue('color');
            $order_return_state->name = [];
            foreach (Language::getIDs(false) as $id_lang) {
                $order_return_state->name[$id_lang] = Tools::getValue('name_' . $id_lang);
            }

            // Update object
            if (!$order_return_state->save()) {
                $this->errors[] = $this->trans('An error has occurred: Can\'t save the current order\'s return status.', [], 'Admin.Orderscustomers.Notification');
            } else {
                Tools::redirectAdmin(self::$currentIndex . '&conf=4&token=' . $this->token);
            }
        }

        if (Tools::isSubmit('submitBulkdeleteorder_return_state')) {
            if (!$this->access('delete')) {
                return;
            }

            $this->className = 'OrderReturnState';
            $this->table = 'order_return_state';
            $this->boxes = Tools::getValue('order_return_stateBox');
            $this->deleted = false;
            AdminControllerCore::processBulkDelete();
        }

        if (Tools::isSubmit('deleteorder_return_state')) {
            if (!$this->access('delete')) {
                return;
            }

            $id_order_return_state = Tools::getValue('id_order_return_state');

            // Create Object OrderReturnState
            $order_return_state = new OrderReturnState((int) $id_order_return_state);

            if (!$order_return_state->delete()) {
                $this->errors[] = $this->trans('An error has occurred: Can\'t delete the current order\'s return status.', [], 'Admin.Orderscustomers.Notification');
            } else {
                Tools::redirectAdmin(self::$currentIndex . '&conf=1&token=' . $this->token);
            }
        }

        if (Tools::isSubmit('submitAdd' . $this->table)) {
            if (!$this->access('add')) {
                return;
            }

            $langIds = Language::getIDs(false);
            $langDefault = (int) Configuration::get('PS_LANG_DEFAULT');
            foreach ($langIds as $id_lang) {
                $name = (string) Tools::getValue('name_' . $id_lang);
                if (empty($name)) {
                    $name = (string) Tools::getValue('name_' . $langDefault);
                }

                $exists = OrderState::existsLocalizedNameInDatabase(
                    $name,
                    (int) $id_lang,
                    Tools::getIsset('id_order_state') ? (int) Tools::getValue('id_order_state') : null
                );
                if ($exists) {
                    $this->errors[] = $this->trans('This name already exists.', [], 'Admin.Design.Notification');
                    break;
                }
            }

            $this->deleted = false; // Disabling saving historisation
            $_POST['invoice'] = (int) Tools::getValue('invoice_on');
            $_POST['logable'] = (int) Tools::getValue('logable_on');
            $_POST['send_email'] = (int) Tools::getValue('send_email_on');
            $_POST['hidden'] = (int) Tools::getValue('hidden_on');
            $_POST['shipped'] = (int) Tools::getValue('shipped_on');
            $_POST['paid'] = (int) Tools::getValue('paid_on');
            $_POST['delivery'] = (int) Tools::getValue('delivery_on');
            $_POST['pdf_delivery'] = (int) Tools::getValue('pdf_delivery_on');
            $_POST['pdf_invoice'] = (int) Tools::getValue('pdf_invoice_on');
            $_POST['visible_in_select_box'] = (int) Tools::getValue('visible_in_select_box_on');
            if (!$_POST['send_email']) {
                foreach ($langIds as $id_lang) {
                    $_POST['template_' . $id_lang] = '';
                }
            }

            return AdminControllerCore::postProcess();
        } elseif (Tools::isSubmit('delete' . $this->table)) {
            if (!$this->access('delete')) {
                return;
            }

            $order_state = new OrderState(Tools::getValue('id_order_state'), $this->context->language->id);
            if (!$order_state->isRemovable()) {
                $this->errors[] = $this->trans('For security reasons, you cannot delete default order statuses.', [], 'Admin.Shopparameters.Notification');
            } else {
                return AdminControllerCore::postProcess();
            }
        } elseif (Tools::isSubmit('submitBulkdelete' . $this->table)) {
            if (!$this->access('delete')) {
                return;
            }

            foreach (Tools::getValue($this->table . 'Box', []) as $selection) {
                $order_state = new OrderState((int) $selection, $this->context->language->id);
                if (!$order_state->isRemovable()) {
                    $this->errors[] = $this->trans('For security reasons, you cannot delete default order statuses.', [], 'Admin.Shopparameters.Notification');

                    break;
                }
            }

            if (!count($this->errors)) {
                return AdminControllerCore::postProcess();
            }
        } else {
            return AdminControllerCore::postProcess();
        }
        return AdminControllerCore::postProcess();
    }


}
