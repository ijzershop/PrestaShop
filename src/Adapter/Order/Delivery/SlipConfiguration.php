<?php
/**
 * 2007-2018 PrestaShop
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Adapter\Order\Delivery;

use PrestaShop\PrestaShop\Adapter\Configuration;
use PrestaShop\PrestaShop\Core\Configuration\DataConfigurationInterface;

/**
 * This class manages Order delivery slip configuration
 */
final class SlipConfiguration implements DataConfigurationInterface
{
    const PREFIX = 'PS_DELIVERY_PREFIX';
    const NUMBER = 'PS_DELIVERY_NUMBER';
    const ENABLE_PRODUCT_IMAGE = 'PS_PDF_IMG_DELIVERY';

    /**
     * @var Configuration
     */
    private $configuration;

    /**
     * @var string $rootDir Path to the application defines path
     */
    private $configDefinesPath;

    public function __construct(Configuration $configuration)
    {
        $this->configuration = $configuration;
    }

    /**
     * Returns configuration used to manage Debug mode in back office
     *
     * @return array
     */
    public function getConfiguration()
    {
        return array(
            'prefix' => $this->configuration->get(self::PREFIX),
            'number' => $this->configuration->getInt(self::NUMBER),
            'enable_product_image' => $this->configuration->getBoolean(self::ENABLE_PRODUCT_IMAGE),
        );
    }

    /**
     * {@inheritdoc}
     */
    public function updateConfiguration(array $configuration)
    {
        $errors = array();

        if ($this->validateConfiguration($configuration)) {
            $this->configuration->set(self::PREFIX, $configuration['prefix']);
            $this->configuration->set(self::NUMBER, $configuration['number']);
            $this->configuration->set(self::ENABLE_PRODUCT_IMAGE, $configuration['enable_product_image']);
        }

        return $errors;
    }

    /**
     * {@inheritdoc}
     */
    public function validateConfiguration(array $configuration)
    {
        return isset(
            $configuration['prefix'],
            $configuration['number'],
            $configuration['enable_product_image']
        );
    }
}
