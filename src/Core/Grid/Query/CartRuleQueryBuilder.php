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

namespace PrestaShop\PrestaShop\Core\Grid\Query;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use PrestaShop\PrestaShop\Core\Feature\FeatureInterface;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use PrestaShop\PrestaShop\Core\Multistore\MultistoreContextCheckerInterface;

/**
 * Builds query for catalog price rule list
 */
final class CartRuleQueryBuilder extends AbstractDoctrineQueryBuilder
{
    /**
     * @var DoctrineSearchCriteriaApplicatorInterface
     */
    private $searchCriteriaApplicator;

    /**
     * @var int
     */
    private $contextIdLang;

    /**
     * @var MultistoreContextCheckerInterface
     */
    private $multistoreContextChecker;

    /**
     * @var FeatureInterface
     */
    private $multistoreFeature;

    /**
     * @param Connection $connection
     * @param $dbPrefix
     * @param DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator
     * @param int $contextIdLang
     * @param MultistoreContextCheckerInterface $multistoreContextChecker
     * @param FeatureInterface $multistoreFeature
     */
    public function __construct(
        Connection $connection,
        $dbPrefix,
        DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator,
        $contextIdLang,
        MultistoreContextCheckerInterface $multistoreContextChecker,
        FeatureInterface $multistoreFeature
    ) {
        parent::__construct($connection, $dbPrefix);
        $this->searchCriteriaApplicator = $searchCriteriaApplicator;
        $this->contextIdLang = $contextIdLang;
        $this->multistoreContextChecker = $multistoreContextChecker;
        $this->multistoreFeature = $multistoreFeature;
    }

    /**
     * {@inheritdoc}
     */
    public function getSearchQueryBuilder(SearchCriteriaInterface $searchCriteria)
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters());

        $qb->select(
            'cr.id_cart_rule,
            crl.name,
            cr.priority,
            cr.code,
            cr.quantity,
            cr.date_to'
        );

        $qb->leftJoin(
            'cr',
            $this->dbPrefix . 'cart_rule_lang',
            'crl',
                'cr.id_cart_rule = crl.id_cart_rule AND crl.id_lang = :contextLangId'
        );

        $this->searchCriteriaApplicator
            ->applyPagination($searchCriteria, $qb)
            ->applySorting($searchCriteria, $qb)
        ;

        return $qb;
    }

    /**
     * {@inheritdoc}
     */
    public function getCountQueryBuilder(SearchCriteriaInterface $searchCriteria)
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters())
            ->select('COUNT(DISTINCT cr.`id_cart_rule`)')
        ;

        return $qb;
    }

    /**
     * Gets query builder with the common sql for catalog price rule listing.
     *
     * @param array $filters
     *
     * @return QueryBuilder
     */
    private function getQueryBuilder(array $filters)
    {
        $qb = $this->connection
            ->createQueryBuilder()
            ->from($this->dbPrefix . 'cart_rule', 'cr')
        ;

        $this->applyFilters($qb, $filters);
        $qb->setParameter('contextLangId', $this->contextIdLang);

        return $qb;
    }

    /**
     * @param QueryBuilder $qb
     * @param array $filters
     */
    private function applyFilters(QueryBuilder $qb, array $filters)
    {
        $allowedFiltersAliasMap = [
            'id_cart_rule' => 'cr.id_cart_rule',
            'name' => 'cr.name',
            'priority' => 'cr.priority',
            'code' => 'cr.code',
            'quantity' => 'cr.quantity',
            'to' => 'cr.date_to'
        ];

        $exactMatchFilters = ['id_cart_rule', 'quantity', 'priority'];

        foreach ($filters as $filterName => $value) {
            if (!array_key_exists($filterName, $allowedFiltersAliasMap)) {
                return;
            }

            if (in_array($filterName, $exactMatchFilters, true)) {
                $qb->andWhere($allowedFiltersAliasMap[$filterName] . ' = :' . $filterName);
                $qb->setParameter($filterName, $value);

                continue;
            }

            if ('date_to' === $filterName) {
                if (isset($value['to'])) {
                    $qb->andWhere($allowedFiltersAliasMap[$filterName] . ' <= :' . $filterName . '_to');
                    $qb->setParameter($filterName . '_to', $value['to']);
                }

                continue;
            }

            $qb->andWhere($allowedFiltersAliasMap[$filterName] . ' LIKE :' . $filterName);
            $qb->setParameter($filterName, "%$value%");
        }
    }
}
