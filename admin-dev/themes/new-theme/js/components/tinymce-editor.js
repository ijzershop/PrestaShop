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
import ComponentsMap from '@components/components-map';
import {EventEmitter} from './event-emitter';

const {$} = window;

/**
 * This class init TinyMCE instances in the back-office. It is wildly inspired by
 * the scripts from js/admin And it actually loads TinyMCE from the js/tiny_mce
 * folder along with its modules. One improvement could be to install TinyMCE via
 * npm and fully integrate in the back-office theme.
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

      opts.base_url_website = window.location.protocol + '//' + window.location.host + '/';

    this.setupTinyMCE(opts);
  }



  /**
   * Initial setup which checks if the tinyMCE library is already loaded.
   *
   * @param config
   */
  setupTinyMCE(config) {
    if (typeof tinyMCE === 'undefined') {
      this.loadAndInitTinyMCE(config);
    } else {
      this.initTinyMCE(config);
    }
  }
  fetchKey(hostname) {
    let keys = [];
    keys["bouwstaalmat.nl"] =  "";
    keys["bouwstaalmat.viho.nl"] =  "";
    keys["constructiebalk.nl"] =  "3wORV+ZdWifIWnUWSxdAUtCPcNfJnjU/DMxjcGDxcZnBQVJgpRjWdVZMdqAhsj5pbZd3c/h/s41crmf9zwJuv3VrO/4pkSLOmAdBZJT3W6Y="; //set
    keys["constructieklus.nl"] =  "";
    keys["constructieklus.viho.nl"] =  "";
    keys["demodernesmid.nl"] =  "";
    keys["demodernesmid.viho.nl"] =  "cO4FCAY9a7EYM+WNt80HO+zP8NYYqmVXAXbxgL6gbmPashb4b9GpWNnBUAErfRNXXYLw30+WTmQ6IQvaGJ1N8A=="; //SET
    keys["gerofitness.nl"] =  "";
    keys["gerofitness.viho.nl"] =  "";
    keys["ijzershop.frl"] =  "paLRcpM5PcDm1duliaErNH68VcRsntx2MacT2bqMPdq9je0ISiUiWoBLH1+eLBLTCEyySTXdHIxel6w2Aceuki8+MEabGVzHjNngtZBzun4=";//Set
    keys["ijzershop.nl"] =  "n8ampBLr4qZSJqSCe4Sf0bxgNwjjsIStecJ7VbWmWRUHekl8RRhtoDbQJy9WmCKfWF0EU/4Aqc/i/65mnZtQ01nw0GXPr/2zKFNaNuwdDRY="; //Set
    keys["ijzershop.eu"] =  "n8ampBLr4qZSJqSCe4Sf0bxgNwjjsIStecJ7VbWmWRUHekl8RRhtoDbQJy9WmCKfWF0EU/4Aqc/i/65mnZtQ01nw0GXPr/2zKFNaNuwdDRY="; //Set
    keys["ijzershop176.local"] =  "cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpmftIOvjnss+mhviBjMWYpzfTD8gujkxPFveiunw80iXmfbHphHun6k0qBPJyPtFC8=";
    keys["paneelhek.nl"] =  "";
    keys["paneelhek.viho.nl"] =  "";
    keys["viho.nl"] =  "paLRcpM5PcDm1duliaErNH68VcRsntx2MacT2bqMPdq9je0ISiUiWoBLH1+eLBLTCEyySTXdHIxel6w2Aceuki8+MEabGVzHjNngtZBzun4="; //Set

    if(keys.hasOwnProperty(hostname)){
      return keys[hostname];
    } else {
      return "n8ampBLr4qZSJqSCe4Sf0bxgNwjjsIStecJ7VbWmWRUHekl8RRhtoDbQJy9WmCKfWF0EU/4Aqc/i/65mnZtQ01nw0GXPr/2zKFNaNuwdDRY=";
    }

  }
  /**
   * Prepare the config and init all TinyMCE editors
   *
   * @param config
   */
  initTinyMCE(config) {
    const cfg = {
      selector: '.rte',
      relative_urls: false,
      plugins: ['paste','link', 'table', 'media', 'advlist', 'lists', 'code', 'table', 'autoresize', 'bootstrap', 'fullscreen', 'responsivefilemanager'],
      browser_spellcheck: true,
      toolbar: "undo redo code | bold italic underline strikethrough fullscreen responsivefilemanager | fontselect fontsizeselect formatselect styleselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print paste | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments | bootstrap",
      paste_data_images: true,
      paste_preprocess: function(plugin, args) {
        let m;
        const content = args.content;
        const regex = new RegExp('^<img.*?src=\"(.*?)\"');
        if(regex.test(content))
        {
          m = content.replace('<img', '<img width="100%" style="max-width:100%;height:auto!important;"');
          args.content = m;
        } else {
          //is text strip all
          m = content.replace(/(<([^>]+)>)/gi, "");
          args.content = m;
        }
      },
      paste_postprocess: (editor, args) => {
        let child = args.node.firstChild;
        if(child.tagName === 'IMG'){
          let srcString = child.src;
          if(srcString.indexOf(config.base_url_website) === -1 && srcString.indexOf('blob:') === -1){
            srcString = config.base_url_website + srcString
          } else if(srcString.indexOf(config.base_url_website) === -1 && srcString.indexOf('blob:') !== -1){
            srcString.replace('blob:', 'blob:' + config.base_url_website);
          }
          child.src = srcString;
        }
      },
      contextmenu: "bootstrap",
      image_advtab: true ,
      external_filemanager_path: config.base_url_website+ "js/filemanager/",
      filemanager_title:"Bestands beheer" ,
      external_plugins: { "filemanager" : config.base_url_website+ "js/filemanager/plugin.min.js"},
      bootstrapConfig: {
        language: iso_user,
        url: config.base_url_website + 'js/tiny_mce/plugins/bootstrap/',
        iconFont: 'fontawesome5',
        imagesPath: config.base_url_website+ 'upload',
        key: this.fetchKey(window.location.hostname),
        enableTemplateEdition: true,
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
      content_style: lang_is_rtl === '1' ? 'body {direction:rtl;}' : '',
      skin: "oxide",
      themes: "silver",
      mobile: {
        theme: 'mobile',
        plugins: ['lists', 'align', 'link', 'table', 'placeholder', 'advlist', 'code'],
        toolbar:
          'undo code colorpicker bold italic underline strikethrough blockquote link align bullist numlist table formatselect styleselect',
      },
      menubar: false,
      statusbar: false,
      convert_urls: false,
      entity_encoding: 'raw',
      extended_valid_elements: 'em[class|name|id],@[role|data-*|aria-*]',
      valid_children: '+*[*]',
      valid_elements: '*[*]',
      rel_list: [{title: 'nofollow', value: 'nofollow'}],
      automatic_uploads: true,
      images_upload_url: config.base_url_website+ 'custom_uploader/upload.php',
      images_upload_handler: function (blobInfo, success, failure, progress) {
        let xhr, formData;
        const url = '/index.php?fc=module&module=msthemeconfig&controller=ajax&id_lang=1';
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', url);

        formData = new FormData();
        formData.append('action','upload_files');
        formData.append('path','/editor_uploads');
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.upload.onprogress = function (e) {
          progress(e.loaded / e.total * 100);
        };

        xhr.onload = function() {
          let json;
          if (xhr.status !== 200) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);

          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          success(config.base_url_website+'upload'+json.location);
          top.tinymce.activeEditor.notificationManager.close();
        };
        xhr.send(formData);
        return false;
      },
      editor_selector: ComponentsMap.tineMceEditor.selectorClass,
      init_instance_callback: () => {
        this.changeToMaterial();
      },
      setup: (editor) => {
        this.setupEditor(editor);
      }
    };

    if (typeof window.defaultTinyMceConfig !== 'undefined') {
      Object.assign(cfg, window.defaultTinyMceConfig);
    }

    if (typeof cfg.editor_selector !== 'undefined') {
      cfg.selector = `.${cfg.editor_selector}`;
    }

    // Change icons in popups
    $('body').on('click', '.mce-btn, .mce-open, .mce-menu-item', () => {
      this.changeToMaterial();
    });

    $.extend(cfg, config);
    window.tinyMCE.init(cfg);
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
      window.tinyMCE.triggerSave();
      this.handleCounterTiny(event.target.id);
    });
    editor.on('blur', () => {
      window.tinyMCE.triggerSave();
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
          const editor = window.tinyMCE.get(textarea.id);

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
  loadAndInitTinyMCE(config) {
    if (this.tinyMCELoaded) {
      return;
    }

    this.tinyMCELoaded = true;
    const pathArray = config.baseAdminUrl.split('/');
    pathArray.splice(pathArray.length - 2, 2);
    const finalPath = pathArray.join('/');
    window.tinyMCEPreInit = {};
    window.tinyMCEPreInit.base = `${finalPath}/js/tiny_mce`;
    window.tinyMCEPreInit.suffix = '.min';
    $.getScript(`${finalPath}/js/tiny_mce/tinymce.min.js`, () => {


      this.setupTinyMCE(config);
    });
  }

  /**
   * Replace initial TinyMCE icons with material icons
   */
  changeToMaterial() {
    const materialIconAssoc = {
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
      'mce-i-checkbox': '<i class="mce-ico mce-i-checkbox"></i>',
    };

    $.each(materialIconAssoc, (index, value) => {
      $(`.${index}`).replaceWith(value);
    });
  }

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
    const editor = window.tinyMCE.get(id);
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
