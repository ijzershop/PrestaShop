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
use Product;

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

            $supplierWhere = '';
            if(count($name_supplier) > 0){
                $supplierWhere .=  " AND (`name_supplier` = '";
                $supplierWhere .= implode("' OR `name_supplier` = '", preg_replace(['/["][\/]/'],"'",$name_supplier));
                $supplierWhere .=  "')";
            }

            $qb = \Db::getInstance();
            $sqlSelect = "SELECT * FROM `" . _DB_PREFIX_ . "price_modification` WHERE `file_supplier` = '". $file_supplier. "' " . $supplierWhere;
            $res = $qb->executeS($sqlSelect);

            if(count($res) > 0){
//                foreach($res as $existingProduct){
//                    if($existingProduct['id_store_product'] > 0){
//                        $product = new Product($existingProduct['id_store_product']);
//                        $data = json_decode($supplier_data);
//                        $selectedFeatureLength = 2;
//                        foreach ($product->getFeatures() as $feature){
//                            if((int)$feature['id_feature_value'] === 61 || (int)$feature['id_feature_value'] == 194 || (int)$feature['id_feature_value'] == 1320){
//                                $selectedFeatureLength = 1;
//                                continue;
//                            }
//                        }
//
//                        if((float)$data->attributes->kilo_per_meter > 0 && (float)$data->attributes->gewicht == 0){
//                            //koker is * 2
//                            $product->weight = (float)$data->attributes->kilo_per_meter * $selectedFeatureLength;
//
//                        } elseif((float)$data->attributes->handelslengte > 0 && (float)$data->attributes->kilo_per_meter == 0 && (float)$data->attributes->gewicht > 0){
//                            //lengte / gewicht
//                            $product->weight = (float)$data->attributes->gewicht/(float)$data->attributes->handelslengte * $selectedFeatureLength;
//                        }elseif((float)$data->attributes->handelslengte == 0 && (float)$data->attributes->kilo_per_meter == 0 && (float)$data->attributes->gewicht > 0){
//                            //plaat / 4
//                            $product->weight = (float)$data->attributes->gewicht/4;
//                        }else{
//                            $product->weight = (float)$data->attributes->gewicht;
//                        }
//
//                        $product->save();
//                    }
//                }

                $sqlUpdate = "UPDATE `" . _DB_PREFIX_ . "price_modification` SET `name_supplier` = '".$name."',
                `file_supplier`='".$file_supplier."',
                 `supplier_data`='".$supplier_data."',
                  `xml_upload_date` = '".$xml_date->format("Y-m-d H:m:s") .
                    "' WHERE `file_supplier` = '". $file_supplier. "' ". $supplierWhere;

                $qb->execute($sqlUpdate, false);
            } else {
                $sqlInsert = "INSERT INTO `" . _DB_PREFIX_ . "price_modification` (`name_supplier`,`file_supplier`, `supplier_data`,`xml_upload_date`) " .
                    "VALUES ('".$name."','".$file_supplier."','".$supplier_data."','".$xml_date->format("Y-m-d H:m:s")."') ";

                $qb->execute($sqlInsert, false);
            }
            return $name;
        } catch (PrestaShopDatabaseException|\PrestaShopException $exception){
            return $exception->getMessage();
        }
    }

}
