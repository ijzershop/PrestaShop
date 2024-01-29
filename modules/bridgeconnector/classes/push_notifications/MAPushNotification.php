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

includedPushNotificationFiles();

class MAPushNotification extends EM1Main implements EM1PushNotificationInterface
{

    /**
     * Some desc
     *
     * @return void
     */
    public function getPushNotificationSettings()
    {
        // TODO: Implement getPushNotificationSettings() method.
    }

    /**
     * Some desc
     *
     * @param $userId
     * @param $appConnectionId
     * @param $registrationId
     * @param $pushNewOrder
     * @param $pushOrderStatuses
     * @param $pushNewCustomer
     * @param $notNotifiedOrderStatusIds
     * @return void
     * @throws EM1Exception
     */
    public function setPushNotificationSettings(
        $userId,
        $appConnectionId,
        $registrationId,
        $pushNewOrder,
        $pushOrderStatuses,
        $pushNewCustomer,
        $notNotifiedOrderStatusIds
    ) {
        if (empty($appConnectionId)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CONNECTION_ID_INCORRECT);
        }

        if (empty($registrationId)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_MISSING_PARAMETERS);
        }

        $deleteQuery = false;
        $updateQuery = false;
    //         Delete empty record
        try {
            if ($pushNewOrder === 0
                && $pushOrderStatuses === 0
                && $pushNewCustomer === 0
                && empty($notNotifiedOrderStatusIds)
            ) {
                $deleteQuery = Db::getInstance()->delete(
                    'bridgeconnector_ma_push_notifications',
                    "`app_connection_id` = '" . pSQL($appConnectionId) . "' AND  `registration_id` = '"
                    . pSQL($registrationId) . "'"
                );
            } else {
                $idExists = Db::getInstance()->getValue(
                    'SELECT `id` FROM `' . _DB_PREFIX_ . "bridgeconnector_ma_push_notifications` WHERE " .
                    "`app_connection_id` = '" . pSQL($appConnectionId) . "' AND `registration_id` = '" .
                    pSQL($registrationId) . "'"
                );

                $data = array(
                    'user_id'                           => $userId,
                    'push_new_order'                    => (int)$pushNewOrder,
                    'push_new_customer'                 => (int)$pushNewCustomer,
                    'push_order_statuses'               => (int)$pushOrderStatuses,
                    'not_notified_order_status_ids'     => (string)$notNotifiedOrderStatusIds
                );

                if ($idExists) {
                    $updateQuery = Db::getInstance()->update(
                        'bridgeconnector_ma_push_notifications',
                        $data,
                        '`id` = ' . (int)$idExists
                    );
                } else {
                    $data['app_connection_id'] = pSQL($appConnectionId);
                    $data['registration_id'] = pSQL($registrationId);
                    $updateQuery = Db::getInstance()->insert('bridgeconnector_ma_push_notifications', $data);
                }
            }
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR,
                $exception->getMessage()
            );
        }

        if ($deleteQuery || $updateQuery) {
            self::generateResponse();
        }

        throw new EM1Exception(EM1Exception::ERROR_CODE_DATA_NOT_UPDATED);
    }

    /**
     * Some desc
     *
     * @param $appConnectionId
     * @param $registrationId
     * @return void
     * @throws EM1Exception
     */
    public function deletePushNotificationSettings($appConnectionId, $registrationId)
    {
        if (empty($appConnectionId) && empty($registrationId)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_MISSING_PARAMETERS);
        }

        try {
            $query = Db::getInstance()->delete(
                'bridgeconnector_ma_push_notifications',
                "`app_connection_id` = '".pSQL($appConnectionId)."' AND `registration_id` = '"
                . pSQL($registrationId) . "'"
            );
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(
                EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR,
                $exception->getMessage()
            );
        }

        if (!$query) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_CANNOT_DELETE_PUSH_CONFIG);
        }

        self::generateResponse();
    }
}

function includedPushNotificationFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME
        . '/classes/push_notifications/EM1PushNotificationInterface.php';
}
