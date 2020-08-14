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

if (typeof TnQuery != 'object')
    var TnQuery = {};

TnQuery.dpDndTable = function(set){

	$(set).each(function(){

		var object_class = $(this).data('class');
		$(this).tableDnD({
			dragHandle: 'dp_drag',
			onDragClass: 'dp_dragged',
			onDrop: function(table, row) {
				var data = {};
				data['order'] = DpTools.getTableOrder($.tableDnD.currentTable);
				data['noclone'] = true;
				var context = 'order_' + object_class;
				DpTools.ajaxSave(context, data);
			},
		});
	});

	return this;
};