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

class MobileAssistantAccess
{
    const HASH_ALGORITHM     = 'sha256';
    const MAX_LIFETIME       = 86400; /* 24 hours */
    const TABLE_SESSION_KEYS = 'mobassistantconnector_session_keys';
    const TABLE_FAILED_LOGIN = 'mobassistantconnector_failed_login';
    const TABLE_USERS        = 'mobassistantconnector_users';

    public static function clearOldData()
    {
        $timestamp       = time();
        $date_clear_prev = Configuration::get('MOBASSISTANTCONNECTOR_CL_DATE');
        $date            = date('Y-m-d H:i:s', ($timestamp - self::MAX_LIFETIME));

        if ($date_clear_prev === false || ($timestamp - (int)$date_clear_prev) > self::MAX_LIFETIME) {
            Db::getInstance()->delete(self::TABLE_SESSION_KEYS, "`date_added` < '".pSQL($date)."'");
            Db::getInstance()->delete(self::TABLE_FAILED_LOGIN, "`date_added` < '".pSQL($date)."'");
            Configuration::updateGlobalValue('MOBASSISTANTCONNECTOR_CL_DATE', $timestamp);
        }
    }

    public static function getSessionKey($hash, $user_id = false)
    {
        if (!$user_id) {
            $login_data = self::checkAuth($hash);

            if ($login_data) {
                $user_id = (int)$login_data['user_id'];
            }
        }

        if ($user_id) {
            return self::generateSessionKey($user_id);
        }

//        if (hash(self::HASH_ALGORITHM, $login_data['login'].$login_data['password']) == $hash)
//            return self::generateSessionKey();

        self::addFailedAttempt();
        return false;
    }

    public static function checkSessionKey($key, $user_id = false)
    {
        $timestamp = time();
        $where = array(
            "s.`session_key` = '".pSQL($key)."'",
            "s.`date_added` > '".pSQL(date('Y-m-d H:i:s', ($timestamp - self::MAX_LIFETIME)))."'",
            'u.`status` = 1'
        );

        if ($user_id) {
            $where[] = 'u.`user_id` = '.(int)$user_id;
        }

        $db_key = Db::getInstance()->getValue(
            'SELECT s.`session_key` FROM `'._DB_PREFIX_.self::TABLE_SESSION_KEYS.'` s LEFT JOIN `'._DB_PREFIX_
            .self::TABLE_USERS.'` u ON s.`user_id` = u.`user_id` WHERE '.implode(' AND ', $where)
        );

        if ($db_key) {
            return true;
        }

        self::addFailedAttempt();
        return false;
    }

    private static function generateSessionKey($user_id)
    {
        $timestamp = time();
        $key = Db::getInstance()->getValue(
            'SELECT `session_key` FROM `'._DB_PREFIX_.self::TABLE_SESSION_KEYS.'` WHERE `user_id` = '.(int)$user_id
            ." AND `date_added` > '".pSQL(date('Y-m-d H:i:s', ($timestamp - self::MAX_LIFETIME)))."'"
        );

        if ($key) {
            return $key;
        }

        $date = date('Y-m-d H:i:s', $timestamp);
        $key = hash(self::HASH_ALGORITHM, _COOKIE_KEY_.$timestamp);
        Db::getInstance()->execute(
            'INSERT INTO `'._DB_PREFIX_.self::TABLE_SESSION_KEYS."` (`session_key`, `user_id`, `date_added`) VALUES ('"
            .pSQL($key)."', ".(int)$user_id.", '".pSQL($date)."') ON DUPLICATE KEY UPDATE `session_key` = '".pSQL($key)
            ."', `date_added` = '".pSQL($date)."'"
        );

        return $key;
    }

    public static function addFailedAttempt()
    {
        $timestamp = time();
        Db::getInstance()->insert(
            self::TABLE_FAILED_LOGIN,
            array('ip' => pSQL($_SERVER['REMOTE_ADDR']), 'date_added' => date('Y-m-d H:i:s', $timestamp))
        );

        // Get count of failed attempts for last 24 hours and set delay
        $count_failed_attempts = Db::getInstance()->getValue(
            'SELECT COUNT(`ip`) FROM `'._DB_PREFIX_.self::TABLE_FAILED_LOGIN."` WHERE `ip` = '"
            .pSQL($_SERVER['REMOTE_ADDR'])."' AND `date_added` > '"
            .pSQL(date('Y-m-d H:i:s', ($timestamp - self::MAX_LIFETIME)))."'"
        );
        self::setDelay((int)$count_failed_attempts);
    }

    public static function checkAuth($hash, $file_logger = null)
    {
        $login_data = Db::getInstance()->executeS(
            'SELECT `user_id`, `username`, `password` FROM `'.pSQL(_DB_PREFIX_.self::TABLE_USERS).'` WHERE `status` = 1'
        );

        if ($login_data) {
            $count = count($login_data);

            for ($i = 0; $i < $count; $i++) {
                if (hash(self::HASH_ALGORITHM, $login_data[$i]['username'].$login_data[$i]['password']) == $hash) {
                    return $login_data[$i];
                }
            }
        }

        if ($file_logger) {
            $file_logger->logMessageCall("Hash accepted is incorrect", $file_logger->level);
        }

        return false;
    }

    public static function getAllowedActionsBySessionKey($key)
    {
        $result = array();
        $actions = Db::getInstance()->getValue(
            'SELECT u.`allowed_actions` FROM `'._DB_PREFIX_.self::TABLE_SESSION_KEYS.'` s LEFT JOIN `'._DB_PREFIX_
            .self::TABLE_USERS."` u ON u.`user_id` = s.`user_id` WHERE s.`session_key` = '".pSQL($key)."'"
        );

        if ($actions) {
            $result = explode(';', $actions);
        }

        return $result;
    }

    public static function getAllowedActionsByUserId($user_id)
    {
        $result = array();
        $actions = Db::getInstance()->getValue(
            'SELECT `allowed_actions` FROM `'._DB_PREFIX_.self::TABLE_USERS.'` WHERE `user_id` = '.(int)$user_id
        );

        if ($actions) {
            $result = explode(';', $actions);
        }

        return $result;
    }

    public static function getUserIdBySessionKey($key)
    {
        return Db::getInstance()->getValue(
            'SELECT `user_id` FROM `'._DB_PREFIX_.self::TABLE_SESSION_KEYS."` WHERE `session_key` = '".pSQL($key)."'"
        );
    }

    private static function setDelay($count_attempts)
    {
        if ($count_attempts > 3 && $count_attempts <= 10) {
            sleep(1);
        } elseif ($count_attempts <= 20) {
            sleep(2);
        } elseif ($count_attempts <= 50) {
            sleep(5);
        } else {
            sleep(10);
        }
    }
}
