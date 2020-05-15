<?php
class PDFGenerator extends PDFGeneratorCore
{


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
