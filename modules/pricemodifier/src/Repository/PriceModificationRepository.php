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

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use Doctrine\ORM\QueryBuilder;

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
     * @return array
     */
    public function findBySupplier($name_supplier, $file_supplier)
    {
        $qb = $this->createQueryBuilder('q')
            ->addSelect('q');
        $qb
            ->andWhere('q.name_supplier = :name_supplier')
            ->setParameter('name_supplier', $name_supplier)
            ->andWhere('q.file_supplier = :file_supplier')
            ->setParameter('file_supplier', $file_supplier);

        return $qb->getQuery()->getFirstResult();

    }

}
