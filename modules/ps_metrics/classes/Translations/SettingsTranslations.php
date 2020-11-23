<?php

/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Translations;

use Context;
use Ps_metrics;

class SettingsTranslations
{
    /**
     * @var Ps_metrics
     */
    private $module;

    /**
     * __construct
     *
     * @param Ps_metrics $module
     *
     * @return void
     */
    public function __construct(Ps_metrics $module)
    {
        $this->module = $module;
    }

    /**
     * Create all translations for Settings App
     *
     * @return array translation list
     */
    public function getTranslations()
    {
        $locale = Context::getContext()->language->iso_code;

        $translations[$locale] = [
            'general' => [
                'settings' => $this->module->l('Settings', 'SettingsTranslations'),
                'help' => $this->module->l('Help', 'SettingsTranslations'),
            ],
            'configure' => [
                'incentivePanel' => [
                    'title' => $this->module->l('PrestaShop Metrics - A trusted place for your data', 'SettingsTranslations'),
                    'gather' => $this->module->l('Gather all your data in one place', 'SettingsTranslations'),
                    'monitor' => $this->module->l('Monitor easily your business on a daily basis', 'SettingsTranslations'),
                    'decisions' => $this->module->l('Make decisions for your business based on trusted KPIs', 'SettingsTranslations'),
                    'howTo' => $this->module->l('How to activate it? An easy 2-steps process :', 'SettingsTranslations'),
                    'connectToPs' => $this->module->l('Connect your PrestaShop account', 'SettingsTranslations'),
                    'addSources' => $this->module->l('Add data sources', 'SettingsTranslations'),
                ],
                'dataSources' => [
                    'title' => $this->module->l('Add data sources', 'SettingsTranslations'),
                    'plan3months' => $this->module->l('Your current plan allows you to analyze data collected during the last 3 months.', 'SettingsTranslations'),
                    'subTitle' => $this->module->l('PrestaShop Metrics will use data about: sessions, unique visitors, traffic per channel', 'SettingsTranslations'),
                    'googleAnalytics' => [
                        'title' => $this->module->l('Google Analytics', 'SettingsTranslations'),
                        'connectGoogleAnalytics' => $this->module->l('Connect Google Analytics', 'SettingsTranslations'),
                        'useAnotherAccount' => $this->module->l('Use another account', 'SettingsTranslations'),
                        'logOut' => $this->module->l('Log out', 'SettingsTranslations'),
                        'logOutModal' => [
                            'title' => $this->module->l('Are you sure you want to Logout?', 'SettingsTranslations'),
                            'cancel' => $this->module->l('Cancel', 'SettingsTranslations'),
                            'confirm' => $this->module->l('Confirm', 'SettingsTranslations'),
                        ],
                        'changeGaProperties' => $this->module->l('Change Google Analytics property', 'SettingsTranslations'),
                        'modal' => [
                            'selectTag' => $this->module->l('Select this property', 'SettingsTranslations'),
                            'title' => $this->module->l('Select one Google Analytics property', 'SettingsTranslations'),
                            'subTitle' => $this->module->l('to get right data'),
                            'close' => $this->module->l('Close'),
                            'notFoundedTag' => $this->module->l('No tags found'),
                        ],
                    ],
                    'shop' => [
                        'description' => $this->module->l('PrestaShop Metrics will use data about: total revenue, revenue per category, orders, average order value, abandoned carts rate, new or returning customer status, etc.', 'SettingsTranslations'),
                    ],
                    'alert' => [
                        'noTagAvailable' => [
                            'message' => $this->module->l('It looks like no tag has been installed on your store yet. You can configure one easily using our free Google Analytics module.', 'SettingsTranslations'),
                            'linkInstall' => $this->module->l('Click here to install this module.', 'SettingsTranslations'),
                            'linkEnable' => $this->module->l('Click here to enable this module.', 'SettingsTranslations'),
                            'linkConfigure' => $this->module->l('Click here to configure this module.', 'SettingsTranslations'),
                        ],
                        'notLinked' => [
                            'message' => $this->module->l('A tag has been found on your store but it seems that its property is not linked to your Google Analytics account.', 'SettingsTranslations'),
                            'link' => $this->module->l('Find more information in our FAQ.', 'SettingsTranslations'),
                        ],
                        'noCorrespondingTag' => [
                            'message' => $this->module->l('The property you selected doesn\'t match with the tag configured in your shop. Select another property or configure another tag.', 'SettingsTranslations'),
                            'link' => $this->module->l('Find more information in our FAQ.', 'SettingsTranslations'),
                        ],
                        'errorGoogle' => [
                            'message' => $this->module->l('It looks like you don\'t have a google analytics account.', 'SettingsTranslations'),
                            'messageError' => $this->module->l('It seems you have a problem with your Google Analytics account.'),
                            'link' => $this->module->l('Find more information in our FAQ.', 'SettingsTranslations'),
                        ],
                        'noTag' => [
                            'message' => $this->module->l('It looks like you don\'t have a tag (UA-XXXXX-X) on your google analytics account.', 'SettingsTranslations'),
                            'link' => $this->module->l('Find more information in our FAQ.', 'SettingsTranslations'),
                        ],
                        'linked' => [
                            'message' => $this->module->l('PrestaShop Metrics is now fully configured!', 'SettingsTranslations'),
                            'link' => $this->module->l('Find all your reliable data on your dashboard.', 'SettingsTranslations'),
                        ],
                    ],
                ],
            ],
            'help' => [
                'title' => $this->module->l('Help for PrestaShop Metrics', 'SettingsTranslations'),
                'allowsYouTo' => [
                    'title' => $this->module->l('This module allows you to:', 'SettingsTranslations'),
                    'connect' => $this->module->l('Connect to your PrestaShop account and collect reliable data from your store and Google Analytics', 'SettingsTranslations'),
                    'collect' => $this->module->l('Make decisions for your business based on trusted KPIs and valuable insights.', 'SettingsTranslations'),
                    'benefit' => $this->module->l('Save time with a unique and clean dashboard', 'SettingsTranslations'),
                ],
                'help' => [
                    'needHelp' => $this->module->l('Need help? Find here the documentation of this module.', 'SettingsTranslations'),
                    'downloadPdf' => $this->module->l('Download PDF', 'SettingsTranslations'),
                    'couldntFindAnyAnswer' => $this->module->l('Couldn\'t find any answer to your question?', 'SettingsTranslations'),
                    'contactUs' => $this->module->l('Contact us', 'SettingsTranslations'),
                ],
            ],
            'faq' => [
                'title' => $this->module->l('FAQ', 'SettingsTranslations'),
                'noFaq' => $this->module->l('No FAQ available.', 'SettingsTranslations'),
            ],
        ];

        return $translations;
    }
}
