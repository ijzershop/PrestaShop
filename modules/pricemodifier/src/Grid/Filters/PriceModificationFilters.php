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

namespace Modernesmid\Module\Pricemodifier\Grid\Filters;

use Modernesmid\Module\Pricemodifier\Grid\Definition\Factory\PriceModificationGridDefinitionFactory;
use PrestaShop\PrestaShop\Core\Search\Filters;

class PriceModificationFilters extends Filters
{
    protected $filterId = PriceModificationGridDefinitionFactory::GRID_ID;

    /**
     * {@inheritdoc}
     */
    public static function getDefaults()
    {
        return [
            'limit' => 10,
            'offset' => 0,
            'orderBy' => 'id',
            'sortOrder' => 'asc',
            'filters' => [],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getLimit()
    {
        return $this->getInt('limit')*10 ?: null;
    }
}
