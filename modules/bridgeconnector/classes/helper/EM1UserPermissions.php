<?php
/**
 *    This file is part of eMagicOne Store Manager Bridge Connector.
 *
 *   eMagicOne Store Manager Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Store Manager Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

includedUserPermissionsFiles();

class EM1UserPermissions extends EM1Main
{
    // General permissions constants
    const KEY_TITLE                                     = 'title';
    const KEY_ITEMS                                     = 'items';
    const KEY_CODE                                      = 'code';
    const KEY_NAME                                      = 'name';

    // Dashboard permissions constants
    const CODE_DASHBOARD_VIEW                           = 'dashboard_view';

    // Widget permissions constants
    const CODE_WIDGET_VIEW                              = 'widget_view';

    // Notifications permissions constants
    const CODE_NOTIFICATION_PUSH_NEW_ORDER              = 'push_new_order';
    const CODE_NOTIFICATION_PUSH_NEW_CUSTOMER           = 'push_new_customer';
    const CODE_NOTIFICATION_PUSH_CHANGE_ORDER_STATUSES  = 'push_change_order_statuses';

    // Products permissions constants
    const CODE_PRODUCTS_VIEW                            = 'products_view';
//    const CODE_PRODUCTS_EDIT                            = 'products_edit';
//    const CODE_PRODUCTS_DELETE                          = 'products_delete';

    // Customers permissions constants
    const CODE_CUSTOMERS_VIEW                           = 'customers_view';
//    const CODE_CUSTOMERS_EDIT                           = 'customers_edit';
//    const CODE_CUSTOMERS_DELETE                         = 'customers_delete';

    // Orders permissions constants
    const CODE_ORDERS_VIEW                              = 'orders_view';
//    const CODE_ORDERS_EDIT                              = 'orders_edit';
//    const CODE_ORDERS_DELETE                            = 'orders_delete';
    const CODE_ORDERS_DETAILS_PDF                       = 'order_details_pdf';
    const CODE_ORDERS_UPDATE_ORDER_STATUS               = 'update_order_status';
    const CODE_ORDERS_EDIT_SHIPPING_DETAILS             = 'edit_order_shipping_details';

    // Abandoned carts permissions constants
    const CODE_ABANDONED_CARTS_VIEW                     = 'abandoned_carts_view';
//    const CODE_ABANDONED_CARTS_EDIT                     = 'abandoned_carts_edit';
//    const CODE_ABANDONED_CARTS_DELETE                   = 'abandoned_carts_delete';

    // Dashboard permissions list
    const DASHBOARD_PERMISSIONS = array(
        self::KEY_TITLE => 'Dashboard',
        self::KEY_ITEMS => array(
            array(
                self::KEY_CODE      => self::CODE_DASHBOARD_VIEW,
                self::KEY_NAME      => 'View Dashboard',
            )
        )
    );

    // Widget permissions list
    const WIDGET_PERMISSIONS = array(
        self::KEY_TITLE => 'Widget',
        self::KEY_ITEMS => array(
            array(
                self::KEY_CODE      => self::CODE_WIDGET_VIEW,
                self::KEY_NAME      => 'View Widget',
            ),
        ),
    );

    // Notifications permissions list
    const NOTIFICATION_PERMISSIONS = array(
        self::KEY_TITLE => 'Notifications',
        self::KEY_ITEMS => array(
            array(
                self::KEY_CODE  => self::CODE_NOTIFICATION_PUSH_NEW_ORDER,
                self::KEY_NAME  => 'Receive New Order'
            ),
            array(
                self::KEY_CODE  => self::CODE_NOTIFICATION_PUSH_NEW_CUSTOMER,
                self::KEY_NAME  => 'Receive New Customer'
            ),
            array(
                self::KEY_CODE => self::CODE_NOTIFICATION_PUSH_CHANGE_ORDER_STATUSES,
                self::KEY_NAME => 'Receive Order Status Change'
            )
        )
    );

    // Products permissions list
    const PRODUCTS_PERMISSIONS = array(
        self::KEY_TITLE => 'Products',
        self::KEY_ITEMS => array(
            array(
                self::KEY_CODE => self::CODE_PRODUCTS_VIEW,
                self::KEY_NAME => 'View Products'
            )
        )
    );

    // Customers permissions list
    const CUSTOMERS_PERMISSIONS = array(
        self::KEY_TITLE => 'Customers',
        self::KEY_ITEMS => array(
            array(
                self::KEY_CODE => self::CODE_CUSTOMERS_VIEW,
                self::KEY_NAME => 'View Customers'
            )
        )
    );

    // Orders permissions list
    const ORDERS_PERMISSIONS = array(
        self::KEY_TITLE => 'Orders',
        self::KEY_ITEMS => array(
            array(
                self::KEY_CODE => self::CODE_ORDERS_VIEW,
                self::KEY_NAME => 'View Orders'
            ),
            array(
                self::KEY_CODE => self::CODE_ORDERS_DETAILS_PDF,
                self::KEY_NAME => 'View Order Details In PDF'
            ),
            array(
                self::KEY_CODE => self::CODE_ORDERS_UPDATE_ORDER_STATUS,
                self::KEY_NAME => 'Update Order Status'
            ),
            array(
                self::KEY_CODE => self::CODE_ORDERS_EDIT_SHIPPING_DETAILS,
                self::KEY_NAME => 'Edit Shipping Details'
            )
        )
    );

    // Abandoned carts permissions list
    const ABANDONED_CARTS_PERMISSIONS = array(
        self::KEY_TITLE => 'Abandoned carts',
        self::KEY_ITEMS => array(
            array(
                self::KEY_CODE => self::CODE_ABANDONED_CARTS_VIEW,
                self::KEY_NAME => 'View Abandoned Carts'
            )
        )
    );

    // Permissions list
    private static $permissions = array(
        self::DASHBOARD_PERMISSIONS,
        self::WIDGET_PERMISSIONS,
        self::NOTIFICATION_PERMISSIONS,
        self::PRODUCTS_PERMISSIONS,
        self::CUSTOMERS_PERMISSIONS,
        self::ORDERS_PERMISSIONS,
        self::ABANDONED_CARTS_PERMISSIONS
    );

    // Action list related to permission
    private static $actions = array(
        self::CODE_DASHBOARD_VIEW => array(
            'getDashboard',
            'getCountries',
            'getGroups',
            'getManufacturers',
            'getEmployees',
            'getPredefinedOrderMessages',
            'getTaxRulesGroups',
        ),
        self::CODE_WIDGET_VIEW => array(
            'getWidgetData'
        ),
        self::CODE_NOTIFICATION_PUSH_NEW_ORDER => array(
            'pushNotificationSettings',
            'deletePushConfig'
        ),
        self::CODE_NOTIFICATION_PUSH_NEW_CUSTOMER => array(
            'pushNotificationSettings',
            'deletePushConfig'
        ),
        self::CODE_NOTIFICATION_PUSH_CHANGE_ORDER_STATUSES => array(
            'pushNotificationSettings',
            'deletePushConfig'
        ),
        self::CODE_PRODUCTS_VIEW => array(
            'getCountries',
            'getGroups',
            'getManufacturers',
            'getProducts',
            'getProductDetails',
            'searchProducts',
            'getProductEditData',
            'getNewProductData',
            'getProductQuantitySettings',
            'getProductPricingSettings',
            'getProductEditShortDescription',
            'getProductEditDescription',
            'getProductEditOptions',
            'getProductEditLanguageValues',
            'getProductEditCustomizationFields',
            'getProductEditSpecificPriceCombinations',
            'saveProduct',
            'saveProductCombination',
            'saveProductQuantitySettings',
            'saveProductPricingSettings',
            'saveProductShortDescription',
            'saveProductDescription',
            'saveProductOptions',
            'saveProductCustomizationField',
            'saveProductEditAssignedFiles',
            'saveProductSpecificPrice',
            'deleteProductCombination',
            'deleteProductCustomizationField',
            'createProductCustomizationField',
            'createProductSpecificPrice',
            'uploadProductAttachedFile',
            'uploadProductImage',
            'searchProductsToAddInPack',
            'generateProductCombinations',
            'searchProductEditCustomers',
            'deleteProduct',
            'duplicateProduct',
            'getProductEditCombinations',
            'addProductToPack',
            'deleteProductFromPack',
            'getProductEditPackItems',
            'getProductEditSpecificPrices',
            'getProductEditAttributes',
            'getProductEditRelatedProducts',
            'deleteRelatedProduct',
            'searchRelatedProductsToAdd',
            'addRelatedProduct',
            'getProductEditAttachedFiles',
            'getProductEditAssignedCategories',
            'deleteProductCategory',
            'updateMainProductCategory',
            'getProductEditCategoriesToAssign',
            'updateAssignedProductCategories',
            'getProductEditFeatures',
            'addProductFeature',
            'updateProductFeature',
            'deleteProductFeatures',
        ),
        self::CODE_CUSTOMERS_VIEW => array(
            'getCustomers',
            'getCustomerDetails',
            'searchCustomers',
            'getCustomerOrders',
            'searchProductEditCustomers',
        ),
        self::CODE_ORDERS_VIEW => array(
            'getOrders',
            'searchOrders',
            'getOrderDetails',
            'getOrderTimeline',
            'getOrderProducts',
            'getOrderPickingProducts'
        ),
        self::CODE_ORDERS_DETAILS_PDF=> array(
            'checkDownloadOrderInvoiceAvailability',
            'downloadOrderInvoice'
        ),
        self::CODE_ORDERS_UPDATE_ORDER_STATUS => array(
            'changeOrderStatus',
            'changeCustomerThreadStatus',
            'forwardCustomerThread',
            'deleteCustomerThread',
            'sendOrderMessage'
        ),
        self::CODE_ORDERS_EDIT_SHIPPING_DETAILS => array(
            'updateOrderShippingDetails'
        ),
        self::CODE_ABANDONED_CARTS_VIEW => array(
            'getAbandonedCarts',
            'getAbandonedCartDetails',
            'getAbandonedCartProducts',
            'searchAbandonedCarts'
        )
    );

    // Always allowed actions
    private static $allowedActions = array(
        'runSelfTest',
        'getQrCode',
        'getToken',
        'getStores',
        'getSettings',
        'getOrdersStatuses',
        'checkConnectivity'
    );

    /**
     * Static getter for permissions
     * @return array
     */
    public static function getPermissionsList()
    {
        return self::$permissions;
    }

    /**
     * Static getter for actions
     * @return array
     */
    public static function getActionsList()
    {
        return self::$actions;
    }

    public static function getAlwaysAllowedActions()
    {
        return self::$allowedActions;
    }

    /**
     * Static getter to get specific user permissions
     * @param   $userId
     * @return string
     * @throws EM1Exception
     */
    private static function getUserPermissions($userId)
    {
        /** @var DbQueryCore $dbQuery */
        $dbQuery = new DbQuery();

        // Execute query after build it
        return self::getQueryValue(
            $dbQuery->select('`allowed_actions`')
                ->from(EM1Constants::TABLE_MA_USERS)
                ->where('`user_id` = ' . (int)$userId . ' AND `status` = 1')
        );
    }

    /**
     * To check if action allowed for specific user
     * @param $userId
     * @param $actionName
     * @return bool
     * @throws EM1Exception
     */
    public static function isActionAllowed($userId, $actionName)
    {
        $allowedActionsList    = explode(';', self::getUserPermissions($userId));
        $actionAllowed         = false;
        foreach ($allowedActionsList as $restriction) {
            //todo: check related permissions here, by priority
            if (array_key_exists($restriction, self::$actions)
                && in_array($actionName, self::$actions[$restriction], true)) {
                $actionAllowed = true;
                break;
            }
        }

        return $actionAllowed;
    }

    /**
     * To check if action always allowed
     * @param $actionName
     * @return bool
     */
    public static function isActionAlwaysAllowed($actionName)
    {
        $allowedAction = false;
        $alwaysAllowedActionsList = self::getAlwaysAllowedActions();
        foreach ($alwaysAllowedActionsList as $action) {
            if ($actionName === $action) {
                $allowedAction = true;
                break;
            }
        }

        return $allowedAction;
    }
}

/**
 * Included files
 */
function includedUserPermissionsFiles()
{
    require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';
}
