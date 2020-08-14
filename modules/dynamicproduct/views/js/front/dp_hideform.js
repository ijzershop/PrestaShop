/**
 * 2010-2018 Tuni-Soft
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

$(function () {

	var ids = [ 'page_container', 'content' ];

  var isermatic_customization = $('[href="#product-customizable-tab-content"]');
  if (isermatic_customization.length) {
    isermatic_customization.hide();
    return;
  }

	var ttpcustomization = $('[href="#ttpcustomization"]');
	if (ttpcustomization.length) {
		ttpcustomization.hide();
		return;
	}

	//remove #customizationForm if no customization fields
	if ($('#customizationForm').length) {
		if (!$('#customizationForm').find('.customizationUploadLine').length) {
			var section = $('#customizationForm').closest('section');
			var id_section = section.prop('id');
			if ($.inArray(id_section, ids) == -1) {
				section.remove();
			} else {
				$('#customizationForm').closest('.customization_block').remove();
				$('#customizationForm').closest('.tab-content').remove();
			}
			$ul = $('a[href="#idTab10"]').closest('ul');
			$('a[href="#tab6"]').closest('li').remove();
			$('a[href="#idTab10"]').closest('li').remove();
			$('a[href="#idTab10"]').remove();
			$('#idTab10').remove();
			$('[aria-controls="customization"]').parent().remove();
			$ul.find('li:eq(0) a').click();
		}

		if (!$('.customizableProductsText').find('.customizationUploadLine').length) {
			$('.customizableProductsText').remove();
		}
	}
	$('.product-customizable-tab').remove();

	var save_customization_btn = $('[name="saveCustomization"]');
	if (save_customization_btn.length) {
		var id_tab = save_customization_btn.closest('.tab-pane').prop('id');
		save_customization_btn.closest('.tab-content').remove();
		var tab_link = $('[href="#' + id_tab + '"]');
		var tabs = tab_link.closest('.nav-tabs');
		if (tabs.find('li').length < 2) {
			tabs.remove();
		} else {
			tab_link.parent().remove();
			tabs.find('li:eq(0) a').click();
		}
	}

});