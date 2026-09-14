<?php

namespace MsThemeConfig\Controller\Admin;

use ConfigurationCore;
use Context;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityNotFoundException;
use Exception;
use Mail;
use MsThemeConfig\Class\Offer;
use MsThemeConfig\Core\Grid\Definition\Factory\OfferIntegrationGridDefinitionFactory;
use MsThemeConfig\Core\Grid\Filters\OfferIntegrationFilters;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\Builder\FormBuilderInterface;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\Handler\FormHandlerInterface;
use PrestaShop\PrestaShop\Core\Grid\GridFactoryInterface;
use PrestaShopBundle\Controller\Admin\PrestaShopAdminController;
use PrestaShopBundle\Service\Grid\ResponseBuilder;
use PrestaShopDatabaseException;
use PrestaShopException;
use Product;
use RuntimeException;
use PrestaShopBundle\Security\Admin\UserTokenManager;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Shop;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\Translation\TranslatorInterface;
use Throwable;
use Tools;
use ValidateCore;

class AdminOfferController extends PrestaShopAdminController
{
    public array $filter = [];
    public string $orderby = '';
    public bool $orderway = true;
    private string $orderBy;
    private string $orderWay;
    private Context $context;

    /**
     * List offer_integrations
     *
     * @param Request $request
     * @param OfferIntegrationFilters $filters
     *
     * @return Response
     */
    public function indexAction(
        Request $request,
        OfferIntegrationFilters $filters,
        #[Autowire(service: 'modernesmid.grid.factory.offer_integrations')]
        GridFactoryInterface $offerIntegrationGridFactory,
        #[Autowire(service: 'twig')]
        \Twig\Environment $twig
    ): Response {
        if ($request->getMethod() == 'POST') {
            $filter = $request->request->all('oi_offer');
            unset($filter['_token']);
            $filters->addFilter($filter);
        }
        $offerIntegrationGrid = $offerIntegrationGridFactory->getGrid($filters);

        return new Response($twig->render(
            '@Modules/msthemeconfig/views/templates/admin/offer_integration_index.html.twig',
            [
                'enableSidebar' => true,
                'layoutTitle' => $this->trans('Offer Integration', [], 'Modules.MsThemeConfig.Admin'),
                'layoutHeaderToolbarBtn' => $this->getToolbarButtons(),
                'offerIntegrationGrid' => $this->presentGrid($offerIntegrationGrid),
            ]
        ));
    }

