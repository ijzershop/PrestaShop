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

    public function writePage()
    {
        $this->SetHeaderMargin(5);
        $this->SetFooterMargin(34);
        $this->setMargins(12, 40, 12);
        $this->setPageOrientation('P', true, 40);
        $this->AddPage();
        $this->writeHTML($this->content, true, false, true, false, '');
    }
}
