<?php

declare(strict_types=1);

namespace MsThemeConfig\Class;

use AllowDynamicProperties;
use Carrier;
use Configuration;
use Context;
use Db;
use DbQuery;
use Employee;
use Exception;
use mysqli_result;
use Order;
use PDOStatement;
use PrestaShopDatabaseException;
use PrestaShopException;
use stdClass;
use Tools;

/**
 * Class ExportOrders.
 */
#[AllowDynamicProperties]
class ExportOrdersMultipleCollies
{
    // Verzonden status waar de orders na dagafsluiting op worden gezet
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
    public int $packageLaneEmployee1;
    public int $packageLaneEmployee2;
    public int $packageLaneEmployee3;
    public int $selectCarrier;
    public int $selectStatus;
    public int $statusShipped = 4;
    public int $updateStatus;

    public ?int $idLang;
    public ?int $idOrder;
    public ?int $idShop;
    public ?int $idShopGroup;

    public string $afZender;
    public string $afzenderHuisnr;
    public string $afzenderLand;
    public string $afzenderNaam2;
    public string $afzenderNaam;
    public string $afzenderPlaats;
    public string $afzenderPostcode;
    public string $afzenderStraat;
    public string $afzenderTelefoon;
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
    private bool $onlyChangeOrderStatusValidatedOrders;

    /**
     * @param $id_order
     * @param array $collies
     */
    public function __construct($id_order, array $collies = [], bool $prepareLabels = true)
    {
        $this->onlyChangeOrderStatusValidatedOrders = false;

        $this->idOrder = (int) $id_order;
        $this->debug = false;
        $this->collies = $collies;
        $this->context = Context::getContext();
        $this->ordersOk = [];
        $this->idLang = (int) $this->context->language->id;
        if (empty($this->idLang)) {
            $this->idLang = (int) Configuration::get('PS_LANG_DEFAULT');
        }
        $this->idShop = (int) $this->context->shop->id;
        if (empty($this->idShop)) {
            $this->idShop = (int) Configuration::get('PS_SHOP_DEFAULT');
        }
        $this->idShopGroup = (int) $this->context->shop->id_shop_group;
        if (empty($this->idShopGroup)) {
            $this->idShopGroup = (int) Configuration::get('PS_SHOP_GROUP_DEFAULT');
        }
        $this->statusShipped = (int) Configuration::get('KOOPMANORDEREXPORT_STATUS_TRANSFERRED', $this->idLang, $this->idShopGroup, $this->idShop);
        $folder = Configuration::get('KOOPMANORDEREXPORT_LABELS_FOLDER', $this->idLang, $this->idShopGroup, $this->idShop);
        $this->labelsFolder = str_replace('private_html', 'public_html', $_SERVER['DOCUMENT_ROOT'] . '/upload/' . $folder);

        $this->packageLaneEmployee1 = (int) $this->getConfig('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_1_PROFILE');
        $this->packageLaneEmployee2 = (int) $this->getConfig('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_2_PROFILE');
        $this->packageLaneEmployee3 = (int) $this->getConfig('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_3_PROFILE');

        $this->selectStatus = (int) $this->getConfig('KOOPMANORDEREXPORT_SELECT_STATUS');
        // Stores id_reference in config
        $this->selectCarrier = (int) $this->getConfig('KOOPMANORDEREXPORT_SELECT_CARRIER');

        // Stores id_reference in config
        $this->addedSelectCarrier = (int) $this->getConfig('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_CARRIER');
        $this->addedSelectStatus = (int) $this->getConfig('KOOPMANORDEREXPORT_SELECT_ADDEDORDER_STATUS');

        $this->updateBool = (bool) $this->getConfig('KOOPMANORDEREXPORT_UPDATE_BOOL');
        $this->updateStatus = (int) $this->getConfig('KOOPMANORDEREXPORT_UPDATE_STATUS');

        // Update API configuration
        $this->apiBaseUrl = $this->getConfig('KOOPMANORDEREXPORT_SOAP_URL');

        $this->apiUserName = $this->getConfig('KOOPMANORDEREXPORT_API_USERNAME');
        $this->apiPass = $this->getConfig('KOOPMANORDEREXPORT_API_PASSWORD');
        $this->apiDepot = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_DEPOT');
        $this->apiVerlader = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_VERLADER');

        $this->apiAuthEndpoint = '/login/';
        $this->apiOrderEndpoint = '/shipments/shipment';
        $this->apiAddressEndpoint = '/addresses/address';
        $this->apiShippingListEndpoint = '/shipments';
        $this->apiShippingStatusListEndpoint = '/shipments/statuses';
        $this->apiDefaultStatusListEndpoint = '/definitions/';
        $this->apiShipmentStatusByTrackingEndpoint = '/shipments/shipment_status/transport_number';

        $this->afZender = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDER');
        $this->afzenderNaam = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM');
        $this->afzenderNaam2 = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM2');
        $this->afzenderStraat = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERSTRAAT');
        $this->afzenderHuisnr = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERHUISNR');
        $this->afzenderPostcode = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPOSTCODE');
        $this->afzenderPlaats = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPLAATS');
        $this->afzenderTelefoon = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERTELEFOON') ?: '0900-2502500';
        $this->afzenderLand = 'NL';
        if ($prepareLabels) {
            $this->prepareLabelsFolder();
        }

        // Initialize JWT token
        $this->apiToken = '';
        $this->tokenExpiry = 0;

        $this->templateRenderer = new KoopmanTemplateRenderer();
    }

    /**
     * @return false|string|void
     */
    public function getShipmentStatus()
    {
        try {
            $db = Db::getInstance();
            $sql = new DbQuery();
            $sql->select('*');
            $sql->from('order_carrier', 'oc');
            $sql->where('oc.id_order = ' . (int) $this->idOrder);

            $result = $db->executeS($sql);
            if ($result) {
                $records = explode(',', $result[0]['tracking_number']);
                $transportResult = [];

                foreach ($records as $transportNumber) {
                    if (!empty($transportNumber)) {
                        $date = date('Y-n-j');
                        $transportData = $this->makeApiRequest($this->apiShippingStatusListEndpoint . '/' . $transportNumber . '/' . $date, [], 'GET');
                        $transportResult[$transportNumber] = $transportData;
                    }
                }

                return json_encode($transportResult, 1);
            }

            return json_encode([]);
        } catch (Exception $e) {
            die(sprintf('Error met %s en melding: error - %s<br/>', $e->getCode(), $e->getMessage()));
        }
    }

    /**
     * Handle API error response
     *
     * @param string $errorCode The error code from the API
     * @param array $errorDetails Additional error details
     *
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
     *
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
            $code = '<?php' . PHP_EOL;
            $code .= 'foreach(glob("*.zpl") as $filename){' . PHP_EOL;
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
            $code .= '?>';
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
        $lane_2 = $this->packageLaneEmployee2;
        $lane_3 = $this->packageLaneEmployee3;

        if (!isset($this->context->employee) || !($this->context->employee instanceof Employee) || $this->context->employee->id === null) {
            return $this->labelsFolder . '/lane_1';
        }

        return match ($this->context->employee->id) {
            $lane_2 => $this->labelsFolder . '/lane_2',
            $lane_3 => $this->labelsFolder . '/lane_3',
            default => $this->labelsFolder . '/lane_1',
        };
    }

    /** Authenticate before reserving a return shipment; this request cannot book anything. */
    public function authenticate(): void
    {
        $this->getAuthToken();
    }

