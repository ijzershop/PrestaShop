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
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author    eMagicOne <contact@emagicone.com>
 *  @copyright 2014-2019 eMagicOne
 *  @license   http://www.gnu.org/licenses   GNU General Public License
 */

function emoIsAuthenticated($key)
{
    return hash('sha256', _COOKIE_KEY_) === $key;
}

function emoChangeStatus($userIds, $value)
{
    $ids = emoPrepareIds($userIds);

    if (!$ids) {
        return 'Parameters are incorrect';
    }

    $result = Db::getInstance()->update(
        'bridgeconnector_ma_users',
        array('status' => (int)$value),
        '`user_id` IN (' . pSQL($ids) . ')'
    );

    if ($result) {
        return 'success';
    }

    return 'Some error occurred while changing users status in bulk';
}

function emoDeletePush($ids)
{
    $ids = emoPrepareIds($ids);

    if (!$ids) {
        return 'Parameters are incorrect';
    }

    $result = Db::getInstance()->delete('bridgeconnector_ma_push_notifications', '`id` IN ('.pSQL($ids).')');

    if ($result) {
        return 'success';
    }

    return 'Some error occurred while deleting push notification data';
}

function emoDeleteUser($userIds)
{
    $userIds = emoPrepareIds($userIds);

    if (!$userIds) {
        return 'Parameters are incorrect';
    }

    $deleteUsers = Db::getInstance()->delete(
        'bridgeconnector_ma_users',
        '`user_id` IN (' . pSQL($userIds) . ')'
    );
    $deleteTokens = Db::getInstance()->delete(
        'bridgeconnector_ma_tokens',
        '`user_id` IN (' . pSQL($userIds) . ')'
    );
    $deletePushNotifications = Db::getInstance()->delete(
        'bridgeconnector_ma_push_notifications',
        '`user_id` IN (' . pSQL($userIds) . ')'
    );

    if ($deleteUsers && $deleteTokens && $deletePushNotifications) {
        return 'success';
    }

    return 'Some error occurred while deleting user';
}

function emoGetUsers()
{
    $dbQuery    = new DbQuery();
    try {
        $users = Db::getInstance()->executeS(
            $dbQuery->select(
                '`user_id`, `username`, `password`, `employee_id`, `allowed_actions`, `qr_code_hash`, `status`'
            )
                ->from('bridgeconnector_ma_users')
                ->build()
        );

        if (!is_array($users)) {
            return 'error';
        }
    } catch (PrestaShopDatabaseException $e) {
        return 'error';
    } catch (PrestaShopException $e) {
        return 'error';
    }

    $shopUrl    = emoGetShopUrl();
    foreach ($users as $i => $user) {
        if ($user['employee_id']) {
            $employee = Db::getInstance()->executeS("
            SELECT firstname, lastname FROM " . _DB_PREFIX_ . "employee WHERE id_employee = ${user['employee_id']}
            ");
        }
        if (array_key_exists('firstname', reset($employee))
            && array_key_exists('lastname', reset($employee))
        ) {
            $employeeName = reset($employee)['firstname'] . ' ' . reset($employee)['lastname'];
        } else {
            $employeeName = 'undefined';
        }
        $users[$i]['employee'] = $employeeName;
        $users[$i]['allowed_actions'] = emoGetUserActionsFromCodes($user['allowed_actions']);
        $users[$i]['qr_code_data']    =  call_user_func(
            'base64_encode',
            json_encode(
                array(
                    'url'       => $shopUrl,
                    'login'     => $user['username'],
                    'password'  => $user['password']
                )
            )
        );
    }

    return $users;
}

function emoGetActions($user_id)
{
    $userActions = Db::getInstance()->getValue(
        'SELECT `allowed_actions` 
          FROM `' . _DB_PREFIX_ . 'bridgeconnector_ma_users` 
          WHERE `user_id` = ' . (int)$user_id
    );

    if ($userActions === false) {
        return 'error';
    }

    return emoGetActionsByCodes($userActions);
}

function emoSaveUserActions($userId, $selectedActions)
{
    $result = Db::getInstance()->update(
        'bridgeconnector_ma_users',
        array('allowed_actions' => pSQL($selectedActions)),
        '`user_id` = '.(int)$userId
    );

    $allowedActions = explode(';', $selectedActions);
    emoDoOperationsAfterUserActionsSaved($userId, $allowedActions);

    if (!$result) {
        return 'error';
    }

    return 'success';
}

function emoDoOperationsAfterUserActionsSaved($userId, $allowedActions)
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1UserPermissions.php';
    $data = array(
        'push_new_order'        => 0,
        'push_new_customer'     => 0,
        'push_order_statuses'   => 0
    );

    if (!in_array(EM1UserPermissions::CODE_NOTIFICATION_PUSH_NEW_ORDER, $allowedActions, true)) {
        $data['push_new_order'] = 1;
    }

    if (!in_array(EM1UserPermissions::CODE_NOTIFICATION_PUSH_NEW_CUSTOMER, $allowedActions, true)) {
        $data['push_new_customer'] = 1;
    }

    if (!in_array(EM1UserPermissions::CODE_NOTIFICATION_PUSH_CHANGE_ORDER_STATUSES, $allowedActions, true)) {
        $data['push_order_statuses'] = 1;
    }

    Db::getInstance()->update(
        'bridgeconnector_ma_push_notifications',
        $data,
        '`user_id` = ' . (int)$userId
    );
}

