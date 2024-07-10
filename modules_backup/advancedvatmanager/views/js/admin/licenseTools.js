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
    // Insert hyphens in license number
    $('#licenseRegistration').on('input', function(e) {
        $('#licenseRegistration').val($('#licenseRegistration').val().toUpperCase());       
        $(document).keypress(function (event) {
            if ($('#licenseRegistration').val().length <= 28 && $.inArray($('#licenseRegistration').val().length, [5,11,17,23,29])!== -1 && $.inArray(event.keyCode, [8,46,189])=== -1) {
                $('#licenseRegistration').val($('#licenseRegistration').val()+'-');            
            }
        });
    });
});