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

namespace Modernesmid\Module\Pricemodifier\Repository;

use DateTime;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use Doctrine\ORM\QueryBuilder;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShopDatabaseException;

/**
 *
 */
class PriceModificationRepository extends EntityRepository
{

    /**
     * Find one item by ID.
     *
     * @param int $id
     *
     * @return array
     */
    public function findOneById($id)
    {
        $qb = $this->createQueryBuilder('q')
            ->addSelect('q')
        ;
        $qb
            ->andWhere('q.id = :id')
            ->setParameter('id', $id)
        ;

        return $qb->getQuery()->getResult()[0];
    }

    public function getRandom($langId = 0, $limit = 0)
    {
        /** @var QueryBuilder $qb */
        $qb = $this->createQueryBuilder('q')
            ->addSelect('q')
        ;

        $ids = $this->getAllIds();
        shuffle($ids);
        if ($limit > 0) {
            $ids = array_slice($ids, 0, $limit);
        }
        $qb
            ->andWhere('q.id in (:ids)')
            ->setParameter('ids', $ids)
        ;

        $price_modifications = $qb->getQuery()->getResult();
        uasort($price_modifications, function ($a, $b) use ($ids) {
            return array_search($a->getId(), $ids) - array_search($b->getId(), $ids);
        });

        return $price_modifications;
    }

    public function getAllIds()
    {
        /** @var QueryBuilder $qb */
        $qb = $this
            ->createQueryBuilder('q')
            ->select('q.id')
        ;

        $price_modifications = $qb->getQuery()->getScalarResult();

        return array_map(function ($price_modification) {
            return $price_modification['id'];
        }, $price_modifications);
    }


    /**
     * Find one item by ID.
     *
     * @param int $id
     *
     */
    public function findBySupplier($name_supplier, $file_supplier)
    {


    }


    /**
     * @throws PrestaShopDatabaseException
     */
    public function findOrCreateBySupplier(array $name_supplier, mixed $supplier_data, string $file_supplier, $xml_date): bool|string
    {
        try {
            $name = end($name_supplier);

            if($name === "<b>Klant</b><br>"){
                return "";
            }

            $qb = Db::getInstance();
            $qb->update('price_modification',
                [
                'name_supplier' => $name,
                'file_supplier' => $file_supplier,
                'supplier_data' => addslashes($supplier_data),
                'xml_upload_date' => $xml_date->format('Y-m-d H:m:s')
                ],
                "`name_supplier` IN ('".implode("','", $name_supplier). "') AND `file_supplier` = '". $file_supplier . "'",
                100,
                false,
                false,
                true
            );
            if(!$qb->Affected_Rows()){
                $qb->insert('price_modification', [
                    'name_supplier' => $name,
                    'file_supplier' => $file_supplier,
                    'supplier_data' => addslashes($supplier_data),
                    'xml_upload_date' => $xml_date->format('Y-m-d H:m:s'),
                    'id_store_product' => 0,
                    'active' => 0
                ],
                    false,
                    false
                );

            }
            return $name;
        } catch (PrestaShopDatabaseException $exception){
            return $exception->getMessage();
        }
    }

}