function emoGetUserActions($user_id)
{
    $userActions = Db::getInstance()->getValue(
        'SELECT `allowed_actions` 
        FROM `' . _DB_PREFIX_ . 'bridgeconnector_ma_users` 
        WHERE `user_id` = ' . (int)$user_id
    );

    if ($userActions !== false) {
        return emoGetUserActionsFromCodes($userActions);
    }

    return 'error';
}

function emoGetActionsByCodes($actionsCodes)
{
    $restrictedActions = emoGetRestrictedActions();
    $actions = array();

    if (!empty($actionsCodes)) {
        $actions = explode(';', $actionsCodes);
    }

    return emoGetActionsAsArray($restrictedActions, $actions);
}

function emoCheckUserData($login, $userId)
{
    $isLoginExists = Db::getInstance()->getValue(
        'SELECT `user_id` 
        FROM `' . _DB_PREFIX_ . "bridgeconnector_ma_users` 
        WHERE `username` = '" . pSQL($login) . "' AND `user_id` <> " . (int)$userId
    );

    if (!$isLoginExists) {
        return 'success';
    }

    return 'The same login already exists';
}

function emoSaveUser($userId, $login, $password, $actionsCodes, $value, $isNewUser)
{
    if ($isNewUser == '1') {
        $result = Db::getInstance()->insert(
            'bridgeconnector_ma_users',
            array(
                'username'          => pSQL($login),
                'password'          => md5($password),
                'employee_id'       => Context::getContext()->employee->id,
                'allowed_actions'   => pSQL($actionsCodes),
                'status'            => (int)$value,
                'qr_code_hash'      => hash('sha256', time())
            )
        );
    } else {
        $currentPassword = Db::getInstance()->getValue(
            'SELECT `password` 
            FROM `' . _DB_PREFIX_ . 'bridgeconnector_ma_users` 
            WHERE `user_id` = '.(int)$userId
        );

        if ($currentPassword != $password) {
            $password = md5($password);
        }

        $result = Db::getInstance()->update(
            'bridgeconnector_ma_users',
            array('username' => pSQL($login), 'password' => pSQL($password)),
            '`user_id` = '.(int)$userId
        );
        Db::getInstance()->delete('bridgeconnector_ma_tokens', '`user_id` = ' . (int)$userId);
    }

    if ($result) {
        return 'success';
    }

    return 'error';
}

function emoGetUserByUsername($login)
{
    $result = array();
    $user_obj = new DbQuery();
    $user_obj->select(
        'mu.`user_id`,
        mu.`username`,
        mu.`password`,
        mu.`employee_id`,
        mu.`allowed_actions`,
        mu.`qr_code_hash`,
        mu.`status`'
    );
    $user_obj->from('bridgeconnector_ma_users', 'mu');
    $user_obj->where("mu.`username` = '".pSQL($login)."'");
    $user_sql = $user_obj->build();
    $user = Db::getInstance()->executeS($user_sql);

    if (isset($user[0])) {
        $employee = reset(Employee::getEmployeesByProfile($user[0]['employee_id']));
        $user[0]['allowed_actions'] = emoGetUserActionsFromCodes($user[0]['allowed_actions']);
        $user[0]['employee'] = $employee['firstname'] . ' ' . $employee['lastname'];
        $user[0]['qr_code_data'] = call_user_func(
            'base64_encode',
            json_encode(
                array(
                    'url'       => emoGetShopUrl(),
                    'login'     => $user[0]['username'],
                    'password'  => $user[0]['password']
                )
            )
        );
        $result = $user[0];
    }

    return $result;
}

function emoRegenerateQrCodeHash($userId)
{
    $hash = hash('sha256', time());
    $result = Db::getInstance()->update(
        'bridgeconnector_ma_users',
        array(
            'qr_code_hash' => pSQL($hash)
        ),
        '`user_id` = '.(int)$userId
    );

    if ($result) {
        return array('hash' => $hash);
    }

    return 'error';
}

function emoGetOrderStatuses()
{
    $statuses = array();
    $orderStatuses = OrderState::getOrderStates(Configuration::get('PS_LANG_DEFAULT'));

    foreach ($orderStatuses as $status) {
        $statuses[$status['id_order_state']] = $status['name'];
    }

    return $statuses;
}

