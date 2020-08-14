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

var dp_proportions = {

    init: function () {
        dp_proportions.handleEvents();
    },

    handleEvents: function () {
	    $(document)
		    .on('dp.saved_field', dp_proportions.savedField);
	    $('#dp_proportions_container')
		    .on('click', '.dp_proportions_save', dp_proportions.handleProportionSave)
		    .on('click', '.dp_proportions_delete', dp_proportions.handleProportionDelete);
    },

    triggerEvents: function () {

    },

	getProportionValues: function (container) {
		return {
			"id_proportion" : container.find('.dp_proportion_id_proportion').val(),
			"id_product" : TnCompat.getProductID(),
			"id_field" : container.find('.dp_proportion_id_field').val(),
			"id_field_src" : container.find('.dp_proportion_id_field_src').val(),
			"value" : DpTools.parseFloat(container.find('.dp_proportion_value').val())
		}
	},
	
	handleProportionSave: function () {
		var container = $(this).closest('.dp_proportion');
		var proportion_values = dp_proportions.getProportionValues(container);
		DpTools.ajaxSave('save_proportion', proportion_values, function (context, response) {
			if (response.success) {
				var id_proportion = response.proportion.id;
				if (!$('.dp_proportion_' + id_proportion).length) {
					dp_proportions.insertNewProportion(id_proportion);
				}
			}
		});
		return false;
	},

	handleProportionDelete: function () {
    	if (!confirm(dp_message.confirm)) {
		    return false;
	    }
		var id_proportion = $(this).data('id_proportion');
		DpTools.ajaxSave('delete_proportion', {id_proportion: id_proportion}, function (context, response) {
			$('.dp_proportion_' + id_proportion).fadeOut();
		});
		return false;
	},

	savedField: function () {
		dp_proportions.reloadProportions();
	},

	insertNewProportion: function (id_proportion) {
		var placeholder = $('.dp_proportion_placeholder')
			.clone()
			.insertBefore('.dp_proportion_new')
			.removeClass('dp_proportion_placeholder');

		var data = {
			action: 'display_proportion',
			id_proportion: id_proportion
		};

		placeholder.load(dp_link, data);
	},

	reloadProportions: function () {
		var data = {
			action: 'display_proportions',
			id_product: TnCompat.getProductID()
		};
		$('#dp_proportions_container').load(dp_link, data);
	}
};