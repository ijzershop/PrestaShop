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

use PrestaShop\PrestaShop\Core\Search\Filters;

/**
 *
 */
class OfferIntegrationFilters extends Filters
{
    protected $filterId = 'id_oi_offer';

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
    public function getLimit()
    {
        return $this->getInt('limit') ?: null;
    }
}
