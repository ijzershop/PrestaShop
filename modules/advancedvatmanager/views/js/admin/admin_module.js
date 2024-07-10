/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */

var position_available = [];
var messages = [];

$(document).ready(function() {
    
    $('[data-toggle="tooltip"]').tooltip();// Tooltip
    // Toggle checkbox
    $(".avm_switch").bootstrapSwitch();
    
    // Slick modal before performing actions
    $('.avm_modal_perform_actions').SlickModals({
        popup_animation: 'zoomIn',
        popup_position: 'center',
        popup_allowMultipleInstances: true,
        popup_css: {
            'width': '100%',
            'height': '100%',
            'max-width': '950px',
            'overflow-y': 'scroll',
            'overflow-x': 'hidden',
            'background': '#fff',
            'padding': '0px',
            'margin': 'auto',
            'border': '5px solid #3498db'
        },
        popup_enableESC: false,
        popup_closeButtonEnable: false,
        overlay_isVisible: true,        
        overlay_css: {
            'background': 'rgba(0, 0, 0, 0.4)'
        },
        overlay_closesPopup: false,
        mobile_breakpoint: '420px',
        mobile_position: 'center',
        mobile_css: {
            'width': '100%',
            'height': '100%',
            'padding': '25px',
            'margin': '0',
            'background': '#fff'
        }
    });
    // Slick modal to check VAT by VIES or GOV.UK
    $('.avm_modal_check_vat').SlickModals({
        popup_animation: 'zoomIn',
        popup_position: 'center',
        popup_allowMultipleInstances: true,
        popup_css: {
            'width': '100%',
            'height': '500px',
            'max-width': '650px',
            'overflow-x': 'hidden',
            'background': '#fff',
            'padding': '20px',
            'margin': 'auto',
            'border': '5px solid #3498db'
        },
        popup_enableESC: true,
        popup_closeButtonEnable: true,
        popup_closeButtonEnable: true,
        popup_closeButtonStyle: 'cancel simple',
        popup_closeButtonAlign: 'right',
        popup_closeButtonPlace: 'outside',
        overlay_isVisible: true,        
        overlay_css: {
            'background': 'rgba(0, 0, 0, 0.4)'
        },
        overlay_closesPopup: true,
        mobile_breakpoint: '420px',
        mobile_position: 'center',
        mobile_css: {
            'width': '100%',
            'height': '100%',
            'padding': '25px',
            'margin': '0',
            'background': '#fff'
        }
    });
});

/*
* Build modal messages
*  
*/
function displayModalMessage(title = null, message = null, type, id = null, time = false)
{
    let position = 0;
    let modal_count = $('.avm_modal_messages').parent('.sm-popup').length;
    if (id === null) {
        id = $.now();
    }
    if (message !== null) {   
        if (modal_count >= 1) {
            position = (modal_count * 220);
            if (!$.isEmptyObject(position_available) && modal_count >= 1) {
                position = Math.min.apply(Math, position_available);
                position_available.splice($.inArray(position, position_available), 1);    
            }   
        }
        else {
            position_available = [];
            position = 0;
        }
        // If modal exists, only add content
        if ($('#avm_modal_messages_'+id).length > 0) {
            $('#avm_modal_messages_'+id+' .content').append(message+'<br /><br />');      
        }
        // Create new modal
        else {
            $('body').append('<div id="avm_modal_messages_'+id+'" class="avm_modal_messages" data-sm-init="true" data-state="'+type+'"><div class="title"></div><div class="content"></div></div>');            
            $('#avm_modal_messages_'+id+' .content').html(message+'<br /><br />');
            $('#avm_modal_messages_'+id).attr('data-state', type);  
            if (title === null) {
                if (type == 'success') {
                    title = success;
                }
                else if (type == 'warning') {
                    title = warning;    
                }
                else if (type == 'danger') {
                    title = danger;    
                }
                else if (type == 'info') {
                    title = info;    
                }
            }
            $('#avm_modal_messages_'+id+' .title').html(title); 
        }
        // Clean spaces
        //$('#avm_modal_messages_'+id+' .content').html($('#avm_modal_messages_'+id+' .content').html().trim());
        // Slickmodal for messages
        $('#avm_modal_messages_'+id).SlickModals({
            popup_type: 'instant',
            popup_delayedTime: '0.5s',
            popup_wrapperClass: 'avm_message_popup_'+id,
            popup_allowMultipleInstances: true,
            popup_autoClose: (time !== false?true:false),
            popup_autoCloseAfter: (time !== false?time+'s':''),
            popup_animation: 'slideRight',
            popup_position: 'topRight',
            popup_closeButtonEnable: true,
            popup_closeButtonPlace: 'inside',
            popup_draggableEnable: false,
            popup_css: {
                'min-width': '350px',
                'height': 'auto',
                'background': 'transparent',
                'padding': '0',
                'margin': '10px',
                'animation-duration': '2s',
                'text-align': 'center',
                'top': position+'px'
            },
            overlay_closesPopup: true,
            overlay_isVisible: false,
            mobile_breakpoint: '480px',
            mobile_position: 'topCenter',
            mobile_css: {
                'width': '100%',
                'height': 'auto',
                'background': 'transparent',
                'padding': '0',
                'margin': 'auto',
                'animation-duration': '2s',
                'text-align': 'center',
                'top': position+'px'
            },
            callback_afterClose: function () {
                position_available.push($('#avm_modal_messages_'+id).parent('.sm-popup').position().top);  
                $('#avm_modal_messages_'+id).parent().parent('.sm-wrapper').remove();  
                $('#avm_modal_messages_'+id).SlickModals('destroy');                
            },
        });
        $('#avm_modal_messages_'+id).SlickModals('openPopup', 'instant');
    }   
}


/*
* Display messages
*  
*/
function displayMessages(content, time = false)
{
    var aux = [];
    // Displays messages after completing AJAX processes.
    if (!$.isEmptyObject(content)) {
        $.each(content, function(i, index) {
            $.each(index, function(msg_class, messages) {
                $.each(messages, function(type, message) {
                    $.each(message, function(i, string) {
                        // Remove duplicated messages.
                        if ($.inArray(string, aux) == -1) {
                            aux.push(string);
                            displayModalMessage(null, string.trim(), type, type, time);  
                        }
                    });
                });
            });
        });     
    }    
}

/*
* Display message on live meanwhile processes are working
*  
*/
function displayMessageOnLive(messages_content = false)
{
    // Display messages
    if (messages_content !== false && !$.isEmptyObject(messages_content)) {
        $.each(messages_content, function(type, message){
            if ($.inArray(message, messages) === -1) {
                displayModalMessage(null, message , type, type, false);      
            }                
        });
    }
}