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

namespace Modernesmid\Module\Pricemodifier\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Modernesmid\Module\Pricemodifier\Repository\PriceListUploadRepository")
 * @ORM\HasLifecycleCallbacks
 */
class PriceListUpload
{

    private $uploaded_file;
    /**
     * @var int
     * @ORM\Id
     * @ORM\Column(name="file_supplier", type="string", nullable=false)
     */
    private $file_supplier;

    /**
     * @param object $uploaded_file
     *
     * @return PriceListUpload
     */
    public function setUploadedFile(object $uploaded_file): PriceListUpload
    {
//        var_export($uploaded_file);
//        die();


        $this->uploaded_file = $uploaded_file;

        return $this;
    }

    /**
     * @param string $file_supplier
     *
     * @return PriceListUpload
     */
    public function setFileSupplier(string $file_supplier): PriceListUpload
    {
        $this->file_supplier = $file_supplier;

        return $this;
    }
}
