<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Entity\Address;
use PrestaShop\PrestaShop\Adapter\Entity\Customer;
use PrestaShop\PrestaShop\Core\Domain\Customer\Exception\CustomerNotFoundException;
use PrestaShop\PrestaShop\Core\Domain\Customer\Query\GetCustomerForViewing;
use PrestaShop\PrestaShop\Core\Domain\Customer\QueryResult\ViewableCustomer;
use PrestaShop\PrestaShop\Core\Domain\Customer\ValueObject\Password;
use PrestaShop\PrestaShop\Core\Domain\Order\Exception\OrderException;
use PrestaShop\PrestaShop\Core\Domain\Order\Query\GetOrderForViewing;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderForViewing;
use PrestaShop\PrestaShop\Core\Domain\ValueObject\QuerySorting;
use PrestaShop\PrestaShop\Core\Order\OrderSiblingProviderInterface;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerAddressFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\CustomerDiscountFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\OrderFilters;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Controller\Admin\Sell\Order\ActionsBarButtonsCollection;
use PrestaShopBundle\Form\Admin\Sell\Customer\PrivateNoteType;
use PrestaShopBundle\Form\Admin\Sell\Customer\TransferGuestAccountType;
use PrestaShopBundle\Form\Admin\Sell\Order\AddOrderCartRuleType;
use PrestaShopBundle\Form\Admin\Sell\Order\AddProductRowType;
use PrestaShopBundle\Form\Admin\Sell\Order\ChangeOrderAddressType;
use PrestaShopBundle\Form\Admin\Sell\Order\ChangeOrderCurrencyType;
use PrestaShopBundle\Form\Admin\Sell\Order\ChangeOrdersStatusType;
use PrestaShopBundle\Form\Admin\Sell\Order\EditProductRowType;
use PrestaShopBundle\Form\Admin\Sell\Order\OrderMessageType;
use PrestaShopBundle\Form\Admin\Sell\Order\OrderPaymentType;
use PrestaShopBundle\Form\Admin\Sell\Order\UpdateOrderShippingType;
use PrestaShopBundle\Form\Admin\Sell\Order\UpdateOrderStatusType;
use PrestaShopBundle\Security\Annotation\AdminSecurity;
use PrestaShopBundle\Security\Annotation\DemoRestricted;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Class DmsAdminCustomerController.
 * @package MsThemeConfig\Controller\Admin
 */
class DmsAdminCustomerController extends FrameworkBundleAdminController
{
    /**
     * Show customer create form & handle processing of it.
     *
     * @AdminSecurity("is_granted(['create'], request.get('_legacy_controller'))")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function createAction(Request $request)
    {
        if (!$this->get('prestashop.adapter.shop.context')->isSingleShopContext()) {
            return $this->redirectToRoute('admin_customers_index');
        }

        $this->addGroupSelectionToRequest($request);

        $customerForm = $this->get('prestashop.core.form.identifiable_object.builder.customer_form_builder')->getForm();
        $customerForm->handleRequest($request);

        $customerFormHandler = $this->get('prestashop.core.form.identifiable_object.handler.customer_form_handler');

        try {
            $result = $customerFormHandler->handle($customerForm);

            if ($customerId = $result->getIdentifiableObjectId()) {
                $this->addFlash('success', $this->trans('Successful creation.', 'Admin.Notifications.Success'));

                if ($request->query->has('submitFormAjax')) {
                    /** @var ViewableCustomer $customerInformation */
                    $customerInformation = $this->getQueryBus()->handle(new GetCustomerForViewing((int) $customerId));

