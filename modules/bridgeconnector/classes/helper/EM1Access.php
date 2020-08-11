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

class EM1Access
{
    const HASH_ALGORITHM     = 'sha256';
    const MAX_LIFETIME       = 86400; /* 24 hours */
    const TABLE_TOKENS       = 'bridgeconnector_ma_tokens';
    const TABLE_FAILED_LOGIN = 'bridgeconnector_ma_failed_login';
    const TABLE_USERS        = 'bridgeconnector_ma_users';

    public static function deleteExpiredData()
    {
        //todo: implement range detection and row count in one query without other checking
        Db::getInstance()->execute(
            'DELETE LOW_PRIORITY FROM ' . _DB_PREFIX_ . self::TABLE_TOKENS .
            ' WHERE DATE_SUB(NOW(), INTERVAL 1 DAY) > `date_added`'
        );

        Db::getInstance()->execute(
            'DELETE LOW_PRIORITY FROM ' . _DB_PREFIX_ . self::TABLE_FAILED_LOGIN .
            ' WHERE DATE_SUB(NOW(), INTERVAL 1 MONTH) > `date_added`'
        );
    }

    public static function getToken($hash)
    {
        $userData = self::checkAuth($hash);

        if ($userData) {
            return self::generateToken((int)$userData['user_id']);
        }

        self::addFailedAttempt();
        return '';
    }

    public static function checkToken($key, $user_id = false)
    {
        $timestamp = time();
        $where = array(
            "s.`token` = '".pSQL($key)."'",
            "s.`date_added` > '".pSQL(date('Y-m-d H:i:s', ($timestamp - self::MAX_LIFETIME)))."'",
            'u.`status` = 1'
        );

        if ($user_id) {
            $where[] = 'u.`user_id` = '.(int)$user_id;
        }

        $db_key = Db::getInstance()->getValue(
            'SELECT s.`token` FROM `'._DB_PREFIX_.self::TABLE_TOKENS.'` s LEFT JOIN `'._DB_PREFIX_
            .self::TABLE_USERS.'` u ON s.`user_id` = u.`user_id` WHERE '.implode(' AND ', $where)
        );

        if ($db_key) {
            return true;
        }

        self::addFailedAttempt();
        return false;
    }

    private static function generateToken($user_id)
    {
        if ($user_id <= 0) {
            return '';
        }

        $timestamp = time();
        $key = Db::getInstance()->getValue(
            'SELECT `token` FROM `'._DB_PREFIX_.self::TABLE_TOKENS.'` WHERE `user_id` = '.(int)$user_id
            ." AND `date_added` > '".pSQL(date('Y-m-d H:i:s', ($timestamp - self::MAX_LIFETIME)))."'"
        );

        if ($key) {
            return $key;
        }

        $date = date('Y-m-d H:i:s', $timestamp);
        $key = hash(self::HASH_ALGORITHM, _COOKIE_KEY_.$timestamp);
        Db::getInstance()->execute(
            'INSERT INTO `'._DB_PREFIX_.self::TABLE_TOKENS."` (`token`, `user_id`, `date_added`) VALUES ('"
            .pSQL($key)."', ".(int)$user_id.", '".pSQL($date)."') ON DUPLICATE KEY UPDATE `token` = '".pSQL($key)
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

    public static function getAllowedActionsByToken($key)
    {
        $result = array();
        $actions = Db::getInstance()->getValue(
            'SELECT u.`allowed_actions` FROM `'._DB_PREFIX_.self::TABLE_TOKENS.'` s LEFT JOIN `'._DB_PREFIX_
            .self::TABLE_USERS."` u ON u.`user_id` = s.`user_id` WHERE s.`token` = '".pSQL($key)."'"
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

    public static function getUserIdByToken($key)
    {
        return Db::getInstance()->getValue(
            'SELECT `user_id` FROM `'._DB_PREFIX_.self::TABLE_TOKENS."` WHERE `token` = '".pSQL($key)."'"
        );
    }

    public static function getEmployeeIdByToken($key)
    {
        return Db::getInstance()->getValue(
            'SELECT employee_id FROM '._DB_PREFIX_.self::TABLE_USERS.' AS u
                  JOIN '._DB_PREFIX_.self::TABLE_TOKENS.' AS t
                  ON u.user_id = t.user_id
                  WHERE t.token = \''.pSQL($key)."'"
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
