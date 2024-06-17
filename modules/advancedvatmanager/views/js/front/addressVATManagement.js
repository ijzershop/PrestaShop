/**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 */

var skipValidation;
var ajaxProcess;
var company_required; 
var button;

// Prevent vatnumber module ajax.
$(document).ajaxSend(function(e, xhr, opt){
    if (opt.url.toLowerCase().indexOf("vatnumber") >= 0) {
        e.preventDefault();
        xhr.abort();
    }
});

$(function(){   
        if (typeof prestashop !== 'undefined') {
          prestashop.on(
            'updatedCart',
            function (event) {
                console.log(event);
            }
          );
        }
    if (advancedvatmanager.ps16) {   
        setVATAddressFormat();
        manageFields16(); 
        
    	$('select[name="id_country"]').on('change', function() {
            setVATAddressFormat();   
        });
        
        //After AJAX processes
        $(document).ajaxStop(function(event) {
            if (advancedvatmanager.ps16) { 
                setTimeout(function() {
                    $('#vat_number, #vat_number_block, #vat_number_block_invoice').show();
                    setVATAddressFormat();
                    manageFields16();
                }, 500); 
            }
        });
    }
    else {
        // In Prestashop default checkout page
        if (advancedvatmanager.controller == 'order' && advancedvatmanager.NOTALLOW_CHECKOUT_WITHOUT_VALIDATION && !advancedvatmanager.opc_presteamshop_enabled) {
            button = $('button[name="confirm-addresses"]').clone(true);// Clone submit button
            checkoutAddress();
            $('input[name="id_address_delivery"], input[name="id_address_invoice"]').on('change', function(){
                checkoutAddress();    
            });    
        }
        
    	$('select[name="id_country"]').on('change', function(e) {
            e.preventDefault();
            setVATAddressFormat17();   
        });
        
        // Manage company and vat_number fields
        AVMDisplayWithCompany17();
        setCompanyRequiredWithVAT17();
        
        if (typeof prestashop !== 'undefined') {
          prestashop.on(
            'updatedAddressForm',
            function (event) {
                setVATAddressFormat17();
            }
          );
        }
    }
});
function checkoutAddress()
{   
	ajaxProcess = $.ajax({
		type: 'POST',
		headers: {"cache-control": "no-cache"},
        id: 'checkoutAddress',
		url: advancedvatmanager.ajax_url_addressVAT,
        dataType : 'json',
        async: false,
        cache: false,
        data : {
            ajax: true,
            action: 'checkoutAddress',
            id_address_delivery: $("input[name='id_address_delivery']:checked").val(),
            id_address_invoice: $("input[name='id_address_invoice']").is(':checked')?$("input[name='id_address_invoice']:checked").val():$("input[name='id_address_delivery']:checked").val()
            
        },
        beforeSend : function () {  
        },
		success: function (jsonData) { 	  
            if (jsonData['address_invoice_errors'] !== false || jsonData['address_delivery_errors'] !== false) {
                $('button[name="confirm-addresses"]').remove();// Remove submit button
                $('#checkout-addresses-step span.step-edit').click();// Open addresses section
                if (jsonData['address_invoice_errors']) {
                    $('p[name="alert-invoice"]').html(jsonData['address_invoice_errors']['exception']).show();    
                }
                if (jsonData['address_delivery_errors']) {
                    $('p[name="alert-delivery"]').html(jsonData['address_delivery_errors']['exception']).show();    
                }
            }
            else {
                if (!button.length) {
                    $('input#not-valid-addresses').before(button);
                }    
            }
           if (!jsonData['not_allow_checkout']) {
                $('aside#notifications').html('');
            }
            else {
                $('aside#notifications').html('<div class="container"><article class="alert alert-danger" role="alert" data-alert="danger"><ul><li>'+jsonData['not_allow_checkout']+'</li></ul></article></div>');
            }    
        }
    });
}
function setVATAddressFormat17(focus = false)
{
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id_address')) {
        var id_address = searchParams.get('id_address')    
    }
    else {
        var id_address = 0;
    }
	ajaxProcess = $.ajax({
		type: 'POST',
		headers: {"cache-control": "no-cache"},
        id: 'setVATAddressFormat17',
		url: advancedvatmanager.ajax_url_addressVAT,
        dataType : 'json',
        async: false,
        cache: false,
        data : {
            ajax: true,
            action: 'updateAddressForm',
            data_form: $("form").serializeArray(),
        	id_country: $('select[name="id_country"]').val(),
            id_address: id_address,
            company: $('input[name="company"]').val(),
            vat_number: $('input[name="vat_number"]').val(),
            token: $('input[name="token"]').val(),
            form_has_continue_button: $('button[type="submit"]').hasClass('continue'),
            php_self: advancedvatmanager.controller
        },
        beforeSend : function () {  
        },
		success: function (jsonData) { 	  
		    $('.js-address-form').html(jsonData['address_form']);
            if (focus) {
                if ($('input[name="'+focus+'"]').length) {
                    $('input[name="'+focus+'"]').focus();
                    $('input[name="'+focus+'"]')[0].setSelectionRange($('input[name="'+focus+'"]').val().length * 2, $('input[name="'+focus+'"]').val().length * 2);
                }
            }
            AVMDisplayWithCompany17();
            setCompanyRequiredWithVAT17()
       }
    });
}
function setVATAddressFormat(focus = false)
{
	$.ajax({
		type: 'POST',
		headers: {"cache-control": "no-cache"},
        id: 'setVATAddressFormat',
		url: advancedvatmanager.ajax_url_addressVAT,
        dataType : 'json',
        async: false,
        cache: false,
        global: false,
        data : {
            ajax: true,
            action: 'updateAddressForm16',
        	id_country: $('select[name="id_country"]').val(),
            company: $('input[name="company"]').val(),
            vat_number: $('input[name="vat_number"]').val(),
            token: $('input[name="token"]').val(),
            form_has_continue_button: $('button[type="submit"]').hasClass('continue'),
            php_self: advancedvatmanager.controller
        },
        beforeSend : function () {  
        },
		success: function (jsonData) {
            company_required = jsonData['company_required'];
            skipValidation = jsonData['skipValidation'];

            // If VAT field exists in Address Format then display it
            if (jsonData['vat_field_exists']) {
                displayVATField();
            }
            else {
                hideVATField();  
            }
            
			if (jsonData['skipValidation'] === false) {			 
                if (advancedvatmanager.vat_field == 'required') {
                    $('input[name="vat_number"]').prop('required', true);
                    $('input[name="vat_number"]').addClass('is_required');
                    if ($('label[for="vat-number"] sup').length == 0) {
                        $('label[for="vat-number"]').append(' <sup>*</sup>');
                    }    
                }
                else {
                    $('input[name="vat_number"]').prop('required', false);
                    $('input[name="vat_number"]').removeClass('is_required');
                    $('label[for="vat-number"] sup').remove(); 
                } 
                // Set company field legend
    		    if ($('input[name="company"]').length) {
                    if (advancedvatmanager.company_legend != '') {
                        if ($('.company_desc').length) {
                            $('.company_desc').html(advancedvatmanager.company_legend);     
                        }
                        else {
                            $('input[name="company"]').after('<small class="company_desc">'+advancedvatmanager.company_legend+'</small>');       
                        } 
                    }
                }
                // Set VAT number field label and description
                if (advancedvatmanager.label != '') {
                    $('label[for="vat-number"]').html(advancedvatmanager.label); 
                }
                if (advancedvatmanager.legend != '') {
                    if ($('.vat_number_desc').length) {
                        $('.vat_number_desc').html(advancedvatmanager.legend);     
                    }
                    else {
                        $('input[name="vat_number"]').after('<small class="vat_number_desc">'+advancedvatmanager.legend+'</small>');     
                    }
                }
                
                if (advancedvatmanager.display_with_company) {
                    if ($('input[name="company"]').length && $('input[name="company"]').val().length) {
                        displayVATField();    
                    }
                    else {
                        hideVATField();    
                    }
                }
                
                if (advancedvatmanager.company_validation) {
                    if ($('input[name="vat_number"]').length && $('input[name="vat_number"]').val().length > 0) {
                        // When vat_number is not empty put company as required field
                        $('input[name="company"]').prop('required', true);
                        $('input[name="company"]').addClass('is_required');
                        if ($('label[for="company"] sup').length == 0) {
                            $('label[for="company"]').append(' <sup>*</sup>');      
                        }
                    }
                    else {
                        $('input[name="company"]').prop('required', false);
                        $('input[name="company"]').removeClass('is_required');
                        $('label[for="company"] sup').remove();
                    }
                }
                
                
                if (focus) {
                    if ($('input[name="'+focus+'"]').length) {
                        $('input[name="'+focus+'"]').focus();
                        $('input[name="'+focus+'"]')[0].setSelectionRange($('input[name="'+focus+'"]').val().length * 2, $('input[name="'+focus+'"]').val().length * 2);
                    }
                }               
                // Prevent vatnumber module ajax.
                $(document).ajaxSend(function(e, xhr, opt){
                    if (opt.url.toLowerCase().indexOf("vatnumber") >= 0) {
                        e.preventDefault();
                        xhr.abort();
                    }
                });
			}
            else {
                // Restore original fields
                $('.company_desc').remove();
                $('.vat_number_desc').remove();
                if (jsonData['company_required']) {
                    $('input[name="company"]').prop('required', true);
                    $('input[name="company"]').addClass('is_required');
                    if ($('label[for="company"] sup').length == 0) {
                        $('label[for="company"]').append(' <sup>*</sup>');
                    }
                }
                else {
                    $('input[name="company"]').prop('required', false);
                    $('input[name="company"]').removeClass('is_required');
                    $('label[for="company"] sup').remove();
                }
                if (jsonData['vat_required']) {
                    $('input[name="vat_number"]').prop('required', true);
                    $('input[name="vat_number"]').addClass('is_required');
                    if ($('label[for="vat-number"] sup').length == 0) {
                        $('label[for="vat-number"]').append(' <sup>*</sup>');
                    }
                }
                else {
                    $('input[name="vat_number"]').prop('required', false);
                    $('input[name="vat_number"]').removeClass('is_required');
                    $('label[for="vat-number"] sup').remove();
                }    
            }
       }
    });
}

