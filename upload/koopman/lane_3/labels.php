<?php
foreach(glob("*.pdf") as $filename){
  header("Content-Description: File Transfer");
  header("Cache-Control: private");
  header("Content-Type: application/octet-stream");
  header("Content-Length: ".filesize($filename));
  header("Content-Disposition: attachment; filename=".$filename);
  header("Content-Transfer-Encoding: binary");
  readfile($filename);
  unlink($filename);
  break; //alleen de eerste
}
?>