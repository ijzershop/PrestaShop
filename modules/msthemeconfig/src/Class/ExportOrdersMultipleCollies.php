<?php
declare(strict_types=1);

namespace MsThemeConfig\Class;

use Configuration;
use Context;
use Db;
use DbQuery;
use Exception;
use mysqli_result;
use Order;
use OrderCarrier;
use PDOStatement;
use PrestaShopDatabaseException;
use PrestaShopException;
use stdClass;
use Tools;
use MsThemeConfig\Class\KoopmanErrorCodes;


/**
 * Class ExportOrders.
 */
class ExportOrdersMultipleCollies
{
    //Verzonden status waar de orders na dagafsluiting op worden gezet
    public bool $debug;
    public Context $context;
    public array $ordersOk;

    // JWT token related properties
    public string $apiToken;
    public int $tokenExpiry;

    public bool $redirect = true;
    public bool $updateBool;

    public int $addedSelectCarrier;
    public int $addedSelectStatus;
    public int $packageLaneProfile1;
    public int $packageLaneProfile2;
    public int $packageLaneProfile3;
    public int $selectCarrier;
    public int $selectStatus;
    public int $statusShipped = 4;
    public int $updateStatus;

    public int|null $idLang;
    public int|null $idOrder;
    public int|null $idShop;
    public int|null $idShopGroup;

    public string $afZender;
    public string $afzenderHuisnr;
    public string $afzenderLand;
    public string $afzenderNaam2;
    public string $afzenderNaam;
    public string $afzenderPlaats;
    public string $afzenderPostcode;
    public string $afzenderStraat;
    public string $apiDepot;
    public string $apiPass;
    public string $apiUserName;
    public string $apiVerlader;
    public string $output = '';

    // API endpoints
    public string $apiBaseUrl;
    public string $apiAuthEndpoint;
    public string $apiOrderEndpoint;
    public string $apiAddressEndpoint;
    public string $apiShippingListEndpoint;

    public string|array $labelsFolder;

    // Add this property to the class
    public KoopmanTemplateRenderer $templateRenderer;

    /**
     * @param $id_order
     * @param array $collies
     */
    public function __construct($id_order, array $collies = [])
    {

        $this->idOrder = (int)$id_order;
        $this->debug = false;
        $this->collies = $collies;
        $this->context = Context::getContext();
        $this->ordersOk = [];
        $this->idLang = (int)$this->context->language->id;
        $this->idShop = (int)$this->context->shop->id;
        $this->idShopGroup = (int)$this->context->shop->id_shop_group;
        $this->statusShipped = (int)Configuration::get('KOOPMANORDEREXPORT_STATUS_TRANSFERRED', $this->idLang, $this->idShopGroup, $this->idShop);
        $folder = Configuration::get('KOOPMANORDEREXPORT_LABELS_FOLDER', $this->idLang, $this->idShopGroup, $this->idShop);
        $this->labelsFolder = str_replace('private_html', 'public_html', $_SERVER['DOCUMENT_ROOT'] . '/upload/' . $folder);

        $this->packageLaneProfile1 = (int)$this->getConfig('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_1_PROFILE');
        $this->packageLaneProfile2 = (int)$this->getConfig('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_2_PROFILE');
        $this->packageLaneProfile3 = (int)$this->getConfig('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_3_PROFILE');

        $this->selectStatus = (int)$this->getConfig('KOOPMANORDEREXPORT_SELECT_STATUS');
        $this->selectCarrier = (int)$this->getConfig('KOOPMANORDEREXPORT_SELECT_CARRIER');

        $this->addedSelectCarrier = (int)$this->getConfig('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_CARRIER');
        $this->addedSelectStatus = (int)$this->getConfig('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS');

        $this->updateBool = (bool)$this->getConfig('KOOPMANORDEREXPORT_UPDATE_BOOL');
        $this->updateStatus = (int)$this->getConfig('KOOPMANORDEREXPORT_UPDATE_STATUS');

        // Update API configuration
//        $this->apiBaseUrl = $this->getConfig('KOOPMANORDEREXPORT_API_BASE_URL');
//        $this->apiAuthEndpoint = $this->getConfig('KOOPMANORDEREXPORT_API_AUTH_ENDPOINT');
//        $this->apiOrderEndpoint = $this->getConfig('KOOPMANORDEREXPORT_API_ORDER_ENDPOINT');
//        $this->apiAddressEndpoint = $this->getConfig('KOOPMANORDEREXPORT_API_ADDRESS_ENDPOINT');
//        $this->apiShippingListEndpoint = $this->getConfig('KOOPMANORDEREXPORT_API_SHIPPING_LIST_ENDPOINT');
//
//        $this->apiUserName = $this->getConfig('KOOPMANORDEREXPORT_API_USERNAME');
//        $this->apiPass = $this->getConfig('KOOPMANORDEREXPORT_API_PASSWORD');
//        $this->apiDepot = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_DEPOT');
//        $this->apiVerlader = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_VERLADER');


        $this->apiBaseUrl = 'https://staging.trans-mission.nl/api';
        $this->apiAuthEndpoint = '/login/';
        $this->apiOrderEndpoint = '/shipments/shipment';
        $this->apiAddressEndpoint = '/addresses/address';
        $this->apiShippingListEndpoint = '/shipments';

        $this->apiUserName = 'test@ijzershop.nl';
        $this->apiPass = 'Test#130268';
        $this->apiDepot = '9800';
        $this->apiVerlader = '130268';

        $this->afZender = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDER');
        $this->afzenderNaam = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM');
        $this->afzenderNaam2 = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM2');
        $this->afzenderStraat = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERSTRAAT');
        $this->afzenderHuisnr = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERHUISNR');
        $this->afzenderPostcode = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPOSTCODE');
        $this->afzenderPlaats = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPLAATS');
        $this->afzenderLand = 'NL';
        $this->prepareLabelsFolder();


        // Initialize JWT token
        $this->apiToken = '';
        $this->tokenExpiry = 0;

        $this->templateRenderer = new KoopmanTemplateRenderer();

    }

