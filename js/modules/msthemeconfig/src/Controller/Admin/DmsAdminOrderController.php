<?php

declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use CartRule;
use Exception;
use OrderCartRule;
use PrestaShop\PrestaShop\Adapter\Currency\CurrencyDataProvider;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Product\PriceFormatter;
use PrestaShop\PrestaShop\Core\Action\ActionsBarButtonsCollection;
use PrestaShop\PrestaShop\Core\CommandBus\CommandBusInterface;
use PrestaShop\PrestaShop\Core\Context\LanguageContext;
use PrestaShop\PrestaShop\Core\Domain\Order\Exception\OrderException;
use PrestaShop\PrestaShop\Core\Domain\Order\OrderConstraints;
use PrestaShop\PrestaShop\Core\Domain\Order\Query\GetOrderForViewing;
use PrestaShop\PrestaShop\Core\Domain\Order\Query\GetOrderPreview;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderForViewing;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderPreview;
use PrestaShop\PrestaShop\Core\Domain\Shipment\Query\GetOrderShipments;
use PrestaShop\PrestaShop\Core\Domain\Shipment\QueryResult\OrderShipment;
use PrestaShop\PrestaShop\Core\Domain\ValueObject\QuerySorting;
use PrestaShop\PrestaShop\Core\FeatureFlag\FeatureFlagSettings;
use PrestaShop\PrestaShop\Core\FeatureFlag\FeatureFlagStateCheckerInterface;
use PrestaShop\PrestaShop\Core\Form\IdentifiableObject\Builder\FormBuilderInterface;
use PrestaShop\PrestaShop\Core\Grid\GridFactoryInterface;
use PrestaShop\PrestaShop\Core\Kpi\Exception\InvalidArgumentException;
use PrestaShop\PrestaShop\Core\Kpi\Row\KpiRowFactoryInterface;
use PrestaShop\PrestaShop\Core\Order\OrderSiblingProviderInterface;
use PrestaShop\PrestaShop\Core\Search\Filters\OrderFilters;
use PrestaShop\PrestaShop\Core\Search\Filters\ShipmentFilters;
use PrestaShop\PrestaShop\Core\Domain\Order\Command\UpdateOrderShippingDetailsCommand;
use PrestaShop\PrestaShop\Core\Domain\Order\Exception\TransistEmailSendingException;
use PrestaShopBundle\Controller\Admin\PrestaShopAdminController;
use PrestaShopBundle\Form\Admin\Sell\Customer\PrivateNoteType;
use PrestaShopBundle\Form\Admin\Sell\Order\AddOrderCartRuleType;
use PrestaShopBundle\Form\Admin\Sell\Order\AddProductRowType;
use PrestaShopBundle\Form\Admin\Sell\Order\ChangeOrderAddressType;
use PrestaShopBundle\Form\Admin\Sell\Order\ChangeOrderCurrencyType;
use PrestaShopBundle\Form\Admin\Sell\Order\ChangeOrdersStatusType;
use PrestaShopBundle\Form\Admin\Sell\Order\EditProductRowType;
use PrestaShopBundle\Form\Admin\Sell\Order\InternalNoteType;
use PrestaShopBundle\Form\Admin\Sell\Order\OrderMessageType;
use PrestaShopBundle\Form\Admin\Sell\Order\OrderPaymentType;
use PrestaShopBundle\Form\Admin\Sell\Order\UpdateOrderShippingType;
use PrestaShopBundle\Form\Admin\Sell\Order\UpdateOrderStatusType;
use PrestaShopBundle\Security\Attribute\AdminSecurity;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DmsAdminOrderController.
 */
class DmsAdminOrderController extends PrestaShopAdminController
{
    /**
     * Default number of products per page (in case invalid value is used)
     */
    public const DEFAULT_PRODUCTS_NUMBER = 8;

    /**
     * Options used for the number of products per page
     */
    public const PRODUCTS_PAGINATION_OPTIONS = [8, 20, 50, 100];

