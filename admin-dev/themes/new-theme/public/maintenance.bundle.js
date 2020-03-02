window["maintenance"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 331);
/******/ })
/************************************************************************/
/******/ ({

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

var $ = window.$;

/**
 * This class init TinyMCE instances in the back-office. It is wildly inspired by
 * the scripts from js/admin And it actually loads TinyMCE from the js/tiny_mce
 * folder along with its modules. One improvement could be to install TinyMCE via
 * npm and fully integrate in the back-office theme.
 */

var TinyMCEEditor = function () {
  function TinyMCEEditor(options) {
    _classCallCheck(this, TinyMCEEditor);

    options = options || {};
    this.tinyMCELoaded = false;
    if (typeof options.baseAdminUrl == 'undefined') {
      if (typeof window.baseAdminDir != 'undefined') {
        options.baseAdminUrl = window.baseAdminDir;
      } else {
        var pathParts = window.location.pathname.split('/');
        pathParts.every(function (pathPart) {
          if (pathPart !== '') {
            options.baseAdminUrl = '/' + pathPart + '/';

            return false;
          }

          return true;
        });
      }
    }
    if (typeof options.langIsRtl == 'undefined') {
      options.langIsRtl = typeof window.lang_is_rtl != 'undefined' ? window.lang_is_rtl === '1' : false;
    }
    this.setupTinyMCE(options);
  }

  /**
   * Initial setup which checks if the tinyMCE library is already loaded.
   *
   * @param config
   */


  _createClass(TinyMCEEditor, [{
    key: 'setupTinyMCE',
    value: function setupTinyMCE(config) {
      if (typeof tinyMCE === 'undefined') {
        this.loadAndInitTinyMCE(config);
      } else {
        this.initTinyMCE(config);
      }
    }

    /**
     * Prepare the config and init all TinyMCE editors
     *
     * @param config
     */
    // initTinyMCE(config) {
    //   config = Object.assign({
    //     selector: '.rte',
    //     plugins: 'align colorpicker link image filemanager table media placeholder advlist code table autoresize',
    //     browser_spellcheck: true,
    //     toolbar1: 'code,colorpicker,bold,italic,underline,strikethrough,blockquote,link,align,bullist,numlist,table,image,media,formatselect',
    //     toolbar2: '',
    //     external_filemanager_path: config.baseAdminUrl + 'filemanager/',
    //     filemanager_title: 'File manager',
    //     external_plugins: {
    //       'filemanager': config.baseAdminUrl + 'filemanager/plugin.min.js'
    //     },
    //     language: iso_user,
    //     content_style : (config.langIsRtl ? 'body {direction:rtl;}' : ''),
    //     skin: 'prestashop',
    //     menubar: false,
    //     statusbar: false,
    //     relative_urls: false,
    //     convert_urls: false,
    //     entity_encoding: 'raw',
    //     extended_valid_elements: 'em[class|name|id],@[role|data-*|aria-*]',
    //     valid_children: '+*[*]',
    //     valid_elements: '*[*]',
    //     rel_list:[
    //       { title: 'nofollow', value: 'nofollow' }
    //     ],
    //     editor_selector :'autoload_rte',
    //     init_instance_callback: () => { this.changeToMaterial(); },
    //     setup : (editor) => { this.setupEditor(editor); },
    //   }, config);

    //   if (typeof config.editor_selector != 'undefined') {
    //     config.selector = '.' + config.editor_selector;
    //   }

    //   // Change icons in popups
    //   $('body').on('click', '.mce-btn, .mce-open, .mce-menu-item', () => { this.changeToMaterial(); });

    //   tinyMCE.init(config);
    //   this.watchTabChanges(config);
    // }
    // 

  }, {
    key: 'initTinyMCE',
    value: function initTinyMCE(config) {
      var _this = this;

      if (typeof base_url == "undefined") {
        // detect the root url
        var base_url = location.protocol + '//' + location.host + '/';
        // detect localhost
        // the value must include your local window.location.hostname
        var LOCAL_DOMAINS = ["localhost", "127.0.0.1", "ijzershop176.local"];
        if (LOCAL_DOMAINS.includes(window.location.hostname)) {
          var tbpKey = 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q=';
        } else {
          var tbpKey = 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q='; // replace with your production server key
        }
      }

      config = Object.assign({
        selector: '.rte',
        plugins: ['link', 'image', 'table', 'media', 'advlist', 'code', 'table', 'autoresize', 'bootstrap'],
        browser_spellcheck: true,
        toolbar: "undo redo code image| bold italic underline strikethrough | fontselect fontsizeselect formatselect styleselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments | bootstrap",
        toolbar2: false,
        contextmenu: "bootstrap",
        bootstrapConfig: {
          language: iso_user,
          url: base_url + 'js/tiny_mce/plugins/bootstrap/',
          iconFont: 'fontawesome5',
          imagesPath: '/upload',
          key: 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q=',
          enableTemplateEdition: false
        },
        editorStyleFormats: {
          textStyles: true, // true or false
          blockStyles: true, // true or false
          containerStyles: true, // true or false
          responsive: ['xs', 'sm'], // xs sm md lg
          spacing: ['all', 'x', 'y', 'top', 'right', 'bottom', 'left'] // all x y top right bottom left
        },

        style_formats_autohide: true,
        language: iso_user,
        content_style: lang_is_rtl === '1' ? "body {direction:rtl;}" : "",
        skin: "oxide",
        themes: "silver",
        menubar: false,
        statusbar: false,
        relative_urls: false,
        convert_urls: false,
        entity_encoding: "raw",
        extended_valid_elements: "em[class|name|id],@[role|data-*|aria-*]",
        valid_children: "+*[*]",
        valid_elements: "*[*]",
        rel_list: [{
          title: 'nofollow',
          value: 'nofollow'
        }],
        images_upload_handler: function images_upload_handler(blobInfo, success, failure) {
          var xhr, formData;
          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open('POST', '/custom_uploader/upload.php');

          var file = document.querySelectorAll('.tox-form input')[0].files[0];
          formData = new FormData();
          formData.append('path', '');
          formData.append('path_thumb', '');
          formData.append('file', file, file.name);
          xhr.send(formData);
          xhr.onload = function () {
            var json;

            if (xhr.status != 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }
            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            success(json.location);
          };
        },
        editor_selector: 'autoload_rte',
        init_instance_callback: function init_instance_callback() {
          _this.changeToMaterial();
        },
        setup: function setup(editor) {
          _this.setupEditor(editor);
        }
      }, config);

      if (typeof config.editor_selector != 'undefined') {
        config.selector = '.' + config.editor_selector;
      }

      // Change icons in popups
      //$('body').on('click', '.mce-btn, .mce-open, .mce-menu-item', () => { this.changeToMaterial(); });

      tinyMCE.init(config);
      this.watchTabChanges(config);
    }

    /**
     * Setup TinyMCE editor once it has been initialized
     *
     * @param editor
     */

  }, {
    key: 'setupEditor',
    value: function setupEditor(editor) {
      var _this2 = this;

      editor.on('loadContent', function (event) {
        _this2.handleCounterTiny(event.target.id);
      });
      editor.on('change', function (event) {
        tinyMCE.triggerSave();
        _this2.handleCounterTiny(event.target.id);
      });
      editor.on('blur', function () {
        tinyMCE.triggerSave();
      });
    }

    /**
     * When the editor is inside a tab it can cause a bug on tab switching.
     * So we check if the editor is contained in a navigation and refresh the editor when its
     * parent tab is shown.
     *
     * @param config
     */

  }, {
    key: 'watchTabChanges',
    value: function watchTabChanges(config) {
      $(config.selector).each(function (index, textarea) {
        var translatedField = $(textarea).closest('.translation-field');
        var tabContainer = $(textarea).closest('.translations.tabbable');

        if (translatedField.length && tabContainer.length) {
          var textareaLocale = translatedField.data('locale');
          var textareaLinkSelector = '.nav-item a[data-locale="' + textareaLocale + '"]';

          $(textareaLinkSelector, tabContainer).on('shown.bs.tab', function () {
            var editor = tinyMCE.get(textarea.id);
            if (editor) {
              //Reset content to force refresh of editor
              editor.setContent(editor.getContent());
            }
          });
        }
      });
    }

    /**
     * Loads the TinyMCE javascript library and then init the editors
     *
     * @param config
     */

  }, {
    key: 'loadAndInitTinyMCE',
    value: function loadAndInitTinyMCE(config) {
      var _this3 = this;

      if (this.tinyMCELoaded) {
        return;
      }

      this.tinyMCELoaded = true;
      var pathArray = config.baseAdminUrl.split('/');
      pathArray.splice(pathArray.length - 2, 2);
      var finalPath = pathArray.join('/');
      window.tinyMCEPreInit = {};
      window.tinyMCEPreInit.base = finalPath + '/js/tiny_mce';
      window.tinyMCEPreInit.suffix = '.min';
      $.getScript(finalPath + '/js/tiny_mce/tinymce.min.js', function () {
        _this3.setupTinyMCE(config);
      });
    }

    /**
     * Replace initial TinyMCE icons with material icons
     */

  }, {
    key: 'changeToMaterial',
    value: function changeToMaterial() {
      var materialIconAssoc = {
        'mce-i-code': '<i class="material-icons">code</i>',
        'mce-i-none': '<i class="material-icons">format_color_text</i>',
        'mce-i-bold': '<i class="material-icons">format_bold</i>',
        'mce-i-italic': '<i class="material-icons">format_italic</i>',
        'mce-i-underline': '<i class="material-icons">format_underlined</i>',
        'mce-i-strikethrough': '<i class="material-icons">format_strikethrough</i>',
        'mce-i-blockquote': '<i class="material-icons">format_quote</i>',
        'mce-i-link': '<i class="material-icons">link</i>',
        'mce-i-alignleft': '<i class="material-icons">format_align_left</i>',
        'mce-i-aligncenter': '<i class="material-icons">format_align_center</i>',
        'mce-i-alignright': '<i class="material-icons">format_align_right</i>',
        'mce-i-alignjustify': '<i class="material-icons">format_align_justify</i>',
        'mce-i-bullist': '<i class="material-icons">format_list_bulleted</i>',
        'mce-i-numlist': '<i class="material-icons">format_list_numbered</i>',
        'mce-i-image': '<i class="material-icons">image</i>',
        'mce-i-table': '<i class="material-icons">grid_on</i>',
        'mce-i-media': '<i class="material-icons">video_library</i>',
        'mce-i-browse': '<i class="material-icons">attachment</i>',
        'mce-i-checkbox': '<i class="mce-ico mce-i-checkbox"></i>'
      };

      $.each(materialIconAssoc, function (index, value) {
        $('.' + index).replaceWith(value);
      });
    }

    /**
     * Updates the characters counter
     *
     * @param id
     */

  }, {
    key: 'handleCounterTiny',
    value: function handleCounterTiny(id) {
      var textarea = $('#' + id);
      var counter = textarea.attr('counter');
      var counterType = textarea.attr('counter_type');
      var max = tinyMCE.activeEditor.getBody().textContent.length;

      textarea.parent().find('span.currentLength').text(max);
      if ('recommended' !== counterType && max > counter) {
        textarea.parent().find('span.maxLength').addClass('text-danger');
      } else {
        textarea.parent().find('span.maxLength').removeClass('text-danger');
      }
    }
  }]);

  return TinyMCEEditor;
}();

exports.default = TinyMCEEditor;

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tinymceEditor = __webpack_require__(31);

var _tinymceEditor2 = _interopRequireDefault(_tinymceEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.$; /**
                   * 2007-2019 PrestaShop and Contributors
                   *
                   * NOTICE OF LICENSE
                   *
                   * This source file is subject to the Open Software License (OSL 3.0)
                   * that is bundled with this package in the file LICENSE.txt.
                   * It is also available through the world-wide-web at this URL:
                   * https://opensource.org/licenses/OSL-3.0
                   * If you did not receive a copy of the license and are unable to
                   * obtain it through the world-wide-web, please send an email
                   * to license@prestashop.com so we can send you a copy immediately.
                   *
                   * DISCLAIMER
                   *
                   * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
                   * versions in the future. If you wish to customize PrestaShop for your
                   * needs please refer to https://www.prestashop.com for more information.
                   *
                   * @author    PrestaShop SA <contact@prestashop.com>
                   * @copyright 2007-2019 PrestaShop SA and Contributors
                   * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
                   * International Registered Trademark & Property of PrestaShop SA
                   */

$(function () {
  new _tinymceEditor2.default();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2IzMDc4ZWFlMmI1NGE0MGE5MjU/ZTRhOCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3RpbnltY2UtZWRpdG9yLmpzPzUyNmIqKiIsIndlYnBhY2s6Ly8vLi9qcy9wYWdlcy9tYWludGVuYW5jZS9pbmRleC5qcyJdLCJuYW1lcyI6WyIkIiwid2luZG93IiwiVGlueU1DRUVkaXRvciIsIm9wdGlvbnMiLCJ0aW55TUNFTG9hZGVkIiwiYmFzZUFkbWluVXJsIiwiYmFzZUFkbWluRGlyIiwicGF0aFBhcnRzIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInNwbGl0IiwiZXZlcnkiLCJwYXRoUGFydCIsImxhbmdJc1J0bCIsImxhbmdfaXNfcnRsIiwic2V0dXBUaW55TUNFIiwiY29uZmlnIiwidGlueU1DRSIsImxvYWRBbmRJbml0VGlueU1DRSIsImluaXRUaW55TUNFIiwiYmFzZV91cmwiLCJwcm90b2NvbCIsImhvc3QiLCJMT0NBTF9ET01BSU5TIiwiaW5jbHVkZXMiLCJob3N0bmFtZSIsInRicEtleSIsIk9iamVjdCIsImFzc2lnbiIsInNlbGVjdG9yIiwicGx1Z2lucyIsImJyb3dzZXJfc3BlbGxjaGVjayIsInRvb2xiYXIiLCJ0b29sYmFyMiIsImNvbnRleHRtZW51IiwiYm9vdHN0cmFwQ29uZmlnIiwibGFuZ3VhZ2UiLCJpc29fdXNlciIsInVybCIsImljb25Gb250IiwiaW1hZ2VzUGF0aCIsImtleSIsImVuYWJsZVRlbXBsYXRlRWRpdGlvbiIsImVkaXRvclN0eWxlRm9ybWF0cyIsInRleHRTdHlsZXMiLCJibG9ja1N0eWxlcyIsImNvbnRhaW5lclN0eWxlcyIsInJlc3BvbnNpdmUiLCJzcGFjaW5nIiwic3R5bGVfZm9ybWF0c19hdXRvaGlkZSIsImNvbnRlbnRfc3R5bGUiLCJza2luIiwidGhlbWVzIiwibWVudWJhciIsInN0YXR1c2JhciIsInJlbGF0aXZlX3VybHMiLCJjb252ZXJ0X3VybHMiLCJlbnRpdHlfZW5jb2RpbmciLCJleHRlbmRlZF92YWxpZF9lbGVtZW50cyIsInZhbGlkX2NoaWxkcmVuIiwidmFsaWRfZWxlbWVudHMiLCJyZWxfbGlzdCIsInRpdGxlIiwidmFsdWUiLCJpbWFnZXNfdXBsb2FkX2hhbmRsZXIiLCJibG9iSW5mbyIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwieGhyIiwiZm9ybURhdGEiLCJYTUxIdHRwUmVxdWVzdCIsIndpdGhDcmVkZW50aWFscyIsIm9wZW4iLCJmaWxlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsIm5hbWUiLCJzZW5kIiwib25sb2FkIiwianNvbiIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImVkaXRvcl9zZWxlY3RvciIsImluaXRfaW5zdGFuY2VfY2FsbGJhY2siLCJjaGFuZ2VUb01hdGVyaWFsIiwic2V0dXAiLCJlZGl0b3IiLCJzZXR1cEVkaXRvciIsImluaXQiLCJ3YXRjaFRhYkNoYW5nZXMiLCJvbiIsImV2ZW50IiwiaGFuZGxlQ291bnRlclRpbnkiLCJ0YXJnZXQiLCJpZCIsInRyaWdnZXJTYXZlIiwiZWFjaCIsImluZGV4IiwidGV4dGFyZWEiLCJ0cmFuc2xhdGVkRmllbGQiLCJjbG9zZXN0IiwidGFiQ29udGFpbmVyIiwibGVuZ3RoIiwidGV4dGFyZWFMb2NhbGUiLCJkYXRhIiwidGV4dGFyZWFMaW5rU2VsZWN0b3IiLCJnZXQiLCJzZXRDb250ZW50IiwiZ2V0Q29udGVudCIsInBhdGhBcnJheSIsInNwbGljZSIsImZpbmFsUGF0aCIsImpvaW4iLCJ0aW55TUNFUHJlSW5pdCIsImJhc2UiLCJzdWZmaXgiLCJnZXRTY3JpcHQiLCJtYXRlcmlhbEljb25Bc3NvYyIsInJlcGxhY2VXaXRoIiwiY291bnRlciIsImF0dHIiLCJjb3VudGVyVHlwZSIsIm1heCIsImFjdGl2ZUVkaXRvciIsImdldEJvZHkiLCJ0ZXh0Q29udGVudCIsInBhcmVudCIsImZpbmQiLCJ0ZXh0IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxJQUFJQyxPQUFPRCxDQUFqQjs7QUFFQTs7Ozs7OztJQU1NRSxhO0FBQ0oseUJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkJBLGNBQVVBLFdBQVcsRUFBckI7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0EsUUFBSSxPQUFPRCxRQUFRRSxZQUFmLElBQStCLFdBQW5DLEVBQWdEO0FBQzlDLFVBQUksT0FBT0osT0FBT0ssWUFBZCxJQUE4QixXQUFsQyxFQUErQztBQUM3Q0gsZ0JBQVFFLFlBQVIsR0FBdUJKLE9BQU9LLFlBQTlCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBTUMsWUFBWU4sT0FBT08sUUFBUCxDQUFnQkMsUUFBaEIsQ0FBeUJDLEtBQXpCLENBQStCLEdBQS9CLENBQWxCO0FBQ0FILGtCQUFVSSxLQUFWLENBQWdCLFVBQVNDLFFBQVQsRUFBbUI7QUFDakMsY0FBSUEsYUFBYSxFQUFqQixFQUFxQjtBQUNuQlQsb0JBQVFFLFlB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QWxCLElBQWlDQyxNQUFNSCxPQUEzQyxFQUFvRDtBQUNsRHJCLGlCQUFTNEIsTUFBVCxHQUFrQkMsSUFBbEIsQ0FBdUIsZ0JBQXZCLEVBQXlDRSxRQUF6QyxDQUFrRCxhQUFsRDtBQUNELE9BRkQsTUFFTztBQUNML0IsaUJBQVM0QixNQUFULEdBQWtCQyxJQUFsQixDQUF1QixnQkFBdkIsRUFBeUNHLFdBQXpDLENBQXFELGFBQXJEO0FBQ0Q7QUFDRjs7Ozs7O2tCQUdZckksYTs7Ozs7Ozs7OztBQ3BUZjs7Ozs7O0FBRUEsSUFBTUYsSUFBSUMsT0FBT0QsQ0FBakIsQyxDQTNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCQUEsRUFBRSxZQUFNO0FBQ04sTUFBSUUsdUJBQUo7QUFDRCxDQUZELEUiLCJmaWxlIjoibWFpbnRlbmFuY2UuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMzEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNiMzA3OGVhZTJiNTRhNDBhOTI1IiwiLyoqXHJcbiAqIDIwMDctMjAxOSBQcmVzdGFTaG9wIGFuZCBDb250cmlidXRvcnNcclxuICpcclxuICogTk9USUNFIE9GIExJQ0VOU0VcclxuICpcclxuICogVGhpcyBzb3VyY2UgZmlsZSBpcyBzdWJqZWN0IHRvIHRoZSBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIHRoYXQgaXMgYnVuZGxlZCB3aXRoIHRoaXMgcGFja2FnZSBpbiB0aGUgZmlsZSBMSUNFTlNFLnR4dC5cclxuICogSXQgaXMgYWxzbyBhdmFpbGFibGUgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIgYXQgdGhpcyBVUkw6XHJcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMFxyXG4gKiBJZiB5b3UgZGlkIG5vdCByZWNlaXZlIGEgY29weSBvZiB0aGUgbGljZW5zZSBhbmQgYXJlIHVuYWJsZSB0b1xyXG4gKiBvYnRhaW4gaXQgdGhyb3VnaCB0aGUgd29ybGQtd2lkZS13ZWIsIHBsZWFzZSBzZW5kIGFuIGVtYWlsXHJcbiAqIHRvIGxpY2Vuc2VAcHJlc3Rhc2hvcC5jb20gc28gd2UgY2FuIHNlbmQgeW91IGEgY29weSBpbW1lZGlhdGVseS5cclxuICpcclxuICogRElTQ0xBSU1FUlxyXG4gKlxyXG4gKiBEbyBub3QgZWRpdCBvciBhZGQgdG8gdGhpcyBmaWxlIGlmIHlvdSB3aXNoIHRvIHVwZ3JhZGUgUHJlc3RhU2hvcCB0byBuZXdlclxyXG4gKiB2ZXJzaW9ucyBpbiB0aGUgZnV0dXJlLiBJZiB5b3Ugd2lzaCB0byBjdXN0b21pemUgUHJlc3RhU2hvcCBmb3IgeW91clxyXG4gKiBuZWVkcyBwbGVhc2UgcmVmZXIgdG8gaHR0cHM6Ly93d3cucHJlc3Rhc2hvcC5jb20gZm9yIG1vcmUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqIEBhdXRob3IgICAgUHJlc3RhU2hvcCBTQSA8Y29udGFjdEBwcmVzdGFzaG9wLmNvbT5cclxuICogQGNvcHlyaWdodCAyMDA3LTIwMTkgUHJlc3RhU2hvcCBTQSBhbmQgQ29udHJpYnV0b3JzXHJcbiAqIEBsaWNlbnNlICAgaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9PU0wtMy4wIE9wZW4gU29mdHdhcmUgTGljZW5zZSAoT1NMIDMuMClcclxuICogSW50ZXJuYXRpb25hbCBSZWdpc3RlcmVkIFRyYWRlbWFyayAmIFByb3BlcnR5IG9mIFByZXN0YVNob3AgU0FcclxuICovXHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpbml0IFRpbnlNQ0UgaW5zdGFuY2VzIGluIHRoZSBiYWNrLW9mZmljZS4gSXQgaXMgd2lsZGx5IGluc3BpcmVkIGJ5XHJcbiAqIHRoZSBzY3JpcHRzIGZyb20ganMvYWRtaW4gQW5kIGl0IGFjdHVhbGx5IGxvYWRzIFRpbnlNQ0UgZnJvbSB0aGUganMvdGlueV9tY2VcclxuICogZm9sZGVyIGFsb25nIHdpdGggaXRzIG1vZHVsZXMuIE9uZSBpbXByb3ZlbWVudCBjb3VsZCBiZSB0byBpbnN0YWxsIFRpbnlNQ0UgdmlhXHJcbiAqIG5wbSBhbmQgZnVsbHkgaW50ZWdyYXRlIGluIHRoZSBiYWNrLW9mZmljZSB0aGVtZS5cclxuICovXHJcbmNsYXNzIFRpbnlNQ0VFZGl0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgdGhpcy50aW55TUNFTG9hZGVkID0gZmFsc2U7XHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuYmFzZUFkbWluVXJsID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93LmJhc2VBZG1pbkRpciAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIG9wdGlvbnMuYmFzZUFkbWluVXJsID0gd2luZG93LmJhc2VBZG1pbkRpcjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBwYXRoUGFydHMgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcclxuICAgICAgICBwYXRoUGFydHMuZXZlcnkoZnVuY3Rpb24ocGF0aFBhcnQpIHtcclxuICAgICAgICAgIGlmIChwYXRoUGFydCAhPT0gJycpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5iYXNlQWRtaW5VcmwgPSBgLyR7cGF0aFBhcnR9L2A7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sYW5nSXNSdGwgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgb3B0aW9ucy5sYW5nSXNSdGwgPSB0eXBlb2Ygd2luZG93LmxhbmdfaXNfcnRsICE9ICd1bmRlZmluZWQnID8gd2luZG93LmxhbmdfaXNfcnRsID09PSAnMScgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0dXBUaW55TUNFKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbCBzZXR1cCB3aGljaCBjaGVja3MgaWYgdGhlIHRpbnlNQ0UgbGlicmFyeSBpcyBhbHJlYWR5IGxvYWRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb25maWdcclxuICAgKi9cclxuICBzZXR1cFRpbnlNQ0UoY29uZmlnKSB7XHJcbiAgICBpZiAodHlwZW9mIHRpbnlNQ0UgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHRoaXMubG9hZEFuZEluaXRUaW55TUNFKGNvbmZpZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaXRUaW55TUNFKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcmVwYXJlIHRoZSBjb25maWcgYW5kIGluaXQgYWxsIFRpbnlNQ0UgZWRpdG9yc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbmZpZ1xyXG4gICAqL1xyXG4gIC8vIGluaXRUaW55TUNFKGNvbmZpZykge1xyXG4gIC8vICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgLy8gICAgIHNlbGVjdG9yOiAnLnJ0ZScsXHJcbiAgLy8gICAgIHBsdWdpbnM6ICdhbGlnbiBjb2xvcnBpY2tlciBsaW5rIGltYWdlIGZpbGVtYW5hZ2VyIHRhYmxlIG1lZGlhIHBsYWNlaG9sZGVyIGFkdmxpc3QgY29kZSB0YWJsZSBhdXRvcmVzaXplJyxcclxuICAvLyAgICAgYnJvd3Nlcl9zcGVsbGNoZWNrOiB0cnVlLFxyXG4gIC8vICAgICB0b29sYmFyMTogJ2NvZGUsY29sb3JwaWNrZXIsYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZXRocm91Z2gsYmxvY2txdW90ZSxsaW5rLGFsaWduLGJ1bGxpc3QsbnVtbGlzdCx0YWJsZSxpbWFnZSxtZWRpYSxmb3JtYXRzZWxlY3QnLFxyXG4gIC8vICAgICB0b29sYmFyMjogJycsXHJcbiAgLy8gICAgIGV4dGVybmFsX2ZpbGVtYW5hZ2VyX3BhdGg6IGNvbmZpZy5iYXNlQWRtaW5VcmwgKyAnZmlsZW1hbmFnZXIvJyxcclxuICAvLyAgICAgZmlsZW1hbmFnZXJfdGl0bGU6ICdGaWxlIG1hbmFnZXInLFxyXG4gIC8vICAgICBleHRlcm5hbF9wbHVnaW5zOiB7XHJcbiAgLy8gICAgICAgJ2ZpbGVtYW5hZ2VyJzogY29uZmlnLmJhc2VBZG1pblVybCArICdmaWxlbWFuYWdlci9wbHVnaW4ubWluLmpzJ1xyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBsYW5ndWFnZTogaXNvX3VzZXIsXHJcbiAgLy8gICAgIGNvbnRlbnRfc3R5bGUgOiAoY29uZmlnLmxhbmdJc1J0bCA/ICdib2R5IHtkaXJlY3Rpb246cnRsO30nIDogJycpLFxyXG4gIC8vICAgICBza2luOiAncHJlc3Rhc2hvcCcsXHJcbiAgLy8gICAgIG1lbnViYXI6IGZhbHNlLFxyXG4gIC8vICAgICBzdGF0dXNiYXI6IGZhbHNlLFxyXG4gIC8vICAgICByZWxhdGl2ZV91cmxzOiBmYWxzZSxcclxuICAvLyAgICAgY29udmVydF91cmxzOiBmYWxzZSxcclxuICAvLyAgICAgZW50aXR5X2VuY29kaW5nOiAncmF3JyxcclxuICAvLyAgICAgZXh0ZW5kZWRfdmFsaWRfZWxlbWVudHM6ICdlbVtjbGFzc3xuYW1lfGlkXSxAW3JvbGV8ZGF0YS0qfGFyaWEtKl0nLFxyXG4gIC8vICAgICB2YWxpZF9jaGlsZHJlbjogJysqWypdJyxcclxuICAvLyAgICAgdmFsaWRfZWxlbWVudHM6ICcqWypdJyxcclxuICAvLyAgICAgcmVsX2xpc3Q6W1xyXG4gIC8vICAgICAgIHsgdGl0bGU6ICdub2ZvbGxvdycsIHZhbHVlOiAnbm9mb2xsb3cnIH1cclxuICAvLyAgICAgXSxcclxuICAvLyAgICAgZWRpdG9yX3NlbGVjdG9yIDonYXV0b2xvYWRfcnRlJyxcclxuICAvLyAgICAgaW5pdF9pbnN0YW5jZV9jYWxsYmFjazogKCkgPT4geyB0aGlzLmNoYW5nZVRvTWF0ZXJpYWwoKTsgfSxcclxuICAvLyAgICAgc2V0dXAgOiAoZWRpdG9yKSA9PiB7IHRoaXMuc2V0dXBFZGl0b3IoZWRpdG9yKTsgfSxcclxuICAvLyAgIH0sIGNvbmZpZyk7XHJcblxyXG4gIC8vICAgaWYgKHR5cGVvZiBjb25maWcuZWRpdG9yX3NlbGVjdG9yICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgLy8gICAgIGNvbmZpZy5zZWxlY3RvciA9ICcuJyArIGNvbmZpZy5lZGl0b3Jfc2VsZWN0b3I7XHJcbiAgLy8gICB9XHJcblxyXG4gIC8vICAgLy8gQ2hhbmdlIGljb25zIGluIHBvcHVwc1xyXG4gIC8vICAgJCgnYm9keScpLm9uKCdjbGljaycsICcubWNlLWJ0biwgLm1jZS1vcGVuLCAubWNlLW1lbnUtaXRlbScsICgpID0+IHsgdGhpcy5jaGFuZ2VUb01hdGVyaWFsKCk7IH0pO1xyXG5cclxuICAvLyAgIHRpbnlNQ0UuaW5pdChjb25maWcpO1xyXG4gIC8vICAgdGhpcy53YXRjaFRhYkNoYW5nZXMoY29uZmlnKTtcclxuICAvLyB9XHJcbiAgLy8gXHJcbiAgaW5pdFRpbnlNQ0UoY29uZmlnKSB7XHJcbiAgICBpZiAodHlwZW9mIChiYXNlX3VybCkgPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIC8vIGRldGVjdCB0aGUgcm9vdCB1cmxcclxuICAgICAgICB2YXIgYmFzZV91cmwgPSBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0ICsgJy8nO1xyXG4gICAgICAgIC8vIGRldGVjdCBsb2NhbGhvc3RcclxuICAgICAgICAvLyB0aGUgdmFsdWUgbXVzdCBpbmNsdWRlIHlvdXIgbG9jYWwgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lXHJcbiAgICAgICAgY29uc3QgTE9DQUxfRE9NQUlOUyA9IFtcImxvY2FsaG9zdFwiLCBcIjEyNy4wLjAuMVwiLCBcImlqemVyc2hvcDE3Ni5sb2NhbFwiXTtcclxuICAgICAgICBpZiAoTE9DQUxfRE9NQUlOUy5pbmNsdWRlcyh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHZhciB0YnBLZXkgPSAnY0MwbHV4VXRhWnk5c01pdmhDWnorUGJPR2JrdkxFZGNjVzUvWTQ4NGRwbnR3WTY4ektoUHVCQkJmaXVjVmF5bE5oYk56dVdkeE1FN3Z3Tm5WeEU4Vk9Ga2Y3UmxxakV5eE1zaXU2ZUVLN1E9JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgdGJwS2V5ID0gJ2NDMGx1eFV0YVp5OXNNaXZoQ1p6K1BiT0dia3ZMRWRjY1c1L1k0ODRkcG50d1k2OHpLaFB1QkJCZml1Y1ZheWxOaGJOenVXZHhNRTd2d05uVnhFOFZPRmtmN1JscWpFeXhNc2l1NmVFSzdRPSc7IC8vIHJlcGxhY2Ugd2l0aCB5b3VyIHByb2R1Y3Rpb24gc2VydmVyIGtleVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcclxuICAgIHNlbGVjdG9yOiAnLnJ0ZScsXHJcbiAgICBwbHVnaW5zOiBbJ2xpbmsnLCAnaW1hZ2UnLCAndGFibGUnLCAnbWVkaWEnLCAnYWR2bGlzdCcsICdjb2RlJywgJ3RhYmxlJywgJ2F1dG9yZXNpemUnLCAnYm9vdHN0cmFwJ10sXHJcbiAgICBicm93c2VyX3NwZWxsY2hlY2s6IHRydWUsXHJcbiAgICB0b29sYmFyOiBcInVuZG8gcmVkbyBjb2RlIGltYWdlfCBib2xkIGl0YWxpYyB1bmRlcmxpbmUgc3RyaWtldGhyb3VnaCB8IGZvbnRzZWxlY3QgZm9udHNpemVzZWxlY3QgZm9ybWF0c2VsZWN0IHN0eWxlc2VsZWN0IHwgYWxpZ25sZWZ0IGFsaWduY2VudGVyIGFsaWducmlnaHQgYWxpZ25qdXN0aWZ5IHwgb3V0ZGVudCBpbmRlbnQgfCAgbnVtbGlzdCBidWxsaXN0IGNoZWNrbGlzdCB8IGZvcmVjb2xvciBiYWNrY29sb3IgY2FzZWNoYW5nZSBwZXJtYW5lbnRwZW4gZm9ybWF0cGFpbnRlciByZW1vdmVmb3JtYXQgfCBwYWdlYnJlYWsgfCBjaGFybWFwIGVtb3RpY29ucyB8IGZ1bGxzY3JlZW4gIHByZXZpZXcgc2F2ZSBwcmludCB8IHBhZ2VlbWJlZCB0ZW1wbGF0ZSBsaW5rIGFuY2hvciBjb2Rlc2FtcGxlIHwgYTExeWNoZWNrIGx0ciBydGwgfCBzaG93Y29tbWVudHMgfCBib290c3RyYXBcIixcclxuICAgIHRvb2xiYXIyOiBmYWxzZSxcclxuICAgIGNvbnRleHRtZW51OiBcImJvb3RzdHJhcFwiLFxyXG4gICAgYm9vdHN0cmFwQ29uZmlnOiB7XHJcbiAgICAgIGxhbmd1YWdlOiBpc29fdXNlciwgXHJcbiAgICAgIHVybDogYmFzZV91cmwgKyAnanMvdGlueV9tY2UvcGx1Z2lucy9ib290c3RyYXAvJyxcclxuICAgICAgaWNvbkZvbnQ6ICdmb250YXdlc29tZTUnLFxyXG4gICAgICBpbWFnZXNQYXRoOiAnL3VwbG9hZCcsXHJcbiAgICAgIGtleTogJ2NDMGx1eFV0YVp5OXNNaXZoQ1p6K1BiT0dia3ZMRWRjY1c1L1k0ODRkcG50d1k2OHpLaFB1QkJCZml1Y1ZheWxOaGJOenVXZHhNRTd2d05uVnhFOFZPRmtmN1JscWpFeXhNc2l1NmVFSzdRPScsXHJcbiAgICAgIGVuYWJsZVRlbXBsYXRlRWRpdGlvbjogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgICBlZGl0b3JTdHlsZUZvcm1hdHM6IHtcclxuICAgICAgICAgICAgICAgIHRleHRTdHlsZXM6IHRydWUsIC8vIHRydWUgb3IgZmFsc2VcclxuICAgICAgICAgICAgICAgIGJsb2NrU3R5bGVzOiB0cnVlLCAvLyB0cnVlIG9yIGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHlsZXM6IHRydWUsIC8vIHRydWUgb3IgZmFsc2VcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IFsneHMnLCAnc20nXSwgLy8geHMgc20gbWQgbGdcclxuICAgICAgICAgICAgICAgIHNwYWNpbmc6IFsnYWxsJywgJ3gnLCAneScsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXSAvLyBhbGwgeCB5IHRvcCByaWdodCBib3R0b20gbGVmdFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgIHN0eWxlX2Zvcm1hdHNfYXV0b2hpZGU6IHRydWUsXHJcbiAgICBsYW5ndWFnZTogaXNvX3VzZXIsXHJcbiAgICBjb250ZW50X3N0eWxlOiAobGFuZ19pc19ydGwgPT09ICcxJyA/IFwiYm9keSB7ZGlyZWN0aW9uOnJ0bDt9XCIgOiBcIlwiKSxcclxuICAgIHNraW46IFwib3hpZGVcIixcclxuICAgIHRoZW1lczogXCJzaWx2ZXJcIixcclxuICAgIG1lbnViYXI6IGZhbHNlLFxyXG4gICAgc3RhdHVzYmFyOiBmYWxzZSxcclxuICAgIHJlbGF0aXZlX3VybHM6IGZhbHNlLFxyXG4gICAgY29udmVydF91cmxzOiBmYWxzZSxcclxuICAgIGVudGl0eV9lbmNvZGluZzogXCJyYXdcIixcclxuICAgIGV4dGVuZGVkX3ZhbGlkX2VsZW1lbnRzOiBcImVtW2NsYXNzfG5hbWV8aWRdLEBbcm9sZXxkYXRhLSp8YXJpYS0qXVwiLFxyXG4gICAgdmFsaWRfY2hpbGRyZW46IFwiKypbKl1cIixcclxuICAgIHZhbGlkX2VsZW1lbnRzOiBcIipbKl1cIixcclxuICAgIHJlbF9saXN0OiBbe1xyXG4gICAgICB0aXRsZTogJ25vZm9sbG93JyxcclxuICAgICAgdmFsdWU6ICdub2ZvbGxvdydcclxuICAgIH1dLFxyXG4gIGltYWdlc191cGxvYWRfaGFuZGxlcjogZnVuY3Rpb24gKGJsb2JJbmZvLCBzdWNjZXNzLCBmYWlsdXJlKSB7XHJcbiAgdmFyIHhociwgZm9ybURhdGE7XHJcbiAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgeGhyLndpdGhDcmVkZW50aWFscyA9IGZhbHNlO1xyXG4gIHhoci5vcGVuKCdQT1NUJywgJy9jdXN0b21fdXBsb2FkZXIvdXBsb2FkLnBocCcpO1xyXG5cclxuICB2YXIgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b3gtZm9ybSBpbnB1dCcpWzBdLmZpbGVzWzBdOyAgXHJcbiAgICBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwYXRoJywnJyk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3BhdGhfdGh1bWInLCcnKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSk7XHJcbiAgICB4aHIuc2VuZChmb3JtRGF0YSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBqc29uO1xyXG5cclxuICAgICAgaWYgKHhoci5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgIGZhaWx1cmUoJ0hUVFAgRXJyb3I6ICcgKyB4aHIuc3RhdHVzKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGpzb24gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgaWYgKCFqc29uIHx8IHR5cGVvZiBqc29uLmxvY2F0aW9uICE9ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZhaWx1cmUoJ0ludmFsaWQgSlNPTjogJyArIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc3VjY2Vzcyhqc29uLmxvY2F0aW9uKTtcclxuICAgIH07XHJcbiAgICB9LFxyXG4gICAgICBlZGl0b3Jfc2VsZWN0b3IgOidhdXRvbG9hZF9ydGUnLFxyXG4gICAgICBpbml0X2luc3RhbmNlX2NhbGxiYWNrOiAoKSA9PiB7IHRoaXMuY2hhbmdlVG9NYXRlcmlhbCgpOyB9LFxyXG4gICAgICBzZXR1cCA6IChlZGl0b3IpID0+IHsgdGhpcy5zZXR1cEVkaXRvcihlZGl0b3IpOyB9LFxyXG4gICAgfSwgY29uZmlnKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5lZGl0b3Jfc2VsZWN0b3IgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uZmlnLnNlbGVjdG9yID0gJy4nICsgY29uZmlnLmVkaXRvcl9zZWxlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFuZ2UgaWNvbnMgaW4gcG9wdXBzXHJcbiAgICAvLyQoJ2JvZHknKS5vbignY2xpY2snLCAnLm1jZS1idG4sIC5tY2Utb3BlbiwgLm1jZS1tZW51LWl0ZW0nLCAoKSA9PiB7IHRoaXMuY2hhbmdlVG9NYXRlcmlhbCgpOyB9KTtcclxuXHJcbiAgICB0aW55TUNFLmluaXQoY29uZmlnKTtcclxuICAgIHRoaXMud2F0Y2hUYWJDaGFuZ2VzKGNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXR1cCBUaW55TUNFIGVkaXRvciBvbmNlIGl0IGhhcyBiZWVuIGluaXRpYWxpemVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZWRpdG9yXHJcbiAgICovXHJcbiAgc2V0dXBFZGl0b3IoZWRpdG9yKSB7XHJcbiAgICBlZGl0b3Iub24oJ2xvYWRDb250ZW50JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgIHRoaXMuaGFuZGxlQ291bnRlclRpbnkoZXZlbnQudGFyZ2V0LmlkKTtcclxuICAgIH0pO1xyXG4gICAgZWRpdG9yLm9uKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgdGlueU1DRS50cmlnZ2VyU2F2ZSgpO1xyXG4gICAgICB0aGlzLmhhbmRsZUNvdW50ZXJUaW55KGV2ZW50LnRhcmdldC5pZCk7XHJcbiAgICB9KTtcclxuICAgIGVkaXRvci5vbignYmx1cicsICgpID0+IHtcclxuICAgICAgdGlueU1DRS50cmlnZ2VyU2F2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRoZSBlZGl0b3IgaXMgaW5zaWRlIGEgdGFiIGl0IGNhbiBjYXVzZSBhIGJ1ZyBvbiB0YWIgc3dpdGNoaW5nLlxyXG4gICAqIFNvIHdlIGNoZWNrIGlmIHRoZSBlZGl0b3IgaXMgY29udGFpbmVkIGluIGEgbmF2aWdhdGlvbiBhbmQgcmVmcmVzaCB0aGUgZWRpdG9yIHdoZW4gaXRzXHJcbiAgICogcGFyZW50IHRhYiBpcyBzaG93bi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBjb25maWdcclxuICAgKi9cclxuICB3YXRjaFRhYkNoYW5nZXMoY29uZmlnKSB7XHJcbiAgICAkKGNvbmZpZy5zZWxlY3RvcikuZWFjaCgoaW5kZXgsIHRleHRhcmVhKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZWRGaWVsZCA9ICQodGV4dGFyZWEpLmNsb3Nlc3QoJy50cmFuc2xhdGlvbi1maWVsZCcpO1xyXG4gICAgICBjb25zdCB0YWJDb250YWluZXIgPSAkKHRleHRhcmVhKS5jbG9zZXN0KCcudHJhbnNsYXRpb25zLnRhYmJhYmxlJyk7XHJcblxyXG4gICAgICBpZiAodHJhbnNsYXRlZEZpZWxkLmxlbmd0aCAmJiB0YWJDb250YWluZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgdGV4dGFyZWFMb2NhbGUgPSB0cmFuc2xhdGVkRmllbGQuZGF0YSgnbG9jYWxlJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dGFyZWFMaW5rU2VsZWN0b3IgPSAnLm5hdi1pdGVtIGFbZGF0YS1sb2NhbGU9XCInK3RleHRhcmVhTG9jYWxlKydcIl0nO1xyXG5cclxuICAgICAgICAkKHRleHRhcmVhTGlua1NlbGVjdG9yLCB0YWJDb250YWluZXIpLm9uKCdzaG93bi5icy50YWInLCAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBlZGl0b3IgPSB0aW55TUNFLmdldCh0ZXh0YXJlYS5pZCk7XHJcbiAgICAgICAgICBpZiAoZWRpdG9yKSB7XHJcbiAgICAgICAgICAgIC8vUmVzZXQgY29udGVudCB0byBmb3JjZSByZWZyZXNoIG9mIGVkaXRvclxyXG4gICAgICAgICAgICBlZGl0b3Iuc2V0Q29udGVudChlZGl0b3IuZ2V0Q29udGVudCgpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMb2FkcyB0aGUgVGlueU1DRSBqYXZhc2NyaXB0IGxpYnJhcnkgYW5kIHRoZW4gaW5pdCB0aGUgZWRpdG9yc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGNvbmZpZ1xyXG4gICAqL1xyXG4gIGxvYWRBbmRJbml0VGlueU1DRShjb25maWcpIHtcclxuICAgIGlmICh0aGlzLnRpbnlNQ0VMb2FkZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGlueU1DRUxvYWRlZCA9IHRydWU7XHJcbiAgICBjb25zdCBwYXRoQXJyYXkgPSBjb25maWcuYmFzZUFkbWluVXJsLnNwbGl0KCcvJyk7XHJcbiAgICBwYXRoQXJyYXkuc3BsaWNlKChwYXRoQXJyYXkubGVuZ3RoIC0gMiksIDIpO1xyXG4gICAgY29uc3QgZmluYWxQYXRoID0gcGF0aEFycmF5LmpvaW4oJy8nKTtcclxuICAgIHdpbmRvdy50aW55TUNFUHJlSW5pdCA9IHt9O1xyXG4gICAgd2luZG93LnRpbnlNQ0VQcmVJbml0LmJhc2UgPSBmaW5hbFBhdGgrJy9qcy90aW55X21jZSc7XHJcbiAgICB3aW5kb3cudGlueU1DRVByZUluaXQuc3VmZml4ID0gJy5taW4nO1xyXG4gICAgJC5nZXRTY3JpcHQoYCR7ZmluYWxQYXRofS9qcy90aW55X21jZS90aW55bWNlLm1pbi5qc2AsICgpID0+IHt0aGlzLnNldHVwVGlueU1DRShjb25maWcpfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXBsYWNlIGluaXRpYWwgVGlueU1DRSBpY29ucyB3aXRoIG1hdGVyaWFsIGljb25zXHJcbiAgICovXHJcbiAgY2hhbmdlVG9NYXRlcmlhbCgpIHtcclxuICAgIGxldCBtYXRlcmlhbEljb25Bc3NvYyA9IHtcclxuICAgICAgJ21jZS1pLWNvZGUnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNvZGU8L2k+JyxcclxuICAgICAgJ21jZS1pLW5vbmUnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9jb2xvcl90ZXh0PC9pPicsXHJcbiAgICAgICdtY2UtaS1ib2xkJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfYm9sZDwvaT4nLFxyXG4gICAgICAnbWNlLWktaXRhbGljJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfaXRhbGljPC9pPicsXHJcbiAgICAgICdtY2UtaS11bmRlcmxpbmUnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF91bmRlcmxpbmVkPC9pPicsXHJcbiAgICAgICdtY2UtaS1zdHJpa2V0aHJvdWdoJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfc3RyaWtldGhyb3VnaDwvaT4nLFxyXG4gICAgICAnbWNlLWktYmxvY2txdW90ZSc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X3F1b3RlPC9pPicsXHJcbiAgICAgICdtY2UtaS1saW5rJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5saW5rPC9pPicsXHJcbiAgICAgICdtY2UtaS1hbGlnbmxlZnQnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9hbGlnbl9sZWZ0PC9pPicsXHJcbiAgICAgICdtY2UtaS1hbGlnbmNlbnRlcic6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X2FsaWduX2NlbnRlcjwvaT4nLFxyXG4gICAgICAnbWNlLWktYWxpZ25yaWdodCc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X2FsaWduX3JpZ2h0PC9pPicsXHJcbiAgICAgICdtY2UtaS1hbGlnbmp1c3RpZnknOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZvcm1hdF9hbGlnbl9qdXN0aWZ5PC9pPicsXHJcbiAgICAgICdtY2UtaS1idWxsaXN0JzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5mb3JtYXRfbGlzdF9idWxsZXRlZDwvaT4nLFxyXG4gICAgICAnbWNlLWktbnVtbGlzdCc6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Zm9ybWF0X2xpc3RfbnVtYmVyZWQ8L2k+JyxcclxuICAgICAgJ21jZS1pLWltYWdlJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5pbWFnZTwvaT4nLFxyXG4gICAgICAnbWNlLWktdGFibGUnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmdyaWRfb248L2k+JyxcclxuICAgICAgJ21jZS1pLW1lZGlhJzogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj52aWRlb19saWJyYXJ5PC9pPicsXHJcbiAgICAgICdtY2UtaS1icm93c2UnOiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmF0dGFjaG1lbnQ8L2k+JyxcclxuICAgICAgJ21jZS1pLWNoZWNrYm94JzogJzxpIGNsYXNzPVwibWNlLWljbyBtY2UtaS1jaGVja2JveFwiPjwvaT4nLFxyXG4gICAgfTtcclxuXHJcbiAgICAkLmVhY2gobWF0ZXJpYWxJY29uQXNzb2MsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgJChgLiR7aW5kZXh9YCkucmVwbGFjZVdpdGgodmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBjaGFyYWN0ZXJzIGNvdW50ZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqL1xyXG4gIGhhbmRsZUNvdW50ZXJUaW55KGlkKSB7XHJcbiAgICBjb25zdCB0ZXh0YXJlYSA9ICQoYCMke2lkfWApO1xyXG4gICAgY29uc3QgY291bnRlciA9IHRleHRhcmVhLmF0dHIoJ2NvdW50ZXInKTtcclxuICAgIGNvbnN0IGNvdW50ZXJUeXBlID0gdGV4dGFyZWEuYXR0cignY291bnRlcl90eXBlJyk7XHJcbiAgICBjb25zdCBtYXggPSB0aW55TUNFLmFjdGl2ZUVkaXRvci5nZXRCb2R5KCkudGV4dENvbnRlbnQubGVuZ3RoO1xyXG5cclxuICAgIHRleHRhcmVhLnBhcmVudCgpLmZpbmQoJ3NwYW4uY3VycmVudExlbmd0aCcpLnRleHQobWF4KTtcclxuICAgIGlmICgncmVjb21tZW5kZWQnICE9PSBjb3VudGVyVHlwZSAmJiBtYXggPiBjb3VudGVyKSB7XHJcbiAgICAgIHRleHRhcmVhLnBhcmVudCgpLmZpbmQoJ3NwYW4ubWF4TGVuZ3RoJykuYWRkQ2xhc3MoJ3RleHQtZGFuZ2VyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0YXJlYS5wYXJlbnQoKS5maW5kKCdzcGFuLm1heExlbmd0aCcpLnJlbW92ZUNsYXNzKCd0ZXh0LWRhbmdlcicpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVGlueU1DRUVkaXRvcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvY29tcG9uZW50cy90aW55bWNlLWVkaXRvci5qcyIsIi8qKlxyXG4gKiAyMDA3LTIwMTkgUHJlc3RhU2hvcCBhbmQgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIE5PVElDRSBPRiBMSUNFTlNFXHJcbiAqXHJcbiAqIFRoaXMgc291cmNlIGZpbGUgaXMgc3ViamVjdCB0byB0aGUgT3BlbiBTb2Z0d2FyZSBMaWNlbnNlIChPU0wgMy4wKVxyXG4gKiB0aGF0IGlzIGJ1bmRsZWQgd2l0aCB0aGlzIHBhY2thZ2UgaW4gdGhlIGZpbGUgTElDRU5TRS50eHQuXHJcbiAqIEl0IGlzIGFsc28gYXZhaWxhYmxlIHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViIGF0IHRoaXMgVVJMOlxyXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL09TTC0zLjBcclxuICogSWYgeW91IGRpZCBub3QgcmVjZWl2ZSBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYW5kIGFyZSB1bmFibGUgdG9cclxuICogb2J0YWluIGl0IHRocm91Z2ggdGhlIHdvcmxkLXdpZGUtd2ViLCBwbGVhc2Ugc2VuZCBhbiBlbWFpbFxyXG4gKiB0byBsaWNlbnNlQHByZXN0YXNob3AuY29tIHNvIHdlIGNhbiBzZW5kIHlvdSBhIGNvcHkgaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIERJU0NMQUlNRVJcclxuICpcclxuICogRG8gbm90IGVkaXQgb3IgYWRkIHRvIHRoaXMgZmlsZSBpZiB5b3Ugd2lzaCB0byB1cGdyYWRlIFByZXN0YVNob3AgdG8gbmV3ZXJcclxuICogdmVyc2lvbnMgaW4gdGhlIGZ1dHVyZS4gSWYgeW91IHdpc2ggdG8gY3VzdG9taXplIFByZXN0YVNob3AgZm9yIHlvdXJcclxuICogbmVlZHMgcGxlYXNlIHJlZmVyIHRvIGh0dHBzOi8vd3d3LnByZXN0YXNob3AuY29tIGZvciBtb3JlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAYXV0aG9yICAgIFByZXN0YVNob3AgU0EgPGNvbnRhY3RAcHJlc3Rhc2hvcC5jb20+XHJcbiAqIEBjb3B5cmlnaHQgMjAwNy0yMDE5IFByZXN0YVNob3AgU0EgYW5kIENvbnRyaWJ1dG9yc1xyXG4gKiBAbGljZW5zZSAgIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvT1NMLTMuMCBPcGVuIFNvZnR3YXJlIExpY2Vuc2UgKE9TTCAzLjApXHJcbiAqIEludGVybmF0aW9uYWwgUmVnaXN0ZXJlZCBUcmFkZW1hcmsgJiBQcm9wZXJ0eSBvZiBQcmVzdGFTaG9wIFNBXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRpbnlNQ0VFZGl0b3IgZnJvbSAnLi4vLi4vY29tcG9uZW50cy90aW55bWNlLWVkaXRvcic7XHJcblxyXG5jb25zdCAkID0gd2luZG93LiQ7XHJcblxyXG4kKCgpID0+IHtcclxuICBuZXcgVGlueU1DRUVkaXRvcigpO1xyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vanMvcGFnZXMvbWFpbnRlbmFuY2UvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9