    /**
     * @throws PrestaShopException
     * @throws PrestaShopDatabaseException
     */
    public function getShipmentStatus()
    {
        try {
            $db = Db::getInstance();
            $sql = new DbQuery();
            $sql->select('*');
            $sql->from('order_carrier', 'oc');
            $sql->where('oc.id_order = ' . (int)$this->idOrder);

            $result = $db->executeS($sql);
            if($result){
                $records = explode(',', $result[0]['tracking_number']);
                $transportResult = [];

                $records[]  = 'T98130268127837';

                foreach($records as $transportNumber){
                    if(!empty($transportNumber)) {
                        $date = date('Y-n-j');
                        $transportData = $this->makeApiRequest('/shipments/statusses/' . $transportNumber . '/' . $date, [], 'GET');

                        $transportResult[$transportNumber] = $transportData;
                    }
                }

                return json_encode($transportResult, 1);
            }
            return json_encode([]);
        } catch (Exception $e){
            die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
        }

    }


    /**
     * Handle API error response
     *
     * @param string $errorCode The error code from the API
     * @param array $errorDetails Additional error details
     * @return string Human-readable error message
     */
    private function handleApiError(string $errorCode, array $errorDetails = []): string
    {
        $errorMessage = KoopmanErrorCodes::getErrorMessage($errorCode);

//        // Add additional error handling logic based on specific error codes
//        if ($errorCode === KoopmanErrorCodes::ERR_ADDRESS_POSTALCODE_INVALID) {
//            // Special handling for invalid postal code
//            // ...
//        }

        return $errorMessage;
    }

    /**
     * Get Configuration
     *
     * @param $name
     * @return false|string
     */
    private function getConfig($name): bool|string
    {
        return Configuration::get($name, $this->idLang, $this->idShopGroup, $this->idShop);
    }

    /**
     * Prepare Labels Folder
     *
     * @return void
     */
    private function prepareLabelsFolder(): void
    {
        if (!is_dir($this->getLaneFolder())) {
            @mkdir($this->getLaneFolder(), 0755);
        }

        try {
            $code = '<' . '?php' . PHP_EOL;
            $code .= 'foreach(glob("*.pdf") as $filename){' . PHP_EOL;
            $code .= '  header("Content-Description: File Transfer");' . PHP_EOL;
            $code .= '  header("Cache-Control: private");' . PHP_EOL;
            $code .= '  header("Content-Type: application/octet-stream");' . PHP_EOL;
            $code .= '  header("Content-Length: ".filesize($filename));' . PHP_EOL;
            $code .= '  header("Content-Disposition: attachment; filename=".$filename);' . PHP_EOL;
            $code .= '  header("Content-Transfer-Encoding: binary");' . PHP_EOL;
            $code .= '  readfile($filename);' . PHP_EOL;
            $code .= '  unlink($filename);' . PHP_EOL;
            $code .= '  break; //alleen de eerste' . PHP_EOL;
            $code .= '}' . PHP_EOL;
            $code .= '?' . '>';
            file_put_contents($this->getLaneFolder() . '/labels.php', $code);
        } catch (Exception $e) {
            die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
        }
    }

