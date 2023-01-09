<?php
declare(strict_types=1);

namespace MsThemeConfig\Controller\Admin;

use Cart;
use CartRule;
use Exception;
use OrderCartRule;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShop\PrestaShop\Adapter\Entity\Tools;
use PrestaShop\PrestaShop\Adapter\Product\PriceFormatter;
use PrestaShop\PrestaShop\Core\Domain\Order\Exception\OrderException;
use PrestaShop\PrestaShop\Core\Domain\Order\OrderConstraints;
use PrestaShop\PrestaShop\Core\Domain\Order\Query\GetOrderForViewing;
use PrestaShop\PrestaShop\Core\Domain\Order\Query\GetOrderPreview;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderForViewing;
use PrestaShop\PrestaShop\Core\Domain\Order\QueryResult\OrderPreview;
use PrestaShop\PrestaShop\Core\Domain\ValueObject\QuerySorting;
use PrestaShop\PrestaShop\Core\Kpi\Exception\InvalidArgumentException;
use PrestaShop\PrestaShop\Core\Order\OrderSiblingProviderInterface;
use PrestaShop\PrestaShop\Core\Search\Filters\OrderFilters;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Controller\Admin\Sell\Order\ActionsBarButtonsCollection;
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
use PrestaShopBundle\Security\Annotation\AdminSecurity;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DmsAdminOrderController.
 * @package MsThemeConfig\Controller\Admin
 */
