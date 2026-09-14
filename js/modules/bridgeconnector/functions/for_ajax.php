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
 *  @copyright 2014-2025 eMagicOne
 *  @license   http://www.gnu.org/licenses   GNU General Public License
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

function emoIsAuthenticated($key)
{
    return hash('sha256', _COOKIE_KEY_) === $key;
}

function emoGetActionsAsArray($restrictedActions, $actionsCodes)
{
    $preparedActions = [];

    foreach ($restrictedActions as $restrictions) {
        $restrictionsItems = [];
        foreach ($restrictions['items'] as $item) {
            $actionAllowed = 0;
            if (!empty($actionsCodes)
                && in_array($item['code'], $actionsCodes, true)
            ) {
                $actionAllowed = 1;
            }

            $restrictionsItems[] = [
                'code' => $item['code'],
                'name' => $item['name'],
                'allowed' => $actionAllowed,
            ];
        }

        $preparedActions[] = [
            'group_name' => $restrictions['title'],
            'child' => $restrictionsItems,
        ];
    }

    return $preparedActions;
}

function bridgeGetTables()
{
    $tableList = [];
    $databaseTables = Db::getInstance()->executeS('SHOW TABLES');
    $bridgeOptions = json_decode(Configuration::get('BRIDGE_OPTIONS'), true);
    $excludedTables = explode(';', $bridgeOptions['exclude_db_tables']);

    foreach ($databaseTables as $tableName) {
        $tableName = array_shift($tableName);
        $tableList[] = [
            'table_name' => $tableName,
            'checked' => in_array($tableName, $excludedTables, true) ? 'checked' : '',
        ];
    }

    return $tableList;
}
