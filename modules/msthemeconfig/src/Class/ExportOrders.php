<?php
namespace MsThemeConfig\Class;
use PrestaShop\PrestaShop\Adapter\Entity\Configuration;
use PrestaShop\PrestaShop\Adapter\Entity\Context;
use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\DbQuery;
use PrestaShop\PrestaShop\Adapter\Entity\Order;
use SoapClient;
use stdClass;

/**
 * Class ExportOrders.
 */
class ExportOrders
{
    public $configuration;
    public string|array $labelsFolder;
    public array $ordersOk;

    //Verzonden status waar de orders na dagafsluiting op worden gezet
    public int $statusShipped = 4;

    public array $soapoptions;

    public bool $redirect = true;
    public string $output = '';

    public $id_order;
    public $weight;
    public $type;
    public int|null $idShop;
    public int|null $idShopGroup;
    public int|null $idLang;
    public ?\Context $context;

    /**
     * @param $id_order
     * @param $weight
     * @param $type
     */
    public function __construct($id_order, $weight, $type)
    {
        $this->id_order = $id_order;
        $this->weight = $weight;
        $this->type = $type;
        $this->context = Context::getContext();
        $this->ordersOk = [];
        $this->idLang = $this->context->language->id;
        $this->idShop = $this->context->shop->id;
        $this->idShopGroup = $this->context->shop->id_shop_group;
        $this->statusShipped = (int)Configuration::get('KOOPMANORDEREXPORT_STATUS_TRANSFERRED', $this->idLang, $this->idShopGroup, $this->idShop);
        $this->soapoptions = [
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
            $_SERVER['DOCUMENT_ROOT'] . 'upload/' . $folder);

    }

    /**
     * @return string
     */
    private function _getLaneFolder()
    {
        $lane_1 = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_1_PROFILE', $this->idLang, $this->idShopGroup, $this->idShop);

        $lane_2 = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_2_PROFILE', $this->idLang, $this->idShopGroup, $this->idShop);
        $lane_3 = (int)Configuration::get('KOOPMANORDEREXPORT_SELECT_PACKAGELANE_3_PROFILE', $this->idLang, $this->idShopGroup, $this->idShop);
        switch ((int)$this->context->employee->id_profile) {
            case $lane_2:
                return $this->labelsFolder . '/lane_2';
            case $lane_3:
                return $this->labelsFolder . '/lane_3';
            default:
                return $this->labelsFolder . '/lane_1';
        }
    }

    /**
     * Export orders.
     **/
    public function export()
    {
        $orders = $this->_getOrders(Configuration::get('KOOPMANORDEREXPORT_SELECT_STATUS', $this->idLang, $this->idShopGroup, $this->idShop), Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop), 1, $this->id_order);


        if (empty($orders)) {
            return false;
        }
        if (!empty($this->id_order)) {
            if (isset($this->weight)) {
                $gewicht = (int)$this->weight;
                if ($gewicht == 0) {
                    $gewicht = 1;
                }
            }

            if (isset($this->type)) {
                $type = $this->type;
                if ($type == '') {
                    $type = 'envelope';
                }
            }


            $this->_processOrdersNew($orders, $type, $gewicht);  //met adreskeuze indien meer dan 1 koopman straat/plaats
        } else {
            $this->_processOrdersNew($orders);  //met adreskeuze indien meer dan 1 koopman straat/plaats
        }

