<?php
/**
 * 2007-2020 PrestaShop SA and Contributors
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
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

declare(strict_types=1);

namespace PrestaShop\PrestaShop\Core\Domain\CartRule\QueryResult;

use DateTime;
use PrestaShop\PrestaShop\Core\Domain\Customer\ValueObject\CustomerId;

class EditableCartRuleConditions
{
    /**
     * @var CustomerId|null
     */
    private $customerId;

    /**
     * @var DateTime|null
     */
    private $dateFrom;

    /**
     * @var DateTime|null
     */
    private $dateTo;

    /**
     * @var int
     */
    private $quantity;

    /**
     * @var int
     */
    private $quantityPerUser;

    /**
     * @var EditableCartRuleMinimum
     */
    private $minimum;

    /**
     * @var EditableCartRuleRestrictions
     */
    private $restrictions;

    public function __construct(
        ?CustomerId $customerId,
        ?DateTime $dateFrom,
        ?DateTime $dateTo,
        int $quantity,
        int $quantityPerUser,
        EditableCartRuleMinimum $minimum,
        EditableCartRuleRestrictions $restrictions
    ) {
        $this->customerId = $customerId;
        $this->dateFrom = $dateFrom;
        $this->dateTo = $dateTo;
        $this->quantity = $quantity;
        $this->quantityPerUser = $quantityPerUser;
        $this->minimum = $minimum;
        $this->restrictions = $restrictions;
    }

    /**
     * @return CustomerId|null
     */
    public function getCustomerId(): ?CustomerId
    {
        return $this->customerId;
    }

    /**
     * @return DateTime|null
     */
    public function getDateFrom(): ?DateTime
    {
        return $this->dateFrom;
    }

    /**
     * @return DateTime|null
     */
    public function getDateTo(): ?DateTime
    {
        return $this->dateTo;
    }

    /**
     * @return int
     */
    public function getQuantity(): int
    {
        return $this->quantity;
    }

    /**
     * @return int
     */
    public function getQuantityPerUser(): int
    {
        return $this->quantityPerUser;
    }

    /**
     * @return EditableCartRuleMinimum
     */
    public function getMinimum(): EditableCartRuleMinimum
    {
        return $this->minimum;
    }

    /**
     * @return EditableCartRuleRestrictions
     */
    public function getRestrictions(): EditableCartRuleRestrictions
    {
        return $this->restrictions;
    }
}
