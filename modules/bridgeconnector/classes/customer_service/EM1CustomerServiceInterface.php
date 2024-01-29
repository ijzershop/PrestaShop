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

/**
 * Interface EM1CustomerServiceInterface
 */
interface EM1CustomerServiceInterface
{
    const FIELD_PRIVATE             = 'private';
    const FIELD_ID_EMPLOYEE         = 'id_employee';
    const FIELD_SUBJECT             = 'subject';
    const FIELD_CUSTOMER_NAME       = 'customer_name';
    const FIELD_DATE_ADD            = 'date_add';
    const FIELD_ID_ORDER            = 'id_order';
    const FIELD_ID_PRODUCT          = 'id_product';
    const FIELD_ID_CUSTOMER         = 'id_customer';
    const FIELD_MESSAGE             = 'message';
    const FIELD_STATUS              = 'status';
    const FIELD_READ                = 'read';
    const FIELD_FILE_NAME           = 'file_name';
    const FIELD_EMPLOYEE_FIRSTNAME  = 'employee_firstname';
    const FIELD_EMPLOYEE_LASTNAME   = 'employee_lastname';
    const FIELD_ID_ORDER_STATE      = 'id_order_state';
    const FIELD_COLOR               = 'color';
    const FIELD_ID_ORDER_HISTORY    = 'id_order_history';
    const FIELD_ID_CUSTOMER_MESSAGE = 'id_customer_message';
    const FIELD_EMPLOYEE_NAME       = 'employee_name';

    const KEY_DATE_ADD              = 'date_add';
    const KEY_ORDER_ID              = 'order_id';
    const KEY_ORDER_STATE_ID        = 'order_state_id';
    const KEY_PRODUCT_ID            = 'product_id';
    const KEY_CUSTOMER_ID           = 'customer_id';
    const KEY_COLOR                 = 'color';
    const KEY_TYPE                  = 'type';
    const KEY_MESSAGE               = 'message';
    const KEY_MESSAGE_TO            = 'message_to';
    const KEY_STATUS                = 'status';
    const KEY_PRIVATE               = 'private';
    const KEY_READ                  = 'read';
    const KEY_FILE_NAME             = 'file_name';
    const KEY_ORDER_HISTORY_ID      = 'order_history_id';
    const KEY_EMPLOYEE_ID           = 'employee_id';
    const KEY_EMPLOYEE_NAME         = 'employee_name';
    const KEY_ORDER_STATUS_ID       = 'order_status_id';
    const KEY_MESSAGE_ID            = 'message_id';
    const KEY_FROM                  = 'from';
    const KEY_URL_ATTACHMENT        = 'url_attachment';
    const KEY_IS_PRIVATE            = 'is_private';

    public function getOrderTimeline($orderId);

    public function getPredefinedOrderMessages();

    public function sendOrderMessage($orderId, $replyMessage, $isPrivate, $message);
}
