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
	KlCartRuleExtender_Module.init();
});

var KlCartRuleExtender_Module = (function() {
	var configForm = (function() {
		var _settings = {};

		function initBinds() {
			$(document).on('change', _settings.toggleTrigger, function() {
				if ($(this).val() == '1') {
					$(_settings.giftcardsOnlyInput)
						.first()
						.closest('.form-group')
						.removeClass('show')
						.hide(200)
				} else {
					$(_settings.giftcardsOnlyInput)
						.first()
						.closest('.form-group')
						.removeClass('hide')
						.show(400)
				}
			});
		}

		return {
			init: function() {
				_settings = $.extend({}, _settings, {
					toggleTrigger: 'input[name="KL_CART_RULE_EXTENDER_ALL_CART_RULES"]',
					giftcardsOnlyInput: 'input[name="KL_CART_RULE_EXTENDER_GIFT_CARDS_ONLY"]',
				});

				initBinds();
			}
		}
	})();

	return {
		init: function() {
			configForm.init();
		}
	}
})();
