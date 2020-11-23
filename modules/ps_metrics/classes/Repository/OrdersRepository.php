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

namespace PrestaShop\Module\Ps_metrics\Repository;

use Context;
use PrestaShop\Module\Ps_metrics\Helper\DbHelper;
use Shop;

class OrdersRepository
{
    /**
     * @var string
     */
    private $startDate;

    /**
     * @var string
     */
    private $endDate;

    /**
     * @var int
     */
    private $granularity;

    /**
     * @var DbHelper
     */
    private $dbHelper;

    /**
     * __construct
     *
     * @param string $startDate
     * @param string $endDate
     * @param int $granularity
     *
     * @return void
     */
    public function __construct($startDate, $endDate, $granularity)
    {
        $this->startDate = $startDate . ' 00:00:00';
        $this->endDate = $endDate . ' 23:59:59';
        $this->granularity = $granularity;
        $this->dbHelper = new DbHelper();
    }

    /**
     * findAllRevenuesByDateAndGranularity
     *
     * @return array
     */
    public function findAllRevenuesByDateAndGranularity()
    {
        return $this->dbHelper->executeS(
            'SELECT
                o.id_customer,
                LEFT(o.date_add, ' . $this->granularity . ') as date,
                SUM(o.total_paid_tax_incl / o.conversion_rate) as revenues,
                SUM(oslip.total_products_tax_incl / oslip.conversion_rate) as refund
            FROM ' . _DB_PREFIX_ . 'orders o
            INNER JOIN ' . _DB_PREFIX_ . 'order_state os ON (o.current_state = os.id_order_state)
            LEFT JOIN ' . _DB_PREFIX_ . 'order_slip oslip ON (o.id_order = oslip.id_order)
            WHERE
                o.date_add BETWEEN "' . pSQL($this->startDate) . '" AND "' . pSQL($this->endDate) . '"
                AND os.logable = 1
                ' . Shop::addSqlRestriction(false, 'o') . '
            GROUP BY date'
        );
    }

    /**
     * findAllRevenuesByCustomerByDateAndGranularity
     *
     * @return array
     */
    public function findAllRevenuesByCustomerByDateAndGranularity()
    {
        return $this->dbHelper->executeS(
            'SELECT
                o.id_customer,
                LEFT(o.date_add, ' . $this->granularity . ') as date,
                SUM(total_paid_tax_incl / o.conversion_rate) as revenues,
                SUM(oslip.total_products_tax_incl / oslip.conversion_rate) as refund
            FROM ' . _DB_PREFIX_ . 'orders o
            INNER JOIN ' . _DB_PREFIX_ . 'order_state os ON (o.current_state = os.id_order_state)
            LEFT JOIN ' . _DB_PREFIX_ . 'order_slip oslip ON (o.id_order = oslip.id_order)
            WHERE
                o.date_add BETWEEN "' . pSQL($this->startDate) . '" AND "' . pSQL($this->endDate) . '"
                AND os.logable = 1
			    ' . Shop::addSqlRestriction(false, 'o') . '
            GROUP BY o.id_customer, date'
        );
    }

    /**
     * findAllCategoriesByDate
     *
     * @return array
     */
    public function findAllBestCategoriesRevenuesByDate()
    {
        return $this->dbHelper->executeS(
            'SELECT
                od.id_order_detail,
                SUM((od.unit_price_tax_incl / o.conversion_rate) * od.product_quantity) as revenues,
                SUM(osd.amount_tax_incl / oslip.conversion_rate) as refund,
                o.date_add,
                cl.name
            FROM ' . _DB_PREFIX_ . 'order_detail od
            INNER JOIN ' . _DB_PREFIX_ . 'orders o ON (od.id_order = o.id_order)
            LEFT JOIN ' . _DB_PREFIX_ . 'order_slip_detail osd ON (od.id_order_detail = osd.id_order_detail)
            LEFT JOIN ' . _DB_PREFIX_ . 'order_slip oslip ON (o.id_order = oslip.id_order)
            INNER JOIN ' . _DB_PREFIX_ . 'order_state os ON (o.current_state = os.id_order_state)
            INNER JOIN ' . _DB_PREFIX_ . 'product p ON (od.product_id = p.id_product)
            INNER JOIN ' . _DB_PREFIX_ . 'category_lang cl ON (p.id_category_default = cl.id_category)
            WHERE
                o.date_add BETWEEN "' . pSQL($this->startDate) . '" AND "' . pSQL($this->endDate) . '"
                AND os.logable = 1
                AND cl.id_lang = ' . (int) Context::getContext()->employee->id_lang . '
                ' . Shop::addSqlRestriction(false, 'o') . '
            GROUP BY cl.id_category'
        );
    }

