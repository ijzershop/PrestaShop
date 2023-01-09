<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

namespace MsThemeConfig\Core\Grid\Definition\Data;

use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManager;
use MsThemeConfig\Core\Entity\OfferIntegration;
use MsThemeConfig\Core\Repository\OfferIntegrationRepository;
use PDO;

use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Product\PriceFormatter;
use PrestaShop\PrestaShop\Core\Grid\Data\GridData;
use PrestaShop\PrestaShop\Core\Grid\Data\Factory\GridDataFactoryInterface;
use PrestaShop\PrestaShop\Core\Grid\Query\DoctrineQueryBuilderInterface;
use PrestaShop\PrestaShop\Core\Grid\Query\QueryParserInterface;
use PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use PrestaShop\PrestaShop\Core\Localization\CLDR\DataLayer\LocaleCache;
use PrestaShop\PrestaShop\Core\Localization\Locale;
use Symfony\Component\DependencyInjection\Container;
use MsThemeConfig\Core\Grid\Query\OfferIntegrationQueryBuilder;

/**
 *
 */
final class OfferIntegrationDataFactory implements GridDataFactoryInterface
{
       /**
        * @var OfferIntegrationQueryBuilder
        */
       private $gridQueryBuilder;

       /**
        * @var HookDispatcherInterface
        */
       private $hookDispatcher;

       /**
        * @var QueryParserInterface
        */
       private $queryParser;

       /**
        * @var string
        */
       private $gridId;
    private Locale $locale;
    private \Context $context;

    /**
     * @param OfferIntegrationQueryBuilder $gridQueryBuilder
     * @param HookDispatcherInterface $hookDispatcher
     * @param QueryParserInterface $queryParser
     * @param string $gridId
     * @throws \Exception
     */
       public function __construct(
           OfferIntegrationQueryBuilder $gridQueryBuilder,
           HookDispatcherInterface $hookDispatcher,
           QueryParserInterface $queryParser,
           string $gridId
       ) {
           $this->gridQueryBuilder = $gridQueryBuilder;
           $this->hookDispatcher = $hookDispatcher;
           $this->queryParser = $queryParser;
           $this->gridId = $gridId;
           $this->context = Context::getContext();
           $this->locale = Tools::getContextLocale($this->context);
       }

       /**
        * {@inheritdoc}
        */
       public function getData(SearchCriteriaInterface $searchCriteria): GridData
       {
           $searchQueryBuilder = $this->gridQueryBuilder->getSearchQueryBuilder($searchCriteria);
           $countQueryBuilder = $this->gridQueryBuilder->getCountQueryBuilder($searchCriteria);

           $this->hookDispatcher->dispatchWithParameters('action' . Container::camelize($this->gridId) . 'GridQueryBuilderModifier', [
               'search_query_builder' => $searchQueryBuilder,
               'count_query_builder' => $countQueryBuilder,
               'search_criteria' => $searchCriteria,
           ]);

           $records = $searchQueryBuilder->execute()->fetchAll();
           $recordsTotal = (int) $countQueryBuilder->execute()->fetch(PDO::FETCH_COLUMN);

           $records = new RecordCollection($records);

           return new GridData(
               $records,
               $recordsTotal,
               $this->getRawQuery($searchQueryBuilder)
           );
       }


       /**
        * @param QueryBuilder $queryBuilder
        *
        * @return string
        */
       private function getRawQuery(QueryBuilder $queryBuilder)
       {
           $query = $queryBuilder->getSQL();
           $parameters = $queryBuilder->getParameters();

           return $this->queryParser->parse($query, $parameters);
       }



}
