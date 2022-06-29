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

namespace Modernesmid\Module\Pricemodifier\Controller\Admin;

use Context;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Command\ToggleIsActivePriceModificationCommand;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\CannotToggleActivePriceModificationStatusException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\PriceModificationException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Query\GetPriceModificationIsActive;
use Modernesmid\Module\Pricemodifier\Entity\PriceModification;
use Modernesmid\Module\Pricemodifier\Grid\Definition\Factory\PriceModificationGridDefinitionFactory;
use Modernesmid\Module\Pricemodifier\Grid\Filters\PriceModificationFilters;
use PhpOffice\PhpSpreadsheet\Calculation\Financial\Securities\Price;
use PrestaShop\PrestaShop\Adapter\Entity\Category;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\Feature;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Product\PriceFormatter;
use PrestaShop\PrestaShop\Core\Util\DateTime\DateTime;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Service\Grid\ResponseBuilder;
use Product;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 *
 */
class PriceModificationsController extends FrameworkBundleAdminController
{
    /**
     * List price_modifications
     *
     * @param Request $request
     * @param PriceModificationFilters $filters
     *
     * @return Response
     */
    public function indexAction(Request $request, PriceModificationFilters $filters)
    {
        $price_modificationGridFactory = $this->get('modernesmid.module.pricemodifier.grid.factory.price_modifications');
        $price_modificationGrid = $price_modificationGridFactory->getGrid($filters);

        $adminLink = $this->generateUrl('modernesmid_pricemodifier_price_modification_ajax_fetch_data');
        $adminCalculateLink = $this->generateUrl('modernesmid_pricemodifier_price_modification_ajax_calculate_price');
        $adminSelect2DataLink = $this->generateUrl('modernesmid_pricemodifier_price_modification_ajax_select2_products_data');

        return $this->render(
            '@Modules/pricemodifier/views/templates/admin/index.html.twig',
            [
                'enableSidebar' => true,
                'layoutTitle' => $this->trans('PriceModifications', 'Modules.Pricemodifier.Admin'),
                'layoutHeaderToolbarBtn' => $this->getToolbarButtons(),
                'price_modificationGrid' => $this->presentGrid($price_modificationGrid),
                'supplier_data_array' => 0,
                'admin_link' => $adminLink,
                'admin_calculate_link' => $adminCalculateLink,
                'admin_select2_data_link' => $adminSelect2DataLink
            ]
        );
    }

    /**
     * Provides filters functionality.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function searchAction(Request $request)
    {
        /** @var ResponseBuilder $responseBuilder */
        $responseBuilder = $this->get('prestashop.bundle.grid.response_builder');

