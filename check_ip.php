<?php
header('Content-Type: text/plain');
echo "Your IP as seen by the server:\n";
echo "REMOTE_ADDR: " . $_SERVER['REMOTE_ADDR'] . "\n";
echo "HTTP_X_FORWARDED_FOR: " . (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : 'not set') . "\n";
echo "HTTP_CF_CONNECTING_IP: " . (isset($_SERVER['HTTP_CF_CONNECTING_IP']) ? $_SERVER['HTTP_CF_CONNECTING_IP'] : 'not set') . "\n";
?>
