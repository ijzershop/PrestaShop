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

var dp_equation = function(container){

	this.container = container;

	this.id_equation = 0;
	this.id_product = TnCompat.getProductID();
	this.formula = '';

	this.field = this.container.find('.dp_equation_content');
	this.id_field = this.field.prop('id');
	this.id_formula = this.id_field.replace('dp_equation_', '');
	this.fields = this.container.find('.dp_equation_fields');
	this.error = this.container.find('.dp_equation_error');
	this.clone_field = this.container.find('.dp_equation_field_clone');

	this.loadFormula = function(){
		var equation = this;
		var html = '';
		var html_clone = DpTools.getHtml(this.clone_field);
		this.field.empty();
		var pieces = this.formula.split(' ');
		$.each(pieces, function(i, str){
			var match = str.match(/^\[.*\]$/);
			if(match && match.length == 1){
				name = str.replace(/(\[|\])/g,'');
				html += equation.getFieldHTML(name)
			}else{
				html += str;
			}
			html += ' ';
		});
		html = html.trim();
		html = html.replace(/(&nbsp;)+/g,'&nbsp;');
		html = html.replace(/(&nbsp; )/g,'&nbsp;');
		this.field.html(html);
	}

	this.initFields = function(){
		var body = DpTools.getBody();
		if(body)
			body.find('.dp_formula_field').addClass('dp_unavailable').attr('title', dp_message.unavailable);
		var equation = this;
		equation.fields.find('.dp_equation_field').remove();
		$.each(dp_fields, function(){
			var name = this.name;
			var type = this.type;
			if (type != 6)
				equation.addField(name);
			else{
				if (name) {
					equation.addField(name + '_w');
					equation.addField(name + '_h');
				}

			}
			if(body){
				body.find('.dp_field_'+name).removeClass('dp_unavailable').attr('title', '');
				if (type == 6){
					body.find('.dp_field_'+name + '_w').removeClass('dp_unavailable').attr('title', '');
					body.find('.dp_field_'+name + '_h').removeClass('dp_unavailable').attr('title', '');
				}
			}
		});

		$.each(dp_attributes, function(){
            var name = DpTools.convertStringToVariableName(this.name);
            var label = this.label;
            equation.addField(name, label, 'dp_attribute_field');
		});

		$.each(dp_features, function(){
            var name = DpTools.convertStringToVariableName(this.name);
            var label = this.label;
            equation.addField(name, label, 'dp_feature_field');
		});
	}

	this.addField = function(name, label, classname){
		if(typeof label == 'undefined')
			label = name;
		if(!name.length) return true;
		if(this.fields.find('.dp_eq_' + name).length > 0) return true;
		var clone = this.clone_field.clone();
		clone
		.removeClass('dp_equation_field_clone')
		.addClass('dp_equation_field')
		.addClass('dp_eq_' + name)
		.addClass(classname)
		.attr('data-name', name)
		.text(label);
		clone.appendTo(this.fields);
	}

	this.getFieldHTML = function(name){
		return '<b class="dp_formula_field dp_field_'+name+'">[' + name + ']</b>&nbsp;';
	}

	this.insertField = function(event){
		var equation = event.data;
		var field = $(this);
		var name = field.data('name');
		var html = equation.getFieldHTML(name);
		equation.insertHTML(html);
		return false;
	}

	this.insertTool = function(event){
		var equation = event.data;
		var field = $(this);
		var html = field.text();
		equation.insertHTML(html + '&nbsp;');
		return false;
	}

	this.removeField = function(event){
		$(this).remove();
		var equation = event.data;
		equation.getFormula();
	},

	this.checkFields = function(){

	},

	this.cleanHtml = function(){
		//buggy: we lose cursor position after cleaning
		//TODO: we need a better idea here, clean html without losing cursor pos
		var html = this.field.html().trim();
		//convert spaces
		html = html.replace(/ &nbsp;/g, '&nbsp;');
		//remove repeated spaces
		html = html.replace(/(&nbsp;)+/g, '&nbsp;');
		//remove leading spaces
		html = html.replace(/^(&nbsp;)/, '');
		//remove trailing spaces
		html = html.replace(/(&nbsp;)$/, '');
		this.field.html(html);
	}

	this.insertHTML = function (html) {
		tinyMCE.get(this.id_field).insertContent(html);
	}

	this.getFormula = function(){
		var formula = tinyMCE.get(this.id_field).getContent({format : 'text'}).replace(/\s+/g, " ").trim();
		dp_equations[this.id_formula] = formula;
		return this.formula = formula;
	}

	this.getEquationByIdFormula = function(id_formula){
		for (id_equation in dp_equations) {
			if (dp_equations[id_equation].id_formula == id_formula) {
				return dp_equations[id_equation].formula;
            }
        }
        return '';
	},

	this.saveEquation = function(event){
		var equation = event.data;
		var formula = equation.getFormula();
		equation.container.removeClass('dp_invalid');
		equation.field.focus();
		DpTools.ajaxSave('save_equation', equation, function(context, response){
			if(response.error){
				var msg = dp_message['invalid'];
				this.error.html(msg + ' ' + response.error);
				this.container.addClass('dp_invalid');
			}
		});
		return false;
	}

	this.eraseEquation = function(event){
		if(!confirm(dp_message['erase'])) return false;
		var equation = event.data;
		tinyMCE.get(equation.id_field).setContent('');
		equation.getFormula();
		return false;
	}

	this.handleEvent = function(event){
		var equation = event.data;
		equation.initFields();
	}

	return (function(equation){

		$(document)
		.on('dp.saved_field', equation, equation.handleEvent)
		.on('dp.deleted_field', equation, equation.handleEvent);

		equation.container
		.on('dblclick', 'strong', equation, equation.removeField)
		.on('click', '.dp_equation_fields .dp_equation_field', equation, equation.insertField)
		.on('click', '.dp_equation_tools .dp_equation_tool', equation, equation.insertTool);

		var container = equation.container.closest('.dp_dynamicproduct_equation');

		container.find('.dp_save_equation').off('click')
		.on('click', equation, equation.saveEquation);

		container.find('.dp_erase_equation').off('click')
		.on('click', equation, equation.eraseEquation);

        equation.formula= equation.getEquationByIdFormula(equation.id_formula);

		//attach to container
		equation.container.data('equation', equation);
		equation.loadFormula();
		equation.initFields();
		return equation;
	})(this);

};