    /**
     * @param Request $request
     * @param OrderFilters $filters
     * @param KpiRowFactoryInterface $orderKpiFactory
     * @param GridFactoryInterface $orderGridFactory
     *
     * @return Response
     *
     * @throws InvalidArgumentException
     */
    #[AdminSecurity("is_granted('read', request.get('_legacy_controller'))")]
    public function indexAction(
        Request $request,
        OrderFilters $filters,
        #[Autowire(service: 'prestashop.core.kpi_row.factory.orders')]
        KpiRowFactoryInterface $orderKpiFactory,
        #[Autowire(service: 'prestashop.core.grid.factory.order')]
        GridFactoryInterface $orderGridFactory,
        LanguageContext $languageContext
    ): Response {
        $orderGrid = $orderGridFactory->getGrid($filters);
        $changeOrderStatusesForm = $this->createForm(ChangeOrdersStatusType::class);

        /**
         * start change order overview based on employee type login.
         */
        $orderPickEmployee = Context::getContext()->cookie->profile;
        $loggedInEmployee = Context::getContext()->cookie->id_employee;
        $isOrderPicker = false;
        $extraStyling = '#order_grid_table .column-filters td:nth-of-type(2),' .
         '#order_grid_table .column-filters td:first-child div.md-checkbox,' .
         '#order_grid_table .column-filters td:nth-of-type(15){display:none;} ' .
         '#order_grid_table tr.column-headers th:nth-of-type(2),' .
         '#order_grid_table tr.column-headers th:nth-of-type(15){display: none;}' .
         '#order_grid_table td.column-id_order,' .
         '#order_grid_table td.column-dp_customized,' .
         '#order_grid_table td.column-orders_bulk,' .
         '#order_grid_table td.column-company{display:none;}';

        $workshopProfiles = Configuration::get('MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES', null, null, 1, '5,6,7');

        if (!empty($workshopProfiles)) {
            $profiles = explode(',', $workshopProfiles);

            if (in_array($orderPickEmployee, $profiles)) {
                $isOrderPicker = true;
                $extraStyling .= '#content{margin-right:50px;}';
                $extraStyling .= '.table-responsive-row{overflow:auto;}';
                $extraStyling .= '.column-osname .dropdown-toggle{padding:15px 18px!important;pointer-events:none;}';
                $extraStyling .= '.column-actions .btn-group-action{display:none;}';
                $extraStyling .= '.orders-kpi{display:none;}';
                $extraStyling .= '.header-toolbar.d-print-none{display:none;}';
            }
        }
        /*
         * end change order overview based on employee type login.
         */

        return $this->render(
            '@Modules/msthemeconfig/views/templates/admin/index.html.twig',
            [
                'isOrderPicker' => $isOrderPicker, // Added value for check if loggedInUser is orderpicker
                'idProfile' => $loggedInEmployee, // Added value for profile is usage in ajax and other classes outside the symfony data objects
                'extraStyling' => $extraStyling, // Added value for adding extra css rules
                'orderGrid' => $this->presentGrid($orderGrid),
                'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
                'enableSidebar' => true,
                'changeOrderStatusesForm' => $changeOrderStatusesForm->createView(),
                'kpiRow' => $orderKpiFactory->build(),
                'layoutHeaderToolbarBtn' => $this->getOrderToolbarButtons(),
            ]
        );
    }

    /**
     * @return array
     */
    private function getOrderToolbarButtons(): array
    {
        $toolbarButtons = [];

        $shopContext = $this->getShopContext();
        $isSingleShopContext = $shopContext->isSingleShopContext();

        $toolbarButtons['add'] = [
            'href' => $this->generateUrl('admin_orders_create'),
            'desc' => $this->trans('Add new order', [], 'Admin.Orderscustomers.Feature'),
            'icon' => 'add_circle_outline',
            'disabled' => !$isSingleShopContext,
        ];

        if (!$isSingleShopContext) {
            $toolbarButtons['add']['help'] = $this->trans(
                'You can use this feature in a single shop context only. Switch context to enable it.',
                [],
                'Admin.Orderscustomers.Feature'
            );
            $toolbarButtons['add']['href'] = '#';
        }

        return $toolbarButtons;
    }

