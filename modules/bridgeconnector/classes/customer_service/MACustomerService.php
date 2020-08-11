<?php
/**
 *    This file is part of eMagicOne Store Manager Bridge Connector.
 *
 *   eMagicOne Store Manager Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Store Manager Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

includedCustomerServiceFiles();

/**
 * Class MACustomerService
 */
class MACustomerService extends EM1Main implements EM1CustomerServiceInterface
{

    /**
     * @var int $languageId
     */
    private $languageId;

    /**
     * @var int $languageId
     */
    private $employeeId;

    /**
     * @var int $languageId
     */
    private $customerThreadId;

    /**
     * MACustomerService constructor.
     *
     * @param int   $languageId
     * @param int   $customerThreadId
     * @param int   $employeeId
     */
    public function __construct($languageId, $customerThreadId = null, $employeeId = null)
    {
        $this->languageId = $languageId;
        $this->customerThreadId = $customerThreadId;
        $this->employeeId = $employeeId;
    }

    /**
     * @param $customerMail
     * @param $orderId
     *
     * @return array
     * @throws EM1Exception
     */
    private function getOrderMessages($customerMail, $orderId)
    {
        $ordersMessagesResponse = array();

        try {
            /** @var CustomerThreadCore */
            $customerThreadId = (int)Db::getInstance()->getValue(
                '
                    SELECT cm.id_customer_thread
                    FROM ' . _DB_PREFIX_ . 'customer_thread cm
                    WHERE cm.email = \'' . pSQL($customerMail) . '\'
                        AND cm.id_order = ' . (int)$orderId
            );
            $orderMessages = CustomerThread::getMessageCustomerThreads($customerThreadId);

            foreach ($orderMessages as $message) {
                $fileLink = '';
                if (isset($message[self::FIELD_FILE_NAME])
                    && file_exists(_PS_UPLOAD_DIR_ . $message[self::FIELD_FILE_NAME])
                    && Validate::isFileName($message[self::FIELD_FILE_NAME])
                ) {
                    $fileLink = self::getUploadedFileLink($message[self::FIELD_FILE_NAME]);
                }

                $orderMessageTimestamp = strtotime($message[self::FIELD_DATE_ADD]);
                $ordersMessagesResponse[$message[self::FIELD_DATE_ADD]] = array(
                    self::KEY_MESSAGE_ID        => (int)$message['id_customer_message'],
                    self::KEY_EMPLOYEE_ID       => (int)$message['id_employee'],
                    self::KEY_FROM              => (string)$message['employee_name'],
                    self::KEY_MESSAGE           => (string)$message[self::FIELD_MESSAGE],
                    self::KEY_URL_ATTACHMENT    => $fileLink,
                    self::KEY_IS_PRIVATE        => (bool)$message[self::FIELD_PRIVATE],
                    self::KEY_DATE_ADD          => self::convertTimestampToMillisecondsTimestamp(
                        $orderMessageTimestamp
                    ),
                );
            }
        } catch (PrestaShopDatabaseException $e) {
            //todo: write specific Exception code for this section
            throw new EM1Exception('code', $e->getMessage());
        } catch (PrestaShopException $e) {
            //todo: write specific Exception code for this section
            throw new EM1Exception('code', $e->getMessage());
        }

        return $ordersMessagesResponse;
    }