function emoReplaceNull($data)
{
    if (!is_array($data)) {
        $data = array();
    }

    foreach ($data as $index => $values) {
        foreach ($values as $key => $value) {
            if ($value === null) {
                $data[$index][$key] = '';
            }
        }
    }

    return $data;
}

function emoPrepareIds($data)
{
    if (!$data) {
        return false;
    }

    $ids   = array();
    $arr   = explode(',', $data);
    $count = count($arr);

    for ($i = 0; $i < $count; $i++) {
        $ids[] = (int)trim($arr[$i]);
    }

    return implode(',', $ids);
}

function emoGetUserActionsFromCodes($codes = '')
{
    $restricted_actions = emoGetRestrictedActions();

    if (empty($codes)) {
        $result = 'Nothing';
    } else {
        $action_codes = explode(';', $codes);
        $result       = emoGetUserAllowedActionsAsString($action_codes, $restricted_actions);
    }

    return $result;
}

function emoGetActionsAsArray($restrictedActions, $actionsCodes)
{
    $preparedActions = array();

    foreach ($restrictedActions as $restrictions) {
        $restrictionsItems = array();
        foreach ($restrictions['items'] as $item) {
            $actionAllowed = 0;
            if (!empty($actionsCodes)
                && in_array($item['code'], $actionsCodes, true)
            ) {
                $actionAllowed = 1;
            }

            $restrictionsItems[] = array(
                'code' => $item['code'],
                'name' => $item['name'],
                'allowed' => $actionAllowed
            );
        }

        $preparedActions[] = array(
            'group_name' => $restrictions['title'],
            'child' => $restrictionsItems
        );
    }

    return $preparedActions;
}

function emoGetUserAllowedActionsAsString($actionCodes, $restrictedActions)
{
    $result = '';
    $allItems = 0;
    foreach ($restrictedActions as $restrictions) {
        $returnString = '';
        $allItems += count($restrictions['items']);
        foreach ($restrictions['items'] as $item) {
            if (in_array($item['code'], $actionCodes, true)) {
                if (!empty($returnString)) {
                    $returnString .= ', ';
                }

                $returnString .= $item['name'];
            }
        }

        if (!empty($returnString)) {
            if (!empty($result)) {
                $result .= ', ';
            }

            $result .= $restrictions['title'] . ' (' . $returnString . ')';
        }
    }

    return $allItems === count($actionCodes) ? 'All' : $result;
}

function emoGetShopUrl()
{
    $shop_info = new Shop((int)Configuration::get('PS_SHOP_DEFAULT'));
    $shop_url = $shop_info->getBaseURL();
    $shop_url = str_replace(array('http://', 'https://'), '', $shop_url);
    preg_replace('/\/*$/i', '', $shop_url);

    return $shop_url;
}

function bridgeGetTables()
{
    $tableList = array();
    $databaseTables = Db::getInstance()->executeS('SHOW TABLES');
    $bridgeOptions  = unserialize(Configuration::get('BRIDGE_OPTIONS'));
    $excludedTables = explode(';', $bridgeOptions['exclude_db_tables']);

    foreach ($databaseTables as $tableName) {
        $tableName = array_shift($tableName);
        $tableList[] = array(
            'table_name' => $tableName,
            'checked' => in_array($tableName, $excludedTables, true) ? 'checked' : ''
        );
    }

    return $tableList;
}

function emoGetEmployees($userId)
{
    $employeesData = array();
    if (strpos('new', $userId) !== false) {
        $selectedEmployeeId = Db::getInstance()->execute(
            "SELECT employee_id FROM bridgeconnector_ma_users WHERE user_id = $userId"
        );
    }
    $employees = Employee::getEmployees();
    foreach ($employees as $employee) {
        $employeesData[] = array(
            'employee_id'  => (int)$employee['id_employee'],
            'full_name'    => (string)$employee['firstname'] . ' ' . (string)$employee['lastname'],
            'selected'     => $selectedEmployeeId == $employee['id_employee'] ? 1 : 0
        );
    }

    return array('employees' => $employeesData);
}

function emoSaveUserEmployee($userId, $employeeId)
{
    $result = Db::getInstance()->update(
        'bridgeconnector_ma_users',
        array('employee_id' => (int) $employeeId),
        '`user_id` = ' . (int) $userId
    );

    if (!$result) {
        return 'error';
    }

    return 'success';
}

function emoGetUserEmployee($userId)
{
    $userEmployee = Db::getInstance()->getValue(
        'SELECT `employee_id` 
        FROM `' . _DB_PREFIX_ . 'bridgeconnector_ma_users` 
        WHERE `user_id` = ' . (int) $userId
    );


    if ($userEmployee !== false) {
        $employee = new Employee((int)$userEmployee);
        return array('full_name' => (string)$employee->firstname . ' ' . (string)$employee->lastname);
    }

    return 'error';
}
