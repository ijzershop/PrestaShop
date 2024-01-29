<?php
namespace MsThemeConfig\Class;


use PrestaShop\PrestaShop\Adapter\Entity\Db;
use PrestaShop\PrestaShop\Adapter\Entity\ObjectModel;

/**
 *
 */
class Offer extends ObjectModel
{

	/** @var int offer id */
	public $id_oi_offer = null;

	/** @var int customer id */
	public $id_oi_customer = null;

	/** @var string code */
	public $code;

	/** @var string customer name */
	public $name;

	/** @var string customer phone number */
	public $phone;

	/** @var string customer email */
	public $email;

	/** @var string message */
	public $message;

	/** @var string Object creation date */
	public $date_add;

	/** @var string Object last modification date */
	public $date_upd;

	/** @var string Object expiration date */
	public $date_exp;

	public static $definition = [
		'table' => 'offer_integration',
		'primary' => 'id_oi_offer',
		'fields' => [
			'id_oi_offer' => ['type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false],
			'code' => ['type' => self::TYPE_STRING, 'required' => false],
			'name' => ['type' => self::TYPE_STRING, 'required' => false],
			'phone' => ['type' => self::TYPE_STRING, 'required' => false],
			'email' => ['type' => self::TYPE_STRING, 'required' => false],
			'message' => ['type' => self::TYPE_STRING, 'required' => false],
			'date_add' => ['type' => self::TYPE_DATE, 'validate' => 'isDate', 'copy_post' => false],
			'date_upd' => ['type' => self::TYPE_DATE, 'validate' => 'isDate', 'copy_post' => false],
			'date_exp' => ['type' => self::TYPE_DATE, 'validate' => 'isDate', 'copy_post' => false],
        ]
    ];

	public static function getAllOffers($filter = array(), $orderby = null, $asc = true)
	{
		$query = 'SELECT * FROM `' . _DB_PREFIX_ . 'offer_integration`';

		if (is_array($filter) && count($filter) > 0) {
			$query .= ' WHERE';
			foreach ($filter as $filtername => $filtervalue) {
				if (array_key_exists($filtername, Offer::$definition['fields'])) {

					//Filter for dates
					if ($filtername == 'date_add' || $filtername == 'date_upd') {
						$value = unserialize($filtervalue);
						if ($value && is_array($value)) {
							if (!empty($value[0])) {
								$query .= ' ' . $filtername . ' >= \'' . Db::getInstance(_PS_USE_SQL_SLAVE_)->escape($value[0]) . '\' AND';
							}
							if (!empty($value[1])) {
								$query .= ' ' . $filtername . ' <= \'' . Db::getInstance(_PS_USE_SQL_SLAVE_)->escape($value[1]) . '\' AND';
							}
						}
					} //Other fields
					else {
						$query .= ' ' . $filtername . ' LIKE \'%' . Db::getInstance(_PS_USE_SQL_SLAVE_)->escape($filtervalue) . '%\' AND';
					}
				}
			}
			$query = substr($query, 0, -4);
		}
		if ($orderby != null && array_key_exists($orderby, Offer::$definition['fields'])) {
			$query .= ' ORDER BY `' . $orderby . '` ' . (($asc) ? 'ASC' : 'DESC');
		} else {
			$query .= ' ORDER BY `date_add` DESC';
		}

		return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
	}

	public static function getOfferForCode($code)
	{
		if ($code == null || !preg_match("/^[-0-9A-Za-z]+$/", $code)) {
			return null;
		}

		$query = 'SELECT `id_oi_offer` FROM `' . _DB_PREFIX_ . 'offer_integration` WHERE `code` = "' . $code . '" ;';
		return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
	}

	public static function getOfferByID($code)
	{
		if ($code == null || !preg_match("/^[0-9]+$/", $code)) {
			return null;
		}
		$query = 'SELECT * FROM `' . _DB_PREFIX_ . 'offer_integration` WHERE `id_oi_offer` = "' . $code . '" ;';
		$result = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($query);
		return (is_array($result) && count($result) == 1) ? $result[0] : false;
	}
}
