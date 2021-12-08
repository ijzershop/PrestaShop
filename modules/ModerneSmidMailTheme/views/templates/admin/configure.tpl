{*
* 2007-2021 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2021 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<div class="panel">
	<h3><i class="icon icon-credit-card"></i> {l s='Email theme van de Moderne Smid' mod='ModerneSmidMailTheme'}</h3>
	<p>
		<strong>{l s='Deze module laad het Moderne Email Templates!' mod='ModerneSmidMailTheme'}</strong><br />
  </p>

  <style type="text/css">
    table#email-blocks td:first-child, table#email-blocks th{
      font-weight: bold;
    }
    table#email-blocks td:not(:first-child), table#email-blocks th:not(:first-child){
      text-align: center;
    }
  </style>
<table id="email-blocks" class="table table-condensed">
  <thead>
    <tr>
      <th>Template Name</th>
      <th>Show Trace Order</th>
      <th>Show Add2Order</th>
      <th>Show FAQ</th>
      <th>Show Review</th>
      <th>Show Contact</th>
    </tr>
  </thead>
  <tbody>


    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/account.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> account</td>
      <td><input type="checkbox" data-name="account_trace"/></td>
      <td><input type="checkbox" data-name="account_add2order"/></td>
      <td><input type="checkbox" data-name="account_faq"/></td>
      <td><input type="checkbox" data-name="account_review"/></td>
      <td><input type="checkbox" data-name="account_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/backoffice_order.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> backoffice_order</td>
      <td><input type="checkbox" data-name="backoffice_order_trace"/></td>
      <td><input type="checkbox" data-name="backoffice_order_add2order"/></td>
      <td><input type="checkbox" data-name="backoffice_order_faq"/></td>
      <td><input type="checkbox" data-name="backoffice_order_review"/></td>
      <td><input type="checkbox" data-name="backoffice_order_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/bankwire.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> bankwire</td>
      <td><input type="checkbox" data-name="bankwire_trace"/></td>
      <td><input type="checkbox" data-name="bankwire_add2order"/></td>
      <td><input type="checkbox" data-name="bankwire_faq"/></td>
      <td><input type="checkbox" data-name="bankwire_review"/></td>
      <td><input type="checkbox" data-name="bankwire_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/cheque.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> cheque</td>
      <td><input type="checkbox" data-name="cheque_trace"/></td>
      <td><input type="checkbox" data-name="cheque_add2order"/></td>
      <td><input type="checkbox" data-name="cheque_faq"/></td>
      <td><input type="checkbox" data-name="cheque_review"/></td>
      <td><input type="checkbox" data-name="cheque_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/contact.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> contact</td>
      <td><input type="checkbox" data-name="contact_trace"/></td>
      <td><input type="checkbox" data-name="contact_add2order"/></td>
      <td><input type="checkbox" data-name="contact_faq"/></td>
      <td><input type="checkbox" data-name="contact_review"/></td>
      <td><input type="checkbox" data-name="contact_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/contact_form.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> contact_form</td>
      <td><input type="checkbox" data-name="contact_form_trace"/></td>
      <td><input type="checkbox" data-name="contact_form_add2order"/></td>
      <td><input type="checkbox" data-name="contact_form_faq"/></td>
      <td><input type="checkbox" data-name="contact_form_review"/></td>
      <td><input type="checkbox" data-name="contact_form_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/contact_information.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> contact_information</td>
      <td><input type="checkbox" data-name="contact_information_trace"/></td>
      <td><input type="checkbox" data-name="contact_information_add2order"/></td>
      <td><input type="checkbox" data-name="contact_information_faq"/></td>
      <td><input type="checkbox" data-name="contact_information_review"/></td>
      <td><input type="checkbox" data-name="contact_information_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/contact_offer.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> contact_offer</td>
      <td><input type="checkbox" data-name="contact_offer_trace"/></td>
      <td><input type="checkbox" data-name="contact_offer_add2order"/></td>
      <td><input type="checkbox" data-name="contact_offer_faq"/></td>
      <td><input type="checkbox" data-name="contact_offer_review"/></td>
      <td><input type="checkbox" data-name="contact_offer_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/credit_slip.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> credit_slip</td>
      <td><input type="checkbox" data-name="credit_slip_trace"/></td>
      <td><input type="checkbox" data-name="credit_slip_add2order"/></td>
      <td><input type="checkbox" data-name="credit_slip_faq"/></td>
      <td><input type="checkbox" data-name="credit_slip_review"/></td>
      <td><input type="checkbox" data-name="credit_slip_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailalerts/customer_qty.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> customer_qty</td>
      <td><input type="checkbox" data-name="customer_qty_trace"/></td>
      <td><input type="checkbox" data-name="customer_qty_add2order"/></td>
      <td><input type="checkbox" data-name="customer_qty_faq"/></td>
      <td><input type="checkbox" data-name="customer_qty_review"/></td>
      <td><input type="checkbox" data-name="customer_qty_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/download_product.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> download_product</td>
      <td><input type="checkbox" data-name="download_product_trace"/></td>
      <td><input type="checkbox" data-name="download_product_add2order"/></td>
      <td><input type="checkbox" data-name="download_product_faq"/></td>
      <td><input type="checkbox" data-name="download_product_review"/></td>
      <td><input type="checkbox" data-name="download_product_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/employee_password.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> employee_password</td>
      <td><input type="checkbox" data-name="employee_password_trace"/></td>
      <td><input type="checkbox" data-name="employee_password_add2order"/></td>
      <td><input type="checkbox" data-name="employee_password_faq"/></td>
      <td><input type="checkbox" data-name="employee_password_review"/></td>
      <td><input type="checkbox" data-name="employee_password_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/followup_1.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> followup_1</td>
      <td><input type="checkbox" data-name="followup_1_trace"/></td>
      <td><input type="checkbox" data-name="followup_1_add2order"/></td>
      <td><input type="checkbox" data-name="followup_1_faq"/></td>
      <td><input type="checkbox" data-name="followup_1_review"/></td>
      <td><input type="checkbox" data-name="followup_1_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/followup_2.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> followup_2</td>
      <td><input type="checkbox" data-name="followup_2_trace"/></td>
      <td><input type="checkbox" data-name="followup_2_add2order"/></td>
      <td><input type="checkbox" data-name="followup_2_faq"/></td>
      <td><input type="checkbox" data-name="followup_2_review"/></td>
      <td><input type="checkbox" data-name="followup_2_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/followup_3.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> followup_3</td>
      <td><input type="checkbox" data-name="followup_3_trace"/></td>
      <td><input type="checkbox" data-name="followup_3_add2order"/></td>
      <td><input type="checkbox" data-name="followup_3_faq"/></td>
      <td><input type="checkbox" data-name="followup_3_review"/></td>
      <td><input type="checkbox" data-name="followup_3_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/followup_4.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> followup_4</td>
      <td><input type="checkbox" data-name="followup_4_trace"/></td>
      <td><input type="checkbox" data-name="followup_4_add2order"/></td>
      <td><input type="checkbox" data-name="followup_4_faq"/></td>
      <td><input type="checkbox" data-name="followup_4_review"/></td>
      <td><input type="checkbox" data-name="followup_4_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/forward_msg.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> forward_msg</td>
      <td><input type="checkbox" data-name="forward_msg_trace"/></td>
      <td><input type="checkbox" data-name="forward_msg_add2order"/></td>
      <td><input type="checkbox" data-name="forward_msg_faq"/></td>
      <td><input type="checkbox" data-name="forward_msg_review"/></td>
      <td><input type="checkbox" data-name="forward_msg_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/guest_to_customer.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> guest_to_customer</td>
      <td><input type="checkbox" data-name="guest_to_customer_trace"/></td>
      <td><input type="checkbox" data-name="guest_to_customer_add2order"/></td>
      <td><input type="checkbox" data-name="guest_to_customer_faq"/></td>
      <td><input type="checkbox" data-name="guest_to_customer_review"/></td>
      <td><input type="checkbox" data-name="guest_to_customer_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/import.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> import</td>
      <td><input type="checkbox" data-name="import_trace"/></td>
      <td><input type="checkbox" data-name="import_add2order"/></td>
      <td><input type="checkbox" data-name="import_faq"/></td>
      <td><input type="checkbox" data-name="import_review"/></td>
      <td><input type="checkbox" data-name="import_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/in_transit.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> in_transit</td>
      <td><input type="checkbox" data-name="in_transit_trace"/></td>
      <td><input type="checkbox" data-name="in_transit_add2order"/></td>
      <td><input type="checkbox" data-name="in_transit_faq"/></td>
      <td><input type="checkbox" data-name="in_transit_review"/></td>
      <td><input type="checkbox" data-name="in_transit_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/log_alert.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> log_alert</td>
      <td><input type="checkbox" data-name="log_alert_trace"/></td>
      <td><input type="checkbox" data-name="log_alert_add2order"/></td>
      <td><input type="checkbox" data-name="log_alert_faq"/></td>
      <td><input type="checkbox" data-name="log_alert_review"/></td>
      <td><input type="checkbox" data-name="log_alert_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailalerts/new_order.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> new_order</td>
      <td><input type="checkbox" data-name="new_order_trace"/></td>
      <td><input type="checkbox" data-name="new_order_add2order"/></td>
      <td><input type="checkbox" data-name="new_order_faq"/></td>
      <td><input type="checkbox" data-name="new_order_review"/></td>
      <td><input type="checkbox" data-name="new_order_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/newsletter.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> newsletter</td>
      <td><input type="checkbox" data-name="newsletter_trace"/></td>
      <td><input type="checkbox" data-name="newsletter_add2order"/></td>
      <td><input type="checkbox" data-name="newsletter_faq"/></td>
      <td><input type="checkbox" data-name="newsletter_review"/></td>
      <td><input type="checkbox" data-name="newsletter_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailsubscription/newsletter_conf.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> newsletter_conf</td>
      <td><input type="checkbox" data-name="newsletter_conf_trace"/></td>
      <td><input type="checkbox" data-name="newsletter_conf_add2order"/></td>
      <td><input type="checkbox" data-name="newsletter_conf_faq"/></td>
      <td><input type="checkbox" data-name="newsletter_conf_review"/></td>
      <td><input type="checkbox" data-name="newsletter_conf_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailsubscription/newsletter_verif.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> newsletter_verif</td>
      <td><input type="checkbox" data-name="newsletter_verif_trace"/></td>
      <td><input type="checkbox" data-name="newsletter_verif_add2order"/></td>
      <td><input type="checkbox" data-name="newsletter_verif_faq"/></td>
      <td><input type="checkbox" data-name="newsletter_verif_review"/></td>
      <td><input type="checkbox" data-name="newsletter_verif_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailsubscription/newsletter_voucher.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> newsletter_voucher</td>
      <td><input type="checkbox" data-name="newsletter_voucher_trace"/></td>
      <td><input type="checkbox" data-name="newsletter_voucher_add2order"/></td>
      <td><input type="checkbox" data-name="newsletter_voucher_faq"/></td>
      <td><input type="checkbox" data-name="newsletter_voucher_review"/></td>
      <td><input type="checkbox" data-name="newsletter_voucher_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/offerintergration/offernotification.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> offernotification</td>
      <td><input type="checkbox" data-name="offernotification_trace"/></td>
      <td><input type="checkbox" data-name="offernotification_add2order"/></td>
      <td><input type="checkbox" data-name="offernotification_faq"/></td>
      <td><input type="checkbox" data-name="offernotification_review"/></td>
      <td><input type="checkbox" data-name="offernotification_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/order_canceled.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> order_canceled</td>
      <td><input type="checkbox" data-name="order_canceled_trace"/></td>
      <td><input type="checkbox" data-name="order_canceled_add2order"/></td>
      <td><input type="checkbox" data-name="order_canceled_faq"/></td>
      <td><input type="checkbox" data-name="order_canceled_review"/></td>
      <td><input type="checkbox" data-name="order_canceled_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailalerts/order_changed.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> order_changed</td>
      <td><input type="checkbox" data-name="order_changed_trace"/></td>
      <td><input type="checkbox" data-name="order_changed_add2order"/></td>
      <td><input type="checkbox" data-name="order_changed_faq"/></td>
      <td><input type="checkbox" data-name="order_changed_review"/></td>
      <td><input type="checkbox" data-name="order_changed_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/order_conf.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> order_conf</td>
      <td><input type="checkbox" data-name="order_conf_trace"/></td>
      <td><input type="checkbox" data-name="order_conf_add2order"/></td>
      <td><input type="checkbox" data-name="order_conf_faq"/></td>
      <td><input type="checkbox" data-name="order_conf_review"/></td>
      <td><input type="checkbox" data-name="order_conf_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/order_customer_comment.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> order_customer_comment</td>
      <td><input type="checkbox" data-name="order_customer_comment_trace"/></td>
      <td><input type="checkbox" data-name="order_customer_comment_add2order"/></td>
      <td><input type="checkbox" data-name="order_customer_comment_faq"/></td>
      <td><input type="checkbox" data-name="order_customer_comment_review"/></td>
      <td><input type="checkbox" data-name="order_customer_comment_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/order_merchant_comment.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> order_merchant_comment</td>
      <td><input type="checkbox" data-name="order_merchant_comment_trace"/></td>
      <td><input type="checkbox" data-name="order_merchant_comment_add2order"/></td>
      <td><input type="checkbox" data-name="order_merchant_comment_faq"/></td>
      <td><input type="checkbox" data-name="order_merchant_comment_review"/></td>
      <td><input type="checkbox" data-name="order_merchant_comment_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/order_return_state.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> order_return_state</td>
      <td><input type="checkbox" data-name="order_return_state_trace"/></td>
      <td><input type="checkbox" data-name="order_return_state_add2order"/></td>
      <td><input type="checkbox" data-name="order_return_state_faq"/></td>
      <td><input type="checkbox" data-name="order_return_state_review"/></td>
      <td><input type="checkbox" data-name="order_return_state_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/outofstock.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> outofstock</td>
      <td><input type="checkbox" data-name="outofstock_trace"/></td>
      <td><input type="checkbox" data-name="outofstock_add2order"/></td>
      <td><input type="checkbox" data-name="outofstock_faq"/></td>
      <td><input type="checkbox" data-name="outofstock_review"/></td>
      <td><input type="checkbox" data-name="outofstock_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/password.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> password</td>
      <td><input type="checkbox" data-name="password_trace"/></td>
      <td><input type="checkbox" data-name="password_add2order"/></td>
      <td><input type="checkbox" data-name="password_faq"/></td>
      <td><input type="checkbox" data-name="password_review"/></td>
      <td><input type="checkbox" data-name="password_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/password_query.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> password_query</td>
      <td><input type="checkbox" data-name="password_query_trace"/></td>
      <td><input type="checkbox" data-name="password_query_add2order"/></td>
      <td><input type="checkbox" data-name="password_query_faq"/></td>
      <td><input type="checkbox" data-name="password_query_review"/></td>
      <td><input type="checkbox" data-name="password_query_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/payment.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> payment</td>
      <td><input type="checkbox" data-name="payment_trace"/></td>
      <td><input type="checkbox" data-name="payment_add2order"/></td>
      <td><input type="checkbox" data-name="payment_faq"/></td>
      <td><input type="checkbox" data-name="payment_review"/></td>
      <td><input type="checkbox" data-name="payment_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/payment_error.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> payment_error</td>
      <td><input type="checkbox" data-name="payment_error_trace"/></td>
      <td><input type="checkbox" data-name="payment_error_add2order"/></td>
      <td><input type="checkbox" data-name="payment_error_faq"/></td>
      <td><input type="checkbox" data-name="payment_error_review"/></td>
      <td><input type="checkbox" data-name="payment_error_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/pickup2.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> pickup2</td>
      <td><input type="checkbox" data-name="pickup2_trace"/></td>
      <td><input type="checkbox" data-name="pickup2_add2order"/></td>
      <td><input type="checkbox" data-name="pickup2_faq"/></td>
      <td><input type="checkbox" data-name="pickup2_review"/></td>
      <td><input type="checkbox" data-name="pickup2_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/preparation.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> preparation</td>
      <td><input type="checkbox" data-name="preparation_trace"/></td>
      <td><input type="checkbox" data-name="preparation_add2order"/></td>
      <td><input type="checkbox" data-name="preparation_faq"/></td>
      <td><input type="checkbox" data-name="preparation_review"/></td>
      <td><input type="checkbox" data-name="preparation_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailalerts/productcoverage.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> productcoverage</td>
      <td><input type="checkbox" data-name="productcoverage_trace"/></td>
      <td><input type="checkbox" data-name="productcoverage_add2order"/></td>
      <td><input type="checkbox" data-name="productcoverage_faq"/></td>
      <td><input type="checkbox" data-name="productcoverage_review"/></td>
      <td><input type="checkbox" data-name="productcoverage_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailalerts/productoutofstock.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> productoutofstock</td>
      <td><input type="checkbox" data-name="productoutofstock_trace"/></td>
      <td><input type="checkbox" data-name="productoutofstock_add2order"/></td>
      <td><input type="checkbox" data-name="productoutofstock_faq"/></td>
      <td><input type="checkbox" data-name="productoutofstock_review"/></td>
      <td><input type="checkbox" data-name="productoutofstock_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/referralprogram/referralprogram-congratulations.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> referralprogram-congratulations</td>
      <td><input type="checkbox" data-name="referralprogram-congratulations_trace"/></td>
      <td><input type="checkbox" data-name="referralprogram-congratulations_add2order"/></td>
      <td><input type="checkbox" data-name="referralprogram-congratulations_faq"/></td>
      <td><input type="checkbox" data-name="referralprogram-congratulations_review"/></td>
      <td><input type="checkbox" data-name="referralprogram-congratulations_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/referralprogram/referralprogram-invitation.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> referralprogram-invitation</td>
      <td><input type="checkbox" data-name="referralprogram-invitation_trace"/></td>
      <td><input type="checkbox" data-name="referralprogram-invitation_add2order"/></td>
      <td><input type="checkbox" data-name="referralprogram-invitation_faq"/></td>
      <td><input type="checkbox" data-name="referralprogram-invitation_review"/></td>
      <td><input type="checkbox" data-name="referralprogram-invitation_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/referralprogram/referralprogram-voucher.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> referralprogram-voucher</td>
      <td><input type="checkbox" data-name="referralprogram-voucher_trace"/></td>
      <td><input type="checkbox" data-name="referralprogram-voucher_add2order"/></td>
      <td><input type="checkbox" data-name="referralprogram-voucher_faq"/></td>
      <td><input type="checkbox" data-name="referralprogram-voucher_review"/></td>
      <td><input type="checkbox" data-name="referralprogram-voucher_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/refund.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> refund</td>
      <td><input type="checkbox" data-name="refund_trace"/></td>
      <td><input type="checkbox" data-name="refund_add2order"/></td>
      <td><input type="checkbox" data-name="refund_faq"/></td>
      <td><input type="checkbox" data-name="refund_review"/></td>
      <td><input type="checkbox" data-name="refund_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/reply_msg.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> reply_msg</td>
      <td><input type="checkbox" data-name="reply_msg_trace"/></td>
      <td><input type="checkbox" data-name="reply_msg_add2order"/></td>
      <td><input type="checkbox" data-name="reply_msg_faq"/></td>
      <td><input type="checkbox" data-name="reply_msg_review"/></td>
      <td><input type="checkbox" data-name="reply_msg_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/ps_emailalerts/return_slip.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> return_slip</td>
      <td><input type="checkbox" data-name="return_slip_trace"/></td>
      <td><input type="checkbox" data-name="return_slip_add2order"/></td>
      <td><input type="checkbox" data-name="return_slip_faq"/></td>
      <td><input type="checkbox" data-name="return_slip_review"/></td>
      <td><input type="checkbox" data-name="return_slip_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/shipped.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> shipped</td>
      <td><input type="checkbox" data-name="shipped_trace"/></td>
      <td><input type="checkbox" data-name="shipped_add2order"/></td>
      <td><input type="checkbox" data-name="shipped_faq"/></td>
      <td><input type="checkbox" data-name="shipped_review"/></td>
      <td><input type="checkbox" data-name="shipped_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/test.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> test</td>
      <td><input type="checkbox" data-name="test_trace"/></td>
      <td><input type="checkbox" data-name="test_add2order"/></td>
      <td><input type="checkbox" data-name="test_faq"/></td>
      <td><input type="checkbox" data-name="test_review"/></td>
      <td><input type="checkbox" data-name="test_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/voucher.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> voucher</td>
      <td><input type="checkbox" data-name="voucher_trace"/></td>
      <td><input type="checkbox" data-name="voucher_add2order"/></td>
      <td><input type="checkbox" data-name="voucher_faq"/></td>
      <td><input type="checkbox" data-name="voucher_review"/></td>
      <td><input type="checkbox" data-name="voucher_contact"/></td>
    </tr>
    <tr>
      <td><a href="http://ijzershop176-upgrade.local/admin-dev/index.php/improve/design/mail_theme/preview/nl-NL/modernesmid/voucher_new.html?_token={{Tools::getAdminToken('AdminModules')}}" target="_blank"/> voucher_new</td>
      <td><input type="checkbox" data-name="voucher_new_trace"/></td>
      <td><input type="checkbox" data-name="voucher_new_add2order"/></td>
      <td><input type="checkbox" data-name="voucher_new_faq"/></td>
      <td><input type="checkbox" data-name="voucher_new_review"/></td>
      <td><input type="checkbox" data-name="voucher_new_contact"/></td>
    </tr>



  </tbody>
</table>
</div>

