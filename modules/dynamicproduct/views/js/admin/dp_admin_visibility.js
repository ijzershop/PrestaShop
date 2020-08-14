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

var dp_visibility = {

	container: null,
	header: null,
	body: null,

	headerClone: null,
	bodyClone: null,

	init: function(){
		dp_visibility.container = $('#dp_visibility');
		dp_visibility.header = $('#dp_visibility table thead tr');
		dp_visibility.body = $('#dp_visibility table tbody');
		dp_visibility.headerClone = $('th.dp_visibility_clone');
		dp_visibility.bodyClone = $('td.dp_visibility_clone:eq(0)');
		dp_visibility.handleEvents();
	},

	handleEvents: function(){
		$(document)
		.on('dp.saved_field', dp_visibility.savedField)
		.on('dp.deleted_field', dp_visibility.deletedField);
		dp_visibility.container
		.on('click', 'a.dp_visibility_input', dp_visibility.saveState);
	},

	savedField: function(event, field){
		dp_visibility.addField(field);
	},

	deletedField: function(event, field){
		dp_visibility.removeField(field);
	},

	searchField: function(id_field){
		return dp_visibility.header.find('.dp_visibility_'+id_field);
	},

	addField: function(field){
		if(!field.name.length) return dp_visibility.removeField(field);
		var id_field = field.id_field;
		//search for the field before adding
		var field_header = dp_visibility.searchField(id_field);
		if(!field_header.length){
			//add field header
			var clone = dp_visibility.headerClone.clone();
			clone.addClass('dp_visibility_'+id_field).removeClass('dp_visibility_clone')
			.find('strong').text(field.name);
			clone.appendTo(dp_visibility.header);

			//add field rows
			var rows = dp_visibility.body.find('tr');
			rows.each(function(i, row){
				var clone = dp_visibility.bodyClone.clone();
				clone.addClass('dp_visibility_'+id_field).removeClass('dp_visibility_clone')
				.find('input').attr('data-id_field', id_field).attr('placeholder', field.init);
				clone.appendTo(row);
			});
		}else{
			field_header.find('strong').text(field.name);
			var rows = dp_visibility.body.find('tr');
			rows.each(function(i, row){
				$(row).find('.dp_visibility_'+id_field).find('input').attr('placeholder', field.init);
			});
		}
	},

	removeField: function(field){
		var id_field = field.id_field;
		$('.dp_visibility_'+id_field).remove();
	},

	saveState: function(){
		var value = +!+$(this).data('value');
		var data = {
			id_field: $(this).data('id_field'),
			id_attribute: +$(this).closest('tr').data('id_attribute'),
			visible: value
		}
		$(this).data('value', value)
		.toggleClass('action-enabled', !!value)
		.toggleClass('action-disabled', !value)
		.find('i.icon-check').toggleClass('hidden', !value).end()
		.find('i.icon-remove').toggleClass('hidden', !!value);
		DpTools.ajaxSave('save_visibility', data);
		return false;
	}
};