    /**
     * @param int $orderId
     * @param Request $request
     *
     * @return Response
     */
    #[AdminSecurity("is_granted('read', request.get('_legacy_controller'))")]
    public function viewAction(
        int $orderId,
        Request $request,
        #[Autowire(service: 'prestashop.adapter.data_provider.currency')]
        CurrencyDataProvider $currencyDataProvider,
        #[Autowire(service: 'form.factory')]
        FormFactoryInterface $formFactory,
        #[Autowire(service: 'prestashop.core.form.identifiable_object.builder.cancel_product_form_builder')]
        FormBuilderInterface $cancelProductFormBuilder,
        #[Autowire(service: 'prestashop.adapter.order.order_sibling_provider')]
        OrderSiblingProviderInterface $orderSiblingProvider,
        #[Autowire(service: 'prestashop.core.command_bus')]
        CommandBusInterface $commandBus,
        LanguageContext $languageContext,
        #[Autowire(service: 'PrestaShop\PrestaShop\Core\FeatureFlag\FeatureFlagStateCheckerInterface')]
        FeatureFlagStateCheckerInterface $featureFlagStateChecker,
        #[Autowire(service: 'PrestaShop\PrestaShop\Core\Grid\Factory\ShipmentFactory')]
        GridFactoryInterface $shipmentGridFactory,
        ShipmentFilters $filters
    ): Response {
        try {
            /** @var OrderForViewing $orderForViewing */
            $orderForViewing = $commandBus->handle(new GetOrderForViewing($orderId, QuerySorting::DESC));
        } catch (OrderException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages($e)));

