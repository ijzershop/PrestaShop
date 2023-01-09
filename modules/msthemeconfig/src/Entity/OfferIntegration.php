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

namespace MsThemeConfig\Entity;

use DateTime;
use Doctrine\DBAL\Types\DateTimeType;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="MsThemeConfig\Core\Repository\OfferIntegrationRepository")
 * @ORM\HasLifecycleCallbacks
 * @UniqueEntity("code")
 */
class OfferIntegration
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
     * @return OfferIntegration
     */
    public function setId($id_oi_offer): OfferIntegration
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
     * @return OfferIntegration
     */
    public function setCode(string $code): OfferIntegration
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
     * @return OfferIntegration
     */
    public function setName(string $name): OfferIntegration
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
     * @return OfferIntegration
     */
    public function setEmail(string $email): OfferIntegration
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
     * @return OfferIntegration
     */
    public function setPhone(?string $phone): OfferIntegration
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
     * @return OfferIntegration
     */
    public function setMessage(?string $message): OfferIntegration
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
     * @return OfferIntegration
     */
    public function setDateExp(DateTime $date_exp): OfferIntegration
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
     * @return OfferIntegration
     */
    public function setUpdatedAt(DateTime $date_upd): OfferIntegration
    {
        $this->date_upd = $date_upd;

        return $this;
    }

}
