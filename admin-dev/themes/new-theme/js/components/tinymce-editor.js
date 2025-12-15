/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
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
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */
// TinyMCE 5 imports (native)
// Core
import tinymce from 'tinymce/tinymce';
// Theme & icons
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
// Skins (bundled via webpack). We disable automatic loading and include CSS ourselves
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';
// Common plugins used in PrestaShop toolbars
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';
import 'tinymce/plugins/media';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/directionality';
import ComponentsMap from '@components/components-map';
import {EventEmitter} from './event-emitter';

const {$} = window;

/**
 * This class init TinyMCE instances in the back-office. It is wildly inspired by
 * the scripts from js/admin. This version uses TinyMCE v5 installed via npm and
 * fully integrated in the back-office theme.
 */
class TinyMCEEditor {
  constructor(options) {
    const opts = options || {};
    this.tinyMCELoaded = false;
    if (typeof opts.baseAdminUrl === 'undefined') {
      if (typeof window.baseAdminDir !== 'undefined') {
        opts.baseAdminUrl = window.baseAdminDir;
      } else {
        const pathParts = window.location.pathname.split('/');
        pathParts.every((pathPart) => {
          if (pathPart !== '') {
            opts.baseAdminUrl = `/${pathPart}/`;

            return false;
          }

          return true;
        });
      }
    }
    if (typeof opts.langIsRtl === 'undefined') {
      opts.langIsRtl = typeof window.lang_is_rtl !== 'undefined' ? window.lang_is_rtl === '1' : false;
    }
    this.setupTinyMCE(opts);
  }

  /**
   * Initial setup which checks if the tinyMCE library is already loaded.
   *
   * @param config
   */
  setupTinyMCE(config) {
    // Ensure global is set for modules (like N1ED) that expect window.tinymce
    if (!window.tinymce) {
      window.tinymce = tinymce;
    }
    this.initTinyMCE(config);
  }

  /**
   * Prepare the config and init all TinyMCE editors
   *
   * @param config
   */
  initTinyMCE(config) {
    const cfg = {
      selector: '.rte',
      plugins: [
        'link', 'image', 'table', 'media', 'lists', 'advlist', 'code', 'autoresize', 'hr', 'directionality',
      ],
      browser_spellcheck: true,
      toolbar:
        'undo redo | blocks | bold italic underline strikethrough blockquote | '
        + 'alignleft aligncenter alignright alignjustify | bullist numlist | '
        + 'link image media table | forecolor backcolor | ltr rtl | code | hr',
      language: window.iso_user,
      // External file manager (if present) can still be provided via external_plugins
      external_filemanager_path: `${config.baseAdminUrl}filemanager/`,
      filemanager_title: 'File manager',
      external_plugins: {
        filemanager: `${config.baseAdminUrl}filemanager/plugin.min.js`,
      },
      content_style: config.langIsRtl ? 'body {direction:rtl;}' : '',
      // We bundle skin/content css via webpack, so disable TinyMCE auto-loading
      skin: false,
      content_css: false,
      menubar: false,
      statusbar: false,
      relative_urls: false,
      convert_urls: false,
      entity_encoding: 'raw',
      extended_valid_elements: 'em[class|name|id],@[role|data-*|aria-*]',
      valid_children: '+*[*]',
      valid_elements: '*[*]',
      rel_list: [{title: 'nofollow', value: 'nofollow'}],
      editor_selector: ComponentsMap.tineMceEditor.selectorClass,
      init_instance_callback: () => {
        // No-op for TinyMCE v5
      },
      setup: (editor) => {
        this.setupEditor(editor);
      },
      ...config,
    };

    if (typeof window.defaultTinyMceConfig !== 'undefined') {
      Object.assign(cfg, window.defaultTinyMceConfig);
    }

    if (typeof cfg.editor_selector !== 'undefined') {
      cfg.selector = `.${cfg.editor_selector}`;
    }

    EventEmitter.emit('initTinyMCE', {
      config: cfg,
    });

    // Initialize TinyMCE v5
    window.tinymce.init(cfg);
    this.watchTabChanges(cfg);
  }

  /**
   * Setup TinyMCE editor once it has been initialized
   *
   * @param editor
   */
  setupEditor(editor) {
    editor.on('loadContent', (event) => {
      this.handleCounterTiny(event.target.id);
    });
    editor.on('change', (event) => {
      window.tinymce.triggerSave();
      this.handleCounterTiny(event.target.id);
    });
    editor.on('blur', () => {
      window.tinymce.triggerSave();
    });
    EventEmitter.emit('tinymceEditorSetup', {
      editor,
    });
  }

  /**
   * When the editor is inside a tab it can cause a bug on tab switching.
   * So we check if the editor is contained in a navigation and refresh the editor when its
   * parent tab is shown.
   *
   * @param config
   */
  watchTabChanges(config) {
    $(config.selector).each((index, textarea) => {
      const translatedField = $(textarea).closest('.translation-field');
      const tabContainer = $(textarea).closest('.translations.tabbable');

      if (translatedField.length && tabContainer.length) {
        const textareaLocale = translatedField.data('locale');
        const textareaLinkSelector = `.nav-item a[data-locale="${textareaLocale}"]`;

        $(textareaLinkSelector, tabContainer).on('shown.bs.tab', () => {
          const form = $(textarea).closest('form');
          const editor = window.tinymce.get(textarea.id);

          if (editor) {
            // Reset content to force refresh of editor
            editor.setContent(editor.getContent());
          }

          EventEmitter.emit('languageSelected', {
            selectedLocale: textareaLocale,
            form,
          });
        });
      }
    });

    EventEmitter.on('languageSelected', (data) => {
      const textareaLinkSelector = `.nav-item a[data-locale="${data.selectedLocale}"]`;

      $(textareaLinkSelector).click();
    });
  }

  /**
   * Loads the TinyMCE javascript library and then init the editors
   *
   * @param config
   */
  // Legacy dynamic loader removed — TinyMCE is bundled via webpack
  // loadAndInitTinyMCE() no longer needed

  /**
   * Replace initial TinyMCE icons with material icons
   */
  // changeToMaterial() is not applicable to TinyMCE v5 toolbars
  changeToMaterial() {}

  /**
   * Updates the characters counter. This counter is used for front but if you don't want to encounter Validation
   * problems you should be in sync with the TinyMceMaxLengthValidator PHP class. Both codes must behave the same
   * way.
   *
   * @param id
   */
  handleCounterTiny(id) {
    const textarea = $(`#${id}`);
    const counter = textarea.attr('counter');
    const counterType = textarea.attr('counter_type');
    const editor = window.tinymce.get(id);
    const max = editor.getBody() ? editor.getBody().textContent.length : 0;

    textarea
      .parent()
      .find('span.currentLength')
      .text(max);
    if (counterType !== 'recommended' && max > counter) {
      textarea
        .parent()
        .find('span.maxLength')
        .addClass('text-danger');
    } else {
      textarea
        .parent()
        .find('span.maxLength')
        .removeClass('text-danger');
    }
  }
}

export default TinyMCEEditor;
