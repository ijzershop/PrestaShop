<?php

declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use MsThemeConfig\Core\Domain\Customer\Query\GetCustomerForEditing;
use MsThemeConfig\Core\Domain\Customer\QueryResult\EditableCustomer;
use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\Entity\Customer;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Shop\Context;
use PrestaShop\PrestaShop\Core\B2b\B2bFeature;
use PrestaShop\PrestaShop\Core\CommandBus\CommandBusInterface;
use PrestaShop\PrestaShop\Core\Domain\Customer\Exception\CustomerNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Customer\Query\GetCustomerForViewing;
use PrestaShop\PrestaShop\Core\Domain\Customer\QueryResult\ViewableCustomer;
use PrestaShop\PrestaShop\Core\Domain\Customer\ValueObject\Password;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\Builder\FormBuilderInterface;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\Handler\FormHandlerInterface;
use PrestaShop\PrestaShop\Core\Grid\GridFactoryInterface;
use PrestaShop\PrestaShop\Core\Group\Provider\DefaultGroupsProviderInterface;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerAddressFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerBoughtProductFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerCartFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerDiscountFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerOrderFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerViewedProductFilters;
use PrestaShop\PrestaShop\Adapter\Feature\MultistoreFeature;
use PrestaShopBundle\Controller\Admin\PrestaShopAdminController;
use PrestaShopBundle\Form\Admin\Sell\Customer\PrivateNoteType;
use PrestaShopBundle\Form\Admin\Sell\Customer\TransferGuestAccountType;
use PrestaShopBundle\Security\Attribute\AdminSecurity;
use PrestaShopBundle\Security\Attribute\DemoRestricted;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DmsAdminCustomerController.
 */
