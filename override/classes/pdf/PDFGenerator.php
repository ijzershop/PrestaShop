<?php
class PDFGenerator extends PDFGeneratorCore
{
    /**
     * @see TCPDF::Header()
     */
    public function Header()
    {

        $this->writeHTML($this->header);

    	if(strpos($this->header, 'TOEVOEGEN') !== false){
        	$img_file = '../themes/modernesmid/assets/img/toevoegen_watermerk-min.png';
        	$this->Image($img_file, 30, 40, 210, 297, '', '', '', false, 300, '', false, false, 0);
    	}


		if(strpos($this->header, 'AFHALEN') !== false){
        	$img_file = '../themes/modernesmid/assets/img/afhalen_watermerk-min.png';
        	$this->Image($img_file, 30, 40, 210, 297, '', '', '', false, 300, '', false, false, 0);
    	}

    }

    public function writePage($reference = null)
    {

        $barcodeStyle = array(
            'border' => 2,
            'vpadding' => 'auto',
            'hpadding' => 'auto',
            'fgcolor' => array(0,0,0),
            'bgcolor' => false,
            'module_width' => 1,
            'module_height' => 1
        );

        $this->SetHeaderMargin(5);
        $this->SetFooterMargin(34);
        $this->setMargins(12, 40, 12);
        $this->setPageOrientation('P', true, 40);
        $this->AddPage();
        if(strpos($this->header, 'BEZORGEN') !== false || strpos($this->header, 'BEZORGING') !== false || strpos($this->header, 'AFHALEN') !== false || strpos($this->header, 'TOEVOEGEN') !== false){
            $link = new LinkCore;
            if(is_null($reference)){
                $id_order = Tools::getValue('id_order');
                $reference = Order::getUniqReferenceOf($id_order);
            }
            
            $this->write2DBarcode('FOL/'.Configuration::get('MODERNESMIDTHEMECONFIGURATOR_TOKEN').'/'.$reference, 'QRCODE,H', 160, 39, 40, 40, $style, 'R');
        }
        $this->writeHTML($this->content, true, false, true, false, '');
    }
}
