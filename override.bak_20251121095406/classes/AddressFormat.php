<?php
class AddressFormat extends AddressFormatCore
{
    /**
     * Returns address format by Country.
     *
     * @param int $idCountry Country ID
     *
     * @return string field Address format
     */
    public function getFormat($idCountry)
    {
        $out = 'firstname lastname
                company
                address1 house_number house_number_extension
                postcode, city
                Country:name
                phone
                phone_mobile
                vat_number
                ';

        if (Country::isNeedDniByCountryId($idCountry) && false === strpos($out, 'dni')) {
            $out .= AddressFormat::FORMAT_NEW_LINE . 'dni';
        }

        return $out;
    }
}
