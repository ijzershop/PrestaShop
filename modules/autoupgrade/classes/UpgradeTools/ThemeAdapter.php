<?php

/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
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
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */

namespace PrestaShop\Module\AutoUpgrade\UpgradeTools;

class ThemeAdapter
{
    private $db;
    private $upgradeVersion;

    public function __construct($db, $upgradeVersion)
    {
        $this->db = $db;
        $this->upgradeVersion = $upgradeVersion;
    }

    /**
     * Enable the given theme on the shop.
     *
     * @param string $themeName
     *
     * @return mixed
     */
    public function enableTheme($themeName)
    {
        return version_compare($this->upgradeVersion, '1.7.0.0', '>=') ?
            $this->enableTheme17($themeName) :
            $this->enableTheme16($themeName);
    }

    /**
     * Get the default theme name provided with PrestaShop.
     *
     * @return string
     */
    public function getDefaultTheme()
    {
        return version_compare($this->upgradeVersion, '1.7.0.0', '>=') ?
            'classic' : // 1.7
            'default-bootstrap'; // 1.6
    }

    /**
     * Backward compatibility function for theme enabling.
     *
     * @param string $themeName
     */
    private function enableTheme16($themeName)
    {
        $this->db->execute('UPDATE `' . _DB_PREFIX_ . 'shop`
        SET id_theme = (SELECT id_theme FROM `' . _DB_PREFIX_ . 'theme` WHERE name LIKE \'' . $themeName . '\')');
        $this->db->execute('DELETE FROM `' . _DB_PREFIX_ . 'theme` WHERE  name LIKE \'default\' OR name LIKE \'prestashop\'');

        return true;
    }

    /**
     * Use 1.7 theme manager is order to enable the new theme.
     *
     * @param string $themeName
     *
     * @return bool|array
     */
    private function enableTheme17($themeName)
    {
        $themeManager = $this->getThemeManager();

        $isThemeEnabled = $themeManager->enable($themeName);
        if (!$isThemeEnabled) {
            $errors = $themeManager->getErrors($themeName);

            return $errors ? $errors : 'Unknown error';
        }

        return true;
    }

    private function getThemeManager()
    {
        return (new \PrestaShop\PrestaShop\Core\Addon\Theme\ThemeManagerBuilder(\Context::getContext(), $this->db))->build();
    }
}
