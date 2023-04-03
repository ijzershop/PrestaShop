/**
* 2022 - Keyrnel
*
* NOTICE OF LICENSE
*
* The source code of this module is under a commercial license.
* Each license is unique and can be installed and used on only one shop.
* Any reproduction or representation total or partial of the module, one or more of its components,
* by any means whatsoever, without express permission from us is prohibited.
* If you have not received this module from us, thank you for contacting us.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future.
*
* @author    Keyrnel
* @copyright 2022 - Keyrnel
* @license   commercial
* International Registered Trademark & Property of Keyrnel
*/

$(function() {
	KlCartRuleExtender_CartRule.init();
});

var KlCartRuleExtender_CartRule = (function() {
	var includeFees = (function() {
		var _settings = {};

		function initFormInput() {
			var html = '<div id="include_fees" class="form-group">';
			html += '<label class="control-label col-lg-3">';
			html += '<span class="label-tooltip" data-toggle="tooltip" title data-original-title="Include shipping and wrapping costs">';
			html += 'Include shipping and wrapping costs';
			html += '</span></label>';
			html += '<div class="col-lg-9">';
			html += '<span class="switch prestashop-switch fixed-width-lg">';
			html += '<input type="radio" name="include_fees" id="include_fees_on" value="1">';
			html += '<label class="t" for="include_fees_on">Oui</label>';
			html += '<input type="radio" name="include_fees" id="include_fees_off" value="0">';
			html += '<label class="t" for="include_fees_off">Non</label>';
			html += '<a class="slide-button btn"></a>';
			html += '</span></div></div>';

			$(_settings.formHook).after(html);
		}

		function initFormValues(cart_rule_fees) {
			toggleIncludeFees();
			
			cart_rule_fees.value
				? $('#include_fees_on').prop('checked', true)
				: $('#include_fees_off').prop('checked', true);

			cart_rule_fees.disabled && $('input[name="include_fees"]').prop('disabled', true);
		}

		function initBinds() {
			$(document).on('change', 'input[name="apply_discount"], input[name="apply_discount_to"]', function() {
				toggleIncludeFees(true);
			});
		}

		function toggleIncludeFees(fade = false) {
			$('input[name="apply_discount"]').filter(':checked').val() === 'amount' && $('input[name="apply_discount_to"]').filter(':checked').val() === 'order'
				? $('#include_fees').show(fade ? 400 : 0)
				: $('#include_fees').hide(fade ? 200 : 0);
		}

		return {
			init: function(cart_rule_fees) {
				_settings = $.extend({}, _settings, {
					formHook : '#apply_discount_to_div'
				});

				initFormInput();
				initFormValues(cart_rule_fees)
				initBinds();
			}
		}
	})();

	return {
		init: function() {
			if (typeof cart_rule_fees !== 'undefined' && cart_rule_fees) {
				includeFees.init(JSON.parse(cart_rule_fees));
			}
		}
	}
})();
