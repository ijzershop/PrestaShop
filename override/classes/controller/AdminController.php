<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
use PrestaShop\PrestaShop\Core\Feature\TokenInUrls;

class AdminController extends AdminControllerCore
{
    /**
     * Check for security token.
     *
     * @return bool
     */
    public function checkToken()
    {
        if (TokenInUrls::isDisabled() || $this->isAnonymousAllowed()) {
            return true;
        }

        $token = Tools::getValue('token');

        if ($token === $this->token || $token === Configuration::get('MODERNESMIDTHEMECONFIGURATOR_TOKEN')) {
            return true;
        }

        if (count($_POST) || !isset($_GET['controller']) || !Validate::isControllerName($_GET['controller']) || !$token) {
            return false;
        }

        foreach ($_GET as $key => $value) {
            if (is_array($value) || !in_array($key, array('controller', 'controllerUri'))) {
                return false;
            }
        }

        $cookie = Context::getContext()->cookie;
        $whitelist = array('date_add', 'id_lang', 'id_employee', 'email', 'profile', 'passwd', 'remote_addr', 'shopContext', 'collapse_menu', 'checksum');
        foreach ($cookie->getAll() as $key => $value) {
            if (!in_array($key, $whitelist)) {
                unset($cookie->$key);
            }
        }

        $cookie->write();

        return true;
    }


