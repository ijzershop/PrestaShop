<?php
/**
 * Offer intergation
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *
 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
namespace MsThemeConfig\DBEntity;

use DateTime;
use Doctrine\DBAL\Types\DateTimeType;
use Doctrine\ORM\Mapping as ORM;
use PrestaShop\PrestaShop\Core\Foundation\Database\EntityManager;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table()
 * @ORM\Entity()
 * @UniqueEntity("code")
 */
class OfferIntegration extends EntityManager
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(name="id_oi_offer", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id_oi_offer;

    /**
     * @var string
     * @ORM\Column(name="code", type="string", length=128, nullable=false, unique=true)
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=128, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", nullable=false)
     */
    private $email;


    /**
     * @var string|null
     *
     * @ORM\Column(name="phone", type="string", nullable=false)
     */
    private $phone;


    /**
     * @var string|null
     *
     * @ORM\Column(name="message", type="string", nullable=true)
     */
    private $message;


    /**
     * @var datetime
     *
     * @ORM\Column(name="date_exp", type="datetime", nullable=true)
     */
    private $date_exp;


    /**
     * @var datetime
     *
     * @ORM\Column(name="date_upd", type="datetime", nullable=false)
     */
    private $date_upd;


    public function __construct()
    {
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id_oi_offer;
    }

    /**
     */
    public function setId($id_oi_offer)
    {
        $this->id_oi_offer = $id_oi_offer;

        return $this;
    }

    /**
     * @return string
     */
    public function getCode(): string
    {
        return $this->code;
    }

    /**
     * @param string $code
     *
     */
    public function setCode(string $code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     *
     */
    public function setName(string $name)
    {
        $this->name = $name;

        return $this;
    }


    /**
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }

    /**
     * @param string $email
     *
     */
    public function setEmail(string $email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPhone(): ?string
    {
        return $this->phone;
    }

    /**
     * @param string|null $phone
     *
     */
    public function setPhone(?string $phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getMessage(): ?string
    {
        return $this->message;
    }

    /**
     * @param string|null $message
     *
     */
    public function setMessage(?string $message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getDateExp(): DateTime
    {
        return $this->date_exp;
    }

    /**
     * @param DateTime $date_exp
     *
     */
    public function setDateExp(DateTime $date_exp)
    {
        $this->date_exp = $date_exp;

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getUpdatedAt(): DateTime
    {
        return $this->date_upd;
    }

    /**
     * @param DateTimeType $date_upd
     *
     */
    public function setUpdatedAt(DateTime $date_upd)
    {
        $this->date_upd = $date_upd;

        return $this;
    }

}
