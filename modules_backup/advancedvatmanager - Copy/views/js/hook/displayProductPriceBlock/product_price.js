/**
 * 2017-2023 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2023 www.liewebs.com - Liewebs
 * 	@module Advanced VAT Manager
 */

$(document).ready(function(){
    if (advancedvatmanager.ps16) {
        let price_container = $('p.our_price_display').html();
        let price_text = $('div p.our_price_display').first().contents().eq(2).text();
        let fix_content = price_container.replace(price_text, '<br />'+advancedvatmanager.price_label_exempt);
        $('p.our_price_display').html(fix_content);
    }
    else {
        // Hide default price label
        let delivery_information = $('.tax-shipping-delivery-label').children();
        $('.tax-shipping-delivery-label').html(delivery_information);
    }
});