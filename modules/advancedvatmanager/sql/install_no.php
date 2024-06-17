<?php
/**
* 2007-2021 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

if (!defined('_PS_VERSION_')) {
    exit;
}

$id_no = Country::getByIso('NO');
$insert_no_states = "INSERT INTO `"._DB_PREFIX_."state` (`id_country`, `id_zone`, `name`, `iso_code`, `tax_behavior`, `active`) VALUES
($id_no, 7, 'Agder', 'NO-42', 0, 1),
($id_no, 7, 'Innlandet', 'NO-34', 0, 1),
($id_no, 7, 'Jan Mayen', 'NO-22', 0, 1),
($id_no, 7, 'Møre og Romsdal', 'NO-15', 0, 1),
($id_no, 7, 'Nordland', 'NO-18', 0, 1),
($id_no, 7, 'Oslo', 'NO-03', 0, 1),
($id_no, 7, 'Rogaland', 'NO-11', 0, 1),
($id_no, 7, 'Svalbard', 'NO-21', 0, 1),
($id_no, 7, 'Troms og Finnmark', 'NO-54', 0, 1),
($id_no, 7, 'Trøndelag', 'NO-50', 0, 1),
($id_no, 7, 'Vestfold og Telemark', 'NO-38', 0, 1),
($id_no, 7, 'Vestland', 'NO-46', 0, 1),
($id_no, 7, 'Viken', 'NO-46', 0, 1);";

// Create Norwegian states
if (!State::getStatesByIdCountry($id_no)) {
    if (Db::getInstance()->execute($insert_no_states) === false) {
        die('Error while creating Norwegian states.');
    }
    $country = new Country($id_no);
    $country->contains_states = 1;
    $country->update();     
}

if (!in_array('State:name', AddressFormat::getOrderedAddressFields($id_no)) || !in_array('vat_number', AddressFormat::getOrderedAddressFields($id_no))) {
    Db::getInstance()->update('address_format', array('format'=>pSQL('firstname lastname
company
vat_number
address1
address2
postcode city
Country:name
State:name
phone')), 'id_country ='.(int)$id_no);    
}


