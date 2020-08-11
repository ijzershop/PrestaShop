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
 *  @copyright 2014-2018 eMagicOne
 *  @license   http://www.gnu.org/licenses   GNU General Public License
 */

class MobileAssistantConstants
{
    /* Table names */
    const T_SESSION_KEYS                        = 'mobassistantconnector_session_keys';
    const T_FAILED_LOGIN                        = 'mobassistantconnector_failed_login';
    const T_PUSH_NOTIFICATIONS                  = 'mobassistantconnector_push_notifications';
    const T_DEVICES                             = 'mobassistantconnector_devices';
    const T_USERS                               = 'mobassistantconnector_users';
    const T_ACCOUNTS                            = 'mobassistantconnector_accounts';
    const LOG_FILENAME                          = 'mobassistantconnector.log';
    const HOOK_CREATE_ACCOUNT                   = 'createAccount';
    const HOOK_ACTION_VALIDATE_ORDER            = 'actionValidateOrder';
    const HOOK_ACTION_ORDER_STATUS_POST_UPDATE  = 'actionOrderStatusPostUpdate';
    const MODULE_API_KEY                        = 'MOBASSISTANTCONNECTOR_API_KEY';
    const MODULE_TN_TEXT                        = 'MOBASSISTANTCONNECTOR_TN_TEXT';
    const MODULE_TN_LNG                         = 'MOBASSISTANTCONNECTOR_TN_LNG';
    const MODULE_CL_DATE                        = 'MOBASSISTANTCONNECTOR_CL_DATE';
}