class DmsAdminCustomerController extends PrestaShopAdminController
{
    /**
     * Show customer create form & handle processing of it.
     *
     * @param Request $request
     *
     * @return Response
     */
    #[AdminSecurity("is_granted('create', request.get('_legacy_controller'))")]
    public function createAction(
        Request $request,
        #[Autowire(service: 'prestashop.adapter.shop.context')]
        Context $shopContext,
        #[Autowire(service: 'modernesmid.core.form.identifiable_object.builder.customer_form_builder')]
        FormBuilderInterface $customerFormBuilder,
        #[Autowire(service: 'modernesmid.core.form.identifiable_object.handler.customer_form_handler')]
        FormHandlerInterface $customerFormHandler,
        #[Autowire(service: 'prestashop.core.b2b.b2b_feature')]
        B2bFeature $b2bFeature,
        #[Autowire(service: 'prestashop.core.command_bus')]
        CommandBusInterface $commandBus,
        #[Autowire(service: 'prestashop.adapter.group.provider.default_groups_provider')]
        DefaultGroupsProviderInterface $defaultGroupsProvider
    ): Response {
        if (!$shopContext->isSingleShopContext()) {
            return $this->redirectToRoute('admin_customers_index');
        }

        $this->addGroupSelectionToRequest($request);

        $customerForm = $customerFormBuilder->getForm([], [
            'show_guest_field' => (bool) $this->getConfiguration()->get('PS_GUEST_CHECKOUT_ENABLED'),
        ]);
        $customerForm->handleRequest($request);

        try {
            $result = $customerFormHandler->handle($customerForm);

            if ($customerId = $result->getIdentifiableObjectId()) {
                $this->addFlash('success', $this->trans('Successful creation.', [], 'Admin.Notifications.Success'));

                if ($request->query->has('submitFormAjax')) {
                    /** @var ViewableCustomer $customerInformation */
                    $customerInformation = $commandBus->handle(new GetCustomerForViewing((int) $customerId));

                    return $this->render('@PrestaShop/Admin/Sell/Customer/modal_create_success.html.twig', [
                        'customerId' => $customerId,
                        'customerEmail' => $customerInformation->getPersonalInformation()->getEmail(),
                    ]);
                }

                return $this->redirectToRoute('admin_customers_index');
            }
        } catch (\Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages($e)));
        }

        $defaultGroups = $defaultGroupsProvider->getGroups();

        return $this->render('@PrestaShop/Admin/Sell/Customer/create.html.twig', [
            'customerForm' => $customerForm->createView(),
            'isB2bFeatureActive' => $b2bFeature->isActive(),
            'minPasswordLength' => Password::MIN_LENGTH,
            'displayInIframe' => $request->query->has('submitFormAjax'),
            'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
            'defaultGroups' => [
                $defaultGroups->getVisitorsGroup()->getId(),
                $defaultGroups->getGuestsGroup()->getId(),
                $defaultGroups->getCustomersGroup()->getId(),
            ],
            'customerGroupId' => $defaultGroups->getCustomersGroup()->getId(),
            'guestGroupId' => $defaultGroups->getGuestsGroup()->getId(),
        ]);
    }

    /**
     * Show customer edit form & handle processing of it.
     *
     * @param int $customerId
     * @param Request $request
     *
     * @return Response
     */
    #[AdminSecurity("is_granted('update', request.get('_legacy_controller'))")]
    public function editAction(
        int $customerId,
        Request $request,
        #[Autowire(service: 'modernesmid.core.form.identifiable_object.builder.customer_form_builder')]
        FormBuilderInterface $customerFormBuilder,
        #[Autowire(service: 'modernesmid.core.form.identifiable_object.handler.customer_form_handler')]
        FormHandlerInterface $customerFormHandler,
        #[Autowire(service: 'prestashop.core.b2b.b2b_feature')]
        B2bFeature $b2bFeature,
        #[Autowire(service: 'prestashop.core.command_bus')]
        CommandBusInterface $commandBus
    ) {
        $this->addGroupSelectionToRequest($request);
        /** @var EditableCustomer $customerInformation */
        $customerInformation = $commandBus->handle(new GetCustomerForEditing((int) $customerId));
        $customerFormOptions = [
            'is_password_required' => false,
        ];

        try {
            $customerForm = $customerFormBuilder->getFormFor((int) $customerId, [], $customerFormOptions);
        } catch (\Exception $exception) {
            $this->addFlash(
                'error',
                $this->getErrorMessageForException($exception, $this->getErrorMessages($exception))
            );

            return $this->redirectToRoute('admin_customers_index');
        }

        try {
            $customerForm->handleRequest($request);
            $result = $customerFormHandler->handleFor((int) $customerId, $customerForm);
            //            dd('saving', $customerForm);
            if ($result->isSubmitted() && $result->isValid()) {
                $this->addFlash('success', $this->trans('Successful update', [], 'Admin.Notifications.Success'));

                return $this->redirectToRoute('admin_customers_index');
            }
        } catch (\Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages($e)));
            if ($e instanceof CustomerNotFoundException) {
                return $this->redirectToRoute('admin_customers_index');
            }
        }

        $customer = new Customer($customerId);
        $customerInformation->informer_identification = $customer->informer_identification;

        return $this->render('@PrestaShop/Admin/Sell/Customer/edit.html.twig', [
            'customerForm' => $customerForm->createView(),
            'customerInformation' => $customerInformation,
            'isB2bFeatureActive' => $b2bFeature->isActive(),
            'minPasswordLength' => Password::MIN_LENGTH,
            'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
        ]);
    }

    /**
     * View customer information.
     *
     *
     *
     * @param int $customerId
     * @param Request $request
     *
     * @return Response
     */
    #[DemoRestricted(redirectRoute: 'admin_customers_index')]
    #[AdminSecurity("is_granted('read', request.get('_legacy_controller'))", redirectRoute: 'admin_customers_index')]
    public function viewAction(
        int $customerId,
        Request $request,
        #[Autowire(service: 'prestashop.core.grid.factory.customer.discount')]
        GridFactoryInterface $customerDiscountGridFactory,
        #[Autowire(service: 'prestashop.core.grid.factory.customer.address')]
        GridFactoryInterface $customerAddressGridFactory,
        #[Autowire(service: 'prestashop.core.grid.factory.customer.order')]
        GridFactoryInterface $customerOrderGridFactory,
        #[Autowire(service: 'prestashop.core.grid.factory.customer.cart')]
        GridFactoryInterface $customerCartGridFactory,
        #[Autowire(service: 'prestashop.core.grid.factory.customer.bought_product')]
        GridFactoryInterface $customerBoughtProductGridFactory,
        #[Autowire(service: 'prestashop.core.grid.factory.customer.viewed_product')]
        GridFactoryInterface $customerViewedProductGridFactory,
        CustomerOrderFilters $customerOrderFilters,
        CustomerCartFilters $customerCartFilters,
        CustomerBoughtProductFilters $customerBoughtProductFilters,
        CustomerViewedProductFilters $customerViewedProductFilters,
        #[Autowire(service: 'prestashop.adapter.feature.multistore')]
        MultistoreFeature $multistoreFeature,
        #[Autowire(service: 'prestashop.core.command_bus')]
        CommandBusInterface $commandBus
    ): Response {
        $this->addGroupSelectionToRequest($request);

        try {
            /** @var ViewableCustomer $customerInformation * */
            $customerInformation = $commandBus->handle(new GetCustomerForViewing((int) $customerId));
        } catch (CustomerNotFoundException $e) {
            $this->addFlash(
                'error',
                $this->trans('This customer does not exist.', [], 'Admin.Orderscustomers.Notification')
            );

            return $this->redirectToRoute('admin_customers_index');
        }

        $transferGuestAccountForm = null;
        if ($customerInformation->getPersonalInformation()->isGuest()) {
            $transferGuestAccountForm = $this->createForm(TransferGuestAccountType::class, [
                'id_customer' => $customerId,
            ])->createView();
        }

        $privateNoteForm = $this->createForm(PrivateNoteType::class, [
            'note' => $customerInformation->getGeneralInformation()->getPrivateNote(),
        ]);

        $customerDiscountFilters = new CustomerDiscountFilters([
            'filters' => [
                'id_customer' => $customerId,
            ],
        ]);
        $customerDiscountGrid = $customerDiscountGridFactory->getGrid($customerDiscountFilters);

        $customerAddressFilters = new CustomerAddressFilters([
            'filters' => [
                'id_customer' => $customerId,
            ],
        ]);
        $customerAddressGrid = $customerAddressGridFactory->getGrid($customerAddressFilters);

        $customerOrderFilters->addFilter(['id_customer' => $customerId]);
        $customerOrderGrid = $customerOrderGridFactory->getGrid($customerOrderFilters);

        $customerCartFilters->addFilter(['id_customer' => $customerId]);
        $customerCartGrid = $customerCartGridFactory->getGrid($customerCartFilters);

        $customerBoughtProductFilters->addFilter(['id_customer' => $customerId]);
        $customerBoughtProductGrid = $customerBoughtProductGridFactory->getGrid($customerBoughtProductFilters);

        $customerViewedProductFilters->addFilter(['id_customer' => $customerId]);
        $customerViewedProductGrid = $customerViewedProductGridFactory->getGrid($customerViewedProductFilters);

        if ($request->query->has('conf')) {
            $this->manageLegacyFlashes($request->query->get('conf'));
        }

        $customer = new Customer($customerId);
        $customerInformation->informer_identification = $customer->informer_identification;

        $customerInformerData = [];
        $customerInformerData['token'] = Tools::getAdminTokenLite('AdminModules');
        $customerInformerData['address'] = new Address(Address::getFirstCustomerAddressId((int) $customerId));

        return $this->render('@PrestaShop/Admin/Sell/Customer/view.html.twig', [
            'enableSidebar' => true,
            'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
            'customerInformation' => $customerInformation,
            'customerInformerData' => $customerInformerData,
            'customerDiscountGrid' => $this->presentGrid($customerDiscountGrid),
            'customerAddressGrid' => $this->presentGrid($customerAddressGrid),
            'customerOrderGrid' => $this->presentGrid($customerOrderGrid),
            'customerCartGrid' => $this->presentGrid($customerCartGrid),
            'customerBoughtProductGrid' => $this->presentGrid($customerBoughtProductGrid),
            'customerViewedProductGrid' => $this->presentGrid($customerViewedProductGrid),
            'isMultistoreEnabled' => $multistoreFeature->isActive(),
            'transferGuestAccountForm' => $transferGuestAccountForm,
            'privateNoteForm' => $privateNoteForm->createView(),
        ]);
    }

    private function manageLegacyFlashes($messageId): void
    {
        $messages = [
            1 => $this->trans('Successful deletion', [], 'Admin.Notifications.Success'),
            4 => $this->trans('Update successful.', [], 'Admin.Notifications.Success'),
        ];

        if (isset($messages[$messageId])) {
            $this->addFlash('success', $messages[$messageId]);
        }
    }

    /**
     * If customer form is submitted and groups are not selected
     * we add empty groups to request
     *
     * @param Request $request
     */
    private function addGroupSelectionToRequest(Request $request)
    {
        if (!$request->isMethod(Request::METHOD_POST)) {
            return;
        }

        if (!$request->request->has('customer')) {
            return;
        }

        $customerData = $request->request->all('customer');
        if (isset($customerData['group_ids'])) {
            return;
        }

        $customerData['group_ids'] = [];

        $request->request->set('customer', $customerData);
    }

    /**
     * @param Exception $e
     * @return array
     */
    private function getErrorMessages(\Exception $e): array
    {
        return [$e->getMessage()] ?? ['An error occurred.'];
    }
}
