<?php
namespace MsThemeConfig\Controller\Admin;

use ConfigurationCore;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Exception;
use MsThemeConfig\Core\Grid\Definition\Factory\OfferIntegrationGridDefinitionFactory;
use MsThemeConfig\Core\Grid\Filters\OfferIntegrationFilters;
use PrestaShop\PrestaShop\Adapter\Entity\AdminController;
use PrestaShop\PrestaShop\Adapter\Entity\Mail;
use PrestaShop\PrestaShop\Adapter\Entity\PrestaShopException;
use PrestaShop\PrestaShop\Adapter\Entity\Product;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\SymfonyContainer;
use PrestaShop\PrestaShop\Core\Domain\Customer\Exception\CustomerNotFoundException;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;

use MsThemeConfig\Class\Offer;
use MsThemeConfig\Class\OIHelperList;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShopBundle\Service\Grid\ResponseBuilder;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use ValidateCore;

/**
 *
 */
class AdminOfferController extends FrameworkBundleAdminController {

	public array $filter = array();
	public string $orderby = "";
	public bool $orderway = true;
    private string $orderBy;
    private string $orderWay;
    private \Context $context;

    public function __construct()
	{
		$this->context = Context::getContext();

		parent::__construct();
	}

    /**
     * List offer_integrations
     *
     * @param Request $request
     * @param OfferIntegrationFilters $filters
     *
     * @return Response
     */
    public function indexAction(Request $request, OfferIntegrationFilters $filters): Response
    {
        $offerIntegrationGridFactory = $this->get('modernesmid.grid.factory.offer_integrations');
        $offerIntegrationGrid = $offerIntegrationGridFactory->getGrid($filters);

        return $this->render(
            '@Modules/msthemeconfig/views/templates/admin/offer_integration_index.html.twig',
            [
                'enableSidebar' => true,
                'layoutTitle' => $this->trans('Offer Integration', 'Modules.Pricemodifier.Admin'),
                'layoutHeaderToolbarBtn' => $this->getToolbarButtons(),
                'offerIntegrationGrid' => $this->presentGrid($offerIntegrationGrid)
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
    public function searchAction(Request $request): RedirectResponse
    {
        /** @var ResponseBuilder $responseBuilder */
        $responseBuilder = $this->get('prestashop.bundle.grid.response_builder');

        return $responseBuilder->buildSearchResponse(
            $this->get('modernesmid.grid.factory.offer_integrations'),
            $request,
            OfferIntegrationGridDefinitionFactory::GRID_ID,
            'modernesmid_offer_integration_index'
        );
    }

    /**
     * @param $offer_id
     * @param Request $req
     * @return RedirectResponse
     * @throws \PrestaShopDatabaseException
     * @throws \PrestaShopException
     */
    public function sendMailAction($offer_id, Request $req): RedirectResponse
    {
        $offer = null;
        if ($offer_id == null
            || !is_numeric($offer_id)
            || ($offer = new Offer($offer_id)) == null
            || !ValidateCore::isEmail($offer->email)) {

            $this->addFlash('error', 'Er is een fout opgetreden bij het verzenden van de email, is het emailadres correct?');
            return $this->redirectToRoute('offerintegration_index');
        }

        $template = 'offernotification';
        $template_path = _PS_MODULE_DIR_ . 'offerintegration/mails/';
        $subject = sprintf(Context::getContext()->getTranslator()->trans('Offerte %s'), $offer->code);
        $bcc = ConfigurationCore::get('PS_SHOP_EMAIL');

        $vars = [
            '{customer_name}' => $offer->name,
            '{message}' => $offer->message,
            '{offer_code}' => $offer->code,
            '{date_exp}' => date('d-m-Y H:m',strtotime($offer->date_exp)),
            '{url}' => $this->context->link->getModuleLink('msthemeconfig', 'offer', ['offer_code' => $offer->code])
        ];

        if (Mail::send($this->context->language->id, $template, $subject, $vars, $offer->email, $offer->name, null, null, null, null, $template_path, false, null, $bcc)) {
            $this->addFlash('success', 'Offerte '. $offer->code . ' is verstuurd naar ' . $offer->email);
        }
        else {
            $this->addFlash('error', 'Er is een fout opgetreden bij het verzenden van de email!');
        }
        return $this->redirectToRoute('offerintegration_index');
    }


    /**
     * Create offer
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAction(Request $request): Response
    {
        $offerFormOptions = [

        ];

        try {
            $offerForm = $this->get('modernesmid.form.identifiable_object.builder.offer_integrations_form_builder')
                ->getForm([], [], $offerFormOptions);

        } catch (Exception $exception) {
            $this->addFlash(
                'error',
                $this->getErrorMessageForException($exception, $exception->getMessage())
            );

            return $this->redirectToRoute('offerintegration_index');
        }

        try {
            $offerForm->handleRequest($request);
            $offerFormHandler = $this->get('modernesmid.form.identifiable_object.handler.offer_integrations_form_handler');

            $result = $offerFormHandler->handleFor((int)$request->get('new-offer-id'), $offerForm);
            if ($result->isSubmitted() && $result->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', 'Admin.Notifications.Success'));

                return $this->redirectToRoute('offerintegration_index');
            }
        } catch (PrestaShopException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, (array)$e->getMessage()));
            return $this->redirectToRoute('offerintegration_index');
        }

        $adminSelect2DataLink = $this->generateUrl('offerintegration_ajax_select2_products_data');
        $putLink = $this->generateUrl('offerintegration_ajax_put_offer_row');

        return $this->render('@Modules/msthemeconfig/views/templates/admin/create_offer_integration.html.twig', [
            'offerForm' => $offerForm->createView(),
            'offerRows' => [],
            'offerId' => null,
            'putLink' => $putLink,
            'adminSelect2DataLink' => $adminSelect2DataLink
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
        $repository = $this->get('modernesmid.module.pricemodifier.repository.price_modification_repository');
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
     * @param $offer_id
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function editAction($offer_id, Request $request): RedirectResponse|Response
    {
        $offerFormOptions = [

        ];

        try {
            $offerForm = $this->get('modernesmid.form.identifiable_object.builder.offer_integrations_form_builder')
                ->getFormFor((int) $offer_id, [], $offerFormOptions);

        } catch (Exception $exception) {
            $this->addFlash(
                'error',
                $this->getErrorMessageForException($exception, (array)$exception->getMessage())
            );

            return $this->redirectToRoute('offerintegration_index');
        }

        try {
            $offerForm->handleRequest($request);
            $offerFormHandler = $this->get('modernesmid.form.identifiable_object.handler.offer_integrations_form_handler');


            $result = $offerFormHandler->handleFor((int) $offer_id, $offerForm);
            if ($result->isSubmitted() && $result->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', 'Admin.Notifications.Success'));

                return $this->redirectToRoute('offerintegration_index');
            }
        } catch (PrestaShopException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, (array)$e->getMessage()));
            return $this->redirectToRoute('offerintegration_index');
        }
        $offerRows = Product::getOfferRows($offer_id);
        $adminSelect2DataLink = $this->generateUrl('offerintegration_ajax_select2_products_data');
        $putLink = $this->generateUrl('offerintegration_ajax_put_offer_row');

        return $this->render('@Modules/msthemeconfig/views/templates/admin/edit_offer_integration.html.twig', [
            'offerForm' => $offerForm->createView(),
            'offerRows' => $offerRows,
            'offerId' => $offer_id,
            'putLink' => $putLink,
            'adminSelect2DataLink' => $adminSelect2DataLink
        ]);
    }

    /**
     * @return array
     */
    private function getToolbarButtons(): array
    {
        $toolbarButtons = [];

        $toolbarButtons['new_offer'] = [
            'desc' => $this->context->getTranslator()->trans('Maak nieuwe offerte'),
            'href' => $this->generateUrl('offerintegration_create'),
        ];
        return $toolbarButtons;
    }
}
