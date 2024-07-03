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
use PDOStatement;
use PrestaShopDatabaseException;
use PrestaShopException;
use SoapClient;
use stdClass;
use Tools;

/**
 * Class ExportOrders.
 */
class ExportOrdersMultipleCollies
{
    //Verzonden status waar de orders na dagafsluiting op worden gezet
    private bool $debug;
    public Context $context;
    public array $ordersOk;
    public array $soapOptions;

    public bool $redirect = true;
    public bool $updateBool;
    public float $weight;

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
    public string $soapUrl;
    public string|array $labelsFolder;

    /**
     * @param $id_order
     * @param float $weight
     * @param int $weightOption
     * @param int $collies
     * @param string $collieType
     */
    public function __construct($id_order, float $weight = 1, int $weightOption = 0, int $collies = 1, string $collieType = 'COL')
    {
        $this->idOrder = $id_order;
        $this->debug = false;
        $this->weight = (float)$weight;
        $this->weightOption = $weightOption;
        $this->collieType = $collieType;
        $this->collies = $collies;
        $this->context = Context::getContext();
        $this->ordersOk = [];
        $this->idLang = $this->context->language->id;
        $this->idShop = $this->context->shop->id;
        $this->idShopGroup = $this->context->shop->id_shop_group;
        $this->statusShipped = (int)Configuration::get('KOOPMANORDEREXPORT_STATUS_TRANSFERRED', $this->idLang, $this->idShopGroup, $this->idShop);
        $this->soapOptions = ['stream_context' => stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false,],]),];

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

        $this->soapUrl = $this->getConfig('KOOPMANORDEREXPORT_SOAP_URL');

        $this->apiUserName = $this->getConfig('KOOPMANORDEREXPORT_API_USERNAME');
        $this->apiPass = $this->getConfig('KOOPMANORDEREXPORT_API_PASSWORD');
        $this->apiDepot = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_DEPOT');
        $this->apiVerlader = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_VERLADER');
        $this->afZender = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDER');
        $this->afzenderNaam = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM');
        $this->afzenderNaam2 = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM2');
        $this->afzenderStraat = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERSTRAAT');
        $this->afzenderHuisnr = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERHUISNR');
        $this->afzenderPostcode = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPOSTCODE');
        $this->afzenderPlaats = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPLAATS');
        $this->afzenderLand = $this->getConfig('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERLAND');
        $this->prepareLabelsFolder();
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
            die(sprintf('Error met %s en melding: error (new SoapClient) - %s<br/>', $e->getCode(), $e->getMessage()));
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
     * Main Export Function
     * Export orders.
     **/
    public function export(): bool
    {
        try {
            $orders = $this->getOrders($this->selectStatus, $this->selectCarrier, 1, $this->idOrder);
        } catch (PrestaShopDatabaseException $e) {
            die(sprintf('Error met %s en melding: error (new SoapClient) - %s<br/>', $e->getCode(), $e->getMessage()));
        }

        if (empty($orders)) {
            return false;
        }
        if (!empty($this->idOrder)) {
            $weight = $this->weight;
            if (isset($this->weight)) {
                if ($weight <= 0) {
                    $weight = 1;
                }
            }
            $collies = $this->collies;
            if (isset($this->collies)) {
                if ($collies == 0) {
                    $collies = 1;
                }
            }
            $collieType = $this->collieType;
            if (isset($this->collieType)) {
                if ($collieType == '') {
                    $collieType = 'COL';
                }
            }

            if (!isset($this->weight)) {
                if ($this->weightOption > 0) {
                    $weight = $this->weightOption;
                }
            }


            try {
                $this->processOrdersNew($orders, $collies, $weight, $collieType);
            } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                die(sprintf('Error met %s en melding: error (new SoapClient) - %s<br/>', $e->getCode(), $e->getMessage()));
            }
        } else {
            try {
                $this->processOrdersNew($orders);
            } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                die(sprintf('Error met %s en melding: error (new SoapClient) - %s<br/>', $e->getCode(), $e->getMessage()));
            }
        }

        //Update orders when selected and uploaded
        if ($this->updateBool && count($this->ordersOk) > 0) {
            try {
                $this->setNewStateForOrders($orders, $this->updateStatus);
            } catch (PrestaShopDatabaseException|PrestaShopException $e) {
                die(sprintf('Error met %s en melding: error (new SoapClient) - %s<br/>', $e->getCode(), $e->getMessage()));
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
        $sql->innerJoin('customer', 'c', 'c.id_customer = o.id_customer');
        $sql->innerJoin('address', 'a', 'a.id_address = o.id_address_delivery');
        $sql->innerJoin('country', 'co', 'co.id_country = a.id_country');
        $sql->leftJoin('orders', 'at', 'at.reference = o.added_to_order');
        $sql->leftJoin('orders', 'aw', 'aw.added_to_order = o.reference');
        if (isset($id_order)) { //als id is meegegeven dan maakt state en carrier niet meer uit
            $sql->where('o.id_order = ' . $id_order);
        } else {
            $sql->where('o.current_state IN (' . $state . ')');
            $sql->where('o.id_carrier = ' . $carrier);
        }
        $sql->limit($max);

        return Db::getInstance()->executeS($sql);
    }

    /**
     * Process all new orders
     *
     * @param $orders
     * @param int $collies
     * @param int|float|string $weight
     * @param string $collieType
     * @return void
     * @throws PrestaShopDatabaseException|PrestaShopException
     * @throws PrestaShopException
     */
    private function processOrdersNew($orders, int $collies = 1, int|float|string $weight = 0, string $collieType = 'COL'): void
    {

        if (empty($orders)) {
            die("Error met melding: Geen order id's beschikbaar<br/>");
        }

        try {
            $client = new SoapClient($this->soapUrl, $this->soapOptions);
        } catch (Exception $e) {
            die(sprintf('Error met %s en melding: error (new SoapClient) - %s<br/>', $e->getCode(), $e->getMessage()));
        }

        $login = new stdClass();
        $login->username = $this->apiUserName;
        $login->password = $this->apiPass;
        $login->depot = $this->apiDepot;
        $login->verlader = $this->apiVerlader;

        foreach ($orders as $row) {
            $shippingTask = new stdClass();
            $shippingTask->type = 'T'; // T = Stukgoed Levering

            $orderId = $row['id_order'];
            $orderReference = $row['reference'];
            $shippingTask->nrorder = $orderReference;
            //Verzender gegevens
            $shippingTask->afzender = $this->afZender;
            $shippingTask->afznaam = $this->afzenderNaam;
            $shippingTask->afznaam2 = $this->afzenderNaam2;
            $shippingTask->afzastraat = $this->afzenderStraat;
            $shippingTask->afzhuisnr = $this->afzenderHuisnr;
            $shippingTask->afzpostcode = $this->afzenderPostcode;
            $shippingTask->afzplaats = $this->afzenderPlaats;
            $shippingTask->afzland = $this->afzenderLand;
            //Klant gegevens
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

            $shippingTask->geanaam = $orderFirstName . ' ' . $orderLastName;
            $shippingTask->geanaam2 = $orderCompany;
            $shippingTask->geastraat = $orderAddress1;
            $shippingTask->geahuisnr = $orderHouseNumber . ' ' . $orderHouseNumberExt;
            $shippingTask->geapostcode = $orderPostcode;
            $shippingTask->geaplaats = $orderCity;
            $shippingTask->gealand = $orderIsoCode;
            $shippingTask->geatelefoon = $orderPhone;
            $shippingTask->geaemail = $orderEmail;

            $msg = $this->getFirstClientMessage($orderId);

            if (!empty($msg)) {
                $shippingTask->instructie = $msg[0]['message'];
            }
            if ($shippingTask->gealand == 'nl') { // haal straat + plaats op bij koopman voor NL
                try {
                    $addresses = $client->getAdresNL_2($login, $orderPostcode);
                } catch (Exception $e) {
                    if ((int)$e->getCode() == 0) {
                        $this->redirect = false;
                        $this->getOutputChangeAddress($e, $orderAddress1, $orderHouseNumber, $orderHouseNumberExt, $orderPostcode, $orderCity);
                    }
                }

                if (isset($addresses) && is_array($addresses)) {
                    $klant_straat = $shippingTask->geastraat . ' ' . $shippingTask->geahuisnr;
                    $klant_plaats = $shippingTask->geaplaats;

                    if ((count($addresses) > 1) || (trim(strtolower($shippingTask->geastraat)) != trim(strtolower($addresses[0]->straat)))) {
                        $validAddress = false;
                        foreach ($addresses as $address) {
                            if (trim(strtolower($address->straat)) == trim(strtolower($shippingTask->geastraat)) &&
                                trim(strtolower($address->plaats)) == trim(strtolower($shippingTask->geaplaats))) {
                                $validAddress = true;
                            }
                        }

                        if (!$validAddress) {
                            $shippingTask->geaplaats = '';
                            $this->redirect = false;

                            $this->getOutputWrongPostcode($klant_straat, $shippingTask, $klant_plaats, $addresses, $orderHouseNumber, $orderHouseNumberExt);
                        }
                    } else {
                        $shippingTask->geastraat = $addresses[0]->straat;
                        $shippingTask->geaplaats = $addresses[0]->plaats;
                    }
                }
            }

            if (!empty($row['added_to_reference']) && !empty($row['added_to_id']) && strlen(Tools::getValue('connected_orders')) === 0) {
                //heeft toegevoegde orders
                $linkedIdArray = explode(',', $row['added_to_id']);
                $linkedReferencesArray = explode(',', $row['added_to_reference']);

                $this->redirect = false;


                $this->getOutputAddedToOrder($linkedIdArray, $linkedReferencesArray);
                return;
            }

            if (!empty($row['added_with_reference']) && !empty($row['added_with_id']) && strlen(Tools::getValue('connected_orders')) === 0) {
                //heeft toegevoegde orders

                $linkedIdArray = explode(',', $row['added_with_id']);
                $linkedReferencesArray = explode(',', $row['added_with_reference']);

                $this->redirect = false;

                $this->getOutputAddedOrders($linkedIdArray, $linkedReferencesArray);
                return;
            }


            if (!empty($shippingTask->geaplaats)) {

                $collieWeight = (int)floor((float)($weight / $collies));

                for ($i = 0; $i < $collies; $i++) {
                    $collieRow = new stdClass();
                    $collieRow->nrcollo = $i + 1;
                    //COL = Collie //MP = mini-pallet //PLH = Halve Pallet //PL = Pallet
                    $collieRow->vrzenh = $collieType;
                    $collieRow->gewicht = $collieWeight;

                    if ($collieType == 'COL') {
                        $collieRow->lengte = 200;
                        $collieRow->breedte = 17;
                        $collieRow->hoogte = 23;
                    } elseif ($collieType == 'MP') {
                        $collieRow->lengte = 100;
                        $collieRow->breedte = 50;
                        $collieRow->hoogte = 10;
                        $collieRow->gewicht = 50;
                    } elseif ($collieType == 'PLH') {
                        $collieRow->lengte = 80;
                        $collieRow->breedte = 60;
                        $collieRow->hoogte = 115;
                    } elseif ($collieType == 'PL') {
                        $collieRow->lengte = 80;
                        $collieRow->breedte = 120;
                        $collieRow->hoogte = 115;
                    } elseif ($collieType == 'SP') {
                        $collieRow->lengte = 195;
                        $collieRow->breedte = 25;
                        $collieRow->hoogte = 25;
                        $collieRow->gewicht = 150;
                    } else {
                        $collieRow->lengte = 200;
                        $collieRow->breedte = 17;
                        $collieRow->hoogte = 23;
                    }

                    $shippingTask->aRegel[$i + 1] = $collieRow;
                }

                try {
                    $transport = $client->addOpdracht($login, $shippingTask);

                    if ($transport) {
                        $trackingNumber = $transport->zendingnr;
                        $trackingNumber = 'T' . substr($trackingNumber, 1); //T98
                        $this->addTrackingNumberToOrder($orderId, $trackingNumber);

                        $labels = $transport->labels;
                        $this->redirect = true;
                        if (file_put_contents($this->getLaneFolder() . '/' . $trackingNumber . '.pdf', trim(base64_decode($labels)))) {

                            $this->ordersOk[] = $orderId;
                        }
                    }
                } catch (Exception $e) {
                    if (session_status() == PHP_SESSION_NONE) {
                        session_start();
                    }
                    $_SESSION['koopmanError'] = $e->getMessage();
                    die(sprintf("Error met %s en melding: %s<br/>", $e->getCode(), $e->getMessage()));
                }

                if ($this->debug) {
                    try {
                        try {
                            $client2 = new SoapClient($this->soapUrl, $this->soapOptions);
                        } catch (Exception $e) {
                            die(sprintf("Error met %s en melding: error (new SoapClient) - %s<br/>", $e->getCode(), $e->getMessage()));
                        }

                        $loginDel = new stdClass();
                        $loginDel->username = $this->apiUserName;
                        $loginDel->password = $this->apiPass;
                        $loginDel->depot = $this->apiDepot;
                        $loginDel->verlader = $this->apiVerlader;
                        $client2->delOpdracht($loginDel, $transport->zendingnr);
                    } catch (Exception $e) {
                        die(sprintf("Error met %s en melding: %s<br/>", $e->getCode(), $e->getMessage()));
                    }
                }
            }
        }
    }

    /*
    * get first public message (from the client)
    * Toegevoegd om afleverinstructies van de klant door te geven aan koopman. GDU 28-8-2017
    */

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
     */
    public function getOutputChangeAddress(Exception $e, string $orderAddress1, string $orderHouseNumber, string $orderHouseNumberExt, string $orderPostcode, string $orderCity): string
    {
        $this->output = sprintf('<div class="w-100">
                                                    <div class="col-12">
                                                        <div class="card row">
                                                          <div class="card-header">
                                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                          <span aria-hidden="true">&times;</span>
                                                          </button>
                                                            Wijzig het adres van deze bestelling
                                                          </div>
                                                          <div class="card-body">
                                                            <p class="card-text">%s. Controleer en wijzig het adres.</p>
                                                            <br/>
                                                            <form id="updateAddressKoopman">', $e->getMessage());

        foreach ($_GET as $key => $value) {
            $this->output .= sprintf("<input type='hidden' name='%s' value='%s'/>", $key, $value);
        }

        $this->output .= sprintf('<input type="hidden" name="updateAddress" value="1">
                                                            <div class="row mb-3">
                                                            <div class="col-6">
                                                                <div class="form-floating">
                                                                    <input type="text" class="form-control" name="address1" id="address1" placeholder="Straat naam" value="%s">
                                                                    <label for="address1">Straat</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-3">
                                                                <div class="form-floating">
                                                                    <input type="text" class="form-control" name="house_number" id="house_number" placeholder="Huisnummer" value="%s">
                                                                    <label for="house_number">Huis Nr.</label>
                                                                </div>
                                                            </div>
                                                            <div class="col-3">
                                                                <div class="form-floating">
                                                                    <input type="text" class="form-control" name="house_number_extension" id="house_number_extension"
                                                                    placeholder="Toevoeging" value="%s">
                                                                    <label for="house_number_extension">Toev.</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                                <div class="col-5">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control" name="postcode" id="postcode" placeholder="Postcode" value="%s">
                                                                        <label for="postcode">Postcode</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-7">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control" name="city" id="city" placeholder="Stad" value="%s">
                                                                        <label for="city">Stad</label>
                                                                    </div>
                                                                </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <button type="button" class="btn btn-lg btn-success w-100 updateAddress">Wijzig adres & print label</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                  </div>
                                                </div>
                                            </div>
                                        </div></form>', $orderAddress1, $orderHouseNumber, $orderHouseNumberExt, $orderPostcode, $orderCity);

        return $this->output;
    }

    /**
     * @param string $klant_straat
     * @param stdClass $shippingTask
     * @param string $klant_plaats
     * @param array $addresses
     * @param string $orderHouseNumber
     * @param string $orderHouseNumberExt
     * @return string
     */
    public function getOutputWrongPostcode(string $klant_straat, stdClass $shippingTask, string $klant_plaats, array $addresses, string $orderHouseNumber, string $orderHouseNumberExt): string
    {
        $this->output = sprintf('<div class="w-100">
                                    <div class="col-12">
                                        <div class="card row">
                                            <div class="card-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                Adres van klant en ingevoerde postcode komen niet overeen.
                                            </div>
                                            <div class="card-body">
                                                        <div class="row mt-3 border-bottom">
                                                            <p class="col-12"><b>Ingevuld door klant:</b></td></tr><tr><td><span class="large-text"> %s, %s %s</span></p>
                                                        </div>
                                                        <div class="row mt-3 border-bottom"">
                                                            <div class="col-12">
                                                            <b>Straat en woonplaats, bij postcode:</b>
                                                            <ul id="street-list">', $klant_straat, $shippingTask->geapostcode, $klant_plaats);

        foreach ($addresses as $ix => $adres) {
            $this->output .= sprintf('<li class="large-text">
                                                                    <a href="#" class="text-decoration-none insert-address" data-rowid="%s">
                                                                    <span class="insert-address-street"  data-rowid="%s">%s</span>
                                                                    <span class="insert-address-city"  data-rowid="%s">%s</span>
                                                                    </a>
                                                                    </li>', $ix, $ix, $adres->straat, $ix, $adres->plaats);
        }

        $this->output .= '</ul>
                                                </div></div>
                                                <div class="row mt-5"><div class="col-12"><b>Pas het adres aan</b></div></div>
                                                <form class="mt-2" method="post" id="updateAddressKoopman">';

        foreach ($_GET as $key => $value) {
            $this->output .= sprintf('<input type="hidden" name="%s" value="%s"/>', $key, $value);
        }

        $this->output .= sprintf('<input type="hidden" name="updateAddress" value="1"><div class="row mb-3">
                                                                <div class="col-6">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="address1" id="address1" placeholder="Straat naam" value="%s">
                                                                        <label for="address1">Straat</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="house_number" id="house_number" placeholder="Huisnummer" value="%s">
                                                                        <label for="house_number">Huis Nr.</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="house_number_extension" id="house_number_extension" placeholder="Toevoeging" value="%s">
                                                                        <label for="house_number_extension">Toev.</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mb-3">
                                                                <div class="col-5">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="postcode" id="postcode" placeholder="Postcode" value="%s">
                                                                        <label for="postcode">Postcode</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-7">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="city" id="city" placeholder="Stad" value="%s">
                                                                        <label for="city">Stad</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-5">
                                                                <div class="col-12">
                                                                    <button type="button" class="btn btn-lg btn-success w-100 updateAddress">Wijzig adres & print label</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>', $addresses[0]->straat,
            $orderHouseNumber,
            $orderHouseNumberExt,
            $addresses[0]->postcode,
            strtolower($addresses[0]->plaats));

        return $this->output;
    }

    /**
     * @param array $linkedIdArray
     * @param array $linkedReferencesArray
     * @return string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getOutputAddedToOrder(array $linkedIdArray, array $linkedReferencesArray): string
    {
        $this->output = sprintf('<div class="w-100">
                                    <div class="col-12">
                                        <div class="card row">
                                            <div class="card-body">
                                            <form class="mt-2" method="post" id="%s">', 'toevoegingForm');

        foreach ($_GET as $key => $value) {
            $this->output .= sprintf('<input type="hidden" name="%s" value="%s"/>', $key, $value);
        }

        $this->output .= 'Dit is een toevoeging aan bestelling met referentie(s): <table class="table w-100">';

        foreach ($linkedIdArray as $i => $link) {
            $orderCarrier = new Order($link);
            $shippingData = $orderCarrier->getShipping();

            $this->output .= sprintf('<tr>
                                        <td><input type="checkbox" class="form-control linked_order" value="%s" data-tracking="%s" data-weight="%s" name="linked_orders[]" checked/></td>
                                        <td><a class="text-decoration-none" href="/admin-dev/index.php/sell/orders/%s/generate-delivery-slip-pdf" target="_blank">%s</a></td>
                                        <td>%s<sub>kg</sub></td>
                                        <td>%s</td>
                                        <td>%s</td>
                                        </tr>', $link,
                $shippingData[0]['tracking_number'],
                $shippingData[0]['weight'],
                $link,
                $linkedReferencesArray[$i],
                (float)$shippingData[0]['weight'],
                $shippingData[0]['tracking_number'],
                $shippingData[0]['order_state_name']);
        }

        $this->output .= '</table>
                                    <div class="w-100">
                                    <div class="btn-group w-100" role="group" aria-label="Basic example">
                                      <button type="button" data-all="0" class="btn btn-danger">Nee, alleen deze</button>
                                      <button type="button" data-all="1"  class="btn btn-success">Ja, alle geselecteerden</button>
                                    </div>
                                    </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>';

        return $this->output;
    }

    /**
     * @param array $linkedIdArray
     * @param array $linkedReferencesArray
     * @return string
     * @throws PrestaShopDatabaseException
     * @throws PrestaShopException
     */
    public function getOutputAddedOrders(array $linkedIdArray, array $linkedReferencesArray): string
    {
        $this->output = sprintf('<div class="w-100">
                                    <div class="col-12">
                                        <div class="card row">
                                            <div class="card-body">
                                            <form class="mt-2" method="post" id="%s">', 'toevoegingForm');

        foreach ($_GET as $key => $value) {
            $this->output .= sprintf('<input type="hidden" name="%s" value="%s"/>', $key, $value);
        }

        $this->output .= 'Deze bestelling heeft één of meerdere toevoeging(en) met referentie(s): <table class="table w-100">';

        foreach ($linkedIdArray as $i => $link) {
            $orderCarrier = new Order($link);
            $shippingData = $orderCarrier->getShipping();

            $this->output .= sprintf('<tr>
                                        <td><input type="checkbox" class="form-control linked_order" value="%s"  data-tracking="%s" data-weight="%s" name="linked_orders[]" checked/></td>
                                        <td><a class="text-decoration-none" href="/admin-dev/index.php/sell/orders/%s/generate-delivery-slip-pdf" target="_blank">%s</a></td>
                                        <td>%s<sub>kg</sub></td>
                                        <td>%s</td>
                                        <td>%s</td>
                                        </tr>',
                $link,
                $shippingData[0]['tracking_number'],
                $shippingData[0]['weight'],
                $link,
                $linkedReferencesArray[$i],
                (float)$shippingData[0]['weight'],
                $shippingData[0]['tracking_number'],
                $shippingData[0]['order_state_name']);
        }

        $this->output .= '</table><div class="w-100">
                                            <div class="btn-group w-100" role="group" aria-label="actie knoppen">
                                              <button type="button" data-all="0" class="btn btn-danger">Nee, alleen deze</button>
                                              <button type="button" data-all="1"  class="btn btn-success">Ja, alle geselecteerden</button>
                                            </div>
                                            </div>
                                            </form>
                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>';

        return $this->output;
    }

    /**
     * @param $id_order
     * @param $trackingNumber
     * @return void
     */
    public function addTrackingNumberToOrder($id_order, $trackingNumber = null): void
    {
        if (!empty($trackingNumber)) {
            $db = Db::getInstance();
            $requestSelect = 'SELECT `tracking_number` FROM `' . _DB_PREFIX_ . 'order_carrier` WHERE `id_order` = ' . $id_order;
            $resultSelect = $db->getValue($requestSelect);
            if (!empty($resultSelect)) {
                $existingTrackNrs = explode(',', $resultSelect);
                $existingTrackNrs[] = $trackingNumber;
                $uniqueTrackNrs = array_unique($existingTrackNrs);
                $newTrackNrs = implode(',', $uniqueTrackNrs);
            } else {
                $newTrackNrs = implode(',', [$trackingNumber]);
            }
            $db->update('order_carrier', ['tracking_number' => pSQL($newTrackNrs),], 'id_order = ' . $id_order, 1, true);
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
            if (strlen($connectedOrders) > 0) {
                //get order object for each order and change status
                foreach (explode(',', $connectedOrders) as $order) {
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
            $client = new SoapClient($this->soapUrl, $this->soapOptions);
        } catch (Exception $e) {
            die(sprintf("Error met %s en melding: error (new SoapClient) - %s<br/>", $e->getCode(), $e->getMessage()));
        }

        $login = new stdClass();
        $login->username = $this->apiUserName;
        $login->password = $this->apiPass;
        $login->depot = $this->apiDepot;
        $login->verlader = $this->apiVerlader;

        //verzendlijst ophalen en als pdf opslaan
        try {
            $shippingList = $client->getVerzendlijst($login);
            if ($shippingList) {
                file_put_contents(str_replace('private_html', 'public_html',
                        $_SERVER['DOCUMENT_ROOT']) . '/upload/pakbonnen/verzendlijst_' . time() . '.pdf', trim(base64_decode($shippingList)));
            }
        } catch (Exception $e) {
            die(sprintf("Error met %s en melding: %s<br/>", $e->getCode(), $e->getMessage()));
        }
        //meld zendingen voor met sendOpdrachten
        $client->sendOpdrachten($login);

        //orders op verzonden zetten.
        if ($this->updateBool) {
            //orders selecteren die met eerdere acties op 'Ligt klaar voor verzenden' staan (of andere update_status)
            $orders = $this->getOrders($this->updateStatus, $this->selectCarrier);
            foreach ($orders as $order) {
                $this->ordersOk[] = $order['id_order'];
            }
            $this->setNewStateForOrders($orders, $this->statusShipped);
        }
    }
}
