/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */
$(document).ready(function(e){       
    $('button#checkVAT_btn').on('click', function(){  
        checkVATTool();                         
    });
    if ($('input#vat_number').val() == '' || !$('input[name="vat_select"]').prop('checked')) {
        $('button#checkVAT_btn').prop('disabled', true);    
    }
    $('input#vat_number').on('input', function(e){
        if ($('input#vat_number').val() == '' || !$('input[name="vat_select"]').is(':checked')) {
            $('button#checkVAT_btn').prop('disabled', true);    
        }
        else {
            $('button#checkVAT_btn').prop('disabled', false);    
        }
                
    });
    $('input[name="vat_select"]').on('click', function(){
        if ($('input#vat_number').val() != '') {
            $('button#checkVAT_btn').prop('disabled', false);    
        } 
        if ($('input#eu_uk_vat').is(':checked')) {
            $('small#field_desc').html(vat_number_desc);    
        }
        else if ($('input#norw_vat').is(':checked')) {
            $('small#field_desc').html(norway_number_desc);    
        }       
    });
    $('input#eu_uk_vat').on('click', function(){
        $(this).attr('checked', true);
        $('input#norw_vat').removeAttr('checked');       
    });
    $('input#norw_vat').on('click', function(){
        $(this).attr('checked', true);
        $('input#eu_uk_vat').removeAttr('checked');       
    });
    
    
    $(document).ajaxSend(function(e, xhr, opt){
        // Prevent notifications ajax (defaul Prestashop process) to avoid overload system.
        if (opt.url.toLowerCase().indexOf("notifications") >= 0) {
            e.preventDefault();
            xhr.abort();
        }     
    });
});


/** 
* Perform Check VAT in VIES or GOV.UK
*/
function checkVATTool()
{
    $.ajax({
        url: ajax_url_checkVAT,
        id: 'checkVATTool',
        type : 'POST',
        headers: { "cache-control": "no-cache" },
        dataType : 'json',
        async: true,
        cache: false,
        data : {
            controller: 'AdminCheckVAT',
            ajax: true,
        	action: 'checkVATTool',
            vat_number: $('input[name="vat_number"]').val(),
            vat_select: $('input[name="vat_select"]:checked').val(),
        },
        beforeSend : function () { 
            $('.loading_container').show();
            $('button#checkVAT_btn').prop('disabled', true);
            $('.vat-result .invalid, .vat-result .valid, .vat-result').hide();
            $('span.vat_number').html('');
            $('span.country_iso').html('');
            $('span.country').html('');
            $('span.company').html('');
            $('span.address').html('');
            $('span.website').html('');
            $('span.request_date').html('');
            $('span.check_system').html('');
            $('span.valid_message span.invalid_message').html('');       
        },
        success : function (jsonData) {
            console.log(jsonData);
            $('.loading_container').hide();
            $('button#checkVAT_btn').prop('disabled', false);
            $('.vat-result').show();    
            if (jsonData['valid'] === true) {
                $('span.valid_message').html(jsonData['message']);  
                $('.vat-result .valid').show();
            }
            else {
                $('span.invalid_message').html(jsonData['message']); 
                $('.vat-result .invalid').show();    
            }
            $('span.vat_number').html(jsonData['vat_iso']+jsonData['vat_number']);
            $('span.country_iso').html(jsonData['vat_iso']);
            $('span.country').html(jsonData['country']);
            $('span.company').html(jsonData['company']);
            $('span.address').html(jsonData['address']);
            $('span.website').html(jsonData['website']);
            $('span.request_date').html(jsonData['request_date']);
            $('span.check_system').html(jsonData['check_system']);  
        },
        error : function (jqXHR, textStatus, errorThrown) {
            $('.loading_container').hide();
            $('span.invalid_message').html(errorThrown);
            $('.vat-result').show();
            $('.vat-result .invalid').show();  
        }
    });
}