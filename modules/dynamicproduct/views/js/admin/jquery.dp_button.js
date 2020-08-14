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

(function ( $ ) {

	$.fn.dpAddButton = function(){

		$(this).each(function(){

			var object_class = $(this).data('class');

			$(this).off('click').on('click', function(){
				var parent = $(this).data('parent');
				var id_parent = $(this).data('id_'+parent);
				var object_table = $(this).closest(".panel").find('table[data-class="'+object_class+'"]');
				var object = new window['dp_' + object_class](0);
				if (id_parent){
					object['id_'+parent] = id_parent;
				}
				var tr = object_table.find('tr.dp_tr_clone').clone();
				var table_bottom_row = object_table.find('.dp_bottom_row:eq(0)');
				if (!table_bottom_row.length) {
					tr.removeClass('dp_tr_clone').appendTo(object_table.find('tbody'));
				} else {
					tr.removeClass('dp_tr_clone').insertBefore(table_bottom_row);
				}
				$('.dp_lang_table').dpLang();
				$(object).off('dp.saved').on('dp.saved', function(event, object){
					DpTools.fillDataRow(tr, object, object_class, true);
				});
				object.save();
				TnQuery.dpDndTable($('.dp_dnd_table'));
				return false;
			});
		});

		return this;
	};

	$.fn.dpDelButton = function(){

		$(this).each(function(){

			var object_class = $(this).data('class');

			$(this).off('click').on('click', function(){
				var object_table = $(this).closest(".panel").find('table[data-class="'+object_class+'"]');
				if(!confirm(dp_message['confirm'])) return false;
				var tr = $(this).closest('tr');
				var id_object = tr.data('id_' + object_class);
				var object = new window['dp_' + object_class](id_object);
				$(object).off('dp.deleted').on('dp.deleted', function(event, object){
					tr.fadeOut('fast', function(){$(this).remove()});
					DpTools.updateCount(object_class);
				});
				object.remove();
				return false;
			});
		});

		return this;
	};

}( jQuery ));