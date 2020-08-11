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

class EM1Constants
{
    /**
     * MOST IMPORTANT THINGS TO DO BEFORE RELEASING MODULE
     *
     * 1. Increment module version (MODULE_VERSION)
     * 2. Increment module revisions (BC_MODULE_REVISION/MA_MODULE_REVISION) if some functionality was updated
     * 3. Specify the number of new (public) functions (MA_MODULE_NEW_REQUESTS)
     */

    const MODULE_VERSION                                        = '3.0.8';
    const BC_MODULE_REVISION                                    = 20;
    const MA_MODULE_REVISION                                    = 14;
    const MA_MODULE_NEW_REQUESTS                                = 0;

    const MODULE_NAME                                           = 'bridgeconnector';
    const OPTIONS_KEY                                           = 'BRIDGE_OPTIONS';

    /* Table names */
    const TABLE_BC_SESSION_KEYS                                 = 'bridgeconnector_session_keys';
    const TABLE_BC_FAILED_LOGIN                                 = 'bridgeconnector_failed_login';

    const TABLE_MA_TOKENS                                       = 'bridgeconnector_ma_tokens';
    const TABLE_MA_FAILED_LOGIN                                 = 'bridgeconnector_ma_failed_login';
    const TABLE_MA_PUSH_NOTIFICATIONS                           = 'bridgeconnector_ma_push_notifications';
    const TABLE_MA_USERS                                        = 'bridgeconnector_ma_users';

    const LOG_FILENAME                                          = 'bridgeconnector_ma.log';
    const LOG_FILE_PATH                                         = '/log/' . self::LOG_FILENAME;
    const HOOK_CREATE_ACCOUNT                                   = 'createAccount';
    const HOOK_ACTION_CUSTOMER_ACCOUNT_ADD                      = 'actionCustomerAccountAdd';
    const HOOK_ACTION_VALIDATE_ORDER                            = 'actionValidateOrder';
    const HOOK_ACTION_ORDER_STATUS_POST_UPDATE                  = 'actionOrderStatusPostUpdate';

    const FSM_SERVER_KEY                                        = 'AAAA37IGjTc:APA91bFtcuy4UDS5VG9RGgAeY7B_XO_7U5dGMcj'
        . 'QTO4xA4UJNG-bumaSwoAmWXFcR3KlmiyblRS2VOUpqrTiVjbVS-J3ncCx88UPUunsmfLcvNpGtig3_iFPgAUSM0uf4hNgFA02CCaf';

    const MODULE_API_KEY                                        = 'BRIDGECONNECTOR_API_KEY';
    const MODULE_TN_TEXT                                        = 'BRIDGECONNECTOR_TN_TEXT';
    const MODULE_TN_LNG                                         = 'BRIDGECONNECTOR_TN_LNG';
    const MODULE_CL_DATE                                        = 'BRIDGECONNECTOR_CL_DATE';

    const BRIDGECONNECTOR_DEFAULT_LOGIN                         = '1';
    const BRIDGECONNECTOR_DEFAULT_PASSWORD                      = '1';
    const BRIDGECONNECTOR_DEFAULT_ALLOW_COMPRESSION             = 1;
    const BRIDGECONNECTOR_DEFAULT_COMPRESS_LEVEL                = 6;      /* 1 - 9 */
    const BRIDGECONNECTOR_DEFAULT_LIMIT_QUERY_SIZE              = 1024;   /* kB */
    const BRIDGECONNECTOR_DEFAULT_PACKAGE_SIZE                  = 1024;   /* kB */
    const BRIDGECONNECTOR_DEFAULT_ALLOWED_IPS                   = '';
    const BRIDGECONNECTOR_MIN_COMPRESS_LEVEL                    = 1;
    const BRIDGECONNECTOR_MAX_COMPRESS_LEVEL                    = 9;
    const BRIDGECONNECTOR_MIN_LIMIT_QUERY_SIZE                  = 100;    /* kB */
    const BRIDGECONNECTOR_MAX_LIMIT_QUERY_SIZE                  = 100000; /* kB */
    const BRIDGECONNECTOR_MIN_PACKAGE_SIZE                      = 100;    /* kB */
    const BRIDGECONNECTOR_MAX_PACKAGE_SIZE                      = 30000;  /* kB */

    const CRYPT_KEY                                             = "EMO_bridgeconnector\0\0\0\0\0";

