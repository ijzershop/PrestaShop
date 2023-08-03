<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

namespace MsThemeConfig\Core\Grid\Filters;

use PrestaShop\PrestaShop\Adapter\Validate;
use PrestaShop\PrestaShop\Core\Search\Filters;

/**
 *
 */
class OfferIntegrationFilters extends Filters
{
    protected $filterId = 'oi_offer';
    /**
     * @param array $filters
     * @param string $filterId
     */
    public function __construct(array $filters = [], $filterId = '')
    {
        parent::__construct($filters);
        $this->filterId = !empty($filterId) ? $filterId : $this->filterId;
    }
    /**
     * {@inheritdoc}
     */
    public static function getDefaults()
    {
        return [
            'limit' => 10,
            'offset' => 0,
            'orderBy' => 'id_oi_offer',
            'sortOrder' => 'desc',
            'filters' => [],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getOrderBy()
    {
        $orderBy = 'id_oi_offer';
        if (!Validate::isOrderBy($orderBy)) {
            return null;
        }
        return $orderBy;
    }

    /**
     * {@inheritdoc}
     */
    public function getLimit()
    {
        return $this->getInt('limit') ?: null;
    }
}
