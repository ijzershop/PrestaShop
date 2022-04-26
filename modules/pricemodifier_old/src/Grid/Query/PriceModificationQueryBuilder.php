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
            ->select('q.id, q.name_supplier, q.id_store_product, q.file_supplier, q.active')
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
            ->select('COUNT(DISTINCT q.id)');

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
            'file_supplier',
            'active',
        ];

        $allowedFiltersMap = [
            'id' => 'q.id',
            'name_supplier' => 'q.name_supplier',
            'id_store_product' => 'q.id_store_product',
            'file_supplier' => 'q.file_supplier',
            'active' => 'q.active',
        ];

        $qb = $this->connection->createQueryBuilder();
        $qb
            ->from($this->dbPrefix . 'price_modification', 'q')
//            ->leftJoin('q',
//                $this->dbPrefix . 'product_lang',
//                'pl',
//                /* @phpstan-ignore-next-line */
//                $qb->expr()->andX(
//                    $qb->expr()->eq('pl.`id_product`', 'q.`id_product`'),
//                    $qb->expr()->andX($qb->expr()->isNotNull('q.`id_product`')),
//                    $qb->expr()->andX($qb->expr()->eq('pl.`id_shop`', ':shopId')),
//                    $qb->expr()->andX($qb->expr()->eq('pl.`id_lang`', ':langId'))
//                )
//            )
//            ->leftJoin('q',
//                $this->dbPrefix . 'product_attribute_combination',
//                'pac',
//                /* @phpstan-ignore-next-line */
//                $qb->expr()->andX(
//                    $qb->expr()->eq('q.`id_product_attribute`', 'pac.`id_product_attribute`'),
//                    $qb->expr()->andX($qb->expr()->isNotNull('q.`id_product_attribute`'))
//                )
//            )
//            ->leftJoin('pac',
//                $this->dbPrefix . 'attribute_lang',
//                'al',
//                /* @phpstan-ignore-next-line */
//                $qb->expr()->andX(
//                    $qb->expr()->eq('pac.`id_attribute`', 'al.`id_attribute`'),
//                    $qb->expr()->andX($qb->expr()->isNotNull('pac.`id_attribute`')),
//                    $qb->expr()->andX($qb->expr()->eq('al.`id_lang`', ':langId'))
//                )
//            )
        ;
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
