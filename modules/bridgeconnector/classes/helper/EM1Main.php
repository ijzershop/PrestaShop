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

includeMainFiles();

class EM1Main extends EM1Database
{
    const RESPONSE_CODE             = 'response_code';
    const RESPONSE_CODE_SUCCESS     = 'success';
    const ERROR_MESSAGE             = 'error_message';

    public static function convertTimestampToMillisecondsTimestamp($timestamp)
    {
        if ($timestamp === null) {
            return null;
        }
        if (is_string($timestamp)) {
            $timestamp = strtotime($timestamp);
        }
        return (int)$timestamp * 1000;
    }

    public static function convertMillisecondsTimestampToTimestamp($timestamp)
    {
        if ($timestamp === null) {
            return null;
        }
        return (int)$timestamp/1000;
    }

    public function round($number, $precision = 6)
    {
        return round((float)$number, $precision);
    }

    public static function displayPrice($price, $currencyId, $languageId)
    {
        $context = Context::getContext();
        $context->language->locale = (new Language($languageId))->locale;
        return (string)Tools::displayPrice((float)$price, (int)$currencyId, false, $context);
    }

    public static function getDefaultLanguageId()
    {
        return (int)Configuration::get('PS_LANG_DEFAULT');
    }

    /**
     * Generate response
     *
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

    public static function snakeCaseToCamelCase($string)
    {
        if (!$string) {
            return '';
        }

        $str    = str_replace(' ', '', ucwords(str_replace('_', ' ', $string)));
        $str[0] = Tools::strtolower($str[0]);

        return $str;
    }
}

function includeMainFiles()
{
    include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Database.php';
}
