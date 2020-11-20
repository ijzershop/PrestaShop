<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Helper;

class DataHelper
{
    /**
     * Return an array with the date for array key
     * Return initial array if $value['date'] doesn't exist
     *
     * @param array $array
     * @param string $fromKey (example : 'date')
     *
     * @return array
     */
    public function modifyArrayMainKeys(array $array, $fromKey)
    {
        if (empty($array)) {
            return $array;
        }

        $newArray = [];

        foreach ($array as $key => $value) {
            if (empty($value[$fromKey])) {
                return $array;
            }

            $newArray[$value[$fromKey]] = $array[$key];
        }

        return $newArray;
    }

    /**
     * transformToGranularityWeeks
     *
     * @param array $array
     * @param string $fromKey (example : 'orders', 'revenues')
     *
     * @return array
     */
    public function transformToGranularityWeeks(array $array, $fromKey)
    {
        if (empty($array)) {
            return $array;
        }

        $allDataByWeek = [];

        /* Reorder array by weeks */
        foreach ($array as $values) {
            $weekNumber = (new \DateTime($values['date']))->format('Y-W');
            $allDataByWeek[$weekNumber][] = $values;
        }

        $finalArrayRevenueByWeek = [];

        /* Sum all data in a week */
        foreach ($allDataByWeek as $keyWeek => $weekValues) {
            $finalValue = 0;
            foreach ($weekValues as $valueKey) {
                $finalValue += $valueKey[$fromKey];
            }

            $finalArrayRevenueByWeek[$keyWeek] = [
                'date' => $keyWeek,
                $fromKey => $finalValue,
            ];
        }

        return $finalArrayRevenueByWeek;
    }

    /**
     * Subtract data recursively.
     * For example: total paid - refunds
     *
     * @param array $array
     * @param string $toKey
     * @param string $fromKey
     *
     * @return array
     */
    public function subtractDataRecursively(array $array, $toKey, $fromKey)
    {
        if (empty($array)) {
            return $array;
        }

        foreach ($array as $key => $value) {
            $array[$key][$toKey] = $value[$toKey];
            unset($array[$key][$fromKey]);
        }

        return $array;
    }

    /**
     * Sort a Multidimensional array by a specific key
     *
     * @param array $array
     * @param string $sortBy
     *
     * @return array
     */
    public function arrayMultiSort(array $array, $sortBy)
    {
        if (empty($array)) {
            return $array;
        }

        $keys = array_column($array, $sortBy);
        array_multisort($keys, SORT_DESC, $array);

        return $array;
    }
}
