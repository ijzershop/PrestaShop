<?php
// // Analytics update cron
$locationAnalytics = $_SERVER['DOCUMENT_ROOT'].'/google-analytics.js';
$analytics = file_get_contents('https://www.google-analytics.com/analytics.js');
file_put_contents($locationAnalytics, $analytics);
// // Google EC plugin cron
$locationEcPlugin = $_SERVER['DOCUMENT_ROOT'].'/google-ec.js';
$ecPlugin = file_get_contents('https://www.google-analytics.com/plugins/ua/ec.js');
file_put_contents($locationEcPlugin, $ecPlugin);
?>

