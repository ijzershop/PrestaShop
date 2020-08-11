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

class BridgeconnectorMobassistantconnectorModuleFrontController extends ModuleFrontController
{
    // module name
    private $moduleName = 'bridgeconnector';

    // instances
    private $fileLogger;

    // data
    private $id;
    private $token;
    private $hash = false;
    private $dateFrom;
    private $dateTo;
    private $sortField;
    private $sortDirection;
    private $pageIndex;
    private $pageSize;
    private $searchPhrase;
    private $message;
    private $shopId;
    private $shopGroupId;
    private $languageId;
    private $languageLocale;
    private $currencyId;
    private $orderStatusId;
    private $carrierId;
    private $trackingNumber;
    private $notifyCustomer;
    private $orderStatuses;
    private $onlyWithOrders;
    private $appConnectionId;
    private $registrationId;
    private $pushNewOrder;
    private $pushOrderStatuses;
    private $pushNewCustomer;
    private $statusCode;
    private $notNotifiedOrderStatusIds = array();
    private $employeeId;
    private $email;
    private $comment;

    public function __construct()
    {
        self::checkVersionDefined();
        self::includeFiles();
        $this->getAdminFolder();
        $this->fileLogger = new EM1FileLogger();
        $this->fileLogger->setFilename(_PS_MODULE_DIR_ . $this->moduleName . EM1Constants::LOG_FILE_PATH);

        // Clear old log data
        EM1Access::deleteExpiredData();
        parent::__construct();
    }

    public function initContent()
    {
        parent::initContent();
        try {
            $this->indexAction();
        } catch (EM1Exception $exception) {
            $exception->generateError();
        }
    }

    /**
     * @throws EM1Exception
     */
    private function indexAction()
    {
        // Check if module enabled
        if (!Module::isEnabled($this->moduleName)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_MODULE_DISABLED);
        }

        // Prepare call_function parameter and if no run self test
        $callFunction = Tools::getIsset('call_function') ? Tools::getValue('call_function') : null;
        if (empty($callFunction)) {
            $this->runSelfTest();
        }

