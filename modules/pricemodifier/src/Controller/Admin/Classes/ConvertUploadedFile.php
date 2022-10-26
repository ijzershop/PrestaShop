<?php
namespace Modernesmid\Module\Pricemodifier\Controller\Admin\Classes;
use NumberFormatter;
use PhpOffice\PhpSpreadsheet\IOFactory as IoFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class ConvertUploadedFile
{

    private $moneyFormatter;

    function __construct()
    {
        $this->moneyFormatter = new NumberFormatter('nl-NL', NumberFormatter::DECIMAL);
    }


    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     * @throws \PhpOffice\PhpSpreadsheet\Reader\Exception
     */
    public function readFile($filename, $supplier_name, $render = 'array')
    {
        /**  Identify the type of $inputFileName  **/
        try {

            $file_type = IoFactory::identify($filename);
        } catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
            return $e->getMessage();
        }


        /**  Create a new Reader of the type that has been identified  **/
        $reader = IoFactory::createReader($file_type);

        // Need this otherwise dates and such are returned formatted
        $reader->setReadDataOnly(true);

        // Just grab all the rows
        $file_obj = $reader->load($filename);

        if ($render == 'xml') {
            return $this->processXml($file_obj, $supplier_name, $file_type);
        } else {
            return $this->processXmlToArray($file_obj, $supplier_name, $file_type);
        }
    }


    private function processXmlToArray($file_obj, $supplier_name, $file_type)
    {
        switch ($supplier_name) {
            case 'DOUMA':
                //Start Douma xml file
                if ($file_type == 'Xls' || $file_type == 'Xlsx') {
                    $new_data_array = [];

                    $sheets = $file_obj->getSheetNames();
                    foreach ($sheets as $sheet_name) {
                        $worksheet = $file_obj->getSheetByName($sheet_name);
                        $sheetName = preg_replace(["/^([0-9]\s*-\s*)/", " /\s\s+/"], ["", " "], rtrim($sheet_name));

                        $tabArray = ["WGW RONDSTAAL",
                            "WGW RONDSTAAL - S355J2",
                            "WGW VIERKANTSTAAL",
                            "WGW VIERKANTSTAAL - S355J2",
                            "WGW PLATSTAAL",
                            "WGW PLATSTAAL S355J2",
                            "WGW HOEKSTAAL GELIJKZIJDIG",
                            "WGW HOEK GELIJKZIJDIG S355J2",
                            "WGW HOEKSTAAL ONGELIJKZIJDI",
                            "WGW HOEKSTAAL VERZINKT",
                            "WGW T - STAAL",
                            "WGW UNP - STAAL",
                            "WGW HALFRONDSTAAL",
                            "WGW STRIPPEN",
                            "WGW STRIPPEN S355J2",
                            "BALKSTAAL HE- A",
                            "BALKSTAAL HE- B",
                            "BALKSTAAL IPE",
                            "BALKSTAAL UNP",
                            "WGW PLATEN S235JRG2",
                            "WGW GEBEITSTE PLATEN",
                            "WGW TRANENPLATEN",
                            "KGW PLATEN DC01",
                            "SENDZIMIR VERZ PLATEN",
                            "ELECTROLYTISCH VERZ PLATEN",
                            "WGW LASER PLATEN",
                            "WGW CORTEN PLATEN",
                            "KOKER ONGEBEITST VIERK",
                            "KOKER ONGEBEITST RECHT",
                            "KOKER GEBEITST VIERKAN",
                            "KOKER GEBEITST RECHTHO",
                            "GELASTE KL A BUIS",
                            "GELASTE GASBUIS",
                            "GELASTE CONSTR. BUIS",
                            "GELASTE STOOMBUIS",
                            "GELASTE PRECISIEBUIS",
                            "GELASTE BUIS",
                            "NAADLOZE BUIS",
                            "KGW HOEKPROFIEL",
                            "KGW U-PROFIEL",
                            "KGW DIVERSEN",
                            "BLANK-ST 37-2 K PLAT",
                            "BLANK-ST 37-2 K ROND",
                            "BLANK-ST 52-3 K ROND",
                            "BLANK-C 45 K ROND",
                            "BLANK-ST 37-2 K HOEK",
                            "BLANK-ST 37-2 K VIERKANT",
                            "BLANK-AUTOMATENST. ROND",
                            "BLANK-AUTOMATENST. VIERK."
                        ];
                        if (in_array((string)$sheetName, $tabArray)) {
                            $result = $this->processDoumaXmlCells($worksheet, $sheetName);
                            if (!is_null($result)) {
                                array_push($new_data_array, $result);
                            }
                        }
                    }

                    $data = $this->formatArray($new_data_array);
                    return $data;
                }
                //End Douma xml file
                break;
            case 'MCB':
                //Start MCB xml file
                if ($file_type == 'Xls' || $file_type == 'Xlsx') {
                    $new_data_array = [];

                    $sheets = $file_obj->getSheetNames();
                    foreach ($sheets as $sheet_name) {
                        $worksheet = $file_obj->getSheetByName($sheet_name);
                        $sheetName = preg_replace(["/^([0-9]\s*-\s*)/", " /\s\s+/"], ["", " "], rtrim($sheet_name));


                            $result = $this->processMcbXmlCells($worksheet, $sheetName);
                            if (!is_null($result)) {
                                array_push($new_data_array, $result);
                            }
                    }

                    $data = $this->formatArray($new_data_array);
                    return $data;
                }
                //End MCB xml file
                break;
            case 'INDI':
                //Start Indi xml file

                if ($file_type == 'Xls' || $file_type == 'Xlsx') {
                    $new_data_array = [];

                    $sheets = $file_obj->getSheetNames();
                    foreach ($sheets as $sheet_name) {
                        $worksheet = $file_obj->getSheetByName($sheet_name);
                        $sheetName = preg_replace(["/^([0-9]\s*-\s*)/", " /\s\s+/"], ["", " "], rtrim($sheet_name));

                        $result = $this->processIndiXmlCells($worksheet, $sheetName);

                        if (!is_null($result)) {
                            array_push($new_data_array, $result);
                        }
                    }

                    $data = $this->formatArray($new_data_array);


                    return $data;
                }
                //End Indi xml file
                break;
        }
    }


    private function processXml($file_obj, $supplier_name, $file_type)
    {
        switch ($supplier_name) {
            case 'DOUMA':
                //Start Douma xml file
                if ($file_type == 'Xls') {
                    $new_data_array = [];

                    $sheets = $file_obj->getSheetNames();
                    foreach ($sheets as $sheet_name) {
                        $worksheet = $file_obj->getSheetByName($sheet_name);
                        $sheetName = preg_replace(["/^([0-9]\s*-\s*)/", " /\s\s+/"], ["", " "], rtrim($sheet_name));

                        $tabArray = ["WGW RONDSTAAL",
                            "WGW RONDSTAAL - S355J2",
                            "WGW VIERKANTSTAAL",
                            "WGW VIERKANTSTAAL - S355J2",
                            "WGW PLATSTAAL",
                            "WGW PLATSTAAL S355J2",
                            "WGW HOEKSTAAL GELIJKZIJDIG",
                            "WGW HOEK GELIJKZIJDIG S355J2",
                            "WGW HOEKSTAAL ONGELIJKZIJDI",
                            "WGW HOEKSTAAL VERZINKT",
                            "WGW T - STAAL",
                            "WGW UNP - STAAL",
                            "WGW HALFRONDSTAAL",
                            "WGW STRIPPEN",
                            "WGW STRIPPEN S355J2",
                            "BALKSTAAL HE- A",
                            "BALKSTAAL HE- B",
                            "BALKSTAAL IPE",
                            "BALKSTAAL UNP",
                            "WGW PLATEN S235JRG2",
                            "WGW GEBEITSTE PLATEN",
                            "WGW TRANENPLATEN",
                            "KGW PLATEN DC01",
                            "SENDZIMIR VERZ PLATEN",
                            "ELECTROLYTISCH VERZ PLATEN",
                            "WGW LASER PLATEN",
                            "WGW CORTEN PLATEN",
                            "KOKER ONGEBEITST VIERK",
                            "KOKER ONGEBEITST RECHT",
                            "KOKER GEBEITST VIERKAN",
                            "KOKER GEBEITST RECHTHO",
                            "GELASTE KL A BUIS",
                            "GELASTE GASBUIS",
                            "GELASTE CONSTR. BUIS",
                            "GELASTE STOOMBUIS",
                            "GELASTE PRECISIEBUIS",
                            "GELASTE BUIS",
                            "NAADLOZE BUIS",
                            "KGW HOEKPROFIEL",
                            "KGW U-PROFIEL",
                            "KGW DIVERSEN",
                            "BLANK-ST 37-2 K PLAT",
                            "BLANK-ST 37-2 K ROND",
                            "BLANK-ST 52-3 K ROND",
                            "BLANK-C 45 K ROND",
                            "BLANK-ST 37-2 K HOEK",
                            "BLANK-ST 37-2 K VIERKANT",
                            "BLANK-AUTOMATENST. ROND",
                            "BLANK-AUTOMATENST. VIERK."
                        ];
                        if (in_array((string)$sheetName, $tabArray)) {

                            $result = $this->processDoumaXmlCells($worksheet, $sheetName);

                            if (!is_null($result)) {
                                array_push($new_data_array, $result);
                            }
                        }
                    }


                    $data = $this->formatArray($new_data_array);

                    $this->createXlsFile($data, $supplier_name);

                    print("<pre>XML is gedownload</pre>");
                    print("<pre>" . print_r($data, true) . "</pre>");
                }
                //End Douma xml file
                break;
            case 'HAQUEBORD':
                break;
        }
    }

    public function processUpload()
    {
        return $this->readFile('C:\wamp64\www\ijzershop8.local\modules\pricemodifier\uploads\Douma-prijslijst-2022-05-18.xls',
            'DOUMA');
    }


    private function createXlsFile($data_array, $supplier_name)
    {
        $spreadsheet = new Spreadsheet();
        $spreadsheet->setActiveSheetIndex(0);
        $spreadsheet->getActiveSheet()->setCellValue('A1', 'Type');
        $spreadsheet->getActiveSheet()->setCellValue('B1', 'Naam');
        $spreadsheet->getActiveSheet()->setCellValue('C1', 'Diameter');
        $spreadsheet->getActiveSheet()->setCellValue('D1', 'Kwaliteit');
        $spreadsheet->getActiveSheet()->setCellValue('E1', 'Uitvoering');
        $spreadsheet->getActiveSheet()->setCellValue('F1', 'Handelslengte');
        $spreadsheet->getActiveSheet()->setCellValue('G1', 'Gewicht');
        $spreadsheet->getActiveSheet()->setCellValue('H1', 'Prijs p/m');
        $spreadsheet->getActiveSheet()->setCellValue('I1', 'Prijs kg/p');
        $spreadsheet->getActiveSheet()->setCellValue('J1', 'Prijs < 75kg');
        $spreadsheet->getActiveSheet()->setCellValue('K1', 'Prijs < 150');
        $spreadsheet->getActiveSheet()->setCellValue('L1', 'Prijs < 250');
        $spreadsheet->getActiveSheet()->setCellValue('M1', 'Prijs < 300');
        $spreadsheet->getActiveSheet()->setCellValue('N1', 'Prijs < 500');
        $spreadsheet->getActiveSheet()->setCellValue('O1', 'Prijs < 1000');
        $spreadsheet->getActiveSheet()->setCellValue('P1', 'Prijs > 300');
        $spreadsheet->getActiveSheet()->setCellValue('Q1', 'Prijs > 1000');
        $spreadsheet->getActiveSheet()->setCellValue('R1', 'Stralen & Menieën p/m');
        $spreadsheet->getActiveSheet()->setCellValue('S1', 'Stralen & Menieën p/100kg');
        $spreadsheet->getActiveSheet()->setCellValue('T1', 'Stralen p/m');
        $spreadsheet->getActiveSheet()->setCellValue('U1', 'Stralen p/100kg');
        $spreadsheet->getActiveSheet()->setCellValue('V1', 'Verven p/m1');
        $spreadsheet->getActiveSheet()->setCellValue('W1', 'Haaks Zagen');

        foreach ($data_array as $key => $row) {
            $index = $key + 2;
            $spreadsheet->getActiveSheet()->setCellValue('A' . $index, $row['type']);
            $spreadsheet->getActiveSheet()->setCellValue('B' . $index, $row['naam']);
            $spreadsheet->getActiveSheet()->setCellValue('C' . $index, $row['diameter']);
            $spreadsheet->getActiveSheet()->setCellValue('D' . $index, $row['kwaliteit']);
            $spreadsheet->getActiveSheet()->setCellValue('E' . $index, $row['uitvoering']);
            $spreadsheet->getActiveSheet()->setCellValue('F' . $index, $row['handelslengte']);
            $spreadsheet->getActiveSheet()->setCellValue('G' . $index, $row['gewicht']);
            $spreadsheet->getActiveSheet()->setCellValue('H' . $index, $row['prijs_per_meter']);
            $spreadsheet->getActiveSheet()->setCellValue('I' . $index, $row['kilo_per_meter']);
            $spreadsheet->getActiveSheet()->setCellValue('J' . $index, $row['prijs_tot_75']);
            $spreadsheet->getActiveSheet()->setCellValue('K' . $index, $row['prijs_tot_150']);
            $spreadsheet->getActiveSheet()->setCellValue('L' . $index, $row['prijs_tot_250']);
            $spreadsheet->getActiveSheet()->setCellValue('M' . $index, $row['prijs_tot_300']);
            $spreadsheet->getActiveSheet()->setCellValue('N' . $index, $row['prijs_tot_500']);
            $spreadsheet->getActiveSheet()->setCellValue('O' . $index, $row['prijs_tot_1000']);
            $spreadsheet->getActiveSheet()->setCellValue('P' . $index, $row['prijs_vanaf_300']);
            $spreadsheet->getActiveSheet()->setCellValue('Q' . $index, $row['prijs_vanaf_1000']);
            $spreadsheet->getActiveSheet()->setCellValue('R' . $index, $row['stralen_menieen_per_meter']);
            $spreadsheet->getActiveSheet()->setCellValue('S' . $index, $row['stralen_menieen_per_100']);
            $spreadsheet->getActiveSheet()->setCellValue('T' . $index, $row['stralen_per_meter']);
            $spreadsheet->getActiveSheet()->setCellValue('U' . $index, $row['stralen_per_100']);
            $spreadsheet->getActiveSheet()->setCellValue('V' . $index, $row['verven_per_m1']);
            $spreadsheet->getActiveSheet()->setCellValue('W' . $index, $row['haaks_zagen']);
        }

        $spreadsheet->getActiveSheet()->setTitle("Prijslijst " . $supplier_name);

        $styleArrayFirstRow = [
            'font' => [
                'bold' => true,
            ]
        ];

        $highestColumn = $spreadsheet->getActiveSheet()->getHighestColumn();
        $spreadsheet->getActiveSheet()->getStyle('A1:' . $highestColumn . '1')->applyFromArray($styleArrayFirstRow);


        for ($s = 'A'; $s != $spreadsheet->getActiveSheet()->getHighestColumn(); $s++) {
            $spreadsheet->getActiveSheet()->getColumnDimension($s)->setAutoSize(true);
        }


        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="prijslijst_' . $supplier_name . '.xls"');
        header('Cache-Control: max-age=0');
        header('Cache-Control: max-age=1');
        header('Cache-Control: cache, must-revalidate');
        header('Pragma: public');

        $writer = IoFactory::createWriter($spreadsheet, 'Xls');
        $writer->save('php://output');
    }

    /**
     * @param $data_array
     * @return array
     */
    private function formatArray($data_array)
    {
        $new_data = [];
        foreach ($data_array as $sheet_array) {
            for ($i = 0; $i < count($sheet_array); $i++) {
                $arr = [];
                $arr['type'] = isset($sheet_array[$i]['type']) ? $sheet_array[$i]['type'] : '';
                $arr['naam'] = isset($sheet_array[$i]['naam']) ? $sheet_array[$i]['naam'] : '';
                $arr['diameter'] = isset($sheet_array[$i]['diameter']) ? $sheet_array[$i]['diameter'] : '';
                $arr['kwaliteit'] = isset($sheet_array[$i]['kwaliteit']) ? $sheet_array[$i]['kwaliteit'] : '';
                $arr['uitvoering'] = isset($sheet_array[$i]['uitvoering']) ? $sheet_array[$i]['uitvoering'] : '';
                $arr['handelslengte'] = isset($sheet_array[$i]['handelslengte']) ? $sheet_array[$i]['handelslengte'] : '';
                $arr['gewicht'] = isset($sheet_array[$i]['gewicht']) ? $sheet_array[$i]['gewicht'] : '';
                $arr['prijs_per_meter'] = isset($sheet_array[$i]['prijs_per_meter']) ? $sheet_array[$i]['prijs_per_meter'] : '';
                $arr['kilo_per_meter'] = isset($sheet_array[$i]['kilo_per_meter']) ? $sheet_array[$i]['kilo_per_meter'] : '';
                $arr['prijs_tot_75'] = isset($sheet_array[$i]['prijs_tot_75']) ? $sheet_array[$i]['prijs_tot_75'] : '';
                $arr['prijs_tot_150'] = isset($sheet_array[$i]['prijs_tot_150']) ? $sheet_array[$i]['prijs_tot_150'] : '';
                $arr['prijs_tot_250'] = isset($sheet_array[$i]['prijs_tot_250']) ? $sheet_array[$i]['prijs_tot_250'] : '';
                $arr['prijs_tot_300'] = isset($sheet_array[$i]['prijs_tot_300']) ? $sheet_array[$i]['prijs_tot_300'] : '';
                $arr['prijs_tot_500'] = isset($sheet_array[$i]['prijs_tot_500']) ? $sheet_array[$i]['prijs_tot_500'] : '';
                $arr['prijs_tot_1000'] = isset($sheet_array[$i]['prijs_tot_1000']) ? $sheet_array[$i]['prijs_tot_1000'] : '';
                $arr['prijs_vanaf_300'] = isset($sheet_array[$i]['prijs_vanaf_300']) ? $sheet_array[$i]['prijs_vanaf_300'] : '';
                $arr['prijs_vanaf_1000'] = isset($sheet_array[$i]['prijs_vanaf_1000']) ? $sheet_array[$i]['prijs_vanaf_1000'] : '';
                $arr['stralen_menieen_per_meter'] = isset($sheet_array[$i]['stralen_menieen_per_meter']) ? $sheet_array[$i]['stralen_menieen_per_meter'] : '';
                $arr['stralen_menieen_per_100'] = isset($sheet_array[$i]['stralen_menieen_per_100']) ? $sheet_array[$i]['stralen_menieen_per_100'] : '';
                $arr['stralen_per_meter'] = isset($sheet_array[$i]['stralen_per_meter']) ? $sheet_array[$i]['stralen_per_meter'] : '';
                $arr['stralen_per_100'] = isset($sheet_array[$i]['stralen_per_100']) ? $sheet_array[$i]['stralen_per_100'] : '';
                $arr['verven_per_m1'] = isset($sheet_array[$i]['verven_per_m1']) ? $sheet_array[$i]['verven_per_m1'] : '';
                $arr['haaks_zagen'] = isset($sheet_array[$i]['haaks_zagen']) ? $sheet_array[$i]['haaks_zagen'] : '';

                $arr['artikel_nummer'] = isset($sheet_array[$i]['artikel_nummer']) ? $sheet_array[$i]['artikel_nummer'] : '';

                //Indi specifiek
                $arr['artikel_groep'] = isset($sheet_array[$i]['artikel_groep']) ? $sheet_array[$i]['artikel_groep'] : '';
                $arr['barcode'] = isset($sheet_array[$i]['barcode']) ? $sheet_array[$i]['barcode'] : '';
                $arr['bruto_prijs_per_stuk'] = isset($sheet_array[$i]['bruto_prijs_per_stuk']) ? $sheet_array[$i]['bruto_prijs_per_stuk'] : '';
                $arr['netto_prijs_per_stuk'] = isset($sheet_array[$i]['netto_prijs_per_stuk']) ? $sheet_array[$i]['netto_prijs_per_stuk'] : '';
                $arr['min_afname'] = isset($sheet_array[$i]['min_afname']) ? $sheet_array[$i]['min_afname'] : '';
                $arr['eenheid'] = isset($sheet_array[$i]['eenheid']) ? $sheet_array[$i]['eenheid'] : '';
                $arr['oud_artikel'] = isset($sheet_array[$i]['oud_artikel']) ? $sheet_array[$i]['oud_artikel'] : '';
                $arr['nieuw_artikel'] = isset($sheet_array[$i]['nieuw_artikel']) ? $sheet_array[$i]['nieuw_artikel'] : '';
                $arr['korting'] = isset($sheet_array[$i]['korting']) ? $sheet_array[$i]['korting'] : '';


                //MCB specifiek
                 $arr['standaard_prijs'] = isset($sheet_array[$i]['standaard_prijs']) ? $sheet_array[$i]['standaard_prijs'] : '';
                 $arr['prijs_aantal_1'] = isset($sheet_array[$i]['prijs_aantal_1']) ? $sheet_array[$i]['prijs_aantal_1'] : '';
                 $arr['prijs_1'] = isset($sheet_array[$i]['prijs_1']) ? $sheet_array[$i]['prijs_1'] : '';
                 $arr['prijs_aantal_2'] = isset($sheet_array[$i]['prijs_aantal_2']) ? $sheet_array[$i]['prijs_aantal_2'] : '';
                 $arr['prijs_2'] = isset($sheet_array[$i]['prijs_2']) ? $sheet_array[$i]['prijs_2'] : '';
                 $arr['prijs_aantal_3'] = isset($sheet_array[$i]['prijs_aantal_3']) ? $sheet_array[$i]['prijs_aantal_3'] : '';
                 $arr['prijs_3'] = isset($sheet_array[$i]['prijs_3']) ? $sheet_array[$i]['prijs_3'] : '';
                 $arr['prijs_aantal_4'] = isset($sheet_array[$i]['prijs_aantal_4']) ? $sheet_array[$i]['prijs_aantal_4'] : '';
                 $arr['prijs_4'] = isset($sheet_array[$i]['prijs_4']) ? $sheet_array[$i]['prijs_4'] : '';
                 $arr['prijs_aantal_5'] = isset($sheet_array[$i]['prijs_aantal_5']) ? $sheet_array[$i]['prijs_aantal_5'] : '';
                 $arr['prijs_5'] = isset($sheet_array[$i]['prijs_5']) ? $sheet_array[$i]['prijs_5'] : '';
                 $arr['prijs_aantal_6'] = isset($sheet_array[$i]['prijs_aantal_6']) ? $sheet_array[$i]['prijs_aantal_6'] : '';
                 $arr['prijs_6'] = isset($sheet_array[$i]['prijs_6']) ? $sheet_array[$i]['prijs_6'] : '';
                 $arr['prijs_aantal_7'] = isset($sheet_array[$i]['prijs_aantal_7']) ? $sheet_array[$i]['prijs_aantal_7'] : '';
                 $arr['prijs_7'] = isset($sheet_array[$i]['prijs_7']) ? $sheet_array[$i]['prijs_7'] : '';

                if(!empty($arr['artikel_nummer']) && !empty($arr['artikel_groep'])){
                    $arr['type'] = $arr['artikel_groep'] . ' - ' . $arr['artikel_nummer'];
                }

                array_push($new_data, $arr);
            }
        }


        $arrdat = array_map("unserialize", array_unique(array_map("serialize", $new_data)));

        return $arrdat;
    }


    /**
     * @param $worksheet
     * @param $sheet_name
     */
    private function processDoumaXmlCells($worksheet, $sheet_name)
    {
        if (in_array($sheet_name, [
            "WGW RONDSTAAL",
            "WGW RONDSTAAL - S355J2",
            "WGW VIERKANTSTAAL",
            "WGW VIERKANTSTAAL - S355J2",
            "WGW PLATSTAAL",
            "WGW PLATSTAAL S355J2",
            "WGW HOEKSTAAL GELIJKZIJDIG",
            "WGW HOEK GELIJKZIJDIG S355J2",
            "WGW HOEKSTAAL ONGELIJKZIJDI",
            "WGW HOEKSTAAL VERZINKT",
            "WGW T - STAAL",
            "WGW UNP - STAAL",
            "WGW HALFRONDSTAAL",
            "WGW STRIPPEN",
            "WGW STRIPPEN S355J2",
        ])) {
            return $this->doumaStafStaalIterator($worksheet, $sheet_name);
        }


        if (in_array($sheet_name, [
            "BALKSTAAL HE- A",
            "BALKSTAAL HE- B",
            "BALKSTAAL IPE",
            "BALKSTAAL UNP",
        ])) {
            return $this->doumaBalkStaalIterator($worksheet, $sheet_name);
        }

        if (in_array($sheet_name, [
            "WGW PLATEN S235JRG2",
            "WGW GEBEITSTE PLATEN",
            "WGW TRANENPLATEN",
            "KGW PLATEN DC01",
            "SENDZIMIR VERZ PLATEN",
            "ELECTROLYTISCH VERZ PLATEN"
        ])) {
            return $this->doumaPlaatStaalIterator($worksheet, $sheet_name);
        }


        if (in_array($sheet_name, [
            "WGW LASER PLATEN",
            "WGW CORTEN PLATEN",
        ])) {
            return $this->doumaPlaatStaal2Iterator($worksheet, $sheet_name);
        }


        if (in_array($sheet_name, [
            "KOKER ONGEBEITST VIERK",
            "KOKER ONGEBEITST RECHT",
            "KOKER GEBEITST VIERKAN",
            "KOKER GEBEITST RECHTHO",
        ])) {
            return $this->doumaKokerProfielIterator($worksheet, $sheet_name);
        }
        if (in_array($sheet_name, [
            "GELASTE KL A BUIS",
            "GELASTE GASBUIS",
            "GELASTE CONSTR. BUIS",
            "GELASTE STOOMBUIS",
            "GELASTE PRECISIEBUIS",
            "GELASTE BUIS",
            "NAADLOZE BUIS",
        ])) {
            return $this->doumaRondeBuisIterator($worksheet, $sheet_name);
        }

        if (in_array($sheet_name, [
            "KGW HOEKPROFIEL",
            "KGW U-PROFIEL",
            "KGW DIVERSEN"
        ])) {
            return $this->doumaKoudGewalstIterator($worksheet, $sheet_name);
        }

        if (in_array($sheet_name, [
            "BLANK-ST 37-2 K PLAT",
            "BLANK-ST 37-2 K ROND",
            "BLANK-ST 52-3 K ROND",
            "BLANK-C 45 K ROND",
            "BLANK-ST 37-2 K HOEK",
            "BLANK-ST 37-2 K VIERKANT",
            "BLANK-AUTOMATENST. ROND",
            "BLANK-AUTOMATENST. VIERK.",
        ])) {
            return $this->doumaBlankStaalIterator($worksheet, $sheet_name);
        }

        if (in_array($sheet_name, [
            "ZILVERSTAAL-ROND",
        ])) {
            return $this->doumaZilverStaalIterator($worksheet, $sheet_name);
        }
    }

    /**
     * @param $worksheet
     * @param $sheet_name
     */
    private function processMcbXmlCells($worksheet, $sheet_name)
    {

//        CS WGW Ronde Buis overig
//        CS WGW Ronde Buis S235
//        CS Blank Naadloos Buis
//        CS Blanke buis
//        CS Kokers S235 + blank
//        CS Kokers S275 - S355

        if (in_array($sheet_name,
         [
            "CS WGW Ronde Buis overig",
             "CS WGW Ronde Buis S235",
             "CS Blank Naadloos Buis",
             "CS Blanke buis",
             "CS Kokers S235 + blank",
             "CS Kokers S275 - S355",
        ])) {
            return $this->mcbStaalIterator($worksheet, $sheet_name);
        }


    }


    /**
     * @param $worksheet
     * @param $sheet_name
     * @return mixed
     */
    private function processIndiXmlCells($worksheet, $sheet_name)
    {
        $data =  $this->indiXmlSheetIterator($worksheet, $sheet_name);
        return $data;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function mcbStaalIterator($worksheet, string $sheet_name)
    {

        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff


            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];

            foreach ($cell_iterator as $index => $cell) {

                $cell_data = $cell->getValue();

                #artikel_nummer
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['artikel_nummer'] = $cell_data;
                }


                //naam veld
                if ($index == 'C' && is_string($cell_data)) {
                    $new_row_data['type'] = $sheet_name;
                    $new_row_data['naam'] = $cell_data;
                }

                #gewicht
                if ($index == 'D') {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #handels lengte
                if ($index == 'E' && is_string($cell_data)) {
                    $new_row_data['handelslengte'] = $cell_data;
                }

                #diameter
                if ($index == 'I' && is_string($cell_data)) {
                    $new_row_data['handelslengte'] = $cell_data;
                }



                #prijs
                if ($index == 'O') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['standaard_prijs'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['standaard_prijs'] = $this->moneyFormatter->parse($cell_data);
                    }
                }


                if ($index == 'P') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_aantal_1'] = $cell_data;
                    }
                }

                #prijs1
                if ($index == 'Q') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_1'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_1'] = $this->moneyFormatter->parse($cell_data);
                    }
                }


                if ($index == 'R') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_aantal_2'] = $cell_data;
                    }
                }

                #prijs2
                if ($index == 'S') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_2'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_2'] = $this->moneyFormatter->parse($cell_data);
                    }
                }


                if ($index == 'T') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_aantal_3'] = $cell_data;
                    }
                }

                #prijs3
                if ($index == 'U') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_3'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_3'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                if ($index == 'V') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_aantal_4'] = $cell_data;
                    }
                }

                #prijs4
                if ($index == 'W') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_4'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_4'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                if ($index == 'X') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_aantal_5'] = $cell_data;
                    }
                }

                #prijs5
                if ($index == 'Y') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_5'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_5'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                if ($index == 'Z') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_aantal_6'] = $cell_data;
                    }
                }

                #prijs6
                if ($index == 'AA') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_6'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_6'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                if ($index == 'AB') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_aantal_7'] = $cell_data;
                    }
                }

                #prijs7
                if ($index == 'AC') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_7'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_7'] = $this->moneyFormatter->parse($cell_data);
                    }
                }
            }
            if (count($new_row_data) > 5) {
                $new_data_list[] = $new_row_data;
            }
        }

        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaStafStaalIterator($worksheet, string $sheet_name)
    {

        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff


            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];

            foreach ($cell_iterator as $index => $cell) {

                $cell_data = $cell->getValue();
                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = $sheet_name;
                    $new_row_data['naam'] = $cell_data;
                }

                #handels lengte
                if ($index == 'C' && is_string($cell_data)) {
                    $new_row_data['handelslengte'] = $cell_data;
                }

                #gewicht
                if ($index == 'D') {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #prijs < 75
                if ($index == 'E') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs < 150
                if ($index == 'F') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs < 300
                if ($index == 'G') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs 300+
                if ($index == 'H') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen per 100kg
                if ($index == 'I') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen + menieen per 100kg
                if ($index == 'J') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

            }
            if (count($new_row_data) > 5) {
                $new_data_list[] = $new_row_data;
            }
        }
        return $new_data_list;
    }

    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaBalkStaalIterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];
            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();
                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = $sheet_name;
                    $new_row_data['naam'] = $cell_data;
                }
                //Gewicht per m1
                if ($index == 'B' && is_null(filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION))) {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    };
                }

                //Prijst < 75 veld
                if ($index == 'C') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Prijst < 150 veld
                if ($index == 'D') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Prijst < 300 veld
                if ($index == 'E') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Prijst 300+ veld
                if ($index == 'F') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Prijst 300+ veld
                if ($index == 'G') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['haaks_zagen'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['haaks_zagen'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Stralen per 100kg veld
                if ($index == 'H') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Stralen & Menieën per 100kg veld
                if ($index == 'I') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Verf oppervlak m2 per m1
                if ($index == 'J') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['verven_per_m1'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['verven_per_m1'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

            }
            if (count($new_row_data) > 5) {
                $new_data_list[] = $new_row_data;
            }
        }

        return $new_data_list;
    }

    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaPlaatStaalIterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];
            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();
                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = $sheet_name;
                    $new_row_data['naam'] = $cell_data;
                }
                //Gewicht per stuk
                if ($index == 'C' && floatval(filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION))) {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    };
                }

                //Prijst < 250 veld
                if ($index == 'D') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_250'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_250'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Prijst < 500 veld
                if ($index == 'E') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_500'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_500'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Prijst < 1000 veld
                if ($index == 'F') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_1000'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_1000'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Prijst 1000+ veld
                if ($index == 'G') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_1000'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_1000'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Stralen per 100kg veld
                if ($index == 'H') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                //Stralen & Menieën per 100kg veld
                if ($index == 'I') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

            }
            if (count($new_row_data) > 5) {
                $new_data_list[] = $new_row_data;
            }
        }

        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaPlaatStaal2Iterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];

        $temp_type_name = '';
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];

            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();
                if ($index == 'A' && in_array($cell_data, ['SSAB Laser Plus', 'SSAB Strenx', 'Corten A'])) {
                    $temp_type_name = ' - ' . $cell_data;
                }


                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = substr($sheet_name, 4) . $temp_type_name;
                    $new_row_data['naam'] = $cell_data;
                }

                //Uitvoering
                if ($index == 'C' && in_array(strtolower($cell_data), ['gebeitst/geolied', 'zwart'])) {
                    $new_row_data['uitvoering'] = $cell_data;
                }

                //Gewicht per stuk
                if ($index == 'D' && is_numeric(filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION))) {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    };
                }

                //Prijst < 250 veld
                if ($index == 'E' && (is_float($cell_data) || strtolower($cell_data) == 'op aanvraag' || strlen($cell_data) > 0)) {
                    $new_row_data['prijs_tot_250'] = $cell_data;
                }

                //Prijst < 500 veld
                if ($index == 'F' && (is_float($cell_data) || strtolower($cell_data) == 'op aanvraag' || strlen($cell_data) > 0)) {
                    $new_row_data['prijs_tot_500'] = $cell_data;
                }

                //Prijst < 1000 veld
                if ($index == 'G' && (is_float($cell_data) || strtolower($cell_data) == 'op aanvraag' || strlen($cell_data) > 0)) {
                    $new_row_data['prijs_tot_1000'] = $cell_data;
                }

                //Prijst 1000+ veld
                if ($index == 'H' && (is_float($cell_data) || strtolower($cell_data) == 'op aanvraag' || strlen($cell_data) > 0)) {
                    $new_row_data['prijs_vanaf_1000'] = $cell_data;
                }


            }
            if (count($new_row_data) >= 5) {
                $new_data_list[] = $new_row_data;
            }
        }

        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaKokerProfielIterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];
            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();

                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = $sheet_name;
                    $new_row_data['naam'] = $cell_data;
                }

                #handels lengte
                if ($index == 'C' && is_string($cell_data)) {
                    $new_row_data['handelslengte'] = $cell_data;
                }

                #kwaliteit
                if ($index == 'D' && is_string($cell_data) > 0) {
                    $new_row_data['kwaliteit'] = $cell_data;
                }

                #Gewicht per Kg/M
                if ($index == 'E') {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['kilo_per_meter'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #prijs per meter
                if ($index == 'F') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_per_meter'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_per_meter'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen per 100kg
                if ($index == 'G') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_per_meter'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_per_meter'] = $this->moneyFormatter->parse($cell_data);
                    }
                } else {
                    $new_row_data['stralen_per_meter'] = '';
                }

                #stalen + menieen per 100kg
                if ($index == 'H') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_meter'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_meter'] = $this->moneyFormatter->parse($cell_data);
                    }
                } else {
                    $new_row_data['stralen_menieen_per_meter'] = '';
                }

            }
            if (count($new_row_data) > 5) {
                $new_data_list[] = $new_row_data;
            }
        }
        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaRondeBuisIterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];
            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();

                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = $sheet_name;
                    $new_row_data['naam'] = $cell_data;
                }

                #diameter
                if ($index == 'B' && is_string($cell_data) > 0) {
                    $new_row_data['diameter'] = $cell_data;
                }

                #handels lengte
                if ($index == 'D' && is_string($cell_data)) {
                    $new_row_data['handelslengte'] = $cell_data;
                }

                #Gewicht per Kg/M
                if ($index == 'E') {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['kilo_per_meter'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }


                }

                #prijs per meter
                if ($index == 'F') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_per_meter'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_per_meter'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen per 100kg
                if ($index == 'G') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_per_meter'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_per_meter'] = $this->moneyFormatter->parse($cell_data);
                    }
                } else {
                    $new_row_data['stralen_per_meter'] = '';
                }

                #stalen + menieen per 100kg
                if ($index == 'H') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_meter'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_meter'] = $this->moneyFormatter->parse($cell_data);
                    }
                } else {
                    $new_row_data['stralen_menieen_per_meter'] = '';
                }

            }
            if (count($new_row_data) > 7) {
                $new_data_list[] = $new_row_data;
            }
        }

        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaKoudGewalstIterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];
            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();
                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = $sheet_name;
                    $new_row_data['naam'] = $cell_data;
                }

                #gewicht
                if ($index == 'C') {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #prijs < 75
                if ($index == 'D') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs < 150
                if ($index == 'E') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs < 300
                if ($index == 'F') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs 300+
                if ($index == 'G') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen per 100kg
                if ($index == 'H') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen + menieen per 100kg
                if ($index == 'I') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

            }
            if (count($new_row_data) > 5) {
                $new_data_list[] = $new_row_data;
            }
        }
        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaBlankStaalIterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];

        $temp_type_name = '';

        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];
            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();

                if ($index == 'A' && in_array($cell_data, ['GELIJKZIJDIG', 'ONGELIJKZIJDIG', 'GESLEPEN'])) {
                    $temp_type_name = ' - ' . $cell_data;
                }

                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = substr($sheet_name, 4) . $temp_type_name;
                    $new_row_data['naam'] = $cell_data;
                }

                #gewicht
                if ($index == 'C') {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #prijs < 75
                if ($index == 'D') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_75'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs < 150
                if ($index == 'E') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_150'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs < 300
                if ($index == 'F') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_tot_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #prijs 300+
                if ($index == 'G') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_vanaf_300'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen per 100kg
                if ($index == 'H') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #stalen + menieen per 100kg
                if ($index == 'I') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['stralen_menieen_per_100'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

            }
            if (count($new_row_data) > 6) {
                $new_data_list[] = $new_row_data;
            }
        }
        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaZilverStaalIterator($worksheet, string $sheet_name = "DOUMA")
    {
        $new_data_list = [];

        foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
            $cell_iterator = $row->getCellIterator();
            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];
            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();

                //Naam veld
                $new_row_data['type'] = $sheet_name;

                #maat
                if ($index == 'A') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['naam'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['naam'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

                #gewicht
                if ($index == 'C') {
                    if (filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) > 0) {
                        $new_row_data['gewicht'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #prijs per meter
                if ($index == 'D') {
                    if (floatval($cell_data) > 0) {
                        $new_row_data['prijs_per_meter'] = floatval($cell_data);
                    }
                    if ($this->moneyFormatter->parse($cell_data) > 0) {
                        $new_row_data['prijs_per_meter'] = $this->moneyFormatter->parse($cell_data);
                    }
                }

            }
            if (count($new_row_data) > 3) {
                $new_data_list[] = $new_row_data;
            }
        }
        return $new_data_list;
    }


    /**
     * @param $worksheet
     * @param $sheet_name
     * @return array|void
     */




    private function indiXmlSheetIterator($worksheet, $sheet_name)
    {

        $new_data_list = [];
        foreach ($worksheet->getRowIterator() as $rowIndex => $row) {// this is where you do your database stuff


            $cell_iterator = $row->getCellIterator();
//            var_export([$cell_iterator,'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT##############################################TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT']);

            $cell_iterator->setIterateOnlyExistingCells(true);

            $new_row_data = [];


            foreach ($cell_iterator as $index => $cell) {
                $cell_data = $cell->getValue();

                #Artikelnummer met Leestekens
                if ($index == 'B' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['artikel_nummer'] = $cell_data;
                    }
                }


                #barcode
                if ($index == 'D' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['barcode'] = $cell_data;
                    }
                }

                #naam
                if ($index == 'E' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['naam'] = $cell_data;
                    }
                }


                #artikelgroep
                if ($index == 'F' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['artikel_groep'] = $cell_data;
                    }
                }

                #bruto prijs
                if ($index == 'G' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['bruto_prijs_per_stuk'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #korting
                if ($index == 'H' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['korting'] = $cell_data;
                    }
                }

                #netto prijs
                if ($index == 'I' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['netto_prijs_per_stuk'] = filter_var(str_replace(',', '.', $cell_data), FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    }
                }

                #Min afname
                if ($index == 'K' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['min_afname'] = $cell_data;
                    }
                }


                #nieuw artikel nummer
                if ($index == 'L' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['nieuw_artikel'] = $cell_data;
                    }
                }

                #oud artikel nummer
                if ($index == 'M' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['oud_artikel'] = $cell_data;
                    }
                }

                #eenheid
                if ($index == 'N' && $rowIndex > 2) {
                    if(strlen($cell_data) > 0) {
                        $new_row_data['eenheid'] = $cell_data;
                    }
                }


            }
            if (count($new_row_data) > 3) {
                $new_data_list[] = $new_row_data;
            }
        }
                return $new_data_list;
    }

}