    /**
     * Get JWT token for API authentication
     *
     * @return string
     *
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
            'password' => $this->apiPass,
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
            'Accept: application/json',
        ]);

        $response = curl_exec($ch);
        if ($response === false) {
            $error = curl_error($ch);
            throw new Exception('cURL error: ' . $error);
        }
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            throw new Exception('Authentication failed with status code: ' . $httpCode . ' and response: ' . $response);
        }

        $tokenData = json_decode($response, true);
        if (!isset($tokenData['access_token'])) {
            throw new Exception('Invalid token response: ' . $response);
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
     *
     * @return array
     *
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
            'Authorization: Bearer ' . $token,
        ]);

        $response = curl_exec($ch);
        if ($response === false) {
            $error = curl_error($ch);
            throw new Exception('cURL error: ' . $error);
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode < 200 || $httpCode >= 300) {
            throw new Exception('API request failed with status code: ' . $httpCode . ' and response: ' . $response);
        }

        return json_decode($response, true);
    }

    /**
     * Make API request and return http_code + decoded body without throwing on non-2xx.
     * Used when a non-2xx response is meaningful (e.g. 406 = already shipped).
     *
     * @param string $endpoint
     * @param array $data
     * @param string $method
     *
     * @return array ['http_code' => int, 'data' => array|null]
     *
     * @throws Exception
     */
    public function makeApiRequestRaw(string $endpoint, array $data = [], string $method = 'GET'): array
    {
        $token = $this->getAuthToken();
        $ch = curl_init($this->apiBaseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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
            'Authorization: Bearer ' . $token,
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            $error = curl_error($ch);
            throw new Exception('cURL error: ' . $error);
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return [
            'http_code' => $httpCode,
            'data' => json_decode($response, true),
        ];
    }

    /**
     * Get address information from API
     *
     * @param array $address
     *
     * @return array
     */
    private function getAddressNL(array $address): array
    {
        try {
            $apiKey = 'JNtOUInXJD27nRgH';
            // Initialize API parameters for address validation
            $params = [
                'authKey' => $apiKey,
                'postalCode' => $address['postalcode'],
                'streetNumberAndPremise' => $address['housenumber'],
            ];

            // First try exact address lookup
            $apiUrl = 'https://api.pro6pp.nl/v2/autocomplete/nl?' . http_build_query(array_filter($params));

            $curl = curl_init();
            curl_setopt_array($curl, [
                CURLOPT_URL => $apiUrl,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_HTTPHEADER => [
                    'X-Api-Key: ' . $apiKey,
                    'Accept: application/json',
                ],
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_TIMEOUT => 10,
            ]);
            $result = curl_exec($curl);
            $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            curl_close($curl);

            $data = json_decode($result, true);
            $addresses = ['postcode' => [], 'street' => [], 'city' => []];

            // If exact lookup fails or returns errors, try all suggestion types simultaneously
            if ($httpCode !== 200 || isset($data['errors']) || empty($data['street'])) {
                // Get postal code suggestions
                $params = [
                    'authKey' => $apiKey,
                    'postalCode' => $address['postalcode'],
                ];
                $suggestUrl = 'https://api.pro6pp.nl/v2/suggest/nl/postalCode?' . http_build_query($params);

                $curl = curl_init();
                curl_setopt_array($curl, [
                    CURLOPT_URL => $suggestUrl,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_HTTPHEADER => [
                        'X-Api-Key: ' . $apiKey,
                        'Accept: application/json',
                    ],
                    CURLOPT_SSL_VERIFYPEER => true,
                    CURLOPT_TIMEOUT => 10,
                ]);
                $suggestResult = curl_exec($curl);
                curl_close($curl);

                if ($suggestResult) {
                    $suggestions = json_decode($suggestResult, true);
                    if (!empty($suggestions)) {
                        foreach ($suggestions as $suggestion) {
                            $addresses['postcode'][] = [
                                'value' => $suggestion['postalCode'],
                                'data-postcode' => $suggestion['postalCode'],
                                'data-city' => $suggestion['settlement'],
                                'label' => $suggestion['postalCode'] . ' | ' . $suggestion['settlement'],
                            ];

                            $addresses['city'][] = [
                                'value' => $suggestion['settlement'],
                                'data-postcode' => $suggestion['postalCode'],
                                'data-city' => $suggestion['settlement'],
                                'label' => $suggestion['settlement'] . ' | ' . $suggestion['postalCode'],
                            ];

                            $params = [
                                'authKey' => $apiKey,
                                'postalCode' => $suggestion['postalCode'],
                                'settlement' => $suggestion['settlement'],
                            ];
                            $streetSuggestUrlPost = 'https://api.pro6pp.nl/v2/suggest/nl/street?' . http_build_query($params);

                            $curlPost = curl_init();
                            curl_setopt_array($curlPost, [
                                CURLOPT_URL => $streetSuggestUrlPost,
                                CURLOPT_RETURNTRANSFER => true,
                                CURLOPT_HTTPHEADER => [
                                    'X-Api-Key: ' . $apiKey,
                                    'Accept: application/json',
                                ],
                                CURLOPT_SSL_VERIFYPEER => true,
                                CURLOPT_TIMEOUT => 10,
                            ]);
                            $streetPostSuggestResult = curl_exec($curlPost);
                            curl_close($curlPost);

                            if ($streetPostSuggestResult) {
                                $streetPostSuggestions = json_decode($streetPostSuggestResult, true);
                                foreach ($streetPostSuggestions as $streetPost) {
                                    if (array_key_exists('street', $streetPost)) {
                                        $code = '';
                                        if (array_key_exists('postalCodes', $streetPost)) {
                                            $code = implode(', ', $streetPost['postalCodes']);
                                        } elseif (array_key_exists('postalCode', $streetPost)) {
                                            $code = $streetPost['postalCode'];
                                        }

                                        $addresses['street'][] = [
                                            'value' => $streetPost['street'],
                                            'data-postcode' => $code,
                                            'data-city' => $streetPost['settlement'],
                                            'data-house_numbers' => null,
                                            'label' => $streetPost['street'] . ' | ' . $code,
                                        ];

                                        $addresses['postcode'][] = [
                                            'value' => $code,
                                            'data-postcode' => $code,
                                            'data-city' => $streetPost['settlement'],
                                            'label' => $code . ' | ' . $streetPost['street'],
                                        ];
                                    }
                                }
                            }
                        }
                    }
                }
                //        dd($addresses);
                // Get street suggestions if street is provided
                if (!empty($address['address1'])) {
                    $params = [
                        'authKey' => $apiKey,
                        'street' => $address['address1'],
                    ];
                    $streetSuggestUrl = 'https://api.pro6pp.nl/v2/suggest/nl/street?' . http_build_query($params);

                    $curl = curl_init();
                    curl_setopt_array($curl, [
                        CURLOPT_URL => $streetSuggestUrl,
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_HTTPHEADER => [
                            'X-Api-Key: ' . $apiKey,
                            'Accept: application/json',
                        ],
                        CURLOPT_SSL_VERIFYPEER => true,
                        CURLOPT_TIMEOUT => 10,
                    ]);
                    $streetSuggestResult = curl_exec($curl);
                    curl_close($curl);

                    if ($streetSuggestResult) {
                        $streetSuggestions = json_decode($streetSuggestResult, true);
                        if (!empty($streetSuggestions)) {
                            foreach ($streetSuggestions as $suggestion) {
                                // Get house number ranges for this street
                                if (array_key_exists('postalCodes', $suggestion)) {
                                    foreach ($suggestion['postalCodes'] as $postalCode) {
                                        $params = [
                                            'authKey' => $apiKey,
                                            'street' => $suggestion['street'],
                                            'postalCode' => $postalCode,
                                            'settlement' => $suggestion['settlement'],
                                        ];

                                        // Make API call to get house number ranges
                                        $houseNumberUrl = 'https://api.pro6pp.nl/v2/suggest/nl/streetNumber?' . http_build_query($params);

                                        $curl = curl_init();
                                        curl_setopt_array($curl, [
                                            CURLOPT_URL => $houseNumberUrl,
                                            CURLOPT_RETURNTRANSFER => true,
                                            CURLOPT_HTTPHEADER => [
                                                'X-Api-Key: ' . $apiKey,
                                                'Accept: application/json',
                                            ],
                                            CURLOPT_SSL_VERIFYPEER => true,
                                            CURLOPT_TIMEOUT => 10,
                                        ]);

                                        $houseNumberResult = curl_exec($curl);
                                        curl_close($curl);

                                        if ($houseNumberResult) {
                                            $houseNumbers = json_decode($houseNumberResult, true);

                                            // Process house numbers to create ranges
                                            $evenNumbers = [];
                                            $oddNumbers = [];

                                            foreach ($houseNumbers as $number) {
                                                if (isset($number['streetNumber'])) {
                                                    if ($number['streetNumber'] % 2 == 0) {
                                                        $evenNumbers[] = $number['streetNumber'];
                                                    } else {
                                                        $oddNumbers[] = $number['streetNumber'];
                                                    }
                                                }
                                            }

                                            // Create range string
                                            $ranges = [];
                                            if (!empty($oddNumbers)) {
                                                $ranges[] = min($oddNumbers) . '-' . max($oddNumbers);
                                            }
                                            if (!empty($evenNumbers)) {
                                                $ranges[] = min($evenNumbers) . '-' . max($evenNumbers);
                                            }

                                            $houseNumberRange = implode(' | ', $ranges);
                                        } else {
                                            $houseNumberRange = '0'; // Default range if API call fails
                                        }
                                        $houseNumberRange . 'voor ' . $postalCode;
                                    }

                                    $code = '';
                                    if (array_key_exists('postalCodes', $suggestion)) {
                                        $code = implode(', ', $suggestion['postalCodes']);
                                    } elseif (array_key_exists('postalCode', $suggestion)) {
                                        $code = $suggestion['postalCode'];
                                    }

                                    $addresses['street'][] = [
                                        'value' => $suggestion['street'],
                                        'data-postcode' => $code,
                                        'data-city' => $suggestion['settlement'],
                                        'data-house_numbers' => $houseNumberRange ?? 0,
                                        'label' => $suggestion['street'] . ' | ' . $suggestion['settlement'],
                                    ];
                                } else {
                                    $params = [
                                        'authKey' => $apiKey,
                                        'street' => $suggestion['street'],
                                        'settlement' => $suggestion['settlement'],
                                    ];

                                    // Make API call to get house number ranges
                                    $houseNumberUrl = 'https://api.pro6pp.nl/v2/suggest/nl/streetNumber?' . http_build_query($params);

                                    $curl = curl_init();
                                    curl_setopt_array($curl, [
                                        CURLOPT_URL => $houseNumberUrl,
                                        CURLOPT_RETURNTRANSFER => true,
                                        CURLOPT_HTTPHEADER => [
                                            'X-Api-Key: ' . $apiKey,
                                            'Accept: application/json',
                                        ],
                                        CURLOPT_SSL_VERIFYPEER => true,
                                        CURLOPT_TIMEOUT => 10,
                                    ]);

                                    $houseNumberResult = curl_exec($curl);
                                    curl_close($curl);

                                    if ($houseNumberResult) {
                                        $houseNumbers = json_decode($houseNumberResult, true);

                                        // Process house numbers to create ranges
                                        $evenNumbers = [];
                                        $oddNumbers = [];

                                        foreach ($houseNumbers as $number) {
                                            if (isset($number['streetNumber'])) {
                                                if ($number['streetNumber'] % 2 == 0) {
                                                    $evenNumbers[] = $number['streetNumber'];
                                                } else {
                                                    $oddNumbers[] = $number['streetNumber'];
                                                }
                                            }
                                        }

                                        // Create range string
                                        $ranges = [];
                                        if (!empty($oddNumbers)) {
                                            $ranges[] = min($oddNumbers) . '-' . max($oddNumbers);
                                        }
                                        if (!empty($evenNumbers)) {
                                            $ranges[] = min($evenNumbers) . '-' . max($evenNumbers);
                                        }

                                        $houseNumberRange = implode('|', $ranges);
                                    } else {
                                        $houseNumberRange = '0'; // Default range if API call fails
                                    }

                                    $code = '';
                                    if (array_key_exists('postalCodes', $suggestion)) {
                                        $code = implode(', ', $suggestion['postalCodes']);
                                    } elseif (array_key_exists('postalCode', $suggestion)) {
                                        $code = $suggestion['postalCode'];
                                    }

                                    $addresses['street'][] = [
                                        'value' => $suggestion['street'],
                                        'data-postcode' => $code,
                                        'data-city' => $suggestion['settlement'],
                                        'data-house_numbers' => $houseNumberRange,
                                        'label' => $suggestion['street'] . ' | ' . $suggestion['settlement'],
                                    ];

                                    $addresses['city'][] = [
                                        'value' => $suggestion['settlement'],
                                        'data-postcode' => $code,
                                        'data-city' => $suggestion['settlement'],
                                        'label' => $suggestion['settlement'] . ' | ' . $code,
                                    ];
                                }
                            }
                        }
                    }
                }

                // Get city suggestions
                if (!empty($address['city'])) {
                    $params = [
                        'authKey' => $apiKey,
                        'settlement' => $address['city'],
                    ];
                    $citySuggestUrl = 'https://api.pro6pp.nl/v2/suggest/nl/settlement?' . http_build_query($params);

                    $curl = curl_init();
                    curl_setopt_array($curl, [
                        CURLOPT_URL => $citySuggestUrl,
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_HTTPHEADER => [
                            'X-Api-Key: ' . $apiKey,
                            'Accept: application/json',
                        ],
                        CURLOPT_SSL_VERIFYPEER => true,
                        CURLOPT_TIMEOUT => 10,
                    ]);
                    $citySuggestResult = curl_exec($curl);
                    curl_close($curl);

                    if ($citySuggestResult) {
                        $citySuggestions = json_decode($citySuggestResult, true);
                        if (!empty($citySuggestions)) {
                            foreach ($citySuggestions as $suggestion) {
                                $codes = '';
                                $code = '';
                                if (array_key_exists('postalCodes', $suggestion)) {
                                    $codes = implode(', ', $suggestion['postalCodes']);
                                } elseif (array_key_exists('postalCode', $suggestion)) {
                                    $code = $suggestion['postalCode'];
                                } else {
                                    if (array_key_exists('lat', $suggestion)) {
                                        $paramsP = [
                                            'authKey' => $apiKey,
                                            'lat' => $suggestion['lat'],
                                            'lng' => $suggestion['lng'],
                                        ];

                                        $cityPostcodesUrl = 'https://api.pro6pp.nl/v2/reverse/global?' . http_build_query($paramsP);

                                        $curlP = curl_init();
                                        curl_setopt_array($curlP, [
                                            CURLOPT_URL => $cityPostcodesUrl,
                                            CURLOPT_RETURNTRANSFER => true,
                                            CURLOPT_HTTPHEADER => [
                                                'X-Api-Key: ' . $apiKey,
                                                'Accept: application/json',
                                            ],
                                            CURLOPT_SSL_VERIFYPEER => true,
                                            CURLOPT_TIMEOUT => 10,
                                        ]);
                                        $cityPostcodesResult = curl_exec($curlP);

                                        curl_close($curlP);

                                        if ($cityPostcodesResult) {
                                            $cityPostcodeSuggestions = json_decode($cityPostcodesResult, true);
                                            if (!array_key_exists('error_id', $cityPostcodeSuggestions)) {
                                                //        dd($cityPostcodeSuggestions);
                                                if (array_key_exists('postcodes', $cityPostcodeSuggestions)) {
                                                    $codes = implode(', ', $cityPostcodeSuggestions['postcodes']);
                                                }
                                            }
                                        }
                                    }
                                }

                                $addresses['city'][] = [
                                    'value' => $suggestion['settlement'],
                                    'label' => $suggestion['settlement'] . ' | ' . $codes,
                                ];

                                $addresses['postcode'][] = [
                                    'value' => $code,
                                    'data-postcode' => $code,
                                    'data-city' => $suggestion['settlement'],
                                    'label' => $code . ' | ' . $suggestion['settlement'],
                                ];
                            }
                        }
                    }
                }

                if (count($addresses['postcode']) > 0 || count($addresses['street']) > 0 || count($addresses['city']) > 0) {
                    return [
                        'multiple' => true,
                        'suggestions' => $addresses,
                        'addresses' => null,
                    ];
                }
            }

            // If we have a valid result from the original lookup
            if ($httpCode === 200 && !isset($data['errors']) && !empty($data['street'])) {
                return [
                    'multiple' => false,
                    'suggestions' => null,
                    'address' => [
                        'type' => 'delivery',
                        'address1' => $data['street'],
                        'postalcode' => $data['postalCode'],
                        'housenumber' => $data['streetNumber'],
                        'housenumber_extension' => $data['premise'] ?? '',
                        'city' => $data['settlement'],
                        'country_code' => 'NL',
                    ],
                ];
            }

            throw new Exception('No valid address or suggestions found');
        } catch (Exception $e) {
            throw new Exception(sprintf('Pro6PP API Error: %s', $e->getMessage()));
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

        // Update orders when selected and uploaded
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
     *
     * @return array of orders
     *
     * @throws PrestaShopDatabaseException
     */
    private function getOrders($state, $carrier, int $max = 1000, $id_order = null): array
    {
        $sql = new DbQuery();
        $sql->select('o.*, c.*, a.*, co.*, car.name as carrier_name, at.reference as added_to_reference, at.id_order as added_to_id,
     GROUP_CONCAT(aw.reference) as added_with_reference, GROUP_CONCAT(aw.id_order) as added_with_id');
        $sql->from('orders', 'o');
        $sql->leftJoin('customer', 'c', 'c.id_customer = o.id_customer');
        $sql->leftJoin('address', 'a', 'a.id_address = o.id_address_delivery');
        $sql->leftJoin('country', 'co', 'co.id_country = a.id_country');
        $sql->leftJoin('carrier', 'car', 'car.id_carrier = o.id_carrier');
        $sql->leftJoin('orders', 'at', 'at.reference = o.added_to_order');
        $sql->leftJoin('orders', 'aw', 'aw.added_to_order = o.reference');
        if (isset($id_order)) { // als id is meegegeven dan maakt state en carrier niet meer uit
            $sql->where('o.id_order = ' . $id_order);
        } else {
            $sql->where('o.current_state IN (' . $state . ')');
            // Select by carrier reference so it survives carrier updates
            if (str_contains((string)$carrier, ',')) {
                $sql->where('car.id_reference IN (' . $carrier . ')');
            } else {
                $sql->where('car.id_reference = ' . (int) $carrier);
            }
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
     *
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
            if (!empty($row['added_to_reference']) && !empty($row['added_to_id']) && (int) Tools::getValue('added_check') != 1) {
                // heeft toegevoegde orders
                $linkedIdArray = explode(',', (string) $row['added_to_id']);
                $linkedReferencesArray = explode(',', (string) $row['added_to_reference']);
                $this->redirect = false;
                die($this->getOutputAddedToOrder($linkedIdArray, $linkedReferencesArray));
            }
            if (!empty($row['added_with_reference']) && !empty($row['added_with_id']) && (int) Tools::getValue('added_check') != 1) {
                // heeft toegevoegde orders
                $linkedIdArray = explode(',', (string) $row['added_with_id']);
                $linkedReferencesArray = explode(',', (string) $row['added_with_reference']);
                $this->redirect = false;
                die($this->getOutputAddedOrders($linkedIdArray, $linkedReferencesArray));
            }

            // Prepare shipping data
            $shippingData = $this->prepareShippingData($row, $orderReference, $collies);

            // Validate address for NL orders
            if (strtolower($shippingData['addresses'][0]['country_code']) == 'nl') {
                try {
                    $addresses = $this->getAddressNL($shippingData['addresses'][0]);
                    if (!empty($addresses['suggestions'])) {
                        $klant_straat = $shippingData['addresses'][0]['address1'];
                        $klant_plaats = $shippingData['addresses'][0]['city'];
                        $klant_postcode = $shippingData['addresses'][0]['postalcode'];
                        $normalizedKlantPostcode = strtoupper(str_replace(' ', '', $klant_postcode));

                        $suggestionOptions = $addresses['suggestions'];
                        // Check postal code first
                        $validPostcode = false;

                        if (!empty($suggestionOptions['postcode'])) {
                            foreach ($suggestionOptions['postcode'] as $postcodeSuggestion) {
                                if (strtoupper(str_replace(' ', '', $postcodeSuggestion['value'])) === $normalizedKlantPostcode) {
                                    $validPostcode = true;
                                    break;
                                }
                            }
                        }

                        // If postal code is invalid, show suggestions immediately
                        if (!$validPostcode && !empty($suggestionOptions['postcode']) && (int) Tools::getValue('updateAddress') != 1) {
                            $this->redirect = false;

                            die($this->getOutputWrongPostcode(
                                $klant_straat,
                                (object) $shippingData['addresses'][0],
                                $klant_plaats,
                                $suggestionOptions,
                                (string) $row['house_number'],
                                (string) $row['house_number_extension']
                            ));
                        }

                        // If postal code is valid but street/city don't match, show those suggestions
                        $validStreetCity = false;
                        $normalizedKlantStraat = $this->sanitizeTextForTransmission($klant_straat);
                        $normalizedKlantPlaats = $this->sanitizeTextForTransmission($klant_plaats);

                        if ($validPostcode && !empty($suggestionOptions['street'])) {
                            foreach ($suggestionOptions['street'] as $streetSuggestion) {
                                $normalizedSuggestionStreet = $this->sanitizeTextForTransmission($streetSuggestion['value']);
                                if ($normalizedSuggestionStreet !== $normalizedKlantStraat) {
                                    continue;
                                }
                                // Street matches — check if city matches any suggestion
                                foreach ($suggestionOptions['city'] as $citySuggestion) {
                                    if ($this->sanitizeTextForTransmission($citySuggestion['value']) === $normalizedKlantPlaats) {
                                        $validStreetCity = true;
                                        break 2;
                                    }
                                }
                            }

                            if (!$validStreetCity && (int) Tools::getValue('updateAddress') != 1) {
                                $this->redirect = false;
                                die($this->getOutputWrongPostcode(
                                    $klant_straat,
                                    (object) $shippingData['addresses'][0],
                                    $klant_plaats,
                                    $suggestionOptions,
                                    (string) $row['house_number'],
                                    (string) $row['house_number_extension']
                                ));
                            }
                        }
                    } elseif (!empty($addresses['address'])) {
                        // Valid address found, update shipping data
                        $shippingData['addresses'][0]['address1'] = $this->sanitizeTextForTransmission($addresses['address']['address1']);
                        $shippingData['addresses'][0]['city'] = $this->sanitizeTextForTransmission($addresses['address']['city']);
                        $shippingData['addresses'][0]['postalcode'] = $addresses['address']['postalcode'];
                    }
                } catch (Exception $e) {
                    //        dd($e);
                    if ((int) $e->getCode() == 0) {
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
                        $trackingNumber = 'T' . substr($trackingNumber, 1); // T98
                        $this->addTrackingNumberToOrder($orderId, $trackingNumber, $trackingUrl);

                        // Get and save label
                        if (isset($resp['labels'])) {
                            $labels = $resp['labels'];
                            $this->redirect = true;
                            $contactInfo = $this->buildContactInfo($shippingData['addresses'][0]['contact']);
                            $deliveryMessage = (string) ($shippingData['text_messages'][0]['remarks'] ?? '');

                            if (array_key_exists('label_content', $labels)) {
                                // Single label_content may contain multiple collie blocks — split and save individually
                                $zplContent = base64_decode($labels['label_content']);
                                $this->saveZplCollies($zplContent, $orderId, $contactInfo, $deliveryMessage);
                            } else {
                                for ($i = 0; $i < count($labels); ++$i) {
                                    $zplContent = base64_decode($labels[$i]['label_content']);
                                    $this->saveZplCollies($zplContent, $orderId, $contactInfo, $deliveryMessage);
                                }
                            }
                        }
                    }
                } catch (Exception $e) {
                    if (session_status() == PHP_SESSION_NONE) {
                        session_start();
                    }
                    $_SESSION['koopmanError'] = $e->getMessage();
                    die(sprintf('Error met %s en melding: %s<br/>', $e->getCode(), $e->getMessage()));
                }

                // Debug mode - delete the order if in debug mode
                if ($this->debug && isset($resp['transport_number'])) {
                    try {
                        $this->makeApiRequest($this->apiOrderEndpoint . '/' . $resp['transport_number'], [], 'DELETE');
                    } catch (Exception $e) {
                        die(sprintf('Error met %s en melding: %s<br/>', $e->getCode(), $e->getMessage()));
                    }
                }
            }
        }
    }

    /**
     * Build a contact info string from the contact array for use on the label.
     */
    private function buildContactInfo(array $contact): string
    {
        $parts = [];
        foreach (['name', 'phonenumber', 'mobile'] as $key) {
            $value = trim((string) ($contact[$key] ?? ''));
            if ($value !== '' && !in_array($value, $parts, true)) {
                $parts[] = $value;
            }
        }

        return implode(' | ', $parts);
    }

    /**
     * Configure the delivery-message field in the downloaded carrier template.
     *
     * The label is designed in portrait coordinates and printed rotated. Its
     * message band runs from y=240 to y=1189, leaving about 900 dots of usable
     * line width. Font 0 is scalable, so five 28-dot lines also fit within the
     * 149-dot height of that band without the final line being overwritten.
     */
    private function configureLabelTextField(string $templateBlock): string
    {
        $fieldDefinitionPattern = '/\^(?:FO|FT)-?\d+,-?\d+(?:(?!\^FS).)*?\^FN%s(?:,[^\^]*)?\^FS/s';

        foreach ([23, 24] as $fieldNumber) {
            $pattern = sprintf($fieldDefinitionPattern, (string) $fieldNumber);
            $templateBlock = preg_replace($pattern, '', $templateBlock) ?? $templateBlock;
        }

        $customField = '^FO490,256^A0R,28,22^FB900,5,0,L,0^CI0^FR^FN25^FS';
        $fn25Pattern = sprintf($fieldDefinitionPattern, '25');
        $configuredTemplate = preg_replace($fn25Pattern, $customField, $templateBlock, 1, $replacementCount);
        if ($configuredTemplate !== null) {
            $templateBlock = $configuredTemplate;
        }

        // Keep custom text available if the carrier removes or moves FN25 in a future template.
        if ($replacementCount === 0) {
            $templateBlock = preg_replace('/\^XZ$/', $customField . '^XZ', $templateBlock, 1) ?? $templateBlock;
        }

        return $templateBlock;
    }

    /**
     * Normalize user-controlled text before placing it inside a ZPL ^FD field.
     */
    private function prepareLabelText(string $text, ?int $maximumLength = null): string
    {
        $text = str_replace(["\r", "\n", "\t"], ' ', trim($text));
        $text = preg_replace('/\s{2,}/', ' ', $text) ?? $text;

        if ($maximumLength !== null) {
            if (function_exists('mb_check_encoding') && function_exists('mb_substr') && mb_check_encoding($text, 'UTF-8')) {
                $text = mb_substr($text, 0, $maximumLength, 'UTF-8');
            } else {
                $text = substr($text, 0, $maximumLength);
            }
        }

        // These characters start ZPL commands or forced field-block line breaks.
        $text = str_replace(['^', '~', '\\'], [' ', ' ', '/'], $text);

        return trim(preg_replace('/\s{2,}/', ' ', $text) ?? $text);
    }

    /**
     * Build the wrapped FN25 value. Carrier delivery messages are limited to
     * 120 characters; contact details deliberately remain untruncated.
     */
    private function buildLabelText(string $deliveryMessage, string $contactInfo): string
    {
        $parts = [];
        $deliveryMessage = $this->prepareLabelText($deliveryMessage, 120);
        $contactInfo = $this->prepareLabelText($contactInfo);

        if ($deliveryMessage !== '') {
            $parts[] = $deliveryMessage;
        }
        if ($contactInfo !== '') {
            $parts[] = 'Klant contact: ' . $contactInfo;
        }

        // A forced break keeps contact details separate; ^FB wraps each part as needed.
        return implode('\&', $parts);
    }

    /**
     * Split a ZPL string into individual collie label files and save only new ones.
     *
     * The API returns all collies for a shipment on every call. Each collie block
     * contains a unique per-collie tracking number in ^FN19^FD{collie_tracking}^FS.
     * We use that as the filename so re-running only saves collies not yet on disk.
     *
     * The first ^XA...^XZ block is a template definition (^DF). It is prepended to
     * each collie file so the printer can recall it with ^XF.
     */
    private function saveZplCollies(
        string $zplContent,
        int $orderId,
        string $contactInfo = '',
        string $deliveryMessage = ''
    ): void
    {
        // Extract all ^XA...^XZ blocks (dot matches newline)
        preg_match_all('/\^XA.*?\^XZ/s', $zplContent, $matches);
        $blocks = $matches[0];

        if (empty($blocks)) {
            return;
        }

        // Separate template block (contains ^DF = Download Format) from label blocks
        $templateBlock = '';
        $labelBlocks = [];
        foreach ($blocks as $block) {
            if (strpos($block, '^DF') !== false) {
                $templateBlock = $block;
            } else {
                $labelBlocks[] = $block;
            }
        }

        // FN23 and FN24 occupy the same band. Replace them with one wrapping FN25 block.
        $templateBlock = $this->configureLabelTextField($templateBlock);

        // Persistent index: {trackingNumber: unixTimestamp} — entries older than 30 days are pruned.
        $indexPath = $this->getLaneFolder() . '/printed_collies.json';
        $printedCollies = [];
        if (file_exists($indexPath)) {
            $raw = json_decode(file_get_contents($indexPath), true) ?? [];
            // Migrate old flat-array format (["T98...","T98..."]) to keyed format
            if (isset($raw[0]) && is_string($raw[0])) {
                foreach ($raw as $t) {
                    $printedCollies[$t] = time();
                }
            } else {
                $printedCollies = $raw;
            }
        }

        // Prune entries older than 7 days (~700 entries max at 100 collies/day)
        $cutoff = time() - (7 * 86400);
        $printedCollies = array_filter($printedCollies, fn($ts) => $ts > $cutoff);

        $indexUpdated = false;
        foreach ($labelBlocks as $labelBlock) {
            // Extract per-collie tracking number from ^FN19^FD{tracking}^FS
            if (!preg_match('/\^FN19\^FD([^\^]+)\^FS/', $labelBlock, $m)) {
                continue;
            }
            $collieTracking = trim($m[1]);

            // Skip if already queued for printing (re-run scenario)
            if (isset($printedCollies[$collieTracking])) {
                continue;
            }

            // The carrier can truncate FN24 for its original one-line field. Prefer the complete
            // message sent to the API and only use FN24 as a fallback for older callers.
            // FN24 has no template position anymore and would render in the wrong spot.
            $labelDeliveryMessage = $deliveryMessage;
            if ($labelDeliveryMessage === ''
                && preg_match('/\^FN24(?:,[^\^]*)?(?:(?!\^FS).)*?\^FD(.*?)\^FS/s', $labelBlock, $dm)
            ) {
                $labelDeliveryMessage = trim($dm[1]);
            }
            $labelBlock = preg_replace(
                '/\^FN(?:23|24)(?:,[^\^]*)?(?:(?!\^FS).)*?\^FS/s',
                '',
                $labelBlock
            ) ?? $labelBlock;

            // Combine delivery message + contact info as one FN25 payload.
            // ZPL line break inside ^FB fields = \& (backslash-ampersand), NOT \n.
            $fn25Payload = $this->buildLabelText($labelDeliveryMessage, $contactInfo);
            // Replace existing ^FN25 field (API provides it empty); append only if absent.
            $fn25Field = '^FN25^FD' . $fn25Payload . '^FS';
            $labelBlockWithText = preg_replace_callback(
                '/\^FN25(?:,[^\^]*)?(?:(?!\^FS).)*?\^FS/s',
                static fn(array $match): string => $fn25Field,
                $labelBlock,
                1,
                $replacementCount
            );
            if ($labelBlockWithText !== null) {
                $labelBlock = $labelBlockWithText;
            }
            if ($replacementCount === 0) {
                $labelBlock = preg_replace('/\^XZ$/', $fn25Field . '^XZ', $labelBlock, 1) ?? $labelBlock;
            }

            $filePath = $this->getLaneFolder() . '/' . $collieTracking . '.zpl';
            $fileContent = $this->scaleZplForGK420d($templateBlock . PHP_EOL . $labelBlock);
            if (file_put_contents($filePath, $fileContent)) {
                $this->ordersOk[] = $orderId;
                $printedCollies[$collieTracking] = time();
                $indexUpdated = true;
            }
        }

        if ($indexUpdated) {
            file_put_contents($indexPath, json_encode($printedCollies));
        }
    }

    /**
     * Scale a ZPL string from 1184-dot (148 mm) width down to 832-dot (104 mm) for the ZTC GK420d.
     *
     * Rules applied:
     *  - ^PW / ^LL / ^LS are replaced with fixed GK420d values.
     *  - X-coordinates in ^FO, ^FT, ^LH and the width parameter of ^FB are scaled by 832/1184.
     *  - Y-coordinates, heights, bar-code module widths and all ^FN/^FD field data are left untouched.
     */
    private function scaleZplForGK420d(string $zpl): string
    {
        // Scaling temporarily disabled — returning raw ZPL from API as-is.
        // TODO: re-enable once correct source ^PW/^LL values are confirmed.
        return $zpl;

        // Derive scale from the source ^PW so the aspect ratio is always preserved.
        // Fallback to 1184 if ^PW is absent (source printer default).
        $sourcePW = 1184;
        if (preg_match('/\^PW(\d+)/', $zpl, $pwm)) {
            $sourcePW = (int) $pwm[1];
        }
        $scale = 832 / $sourcePW; // uniform — same factor for both axes

        // Derive target ^LL from source ^LL scaled by the same factor.
        $targetLL = 1199; // safe fallback: 150 mm @ 203 dpi
        if (preg_match('/\^LL(\d+)/', $zpl, $llm)) {
            $targetLL = (int) round((int) $llm[1] * $scale);
        }

        // Replace printer setup commands with GK420d-specific values.
        // If a command is absent, inject it directly after the first ^XA.
        $zpl = preg_replace('/\^PW\d+/', '^PW832', $zpl);
        $zpl = preg_replace('/\^LL\d+/', '^LL' . $targetLL, $zpl);
        $zpl = preg_replace('/\^LS-?\d+/', '^LS0', $zpl);

        if (!str_contains($zpl, '^PW')) {
            $zpl = preg_replace('/(\^XA)/', '$1' . "\n^PW832", $zpl, 1);
        }
        if (!str_contains($zpl, '^LL')) {
            $zpl = preg_replace('/(\^XA)/', '$1' . "\n^LL" . $targetLL, $zpl, 1);
        }

        // Scale ^FO x,y — uniform scale on both axes to preserve layout proportions.
        $zpl = preg_replace_callback('/\^FO(\d+),(\d+)/', function ($m) use ($scale) {
            return '^FO' . (int) round((int) $m[1] * $scale) . ',' . (int) round((int) $m[2] * $scale);
        }, $zpl);

        // Scale ^FT x,y  (Field Typeset — alternative to ^FO)
        $zpl = preg_replace_callback('/\^FT(\d+),(\d+)/', function ($m) use ($scale) {
            return '^FT' . (int) round((int) $m[1] * $scale) . ',' . (int) round((int) $m[2] * $scale);
        }, $zpl);

        // Scale ^LH x,y  (Label Home)
        $zpl = preg_replace_callback('/\^LH(\d+),(\d+)/', function ($m) use ($scale) {
            return '^LH' . (int) round((int) $m[1] * $scale) . ',' . (int) round((int) $m[2] * $scale);
        }, $zpl);

        // Scale ^FB width (horizontal measure only).
        $zpl = preg_replace_callback('/\^FB(\d+),/', function ($m) use ($scale) {
            return '^FB' . (int) round((int) $m[1] * $scale) . ',';
        }, $zpl);

        return $zpl;
    }

    /**
     * Prepare shipping data for API request
     *
     * @param array $row Order data
     * @param string $orderReference Order reference
     * @param array $collies Collies data
     *
     * @return array
     *
     * @throws PrestaShopDatabaseException
     */
    private function prepareShippingData(array $row, string $orderReference, array $collies = []): array
    {
        $shippingDate = date('d-m-Y');
        $koopmanFreeDays = ['01-05-2025', '05-05-2025', '29-05-2025', '09-06-2025', '05-05-2025', '21-06-2025'];

        while (in_array($shippingDate, $koopmanFreeDays)) {
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
        $orderMobile = $this->sanitizeTextForTransmission($row['phone_mobile']);
        $orderPhoneCombined = implode('|', array_filter([$orderMobile, $orderPhone], fn($v) => $v !== ''));
        $orderEmail = $this->sanitizeTextForTransmission($row['email']);

        // Get client message if available
        $msg = $this->getFirstClientMessage($row['id_order']);
        $instructie = !empty($msg) ? $msg[0]['message'] : '';

        // Prepare shipping data
        $shippingData = [
            'type' => 'T', // T = Stukgoed Levering
            'depot' => $this->apiDepot,
            'customer_number' => $this->apiVerlader,
            'date' => date('Y-m-d', strtotime($shippingDate)),
            'labels' => 'ZPL',
            'references' => [
                [
                    'type' => 'NRORDER',
                    'reference' => $orderReference,
                ],
            ],
            'addresses' => [
                [
                    'type' => 'delivery',
                    'name' => ucwords($orderFirstName) . ' ' . ucwords($orderLastName),
                    'name2' => $orderCompany,
                    'address1' => $orderAddress1,
                    'housenumber' => $orderHouseNumber . ' ' . $orderHouseNumberExt,
                    'postalcode' => $orderPostcode,
                    'city' => $orderCity,
                    'country_code' => $orderIsoCode,
                    'contact' => [
                        'language' => 'NL',
                        'name' => $orderFirstName . ' ' . $orderLastName,
                        'phonenumber' => $orderPhone,
                        'mobile' => $orderMobile,
                        'email_address' => $orderEmail,
                    ],
                ], [
                    'type' => 'consignor',
                    'name' => $this->afzenderNaam,
                    'name2' => $this->afzenderNaam2,
                    'address1' => $this->afzenderStraat,
                    'housenumber' => $this->afzenderHuisnr,
                    'postalcode' => $this->afzenderPostcode,
                    'city' => $this->afzenderPlaats,
                    'country_code' => $this->afzenderLand,
                    'contact' => [
                        'language' => 'NL',
                        'name' => $this->afzenderNaam . ' ' . $this->afzenderNaam2,
                        'phonenumber' => '0900-2502500',
                    ],
                ], [
                    'type' => 'loading',
                    'name' => $this->afzenderNaam,
                    'name2' => $this->afzenderNaam2,
                    'address1' => $this->afzenderStraat,
                    'housenumber' => $this->afzenderHuisnr,
                    'postalcode' => $this->afzenderPostcode,
                    'city' => $this->afzenderPlaats,
                    'country_code' => $this->afzenderLand,
                    'contact' => [
                        'language' => 'NL',
                        'name' => $this->afzenderNaam . ' ' . $this->afzenderNaam2,
                        'phonenumber' => '0900-2502500',
                    ],
                ],
            ],
            'text_messages' => [
                [
                    'type' => 'AFLINFO',
                    'remarks' => $instructie,
                ],
            ],
            // Collies data
            'shipment_units' => [],
        ];

        // Add collies data
        if (!empty($collies)) {
            foreach ($collies as $i => $collie) {
                if (in_array($collie['name'], ['envelope', 'plaat', '1-meter', '2-meter'])) {
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
                    'goods_description' => $orderPhoneCombined,
                    'packages' => '1',
                    'exchange' => '0',
                    'unit_type' => $collieType,
                    'measurements' => [
                        'weight' => $collie['weight'],
                        'length' => $collie['length'],
                        'width' => $collie['width'],
                        'height' => $collie['height'],
                        'volume' => '0.0000',
                        'loadingmeter' => '0.00',
                    ],
                    'exchange_unit' => 0,
                ];
            }
        }

        return $shippingData;
    }

    /**
     * @param $string
     *
     * @return string
     */
    private function sanitizeTextForTransmission($string): string
    {
        $string = strtolower($string);
        $string = preg_replace('/[áàãâä]/ui', 'a', $string);
        $string = preg_replace('/[éèêë]/ui', 'e', $string);
        $string = preg_replace('/[íìîï]/ui', 'i', $string);
        $string = preg_replace('/[óòõôö]/ui', 'o', $string);
        $string = preg_replace('/[úùûü]/ui', 'u', $string);
        $string = preg_replace('/[ç]/ui', 'c', $string);

        return trim($string);
    }

    /**
     * @param $id_order
     *
     * @return array|bool|mysqli_result|PDOStatement|resource|null
     *
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
     *
     * @return string
     *
     * @throws Exception
     */
    public function getOutputChangeAddress(Exception $e, string $orderAddress1, string $orderHouseNumber, string $orderHouseNumberExt, string $orderPostcode, string $orderCity): string
    {
        $getParams = [];
        foreach (array_merge($_GET, $_POST) as $key => $value) {
            if ($key === 'collies') {
                $value = str_replace('"', "'", (string) $value);
            }
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
                'city' => $orderCity,
            ])
            ->render('change_address.tpl');
    }

    /**
     * @param string $klant_straat
     * @param stdClass $shippingTask
     * @param string $klant_plaats
     * @param array $suggestions
     * @param string $orderHouseNumber
     * @param string $orderHouseNumberExt
     *
     * @return string
     *
     * @throws Exception
     */
    public function getOutputWrongPostcode(string $klant_straat, stdClass $shippingTask, string $klant_plaats, array $suggestions, string $orderHouseNumber, string $orderHouseNumberExt): string
    {
        $getParams = [];
        foreach (array_merge($_GET, $_POST) as $key => $value) {
            if ($key === 'collies') {
                $value = str_replace('"', "'", (string) $value);
            }
            $getParams[$key] = $value;
        }

        // For the first address in the list (used as default values)
        return $this->templateRenderer
            ->assignMultiple([
                'klant_straat' => $klant_straat,
                'postcode' => $shippingTask->postalcode,
                'klant_plaats' => $klant_plaats,
                'suggestions' => $suggestions,
                'get_params' => $getParams,
                'default_street' => $shippingTask->address1,
                'house_number' => $orderHouseNumber,
                'house_number_extension' => $orderHouseNumberExt,
                'default_postcode' => $shippingTask->postalcode,
                'default_city' => strtolower($shippingTask->city),
            ])
            ->render('wrong_postcode.tpl');
    }

    /**
     * @param array $linkedIdArray
     * @param array $linkedReferencesArray
     *
     * @return string
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function getOutputAddedToOrder(array $linkedIdArray, array $linkedReferencesArray): string
    {
        $getParams = [];
        foreach ($_GET as $key => $value) {
            if ($key == 'collies') {
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
                'weight' => (float) $shippingData[0]['weight'],
                'order_state_name' => $shippingData[0]['order_state_name'],
            ];
        }

        return $this->templateRenderer
            ->assignMultiple([
                'get_params' => $getParams,
                'linked_orders' => $linkedOrders,
                'form_id' => 'toevoegingForm',
            ])
            ->render('added_to_order.tpl');
    }

    /**
     * @param array $linkedIdArray
     * @param array $linkedReferencesArray
     *
     * @return string
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     * @throws Exception
     */
    public function getOutputAddedOrders(array $linkedIdArray, array $linkedReferencesArray): string
    {
        $getParams = [];
        foreach ($_GET as $key => $value) {
            if ($key == 'collies') {
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
                'weight' => (float) $shippingData[0]['weight'],
                'order_state_name' => $shippingData[0]['order_state_name'],
            ];
        }

        return $this->templateRenderer
            ->assignMultiple([
                'get_params' => $getParams,
                'linked_orders' => $linkedOrders,
                'form_id' => 'toevoegingForm',
            ])
            ->render('added_orders.tpl');
    }

    /**
     * @param $id_order
     * @param $trackingNumber
     *
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

            $db->update('order_carrier', ['tracking_number' => pSQL($newTrackNrs), 'tracking_url' => pSQL($newTrackUrls)], 'id_order = ' . $id_order, 1, true);
        }
    }

    /**
     * Change state of orders.
     *
     * @param $orders //array of orders
     * @param $state //new state to be set
     *
     * @return bool
     *
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function setNewStateForOrders($orders, $state): bool
    {
        // get order object for each order and change status
        foreach ($orders as $order) {
            if (in_array($order['id_order'], $this->ordersOk)) {
                $orderObject = new Order((int) $order['id_order']);
                $orderObject->setCurrentState((int) $state);
            }
        }
        if (Tools::getIsset('connected_orders')) {
            $connectedOrders = Tools::getValue('connected_orders');
            if (is_array($connectedOrders)) {
                // get order object for each order and change status
                foreach ($connectedOrders as $order) {
                    $orderObject = new Order((int) $order);
                    $shippingData = $orderObject->getShipping();
                    // Compare id_reference (stored in config) not id_carrier
                    $carrier = new \Carrier((int) $shippingData[0]['id_carrier']);
                    $carrierReference = (int) $carrier->id_reference;
                    if ($carrierReference === $this->addedSelectCarrier) {
                        // toevoeging
                        $orderObject->setCurrentState($this->addedSelectStatus);
                    } elseif ($carrierReference === $this->selectCarrier) {
                        // verzending
                        $orderObject->setCurrentState($this->updateStatus);
                    } else {
                        // fallback: use the same state as the main order
                        $orderObject->setCurrentState((int) $state);
                    }
                }
            }
        }

        return true;
    }

    /**
     * Process daily closing (dagafsluiting)
     * Gets shipping list from API and updates order statuses
     *
     * @return array Returns information about processed orders
     */
    public function dagafsluiting(string $mode = 'preview'): array
    {
        try {
            // Get all orders that need to be processed
            $orders = $this->getOrders($this->updateStatus, $this->selectCarrier);
            $ordersAdded = $this->getOrders($this->addedSelectStatus, $this->addedSelectCarrier);
            $ordersAddedShipped = $this->getOrders($this->updateStatus, $this->addedSelectCarrier);
            // Merge all orders and deduplicate by id_order
            $allOrdersMerged = array_merge($orders, $ordersAdded, $ordersAddedShipped);
            $seenOrderIds = [];
            $allOrders = array_values(array_filter($allOrdersMerged, function ($o) use (&$seenOrderIds) {
                if (isset($seenOrderIds[$o['id_order']])) {
                    return false;
                }
                $seenOrderIds[$o['id_order']] = true;

                return true;
            }));


            foreach ($allOrders as $order) {
                $orderObject = new Order((int) $order['id_order']);
                $orderObject->setCurrentState((int) $this->statusShipped);
            }
                return ['success' => true,'msg'=> 'Satus van orders omgezet'];
        } catch(Exception $e) {
            return ['success' => false, 'msg' => 'Error met %s en melding: %s<br/>' . $e->getCode() .'-' .  $e->getMessage()];
        }

//        try {
//            // Start from the built-in definitions; overwrite with live API data if available.
//            $statusDescriptions = self::getStatusDescriptions();
//            try {
//                $definitionsResponse = $this->makeApiRequest($this->apiDefaultStatusListEndpoint, [], 'GET');
//                $definitions = $definitionsResponse['data'] ?? $definitionsResponse;
//                if (is_array($definitions)) {
//                    foreach ($definitions as $item) {
//                        $code = $item['code'] ?? $item['status_code'] ?? null;
//                        $description = $item['description'] ?? $item['status_description'] ?? null;
//                        if ($code !== null && $description !== null && $description !== '') {
//                            $statusDescriptions[(int) $code] = $description;
//                        }
//                    }
//                }
//            } catch (Exception $e) {
//                // Fall back to the built-in defaults already set above
//            }
//
//            // Status will be fetched per tracking number below — no bulk API call needed.
//            $processedShipments = [];
//            $apiTrackingNumbers = [];
//            $matchedTrackingNumbers = [];
//            $shippingListData = [];
//
//            // Initialize tracking arrays for statistics
//            $ordersFound = [];
//            $ordersNotFound = [];
//            $carrierStats = [];
//            $combinedStats = ['total' => 0, 'found' => 0, 'not_found' => 0];
//            $this->orderStatuses = [];
//            $this->updatedOrders = []; // Track ALL orders from database
//            $this->notUpdatedOrders = []; // Track ONLY Transmission records that didn't match
//
//            // Get all orders that need to be processed
//            $orders = $this->getOrders($this->updateStatus, $this->selectCarrier);
//            $ordersAdded = $this->getOrders($this->addedSelectStatus, $this->addedSelectCarrier);
//            $ordersAddedShipped = $this->getOrders($this->updateStatus, $this->addedSelectCarrier);
//            // Merge all orders and deduplicate by id_order
//            $allOrdersMerged = array_merge($orders, $ordersAdded, $ordersAddedShipped);
//            $seenOrderIds = [];
//            $allOrders = array_values(array_filter($allOrdersMerged, function ($o) use (&$seenOrderIds) {
//                if (isset($seenOrderIds[$o['id_order']])) {
//                    return false;
//                }
//                $seenOrderIds[$o['id_order']] = true;
//
//                return true;
//            }));
//
//            $carrierIds = [];
//            // Get all active carriers from database for reference
//            $activeCarriers = $this->getAllActiveCarriers();
//
//            // Match PrestaShop orders with Transmission shipments
//            foreach ($allOrders as $order) {
//                $orderId = (int) $order['id_order'];
//                $carrierId = (int) $order['id_carrier'];
//                $orderReference = $order['reference'];
//
//                if (!in_array($carrierId, $carrierIds)) {
//                    $carrierIds[] = $carrierId;
//                }
//
//                $carrierName = $order['carrier_name'] ?? $this->getCarrierName($carrierId);
//
//                // Initialize carrier stats if not exists
//                if (!isset($carrierStats[$carrierId])) {
//                    $carrierStats[$carrierId] = [
//                        'name' => $carrierName,
//                        'total' => 0,
//                        'found' => 0,
//                        'not_found' => 0,
//                        'orders' => [], // Track orders for this carrier
//                    ];
//                }
//
//                ++$carrierStats[$carrierId]['total'];
//                ++$combinedStats['total'];
//
//                // Get tracking numbers for this order from the database directly
//                $db = Db::getInstance();
//                $sql = new DbQuery();
//                $sql->select('tracking_number');
//                $sql->from('order_carrier');
//                $sql->where('id_order = ' . (int) $orderId);
//                $result = $db->executeS($sql);
//
//                // Create order details for this order
//                $orderDetails = [
//                    'id' => $orderId,
//                    'reference' => $orderReference,
//                    'carrier_id' => $carrierId,
//                    'carrier_name' => $carrierStats[$carrierId]['name'],
//                    'tracking_numbers' => $result[0]['tracking_number'] ?? '',
//                    'current_state' => $order['current_state'],
//                    'new_state' => $this->statusShipped,
//                    'customer_name' => $order['firstname'] . ' ' . $order['lastname'],
//                    'total_paid' => $order['total_paid'],
//                    'date_add' => $order['date_add'],
//                    'api_status' => 'Niet geverifieerd', // Default status
//                    'matched' => false, // Default to not matched
//                ];
//
//                // Add order to carrier stats
//                $carrierStats[$carrierId]['orders'][] = [
//                    'id' => $orderId,
//                    'reference' => $orderReference,
//                    'tracking' => $result[0]['tracking_number'] ?? '',
//                ];
//
//                // Fetch status per tracking number from the API
//                $trackingStatuses = [];
//                $this->orderStatuses[$orderId] = [];
//                $orderFound = false;
//
//                $rawTrackingNumbers = !empty($result) && isset($result[0]['tracking_number'])
//                    ? $result[0]['tracking_number'] : '';
//
//                $trackingNumbers = array_filter(
//                    array_map('trim', explode(',', $rawTrackingNumbers)),
//                    function ($value) { return $value !== '' && strlen($value) > 5; }
//                );
//
//                foreach ($trackingNumbers as $trackingNumber) {
//                    $trackingStatus = [
//                        'number' => $trackingNumber,
//                        'status' => 'Niet gevonden bij Transmission',
//                        'status_code' => 'N/A',
//                        'status_description' => 'Komt niet voor in verzendlijst Transmission',
//                    ];
//
//                    // Defer error recording so the fallback can replace it on success.
//                    $pendingError = null;
//
//                    try {
//                        $statusResponse = $this->makeApiRequest(
//                            $this->apiShipmentStatusByTrackingEndpoint . '/' . $trackingNumber, [], 'GET'
//                        );
//
//                        // data is an array of status history entries (chronological).
//                        // Take the last entry as the current/most recent status.
//                        $statusHistory = $statusResponse['data'] ?? $statusResponse;
//                        $statusData = (is_array($statusHistory) && isset($statusHistory[0]))
//                            ? end($statusHistory)
//                            : $statusHistory;
//                        $statusCode = $statusData['status_code'] ?? null;
//
//                        if ($statusCode !== null) {
//                            $statusDesc = $statusData['status_description']
//                                ?? ($statusDescriptions[$statusCode] ?? ('Status Code: ' . $statusCode));
//
//                            $this->orderStatuses[$orderId][] = [
//                                'tracking_number' => $trackingNumber,
//                                'status_code' => $statusCode,
//                                'status_description' => $statusDesc,
//                                'processed' => true,
//                            ];
//                            $trackingStatus = [
//                                'number' => $trackingNumber,
//                                'status' => 'Gevonden bij Transmission',
//                                'status_code' => $statusCode,
//                                'status_description' => $statusDesc,
//                            ];
//                            $orderFound = true;
//                            $matchedTrackingNumbers[] = $trackingNumber;
//
//                            $processedShipments[] = [
//                                'transport_number' => $trackingNumber,
//                                'reference' => $orderReference,
//                                'status_code' => $statusCode,
//                                'status_description' => $statusDesc,
//                                'processed' => true,
//                                'receiver' => $orderDetails['customer_name'],
//                            ];
//                        } else {
//                            $pendingError = [
//                                'tracking_number' => $trackingNumber,
//                                'status_code' => 'N/A',
//                                'status_description' => 'Komt niet voor in verzendlijst Transmission',
//                                'processed' => false,
//                            ];
//                        }
//                    } catch (Exception $e) {
//                        $pendingError = [
//                            'tracking_number' => $trackingNumber,
//                            'status_code' => 'N/A',
//                            'status_description' => 'Niet gevonden bij Transmission',
//                            'processed' => false,
//                        ];
//                    }
//
//                    // Fallback: package registered in terminal but not yet picked up.
//                    // apiShipmentStatusByTrackingEndpoint only works post-pickup.
//                    // apiOrderEndpoint/{tracking} works pre-pickup (200) and returns 406 once already sent.
//                    if (!$orderFound) {
//                        try {
//                            $rawResponse = $this->makeApiRequestRaw($this->apiOrderEndpoint . '/' . $trackingNumber, [], 'GET');
//                            $httpCode = $rawResponse['http_code'];
//
//                            if ($httpCode === 200) {
//                                $statusDesc = 'Geregistreerd in terminal (nog niet opgehaald)';
//                                $trackingStatus = [
//                                    'number' => $trackingNumber,
//                                    'status' => 'Gevonden in terminal',
//                                    'status_code' => 'REGISTERED',
//                                    'status_description' => $statusDesc,
//                                ];
//                                $this->orderStatuses[$orderId][] = [
//                                    'tracking_number' => $trackingNumber,
//                                    'status_code' => 'REGISTERED',
//                                    'status_description' => $statusDesc,
//                                    'processed' => true,
//                                ];
//                                $orderFound = true;
//                                $matchedTrackingNumbers[] = $trackingNumber;
//                                $processedShipments[] = [
//                                    'transport_number' => $trackingNumber,
//                                    'reference' => $orderReference,
//                                    'status_code' => 'REGISTERED',
//                                    'status_description' => $statusDesc,
//                                    'processed' => true,
//                                    'receiver' => $orderDetails['customer_name'],
//                                ];
//                            } else {
//                                // Already sent — apiShipmentStatusByTrackingEndpoint should have caught this,
//                                // but handle it here as a safety net.
//                                $statusDesc = 'Pakket al verzonden (terminal bevestigd)';
//                                $trackingStatus = [
//                                    'number' => $trackingNumber,
//                                    'status' => 'Gevonden in terminal',
//                                    'status_code' => 'SENT',
//                                    'status_description' => $statusDesc,
//                                ];
//                                $this->orderStatuses[$orderId][] = [
//                                    'tracking_number' => $trackingNumber,
//                                    'status_code' => 'SENT',
//                                    'status_description' => $statusDesc,
//                                    'processed' => true,
//                                ];
//                                $orderFound = true;
//                                $matchedTrackingNumbers[] = $trackingNumber;
//                                $processedShipments[] = [
//                                    'transport_number' => $trackingNumber,
//                                    'reference' => $orderReference,
//                                    'status_code' => 'SENT',
//                                    'status_description' => $statusDesc,
//                                    'processed' => true,
//                                    'receiver' => $orderDetails['customer_name'],
//                                ];
//                            }
//                            // Any other code (404, etc.) = genuinely not registered
//                        } catch (Exception $e) {
//                            // Fallback also failed — leave $orderFound = false
//                        }
//
//                        // If fallback also didn't find it, flush the deferred error now
//                        if (!$orderFound && $pendingError !== null) {
//                            $this->orderStatuses[$orderId][] = $pendingError;
//                        }
//                    }
//
//                    $trackingStatuses[] = $trackingStatus;
//                }
//
//                $orderDetails['tracking_statuses'] = $trackingStatuses;
//
//                if ($orderFound) {
//                    $ordersFound[] = $orderId;
//                    ++$carrierStats[$carrierId]['found'];
//                    ++$combinedStats['found'];
//                    $this->ordersOk[] = $orderId;
//                    $orderDetails['api_status'] = 'Gevonden bij Transmission';
//                    $orderDetails['matched'] = true;
//                } else {
//                    $ordersNotFound[] = $orderId;
//                    ++$carrierStats[$carrierId]['not_found'];
//                    ++$combinedStats['not_found'];
//                    $orderDetails['matched'] = false;
//                    if (count($trackingNumbers) > 0) {
//                        $orderDetails['api_status'] = 'Niet gevonden bij Transmission';
//                        $orderDetails['reason'] = 'Niet gevonden bij Transmission';
//                    } else {
//                        $orderDetails['api_status'] = 'Geen tracking nummer beschikbaar';
//                        $orderDetails['reason'] = 'Geen tracking nummer';
//                    }
//                }
//
//                // Add to updated orders list (ALL database records go here)
//                $this->updatedOrders[$orderId] = $orderDetails;
//            }
//
//            $unmatchedShipments = [];
//
//            // Store all shipments fetched per-tracking-number for reporting
//            $this->processedShipments = $processedShipments;
//
//            // Add unmatched shipments count to statistics
//            $combinedStats['unmatched_shipments'] = count($unmatchedShipments);
//
//            // Store statistics for display
//            $this->statistics = [
//                'carrier_ids' => $carrierIds,
//                'active_carriers' => $activeCarriers,
//                'used_carriers' => $carrierStats,
//                'combined' => $combinedStats,
//                'orders_found' => $ordersFound,
//                'orders_not_found' => $ordersNotFound,
//                'updated_orders' => $this->updatedOrders,
//                'not_updated_orders' => $this->notUpdatedOrders,
//                'unmatched_shipments' => $unmatchedShipments,
//            ];
//
//            // Update order statuses based on chosen mode.
//            // 'preview' = dry run, no updates.
//            // 'ok'      = only update orders confirmed by the terminal API.
//            // 'all'     = update every shop order matching the filter criteria.
//            if ($mode === 'ok') {
//                if (!empty($this->ordersOk)) {
//                    $ordersToUpdate = array_values(array_filter($allOrders, function ($order) {
//                        return in_array((int) $order['id_order'], $this->ordersOk);
//                    }));
//                    if (!empty($ordersToUpdate)) {
//                        $this->setNewStateForOrders($ordersToUpdate, $this->statusShipped);
//                    }
//                }
//            } elseif ($mode === 'all') {
//                $this->setNewStateForOrders($allOrders, $this->statusShipped);
//            }
//            // 'preview' mode: no status updates
//        } catch (Exception $e) {
//            die(sprintf('Error met %s en melding: %s<br/>', $e->getCode(), $e->getMessage()));
//        }

        return [
            'stats' => $this->statistics,
            'processed_by_api' => $this->processedShipments,
            'order_statuses' => $this->orderStatuses,
            'shipping_list' => $shippingListData,
        ];
    }

    /**
     * Get carrier name by ID
     *
     * @param int $carrierId
     *
     * @return string
     */
    private function getCarrierName(int $carrierId): string
    {
        try {
            $db = Db::getInstance();
            $sql = new DbQuery();
            $sql->select('c.name');
            $sql->from('carrier', 'c');
            $sql->where('c.id_carrier = ' . (int) $carrierId);
            $sql->limit(1);

            $result = $db->getValue($sql);

            // If no result, try to get from deleted carriers
            if (!$result) {
                $sql = new DbQuery();
                $sql->select('c.name');
                $sql->from('carrier', 'c');
                $sql->where('c.id_carrier = ' . (int) $carrierId);
                $sql->where('c.deleted = 1');
                $sql->limit(1);

                $result = $db->getValue($sql);
            }

            return $result ?: 'Onbekend verzendoptie #' . $carrierId;
        } catch (Exception $e) {
            return 'Onbekend verzendoptie #' . $carrierId;
        }
    }

    /**
     * Get all active carriers
     *
     * @return array
     */
    private function getAllActiveCarriers(): array
    {
        try {
            $db = Db::getInstance();
            $sql = new DbQuery();
            $sql->select('id_carrier, name');
            $sql->from('carrier');
            $sql->where('active = 1');
            $sql->where('deleted = 0');

            $result = $db->executeS($sql);

            return $result ?: [];
        } catch (Exception $e) {
            return [];
        }
    }

    /**
     * Returns the full Transmission status definitions as a structured array.
     * Each entry contains: code, description, type, retour_order, close_order,
     * all_shipment_units, retry, days_next_try, available_for_pickup,
     * available_for_delivery, manco.
     *
     * Source: GET /definitions/
     */
    public static function getDefaultStatusDefinitions(): array
    {
        return [
            ['code' => 0,    'description' => 'Handled',                                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 9,    'description' => 'Teruggezet naar Aankomst Actueel',            'type' => 'Teruggezet',  'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 20,   'description' => 'Vertrek Scan',                               'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 30,   'description' => 'Aankomst Scan',                              'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 31,   'description' => 'Geladen bij klant',                          'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 32,   'description' => 'Laadscan',                                   'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 33,   'description' => 'Geladen zonder scan',                        'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 34,   'description' => 'Gelost zonder scan',                         'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 35,   'description' => 'Loodsopname Scan',                           'type' => 'Loodsopname', 'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 36,   'description' => 'Geladen voor rit',                           'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 39,   'description' => 'Aflever Scan',                               'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 60,   'description' => 'Overslag Scan',                              'type' => 'Scan',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 112,  'description' => 'Not loaded',                                 'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 129,  'description' => 'Beschadigd uit kooi niet in bestel.',        'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 150,  'description' => 'Lost on Depot',                              'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 151,  'description' => 'Manco',                                      'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 1],
            ['code' => 155,  'description' => 'Oud manco',                                  'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 1],
            ['code' => 156,  'description' => '',                                            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 1],
            ['code' => 168,  'description' => 'Beschadigd In bestelling',                   'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 169,  'description' => 'Beschadigd uit kooi In bestelling',          'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 187,  'description' => '',                                            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 188,  'description' => 'In bestelling',                              'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 203,  'description' => 'Gesloten-Winkelsluiting',                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 204,  'description' => 'Gesloten-Vakantie',                          'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 210,  'description' => 'Denied-damage to property',                  'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 211,  'description' => 'Onbereikbaar-Gestremd/Markt/Kermis',         'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 212,  'description' => 'Niet geladen',                               'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 214,  'description' => 'Wordt afgehaald',                            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 220,  'description' => 'Adres-Straat Onbekend',                      'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 221,  'description' => 'Adres-Huisnummer Onjuist',                   'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 222,  'description' => 'Adres-Klant is verhuisd',                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 229,  'description' => 'Beschadigd uit kooi niet in bestel.',        'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 231,  'description' => 'In opslag houden',                           'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 232,  'description' => 'Gesloten-Schoolsluiting',                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 233,  'description' => 'Gesloten-A.T.V.',                            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 236,  'description' => 'Losafspraak gemaakt',                        'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 239,  'description' => 'Verkeerd geladen',                           'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 242,  'description' => 'Route wordt TransMission',                   'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 248,  'description' => 'Beschadigd-Niet in bestelling',              'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 250,  'description' => 'Zoekgeraakt op Depot',                       'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 251,  'description' => 'Manco',                                      'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 1],
            ['code' => 252,  'description' => 'Zoekgeraakt op Depot-Blijvend',              'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 255,  'description' => 'Oud manco',                                  'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 1],
            ['code' => 256,  'description' => 'Blijvend Manco',                             'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 1],
            ['code' => 257,  'description' => 'Computerstoring bij Vertrekdepot',           'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 261,  'description' => 'Computerstoring bij Aankomstdepot',          'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 266,  'description' => 'Adres-Postcode niet juist',                  'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 271,  'description' => 'Afhaalopdr. Vervallen',                      'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 279,  'description' => 'Boeking niet correct-Lengte/Pl/Volume',      'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 286,  'description' => 'Niet geladen-Geen pakbon/docum.',            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 290,  'description' => 'Pendel te laat - aansluiting gemist',        'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 291,  'description' => 'Pendel naar subdepot vol - niet geladen',    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 297,  'description' => 'Administratief afgewerkt',                   'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 298,  'description' => 'Retour afzender',                            'type' => 'NAF kode',    'retour_order' => 1, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 0, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 301,  'description' => 'Niet Thuis-Kaart in Bus gedaan',             'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 303,  'description' => 'Gesloten-Winkelsluiting',                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 304,  'description' => 'Gesloten-Vakantie',                          'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 305,  'description' => 'Gesloten-Bedrijfspauze',                     'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 307,  'description' => 'Gesloten-Te laat',                           'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 310,  'description' => 'Geweigerd-Schade aan Goederen',              'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 311,  'description' => 'Onbereikbaar-Gestremd/Markt/Kermis',         'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 312,  'description' => 'Niet geladen',                               'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 313,  'description' => 'Pech onderweg',                              'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 314,  'description' => 'Wordt afgehaald',                            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 315,  'description' => 'Te lange wachttijd',                         'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 317,  'description' => 'Geweigerd-Verkeerde goederen',               'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 318,  'description' => 'Geweigerd-Zending niet compleet',            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 320,  'description' => 'Adres-Straat Onbekend',                      'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 321,  'description' => 'Adres-Huisnummer Onjuist',                   'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 322,  'description' => 'Adres-Klant is verhuisd',                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 323,  'description' => 'Geweigerd-Te Laat Geleverd',                 'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 324,  'description' => 'Geweigerd-Te Vroeg Geleverd',                'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 325,  'description' => 'Geweigerd-Dubbel geleverd',                  'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 326,  'description' => 'Geweigerd-Niets Besteld',                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 330,  'description' => 'Geweigerd-Wil niet tekenen v. ontv.',        'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 332,  'description' => 'Gesloten-Schoolsluiting',                    'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 333,  'description' => 'Gesloten-A.T.V.',                            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 335,  'description' => 'Geweigerd-Niet aangemeld door afz.',         'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 336,  'description' => 'Lossen op vaste dag',                        'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 338,  'description' => 'Lossen met klepwagen',                       'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 339,  'description' => 'Verkeerd geladen',                           'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 340,  'description' => 'Onbereikbaar-Te grote wagen',                'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 341,  'description' => 'I.o.v. planning, tijdgebrek',                'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 342,  'description' => 'Route wordt TransMission',                   'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 343,  'description' => 'Geweigerd-Nalevering',                       'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 344,  'description' => 'Geweigerd-Geen Contactpersoon',              'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 345,  'description' => 'Geweigerd-Geen Ordernummer',                 'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 346,  'description' => 'Geweigerd-Geen pakbon/document',             'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 347,  'description' => 'Geweigerd-Afleveradres onjuist',             'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 362,  'description' => 'Gesloten-Bedrijf vroeg dicht',               'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 366,  'description' => 'Adres-Postcode niet juist',                  'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 370,  'description' => 'Afhaalopdr. Goederen niet klaar',            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 371,  'description' => 'Afhaalopdr. Vervallen',                      'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 372,  'description' => 'Afhaalopdr. Onbekend op Laadadres',          'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 373,  'description' => 'Afhaalopdr. Te weinig gegevens',             'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 374,  'description' => 'Afhaalopdr. Contactpersoon nodig',           'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 375,  'description' => 'Afhaalopdr. Goederen al opgehaald',         'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => -1, 'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 376,  'description' => 'Afhaalopdr. Minder goederen dan geboekt',   'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 1, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 0, 'manco' => 0],
            ['code' => 386,  'description' => 'Niet geladen-Geen pakbon/docum.',            'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 399,  'description' => 'Manco bij afleveren',                        'type' => 'NAF kode',    'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 1, 'days_next_try' => 1,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1001, 'description' => 'Na 24 hr. gemeld',                           'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1002, 'description' => 'Niet gemeld',                                'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1003, 'description' => 'Bestellijst N.A.',                           'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1004, 'description' => 'Na 48 hr. gemeld',                           'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1005, 'description' => 'Na 72 hr. gemeld',                           'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 1, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1006, 'description' => '',                                            'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1007, 'description' => '',                                            'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
            ['code' => 1008, 'description' => '',                                            'type' => 'Data',        'retour_order' => 0, 'close_order' => 0, 'all_shipment_units' => 0, 'retry' => 0, 'days_next_try' => 0,  'available_for_pickup' => 1, 'available_for_delivery' => 1, 'manco' => 0],
        ];
    }

    /**
     * Returns a flat [code => description] map built from getDefaultStatusDefinitions().
     * Entries with an empty description are skipped.
     */
    public static function getStatusDescriptions(): array
    {
        $map = [];
        foreach (self::getDefaultStatusDefinitions() as $def) {
            if ($def['description'] !== '') {
                $map[$def['code']] = $def['description'];
            }
        }

        return $map;
    }
}
