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

var dp_proportion = {

    proportions: [],

    init: function () {
        dp_proportion.handleEvents();
	    dp_proportion.cacheFieldNames();
    },

    handleEvents: function () {

    },

    triggerEvents: function () {

    },

	cacheFieldNames: function () {
		$.each(dp_proportions, function (index, proportion) {
			dp_proportion.setProportionInfo(proportion)
		});
    },

	setProportionInfo: function (proportion) {
		var field_name = dp_proportion.getFieldName(proportion.id_field);
		var field_src_name = dp_proportion.getFieldName(proportion.id_field_src);
		var value = DpTools.parseFloat(proportion.value);
		dp_proportion.proportions[ field_name ] = {
			field: field_src_name,
			value: 1 / value
		};
		dp_proportion.proportions[ field_src_name ] = {
			field: field_name,
			value: value
		};
	},

	getFieldName: function (id_field) {
		return $('.dp_field_container_' + id_field + ' .dp_entry').data('name');
	},

	processProportions: function (field_name, field_value, values) {
		if (proportion = dp_proportion.proportions[field_name]) {
			var new_value = field_value * proportion.value;
			getField(proportion.field).val(ps_round(new_value, 3));
		}
	},
};