    /**
     * Get the folder used by packaging lane
     *
     * @return string
     */
    private function getLaneFolder(): string
    {
        $lane_2 = $this->packageLaneProfile2;
        $lane_3 = $this->packageLaneProfile3;

        return match ($this->context->employee->id_profile) {
            $lane_2 => $this->labelsFolder . '/lane_2',
            $lane_3 => $this->labelsFolder . '/lane_3',
            default => $this->labelsFolder . '/lane_1',
        };
    }

    /**
     * Get JWT token for API authentication
     *
     * @return string
     * @throws Exception
     */
    private function getAuthToken(): string
    {
        // Check if we have a valid token
        if (!empty($this->apiToken) && $this->tokenExpiry > time()) {
            return $this->apiToken;
        }

        // Prepare authentication data
        $authData = [
            'user' => $this->apiUserName,
            'password' => $this->apiPass
        ];

        // Make API call to get token
        $ch = curl_init($this->apiBaseUrl . $this->apiAuthEndpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        // Add this line to disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // Change from JSON to form data
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($authData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
            'Accept: application/json'
        ]);

        $response = curl_exec($ch);
        if ($response === false) {
            $error = curl_error($ch);
            throw new Exception("cURL error: " . $error);
        }
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new Exception("Authentication failed with status code: " . $httpCode . " and response: " . $response);
        }

        $tokenData = json_decode($response, true);
        if (!isset($tokenData['access_token'])) {
            throw new Exception("Invalid token response: " . $response);
        }

        // Store token and expiry time (assuming token expires in 1 hour)
        $this->apiToken = $tokenData['access_token'];
        $this->tokenExpiry = time() + ($tokenData['expires_in'] ?? 3600);

