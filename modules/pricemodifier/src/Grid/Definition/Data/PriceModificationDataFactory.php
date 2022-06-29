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

namespace Modernesmid\Module\Pricemodifier\Grid\Definition\Data;

use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManager;
use Modernesmid\Module\Pricemodifier\Controller\Admin\PriceModificationsAjaxController;
use Modernesmid\Module\Pricemodifier\Entity\PriceModification;
use Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository;
use PDO;
use Product;
use Context;
use PrestaShop\PrestaShop\Core\Grid\Data\GridData;
use PrestaShop\PrestaShop\Core\Grid\Data\Factory\GridDataFactoryInterface;
use PrestaShop\PrestaShop\Core\Grid\Query\DoctrineQueryBuilderInterface;
use PrestaShop\PrestaShop\Core\Grid\Query\QueryParserInterface;
use PrestaShop\PrestaShop\Core\Grid\Record\RecordCollection;
use PrestaShop\PrestaShop\Core\Grid\Search\SearchCriteriaInterface;
use PrestaShop\PrestaShop\Core\Hook\HookDispatcherInterface;
use Symfony\Component\DependencyInjection\Container;
use Modernesmid\Module\Pricemodifier\Grid\Query\PriceModificationQueryBuilder;

final class PriceModificationDataFactory implements GridDataFactoryInterface
{
       /**
        * @var PriceModificationQueryBuilder
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

       /**
        * @param PriceModificationQueryBuilder $gridQueryBuilder
        * @param HookDispatcherInterface $hookDispatcher
        * @param QueryParserInterface $queryParser
        * @param string $gridId
        */
       public function __construct(
           PriceModificationQueryBuilder $gridQueryBuilder,
           HookDispatcherInterface $hookDispatcher,
           QueryParserInterface $queryParser,
           $gridId
       ) {
           $this->gridQueryBuilder = $gridQueryBuilder;
           $this->hookDispatcher = $hookDispatcher;
           $this->queryParser = $queryParser;
           $this->gridId = $gridId;
       }

       /**
        * {@inheritdoc}
        */
       public function getData(SearchCriteriaInterface $searchCriteria)
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

           $records = $this->modifyRecords($records);
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


           /**
            * Modify category records.
            *
            * @param array $records
            *
            * @return array
            */
           private function modifyRecords(array $records)
           {
                $id_lang = Context::getContext()->language->id;
                   foreach ($records as $key => $record) {

                    $id_product = $record['id_store_product'];

                    $formula = $record['formula'];
                    $incrementFormula = $record['increment_formula'];
                    $contr = new PriceModificationsAjaxController();

                    $priceMod = new PriceModification();
                    $priceMod->setActive($record['active']);
                    $priceMod->setId($record['id']);
                    $priceMod->setNameSupplier($record['name_supplier']);
                    $priceMod->setIdStoreProduct($record['id_store_product']);
                    $priceMod->setFileSupplier($record['file_supplier']);
                    if(!is_null($record['selected_supplier_price'])){
                        $priceMod->setSelectedSupplierPrice($record['selected_supplier_price']);
                    }
                       if(!is_null($record['formula'])) {
                           $priceMod->setFormula($record['formula']);
                       }

                       if(!is_null($record['increment_formula'])) {
                           $priceMod->setIncrementFormula($record['increment_formula']);
                       }

                    $priceMod->setOldSupplierPrice((int)$record['old_supplier_price']);
                    $priceMod->setOldStorePrice((int)$record['old_store_price']);
                    $priceMod->setSupplierData($record['supplier_data']);

                    $newPrice = json_decode($contr->calculateFormula($formula, $id_product, $priceMod, $record['selected_supplier_price']));
                    $newPriceWithIncrement = json_decode($contr->calculateFormula($formula.''.$incrementFormula, $id_product, $priceMod, $record['selected_supplier_price']));

                       $records[$key]['id_store_product_name'] = Product::getProductName($records[$key]['id_store_product'], null, $id_lang);
                       $records[$key]['id_store_product_price'] = Product::getPriceStatic(
                                                                                       (int) $records[$key]['id_store_product'],
                                                                                       false,
                                                                                       null,
                                                                                       6
                                                                                   );

                       $records[$key]['generated_formula'] = $newPrice->generated_formula;
                       $records[$key]['base_price_supplier'] = $newPrice->total;
                       $records[$key]['new_price'] = $newPriceWithIncrement->total;
                       $records[$key]['supplier_price_value'] = $newPrice->supplier_price;
                       $records[$key]['supplier_data'] = json_decode($record['supplier_data']);



//                       var_export($records[$key]);
                   }
//               die();

               return $records;
           }

   }