            return $this->redirectToRoute('admin_orders_index');
        }

        // Keep the resolved sorting/pagination, while always scoping shipments
        // to the viewed order rather than accepting an order ID from filters.
        $shipmentFilters = new ShipmentFilters(['filters' => ['order_id' => $orderId]] + $filters->all());
        $shipmentsGrid = $shipmentGridFactory->getGrid($shipmentFilters);

        $tools = new Tools();
        $shipmentsLabel = $this->trans(
            'Shipments ([1]%shipments_count%[/1])',
            [
                '%shipments_count%' => $shipmentsGrid->getData()->getRecords()->count(),
                '[1]' => '<span class="count">',
                '[/1]' => '</span>',
            ],
            'Admin.Shipping.Feature'
        );

        $carriersLabel = $this->trans(
            'Carriers ([1]%carriers_count%[/1])',
            [
                '%carriers_count%' => count($orderForViewing->getShipping()->getCarriers()),
                '[1]' => '<span class="count">',
                '[/1]' => '</span>',
            ],
            'Admin.Shipping.Feature'
        );
        // Show original amount for reduction voucher
        $orderCurrency = $currencyDataProvider->getCurrencyById($orderForViewing->getCurrencyId());

        $reductionAmountPrice = 0;
        $reductionAmountPriceProduct = 0;
        $priceFormatter = new PriceFormatter();

        foreach ($orderForViewing->getDiscounts()->getDiscounts() as $key => $discount) {
            $orderCartRule = new OrderCartRule($discount->getOrderCartRuleId());
            if ($orderCartRule) {
                $cartRule = new CartRule($orderCartRule->id_cart_rule);
                $orderForViewing->getDiscounts()->getDiscounts()[$key]->reduction_amount_formatted_tax_excl = $priceFormatter->format($orderCartRule->value);

                if ((float) $cartRule->reduction_amount > 0) {
                    $orderForViewing->getDiscounts()->getDiscounts()[$key]->orig_reduction_amount = (float) $cartRule->reduction_amount;
                    $orderForViewing->getDiscounts()->getDiscounts()[$key]->orig_reduction_amount_formatted = $priceFormatter->format($cartRule->reduction_amount);
                    $reductionAmountPrice += $cartRule->reduction_amount;
                } else {
                    $orderForViewing->getDiscounts()->getDiscounts()[$key]->orig_reduction_amount = (float) $orderCartRule->value;
                    $orderForViewing->getDiscounts()->getDiscounts()[$key]->orig_reduction_amount_formatted = $priceFormatter->format((float) $orderCartRule->value);
                    $reductionAmountPrice += (float) $orderCartRule->value;
                }
                $reductionAmountPriceProduct += $orderCartRule->value;
            }
        }

        $orderForViewing->getPrices()->originalReductionAmount = $reductionAmountPrice;
        $orderForViewing->getPrices()->originalReductionAmountFormatted = $priceFormatter->format($reductionAmountPrice);
        $orderForViewing->getPrices()->discountsAmountFormattedTaxExcl = $priceFormatter->format($reductionAmountPriceProduct / 1.21);
        $orderForViewing->getPrices()->discountsAmountFormattedTaxIncl = $priceFormatter->format($reductionAmountPriceProduct);
        $orderForViewing->getPrices()->remainderTotalAmount = $priceFormatter->format($reductionAmountPriceProduct - $reductionAmountPrice);

        $updateOrderStatusForm = $formFactory->createNamed(
            'update_order_status',
            UpdateOrderStatusType::class,
            [
                'new_order_status_id' => $orderForViewing->getHistory()->getCurrentOrderStatusId(),
            ]
        );

        $updateOrderStatusActionBarForm = $formFactory->createNamed(
            'update_order_status_action_bar',
            UpdateOrderStatusType::class,
            [
                'new_order_status_id' => $orderForViewing->getHistory()->getCurrentOrderStatusId(),
            ]
        );

        $addOrderCartRuleForm = $this->createForm(AddOrderCartRuleType::class, [], [
            'order_id' => $orderId,
        ]);
        $addOrderPaymentForm = $this->createForm(OrderPaymentType::class, [
            'id_currency' => $orderForViewing->getCurrencyId(),
        ], [
            'id_order' => $orderId,
        ]);

        $orderMessageForm = $this->createForm(OrderMessageType::class, [
            'lang_id' => $orderForViewing->getCustomer()->getLanguageId(),
        ], [
            'action' => $this->generateUrl('admin_orders_send_message', ['orderId' => $orderId]),
        ]);
        $orderMessageForm->handleRequest($request);

        $changeOrderCurrencyForm = $this->createForm(ChangeOrderCurrencyType::class, [], [
            'current_currency_id' => $orderForViewing->getCurrencyId(),
        ]);

        $changeOrderAddressForm = null;
        $privateNoteForm = null;

        if (null !== $orderForViewing->getCustomer() && $orderForViewing->getCustomer()->getId() !== 0) {
            $changeOrderAddressForm = $this->createForm(ChangeOrderAddressType::class, [], [
                'customer_id' => $orderForViewing->getCustomer()->getId(),
            ]);

            $privateNoteForm = $this->createForm(PrivateNoteType::class, [
                'note' => $orderForViewing->getCustomer()->getPrivateNote(),
            ]);
        }

        $orderCarrierId = 0;
        $carriers = $orderForViewing->getShipping()->getCarriers();
        if (!empty($carriers)) {
            $orderCarrierId = $carriers[0]->getOrderCarrierId();
        }

        $updateOrderShippingForm = $this->createForm(UpdateOrderShippingType::class, [
            'new_carrier_id' => $orderForViewing->getCarrierId(),
            'current_order_carrier_id' => $orderCarrierId,
        ], [
            'order_id' => $orderId,
        ]);

        $addProductRowForm = $this->createForm(AddProductRowType::class, [], [
            'order_id' => $orderId,
            'currency_id' => $orderForViewing->getCurrencyId(),
            'symbol' => $orderCurrency->symbol,
        ]);
        $editProductRowForm = $this->createForm(EditProductRowType::class, [], [
            'order_id' => $orderId,
            'symbol' => $orderCurrency->symbol,
        ]);

        $internalNoteForm = $this->createForm(InternalNoteType::class, [
            'note' => $orderForViewing->getNote(),
        ]);

        $backOfficeOrderButtons = new ActionsBarButtonsCollection();

        try {
            $this->dispatchHookWithParameters(
                'actionGetAdminOrderButtons',
                [
                    'controller' => $this,
                    'id_order' => $orderId,
                    'actions_bar_buttons_collection' => $backOfficeOrderButtons,
                ]
            );

            $cancelProductForm = $cancelProductFormBuilder->getFormFor($orderId);
        } catch (Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages($e)));

            return $this->redirectToRoute('admin_orders_index');
        }

        $this->handleOutOfStockProduct($orderForViewing);

        $merchandiseReturnEnabled = (bool) $this->getConfiguration()->get('PS_ORDER_RETURN');

        $paginationNum = (int) $this->getConfiguration()->get('PS_ORDER_PRODUCTS_NB_PER_PAGE', self::DEFAULT_PRODUCTS_NUMBER);
        $paginationNumOptions = self::PRODUCTS_PAGINATION_OPTIONS;
        if (!in_array($paginationNum, $paginationNumOptions)) {
            $paginationNumOptions[] = $paginationNum;
        }
        sort($paginationNumOptions);

        $metatitle = sprintf(
            '%s %s %s',
            $this->trans('Orders', [], 'Admin.Orderscustomers.Feature'),
            $this->getConfiguration()->get('PS_NAVIGATION_PIPE', '>'),
            $this->trans(
                'Order %reference% from %firstname% %lastname%',
                [
                    '%reference%' => $orderForViewing->getReference(),
                    '%firstname%' => $orderForViewing->getCustomer()->getFirstName(),
                    '%lastname%' => $orderForViewing->getCustomer()->getLastName(),
                ],
                'Admin.Orderscustomers.Feature'
            )
        );

        return $this->render('@Modules/msthemeconfig/views/templates/admin/view.html.twig', [
            'showContentHeader' => true,
            'enableSidebar' => true,
            'orderCurrency' => $orderCurrency,
            'meta_title' => $metatitle,
            'history' => $orderForViewing->getHistory(),
            'order' => new Order($orderForViewing->getId()),
            'searchToken' => Tools::getAdminTokenLite('MsThemeConfig'),
            'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
            'orderForViewing' => $orderForViewing,
            'addOrderCartRuleForm' => $addOrderCartRuleForm->createView(),
            'updateOrderStatusForm' => $updateOrderStatusForm->createView(),
            'updateOrderStatusActionBarForm' => $updateOrderStatusActionBarForm->createView(),
            'addOrderPaymentForm' => $addOrderPaymentForm->createView(),
            'changeOrderCurrencyForm' => $changeOrderCurrencyForm->createView(),
            'privateNoteForm' => $privateNoteForm?->createView(),
            'updateOrderShippingForm' => $updateOrderShippingForm->createView(),
            'cancelProductForm' => $cancelProductForm->createView(),
            'invoiceManagementIsEnabled' => $orderForViewing->isInvoiceManagementIsEnabled(),
            'changeOrderAddressForm' => $changeOrderAddressForm?->createView(),
            'orderMessageForm' => $orderMessageForm->createView(),
            'addProductRowForm' => $addProductRowForm->createView(),
            'editProductRowForm' => $editProductRowForm->createView(),
            'backOfficeOrderButtons' => $backOfficeOrderButtons,
            'merchandiseReturnEnabled' => $merchandiseReturnEnabled,
            'priceSpecification' => $languageContext->getPriceSpecification($orderCurrency->iso_code)->toArray(),
            'previousOrderId' => $orderSiblingProvider->getPreviousOrderId($orderId),
            'nextOrderId' => $orderSiblingProvider->getNextOrderId($orderId),
            'paginationNum' => $paginationNum,
            'paginationNumOptions' => $paginationNumOptions,
            'isAvailableQuantityDisplayed' => $this->getConfiguration()->getBoolean('PS_STOCK_MANAGEMENT'),
            'internalNoteForm' => $internalNoteForm->createView(),
            'isImprovedShipmentFeatureFlagEnabled' => $featureFlagStateChecker->isEnabled(FeatureFlagSettings::FEATURE_FLAG_IMPROVED_SHIPMENT),
            'orderHasShipment' => $this->orderHasShipment($orderForViewing->getId()),
            'shipmentsGrid' => $this->presentGrid($shipmentsGrid),
            'shipmentsLabel' => $tools->purifyHTML($shipmentsLabel),
            'carriersLabel' => $tools->purifyHTML($carriersLabel),
        ]);
    }

    private function orderHasShipment(int $orderId): bool
    {
        /** @var OrderShipment[] $shipments */
        $shipments = $this->dispatchQuery(new GetOrderShipments($orderId));

        return (bool) count($shipments) > 0;
    }

    /**
     * @param OrderForViewing $orderForViewing
     */
    private function handleOutOfStockProduct(OrderForViewing $orderForViewing)
    {
        $isStockManagementEnabled = $this->getConfiguration()->getBoolean('PS_STOCK_MANAGEMENT');
        if (!$isStockManagementEnabled || $orderForViewing->isDelivered() || $orderForViewing->isShipped()) {
            return;
        }

        foreach ($orderForViewing->getProducts()->getProducts() as $product) {
            if ($product->getAvailableQuantity() <= 0) {
                $this->addFlash(
                    'warning',
                    $this->trans('This product is out of stock:', [], 'Admin.Orderscustomers.Notification') . ' ' . $product->getName()
                );
            }
        }
    }

    /**
     * @param int $orderId
     *
     * @return JsonResponse
     */
    #[AdminSecurity("is_granted('read', request.get('_legacy_controller'))")]
    public function previewAction(
        int $orderId,
        #[Autowire(service: 'prestashop.core.command_bus')]
        CommandBusInterface $commandBus
    ): JsonResponse {
        try {
            /** @var OrderPreview $orderPreview */
            $orderPreview = $commandBus->handle(new GetOrderPreview($orderId));

            return $this->json([
                'preview' => $this->renderView('@PrestaShop/Admin/Sell/Order/Order/preview.html.twig', [
                    'orderPreview' => $orderPreview,
                    'productsPreviewLimit' => OrderConstraints::PRODUCTS_PREVIEW_LIMIT,
                    'orderId' => $orderId,
                ]),
            ]);
        } catch (Exception $e) {
            return $this->json(
                ['message' => $e->getMessage()],
                Response::HTTP_BAD_REQUEST
            );
        }
    }

    /**
     * @return \PrestaShop\PrestaShop\Core\Localization\Locale
     *
     * @deprecated since 9.0.0 use LanguageContext instead
     */
    protected function getContextLocale()
    {
        return $this->getShopContext()->getLanguageContext();
    }

    /**
     * @param int $orderId
     * @param Request $request
     *
     * @return Response
     */
    #[AdminSecurity("is_granted('update', request.get('_legacy_controller'))", redirectRoute: 'admin_orders_view', redirectQueryParamsToKeep: ['orderId'], message: 'You do not have permission to edit this.')]
    public function updateShippingAction(int $orderId, Request $request): Response
    {
        $form = $this->createForm(UpdateOrderShippingType::class, [], [
            'order_id' => $orderId,
        ]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            $currentOrderCarrierId = (int) $data['current_order_carrier_id'];
            if ($currentOrderCarrierId === 0) {
                $order = new Order($orderId);
                $currentOrderCarrierId = (int) $order->getIdOrderCarrier();
            }

            try {
                $this->dispatchCommand(
                    new UpdateOrderShippingDetailsCommand(
                        $orderId,
                        $currentOrderCarrierId,
                        (int) $data['new_carrier_id'],
                        $data['tracking_number']
                    )
                );

                $this->addFlash('success', $this->trans('Successful update', [], 'Admin.Notifications.Success'));
            } catch (TransistEmailSendingException) {
                $this->addFlash(
                    'error',
                    $this->trans(
                        'An error occurred while sending an email to the customer.',
                        [],
                        'Admin.Orderscustomers.Notification'
                    )
                );
            } catch (Exception $e) {
                $this->addFlash('error', $this->getErrorMessages($e)[0] ?? $e->getMessage());
            }
        }

        return $this->redirectToRoute('admin_orders_view', [
            'orderId' => $orderId,
        ]);
    }

    private function getErrorMessages(Exception $e): array
    {
        return [$e->getMessage()] ?? ['Order not found'];
    }
}
