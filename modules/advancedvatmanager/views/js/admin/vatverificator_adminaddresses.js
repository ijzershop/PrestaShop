/**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
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
            validateVATNumber(advancedvatmanager.input_name_avm, $('form[name="customer_address"]'));
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
            vat_number: $('[name="'+advancedvatmanager.input_name_avm+'"]').val(),
            id_customer: $('[name="'+advancedvatmanager.id_customer_field+'"]').val(),
            company: $('[name="'+advancedvatmanager.company_name+'"]').val(),
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
                    // If company is not checked by option
                    if (jsonData['company'] === true) {
                        $('[name="'+advancedvatmanager.input_name_avm+'"]').after('<div class="invalid-feedback-container advancedvatmanager"><div class="d-inline-block text-danger align-top"><i class="material-icons form-error-icon">error_outline</i></div><div class="d-inline-block"><div class="text-danger">'+jsonData['message']+'</div></div></div>');
                        // Scroll to DNI field.
                        $('html, body').animate({ scrollTop: $('[name="'+advancedvatmanager.input_name_avm+'"]').parent().parent().position().top - 100 }, 1000);
                    }
                    else {
                        $('[name="'+advancedvatmanager.company_name+'"]').after('<div class="invalid-feedback-container advancedvatmanager"><div class="d-inline-block text-danger align-top"><i class="material-icons form-error-icon">error_outline</i></div><div class="d-inline-block"><div class="text-danger">'+jsonData['message']+'</div></div></div>');
                        // Scroll to Company field.
                        $('html, body').animate({ scrollTop: $('[name="'+advancedvatmanager.company_name+'"]').parent().parent().position().top - 100 }, 1000);
                    }
                }
                else {
                    // Submit form
                    if (!$('.invalid-feedback-container.dniverificator').length) {
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