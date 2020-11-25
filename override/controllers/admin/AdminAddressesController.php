<?php
/**
 * Overide to add house_number to address form and functions.
 */
class AdminAddressesController extends AdminAddressesControllerCore
{
    public function renderForm()
    {
        $this->fields_form = [
            'legend' => [
                'title' => $this->trans('Addresses', [], 'Admin.Orderscustomers.Feature'),
                'icon' => 'icon-envelope-alt',
            ],
            'input' => [
                [
                    'type' => 'text_customer',
                    'label' => $this->trans('Customer', [], 'Admin.Global'),
                    'name' => 'id_customer',
                    'required' => false,
                ],
                [
                    'type' => 'text',
                    'label' => $this->trans('Identification number', [], 'Admin.Orderscustomers.Feature'),
                    'name' => 'dni',
                    'required' => false,
                    'col' => '4',
                    'hint' => $this->trans('The national ID card number of this person, or a unique tax identification number.', [], 'Admin.Orderscustomers.Feature'),
                ],
                [
                    'type' => 'text',
                    'label' => $this->trans('Address alias', [], 'Admin.Orderscustomers.Feature'),
                    'name' => 'alias',
                    'required' => true,
                    'col' => '4',
                    'hint' => $this->trans('Invalid characters:', [], 'Admin.Notifications.Info').' &lt;&gt;;=#{}',
                ],
                [
                    'type' => 'textarea',
                    'label' => $this->trans('Other', [], 'Admin.Global'),
                    'name' => 'other',
                    'required' => false,
                    'cols' => 15,
                    'rows' => 3,
                    'hint' => $this->trans('Invalid characters:', [], 'Admin.Notifications.Info').' &lt;&gt;;=#{}',
                ],
                [
                    'type' => 'hidden',
                    'name' => 'id_order',
                ],
                [
                    'type' => 'hidden',
                    'name' => 'address_type',
                ],
                [
                    'type' => 'hidden',
                    'name' => 'back',
                ],
            ],
            'submit' => [
                'title' => $this->trans('Save', [], 'Admin.Actions'),
            ],
        ];

        $this->fields_value['address_type'] = (int) Tools::getValue('address_type', 1);

        $id_customer = (int) Tools::getValue('id_customer');
        if (! $id_customer && Validate::isLoadedObject($this->object)) {
            $id_customer = $this->object->id_customer;
        }
        if ($id_customer) {
            $customer = new Customer((int) $id_customer);
        }

        $this->tpl_form_vars = [
            'customer' => isset($customer) ? $customer : null,
            'customer_view_url' => $this->context->link->getAdminLink('AdminCustomers', true, [], [
                'viewcustomer' => 1,
                'id_customer' => $id_customer,
            ]),
            'back_url' => urldecode(Tools::getValue('back')),
        ];

        // Order address fields depending on country format
        $addresses_fields = $this->processAddressFormat();
        // we use  delivery address
        $addresses_fields = $addresses_fields['dlv_all_fields'];

        // get required field
        $required_fields = AddressFormat::getFieldsRequired();

        // Merge with field required
        $addresses_fields = array_unique(array_merge($addresses_fields, $required_fields));

        $temp_fields = [];

        foreach ($addresses_fields as $addr_field_item) {
            if ($addr_field_item == 'company') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('Company', [], 'Admin.Global'),
                    'name' => 'company',
                    'required' => in_array('company', $required_fields),
                    'col' => '4',
                    'hint' => $this->trans('Invalid characters:', [], 'Admin.Notifications.Info').' &lt;&gt;;=#{}',
                ];
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('VAT number', [], 'Admin.Orderscustomers.Feature'),
                    'col' => '2',
                    'name' => 'vat_number',
                    'required' => in_array('vat_number', $required_fields),
                ];
            } elseif ($addr_field_item == 'lastname') {
                if (isset($customer) &&
                    ! Tools::isSubmit('submit'.strtoupper($this->table)) &&
                    Validate::isLoadedObject($customer) &&
                    ! Validate::isLoadedObject($this->object)) {
                    $default_value = $customer->lastname;
                } else {
                    $default_value = '';
                }

                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('Last Name', [], 'Admin.Global'),
                    'name' => 'lastname',
                    'required' => true,
                    'col' => '4',
                    'hint' => $this->trans('Invalid characters:', [], 'Admin.Notifications.Info').' 0-9!&amp;lt;&amp;gt;,;?=+()@#"�{}_$%:',
                    'default_value' => $default_value,
                ];
            } elseif ($addr_field_item == 'firstname') {
                if (isset($customer) &&
                    ! Tools::isSubmit('submit'.strtoupper($this->table)) &&
                    Validate::isLoadedObject($customer) &&
                    ! Validate::isLoadedObject($this->object)) {
                    $default_value = $customer->firstname;
                } else {
                    $default_value = '';
                }

                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('First Name', [], 'Admin.Global'),
                    'name' => 'firstname',
                    'required' => true,
                    'col' => '4',
                    'hint' => $this->trans('Invalid characters:', [], 'Admin.Notifications.Info').' 0-9!&amp;lt;&amp;gt;,;?=+()@#"�{}_$%:',
                    'default_value' => $default_value,
                ];
            } elseif ($addr_field_item == 'address1') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('Address', [], 'Admin.Global'),
                    'name' => 'address1',
                    'col' => '6',
                    'required' => true,
                ];
            } elseif ($addr_field_item == 'house_number') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('House number', [], 'Admin.Orderscustomers.Feature'),
                    'name' => 'house_number',
                    'required' => true,
                    'col' => '4',
                    'hint' => $this->trans('House number', [], 'Admin.Orderscustomers.Feature'),
                ];
            } elseif ($addr_field_item == 'house_number_extension') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('House number extension', [], 'Admin.Orderscustomers.Feature'),
                    'name' => 'house_number_extension',
                    'required' => false,
                    'col' => '4',
                    'hint' => $this->trans('House number extension', [], 'Admin.Orderscustomers.Feature'),
                ];
            } elseif ($addr_field_item == 'address2') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('Address', [], 'Admin.Global').' (2)',
                    'name' => 'address2',
                    'col' => '6',
                    'required' => in_array('address2', $required_fields),
                ];
            } elseif ($addr_field_item == 'postcode') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('Zip/postal code', [], 'Admin.Global'),
                    'name' => 'postcode',
                    'col' => '2',
                    'required' => true,
                ];
            } elseif ($addr_field_item == 'city') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('City', [], 'Admin.Global'),
                    'name' => 'city',
                    'col' => '4',
                    'required' => true,
                ];
            } elseif ($addr_field_item == 'country' || $addr_field_item == 'Country:name') {
                $temp_fields[] = [
                    'type' => 'select',
                    'label' => $this->trans('Country', [], 'Admin.Global'),
                    'name' => 'id_country',
                    'required' => in_array('Country:name', $required_fields) || in_array('country', $required_fields),
                    'col' => '4',
                    'default_value' => (int) $this->context->country->id,
                    'options' => [
                        'query' => Country::getCountries($this->context->language->id),
                        'id' => 'id_country',
                        'name' => 'name',
                    ],
                ];
                $temp_fields[] = [
                    'type' => 'select',
                    'label' => $this->trans('State', [], 'Admin.Global'),
                    'name' => 'id_state',
                    'required' => false,
                    'col' => '4',
                    'options' => [
                        'query' => [],
                        'id' => 'id_state',
                        'name' => 'name',
                    ],
                ];
            } elseif ($addr_field_item == 'phone') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('Home phone', [], 'Admin.Global'),
                    'name' => 'phone',
                    'required' => true,
                    'col' => '4',
                ];
            } elseif ($addr_field_item == 'phone_mobile') {
                $temp_fields[] = [
                    'type' => 'text',
                    'label' => $this->trans('Mobile phone', [], 'Admin.Global'),
                    'name' => 'phone_mobile',
                    'required' => in_array('phone_mobile', $required_fields),
                    'col' => '4',
                ];
            }
        }

        // merge address format with the rest of the form
        array_splice($this->fields_form['input'], 3, 0, $temp_fields);

        return AdminController::renderForm();
    }
}
