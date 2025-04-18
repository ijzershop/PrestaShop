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


namespace MsThemeConfig\Core\Grid\Query;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use PrestaShop\PrestaShop\Core\Grid\Query\AbstractDoctrineQueryBuilder;
use PrestaShop\PrestaShop\Core\Grid\Query\DoctrineSearchCriteriaApplicatorInterface;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;

class OfferIntegrationQueryBuilder extends AbstractDoctrineQueryBuilder
{
    /**
     * @var DoctrineSearchCriteriaApplicatorInterface
     */
    private DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator;

    /**
     * @var int
     */
    private int $languageId;

    /**
     * @var int
     */
    private int $shopId;

    /**
     * @param Connection $connection
     * @param string $dbPrefix
     * @param DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator
     * @param int $languageId
     * @param int $shopId
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
        $this->languageId = (int) $languageId;
        $this->shopId = (int) $shopId;
    }

    /**
     * {@inheritdoc}
     */
    public function getSearchQueryBuilder(SearchCriteriaInterface $searchCriteria): QueryBuilder
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters());
        $qb
            ->select('q.id_oi_offer,
            q.code,
            q.name,
            q.email,
            q.phone,
            q.date_exp,
            q.date_upd')
            ->groupBy('q.id_oi_offer');

        $this->searchCriteriaApplicator
            ->applySorting($searchCriteria, $qb)
            ->applyPagination($searchCriteria, $qb)
        ;

        return $qb;
    }

    /**
     * {@inheritdoc}
     */
    public function getCountQueryBuilder(SearchCriteriaInterface $searchCriteria): QueryBuilder
    {
        return $this->getQueryBuilder($searchCriteria->getFilters())
            ->select('COUNT(DISTINCT q.id_oi_offer)');
    }

    /**
     * Get generic query builder.
     *
     * @param array $filters
     *
     * @return QueryBuilder
     */
    private function getQueryBuilder(array $filters): QueryBuilder
    {
        $allowedFilters = [
            'id_oi_offer',
            'code',
            'name',
            'email',
            'phone',
            'date_exp',
            'date_upd'];

        $allowedFiltersMap = [
            'id_oi_offer' => 'q.id_oi_offer',
            'code' => 'q.code',
            'name' => 'q.name',
            'email' => 'q.email',
            'phone' => 'q.phone',
            'date_exp' => 'q.date_exp',
            'date_upd' => 'q.date_upd'
        ];

        $qb = $this->connection->createQueryBuilder();
        $qb->from($this->dbPrefix . 'offer_integration', 'q');
        $qb->setParameter('shopId', $this->shopId);
        $qb->setParameter('langId', $this->languageId);

        foreach ($filters as $name => $value) {
            if (!in_array($name, $allowedFilters, true)) {
                continue;
            }

            if ('id_oi_offer' === $name && !empty($value)) {
                $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                $qb->setParameter($name, '%' . $value . '%');
                continue;
            }

            if (in_array($name, ['code', 'name', 'email', 'phone']) && !empty($value)) {
                $searchTerms = explode(" ", $value);
                $paramName = $name . '_param';

                foreach ($searchTerms as $i => $term) {
                    $currentParamName = $paramName . $i;
                    $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $currentParamName);
                    $qb->setParameter($currentParamName, '%' . $term . '%');
                }
                continue;
            }

            if (in_array($name, ['date_exp', 'date_upd']) && is_array($value)) {
                $from = $value['from'] ?? '0000-00-00';
                $to = $value['to'] ?? date('Y-m-d');

                if (!empty($from) && !empty($to)) {
                    $qb->andWhere($allowedFiltersMap[$name] . ' BETWEEN :from_' . $name . ' AND :to_' . $name);
                    $qb->setParameter('from_' . $name, $from);
                    $qb->setParameter('to_' . $name, $to);
                }
                continue;
            }
        }
        return $qb;
    }
}
