<?php

use PhpOffice\PhpSpreadsheet\IoFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

require_once '../../vendor/autoload.php';


class ConvertExcel
{

    /**
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     * @throws \PhpOffice\PhpSpreadsheet\Reader\Exception
     */
    private function readFile($filename, $supplier_name)
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
        $this->processXml($file_obj, $supplier_name, $file_type);
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

                        if (in_array(substr($sheet_name, 4), [
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
                        ])) {

                            $result = $this->processDoumaXmlCells($worksheet, $sheet_name);

                            if (!is_null($result)) {
                                array_push($new_data_array, $result);
                            }
                        }
                    }


                    $data = $this->formatArray($new_data_array);

                    $this->createXlsFile($data, $supplier_name);

                    print("<pre>XML is gedownload</pre>");
//                    print("<pre>" . print_r($data, true) . "</pre>");
                }
                //End Douma xml file
                break;
            case 'HAQUEBORD':
                break;
        }
    }

    public function processUpload()
    {
        return $this->readFile('C:\wamp64\www\ijzershop-176-Upgrade\modules\modernesmid_price_modifier\uploads\Douma-prijslijst-2022-03-08.xls',
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
        $spreadsheet->getActiveSheet()->setCellValue('I1', 'Prijs p/kg');
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
            $spreadsheet->getActiveSheet()->setCellValue('I' . $index, $row['prijs_per_kilo']);
            $spreadsheet->getActiveSheet()->setCellValue('J' . $index, $row['prijs_tot_75']);
            $spreadsheet->getActiveSheet()->setCellValue('K' . $index, $row['prijs_tot_150']);
            $spreadsheet->getActiveSheet()->setCellValue('L' . $index, $row['prijs_tot_250']);
            $spreadsheet->getActiveSheet()->setCellValue('M' . $index, $row['prijs_tot_300']);
            $spreadsheet->getActiveSheet()->setCellValue('N' . $index, $row['prijs_tot_500']);
            $spreadsheet->getActiveSheet()->setCellValue('O' . $index, $row['prijs_tot_1000']);
            $spreadsheet->getActiveSheet()->setCellValue('P' . $index, $row['prijs_vanaf_300']);
            $spreadsheet->getActiveSheet()->setCellValue('Q' . $index, $row['prijs_vanaf_1000']);
            $spreadsheet->getActiveSheet()->setCellValue('R' . $index, $row['stralen_menieën_per_meter']);
            $spreadsheet->getActiveSheet()->setCellValue('S' . $index, $row['stralen_menieën_per_100']);
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
        $spreadsheet->getActiveSheet()->getStyle('A1:' . $highestColumn . '1' )->applyFromArray($styleArrayFirstRow);



        for ($s = 'A'; $s != $spreadsheet->getActiveSheet()->getHighestColumn(); $s++) {
            $spreadsheet->getActiveSheet()->getColumnDimension($s)->setAutoSize(true);
        }


        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="prijslijst_' . $supplier_name . '.xls"');
        header('Cache-Control: max-age=0');
        header('Cache-Control: max-age=1');
        header('Cache-Control: cache, must-revalidate');
        header('Pragma: public');

        $writer = IOFactory::createWriter($spreadsheet, 'Xls');
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
                $arr['prijs_per_kilo'] = isset($sheet_array[$i]['prijs_per_kilo']) ? $sheet_array[$i]['prijs_per_kilo'] : '';
                $arr['prijs_tot_75'] = isset($sheet_array[$i]['prijs_tot_75']) ? $sheet_array[$i]['prijs_tot_75'] : '';
                $arr['prijs_tot_150'] = isset($sheet_array[$i]['prijs_tot_150']) ? $sheet_array[$i]['prijs_tot_150'] : '';
                $arr['prijs_tot_250'] = isset($sheet_array[$i]['prijs_tot_250']) ? $sheet_array[$i]['prijs_tot_250'] : '';
                $arr['prijs_tot_300'] = isset($sheet_array[$i]['prijs_tot_300']) ? $sheet_array[$i]['prijs_tot_300'] : '';
                $arr['prijs_tot_500'] = isset($sheet_array[$i]['prijs_tot_500']) ? $sheet_array[$i]['prijs_tot_500'] : '';
                $arr['prijs_tot_1000'] = isset($sheet_array[$i]['prijs_tot_1000']) ? $sheet_array[$i]['prijs_tot_1000'] : '';
                $arr['prijs_vanaf_300'] = isset($sheet_array[$i]['prijs_vanaf_300']) ? $sheet_array[$i]['prijs_vanaf_300'] : '';
                $arr['prijs_vanaf_1000'] = isset($sheet_array[$i]['prijs_vanaf_1000']) ? $sheet_array[$i]['prijs_vanaf_1000'] : '';
                $arr['stralen_menieën_per_meter'] = isset($sheet_array[$i]['stralen_menieën_per_meter']) ? $sheet_array[$i]['stralen_menieën_per_meter'] : '';
                $arr['stralen_menieën_per_100'] = isset($sheet_array[$i]['stralen_menieën_per_100']) ? $sheet_array[$i]['stralen_menieën_per_100'] : '';
                $arr['stralen_per_meter'] = isset($sheet_array[$i]['stralen_per_meter']) ? $sheet_array[$i]['stralen_per_meter'] : '';
                $arr['stralen_per_100'] = isset($sheet_array[$i]['stralen_per_100']) ? $sheet_array[$i]['stralen_per_100'] : '';
                $arr['verven_per_m1'] = isset($sheet_array[$i]['verven_per_m1']) ? $sheet_array[$i]['verven_per_m1'] : '';
                $arr['haaks_zagen'] = isset($sheet_array[$i]['haaks_zagen']) ? $sheet_array[$i]['haaks_zagen'] : '';


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
        if ($this->strposa($sheet_name, [
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
        ], 1)) {
            return $this->doumaStafStaalIterator($worksheet, $sheet_name);
        }


        if ($this->strposa($sheet_name, [
            "BALKSTAAL HE- A",
            "BALKSTAAL HE- B",
            "BALKSTAAL IPE",
            "BALKSTAAL UNP",
        ], 1)) {
            return $this->doumaBalkStaalIterator($worksheet, $sheet_name);
        }

        if ($this->strposa($sheet_name, [
            "WGW PLATEN S235JRG2",
            "WGW GEBEITSTE PLATEN",
            "WGW TRANENPLATEN",
            "KGW PLATEN DC01",
            "SENDZIMIR VERZ PLATEN",
            "ELECTROLYTISCH VERZ PLATEN"
        ], 1)) {
            return $this->doumaPlaatStaalIterator($worksheet, $sheet_name);
        }


        if ($this->strposa($sheet_name, [
            "WGW LASER PLATEN",
            "WGW CORTEN PLATEN",
        ], 1)) {
            return $this->doumaPlaatStaal2Iterator($worksheet, $sheet_name);
        }


        if ($this->strposa($sheet_name, [
            "KOKER ONGEBEITST VIERK",
            "KOKER ONGEBEITST RECHT",
            "KOKER GEBEITST VIERKAN",
            "KOKER GEBEITST RECHTHO",
        ], 1)) {
            return $this->doumaKokerProfielIterator($worksheet, $sheet_name);
        }
        if ($this->strposa($sheet_name, [
            "GELASTE KL A BUIS",
            "GELASTE GASBUIS",
            "GELASTE CONSTR. BUIS",
            "GELASTE STOOMBUIS",
            "GELASTE PRECISIEBUIS",
            "GELASTE BUIS",
            "NAADLOZE BUIS",
        ], 1)) {
            return $this->doumaRondeBuisIterator($worksheet, $sheet_name);
        }

        if ($this->strposa($sheet_name, [
            "KGW HOEKPROFIEL",
            "KGW U-PROFIEL",
            "KGW DIVERSEN"
        ], 1)) {
            return $this->doumaKoudGewalstIterator($worksheet, $sheet_name);
        }

        if ($this->strposa($sheet_name, [
            "BLANK-ST 37-2 K PLAT",
            "BLANK-ST 37-2 K ROND",
            "BLANK-ST 52-3 K ROND",
            "BLANK-C 45 K ROND",
            "BLANK-ST 37-2 K HOEK",
            "BLANK-ST 37-2 K VIERKANT",
            "BLANK-AUTOMATENST. ROND",
            "BLANK-AUTOMATENST. VIERK.",
        ], 1)) {
            return $this->doumaBlankStaalIterator($worksheet, $sheet_name);
        }

        if ($this->strposa($sheet_name, [
            "ZILVERSTAAL-ROND",
        ], 1)) {
            return $this->doumaZilverStaalIterator($worksheet, $sheet_name);
        }


//
//            if($this->strposa($sheet_name, [
//                "LASBOCHTEN 3S",
//                "LASBOCHTEN 5S",
//                "BLINDFLENZEN",
//                "DRAADFLENZEN",
//                "VLAKKE LASFLENZEN",
//                "VOORLASFLENZEN",
//                "FLENZEN WELDING NECK",
//                "FITTINGEN",
//                "OVERIGEN"
//            ],  1)){
//                return $this->doumaFittingLasbochtFlensStaalIterator($worksheet);
//            }
    }


    /**
     * @param $worksheet
     * @param string $sheet_name
     * @return array
     */
    private function doumaStafStaalIterator($worksheet, string $sheet_name = "DOUMA")
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
                    $new_row_data['type'] = substr($sheet_name, 4);
                    $new_row_data['naam'] = $cell_data;
                }

                #handels lengte
                if ($index == 'C' && ($cell_data == '3+' || $cell_data == '6+' || $cell_data == '7+')) {
                    $new_row_data['handelslengte'] = $cell_data;
                }

                #gewicht
                if ($index == 'D' && floatval($cell_data) > 0) {
                    $new_row_data['gewicht'] = $cell_data;
                }

                #prijs < 75
                if ($index == 'E' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_75'] = $cell_data;
                }

                #prijs < 150
                if ($index == 'F' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_150'] = $cell_data;
                }

                #prijs < 300
                if ($index == 'G' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_300'] = $cell_data;
                }

                #prijs 300+
                if ($index == 'H' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_vanaf_300'] = $cell_data;
                }

                #stalen per 100kg
                if ($index == 'I' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_per_100'] = $cell_data;
                }

                #stalen + menieën per 100kg
                if ($index == 'J' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_menieën_per_100'] = $cell_data;
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
                    $new_row_data['type'] = substr($sheet_name, 4);
                    $new_row_data['naam'] = $cell_data;
                }
                //Gewicht per m1
                if ($index == 'B' && is_null($cell_data)) {
                    $new_row_data['gewicht'] = $cell_data;
                }

                //Prijst < 75 veld
                if ($index == 'C' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_75'] = $cell_data;
                }

                //Prijst < 150 veld
                if ($index == 'D' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_150'] = $cell_data;
                }

                //Prijst < 300 veld
                if ($index == 'E' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_300'] = $cell_data;
                }

                //Prijst 300+ veld
                if ($index == 'F' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_vanaf_300'] = $cell_data;
                }

                //Prijst 300+ veld
                if ($index == 'G' && floatval($cell_data) > 0) {
                    $new_row_data['haaks_zagen'] = $cell_data;
                }

                //Stralen per 100kg veld
                if ($index == 'H' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_per_100'] = $cell_data;
                }

                //Stralen & Menieën per 100kg veld
                if ($index == 'I' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_menieën_per_100'] = $cell_data;
                }

                //Verf oppervlak m2 per m1
                if ($index == 'J' && floatval($cell_data) > 0) {
                    $new_row_data['verven_per_m1'] = $cell_data;
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
                    $new_row_data['type'] = substr($sheet_name, 4);
                    $new_row_data['naam'] = $cell_data;
                }
                //Gewicht per stuk
                if ($index == 'C' && floatval($cell_data)) {
                    $new_row_data['gewicht'] = $cell_data;
                }

                //Prijst < 250 veld
                if ($index == 'D' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_250'] = $cell_data;
                }

                //Prijst < 500 veld
                if ($index == 'E' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_500'] = $cell_data;
                }

                //Prijst < 1000 veld
                if ($index == 'F' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_1000'] = $cell_data;
                }

                //Prijst 1000+ veld
                if ($index == 'G' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_vanaf_1000'] = $cell_data;
                }

                //Stralen per 100kg veld
                if ($index == 'H' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_per_100'] = $cell_data;
                }

                //Stralen & Menieën per 100kg veld
                if ($index == 'I' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_menieën_per_100'] = $cell_data;
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
                if ($index == 'A' && $this->strposa($cell_data, ['SSAB Laser Plus', 'SSAB Strenx', 'Corten A'])) {
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
                if ($index == 'D' && is_numeric($cell_data)) {
                    $new_row_data['gewicht'] = $cell_data;
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
                    $new_row_data['type'] = substr($sheet_name, 4);
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
                if ($index == 'E' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_per_kilo'] = $cell_data;
                }

                #prijs per meter
                if ($index == 'F' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_per_meter'] = $cell_data;
                }

                #stalen per 100kg
                if ($index == 'G' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_per_meter'] = $cell_data;
                } else {
                    $new_row_data['stralen_per_meter'] = '';
                }

                #stalen + menieën per 100kg
                if ($index == 'H' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_menieën_per_meter'] = $cell_data;
                } else {
                    $new_row_data['stralen_menieën_per_meter'] = '';
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
                    $new_row_data['type'] = substr($sheet_name, 4);
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
                if ($index == 'E' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_per_kilo'] = $cell_data;
                }

                #prijs per meter
                if ($index == 'F' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_per_meter'] = $cell_data;
                }

                #stalen per 100kg
                if ($index == 'G' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_per_meter'] = $cell_data;
                } else {
                    $new_row_data['stralen_per_meter'] = '';
                }

                #stalen + menieën per 100kg
                if ($index == 'H' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_menieën_per_meter'] = $cell_data;
                } else {
                    $new_row_data['stralen_menieën_per_meter'] = '';
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
                    $new_row_data['type'] = substr($sheet_name, 4);
                    $new_row_data['naam'] = $cell_data;
                }

                #gewicht
                if ($index == 'C' && floatval($cell_data) > 0) {
                    $new_row_data['gewicht'] = $cell_data;
                }

                #prijs < 75
                if ($index == 'D' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_75'] = $cell_data;
                }

                #prijs < 150
                if ($index == 'E' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_150'] = $cell_data;
                }

                #prijs < 300
                if ($index == 'F' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_300'] = $cell_data;
                }

                #prijs 300+
                if ($index == 'G' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_vanaf_300'] = $cell_data;
                }

                #stalen per 100kg
                if ($index == 'H' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_per_100'] = $cell_data;
                }

                #stalen + menieën per 100kg
                if ($index == 'I' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_menieën_per_100'] = $cell_data;
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

                if ($index == 'A' && $this->strposa($cell_data, ['GELIJKZIJDIG', 'ONGELIJKZIJDIG', 'GESLEPEN'])) {
                    $temp_type_name = ' - ' . $cell_data;
                }

                //Naam veld
                if ($index == 'A' && is_string($cell_data)) {
                    $new_row_data['type'] = substr($sheet_name, 4) . $temp_type_name;
                    $new_row_data['naam'] = $cell_data;
                }

                #gewicht
                if ($index == 'C' && floatval($cell_data) > 0) {
                    $new_row_data['gewicht'] = $cell_data;
                }

                #prijs < 75
                if ($index == 'D' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_75'] = $cell_data;
                }

                #prijs < 150
                if ($index == 'E' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_150'] = $cell_data;
                }

                #prijs < 300
                if ($index == 'F' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_tot_300'] = $cell_data;
                }

                #prijs 300+
                if ($index == 'G' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_vanaf_300'] = $cell_data;
                }

                #stalen per 100kg
                if ($index == 'H' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_per_100'] = $cell_data;
                }

                #stalen + menieën per 100kg
                if ($index == 'I' && floatval($cell_data) > 0) {
                    $new_row_data['stralen_menieën_per_100'] = $cell_data;
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
                $new_row_data['type'] = substr($sheet_name, 4);

                #maat
                if ($index == 'A' && floatval($cell_data) > 0) {
                    $new_row_data['naam'] = $cell_data;
                }

                #gewicht
                if ($index == 'C' && floatval($cell_data) > 0) {
                    $new_row_data['gewicht'] = $cell_data;
                }

                #prijs per meter
                if ($index == 'D' && floatval($cell_data) > 0) {
                    $new_row_data['prijs_per_meter'] = $cell_data;
                }

            }
            if (count($new_row_data) > 3) {
                $new_data_list[] = $new_row_data;
            }
        }
        return $new_data_list;
    }


//    /**
//     * @param $worksheet
//     * @param string $sheet_name
//     * @return array
//     */
//    private function doumaFittingLasbochtFlensStaalIterator($worksheet, string $sheet_name = "DOUMA"){
//                            $new_data_list = [];
//            foreach ($worksheet->getRowIterator() as $row) {// this is where you do your database stuff
//                $cell_iterator = $row->getCellIterator();
//                $cell_iterator->setIterateOnlyExistingCells(true);
//
//                $new_row_data = [];
//                foreach ($cell_iterator as $index => $cell) {
//                    $cell_data = $cell->getValue();
//                    //Naam veld
//                    if ($index == 'A' && is_string($cell_data)) {
//                        $new_row_data[0] = $cell_data;
//                    }
//                    //Leeg veld
//                    if ($index == 'B' && is_null($cell_data)) {
//                        $new_row_data[1] = $cell_data;
//                    }
//
//                    #handels lengte
//                    if ($index == 'C' && ($cell_data == '3+' || $cell_data == '6+' || $cell_data == '7+')) {
//                        $new_row_data[2] = $cell_data;
//                    }
//
//                    #gewicht
//                    if ($index == 'D' && floatval($cell_data) > 0) {
//                        $new_row_data[3] = $cell_data;
//                    }
//
//                    #prijs < 75
//                    if ($index == 'E' && floatval($cell_data) > 0) {
//                        $new_row_data[4] = $cell_data;
//                    }
//
//                    #prijs < 150
//                    if ($index == 'F' && floatval($cell_data) > 0) {
//                        $new_row_data[5] = $cell_data;
//                    }
//
//                    #prijs < 300
//                    if ($index == 'G' && floatval($cell_data) > 0) {
//                        $new_row_data[6] = $cell_data;
//                    }
//
//                    #prijs 300+
//                    if ($index == 'H' && floatval($cell_data) > 0) {
//                        $new_row_data[7] = $cell_data;
//                    }
//
//                    #stalen per 100kg
//                    if ($index == 'I' && floatval($cell_data) > 0) {
//                        $new_row_data[8] = $cell_data;
//                    }
//
//                    #stalen + menieën per 100kg
//                    if ($index == 'J' && floatval($cell_data) > 0) {
//                        $new_row_data[9] = $cell_data;
//                    }
//
////var_dump($new_row_data);
//                    if (count($new_row_data) >= 9) {
//                        $new_data_list[] = $new_row_data;
//                    }
//                }
//            }
//
//            return $new_row_data;
//    }

    private function strposa(string $haystack, array $needles, int $offset = 0): bool
    {
        foreach ($needles as $needle) {
            if (strpos($haystack, $needle, $offset) !== false) {
                return true; // stop on first true result
            }
        }

        return false;
    }

}


(new ConvertExcel())->processUpload();