    /**
     * Provides filters functionality.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function searchAction(
        Request $request,
        #[Autowire(service: 'prestashop.bundle.grid.response_builder')]
        ResponseBuilder $responseBuilder,
        #[Autowire(service: 'modernesmid.grid.factory.offer_integrations')]
        GridFactoryInterface $offerIntegrationGridFactory
    ): RedirectResponse {
        return $responseBuilder->buildSearchResponse(
            $offerIntegrationGridFactory,
            $request,
            OfferIntegrationGridDefinitionFactory::GRID_ID,
            'modernesmid_offer_integration_index'
        );
    }

    /**
     * @param $offer_id
     * @param Request $req
     *
     * @return RedirectResponse
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
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
        $template_path = _PS_MODULE_DIR_ . 'msthemeconfig/mails/';
        $subject = sprintf($this->trans('Offerte %s', [], 'Modules.MsThemeConfig.Admin'), $offer->code);
        $bcc = ConfigurationCore::get('PS_SHOP_EMAIL');

        $fmt = datefmt_create(
            'nl_NL', // The output language.
            pattern: "eeee d MMMM Y 'om' k:mm" // The output formatting.
        );
        $numericDate = strtotime($offer->date_exp);
        $translated_date = datefmt_format($fmt, $numericDate);

        $vars = [
            '{customer_name}' => $offer->name,
            '{offer_code}' => $offer->code,
            '{offer_access_code}' => $offer->access_code,
            '{customer_email}' => $offer->email,
            '{date_exp}' => date('d-m-Y', strtotime($offer->date_exp)),
            '{date_exp_exact}' => $translated_date,
            '{url}' => (Tools::getShopDomainSsl(true) . __PS_BASE_URI__ . 'index.php?fc=module&module=msthemeconfig&controller=offer&offer_code=' . rawurlencode($offer->code) . '&email=' . rawurlencode($offer->email) . '&access_code=' . rawurlencode($offer->access_code)),
        ];

        if (Mail::send((int) ConfigurationCore::get('PS_LANG_DEFAULT', null, (int) Shop::getContextShopGroupID(), (int) Shop::getContextShopID()), $template, $subject, $vars, $offer->email, $offer->name, null, null, null, null, $template_path, false, null, $bcc)) {
            $this->addFlash('success', 'Offerte ' . $offer->code . ' is verstuurd naar ' . $offer->email);
        } else {
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
    public function createAction(
        Request $request,
        #[Autowire(service: 'modernesmid.form.identifiable_object.builder.offer_integrations_form_builder')]
        FormBuilderInterface $offerFormBuilder,
        #[Autowire(service: 'modernesmid.form.identifiable_object.handler.offer_integrations_form_handler')]
        FormHandlerInterface $offerFormHandler,
        #[Autowire(service: 'twig')]
        \Twig\Environment $twig,
        #[Autowire(service: 'security.csrf.token_manager')]
        CsrfTokenManagerInterface $csrfTokenManager,
        #[Autowire(service: 'PrestaShopBundle\Security\Admin\UserTokenManager')]
        UserTokenManager $userTokenManager
    ): Response {
        $offerFormOptions = [
        ];

        try {
            $offerForm = $offerFormBuilder->getForm([], [], $offerFormOptions);
        } catch (\Exception $exception) {
            $this->addFlash(
                'error',
                $this->getErrorMessageForException($exception, [$exception->getMessage()])
            );

            return $this->redirectToRoute('offerintegration_index');
        }

        try {
            $offerForm->handleRequest($request);

            $result = $offerFormHandler->handleFor((int) $request->get('new-offer-id'), $offerForm);
            if ($result->isSubmitted() && $result->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', [], 'Admin.Notifications.Success'));

                return $this->redirectToRoute('offerintegration_index');
            }
        } catch (PrestaShopException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, (array) $e->getMessage()));

            return $this->redirectToRoute('offerintegration_index');
        }


        $token = $request->query->get('_token', $userTokenManager->getSymfonyToken());

        $adminSelect2DataLink = $this->generateUrl('offerintegration_ajax_select2_products_data', ['_token' => $token]);
        $putLink = $this->generateUrl('offerintegration_ajax_put_offer_row', ['_token' => $token]);
        $priceLink = $this->generateUrl('offerintegration_ajax_price_data', ['_token' => $token]);
        $deleteLinkBase = $this->generateUrl('offerintegration_ajax_delete_offer_row', ['offer_id' => 0, '_token' => $token]);
        $deleteLinkBase = str_replace('/0/', '/TOKEN_ID/', $deleteLinkBase);

        $context = Context::getContext();

        return new Response($twig->render(
            '@Modules/msthemeconfig/views/templates/admin/create_offer_integration.html.twig',
            [
                'offerForm' => $offerForm->createView(),
                'offerRows' => [],
                'offerId' => null,
                'getPriceLink' => $priceLink,
                'putLink' => $putLink,
                'deleteLinkBase' => $deleteLinkBase,
                'shop_name' => $context->shop->name,
                'employee' => substr(strtoupper($context->employee->firstname), 0, 2),
                'adminSelect2DataLink' => $adminSelect2DataLink,
                'csrf_token' => $csrfTokenManager->getToken('offer_row')->getValue(),
                'userTokenManager' => $userTokenManager,
            ]
        ));
    }

    /**
     * Delete Offer
     *
     * @param int $offer_id
     *
     * @return Response
     */
    public function deleteAction(
        $offer_id,
        #[Autowire(service: 'modernesmid.repository.offer_integrations_repository')]
        $repository,
        #[Autowire(service: 'doctrine.orm.entity_manager')]
        EntityManagerInterface $em
    ) {
        try {
            $price_modification = $repository->findOneById($offer_id);
        } catch (EntityNotFoundException $e) {
            $price_modification = null;
        }

        if (null !== $price_modification) {
            $em->remove($price_modification);
            $em->flush();

            $this->addFlash(
                'success',
                $this->trans('Successful deletion.', [], 'Admin.Notifications.Success')
            );
        } else {
            $this->addFlash(
                'error',
                $this->trans(
                    'Cannot find offer %offer_id%',
                    ['%offer_id%' => $offer_id],
                    'Modules.Pricemodifier.Admin'
                )
            );
        }

        return $this->redirectToRoute('offerintegration_index');
    }

