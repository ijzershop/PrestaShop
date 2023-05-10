<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *
 * @author    JB Stoker <jelmer@ijzershop.nl>
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

namespace Modernesmid\Module\Pricemodifier\Form;

use Doctrine\ORM\EntityManagerInterface;
use Modernesmid\Module\Pricemodifier\Controller\Admin\Classes\ConvertUploadedFile;

use Modernesmid\Module\Pricemodifier\Entity\PriceModification;
use Modernesmid\Module\Pricemodifier\Repository\PriceModificationRepository;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Core\File\Exception\FileException;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\DataHandler\FormDataHandlerInterface;
use PrestaShop\PrestaShop\Core\Localization\Specification\Price;
use Symfony\Component\Filesystem\Filesystem;

/**
 *
 */
class PriceListUploadFormDataHandler implements FormDataHandlerInterface
{
    /**
     * @var PriceModificationRepository
     */
    private $priceModificationRepository;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @param PriceModificationRepository $priceModificationRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
        PriceModificationRepository $priceModificationRepository,
        EntityManagerInterface    $entityManager
    )
    {
        $this->price_modificationRepository = $priceModificationRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data)
    {
        $file = $data['uploaded_file'];
        $supplier = strtoupper($data['file_supplier']);

        try {
            $filenameElements = explode('.', $file->getClientOriginalName());
            $extension = array_pop($filenameElements);
            $extension = strtolower($extension);
            $newFilename = uniqid() . '.' . $extension;
            $fileNameWithPath = _PS_MODULE_DIR_.'/pricemodifier/uploads/'.$newFilename;
            $file->move(
                _PS_MODULE_DIR_ . '/pricemodifier/uploads',
                $newFilename
            );
            $converter = new ConvertUploadedFile();
            $xmlData = $converter->readFile($fileNameWithPath, $supplier);
        } catch (FileException $e) {
            return $e->getMessage();
        }

        try {

            $em = $this->entityManager;
            $repository = $em->getRepository(PriceModification::class);

            foreach ($xmlData as $product) {
                $supplier_name = preg_replace('/ +/', ' ','<b>' . $product['naam'] . '</b><br>' . $product['type']);

                $active = false;
                $supplier_data = [];
                $supplier_data['prices'] = [];
                $supplier_data['attributes'] = [];

                $supplier_data['attributes']['diameter'] = $product['diameter'];
                $supplier_data['attributes']['kwaliteit'] = $product['kwaliteit'];
                $supplier_data['attributes']['uitvoering'] = $product['uitvoering'];
                $supplier_data['attributes']['handelslengte'] = $product['handelslengte'];
                $supplier_data['attributes']['kilo_per_meter'] = $product['kilo_per_meter'];
                $supplier_data['attributes']['gewicht'] = $product['gewicht'];
                $supplier_data['attributes']['korting'] = $product['korting'];
                $supplier_data['attributes']['min_afname'] = $product['min_afname'];
                $supplier_data['attributes']['eenheid'] = $product['eenheid'];
                $supplier_data['attributes']['artikel_nummer'] = $product['artikel_nummer'];
                $supplier_data['attributes']['artikel_groep'] = $product['artikel_groep'];
                $supplier_data['attributes']['barcode'] = $product['barcode'];
                $supplier_data['attributes']['oud_artikel'] = $product['oud_artikel'];
                $supplier_data['attributes']['nieuw_artikel'] = $product['nieuw_artikel'];

                $supplier_data['prices']['basis_prijs'] = $product['standaard_prijs'];
                $supplier_data['prices']['staffel_aantal_1'] = $product['prijs_aantal_1'];
                $supplier_data['prices']['staffel_prijs_1'] = $product['prijs_1'];
                $supplier_data['prices']['staffel_aantal_2'] = $product['prijs_aantal_2'];
                $supplier_data['prices']['staffel_prijs_2'] = $product['prijs_2'];
                $supplier_data['prices']['staffel_aantal_3'] = $product['prijs_aantal_3'];
                $supplier_data['prices']['staffel_prijs_3'] = $product['prijs_3'];
                $supplier_data['prices']['staffel_aantal_4'] = $product['prijs_aantal_4'];
                $supplier_data['prices']['staffel_prijs_4'] = $product['prijs_4'];
                $supplier_data['prices']['staffel_aantal_5'] = $product['prijs_aantal_5'];
                $supplier_data['prices']['staffel_prijs_5'] = $product['prijs_5'];
                $supplier_data['prices']['staffel_aantal_6'] = $product['prijs_aantal_6'];
                $supplier_data['prices']['staffel_prijs_6'] = $product['prijs_6'];
                $supplier_data['prices']['staffel_aantal_7'] = $product['prijs_aantal_7'];
                $supplier_data['prices']['staffel_prijs_7'] = $product['prijs_7'];

                $supplier_data['prices']['bruto_prijs_per_stuk'] = $product['bruto_prijs_per_stuk'];
                $supplier_data['prices']['netto_prijs_per_stuk'] = $product['netto_prijs_per_stuk'];
                $supplier_data['prices']['prijs_per_meter'] = $product['prijs_per_meter'];
                $supplier_data['prices']['prijs_tot_75'] = $product['prijs_tot_75'];
                $supplier_data['prices']['prijs_tot_150'] = $product['prijs_tot_150'];
                $supplier_data['prices']['prijs_tot_250'] = $product['prijs_tot_250'];
                $supplier_data['prices']['prijs_tot_300'] = $product['prijs_tot_300'];
                $supplier_data['prices']['prijs_tot_500'] = $product['prijs_tot_500'];
                $supplier_data['prices']['prijs_tot_1000'] = $product['prijs_tot_1000'];
                $supplier_data['prices']['prijs_vanaf_300'] = $product['prijs_vanaf_300'];
                $supplier_data['prices']['prijs_vanaf_1000'] = $product['prijs_vanaf_1000'];
                $supplier_data['prices']['stralen_menieen_per_meter'] = $product['stralen_menieen_per_meter'];
                $supplier_data['prices']['stralen_menieen_per_100'] = $product['stralen_menieen_per_100'];
                $supplier_data['prices']['stralen_per_meter'] = $product['stralen_per_meter'];
                $supplier_data['prices']['stralen_per_100'] = $product['stralen_per_100'];
                $supplier_data['prices']['verven_per_m1'] = $product['verven_per_m1'];
                $supplier_data['prices']['haaks_zagen'] = $product['haaks_zagen'];

                $priceMod = $repository->findBy(['name_supplier' => $supplier_name, 'file_supplier' => $supplier], null, 1);

                if (empty($priceMod)) {
                    $priceMod = new PriceModification();
                    $priceMod->setIdStoreProduct(0);
                    $priceMod->setNameSupplier($supplier_name);
                    $priceMod->setFileSupplier($supplier);
                    $priceMod->setActive($active);
                    $priceMod->setSupplierData(json_encode($supplier_data));
                    $priceMod->setUpdatedAt();
                    $em->persist($priceMod);
                } else {
                    $priceMod[0]->setSupplierData(json_encode($supplier_data));
                    $priceMod[0]->setUpdatedAt();
                }

                $em->flush();
            }
        } catch (PrestaShopException $exception) {
            return $exception->getMessage();
        }

        $filesystem = new Filesystem();
        $filesystem->remove($fileNameWithPath);

        return true;
    }


    public function update($id, $data)
    {

    }
}
