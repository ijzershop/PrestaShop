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

namespace PrestaShop\PrestaShop\Core\Grid\Presenter;

use PrestaShop\PrestaShop\Core\Grid\Column\ColumnInterface;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\PositionColumn;
use PrestaShop\PrestaShop\Core\Grid\Definition\GridDefinitionInterface;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use PrestaShop\PrestaShop\Core\Grid\Filter\FilterInterface;
use PrestaShop\PrestaShop\Core\Grid\GridInterface;

/**
 * Class GridPresenter is responsible for presenting grid.
 */
final class GridPresenter implements GridPresenterInterface
{
    /**
     * @var HookDispatcherInterface
     */
    private $hookDispatcher;

    public function __construct(HookDispatcherInterface $hookDispatcher)
    {
        $this->hookDispatcher = $hookDispatcher;
    }

    /**
     * {@inheritdoc}
     */
    public function present(GridInterface $grid)
    {
        $definition = $grid->getDefinition();
        $searchCriteria = $grid->getSearchCriteria();
        $data = $grid->getData();
        $presentedGrid = [
            'id' => strtolower($definition->getId()),
            'name' => $definition->getName(),
            'filter_form' => $grid->getFilterForm()->createView(),
            'columns' => $this->getColumns($grid),
            'column_filters' => $this->getColumnFilters($definition),
            'actions' => [
                'grid' => $definition->getGridActions()->toArray(),
                'bulk' => $definition->getBulkActions()->toArray(),
            ],
            'data' => [
                'records' => $data->getRecords(),
                'records_total' => $data->getRecordsTotal(),
                'query' => $data->getQuery(),
            ],
            'pagination' => [
                'offset' => $searchCriteria->getOffset(),
                'limit' => $searchCriteria->getLimit(),
            ],
            'sorting' => [
                'order_by' => $searchCriteria->getOrderBy(),
                'order_way' => $searchCriteria->getOrderWay(),
            ],
            'filters' => $searchCriteria->getFilters(),
        ];

        $this->hookDispatcher->dispatchWithParameters('action' . $definition->getId() . 'GridPresenterModifier', [
            'presented_grid' => &$presentedGrid,
        ]);

        return $presentedGrid;
    }

    /**
     * Returns the columns formatted as array, adds an additional position handle
     * column when needed.
     *
     * @param GridInterface $grid
     * @return array
     */
    private function getColumns(GridInterface $grid)
    {
        $columns = $grid->getDefinition()->getColumns()->toArray();

        $positionColumn = $this->getOrderingPosition($grid);
        if (null !== $positionColumn) {
            array_unshift($columns, [
                'id' => $positionColumn->getId(),
                'name' => $positionColumn->getName(),
                'type' => 'position_handle',
                'options' => $positionColumn->getOptions(),
            ]);
        }

        return $columns;
    }

    /**
     * @param GridInterface $grid
     * @return ColumnInterface|null
     */
    public function getOrderingPosition(GridInterface $grid)
    {
        $searchCriteria = $grid->getSearchCriteria();
        /** @var ColumnInterface $column */
        foreach ($grid->getDefinition()->getColumns() as $column) {
            if ($column instanceof PositionColumn &&
                strtolower($column->getId()) == strtolower($searchCriteria->getOrderBy()) &&
                'asc' == strtolower($searchCriteria->getOrderWay())
            ) {
                return $column;
            }
        }

        return null;
    }

    /**
     * Get filters that have associated columns.
     *
     * @param GridDefinitionInterface $definition
     *
     * @return array
     */
    private function getColumnFilters(GridDefinitionInterface $definition)
    {
        $columnFiltersMapping = [];

        /** @var FilterInterface $filter */
        foreach ($definition->getFilters()->all() as $filter) {
            if (null !== $associatedColumn = $filter->getAssociatedColumn()) {
                $columnFiltersMapping[$associatedColumn][] = $filter->getName();
            }
        }

        return $columnFiltersMapping;
    }
}