    const KEY_VERSION_FIFE                                      = '1.5';
    const KEY_VERSION_SIX                                       = '1.6';
    const KEY_VERSION_SEVEN                                     = '1.7';
    const GLOBAL_DATE_FORMAT                                    = 'Y-m-d H:i:s';
    const GCM_API_KEY                                           = 'AIzaSyDZatAmShD5pWkXwkfEbBrG6M1qpu6K_qo';
    const FB_API_KEY                                            = 'AIzaSyBtr6hOCAVztTIOk8mDzPRNr8wJ6tbY-Fs';
    const RESPONSE_CODE_SUCCESS                                 = 'success';
    const RESPONSE_CODE_NOT_EXISTS                              = 'not_exists';
    const RESPONSE_CODE_MODULE_DISABLED                         = 'module_disabled';
    const RESPONSE_CODE_OLD_APP                                 = 'old_app';
    const RESPONSE_CODE_AUTH_ERROR                              = 'auth_error';
    const RESPONSE_CODE_BAD_SESSION_KEY                         = 'bad_token';
    const RESPONSE_CODE_OLD_MODULE                              = 'old_module';
    const RESPONSE_CODE_ACTION_FORBIDDEN                        = 'action_forbidden';
    const RESPONSE_CODE_CONNECTION_ID_INCORRECT                 = 'connection_id_incorrect';
    const RESPONSE_CODE_PRODUCT_ID_INCORRECT                    = 'product_id_incorrect';
    const RESPONSE_CODE_COMBINATION_ID_INCORRECT                = 'combination_id_incorrect';
    const RESPONSE_CODE_USER_ID_INCORRECT                       = 'user_id_incorrect';
    const RESPONSE_CODE_ORDER_ID_INCORRECT                      = 'order_id_incorrect';
    const RESPONSE_CODE_ABANDONED_CART_ID_INCORRECT             = 'abandoned_cart_id_incorrect';
    const RESPONSE_CODE_MISSING_PARAMETERS                      = 'missing_parameters';
    const RESPONSE_CODE_DATA_NOT_UPDATED                        = 'data_not_updated';
    const RESPONSE_CODE_PRODUCT_NOT_FOUND                       = 'product_not_found';
    const RESPONSE_CODE_CUSTOMER_NOT_FOUND                      = 'customer_not_found';
    const RESPONSE_CODE_ORDER_NOT_FOUND                         = 'order_not_found';
    const RESPONSE_CODE_ABANDONED_CART_NOT_FOUND                = 'abandoned_cart_not_found';
    const RESPONSE_CODE_PRODUCT_NOT_ASSIGNED_TO_SHOP            = 'product_not_assigned_to_shop';
    const RESPONSE_CODE_PRODUCT_DATA_EMPTY                      = 'product_data_empty';
    const RESPONSE_CODE_IMAGE_CONTENT_EMPTY                     = 'image_content_empty';
    const RESPONSE_CODE_CANNOT_CREATE_FILE                      = 'cannot_create_file';
    const RESPONSE_CODE_CANNOT_CREATE_IMAGE_PATH                = 'cannot_create_image_path';
    const RESPONSE_CODE_ERROR_UPLOAD_FILE                       = 'error_upload_file';
    const RESPONSE_CODE_FILE_NOT_IMAGE                          = 'file_not_image';
    const RESPONSE_CODE_PRODUCT_NOT_UPDATED                     = 'product_not_updated';
    const RESPONSE_CODE_ERROR_JSON_DECODE                       = 'error_json_decode';
    const RESPONSE_CODE_ERROR_WHILE_SAVING_PRODUCT              = 'error_while_saving_product';
    const RESPONSE_CODE_ERROR_WHILE_CHANGING_ORDER_STATUS       = 'error_while_changing_order_status';
    const RESPONSE_CODE_PARAMETER_ACTION_EMPTY                  = 'parameter_action_empty';
    const RESPONSE_CODE_ACTION_INCORRECT                        = 'action_incorrect';
    const RESPONSE_CODE_NEW_ORDER_STATUS_INCORRECT              = 'new_order_status_incorrect';
    const RESPONSE_CODE_TRACKING_NUMBER_INCORRECT               = 'tracking_number_incorrect';
    const RESPONSE_CODE_ERROR_WHILE_SENDING_EMAIL               = 'error_while_sending_email';
    const RESPONSE_CODE_ORDER_NOT_VALID                         = 'order_not_valid';
    const RESPONSE_CODE_CANNOT_DELETE_PUSH_CONFIG               = 'cannot_delete_push_config';
    const RESPONSE_CODE_CANNOT_DELETE_COMBINATION               = 'cannot_delete_combination';
    const RESPONSE_CODE_NO_SUCH_PRODUCT                         = 'no_such_product';

    const METHODS_THAT_REQUIRE_CONTEXT_SHOP = [
        'getProducts',
        'searchProducts'
    ];
}
