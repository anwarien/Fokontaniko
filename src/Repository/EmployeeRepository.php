<?php
/**
 * © Julkwel <julienrajerison5@gmail.com>
 *
 * Fokontany Repository
 */

namespace App\Repository;

use App\Entity\Employee;
use App\Entity\Fokontany;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Employee|null find($id, $lockMode = null, $lockVersion = null)
 * @method Employee|null findOneBy(array $criteria, array $orderBy = null)
 * @method Employee[]    findAll()
 * @method Employee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EmployeeRepository extends ServiceEntityRepository
{
    /**
     * ResponsableRepository constructor.
     *
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Employee::class);
    }

    /**
     * @param Fokontany|null $fokontany
     *
     * @return Query
     */
    public function findAllEmployee(?Fokontany $fokontany)
    {
        $qb = $this->createQueryBuilder('e')
            ->where('e.deletedAt IS NULL')
            ->andWhere('e.fokontany = :fokontany')
            ->andWhere('e.isAlive = :isAlive')
            ->setParameter('fokontany', $fokontany)
            ->setParameter('isAlive', true);

        return $qb->getQuery();
    }
}
