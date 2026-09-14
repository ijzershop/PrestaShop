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
 * @copyright 2014-2025 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

$key = Tools::getValue('auth_key');
$function = Tools::getValue('call_function');

if (!emoIsAuthenticated($key)) {
    exit(json_encode('Authentication error'));
}

if ($function && is_string($function) && function_exists($function)) {
    switch ($function) {
        case 'bridgeGetTables':
            echo json_encode(bridgeGetTables());
            break;
        default:
            echo json_encode($function());
            break;
    }
} else {
    exit(json_encode('error'));
}
