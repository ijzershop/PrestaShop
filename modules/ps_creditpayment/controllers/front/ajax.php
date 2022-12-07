<?php
if (!defined('_PS_CORE_DIR_')) {
    define('_PS_CORE_DIR_', realpath('../../../../'));
}

require_once _PS_CORE_DIR_ . '/config/config.inc.php';
require_once _PS_CORE_DIR_ . '/init.php';

class ps_creditpaymentAjaxModuleFrontController extends ModuleFrontController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function initContent()
    {
        $customers = array();
        $creditGroup = new Group(Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_CREDIT_GROUP'), Context::getContext()->language->id, Context::getContext()->shop->id);
        $customersWithGroup = $creditGroup->getCustomers();
        $is_balie_employee = Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_PROFILE') == Context::getContext()->customer->id;
        $add_to_list = false;
        if($is_balie_employee){
            $add_to_list = true;
            for ($i = 0; $i <= count($customersWithGroup); $i++){
                if(isset($customersWithGroup[$i])){
                    array_push($customers, array('id_customer' => $customersWithGroup[$i]['id_customer'],
                        'company' => $customersWithGroup[$i]['company'],
                        'firstname' => $customersWithGroup[$i]['firstname'],
                        'lastname' => $customersWithGroup[$i]['lastname'],
                        'email' => $customersWithGroup[$i]['email']));
                }
            }
        }



        $this->ajax = true;
        if ($this->errors) {
            die(json_encode(['hasError' => true, 'errors' => $this->errors]));
        }

        $customersGroup = (int)Configuration::get('MSTHEMECONFIG_EMPLOYEE_CUSTOMER_CREDIT_GROUP');


        $sql = '
		SELECT cg.`id_customer` as id, CONCAT(c.company, " - ",c.firstname, " ", c.lastname, " / ",c.email) as text
		FROM `' . _DB_PREFIX_ . 'customer_group` cg
		LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (cg.`id_customer` = c.`id_customer`)
		WHERE cg.`id_group` = ' . $customersGroup . '
		AND c.`deleted` != 1 ';


        $query = $_GET['q'] ?? null;
        if(!is_null($query)){
            $search_items = explode(' ', $query);
        } else {
            $search_items = [];
        }

        $research_fields = ['c.id_customer', 'c.firstname', 'c.lastname', 'c.email', 'c.company'];

        $items = [];
        foreach ($research_fields as $field) {
            foreach ($search_items as $item) {
                if(!empty($item)){
                    $items[$item][] = $field . ' LIKE \'%' . pSQL($item) . '%\' ';
                }
            }
        }

        foreach ($items as $likes) {
            $sql .= ' AND (' . implode(' OR ', $likes) . ') ';
        }


        $result =  Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
        return die(json_encode(['msg'=>'success', 'items'=> $result]));
    }

}
