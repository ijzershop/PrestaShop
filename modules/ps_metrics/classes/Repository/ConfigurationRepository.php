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

namespace PrestaShop\Module\Ps_metrics\Repository;

use Configuration;
use Context;

class ConfigurationRepository
{
    const ACCOUNT_MODULES_STATES = 'PS_METRICS_MODULES_STATES';
    const ACCOUNT_LINKED = 'PS_METRICS_ACCOUNT_LINKED';
    const ACCOUNT_GOOGLETAG_LINKED = 'PS_METRICS_GOOGLETAG_LINKED';

    /**
     * @var int
     */
    private $shopId;

    public function __construct()
    {
        $this->shopId = (int) Context::getContext()->shop->id;
    }

    /**
     * saveActionGoogleLinked
     *
     * @param bool $action
     *
     * @return bool
     */
    public function saveActionGoogleLinked($action)
    {
        return Configuration::updateValue(
            self::ACCOUNT_LINKED,
            $action,
            false,
            null,
            $this->shopId
        );
    }

    /**
     * getGoogleLinkedValue
     *
     * @return bool
     */
    public function getGoogleLinkedValue()
    {
        return (bool) Configuration::get(
            self::ACCOUNT_LINKED,
            null,
            null,
            $this->shopId
        );
    }

    /**
     * getShopDomain
     *
     * @return string
     */
    public function getShopDomain()
    {
        return Configuration::get(
            'PS_SHOP_DOMAIN',
            null,
            null,
            $this->shopId
        );
    }

    /**
     * saveGoogleTagLinked
     *
     * @param bool $action
     *
     * @return bool
     */
    public function saveGoogleTagLinked($action)
    {
        return Configuration::updateValue(
            self::ACCOUNT_GOOGLETAG_LINKED,
            $action,
            false,
            null,
            $this->shopId
        );
    }

    /**
     * getGoogleTagLinkedValue
     *
     * @return bool
     */
    public function getGoogleTagLinkedValue()
    {
        return (bool) Configuration::get(
            self::ACCOUNT_GOOGLETAG_LINKED,
            null,
            null,
            $this->shopId
        );
    }

    /**
     * saveModuleListState
     *
     * @param string|false $moduleList
     *
     * @return bool
     */
    public function saveModuleListState($moduleList)
    {
        return Configuration::updateValue(
            self::ACCOUNT_MODULES_STATES,
            $moduleList
        );
    }

    /**
     * getModuleListState
     *
     * @return string
     */
    public function getModuleListState()
    {
        return Configuration::get(
            self::ACCOUNT_MODULES_STATES,
            null,
            null
        );
    }
}
