<?php

/**
 * 2007-2019 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShopBundle\Translation\Factory;

use PrestaShopBundle\Translation\Provider\AbstractProvider;
use PrestaShopBundle\Translation\View\TreeBuilder;

/**
 * This class returns a collection of translations, using a locale and an identifier.
 *
 * Returns MessageCatalogue object or Translation tree array.
 */
class TranslationsFactory implements TranslationsFactoryInterface
{
    /**
     * @var array the list of translation providers
     */
    private $providers = [];

    /**
     * {@inheritdoc}
     */
    public function createCatalogue($domainIdentifier, $locale = 'en_US')
    {
        foreach ($this->providers as $provider) {
            if ($domainIdentifier === $provider->getIdentifier()) {
                return $provider->setLocale($locale)->getMessageCatalogue();
            }
        }

        throw new ProviderNotFoundException($domainIdentifier);
    }

    /**
     * {@inheritdoc}
     */
    public function createTranslationsArray($domainIdentifier, $locale = self::DEFAULT_LOCALE, $theme = null, $search = null)
    {
        foreach ($this->providers as $provider) {
            if ($domainIdentifier === $provider->getIdentifier()) {
                $treeBuilder = new TreeBuilder($locale, $theme);

                return $treeBuilder->makeTranslationArray($provider, $search);
            }
        }

        throw new ProviderNotFoundException($domainIdentifier);
    }

    /**
     * @param AbstractProvider $provider
     */
    public function addProvider(AbstractProvider $provider)
    {
        $this->providers[] = $provider;
    }
}
