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
use Doctrine\ORM\Query\Expr\Join;
use PrestaShop\PrestaShop\Core\Grid\Query\AbstractDoctrineQueryBuilder;
use PrestaShop\PrestaShop\Core\Grid\Query\DoctrineSearchCriteriaApplicatorInterface;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;

class OfferIntegrationQueryBuilder extends AbstractDoctrineQueryBuilder
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
            ->select('q.id_oi_offer,
            q.code,
            q.name,
            q.email,
            q.phone,
            q.message,
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
            'message',
            'date_exp',
            'date_upd'];

        $allowedFiltersMap = [
            'id_oi_offer' => 'q.id_oi_offer',
            'code' => 'q.code',
            'name' => 'q.name',
            'email' => 'q.email',
            'phone' => 'q.phone',
            'message' => 'q.message',
            'date_exp' => 'q.date_exp',
            'date_upd' => 'q.date_upd'
            ];

        $qb = $this->connection->createQueryBuilder();
        $qb->from($this->dbPrefix . 'offer_integration', 'q');
        $qb->setParameter('shopId', $this->shopId);
        $qb->setParameter('langId', $this->languageId);
//dd($filters);
        foreach ($filters as $name => $value) {
            if (!in_array($name, $allowedFilters, true)) {
                continue;
            }


            if ('id_oi_offer' === $name && !empty($value)) {
                $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                $qb->setParameter($name, '%' . $value . '%');

                continue;
            }

            if ('code' === $name && !empty($value)) {
                $searchTerms = explode(" ", $value);

                foreach ($searchTerms as $i => $term){
                    $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                    $qb->setParameter($name, '%' . $term . '%');
                }
                continue;
            }

            if ('name' === $name && !empty($value)) {
                $searchTerms = explode(" ", $value);

                foreach ($searchTerms as $i => $term){
                    $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                    $qb->setParameter($name, '%' . $term . '%');
                }
                continue;
            }

            if ('email' === $name && !empty($value)) {
                $searchTerms = explode(" ", $value);

                foreach ($searchTerms as $i => $term){
                    $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                    $qb->setParameter($name, '%' . $term . '%');
                }
                continue;
            }

            if ('phone' === $name && !empty($value)) {
                $searchTerms = explode(" ", $value);

                foreach ($searchTerms as $i => $term){
                    $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                    $qb->setParameter($name, '%' . $term . '%');
                }
                continue;
            }

            if ('message' === $name && !empty($value)) {
                $searchTerms = explode(" ", $value);

                foreach ($searchTerms as $i => $term){
                    $qb->andWhere($allowedFiltersMap[$name] . ' LIKE :' . $name);
                    $qb->setParameter($name, '%' . $term . '%');
                }
                continue;
            }


            if ('date_exp' === $name && (!empty($from) && !empty($to))) {
                $from  = $value['from'] ?? '0000-00-00';
                $to  = $value['to'] ?? date('yyyy-mm-dd');

                $qb->andWhere($allowedFiltersMap[$name] . ' BETWEEN :from AND :to');
                $qb->setParameter('from', $from);
                $qb->setParameter('to', $to);
                continue;
            }

            if ('date_upd' === $name && (!empty($from) && !empty($to))) {
                $from  = $value['from'] ?? '0000-00-00';
                $to  = $value['to'] ?? date('yyyy-mm-dd');

                $qb->andWhere($allowedFiltersMap[$name] . ' BETWEEN :from AND :to');
                $qb->setParameter('from', $from);
                $qb->setParameter('to', $to);
                continue;
            }
        }
        return $qb;
    }
}