    /**
     * findAllOrdersByDateAndGranularity
     *
     * @return array
     */
    public function findAllOrdersByDateAndGranularity()
    {
        return $this->dbHelper->executeS(
            'SELECT
                LEFT(o.date_add, ' . $this->granularity . ') as date,
                COUNT(o.id_order) as orders
            FROM ' . _DB_PREFIX_ . 'orders o
            INNER JOIN ' . _DB_PREFIX_ . 'order_state os ON (o.current_state = os.id_order_state)
            WHERE
                o.date_add BETWEEN "' . pSQL($this->startDate) . '" AND "' . pSQL($this->endDate) . '"
                AND os.logable = 1
			    ' . Shop::addSqlRestriction(false, 'o') . '
            GROUP BY date'
        );
    }

    /**
     * findCustomerInvoiceDateBySpecificDate
     *
     * @param int $customerId
     * @param string $date
     *
     * @return string|false|null
     */
    public function findCustomerInvoiceDateBySpecificDate($customerId, $date)
    {
        return $this->dbHelper->getValue(
            'SELECT COUNT(o.date_add)
            FROM ' . _DB_PREFIX_ . 'orders o
            INNER JOIN ' . _DB_PREFIX_ . 'order_state os ON (o.current_state = os.id_order_state)
            INNER JOIN ' . _DB_PREFIX_ . 'customer c ON (o.id_customer = c.id_customer)
            WHERE
                c.id_customer = ' . (int) $customerId . '
                AND o.date_add <= "' . pSQL($date) . '"
                AND os.logable = 1
                ' . Shop::addSqlRestriction(false, 'o') . '
            ORDER BY o.date_add ASC'
        );
    }

    /**
     * Get all cart from existing in a date range AND get all abandoned carts in that range
     * Get datas without orders only
     *
     * @return array
     */
    public function findAllCartsOrderedByDate()
    {
        $context = Context::getContext();

        // In Prestashop, a cart is abandoned when the cart is not updated for, at least, 24 hours
        return  $this->dbHelper->getRow(
            'SELECT COUNT(all_cart.id_cart) AS all_cart, COUNT(abandon_cart.id_cart) AS ordered
            FROM `' . _DB_PREFIX_ . 'cart` all_cart
            LEFT JOIN `' . _DB_PREFIX_ . 'orders` o ON (all_cart.id_cart = o.id_cart AND all_cart.id_shop = o.id_shop)
            LEFT JOIN `' . _DB_PREFIX_ . 'cart` abandon_cart ON (
                all_cart.id_cart = abandon_cart.id_cart
                AND abandon_cart.date_upd >= DATE_ADD("' . pSQL($this->startDate) . '", INTERVAL 1 HOUR)
                AND abandon_cart.date_upd <= DATE_ADD("' . pSQL($this->endDate) . '", INTERVAL 1 HOUR)
                AND abandon_cart.id_cart = o.id_cart
                AND abandon_cart.id_shop = ' . (int) $context->shop->id . '
            )
            WHERE 1
                AND all_cart.date_upd >= DATE_ADD("' . pSQL($this->startDate) . '", INTERVAL 1 HOUR)
                AND all_cart.date_upd <= DATE_ADD("' . pSQL($this->endDate) . '", INTERVAL 1 HOUR)
                AND all_cart.id_shop = ' . (int) $context->shop->id
        );
    }
}