class DmsAdminOrderController extends FrameworkBundleAdminController
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
     * @return Response
     * @throws InvalidArgumentException
     */
    public function indexAction(Request $request, OrderFilters $filters): Response
    {
        $orderKpiFactory = $this->get('prestashop.core.kpi_row.factory.orders');
        $orderGrid = $this->get('prestashop.core.grid.factory.order')->getGrid($filters);
        $changeOrderStatusesForm = $this->createForm(ChangeOrdersStatusType::class);

        /**
         * start change order overview based on employee type login.
         */
        $orderPickEmployee = Context::getContext()->cookie->profile;
        $isOrderPicker = false;
        $extraStyling = '#order_grid_table .column-filters td:first-child div.md-checkbox{display:none;}#order_grid_table td.column-id_order, #order_grid_table tr.column-headers th:nth-of-type(2), #order_grid_table tr.column-filters td:nth-of-type(2){display: none;}';

        $workshopProfiles = Configuration::get('MSTHEMECONFIG_EMPLOYEE_WORKSHOP_PROFILES');
        if (!empty($workshopProfiles)) {
            $profiles = explode(',', $workshopProfiles);

            if (in_array($orderPickEmployee, $profiles)) {
                $isOrderPicker = true;
                $extraStyling  .= '#content{margin-right:50px;}';
                $extraStyling .= '.table-responsive-row{overflow:auto;}';
                $extraStyling .= '.column-osname .dropdown-toggle{padding:15px 18px!important;pointer-events:none;}';
                $extraStyling .= '.column-actions .btn-group-action{display:none;}';
                $extraStyling .= '.orders-kpi{display:none;}';
            }
        }
        /**
         * end change order overview based on employee type login.
         */

        return $this->render(
            '@Modules/msthemeconfig/views/templates/admin/index.html.twig',
            [
                'isOrderPicker' => $isOrderPicker, //Added value for check if loggedInUser is orderpicker
                'extraStyling' => $extraStyling, //Added value for adding extra css rules
                'orderGrid' => $this->presentGrid($orderGrid),
                'help_link' => $this->generateSidebarLink($request->attributes->get('_legacy_controller')),
                'enableSidebar' => true,
                'changeOrderStatusesForm' => $changeOrderStatusesForm->createView(),
                'orderKpi' => $orderKpiFactory->build(),
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

        $isSingleShopContext = $this->get('prestashop.adapter.shop.context')->isSingleShopContext();

        $toolbarButtons['add'] = [
            'href' => $this->generateUrl('admin_orders_create'),
            'desc' => $this->trans('Add new order', 'Admin.Orderscustomers.Feature'),
            'icon' => 'add_circle_outline',
            'disabled' => !$isSingleShopContext,
        ];

        if (!$isSingleShopContext) {
            $toolbarButtons['add']['help'] = $this->trans(
                'You can use this feature in a single shop context only. Switch context to enable it.',
                'Admin.Orderscustomers.Feature'
            );
            $toolbarButtons['add']['href'] = '#';
        }

        return $toolbarButtons;
    }

    /**
     * @AdminSecurity("is_granted('read', request.get('_legacy_controller'))")
     *
     * @param int $orderId
     * @param Request $request
     *
     * @return Response
     */
    public function viewAction(int $orderId, Request $request): Response
    {

        try {
            /** @var OrderForViewing $orderForViewing */
            $orderForViewing = $this->getQueryBus()->handle(new GetOrderForViewing($orderId, QuerySorting::DESC));
        } catch (OrderException $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages($e)));

            return $this->redirectToRoute('admin_orders_index');
        }
        //Show original amount for reduction voucher
        $currencyDataProvider = $this->container->get('prestashop.adapter.data_provider.currency');
        $orderCurrency = $currencyDataProvider->getCurrencyById($orderForViewing->getCurrencyId());



        $reductionAmountPrice = 0;
        $reductionAmountPriceProduct = 0;
        $priceFormatter =  new PriceFormatter();

        foreach ($orderForViewing->getDiscounts()->getDiscounts() as $key => $discount) {
            $orderCartRule = new OrderCartRule($discount->getOrderCartRuleId());
                if($orderCartRule){
                    $cartRule = new CartRule($orderCartRule->id_cart_rule);
                    $orderForViewing->getDiscounts()->getDiscounts()[$key]->reduction_amount_formatted_tax_excl = $priceFormatter->format($orderCartRule->value_tax_excl);
                    $orderForViewing->getDiscounts()->getDiscounts()[$key]->orig_reduction_amount = (float) $cartRule->reduction_amount;
                    $orderForViewing->getDiscounts()->getDiscounts()[$key]->orig_reduction_amount_formatted = $priceFormatter->format($cartRule->reduction_amount);
                    $reductionAmountPrice+=$cartRule->reduction_amount;
                    $reductionAmountPriceProduct+=$orderCartRule->value_tax_excl;
                }
            }
        $orderForViewing->getPrices()->originalReductionAmount = $reductionAmountPrice;
        $orderForViewing->getPrices()->originalReductionAmountFormatted = $priceFormatter->format($reductionAmountPrice);
        $orderForViewing->getPrices()->discountsAmountFormattedTaxExcl = $priceFormatter->format($reductionAmountPriceProduct);
        $formFactory = $this->get('form.factory');

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

        $updateOrderShippingForm = $this->createForm(UpdateOrderShippingType::class, [
            'new_carrier_id' => $orderForViewing->getCarrierId(),
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

        $formBuilder = $this->get('prestashop.core.form.identifiable_object.builder.cancel_product_form_builder');

        $backOfficeOrderButtons = new ActionsBarButtonsCollection();

        try {
            $this->dispatchHook(
                'actionGetAdminOrderButtons',
                [
                    'controller' => $this,
                    'id_order' => $orderId,
                    'actions_bar_buttons_collection' => $backOfficeOrderButtons,
                ]
            );

            $cancelProductForm = $formBuilder->getFormFor($orderId);
        } catch (Exception $e) {
            $this->addFlash('error', $this->getErrorMessageForException($e, $this->getErrorMessages($e)));

            return $this->redirectToRoute('admin_orders_index');
        }

        $this->handleOutOfStockProduct($orderForViewing);

        $merchandiseReturnEnabled = (bool)$this->configuration->get('PS_ORDER_RETURN');

        /** @var OrderSiblingProviderInterface $orderSiblingProvider */
        $orderSiblingProvider = $this->get('prestashop.adapter.order.order_sibling_provider');

        $paginationNum = (int)$this->configuration->get('PS_ORDER_PRODUCTS_NB_PER_PAGE', self::DEFAULT_PRODUCTS_NUMBER);
        $paginationNumOptions = self::PRODUCTS_PAGINATION_OPTIONS;
        if (!in_array($paginationNum, $paginationNumOptions)) {
            $paginationNumOptions[] = $paginationNum;
        }
        sort($paginationNumOptions);

        $metatitle = sprintf(
            '%s %s %s',
            $this->trans('Orders', 'Admin.Orderscustomers.Feature'),
            $this->configuration->get('PS_NAVIGATION_PIPE', '>'),
            $this->trans(
                'Order %reference% from %firstname% %lastname%',
                'Admin.Orderscustomers.Feature',
                [
                    '%reference%' => $orderForViewing->getReference(),
                    '%firstname%' => $orderForViewing->getCustomer()->getFirstName(),
                    '%lastname%' => $orderForViewing->getCustomer()->getLastName(),
                ]
            )
        );

        return $this->render('@Modules/msthemeconfig/views/templates/admin/view.html.twig', [
            'showContentHeader' => true,
            'enableSidebar' => true,
            'orderCurrency' => $orderCurrency,
            'meta_title' => $metatitle,
            'history' => $orderForViewing->getHistory(),
            'order' => new Order($orderForViewing->getId()),
            'searchToken' => Tools::getAdminTokenLite('ModernesmidThemeConfigurator'),
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
            'priceSpecification' => $this->getContextLocale()->getPriceSpecification($orderCurrency->iso_code)->toArray(),
            'previousOrderId' => $orderSiblingProvider->getPreviousOrderId($orderId),
            'nextOrderId' => $orderSiblingProvider->getNextOrderId($orderId),
            'paginationNum' => $paginationNum,
            'paginationNumOptions' => $paginationNumOptions,
            'isAvailableQuantityDisplayed' => $this->configuration->getBoolean('PS_STOCK_MANAGEMENT'),
            'internalNoteForm' => $internalNoteForm->createView(),
        ]);
    }

    /**
     * @param OrderForViewing $orderForViewing
     */
    private function handleOutOfStockProduct(OrderForViewing $orderForViewing)
    {
        $isStockManagementEnabled = $this->configuration->getBoolean('PS_STOCK_MANAGEMENT');
        if (!$isStockManagementEnabled || $orderForViewing->isDelivered() || $orderForViewing->isShipped()) {
            return;
        }

        foreach ($orderForViewing->getProducts()->getProducts() as $product) {
            if ($product->getAvailableQuantity() <= 0) {
                $this->addFlash(
                    'warning',
                    $this->trans('This product is out of stock:',
                        'Admin.Orderscustomers.Notification') . ' ' . $product->getName()
                );
            }
        }
    }





    /**
     * @AdminSecurity("is_granted('read', request.get('_legacy_controller'))")
     *
     * @param int $orderId
     *
     * @return JsonResponse
     */
    public function previewAction(int $orderId): JsonResponse
    {
        try {
            /** @var OrderPreview $orderPreview */
            $orderPreview = $this->getQueryBus()->handle(new GetOrderPreview($orderId));

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

}
