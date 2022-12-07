<?php
/**
 * 2007-2019 PrestaShop and Contributors
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
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

class AdminOrdersController extends AdminOrdersControllerCore
{

    public function __construct()
    {
        $this->bootstrap = true;
        $this->table = 'order';
        $this->className = 'Order';
        $this->lang = false;
        $this->addRowAction('view');
        $this->explicitSelect = true;
        $this->allow_export = true;
        $this->deleted = false;

        parent::__construct();

        $this->_select = '
		a.id_currency,
		a.id_order AS id_pdf,
        a.id_order AS id_retour_order,
		CONCAT(LEFT(c.`firstname`, 1), \'. \', c.`lastname`) AS `customer`,
		osl.`name` AS `osname`,
        osl.`id_order_state` AS `osorderstate`,
		os.`color`,
        osr.`state` as `osrorderstate`,
        `reference` as `ref`,
        `reference` as `reference`,
		IF((SELECT so.id_order FROM `' . _DB_PREFIX_ . 'orders` so WHERE so.id_customer = a.id_customer AND so.id_order < a.id_order LIMIT 1) > 0, 0, 1) as new,
		country_lang.name as cname,
		IF(a.valid, 1, 0) badge_success';

        $this->_join = '
		LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (c.`id_customer` = a.`id_customer`)
		INNER JOIN `' . _DB_PREFIX_ . 'address` address ON address.id_address = a.id_address_delivery
		INNER JOIN `' . _DB_PREFIX_ . 'country` country ON address.id_country = country.id_country
		INNER JOIN `' . _DB_PREFIX_ . 'country_lang` country_lang ON (country.`id_country` = country_lang.`id_country` AND country_lang.`id_lang` = ' . (int) $this->context->language->id . ')
		LEFT JOIN `' . _DB_PREFIX_ . 'order_state` os ON (os.`id_order_state` = a.`current_state`)
        LEFT JOIN `' . _DB_PREFIX_ . 'order_return` osr ON (osr.`state` = a.`current_state`)
		LEFT JOIN `' . _DB_PREFIX_ . 'order_state_lang` osl ON (os.`id_order_state` = osl.`id_order_state` AND osl.`id_lang` = ' . (int) $this->context->language->id . ')';
        $this->_orderBy = 'id_order';
        $this->_orderWay = 'DESC';
        $this->_use_found_rows = true;

        $statuses = OrderState::getOrderStates((int) $this->context->language->id);
        foreach ($statuses as $status) {
            $this->statuses_array[$status['id_order_state']] = $status['name'];
        }

        $this->fields_list = array(
            'id_order' => array(
                'title' => $this->trans('ID', array(), 'Admin.Global'),
                'align' => 'text-center',
                'class' => 'fixed-width-xs',
            ),
            'reference' => array(
                'title' => $this->trans('Reference', array(), 'Admin.Global'),
            ),
            'ref' => array(
                'title' => $this->trans('Toegevoegde orders', array(), 'Admin.Global'),
                'callback' => 'renderAddedOrders',
            ),
            'added_to_order' => array(
                'title' => $this->trans('Toegevoegd aan order', array(), 'Admin.Global'),
                'callback' => 'renderAddedToOrder',
            ),
            'new' => array(
                'title' => $this->trans('New client', array(), 'Admin.Orderscustomers.Feature'),
                'align' => 'text-center',
                'type' => 'bool',
                'tmpTableFilter' => true,
                'orderby' => false,
            ),
            'customer' => array(
                'title' => $this->trans('Customer', array(), 'Admin.Global'),
                'havingFilter' => true,
            ),
        );

        if (Configuration::get('PS_B2B_ENABLE')) {
            $this->fields_list = array_merge($this->fields_list, array(
                'company' => array(
                    'title' => $this->trans('Company', array(), 'Admin.Global'),
                    'filter_key' => 'c!company',
                ),
            ));
        }

        $this->fields_list = array_merge($this->fields_list, array(
            'total_paid_tax_incl' => array(
                'title' => $this->trans('Total', array(), 'Admin.Global'),
                'align' => 'text-right',
                'type' => 'price',
                'currency' => true,
                'callback' => 'setOrderCurrency',
                'badge_success' => true,
            ),
            'payment' => array(
                'title' => $this->trans('Payment', array(), 'Admin.Global'),
            ),
            'osname' => array(
                'title' => $this->trans('Status', array(), 'Admin.Global'),
                'type' => 'select',
                'color' => 'color',
                'list' => $this->statuses_array,
                'filter_key' => 'os!id_order_state',
                'filter_type' => 'int',
                'order_key' => 'osname',
            ),
            'date_add' => array(
                'title' => $this->trans('Date', array(), 'Admin.Global'),
                'align' => 'text-right',
                'type' => 'datetime',
                'filter_key' => 'a!date_add',
            ),
            'id_pdf' => array(
                'title' => $this->trans('PDF', array(), 'Admin.Global'),
                'align' => 'text-center',
                'callback' => 'printPDFIcons',
                'orderby' => false,
                'search' => false,
                'remove_onclick' => true,
            ),
            'id_retour_order' => array(
                'title' => $this->trans('Retour order', array(), 'Admin.Global'),
                'align' => 'text-center',
                'callback' => 'printRetourButton',
                'orderby' => false,
                'search' => false
            ),
        ));

        if (Country::isCurrentlyUsed('country', true)) {
            $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('
			SELECT DISTINCT c.id_country, cl.`name`
			FROM `' . _DB_PREFIX_ . 'orders` o
			' . Shop::addSqlAssociation('orders', 'o') . '
			INNER JOIN `' . _DB_PREFIX_ . 'address` a ON a.id_address = o.id_address_delivery
			INNER JOIN `' . _DB_PREFIX_ . 'country` c ON a.id_country = c.id_country
			INNER JOIN `' . _DB_PREFIX_ . 'country_lang` cl ON (c.`id_country` = cl.`id_country` AND cl.`id_lang` = ' . (int) $this->context->language->id . ')
			ORDER BY cl.name ASC');

            $country_array = array();
            foreach ($result as $row) {
                $country_array[$row['id_country']] = $row['name'];
            }

            $part1 = array_slice($this->fields_list, 0, 3);
            $part2 = array_slice($this->fields_list, 3);
            $part1['cname'] = array(
                'title' => $this->trans('Delivery', array(), 'Admin.Global'),
                'type' => 'select',
                'list' => $country_array,
                'filter_key' => 'country!id_country',
                'filter_type' => 'int',
                'order_key' => 'cname',
            );
            $this->fields_list = array_merge($part1, $part2);
        }

        //Profile 3 is werplaats medewerkers admin is 1
        $workshopProfiles = Configuration::get('MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES');
        $profiles = array();
        if(!empty($workshopProfiles)){
            $profiles = explode(',', $workshopProfiles);
        }
        if(in_array($this->context->cookie->__get('profile'), $profiles)){
            //disabled array
            $disabledArray = ['cname','new','total_paid_tax_incl','payment','osorderstate','id_pdf'];
            foreach ($this->fields_list as $key => $value) {
                if(in_array($key, $disabledArray)){
                    unset($this->fields_list[$key]);
                }
            }
        }

        $this->shopLinkType = 'shop';
        $this->shopShareDatas = Shop::SHARE_ORDER;

        if (Tools::isSubmit('id_order')) {
            // Save context (in order to apply cart rule)
            $order = new Order((int) Tools::getValue('id_order'));
            $this->context->cart = new Cart($order->id_cart);
            $this->context->customer = new Customer($order->id_customer);
        }

        $this->bulk_actions = array(
            'updateOrderStatus' => array('text' => $this->trans('Change Order Status', array(), 'Admin.Orderscustomers.Feature'), 'icon' => 'icon-refresh'),
        );
    }

    public function printRetourButton($id_order, $tr)
    {
        static $valid_order_state = array();
        $order = new Order($id_order);

        if (!Validate::isLoadedObject($order)) {
            return '';
        }

        $this->context->smarty->assign(array(
            'order' => $order,
            'tr' => $tr,
        ));
        $config = unserialize(Configuration::get("koopmanOrderExport"));
        $states = [];
        if(isset($config['retour_accepted_statusses']) && !empty($config['retour_accepted_statusses'])){
            $states = explode(',', $config['retour_accepted_statusses']);
        }

            if(in_array($order->current_state, $states)){
                //state when the retour is made
                if(in_array($order->current_state, [14])){
                    return 'Retour aangemaakt';
                } else {
                    return '<button type="button" class="btn btn-sm createRetour" data-order-id="'.$id_order.'">Retour aanmaken</button>';
                }
            } else {
                return 'Geen retour mogelijk';
            }
    }


    public function renderAddedOrders($value)
    {
        $result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS('SELECT o.`id_order`, o.`reference`, o.`date_add` FROM `' . _DB_PREFIX_ . 'orders` o WHERE o.`added_to_order` = "'.$value.'" ORDER BY o.`date_add` ASC');

        if(count($result) > 0){
            $orderList = '<ul class="list-unstyled">';
            for ($i=0; $i < count($result); $i++) {
                $orderList .= '<li><strong>'.$result[$i]['reference'].'</strong> - <small data-order-id="'.(int)$result[$i]['id_order'].'">'.date_format(date_create($result[$i]['date_add']),'d M').'</small></li>';
            }
            $orderList .= '</ul>';

            return $orderList;
        } else {
            return '';
        }
    }

    public function renderAddedToOrder($value)
    {
        $refOrder = Order::getByReference($value)->getFirst();
        if(!empty($value)){
            return '<a class="btn btn-default btn-secondary" href="index.php?controller=AdminOrders&vieworder=&id_order='.$refOrder->id.'&token='.Tools::getAdminTokenLite('AdminOrders').'">Toegevoegd aan <br/><strong>'.$value.'</strong></a>';
        } else {
            return '';
        }
    }


    public function ajaxProcessMigrateOrderToCustomer(){
        $email = Tools::getValue('customer_email');
        $customer = Tools::getValue('customer');
        $order = Tools::getValue('order');

        $cust = new Customer;
        $customerObj = $cust->getCustomersByEmail($email);
        if(isset($customerObj[0])){
            if(!is_null($customerObj[0]['id_customer'])){
                $id = $customerObj[0]['id_customer'];
                // Update order and set new customer id
                $result = Db::getInstance()->execute('UPDATE `' . _DB_PREFIX_ . 'orders` SET `id_customer`='.$id.' WHERE `id_order` = '.(int)$order);
                if($result){
                    return die(json_encode(array('success'=>true,'msg'=>'Bestelling gekoppeld aan klant: '. $customer)));
                } else {
                    return die(json_encode(array('success'=>false,'msg'=>'Koppelen van de bestelling aan klant : '. $customer. ' is niet gelukt, probeer het nogmaal')));
                }
            }
        }
        return die(json_encode(array('success'=>false,'msg'=>'Klant met naam: '. $customer.' en email adres: '.$email.' kon niet gevonden worden in de database')));

    }


    public function ajaxProcessSetDesiredDeliveryDate(){
        $order = Tools::getValue('id_order');
        $date = Tools::getValue('date');
            if(!is_null($date)){
                $result = Db::getInstance()->execute("UPDATE `" . _DB_PREFIX_ . "orders` SET `desired_delivery_date`='".$date."' WHERE `id_order` = ".(int)$order);

                if($result){
                    return die(json_encode(array('success'=>true,'msg'=>'Gewenste leverdatum '.$date.' is ingesteld')));
                } else {
                    return die(json_encode(array('success'=>false,'msg'=>'Het instellen van de gewenste leverdatum is niet gelukt')));
                }
            }
            return die(json_encode(array('success'=>false,'msg'=>'U heeft geen datum geselecteerd, selecteer de gewenste leverdatum en probeer opnieuw')));

    }

    public function setMedia($isNewTheme = false)
    {
        parent::setMedia($isNewTheme);

        $this->addJqueryUI('ui.datepicker');
        $this->addJS(_PS_JS_DIR_ . 'vendor/d3.v3.min.js');
        $this->addJS('https://maps.googleapis.com/maps/api/js?key='.Configuration::get('MSTHEMECONFIG_MAPS_KEY', null, null,  null, 'AIzaSyDv2qdzmbvRDXH-zzdqJY87K7y3W1iaMX8'));

        if ($this->access('edit') && $this->display == 'view') {
            $this->addJS(_PS_JS_DIR_ . 'admin/orders.js');
            $this->addJS(_PS_JS_DIR_ . 'tools.js');
            $this->addJqueryPlugin('autocomplete');
        }
    }

    public function ajaxProcessSearchCustomer(){
        $query = Tools::getValue("q");
        $result = [];
        if(!empty($query)){
            $result =  Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
                '
            SELECT CONCAT(`email`, " # ", `firstname`, " ", `lastname`) AS name
            FROM `' . _DB_PREFIX_ . 'customer`
            WHERE 1 ' . Shop::addSqlRestriction(Shop::SHARE_CUSTOMER) .
                ($onlyActive ? ' AND `active` = 1' : '') . '
            AND (`email` LIKE "%'.$query.'%" OR `firstname` LIKE "%'.$query.'%" OR `lastname` LIKE "%'.$query.'%")
            ORDER BY `id_customer` ASC'
            );
        }
        $list = implode("\n",array_map(function($row){ return $row['name']; }, $result));
        die($list);
    }

    public function renderKpis()
    {
        $kpis = array('');
        $helper = new HelperKpiRow();
        $helper->kpis = $kpis;
        return $helper->generate();
    }


    /**
     * Single Stock module overides
     */
    public function postProcess()
    {
        // If id_order is sent, we instanciate a new Order object
        if (Tools::isSubmit('id_order') && Tools::getValue('id_order') > 0) {
            $order = new Order(Tools::getValue('id_order'));
            if (!Validate::isLoadedObject($order)) {
                $this->errors[] = $this->trans('The order cannot be found within your database.', array(), 'Admin.Orderscustomers.Notification');
            }
            ShopUrl::cacheMainDomainForShop((int) $order->id_shop);
        }

        /* Update shipping number and carrier */
        if (Tools::isSubmit('submitShippingNumber') && isset($order)) {
            if ($this->access('edit')) {
                $tracking_number = Tools::getValue('shipping_tracking_number');
                $id_carrier = Tools::getValue('shipping_carrier');
                $old_tracking_number = $order->shipping_number;

                $order_carrier = new OrderCarrier(Tools::getValue('id_order_carrier'));
                if (!Validate::isLoadedObject($order_carrier)) {
                    $this->errors[] = $this->trans('The order carrier ID is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!empty($tracking_number) && !Validate::isTrackingNumber($tracking_number)) {
                    $this->errors[] = $this->trans('The tracking number is incorrect.', array(), 'Admin.Orderscustomers.Notification');
                } else {
                    //update carrier - ONLY if changed - then refresh shipping cost
                    $old_id_carrier = $order_carrier->id_carrier;
                    if (!empty($id_carrier) && $old_id_carrier != $id_carrier) {
                        $order->id_carrier = (int) $id_carrier;
                        $order_carrier->id_carrier = (int) $id_carrier;
                        $order_carrier->update();
                        $order->refreshShippingCost();
                    }

                    //load fresh order carrier because updated just before
                    $order_carrier = new OrderCarrier((int) Tools::getValue('id_order_carrier'));

                    // update shipping number
                    // Keep these two following lines for backward compatibility, remove on 1.6 version
                    $order->shipping_number = $tracking_number;
                    $order->update();

                    // Update order_carrier
                    $order_carrier->tracking_number = pSQL($tracking_number);
                    if ($order_carrier->update()) {
                        //send mail only if tracking number is different AND not empty
                        if (!empty($tracking_number) && $old_tracking_number != $tracking_number) {
                            if ($order_carrier->sendInTransitEmail($order)) {
                                $customer = new Customer((int) $order->id_customer);
                                $carrier = new Carrier((int) $order->id_carrier, $order->id_lang);

                                Hook::exec('actionAdminOrdersTrackingNumberUpdate', array(
                                    'order' => $order,
                                    'customer' => $customer,
                                    'carrier' => $carrier,
                                ), null, false, true, false, $order->id_shop);

                                Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=4&token=' . $this->token);
                            } else {
                                $this->errors[] = $this->trans('An error occurred while sending an email to the customer.', array(), 'Admin.Orderscustomers.Notification');
                            }
                        }
                    } else {
                        $this->errors[] = $this->trans('The order carrier cannot be updated.', array(), 'Admin.Orderscustomers.Notification');
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('submitState') && isset($order)) {
            /* Change order status, add a new entry in order history and send an e-mail to the customer if needed */
            if ($this->access('edit')) {
                $order_state = new OrderState(Tools::getValue('id_order_state'));

                if (!Validate::isLoadedObject($order_state)) {
                    $this->errors[] = $this->trans('The new order status is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } else {
                    $current_order_state = $order->getCurrentOrderState();
                    if ($current_order_state->id != $order_state->id) {
                        // Create new OrderHistory
                        $history = new OrderHistory();
                        $history->id_order = $order->id;
                        $history->id_employee = (int) $this->context->employee->id;

                        $use_existings_payment = false;
                        if (!$order->hasInvoice()) {
                            $use_existings_payment = true;
                        }
                        $history->changeIdOrderState((int) $order_state->id, $order, $use_existings_payment);

                        $carrier = new Carrier($order->id_carrier, $order->id_lang);
                        $templateVars = array();
                        if ($history->id_order_state == Configuration::get('PS_OS_SHIPPING') && $order->shipping_number) {
                            $templateVars = array('{followup}' => str_replace('@', $order->shipping_number, $carrier->url));
                        }

                        // Save all changes
                        if ($history->addWithemail(true, $templateVars)) {
                            // synchronizes quantities if needed..
                            if (Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT')) {
                                foreach ($order->getProducts() as $product) {
                                    if (StockAvailable::dependsOnStock($product['product_id'])) {
                                        StockAvailable::synchronize($product['product_id'], (int) $product['id_shop']);
                                    }
                                }
                            }

                            Tools::redirectAdmin(self::$currentIndex . '&id_order=' . (int) $order->id . '&vieworder&token=' . $this->token);
                        }
                        $this->errors[] = $this->trans('An error occurred while changing order status, or we were unable to send an email to the customer.', array(), 'Admin.Orderscustomers.Notification');
                    } else {
                        $this->errors[] = $this->trans('The order has already been assigned this status.', array(), 'Admin.Orderscustomers.Notification');
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('submitMessage') && isset($order)) {
            // Add a new message for the current order and send an e-mail to the customer if needed
            if ($this->access('edit')) {
                $customer = new Customer(Tools::getValue('id_customer'));
                if (!Validate::isLoadedObject($customer)) {
                    $this->errors[] = $this->trans('The customer is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!Tools::getValue('message')) {
                    $this->errors[] = $this->trans('The message cannot be blank.', array(), 'Admin.Orderscustomers.Notification');
                } else {
                    /* Get message rules and and check fields validity */
                    $rules = call_user_func(array('Message', 'getValidationRules'), 'Message');
                    foreach ($rules['required'] as $field) {
                        if (($value = Tools::getValue($field)) == false && (string) $value != '0') {
                            if (!Tools::getValue('id_' . $this->table) || $field != 'passwd') {
                                $this->errors[] = $this->trans('field %s is required.', array('%s' => $field), 'Admin.Orderscustomers.Notification');
                            }
                        }
                    }
                    foreach ($rules['size'] as $field => $maxLength) {
                        if (Tools::getValue($field) && Tools::strlen(Tools::getValue($field)) > $maxLength) {
                            $this->errors[] = $this->trans(
                                'The %1$s field is too long (%2$d chars max).',
                                array(
                                    '%1$s' => $field,
                                    '%2$d' => $maxLength,
                                ),
                                'Admin.Notifications.Error'
                            );
                        }
                    }
                    foreach ($rules['validate'] as $field => $function) {
                        if (Tools::getValue($field)) {
                            if (!Validate::$function(htmlentities(Tools::getValue($field), ENT_COMPAT, 'UTF-8'))) {
                                $this->errors[] = $this->trans('The %s field is invalid.', array('%s' => $field), 'Admin.Notifications.Error');
                            }
                        }
                    }

                    if (!count($this->errors)) {
                        //check if a thread already exist
                        $id_customer_thread = CustomerThread::getIdCustomerThreadByEmailAndIdOrder($customer->email, $order->id);
                        if (!$id_customer_thread) {
                            $customer_thread = new CustomerThread();
                            $customer_thread->id_contact = 0;
                            $customer_thread->id_customer = (int) $order->id_customer;
                            $customer_thread->id_shop = (int) $this->context->shop->id;
                            $customer_thread->id_order = (int) $order->id;
                            $customer_thread->id_lang = (int) $this->context->language->id;
                            $customer_thread->email = $customer->email;
                            $customer_thread->status = 'open';
                            $customer_thread->token = Tools::passwdGen(12);
                            $customer_thread->add();
                        } else {
                            $customer_thread = new CustomerThread((int) $id_customer_thread);
                        }

                        $customer_message = new CustomerMessage();
                        $customer_message->id_customer_thread = $customer_thread->id;
                        $customer_message->id_employee = (int) $this->context->employee->id;
                        $customer_message->message = Tools::getValue('message');
                        $customer_message->private = Tools::getValue('visibility');

                        if (!$customer_message->add()) {
                            $this->errors[] = $this->trans('An error occurred while saving the message.', array(), 'Admin.Notifications.Error');
                        } elseif ($customer_message->private) {
                            Tools::redirectAdmin(self::$currentIndex . '&id_order=' . (int) $order->id . '&vieworder&conf=11&token=' . $this->token);
                        } else {
                            $message = $customer_message->message;
                            if (Configuration::get('PS_MAIL_TYPE', null, null, $order->id_shop) != Mail::TYPE_TEXT) {
                                $message = Tools::nl2br($customer_message->message);
                            }

                            $orderLanguage = new Language((int) $order->id_lang);
                            $varsTpl = array(
                                '{lastname}' => $customer->lastname,
                                '{firstname}' => $customer->firstname,
                                '{id_order}' => $order->id,
                                '{order_name}' => $order->getUniqReference(),
                                '{message}' => $message,
                            );

                            if (@Mail::Send(
                                (int) $order->id_lang,
                                'order_merchant_comment',
                                $this->trans(
                                    'New message regarding your order',
                                    array(),
                                    'Emails.Subject',
                                    $orderLanguage->locale
                                ),
                                $varsTpl,
                                $customer->email,
                                $customer->firstname . ' ' . $customer->lastname,
                                null,
                                null,
                                null,
                                null,
                                _PS_MAIL_DIR_,
                                true,
                                (int) $order->id_shop)
                            ) {
                                Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=11' . '&token=' . $this->token);
                            }
                        }
                        $this->errors[] = $this->trans('An error occurred while sending an email to the customer.', array(), 'Admin.Orderscustomers.Notification');
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to delete this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('partialRefund') && isset($order)) {
            // Partial refund from order
            if ($this->access('edit')) {
                if (Tools::isSubmit('partialRefundProduct') && ($refunds = Tools::getValue('partialRefundProduct')) && is_array($refunds)) {
                    $amount = 0;
                    $order_detail_list = array();
                    $full_quantity_list = array();
                    foreach ($refunds as $id_order_detail => $amount_detail) {
                        $quantity = Tools::getValue('partialRefundProductQuantity');
                        if (!$quantity[$id_order_detail]) {
                            continue;
                        }

                        $full_quantity_list[$id_order_detail] = (int) $quantity[$id_order_detail];

                        $order_detail_list[$id_order_detail] = array(
                            'quantity' => (int) $quantity[$id_order_detail],
                            'id_order_detail' => (int) $id_order_detail,
                        );

                        $order_detail = new OrderDetail((int) $id_order_detail);
                        if (empty($amount_detail)) {
                            $order_detail_list[$id_order_detail]['unit_price'] = (!Tools::getValue('TaxMethod') ? $order_detail->unit_price_tax_excl : $order_detail->unit_price_tax_incl);
                            $order_detail_list[$id_order_detail]['amount'] = $order_detail->unit_price_tax_incl * $order_detail_list[$id_order_detail]['quantity'];
                        } else {
                            $order_detail_list[$id_order_detail]['amount'] = (float) str_replace(',', '.', $amount_detail);
                            $order_detail_list[$id_order_detail]['unit_price'] = $order_detail_list[$id_order_detail]['amount'] / $order_detail_list[$id_order_detail]['quantity'];
                        }
                        $amount += $order_detail_list[$id_order_detail]['amount'];
                        if (!$order->hasBeenDelivered() || ($order->hasBeenDelivered() && Tools::isSubmit('reinjectQuantities')) && $order_detail_list[$id_order_detail]['quantity'] > 0) {
                            $this->reinjectQuantity($order_detail, $order_detail_list[$id_order_detail]['quantity']);

                            /* Start SSA module */
                            $ssa = Module::getInstanceByName('singlestockattributespoco');
                            if ($ssa && $ssa->active) {
                                $ssa->updateStock($order_detail->product_id, $order_detail->product_attribute_id, $order_detail_list[$id_order_detail]['quantity'], false);
                            }
                            /* End SSA module */
                        }
                    }

                    $shipping_cost_amount = (float) str_replace(',', '.', Tools::getValue('partialRefundShippingCost')) ? (float) str_replace(',', '.', Tools::getValue('partialRefundShippingCost')) : false;

                    if ($amount == 0 && $shipping_cost_amount == 0) {
                        if (!empty($refunds)) {
                            $this->errors[] = $this->trans('Please enter a quantity to proceed with your refund.', array(), 'Admin.Orderscustomers.Notification');
                        } else {
                            $this->errors[] = $this->trans('Please enter an amount to proceed with your refund.', array(), 'Admin.Orderscustomers.Notification');
                        }

                        return false;
                    }

                    $choosen = false;
                    $voucher = 0;

                    if ((int) Tools::getValue('refund_voucher_off') == 1) {
                        $amount -= $voucher = (float) Tools::getValue('order_discount_price');
                    } elseif ((int) Tools::getValue('refund_voucher_off') == 2) {
                        $choosen = true;
                        $amount = $voucher = (float) Tools::getValue('refund_voucher_choose');
                    }

                    if ($shipping_cost_amount > 0) {
                        if (!Tools::getValue('TaxMethod')) {
                            $tax = new Tax();
                            $tax->rate = $order->carrier_tax_rate;
                            $tax_calculator = new TaxCalculator(array($tax));
                            $amount += $tax_calculator->addTaxes($shipping_cost_amount);
                        } else {
                            $amount += $shipping_cost_amount;
                        }
                    }

                    $order_carrier = new OrderCarrier((int) $order->getIdOrderCarrier());
                    if (Validate::isLoadedObject($order_carrier)) {
                        $order_carrier->weight = (float) $order->getTotalWeight();
                        if ($order_carrier->update()) {
                            $order->weight = sprintf('%.3f ' . Configuration::get('PS_WEIGHT_UNIT'), $order_carrier->weight);
                        }
                    }

                    if ($amount >= 0) {
                        if (!OrderSlip::create(
                            $order,
                            $order_detail_list,
                            $shipping_cost_amount,
                            $voucher,
                            $choosen,
                            (Tools::getValue('TaxMethod') ? false : true)
                        )) {
                            $this->errors[] = $this->trans('You cannot generate a partial credit slip.', array(), 'Admin.Orderscustomers.Notification');
                        } else {
                            Hook::exec('actionOrderSlipAdd', array('order' => $order, 'productList' => $order_detail_list, 'qtyList' => $full_quantity_list), null, false, true, false, $order->id_shop);
                            $customer = new Customer((int) ($order->id_customer));
                            $params = array();
                            $params['{lastname}'] = $customer->lastname;
                            $params['{firstname}'] = $customer->firstname;
                            $params['{id_order}'] = $order->id;
                            $params['{order_name}'] = $order->getUniqReference();
                            $orderLanguage = new Language((int) $order->id_lang);
                            @Mail::Send(
                                (int) $order->id_lang,
                                'credit_slip',
                                $this->trans(
                                    'New credit slip regarding your order',
                                    array(),
                                    'Emails.Subject',
                                    $orderLanguage->locale
                                ),
                                $params,
                                $customer->email,
                                $customer->firstname . ' ' . $customer->lastname,
                                null,
                                null,
                                null,
                                null,
                                _PS_MAIL_DIR_,
                                true,
                                (int) $order->id_shop
                            );
                        }

                        foreach ($order_detail_list as &$product) {
                            $order_detail = new OrderDetail((int) $product['id_order_detail']);
                            if (Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT')) {
                                StockAvailable::synchronize($order_detail->product_id);
                            }
                        }

                        // Generate voucher
                        if (Tools::isSubmit('generateDiscountRefund') && !count($this->errors) && $amount > 0) {
                            $cart_rule = new CartRule();
                            $cart_rule->description = $this->trans('Credit slip for order #%d', array('#%d' => $order->id), 'Admin.Orderscustomers.Feature');
                            $language_ids = Language::getIDs(false);
                            foreach ($language_ids as $id_lang) {
                                // Define a temporary name
                                $cart_rule->name[$id_lang] = sprintf('V0C%1$dO%2$d', $order->id_customer, $order->id);
                            }

                            // Define a temporary code
                            $cart_rule->code = sprintf('V0C%1$dO%2$d', $order->id_customer, $order->id);
                            $cart_rule->quantity = 1;
                            $cart_rule->quantity_per_user = 1;

                            // Specific to the customer
                            $cart_rule->id_customer = $order->id_customer;
                            $now = time();
                            $cart_rule->date_from = date('Y-m-d H:i:s', $now);
                            $cart_rule->date_to = date('Y-m-d H:i:s', strtotime('+1 year'));
                            $cart_rule->partial_use = 1;
                            $cart_rule->active = 1;

                            $cart_rule->reduction_amount = $amount;
                            $cart_rule->reduction_tax = $order->getTaxCalculationMethod() != PS_TAX_EXC;
                            $cart_rule->minimum_amount_currency = $order->id_currency;
                            $cart_rule->reduction_currency = $order->id_currency;

                            if (!$cart_rule->add()) {
                                $this->errors[] = $this->trans('You cannot generate a voucher.', array(), 'Admin.Orderscustomers.Notification');
                            } else {
                                // Update the voucher code and name
                                foreach ($language_ids as $id_lang) {
                                    $cart_rule->name[$id_lang] = sprintf('V%1$dC%2$dO%3$d', $cart_rule->id, $order->id_customer, $order->id);
                                }
                                $cart_rule->code = sprintf('V%1$dC%2$dO%3$d', $cart_rule->id, $order->id_customer, $order->id);

                                if (!$cart_rule->update()) {
                                    $this->errors[] = $this->trans('You cannot generate a voucher.', array(), 'Admin.Orderscustomers.Notification');
                                } else {
                                    $currency = $this->context->currency;
                                    $customer = new Customer((int) ($order->id_customer));
                                    $params = array();
                                    $params['{lastname}'] = $customer->lastname;
                                    $params['{firstname}'] = $customer->firstname;
                                    $params['{id_order}'] = $order->id;
                                    $params['{order_name}'] = $order->getUniqReference();
                                    $params['{voucher_amount}'] = Tools::displayPrice($cart_rule->reduction_amount, $currency, false);
                                    $params['{voucher_num}'] = $cart_rule->code;
                                    $orderLanguage = new Language((int) $order->id_lang);
                                    @Mail::Send(
                                        (int) $order->id_lang,
                                        'voucher',
                                        $this->trans(
                                            'New voucher for your order #%s',
                                            array($order->reference),
                                            'Emails.Subject',
                                            $orderLanguage->locale
                                        ),
                                        $params,
                                        $customer->email,
                                        $customer->firstname . ' ' . $customer->lastname,
                                        null,
                                        null,
                                        null,
                                        null,
                                        _PS_MAIL_DIR_,
                                        true,
                                        (int) $order->id_shop
                                    );
                                }
                            }
                        }
                    } else {
                        if (!empty($refunds)) {
                            $this->errors[] = $this->trans('Please enter a quantity to proceed with your refund.', array(), 'Admin.Orderscustomers.Notification');
                        } else {
                            $this->errors[] = $this->trans('Please enter an amount to proceed with your refund.', array(), 'Admin.Orderscustomers.Notification');
                        }
                    }

                    // Redirect if no errors
                    if (!count($this->errors)) {
                        Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=30&token=' . $this->token);
                    }
                } else {
                    $this->errors[] = $this->trans('The partial refund data is incorrect.', array(), 'Admin.Orderscustomers.Notification');
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to delete this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('cancelProduct') && isset($order)) {
            // Cancel product from order
            if ($this->access('delete')) {
                if (!Tools::isSubmit('id_order_detail') && !Tools::isSubmit('id_customization')) {
                    $this->errors[] = $this->trans('You must select a product.', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!Tools::isSubmit('cancelQuantity') && !Tools::isSubmit('cancelCustomizationQuantity')) {
                    $this->errors[] = $this->trans('You must enter a quantity.', array(), 'Admin.Orderscustomers.Notification');
                } else {
                    $productList = Tools::getValue('id_order_detail');
                    if ($productList) {
                        $productList = array_map('intval', $productList);
                    }

                    $customizationList = Tools::getValue('id_customization');
                    if ($customizationList) {
                        $customizationList = array_map('intval', $customizationList);
                    }

                    $qtyList = Tools::getValue('cancelQuantity');
                    if ($qtyList) {
                        $qtyList = array_map('intval', $qtyList);
                    }

                    $customizationQtyList = Tools::getValue('cancelCustomizationQuantity');
                    if ($customizationQtyList) {
                        $customizationQtyList = array_map('intval', $customizationQtyList);
                    }

                    $full_product_list = $productList;
                    $full_quantity_list = $qtyList;

                    if ($customizationList) {
                        foreach ($customizationList as $key => $id_order_detail) {
                            $full_product_list[(int) $id_order_detail] = $id_order_detail;
                            if (isset($customizationQtyList[$key])) {
                                $full_quantity_list[(int) $id_order_detail] += $customizationQtyList[$key];
                            }
                        }
                    }

                    if ($productList || $customizationList) {
                        if ($productList) {
                            $id_cart = Cart::getCartIdByOrderId($order->id);
                            $customization_quantities = Customization::countQuantityByCart($id_cart);

                            foreach ($productList as $key => $id_order_detail) {
                                $qtyCancelProduct = abs($qtyList[$key]);
                                if (!$qtyCancelProduct) {
                                    $this->errors[] = $this->trans('No quantity has been selected for this product.', array(), 'Admin.Orderscustomers.Notification');
                                }

                                $order_detail = new OrderDetail($id_order_detail);
                                $customization_quantity = 0;
                                if (array_key_exists($order_detail->product_id, $customization_quantities) && array_key_exists($order_detail->product_attribute_id, $customization_quantities[$order_detail->product_id])) {
                                    $customization_quantity = (int) $customization_quantities[$order_detail->product_id][$order_detail->product_attribute_id];
                                }

                                if (($order_detail->product_quantity - $customization_quantity - $order_detail->product_quantity_refunded - $order_detail->product_quantity_return) < $qtyCancelProduct) {
                                    $this->errors[] = $this->trans('An invalid quantity was selected for this product.', array(), 'Admin.Orderscustomers.Notification');
                                }
                            }
                        }
                        if ($customizationList) {
                            $customization_quantities = Customization::retrieveQuantitiesFromIds(array_keys($customizationList));

                            foreach ($customizationList as $id_customization => $id_order_detail) {
                                $qtyCancelProduct = abs($customizationQtyList[$id_customization]);
                                $customization_quantity = $customization_quantities[$id_customization];

                                if (!$qtyCancelProduct) {
                                    $this->errors[] = $this->trans('No quantity has been selected for this product.', array(), 'Admin.Orderscustomers.Notification');
                                }

                                if ($qtyCancelProduct > ($customization_quantity['quantity'] - ($customization_quantity['quantity_refunded'] + $customization_quantity['quantity_returned']))) {
                                    $this->errors[] = $this->trans('An invalid quantity was selected for this product.', array(), 'Admin.Orderscustomers.Notification');
                                }
                            }
                        }

                        if (!count($this->errors) && $productList) {
                            foreach ($productList as $key => $id_order_detail) {
                                $qty_cancel_product = abs($qtyList[$key]);
                                $order_detail = new OrderDetail((int) ($id_order_detail));

                                if (!$order->hasBeenDelivered() || ($order->hasBeenDelivered() && Tools::isSubmit('reinjectQuantities')) && $qty_cancel_product > 0) {
                                    $this->reinjectQuantity($order_detail, $qty_cancel_product);

                                    /* Start SSA module */
                                    $ssa = Module::getInstanceByName('singlestockattributespoco');
                                    if ($ssa && $ssa->active) {
                                        $ssa->updateStock($order_detail->product_id, $order_detail->product_attribute_id, $qty_cancel_product, false);
                                    }
                                    /* End SSA module */
                                }

                                // Delete product
                                $order_detail = new OrderDetail((int) $id_order_detail);
                                if (!$order->deleteProduct($order, $order_detail, $qty_cancel_product)) {
                                    $this->errors[] = $this->trans('An error occurred while attempting to delete the product.', array(), 'Admin.Orderscustomers.Notification') . ' <span class="bold">' . $order_detail->product_name . '</span>';
                                }
                                // Update weight SUM
                                $order_carrier = new OrderCarrier((int) $order->getIdOrderCarrier());
                                if (Validate::isLoadedObject($order_carrier)) {
                                    $order_carrier->weight = (float) $order->getTotalWeight();
                                    if ($order_carrier->update()) {
                                        $order->weight = sprintf('%.3f ' . Configuration::get('PS_WEIGHT_UNIT'), $order_carrier->weight);
                                    }
                                }

                                if (Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT') && StockAvailable::dependsOnStock($order_detail->product_id)) {
                                    StockAvailable::synchronize($order_detail->product_id);
                                }
                                Hook::exec('actionProductCancel', array('order' => $order, 'id_order_detail' => (int) $id_order_detail), null, false, true, false, $order->id_shop);
                            }
                        }
                        if (!count($this->errors) && $customizationList) {
                            foreach ($customizationList as $id_customization => $id_order_detail) {
                                $order_detail = new OrderDetail((int) ($id_order_detail));
                                $qtyCancelProduct = abs($customizationQtyList[$id_customization]);
                                if (!$order->deleteCustomization($id_customization, $qtyCancelProduct, $order_detail)) {
                                    $this->errors[] = $this->trans('An error occurred while attempting to delete product customization.', array(), 'Admin.Orderscustomers.Notification') . ' ' . $id_customization;
                                }
                            }
                        }
                        // E-mail params
                        if ((Tools::isSubmit('generateCreditSlip') || Tools::isSubmit('generateDiscount')) && !count($this->errors)) {
                            $customer = new Customer((int) ($order->id_customer));
                            $params = array();
                            $params['{lastname}'] = $customer->lastname;
                            $params['{firstname}'] = $customer->firstname;
                            $params['{id_order}'] = $order->id;
                            $params['{order_name}'] = $order->getUniqReference();
                        }

                        // Generate credit slip
                        if (Tools::isSubmit('generateCreditSlip') && !count($this->errors)) {
                            $product_list = array();
                            $amount = $order_detail->unit_price_tax_incl * $full_quantity_list[$id_order_detail];

                            $choosen = false;
                            if ((int) Tools::getValue('refund_total_voucher_off') == 1) {
                                $amount -= $voucher = (float) Tools::getValue('order_discount_price');
                            } elseif ((int) Tools::getValue('refund_total_voucher_off') == 2) {
                                $choosen = true;
                                $amount = $voucher = (float) Tools::getValue('refund_total_voucher_choose');
                            }
                            foreach ($full_product_list as $id_order_detail) {
                                $order_detail = new OrderDetail((int) $id_order_detail);
                                $product_list[$id_order_detail] = array(
                                    'id_order_detail' => $id_order_detail,
                                    'quantity' => $full_quantity_list[$id_order_detail],
                                    'unit_price' => $order_detail->unit_price_tax_excl,
                                    'amount' => isset($amount) ? $amount : $order_detail->unit_price_tax_incl * $full_quantity_list[$id_order_detail],
                                );
                            }

                            $shipping = Tools::isSubmit('shippingBack') ? null : false;

                            if (!OrderSlip::create($order, $product_list, $shipping, $voucher, $choosen)) {
                                $this->errors[] = $this->trans('A credit slip cannot be generated.', array(), 'Admin.Orderscustomers.Notification');
                            } else {
                                Hook::exec('actionOrderSlipAdd', array('order' => $order, 'productList' => $full_product_list, 'qtyList' => $full_quantity_list), null, false, true, false, $order->id_shop);
                                $orderLanguage = new Language((int) $order->id_lang);
                                @Mail::Send(
                                    (int) $order->id_lang,
                                    'credit_slip',
                                    $this->trans(
                                        'New credit slip regarding your order',
                                        array(),
                                        'Emails.Subject',
                                        $orderLanguage->locale
                                    ),
                                    $params,
                                    $customer->email,
                                    $customer->firstname . ' ' . $customer->lastname,
                                    null,
                                    null,
                                    null,
                                    null,
                                    _PS_MAIL_DIR_,
                                    true,
                                    (int) $order->id_shop
                                );
                            }
                        }

                        // Generate voucher
                        if (Tools::isSubmit('generateDiscount') && !count($this->errors)) {
                            $cartrule = new CartRule();
                            $language_ids = Language::getIDs((bool) $order);
                            $cartrule->description = $this->trans('Credit card slip for order #%d', array('#%d' => $order->id), 'Admin.Orderscustomers.Feature');
                            foreach ($language_ids as $id_lang) {
                                // Define a temporary name
                                $cartrule->name[$id_lang] = 'V0C' . (int) ($order->id_customer) . 'O' . (int) ($order->id);
                            }
                            // Define a temporary code
                            $cartrule->code = 'V0C' . (int) ($order->id_customer) . 'O' . (int) ($order->id);

                            $cartrule->quantity = 1;
                            $cartrule->quantity_per_user = 1;
                            // Specific to the customer
                            $cartrule->id_customer = $order->id_customer;
                            $now = time();
                            $cartrule->date_from = date('Y-m-d H:i:s', $now);
                            $cartrule->date_to = date('Y-m-d H:i:s', $now + (3600 * 24 * 365.25)); /* 1 year */
                            $cartrule->active = 1;

                            $products = $order->getProducts(false, $full_product_list, $full_quantity_list);

                            $total = 0;
                            foreach ($products as $product) {
                                $total += $product['unit_price_tax_incl'] * $product['product_quantity'];
                            }

                            if (Tools::isSubmit('shippingBack')) {
                                $total += $order->total_shipping;
                            }

                            if ((int) Tools::getValue('refund_total_voucher_off') == 1) {
                                $total -= (float) Tools::getValue('order_discount_price');
                            } elseif ((int) Tools::getValue('refund_total_voucher_off') == 2) {
                                $total = (float) Tools::getValue('refund_total_voucher_choose');
                            }

                            $cartrule->reduction_amount = $total;
                            $cartrule->reduction_tax = true;
                            $cartrule->minimum_amount_currency = $order->id_currency;
                            $cartrule->reduction_currency = $order->id_currency;

                            if (!$cartrule->add()) {
                                $this->errors[] = $this->trans('You cannot generate a voucher.', array(), 'Admin.Orderscustomers.Notification');
                            } else {
                                // Update the voucher code and name
                                foreach ($language_ids as $id_lang) {
                                    $cartrule->name[$id_lang] = 'V' . (int) ($cartrule->id) . 'C' . (int) ($order->id_customer) . 'O' . $order->id;
                                }
                                $cartrule->code = 'V' . (int) ($cartrule->id) . 'C' . (int) ($order->id_customer) . 'O' . $order->id;
                                if (!$cartrule->update()) {
                                    $this->errors[] = $this->trans('You cannot generate a voucher.', array(), 'Admin.Orderscustomers.Notification');
                                } else {
                                    $params = array();
                                    $currency = $this->context->currency;
                                    $params['{voucher_amount}'] = Tools::displayPrice($cartrule->reduction_amount, $currency, false);
                                    $params['{voucher_num}'] = $cartrule->code;
                                    $orderLanguage = new Language((int) $order->id_lang);
                                    @Mail::Send(
                                        (int) $order->id_lang,
                                        'voucher',
                                        $this->trans(
                                            'New voucher for your order #%s',
                                            array($order->reference),
                                            'Emails.Subject',
                                            $orderLanguage->locale
                                        ),
                                        $params,
                                        $customer->email,
                                        $customer->firstname . ' ' . $customer->lastname,
                                        null,
                                        null,
                                        null,
                                        null,
                                        _PS_MAIL_DIR_,
                                        true,
                                        (int) $order->id_shop
                                    );
                                }
                            }
                        }
                    } else {
                        $this->errors[] = $this->trans('No product or quantity has been selected.', array(), 'Admin.Orderscustomers.Notification');
                    }

                    // Redirect if no errors
                    if (!count($this->errors)) {
                        Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=31&token=' . $this->token);
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to delete this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('messageReaded')) {
            Message::markAsReaded(Tools::getValue('messageReaded'), $this->context->employee->id);
        } elseif (Tools::isSubmit('submitAddPayment') && isset($order)) {
            if ($this->access('edit')) {
                $amount = str_replace(',', '.', Tools::getValue('payment_amount'));
                $currency = new Currency(Tools::getValue('payment_currency'));
                $order_has_invoice = $order->hasInvoice();
                if ($order_has_invoice) {
                    $order_invoice = new OrderInvoice(Tools::getValue('payment_invoice'));
                } else {
                    $order_invoice = null;
                }

                if (!Validate::isLoadedObject($order)) {
                    $this->errors[] = $this->trans('The order cannot be found', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!Validate::isNegativePrice($amount) || !(float) $amount) {
                    $this->errors[] = $this->trans('The amount is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!Validate::isGenericName(Tools::getValue('payment_method'))) {
                    $this->errors[] = $this->trans('The selected payment method is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!Validate::isString(Tools::getValue('payment_transaction_id'))) {
                    $this->errors[] = $this->trans('The transaction ID is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!Validate::isLoadedObject($currency)) {
                    $this->errors[] = $this->trans('The selected currency is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } elseif ($order_has_invoice && !Validate::isLoadedObject($order_invoice)) {
                    $this->errors[] = $this->trans('The invoice is invalid.', array(), 'Admin.Orderscustomers.Notification');
                } elseif (!Validate::isDate(Tools::getValue('payment_date'))) {
                    $this->errors[] = $this->trans('The date is invalid', array(), 'Admin.Orderscustomers.Notification');
                } else {
                    if (!$order->addOrderPayment($amount, Tools::getValue('payment_method'), Tools::getValue('payment_transaction_id'), $currency, Tools::getValue('payment_date'), $order_invoice)) {
                        $this->errors[] = $this->trans('An error occurred during payment.', array(), 'Admin.Orderscustomers.Notification');
                    } else {
                        Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=4&token=' . $this->token);
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('submitEditNote')) {
            $note = Tools::getValue('note');
            $order_invoice = new OrderInvoice((int) Tools::getValue('id_order_invoice'));
            if (Validate::isLoadedObject($order_invoice) && Validate::isCleanHtml($note)) {
                if ($this->access('edit')) {
                    $order_invoice->note = $note;
                    if ($order_invoice->save()) {
                        Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order_invoice->id_order . '&vieworder&conf=4&token=' . $this->token);
                    } else {
                        $this->errors[] = $this->trans('The invoice note was not saved.', array(), 'Admin.Orderscustomers.Notification');
                    }
                } else {
                    $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
                }
            } else {
                $this->errors[] = $this->trans('Failed to upload the invoice and edit its note.', array(), 'Admin.Orderscustomers.Notification');
            }
        } elseif (Tools::isSubmit('submitAddOrder') && ($id_cart = Tools::getValue('id_cart')) &&
            ($module_name = Tools::getValue('payment_module_name')) &&
            ($id_order_state = Tools::getValue('id_order_state')) && Validate::isModuleName($module_name)) {
            if ($this->access('edit')) {
                if (!Configuration::get('PS_CATALOG_MODE')) {
                    $payment_module = Module::getInstanceByName($module_name);
                } else {
                    $payment_module = new BoOrder();
                }

                $cart = new Cart((int) $id_cart);
                Context::getContext()->currency = new Currency((int) $cart->id_currency);
                Context::getContext()->customer = new Customer((int) $cart->id_customer);

                $bad_delivery = false;
                if (($bad_delivery = (bool) !Address::isCountryActiveById((int) $cart->id_address_delivery))
                    || !Address::isCountryActiveById((int) $cart->id_address_invoice)) {
                    if ($bad_delivery) {
                        $this->errors[] = $this->trans('This delivery address country is not active.', array(), 'Admin.Orderscustomers.Notification');
                    } else {
                        $this->errors[] = $this->trans('This invoice address country is not active.', array(), 'Admin.Orderscustomers.Notification');
                    }
                } else {
                    $employee = new Employee((int) Context::getContext()->cookie->id_employee);
                    $payment_module->validateOrder(
                        (int) $cart->id,
                        (int) $id_order_state,
                        $cart->getOrderTotal(true, Cart::BOTH),
                        $payment_module->displayName,
                        $this->trans('Manual order -- Employee:', array(), 'Admin.Orderscustomers.Feature') . ' ' .
                        Tools::substr($employee->firstname, 0, 1) . '. ' . $employee->lastname,
                        array(),
                        null,
                        false,
                        $cart->secure_key
                    );
                    if ($payment_module->currentOrder) {
                        Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $payment_module->currentOrder . '&vieworder' . '&token=' . $this->token);
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to add this.', array(), 'Admin.Notifications.Error');
            }
        } elseif ((Tools::isSubmit('submitAddressShipping') || Tools::isSubmit('submitAddressInvoice')) && isset($order)) {
            if ($this->access('edit')) {
                $address = new Address(Tools::getValue('id_address'));
                $cart = Cart::getCartByOrderId($order->id);
                if (Validate::isLoadedObject($address)) {
                    // Update the address on order and cart
                    if (Tools::isSubmit('submitAddressShipping')) {
                        $order->id_address_delivery = $address->id;
                        $cart->id_address_delivery = $address->id;
                    } elseif (Tools::isSubmit('submitAddressInvoice')) {
                        $order->id_address_invoice = $address->id;
                        $cart->id_address_invoice = $address->id;
                    }
                    $order->update();
                    $order->refreshShippingCost();
                    $cart->update();

                    Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=4&token=' . $this->token);
                } else {
                    $this->errors[] = $this->trans('This address can\'t be loaded', array(), 'Admin.Orderscustomers.Notification');
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('submitChangeCurrency') && isset($order)) {
            if ($this->access('edit')) {
                if (Tools::getValue('new_currency') != $order->id_currency && !$order->valid) {
                    $old_currency = new Currency($order->id_currency);
                    $currency = new Currency(Tools::getValue('new_currency'));
                    if (!Validate::isLoadedObject($currency)) {
                        throw new Exception('Can\'t load Currency object');
                    }

                    // Update order detail amount
                    foreach ($order->getOrderDetailList() as $row) {
                        $order_detail = new OrderDetail($row['id_order_detail']);
                        $fields = array(
                            'ecotax',
                            'product_price',
                            'reduction_amount',
                            'total_shipping_price_tax_excl',
                            'total_shipping_price_tax_incl',
                            'total_price_tax_incl',
                            'total_price_tax_excl',
                            'product_quantity_discount',
                            'purchase_supplier_price',
                            'reduction_amount',
                            'reduction_amount_tax_incl',
                            'reduction_amount_tax_excl',
                            'unit_price_tax_incl',
                            'unit_price_tax_excl',
                            'original_product_price',
                        );
                        foreach ($fields as $field) {
                            $order_detail->{$field} = Tools::convertPriceFull($order_detail->{$field}, $old_currency, $currency);
                        }

                        $order_detail->update();
                        $order_detail->updateTaxAmount($order);
                    }

                    foreach ($order->getCartRules() as $cartRule) {
                        $orderCartRule = new OrderCartRule((int) $cartRule['id_order_cart_rule']);
                        if ($cartRule['value'] > 0) {
                            $orderCartRule->value = Tools::convertPriceFull(
                                (float) $cartRule['value'],
                                $old_currency,
                                $currency
                            );
                        }
                        if ($cartRule['value_tax_excl'] > 0) {
                            $orderCartRule->value_tax_excl = Tools::convertPriceFull(
                                (float) $cartRule['value_tax_excl'],
                                $old_currency,
                                $currency
                            );
                        }
                        $orderCartRule->update();
                    }

                    $id_order_carrier = (int) $order->getIdOrderCarrier();
                    if ($id_order_carrier) {
                        $order_carrier = $order_carrier = new OrderCarrier((int) $order->getIdOrderCarrier());
                        $order_carrier->shipping_cost_tax_excl = (float) Tools::convertPriceFull($order_carrier->shipping_cost_tax_excl, $old_currency, $currency);
                        $order_carrier->shipping_cost_tax_incl = (float) Tools::convertPriceFull($order_carrier->shipping_cost_tax_incl, $old_currency, $currency);
                        $order_carrier->update();
                    }

                    // Update order && order_invoice amount
                    $fields = array(
                        'total_discounts',
                        'total_discounts_tax_incl',
                        'total_discounts_tax_excl',
                        'total_discount_tax_excl',
                        'total_discount_tax_incl',
                        'total_paid',
                        'total_paid_tax_incl',
                        'total_paid_tax_excl',
                        'total_paid_real',
                        'total_products',
                        'total_products_wt',
                        'total_shipping',
                        'total_shipping_tax_incl',
                        'total_shipping_tax_excl',
                        'total_wrapping',
                        'total_wrapping_tax_incl',
                        'total_wrapping_tax_excl',
                    );

                    $invoices = $order->getInvoicesCollection();
                    if ($invoices) {
                        foreach ($invoices as $invoice) {
                            foreach ($fields as $field) {
                                if (isset($invoice->$field)) {
                                    $invoice->{$field} = Tools::convertPriceFull($invoice->{$field}, $old_currency, $currency);
                                }
                            }
                            $invoice->save();
                        }
                    }

                    foreach ($fields as $field) {
                        if (isset($order->$field)) {
                            $order->{$field} = Tools::convertPriceFull($order->{$field}, $old_currency, $currency);
                        }
                    }

                    // Update currency in order
                    $order->id_currency = $currency->id;
                    // Update exchange rate
                    $order->conversion_rate = (float) $currency->conversion_rate;
                    $order->update();
                } else {
                    $this->errors[] = $this->trans('You cannot change the currency.', array(), 'Admin.Orderscustomers.Notification');
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('submitGenerateInvoice') && isset($order)) {
            if (!Configuration::get('PS_INVOICE', null, null, $order->id_shop)) {
                $this->errors[] = $this->trans('Invoice management has been disabled.', array(), 'Admin.Orderscustomers.Notification');
            } elseif ($order->hasInvoice()) {
                $this->errors[] = $this->trans('This order already has an invoice.', array(), 'Admin.Orderscustomers.Notification');
            } else {
                $order->setInvoice(true);
                Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=4&token=' . $this->token);
            }
        } elseif (Tools::isSubmit('submitDeleteVoucher') && isset($order)) {
            if ($this->access('edit')) {
                $order_cart_rule = new OrderCartRule(Tools::getValue('id_order_cart_rule'));
                if (Validate::isLoadedObject($order_cart_rule) && $order_cart_rule->id_order == $order->id) {
                    if ($order_cart_rule->id_order_invoice) {
                        $order_invoice = new OrderInvoice($order_cart_rule->id_order_invoice);
                        if (!Validate::isLoadedObject($order_invoice)) {
                            throw new Exception('Can\'t load Order Invoice object');
                        }

                        // Update amounts of Order Invoice
                        $order_invoice->total_discount_tax_excl -= $order_cart_rule->value_tax_excl;
                        $order_invoice->total_discount_tax_incl -= $order_cart_rule->value;

                        $order_invoice->total_paid_tax_excl += $order_cart_rule->value_tax_excl;
                        $order_invoice->total_paid_tax_incl += $order_cart_rule->value;

                        // Update Order Invoice
                        $order_invoice->update();
                    }

                    // Update amounts of order
                    $order->total_discounts -= $order_cart_rule->value;
                    $order->total_discounts_tax_incl -= $order_cart_rule->value;
                    $order->total_discounts_tax_excl -= $order_cart_rule->value_tax_excl;

                    $order->total_paid += $order_cart_rule->value;
                    $order->total_paid_tax_incl += $order_cart_rule->value;
                    $order->total_paid_tax_excl += $order_cart_rule->value_tax_excl;

                    // Delete Order Cart Rule and update Order
                    $order_cart_rule->delete();
                    $order->update();
                    Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=4&token=' . $this->token);
                } else {
                    $this->errors[] = $this->trans('You cannot edit this cart rule.', array(), 'Admin.Orderscustomers.Notification');
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('submitNewVoucher') && isset($order)) {
            if ($this->access('edit')) {
                if (!Tools::getValue('discount_name')) {
                    $this->errors[] = $this->trans('You must specify a name in order to create a new discount.', array(), 'Admin.Orderscustomers.Notification');
                } else {
                    if ($order->hasInvoice()) {
                        // If the discount is for only one invoice
                        if (!Tools::isSubmit('discount_all_invoices')) {
                            $order_invoice = new OrderInvoice(Tools::getValue('discount_invoice'));
                            if (!Validate::isLoadedObject($order_invoice)) {
                                throw new Exception('Can\'t load Order Invoice object');
                            }
                        }
                    }

                    $cart_rules = array();
                    $discount_value = (float) str_replace(',', '.', Tools::getValue('discount_value'));
                    switch (Tools::getValue('discount_type')) {
                        // Percent type
                        case 1:
                            if ($discount_value < 100) {
                                if (isset($order_invoice)) {
                                    $cart_rules[$order_invoice->id]['value_tax_incl'] = Tools::ps_round($order_invoice->total_paid_tax_incl * $discount_value / 100, 2);
                                    $cart_rules[$order_invoice->id]['value_tax_excl'] = Tools::ps_round($order_invoice->total_paid_tax_excl * $discount_value / 100, 2);

                                    // Update OrderInvoice
                                    $this->applyDiscountOnInvoice($order_invoice, $cart_rules[$order_invoice->id]['value_tax_incl'], $cart_rules[$order_invoice->id]['value_tax_excl']);
                                } elseif ($order->hasInvoice()) {
                                    $order_invoices_collection = $order->getInvoicesCollection();
                                    foreach ($order_invoices_collection as $order_invoice) {
                                        /* @var OrderInvoice $order_invoice */
                                        $cart_rules[$order_invoice->id]['value_tax_incl'] = Tools::ps_round($order_invoice->total_paid_tax_incl * $discount_value / 100, 2);
                                        $cart_rules[$order_invoice->id]['value_tax_excl'] = Tools::ps_round($order_invoice->total_paid_tax_excl * $discount_value / 100, 2);

                                        // Update OrderInvoice
                                        $this->applyDiscountOnInvoice($order_invoice, $cart_rules[$order_invoice->id]['value_tax_incl'], $cart_rules[$order_invoice->id]['value_tax_excl']);
                                    }
                                } else {
                                    $cart_rules[0]['value_tax_incl'] = Tools::ps_round($order->total_paid_tax_incl * $discount_value / 100, 2);
                                    $cart_rules[0]['value_tax_excl'] = Tools::ps_round($order->total_paid_tax_excl * $discount_value / 100, 2);
                                }
                            } else {
                                $this->errors[] = $this->trans('The discount value is invalid.', array(), 'Admin.Orderscustomers.Notification');
                            }

                            break;
                        // Amount type
                        case 2:
                            if (isset($order_invoice)) {
                                if ($discount_value > $order_invoice->total_paid_tax_incl) {
                                    $this->errors[] = $this->trans('The discount value is greater than the order invoice total.', array(), 'Admin.Orderscustomers.Notification');
                                } else {
                                    $cart_rules[$order_invoice->id]['value_tax_incl'] = Tools::ps_round($discount_value, 2);
                                    $cart_rules[$order_invoice->id]['value_tax_excl'] = Tools::ps_round($discount_value / (1 + ($order->getTaxesAverageUsed() / 100)), 2);

                                    // Update OrderInvoice
                                    $this->applyDiscountOnInvoice($order_invoice, $cart_rules[$order_invoice->id]['value_tax_incl'], $cart_rules[$order_invoice->id]['value_tax_excl']);
                                }
                            } elseif ($order->hasInvoice()) {
                                $order_invoices_collection = $order->getInvoicesCollection();
                                foreach ($order_invoices_collection as $order_invoice) {
                                    /** @var OrderInvoice $order_invoice */
                                    if ($discount_value > $order_invoice->total_paid_tax_incl) {
                                        $this->errors[] = $this->trans('The discount value is greater than the order invoice total.', array(), 'Admin.Orderscustomers.Notification') . $order_invoice->getInvoiceNumberFormatted(Context::getContext()->language->id, (int) $order->id_shop) . ')';
                                    } else {
                                        $cart_rules[$order_invoice->id]['value_tax_incl'] = Tools::ps_round($discount_value, 2);
                                        $cart_rules[$order_invoice->id]['value_tax_excl'] = Tools::ps_round($discount_value / (1 + ($order->getTaxesAverageUsed() / 100)), 2);

                                        // Update OrderInvoice
                                        $this->applyDiscountOnInvoice($order_invoice, $cart_rules[$order_invoice->id]['value_tax_incl'], $cart_rules[$order_invoice->id]['value_tax_excl']);
                                    }
                                }
                            } else {
                                if ($discount_value > $order->total_paid_tax_incl) {
                                    $this->errors[] = $this->trans('The discount value is greater than the order total.', array(), 'Admin.Orderscustomers.Notification');
                                } else {
                                    $cart_rules[0]['value_tax_incl'] = Tools::ps_round($discount_value, 2);
                                    $cart_rules[0]['value_tax_excl'] = Tools::ps_round($discount_value / (1 + ($order->getTaxesAverageUsed() / 100)), 2);
                                }
                            }

                            break;
                        // Free shipping type
                        case 3:
                            if (isset($order_invoice)) {
                                if ($order_invoice->total_shipping_tax_incl > 0) {
                                    $cart_rules[$order_invoice->id]['value_tax_incl'] = $order_invoice->total_shipping_tax_incl;
                                    $cart_rules[$order_invoice->id]['value_tax_excl'] = $order_invoice->total_shipping_tax_excl;

                                    // Update OrderInvoice
                                    $this->applyDiscountOnInvoice($order_invoice, $cart_rules[$order_invoice->id]['value_tax_incl'], $cart_rules[$order_invoice->id]['value_tax_excl']);
                                }
                            } elseif ($order->hasInvoice()) {
                                $order_invoices_collection = $order->getInvoicesCollection();
                                foreach ($order_invoices_collection as $order_invoice) {
                                    /** @var OrderInvoice $order_invoice */
                                    if ($order_invoice->total_shipping_tax_incl <= 0) {
                                        continue;
                                    }
                                    $cart_rules[$order_invoice->id]['value_tax_incl'] = $order_invoice->total_shipping_tax_incl;
                                    $cart_rules[$order_invoice->id]['value_tax_excl'] = $order_invoice->total_shipping_tax_excl;

                                    // Update OrderInvoice
                                    $this->applyDiscountOnInvoice($order_invoice, $cart_rules[$order_invoice->id]['value_tax_incl'], $cart_rules[$order_invoice->id]['value_tax_excl']);
                                }
                            } else {
                                $cart_rules[0]['value_tax_incl'] = $order->total_shipping_tax_incl;
                                $cart_rules[0]['value_tax_excl'] = $order->total_shipping_tax_excl;
                            }

                            break;
                        default:
                            $this->errors[] = $this->trans('The discount type is invalid.', array(), 'Admin.Orderscustomers.Notification');
                    }

                    $res = true;
                    foreach ($cart_rules as &$cart_rule) {
                        $cartRuleObj = new CartRule();
                        $cartRuleObj->date_from = date('Y-m-d H:i:s', strtotime('-1 hour', strtotime($order->date_add)));
                        $cartRuleObj->date_to = date('Y-m-d H:i:s', strtotime('+1 hour'));
                        $cartRuleObj->name[Configuration::get('PS_LANG_DEFAULT')] = Tools::getValue('discount_name');
                        $cartRuleObj->quantity = 0;
                        $cartRuleObj->quantity_per_user = 1;
                        if (Tools::getValue('discount_type') == 1) {
                            $cartRuleObj->reduction_percent = $discount_value;
                        } elseif (Tools::getValue('discount_type') == 2) {
                            $cartRuleObj->reduction_amount = $cart_rule['value_tax_excl'];
                        } elseif (Tools::getValue('discount_type') == 3) {
                            $cartRuleObj->free_shipping = 1;
                        }
                        $cartRuleObj->active = 0;
                        if ($res = $cartRuleObj->add()) {
                            $cart_rule['id'] = $cartRuleObj->id;
                        } else {
                            break;
                        }
                    }

                    if ($res) {
                        foreach ($cart_rules as $id_order_invoice => $cart_rule) {
                            // Create OrderCartRule
                            $order_cart_rule = new OrderCartRule();
                            $order_cart_rule->id_order = $order->id;
                            $order_cart_rule->id_cart_rule = $cart_rule['id'];
                            $order_cart_rule->id_order_invoice = $id_order_invoice;
                            $order_cart_rule->name = Tools::getValue('discount_name');
                            $order_cart_rule->value = $cart_rule['value_tax_incl'];
                            $order_cart_rule->value_tax_excl = $cart_rule['value_tax_excl'];
                            $res &= $order_cart_rule->add();

                            $order->total_discounts += $order_cart_rule->value;
                            $order->total_discounts_tax_incl += $order_cart_rule->value;
                            $order->total_discounts_tax_excl += $order_cart_rule->value_tax_excl;
                            $order->total_paid -= $order_cart_rule->value;
                            $order->total_paid_tax_incl -= $order_cart_rule->value;
                            $order->total_paid_tax_excl -= $order_cart_rule->value_tax_excl;
                        }

                        // Update Order
                        $res &= $order->update();
                    }

                    if ($res) {
                        Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=4&token=' . $this->token);
                    } else {
                        $this->errors[] = $this->trans('An error occurred during the OrderCartRule creation', array(), 'Admin.Orderscustomers.Notification');
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        } elseif (Tools::isSubmit('sendStateEmail') && Tools::getValue('sendStateEmail') > 0 && Tools::getValue('id_order') > 0) {
            if ($this->access('edit')) {
                $order_state = new OrderState((int) Tools::getValue('sendStateEmail'));

                if (!Validate::isLoadedObject($order_state)) {
                    $this->errors[] = $this->trans('An error occurred while loading order status.', array(), 'Admin.Orderscustomers.Notification');
                } else {
                    $history = new OrderHistory((int) Tools::getValue('id_order_history'));

                    $carrier = new Carrier($order->id_carrier, $order->id_lang);
                    $templateVars = array();
                    if ($order_state->id == Configuration::get('PS_OS_SHIPPING') && $order->shipping_number) {
                        $templateVars = array('{followup}' => str_replace('@', $order->shipping_number, $carrier->url));
                    }

                    if ($history->sendEmail($order, $templateVars)) {
                        Tools::redirectAdmin(self::$currentIndex . '&id_order=' . $order->id . '&vieworder&conf=10&token=' . $this->token);
                    } else {
                        $this->errors[] = $this->trans('An error occurred while sending the e-mail to the customer.', array(), 'Admin.Orderscustomers.Notification');
                    }
                }
            } else {
                $this->errors[] = $this->trans('You do not have permission to edit this.', array(), 'Admin.Notifications.Error');
            }
        }

        AdminController::postProcess();
    }

    public function ajaxProcessEditProductOnOrder()
    {
        // Return value
        $res = true;

        $order = new Order((int) Tools::getValue('id_order'));
        $order_detail = new OrderDetail((int) Tools::getValue('product_id_order_detail'));
        if (Tools::isSubmit('product_invoice')) {
            $order_invoice = new OrderInvoice((int) Tools::getValue('product_invoice'));
        }

        // Check fields validity
        $this->doEditProductValidation($order_detail, $order, isset($order_invoice) ? $order_invoice : null);

        // If multiple product_quantity, the order details concern a product customized
        $product_quantity = 0;
        if (is_array(Tools::getValue('product_quantity'))) {
            foreach (Tools::getValue('product_quantity') as $id_customization => $qty) {
                // Update quantity of each customization
                Db::getInstance()->update('customization', array('quantity' => (int) $qty), 'id_customization = ' . (int) $id_customization);
                // Calculate the real quantity of the product
                $product_quantity += $qty;
            }
        } else {
            $product_quantity = Tools::getValue('product_quantity');
        }

        $product_price_tax_incl = Tools::ps_round(Tools::getValue('product_price_tax_incl'), 2);
        $product_price_tax_excl = Tools::ps_round(Tools::getValue('product_price_tax_excl'), 2);
        $total_products_tax_incl = $product_price_tax_incl * $product_quantity;
        $total_products_tax_excl = $product_price_tax_excl * $product_quantity;

        // Calculate differences of price (Before / After)
        $diff_price_tax_incl = $total_products_tax_incl - $order_detail->total_price_tax_incl;
        $diff_price_tax_excl = $total_products_tax_excl - $order_detail->total_price_tax_excl;

        // Apply change on OrderInvoice
        if (isset($order_invoice)) {
            // If OrderInvoice to use is different, we update the old invoice and new invoice
            if ($order_detail->id_order_invoice != $order_invoice->id) {
                $old_order_invoice = new OrderInvoice($order_detail->id_order_invoice);
                // We remove cost of products
                $old_order_invoice->total_products -= $order_detail->total_price_tax_excl;
                $old_order_invoice->total_products_wt -= $order_detail->total_price_tax_incl;

                $old_order_invoice->total_paid_tax_excl -= $order_detail->total_price_tax_excl;
                $old_order_invoice->total_paid_tax_incl -= $order_detail->total_price_tax_incl;

                $res &= $old_order_invoice->update();

                $order_invoice->total_products += $order_detail->total_price_tax_excl;
                $order_invoice->total_products_wt += $order_detail->total_price_tax_incl;

                $order_invoice->total_paid_tax_excl += $order_detail->total_price_tax_excl;
                $order_invoice->total_paid_tax_incl += $order_detail->total_price_tax_incl;

                $order_detail->id_order_invoice = $order_invoice->id;
            }
        }

        if ($diff_price_tax_incl != 0 && $diff_price_tax_excl != 0) {
            $order_detail->unit_price_tax_excl = $product_price_tax_excl;
            $order_detail->unit_price_tax_incl = $product_price_tax_incl;

            $order_detail->total_price_tax_incl += $diff_price_tax_incl;
            $order_detail->total_price_tax_excl += $diff_price_tax_excl;

            if (isset($order_invoice)) {
                // Apply changes on OrderInvoice
                $order_invoice->total_products += $diff_price_tax_excl;
                $order_invoice->total_products_wt += $diff_price_tax_incl;

                $order_invoice->total_paid_tax_excl += $diff_price_tax_excl;
                $order_invoice->total_paid_tax_incl += $diff_price_tax_incl;
            }

            // Apply changes on Order
            $order = new Order($order_detail->id_order);
            $order->total_products += $diff_price_tax_excl;
            $order->total_products_wt += $diff_price_tax_incl;

            $order->total_paid += $diff_price_tax_incl;
            $order->total_paid_tax_excl += $diff_price_tax_excl;
            $order->total_paid_tax_incl += $diff_price_tax_incl;

            $res &= $order->update();
        }

        $old_quantity = $order_detail->product_quantity;

        $order_detail->product_quantity = $product_quantity;
        $order_detail->reduction_percent = 0;

        // update taxes
        $res &= $order_detail->updateTaxAmount($order);

        // Save order detail
        $res &= $order_detail->update();

        // Update weight SUM
        $order_carrier = new OrderCarrier((int) $order->getIdOrderCarrier());
        if (Validate::isLoadedObject($order_carrier)) {
            $order_carrier->weight = (float) $order->getTotalWeight();
            $res &= $order_carrier->update();
            if ($res) {
                $order->weight = sprintf('%.3f ' . Configuration::get('PS_WEIGHT_UNIT'), $order_carrier->weight);
            }
        }

        // Save order invoice
        if (isset($order_invoice)) {
            $res &= $order_invoice->update();
        }

        // Update product available quantity
        StockAvailable::updateQuantity($order_detail->product_id, $order_detail->product_attribute_id, ($old_quantity - $order_detail->product_quantity), $order->id_shop);

        /* Start SSA module */
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if ($ssa && $ssa->active) {
            if ($old_quantity < $order_detail->product_quantity) {
                $ssa->updateStock($order_detail->product_id, $order_detail->product_attribute_id, ($order_detail->product_quantity - $old_quantity));
            } else {
                $ssa->updateStock($order_detail->product_id, $order_detail->product_attribute_id, ($old_quantity - $order_detail->product_quantity), false);
            }
        }
        /* End SSA module */

        $products = $this->getProducts($order);
        // Get the last product
        $product = $products[$order_detail->id];
        $resume = OrderSlip::getProductSlipResume($order_detail->id);
        $product['quantity_refundable'] = $product['product_quantity'] - $resume['product_quantity'];
        $product['amount_refundable'] = $product['total_price_tax_excl'] - $resume['amount_tax_excl'];
        $product['amount_refund'] = Tools::displayPrice($resume['amount_tax_incl']);
        $product['refund_history'] = OrderSlip::getProductSlipDetail($order_detail->id);
        if ($product['id_warehouse'] != 0) {
            $warehouse = new Warehouse((int) $product['id_warehouse']);
            $product['warehouse_name'] = $warehouse->name;
            $warehouse_location = WarehouseProductLocation::getProductLocation($product['product_id'], $product['product_attribute_id'], $product['id_warehouse']);
            if (!empty($warehouse_location)) {
                $product['warehouse_location'] = $warehouse_location;
            } else {
                $product['warehouse_location'] = false;
            }
        } else {
            $product['warehouse_name'] = '--';
            $product['warehouse_location'] = false;
        }

        // Get invoices collection
        $invoice_collection = $order->getInvoicesCollection();

        $invoice_array = array();
        foreach ($invoice_collection as $invoice) {
            /* @var OrderInvoice $invoice */
            $invoice->name = $invoice->getInvoiceNumberFormatted(Context::getContext()->language->id, (int) $order->id_shop);
            $invoice_array[] = $invoice;
        }

        $order = $order->refreshShippingCost();

        $stockLocationIsAvailable = false;
        foreach ($products as $currentProduct) {
            if (!empty($currentProduct['location'])) {
                $stockLocationIsAvailable = true;

                break;
            }
        }

        // Assign to smarty informations in order to show the new product line
        $this->context->smarty->assign(array(
            'product' => $product,
            'order' => $order,
            'currency' => new Currency($order->id_currency),
            'can_edit' => $this->access('edit'),
            'invoices_collection' => $invoice_collection,
            'current_id_lang' => Context::getContext()->language->id,
            'link' => Context::getContext()->link,
            'current_index' => self::$currentIndex,
            'display_warehouse' => (int) Configuration::get('PS_ADVANCED_STOCK_MANAGEMENT'),
            'stock_location_is_available' => $stockLocationIsAvailable,
        ));

        if (!$res) {
            die(json_encode(array(
                'result' => $res,
                'error' => $this->trans('An error occurred while editing the product line.', array(), 'Admin.Orderscustomers.Notification'),
            )));
        }

        if (is_array(Tools::getValue('product_quantity'))) {
            $view = $this->createTemplate('_customized_data.tpl')->fetch();
        } else {
            $view = $this->createTemplate('_product_line.tpl')->fetch();
        }

        $this->sendChangedNotification($order);

        die(json_encode(array(
            'result' => $res,
            'view' => $view,
            'can_edit' => $this->access('add'),
            'invoices_collection' => $invoice_collection,
            'order' => $order,
            'invoices' => $invoice_array,
            'documents_html' => $this->createTemplate('_documents.tpl')->fetch(),
            'shipping_html' => $this->createTemplate('_shipping.tpl')->fetch(),
            'customized_product' => is_array(Tools::getValue('product_quantity')),
        )));
    }

    public function ajaxProcessDeleteProductLine()
    {
        $res = true;

        $order_detail = new OrderDetail((int) Tools::getValue('id_order_detail'));
        $order = new Order((int) Tools::getValue('id_order'));

        $this->doDeleteProductLineValidation($order_detail, $order);

        // Update OrderInvoice of this OrderDetail
        if ($order_detail->id_order_invoice != 0) {
            $order_invoice = new OrderInvoice($order_detail->id_order_invoice);
            $order_invoice->total_paid_tax_excl -= $order_detail->total_price_tax_excl;
            $order_invoice->total_paid_tax_incl -= $order_detail->total_price_tax_incl;
            $order_invoice->total_products -= $order_detail->total_price_tax_excl;
            $order_invoice->total_products_wt -= $order_detail->total_price_tax_incl;
            $res &= $order_invoice->update();
        }

        // Update Order
        $order->total_paid -= $order_detail->total_price_tax_incl;
        $order->total_paid_tax_incl -= $order_detail->total_price_tax_incl;
        $order->total_paid_tax_excl -= $order_detail->total_price_tax_excl;
        $order->total_products -= $order_detail->total_price_tax_excl;
        $order->total_products_wt -= $order_detail->total_price_tax_incl;

        $res &= $order->update();

        // Reinject quantity in stock
        $this->reinjectQuantity($order_detail, $order_detail->product_quantity, true);

        /* Start SSA module */
        $ssa = Module::getInstanceByName('singlestockattributespoco');
        if ($ssa && $ssa->active) {
            $ssa->updateStock($order_detail->product_id, $order_detail->product_attribute_id, $order_detail->product_quantity, false);
        }
        /* End SSA module */

        // Update weight SUM
        $order_carrier = new OrderCarrier((int) $order->getIdOrderCarrier());
        if (Validate::isLoadedObject($order_carrier)) {
            $order_carrier->weight = (float) $order->getTotalWeight();
            $res &= $order_carrier->update();
            if ($res) {
                $order->weight = sprintf('%.3f ' . Configuration::get('PS_WEIGHT_UNIT'), $order_carrier->weight);
            }
        }

        if (!$res) {
            die(json_encode(array(
                'result' => $res,
                'error' => $this->trans('An error occurred while attempting to delete the product line.', array(), 'Admin.Orderscustomers.Notification'),
            )));
        }

        // Get invoices collection
        $invoice_collection = $order->getInvoicesCollection();

        $invoice_array = array();
        foreach ($invoice_collection as $invoice) {
            /* @var OrderInvoice $invoice */
            $invoice->name = $invoice->getInvoiceNumberFormatted(Context::getContext()->language->id, (int) $order->id_shop);
            $invoice_array[] = $invoice;
        }

        $order = $order->refreshShippingCost();

        // Assign to smarty informations in order to show the new product line
        $this->context->smarty->assign(array(
            'order' => $order,
            'currency' => new Currency($order->id_currency),
            'invoices_collection' => $invoice_collection,
            'current_id_lang' => Context::getContext()->language->id,
            'link' => Context::getContext()->link,
            'current_index' => self::$currentIndex,
        ));

        $this->sendChangedNotification($order);

        die(json_encode(array(
            'result' => $res,
            'order' => $order,
            'invoices' => $invoice_array,
            'documents_html' => $this->createTemplate('_documents.tpl')->fetch(),
            'shipping_html' => $this->createTemplate('_shipping.tpl')->fetch(),
        )));
    }
}
