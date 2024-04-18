<?php
/**
 * 2007-2016 PrestaShop
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
 * @copyright 2007-2016 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class HTMLTemplateInvoice extends HTMLTemplateInvoiceCore
{
    public function getTaxTabContent()
    {
        if (Module::isEnabled('advancedvatmanager')) {
            $debug = Tools::getValue('debug');
            
            require_once(_PS_MODULE_DIR_.'advancedvatmanager/classes/CustomersOrders.php');
            $noTax = CustomersOrders::checkOrderWithTaxExempt($this->order->id);
            
            if (method_exists($this, 'getTaxBreakdown')) {
                $tax_breakdown = $this->getTaxBreakdown();    
            }
            else {
                $tax_breakdown = false;    
            }           
                      
            if ($noTax) {
                $tax_exempt = true;
                $tax_breakdown = false;
            }
            else {
                $address = new Address((int) $this->order->{Configuration::get('PS_TAX_ADDRESS_TYPE')});
                $tax_exempt = Configuration::get('VATNUMBER_MANAGEMENT')
                                && !empty($address->vat_number)
                                && $address->id_country != Configuration::get('VATNUMBER_COUNTRY');
            }        
            $carrier = new Carrier($this->order->id_carrier);
            $data = [
                'tax_exempt' => $tax_exempt,
                'use_one_after_another_method' => $this->order_invoice->useOneAfterAnotherTaxComputationMethod(),
                'display_tax_bases_in_breakdowns' => method_exists($this->order_invoice, 'displayTaxBasesInProductTaxesBreakdown')?$this->order_invoice->displayTaxBasesInProductTaxesBreakdown():false,
                'product_tax_breakdown' => $this->order_invoice->getProductTaxesBreakdown($this->order),
                'shipping_tax_breakdown' => $this->order_invoice->getShippingTaxesBreakdown($this->order),
                'ecotax_tax_breakdown' => $this->order_invoice->getEcoTaxTaxesBreakdown(),
                'wrapping_tax_breakdown' => $this->order_invoice->getWrappingTaxesBreakdown(),
                'tax_breakdowns' => $tax_breakdown,
                'order' => $debug ? null : $this->order,
                'order_invoice' => $debug ? null : $this->order_invoice,
                'carrier' => $debug ? null : $carrier,
            ];
            if ($debug) {
                return $data;
            }
            $this->smarty->assign($data);
            // Compatibility with module gwadvancedinvoice
            if (Module::isEnabled('gwadvancedinvoice')) {
                $this->smarty->assign(array(
                    'taxdetail_label'=>Configuration::get('GINVOICE_LABEL_TAXDETAIL',(int)Context::getContext()->language->id),
                    'taxrate_label'=>Configuration::get('GINVOICE_LABEL_TAXRATE',(int)Context::getContext()->language->id),
                    'taxtotal_label'=>Configuration::get('GINVOICE_LABEL_TOTAL',(int)Context::getContext()->language->id),
                    'taxtotalexcl_label'=>Configuration::get('GINVOICE_LABEL_TOTALEXCL',(int)Context::getContext()->language->id),
                    'taxproduct_label'=>Configuration::get('GINVOICE_LABEL_PRODUCT',(int)Context::getContext()->language->id),
                    'taxecotax_label'=>Configuration::get('GINVOICE_LABEL_SHIPPING',(int)Context::getContext()->language->id),
                    'taxshipping_label'=>Configuration::get('GINVOICE_LABEL_ECOTAX',(int)Context::getContext()->language->id),
                    'taxexempt_label'=>Configuration::get('GINVOICE_LABEL_EXEMPT',(int)Context::getContext()->language->id),
                    'taxbaseprice_label'=>Configuration::get('GINVOICE_LABEL_BASEPRICE',(int)Context::getContext()->language->id),
                    'taxwrapping_label'=>Configuration::get('GINVOICE_LABEL_WRAPPING',(int)Context::getContext()->language->id),
                    'notax_label'=>Configuration::get('GINVOICE_LABEL_NOTAX',(int)Context::getContext()->language->id),
                ));
                return $this->smarty->fetch(_PS_MODULE_DIR_.'gwadvancedinvoice/views/templates/admin/tpltemplates/base/tax-tab.tpl');
            }
            // Compatibility with module ets_payment_with_fee
            if (Module::isEnabled('ets_payment_with_fee')) {
                return $this->smarty->fetch(_PS_MODULE_DIR_.'ets_payment_with_fee/views/templates/hook/invoice.tax-tab.tpl');
            }
            return $this->smarty->fetch($this->getTemplate('invoice.tax-tab'));
        }
        else {
            return parent::getTaxTabContent();
        }
    }
}