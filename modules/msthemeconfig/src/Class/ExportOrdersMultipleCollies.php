<?php

namespace MsThemeConfig\Class;

use Exception;
use mysqli_result;
use PDOStatement;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use PrestaShopDatabaseException;
use SoapClient;
use SoapFault;
use stdClass;

/**
 * Class ExportOrders.
 */
class ExportOrdersMultipleCollies
{
    public string|array $labelsFolder;
    public array $ordersOk;

    //Verzonden status waar de orders na dagafsluiting op worden gezet
    public int $statusShipped = 4;

    public array $soapOptions;

    public bool $redirect = true;
    public string $output = '';

    public int|null $idOrder;
    public float $weight;
    public int|null $idShop;
    public int|null $idShopGroup;
    public int|null $idLang;
    public ?\Context $context;
    private bool $debug;

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
        $this->soapOptions = [
            'stream_context' => stream_context_create(
                [
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ],
                ]
            ),
        ];

        $folder = Configuration::get('KOOPMANORDEREXPORT_LABELS_FOLDER', $this->idLang, $this->idShopGroup, $this->idShop);


        $this->labelsFolder = str_replace('private_html',
            'public_html',
            $_SERVER['DOCUMENT_ROOT'] . '/upload/' . $folder);

        $this->prepareLabelsFolder();
    }

    /**
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
            die("Error met " . $e->getCode() . " en melding: error (new SoapClient) - " . $e->getMessage() . "<br/>");
        }
    }

    /**
     * @return string
     */
    private function getLaneFolder(): string
    {
        $lane_2 = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_2_PROFILE', $this->idLang, $this->idShopGroup, $this->idShop);
        $lane_3 = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_3_PROFILE', $this->idLang, $this->idShopGroup, $this->idShop);
        return match ((int)$this->context->employee->id_profile) {
            $lane_2 => $this->labelsFolder . '/lane_2',
            $lane_3 => $this->labelsFolder . '/lane_3',
            default => $this->labelsFolder . '/lane_1',
        };
    }

    /*
    Function to prepare output directory for labels, if it doesn't exist
    */

    /**
     * Export orders.
     **/
    public function export(): bool
    {
        $orders = $this->getOrders(Configuration::get('KOOPMANORDEREXPORT_SELECT_STATUS', $this->idLang, $this->idShopGroup, $this->idShop), Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop), 1, $this->idOrder);

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
            } catch (PrestaShopDatabaseException|SoapFault $e) {
                die("Error met " . $e->getCode() . " en melding: error (new SoapClient) - " . $e->getMessage() . "<br/>");
            }
        } else {
            try {
                $this->processOrdersNew($orders);
            } catch (PrestaShopDatabaseException|SoapFault $e) {
                die("Error met " . $e->getCode() . " en melding: error (new SoapClient) - " . $e->getMessage() . "<br/>");
            }
        }

        //Update orders when selected and uploaded
        if (Configuration::get('KOOPMANORDEREXPORT_UPDATE_BOOL', $this->idLang, $this->idShopGroup, $this->idShop) && is_numeric(Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop)) && count($this->ordersOk) > 0) {
            $this->setNewStateForOrders($orders, Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop));
        }
        return true;
    }

    /**
     * Get orders array for given state.
     * @param $state
     * @param $carrier
     * @param int $max
     * @param null $id_order
     * @return array of orders
     *
     */
    private function getOrders($state, $carrier, int $max = 1000, $id_order = null): array
    {
        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('orders', 'o');
        $sql->innerJoin('customer', 'c', 'c.id_customer = o.id_customer');
        $sql->innerJoin('address', 'a', 'a.id_address = o.id_address_delivery');
        $sql->innerJoin('country', 'co', 'co.id_country = a.id_country');
        if (isset($id_order)) { //als id is meegegeven dan maakt state en carrier niet meer uit
            $sql->where('o.id_order = ' . $id_order);
        } else {
            $sql->where('o.current_state IN (' . $state . ')');
            $sql->where('o.id_carrier = ' . $carrier);
        }
        $sql->limit($max);
        $sql->orderBy('id_order desc');

        return Db::getInstance()->executeS($sql);
    }

    /**
     * @param $orders
     * @param int $collies
     * @param int|string $weight
     * @param string $collieType
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws SoapFault
     */
    private function processOrdersNew($orders, int $collies = 1, int|float|string $weight = 0, string $collieType = 'COL'): void
    {
        if (empty($orders)) {
            die("Error met melding: Geen order id's beschikbaar<br/>");
        }

        try {
            $client = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL', $this->idLang, $this->idShopGroup, $this->idShop), $this->soapOptions);
        } catch (Exception $e) {
            die("Error met " . $e->getCode() . " en melding: error (new SoapClient) - " . $e->getMessage() . "<br/>");
        }

        $login = new stdClass();
        $login->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER', $this->idLang, $this->idShopGroup, $this->idShop);

        foreach ($orders as $row) {
            $shippingTask = new stdClass();
            $shippingTask->type = 'T'; // T = Stukgoed Levering

            $orderId = $row['id_order'];
            $orderReference = $row['reference'];
            $shippingTask->nrorder = $orderReference;
//            Verzender gegevens
            $shippingTask->afzender = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDER', $this->idLang, $this->idShopGroup, $this->idShop);

            $shippingTask->afznaam = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM', $this->idLang, $this->idShopGroup, $this->idShop);
            $shippingTask->afznaam2 = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM2', $this->idLang, $this->idShopGroup, $this->idShop);
            $shippingTask->afzastraat = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERSTRAAT', $this->idLang, $this->idShopGroup, $this->idShop);
            $shippingTask->afzhuisnr = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERHUISNR', $this->idLang, $this->idShopGroup, $this->idShop);
            $shippingTask->afzpostcode = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPOSTCODE', $this->idLang, $this->idShopGroup, $this->idShop);
            $shippingTask->afzplaats = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPLAATS', $this->idLang, $this->idShopGroup, $this->idShop);
            $shippingTask->afzland = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERLAND', $this->idLang, $this->idShopGroup, $this->idShop);
//            Klant gegevens


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

                        $this->output .= '<div class="w-100">
                                                    <div class="col-12">
                                                        <div class="card row">
                                                          <div class="card-header">
                                                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                            Wijzig het adres van deze bestelling
                                                          </div>
                                                          <div class="card-body">
                                                            <p class="card-text">' . $e->getMessage() . '. Controleer en wijzig het adres.</p>';

                        $this->output .= '<br/><form id="updateAddressKoopman">' . PHP_EOL;

                        foreach ($_GET as $key => $value) {
                            $this->output .= "<input type='hidden' name='$key' value='$value'/>" . PHP_EOL;
                        }
                        $this->output .= '<input type="hidden" name="updateAddress" value="1">';
                        $this->output .= '<div class="row mb-3">
                                                                    <div class="col-6">
                                                                        <div class="form-floating">
                                                                            <input type="text" class="form-control" name="address1" id="address1" placeholder="Straat naam" value="' . $orderAddress1 . '">
                                                                            <label for="address1">Straat</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-3">
                                                                        <div class="form-floating">
                                                                            <input type="text" class="form-control" name="house_number" id="house_number" placeholder="Huisnummer" value="' . $orderHouseNumber . '">
                                                                            <label for="house_number">Huis Nr.</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-3">
                                                                        <div class="form-floating">
                                                                            <input type="text" class="form-control" name="house_number_extension" id="house_number_extension" placeholder="Toevoeging" value="' . $orderHouseNumberExt . '">
                                                                            <label for="house_number_extension">Toev.</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row mb-3">
                                                                        <div class="col-5">
                                                                            <div class="form-floating">
                                                                                <input type="text" class="form-control" name="postcode" id="postcode" placeholder="Postcode" value="' . $orderPostcode . '">
                                                                                <label for="postcode">Postcode</label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-7">
                                                                            <div class="form-floating">
                                                                                <input type="text" class="form-control" name="city" id="city" placeholder="Stad" value="' . $orderCity . '">
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
                                                </div>';

                        $this->output .= '</form>' . PHP_EOL;
                    }
                }

                if (isset($addresses) && is_array($addresses)) {
                    $klant_straat = $shippingTask->geastraat . ' ' . $shippingTask->geahuisnr;
                    $klant_plaats = $shippingTask->geaplaats;

                    if ((count($addresses) > 1) || (trim(strtolower($shippingTask->geastraat)) != trim(strtolower($addresses[0]->straat)))) {

                        $validAddress = false;
                        foreach ($addresses as $address) {
                            if (trim(strtolower($address->straat)) == trim(strtolower($shippingTask->geastraat)) && trim(strtolower($address->plaats)) == trim(strtolower($shippingTask->geaplaats))) {
                                $validAddress = true;
                            }
                        }

                        if (!$validAddress) {
                            $shippingTask->geaplaats = '';
                            $this->redirect = false;


                            $this->output = '<div class="w-100">
                                    <div class="col-12">
                                        <div class="card row">
                                            <div class="card-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                Adres van klant en ingevoerde postcode komen niet overeen.
                                            </div>
                                            <div class="card-body">
                                                        <div class="row mt-3 border-bottom">
                                                            <p class="col-12"><b>Ingevuld door klant:</b></td></tr><tr><td><span class="large-text"> ' . $klant_straat . ', ' . $shippingTask->geapostcode . ' ' . $klant_plaats . '</span></p>
                                                        </div>
                                                        <div class="row mt-3 border-bottom"">
                                                            <div class="col-12">
                                                            <b>Straat en woonplaats, bij postcode:</b>
                                                            <ul id="street-list">';


                            foreach ($addresses as $ix => $adres) {
                                $this->output .= '<li class="large-text"><a href="#" class="text-decoration-none insert-address" data-rowid="' . $ix . '"><span class="insert-address-street"  data-rowid="' . $ix . '">' . $adres->straat . '</span> <span class="insert-address-city"  data-rowid="' . $ix . '">' . $adres->plaats . '</a></span></li>' . PHP_EOL;
                            }

                            $this->output .= '</ul>
                                                            </div>
                                                        </div>';

                            $this->output .= '<div class="row mt-5"><div class="col-12"><b>Pas het adres aan</b></div></div>';

                            $this->output .= '<form class="mt-2" method="post" id="updateAddressKoopman">' . PHP_EOL;

                            foreach ($_GET as $key => $value) {
                                $this->output .= "<input type='hidden' name='$key' value='$value'/>" . PHP_EOL;
                            }
                            $this->output .= '<input type="hidden" name="updateAddress" value="1">';
                            $this->output .= '<div class="row mb-3">
                                                                <div class="col-6">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="address1" id="address1" placeholder="Straat naam" value="' . $addresses[0]->straat . '">
                                                                        <label for="address1">Straat</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="house_number" id="house_number" placeholder="Huisnummer" value="' . $orderHouseNumber . '">
                                                                        <label for="house_number">Huis Nr.</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="house_number_extension" id="house_number_extension" placeholder="Toevoeging" value="' . $orderHouseNumberExt . '">
                                                                        <label for="house_number_extension">Toev.</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mb-3">
                                                                <div class="col-5">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="postcode" id="postcode" placeholder="Postcode" value="' . $addresses[0]->postcode . '">
                                                                        <label for="postcode">Postcode</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-7">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="city" id="city" placeholder="Stad" value="' . strtolower($addresses[0]->plaats) . '">
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
                                    </div>';
                        }
                    } else {
                        $shippingTask->geastraat = $addresses[0]->straat;
                        $shippingTask->geaplaats = $addresses[0]->plaats;
                    }
                }
            }

            if (!empty($shippingTask->geaplaats)) {

                $collieWeight =  (int)floor((float)($weight / $collies));

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
                        $collieRow->lengte = 200;
                        $collieRow->breedte = 40;
                        $collieRow->hoogte = 50;
                        $collieRow->gewicht = 200;
                    } elseif ($collieType == 'PLH') {
                        $collieRow->lengte = 80;
                        $collieRow->breedte = 60;
                        $collieRow->hoogte = 115;
                    } elseif ($collieType == 'PL') {
                        $collieRow->lengte = 80;
                        $collieRow->breedte = 120;
                        $collieRow->hoogte = 115;
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
                        if (file_put_contents($this->getLaneFolder() . '/' . $trackingNumber . '.pdf',
                            trim(base64_decode($labels)))) {

                            $this->ordersOk[] = $orderId;
                        }
                    }
                } catch (Exception $e) {
                    if (session_status() == PHP_SESSION_NONE) {
                        session_start();
                    }
                    $_SESSION['koopmanError'] = $e->getMessage();
                    die("Error met " . $e->getCode() . " en melding: " . $e->getMessage() . "<br/>");
                }

                if ($this->debug) {
                    try {
                        try {
                            $client2 = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL', $this->idLang, $this->idShopGroup, $this->idShop), $this->soapOptions);
                        } catch (Exception $e) {
                            die("Error met " . $e->getCode() . " en melding: error (new SoapClient) - " . $e->getMessage() . "<br/>");
                        }

                        $loginDel = new stdClass();
                        $loginDel->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME', $this->idLang, $this->idShopGroup, $this->idShop);
                        $loginDel->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD', $this->idLang, $this->idShopGroup, $this->idShop);
                        $loginDel->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT', $this->idLang, $this->idShopGroup, $this->idShop);
                        $loginDel->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER', $this->idLang, $this->idShopGroup, $this->idShop);
                        $client2->delOpdracht($loginDel, $transport->zendingnr);
                    } catch (Exception $e) {
                        die("Error met " . $e->getCode() . " en melding: " . $e->getMessage() . "<br/>");
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
     * @param $id_order
     * @param $trackingNumber
     * @return void
     */
    public function addTrackingNumberToOrder($id_order, $trackingNumber = null): void
    {
        if (!empty($trackingNumber)) {
            $db = \Db::getInstance();
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
            $db->update('order_carrier', [
                'tracking_number' => pSQL($newTrackNrs),
            ], 'id_order = ' . $id_order, 1, true);
        }
    }

    /**
     * Change state of orders.
     * @param $orders //array of orders
     * @param $state //new state to be set
     * @return bool
     **/
    public function setNewStateForOrders($orders, $state): bool
    {
        //get order object for each order and change status
        foreach ($orders as $order) {

            if (in_array($order['id_order'], $this->ordersOk)) {
                $orderObject = new Order((int)$order['id_order']);
                $orderObject->setCurrentState((int)$state, 0);
            }
        }

        return true;
    }

    /**
     * @return void
     * @throws PrestaShopDatabaseException
     * @throws SoapFault
     */
    public function dagafsluiting(): void
    {
        try {
            $client = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL', $this->idLang, $this->idShopGroup, $this->idShop),
                $this->soapOptions);
        } catch (Exception $e) {
            die("Error met " . $e->getCode() . " en melding: error (new SoapClient) - " . $e->getMessage() . "<br/>");
        }

        $login = new stdClass();
        $login->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER', $this->idLang, $this->idShopGroup, $this->idShop);

        //verzendlijst ophalen en als pdf opslaan
        try {
            $shippingList = $client->getVerzendlijst($login);
            if ($shippingList) {
                file_put_contents(str_replace('private_html', 'public_html',
                        $_SERVER['DOCUMENT_ROOT']) . '/upload/pakbonnen/verzendlijst_' . time() . '.pdf',
                    trim(base64_decode($shippingList)));
            }
        } catch (Exception $e) {
            die("Error met " . $e->getCode() . " en melding: " . $e->getMessage() . "<br/>");
        }
        //meld zendingen voor met sendOpdrachten
        $client->sendOpdrachten($login);

        //orders op verzonden zetten.
        if (Configuration::get('KOOPMANORDEREXPORT_UPDATE_BOOL', $this->idLang, $this->idShopGroup, $this->idShop) && is_numeric(Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop))) {
            //orders selecteren die met eerdere acties op 'Ligt klaar voor verzenden' staan (of andere update_status)
            $orders = $this->getOrders(Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop), Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop));
            foreach ($orders as $order) {
                $this->ordersOk[] = $order['id_order'];
            }
            $this->setNewStateForOrders($orders, $this->statusShipped);
        }
    }

    /*
    Helper functie om huisnummer en straat te scheiden
    */

    /**
     * @param $adres
     * @return array
     */
    public function splitAddress($adres): array
    {
        $arr_adres = explode(' ', $adres);
        $huisnummer = false;
        $arrayStreet = [];
        $arrayHouseNumber = [];
        $i = 0;
        foreach ($arr_adres as $deel) {
            if ($i > 0 && is_numeric(substr($deel, 0, 1))) {
                $huisnummer = true;
            }
            //vanaf eerste deel welke met getal begint, is het huisnummer (behalve allereerste element)
            if ($huisnummer) {
                $arrayHouseNumber[] = $deel;
            } else {
                $arrayStreet[] = $deel;
            }
            $i++;
        }

        return ['straat' => implode(' ', $arrayStreet), 'huisnummer' => implode(' ', $arrayHouseNumber)];
    }
}
