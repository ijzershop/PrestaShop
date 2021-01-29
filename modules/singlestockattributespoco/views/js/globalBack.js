/**
 * 2008 - 2020 Presto-Changeo
 *
 * MODULE Single Stock Attributes
 *
 * @author    Presto-Changeo <info@presto-changeo.com>
 * @copyright Copyright (c) permanent, Presto-Changeo
 * @license   Addons PrestaShop license limitation
 * @link      http://www.presto-changeo.com
 * @version   2.0.0
 *
 * NOTICE OF LICENSE
 *
 * Don't use this module on several shops. The license provided by PrestaShop Addons
 * for all its modules is valid only once for a single shop.
 *
 */

function loadSSAProducts() {
    $.ajax({
        type: 'POST',
        dataType : 'json',
        url: ssa_admin_controller,
        data: {
            ajax: true,
            action: 'loadProducts',
            random: ssa_random
        },
        success: function(response){
            if (response.error) {
                showErrorMessage(response.error);
            } else {
                $('.ssa-products-container').html(response.content);
            }
        }
    });
}

function loadSSACategories() {
    $.ajax({
        type: 'POST',
        dataType : 'json',
        url: ssa_admin_controller,
        data: {
            ajax: true,
            action: 'loadCategories',
            random: ssa_random
        },
        success: function(response){
            if (response.error) {
                showErrorMessage(response.error);
            } else {
                $('.ssa-categories-container').html(response.content);
            }
        }
    });
}

