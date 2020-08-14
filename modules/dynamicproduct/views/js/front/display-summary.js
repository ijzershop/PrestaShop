/**
* 2010-2018 Tuni-Soft - modifié 2/10/2014 13:33
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* It is available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future. If you wish to customize the module for your
* needs please refer to
* http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
* for more information.
*
* @author    Tuni-Soft
* @copyright 2010-2018 Tuni-Soft
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

var dynamicSummary = {

    selector: '.dp_cart.dp_seven_cart',

    init: function () {
	    dynamicSummary.handleEvents();
        dynamicSummary.displaySummary();
    },

    displaySummary: function () {
        if (dynamicSummary.summaryExists()) {
            $(dynamicSummary.selector).each(function () {
                var summary = $(this);
                var modal = summary.closest('.customization-modal');
                var anchor = modal.prev().hide();
                summary.insertBefore(anchor);
            });
        }
    },

    summaryExists: function () {
        return $(dynamicSummary.selector).length > 0;
    },

    handleEvents: function () {
	    prestashop.on('updatedCart', dynamicSummary.displaySummary);
    },

    triggerEvents: function () {

    }

};

$(dynamicSummary.init);