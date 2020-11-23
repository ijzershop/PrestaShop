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

class DashboardTranslations
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
     * Create all translations for Dashboard App
     *
     * @return array
     */
    public function getTranslations()
    {
        $locale = Context::getContext()->language->iso_code;

        $translations[$locale] = [
            'general' => [
                'title' => $this->module->l('PrestaShop Metrics', 'DashboardTranslations'),
                'trustData' => [
                    'text' => $this->module->l('Can I trust the data? Yes, you can!', 'DashboardTranslations'),
                    'link' => $this->module->l('See why', 'DashboardTranslations'),
                ],
                'noData' => $this->module->l('No data available for now', 'DashboardTranslations'),
                'noTipsCard' => $this->module->l('No tips card available for now', 'DashboardTranslations'),
                'noLanguage' => $this->module->l('Looks like we can\'t reach our service right now. Please try again later or contact us if the issue persists.', 'DashboardTranslations'),
                'noActivity' => $this->module->l('You didn\'t get any activity during this period', 'DashboardTranslations'),
            ],
            'incentivePanel' => [
                'title' => $this->module->l('PrestaShop Metrics - A trusted place for your data', 'DashboardTranslations'),
                'gather' => $this->module->l('Gather all your data in one place.', 'DashboardTranslations'),
                'monitor' => $this->module->l('Monitor easily your business on a daily basis.', 'DashboardTranslations'),
                'decisions' => $this->module->l('Make decisions for your business with trusted KPIs.', 'DashboardTranslations'),
                'link' => $this->module->l('Start the setup now', 'DashboardTranslations'),
            ],
            'needGAPanel' => [
                'textContent' => $this->module->l('In order to display sessions and conversion data, you need to configure your google analytics account.'),
                'configure' => $this->module->l('Configure', 'DashboardTranslations'),
            ],
            'dates' => [
                'yesterday' => $this->module->l('Yesterday', 'DashboardTranslations'),
                'last7Days' => $this->module->l('Last 7 days', 'DashboardTranslations'),
                'last30Days' => $this->module->l('Last 30 days', 'DashboardTranslations'),
                'selectOtherDates' => $this->module->l('Select other dates', 'DashboardTranslations'),
                'thismonth' => $this->module->l('This month', 'DashboardTranslations'),
                'lastmonth' => $this->module->l('Last month', 'DashboardTranslations'),
                'last90days' => $this->module->l('Last 90 days', 'DashboardTranslations'),
                'thisweek' => $this->module->l('This week', 'DashboardTranslations'),
                'lastweek' => $this->module->l('Last week', 'DashboardTranslations'),
                'currentPlans' => $this->module->l('Your current plan allows you to analyse data collected during the last 90 days', 'DashboardTranslations'),
                'today' => $this->module->l('Today', 'DashboardTranslations'),
                'to' => $this->module->l('to', 'DashboardTranslations'),
                'selectedPeriod' => $this->module->l('selected period', 'DashboardTranslations'),
            ],
            'menu' => [
                'activity' => $this->module->l('Activity', 'DashboardTranslations'),
                'grow' => $this->module->l('Grow', 'DashboardTranslations'),
                'configure' => $this->module->l('Configure', 'DashboardTranslations'),
            ],
            'tabsTitle' => [
                'source' => $this->module->l('source | sources', 'DashboardTranslations'),
                'noSource' => $this->module->l('No source', 'DashboardTranslations'),
                'revenues' => $this->module->l('revenue | revenues', 'DashboardTranslations'),
                'revenuesTooltip' => $this->module->l('Sum of revenue, tax + shipping incl., generated within the date range by the orders considered as validated.', 'DashboardTranslations'),
                'orders' => $this->module->l('order | orders', 'DashboardTranslations'),
                'ordersTooltip' => $this->module->l('Total number of orders received within the date range by the orders considered as validated.', 'DashboardTranslations'),
                'visits' => $this->module->l('session | sessions', 'DashboardTranslations'),
                'visitsTooltip' => $this->module->l('Total number of sessions on your store within the date range when one or several pages have been loaded by a user.', 'DashboardTranslations'),
                'visitors' => $this->module->l('User | Users', 'DashboardTranslations'),
                'visitorsTooltip' => $this->module->l('Total distinct users who have visited one or several pages on your store at least once within the date range.', 'DashboardTranslations'),
                'conversionRate' => $this->module->l('conversion rate | conversion rate', 'DashboardTranslations'),
                'conversionRateTooltip' => $this->module->l('Percentage of sessions that resulted in orders, out of the total number of sessions, within the date range.', 'DashboardTranslations'),
                'basedOn' => $this->module->l('based on user | based on users', 'DashboardTranslations'),
                'basedOnTooltip' => $this->module->l('Percentage of users who completed an order, out of the total number of users, within the date range.', 'DashboardTranslations'),
                'sourceRatio' => $this->module->l('Ratio orders/sessions', 'DashboardTranslations'),
            ],
            'tabsBody' => [
                'general' => [
                    'titleInsights_revenue' => $this->module->l('Tips to grow your revenue', 'DashboardTranslations'),
                    'titleInsights_orders' => $this->module->l('Tips to increase your orders', 'DashboardTranslations'),
                    'titleInsights_sessions' => $this->module->l('Tips to drive more sessions', 'DashboardTranslations'),
                    'titleInsights_conversion_rate' => $this->module->l('Tips to improve your conversion rate', 'DashboardTranslations'),
                    'discoverAllInsights' => $this->module->l('Discover more insights', 'DashboardTranslations'),
                    'seeMoreFeatures' => $this->module->l('See more features', 'DashboardTranslations'),
                    'close' => $this->module->l('Close', 'DashboardTranslations'),
                ],
                'dates' => [
                    'day' => $this->module->l('Day', 'DashboardTranslations'),
                    'week' => $this->module->l('Week', 'DashboardTranslations'),
                    'month' => $this->module->l('Month', 'DashboardTranslations'),
                ],
                'revenues' => [
                    'revenuePerCategory' => $this->module->l('Revenue per category | Revenue per categories', 'DashboardTranslations'),
                    'revenuePerCategoryTooltip' => $this->module->l('Sum of revenue, tax + shipping incl., generated within the date range by the orders considered as validated.', 'DashboardTranslations'),
                ],
                'orders' => [
                    'cartAnalysis' => $this->module->l('Cart Analysis', 'DashboardTranslations'),
                    'cartValueAverage' => $this->module->l('AVERAGE ORDER VALUE', 'DashboardTranslations'),
                    'cartValueAverageTooltip' => $this->module->l(' Average value of the orders received within the date range, calculated by dividing Revenue by Orders.', 'DashboardTranslations'),
                    'abandonedCartRate' => $this->module->l('CART ABANDONMENT RATE', 'DashboardTranslations'),
                    'abandonedCartRateTooltip' => $this->module->l('Percentage of shopping carts created by a user and abandoned before completing the purchase.', 'DashboardTranslations'),
                    'seeDetails' => $this->module->l('See details', 'DashboardTranslations'),
                ],
                'visits' => [
                    'trafficPerChannel' => $this->module->l('Traffic per channel', 'DashboardTranslations'),
                    'direct' => $this->module->l('The traffic to your website got from direct access, for example by typing your URL in the browser address bar or via a bookmark.', 'DashboardTranslations'),
                    'referral' => $this->module->l('The traffic to your website got from a backlink on another website', 'DashboardTranslations'),
                    'organic_search' => $this->module->l('The traffic your website got for free from search engines, like Google, Bing, etc.', 'DashboardTranslations'),
                    'paid_search' => $this->module->l('The paid traffic your website got from search engines, like Google from Google Ads', 'DashboardTranslations'),
                    'email' => $this->module->l('The traffic your website got from email marketing campaigns and even email signatures', 'DashboardTranslations'),
                    'social' => $this->module->l('The traffic your website got from social media like Facebook, Twitter, Linkedin, etc.', 'DashboardTranslations'),
                    'display' => $this->module->l('The traffic your website got from display ads on another website', 'DashboardTranslations'),
                    'other' => $this->module->l('The traffic your website got from other channels that could not be identified', 'DashboardTranslations'),
                ],
                'conversionRate' => [
                    'loyaltyAnalysis' => $this->module->l('Loyalty analysis', 'DashboardTranslations'),
                    'repeatCustomers' => $this->module->l('Repeat customers', 'DashboardTranslations'),
                    'newCustomers' => $this->module->l('New customers', 'DashboardTranslations'),
                    'customer_with_orders' => $this->module->l('Repeat customers', 'DashboardTranslations'),
                    'customer_without_orders' => $this->module->l('New customers', 'DashboardTranslations'),
                    'customer_with_ordersTooltip' => $this->module->l('Customers who already have completed an order on your store before.', 'DashboardTranslations'),
                    'customer_without_ordersTooltip' => $this->module->l('Customers who have bought for the first time on your store within the date range.', 'DashboardTranslations'),
                ],
                'nextFeatures' => [
                    'comingSoon' => $this->module->l('Coming Soon', 'DashboardTranslations'),
                    'tellMeMore' => $this->module->l('Tell me more', 'DashboardTranslations'),
                    'getNotified' => $this->module->l('Receive weekly reportings by email', 'DashboardTranslations'),
                    'getNotifiedModal' => $this->module->l('Keep always up to speed with your last week\'s performance! Our weekly reporting allows you to get a comprehensive, good-looking and insightful report on your activity. Delivered every Monday, right to your inbox.', 'DashboardTranslations'),
                    'exportData' => $this->module->l('Export your data to CSV and PDF files', 'DashboardTranslations'),
                    'exportDataModal' => $this->module->l('Easily export and share your data. Export your data to a .csv file covering all your KPIs within the selected date range and granularity.  Or download your instant .pdf report, ready to share with your team.', 'DashboardTranslations'),
                    'analyseLast15Months' => $this->module->l('Go further with 14 months of data history', 'DashboardTranslations'),
                    'analyseLast15MonthsModal' => $this->module->l('Unlock the power of your data with a 14 months data history. Analyze your performance over more than one year. Combined with our new comparison mode, you will be able to get a year-over-year analysis very easily.', 'DashboardTranslations'),
                    'upcomingFeatures' => $this->module->l('Upcoming features', 'DashboardTranslations'),
                ],
            ],
            'grow' => [
                'title' => $this->module->l('Grow your business', 'DashboardTranslations'),
                'baseline1' => $this->module->l('Let\'s go further together.', 'DashboardTranslations'),
                'baseline2' => $this->module->l('Get some insights and tips to grow your business!', 'DashboardTranslations'),
                'removeFilter' => $this->module->l('Remove filter', 'DashboardTranslations'),
                'filterSelected' => $this->module->l('filter selected', 'DashboardTranslations'),
                'noFilterSelected' => $this->module->l('Select a tag to filter the tips', 'DashboardTranslations'),
                'readMore' => $this->module->l('Read more', 'DashboardTranslations'),
                'modal' => [
                    'close' => $this->module->l('Close', 'DashboardTranslations'),
                    'visitBlog' => $this->module->l('MORE INFORMATION', 'DashboardTranslations'),
                ],
                'buttons' => [
                    'revenue' => $this->module->l('Revenue', 'DashboardTranslations'),
                    'conversion' => $this->module->l('Conversion', 'DashboardTranslations'),
                    'orders' => $this->module->l('Orders', 'DashboardTranslations'),
                    'sessions' => $this->module->l('Sessions', 'DashboardTranslations'),
                ],
            ],
            'alerts' => [
                'enableDashboardModules' => [
                    'text' => $this->module->l('Your previous statistics blocks have been disabled to avoid overloading your dashboard', 'DashboardTranslations'),
                    'cta' => $this->module->l('Click here if you want to reactivate', 'DashboardTranslations'),
                ],
            ],
        ];

        return $translations;
    }
}