    /**
     * Delete bulk price_modifications
     *
     * @param Request $request
     *
     * @return Response
     */
    public function deleteBulkAction(
        Request $request,
        #[Autowire(service: 'modernesmid.repository.offer_integrations_repository')]
        $repository,
        #[Autowire(service: 'doctrine.orm.entity_manager')]
        EntityManagerInterface $em
    ) {
        $offer_ids = $request->request->get('oi_offer_bulk');
        try {
            $offer_integrations = $repository->findByIds($offer_ids);
        } catch (EntityNotFoundException $e) {
            $offer_integrations = null;
        }
        if (!empty($offer_integrations)) {
            foreach ($offer_integrations as $offer_integration) {
                $em->remove($offer_integration);
            }
            $em->flush();

            $this->addFlash(
                'success',
                $this->trans('The selection has been successfully deleted.', [], 'Admin.Notifications.Success')
            );
        }

        return $this->redirectToRoute('offerintegration_index');
    }

    /**
     * @param $offer_id
     * @param Request $request
     *
     * @return RedirectResponse|Response
     */
    public function editAction(
        $offer_id,
        Request $request,
        #[Autowire(service: 'modernesmid.form.identifiable_object.builder.offer_integrations_form_builder')]
        FormBuilderInterface $offerFormBuilder,
        #[Autowire(service: 'modernesmid.form.identifiable_object.handler.offer_integrations_form_handler')]
        FormHandlerInterface $offerFormHandler,
        #[Autowire(service: 'twig')]
        \Twig\Environment $twig,
        #[Autowire(service: 'security.csrf.token_manager')]
        CsrfTokenManagerInterface $csrfTokenManager,
        #[Autowire(service: 'PrestaShopBundle\Security\Admin\UserTokenManager')]
        UserTokenManager $userTokenManager
    ): RedirectResponse|Response {
        $offerFormOptions = [
        ];

        try {
            $offerForm = $offerFormBuilder->getFormFor((int) $offer_id, [], $offerFormOptions);
        } catch (\Exception $exception) {
            $this->addFlash(
                'error',
                $this->getErrorMessageForException($exception, (array) $exception->getMessage())
            );

            return $this->redirectToRoute('offerintegration_index');
        }

        try {
            $offerForm->handleRequest($request);

            $result = $offerFormHandler->handleFor((int) $offer_id, $offerForm);
            if ($result->isSubmitted() && $result->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', [], 'Admin.Notifications.Success'));

                return $this->redirectToRoute('offerintegration_index');
            }
        } catch (PrestaShopException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, (array) $e->getMessage()));

            return $this->redirectToRoute('offerintegration_index');
        }
        $token = $request->query->get('_token', $userTokenManager->getSymfonyToken());

        $offerRows = Product::getOfferRows($offer_id);
        $adminSelect2DataLink = $this->generateUrl('offerintegration_ajax_select2_products_data', ['_token' => $token]);
        $putLink = $this->generateUrl('offerintegration_ajax_put_offer_row', ['_token' => $token]);
        $priceLink = $this->generateUrl('offerintegration_ajax_price_data', ['_token' => $token]);
        $deleteLinkBase = $this->generateUrl('offerintegration_ajax_delete_offer_row', ['offer_id' => 0, '_token' => $token]);
        $deleteLinkBase = str_replace('/0/', '/TOKEN_ID/', $deleteLinkBase);

        $context = Context::getContext();

        return new Response($twig->render(
            '@Modules/msthemeconfig/views/templates/admin/create_offer_integration.html.twig',
            [
                'offerForm' => $offerForm->createView(),
                'offerRows' => $offerRows,
                'offerId' => $offer_id,
                'putLink' => $putLink,
                'getPriceLink' => $priceLink,
                'deleteLinkBase' => $deleteLinkBase,
                'shop_name' => $context->shop->name,
                'employee' => substr(strtoupper($context->employee->firstname), 0, 2),
                'adminSelect2DataLink' => $adminSelect2DataLink,
                'csrf_token' => $csrfTokenManager->getToken('offer_row')->getValue(),
                'userTokenManager' => $userTokenManager,
            ]
        ));
    }

    /**
     * @return array
     */
    private function getToolbarButtons(): array
    {
        $toolbarButtons = [];

        $desc = $this->trans('Maak nieuwe offerte', [], 'Modules.MsThemeConfig.Admin');

        $toolbarButtons['new_offer'] = [
            'desc' => $desc,
            'href' => $this->generateUrl('offerintegration_create'),
        ];

        return $toolbarButtons;
    }
}
