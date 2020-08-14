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

var dp_dropdown_option = function( id_dropdown_option ){

	this.id_dropdown_option = id_dropdown_option;
	this.id_field = 0;
	this.value = '0';
	this.color = '';
	this.is_default = 0;
	this.dropdown_option_trans = {};

	this.save = function(){
		DpTools.ajaxSave('save_dropdown_option', this, this.respond);
	},

	this.remove = function(){
		DpTools.ajaxSave('delete_dropdown_option', this, this.respond);
	},

	this.setValue = function(name, value){
		this[name] = value;
		this.save();
	}

	this.setTrans = function(id_lang, name, value){
		this.dropdown_option_trans[id_lang] = {
			id_dropdown_option: this.id_dropdown_option,
			id_lang: id_lang
		}
		this.dropdown_option_trans[id_lang][name] = value;
		this.saveTrans(id_lang, name);
	},

	this.saveTrans = function(id_lang, name){
		var trans = {};
		$.extend(trans, this.dropdown_option_trans[id_lang]);
		trans.name = name;
		DpTools.ajaxSave('save_dropdown_option_trans', trans, this.respond);
	},

	this.respond = function(context, data){
		if(!data.success){
			return false;
		}
		switch(context){
			case 'save_dropdown_option' :
				this.id_dropdown_option = DpTools.parseInt(data.id_dropdown_option);
				dp_dropdown_options[this.id_dropdown_option] = this;
				$(this).trigger('dp.saved', this);
				$(document).trigger('dp.saved_dropdown_option', this);
				break;
			case 'delete_dropdown_option' :
				delete dp_dropdown_options[this.id_dropdown_option];
				$(this).trigger('dp.deleted', this);
				$(document).trigger('dp.deleted_field', this);
				break;
			case 'save_dropdown_option' :
				$(this).trigger('dp.saved_trans', this);
				$(document).trigger('dp.saved_field_trans', this);
				break;
		}
	}

	return (function(dropdown_option){
		if(dp_dropdown_options && dropdown_option.id_dropdown_option && dp_dropdown_options[dropdown_option.id_dropdown_option]){
			return jQuery.extend(dropdown_option, dp_dropdown_options[dropdown_option.id_dropdown_option]);
		}
		return dropdown_option;
	})(this);
};