        // Prepare method call and check if such method exists
        $methodName = EM1Main::snakeCaseToCamelCase($callFunction);
        if (!method_exists($this, $methodName)) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_FORBIDDEN);
        }

        // Prepare data from $_REQUEST ($_GET or $_POST) or from json/application
        $this->getRequestData();
        $this->employeeId = EM1Access::getEmployeeIdByToken($this->token);
        if (EM1UserPermissions::isActionAlwaysAllowed($methodName)) {
            $this->{$methodName}();
        }

        $this->checkToken();
        if (EM1UserPermissions::isActionAllowed((int)EM1Access::getUserIdByToken($this->token), $methodName)) {
            $this->{$methodName}();
        }

        EM1Main::generateResponse(array(), EM1Exception::ERROR_CODE_FORBIDDEN);
    }

    private function runSelfTest()
    {
        $html = 'eMagicOne Store Manager Bridge Connector (v. ' .
            Module::getInstanceByName($this->moduleName)->version . ')';
        die($html);
    }

    /**
     * @throws EM1Exception
     */
    private function getRequestData()
    {
        $requestData = $this->getRequestContent();
        foreach ($requestData as $parameter => $value) {
            $this->{EM1Main::snakeCaseToCamelCase($parameter)} = $value;
        }

        // Prepare parameters
        $this->languageId                = empty($this->languageId)
            ? (int)Configuration::get('PS_LANG_DEFAULT')
            : (int)$this->languageId;
        $this->languageLocale            = (string)$this->getLanguageLocal();
        $this->currencyId                = empty($this->currencyId)
            ? (int)Configuration::get('PS_CURRENCY_DEFAULT')
            : (int)$this->currencyId;
        $this->pageSize = (empty($this->pageSize) || $this->pageSize < 1) ? 25 : (int)$this->pageSize;
        $this->pageIndex = (empty($this->pageIndex) || $this->pageIndex < 1) ? 1 : (int)$this->pageIndex;
        $this->notNotifiedOrderStatusIds = implode(',', $this->notNotifiedOrderStatusIds);

        // Can put some validation here
        $this->changeInstanceContext();
    }

    private function getLanguageLocal()
    {
        $lang = new Language($this->languageId);
        if(method_exists ($lang, "getLocale")) return $lang->getLocale();

        return $lang->language_code;
    }

    private function getRequestContent()
    {
        $uploadFileCallFuctions = [
            'upload_product_attached_file',
            'upload_product_image',
            'save_product_quantity_settings'
        ];
        if (in_array($_REQUEST['call_function'], $uploadFileCallFuctions)) {
            $dataArray = [];
            $dataArray['data'] = json_decode($_REQUEST['data'], true);
            $dataArray['token'] = $dataArray['data']['token'];
            return $dataArray;
        }
        $data = Tools::getIsset('data') ? Tools::getValue('data') : null;
        $content = json_decode(
            (fopen('php://input', 'rb') !== false
                ? Tools::file_get_contents('php://input')
                : '{}'
            ),
            true
        );

        //todo: add exception if json object can not be parsed with json error
        return (array)(empty($content) ? json_decode($data, true) : $content);
    }

    /**
     * @param bool $forceAllShops
     * @throws EM1Exception
     */
    private function changeInstanceContext($forceAllShops = false)
    {
        if ($forceAllShops) {
            try {
                Shop::setContext(Shop::CONTEXT_ALL);
            } catch (PrestaShopException $e) {
                throw new EM1Exception(EM1Exception::ERROR_CODE_FAILED_TO_SET_SHOP_CONTEXT, $e->getMessage());
            }
            return;
        }

        if (!Shop::isFeatureActive()) {
            $this->shopId = (int)Configuration::get('PS_SHOP_DEFAULT');
            return;
        }

        $this->shopId      = $this->shopId > 0 ? (int)$this->shopId : null;
        $this->shopGroupId = $this->shopGroupId > 0 ? (int)$this->shopGroupId : null;
        $method_name = EM1Main::snakeCaseToCamelCase(Tools::getValue('call_function'));
        if ($this->shopId <= 0 && $this->isContextShopRequiredInMethod($method_name)) {
            Shop::setContext(Shop::CONTEXT_SHOP, (int)Configuration::get('PS_SHOP_DEFAULT'));
            return;
        }

        try {
            if ($this->shopId > 0) {
                Shop::setContext(Shop::CONTEXT_SHOP, $this->shopId);
            } elseif ($this->shopGroupId > 0) {
                Shop::setContext(Shop::CONTEXT_GROUP, $this->shopGroupId);
            } else {
                Shop::setContext(Shop::CONTEXT_ALL);
            }
        } catch (PrestaShopException $e) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_FAILED_TO_SET_SHOP_CONTEXT, $e->getMessage());
        }
    }

    private function isContextShopRequiredInMethod($method_name)
    {
        return (in_array($method_name, EM1Constants::METHODS_THAT_REQUIRE_CONTEXT_SHOP, true));
    }

    /**
     * @throws EM1Exception
     */
    private function checkToken()
    {
        if ($this->token || $this->token === '') {
            if (!EM1Access::checkToken($this->token)) {
                $this->fileLogger->logMessageCall('Token accepted is incorrect', $this->fileLogger->level);
                EM1Main::generateResponse(array(), EM1Exception::ERROR_CODE_BAD_TOKEN);
            }
        } else {
            EM1Access::addFailedAttempt();
            $this->fileLogger->logMessageCall('Authorization error', $this->fileLogger->level);
            EM1Main::generateResponse(array(), EM1Exception::ERROR_CODE_AUTH_ERROR);
        }
    }

    private function checkConnectivity()
    {
        if (isset($this->test)) {
            $response = [
                'response_code' => 'success',
                'error_message' => ''
            ];
        } else {
            $response = [
                'response_code' => 'no_connection',
                'error_message' => 'no connection'
            ];
        }
        header('Content-Type: application/json;');
        echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        die();
    }

    /**
     * @throws EM1Exception
     */
    private function getDashboard()
    {
        $dashboard = new MADashboard(
            $this->shopId,
            $this->languageId,
            $this->currencyId,
            $this->dateFrom,
            $this->dateTo,
            $this->orderStatuses
        );

        $dashboard->getDashboard();
    }

    /**
     * @throws EM1Exception
     */
    private function getWidgetData()
    {
        $widget = new MAWidget(
            $this->shopId
        );

        $widget->getWidgetData(
            $this->dateFrom,
            $this->dateTo,
            $this->orderStatuses
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getOrders()
    {
        $order = new MAOrder($this->languageId);
        $order->getOrders(
            $this->dateFrom,
            $this->dateTo,
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection,
            $this->orderStatuses
        );
    }

    private function getOrderPickingProducts()
    {
        $order = new MAOrder($this->languageId);
        $order->getOrderPickingProducts($this->orderIds, $this->pageSize, $this->pageIndex);
    }

    /**
     * @throws EM1Exception
     */
    private function searchOrders()
    {
        $order = new MAOrder($this->languageId);
        $order->searchOrdersBy(
            $this->dateFrom,
            $this->dateTo,
            $this->searchPhrase,
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection,
            $this->orderStatuses
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getOrderDetails()
    {
        $order = new MAOrder($this->languageId);
        $order->getOrderDetails(
            $this->id,
            $this->pageSize,
            $this->pageIndex
        );
    }

    /**
     * @throws EM1Exception
     */
    private function updateOrderShippingDetails()
    {
        $order = new MAOrder($this->languageId);
        $order->updateOrderShippingDetails(
            $this->id,
            $this->carrierId,
            $this->trackingNumber,
            $this->notifyCustomer
        );
    }

    /**
     * @throws EM1Exception
     */
    private function changeOrderStatus()
    {
        $order = new MAOrder($this->languageId);
        $order->changeOrderStatus($this->id, $this->orderStatusId);
    }

    /**
     * @throws EM1Exception
     */
    private function checkDownloadOrderInvoiceAvailability()
    {
        $order = new MAOrder($this->languageId);
        $order->checkDownloadOrderInvoiceAvailability($this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function downloadOrderInvoice()
    {
        $order = new MAOrder($this->languageId);
        $order->downloadOrderInvoice($this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function getOrderProducts()
    {
        $order = new MAOrder($this->languageId);
        $order->getOrderProducts(
            $this->id,
            $this->pageSize,
            $this->pageIndex
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getCustomers()
    {
        $customer = new MACustomer($this->languageId, $this->currencyId);
        $customer->getCustomers(
            $this->dateFrom,
            $this->dateTo,
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection,
            $this->onlyWithOrders
        );
    }

    /**
     * @throws EM1Exception
     */
    private function searchCustomers()
    {
        $customer = new MACustomer($this->languageId, $this->currencyId);
        $customer->searchCustomers(
            $this->dateFrom,
            $this->dateTo,
            $this->searchPhrase,
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection,
            $this->onlyWithOrders
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getCustomerDetails()
    {
        $customer = new MACustomer($this->languageId, $this->currencyId);
        $customer->getCustomerDetails($this->id, $this->pageIndex, $this->pageSize);
    }

    /**
     * @throws EM1Exception
     */
    private function getCustomerOrders()
    {
        $customer = new MACustomer($this->languageId, $this->currencyId);
        $customer->getCustomerOrders($this->id, $this->pageIndex, $this->pageSize);
    }

    /**
     * @throws EM1Exception
     */
    private function getProducts()
    {
        $product = new MAProduct($this->languageId);
        $product->getProducts(
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection
        );
    }

    /**
     * @throws EM1Exception
     */
    private function searchProducts()
    {
        $product = new MAProduct($this->languageId);
        $product->searchProducts(
            $this->searchPhrase,
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection
        );
    }

    /**
     * @throws EM1Exception
     */
    private function searchProductsToAddInPack()
    {
        $product = new MAProduct();
        $product->searchProductsToAddInPack(
            $this->shopId,
            $this->searchPhrase,
            $this->pageSize,
            $this->pageIndex
        );
    }

    private function searchRelatedProductsToAdd()
    {
        $product = new MAProduct();
        $product->searchRelatedProductsToAdd(
            $this->searchPhrase,
            $this->pageSize,
            $this->pageIndex
        );
    }

    /**
     * @throws EM1Exception
     */
    private function addRelatedProduct()
    {
        $product = new MAProduct();
        $product->addRelatedProduct($this->productId, $this->relatedProductId);
    }

    /**
     * @throws EM1Exception
     */
    private function addProductToPack()
    {
        $product = new MAProduct();
        $product->addProductToPack(
            $this->productId,
            $this->productItemId,
            $this->productAttributeId,
            $this->quantity
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditPackItems()
    {
        $product = new MAProduct();
        $product->getProductEditPackItems(
            $this->id,
            $this->pageIndex,
            $this->pageSize
        );
    }

    private function getProductEditAttachedFiles()
    {
        $product = new MAProduct();
        $product->getProductEditAttachedFiles($this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditRelatedProducts()
    {
        $product = new MAProduct();
        $product->getProductEditRelatedProducts($this->id, $this->pageIndex, $this->pageSize);
    }

    /**
     * @throws EM1Exception
     */
    private function deleteRelatedProduct()
    {
        $product = new MAProduct();
        $product->deleteRelatedProduct($this->productId, $this->relatedProductId);
    }

    /**
     * @throws EM1Exception
     */
    private function deleteProductFromPack()
    {
        $product = new MAProduct();
        $product->deleteProductFromPack(
            $this->productId,
            $this->productItemId,
            $this->productAttributeId
        );
    }

    /**
     * @throws EM1Exception
     */
    private function searchProductEditCustomers()
    {
        $customer = new MACustomer();
        $customer->searchProductEditCustomers($this->searchPhrase);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductDetails()
    {
        $product = new MAProduct($this->languageId);
        $product->getProductDetails($this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditData()
    {
        $product = new MAProduct($this->languageId);
        $product->getProductEditData(
            $this->id,
            $this->languageId,
            $this->shopId,
            $this->pageIndex,
            $this->pageSize
        );
    }

    /**
     * in fact get_product_edit_data but for duplicated product
     *
     * @throws EM1Exception
     */
    private function duplicateProduct()
    {
        $product = new MAProduct();
        $product->duplicateProduct(
            $this->id,
            $this->languageId,
            $this->shopId,
            $this->pageIndex,
            $this->pageSize
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getNewProductData()
    {
        $product = new MAProduct();
        $product->getNewProductData();
    }

    /**
     * @throws EM1Exception
     */
    private function saveProduct()
    {
        $product = new MAProduct();
        $product->saveProduct($this->product);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductCombination()
    {
        $combination = new MAProductCombination();
        $combination->saveProductCombination($this->combination);
    }

    /**
     * @throws EM1Exception
     */
    private function deleteProductCombination()
    {
        $combination = new MAProductCombination();
        $combination->deleteProductCombination($this->id, $this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductQuantitySettings()
    {
        $product = new MAProduct();
        $product->getProductQuantitySettings($this->shopId, $this->productId);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductQuantitySettings()
    {
        $product = new MAProduct();
        $product->saveProductQuantitySettings(
            $this->data['shop_id'],
            $this->data['product_id'],
            $this->data['quantity_settings']
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getProductPricingSettings()
    {
        $product = new MAProduct();
        $product->getProductPricingSettings($this->shopId, $this->productId);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductPricingSettings()
    {
        $product = new MAProduct();
        $product->saveProductPricingSettings($this->productId, $this->productPricingSettings);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditShortDescription()
    {
        $product = new MAProduct();
        $product->getProductEditShortDescription($this->shopId, $this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditDescription()
    {
        $product = new MAProduct();
        $product->getProductEditDescription($this->shopId, $this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductShortDescription()
    {
        $product = new MAProduct();
        $product->saveProductShortDescription($this->data);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductDescription()
    {
        $product = new MAProduct();
        $product->saveProductDescription($this->data);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditOptions()
    {
        $product = new MAProduct();
        $product->getProductEditOptions($this->shopId, $this->productId);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductOptions()
    {
        $product = new MAProduct();
        $product->saveProductOptions($this->data);
    }

    /**
     * @throws EM1Exception
     */
    private function deleteProductCustomizationField()
    {
        $product = new MAProduct();
        $product->deleteProductCustomizationField($this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductCustomizationField()
    {
        $product = new MAProduct();
        $product->saveProductCustomizationField($this->data);
    }

    /**
     * @throws EM1Exception
     */
    private function createProductCustomizationField()
    {
        $product = new MAProduct();
        $product->createProductCustomizationField($this->data);
    }

    private function saveProductEditAssignedFiles()
    {
        $product = new MAProduct();
        $product->saveProductEditAssignedFiles($this->id, $this->assignedFileIds);
    }

    /**
     * @throws EM1Exception
     */
    private function uploadProductAttachedFile()
    {
        $product = new MAProduct();
        $product->uploadProductAttachedFile($this->data['data']);
    }

    /**
     * @throws EM1Exception
     */
    private function getAbandonedCarts()
    {
        $cart = new MAAbandonedCart($this->languageId, $this->currencyId);
        $cart->getAbandonedCarts(
            $this->dateFrom,
            $this->dateTo,
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection
        );
    }

    /**
     * @throws EM1Exception
     */
    private function searchAbandonedCarts()
    {
        $cart = new MAAbandonedCart($this->languageId, $this->currencyId);
        $cart->searchAbandonedCartsBy(
            $this->dateFrom,
            $this->dateTo,
            $this->searchPhrase,
            $this->pageSize,
            $this->pageIndex,
            $this->sortField,
            $this->sortDirection
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getAbandonedCartDetails()
    {
        $cart = new MAAbandonedCart($this->languageId, $this->currencyId);
        $cart->getAbandonedCartDetails(
            $this->id,
            $this->pageSize,
            $this->pageIndex
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getAbandonedCartProducts()
    {
        $cart = new MAAbandonedCart($this->languageId, $this->currencyId);
        $cart->getAbandonedCartProducts(
            $this->id,
            $this->pageSize,
            $this->pageIndex
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getManufacturers()
    {
        $brand = new MABrand();
        $brand->getManufacturers();
    }

    /**
     * @throws EM1Exception
     */
    private function getCountries()
    {
        $other = new MAOther();
        $other->getCountries();
    }

    private function getGroups()
    {
        $other = new MAOther();
        $other->getGroups();
    }

    /**
     * @throws EM1Exception
     */
    private function getTaxRulesGroups()
    {
        $other = new MAOther();
        $other->getTaxRulesGroups();
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditLanguageValues()
    {
        $product = new MAProduct($this->languageId);
        $product->getProductEditLanguageValues($this->id, $this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditCustomizationFields()
    {
        $product = new MAProduct();
        $product->getProductEditCustomizationFields($this->productId, $this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditSpecificPriceCombinations()
    {
        $productCombination = new MAProductCombination();
        $productCombination->getProductEditSpecificPriceCombinations($this->productId, $this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditSpecificPrices()
    {
        $product = new MAProduct();
        $product->getProductEditSpecificPrices($this->productId, $this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function createProductSpecificPrice()
    {
        $product = new MAProduct();
        $product->createProductSpecificPrice($this->specificPrice);
    }

    /**
     * @throws EM1Exception
     */
    private function saveProductSpecificPrice()
    {
        $product = new MAProduct();
        $product->saveProductSpecificPrice($this->specificPrice, $this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function uploadProductImage()
    {
        $product = new MAProduct();
        $product->uploadProductImage($this->data);
    }

    /**
     * @throws EM1Exception
     */
    private function getQrCode()
    {
        if (!$this->hash) {
            throw new EM1Exception(EM1Exception::ERROR_CODE_AUTH_ERROR);
        }

        EM1Settings::getQrCode($this->hash);
    }

    /**
     * @throws EM1Exception
     */
    private function getToken()
    {
        $settingsInformation = new EM1Settings();
        EM1Main::generateResponse($settingsInformation->getTokenValue($this->hash, $this->token));
    }

    /**
     * @throws EM1Exception
     */
    private function getStores()
    {
        $settingsInformation = new EM1Settings();
        EM1Main::generateResponse($settingsInformation->getStores());
    }

    /**
     * @throws EM1Exception
     */
    private function getOrdersStatuses()
    {
        $settingsInformation = new EM1Settings();
        EM1Main::generateResponse($settingsInformation->getOrdersStatuses($this->languageId));
    }

    /**
     * @throws EM1Exception
     */
    private function getSettings()
    {
        $this->changeInstanceContext(true);
        $settingsInformation = new EM1Settings();
        EM1Main::generateResponse(
            array_merge(
                $settingsInformation->getTokenValue($this->hash, $this->token),
                $settingsInformation->getStoreTitle($this->shopId),
                $settingsInformation->getStores(),
                $settingsInformation->getCurrencies(),
                $settingsInformation->getOrdersStatuses($this->languageId),
                $settingsInformation->getLanguages(),
                $settingsInformation->getVersions(),
                $settingsInformation->getCarriers()
            )
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getEmployees()
    {
        $this->changeInstanceContext(true);
        $settingsInformation = new EM1Settings();
        EM1Main::generateResponse(
            $settingsInformation->getEmployees()
        );
    }

    /**
     * @throws EM1Exception
     */
    private function pushNotificationSettings()
    {
        $userId = (int)EM1Access::getUserIdByToken($this->token);

        $pushNotificationSettings = new MAPushNotification();
        $pushNotificationSettings->setPushNotificationSettings(
            $userId,
            $this->appConnectionId,
            $this->registrationId,
            $this->pushNewOrder,
            $this->pushOrderStatuses,
            $this->pushNewCustomer,
            $this->notNotifiedOrderStatusIds
        );
    }

    /**
     * @throws EM1Exception
     */
    private function deletePushConfig()
    {
        $pushNotificationSettings = new MAPushNotification();
        $pushNotificationSettings->deletePushNotificationSettings($this->appConnectionId, $this->registrationId);
    }

    /**
     * @throws EM1Exception
     */
    private function getOrderTimeline()
    {
        $orderTimeline = new MACustomerService($this->languageId);
        $orderTimeline->getOrderTimeline($this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function forwardCustomerThread()
    {
        if (empty($this->id)) {
            throw new EM1Exception('incorrect_customer_thread_id', 'incorrect_customer_thread_id');
        }

        $customerService = new MACustomerService($this->languageId, $this->id, 1);
        $messages = $customerService->getCustomerThreadMessages();
        $output = $this->displayMessage($messages, true, (int) $messages);
        $translatedFields = $this->prepareTranslatedFields();
        if ($this->employeeId) {
            $customerService->forwardCustomerThreadMessages(
                $this->employeeId,
                $translatedFields,
                $this->comment,
                $output
            );
        } elseif ($this->email && Validate::isEmail($this->email)) {
            $customerService->forwardCustomerThreadMessagesByEmail(
                $this->email,
                $this->comment,
                $translatedFields,
                $output
            );
        }
    }

    /**
     * @throws EM1Exception
     */
    private function deleteCustomerThread()
    {
        $customerService = new MACustomerService($this->languageId, $this->id);
        $customerService->deleteCustomerThread();
    }

    /**
     * @throws EM1Exception
     */
    private function changeCustomerThreadStatus()
    {
        $orderTimeline = new MACustomerService($this->languageId, $this->id);
        $orderTimeline->changeCustomerThreadStatus($this->statusCode);
    }

    /**
     * @throws EM1Exception
     */
    private function getPredefinedOrderMessages()
    {
        $sendOrderMessage = new MACustomerService($this->languageId);
        $sendOrderMessage->getPredefinedOrderMessages();
    }

    /**
     * @throws EM1Exception
     */
    private function sendOrderMessage()
    {
        $sendOrderMessage = new MACustomerService($this->languageId, null, $this->employeeId);
        $translatedFields = $this->prepareTranslatedFields();
        $sendOrderMessage->sendOrderMessage($this->id, $this->message, $this->isPrivate, $translatedFields);
    }

    /**
     * @throws EM1Exception
     */
    private function generateProductCombinations()
    {
        $combination = new MAProductCombination();
        $combination->generateProductCombinations(
            $this->id,
            $this->shopId,
            $this->attributes,
            $this->pageIndex,
            $this->pageSize
        );
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditCombinations()
    {
        $combination = new MAProductCombination();
        $combination->getProductEditCombinations($this->id, $this->shopId, $this->pageIndex, $this->pageSize);
    }

    private function getProductEditAttributes()
    {
        $other = new MAOther();
        $other->getProductEditAttributes($this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function deleteProduct()
    {
        $product = new MAProduct();
        $product->deleteProduct($this->id);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditAssignedCategories()
    {
        $product = new MAProduct();
        $product->getProductEditAssignedCategories($this->productId, $this->shopId);
    }

    private function getProductEditCategoriesToAssign()
    {
        $product = new MAProduct();
        $product->getProductEditCategoriesToAssign($this->shopId);
    }

    /**
     * @throws EM1Exception
     */
    private function getProductEditFeatures()
    {
        $product = new MAProduct();
        $product->getProductEditFeatures($this->productId);
    }

    /**
     * @throws EM1Exception
     */
    private function addProductFeature()
    {
        $product = new MAProduct();
        $product->addProductFeature($this->data);
    }

    /**
     * unfinished
     * @throws EM1Exception
     */
    private function updateProductFeature()
    {
        $product = new MAProduct();
        $product->updateProductFeature($this->featureValueId, $this->data);
    }

    /**
     * @throws EM1Exception
     */
    private function deleteProductFeatures()
    {
        $product = new MAProduct();
        $product->deleteProductFeatures($this->productId, $this->features);
    }

    /**
     * @throws EM1Exception
     */
    private function updateAssignedProductCategories()
    {
        $product = new MAProduct();
        $product->updateAssignedProductCategories($this->productId, $this->assignedCategories);
    }

    /**
     * @throws EM1Exception
     */
    private function deleteProductCategory()
    {
        $product = new MAProduct();
        $product->deleteProductCategory($this->productId, $this->categoryId, $this->shopId);
    }

    private function updateMainProductCategory()
    {
        $product = new MAProduct();
        $product->updateMainProductCategory($this->productId, $this->categoryId, $this->shopId);
    }

    private static function checkVersionDefined()
    {
        if (!defined('_PS_VERSION_')) {
            die();
        }
    }

    private function prepareTranslatedFields()
    {
        $translatedEmailSubject = '';
        $translatedEmailMessage = '';
        if ($this->employeeId) {
            $forwardEmployee        = new Employee($this->employeeId);
            $translatedEmailSubject = $this->trans(
                'Fwd: Customer message',
                array(),
                'Emails.Subject',
                $this->languageLocale
            );
            $translatedEmailMessage = $this->trans(
                'Message forwarded to',
                array(),
                'Admin.Catalog.Feature'
            ) . ' ' .
                $forwardEmployee->firstname . ' ' .
                $forwardEmployee->lastname . "\n" .
                $this->trans('Comment:') . ' ' .
                $this->comment;
        } elseif ($this->email && Validate::isEmail($this->email)) {
            $translatedEmailSubject    =
                $this->trans('Fwd: Customer message', array(), 'Emails.Subject', $this->languageLocale);
            $translatedEmailMessage = $this->trans('Message forwarded to', array(), 'Admin.Catalog.Feature') . ' '
                . $this->email . "\n" . $this->trans('Comment:') . ' ' . $this->comment;
        } elseif ($this->message) {
            $customerThread = new CustomerThread($this->id);
            $translatedEmailSubject = $this->trans(
                'An answer to your message is available #ct%thread_id% #tc%thread_token%',
                array(
                    '%thread_id%' => $customerThread->id,
                    '%thread_token%' => $customerThread->token,
                ),
                'Emails.Subject',
                $this->languageLocale
            );
        }

        return array(
            'subject' => $translatedEmailSubject,
            'message' => $translatedEmailMessage
        );
    }

    protected function trans($id, array $parameters = array(), $domain = null, $locale = null)
    {
        $parameters['legacy'] = 'htmlspecialchars';
        if (version_compare(_PS_VERSION_, 1.7, '>=')) {
            return $this->translator->trans($id, $parameters, $domain, $locale);
        }
        $module = new Bridgeconnector();
        return $module->l($id, $parameters, $domain, $locale);
    }

    protected function displayMessage($message, $email = false, $id_employee = null)
    {
        $tpl = $this->createTemplate('customer_thread.tpl');

        $contacts = Contact::getContacts($this->languageId);
        $contact_array = [];
        foreach ($contacts as $contact) {
            $contact_array[$contact['id_contact']] =
                ['id_contact' => $contact['id_contact'], 'name' => $contact['name']];
        }
        $contacts = $contact_array;

        if (!$email) {
            if (!empty($message['id_product']) && empty($message['employee_name'])) {
                $id_order_product = Order::getIdOrderProduct((int)$message['id_customer'], (int)$message['id_product']);
            }
        }
        $message['date_add'] = Tools::displayDate($message['date_add'], null, true);
        $message['user_agent'] = strip_tags($message['user_agent']);
        $message['message'] = preg_replace(
            '/(https?:\/\/[a-z0-9#%&_=\(\)\.\? \+\-@\/]{6,1000})([\s\n<])/Uui',
            '<a href="\1">\1</a>\2',
            html_entity_decode(
                $message['message'],
                ENT_QUOTES,
                'UTF-8'
            )
        );

        $is_valid_order_id = true;
        $order = new Order((int) $message['id_order']);

        if (!Validate::isLoadedObject($order)) {
            $is_valid_order_id = false;
        }

        Context::getContext()->employee = new Employee(1);
        $tpl->assign(
            array(
                'thread_url' => Tools::getAdminUrl(basename(_PS_ADMIN_DIR_) . '/' .
                    $this->context->link->getAdminLink('AdminCustomerThreads') . '&amp;id_customer_thread='
                    . (int) $message['id_customer_thread'] . '&amp;viewcustomer_thread=1'),
                'link' => Context::getContext()->link,
                'current' => 'index.php?controller=AdminCustomerThreads',
                'token' => Tools::getAdminTokenLite('AdminCustomerThreadsController'),
                'message' => $message,
                'id_order_product' => isset($id_order_product) ? $id_order_product : null,
                'email' => $email,
                'id_employee' => $id_employee,
                'PS_SHOP_NAME' => Configuration::get('PS_SHOP_NAME'),
                'file_name' => file_exists(_PS_UPLOAD_DIR_ . $message['file_name']),
                'contacts' => $contacts,
                'is_valid_order_id' => $is_valid_order_id,
            )
        );

        return $tpl->fetch();
    }

    protected function createTemplate($tpl_name)
    {
        return Context::getContext(
        )->smarty->createTemplate(_PS_MODULE_DIR_ . '/bridgeconnector/views/templates/front/' . $tpl_name);
    }

    /**
     * Search for Prestashop Admin Folder in upper folders
     *
     * @return false|string
     */
    private function getAdminFolder()
    {
        //====================================================================//
        // Detect Prestashop Admin Dir
        if (defined('_PS_ADMIN_DIR_')) {
            return _PS_ADMIN_DIR_;
        }
        //====================================================================//
        // Compute Prestashop Home Folder Address
        $homedir = _PS_ROOT_DIR_;
        //====================================================================//
        // Scan All Folders from Root Directory
        $scan = array_diff(scandir($homedir, 1), array('..', '.'));
        if (false == $scan) {
            return false;
        }
        //====================================================================//
        // Identify Admion Folder
        foreach ($scan as $filename) {
            //====================================================================//
            // Filename Is Folder
            if (!is_dir($homedir."/".$filename)) {
                continue;
            }
            //====================================================================//
            // This Folder Includes Admin Files
            if (!is_file($homedir."/".$filename."/"."ajax-tab.php")) {
                continue;
            }
            //====================================================================//
            // This Folder Includes Admin Files
            if (!is_file($homedir."/".$filename."/"."backup.php")) {
                continue;
            }
            //====================================================================//
            // Define Folder As Admin Folder
            define('_PS_ADMIN_DIR_', $homedir."/".$filename);
            return _PS_ADMIN_DIR_;
        }
        return false;
    }

    private static function includeFiles()
    {
        include_once _PS_ROOT_DIR_ . '/config/config.inc.php';
        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/functions/functions.php';

        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Constants.php';
        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1FileLogger.php';
        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Exception.php';
        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Access.php';
        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1UserPermissions.php';
        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Settings.php';
        include_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/helper/EM1Main.php';

        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/dashboard/MADashboard.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/brand/MABrand.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/product/MAProduct.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/product/MAProductCombination.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/customer/MACustomer.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/order/MAOrder.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/other/MAOther.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/abandoned_cart/MAAbandonedCart.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME . '/classes/widget/MAWidget.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME
            . '/classes/push_notifications/MAPushNotification.php';
        require_once _PS_MODULE_DIR_ . '/' . EM1Constants::MODULE_NAME
            . '/classes/customer_service/MACustomerService.php';
    }
}
