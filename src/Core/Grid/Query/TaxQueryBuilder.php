<?php
/**
 * 2007-2019 PrestaShop and Contributors
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
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\PrestaShop\Core\Grid\Query;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;

/**
 * Class TaxQueryBuilder builds search & count queries for taxes grid.
 */
final class TaxQueryBuilder extends AbstractDoctrineQueryBuilder
{
    /**
     * @var DoctrineSearchCriteriaApplicatorInterface
     */
    private $searchCriteriaApplicator;

    /**
     * @var int
     */
    private $employeeIdLang;

    /**
     * @param Connection $connection
     * @param $dbPrefix
     * @param DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator
     * @param $employeeIdLang
     */
    public function __construct(
        Connection $connection,
        $dbPrefix,
        DoctrineSearchCriteriaApplicatorInterface $searchCriteriaApplicator,
        $employeeIdLang
    ) {
        parent::__construct($connection, $dbPrefix);

        $this->searchCriteriaApplicator = $searchCriteriaApplicator;
        $this->employeeIdLang = $employeeIdLang;
    }

    /**
     * {@inheritdoc}
     */
    public function getSearchQueryBuilder(SearchCriteriaInterface $searchCriteria)
    {
        $qb = $this->getQueryBuilder($searchCriteria->getFilters());

        $qb
            ->select('t.`id_tax`, tl.`name`, t.`rate`, t.`active`')
        ;

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
            ->select('COUNT(DISTINCT t.`id_tax`)')
        ;

        return $qb;
    }

    /**
     * Gets query builder with the common sql used for displaying webservice list and applying filter actions.
     *
     * @param array $filters
     *
     * @return QueryBuilder
     */
    private function getQueryBuilder(array $filters)
    {
        $allowedFilters = [
            'id_tax',
            'name',
            'rate',
            'active',
        ];

        $qb = $this->connection
            ->createQueryBuilder()
            ->from($this->dbPrefix . 'tax', 't')
            ->leftJoin(
                't',
                $this->dbPrefix . 'tax_lang',
                'tl',
                't.`id_tax` = tl.`id_tax`'
        );
        $qb->andWhere('tl.`id_lang` = :employee_id_lang');
        $qb->andWhere('t.`deleted` = 0');

        $qb->setParameter('employee_id_lang', $this->employeeIdLang);

        foreach ($filters as $filterName => $value) {
            if (!in_array($filterName, $allowedFilters, true)) {
                continue;
            }

            if ('active' === $filterName) {
                $qb->andWhere('t.`active` = :active');
                $qb->setParameter('active', $value);

                continue;
            }

            if ('name' === $filterName) {
                $qb->andWhere('tl.`name` LIKE :' . $filterName)
                    ->setParameter($filterName, '%' . $value . '%');
                continue;
            }

            $qb->andWhere('t.`' . $filterName . '` LIKE :' . $filterName)
                ->setParameter($filterName, '%' . $value . '%');
        }

        return $qb;
    }
}
