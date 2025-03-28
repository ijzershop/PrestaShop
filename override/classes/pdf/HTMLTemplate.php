<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

/**
 * @since 1.5
 */
class HTMLTemplate extends HTMLTemplateCore
{

    /**
     * Returns the invoice logo.
     *
     * @return string|null
     */
    protected function getLogo()
    {
        $id_shop = (int) $this->shop->id;
        //check if is cli
        $isCli = (php_sapi_name() === 'cli');

        if ($isCli) {
            $invoiceLogo = Configuration::get('PS_LOGO_MAIL', null, null, $id_shop);
            if ($invoiceLogo && file_exists(_PS_ROOT_DIR_ . '/img/' .  $invoiceLogo)) {
                return $invoiceLogo;
            }

            $logo = Configuration::get('PS_LOGO', null, null, $id_shop);
            if ($logo && file_exists(_PS_ROOT_DIR_ . '/img/' .  $logo)) {
                return $logo;
            }

        } else {
            $invoiceLogo = Configuration::get('PS_LOGO_MAIL', null, null, $id_shop);
            if ($invoiceLogo && file_exists(_PS_IMG_DIR_ . $invoiceLogo)) {
                return $invoiceLogo;
            }

            $logo = Configuration::get('PS_LOGO', null, null, $id_shop);
            if ($logo && file_exists(_PS_IMG_DIR_ . $logo)) {
                return $logo;
            }
        }

        return null;
    }

    /**
     * Assign common header data to smarty variables.
     */
    public function assignCommonHeaderData()
    {
        $this->setShopId();
        $id_shop = (int) $this->shop->id;
        $shop_name = Configuration::get('PS_SHOP_NAME', null, null, $id_shop);

        $logo = $this->getLogo();

        $width = 0;
        $height = 0;
        if (!empty($logo)) {
            list($width, $height) = getimagesize(_PS_IMG_DIR_ . $logo);
        }

        // Limit the height of the logo for the PDF render
        $maximum_height = 100;
        if ($height > $maximum_height) {
            $ratio = $maximum_height / $height;
            $height *= $ratio;
            $width *= $ratio;
        }


         $isCli = (php_sapi_name() === 'cli');

        $protocol = 'https://';
         if ($isCli) {
            $logo_path = _PS_ROOT_DIR_ . '/img/' . $logo;
            $image_path = _PS_ROOT_DIR_ . '/img/';
        } else {
            $logo_path =  _PS_IMG_ . $logo;
            $image_path =  _PS_IMG_;
        }

        $this->smarty->assign([
            'logo_path' => $logo_path,
            'img_ps_dir' => $image_path,
            'img_update_time' => Configuration::get('PS_IMG_UPDATE_TIME'),
            'date' => $this->date,
            'title' => $this->title,
            'shop_name' => $shop_name,
            'shop_details' => Configuration::get('PS_SHOP_DETAILS', null, null, (int) $id_shop),
            'width_logo' => $width,
            'height_logo' => $height,
        ]);
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        // TODO: Implement getContent() method.
    }

    /**
     * @return mixed
     */
    public function getFilename()
    {
        // TODO: Implement getFilename() method.
    }

    /**
     * @return mixed
     */
    public function getBulkFilename()
    {
        // TODO: Implement getBulkFilename() method.
    }
}

?>