$(document).ready(function () {
    /* Fixing height and width for left / right column */
    $(".columns").each(function(){
        var
            $this = $(this),
            $leftColumn = $this.find(".left_column"),
            $rightColumn = $this.find(".right_column"),
            heightLeftColumn = $leftColumn.height(),
            heightRightColumn = $rightColumn.height();

        $leftColumn.add($rightColumn).css("height", function () {
            return heightLeftColumn > heightRightColumn ? heightLeftColumn : heightRightColumn;
        });

        if ($leftColumn.find("a.info_alert").length <= 0)
            $leftColumn.css("padding-right", function () {
                return $this.closest("#advanced_settings").length > 0 ? "0px" : "25px";
            });
    });
    
    $(document).on("click", "#main_menu .menu_item", function() {

        /* Add style to selected menu item */
        var $this = $(this);

        $this
            .siblings(".menu_item.selected").removeClass("selected")
            .end()
            .addClass("selected");
        
        /* Show / hide secondary menu */
        var secondaryMenu = $(this).attr('data-left-menu');
        $('#secondary_menu .menu').hide();
        $('#secondary_menu #' + secondaryMenu).show();
        
        var noOfVisibleMenu = false;
        $('#left_menu #secondary_menu .menu').each(function(){
            if ($(this).is(":visible"))
                noOfVisibleMenu = true;
        });

        var $secondaryMenu = $('#left_menu #secondary_menu');
        if (noOfVisibleMenu) {
            $('#left_menu #secondary_menu').css({
                "padding-top" : 0,
                "border" : "1px solid #d7dbde",
                "margin-top" : 30
            });
        } else {
            $('#left_menu #secondary_menu').css({
                "padding-top" : 15,
                "border" : "0px solid #d7dbde",
                "margin-top" : 0
            });
            
            var contentId = $(this).attr('data-content');
            $('.po_main_content').hide();
            $('#' + contentId).show();
        }
        
        $('.instructions_block').hide();
        
        /* Load secondary Menu functionality */
        var secondary_menu_item = $('#secondary_menu #' + secondaryMenu).find('.secondary_menu_item').first().attr('id');
        $('#'+secondary_menu_item).click();
        
        /* Display Left Contact US */
        $('.contact_form_left_menu').hide();
        if ($(this).attr('data-contact-us') == '1')
            $('.contact_form_left_menu').show();    
            
    });
    
    $(document).on('click', '#secondary_menu .secondary_menu_item' ,function() {
        var leftMenuItemId = $(this).attr('id');
        leftMenuItemId = leftMenuItemId.replace('secondary_menu_item', '');
        
        /* Add style to selected menu item */
        $('#secondary_menu .secondary_menu_item').removeClass('selected');
        $(this).addClass('selected');
        
        /* Hide / Show Instructions */
        $('.instructions_block').hide();
        var instructionsId = $(this).attr('data-instructions');
        $('#' + instructionsId).show();
        
        /* Hide / Show Block contents */
        var contentId = $(this).attr('data-content');
        console.log(contentId);
        $('.po_main_content').hide();
        $('#' + contentId).show();
    });
    
    $('#main_menu .menu_item').first().click();
    
    $(document).on('click', '.menu_header' ,function() {
        var classArrow = $(this).find('#left_menu_arrow').attr('class');
        if (classArrow == 'arrow_up') {
            $(this).find('span.arrow_up').attr('class', 'arrow_down');
            $(this).parent().find('.secondary_submenu').slideToggle('slow');
        } else if (classArrow == 'arrow_down') {
            $(this).find('span.arrow_down').attr('class', 'arrow_up');
            $(this).parent().find('.secondary_submenu').slideToggle('slow');
        
        }
    });
    
    $(document).on('click', '.display_more' ,function() {
        
        if (!$(this).hasClass('hide_more')) {
            $(this).parent().find('.hideADN').each(function(){
                if ($(this).hasClass('row_format'))
                    $(this).show();
            });
            
            $(this).hide();
            $(this).parent().find('.hide_more').show();
        } else {            
            $(this).parent().find('.hideADN').each(function(){
                if ($(this).hasClass('row_format'))
                    $(this).hide();
                if ($(this).hasClass('display_more'))
                    return false;
            });
            $(this).hide();
            $(this).parent().find('.display_more').not('.hide_more').show();
        }
    });
    

     $('#open_module_upgrade').fancybox({
            helpers : {
                overlay : {
                    locked : false,
                    css : {
                        'background' : 'transparent'
                    }
                }
            },
            'padding': 0,
            'closeBtn': true,
            'autoScale': true,
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 500,
            'speedOut': 300,
            'autoDimensions': true
    }).click();
    
    $('.info_alert').fancybox({
            helpers : {
                overlay : {
                    locked : false,
                    css : {
                        'background' : 'transparent'
                    }
                }
            },
            'padding': 0,
            'closeBtn': false,
            'autoScale': true,
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 500,
            'speedOut': 300,
            'autoDimensions': true
    });

    loadSSAProducts();
    loadSSACategories();

    $('#ssa_product').autocomplete(ssa_admin_controller,
    {
        minChars: 2,
        max: 50,
        width: 500,
        formatItem: function (data) {
            return data[0]+ '. '+data[2] + '-' + data[1];
        },
        scroll: false,
        multiple: false,
        extraParams: {
            action : 'productSearch',
            id_lang : id_lang,
            random : ssa_random,
            ajax: true
        }
    });

    $('#ssa_category').autocomplete(ssa_admin_controller,
    {
        minChars: 2,
        max: 50,
        width: 500,
        formatItem: function (data) {
            return data[0]+ '. '+data[1];
        },
        scroll: false,
        multiple: false,
        extraParams: {
            action : 'categorySearch',
            id_lang : id_lang,
            random : ssa_random,
            ajax: true
        }
    });

    $('#add-ssa-product').on('click', function(){
        $.ajax({
            type: 'POST',
            dataType : 'json',
            url: ssa_admin_controller,
            data: {
                ajax: true,
                action: 'addProduct',
                random: ssa_random,
                id_product: $('#ssa_product').val()
            },
            success: function(response){
                if (response.error) {
                    showErrorMessage(response.error);
                } else {
                    loadSSAProducts();
                    $('#ssa_product').val('');
                    showSuccessMessage(response.message);
                }
            }
        });
    });

    $('#add-ssa-category').on('click', function(){
        $.ajax({
            type: 'POST',
            dataType : 'json',
            url: ssa_admin_controller,
            data: {
                ajax: true,
                action: 'addCategory',
                random: ssa_random,
                id_category: $('#ssa_category').val()
            },
            success: function(response){
                if (response.error) {
                    showErrorMessage(response.error);
                } else {
                    loadSSACategories();
                    $('#ssa_category').val('');
                    showSuccessMessage(response.message);
                }
            }
        });
    });

    $(document).on('click', '.remove-ssa-product', function(){
        var id_product = $(this).attr('data-id-product');
        $.ajax({
            type: 'POST',
            dataType : 'json',
            url: ssa_admin_controller,
            data: {
                ajax: true,
                action: 'removeProduct',
                random: ssa_random,
                id_product: id_product
            },
            success: function(response){
                if (response.error) {
                    showErrorMessage(response.error);
                } else {
                    loadSSAProducts();
                    showSuccessMessage(response.message);
                }
            }
        });

        return false;
    });

    $(document).on('click', '.remove-all-ssa-products', function(){
        $.ajax({
            type: 'POST',
            dataType : 'json',
            url: ssa_admin_controller,
            data: {
                ajax: true,
                action: 'removeAllProducts',
                random: ssa_random
            },
            success: function(response){
                if (response.error) {
                    showErrorMessage(response.error);
                } else {
                    loadSSAProducts();
                    showSuccessMessage(response.message);
                }
            }
        });

        return false;
    });

    $(document).on('click', '.remove-ssa-category', function(){
        var id_category = $(this).attr('data-id-category');
        $.ajax({
            type: 'POST',
            dataType : 'json',
            url: ssa_admin_controller,
            data: {
                ajax: true,
                action: 'removeCategory',
                random: ssa_random,
                id_category: id_category
            },
            success: function(response){
                if (response.error) {
                    showErrorMessage(response.error);
                } else {
                    loadSSACategories();
                    showSuccessMessage(response.message);
                }
            }
        });

        return false;
    });

    $(document).on('click', '.remove-all-ssa-categories', function(){
        $.ajax({
            type: 'POST',
            dataType : 'json',
            url: ssa_admin_controller,
            data: {
                ajax: true,
                action: 'removeAllCategories',
                random: ssa_random
            },
            success: function(response){
                if (response.error) {
                    showErrorMessage(response.error);
                } else {
                    loadSSACategories();
                    showSuccessMessage(response.message);
                }
            }
        });

        return false;
    });

    $('#ssa_products_type').on('change', function(){
        $.ajax({
            type: 'POST',
            dataType : 'json',
            url: ssa_admin_controller,
            data: {
                ajax: true,
                action: 'updateSettings',
                random: ssa_random,
                products_type: $(this).val()
            },
            success: function(response){
                if (response.error) {
                    showErrorMessage(response.error);
                } else {
                    showSuccessMessage(response.message);
                }
            }
        });
    });
});