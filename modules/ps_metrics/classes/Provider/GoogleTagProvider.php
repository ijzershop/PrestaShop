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

namespace PrestaShop\Module\Ps_metrics\Provider;

use PrestaShop\Module\Ps_metrics\Api\Shop\RetrieveShopSource;

class GoogleTagProvider
{
    /**
     * @var array|null
     */
    private $shopSource;

    /**
     * __construct
     *
     * @param string $baseUrl
     *
     * @return void
     */
    public function __construct($baseUrl)
    {
        $retrieveShopSource = new RetrieveShopSource();
        $retrieveShopSource->create($baseUrl);
        $this->shopSource = $retrieveShopSource->getSourcePage();
    }

    /**
     * Find by Regex if a Google Tag Analytics (UA-XXXXXXXXX-X) exists in source aimed page
     *
     * @return array
     */
    public function findGoogleTagsAnalytics()
    {
        if (null === $this->shopSource) {
            return [];
        }

        preg_match_all(
            '/UA-\d{6,}-\d/m',
            isset($this->shopSource['body']) ? $this->shopSource['body'] : [],
            $matches
        );

        return $matches[0];
    }

    /**
     * Find by Regex if a Google Tag Manager (GTM-XXXXXXX) exists in source aimed page
     *
     * @return array
     */
    public function findGoogleTagsManager()
    {
        if (null === $this->shopSource) {
            return [];
        }

        preg_match_all(
            '/GTM-\w{6,}/m',
            isset($this->shopSource['body']) ? $this->shopSource['body'] : [],
            $matches
        );

        return $matches[0];
    }
}
