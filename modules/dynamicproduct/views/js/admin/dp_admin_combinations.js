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

var dp_combinations = {

	container: null,
	header: null,
	body: null,

	headerClone: null,
	bodyClone: null,

	init: function(){
		dp_combinations.container = $('#dp_combinations');
		dp_combinations.header = $('#dp_combinations table thead tr');
		dp_combinations.body = $('#dp_combinations table tbody');
		dp_combinations.headerClone = $('th.dp_combination_clone');
		dp_combinations.bodyClone = $('td.dp_combination_clone:eq(0)');
		dp_combinations.handleEvents();
		dp_combinations.checkCombinations();
	},

	checkCombinations: function(){
		var has_rows = (dp_combinations.header.find('th').length > 2);
		if(has_rows)
			$('#dp_combinations').show();
		else
			$('#dp_combinations').hide();
	},

	handleEvents: function(){
		$(document)
		.on('dp.saved_field', dp_combinations.savedField)
		.on('dp.deleted_field', dp_combinations.deletedField);
		dp_combinations.container
		.on('change', '.dp_combination_input', dp_combinations.saveInput)
		.on('click', 'a.dp_combination_input', dp_combinations.saveState)
		.on('keyup', '.dp_combination_input', dp_combinations.fillInputValue)
	},

	savedField: function(event, field){
		if(field.type == 2 || field.type == 3)
			dp_combinations.addField(field);
		else
			dp_combinations.removeField(field);
	},

	deletedField: function(event, field){
		dp_combinations.removeField(field);
	},

	searchField: function(id_field){
		return dp_combinations.header.find('.dp_combination_'+id_field);
	},

	addField: function(field){
		if(!field.name.length) return dp_combinations.removeField(field);
		var id_field = field.id_field;
		//search for the field before adding
		var field_header = dp_combinations.searchField(id_field);
		if(!field_header.length){
			//add field header
			var clone = dp_combinations.headerClone.clone();
			clone.addClass('dp_combination_'+id_field).removeClass('dp_combination_clone')
			.find('strong').text(field.name);
			clone.appendTo(dp_combinations.header);

			//add field rows
			var rows = dp_combinations.body.find('tr');
			rows.each(function(i, row){
				var clone = dp_combinations.bodyClone.clone();
				clone.addClass('dp_combination_'+id_field).removeClass('dp_combination_clone')
				.find('input').attr('data-id_field', id_field).attr('placeholder', field.init);
				clone.appendTo(row);
			});
		}else{
			field_header.find('strong').text(field.name);
			var rows = dp_combinations.body.find('tr');
			rows.each(function(i, row){
				$(row).find('.dp_combination_'+id_field).find('input').attr('placeholder', field.init);
			});
		}
		dp_combinations.checkCombinations();
	},

	removeField: function(field){
		var id_field = field.id_field;
		$('.dp_combination_'+id_field).remove();
		dp_combinations.checkCombinations();
	},

	fillInputValue: function(){
		//for css rule .dp_combination_input[value!=""]
		var value = $(this).val();
		if(value.length){
			$(this).attr('rel', 'full');
		}else{
			$(this).attr('rel', '');
		}
	},

	saveInput: function(){
		var value = $(this).val();
		if(value.length)
			value = DpTools.cleanInput(this);
		var data = {
			id_field: $(this).data('id_field'),
			id_attribute: $(this).closest('tr').data('id_attribute'),
			value: $(this).val()
		}
		DpTools.ajaxSave('save_combination', data);
	},

	saveState: function(){
		var value = +!+$(this).data('value');
		var data = {
			id_field: 0,
			id_attribute: +$(this).closest('tr').data('id_attribute'),
			value: value
		}
		$(this).data('value', value)
		.toggleClass('action-enabled', !!value)
		.toggleClass('action-disabled', !value)
		.find('i.icon-check').toggleClass('hidden', !value).end()
		.find('i.icon-remove').toggleClass('hidden', !!value);
		DpTools.ajaxSave('save_combination', data);
		return false;
	}
};