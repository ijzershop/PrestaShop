<?php
/**
 * 2007-2018 PrestaShop.
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

namespace PrestaShop\PrestaShop\Core\Domain\Meta\ValueObject;

use PrestaShop\PrestaShop\Core\Domain\Meta\Exception\MetaException;

/**
 * Class MetaId
 */
class MetaId
{
    /**
     * @var int
     */
    private $id;

    /**
     * MetaId constructor.
     *
     * @param int $metaId
     *
     * @throws MetaException
     */
    public function __construct($metaId)
    {
        if (!is_numeric($metaId) || $metaId <= 0) {
            throw new MetaException(
                sprintf('Invalid meta id: %s', var_export($metaId, true))
            );
        }

        $this->id = (int) $metaId;
    }

    /**
     * @return int
     */
    public function getValue()
    {
        return $this->id;
    }
}
