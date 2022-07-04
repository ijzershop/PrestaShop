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

namespace Modernesmid\Module\Pricemodifier\Grid\Query;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\Query\Expr\Join;
use PrestaShop\PrestaShop\Core\Grid\Query\AbstractDoctrineQueryBuilder;
use PrestaShop\PrestaShop\Core\Grid\Query\DoctrineSearchCriteriaApplicatorInterface;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;

class PriceModificationQueryBuilder extends AbstractDoctrineQueryBuilder
{
    /**
     * @var DoctrineSearchCriteriaApplicatorInterface
     */
    private $searchCriteriaApplicator;

    /**
     * @var int
     */
    private $languageId;

    /**
     * @var int
     */
    private $shopId;

    /**
     * @param Connection $connection
     * @param string $dbPrefix
     * @param DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator
     * @param int $languageId
     */
    public function __construct(
        Connection $connection,
                                                  $dbPrefix,
        DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator,
        $languageId,
        $shopId
    ) {
        parent::__construct($connection, $dbPrefix);

        $this->searchCriteriaApplicator = $searchCriteriaApplicator;
        $this->languageId = $languageId;
        $this->shopId = $shopId;
    }

    /**
     * {@inheritdoc}
     */
    public function getSearchQueryBuilder(SearchCriteriaInterface $searchCriteria)
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters());
        $qb
            ->select('q.id,
            q.name_supplier,
            q.id_store_product,
            q.file_supplier,
            q.selected_supplier_price,
            cl.name as cat_name,
            p.id_category_default,
            q.formula,
            q.increment_formula,
            q.old_supplier_price,
            q.old_store_price,
            q.old_price_update,
            json_unquote(q.supplier_data) as supplier_data,
            q.active')
            ->leftJoin('q', $this->dbPrefix.'product', 'p','p.id_product = q.id_store_product')
            ->leftJoin('p', $this->dbPrefix.'category_lang', 'cl','p.id_category_default = cl.id_category AND cl.id_lang = '. $this->languageId . ' AND cl.id_shop = '. $this->shopId)
            ->groupBy('q.id');

        $this->searchCriteriaApplicator
            ->applySorting($searchCriteria, $qb)
            ->applyPagination($searchCriteria, $qb)
        ;

        return $qb;
    }

    /**
     * {@inheritdoc}
     */
    public function getCountQueryBuilder(SearchCriteriaInterface $searchCriteria)
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters())
            ->select('COUNT(DISTINCT q.id)')
            ->leftJoin('q', $this->dbPrefix.'product', 'p','p.id_product = q.id_store_product')
            ->leftJoin('p', $this->dbPrefix.'category_lang', 'cl','p.id_category_default = cl.id_category AND cl.id_lang = '. $this->languageId . ' AND cl.id_shop = '. $this->shopId);

        return $qb;
    }

    /**
     * Get generic query builder.
     *
     * @param array $filters
     *
     * @return QueryBuilder
     */
    private function getQueryBuilder(array $filters)
    {
        $allowedFilters = [
            'id',
            'name_supplier',
            'id_store_product',
            'id_category_default',
            'cat_name',
            'supplier_data',
            'file_supplier',
            'selected_supplier_price',
            'formula',
            'increment_formula',
            'active',
        ];

        $allowedFiltersMap = [
            'id' => 'q.id',
            'name_supplier' => 'q.name_supplier',
            'id_store_product' => 'q.id_store_product',
            'id_category_default' => 'p.id_category_default',
            'cat_name' => 'cl.name',
            'supplier_data' => 'q.supplier_data',
            'file_supplier' => 'q.file_supplier',
            'selected_supplier_price' => 'q.selected_supplier_price',
            'formula' => 'q.formula',
            'increment_formula' => 'q.increment_formula',
            'active' => 'q.active',
        ];

        $qb = $this->connection->createQueryBuilder();
        $qb->from($this->dbPrefix . 'price_modification', 'q');
        $qb->setParameter('shopId', $this->shopId);
        $qb->setParameter('langId', $this->languageId);

        foreach ($filters as $name => $value) {


            if (!in_array($name, $allowedFilters, true)) {
                continue;
            }


            if ('id' === $name) {
                $qb->andWhere($allowedFiltersMap[$name] . ' = :' . $name);
                $qb->setParameter($name, $value);

                continue;
            }

            if ('name_supplier' === $name) {
                $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                $qb->setParameter($name, '%' . $value . '%');
                continue;
            }
            if ('id_store_product' === $name) {
                $qb->andWhere($allowedFiltersMap[$name] . ' = :' . $name);
                $qb->setParameter($name, $value);

                continue;
            }
            if ('id_category_default' === $name) {
                $qb->andWhere($allowedFiltersMap[$name] . ' = :' . $name);
                $qb->setParameter($name, $value);

                continue;
            }
            if ('file_supplier' === $name) {
                $qb->andWhere($allowedFiltersMap[$name] . ' = :' . $name);
                $qb->setParameter($name, $value);

                continue;
            }

            if ('active' === $name) {
                $qb->andWhere($allowedFiltersMap[$name] . ' = :' . $name);
                $qb->setParameter($name, $value);

                continue;
            }

            $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
            $qb->setParameter($name, '%' . $value . '%');
        }

        return $qb;
    }
}
