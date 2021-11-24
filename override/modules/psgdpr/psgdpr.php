<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoloadPath)) {
    require_once $autoloadPath;
}

/**
 * Overide to filter orders with statuscode zero
 */
class PsgdprOverride extends Psgdpr
{
    /**
     * @param Customer $customer
     *
     * @return array
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getCustomerDataFromPrestashop(Customer $customer)
    {
        $id_lang = Context::getContext()->language->id;
        $data = [];

        $stats = $customer->getStats();
        $customerLanguage = Language::getLanguage($customer->id_lang);
        $gender = new Gender($customer->id_gender, $id_lang);
        $genderName = $gender->name;
        unset($gender);

        $customerInfo = [
            'id_customer' => $customer->id,
            'gender' => $genderName,
            'firstname' => $customer->firstname,
            'lastname' => $customer->lastname,
            'birthday' => $customer->birthday,
            'age' => $this->getAgeCustomer($customer->id),
            'email' => $customer->email,
            'siret' => $customer->siret,
            'ape' => $customer->ape,
            'company' => $customer->company,
            'website' => $customer->website,
            'last_visit' => $stats['last_visit'],
            'language' => $customerLanguage['name'],
            'date_add' => $customer->date_add,
        ];

        // get orders
        $orders = [];
        $orderList = Order::getCustomerOrders($customer->id);
        if (count($orderList) >= 1) {
            foreach ($orderList as $index => $order) {
                $orderObject = new Order($order['id_order']);
                $productsOrder = $orderObject->getProducts();
                $currency = Currency::getCurrency($order['id_currency']);

                $orderState = '';
                $orderStateColor = '';

                if (isset($order['order_state'])) {
                    $orderState = $order['order_state'];
                    $orderStateColor = $order['order_state_color'];
                }

                array_push($orders, [
                    'id_order' => $order['id_order'],
                    'reference' => $order['reference'],
                    'payment' => $order['payment'],
                    'date_add' => $order['date_add'],
                    'order_state' => $orderState,
                    'order_state_color' => $orderStateColor,
                    'total_paid_tax_incl' => number_format($order['total_paid_tax_incl'],
                            2) . ' ' . $currency['iso_code'],
                    'nb_products' => $order['nb_products'],
                    'products' => [],
                ]);
                $attributes_list = AttributeGroup::getSawCutModuleAttributeGroupNames($this->context->language->id);
                foreach ($productsOrder as $product) {
                    $productName = $product['name'];
                    if (is_array($attributes_list)) {
                        $attributes = implode('|', $attributes_list);
                        $productName = preg_replace('/(\s-\s[' . $attributes . ']+\s:\s[a-zA-Z].*)/m', '',
                            $productName);
                    }

                    if (!is_null($product['id_customization'])) {

                        $customization = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'customized_data` WHERE id_customization = ' . (int)$product['id_customization']);
                        if (isset($customization[0]['value']) && isset($product['customizedDatas'][$product['id_address_delivery']][$product['id_customization']]['datas'])) {
                            $productName .= ' - ' . reset($product['customizedDatas'][$product['id_address_delivery']][$product['id_customization']]['datas'])[0]['name'] .': ' . $customization[0]['value'];
                        }

                    }
                    array_push($orders[$index]['products'], [
                        'id_product' => $product['product_id'],
                        'id_product_attribute' => $product['product_attribute_id'],
                        'product_reference' => $product['product_reference'],
                        'product_name' => $productName,
                        'product_quantity' => $product['product_quantity'],
                    ]);
                }
                unset($orderObject);
            }
        }

        // get carts
        $carts = [];
        $cartList = Cart::getCustomerCarts($customer->id, false);

        if (count($cartList) >= 1) {
            foreach ($cartList as $index => $cart) {
                $cartObject = new Cart($cart['id_cart']);
                $productsCart = $cartObject->getProducts();

                array_push($carts, [
                    'id_cart' => $cart['id_cart'],
                    'nb_products' => count($productsCart),
                    'products' => [],
                    'date_add' => $cart['date_add'],
                ]);


                $attributes_list = AttributeGroup::getSawCutModuleAttributeGroupNames($this->context->language->id);

                foreach ($productsCart as $product) {

                    $productName = $product['name'];
                    if (is_array($attributes_list)) {
                        $attributes = implode('|', $attributes_list);
                        $productName = preg_replace('/(\s-\s[' . $attributes . ']+\s:\s[a-zA-Z].*)/m', '',
                            $productName);
                    }

                    if (!is_null($product['id_customization'])) {

                        $customization = Db::getInstance()->executeS('SELECT * FROM `' . _DB_PREFIX_ . 'customized_data` WHERE id_customization = ' . (int)$product['id_customization']);
                        if (isset($customization[0]['value'])) {
                            $productName .= ' - ' . preg_replace('/(:\s[a-zA-Z])/', '' , $product['attributes']).': ' . $customization[0]['value'];
                        }
                    }

                    array_push($carts[$index]['products'], [
                        'id_product' => $product['id_product'],
                        'id_product_attribute' => $product['id_product_attribute'],
                        'product_reference' => $product['reference'],
                        'product_name' => $productName,
                        'product_quantity' => $product['cart_quantity'],
                        'total_wt' => $product['total_wt'],
                    ]);
                }
                unset($cartObject);
            }
        }

        // get addresses
        $addresses = $customer->getAddresses($id_lang);

        // get messages
        $messages = [];
        $messageList = CustomerThread::getCustomerMessages($customer->id);

        if (count($messageList) >= 1) {
            foreach ($messageList as $index => $message) {
                array_push($messages, [
                    'id_customer_thread' => $message['id_customer_thread'],
                    'message' => $message['message'],
                    'ip' => (int)$message['ip_address'] == $message['ip_address'] ? long2ip((int)$message['ip_address']) : $message['ip_address'],
                    'date_add' => $message['date_add'],
                ]);
            }
        }

        // get connections
        $connections = $customer->getLastConnections();

        // get referrers
        $referrer = Referrer::getReferrers($customer->id);

        $data['customerInfo'] = $customerInfo;
        $data['orders'] = $orders;
        $data['carts'] = $carts;
        $data['addresses'] = $addresses;
        $data['messages'] = $messages;
        $data['connections'] = $connections;
        $data['referrer'] = $referrer;

        return $data;
    }

}
