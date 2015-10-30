/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2015 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

$( document ).ready(function() {
	$('.btn-next').click(function(){
		$('.nav-tabs > .active').next('li').find('a').trigger('click');
	});

	$('.btn-prev').click(function(){
		$('.nav-tabs > .active').prev('li').find('a').trigger('click');
	});

	//send form
	$("#form").submit(function( event ) {
		event.preventDefault();
		var data = $(this, 'input, textarea, select').not(':input[type=button], :input[type=submit], :input[type=reset]').serialize();

		$.ajax({
			type: "POST",
			data: data,
			beforeSend: function() {
				$('#form .btn-submit').attr("disabled", "disabled");
				$('.help-block').remove();
				$( "*.has-error" ).removeClass("has-error");
			},
			success: function(response){
				$('#form_id_product').val(response.product.id);
				showSuccessMessage(translate_javascripts['Form update success']);
			},
			error: function(response){
				showErrorMessage(translate_javascripts['Form update errors']);

				$.each(jQuery.parseJSON(response.responseText), function(key, errors){
					var html = '<span class="help-block"><ul class="list-unstyled">';
					$.each(errors, function(key, error){
						html += '<li><span class="glyphicon glyphicon-exclamation-sign"></span> ' + error + '</li>';
					});
					html += '</ul></span>';

					$('#form_'+key).parent().append(html);
					$('#form_'+key).parent().addClass('has-error');
				});

				//scroll to 1st error
				$('html, body').animate({
					scrollTop: $(".has-error").first().offset().top - $('.page-head').height() - $('.navbar-header').height()
				}, 500);
			},
			complete: function(){
				$('#form .btn-submit').removeAttr("disabled");
			}
		});
	});

	//auto save form on switching tabs (if form is not processing and product id is not defined)
	$("#form > .nav li:not(.active) a").click(function(){
		if($('#form .btn-submit').attr("disabled") != "disabled" && $("#form_id_product").val() == 0){
			$("#form").submit();
		}
	});

	//form nested categories ------------------

	//remove all default category list
	$('#form_step1_id_category_default').find('option:not([value='+$('#form_step1_id_category_default').val()+'])').remove();

	//add to default categories select each category seleted
	$.each($("#form_step1_categories input[type=checkbox]:checked"), function(){
		addOrRemoveCategoryToDefaultCategorySelector($(this));
	});

	$(document).on( "click", "#form_step1_categories input[type=checkbox]", function() {
		if($("#form_step1_categories input[type=checkbox]:checked").length == 0){
			return false;
		}
		addOrRemoveCategoryToDefaultCategorySelector($(this));
	});

	function addOrRemoveCategoryToDefaultCategorySelector(obj){
		if (obj.is (':checked')){
			if(obj.val() != $('#form_step1_id_category_default').val()){
				$('#form_step1_id_category_default').append('<option value="'+ obj.val() +'">'+ obj.parent().text() +'</option>');
			}
		} else  {
			$('#form_step1_id_category_default').find('option[value='+obj.val()+']').remove();
		}
	}
	//end form nested categories ------------------

	//subform add category ----------------------
	$("#form_step1_new_category button.submit").click(function(){
		$.ajax({
			type: "POST",
			url: $('#form_step1_new_category').attr('data-action'),
			data: {
				'form[category][name]': $('#form_step1_new_category_name').val(),
				'form[category][id_parent]': $('#form_step1_new_category_id_parent').val(),
				'form[_token]': $('#form #form__token').val()
			},
			beforeSend: function() {
				$('#form_step1_new_category button.submit').attr("disabled", "disabled");
				$('#form_step1_new_category .help-block').remove();
				$("#form_step1_new_category *.has-error" ).removeClass("has-error");
			},
			success: function(response){
				$("#form_step1_new_category_name").val("");

				var html = '<li><div class="checkbox"><label><input type="checkbox" name="form[step1][categories][tree][]" value="'+response.category.id+'">'+response.category.name[1]+'</label></div></li>';
				var parentElement = $("#form_step1_categories input[value="+response.category.id_parent+"]" ).parent().parent();
				if(parentElement.next('ul').length == 0){
					html = '<ul>'+html+'</ul>';
					parentElement.append(html);
				}else{
					parentElement.next('ul').append(html);
				}
			},
			error: function(response){
				$.each(jQuery.parseJSON(response.responseText), function(key, errors){
					console.log(key, errors)
					var html = '<span class="help-block"><ul class="list-unstyled">';
					$.each(errors, function(key, error){
						html += '<li><span class="glyphicon glyphicon-exclamation-sign"></span> ' + error + '</li>';
					});
					html += '</ul></span>';

					$('#form_step1_new_'+key).parent().append(html);
					$('#form_step1_new_'+key).parent().addClass('has-error');
				});
			},
			complete: function(){
				$('#form_step1_new_category button.submit').removeAttr("disabled");
			}
		});
	});
	//end subform add category ----------------------

	//manage default supplier value
	var defaultSupplierRow = $("#form_step6_default_supplier").parent().parent();
	if($("#form_step6_suppliers input:checked").length <= 1){
		defaultSupplierRow.hide();
	}
	$("#form_step6_suppliers input").change(function(){
		if($("#form_step6_suppliers input").length >= 1 && $("#form_step6_suppliers input:checked").length >= 1){
			defaultSupplierRow.show();
		} else {
			defaultSupplierRow.hide();
		}
	});

	//Features collection form
	var collectionFeaturesHolder = $('ul.featureCollection');
	var addFeatureLink = $('<a href="#" class="btn btn-primary btn-xs">+</a>');
	var removeFeatureLink = $('<a href="#" class="delete btn btn-primary btn-xs">-</a>');
	var newFeatureItem = $('<li class="add"></li>').append(addFeatureLink);

	collectionFeaturesHolder.append(newFeatureItem);

	addFeatureLink.on('click', function(e) {
		e.preventDefault();
		addFeature(collectionFeaturesHolder, newFeatureItem, false);
	});

	addFeature(collectionFeaturesHolder, newFeatureItem, true);

	$(document).on("click", "ul.featureCollection a.delete", function(e) {
		e.preventDefault();
		$(this).parent().remove();
	});

	$(document).on("change", "ul.featureCollection select.feature-selector", function() {
		var selector = $(this).parent().parent().parent().find('.feature-value-selector');
		$.ajax({
			url: $(this).attr('data-action')+'/'+$(this).val(),
			success: function(response){
				selector.empty();
				$.each(response, function(key, val){
					selector.append($("<option></option>").attr("value", key).text(val));
				});
			}
		});
	});

	function addFeature(collectionHolder, newItem, isDefault) {
		var newForm = collectionHolder.attr('data-prototype').replace(/__name__/g, collectionHolder.children().length);
		newItem.before($('<li></li>').prepend(
			isDefault ? '' : removeFeatureLink,
			newForm
		));
	}

	//update price and shorcut price field on change
	$("#form_step1_price_shortcut, #form_step2_price").keyup(function(){
		$(this).attr('id') == 'form_step1_price_shortcut' ? $("#form_step2_price").val($(this).val()) : $("#form_step1_price_shortcut").val($(this).val());
	});

	//manage combination generator form
	var engineCombinationGenerator = new Bloodhound({
		datumTokenizer: function(d) {
			return Bloodhound.tokenizers.whitespace(d.label);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: {
			url: $("#form_step3_attributes").attr("data-prefetch"),
			cache: false
		}
	});

	$('#form_step3_attributes').tokenfield({typeahead: [
		null, {
			source: engineCombinationGenerator,
			display: 'label'
		}]
	});

	//store attributes in input when add a token
	$('#form_step3_attributes').on('tokenfield:createdtoken', function(e) {
		$("#attributes-generator").append('<input type="hidden" id="attribute-generator-'+e.attrs.value+'" class="attribute-generator" value="'+e.attrs.value+'" name="options['+e.attrs.data.id_group+']['+e.attrs.value+']" />');
	});

	//remove stored attributes input when remove token
	$('#form_step3_attributes').on('tokenfield:removedtoken', function(e) {
		$("#attribute-generator-"+e.attrs.value).remove();
	});

	$("#create-combinations").click(function(){

		var combinationRowMaker = function(attribute){
			var combinationsLength = $("#accordion_combinations").children().length;
			var form = $("#accordion_combinations").attr('data-prototype').replace(/__name__/g, combinationsLength);

			var row = '<div class="panel panel-default combination" id="attribute___id_attribute__">\
				<div class="panel-title">\
					<div class="col-lg-6 pull-left">\
						<a data-toggle="collapse" data-parent="#accordion_combinations" href="#combination_form___name__">__combination_name__</a>\
					</div>\
				</div>\
				<div class="col-lg-2 pull-right text-right">\
					<a class="btn btn-default btn-sm" data-toggle="collapse" data-parent="#accordion_combinations" href="#combination_form___name__">Open</a>\
					<a href="__delete_link__" class="btn btn-default btn-sm delete" data="__id_attribute__">delete</a>\
				</div>\
				<div class="clearfix"></div>\
				<div id="combination_form___name__" class="panel-collapse collapse">\
					<div class="panel-body">__form__</div>\
				</div>\
			</div>';

			var newRow = row.replace(/__name__/g, combinationsLength);
			newRow = newRow.replace(/__combination_name__/g, attribute.name);
			newRow = newRow.replace(/__delete_link__/g, $("#accordion_combinations").attr("data-action-delete")+'/'+attribute.id_product_attribute+'/'+$("#form_id_product").val());
			newRow = newRow.replace(/__id_attribute__/g, attribute.id_product_attribute);
			newRow = newRow.replace(/__form__/g, form);

			$("#accordion_combinations").prepend(newRow);
			$("#form_step3_combinations_"+combinationsLength+"_id_product_attribute").val(attribute.id_product_attribute);
		};

		$.ajax({
			type: "POST",
			url: $("#form_step3_attributes").attr("data-action"),
			data: $("#attributes-generator input.attribute-generator, #form_id_product").serialize(),
			beforeSend: function() {
				$('#create-combinations').attr("disabled", "disabled");
			},
			success: function(response){
				$.each(response, function(key, val){
					combinationRowMaker(val);
				});

				//initialize form
				$("input.attribute-generator").remove();
				$('#attributes-generator div.token').remove();
			},
			complete: function(){
				$('#create-combinations').removeAttr("disabled");
			}
		});
	});

	$(document).on("click", "#accordion_combinations .delete", function(e) {
		e.preventDefault();
		var combinationElem = $("#attribute_"+$(this).attr("data"));
		$.ajax({
			type: "GET",
			url: $(this).attr('href'),
			beforeSend: function() {
				$(this).attr("disabled", "disabled");
			},
			success: function(response){
				combinationElem.remove();
				showSuccessMessage(response.message);
			},
			error: function(response){
				showErrorMessage(jQuery.parseJSON(response.responseText).message);
			},
			complete: function(){
				$(this).removeAttr("disabled");
			}
		});
	});

	$("div#form_step1_categories").categorytree();
});