        return $responseBuilder->buildSearchResponse(
            $this->get('modernesmid.module.pricemodifier.grid.definition.factory.price_modifications'),
            $request,
            PriceModificationGridDefinitionFactory::GRID_ID,
            'modernesmid_pricemodifier_price_modification_index'
        );
    }


    /**
     * Create price_modification
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAction(Request $request)
    {
        $price_modificationFormBuilder = $this->get('modernesmid.module.pricemodifier.form.identifiable_object.builder.price_list_upload_form_builder');
        $price_modificationForm = $price_modificationFormBuilder->getForm();
        $price_modificationForm->get('uploaded_file')->getData();

        $price_modificationForm->handleRequest($request);

        $price_modificationFormHandler = $this->get('modernesmid.module.pricemodifier.form.identifiable_object.handler.price_list_upload_form_handler');
        $result = $price_modificationFormHandler->handle($price_modificationForm);
        if (null !== $result->getIdentifiableObjectId()) {
            $this->addFlash(
                'success',
                $this->trans('Price list uploaded and merged with existing data.', 'Admin.Notifications.Success')
            );

            return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');
        }

        return $this->render('@Modules/pricemodifier/views/templates/admin/create.html.twig', [
            'price_modificationForm' => $price_modificationForm->createView(),
        ]);
    }

    /**
     * Delete price_modification
     *
     * @param int $price_modificationId
     *
     * @return Response
     */
    public function deleteAction($price_modificationId)
    {
        $repository = $this->get('modernesmid.module.pricemodifier.repository.pricemodifier_repository');
        try {
            $price_modification = $repository->findOneById($price_modificationId);
        } catch (EntityNotFoundException $e) {
            $price_modification = null;
        }

        if (null !== $price_modification) {
            /** @var EntityManagerInterface $em */
            $em = $this->get('doctrine.orm.entity_manager');
            $em->remove($price_modification);
            $em->flush();

            $this->addFlash(
                'success',
                $this->trans('Successful deletion.', 'Admin.Notifications.Success')
            );
        } else {
            $this->addFlash(
                'error',
                $this->trans(
                    'Cannot find price_modification %price_modification%',
                    'Modules.Pricemodifier.Admin',
                    ['%price_modification%' => $price_modificationId]
                )
            );
        }

        return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');
    }

    /**
     * Delete bulk price_modifications
     *
     * @param Request $request
     *
     * @return Response
     */
    public function deleteBulkAction(Request $request)
    {
        $price_modificationIds = $request->request->get('price_modification_bulk');
        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');
        try {
            $price_modifications = $repository->findById($price_modificationIds);
        } catch (EntityNotFoundException $e) {
            $price_modifications = null;
        }
        if (!empty($price_modifications)) {
            /** @var EntityManagerInterface $em */
            $em = $this->get('doctrine.orm.entity_manager');
            foreach ($price_modifications as $price_modification) {
                $em->remove($price_modification);
            }
            $em->flush();

            $this->addFlash(
                'success',
                $this->trans('The selection has been successfully deleted.', 'Admin.Notifications.Success')
            );
        }
        return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');
    }


    /**
     * @param Request $request
     * @return RedirectResponse
     */
    public function bulkUpdateProductsAction(Request $request)
    {
        $data = \json_decode($request->get('bulk_selected_rows_data'), true);

        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');

        try {

            foreach ($data as $i => $item) {
                $store_product = $item['store_product'];
                $supplier_price = $item['supplier_price'] ?? 0;
                $formula = $item['formula'];
                $incr_formula = $item['increment_formula'];
                $active = $item['active'] ?? 0;

                if ($active != '1' || $store_product < 1) {
                    continue;
                }

                $priceMod = $repository->findOneById($item['id']);

                $priceMod->setActive(boolval($active));


                $priceMod->setIdStoreProduct((int)$store_product);

                if ($supplier_price > 0) {
                    $storePrice = Product::getPriceStatic((int)$store_product, false, null, 6);

                    $contr = new PriceModificationsAjaxController();
                    $calculatedSupplierPrice = json_decode($contr->calculateFormula($formula, $store_product, $priceMod, $supplier_price));

                    $priceMod->setOldSupplierPrice((string)$calculatedSupplierPrice->total);
                    $priceMod->setOldStorePrice((string)$storePrice);
                    $priceMod->setOldPriceUpdate(new \DateTime());

                    $priceMod->setSelectedSupplierPrice($supplier_price);
                }

                $priceMod->setFormula($formula);
                $priceMod->setIncrementFormula($incr_formula);

                /** @var EntityManagerInterface $em */
                $em = $this->get('doctrine.orm.entity_manager');
                $em->persist($priceMod);
                $em->flush();
            }

        } catch (Exception $e) {
            $this->addFlash(
                'error',
                $this->trans(
                    'Failed to update product %price_modification%',
                    'Modules.Pricemodifier.Admin',
                    ['%price_modification%' => $priceMod->getNameSupplier()]
                )
            );
        }
        $this->addFlash(
            'success',
            $this->trans(
                'Update successfully',
                'Modules.Pricemodifier.Admin',
                []
            )
        );
        return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     * @throws \PrestaShopDatabaseException
     * @throws \PrestaShopException
     */
    public function bulkUpdateProductsPrices(Request $request)
    {
        $data = \json_decode($request->get('bulk_selected_rows_data'), true);

        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');

        try {

            foreach ($data as $i => $item) {
                $store_product = $item['store_product'];
                $active = $item['active'] ?? 0;
                $newPrice = $item['new_price'] ?? 0;

                if ($active != '1' || $store_product < 1) {
                    continue;
                }

                $priceMod = $repository->findOneById($item['id']);

                $id_lang = Context::getContext()->language->id;
                $priceMod->setOldStorePrice((string)$newPrice);

                $product = new Product((int)$store_product);
                $productName = $product->name[$id_lang];
                $product->price = $newPrice;

                $product->update();

                /** @var EntityManagerInterface $em */
                $em = $this->get('doctrine.orm.entity_manager');
                $em->persist($priceMod);
                $em->flush();
            }

        } catch (Exception $e) {
            $this->addFlash(
                'error',
                $this->trans(
                    'Failed to update product price of product %product_name%',
                    'Modules.Pricemodifier.Admin',
                    ['%product_name%' => $productName]
                )
            );
        }
        $this->addFlash(
            'success',
            $this->trans(
                'Price updates successfull for all selected products',
                'Modules.Pricemodifier.Admin',
                []
            )
        );

        return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');


    }

    public function updateProductPrice($price_modificationId, Request $request)
    {
        $id_lang = Context::getContext()->language->id;
        $store_product = $request->get('store_product');
        $active = $request->get('active');
        $newPrice = $request->get('new_price');
        $supplier_id = $price_modificationId;

        $supplier_id = $price_modificationId;
        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');

        $priceMod = $repository->findOneById($supplier_id);

        $priceMod->setOldStorePrice((string)$newPrice);


        $product = new Product((int)$store_product);
        $productName = $product->name[$id_lang];
        $product->price = $newPrice;

        try {

            $product->update();

            /** @var EntityManagerInterface $em */
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($priceMod);
            $em->flush();


        } catch (Exception $e) {
            $this->addFlash(
                'error',
                $this->trans(
                    'Failed to update product price of product %product_name%',
                    'Modules.Pricemodifier.Admin',
                    ['%product_name%' => $productName]
                )
            );
        }
        $this->addFlash(
            'success',
            $this->trans(
                'Price update successfull for product %product_name%',
                'Modules.Pricemodifier.Admin',
                ['%product_name%' => $productName]
            )
        );

        return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');
    }


    public function updateProductAction($price_modificationId, Request $request)
    {
        $store_product = $request->get('store_product');
        $supplier_price = $request->get('supplier_price');
        $formula = $request->get('formula');
        $incr_formula = $request->get('increment_formula');
        $active = $request->get('active');
        $supplier_id = $price_modificationId;

        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');
        $priceMod = $repository->findOneById($supplier_id);

        $priceMod->setActive(boolval($active));


        $priceMod->setIdStoreProduct((int)$store_product);

        if ((int)$store_product > 0) {
            $supplierData = $priceMod->getSupplierData();
            $supplierPrice = $supplierData['prices']->{$supplier_price};
            $storePrice = Product::getPriceStatic((int)$store_product, false, null, 6);

            $contr = new PriceModificationsAjaxController();
            $calculatedSupplierPrice = json_decode($contr->calculateFormula($formula, $store_product, $priceMod, $supplier_price));


            $priceMod->setOldSupplierPrice((string)$calculatedSupplierPrice->total);
            $priceMod->setOldStorePrice((string)$storePrice);
            $priceMod->setOldPriceUpdate(new \DateTime());
        }

        $priceMod->setFormula($formula);
        $priceMod->setIncrementFormula($incr_formula);
        $priceMod->setSelectedSupplierPrice($supplier_price);

//        $total = $this->calculateFormula($formula, $store_product, $priceMod, $supplier_price);
        try {
            /** @var EntityManagerInterface $em */
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($priceMod);
            $em->flush();


        } catch (Exception $e) {
            $this->addFlash(
                'error',
                $this->trans(
                    'Failed to update product %price_modification%',
                    'Modules.Pricemodifier.Admin',
                    ['%price_modification%' => $priceMod->getNameSupplier()]
                )
            );
        }
        $this->addFlash(
            'success',
            $this->trans(
                'Update successfull %price_modification%',
                'Modules.Pricemodifier.Admin',
                ['%price_modification%' => $priceMod->getNameSupplier()]
            )
        );

        return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');
    }

    /**
     *
     * Berekend de nieuwe prijs aan de hand van de formule en product id
     *
     * Beschikbare Dynamische waarden
     *
     * {HL} = Handelslengte Leverancier
     * {GL} = Gewicht leverancier
     * {PL} = Geselecteerde Prijs Leverancier
     * {HW} = Handelslengte Webshop
     * {GW} = Gewicht Webshop
     * {PW} = Oude Prijs Webshop
     * {PROC float} = Procentuele waarde
     * {NUM float} = Numerieke Waarde
     *
     * Beschikbare operators
     * + = Toevoegen
     * - =  Aftrekken
     * / = delen
     * * = vermenigvuldigen
     * ( = groep open
     * ) = groep sluiten
     * % = modulus
     *
     * @param $formula
     * @param $id_product
     * @return void
     */
    private function calculateFormula($formula, $id_product, $priceMod, $supplier_price)
    {

        $supplierData = $priceMod->getSupplierData();

        $patterns = [
            '({HL})' => function () use ($supplierData) { //is Handelslengte van leverancier
                $supLength = $supplierData['attributes']['handelslengte'] ?? 0;
                return (float)$supLength;
            },
            '({GL})' => function () use ($supplierData) { //is gewicht van leverancier
                $supWeight = $supplierData['attributes']['gewicht'] ?? 0;
                return (float)$supWeight;
            },
            '({PL})' => function () use ($supplier_price, $supplierData) { //is de geslecteerde prijs van leverancier
                $supPrice = $supplierData['prices'][$supplier_price];
                return $supPrice;
            },
            '({HW})' => function () use ($id_product) {

                return $this->getProductFeatureValue($id_product, 32, 1) / 1000;
            },
            '({GW})' => function ($matches) use ($id_product) {
                return $this->getProductFeatureValue($id_product, 45, 1);
            },
            '({PW})' => function ($matches) use ($id_product) {
                $id_product;
                $price = Product::getPriceStatic($id_product, false, null, 6);
                return $price;
            },
            '({PROC [+-]?([0-9]*[.])?[0-9]+})' => function ($matches) {
                preg_match('([+-]?([0-9]*[.])?[0-9]+)', $matches[0], $res);
                if (count($res) > 0) {
                    $percentage = $res[0];
                } else {
                    $percentage = 0;
                }
                return (float)$percentage;
            },
            '({NUM [+-]?([0-9]*[.])?[0-9]+})' => function ($matches) {

                preg_match('([+-]?([0-9]*[.])?[0-9]+)', $matches[0], $res);
                if (count($res) > 0) {
                    $number = $res[0];
                } else {
                    $number = 0;
                }
                return (float)$number;
            }
        ];

        $result = preg_replace_callback_array($patterns, $formula);

        $total = 0;
        if ($this->validateGeneratedFormula($result)) {
            $math_string = "print (" . $result . ");";
            $total = eval($math_string);
        }

        return $total;
    }

    /**
     * Validate the sting before running eval;
     *
     * @param $string
     * @return int
     */
    private function validateGeneratedFormula($string)
    {
        $chars = str_split($string);
        $valid = 1;
        foreach ($chars as $char) {
            $charRes = preg_match('/[0-9-.+*)(\/]/', $char);
            if ($charRes == 0) {
                $valid = 0;
            }
        }
        return (bool)$valid;
    }


    private function getProductFeatureValue($id_product, $id_feature, $id_lang = 1)
    {
        if (!Feature::isFeatureActive()) {
            return [];
        }

        $featureValue = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS(
            '
                SELECT fp.id_feature, fp.id_product, fp.id_feature_value, fvl.value
                FROM `' . _DB_PREFIX_ . 'feature_product` fp
                LEFT JOIN `' . _DB_PREFIX_ . 'feature_value` fv ON (fp.id_feature_value = fv.id_feature_value)
                LEFT JOIN `' . _DB_PREFIX_ . 'feature_value_lang` fvl ON (fp.id_feature_value = fvl.id_feature_value)
                WHERE fp.id_product = ' . (int)$id_product . ' AND fp.id_feature = ' . (int)$id_feature
        );

        return (float)$featureValue[0]['value'];
    }


    /**
     * Toggles status.
     *
     * @param int $price_modificationId
     *
     * @return RedirectResponse
     */
    public function toggleStatusAction($price_modificationId)
    {
        try {
            $isActive = $this->getQueryBus()->handle(new GetPriceModificationIsActive((int)$price_modificationId));

            $this->getCommandBus()->handle(new ToggleIsActivePriceModificationCommand((int)$price_modificationId, !$isActive));

            $this->addFlash(
                'success',
                $this->trans('The status has been successfully updated.', 'Admin.Notifications.Success')
            );
        } catch (PriceModificationException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessageMapping()));
        }

        return $this->redirectToRoute('modernesmid_pricemodifier_price_modification_index');
    }

    /**
     * @return array[]
     */
    private function getToolbarButtons()
    {
        $toolbarButtons = [];

        $toolbarButtons['add'] = [
            'desc' => $this->trans('Upload new supplier price list', 'Modules.Pricemodifier.Admin'),
            'icon' => 'add_circle_outline',
            'href' => $this->generateUrl('modernesmid_pricemodifier_price_modification_create'),
        ];
        return $toolbarButtons;
    }

    private function getErrorMessageMapping()
    {
        return [
            CannotToggleActivePriceModificationStatusException::class => [
                CannotToggleActivePriceModificationStatusException::FAILED_TOGGLE => $this->trans(
                    'An error occurred while updating the status.',
                    'Admin.Notifications.Error'
                ),
                CannotToggleActivePriceModificationStatusException::FAILED_BULK_TOGGLE => $this->trans(
                    'An error occurred while updating the status.',
                    'Admin.Notifications.Error'
                ),
            ],
        ];
    }
}
