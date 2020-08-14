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
	dp_admin.setTabText();
});

var dp_admin = {

	id_tab: '#link-ModuleDynamicproduct',
	container: '#product-tab-content-ModuleDynamicproduct',

	init_tinymce: false,

	init: function () {
		dp_admin.initContainer();
		dp_combinations.init();
		dp_visibility.init();
		TnQuery.dpAjaxTable($('.dp_ajax_table'));
		TnQuery.dpDndTable($('.dp_dnd_table'));
		$('.dp_add_btn').dpAddButton();
		$('.dp_del_btn').dpDelButton();
		$('.dp_lang_table').dpLang();
		dp_admin.initEquations();
		dp_admin.handleEvents();
		dp_admin.triggerEvents();
		dp_admin.initTinyMCE();
		dp_admin.initSelect();
		dp_proportions.init();
	},

	initContainer: function () {
		dp_admin.container = $(dp_admin.container);
		if (TnCompat.isSeven()) {
			dp_admin.container = $('#module_dynamicproduct');
			dp_admin.container.addClass('dp_style');
		}
	},

	setTabText: function () {
		$(dp_admin.id_tab).text(dp_tab_text).addClass('dp-tab');
	},

	initEquations: function () {
		if (typeof tinyMCE === 'undefined') {
			setTimeout(dp_admin.initEquations, 100);
			return;
		}
		$('.dp_equation_container').each(function () {
			var id_attribute = +$(this).data('id_attribute');
			eq = new dp_equation($(this), id_attribute);
		});
	},

	handleEvents: function () {
		if (dp_handled) {
			return false;
		}
		dp_handled = true;
		dp_admin.container
			.on('change', '.dp_change_val', dp_admin.dpChangeVal)
			.on('change', '.dp_cfg', dp_admin.ajaxConfig)
			.on('click', '.dp_unit_value', dp_admin.openUnitValue)

			.on('click', '#dp_load_config', dp_admin.loadConfig)
			.on('click', '#dp_copy_config', dp_admin.copyConfig)
      .on('click', '#dp_load_field', dp_admin.loadField)
      .on('click', '#dp_load_common_field', dp_admin.loadCommonField)

			.on('click', '.dp_slide .panel-heading', dp_admin.toggleSlide)
			.on('click', '.dp_product_popup', dp_admin.openProductPopup)

			.on('click', '.dp_field_image', dp_admin.startFieldImageUpload)

			.on('click', '.dp_add_favorite_btn', dp_admin.addFieldToFavorites)
			.on('click', '.dp_remove_favorite_btn', dp_admin.removeFieldFromFavorites)

			.on('click', '.dp_add_common_btn', dp_admin.addFieldToCommonFields)
			.on('click', '.dp_remove_common_btn', dp_admin.removeFieldFromCommonFields)
		;

		$(document)
			.on('change', '.dp_file', dp_admin.startUpload)
			.on('click', '.dp_u_delete', dp_admin.deleteUpload)

			.on('click', '.dp_close_unit_value', dp_admin.closeUnitValue)
			.on('click', '.dp_close_dropdown_options', dp_admin.closeDropDownOptions)
			.on('click', '.dp_close_radio_options', dp_admin.closeRadioOptions)
			.on('click', '.dp_close_thumbnails_options', dp_admin.closeThumbnailsOptions)

			.on('click', '.dp_unit_values .dp_upload img', dp_admin.triggerUpload)
		;

		$('#dp_iframe').on('load', dp_admin.handleUpload);
		$(window).on('load', dp_admin.windowLoad);
	},

	triggerEvents: function () {
		dp_admin.container.find('.dp_change_val').each(function () {
			dp_admin.dpChangeVal.call(this);
		});
	},

	windowLoad: function () {
		if (!dp_admin.init_tinymce) {
			dp_admin.initTinyMCE();
		}
	},

	openProductPopup: function (e) {
		e.stopPropagation();
		if (!!$.prototype.fancybox) {
			e.preventDefault();
			var url = $(this).prop('href');
			var anchor = '';

			if (url.indexOf('#') != -1) {
				anchor = url.substring(url.indexOf('#'), url.length);
				url = url.substring(0, url.indexOf('#'));
			}

			if (url.indexOf('?') != -1) {
				url += '&';
			} else {
				url += '?';
			}

			$.fancybox({
				padding: 0,
				width: 1087,
				height: 610,
				type: 'iframe',
				href: url + 'content_only=1' + anchor,
				helpers: {
					overlay: {
						locked: false
					}
				}
			});
			return false;
		}
	},

	initTinyMCE: function () {
		if (typeof tinyMCE === 'undefined' && !dp_admin.init_tinymce) {
			setTimeout(dp_admin.initTinyMCE, 100);
			return;
		}
		var config = {
			selector: ".dp_equation_content",
			plugins: '',
			toolbar: "undo redo",
			menubar: false,
			statusbar: false,
			height: 35,
			content_css: dp_dir + 'views/css/admin/tinymce.css',
			init_instance_callback: dp_admin.initTinyIcons
		};

		try {
			tinyMCE.init(config);
			dp_admin.init_tinymce = true;
		} catch (e) {
			dp_admin.init_tinymce = true;
		}
	},

	initTinyIcons: function (editor) {
		if (!TnCompat.isSeven()) {
			return true;
		}
		var editorDom = editor.editorContainer;

		if (editorDom) {
			var jQButtonSelector = '.mce-toolbar:not(.mce-menubar) > .mce-container-body > .mce-container > div > .mce-widget > button > i';
			var editorButtonsIcons = $(editorDom).find(jQButtonSelector);

			if (editorButtonsIcons) {

				var materialIconAssoc = {
					'mce-i-undo': '<i class="material-icons">undo</i>',
					'mce-i-redo': '<i class="material-icons">redo</i>',
				};

				$.each(editorButtonsIcons, function (index, value) {
					// Clean extra class on object to keep the only one we need
					$(this).removeClass('mce-ico');
					var tinyIcoClass = $(this).attr('class');

					if (typeof materialIconAssoc[ tinyIcoClass ] != 'undefined') {
						$(this).replaceWith(materialIconAssoc[ tinyIcoClass ]);
					}
				});
			}
		}
	},

	initSelect: function () {
		dp_admin.container.find('select.dp_chosen').each(function (k, item) {
			$(item).chosen({disable_search_threshold: 0, width: '250px'});
		});
	},

	loadConfig: function () {
		var id_product_load = DpTools.parseInt($('#dp_load_product').val());
		if (!id_product_load) {
			alert(dp_message.no_product);
			$('#dp_load_product_chosen').focus();
			return false;
		}

		if (!confirm(dp_message.warn_config)) {
			return false;
		}

		var data = {};
		data[ 'id_product' ] = TnCompat.getProductID();
		data[ 'id_product_load' ] = id_product_load;
		data[ 'no_msg' ] = true;
		DpTools.ajaxSave('load_config', data, function () {
			showSuccessMessage(dp_message.loaded_config);
			dp_admin.reloadTab();
		});
		return false;
	},

	copyConfig: function () {
		var id_product_load = DpTools.parseInt($('#dp_target_category').val());
		if (!id_product_load) {
			alert(dp_message.no_category);
			$('#dp_target_category_chosen').focus();
			return false;
		}

		if (!confirm(dp_message.warn_copy_config)) {
			return false;
		}

		var data = {};
		data[ 'id_product' ] = TnCompat.getProductID();
		data[ 'id_target_category' ] = id_product_load;
		data[ 'no_msg' ] = true;
		DpTools.ajaxSave('copy_config', data, function () {
			showSuccessMessage(dp_message.copied_config);
		});
		return false;
	},

  loadField: function () {
    var id_favorite_field = DpTools.parseInt($('#dp_favorite_fields').val());
    if (!id_favorite_field) {
      alert(dp_message.no_field);
      $('#dp_favorite_fields_chosen').focus();
      return false;
    }

    var data = {};
    data[ 'id_product' ] = TnCompat.getProductID();
    data[ 'id_favorite_field' ] = id_favorite_field;
    DpTools.ajaxSave('load_field', data, function () {
      dp_admin.reloadTab();
    });
    return false;
  },

  loadCommonField: function () {
    var id_common_field = DpTools.parseInt($('#dp_common_fields').val());
    if (!id_common_field) {
      alert(dp_message.no_field);
      $('#dp_common_fields_chosen').focus();
      return false;
    }

    var data = {};
    data[ 'id_product' ] = TnCompat.getProductID();
    data[ 'id_field' ] = id_common_field;
    DpTools.ajaxSave('load_common_field', data, function () {
      dp_admin.reloadTab();
    });
    return false;
  },

  addFieldToFavorites: function () {
    var row = $(this).closest('tr');
    var id_field = row.data('id_field');
    var data = {};
    data[ 'id_field' ] = id_field;
    DpTools.ajaxSave('add_field_to_favorites', data, function () {
      row.addClass('dp_favorite_field');
    });
    return false;
  },

  removeFieldFromFavorites: function () {
    var row = $(this).closest('tr');
    var id_field = row.data('id_field');
    var data = {};
    data[ 'id_field' ] = id_field;
    DpTools.ajaxSave('remove_field_from_favorites', data, function () {
      row.removeClass('dp_favorite_field');
    });
    return false;
  },

  addFieldToCommonFields: function () {
    var row = $(this).closest('tr');
    var id_field = row.data('id_field');
    var data = {};
    data[ 'id_field' ] = id_field;
    DpTools.ajaxSave('add_field_to_common_fields', data, function () {
      row.addClass('dp_common_field');
    });
    return false;
  },

  removeFieldFromCommonFields: function () {
    var row = $(this).closest('tr');
    var id_field = row.data('id_field');
    var data = {};
    data[ 'id_field' ] = id_field;
    DpTools.ajaxSave('remove_field_from_common_fields', data, function () {
      row.removeClass('dp_common_field');
    });
    return false;
  },

	toggleSlide: function () {
		var parent = $(this).closest('.dp_slide');
		parent.toggleClass('dp_collapsed');
	},

	reloadTab: function (callback) {
		if (!TnCompat.isSeven()) {
			$('#product-tab-content-ModuleDynamicproduct').addClass('not-loaded');
			tabs_manager.display('ModuleDynamicproduct', 0);
		} else {
			var data = {
				action: 'reload_tab',
				id_product: TnCompat.getProductID()
			};
			dp_admin.container.load(dp_link, data);
		}
	},

	openUnitValue: function () {
		var row = $(this).closest('tr');
		var id_field = row.data('id_field');
		var visible = $('.dp_qtip_' + id_field).is(':visible');
		$('.dp_unit_value').qtip('hide');
		if (visible) {
			return false;
		}
		var data = {
			action: 'get_unit_value',
			id_field: id_field,
			init: row.find('[data-name="init"]').val()
		};
		$(this).qtip({
			id: 'dp_qtip_' + id_field,
			content: {
				text: function (event, api) {
					$.ajax({url: dp_link, data: data})
						.done(function (html) {
							api.set('content.text', html);
							$('.dp_unit_values').dpLang();
							dp_admin.ajaxForm(id_field);
							dp_admin.ajaxInputs(id_field);
							dp_admin.initColorPicker();
						})
						.fail(function (xhr, status, error) {
							api.set('content.text', status + ': ' + error);
						});
					return dp_message.loading;
				}
			},
			show: {
				event: 'click'
			},
			hide: false,
			position: {
				my: 'bottom center',
				at: 'top center',
				container: $('#content'),
				viewport: $(window)
			},
			style: {classes: 'qtip-bootstrap dp_qtip dp_style dp_qtip_' + id_field}
		}).qtip('show');
		return false;
	},

	closeUnitValue: function () {
		if (!confirm(dp_message.close)) {
			return false;
		}
		var id_field = $(this).data('id_field');
		$('.dp_unit_value_' + id_field).qtip('hide');
		return false;
	},

	closeDropDownOptions: function () {
		var id_field = $(this).data('id_field');
		$('.dp_unit_value_' + id_field).qtip('hide');
		return false;
	},

	closeRadioOptions: function () {
		var id_field = $(this).data('id_field');
		$('.dp_unit_value_' + id_field).qtip('hide');
		return false;
	},

	closeThumbnailsOptions: function () {
		var id_field = $(this).data('id_field');
		$('.dp_unit_value_' + id_field).qtip('hide');
		return false;
	},

	convertUnitValue: function () {
		var input = $(this);
		var table = input.closest('table');
		var name = input.data('name');
		var value = DpTools.parseFloat(input.val());
		table.find('.dp_input_' + name).each(function (i, input) {
			input = $(input);
			var row = input.closest('tr');
			var conversion = DpTools.parseFloat(row.data('conversion'), 1);
			var placeholder = DpTools.parseFloat(value / conversion);
			input.prop('placeholder', placeholder.toFixed(3));
		});
	},

	dpChangeVal: function () {
		var cls_name = $(this).data('target');
		var target = $(this).closest('tr').find('.dp_' + cls_name);
		var value = $(this).val();
		target.attr('rel', 'dp_changed_' + value);
		$('.dp_unit_value').qtip('hide');
	},

	ajaxConfig: function () {
		var data = {};
		data[ 'name' ] = $(this).data('name');
		data[ 'value' ] = DpTools.getValue(this);
		data[ 'value' ] = $(this).val();
		DpTools.ajaxSave('save_config', data, function () {
		});
		//return false;
	},

	startFieldImageUpload: function () {
		var id_field = $(this).closest('tr').data('id_field');
		var form = $('.dp_field_image_form');
		form.find('[name="id_field"]').val(id_field);
		form.find('[name="image"]').trigger('click');
		form.get(0).reset();
	},

	triggerUpload: function () {
		var id_object = $(this).data('id_object');
		var target = $(this).data('target');
		var form = $('.dp_' + target + '_form');
		form.find('[name=id_' + target + ']').val(id_object);
		form.find('[type=file]').click();
		return false;
	},

	startUpload: function () {
		$(this).next().click();
		$(this).closest('form').get(0).reset();
	},

	handleUpload: function () {
		var response = $('#dp_iframe').contents().find('body').text();
		var json = false;
		try {
			json = $.parseJSON(response);
		} catch (e) {
		}
		if (!json) {
			return false;
		}
		if (json.success) {
			DpTools.showSuccess();
			dp_admin.processUpload(json);
		} else {
			alert(json.error);
		}
	},

	processUpload: function (json) {
		if (json.action === 'field_image') {
			var id_field = json.id_field;
			var src = dp_dir + 'views/img/field/' + id_field + '-thumb.jpg?' + Math.random();
			$('tr.dp_tr_' + id_field).find('.dp_upload').removeClass('dp_empty').find('img').attr('src', src);
		}
		if (json.action === 'thumbnails_image') {
			var id_thumbnails_option = json.id_thumbnails_option;
			var src = dp_dir + 'views/img/thumbnails/' + id_thumbnails_option + '-thumb.jpg?' + Math.random();
			var src_full = dp_dir + 'views/img/thumbnails/' + id_thumbnails_option + '.jpg?' + Math.random();
			var dp_upload = $('tr.dp_thumbnails_option_' + id_thumbnails_option).find('.dp_upload');
			dp_upload.removeClass('dp_empty').find('img').attr('src', src);
			dp_upload.find('.dp_u_external').prop('href', src_full);
		}
		if (json.action === 'dropdown_image') {
			var id_dropdown_option = json.id_dropdown_option;
			var src = dp_dir + 'views/img/dropdown/' + id_dropdown_option + '-thumb.jpg?' + Math.random();
			var src_full = dp_dir + 'views/img/dropdown/' + id_dropdown_option + '.jpg?' + Math.random();
			var dp_upload = $('tr.dp_dropdown_option_' + id_dropdown_option).find('.dp_upload');
			dp_upload.removeClass('dp_empty').find('img').attr('src', src);
			dp_upload.find('.dp_u_external').prop('href', src_full);
		}
	},

	deleteUpload: function () {
		if (!confirm(dp_message.delete_image)) {
			return false;
		}
		var button = $(this);
		var target = button.data('target');
		var data = {};
		data[ 'id_' + target ] = $(this).closest('tr').data('id_' + target);
		DpTools.ajaxSave('delete_' + target + '_image', data, function (context, response) {
			if (response.success) {
				var src = dp_dir + 'views/img/';
				var empty = button.data('empty') || 'empty';
				src += empty + '.png';
				var dp_upload = button.closest('.dp_upload');
				dp_upload.addClass('dp_empty')
					.find('img').attr('src', src).css('background-color', '');
				dp_upload.find('.dp_u_external').prop('href', src);
			} else {
				alert(dp_message[ 'error' ]);
			}
		});
		return false;
	},

	ajaxForm: function (id_field) {
		var container = $('.dp_qtip_' + id_field);
		container.on('change', '[data-type]', function () {
			var value = $(this).val();
			var type = $(this).data('type');
			value = DpTools.clean(value, type, false);
			$(this).val(value);
		})
			.find('form:not(.dp_away)').ajaxForm({
			url: dp_link,
			dataType: 'json',
			complete: function (event) {
				$('.dp_unit_value_' + id_field).qtip('hide');
				if (event.responseJSON && event.responseJSON.init) {
					$('tr#dp_row_' + id_field).find('[data-name="init"]').val(event.responseJSON.init);
				}
				DpTools.showSuccess();
			}
		});
	},

	ajaxInputs: function (id_field) {
		var container = $('.dp_qtip_' + id_field);
		container.on('change', '.dp_ajax_input', function () {
			var input = $(this);
			var action = input.closest('.dp_ajax_table').data('class');
			var data = {
				id_field: input.closest('.dp_unit_values').data('id_field'),
				name: input.prop('name'),
				value: input.val()
			}
			DpTools.ajaxSave('save_' + action + '_input', data, this.respond);
		});
	},

	initColorPicker: function () {
		$('.dp_u_color').ColorPicker({
			color: '#F00',
			onBeforeShow: function () {
				$(this).ColorPickerSetColor($(this).data('color'));
			},
			onChange: function (hsb, hex, rgb) {
				var element = $($(this).data('colorpicker').el);
				var parent = element.parent();
				parent.find('input.dp_color_input').val('#' + hex);
				parent.find('img.dp_color_target').css('background-color', '#' + hex);
			},
			onSubmit: function (hsb, hex, rgb, element) {
				element = $(element);
				var parent = element.parent();
				parent.find('img.dp_color_target').css('background-color', '#' + hex);
				parent.find('.dp_u_color').data('color', '#' + hex);
				parent.find('input.dp_color_input').val('#' + hex).trigger('change');
				var src = dp_dir + 'views/img/pixel.png';
				parent.addClass('dp_empty').find('img').attr('src', src);
			}
		});
	}
};


$(window).on('load', function () {
	if (ps_module_dev) {
		$('#link-ModuleDynamicproduct').click();
		$('li#tab_hooks a').click();
	}
});