function manageFields16()
{
    if (advancedvatmanager.display_with_company) {
        if ($('input[name="company"]').length) {
            $(document).on('change', 'input[name="company"]', function(){
                setVATAddressFormat('company'); 
            });
        }
    }
    if (advancedvatmanager.company_validation) {
        $(document).on('change', 'input[name="vat_number"]', function(){
            setVATAddressFormat('vat_number');    
        });
    }
}

function AVMDisplayWithCompany17()
{
    if (advancedvatmanager.display_with_company) {
        if ($('input[name="company"]').length) {
            $('input[name="company"]').on('blur', function(){
                if ($(this).val().length == 1) {
                    setVATAddressFormat17('company');
                } 
                else if ($(this).val().length == 0) {
                    setVATAddressFormat17('company');
                } 
            });
            if ($('input[name="company"]').val().length == 0) {
                $('input[name="company"]').on('blur', function(){
                    if ($(this).val().length > 1) {
                        setVATAddressFormat17('company');
                    }
                });
            }
            $('input[name="company"]').on('change', function(){
                if ($(this).val().length > 1) {
                    setVATAddressFormat17('company');
                } 
            });
        }
    }
}

function setCompanyRequiredWithVAT17()
{
    if (advancedvatmanager.company_validation) {
        if ($('input[name="vat_number"]').length) {
            $('input[name="vat_number"]').on('blur', function(){
                if ($(this).val().length == 1) {
                    setVATAddressFormat17('vat_number'); 
                } 
                else if ($(this).val().length == 0) {
                    setVATAddressFormat17('vat_number');      
                } 
            });
            if ($('input[name="vat_number"]').val().length == 0) {
                $('input[name="vat_number"]').on('blur', function(){
                    if ($(this).val().length > 1) {
                        setVATAddressFormat17('vat_number');
                    }
                });
            }
            $('input[name="vat_number"]').on('change',  function(){
                if ($(this).val().length > 1) {
                    setVATAddressFormat17('vat_number');
                } 
            });
        }
    }
}

function hideVATField()
{
    $('input[name="vat_number"]').val('');
    $('input[name="vat_number"]').prop('required', false);
    $('input[name="vat_number"]').removeClass('is_required');
    $('#vat_area').hide();
    $('#vat_number').hide(); 
    if (!advancedvatmanager.company_required) {
        $('input[name="company"]').prop('required', false);
        $('input[name="company"]').removeClass('is_required');
        $('label[for="company"] sup').remove();
    }
}

function displayVATField()
{
    let html_vat = '<div id="vat_area"><div id="vat_number"><div class="form-group"><label for="vat-number">'+advancedvatmanager.vat_number_label+'</label><input type="text" class="form-control validate" data-validate="isGenericName" id="vat-number" name="vat_number" value=""></div></div></div>';
    if ($('#vat_area').length > 0 || $('#vat_number').length)  {
        $('#vat_area').show();
		$('#vat_number').show(); 
    }
    else {
        $('input[name="company"]').parent().append(html_vat); 
        $('#vat_area').show();
		$('#vat_number').show();   
    }  
}

// Override functions from default ps16 to hide vat_number field when company field is empty.
function vat_number()
{
	return false;
}

function vat_number_ajax()
{
    return false;    
}