        return $this->apiToken;
    }

    /**
     * Make API request with JWT authentication
     *
     * @param string $endpoint
     * @param array $data
     * @param string $method
     * @return array
     * @throws Exception
     */
    public function makeApiRequest(string $endpoint, array $data = [], string $method = 'GET'): array
    {
        $token = $this->getAuthToken();
        $ch = curl_init($this->apiBaseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // Add this line to disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        if ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        } elseif ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        } elseif ($method === 'GET' && !empty($data)) {
            $endpoint .= '?' . http_build_query($data);
            curl_setopt($ch, CURLOPT_URL, $this->apiBaseUrl . $endpoint);


        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $token
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            $error = curl_error($ch);
            throw new Exception("cURL error: " . $error);
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode < 200 || $httpCode >= 300) {
            throw new Exception("API request failed with status code: " . $httpCode . " and response: " . $response);
        }


        return json_decode($response, true);
    }

    /**
     * Get address information from API
     *
     * @param array $address
     * @return array
     */
    private function getAddressNL(array $address): array
    {
        try {
            return $this->makeApiRequest($this->apiAddressEndpoint, [
                'type' => 'delivery',
                'address1' => $address['address1'],
                'postalcode' => $address['postalcode'],
                'housenumber' => $address['housenumber'],
                'city' => $address['city'],
                'country_code' => $address['country_code'],
                ], 'POST');

        } catch (Exception $e) {
            die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
        }
    }

    /**
     * Main Export Function
     * Export orders.
     **/
    public function export(): bool
    {
        try {
            $orders = $this->getOrders($this->selectStatus, $this->selectCarrier, 1, $this->idOrder);
        } catch (PrestaShopDatabaseException $e) {
            die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
        }

        if (empty($orders)) {
            return false;
        }

        if (!empty($this->idOrder)) {
            try {
                $this->processOrdersNew($orders, $this->collies);
            } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
            }
        } else {
            try {
                $this->processOrdersNew($orders);
            } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
            }
        }

        //Update orders when selected and uploaded
        if ($this->updateBool && count($this->ordersOk) > 0) {
            try {
                $this->setNewStateForOrders($orders, $this->updateStatus);
            } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
            }
        }

        return true;
    }

    /**
     * Get orders array for given state.
     *
     * @param $state
     * @param $carrier
     * @param int $max
     * @param null $id_order
     * @return array of orders
     *
     * @throws PrestaShopDatabaseException
     */
    private function getOrders($state, $carrier, int $max = 1000, $id_order = null): array
    {
        $sql = new DbQuery();
        $sql->select('o.*, c.*, a.*, co.*, at.reference as added_to_reference, at.id_order as added_to_id,
         GROUP_CONCAT(aw.reference) as added_with_reference, GROUP_CONCAT(aw.id_order) as added_with_id');
        $sql->from('orders', 'o');
        $sql->leftJoin('customer', 'c', 'c.id_customer = o.id_customer');
        $sql->leftJoin('address', 'a', 'a.id_address = o.id_address_delivery');
        $sql->leftJoin('country', 'co', 'co.id_country = a.id_country');
        $sql->leftJoin('orders', 'at', 'at.reference = o.added_to_order');
        $sql->leftJoin('orders', 'aw', 'aw.added_to_order = o.reference');
        if (isset($id_order)) { //als id is meegegeven dan maakt state en carrier niet meer uit
            $sql->where('o.id_order = ' . $id_order);
        } else {
            $sql->where('o.current_state IN (' . $state . ')');
            $sql->where('o.id_carrier = ' . $carrier);
        }
        $sql->groupBy('o.id_order');
        $sql->limit($max);

        return Db::getInstance()->executeS($sql);
    }

    /**
     * Process all new orders
     *
     * @param $orders
     * @param array $collies
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    private function processOrdersNew($orders, array $collies = [])
    {
        if (empty($orders)) {
            die("Error met melding: Geen order id's beschikbaar<br/>");
        }

        foreach ($orders as $row) {
            $orderId = $row['id_order'];
            $orderReference = $row['reference'];
            // Check for linked orders
            if (!empty($row['added_to_reference']) && !empty($row['added_to_id']) && (int)Tools::getValue('added_check') != 1) {
                //heeft toegevoegde orders
                $linkedIdArray = explode(',', $row['added_to_id']);
                $linkedReferencesArray = explode(',', $row['added_to_reference']);
                $this->redirect = false;
                die($this->getOutputAddedToOrder($linkedIdArray, $linkedReferencesArray));
            }
            if (!empty($row['added_with_reference']) && !empty($row['added_with_id']) && (int)Tools::getValue('added_check') != 1) {
                //heeft toegevoegde orders
                $linkedIdArray = explode(',', $row['added_with_id']);
                $linkedReferencesArray = explode(',', $row['added_with_reference']);
                $this->redirect = false;
                die($this->getOutputAddedOrders($linkedIdArray, $linkedReferencesArray));
            }

            // Prepare shipping data
            $shippingData = $this->prepareShippingData($row, $orderReference, $collies);

            // Validate address for NL orders
            if (strtolower($shippingData['addresses'][0]['country_code']) == 'nl') {
                try {
                    $addresses = $this->getAddressNL($shippingData['addresses'][0])['data'];

                    if (!empty($addresses)) {
                        $klant_straat = $shippingData['addresses'][0]['address1'];
                        $klant_plaats = $shippingData['addresses'][0]['city'];

                        if ((count($addresses) > 1) || (trim(strtolower($shippingData['addresses'][0]['address1'])) != trim(strtolower($addresses[0]['StraatNEN'])))) {
                            $validAddress = false;
                            foreach ($addresses as $address) {
                                if (trim(strtolower($address['StraatNEN'])) == trim(strtolower($shippingData['addresses'][0]['address1'])) &&
                                    trim(strtolower($address['PlaatsNEN'])) == trim(strtolower($shippingData['addresses'][0]['city']))) {
                                    $validAddress = true;
                                }
                            }

                            if (!$validAddress) {
                                $shippingData['addresses'][0]['city'] = '';
                                $this->redirect = false;

                                die($this->getOutputWrongPostcode($klant_straat, (object)$shippingData['addresses'][0], $klant_plaats, $addresses, $row['house_number'], $row['house_number_extension']));
                            }
                        } else {
                            $shippingData['addresses'][0]['address1'] = $addresses[0]['StraatNEN'];
                            $shippingData['addresses'][0]['city'] = $addresses[0]['PlaatsNEN'];
                        }
                    }
                } catch (Exception $e) {
                    if ((int)$e->getCode() == 0) {
                        $this->redirect = false;
                        die($this->getOutputChangeAddress($e, $row['address1'], $row['house_number'], $row['house_number_extension'], $row['postcode'], $row['city']));
                    }
                }
            }
            // If address is valid, create shipping order
            if (!empty($shippingData['addresses'][0]['city'])) {
                try {
                    // Create shipping order via API

                    $response = $this->makeApiRequest($this->apiOrderEndpoint, $shippingData, 'POST');
                    $resp = $response['data'];
                    if ($response['status'] === 200) {
                        $trackingNumber = $resp['transport_number'];
                        $trackingUrl = $resp['tracking_url'];
                        $trackingNumber = 'T' . substr($trackingNumber, 1); //T98
                        $this->addTrackingNumberToOrder($orderId, $trackingNumber, $trackingUrl);

                        // Get and save label
                        if (isset($resp['labels'])) {
                            $labels = $resp['labels'];
                            $this->redirect = true;

                            if(array_key_exists('label_content', $labels)){
                                if (file_put_contents($this->getLaneFolder() . '/' . $trackingNumber . '.pdf', base64_decode($labels['label_content']))) {
                                    $this->ordersOk[] = $orderId;
                                }
                            } else {
                                for($i = 0; $i < count($labels); $i++) {
                                    if (file_put_contents($this->getLaneFolder() . '/' . $trackingNumber.'_'. $i . '.pdf', base64_decode($labels[$i]['label_content']))) {
                                        $this->ordersOk[] = $orderId;
                                    }
                                }
                            }


                        }
                    }
                } catch (Exception $e) {
                    if (session_status() == PHP_SESSION_NONE) {
                        session_start();
                    }
                    $_SESSION['koopmanError'] = $e->getMessage();
                    die(sprintf("Error met %s en melding: %s<br/>", $e->getCode(), $e->getMessage()));
                }

                // Debug mode - delete the order if in debug mode
                if ($this->debug && isset($resp['transport_number'])) {
                    try {
                        $this->makeApiRequest($this->apiOrderEndpoint . '/' . $resp['transport_number'], [], 'DELETE');
                    } catch (Exception $e) {
                        die(sprintf("Error met %s en melding: %s<br/>", $e->getCode(), $e->getMessage()));
                    }
                }
            }
        }
    }
    /**
     * Prepare shipping data for API request
     *
     * @param array $row Order data
     * @param string $orderReference Order reference
     * @param array $collies Collies data
     * @return array
     * @throws PrestaShopDatabaseException
     */
    private function prepareShippingData(array $row, string $orderReference, array $collies = []): array
    {
        $shippingDate = date('d-m-Y');
        $koopmanFreeDays = ['01-05-2025', '05-05-2025', '29-05-2025', '09-06-2025', '05-05-2025', '21-06-2025'];

        while(in_array($shippingDate, $koopmanFreeDays)) {
            $shippingDate = date('d-m-Y', strtotime($shippingDate . ' +1 day'));
        }

        // Prepare customer data
        $orderFirstName = $this->sanitizeTextForTransmission($row['firstname']);
        $orderLastName = $this->sanitizeTextForTransmission($row['lastname']);
        $orderCompany = $this->sanitizeTextForTransmission($row['company']);
        $orderAddress1 = $this->sanitizeTextForTransmission($row['address1']);
        $orderHouseNumber = $this->sanitizeTextForTransmission($row['house_number']);
        $orderHouseNumberExt = $this->sanitizeTextForTransmission($row['house_number_extension']);
        $orderPostcode = $this->sanitizeTextForTransmission($row['postcode']);
        $orderCity = $this->sanitizeTextForTransmission($row['city']);
        $orderIsoCode = $this->sanitizeTextForTransmission($row['iso_code']);
        $orderPhone = $this->sanitizeTextForTransmission($row['phone']);
        $orderEmail = $this->sanitizeTextForTransmission($row['email']);

        // Get client message if available
        $msg = $this->getFirstClientMessage($row['id_order']);
        $instructie = !empty($msg) ? $msg[0]['message'] : '';

        // Prepare shipping data
        $shippingData = [
            'type' => 'T', // T = Stukgoed Levering
            'depot' => $this->apiDepot,
            'customer_number' => $this->apiVerlader,
            'date' =>  date('Y-m-d', strtotime($shippingDate)),
            'labels' => 'PDF',
            'references' => [
                [
                    'type' => 'NRORDER',
                    'reference' => $orderReference,
                ]
             ],
            'addresses' => [
               [
                   'type' => 'delivery',
                   'name'=> $orderFirstName . ' ' . $orderLastName,
                   'name2'=> $orderCompany,
                   'address1'=> $orderAddress1,
                   'housenumber'=> $orderHouseNumber . ' ' . $orderHouseNumberExt,
                   'postalcode'=> $orderPostcode,
                   'city'=> $orderCity,
                   'country_code'=> $orderIsoCode,
                   'contact' => [
                       'language' => 'nl',
                       'name' => $orderFirstName . ' ' . $orderLastName,
                       'phonenumber' => $orderPhone,
                       'email' => $orderEmail,
                   ]
               ],[
                    'type' => 'consignor',
                    'name'=> $this->afzenderNaam,
                    'name2'=> $this->afzenderNaam2,
                    'address1'=> $this->afzenderStraat,
                    'housenumber'=> $this->afzenderHuisnr,
                    'postalcode'=> $this->afzenderPostcode,
                    'city'=> $this->afzenderPlaats,
                    'country_code'=> $this->afzenderLand,
                ],[
                    'type' => 'loading',
                    'name'=> $this->afzenderNaam,
                    'name2'=> $this->afzenderNaam2,
                    'address1'=> $this->afzenderStraat,
                    'housenumber'=> $this->afzenderHuisnr,
                    'postalcode'=> $this->afzenderPostcode,
                    'city'=> $this->afzenderPlaats,
                    'country_code'=> $this->afzenderLand,
                ]
            ],
            'text_messages' => [
                [
                    'type' => 'AFLINFO',
                    'message' => $instructie
                ],
            ],
            // Collies data
            'shipment_units' => []
        ];


        // Add collies data
        if (!empty($collies)) {
            foreach ($collies as $i => $collie) {
                if(in_array($collie['name'], ['envelope', 'plaat', '1-meter', '2-meter'])) {
                    $collieType = 'COL';
                } else {
                    switch ($collie['name']) {
                        case 'balk-pallet':
                        case 'pallet':
                            $collieType = 'PLH';
                            break;
                        case 'plaat-pallet':
                            $collieType = 'MP';
                            break;
                        default:
                            $collieType = 'PLH';
                    }
                }

                $shippingData['shipment_units'][] = [
                    'number' => $i + 1,
                    'goods_description' => 'ModerneSmid metaal producten',
                    'packages' => '1',
                    'exchange' => '0',
                    'unit_type' => $collieType,
                    'measurements' => [
                            'weight' => $collie['weight'],
                            'length' => $collie['length'],
                            'width' => $collie['width'],
                            'height' => $collie['height'],
                            'volume' => '0.0000',
                            'loadingmeter' => '0.00'
                        ],
                    'exchange_unit' => 1,
                ];
            }
        }

        return $shippingData;
    }

    /**
     * @param $string
     * @return string
     */
    private function sanitizeTextForTransmission($string): string
    {
        $string = strtolower($string);
        $string = preg_replace("/[áàãâä]/ui", 'a', $string);
        $string = preg_replace('/[éèêë]/ui', 'e', $string);
        $string = preg_replace('/[íìîï]/ui', 'i', $string);
        $string = preg_replace('/[óòõôö]/ui', 'o', $string);
        $string = preg_replace('/[úùûü]/ui', 'u', $string);
        $string = preg_replace('/[ç]/ui', 'c', $string);

        return trim($string);
    }

    /**
     * @param $id_order
     * @return array|bool|mysqli_result|PDOStatement|resource|null
     * @throws PrestaShopDatabaseException
     */
    private function getFirstClientMessage($id_order)
    {
        if (!is_numeric($id_order)) {
            return false;
        }

        $sql = new DbQuery();
        $sql->select('message');
        $sql->from('message', 'm');
        $sql->where('m.id_order = ' . $id_order);
        $sql->where('m.private = 0');
        $sql->limit(1);
        $sql->orderBy('id_message asc');

        return Db::getInstance()->executeS($sql);
    }

    /**
     * @param Exception $e
     * @param string $orderAddress1
     * @param string $orderHouseNumber
     * @param string $orderHouseNumberExt
     * @param string $orderPostcode
     * @param string $orderCity
     * @return string
     * @throws Exception
     */
    public function getOutputChangeAddress(Exception $e, string $orderAddress1, string $orderHouseNumber, string $orderHouseNumberExt, string $orderPostcode, string $orderCity): string
    {
        $getParams = [];
        foreach ($_GET as $key => $value) {
            $getParams[$key] = $value;
        }

        return $this->templateRenderer
            ->assignMultiple([
                'error_message' => $e->getMessage(),
                'get_params' => $getParams,
                'address1' => $orderAddress1,
                'house_number' => $orderHouseNumber,
                'house_number_extension' => $orderHouseNumberExt,
                'postcode' => $orderPostcode,
                'city' => $orderCity
            ])
            ->render('change_address.tpl');
    }


    /**
     * @param string $klant_straat
     * @param stdClass $shippingTask
     * @param string $klant_plaats
     * @param array $addresses
     * @param string $orderHouseNumber
     * @param string $orderHouseNumberExt
     * @return string
     * @throws Exception
     */
    public function getOutputWrongPostcode(string $klant_straat, stdClass $shippingTask, string $klant_plaats, array $addresses, string $orderHouseNumber, string $orderHouseNumberExt): string
    {
        $getParams = [];
        foreach ($_GET as $key => $value) {
            $getParams[$key] = $value;
        }

        // For the first address in the list (used as default values)
        $firstAddress = $addresses[0];

        return $this->templateRenderer
            ->assignMultiple([
                'klant_straat' => $klant_straat,
                'postcode' => $shippingTask->geapostcode,
                'klant_plaats' => $klant_plaats,
                'addresses' => $addresses,
                'get_params' => $getParams,
                'default_street' => $firstAddress->straat ?? $firstAddress['straat'] ?? '',
                'house_number' => $orderHouseNumber,
                'house_number_extension' => $orderHouseNumberExt,
                'default_postcode' => $firstAddress->postcode ?? $firstAddress['postcode'] ?? '',
                'default_city' => strtolower($firstAddress->plaats ?? $firstAddress['plaats'] ?? '')
            ])
            ->render('wrong_postcode.tpl');
    }

    /**
     * @param array $linkedIdArray
     * @param array $linkedReferencesArray
     * @return string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function getOutputAddedToOrder(array $linkedIdArray, array $linkedReferencesArray): string
    {
        $getParams = [];
        foreach ($_GET as $key => $value) {
            if($key == 'collies'){
                $value = str_replace('"', "'", $value);
            }
            $getParams[$key] = $value;
        }

        $linkedOrders = [];
        foreach ($linkedIdArray as $i => $link) {
            $orderCarrier = new Order($link);
            $shippingData = $orderCarrier->getShipping();

            $linkedOrders[] = [
                'id' => $link,
                'reference' => $linkedReferencesArray[$i],
                'tracking_number' => $shippingData[0]['tracking_number'],
                'weight' => (float)$shippingData[0]['weight'],
                'order_state_name' => $shippingData[0]['order_state_name']
            ];
        }

        return $this->templateRenderer
            ->assignMultiple([
                'get_params' => $getParams,
                'linked_orders' => $linkedOrders,
                'form_id' => 'toevoegingForm'
            ])
            ->render('added_to_order.tpl');
    }


    /**
     * @param array $linkedIdArray
     * @param array $linkedReferencesArray
     * @return string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function getOutputAddedOrders(array $linkedIdArray, array $linkedReferencesArray): string
    {
        $getParams = [];
        foreach ($_GET as $key => $value) {
            if($key == 'collies'){
                $value = str_replace('"', "'", $value);
            }
            $getParams[$key] = $value;
        }

        $linkedOrders = [];
        foreach ($linkedIdArray as $i => $link) {
            $orderCarrier = new Order($link);
            $shippingData = $orderCarrier->getShipping();

            $linkedOrders[] = [
                'id' => $link,
                'reference' => $linkedReferencesArray[$i],
                'tracking_number' => $shippingData[0]['tracking_number'],
                'weight' => (float)$shippingData[0]['weight'],
                'order_state_name' => $shippingData[0]['order_state_name']
            ];
        }

        return $this->templateRenderer
            ->assignMultiple([
                'get_params' => $getParams,
                'linked_orders' => $linkedOrders,
                'form_id' => 'toevoegingForm'
            ])
            ->render('added_orders.tpl');
    }


    /**
     * @param $id_order
     * @param $trackingNumber
     * @return void
     */
    public function addTrackingNumberToOrder($id_order, $trackingNumber = null, $trackingUrl = null): void
    {
        if (!empty($trackingNumber)) {
            $db = Db::getInstance();
            $requestSelect = 'SELECT `tracking_number`, `tracking_url` FROM `' . _DB_PREFIX_ . 'order_carrier` WHERE `id_order` = ' . $id_order . ' LIMIT 1';
            $resultSelect = $db->executeS($requestSelect);


            if (!empty($resultSelect[0])) {
                $existingTrackNrs = explode(',', $resultSelect[0]['tracking_number']);
                $existingTrackNrs[] = $trackingNumber;
                $uniqueTrackNrs = array_unique($existingTrackNrs);
                $newTrackNrs = implode(',', $uniqueTrackNrs);

                $existingTrackUrl = explode(',', $resultSelect[0]['tracking_url'] ?? '');
                $existingTrackUrl[] = $trackingUrl;
                $uniqueTrackUrl = array_unique($existingTrackUrl);
                $newTrackUrls = implode(',', $uniqueTrackUrl);
            } else {
                $newTrackNrs = implode(',', [$trackingNumber]);
                $newTrackUrls = implode(',', [$trackingUrl]);
            }

            $db->update('order_carrier', ['tracking_number' => pSQL($newTrackNrs),'tracking_url' => pSQL($newTrackUrls)], 'id_order = ' . $id_order, 1, true);
        }
    }

    /**
     * Change state of orders.
     * @param $orders //array of orders
     * @param $state //new state to be set
     * @return bool
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function setNewStateForOrders($orders, $state): bool
    {
        //get order object for each order and change status
        foreach ($orders as $order) {
            if (in_array($order['id_order'], $this->ordersOk)) {
                $orderObject = new Order((int)$order['id_order']);
                $orderObject->setCurrentState((int)$state);
            }
        }
        if (Tools::getIsset('connected_orders')) {
            $connectedOrders = Tools::getValue('connected_orders');
            if (is_array($connectedOrders)) {
                //get order object for each order and change status
                foreach ($connectedOrders as $order) {
                    $orderObject = new Order((int)$order);
                    $shippingData = $orderObject->getShipping();
                    if ((int)$shippingData[0]['id_carrier'] === $this->addedSelectCarrier) {
                        //toevoeging
                        $state = $this->addedSelectStatus;
                        $orderObject->setCurrentState($state);
                    }

                    if ((int)$shippingData[0]['id_carrier'] === $this->selectCarrier) {
                        //verzending
                        $state = $this->updateStatus;
                        $orderObject->setCurrentState($state);
                    }
                }
            }
        }
        return true;
    }

    /**
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function dagafsluiting(): void
    {
        try {
            // Get shipping list via API
            $response = $this->makeApiRequest($this->apiShippingListEndpoint);

            if (isset($response['verzendlijst'])) {
                $shippingList = $response['verzendlijst'];
                file_put_contents(str_replace('private_html', 'public_html',
                        $_SERVER['DOCUMENT_ROOT']) . '/upload/pakbonnen/verzendlijst_' . time() . '.pdf',
                    base64_decode($shippingList));
            }

            // Send orders via API
            $this->makeApiRequest($this->apiOrderEndpoint . '/send', [], 'POST');

        } catch (Exception $e) {
            die(sprintf("Error met %s en melding: %s<br/>", $e->getCode(), $e->getMessage()));
        }

        // Update order statuses
        if ($this->updateBool) {
            // Orders selecteren die met eerdere acties op 'Ligt klaar voor verzenden' staan (of andere update_status)
            $orders = $this->getOrders($this->updateStatus, $this->selectCarrier);
            // All added to order orders
            $ordersAdded = $this->getOrders($this->addedSelectStatus, $this->addedSelectCarrier);
            $ordersAddedShipped = $this->getOrders($this->updateStatus, $this->addedSelectCarrier);
            $allOrders = array_merge($orders, $ordersAdded, $ordersAddedShipped);

            foreach ($allOrders as $order) {
                $this->ordersOk[] = $order['id_order'];
            }

            $this->setNewStateForOrders($allOrders, $this->statusShipped);
        }
    }
}



