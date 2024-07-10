/**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 */

$(document).ready(function(){
    if (advancedvatmanager.disable_cart_nonvoec) {
        // Display error message for Non VOEC product when add to cart is performed.
        if (typeof prestashop !== 'undefined') {
          prestashop.on(
            'updateProduct',
            function (event) {
                if (advancedvatmanager.controller == 'product') {
                    if ($('.alert.alert-danger.ajax-error').length) {
                        $('.alert.alert-danger.ajax-error').html('');
                        $('.alert.alert-danger.ajax-error').hide();
                    }
                }
                if (advancedvatmanager.controller == 'cart') {
                    if ($('#notifications .alert-danger').length) {
                        $('#notifications .alert-danger').html('');
                        $('#notifications .alert-danger').hide();
                    }         
                }
            }
          );
          prestashop.on(
            'updateCart',
            function (event) {
                if (event.resp.errors.length) {
                    if (advancedvatmanager.controller == 'product') {
                        $('.alert.alert-danger.ajax-error').html('');
                        $.each(event.resp.errors, function( key, value ) {  
                            $('.alert.alert-danger.ajax-error').append(value);
                            $('.alert.alert-danger.ajax-error').show();
                        });
                    }
                    if (advancedvatmanager.controller == 'cart') {  
                        $('#notifications .alert-danger').html('');
                        $.each(event.resp.errors, function( key, value ) {  
                            $('#notifications .alert-danger').append(value);
                            $('#notifications .alert-danger').show();
                            setTimeout(function(){
                                $('.cart-detailed-actions a').addClass('disabled');
                            }, 850);   
                        }); 
                    }
                }
            }
          );
        }
    }
});