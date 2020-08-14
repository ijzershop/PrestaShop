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

	$.fn.dpLang = function(){

		function expandLangs(event)
		{
			if(event.type == 'focusin'){
				$(this).addClass('expanded');
				$('.dp_lang_container.expanded').not(this).removeClass('expanded');
			}else if($(event.currentTarget).is('html')){
				$('.dp_lang_container.expanded').removeClass('expanded');
			}
		}

		function collapseLangs(event)
		{
			if(event.keyCode == 27){
				$(this).closest('.dp_lang_container').removeClass('expanded');
			}
		}

		function saveLangInput(event)
		{
			var $this = $(this);
			if ($this.hasClass('dp_no_ajax')) return;
			var dp_input_lang = $this.closest('.dp_input_lang');
			var object_class = dp_input_lang.data('class');
			var id_object = +dp_input_lang.data('id_' + object_class);
			var object = new window['dp_' + object_class](id_object);
			var id_lang = +$this.data('id_lang');
			var name = $this.data('name');
			var value = $this.val();
			object.setTrans(id_lang, name, value);
		}

		var handled = !!$('html').data('dp_handled');
		if (!handled){
			$(document).on('focus', '.dp_lang_container', expandLangs)
			.on('click', '.dp_lang_container', function(event){
				event.stopPropagation();
			})
			.on('change', '.dp_lang_input', saveLangInput)
			.on('keyup', '.dp_lang input', collapseLangs);

			$('html').click(expandLangs).data('dp_handled', true);
		}

		$('.dp_lang_container').on('click', function(){
			event.stopPropagation();
		});

	};

	}( jQuery ));