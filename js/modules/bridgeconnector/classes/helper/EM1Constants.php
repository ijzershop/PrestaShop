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

class EM1Constants
{
    /**
     * MOST IMPORTANT THINGS TO DO BEFORE RELEASING MODULE
     *
     * 1. Increment module version (MODULE_VERSION)
     * 2. Increment module revisions (BC_MODULE_REVISION) if some functionality was updated
     */
    const MODULE_VERSION = '4.0.0';
    const BC_MODULE_REVISION = 21;

    const MODULE_NAME = 'bridgeconnector';
    const OPTIONS_KEY = 'BRIDGE_OPTIONS';

    /* Table names */
    const TABLE_BC_SESSION_KEYS = 'bridgeconnector_session_keys';
    const TABLE_BC_FAILED_LOGIN = 'bridgeconnector_failed_login';

    const LOG_FILENAME = 'bridgeconnector.log';
    const LOG_FILE_PATH = '/log/' . self::LOG_FILENAME;
    const HOOK_CREATE_ACCOUNT = 'createAccount';
    const HOOK_ACTION_CUSTOMER_ACCOUNT_ADD = 'actionCustomerAccountAdd';
    const HOOK_ACTION_VALIDATE_ORDER = 'actionValidateOrder';
    const HOOK_ACTION_ORDER_STATUS_POST_UPDATE = 'actionOrderStatusPostUpdate';

    const FSM_SERVER_KEY = 'AAAA37IGjTc:APA91bFtcuy4UDS5VG9RGgAeY7B_XO_7U5dGMcj'
        . 'QTO4xA4UJNG-bumaSwoAmWXFcR3KlmiyblRS2VOUpqrTiVjbVS-J3ncCx88UPUunsmfLcvNpGtig3_iFPgAUSM0uf4hNgFA02CCaf';

    const MODULE_API_KEY = 'BRIDGECONNECTOR_API_KEY';
    const MODULE_TN_TEXT = 'BRIDGECONNECTOR_TN_TEXT';
    const MODULE_TN_LNG = 'BRIDGECONNECTOR_TN_LNG';
    const MODULE_CL_DATE = 'BRIDGECONNECTOR_CL_DATE';

    const BRIDGECONNECTOR_DEFAULT_LOGIN = '1';
    const BRIDGECONNECTOR_DEFAULT_PASSWORD = '1';
    const BRIDGECONNECTOR_DEFAULT_ALLOW_COMPRESSION = 1;
    const BRIDGECONNECTOR_DEFAULT_COMPRESS_LEVEL = 6;      /* 1 - 9 */
    const BRIDGECONNECTOR_DEFAULT_LIMIT_QUERY_SIZE = 1024;   /* kB */
    const BRIDGECONNECTOR_DEFAULT_PACKAGE_SIZE = 1024;   /* kB */
    const BRIDGECONNECTOR_DEFAULT_ALLOWED_IPS = '';
    const BRIDGECONNECTOR_MIN_COMPRESS_LEVEL = 1;
    const BRIDGECONNECTOR_MAX_COMPRESS_LEVEL = 9;
    const BRIDGECONNECTOR_MIN_LIMIT_QUERY_SIZE = 100;    /* kB */
    const BRIDGECONNECTOR_MAX_LIMIT_QUERY_SIZE = 100000; /* kB */
    const BRIDGECONNECTOR_MIN_PACKAGE_SIZE = 100;    /* kB */
    const BRIDGECONNECTOR_MAX_PACKAGE_SIZE = 30000;  /* kB */

    const CRYPT_KEY = "EMO_bridgeconnector\0\0\0\0\0";
}
