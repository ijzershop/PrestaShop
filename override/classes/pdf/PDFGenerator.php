<?php
class PDFGenerator extends PDFGeneratorCore
{
    public $Image;
    public $angle;
    /**
     * @see TCPDF::Header()
     */
    public function Header()
    {
        $_SERVER['DOCUMENT_ROOT'] = realpath(dirname(__FILE__).'/../');


        $this->writeHTML($this->header);
        if(strpos($this->header, 'TOEVOEGEN') !== false){
            $this->RotatedText(60,35,'TOEVOEGEN',-58, 110);
        }

        if(strpos($this->header, 'AFHALEN') !== false){
            $this->RotatedText(73,20,'AFHALEN',-60);
        }
    }

    /**
     * Render HTML template.
     *
     * @param string $filename
     * @param bool $display true:display to user, false:save, 'I','D','S' as fpdf display
     *
     * @throws PrestaShopException
     *
     * @return string HTML rendered
     */
    public function render($filename, $display = true)
    {
        if (empty($filename)) {
            throw new PrestaShopException('Missing filename.');
        }

        $this->lastPage();

        if ($display === true) {
            $output = 'D';
        } elseif ($display === false) {
            $output = 'S';
        } elseif ($display == 'D') {
            $output = 'D';
        } elseif ($display == 'S') {
            $output = 'S';
        } elseif ($display == 'F') {
            $output = 'F';
        } elseif ($display == 'E') {
            $output = 'E';
        } else {
            $output = 'I';
        }

        return $this->output($filename, $output);
    }

    //Rotate function to rotate text element
    function Rotate($angle,$x=-1,$y=-1)
    {
        if($x==-1)
            $x=$this->x;
        if($y==-1)
            $y=$this->y;
        if($this->angle!=0)
            $this->_out('Q');
        $this->angle=$angle;
        if($angle!=0)
        {
            $angle*=M_PI/180;
            $c=cos($angle);
            $s=sin($angle);
            $cx=$x*$this->k;
            $cy=($this->h-$y)*$this->k;
            $this->_out(sprintf('q %.5F %.5F %.5F %.5F %.2F %.2F cm 1 0 0 1 %.2F %.2F cm',$c,$s,-$s,$c,$cx,$cy,-$cx,-$cy));
        }
    }

    //Generate rotated Text for watermark
    function RotatedText($x, $y, $txt, $angle, $font_size=150)
    {
        $this->Rotate($angle,$x,$y);
        $this->SetTextColor(234,234,234);
        $this->SetFont('','B', $font_size);
        $this->Text($x,$y,$txt, false, false, true, 0, 0, '', false, '', 0, false, 'T', 'C', false );
        $this->Rotate(0);
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

            $this->write2DBarcode('FOL/'.Configuration::get('MODERNESMIDTHEMECONFIGURATOR_TOKEN').'/'.$reference, 'QRCODE,H', 160, 39, 40, 40, $barcodeStyle, 'R');
        }
        $this->writeHTML($this->content, true, false, true, false, '');
    }
}
