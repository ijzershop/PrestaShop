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

class EM1Database
{
    /**
     * Executes return the result of $query as array.
     *
     * @param   string|DbQuery  $query  Query to execute in raw sql string or DBQuery object format
     * @return  array                   Returns an associative array or invoke exception if error occur
     * @throws  EM1Exception            Custom exception handler
     */
    public static function getQueryResult($query)
    {
        try {
            if ($query instanceof DbQuery) {
                $query = $query->build();
            }

            $result = Db::getInstance()->executeS($query);
            if (!is_array($result) || $result === false) {
                return array();
            }
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $exception->getMessage());
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $exception->getMessage());
        }

        return $result;
    }

    /**
     * Returns an associative array containing the first row of the query
     * This function automatically adds "LIMIT 1" to the query.
     *
     * @param   string|DbQuery $query   The select query (without "LIMIT 1")
     * @return  array                   Returns an associative array or invoke exception if error occur
     * @throws  EM1Exception            Custom exception handler
     */
    public static function getQueryRow($query)
    {
        try {
            if ($query instanceof DbQuery) {
                $query = $query->build();
            }

            $result = Db::getInstance()->getRow($query);
            if (!is_array($result) || $result === false) {
                return array();
            }
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $exception->getMessage());
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $exception->getMessage());
        }

        return $result;
    }

    /**
     * Returns a value from the first row, first column of a SELECT query.
     *
     * @param   string|DbQuery  $query  Query to execute in raw sql string or DBQuery object format
     * @return  string                  Returns an associative array or invoke exception if error occur
     * @throws  EM1Exception            Custom exception handler
     */
    public static function getQueryValue($query)
    {
        try {
            if ($query instanceof DbQuery) {
                $query = $query->build();
            }

            $result = Db::getInstance()->getValue($query);
            if (!is_string($result) || $result === false) {
                return '';
            }
        } catch (PrestaShopDatabaseException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $exception->getMessage());
        } catch (PrestaShopException $exception) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_QUERY_EXECUTION_ERROR, $exception->getMessage());
        }

        return $result;
    }
}
