/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */

$(document).ready(function(){
    // Set title and legend
    if ($('input[name="customer_address[vat_number]"]').length) {
        (advancedvatmanager.legend_input_avm)?$('input[name="customer_address[vat_number]"]').parent().find('small').remove():'';
        (advancedvatmanager.legend_input_avm)?$('input[name="customer_address[vat_number]"]').after('<small class="form-text">'+advancedvatmanager.legend_input_avm+'</small>'):'';
        (advancedvatmanager.title_input_avm)?$('input[name="customer_address[vat_number]"]').parent().parent().find('label').html('<label class="title">'+advancedvatmanager.title_input_avm+'</label>'):'';  
    }  
    if ($('input[name="vat_number"]').length) {
        (advancedvatmanager.legend_input_avm)?$('input[name="vat_number"]').parent().find('small').remove():'';
        (advancedvatmanager.legend_input_avm)?$('input[name="vat_number"]').after('<small class="form-text">'+advancedvatmanager.legend_input_avm+'</small>'):'';
        (advancedvatmanager.title_input_avm)?$('input[name="vat_number"]').parent().parent().find('label').html('<span class="title">'+advancedvatmanager.title_input_avm+'</span>'):'';  
    } 
    if (advancedvatmanager.PS1770) {
        $('form[name="customer_address"] button, form[id="address_form"] button').on('click', function(e){
            e.preventDefault();
            validateVATNumber(advancedvatmanager.vat_number_name, $('form[name="customer_address"]'));
        });
    } 
});

function validateVATNumber(input, form)
{    
    var success = false;
    $.ajax({
        url: advancedvatmanager.admin_ajax_url_advancedvatmanager,
    	type : 'POST',
        headers: { "cache-control": "no-cache" },
        dataType : 'json',
    	async: true,
        cache: false,
    	data : {
            controller: 'AdminVATValidation',
            ajax: true,
    		action: 'checkVATnumberAdminAddresses',
            country: $('[name="'+advancedvatmanager.country_name+'"]').val(),
            vat_number: $('[name="'+advancedvatmanager.vat_number+'"]').val(),
            id_customer: $('[name="'+advancedvatmanager.id_customer_field+'"]').val(),
            company: $('[name="'+advancedvatmanager.company+'"]').val(),
            address1: $('[name="'+advancedvatmanager.address1+'"]').val(),
            address2:$('[name="'+advancedvatmanager.address2+'"]').val(),
            postcode: $('[name="'+advancedvatmanager.postcode+'"]').val(),
            city: $('[name="'+advancedvatmanager.city+'"]').val(),
            address: advancedvatmanager.id_address
    	},
        beforeSend : function () {
            $('.invalid-feedback-container.advancedvatmanager').remove();
            $('form[name="customer_address"] button, form[id="address_form"] button').prop("disabled",true);
    	},
    	success : function (jsonData) {
            $('form[name="customer_address"] button, form[id="address_form"] button').prop("disabled",false);
            if (jsonData) {
                if (jsonData['success'] !== true) {
                    $.each(jsonData['message'], function(key, value) {
                        if (value['validation'] == 'error') {
                            $('[name="'+advancedvatmanager[key]+'"]').after('<div class="invalid-feedback-container advancedvatmanager"><div class="d-inline-block text-danger align-top"><i class="material-icons form-error-icon">error_outline</i></div><div class="d-inline-block"><div class="text-danger">'+value['message']+'</div></div></div>');
                            // Scroll to DNI field.
                            $('html, body').animate({ scrollTop: $('[name="'+advancedvatmanager[key]+'"]').parent().parent().position().top - 100 }, 1000); 
                        }
                    });
                }
                else {
                    // Submit form
                    if (!$('.invalid-feedback-container.advancedvatmanager').length) {
                         form.submit();
                    }
                }
            }
    	},
        error: function () {
             $('form[name="customer_address"], form[id="address_form"]').append(advancedvatmanager.error_msg);
        }
    });
}