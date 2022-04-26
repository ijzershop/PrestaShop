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

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Command\ToggleIsActivePriceModificationCommand;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\CannotToggleActivePriceModificationStatusException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Exception\PriceModificationException;
use Modernesmid\Module\Pricemodifier\Domain\PriceModification\Query\GetPriceModificationIsActive;
use Modernesmid\Module\Pricemodifier\Entity\PriceModification;
use Modernesmid\Module\Pricemodifier\Grid\Definition\Factory\PriceModificationGridDefinitionFactory;
use Modernesmid\Module\Pricemodifier\Grid\Filters\PriceModificationFilters;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Service\Grid\ResponseBuilder;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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

        return $this->render(
            '@Modules/pricemodifier/views/templates/admin/index.html.twig',
            [
                'enableSidebar' => true,
                'layoutTitle' => $this->trans('PriceModifications', 'Modules.Pricemodifier.Admin'),
                'layoutHeaderToolbarBtn' => $this->getToolbarButtons(),
                'price_modificationGrid' => $this->presentGrid($price_modificationGrid),
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
        $price_modificationFormBuilder = $this->get('modernesmid.module.pricemodifier.form.identifiable_object.builder.price_modification_form_builder');
        $price_modificationForm = $price_modificationFormBuilder->getForm();
        $price_modificationForm->handleRequest($request);

        $price_modificationFormHandler = $this->get('modernesmid.module.pricemodifier.form.identifiable_object.handler.price_modification_form_handler');
        $result = $price_modificationFormHandler->handle($price_modificationForm);

        if (null !== $result->getIdentifiableObjectId()) {
            $this->addFlash(
                'success',
                $this->trans('Successful creation.', 'Admin.Notifications.Success')
            );

            return $this->redirectToRoute('modernesmid_pricemodifier_treament_index');
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
     * Toggles status.
     *
     * @param int $price_modificationId
     *
     * @return RedirectResponse
     */
    public function toggleStatusAction($price_modificationId)
    {
        try {
            $isActive = $this->getQueryBus()->handle(new GetPriceModificationIsActive((int) $price_modificationId));

            $this->getCommandBus()->handle(new ToggleIsActivePriceModificationCommand((int) $price_modificationId, !$isActive));

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
        return [
            'add' => [
                'desc' => $this->trans('Upload new supplier price list', 'Modules.Pricemodifier.Admin'),
                'icon' => 'add_circle_outline',
                'href' => $this->generateUrl('modernesmid_pricemodifier_price_modification_create'),
            ]
        ];
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
