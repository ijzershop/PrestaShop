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

TnQuery.dpAjaxTable = function(set){

	$(set).each(function(){

		var object_class = $(this).data('class');
		var table = $(this);

		$(this).off('change').on('change', 'input[data-name], select[data-name]', function(){
			if($(this).hasClass('dp_lang_input')) return;
			var name = $(this).data('name');
			var value = $(this).val();
			//synchronize other inputs with the same name
			$(this).closest('td').find('[data-name='+name+']').val(value);
			if(this.type == 'text'){
				//clean the value
				var type = $(this).data('type') || false;
				if(type){
					value = DpTools.clean(value, type);
					$(this).val(value);
				}
			}
			var id_object = $(this).closest('tr').data('id_' + object_class);
			var object = new window['dp_' + object_class](id_object);
			object.setValue(name, value);
		});

		$(this).off('click', 'a.dp_check[data-name]').on('click', 'a.dp_check[data-name]', function(){
			var name = $(this).data('name');
			var value = +!+ $(this).data('value');
			var id_object = $(this).closest('tr').data('id_' + object_class);
			var object = new window['dp_' + object_class](id_object);
			object.setValue(name, value);
			$(this)	.data('value', value)
					.toggleClass('action-enabled', !!value)
					.toggleClass('action-disabled', !value)
					.find('i.icon-eye-open').toggleClass('hidden', !value).end()
					.find('i.icon-eye-close').toggleClass('hidden', !!value);
			return false;
		});

		// exclusive values
		$(this).off('click', 'a.dp_exclusive[data-name]').on('click', 'a.dp_exclusive[data-name]', function(){
			var name = $(this).data('name');
			var value = +!+ $(this).data('value');
			var id_object = $(this).closest('tr').data('id_' + object_class);
			var object = new window['dp_' + object_class](id_object);
			object.setValue(name, value);
			$(this)	.data('value', value)
					.toggleClass('action-enabled', !!value)
					.toggleClass('action-disabled', !value)
					.find('i.icon-eye-open').toggleClass('hidden', !value).end()
					.find('i.icon-eye-close').toggleClass('hidden', !!value);
			// set other item values to 0
			table.find('a.dp_exclusive[data-name="'+name+'"]').not(this).each(function(){
				$(this) .data('value', 0).removeClass('action-enabled').addClass('action-disabled')
						.find('i.icon-eye-open').addClass('hidden').end()
						.find('i.icon-eye-close').removeClass('hidden');
			});
			var collection = window['dp_' + object_class + 's'];
			$.each(collection, function(){
				if (this['id_' + object_class] != id_object)
					this[name] = 0;
			});
			return false;
		});
	});

	return this;
};