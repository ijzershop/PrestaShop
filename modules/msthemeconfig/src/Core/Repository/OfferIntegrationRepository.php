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

namespace MsThemeConfig\Core\Repository;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use Doctrine\ORM\QueryBuilder;

/**
 *
 */
class OfferIntegrationRepository extends EntityRepository
{
    /**
     * Find one item by ID.
     *
     * @param int $id_oi_offer
     * @return float|int|mixed|string
     * @throws NoResultException
     * @throws NonUniqueResultException
     */
    public function findOneById(int $id_oi_offer)
    {
        $qb = $this->createQueryBuilder('q')
            ->addSelect('q')
        ;

        $qb
            ->andWhere('q.id_oi_offer = :id_oi_offer')
            ->setParameter('id_oi_offer', $id_oi_offer)
        ;

       return $qb->getQuery()->getOneOrNullResult();
    }

    public function getRandom($langId = 0, $limit = 0)
    {
        /** @var QueryBuilder $qb */
        $qb = $this->createQueryBuilder('q')
            ->addSelect('q')
        ;

        $id_oi_offers = $this->getAllIds();
        shuffle($id_oi_offers);
        if ($limit > 0) {
            $id_oi_offers = array_slice($id_oi_offers, 0, $limit);
        }
        $qb
            ->andWhere('q.id_oi_offer in (:id_oi_offers)')
            ->setParameter('id_oi_offers', $id_oi_offers)
        ;

        $offer_integrations = $qb->getQuery()->getResult();
        uasort($offer_integrations, function ($a, $b) use ($id_oi_offers) {
            return array_search($a->getId(), $id_oi_offers) - array_search($b->getId(), $id_oi_offers);
        });

        return $offer_integrations;
    }

    public function getAllIds()
    {
        /** @var QueryBuilder $qb */
        $qb = $this
            ->createQueryBuilder('q')
            ->select('q.id_oi_offer')
        ;

        $offer_integrations = $qb->getQuery()->getScalarResult();

        return array_map(function ($offer_integration) {
            return $offer_integration['id_oi_offer'];
        }, $offer_integrations);
    }
}