                    return $this->render('@PrestaShop/Admin/Sell/Customer/modal_create_success.html.twig', [
                        'customerId' => $customerId,
                        'customerEmail' => $customerInformation->getPersonalInformation()->getEmail(),
                    ]);
                }

                return $this->redirectToRoute('admin_customers_index');
            }
        } catch (Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages($e)));
        }

        return $this->render('@PrestaShop/Admin/Sell/Customer/create.html.twig', [
            'customerForm' => $customerForm->createView(),
            'isB2bFeatureActive' => $this->get('prestashop.core.b2b.b2b_feature')->isActive(),
            'minPasswordLength' => Password::MIN_LENGTH,
            'displayInIframe' => $request->query->has('submitFormAjax'),
            'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
        ]);
    }

    /**
     * Show customer edit form & handle processing of it.
     *
     * @AdminSecurity("is_granted(['update'], request.get('_legacy_controller'))")
     *
     * @param int $customerId
     * @param Request $request
     *
     * @return Response
     */
    public function editAction($customerId, Request $request)
    {

        $this->addGroupSelectionToRequest($request);
        /** @var ViewableCustomer $customerInformation */

        $customerInformation = $this->getQueryBus()->handle(new GetCustomerForViewing((int) $customerId));
        $customerFormOptions = [
            'is_password_required' => false,
        ];

        try {
            $customerForm = $this->get('prestashop.core.form.identifiable_object.builder.customer_form_builder')
                ->getFormFor((int) $customerId, [], $customerFormOptions);
        } catch (Exception $exception) {
            $this->addFlash(
                'error',
                $this->getErrorMessageForException($exception, $this->getErrorMessages($exception))
            );

            return $this->redirectToRoute('admin_customers_index');
        }




        try {
            $customerForm->handleRequest($request);
            $customerFormHandler = $this->get('prestashop.core.form.identifiable_object.handler.customer_form_handler');
            $result = $customerFormHandler->handleFor((int) $customerId, $customerForm);
            if ($result->isSubmitted() && $result->isValid()) {
                $this->addFlash('success', $this->trans('Successful update.', 'Admin.Notifications.Success'));

                return $this->redirectToRoute('admin_customers_index');
            }
        } catch (Exception $e) {
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
            'isB2bFeatureActive' => $this->get('prestashop.core.b2b.b2b_feature')->isActive(),
            'minPasswordLength' => Password::MIN_LENGTH,
            'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
        ]);
    }

    /**
     * View customer information.
     *
     * @AdminSecurity("is_granted('read', request.get('_legacy_controller'))", redirectRoute="admin_customers_index")
     * @DemoRestricted(redirectRoute="admin_customers_index")
     *
     * @param int $customerId
     * @param Request $request
     *
     * @return Response
     */
    public function viewAction($customerId, Request $request)
    {
        $this->addGroupSelectionToRequest($request);

        try {
            /** @var ViewableCustomer $customerInformation **/
            $customerInformation = $this->getQueryBus()->handle(new GetCustomerForViewing((int) $customerId));
        }  catch (CustomerNotFoundException $e) {
            $this->addFlash(
                'error',
                $this->trans('This customer does not exist.', 'Admin.Orderscustomers.Notification')
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

        $customerDiscountGridFactory = $this->get('prestashop.core.grid.factory.customer.discount');
        $customerDiscountFilters = new CustomerDiscountFilters([
            'filters' => [
                'id_customer' => $customerId,
            ],
        ]);
        $customerDiscountGrid = $customerDiscountGridFactory->getGrid($customerDiscountFilters);

        $customerAddressGridFactory = $this->get('prestashop.core.grid.factory.customer.address');

        $customerAddressFilters = new CustomerAddressFilters([
            'filters' => [
                'id_customer' => $customerId,
            ],
        ]);
        $customerAddressGrid = $customerAddressGridFactory->getGrid($customerAddressFilters);

        if ($request->query->has('conf')) {
            $this->manageLegacyFlashes($request->query->get('conf'));
        }

        $customer = new Customer($customerId);
        $customerInformation->informer_identification = $customer->informer_identification;

        $customerInformerData = [];
        $customerInformerData['token'] = Tools::getAdminTokenLite('AdminModules');
        $customerInformerData['address'] = new Address(Address::getFirstCustomerAddressId((int)$customerId));

        return $this->render('@PrestaShop/Admin/Sell/Customer/view.html.twig', [
            'enableSidebar' => true,
            'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
            'customerInformation' => $customerInformation,
            'customerInformerData' => $customerInformerData,
            'customerDiscountGrid' => $this->presentGrid($customerDiscountGrid),
            'customerAddressGrid' => $this->presentGrid($customerAddressGrid),
            'isMultistoreEnabled' => $this->get('prestashop.adapter.feature.multistore')->isActive(),
            'transferGuestAccountForm' => $transferGuestAccountForm,
            'privateNoteForm' => $privateNoteForm->createView(),
        ]);
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

        if (!$request->request->has('customer')
            || isset($request->request->get('customer')['group_ids'])
        ) {
            return;
        }

        $customerData = $request->request->get('customer');
        $customerData['group_ids'] = [];

        $request->request->set('customer', $customerData);
    }
}
