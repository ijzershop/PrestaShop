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
        $workshopProfiles = Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMPLOYEE_WORKSHOP_PROFILES');
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
        $this->addJS('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key='.Configuration::get('MODERNESMIDTHEMECONFIGURATOR_MAPS_KEY', null, null,  null, 'AIzaSyDv2qdzmbvRDXH-zzdqJY87K7y3W1iaMX8'));

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
}
