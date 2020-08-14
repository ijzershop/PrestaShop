/**
* 2010-2018 Tuni-Soft
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* It is available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future. If you wish to customize the module for your
* needs please refer to
* http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
* for more information.
*
* @author    Tuni-Soft
* @copyright 2010-2018 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

var dp_order = {

	resetBindBackup: null,
	displaySummaryBackup: null,
	updateQtyBackup: null,
	input: null,

	id_customization: 0,

	init: function(){
		dp_order.handleEvents();
		dp_order.hookCode();
		dp_order.replace();
	},

	handleEvents: function(){
		$(document)
		.on('click', '.dp_input_add', dp_order.openProductPopup)
		.on('dp.id_input_received', dp_order.idInputReceived);
	},

	hookCode: function(){
		if (typeof resetBind === 'function'){
			dp_order.resetBindBackup = resetBind;
			resetBind = dp_order.resetBind;
		}
		if (typeof displaySummary === 'function' && !is_seven){
			dp_order.displaySummaryBackup = displaySummary;
			displaySummary = dp_order.displaySummary;
		}
		if (typeof updateQty === 'function' && is_seven){
			dp_order.updateQtyBackup = updateQty;
			updateQty = dp_order.updateQty;
		}
	},

	resetBind: function(){
		dp_order.resetBindBackup();
		dp_order.processCustomizationInput();
	},

	displaySummary: function(jsonSummary){
		dp_order.displaySummaryBackup(jsonSummary);
		dp_order.loadCustomizations(id_cart);
	},

	loadCustomizations: function(id_cart){
		var dp_cart = $('.dp_cart');
		if (!dp_cart.length){
			dp_cart = $('<div>', {
				class: 'dp_cart'
			}).prependTo('body');
		}
		var data = {
			action: 'load_cart_summary',
			id_cart: id_cart
		};
		dp_cart.load(dp_link, data, function(html){
			dp_order.replace();
		});
	},

	processCustomizationInput: function(){
		if (!$.prototype.fancybox) return false;
		var iframe = $('#customization_list');
		if (!iframe.length) return false;
		var customization_fields = iframe.contents().find('.customization_field');
		if (!customization_fields.length) return false;
		customization_fields.each(function(){
			var customization_field = $(this);
			var id = customization_field.prop('id');
			var pieces = id.split('_');
			var id_customization_field = pieces[2];
			DpTools.getCustomizationField(id_customization_field).done(function(response){
				if (response.customization_field)
				{
					var id_product = response.customization_field.id_product;
					var product_link = response.product_link;
					product_link = DpTools.addUrlParameters(product_link, {
						'dp_cart': id_cart,
						'dp_customer': id_customer
					});
					dp_order.addInputButton(customization_field, product_link);
				}
			});
		});
	},

	addInputButton: function(input, product_link){
		var parent = input.parent();
		dp_order.input = input;
		if (parent.find('.dp_input_add').length > 0) return false;
		var button = $('.dp_input_add');
		if (!button.length){
			button = $('<a>', {
				class: 'dp_input_add',
				href: product_link
			}).prependTo(input.parent());
		}

		button.on('click', dp_order.openProductPopup);
		return true;
	},

	openProductPopup: function(event){
		dp_order.input = $(event.target).parent().find('input');
		if (!!top.$.prototype.fancybox){
			event.preventDefault();
			var url = $(this).prop('href');

			top.$.fancybox({
				padding:  0,
				width:    1087,
				height:   610,
				type:     'iframe',
				href:     url,
				helpers: {
					overlay: {
						locked: false
					}
				}
			});
			return false;
		}
	},

	idInputReceived: function(event, data){
		var str = '|' + data.id_input + '|';
		dp_order.input.val(str);
		$('.id_product_attribute').val(data.id_attribute);
		dp_order.id_customization = data.id_customization;
		$.fancybox.close();
	},

	updateQty: function (id_product, id_product_attribute, id_customization, qty) {
		return dp_order.updateQtyBackup(id_product, id_product_attribute, dp_order.id_customization, qty);
	},

	replace: function(){
		if (is_seven) {
			return true;
		}
		$('.dp_cart > div').each(function(){
			var $dp_input = $(this);
			var id_input = $dp_input.data('id_input');
			var $p = $('p:contains("|'+id_input+'|"), li:contains("|'+id_input+'|"), #customer_cart td:contains("|'+id_input+'|")');
			$p.html($(this).html());
		});
	}

}

$(dp_order.init);