    /**
     * Retrieve GET and POST value and translate them to actions.
     */
    public function initProcess()
    {
        if (!isset($this->list_id)) {
            $this->list_id = $this->table;
        }

        // Manage list filtering
        if (Tools::isSubmit('submitFilter' . $this->list_id)
            || $this->context->cookie->{'submitFilter' . $this->list_id} !== false
            || Tools::getValue($this->list_id . 'Orderby')
            || Tools::getValue($this->list_id . 'Orderway')) {
            $this->filter = true;
        }

        if($this->context->controller->controller_name == 'AdminOrders') {
            //Set default date filter to shorten tabel rows length, and remove filter when clicked on remove all filters button
            switch (strval(Tools::getValue('submitFilterorder'))) {
                case '0':
                    $this->filter = false;
                    $this->context->cookie->__set('ordersorderFilter_a!date_add', '');
                    $this->context->cookie->write();
                    break;
                case 'false':
                    $this->filter = true;
                    $this->context->cookie->__set('submitFilterorder', '1');
                    $this->context->cookie->__set('ordersorderFilter_a!date_add',
                        '["' . date('Y-m-d', strtotime(Configuration::get('MODERNESMIDTHEMECONFIGURATOR_ORDERLIST_FILTER_TIME', null, null, null, '-4 weeks'))) . '","' . date('Y-m-d', strtotime('now')) . '"]');
                    $this->context->cookie->write();
                    break;
                default:
                    $this->filter = true;
                    $current_date_filter = $this->context->cookie->__get('ordersorderFilter_a!date_add');
                    if (strlen($current_date_filter) > 0) {
                        $this->context->cookie->__set('ordersorderFilter_a!date_add', $current_date_filter);
                    } else {
                        $this->context->cookie->__set('ordersorderFilter_a!date_add',
                            '["' . date('Y-m-d', strtotime(Configuration::get('MODERNESMIDTHEMECONFIGURATOR_ORDERLIST_FILTER_TIME', null, null, null, '-4 weeks'))) . '","' . date('Y-m-d',
                                strtotime('now')) . '"]');
                    }
                    $this->context->cookie->write();
                    break;
            }
        }

        $this->id_object = (int) Tools::getValue($this->identifier);

        /* Delete object image */
        if (isset($_GET['deleteImage'])) {
            if ($this->access('delete')) {
                $this->action = 'delete_image';
            } else {
                $this->errors[] = $this->trans('You do not have permission to delete this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (isset($_GET['delete' . $this->table])) {
            /* Delete object */
            if ($this->access('delete')) {
                $this->action = 'delete';
            } else {
                $this->errors[] = $this->trans('You do not have permission to delete this.', array(), 'Admin.Notifications.Error');
            }
        } elseif ((isset($_GET['status' . $this->table]) || isset($_GET['status'])) && Tools::getValue($this->identifier)) {
            /* Change object statuts (active, inactive) */
            if ($this->access('edit')) {
                $this->action = 'status';
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (isset($_GET['position'])) {
            /* Move an object */
            if ($this->access('edit') == '1') {
                $this->action = 'position';
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('submitAdd' . $this->table)
            || Tools::isSubmit('submitAdd' . $this->table . 'AndStay')
            || Tools::isSubmit('submitAdd' . $this->table . 'AndPreview')
            || Tools::isSubmit('submitAdd' . $this->table . 'AndBackToParent')) {
            // case 1: updating existing entry
            if ($this->id_object) {
                if ($this->access('edit')) {
                    $this->action = 'save';
                    if (Tools::isSubmit('submitAdd' . $this->table . 'AndStay')) {
                        $this->display = 'edit';
                    } else {
                        $this->display = 'list';
                    }
                } else {
                    $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
                }
            } else {
                // case 2: creating new entry
                if ($this->access('add')) {
                    $this->action = 'save';
                    if (Tools::isSubmit('submitAdd' . $this->table . 'AndStay')) {
                        $this->display = 'edit';
                    } else {
                        $this->display = 'list';
                    }
                } else {
                    $this->errors[] = $this->trans('You do not have permission to add this.', array(), 'Admin.Notifications.Error');
                }
            }
        } elseif (isset($_GET['add' . $this->table])) {
            if ($this->access('add')) {
                $this->action = 'new';
                $this->display = 'add';
            } else {
                $this->errors[] = $this->trans('You do not have permission to add this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (isset($_GET['update' . $this->table], $_GET[$this->identifier])) {
            $this->display = 'edit';
            if (!$this->access('edit')) {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (isset($_GET['view' . $this->table])) {
            if ($this->access('view')) {
                $this->display = 'view';
                $this->action = 'view';
            } else {
                $this->errors[] = $this->trans('You do not have permission to view this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (isset($_GET['details' . $this->table])) {
            if ($this->access('view')) {
                $this->display = 'details';
                $this->action = 'details';
            } else {
                $this->errors[] = $this->trans('You do not have permission to view this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (isset($_GET['export' . $this->table])) {
            if ($this->access('view')) {
                $this->action = 'export';
            }
        } elseif (isset($_POST['submitReset' . $this->list_id])) {
            /* Cancel all filters for this tab */
            $this->action = 'reset_filters';
        } elseif (Tools::isSubmit('submitOptions' . $this->table) || Tools::isSubmit('submitOptions')) {
            /* Submit options list */
            $this->display = 'options';
            if ($this->access('edit')) {
                $this->action = 'update_options';
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::getValue('action') && method_exists($this, 'process' . ucfirst(Tools::toCamelCase(Tools::getValue('action'))))) {
            $this->action = Tools::getValue('action');
        } elseif (Tools::isSubmit('submitFields') && $this->required_database && $this->access('add') && $this->access('delete')) {
            $this->action = 'update_fields';
        } elseif (is_array($this->bulk_actions)) {
            $submit_bulk_actions = array_merge(array(
                'enableSelection' => array(
                    'text' => $this->l('Enable selection'),
                    'icon' => 'icon-power-off text-success',
                ),
                'disableSelection' => array(
                    'text' => $this->l('Disable selection'),
                    'icon' => 'icon-power-off text-danger',
                ),
            ), $this->bulk_actions);
            foreach ($submit_bulk_actions as $bulk_action => $params) {
                if (Tools::isSubmit('submitBulk' . $bulk_action . $this->table) || Tools::isSubmit('submitBulk' . $bulk_action)) {
                    if ($bulk_action === 'delete') {
                        if ($this->access('delete')) {
                            $this->action = 'bulk' . $bulk_action;
                            $this->boxes = Tools::getValue($this->table . 'Box');
                            if (empty($this->boxes) && $this->table == 'attribute') {
                                $this->boxes = Tools::getValue($this->table . '_valuesBox');
                            }
                        } else {
                            $this->errors[] = $this->trans('You do not have permission to delete this.', array(), 'Admin.Notifications.Error');
                        }

                        break;
                    } elseif ($this->access('edit')) {
                        $this->action = 'bulk' . $bulk_action;
                        $this->boxes = Tools::getValue($this->table . 'Box');
                    } else {
                        $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
                    }

                    break;
                } elseif (Tools::isSubmit('submitBulk')) {
                    if ($bulk_action === 'delete') {
                        if ($this->access('delete')) {
                            $this->action = 'bulk' . $bulk_action;
                            $this->boxes = Tools::getValue($this->table . 'Box');
                        } else {
                            $this->errors[] = $this->trans('You do not have permission to delete this.', array(), 'Admin.Notifications.Error');
                        }

                        break;
                    } elseif ($this->access('edit')) {
                        $this->action = 'bulk' . Tools::getValue('select_submitBulk');
                        $this->boxes = Tools::getValue($this->table . 'Box');
                    } else {
                        $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
                    }

                    break;
                }
            }
        } elseif (!empty($this->fields_options) && empty($this->fields_list)) {
            $this->display = 'options';
        }
    }


}
