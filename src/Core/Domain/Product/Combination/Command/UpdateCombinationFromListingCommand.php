<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

declare(strict_types=1);

namespace PrestaShop\PrestaShop\Core\Domain\Product\Combination\Command;

use PrestaShop\Decimal\DecimalNumber;
use PrestaShop\PrestaShop\Core\Domain\Product\Combination\CommandHandler\UpdateCombinationFromListingHandlerInterface;
use PrestaShop\PrestaShop\Core\Domain\Product\Combination\ValueObject\CombinationId;

/**
 * @see UpdateCombinationFromListingHandlerInterface
 */
class UpdateCombinationFromListingCommand
{
    /**
     * @var CombinationId
     */
    private $combinationId;

    /**
     * @var DecimalNumber|null
     */
    private $impactOnPrice;

    /**
     * @var int|null
     */
    private $quantity;

    /**
     * @var bool|null
     */
    private $default;

    /**
     * @param int $combinationId
     */
    public function __construct(int $combinationId)
    {
        $this->combinationId = new CombinationId($combinationId);
    }

    /**
     * @return CombinationId
     */
    public function getCombinationId(): CombinationId
    {
        return $this->combinationId;
    }

    /**
     * @return DecimalNumber|null
     */
    public function getImpactOnPrice(): ?DecimalNumber
    {
        return $this->impactOnPrice;
    }

    /**
     * @param string $impactOnPrice
     *
     * @return UpdateCombinationFromListingCommand
     */
    public function setImpactOnPrice(string $impactOnPrice): UpdateCombinationFromListingCommand
    {
        $this->impactOnPrice = new DecimalNumber($impactOnPrice);

        return $this;
    }

    /**
     * @return int|null
     */
    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    /**
     * @param int $quantity
     *
     * @return UpdateCombinationFromListingCommand
     */
    public function setQuantity(int $quantity): UpdateCombinationFromListingCommand
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * @return bool|null
     */
    public function isDefault(): ?bool
    {
        return $this->default;
    }

    /**
     * @param bool $default
     *
     * @return UpdateCombinationFromListingCommand
     */
    public function setDefault(bool $default): UpdateCombinationFromListingCommand
    {
        $this->default = $default;

        return $this;
    }
}
