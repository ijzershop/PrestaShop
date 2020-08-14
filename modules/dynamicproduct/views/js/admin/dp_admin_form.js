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

var dp_form = {

	init : function(){
		dp_form.handleEvents();
		dp_form.setCountryForm();
		$('.dp_lang_div').dpLang();
	},

	handleEvents : function(){
		$(document)
		.on('change', '.dp_general_cfg', dp_form.ajaxGeneralConfig)
		.on('change', '.dp_change_name', dp_form.changeName)
		.on('click', '.dp_add_country', dp_form.addPanel)
		.on('keyup', '#conversion', dp_form.changedConversion);

		$('.dp_remove_panel').on('click', dp_form.removePanel);
	},

	ajaxGeneralConfig: function(){
		var data = {};
		data['name'] = $(this).data('name');
		data['value'] = DpTools.getValue(this);
		data['value'] = $(this).val();
		DpTools.ajaxSave('save_general_config', data, function(){});
		//return false;
	},

	changeName : function(){
		$(this).prop('name', $(this).data('name'));
	},

	setCountryForm : function(){
		$('#dp_countries')
		.on('click', '.dp_country_title', function(){
			$(this).siblings('.dp_country_form').slideToggle();
		});
	},

	addPanel : function(){
		var id_country = $('#dp_country').val();
		if($('.dp_country_' + id_country).length){
			dp_form.scrollToPanel($('.dp_country_' + id_country));
			return false;
		}

		var country_name = $('#dp_country option:selected').text();
		var panel = $('.dp_country_clone').clone();
		panel.removeClass('dp_country_clone').addClass('dp_country_' + id_country);
		panel.find('.dp_country_title').data('id_country', id_country).find('strong').text(country_name);
		panel.find('.dp_input').each(function(){
			var name = $(this).data('name');
			if (name && name.indexOf('[0]') > -1){
				$(this).data('name', name.replace('[0]', '[' + id_country + ']'));
			}
		});
		panel.appendTo('#dp_countries');
		panel.find('.dp_remove_panel').off('click').on('click', dp_form.removePanel)
		dp_form.scrollToPanel(panel);
		return false;
	},

	removePanel : function(event){
		var panel = $(this).closest('.dp_country_panel');
		var id_country = panel.data('id_country');
		DpTools.ajaxSave('remove_panel', {id_country: id_country}, function(){
			panel.slideUp().fadeOut(function(){
				$(this).remove();
			})
		});
		DpTools.cancel(event);
		return false;
	},

	scrollToPanel : function(panel){
		panel.find('.dp_country_form').slideDown();
		$('html, body').animate({
			scrollTop: panel.offset().top
			}, 500);
	},

	changedConversion: function(){
		var value = $(this).val();
		$('.dp_conversion_rate').text(value);
	}
};

$(dp_form.init)