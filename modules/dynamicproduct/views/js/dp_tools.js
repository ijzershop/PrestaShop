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

var DpTools = {

	alert: function (str) {
		if (!!$.prototype.fancybox) {
			str += "<br/><p class=\"submit\" style=\"text-align:right; padding-bottom: 0\"><input class=\"button\" type=\"button\" value=\"OK\" onclick=\"$.fancybox.close();\" /></p>";
			$.fancybox(str, {
				'autoDimensions': false,
				'autoSize': false,
				'width': 500,
				'height': 'auto',
				'openEffect': 'none',
				'closeEffect': 'none'
			});
		}
		else {
			alert(str);
		}
	},

	alertAdmin: function (str) {
		DpTools.alert(str);
	},

	message: function (context, data, input, can_alert) {
		if (typeof dp_message[ context ] === 'undefined') {
			return DpTools.alert(context);
		}
		var message = dp_message[ context ];
		$.each(data, function (key, value) {
			message = message.replace('_' + key + '_', value);
		});
		if (typeof input !== 'undefined') {
			input.parent().find('.dp_invalid_btn').prop('title', message);
		}
		if (can_alert) {
			DpTools.alert(message);
		}
		return message;
	},

	parseInt: function (number, default_value) {
		var fallback = 0;
		if (typeof default_value !== 'undefined') {
			fallback = default_value;
		}
		return isNaN(parseInt(number)) ? fallback : parseInt(number);
	},

	parseFloat: function (number, default_value) {
		var fallback = 0;
		if (typeof default_value !== 'undefined') {
			fallback = default_value;
		}
		return isNaN(parseFloat(number)) ? fallback : parseFloat(number);
	},

	getFloat: function (value) {
		if ($.isNumeric(value)) {
			return DpTools.parseFloat(value);
		}
		return value;
	},

	decimalPlaces: function (number) {
		return number.toString().replace(/^-?\d*\.?|0+$/g, '').length;
	},

	isFrame: function () {
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	},

	addUrlParameters: function (url, params) {
		var strings = [];
		$.each(params, function (key, value) {
			strings.push(key + '=' + value);
		});
		var query = strings.join('&');

		if (url.indexOf('?') === -1) {
			url = url + '?' + query;
		} else {
			url = url + '&' + query;
		}
		return url;
	},

	snapToStep: function (value, step) {
		var decimals = DpTools.decimalPlaces(step);
		var coeff = Math.pow(10, decimals);
		value *= coeff;
		step *= coeff;

		var num = DpTools.parseInt(value / step);
		var rem = value % step;

		if (rem >= step / 2) {
			num++;
		}
		var new_value = DpTools.parseFloat(num * step);
		return new_value /= coeff;
	},

	getBody: function () {
		var editor = tinyMCE.get('dp_equation');
		if (editor) {
			return $(tinyMCE.get('dp_equation').getBody());
		}
		return false;
	},

	abortAjaxRequests: function () {
		var calculate_formula_ajax = dp_product.ajaxRequests[ 'calculate_formula' ];
		var get_php_variables_ajax = dp_product.ajaxRequests[ 'get_php_variables' ];
		if (calculate_formula_ajax) {
			calculate_formula_ajax.abort();
		}
		if (get_php_variables_ajax) {
			get_php_variables_ajax.abort();
		}
	},

	calculateFormula: function (values) {
		var data = {
			'values': values,
			'noclone': true
		};

		if (dp_product.checkVATModule()) {
			data.vat = true;
		}

		data = DpTools.addProductDetails(data);
		var deferred = $.Deferred();
		dp_product.ajaxRequests[ 'calculate_formula' ] =
			DpTools.ajaxSave('calculate_formula', data, function (context, response) {
				deferred.resolve(response);
			});
		return deferred.promise();
	},

	getPHPVariables: function (values) {
		var data = {
			'values': values,
			'noclone': true
		};
		data = DpTools.addProductDetails(data);
		var deferred = $.Deferred();
		dp_product.ajaxRequests[ 'get_php_variables' ] =
			DpTools.ajaxSave('get_php_variables', data, function (context, response) {
				deferred.resolve(response);
			});
		return deferred.promise();
	},

	getProductPrice: function () {
		if (dp_exclude || true) {
			return 0;
		}
		if (typeof priceWithDiscountsDisplay === 'undefined') {
			return productPrice;
		}
		return priceWithDiscountsDisplay;
	},

	getCustomizationField: function (id_customization_field) {
		var data = {
			id_customization_field: id_customization_field,
			no_msg: true
		};
		var deferred = $.Deferred();
		DpTools.ajaxSave('get_customization_field', data, function (context, response) {
			deferred.resolve(response);
		});
		return deferred.promise();
	},

	initCustomFunctions: function () {
		window.getField = function (name) {
			return $('#dp_' + name);
		};
		window.getParent = function (name) {
			return $('#dp_' + name).closest('.dp_field_container');
		};
		window.dpApply = function () {
			dp_product.dpChange();
		};

		if (DpTools.getVar('ajaxCart') && typeof ajaxCart.updateLayer === 'function') {
			dp_product.updateLayerBkp = ajaxCart.updateLayer;
			ajaxCart.updateLayer = dp_product.updateLayer;
		}
		$.fn.apply = function () {
			var input = $(this);
			var is_input = input.hasClass('dp_input');

			var name = input.data('name');

			var min = DpTools.parseFloat(input.data('min'));
			var max = DpTools.parseFloat(input.data('max'));
			$('.dp_min_' + name).text(min);
			$('.dp_max_' + name).text(max);

			if (input.hasClass('dp_dropdown')) {
				input.find('option:not(:disabled):eq(0)').prop('selected', true);
			}

			// TODO: check this
			if (input.hasClass('dp_radio')) {
				input.find('option:not(:disabled):eq(0)').prop('selected', true);
			}

			if (input.hasClass('dp_thumbnails')) {
				input.find('option:not(:disabled):eq(0)').prop('selected', true);
			}

			if (is_input) {
				dp_product.checkStep(input);

				var changed = false;
				var value = input.val();
				if (value < min) {
					value = min;
					changed = true;
				}
				if (max !== min && value > max) {
					value = max;
					changed = true;
				}

				if (changed) {
					input.val(value);
				}
				// refresh spinners
				dp_product.initSliders();
				dp_product.initSpinners();
				dp_product.initTooltips();
			}
		};

		$.fn.hideField = function () {
			return $(this).addClass('dp_hidden_field');
		};

		$.fn.showField = function () {
			return $(this).removeClass('dp_hidden_field');
		};

		$.fn.triggerField = function () {
			var element = $(this);
			if (element.hasClass('dp_field_container')) {
				element = element.find('.dp_entry');
			}
			dp_product.execCustomFunction(element);
		};

		$.fn.getOptions = function () {
			return $(this).find('option');
		};

		$.fn.getOption = function (id_option) {
			return $(this).find('[data-id_dropdown_option="' + id_option + '"]');
		};

		$.fn.getThumbnail = function (id_option) {
			return $(this).find('[data-id_thumbnails_option="' + id_option + '"]');
		};
	},

	triggerFunction: function (input, name, value, extra, id_field) {
		var func = 'dp_' + name;
		var parent = input.closest('.dp_field_container');
		if (typeof window[ func ] === "function") {
			window[ func ].call(parent, value, extra, id_field);
		}
	},

	triggerCustomFunction: function (func, params) {
		var func = 'dp_' + func;
		if (typeof window[ func ] === "function") {
			window[ func ].apply(null, params);
		}
	},

	triggerGlobal: function (event, data) {
		$(document).trigger(event, data);
		if (DpTools.isFrame()) {
			top.$(top.document).trigger(event, data);
		}
	},

	showDropdownIcon: function (name, id_option) {
		var icons = $('#dp_dropdown_icons_' + name);
		if (icons.length) {
			var icon = icons.find('.dp_dropdown_icon');
			var option = $('[data-id_dropdown_option="' + id_option + '"]');
			var color = option.data('color');
			var image = option.data('image');
			var image_full = option.data('image_full');
			if (color || image) {
				icon.css('background', color).attr('href', '#').data('has_link', false);
				if (image) {
					icon.prop('href', image_full).data('has_link', true);
					icon.find('img').prop('src', image);
				} else {
					icon.find('img').prop('src', dp_module_dir + 'views/img/pixel.png');
				}
				if (!icons.is(':visible')) {
					icons.css('display', 'block').css('height', '');
					var final_height = icons.height();
					if (final_height !== 0) {
						icons.css({height: 0, display: 'block'}).animate({height: final_height}, 'fast');
					}
				}
			} else {
				if (icons.is(':visible')) {
					icons.animate({height: 0}, 'fast', function () {
						$(this).hide();
					});
				}
			}
		}
	},

	openDropdownIcon: function (e) {
		if (!!$.prototype.fancybox) {
			e.preventDefault();
			var url = $(this).prop('href');
			if (!$(this).data('has_link')) {
				return false;
			}
			$.fancybox({
				padding: 0,
				type: 'image',
				href: url,
				helpers: {
					overlay: {
						locked: false
					}
				}
			});
		}
		return false;
	},

	prefixData: function (data, prefix) {
		var new_data = {};
		$.each(data, function (key, value) {
			new_data[ prefix + key ] = value;
		});
		return new_data;
	},

	awp_active: function () {
		return DpTools.getVar('awp_psv');
	},

	addProductDetails: function (values) {
		values.id_product = TnCompat.getProductID();
		values.id_attribute = DpTools.parseInt(TnCompat.getAttributeID());
		values.attributes = TnCompat.addProductAttributes();
		values.quantity = DpTools.parseInt($('#quantity_wanted').val());
		values.quantity = Math.max(values.quantity, 1);
		values.hash = location.hash;
		values.dp_cart = DpTools.readVar(dp_id_cart);
		values.dp_customer = DpTools.readVar(dp_id_customer);
		values.awp = DpTools.awp_active();
		return values;
	},

	cloneObject: function (target, source) {
		jQuery.extend(target, source);
		if (!source[ 'noclone' ]) {
			for (x in target) {
				if (typeof target[ x ] === 'function' || typeof target[ x ] === 'object') {
					delete target[ x ];
				}
			}
		}
		return target;
	},

	isHidden: function (input) {
		var field_container = input.closest('.dp_field_container');
		return field_container.is(':hidden');
	},

	cleanInput: function (input) {
		input = $(input);
		var value = input.val();
		var type = input.data('type');
		input.val(DpTools.clean(value, type));
	},

	clean: function (value, type, required) {
		if (typeof required === 'undefined') {
			required = true;
		}
		if (!required && value.length === 0) {
			return value;
		}

		if (type === 'float') {
			//remove everything exept
			value = value.replace(',', '.');
			value = value.replace(/[^\-\d\.]/g, '');
			return DpTools.parseFloat(value);
		} else if (type === 'int') {
			value = value.replace(',', '.');
			value = value.replace(/[^\-\d\.]/g, '');
			return DpTools.parseInt(value);
		} else if (type === 'pos') {
			value = value.replace(',', '.');
			value = value.replace(/[^\-\d\.]/g, '');
			return Math.abs(DpTools.parseInt(value));
		} else if (type === 'plain') {
			value = value.replace(/\s+/g, '_');
			value = value.replace(/[\W]/g, '').toLowerCase();
			return value;
		}

		return value;
	},

	convertStringToVariableName: function (string) {
		return string.replace(/[^a-z0-9]+/gi, '_');
	},

	hexToRgb: function(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[ 1 ], 16),
			g: parseInt(result[ 2 ], 16),
			b: parseInt(result[ 3 ], 16)
		} : null;
	},

	cancel: function (event) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
	},

	replacePrice: function (li) {
		var $tr = li.closest('tr');
		var cart_item = $tr.prev('.cart_item');
		var li_price = cart_item.find('td.cart_unit').find('li.price');
		var price = li_price.text().replace(currencySign, '');
		if (DpTools.parseFloat(price) === 0) {
			li_price.hide();
		} else {
			li_price.show();
		}
		var span_price = cart_item.find('td.cart_total').find('span.price');
		var price = span_price.text().replace(currencySign, '');
		if (DpTools.parseFloat(price) === 0) {
			span_price.hide();
		} else {
			span_price.show();
		}
	},

	calculateColumns: function (tr) {
		var tds = tr.find('td');
		var total = 0;
		tds.each(function () {
			var colspan = DpTools.parseInt($(this).prop('colspan'));
			if (colspan) {
				total += colspan;
			} else {
				total++;
			}
		});
		return total;
	},

	fixColspan: function (td) {
		var tr = td.closest('tr');
		var columns = DpTools.calculateColumns(tr);
		var tr_prev = tr.prevAll('.cart_item:eq(0)');
		var columns_prev = DpTools.calculateColumns(tr_prev);

		var colspan = DpTools.parseInt(td.prop('colspan'));
		if (!colspan) {
			colspan = 1;
		}
		colspan += columns_prev - columns;
		td.prop('colspan', colspan);
	},

	checkFirstColumn: function (td) {
		var row = td.parent();
		if (row.find('td').eq(0).hasClass('dp_td')) {
			row.prepend($('<td>'));
		}
	},

	cloneProductRow: function (li, selector, dp_totalprice_html) {
		var row = li.closest('tr');
		if (!row.find('.cart_total').length) {
			if (!row.find('.cart_delete').length) {
				return;
			}
			$('<br>' + dp_totalprice_html).insertAfter(row.find('.cart_delete .cart_quantity_delete'));
		}
		;
		var p_row = row.prevAll('[id^=' + selector + ']');
		var cart_product = p_row.find('td.cart_product');
		row.find('td').eq(0).addClass('cart_product').replaceWith(cart_product.clone());
		var cart_description = p_row.find('.cart_description').html() + '<br>';
		row.find('td').eq(1).addClass('cart_description').prepend($(cart_description));
		p_row.hide();
	},

	fillDataRow: function (row, object, class_name, is_new) {
		var id_object = object[ 'id_' + class_name ];
		row.prop('id', 'dp_row_' + id_object);
		row.data('id_' + class_name, id_object).addClass('dp_tr_' + id_object).addClass('dp_' + class_name + '_' + id_object);
		row.find('.dp_input_lang').data('id_' + class_name, id_object);
		row.find('[data-id_object]').data('id_object', id_object);
		row.find('.dp_unit_value').addClass('dp_unit_value_' + id_object);
		row.find('[name=id_' + class_name + ']').val(id_object);
		row.find('[class=id_' + class_name + ']').html(id_object);
		dp_admin.initColorPicker();
		var inputs = row.find('[data-name]');
		inputs.each(function () {
			if ($(this).hasClass('dp_lang_input')) {
				return;
			}
			var input = $(this);
			var name = input.data('name');
			var value = object[ name ];
			var tag = input.prop('tagName');
			if (tag === 'A') {
				input.data('value', +value)
					.toggleClass('action-enabled', !!value)
					.toggleClass('action-disabled', !value)
					.find('i.icon-check').toggleClass('hidden', !value).end()
					.find('i.icon-remove').toggleClass('hidden', !!value);
				return true;
			}
			input.val(value);
		});
		if (is_new) {
			row.show();
			row.find('.dp_del_btn').dpDelButton();
			DpTools.updateCount(class_name);
		}
	},

	getTableOrder: function (table) {
		var order = {};
		var counter = 1;
		$(table).find('tr[id]').each(function (i, tr) {
			var id_row = DpTools.parseInt($(tr).prop('id').replace('dp_row_', ''));
			order[ counter++ ] = id_row;
		});
		return order;
	},

	updateCount: function (class_name) {
		$('#dp_' + class_name + 's_container')
			.find('.badge')
			.text(Object.keys(window[ 'dp_' + class_name + 's' ]).length);
	},

	getHtml: function (dom) {
		return $('<div>').append(dom.clone()).html();
	},

	getValue: function (input) {
		var $input = $(input);
		if ($input.hasClass('dp_toggle')) {
			var value = $input.data('value');
			var new_value = +!+$input.data('value');
			$input.removeClass('dp_val_' + value).addClass('dp_val_' + new_value).data('value', new_value);
			return new_value;
		} else if (input.type === 'checkbox') {
			return $input.prop('checked');
		}
		return $input.val();
	},

	getVar: function (obj) {
		return typeof window[ obj ] !== 'undefined';
	},

	isset: function (variable) {
		return typeof variable !== 'undefined';
	},

	readVar: function (variable) {
		return typeof variable !== 'undefined' && variable;
	},

	getThumb: function (image) {
		var dot = image.lastIndexOf('.');
		var thumb = image.substring(0, dot);
		thumb += '-thumb.jpg';
		return thumb;
	},

	ajaxSave: function (context, object, callback) {
		var data = {};
		data[ 'id_product' ] = TnCompat.getProductID();
		data = DpTools.cloneObject(data, object);
		data[ 'action' ] = context;
		$('.dp_loader').fadeIn();
		return $.post(dp_link, data, function (response) {
			$('.dp_loader').fadeOut();
			if (!data[ 'no_msg' ]) {
				if (response.success && !data.no_msg) {
					DpTools.showSuccess();
				} else if (response.error && response.error !== 1) {
					if (typeof showErrorMessage === 'function') {
						showErrorMessage(response.error);
					}
				} else {
					if (typeof showErrorMessage === 'function') {
						showErrorMessage(dp_message[ 'error' ]);
					}
				}
			}
			if (callback) {
				callback.call(object, context, response);
			}
		}, 'json');
	},

	showSuccess: function () {
		if (typeof showSuccessMessage === 'function') {
			showSuccessMessage(dp_message[ 'success' ]);
		}
	}

};