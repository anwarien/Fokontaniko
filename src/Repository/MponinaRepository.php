<?php
/**
 * © Julkwel <julienrajerison5@gmail.com>
 *
 * Fokontany Repository.
 */

namespace App\Repository;

use App\Entity\Mponina;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Mponina|null find($id, $lockMode = null, $lockVersion = null)
 * @method Mponina|null findOneBy(array $criteria, array $orderBy = null)
 * @method Mponina[]    findAll()
 * @method Mponina[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MponinaRepository extends ServiceEntityRepository
{
    /**
     * MponinaRepository constructor.
     *
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Mponina::class);
    }
}
