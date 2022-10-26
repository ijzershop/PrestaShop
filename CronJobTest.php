<?php
$d = exec('C:\wamp64\bin\php\php7.3.33 C:\wamp64\www\ijzershop8.local\app\Resources\cronscripts\OrderSlipGenerator.php', $log, $result);

var_export([$log, $result, $d]);
?>