        //Update orders when selected and uploaded
        if (Configuration::get('KOOPMANORDEREXPORT_UPDATE_BOOL', $this->idLang, $this->idShopGroup, $this->idShop) && is_numeric(Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop)) && count($this->ordersOk) > 0) {
            $this->_setNewStateForOrders($orders, Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop));
        }
    }

    /*
    Function to prepare output directory for labels, if it doesn't exist
    */
    private function _prepareLabelsFolder()
    {
        if (!is_dir($this->_getLaneFolder())) {
            @mkdir($this->_getLaneFolder(), 0755);
        }
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
        file_put_contents($this->_getLaneFolder() . '/labels.php', $code);
    }


    public function doApiCall($route, $params, $headerParams = [])
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_URL', $this->idLang, $this->idShopGroup, $this->idShop) . '/api/' . $route,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $params,
            CURLOPT_HTTPHEADER => $headerParams,
        ));
        $response = curl_exec($curl);
        // Check if any error occurred
        if (!curl_errno($curl)) {
            $returnData = json_decode($response);
        } else {
            $returnData = [];
        }
        curl_close($curl);
        return $returnData;
    }

    public function dagafsluiting()
    {
        try {
            $client = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL', $this->idLang, $this->idShopGroup, $this->idShop), $this->soapoptions);
        } catch (Exception $e) {
            echo 'error (new SoapClient) - ' . $e->getMessage();

            return false;
        }

        $login = new stdClass();
        $login->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER', $this->idLang, $this->idShopGroup, $this->idShop);

        //verzendlijst ophalen en als pdf opslaan
        try {
            $verzendlijst = $client->getVerzendlijst($login);
        } catch (Exception $e) {
        }
        if ($verzendlijst) {
            file_put_contents(str_replace('private_html', 'public_html',
                    $_SERVER['DOCUMENT_ROOT']) . '/upload/pakbonnen/verzendlijst_' . time() . '.pdf',
                trim(base64_decode($verzendlijst)));
        }

        //meld zendingen voor met sendOpdrachten
        $client->sendOpdrachten($login);

        //orders op verzonden zetten..
        if (Configuration::get('KOOPMANORDEREXPORT_UPDATE_BOOL', $this->idLang, $this->idShopGroup, $this->idShop) && is_numeric(Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop))) {
            //orders selecteren die met eerdere acties op 'Ligt klaar voor verzenden' staan (of andere update_status)
            $orders = $this->_getOrders(Configuration::get('KOOPMANORDEREXPORT_UPDATE_STATUS', $this->idLang, $this->idShopGroup, $this->idShop), Configuration::get('KOOPMANORDEREXPORT_SELECT_CARRIER', $this->idLang, $this->idShopGroup, $this->idShop));
            foreach ($orders as $order) {
                $this->ordersOk[] = $order['id_order'];
            }
            $this->_setNewStateForOrders($orders, $this->statusShipped);
        }
        //Send api call to the dashboard
        $closure_time = date("Y-m-d H:i:s");
        $loginCall = $this->doApiCall('api-auth', [
            'email' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_USER', $this->idLang, $this->idShopGroup, $this->idShop),
            'password' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_PASS', $this->idLang, $this->idShopGroup, $this->idShop)
        ]);
        if (!empty($loginCall)) {
            $message = [];
            $message['text'] = 'Dagafsluiting gedraaid ' . date('d-m-Y H:i');
            $message['status'] = 'success';
            $message['error_records'] = null;
            $message['success_records'] = null;
            $message['time'] = $closure_time;

            $this->doApiCall('log-message', [
                'profile' => $this->context->shop->getUrls()[0]['domain'],
                'type' => 'dagafsluiting',
                'version' => _PS_VERSION_,
                'message' => json_encode($message),
            ], [
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Authorization: Bearer ' . $loginCall->access_token
            ]);
        }
    }

    /**
     * Get orders array for given state.
     * @param current order state
     * @param maximum number of records
     * @return array of orders
     *
     * @throws \PrestaShopDatabaseException
     */
    private function _getOrders($state, $carrier, $max = 300, $id_order = null)
    {
        if (!is_numeric($state)) {
            return false;
        }

        $sql = new DbQuery();
        $sql->select('*');
        $sql->from('orders', 'o');
        $sql->innerJoin('customer', 'c', 'c.id_customer = o.id_customer');
        $sql->innerJoin('address', 'a', 'a.id_address = o.id_address_delivery');
        $sql->innerJoin('country', 'co', 'co.id_country = a.id_country');
        if (isset($id_order)) { //als id is meegegeven dan maakt state en carrier niet meer uit
            $sql->where('o.id_order = ' . $id_order);
        } else {
            $sql->where('o.current_state = ' . $state);
            //$sql->where('o.id_carrier = '.$carrier);
            //$sql->where('o.id_carrier NOT IN (SELECT id_carrier FROM `carrier` WHERE is_free = 1)'); //GDU 14-12-2015, knop tonen bij verzenden carrier (afhalen => isfree = 1)
        }
        $sql->limit($max);
        $sql->orderBy('id_order desc');

        return Db::getInstance()->executeS($sql);
    }

    /*
    * get first public message (from the client)
    * Toegevoegd om afleverinstructies van de klant door te geven aan koopman. GDU 28-8-2017
    */
    /**
     * @param $id_order
     * @return array|bool|\mysqli_result|\PDOStatement|resource|null
     * @throws \PrestaShopDatabaseException
     */
    private function _getFirstClientMessage($id_order)
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
     * Change state of orders.
     * @param orders array
     * @param new state
     * @return success
     **/
    public function _setNewStateForOrders($orders, $state)
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

    private function _processOrdersNew($orders, $type = 'envelope', $gewicht = '0')
    {
        if (empty($orders)) {
            return false;
        }

        try {
            $client = new SoapClient(Configuration::get('KOOPMANORDEREXPORT_SOAP_URL', $this->idLang, $this->idShopGroup, $this->idShop), $this->soapoptions);
        } catch (Exception $e) {
            //echo "error (new SoapClient) - ".$e->getMessage();
            return false;
        }


        $login = new stdClass();
        $login->username = Configuration::get('KOOPMANORDEREXPORT_API_USERNAME', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->password = Configuration::get('KOOPMANORDEREXPORT_API_PASSWORD', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->depot = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_DEPOT', $this->idLang, $this->idShopGroup, $this->idShop);
        $login->verlader = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_VERLADER', $this->idLang, $this->idShopGroup, $this->idShop);

        foreach ($orders as $row) {
            $opdracht = new stdClass();
            $opdracht->type = 'T'; // T = Stukgoed Levering
            $opdracht->nrorder = $row['reference'];
//            Verzender gegevens
            $opdracht->afzender = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDER', $this->idLang, $this->idShopGroup, $this->idShop);

            $opdracht->afznaam = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM', $this->idLang, $this->idShopGroup, $this->idShop);
            $opdracht->afznaam2 = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERNAAM2', $this->idLang, $this->idShopGroup, $this->idShop);
            $opdracht->afzastraat = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERSTRAAT', $this->idLang, $this->idShopGroup, $this->idShop);
            $opdracht->afzhuisnr = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERHUISNR', $this->idLang, $this->idShopGroup, $this->idShop);
            $opdracht->afzpostcode = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPOSTCODE', $this->idLang, $this->idShopGroup, $this->idShop);
            $opdracht->afzplaats = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERPLAATS', $this->idLang, $this->idShopGroup, $this->idShop);
            $opdracht->afzland = Configuration::get('KOOPMANORDEREXPORT_KOOPMAN_AFZENDERLAND', $this->idLang, $this->idShopGroup, $this->idShop);
//            Klant gegevens
            $opdracht->geanaam = $row['firstname'] . ' ' . $row['lastname'];
            $opdracht->geanaam2 = $row['company'];
            $adres = $this->_splitAddress($row['address1']);
            $opdracht->geastraat = $row['address1'];
            $opdracht->geahuisnr = $row['house_number'] . ' ' . $row['house_number_extension'];
            $opdracht->geapostcode = $row['postcode'];
            $opdracht->geaplaats = $row['city'];
            $opdracht->gealand = $row['iso_code'];
            $opdracht->geatelefoon = $row['phone'];
            $opdracht->geaemail = $row['email'];

            $msg = $this->_getFirstClientMessage($row['id_order']);

            if (!empty($msg)) {
                $opdracht->instructie = $msg[0]['message'];
            }
            if ($opdracht->gealand == 'NL') { // haal straat + plaats op bij koopman voor NL

                try {
                    $adressen = $client->getAdresNL_2($login, $row['postcode']);

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
                                                                            <input type="text" class="form-control" name="address1" id="address1" placeholder="Straat naam" value="' . $row['address1'] . '">
                                                                            <label for="address1">Straat</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-3">
                                                                        <div class="form-floating">
                                                                            <input type="text" class="form-control" name="house_number" id="house_number" placeholder="Huisnummer" value="' . $row['house_number'] . '">
                                                                            <label for="house_number">Huis Nr.</label>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-3">
                                                                        <div class="form-floating">
                                                                            <input type="text" class="form-control" name="house_number_extension" id="house_number_extension" placeholder="Toevoeging" value="' . $row['house_number_extension'] . '">
                                                                            <label for="house_number_extension">Toev.</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row mb-3">
                                                                        <div class="col-5">
                                                                            <div class="form-floating">
                                                                                <input type="text" class="form-control" name="postcode" id="postcode" placeholder="Postcode" value="' . $row['postcode'] . '">
                                                                                <label for="postcode">Postcode</label>
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-7">
                                                                            <div class="form-floating">
                                                                                <input type="text" class="form-control" name="city" id="city" placeholder="Stad" value="' . $row['city'] . '">
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
                if (isset($adressen) && is_array($adressen)) {
                    $klant_straat = $opdracht->geastraat . ' ' . $opdracht->geahuisnr;
                    $klant_plaats = $opdracht->geaplaats;

                    if ((count($adressen) > 1) || (trim(strtolower($opdracht->geastraat)) != trim(strtolower($adressen[0]->straat)))) {

                        $validAddress = false;
                        foreach ($adressen as $index => $address) {
                            if(trim(strtolower($address->straat)) == trim(strtolower($opdracht->geastraat)) && trim(strtolower($address->plaats)) == trim(strtolower($opdracht->geaplaats))){
                                $validAddress = true;
                            }
                        }

                        if (!$validAddress){
                            $opdracht->geaplaats = '';
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
                                                            <p class="col-12"><b>Ingevuld door klant:</b></td></tr><tr><td><span class="large-text"> ' . $klant_straat . ', ' . $opdracht->geapostcode . ' ' . $klant_plaats . '</span></p>
                                                        </div>
                                                        <div class="row mt-3 border-bottom"">
                                                            <div class="col-12">
                                                            <b>Straat en woonplaats, bij postcode:</b>
                                                            <ul id="street-list">';

                            foreach ($adressen as $ix => $adres) {
                                $this->output .= '<li class="large-text">' . $adres->straat . ', ' . $adres->plaats . '</li>' . PHP_EOL;
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
                                                                        <input type="text" class="form-control address-input-text" name="address1" id="address1" placeholder="Straat naam" value="' . $row['address1'] . '">
                                                                        <label for="address1">Straat</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="house_number" id="house_number" placeholder="Huisnummer" value="' . $row['house_number'] . '">
                                                                        <label for="house_number">Huis Nr.</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-3">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="house_number_extension" id="house_number_extension" placeholder="Toevoeging" value="' . $row['house_number_extension'] . '">
                                                                        <label for="house_number_extension">Toev.</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row mb-3">
                                                                <div class="col-5">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="postcode" id="postcode" placeholder="Postcode" value="' . $row['postcode'] . '">
                                                                        <label for="postcode">Postcode</label>
                                                                    </div>
                                                                </div>
                                                                <div class="col-7">
                                                                    <div class="form-floating">
                                                                        <input type="text" class="form-control address-input-text" name="city" id="city" placeholder="Stad" value="' . $row['city'] . '">
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
                        $opdracht->geastraat = $adressen[0]->straat;
                        $opdracht->geaplaats = $adressen[0]->plaats;
                    }
                }
            }

            if (isset($_GET['zaterdag']) && (int)$_GET['zaterdag'] == 1 && $opdracht->gealand == 'NL') {
                $opdracht->zaterdag = 1;
                if (empty($opdracht->geatelefoon)) {
                    $opdracht->geatelefoon = '1234567890'; //zaterdaglevering = telefoon verplicht
                }
            }

            if (!empty($opdracht->geaplaats)) {
                $regel = new stdClass();
                $regel->nrcollo = 1;
                /*
                * Gewijzigd door JB Stoker - Moderne Smid
                * Pakket maten en soorten aangepast en type optie toegevoegd
                *  -Envelop : (50 x 30 x 1=1Kg) / value = envelope
                *  -Plaat : (50 x 30 x 1=15Kg) / value = plaat
                *  -1 Meter : (50 x 30 x 1=15Kg) / value = 1-meter
                *  -2 Meter < 15 : (50 x 30 x 1= 14Kg) / value = 2-meter-smaller
                *  -2 Meter > 15 : (50 x 30 x 1= 30Kg) / value = 2-meter-larger
                *
                */

                $regel->vrzenh = 'COL';
                $regel->gewicht = $gewicht;

                switch ($type) {
                    case 'envelope':
                        $regel->lengte = 50;
                        $regel->breedte = 30;
                        $regel->hoogte = 1;
                        break;
                    case 'plaat':
                        $regel->lengte = 100;
                        $regel->breedte = 50;
                        $regel->hoogte = 1;
                        break;
                    case '1-meter':
                        $regel->lengte = 100;
                        $regel->breedte = 20;
                        $regel->hoogte = 20;
                        break;
                    case '2-meter-larger':
                    case '2-meter-smaller':
                        $regel->lengte = 199;
                        $regel->breedte = 15;
                        $regel->hoogte = 15;
                        break;
                    default://envelope sizes
                        $regel->lengte = 50;
                        $regel->breedte = 30;
                        $regel->hoogte = 1;
                        break;
                }


                $opdracht->aRegel[1] = $regel;

                $transport = false;
                try {
                    $transport = $client->addOpdracht($login, $opdracht);
                } catch (Exception $e) {
                    //die("error - ".$e->getMessage());
                    if (session_status() == PHP_SESSION_NONE) {
					      session_start();
					   }
                    $_SESSION['koopmanError'] = $e->getMessage();
                }


                if ($transport) {
                    $zendingnr = $transport->zendingnr;
                    $zendingnr = 'T' . substr($zendingnr, 1); //T98
                    $this->_addTrackingNumberToOrder($row['id_order'], $zendingnr);

                    $labels = $transport->labels;
                    $this->redirect = true;
                    if (file_put_contents($this->_getLaneFolder() . '/' . $zendingnr . '.pdf',
                        trim(base64_decode($labels)))) {

                        $this->ordersOk[] = $row['id_order'];

                        //Add new labels Api call
                        $loginCall = $this->doApiCall('api-auth', [
                            'email' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_USER', $this->idLang, $this->idShopGroup, $this->idShop),
                            'password' => Configuration::get('MSTHEMECONFIG_DASHBOARD_API_PASS', $this->idLang, $this->idShopGroup, $this->idShop)
                        ]);

                        if (!empty($loginCall)) {

                            $firstname = "";
                            if (isset($this->context->employee->firstname)) {
                                $firstname = $this->context->employee->firstname;
                            }
                            if (isset($this->context->customer->firstname)) {
                                $firstname = $this->context->customer->firstname;
                            }

                            $successRecord = $row['id_order'];
                            if (isset($row['reference'])) {
                                $successRecord = $row['reference'];
                            }

                            $message = [];
                            $message['text'] = json_encode(['location' => $firstname, 'data' => $zendingnr]);
                            $message['status'] = 'success';
                            $message['sub-type'] = 'registered-at-transmission';
                            $message['error_records'] = null;
                            $message['success_records'] = $successRecord;
                            $message['time'] = date("Y-m-d H:i:s");

                            $this->doApiCall('log-message', [
                                'profile' => $this->context->shop->getUrls()[0]['domain'],
                                'type' => 'koopman-actions',
                                'version' => _PS_VERSION_,
                                'message' => json_encode($message),
                            ], [
                                'Content-Type' => 'application/x-www-form-urlencoded',
                                'Authorization: Bearer ' . $loginCall->access_token
                            ]);
                        }
                    }
                }
            }
        }
    }

    public function _addTrackingNumberToOrder($id_order, $trackingNumber = null)
    {
        if (!is_null($trackingNumber) && !empty($trackingNumber)) {
            $db = \Db::getInstance();
            $requestSelect = 'SELECT `tracking_number` FROM `' . _DB_PREFIX_ . 'order_carrier` WHERE `id_order` = ' . $id_order;
            $resultSelect = $db->getValue($requestSelect);

            if (!empty($resultSelect)) {
                $existingTrackNrs = explode(',', $resultSelect);
                array_push($existingTrackNrs, $trackingNumber);
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

    /*
    Helper functie om huisnummer en straat te scheiden
    */
    public function _splitAddress($adres)
    {
        $arr_adres = explode(' ', $adres);
        $huisnummer = false;
        $arr_straat = [];
        $arr_huisnr = [];
        $i = 0;
        foreach ($arr_adres as $deel) {
            if ($i > 0 && is_numeric(substr($deel, 0, 1))) {
                $huisnummer = true;
            } //vanaf eerste deel welke met getal begint is het huisnummer (behalve allereerste element)
            if ($huisnummer) {
                $arr_huisnr[] = $deel;
            } else {
                $arr_straat[] = $deel;
            }
            $i++;
        }

        return ['straat' => implode(' ', $arr_straat), 'huisnummer' => implode(' ', $arr_huisnr)];
    }
}
