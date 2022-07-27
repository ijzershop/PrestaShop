<?php
/**
 * Overide to add housenumber to address form
 */

class Address extends AddressCore
{

    public $house_number;
    public $house_number_extension;

    // because it will give you exception on checkout address step
    public static $definition = array(
        'table' => 'address',
        'primary' => 'id_address',
        'fields' => array(
            'id_customer' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_manufacturer' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_supplier' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_warehouse' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId', 'copy_post' => false),
            'id_country' => array('type' => self::TYPE_INT, 'validate' => 'isUnsignedId', 'required' => true),
            'id_state' => array('type' => self::TYPE_INT, 'validate' => 'isNullOrUnsignedId'),
            'alias' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'required' => true, 'size' => 32),
            'company' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName', 'size' => 255),
            'lastname' => array('type' => self::TYPE_STRING, 'validate' => 'isName', 'required' => true, 'size' => 255),
            'firstname' => array('type' => self::TYPE_STRING, 'validate' => 'isName', 'required' => true, 'size' => 255),
            'vat_number' => array('type' => self::TYPE_STRING, 'validate' => 'isGenericName'),
            'address1' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'required' => true, 'size' => 128),
            'address2' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'size' => 128),
            'house_number' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'required' => true, 'size' => 8),
            'house_number_extension' => array('type' => self::TYPE_STRING, 'validate' => 'isAddress', 'required' => false, 'size' => 8),
            'postcode' => array('type' => self::TYPE_STRING, 'validate' => 'isPostCode', 'size' => 12),
            'city' => array('type' => self::TYPE_STRING, 'validate' => 'isCityName', 'required' => true, 'size' => 64),
            'other' => array('type' => self::TYPE_STRING, 'validate' => 'isMessage', 'size' => 300),
            'phone' => array('type' => self::TYPE_STRING, 'validate' => 'isPhoneNumber', 'size' => 32),
            'phone_mobile' => array('type' => self::TYPE_STRING, 'validate' => 'isPhoneNumber', 'size' => 32),
            'dni' => array('type' => self::TYPE_STRING, 'validate' => 'isDniLite', 'size' => 16),
            'deleted' => array('type' => self::TYPE_BOOL, 'validate' => 'isBool', 'copy_post' => false),
            'date_add' => array('type' => self::TYPE_DATE, 'validate' => 'isDate', 'copy_post' => false),
            'date_upd' => array('type' => self::TYPE_DATE, 'validate' => 'isDate', 'copy_post' => false),
        ),
    );




    /**
     * Initialize an address corresponding to the specified id address or if empty to the
     * default shop configuration.
     *
     * @param int $id_address
     * @param bool $with_geoloc
     *
     * @return Address address
     *
     * @throws PrestaShopException
     */
    public static function initialize($id_address = null, $with_geoloc = false)
    {
        $context = Context::getContext();

        if ($id_address) {
            $context_hash = (int) $id_address;
        } elseif ($with_geoloc && isset($context->customer->geoloc_id_country)) {
            $context_hash = md5((int) $context->customer->geoloc_id_country . '-' . (int) $context->customer->id_state . '-' .
                $context->customer->postcode);
        } else {
            $context_hash = md5((int) $context->country->id);
        }

        $cache_id = 'Address::initialize_' . $context_hash;

        if (!Cache::isStored($cache_id)) {
            // if an id_address has been specified retrieve the address
            if ($id_address) {
                $address = new Address((int) $id_address);

                if (!Validate::isLoadedObject($address)) {
                    $address->id = (int) $id_address;
                    $address->delete();
//                    throw new PrestaShopException('Invalid address #' . (int) $id_address);
                }
            } elseif ($with_geoloc && isset($context->customer->geoloc_id_country)) {

                $address = new Address();
                $address->id_country = (int) $context->customer->geoloc_id_country;
                $address->id_state = (int) $context->customer->id_state;
                $address->postcode = $context->customer->postcode;
            } elseif ((int) $context->country->id && ((int) $context->country->id != Configuration::get('PS_SHOP_COUNTRY_ID'))) {
                $address = new Address();
                $address->id_country = (int) $context->country->id;
                $address->id_state = 0;
                $address->postcode = 0;
            } elseif ((int) Configuration::get('PS_SHOP_COUNTRY_ID')) {
                // set the default address
                $address = new Address();
                $address->id_country = Configuration::get('PS_SHOP_COUNTRY_ID');
                $address->id_state = Configuration::get('PS_SHOP_STATE_ID');
                $address->postcode = Configuration::get('PS_SHOP_CODE');
            } else {
                // set the default address
                $address = new Address();
                $address->id_country = Configuration::get('PS_COUNTRY_DEFAULT');
                $address->id_state = 0;
                $address->postcode = 0;
            }
            Cache::store($cache_id, $address);

            return $address;
        }

        return Cache::retrieve($cache_id);
    }
}


?>
