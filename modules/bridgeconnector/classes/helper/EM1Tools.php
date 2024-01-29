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
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

class EM1Tools
{
    const RESPONSE_CODE                                    = 'response_code';
    const RESPONSE_CODE_SUCCESS                            = 'success';
    const ERROR_MESSAGE                                     = 'error_message';
    const LEFT_JOIN  = 'left';
    const RIGHT_JOIN = 'right';
    const INNER_JOIN = 'inner';
    const KEY_TESTS = 'tests';

    const GLOBAL_DATE_FORMAT = 'Y-m-d H:i:s';

    const GCM_API_KEY                                       = 'AIzaSyDZatAmShD5pWkXwkfEbBrG6M1qpu6K_qo';
    const FB_API_KEY                                        = 'AIzaSyBtr6hOCAVztTIOk8mDzPRNr8wJ6tbY-Fs';

    public static function convertTimestampToMillisecondsTimestamp($timestamp)
    {
        return $timestamp * 1000;
    }

    public static function prepareMobileTimestamp($timestamp)
    {
        return $timestamp/1000;
    }

    /**
     * @param   array $data Prepared data
     * @param   string $code Response code. If everything is ok self::RESPONSE_CODE_SUCCESS
     * @param   string $message Error message if exists
     * @return  void Returns response data
     */
    public static function generateResponse($data = array(), $code = self::RESPONSE_CODE_SUCCESS, $message = '')
    {
        self::responseHandler(
            array_merge(
                $data,
                array(self::RESPONSE_CODE => (string)$code),
                array(self::ERROR_MESSAGE => (string)$message)
            )
        );
    }

    private static function responseHandler($response)
    {
        header('Content-Type: application/json;');
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        die();
    }

    public static function getUsageTest()
    {
        return array(
            'TEST_memory_usage_in_byte'        => memory_get_usage(),
            'TEST_memory_peak_usage_in_byte'   => memory_get_peak_usage() ,
            'TEST_memory_usage_in_kilobyte'       => memory_get_usage()/1024,
            'TEST_memory_peak_usage_in_kilobyte'  => memory_get_peak_usage()/1024 ,
            'TEST_start_class_microtime'    => $_SERVER['REQUEST_TIME_FLOAT'],
            'TEST_end_class_microtime'      => microtime(true),
            'TEST_seconds_spent'            => (float)number_format(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 6)
        );
    }
}
