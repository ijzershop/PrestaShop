<?php
/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
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
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2015 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

class InstallLanguage
{
    protected $name;
    protected $locale;
    protected $language_code;
    protected $is_rtl;
    protected $date_format_lite;
    protected $date_format_full;
    protected $countries;

    public function __construct($iso)
    {
        $xmlPath = _PS_INSTALL_LANGS_PATH_.$iso.'/';
        $this->setPropertiesFromXml($xmlPath);
        $this->is_rtl = ($this->is_rtl === 'true') ? true : false;
    }

    public function setPropertiesFromXml($xmlPath)
    {
        $xml = @simplexml_load_file($xmlPath.'/language.xml');
        if ($xml) {
            foreach ($xml->children() as $node) {
                $this->{$node->getName()} = (string)$node;
            }
        }
    }

    /**
     * Get name
     *
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get locale
     *
     * @return mixed
     */
    public function getLocale()
    {
        return $this->locale;
    }

    /**
     * Get language_code
     *
     * @return mixed
     */
    public function getLanguageCode()
    {
        return $this->language_code;
    }

    /**
     * Get is_rtl
     *
     * @return mixed
     */
    public function isRtl()
    {
        return $this->is_rtl;
    }

    /**
     * Get date_format_lite
     *
     * @return mixed
     */
    public function getDateFormatLite()
    {
        return $this->date_format_lite;
    }

    /**
     * Get date_format_full
     *
     * @return mixed
     */
    public function getDateFormatFull()
    {
        return $this->date_format_full;
    }

    public function getCountries()
    {
        if (!is_array($this->countries)) {
            $this->countries = array();
            $filename = _PS_INSTALL_LANGS_PATH_.$this->language_code.'/data/country.xml';
            if (file_exists($filename)) {
                if ($xml = @simplexml_load_file($filename)) {
                    foreach ($xml->country as $country) {
                        $this->countries[strtolower((string)$country['id'])] = (string)$country->name;
                    }
                }
            }
        }

        return $this->countries;
    }
}