    /**
     * @param   int $orderId    Order Id
     * @param   int $languageId Language Id
     *
     * @return  array Returns an array of timeline object
     * @throws  EM1Exception
     */
    public static function getTimelineDetails($orderId, $languageId)
    {
        $order              = new Order($orderId);
        $customerThreadId = (int)Db::getInstance()->getValue(
            '
			SELECT cm.id_customer_thread
			FROM ' . _DB_PREFIX_ . 'customer_thread cm
			WHERE cm.email = \'' . pSQL($order->getCustomer()->email) . '\'
				AND cm.id_order = ' . (int)$orderId
        );

        $customerThreadMessagesCount = (int)self::getQueryValue('
            SELECT COUNT(`id_customer_message`)
            FROM `' . _DB_PREFIX_ . 'customer_message`
            WHERE `id_customer_thread` = ' . $customerThreadId);

        if ($customerThreadMessagesCount <= 0) {
            return null;
        }

        $customerThreadLastEmployeeId = (int)self::getQueryValue('
            SELECT `id_employee`
            FROM `' . _DB_PREFIX_ . 'customer_message`
            WHERE `id_customer_thread` = ' . $customerThreadId . ' 
            HAVING MAX(`id_customer_message`)');

        $customerThread = new CustomerThread($customerThreadId);
        $itemsCount = ($customerThreadMessagesCount + count($order->getHistory($languageId)));
        return array(
            'customer_thread_id'    => $customerThreadId,
            'status'                => $customerThread->status,
            'employee_id'           => $customerThreadLastEmployeeId,
            'items_count'           => $itemsCount
        );
    }

    /**
     * @param   OrderCore $order
     *
     * @return  array
     */
    private function getOrderHistory($order)
    {
        $orderHistoryResponse = [];
        if ($order instanceof OrderCore) {
            $orderHistory         = $order->getHistory($this->languageId);
            foreach ($orderHistory as $history) {
                $historyTimestamp                                     = strtotime($history[self::FIELD_DATE_ADD]);
                $employeeFullName                                     = trim(
                    $history[self::FIELD_EMPLOYEE_FIRSTNAME] . ' ' . $history[self::FIELD_EMPLOYEE_LASTNAME]
                );

                $orderHistoryResponse[] = [
                    self::KEY_ORDER_HISTORY_ID  => (int)$history[self::FIELD_ID_ORDER_HISTORY],
                    self::KEY_EMPLOYEE_ID       => (int)$history[self::FIELD_ID_EMPLOYEE],
                    self::KEY_EMPLOYEE_NAME     => $employeeFullName,
                    self::KEY_ORDER_STATUS_ID   => (int)$history[self::FIELD_ID_ORDER_STATE],
                    self::KEY_DATE_ADD          => self::convertTimestampToMillisecondsTimestamp($historyTimestamp)
                ];
            }
        }

        return $orderHistoryResponse;
    }

    /**
     * @param $orderId
     * @throws EM1Exception
     */
    public function getOrderTimeline($orderId)
    {
        $responseArray = [
            'timeline'       => [],
            'order_history'  => [],
            'order_messages' => []
        ];

        $order = new Order($orderId);

        $customer = new Customer($order->id_customer);

        $responseArray['timeline'] = self::getTimelineDetails($orderId, $this->languageId);
        $responseArray['order_history'] = $this->getOrderHistory($order);

        $customerThreadId = (int)Db::getInstance()->getValue(
            '
                    SELECT cm.id_customer_thread
                    FROM ' . _DB_PREFIX_ . 'customer_thread cm
                    WHERE cm.email = \'' . pSQL($customer->email) . '\'
                        AND cm.id_order = ' . (int)$orderId
        );
        $orderMessages = CustomerThread::getMessageCustomerThreads($customerThreadId);

        foreach ($orderMessages as $message) {
            $responseArray['order_messages'][] = self::getOrderMessageDto($message);
        }
        self::generateResponse($responseArray);
    }

    /**
     * @param $message
     * @return array
     */
    public static function getOrderMessageDto($message)
    {
        $fileLink = '';
        if (isset($message[self::FIELD_FILE_NAME])
            && file_exists(_PS_UPLOAD_DIR_ . $message[self::FIELD_FILE_NAME])
            && Validate::isFileName($message[self::FIELD_FILE_NAME])
        ) {
            $fileLink = self::getUploadedFileLink($message[self::FIELD_FILE_NAME]);
        }

        $orderMessageTimestamp = strtotime($message[self::FIELD_DATE_ADD]);
        return [
            self::KEY_MESSAGE_ID     => (int)$message['id_customer_message'],
            self::KEY_EMPLOYEE_ID    => (int)$message['id_employee'],
            self::KEY_FROM           => (string)$message['employee_name'],
            self::KEY_MESSAGE        => (string)$message[self::FIELD_MESSAGE],
            self::KEY_URL_ATTACHMENT => $fileLink,
            self::KEY_IS_PRIVATE     => (bool)$message[self::FIELD_PRIVATE],
            self::KEY_DATE_ADD       => self::convertTimestampToMillisecondsTimestamp(
                $orderMessageTimestamp
            ),
        ];
    }

    //todo: write annotation for getOrderMessageData method
    public function getPredefinedOrderMessages()
    {
        $predefinedOrderMessagesResult = array();
        $predefinedOrderMessages = OrderMessage::getOrderMessages($this->languageId);
        foreach ($predefinedOrderMessages as $message) {
            $predefinedOrderMessagesResult[] = array(
                'message_id' => (int)$message['id_order_message'],
                'name' => $message['name'],
                'message' => $message['message']
            );
        }

        //todo: add key to constants
        self::generateResponse(
            array('messages' => $predefinedOrderMessagesResult)
        );
    }

    public function changeCustomerThreadStatus($status)
    {
        if (!in_array($status, array('open', 'closed', 'pending1', 'pending2'))) {
            new EM1Exception('incorrect_thread_status');
        }

        $result = Db::getInstance()->execute('
                UPDATE ' . _DB_PREFIX_ . 'customer_thread
                SET status = "' . $status . '"
                WHERE id_customer_thread = ' . $this->customerThreadId . ' LIMIT 1
        ');

        if ($result) {
            self::generateResponse();
        }
    }

    public function forwardCustomerThreadMessages(
        $forwardEmployeeId,
        $translatedFields,
        $forwardMessage,
        $output
    ) {
        $responseArray = [
            'message'     => [],
            'items_count' => 0
        ];

        $customerMessage = new CustomerMessage();
        $customerMessage->id_employee = (int)$this->employeeId;
        $customerMessage->id_customer_thread = (int)$this->customerThreadId;
        $customerMessage->ip_address = (int)ip2long(Tools::getRemoteAddr());

        $currentEmployee = new Employee($this->employeeId);
        $forwardEmployee = new Employee($forwardEmployeeId);
        if ($forwardEmployee && Validate::isLoadedObject($forwardEmployee)) {
            $validationResult = $customerMessage->validateField('message', $forwardMessage, null, array(), true);
            if ($validationResult !== true) {
                throw new EM1Exception('forward_message_issue', $validationResult);
            }

            $params = array(
                '{messages}'    => Tools::stripslashes($output),
                '{employee}'    => $currentEmployee->firstname . ' ' . $currentEmployee->lastname,
                '{comment}'     => Tools::stripslashes(Tools::nl2br($forwardMessage)),
                '{firstname}'   => $forwardEmployee->firstname,
                '{lastname}'    => $forwardEmployee->lastname,
            );

            $send = Mail::Send(
                $this->languageId,
                'forward_msg',
                $translatedFields['subject'],
                $params,
                $forwardEmployee->email,
                $forwardEmployee->firstname . ' ' . $forwardEmployee->lastname,
                $currentEmployee->email,
                $currentEmployee->firstname . ' ' . $currentEmployee->lastname,
                null,
                null,
                _PS_MAIL_DIR_,
                true
            );

            if ($send !== false) {
                $customerMessage->private = 1;
                $customerMessage->message = $translatedFields['message'];
                $customerMessage->add();

                $orderMessages = CustomerThread::getMessageCustomerThreads($this->customerThreadId);
                $responseArray['message'] = self::getOrderMessageDto(end($orderMessages));
                $responseArray['items_count'] = count($orderMessages);

                self::generateResponse($responseArray);
            }
        }

        throw new EM1Exception(
            'message_was_not_sent',
            'An error occurred. Your message was not sent. Please contact your system administrator.'
        );
    }

    public function forwardCustomerThreadMessagesByEmail(
        $forwardEmail,
        $forwardMessage,
        $translatedFields,
        $output
    ) {
        $customerMessage = new CustomerMessage();
        $customerMessage->id_employee = (int)$this->employeeId;
        $customerMessage->id_customer_thread = (int)$this->customerThreadId;
        $customerMessage->ip_address = (int)ip2long(Tools::getRemoteAddr());

        $currentEmployee = new Employee($this->employeeId);
        $params = array(
            '{messages}'    => Tools::nl2br(Tools::stripslashes($output)),
            '{employee}'    => $currentEmployee->firstname . ' ' . $currentEmployee->lastname,
            '{comment}'     => Tools::stripslashes($forwardMessage),
            '{firstname}'   => '',
            '{lastname}'    => '',
        );

        $send = Mail::Send(
            $this->languageId,
            'forward_msg',
            $translatedFields['subject'],
            $params,
            $forwardEmail,
            null,
            $currentEmployee->email,
            $currentEmployee->firstname . ' ' . $currentEmployee->lastname,
            null,
            null,
            _PS_MAIL_DIR_,
            true
        );

        if ($send !== false) {
            $customerMessage->message = $translatedFields['message'];
            $customerMessage->add();
            self::generateResponse();
        }

        throw new EM1Exception(
            'message_was_not_sent',
            'An error occurred. Your message was not sent. Please contact your system administrator.'
        );
    }

    public function getCustomerThreadMessages()
    {
        return Db::getInstance()->getRow('
            SELECT ct.*, cm.*, cl.name subject, CONCAT(e.firstname, \' \', e.lastname) employee_name,
                CONCAT(c.firstname, \' \', c.lastname) customer_name, c.firstname
            FROM ' . _DB_PREFIX_ . 'customer_thread ct
            LEFT JOIN ' . _DB_PREFIX_ . 'customer_message cm
                ON (ct.id_customer_thread = cm.id_customer_thread)
            LEFT JOIN ' . _DB_PREFIX_ . 'contact_lang cl
                ON (cl.id_contact = ct.id_contact AND cl.id_lang = ' . $this->languageId . ')
            LEFT OUTER JOIN ' . _DB_PREFIX_ . 'employee e
                ON e.id_employee = cm.id_employee
            LEFT OUTER JOIN ' . _DB_PREFIX_ . 'customer c
                ON (c.email = ct.email)
            WHERE ct.id_customer_thread = ' . $this->customerThreadId . '
            ORDER BY cm.date_add DESC
        ');
    }

    public function deleteCustomerThread()
    {
        try {
            $ct = new CustomerThread($this->customerThreadId);
            if ($ct->delete()) {
                self::generateResponse();
            }
        } catch (PrestaShopException $e) {
            throw new EM1Exception('test', $e->getMessage());
        }
    }

    //todo: write annotation for sendOrderMessage method
    public function sendOrderMessage($orderId, $message, $isPrivate, $translatedFields)
    {
        $order = new Order($orderId);
        $customer = new Customer($order->id_customer);
        $email = $customer->email;

        // todo check if exists
        $customerThreadId = (int)Db::getInstance()->getValue(
            '
                    SELECT cm.id_customer_thread
                    FROM ' . _DB_PREFIX_ . 'customer_thread cm
                    WHERE cm.email = \'' . pSQL($email) . '\'
                        AND cm.id_order = ' . (int)$orderId
        );
        if ($customerThreadId < 0 || $customerThreadId == false) {
            $contacts = Contact::getContacts($this->languageId);
            foreach ($contacts as $contact) {
                //check if exists contact
                if (strpos($email, $contact['email']) !== false) {
                    $id_contact = $contact['id_contact'];
                }
            }

            if (!isset($id_contact)) { // if not use the default contact category
                $id_contact = $contacts[0]['id_contact'];
            }

            $ct = new CustomerThread();
            if (isset($order->id_customer)) { //if mail is owned by a customer assign to him
                $ct->id_customer = $order->id_customer;
            }

            $ct->email = $email;
            $ct->id_contact = $id_contact;
            $ct->id_lang = self::getDefaultLanguageId();
            $ct->id_shop = $order->id_shop; //new customer threads for unrecognized mails are not shown without shop id
            $ct->id_order = $order->id; //new customer threads for unrecognized mails are not shown without shop id
            $ct->status = 'open';
            $ct->token = Tools::passwdGen(12);
            $ct->save();
            $customerThreadId = $ct->id;
        }

        $customerThread = new CustomerThread($customerThreadId, self::getDefaultLanguageId());
        ShopUrl::cacheMainDomainForShop((int) $customerThread->id_shop);

        $customerMessage = new CustomerMessage();
        $customerMessage->id_employee = (int) $this->employeeId;
        $customerMessage->id_customer_thread = $customerThread->id;
        $customerMessage->ip_address = (int) ip2long(Tools::getRemoteAddr());
        $customerMessage->private = $isPrivate;
        $customerMessage->message = $message;
        $validationResult = $customerMessage->validateField('message', $customerMessage->message, null, array(), true);
        if ($validationResult !== true) {
            throw new EM1Exception('not_valid_send_order_message_field', $validationResult);
        }

        if ($customerMessage->add()) {
            $customer = new Customer($customerThread->id_customer);
            $params = [
                '{reply}'     => Tools::nl2br($message),
                '{link}'      => Tools::url(
                    Context::getContext()->link->getPageLink(
                        'contact',
                        true,
                        null,
                        null,
                        false,
                        $customerThread->id_shop
                    ),
                    'id_customer_thread=' . (int)$customerThread->id . '&token=' . $customerThread->token
                ),
                '{firstname}' => $customer->firstname,
                '{lastname}'  => $customer->lastname,
            ];

            $fromName   = null;
            $fromEmail  = null;
            $contact    = new Contact((int)$customerThread->id_contact, (int)$customerThread->id_lang);
            if (Validate::isLoadedObject($contact)) {
                $fromName  = $contact->name;
                $fromEmail = $contact->email;
            }

            if ($isPrivate) {
                $send = true;
            } else {
                $send = Mail::Send(
                    (int)$customerThread->id_lang,
                    'reply_msg',
                    $translatedFields['subject'],
                    $params,
                    $email,
                    null,
                    $fromEmail,
                    $fromName,
                    null,
                    null,
                    _PS_MAIL_DIR_,
                    true,
                    $customerThread->id_shop
                );
            }

            if ($send !== false) {
                $responseArray = [
                    'message'  => [
                        'message_id'  => (int)$customerMessage->id,
                        'employee_id' => (int)$this->employeeId,
                        'from'        => $fromName,
                        'message'     => $customerMessage->message,
                        'is_private'  => (bool)$customerMessage->private,
                        'date_add'    => self::convertTimestampToMillisecondsTimestamp($customerMessage->date_add)
                    ],
                    'timeline' => self::getTimelineDetails(
                        $orderId,
                        $this->languageId
                    )
                ];
                self::generateResponse($responseArray);
            }
        }

        throw new EM1Exception(
            'message_was_not_sent',
            'An error occurred. Your message was not sent. Please contact your system administrator.'
        );
    }
}

function includedCustomerServiceFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME
        . '/classes/customer_service/EM1CustomerServiceInterface.php';
}
