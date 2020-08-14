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

var dp_field = function( id_field ){

	this.id_product = TnCompat.getProductID();
	this.id_field = id_field;
	this.id_group = 0;
	this.name = '';
	this.label = '';
	this.type = 1;
	this.init = 0;
	this.active = 1;
	this.field_trans = {};

	this.setValue = function(name, value){
		this[name] = value;
		this.save();
	}

	this.setTrans = function(id_lang, name, value){
		this.field_trans[id_lang] = {
			id_field: this.id_field,
			id_lang: id_lang
		}
		this.field_trans[id_lang][name] = value;
		this.saveTrans(id_lang, name);
	}

	this.saveTrans = function(id_lang, name){
		var trans = {};
		$.extend(trans, this.field_trans[id_lang]);
		trans.name = name;
		DpTools.ajaxSave('save_field_trans', trans, this.respond);
	}

	this.save = function(){
		if(this.id_field)
			dp_fields[this.id_field] = this;
		DpTools.ajaxSave('save_field', this, this.respond);
	}

	this.remove = function(){
		DpTools.ajaxSave('delete_field', this, this.respond);
	},

	this.respond = function(context, data){
		if(!data.success){
			return false;
		}
		switch(context){
			case 'save_field' :
				this.id_field = DpTools.parseInt(data.id_field);
				dp_fields[this.id_field] = this;
				$(this).trigger('dp.saved', this);
				$(document).trigger('dp.saved_field', this);
				break;
			case 'delete_field' :
				delete dp_fields[this.id_field];
				$(this).trigger('dp.deleted', this);
				$(document).trigger('dp.deleted_field', this);
				break;
			case 'save_field_trans' :
				$(this).trigger('dp.saved_trans', this);
				$(document).trigger('dp.saved_field_trans', this);
				break;
		}

	}

	return (function(field){
		if(dp_fields && field.id_field && dp_fields[field.id_field]){
			return jQuery.extend(field, dp_fields[field.id_field]);
		}
		return field;
	})(this);

};