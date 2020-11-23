<?php
/**
 * Export to PHP Array plugin for PHPMyAdmin
 * @version 4.9.5
 */

/**
 * Database `u22597p33361_ijzershopnl2019`
 */

/* `u22597p33361_ijzershopnl2019`.`pr_order_state_lang` */
$order_state_lang = array(
  array('id_order_state' => '1','id_new_order_state' => '24','name' => '|A : handmatig aangepast door Tako','template' => ''),
  array('id_order_state' => '2','id_new_order_state' => '2','name' => '[Betaling ontvangen]','template' => ''),
  array('id_order_state' => '3','id_new_order_state' => '20','name' => '- Order afhalen','template' => 'pickup2'),
  array('id_order_state' => '4','id_new_order_state' => '4','name' => '[Uw bestelling is verzonden]','template' => ''),
  array('id_order_state' => '5','id_new_order_state' => '5','name' => '- Order afgerond','template' => ''),
  array('id_order_state' => '6','id_new_order_state' => '6','name' => '- Order geannuleerd','template' => 'order_canceled'),
  array('id_order_state' => '7','id_new_order_state' => '3','name' => '[Uw order wordt verwerkt]','template' => ''),
  array('id_order_state' => '8','id_new_order_state' => '21','name' => '|B handmatig omgezet: toegevoegd?','template' => ''),
  array('id_order_state' => '9','id_new_order_state' => '22','name' => '|C handmatig omgezet: afgehaald?','template' => ''),
  array('id_order_state' => '10','id_new_order_state' => '10','name' => '[Bankoverschrijving]','template' => 'bankwire'),
  array('id_order_state' => '11','id_new_order_state' => '4','name' => '|D Factuur verzonden (bijlage)','template' => 'shipped'),
  array('id_order_state' => '12','id_new_order_state' => '25','name' => '|E ','template' => 'voucher_new'),
  array('id_order_state' => '13','id_new_order_state' => '25','name' => '|F','template' => ''),
  array('id_order_state' => '14','id_new_order_state' => '25','name' => '|G','template' => ''),
  array('id_order_state' => '15','id_new_order_state' => '26','name' => '[Uw bestelling ligt klaar voor verzending]','template' => ''),
  array('id_order_state' => '16','id_new_order_state' => '3','name' => '- Order geprint','template' => ''),
  array('id_order_state' => '17','id_new_order_state' => '9','name' => '- Order vertraagd','template' => 'order_changed'),
  array('id_order_state' => '18','id_new_order_state' => '25 ','name' => '[INTERN: zie klantenservice]','template' => '')
);

return $order_state_lang;
