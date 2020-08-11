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

$key      = Tools::getValue('auth_key');
$function = Tools::getValue('call_function');

if (!emoIsAuthenticated($key)) {
    die(json_encode('Authentication error'));
}

if ($function && function_exists($function)) {
    if ($function === 'emoChangeStatus') {
        $user_ids = Tools::getValue('user_ids');
        $value    = Tools::getValue('value');
        echo json_encode(emoChangeStatus($user_ids, $value));
    } elseif ($function === 'emoGetActions') {
        $user_id  = Tools::getValue('user_id');
        echo json_encode(emoGetActions($user_id));
    } elseif ($function === 'emoGetEmployees') {
        $user_id  = Tools::getValue('user_id');
        echo json_encode(emoGetEmployees($user_id));
    } elseif ($function === 'emoSaveUserActions') {
        $user_id            = Tools::getValue('user_id');
        $selected_actions   = Tools::getValue('selected_actions');
        echo json_encode(emoSaveUserActions($user_id, $selected_actions));
    } elseif ($function === 'emoSaveUserEmployee') {
        $user_id       = Tools::getValue('user_id');
        $employee_id   = Tools::getValue('employee_id');
        echo json_encode(emoSaveUserEmployee($user_id, $employee_id));
    } elseif ($function === 'emoGetUserActions') {
        $user_id = Tools::getValue('user_id');
        echo json_encode(emoGetUserActions($user_id));
    } elseif ($function === 'emoGetUserEmployee') {
        $user_id = Tools::getValue('user_id');
        echo json_encode(emoGetUserEmployee($user_id));
    } elseif ($function === 'emoGetActionsByCodes') {
        $actions_codes = Tools::getValue('actions_codes');
        echo json_encode(emoGetActionsByCodes($actions_codes));
    } elseif ($function === 'emoChangeStatusForUser') {
        $user_ids = Tools::getValue('user_ids');
        $value    = Tools::getValue('value');
        echo json_encode(emoChangeStatus($user_ids, $value));
    } elseif ($function === 'emoDeleteUser') {
        $user_ids = Tools::getValue('user_ids');
        echo json_encode(emoDeleteUser($user_ids));
    } elseif ($function === 'emoCheckUserData') {
        $login   = Tools::getValue('login');
        $user_id = (int)Tools::getValue('user_id');
        echo json_encode(emoCheckUserData($login, $user_id));
    } elseif ($function === 'emoSaveUser') {
        $login          = Tools::getValue('login');
        $user_id        = (int)Tools::getValue('user_id');
        $password       = Tools::getValue('password');
        $actions_codes  = (string)Tools::getValue('actions_codes');
        $value          = Tools::getValue('value');
        $is_new_user    = Tools::getValue('is_new_user');
        echo json_encode(emoSaveUser($user_id, $login, $password, $actions_codes, $value, $is_new_user));
    } elseif ($function === 'emoGetUserByUsername') {
        $login = Tools::getValue('login');
        echo json_encode(emoGetUserByUsername($login));
    } elseif ($function === 'emoRegenerateQrCodeHash') {
        $user_id = (int)Tools::getValue('user_id');
        echo json_encode(emoRegenerateQrCodeHash($user_id));
    } elseif ($function === 'bridgeGetTables') {
        echo json_encode(bridgeGetTables());
    } else {
        echo json_encode($function());
    }
} else {
    die(json_encode('error'));
}
