{*
* 2007-2014 PrestaShop
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
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

{extends file="helpers/view/view.tpl"}

{block name="override_tpl"}
	<script type="text/javascript">
	var admin_order_tab_link = "{$link->getAdminLink('AdminOrders')|addslashes}";
	var id_order = {$order->id};
	var id_lang = {$current_id_lang};
	var id_currency = {$order->id_currency};
	var id_customer = {$order->id_customer|intval};
	{assign var=PS_TAX_ADDRESS_TYPE value=Configuration::get('PS_TAX_ADDRESS_TYPE')}
	var id_address = {$order->$PS_TAX_ADDRESS_TYPE};
	var currency_sign = "{$currency->sign}";
	var currency_format = "{$currency->format}";
	var currency_blank = "{$currency->blank}";
	var priceDisplayPrecision = 2;
	var use_taxes = {if $order->getTaxCalculationMethod() == $smarty.const.PS_TAX_INC}true{else}false{/if};
	var stock_management = {$stock_management|intval};
	var txt_add_product_stock_issue = "{l s='Are you sure you want to add this quantity?' js=1}";
	var txt_add_product_new_invoice = "{l s='Are you sure you want to create a new invoice?' js=1}";
	var txt_add_product_no_product = "{l s='Error: No product has been selected' js=1}";
	var txt_add_product_no_product_quantity = "{l s='Error: Quantity of products must be set' js=1}";
	var txt_add_product_no_product_price = "{l s='Error: Product price must be set' js=1}";
	var txt_confirm = "{l s='Are you sure?' js=1}";
	var statesShipped = new Array();
	var has_voucher = {if count($discounts)}1{else}0{/if};
	{foreach from=$states item=state}
		{if (!$currentState->shipped && $state['shipped'])}
			statesShipped.push({$state['id_order_state']});
		{/if}
	{/foreach}
	</script>

	{assign var="hook_invoice" value={hook h="displayInvoice" id_order=$order->id}}
	{if ($hook_invoice)}
	<div>{$hook_invoice}</div>
	{/if}

	<div class="panel">
		<div class="row">
			<div class="col-xs-6 col-lg-3 box-stats color3" >
				<div class="kpi-content">
					<i class="icon-calendar-empty"></i>
					<span class="title">{l s='Date'}</span>
					<span class="value">{dateFormat date=$order->date_add full=false}</span>
				</div>
			</div>
			<div class="col-xs-6 col-lg-3 box-stats color4" >
				<div class="kpi-content">
					<i class="icon-money"></i>
					<span class="title">{l s='Total'}</span>
					<span class="value">{displayPrice price=$order->total_paid_tax_incl currency=$currency->id}</span>
				</div>
			</div>
			<div class="col-xs-6 col-lg-3 box-stats color2" >
				<div class="kpi-content">
					<i class="icon-comments"></i>
					<span class="title">{l s='Messages'}</span>
					<span class="value"><a href="{$link->getAdminLink('AdminCustomerThreads')|escape:'html':'UTF-8'}">{sizeof($customer_thread_message)}</a></span>
				</div>
			</div>
			<div class="col-xs-6 col-lg-3 box-stats color1" >
				<div class="kpi-content">
					<i class="icon-book"></i>
					<span class="title">{l s='Products'}</span>
					<span class="value">{sizeof($products)}</span>
				</div>
			</div>
		</div>
	</div>
	{hook h="displayAdminOrder" id_order=$order->id}
	<div class="row">
		<div class="col-lg-7">
			<div class="panel">
				<div class="panel-heading">
					<i class="icon-credit-card"></i>
					{l s='Order'}
					<span class="badge">{$order->reference}</span>
					<span class="badge">{l s="#"}{$order->id}</span>
					<div class="btn-group">
						<a class="btn btn-default btn-xs" href="{$link->getAdminLink('AdminOrders')|escape:'html':'UTF-8'}&vieworder&id_order={$previousOrder}" {if !$previousOrder}disabled{/if}>
							<i class="icon-backward"></i>
						</a>
						<a class="btn btn-default btn-xs" href="{$link->getAdminLink('AdminOrders')|escape:'html':'UTF-8'}&vieworder&id_order={$nextOrder}" {if !$nextOrder}disabled{/if}>
							<i class="icon-forward"></i>
						</a>
					</div>
				</div>
				<!-- Orders Actions -->
				<div class="well">
					<div class="row">
						<a class="btn btn-default" href="javascript:window.print()">
							<i class="icon-print"></i>
							{l s='Print order'}
						</a>
						&nbsp;
						{if (count($invoices_collection))}
							<a class="btn btn-default" href="{$link->getAdminLink('AdminPdf')|escape:'html':'UTF-8'}&submitAction=generateInvoicePDF&id_order={$order->id}" target="_blank">
								<i class="icon-file"></i>
								{l s='View invoice'}
							</a>
						{else}
							<span class="span label label-inactive">
								<i class="icon-remove"></i>
								{l s='No invoice'}
							</span>
						{/if}
						&nbsp;
						{if (($currentState && $currentState->delivery) || $order->delivery_number)}
							<a class="btn btn-default"  href="{$link->getAdminLink('AdminPdf')|escape:'html':'UTF-8'}&submitAction=generateDeliverySlipPDF&id_order={$order->id}" target="_blank">
								<i class="icon-truck"></i>
								{l s='View delivery slip'}
							</a>
						{else}
							<span class="span label label-inactive">
								<i class="icon-remove"></i>
								{l s='No delivery slip'}
							</span>
						{/if}
						&nbsp;
						{if Configuration::get('PS_ORDER_RETURN')}
							<a id="desc-order-standard_refund" class="btn btn-default" href="#refundForm">
								<i class="icon-exchange"></i>
								{if $order->hasBeenShipped()}
									{l s='Return products'}
								{elseif $order->hasBeenPaid()}
									{l s='Standard refund'}
								{else}
									{l s='Cancel products'}
								{/if}
							</a>
							&nbsp;
						{/if}
						{if $order->hasInvoice()}
							<a id="desc-order-partial_refund" class="btn btn-default" href="#refundForm">
								<i class="icon-exchange"></i>
								{l s='Partial refund'}
							</a>
						{/if}
					</div>
				</div>
				<!-- Tab nav -->
				<ul class="nav nav-tabs" id="tabOrder">
					<li class="active">
						<a href="#status">
							<i class="icon-time"></i>
							{l s='Status'} <span class="badge">{$history|@count}</span>
						</a>
					</li>
					<li>
						<a href="#documents">
							<i class="icon-file-text"></i>
							{l s='Documents'} <span class="badge">{$order->getDocuments()|@count}</span>
						</a>
					</li>
				</ul>
				<!-- Tab content -->
				<div class="tab-content panel">
					<!-- Tab status -->
					<div class="tab-pane active" id="status">
						<!-- History of status -->
						<table class="table history-status row-margin-bottom">
							<tbody>
								{foreach from=$history item=row key=key}
									{if ($key == 0)}
										<tr>
											<td style="background-color:{$row['color']};color:white"><img src="../img/os/{$row['id_order_state']|intval}.gif" /></td>
											<td style="background-color:{$row['color']};color:white"><span class="title_box ">{$row['ostate_name']|stripslashes}</span></td>
											<td style="background-color:{$row['color']};color:white"><span class="title_box ">{if $row['employee_lastname']}{$row['employee_firstname']|stripslashes} {$row['employee_lastname']|stripslashes}{/if}</span></td>
											<td style="background-color:{$row['color']};color:white"><span class="title_box ">{dateFormat date=$row['date_add'] full=true}</span></td>
										</tr>
									{else}
										<tr>
											<td><img src="../img/os/{$row['id_order_state']|intval}.gif" /></td>
											<td>{$row['ostate_name']|stripslashes}</td>
											<td>{if $row['employee_lastname']}{$row['employee_firstname']|stripslashes} {$row['employee_lastname']|stripslashes}{else}&nbsp;{/if}</td>
											<td>{dateFormat date=$row['date_add'] full=true}</td>
										</tr>
									{/if}
								{/foreach}
							</tbody>
						</table>
						<!-- Change status form -->
						<form action="{$currentIndex}&amp;vieworder&amp;token={$smarty.get.token}" method="post" class="form-horizontal well">
							<div class="row">
								<div class="col-lg-9">
									<select id="id_order_state" class="chosen form-control" name="id_order_state">
									{foreach from=$states item=state}
										<option value="{$state['id_order_state']|intval}"{if $state['id_order_state'] == $currentState->id} selected="selected" disabled="disabled"{/if}>{$state['name']|escape}</option>
									{/foreach}
									</select>
									<input type="hidden" name="id_order" value="{$order->id}" />
								</div>
								<div class="col-lg-3">
									<button type="submit" name="submitState" class="btn btn-primary">
										{l s='Update status'}
									</button>
								</div>
							</div>
						</form>
					</div>
					<!-- Tab documents -->
					<div class="tab-pane" id="documents">
						{* Include document template *}
						{include file='controllers/orders/_documents.tpl'}
					</div>
				</div>
				<script>
					$('#tabOrder a').click(function (e) {
						e.preventDefault()
						$(this).tab('show')
					})
				</script>
				<hr>
				<!-- Tab nav -->
				<ul class="nav nav-tabs" id="myTab">
					<li class="active">
						<a href="#shipping">
							<i class="icon-truck "></i>
							{l s='Shipping'} <span class="badge">{$order->getShipping()|@count}</span>
						</a>
					</li>
					<li>
						<a href="#returns">
							<i class="icon-undo"></i>
							{l s='Merchandise Returns'} <span class="badge">{$order->getReturn()|@count}</span>
						</a>
					</li>
				</ul>
				<!-- Tab content -->
				<div class="tab-content panel">
					<!-- Tab shipping -->
					<div class="tab-pane active" id="shipping">
						<!-- Shipping block -->
						{if !$order->isVirtual()}
						<div class="form-horizontal">
							{if $order->gift_message}
							<div class="form-group">
								<label class="control-label col-lg-3">{l s='Message'}</label>
								<div class="col-lg-9">
									<p class="form-control-static">{$order->gift_message|nl2br}</p>
								</div>
							</div>
							{/if}
							{include file='controllers/orders/_shipping.tpl'}
							{if $carrierModuleCall}
								{$carrierModuleCall}
							{/if}
							<hr>
							{if $order->recyclable}
								<span class="label label-success"><i class="icon-check"></i> {l s='Recycled packaging'}</span>
							{else}
								<span class="label label-inactive"><i class="icon-remove"></i> {l s='Recycled packaging'}</span>
							{/if}

							{if $order->gift}
								<span class="label label-success"><i class="icon-check"></i> {l s='Gift wrapping'}</span>
							{else}
								<span class="label label-inactive"><i class="icon-remove"></i> {l s='Gift wrapping'}</span>
							{/if}
						</div>
						{/if}
					</div>
					<!-- Tab returns -->
					<div class="tab-pane" id="returns">
						{if !$order->isVirtual()}
						<!-- Return block -->
							{if $order->getReturn()|count > 0}
							<table class="table">
								<thead>
									<tr>
										<th><span class="title_box ">Date</span></th>
										<th><span class="title_box ">Type</span></th>
										<th><span class="title_box ">Carrier</span></th>
										<th><span class="title_box ">Tracking number</span></th>
									</tr>
								</thead>
								<tbody>
									{foreach from=$order->getReturn() item=line}
									<tr>
										<td>{$line.date_add}</td>
										<td>{$line.type}</td>
										<td>{$line.state_name}</td>
										<td class="actions">
											<span id="shipping_number_show">{if isset($line.url) && isset($line.tracking_number)}<a href="{$line.url|replace:'@':$line.tracking_number}">{$line.tracking_number}</a>{elseif isset($line.tracking_number)}{$line.tracking_number}{/if}</span>
											{if $line.can_edit}
											<form method="post" action="{$link->getAdminLink('AdminOrders')|escape:'html':'UTF-8'}&vieworder&id_order={$order->id}&id_order_invoice={if $line.id_order_invoice}{$line.id_order_invoice|escape:'html':'UTF-8'}{else}0{/if}&id_carrier={if $line.id_carrier}{$line.id_carrier|escape:'html':'UTF-8'}{else}0{/if}">
												<span class="shipping_number_edit" style="display:none;">
													<button type="button" name="tracking_number">
														{$line.tracking_number|htmlentities}
													</button>
													<button type="submit" class="btn btn-default" name="submitShippingNumber">
														{l s='Update'}
													</button>
												</span>
												<button href="#" class="edit_shipping_number_link">
													<i class="icon-pencil"></i>
													{l s='Edit'}
												</button>
												<button href="#" class="cancel_shipping_number_link" style="display: none;">
													<i class="icon-remove"></i>
													{l s='Cancel'}
												</button>
											</form>
											{/if}
										</td>
									</tr>
									{/foreach}
								</tbody>
							</table>
							{else}
							<div class="list-empty">
								<div class="list-empty-msg">
									<i class="icon-warning-sign list-empty-icon"></i>
									{l s='No merchandise returned yet'}
								</div>
							</div>
							{/if}
							{if $carrierModuleCall}
								{$carrierModuleCall}
							{/if}
						{/if}
					</div>
				</div>
				<script>
					$('#myTab a').click(function (e) {
						e.preventDefault()
						$(this).tab('show')
					})
				</script>
			</div>
			<div class="col-lg-12">
				<!-- Payments block -->
				<div class="panel">
					<h3>
						<i class="icon-money"></i>
						{l s="Payment"} <span class="badge">{$order->getOrderPayments()|@count}</span>
					</h3>
					{if count($order->getOrderPayments()) > 0}
						<p class="alert alert-danger" style="{if round($orders_total_paid_tax_incl, 2) == round($total_paid, 2) || $currentState->id == 6}display: none;{/if}">
							{l s='Warning'}
							<strong>{displayPrice price=$total_paid currency=$currency->id}</strong>
							{l s='paid instead of'}
							<strong class="total_paid">{displayPrice price=$orders_total_paid_tax_incl currency=$currency->id}</strong>
							{foreach $order->getBrother() as $brother_order}
								{if $brother_order@first}
									{if count($order->getBrother()) == 1}
										<br />{l s='This warning also concerns order '}
									{else}
										<br />{l s='This warning also concerns the next orders:'}
									{/if}
								{/if}
								<a href="{$current_index}&amp;vieworder&amp;id_order={$brother_order->id}&amp;token={$smarty.get.token|escape:'html':'UTF-8'}">
									#{'%06d'|sprintf:$brother_order->id}
								</a>
							{/foreach}
						</p>
					{/if}
					<form id="formAddPayment" method="post" action="{$current_index}&amp;vieworder&amp;id_order={$order->id}&amp;token={$smarty.get.token|escape:'html':'UTF-8'}">
						<table class="table">
							<thead>
								<tr>
									<th><span class="title_box ">{l s='Date'}</span></th>
									<th><span class="title_box ">{l s='Payment method'}</span></th>
									<th><span class="title_box ">{l s='Transaction ID'}</span></th>
									<th><span class="title_box ">{l s='Amount'}</span></th>
									<th><span class="title_box ">{l s='Invoice'}</span></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{foreach from=$order->getOrderPaymentCollection() item=payment}
								<tr>
									<td>{dateFormat date=$payment->date_add full=true}</td>
									<td>{$payment->payment_method|escape:'html':'UTF-8'}</td>
									<td class="text-center">{$payment->transaction_id|escape:'html':'UTF-8'}</td>
									<td class="text-right">{displayPrice price=$payment->amount currency=$payment->id_currency}</td>
									<td>
									{if $invoice = $payment->getOrderInvoice($order->id)}
										{$invoice->getInvoiceNumberFormatted($current_id_lang, $order->id_shop)}
									{else}
									{/if}
									</td>
									<td class="actions">
										<button class="btn btn-default open_payment_information">
											<i class="icon-search"></i>
											{l s='Details'}
										</button>
									</td>
								</tr>
								<tr class="payment_information" style="display: none;">
									<td colspan="5">
										<p>
											<b>{l s='Card Number'}</b>&nbsp;
											{if $payment->card_number}
												{$payment->card_number}
											{else}
												<i>{l s='Not defined'}</i>
											{/if}
										</p>
										<p>
											<b>{l s='Card Brand'}</b>&nbsp;
											{if $payment->card_brand}
												{$payment->card_brand}
											{else}
												<i>{l s='Not defined'}</i>
											{/if}
										</p>
										<p>
											<b>{l s='Card Expiration'}</b>&nbsp;
											{if $payment->card_expiration}
												{$payment->card_expiration}
											{else}
												<i>{l s='Not defined'}</i>
											{/if}
										</p>
										<p>
											<b>{l s='Card Holder'}</b>&nbsp;
											{if $payment->card_holder}
												{$payment->card_holder}
											{else}
												<i>{l s='Not defined'}</i>
											{/if}
										</p>
									</td>
								</tr>
								{foreachelse}
								<tr>
									<td class="list-empty" colspan="6">
										<div class="list-empty-msg">
											<i class="icon-warning-sign list-empty-icon"></i>
											{l s='No payments are available'}
										</div>
									</td>
								</tr>
								{/foreach}
								
							</tbody>
							<tfoot>
								<tr class="current-edit">
									<td>
										<div class="input-group fixed-width-md">
											<input type="text" name="payment_date" class="datepicker" value="{date('Y-m-d')}" />
											<div class="input-group-addon">
												<i class="icon-calendar-o"></i>
											</div>
										</div>
									</td>
									<td>
										<select name="payment_method" class="payment_method">
										{foreach from=$payment_methods item=payment_method}
											<option value="{$payment_method}">{$payment_method}</option>
										{/foreach}
										</select>
									</td>
									<td>
										<input type="text" name="payment_transaction_id" value="" class="form-control fixed-width-sm"/>
									</td>
									<td>
										<div class="form-group fixed-width-md">
											<input type="text" name="payment_amount" value="" class="form-control pull-left" />
											<select name="payment_currency" class="payment_currency pull-left">
												{foreach from=$currencies item=current_currency}
													<option value="{$current_currency['id_currency']}"{if $current_currency['id_currency'] == $currency->id} selected="selected"{/if}>{$current_currency['sign']}</option>
												{/foreach}
											</select>
										</div>
									</td>
									<td>
										{if count($invoices_collection) > 0}
											<select name="payment_invoice" id="payment_invoice">
											{foreach from=$invoices_collection item=invoice}
												<option value="{$invoice->id}" selected="selected">{$invoice->getInvoiceNumberFormatted($current_id_lang, $order->id_shop)}</option>
											{/foreach}
											</select>
										{/if}
									</td>
									<td class="actions">
										<button class="btn btn-primary btn-block" type="submit" name="submitAddPayment">
											{l s='Add payment'}
										</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</form>
					{if (!$order->valid && sizeof($currencies) > 1)}
						<form class="form-horizontal well" method="post" action="{$currentIndex}&amp;vieworder&amp;id_order={$order->id}&amp;token={$smarty.get.token|escape:'html':'UTF-8'}">
							<div class="row">
								<label class="control-label col-lg-3">{l s='Change currency'}</label>
								<div class="col-lg-6">
									<select name="new_currency">
									{foreach from=$currencies item=currency_change}
										{if $currency_change['id_currency'] != $order->id_currency}
										<option value="{$currency_change['id_currency']}">{$currency_change['name']} - {$currency_change['sign']}</option>
										{/if}
									{/foreach}
									</select>
									<p class="help-block">{l s='Do not forget to update your exchange rate before making this change.'}</p>
								</div>
								<div class="col-lg-3">
									<button type="submit" class="btn btn-default" name="submitChangeCurrency"><i class="icon-refresh"></i> {l s='Change'}</button>
								</div>
							</div>
						</form>
					{/if}
				</div>
			</div>
		</div>
		<div class="col-lg-5">
			<!-- Customer informations -->
			<div class="panel">
				{if $customer->id}
					<h3>
						<i class="icon-user"></i>
						{l s='Customer'}
						<span class="badge">
							<a href="?tab=AdminCustomers&amp;id_customer={$customer->id}&amp;viewcustomer&amp;token={getAdminToken tab='AdminCustomers'}">
								{if Configuration::get('PS_B2B_ENABLE')}{$customer->company} - {/if}
								{$gender->name|escape:'html':'UTF-8'}
								{$customer->firstname}
								{$customer->lastname}
							</a>
						</span>
						<span class="badge">
							{l s='#'}{$customer->id}
						</span>
						<span class="badge">
							<a href="mailto:{$customer->email}">{$customer->email}</a>
						</span>
					</h3>
					<div class="row">
						<div class="col-sm-6">
							{if ($customer->isGuest())}
								{l s='This order has been placed by a guest.'}
								{if (!Customer::customerExists($customer->email))}
									<form method="post" action="index.php?tab=AdminCustomers&amp;id_customer={$customer->id}&amp;token={getAdminToken tab='AdminCustomers'}">
										<input type="hidden" name="id_lang" value="{$order->id_lang}" />
										<input class="btn btn-default" type="submit" name="submitGuestToCustomer" value="{l s='Transform a guest into a customer'}" />
										<p class="help-block">{l s='This feature will generate a random password and send an email to the customer.'}</p>
									</form>
								{else}
									<div class="alert alert-warning">
										{l s='A registered customer account has already claimed this email address'}
									</div>
								{/if}
							{else}
								<dl class="well list-detail">
									<dt>{l s='Account registered'}</dt>
										<dd class="text-muted"><i class="icon-calendar-o"></i> {dateFormat date=$customer->date_add full=true}</dd>
									<dt>{l s='Valid orders placed'}</dt>
										<dd><span class="badge">{$customerStats['nb_orders']}</span></dd>
									<dt>{l s='Total spent since registration'}</dt>
										<dd><span class="badge badge-success">{displayPrice price=Tools::ps_round(Tools::convertPrice($customerStats['total_orders'], $currency), 2) currency=$currency->id}</span></dd>
									{if Configuration::get('PS_B2B_ENABLE')}
										<dt>{l s='Siret'}</dt>
											<dd>{$customer->siret}</dd>
										<dt>{l s='APE'}</dt>
											<dd>{$customer->ape}</dd>
									{/if}
								</dl>
							{/if}
						</div>

						<div class="col-sm-6">
							<div class="form-group">
								<a href="?tab=AdminCustomers&amp;id_customer={$customer->id}&amp;viewcustomer&amp;token={getAdminToken tab='AdminCustomers'}" class="btn btn-default btn-block">{l s='View full details...'}</a>
							</div>
							<div class="panel panel-sm">
								<div class="panel-heading">
									<i class="icon-eye-slash"></i>
									{l s='Private note'}
								</div>
								<form id="customer_note" class="form-horizontal" action="ajax.php" method="post" onsubmit="saveCustomerNote({$customer->id});return false;" >
									<div class="form-group">
										<div class="col-lg-12">
											<textarea name="note" id="noteContent" class="textarea-autosize" onkeyup="$(this).val().length > 0 ? $('#submitCustomerNote').removeAttr('disabled') : $('#submitCustomerNote').attr('disabled', 'disabled')">{$customer->note}</textarea>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-12">
											<button type="submit" id="submitCustomerNote" class="btn btn-default pull-right" disabled="disabled" />
												<i class="icon-save"></i>
												{l s='Save'}
											</button>
										</div>
									</div>
									<span id="note_feedback"></span>
								</form>
							</div>
						</div>
					</div>
				{/if}
				
				<!-- Tab nav -->
				<ul class="nav nav-tabs" id="tabAddresses">
					<li class="active">
						<a href="#addressShipping">
							<i class="icon-truck"></i>
							{l s='Shipping address'}
						</a>
					</li>
					<li>
						<a href="#addressInvoice">
							<i class="icon-file-text"></i>
							{l s='Invoice address'}
						</a>
					</li>
				</ul>
				<!-- Tab content -->
				<div class="tab-content panel">
					<!-- Tab status -->
					<div class="tab-pane active" id="addressShipping">
						<!-- Addresses -->
						{if !$order->isVirtual()}
						<!-- Shipping address -->
							{if $can_edit}
								<form class="form-horizontal" method="post" action="{$link->getAdminLink('AdminOrders')|escape:'html':'UTF-8'}&vieworder&id_order={$order->id}">
									<div class="form-group">
										<div class="col-lg-9">
											<select name="id_address">
												{foreach from=$customer_addresses item=address}
												<option value="{$address['id_address']}"
													{if $address['id_address'] == $order->id_address_delivery}
														selected="selected"
													{/if}>
													{$address['alias']} -
													{$address['address1']}
													{$address['postcode']}
													{$address['city']}
													{if !empty($address['state'])}
														{$address['state']}
													{/if},
													{$address['country']}
												</option>
												{/foreach}
											</select>
										</div>
										<div class="col-lg-3">
											<button class="btn btn-default" type="submit" name="submitAddressShipping"><i class="icon-refresh"></i> {l s='Change'}</button>
										</div>
									</div>
								</form>
							{/if}
							<div class="well">
								<div class="row">
									<div class="col-sm-6">
										<a class="btn btn-default pull-right" href="?tab=AdminAddresses&amp;id_address={$addresses.delivery->id}&amp;addaddress&realedit=1&amp;id_order={$order->id}{if ($addresses.delivery->id == $addresses.invoice->id)}&amp;address_type=1{/if}&amp;token={getAdminToken tab='AdminAddresses'}&back={$smarty.server.REQUEST_URI|urlencode}">
											<i class="icon-pencil"></i>
											{l s='Edit'}
										</a>
										{displayAddressDetail address=$addresses.delivery newLine='<br />'}
										{if $addresses.delivery->other}
											<hr />{$addresses.delivery->other}<br />
										{/if}
									</div>
									<div class="col-sm-6">
										<img src="http://maps.googleapis.com/maps/api/staticmap?center={$addresses.delivery->address1|urlencode},{$addresses.delivery->postcode|urlencode},{$addresses.delivery->city|urlencode}{if ($addresses.delivery->id_state)},{$addresses.deliveryState->name|urlencode}{/if},{$addresses.delivery->country|urlencode}&amp;markers={$addresses.delivery->address1|urlencode},{$addresses.delivery->postcode|urlencode},{$addresses.delivery->city|urlencode}{if ($addresses.delivery->id_state)},{$addresses.deliveryState->name|urlencode}{/if},{$addresses.delivery->country|urlencode}&amp;zoom=5&amp;size=400x210&amp;scale=2&amp;sensor=false" class="img-thumbnail">
									</div>
								</div>
							</div>
						{/if}
					</div>
					<div class="tab-pane" id="addressInvoice">
						<!-- Invoice address -->
						{if $can_edit}
							<form class="form-horizontal" method="post" action="{$link->getAdminLink('AdminOrders')|escape:'html':'UTF-8'}&vieworder&id_order={$order->id}">
								<div class="form-group">
									<div class="col-lg-9">
										<select name="id_address">
											{foreach from=$customer_addresses item=address}
											<option value="{$address['id_address']}"
												{if $address['id_address'] == $order->id_address_invoice}
												selected="selected"
												{/if}>
												{$address['alias']} -
												{$address['address1']}
												{$address['postcode']}
												{$address['city']}
												{if !empty($address['state'])}
													{$address['state']}
												{/if},
												{$address['country']}
											</option>
											{/foreach}
										</select>
									</div>
									<div class="col-lg-3">
										<button class="btn btn-default" type="submit" name="submitAddressInvoice"><i class="icon-refresh"></i> {l s='Change'}</button>
									</div>
								</div>
							</form>
						{/if}
						<div class="well">
							<div class="row">
								<div class="col-sm-6">
									<a class="btn btn-default pull-right" href="?tab=AdminAddresses&amp;id_address={$addresses.invoice->id}&amp;addaddress&amp;realedit=1&amp;id_order={$order->id}{if ($addresses.delivery->id == $addresses.invoice->id)}&amp;address_type=2{/if}&amp;back={$smarty.server.REQUEST_URI|urlencode}&amp;token={getAdminToken tab='AdminAddresses'}">
										<i class="icon-pencil"></i>
										{l s='Edit'}
									</a>
									{displayAddressDetail address=$addresses.invoice newLine='<br />'}
									{if $addresses.invoice->other}
										<hr />{$addresses.invoice->other}<br />
									{/if}
								</div>
								<div class="col-sm-6">
									<img src="http://maps.googleapis.com/maps/api/staticmap?center={$addresses.invoice->address1|urlencode},{$addresses.invoice->postcode|urlencode},{$addresses.invoice->city|urlencode}{if ($addresses.invoice->id_state) && isset($addresses.deliveryState)},{$addresses.deliveryState->name|urlencode}{/if},{$addresses.invoice->country|urlencode}&amp;markers={$addresses.invoice->address1|urlencode},{$addresses.invoice->postcode|urlencode},{$addresses.invoice->city|urlencode},{$addresses.invoice->country|urlencode}&amp;zoom=5&amp;size=400x210&amp;scale=2&amp;sensor=false" class="img-thumbnail">
								</div>
							</div>
						</div>
					</div>
				</div>
				<script>
					$('#tabAddresses a').click(function (e) {
						e.preventDefault()
						$(this).tab('show')
					})
				</script>
			</div>
			<div class="panel">
				<div class="panel-heading">
					<i class="icon-envelope"></i> {l s='Messages'} <span class="badge">{$messages|@count}</span>
				</div>
				{if (sizeof($messages))}
					<div class="panel panel-highlighted">
						<div class="message-item">
							{foreach from=$messages item=message}
								<div class="message-avatar">
									<div class="avatar-md">
										<i class="icon-user icon-2x"></i>
									</div>
								</div>
								<div class="message-body">
									
									<span class="message-date">&nbsp;<i class="icon-calendar"></i>
										{l s='At'}
										{dateFormat date=$message['date_add']}
										{l s='from'}
									</span>
									<h4 class="message-item-heading">
										{if ($message['elastname']|escape:'html':'UTF-8')}{$message['efirstname']|escape:'html':'UTF-8'}
											{$message['elastname']|escape:'html':'UTF-8'}{else}{$message['cfirstname']|escape:'html':'UTF-8'} {$message['clastname']|escape:'html':'UTF-8'}
										{/if}
										{if ($message['private'] == 1)}
											<span class="badge badge-info">{l s='Private'}</span>
										{/if}
									</h4>
									<p class="message-item-text">
										{$message['message']|escape:'html':'UTF-8'|nl2br}
									</p>
								</div>
								{*if ($message['is_new_for_me'])}
									<a class="new_message" title="{l s='Mark this message as \'viewed\''}" href="{$smarty.server.REQUEST_URI}&amp;token={$smarty.get.token}&amp;messageReaded={$message['id_message']}">
										<i class="icon-ok"></i>
									</a>
								{/if*}
							{/foreach}
						</div>
					</div>
				{/if}
				<div id="messages" class="well">
					<form action="{$smarty.server.REQUEST_URI}&amp;token={$smarty.get.token}" method="post" onsubmit="if (getE('visibility').checked == true) return confirm('{l s='Do you want to send this message to the customer?'}');">
						<div id="message" class="form-horizontal">
							<div class="form-group">
								<label class="control-label col-lg-3">{l s='Choose a standard message'}</label>
								<div class="col-lg-9">
									<select class="chosen form-control" name="order_message" id="order_message" onchange="orderOverwriteMessage(this, '{l s='Do you want to overwrite your existing message?'}')">
										<option value="0" selected="selected">-</option>
										{foreach from=$orderMessages item=orderMessage}
										<option value="{$orderMessage['message']|escape:'html':'UTF-8'}">{$orderMessage['name']}</option>
										{/foreach}
									</select>
									<p class="help-block">
										<a href="{$link->getAdminLink('AdminOrderMessage')|escape:'html':'UTF-8'}">
											{l s='Configure predefined messages'}
											<i class="icon-external-link"></i>
										</a>
									</p>
								</div>
							</div>

							<div class="form-group">
								<label class="control-label col-lg-3">{l s='Display to customer?'}</label>
								<div class="col-lg-9">
									<span class="switch prestashop-switch fixed-width-lg">
										<input type="radio" name="visibility" id="visibility_on" value="0" />
										<label for="visibility_on">
											{l s='Yes'}
										</label>
										<input type="radio" name="visibility" id="visibility_off" value="1" checked="checked" /> 
										<label for="visibility_off">
											{l s='No'}
										</label>
										<a class="slide-button btn"></a>
									</span>
								</div>
							</div>

							<div class="form-group">
								<label class="control-label col-lg-3">{l s='Message'}</label>
								<div class="col-lg-9">
									<textarea id="txt_msg" class="textarea-autosize" name="message">{Tools::getValue('message')|escape:'html':'UTF-8'}</textarea>
									<p id="nbchars"></p>
								</div>
							</div>


							<input type="hidden" name="id_order" value="{$order->id}" />
							<input type="hidden" name="id_customer" value="{$order->id_customer}" />
							<button type="submit" id="submitMessage" class="btn btn-primary pull-right" name="submitMessage">
								{l s='Send message'}
							</button>
							<a class="btn btn-default" href="{$link->getAdminLink('AdminCustomerThreads')|escape:'html':'UTF-8'}">
								{l s='Show all messages'}
								<i class="icon-external-link"></i>
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-lg-12">
			<form class="container-command-top-spacing" action="{$current_index}&amp;vieworder&amp;token={$smarty.get.token}&id_order={$order->id}" method="post" onsubmit="return orderDeleteProduct('{l s='This product cannot be returned.'}', '{l s='Quantity to cancel is greater than quantity available.'}');">
				<input type="hidden" name="id_order" value="{$order->id}" />
				<div style="display: none">
					<input type="hidden" value="{$order->getWarehouseList()|implode}" id="warehouse_list" />
				</div>

				<div class="panel">
					<h3>
						<i class="icon-shopping-cart"></i>
						{l s='Products'} <span class="badge">{$products|@count}</span>
					</h3>
					<div id="refundForm">
					<!--
						<a href="#" class="standard_refund"><img src="../img/admin/add.gif" alt="{l s='Process a standard refund'}" /> {l s='Process a standard refund'}</a>
						<a href="#" class="partial_refund"><img src="../img/admin/add.gif" alt="{l s='Process a partial refund'}" /> {l s='Process a partial refund'}</a>
					-->
					</div>

					{capture "TaxMethod"}
						{if ($order->getTaxCalculationMethod() == $smarty.const.PS_TAX_EXC)}
							{l s='tax excluded.'}
						{else}
							{l s='tax included.'}
						{/if}
					{/capture}

					<table class="table" id="orderProducts">
						<thead>
							<tr>
								<th></th>
								<th><span class="title_box ">{l s='Product'}</span></th>
								<th>
									<span class="title_box ">{l s='Unit Price'}</span>
									<small class="text-muted">{$smarty.capture.TaxMethod}</small>
								</th>
								<th><span class="title_box ">{l s='Qty'}</span></th>
								{if $display_warehouse}<th><span class="title_box ">{l s='Warehouse'}</span></th>{/if}
								{if ($order->hasBeenPaid())}<th><span class="title_box ">{l s='Refunded'}</span></th>{/if}
								{if ($order->hasBeenDelivered() || $order->hasProductReturned())}
									<th><span class="title_box ">{l s='Returned'}</span></th>
								{/if}
								{if $stock_management}<th><span class="title_box ">{l s='Available quantity'}</span></th>{/if}
								<th>
									<span class="title_box ">{l s='Total'}</span>
									<small class="text-muted">{$smarty.capture.TaxMethod}</small>
								</th>
								<th colspan="2" style="display: none;" class="add_product_fields"></th>
								<th colspan="2" style="display: none;" class="edit_product_fields"></th>
								<th colspan="2" style="display: none;" class="standard_refund_fields">
									<i class="icon-minus-sign"></i>
									{if ($order->hasBeenDelivered() || $order->hasBeenShipped())}
										{l s='Return'}
									{elseif ($order->hasBeenPaid())}
										{l s='Refund'}
									{else}
										{l s='Cancel'}
									{/if}
								</th>
								<th style="display:none" class="partial_refund_fields">
									<span class="title_box ">{l s='Partial refund'}</span>
								</th>
								{if !$order->hasBeenDelivered()}
								<th></th>
								{/if}
							</tr>
						</thead>
						<tbody>
						{foreach from=$products item=product key=k}
							{* Include customized datas partial *}
							{include file='controllers/orders/_customized_data.tpl'}
							{* Include product line partial *}
							{include file='controllers/orders/_product_line.tpl'}
						{/foreach}
						{if $can_edit}
							{include file='controllers/orders/_new_product.tpl'}
						{/if}
						</tbody>
					</table>

					{if $can_edit}
					<div class="row-margin-bottom row-margin-top order_action">
					{if !$order->hasBeenDelivered()}
						<button type="button" id="add_product" class="btn btn-default">
							<i class="icon-plus-sign"></i>
							{l s='Add a product'}
						</button>
					{/if}
						<button id="add_voucher" class="btn btn-default" type="button" >
							<i class="icon-ticket"></i>
							{l s='Add a new discount'}
						</button>
					</div>
					{/if}
					<br />
					<div class="row">
						<div class="col-lg-6">
							<div class="alert alert-warning">
								{l s='For this customer group, prices are displayed as:'}
								<strong>{$smarty.capture.TaxMethod}</strong>
								{if !Configuration::get('PS_ORDER_RETURN')}
									<br/><strong>{l s='Merchandise returns are disabled'}</strong>
								{/if}
							</div>
						</div>
						<div class="col-lg-6">
							<div class="panel panel-vouchers" style="{if !sizeof($discounts)}display:none;{/if}">
								{if (sizeof($discounts) || $can_edit)}
								<table class="table">
									<thead>
										<tr>
											<th>
												<span class="title_box ">
													{l s='Discount name'}
												</span>
											</th>
											<th>
												<span class="title_box ">
													{l s='Value'}
												</span>
											</th>
											{if $can_edit}
											<th></th>
											{/if}
										</tr>
									</thead>
									<tbody>
										{foreach from=$discounts item=discount}
										<tr>
											<td>{$discount['name']}</td>
											<td>
											{if $discount['value'] != 0.00}
												-
											{/if}
											{displayPrice price=$discount['value'] currency=$currency->id}
											</td>
											{if $can_edit}
											<td>
												<a href="{$current_index}&amp;submitDeleteVoucher&amp;id_order_cart_rule={$discount['id_order_cart_rule']}&amp;id_order={$order->id}&amp;token={$smarty.get.token|escape:'html':'UTF-8'}">
													<i class="icon-minus-sign"></i>
													{l s='Delete voucher'}
												</a>
											</td>
											{/if}
										</tr>
										{/foreach}
									</tbody>
								</table>
								<div class="current-edit" id="voucher_form" style="display:none;">
									{include file='controllers/orders/_discount_form.tpl'}
								</div>
								{/if}
							</div>
							<div class="panel">
								<table class="table">

									{* Assign order price *}
									{if ($order->getTaxCalculationMethod() == $smarty.const.PS_TAX_EXC)}
										{assign var=order_product_price value=($order->total_products)}
									{else}
										{assign var=order_product_price value=$order->total_products_wt}
									{/if}

									<tr id="total_products">
										<td class="text-right">{l s='Products:'}</td>
										<td class="amount text-right">
											{displayPrice price=$order_product_price currency=$currency->id}
										</td>
										<td class="partial_refund_fields current-edit" style="display:none;"></td>
									</tr>
									<tr id="total_discounts" {if $order->total_discounts_tax_incl == 0}style="display: none;"{/if}>
										<td class="text-right">{l s='Discounts'}</td>
										<td class="amount text-right">
											-{displayPrice price=$order->total_discounts_tax_incl currency=$currency->id}
										</td>
										<td class="partial_refund_fields current-edit" style="display:none;"></td>
									</tr>
									<tr id="total_wrapping" {if $order->total_wrapping_tax_incl == 0}style="display: none;"{/if}>
										<td class="text-right">{l s='Wrapping'}</td>
										<td class="amount text-right">
											{displayPrice price=$order->total_wrapping_tax_incl currency=$currency->id}
										</td>
										<td class="partial_refund_fields current-edit" style="display:none;"></td>
									</tr>
									<tr id="total_shipping">
										<td class="text-right">{l s='Shipping'}</td>
										<td class="amount text-right" >
											{displayPrice price=$order->total_shipping_tax_incl currency=$currency->id}
										</td>
										<td class="partial_refund_fields current-edit" style="display:none;">
											<div class="input-group">
												<div class="input-group-addon">
													{$currency->prefix}
													{$currency->suffix}
												</div>
												<input type="text" name="partialRefundShippingCost" value="0" />
											</div>
										</td>
									</tr>
									{* Assign order price *}
									{if ($order->getTaxCalculationMethod() == $smarty.const.PS_TAX_EXC)}
										{assign var=order_total_price value=($order->total_paid_tax_excl)}
									{else}
										{assign var=order_total_price value=$order->total_paid_tax_incl}
									{/if}

									<tr id="total_order">
										<td class="text-right"><strong>{l s='Total'}</strong></td>
										<td class="amount text-right">
											<strong>{displayPrice price=$order_total_price currency=$currency->id}</strong>
										</td>
										<td class="partial_refund_fields current-edit" style="display:none;"></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div style="display: none;" class="standard_refund_fields form-horizontal panel">
						<div class="form-group">
							{if ($order->hasBeenDelivered() && Configuration::get('PS_ORDER_RETURN'))}
							<p class="checkbox">
								<label for="reinjectQuantities">
									<input type="checkbox" id="reinjectQuantities" name="reinjectQuantities" />
									{l s='Re-stock products'}
								</label>
							</p>
							{/if}
							{if ((!$order->hasBeenDelivered() && $order->hasBeenPaid()) || ($order->hasBeenDelivered() && Configuration::get('PS_ORDER_RETURN')))}
							<p class="checkbox">
								<label for="generateCreditSlip">
									<input type="checkbox" id="generateCreditSlip" name="generateCreditSlip" onclick="toggleShippingCost(this)" />
									{l s='Generate a credit card slip'}
								</label>
							</p>
							<p class="checkbox">
								<label for="generateDiscount">
									<input type="checkbox" id="generateDiscount" name="generateDiscount" onclick="toggleShippingCost(this)" />
									{l s='Generate a voucher'}
								</label>
							</p>
							<p class="checkbox" id="spanShippingBack" style="display:none;">
								<label for="shippingBack">
									<input type="checkbox" id="shippingBack" name="shippingBack" />
									{l s='Repay shipping costs'}
								</label>
							</p>
							{/if}
						</div>
						{if (!$order->hasBeenDelivered() || ($order->hasBeenDelivered() && Configuration::get('PS_ORDER_RETURN')))}
						<div class="row">
							<input type="submit" name="cancelProduct" value="{if $order->hasBeenDelivered()}{l s='Return products'}{elseif $order->hasBeenPaid()}{l s='Refund products'}{else}{l s='Cancel products'}{/if}" class="btn btn-default" />
						</div>
						{/if}
					</div>
					<div style="display:none;" class="partial_refund_fields">
						<p class="checkbox">
							<label for="reinjectQuantities">
								<input type="checkbox" id="reinjectQuantities" name="reinjectQuantities" />
								{l s='Re-stock products'}
							</label>
						</p>
						<p class="checkbox">
							<label for="generateDiscountRefund">
								<input type="checkbox" id="generateDiscountRefund" name="generateDiscountRefund" onclick="toggleShippingCost(this)" />
								{l s='Generate a voucher'}
							</label>
						</p>
						<button type="submit" name="partialRefund" class="btn btn-default">
							<i class="icon-check"></i> {l s='Partial refund'}
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>

	<div class="row">
		<div class="col-lg-12">
			<!-- Sources block -->
			{if (sizeof($sources))}
			<div class="panel">
				<h3>
					<i class="icon-globe"></i>
					{l s='Sources'} <span class="badge">{$sources|@count}</span>
				</h3>
				<ul {if sizeof($sources) > 3}style="height: 200px; overflow-y: scroll;"{/if}>
				{foreach from=$sources item=source}
					<li>
						{dateFormat date=$source['date_add'] full=true}<br />
						<b>{l s='From'}</b>{if $source['http_referer'] != ''}<a href="{$source['http_referer']}">{parse_url($source['http_referer'], $smarty.const.PHP_URL_HOST)|regex_replace:'/^www./':''}</a>{else}-{/if}<br />
						<b>{l s='To'}</b> <a href="http://{$source['request_uri']}">{$source['request_uri']|truncate:100:'...'}</a><br />
						{if $source['keywords']}<b>{l s='Keywords'}</b> {$source['keywords']}<br />{/if}<br />
					</li>
				{/foreach}
				</ul>
			</div>
			{/if}

			<!-- linked orders block -->
			{if count($order->getBrother()) > 0}
			<div class="panel">
				<h3>
					<i class="icon-cart"></i>
					{l s='Linked orders'}
				</h3>
				<table class="table">
					<thead>
						<tr>
							<th>
								{l s='Order no. '}
							</th>
							<th>
								{l s='Status'}
							</th>
							<th>
								{l s='Amount'}
							</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{foreach $order->getBrother() as $brother_order}
						<tr>
							<td>
								<a href="{$current_index}&amp;vieworder&amp;id_order={$brother_order->id}&amp;token={$smarty.get.token|escape:'html':'UTF-8'}">#{$brother_order->id}</a>
							</td>
							<td>
								{$brother_order->getCurrentOrderState()->name[$current_id_lang]}
							</td>
							<td>
								{displayPrice price=$brother_order->total_paid_tax_incl currency=$currency->id}
							</td>
							<td>
								<a href="{$current_index}&amp;vieworder&amp;id_order={$brother_order->id}&amp;token={$smarty.get.token|escape:'html':'UTF-8'}">
									<i class="icon-eye-open"></i>
									{l s='See the order'}
								</a>
							</td>
						</tr>
						{/foreach}
					</tbody>
				</table>
			</div>
			{/if}
		</div>
	</div>

	<script type="text/javascript">
		$(document).ready(function(){
			$(".textarea-autosize").autosize();
		});
	</script>

{/block}
