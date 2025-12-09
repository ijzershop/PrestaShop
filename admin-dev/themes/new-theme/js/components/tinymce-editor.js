/**
 * Custom TinyMCE configuration (PS 9.x) with Bootstrap plugin integration and legacy behaviors.
 * This file is deployed into admin-dev/themes/new-theme/js/components/tinymce-editor.js by install scripts.
 */
import ComponentsMap from '@components/components-map';
import {EventEmitter} from './event-emitter';
import Flmngr from '@flmngr/flmngr-tinymce-6';

const {$} = window;

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
    if (typeof opts.baseUrlWebsite === 'undefined') {
      const origin = `${window.location.protocol}//${window.location.host}`;
      const shopBase = (window.prestashop && window.prestashop.urls && window.prestashop.urls.base_url)
        ? window.prestashop.urls.base_url
        : (window.baseDir || '/');
      opts.baseUrlWebsite = origin + (shopBase && !shopBase.startsWith('/') ? `/${shopBase}` : shopBase || '/');
    }
    this.setupTinyMCE(opts);
  }

  setupTinyMCE(config) {
    if (typeof tinyMCE === 'undefined') {
      this.loadAndInitTinyMCE(config);
    } else {
      this.initTinyMCE(config);
    }
  }

  initTinyMCE(config) {
    const cfg = {
      selector: '.rte',
      plugins: 'colorpicker image table lists advlist code autoresize hr bootstrap fullscreen',
      browser_spellcheck: true,
      // TinyMCE 5 expects a single space-separated toolbar string
      toolbar: 'undo redo code colorpicker bold italic underline strikethrough blockquote '
        + 'alignleft aligncenter alignright alignjustify bullist numlist image flmngr table '
        + 'formatselect styleselect hr fullscreen bootstrap',
      language: window.iso_user,
      // Flmngr configuration
      apiKey: 'FLMNFLMN',
      urlFileManager: 'https://fm.flmngr.com/fileManager',
      urlFiles: `${config.baseUrlWebsite}upload/`,
      external_plugins: {
        bootstrap: `${config.baseUrlWebsite}js/tiny_mce/plugins/bootstrap/plugin.min.js`,
      },
      content_style: config.langIsRtl ? 'body {direction:rtl;}' : '',
      // Ensure editor iframe uses the same CSS bundle as the frontend theme (load both emitted files)
      content_css: `${config.baseUrlWebsite}themes/modernesmid/assets/css/theme.css,${config.baseUrlWebsite}themes/modernesmid/assets/css/theme-core-bundled.css`,
      // TinyMCE 5 default skin
      skin: 'oxide',
      mobile: {
        theme: 'mobile',
        plugins: ['lists', 'table', 'advlist', 'code', 'hr', 'image'],
        toolbar: 'undo code colorpicker bold italic underline strikethrough blockquote'
          + ' alignleft aligncenter alignright alignjustify bullist numlist image table '
          + 'formatselect styleselect hr flmngr',
      },
      menubar: false,
      statusbar: false,
      relative_urls: false,
      convert_urls: false,
      entity_encoding: 'raw',
      extended_valid_elements: 'em[class|name|id],@[role|data-*|aria-*]',
      valid_children: '+*[*]',
      valid_elements: '*[*]',
      rel_list: [{title: 'nofollow', value: 'nofollow'}],
      contextmenu: 'bootstrap',
      paste_data_images: true,
      paste_preprocess(plugin, args) {
        const content = args.content || '';
        const regex = new RegExp('^<img.*?src="(.*?)"');

        if (regex.test(content)) {
          args.content = content.replace('<img', '<img width="100%" style="max-width:100%;height:auto!important;"');
        } else {
          args.content = content.replace(/(<([^>]+)>)/gi, '');
        }
      },
      paste_postprocess(editor, args) {
        const child = args && args.node ? args.node.firstChild : null;

        if (child && child.tagName === 'IMG') {
          const src = child.src || '';
          // Leave blob/data URLs as-is for TinyMCE upload handler
          if (/^(blob:|data:)/i.test(src)) {
            return;
          }
          // Prefix only site-relative or bare relative URLs
          if (/^\//.test(src) || !/^https?:\/\//i.test(src)) {
            child.src = `${config.baseUrlWebsite.replace(/\/$/, '')}${src.startsWith('/') ? '' : '/'}${src}`;
          }
        }
      },
      automatic_uploads: true,
      images_upload_url: `${config.baseUrlWebsite}upload/`,
      images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
        // Use Flmngr's upload handler for automatic paste/drop uploads
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        fetch(`${config.baseUrlWebsite}upload/`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            if (result && result.location) {
              resolve(result.location);
            } else {
              reject('Upload failed');
            }
          })
          .catch(() => reject('Upload failed'));
      }),
      // Keep TinyMCE's native upload flow for paste functionality
      bootstrapConfig: {
        language: window.iso_user,
        url: `${config.baseUrlWebsite}js/tiny_mce/plugins/bootstrap/`,
        iconFont: 'fontawesome5',
        imagesPath: `${config.baseUrlWebsite}upload`,
        key: this.fetchKey ? this.fetchKey(window.location.hostname) : undefined,
        enableTemplateEdition: true,
        elements: { // only the following elements will be added to the toolbar
          btn: true,
          icon: true,
          template: false,
          alert: true,
          card: false,
          elements: false,
        },
      },
      editorStyleFormats: {
        textStyles: true,
        blockStyles: true,
        containerStyles: true,
        responsive: ['xs', 'sm'],
        spacing: ['all', 'x', 'y', 'top', 'right', 'bottom', 'left'],
      },
      style_formats_autohide: true,
      editor_selector: ComponentsMap.tineMceEditor.selectorClass,
      init_instance_callback: () => { this.changeToMaterial(); },
      setup: (editor) => { this.setupEditor(editor); },
      ...config,
    };

    if (typeof window.defaultTinyMceConfig !== 'undefined') {
      Object.assign(cfg, window.defaultTinyMceConfig);
    }
    if (typeof cfg.editor_selector !== 'undefined') {
      cfg.selector = `.${cfg.editor_selector}`;
    }

    // Defensive mapping for legacy toolbar configs (TinyMCE 4 -> 5)
    if (!cfg.toolbar) {
      const legacyToolbar = [cfg.toolbar1, cfg.toolbar2, cfg.toolbar3].filter(Boolean).join(' ');
      if (legacyToolbar) {
        cfg.toolbar = legacyToolbar.replace(/,/g, ' ');
      }
    }
    delete cfg.toolbar1;
    delete cfg.toolbar2;
    delete cfg.toolbar3;

    EventEmitter.emit('initTinyMCE', {config: cfg});

    $('body').on('click', '.mce-btn, .mce-open, .mce-menu-item', () => {
      this.changeToMaterial();
    });

    // Ensure legacy alias exists when running TinyMCE 5+
    if (typeof window.tinyMCE === 'undefined' && typeof window.tinymce !== 'undefined') {
      window.tinyMCE = window.tinymce;
    }
    window.tinyMCE.init(cfg);
    this.watchTabChanges(cfg);
  }

  fetchKey(hostname) {
    const keys = {
      'bouwstaalmat.nl': '',
      'bouwstaalmat.viho.nl': '',
      'constructiebalk.nl': '3wORV+ZdWifIWnUWSxdAUtCPcNfJnjU/DMxjcGDxcZnBQVJgpRjWdVZMdqAhsj5pbZd3c/h/s41crmf9zwJuv3VrO/4pkSLOmAdBZJT3W6Y=',
      'constructieklus.nl': '',
      'constructieklus.viho.nl': '',
      'demodernesmid.nl': '',
      'demodernesmid.viho.nl': 'cO4FCAY9a7EYM+WNt80HO+zP8NYYqmVXAXbxgL6gbmPashb4b9GpWNnBUAErfRNXXYLw30+WTmQ6IQvaGJ1N8A==',
      'gerofitness.nl': '',
      'gerofitness.viho.nl': '',
      'ijzershop.frl': 'paLRcpM5PcDm1duliaErNH68VcRsntx2MacT2bqMPdq9je0ISiUiWoBLH1+eLBLTCEyySTXdHIxel6w2Aceuki8+MEabGVzHjNngtZBzun4=',
      'ijzershop.nl': 'n8ampBLr4qZSJqSCe4Sf0bxgNwjjsIStecJ7VbWmWRUHekl8RRhtoDbQJy9WmCKfWF0EU/4Aqc/i/65mnZtQ01nw0GXPr/2zKFNaNuwdDRY=',
      'ijzershop.eu': 'n8ampBLr4qZSJqSCe4Sf0bxgNwjjsIStecJ7VbWmWRUHekl8RRhtoDbQJy9WmCKfWF0EU/4Aqc/i/65mnZtQ01nw0GXPr/2zKFNaNuwdDRY=',
      'modernesmid-webshop.local': 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpmftIOvjnss+mhviBjMWYpzfTD8gujkxPFveiunw80iXmfbHphHun6k0qBPJyPtFC8=',
      'paneelhek.nl': '',
      'paneelhek.viho.nl': '',
      'viho.nl': 'paLRcpM5PcDm1duliaErNH68VcRsntx2MacT2bqMPdq9je0ISiUiWoBLH1+eLBLTCEyySTXdHIxel6w2Aceuki8+MEabGVzHjNngtZBzun4=',
    };

    if (Object.prototype.hasOwnProperty.call(keys, hostname)) {
      return keys[hostname];
    }
    return 'n8ampBLr4qZSJqSCe4Sf0bxgNwjjsIStecJ7VbWmWRUHekl8RRhtoDbQJy9WmCKfWF0EU/4Aqc/i/65mnZtQ01nw0GXPr/2zKFNaNuwdDRY=';
  }

  setupEditor(editor) {
    // Flmngr automatically registers its own button and file picker
    // No need to manually register a file manager button

    editor.on('loadContent', (event) => {
      this.handleCounterTiny(event.target.id);
    });
    editor.on('change', (event) => {
      window.tinyMCE.triggerSave();
      this.handleCounterTiny(event.target.id);
    });
    editor.on('blur', () => { window.tinyMCE.triggerSave(); });
    EventEmitter.emit('tinymceEditorSetup', {editor});
  }

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

          if (editor) { editor.setContent(editor.getContent()); }
          EventEmitter.emit('languageSelected', {selectedLocale: textareaLocale, form});
        });
      }
    });
    EventEmitter.on('languageSelected', (data) => {
      const textareaLinkSelector = `.nav-item a[data-locale="${data.selectedLocale}"]`;
      $(textareaLinkSelector).click();
    });
  }

  loadAndInitTinyMCE(config) {
    if (this.tinyMCELoaded) { return; }
    this.tinyMCELoaded = true;
    // Load TinyMCE v5 from CDN. Use a configurable Tiny Cloud API key when available
    // to remove the watermark and comply with Tiny Cloud usage. Fallback to `no-api-key`.
    const apiKey = this.resolveTinyCloudApiKey();
    const tinymceCdn = `https://cdn.tiny.cloud/1/${apiKey || 'thywktdun16es73fx5ko6wc3uuw0nqqn50t9w5i3cygksqba'}/tinymce/5/tinymce.min.js`;
    $.getScript(tinymceCdn, () => {
      // Create legacy alias for code paths using window.tinyMCE
      if (typeof window.tinyMCE === 'undefined' && typeof window.tinymce !== 'undefined') {
        window.tinyMCE = window.tinymce;
      }
      // Initialize Flmngr with TinyMCE
      if (typeof Flmngr !== 'undefined' && typeof Flmngr.load === 'function') {
        Flmngr.load({
          apiKey: 'oLYgeawoG7PR53HJ58cjWLzX',
          urlFileManager: 'https://fm.flmngr.com/fileManager',
          urlFiles: `${config.baseUrlWebsite}upload/`,
        });
      }
      this.setupTinyMCE(config);
    });
  }

  // Try to resolve Tiny Cloud API key from multiple sources so projects can configure it
  // without code changes. Priority:
  // 1) window.ms.tinyApiKey
  // 2) window.prestashop.ms.tinyApiKey
  // 3) window.TINYMCE_API_KEY
  // 4) <meta name="tinymce-api-key" content="..."> or body[data-tiny-api-key]
  // Returns undefined if no key is provided, which falls back to `no-api-key`.
  resolveTinyCloudApiKey() {
    try {
      const w = window || {};
      const fromMs = w.ms && typeof w.ms.tinyApiKey === 'string' ? w.ms.tinyApiKey.trim() : '';
      if (fromMs) { return fromMs; }

      const fromPs = w.prestashop && w.prestashop.ms && typeof w.prestashop.ms.tinyApiKey === 'string'
        ? w.prestashop.ms.tinyApiKey.trim() : '';
      if (fromPs) { return fromPs; }

      const fromGlobal = typeof w.TINYMCE_API_KEY === 'string' ? w.TINYMCE_API_KEY.trim() : '';
      if (fromGlobal) { return fromGlobal; }

      const meta = document && document.querySelector
        ? document.querySelector('meta[name="tinymce-api-key"]') : null;
      const fromMeta = meta && meta.getAttribute('content') ? meta.getAttribute('content').trim() : '';
      if (fromMeta) { return fromMeta; }

      const bodyKey = document && document.body && document.body.dataset
        ? (document.body.dataset.tinyApiKey || '').trim() : '';
      if (bodyKey) { return bodyKey; }
    } catch (e) {
      // ignore resolution errors and fall back
    }
    return 'thywktdun16es73fx5ko6wc3uuw0nqqn50t9w5i3cygksqba';
  }

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
    $.each(materialIconAssoc, (index, value) => { $(`.${index}`).replaceWith(value); });
  }

  handleCounterTiny(id) {
    const textarea = $(`#${id}`);
    const counter = textarea.attr('counter');
    const counterType = textarea.attr('counter_type');
    const editor = window.tinyMCE.get(id);
    const max = editor.getBody() ? editor.getBody().textContent.length : 0;
    textarea.parent().find('span.currentLength').text(max);
    if (counterType !== 'recommended' && max > counter) {
      textarea.parent().find('span.maxLength').addClass('text-danger');
    } else {
      textarea.parent().find('span.maxLength').removeClass('text-danger');
    }
  }
}

export default TinyMCEEditor;
