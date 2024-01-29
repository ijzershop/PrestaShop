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
 * Interface EM1DashboardInterface
 */

interface EM1PushNotificationInterface
{
    /**
     * Some desc
     *
     * @return array
     */
    public function getPushNotificationSettings();

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
     */
    public function setPushNotificationSettings(
        $userId,
        $appConnectionId,
        $registrationId,
        $pushNewOrder,
        $pushOrderStatuses,
        $pushNewCustomer,
        $notNotifiedOrderStatusIds
    );

    /**
     * Some desc
     *
     * @param $appConnectionId
     * @param $registrationId
     * @return void
     */
    public function deletePushNotificationSettings($appConnectionId, $registrationId);
}
