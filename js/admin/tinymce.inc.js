/**
 * Change default icons to marerial icons
 */
function changeToMaterial() {
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
    'mce-i-checkbox': '<i class="mce-ico mce-i-checkbox"></i>',
  };

  $.each(materialIconAssoc, function(index, value) {
    $('.' + index).replaceWith(value);
  });
}

function tinySetup(config) {
  if (typeof tinyMCE === 'undefined') {
    setTimeout(function() {
      tinySetup(config);
    }, 100);
    return;
  }

  if (!config) {
    config = {};
  }

  if (typeof config.editor_selector != 'undefined') {
    config.selector = '.' + config.editor_selector;
  }

    if (typeof (base_url) == "undefined") {
        // detect the root url
        var base_url = location.protocol + '//' + location.host + '/';
        // detect localhost
        // the value must include your local window.location.hostname
        const LOCAL_DOMAINS = ["localhost", "127.0.0.1", "ijzershop176.local"];
        if (LOCAL_DOMAINS.includes(window.location.hostname)) {
            var tbpKey = 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q=';
        } else {
            var tbpKey = 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q='; // replace with your production server key
        }
    }

  var default_config = {
    selector: "textarea.rte",
    plugins: ['link', 'image', 'table', 'media', 'advlist', 'code', 'table', 'autoresize', 'bootstrap','fullscreen'],
    browser_spellcheck: true,
    toolbar: "undo redo code image | bold italic underline strikethrough | fontselect fontsizeselect formatselect styleselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments | bootstrap | fullscreen",
    toolbar2: false,
    contextmenu: "bootstrap",
    bootstrapConfig: {
      language: iso_user, 
      url: base_url + 'js/tiny_mce/plugins/bootstrap/',
      iconFont: 'fontawesome5',
      imagesPath: '/upload',
      key: 'cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpntwY68zKhPuBBBfiucVaylNhbNzuWdxME7vwNnVxE8VOFkf7RlqjEyxMsiu6eEK7Q=',
      enableTemplateEdition: false,
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
    content_style: (lang_is_rtl === '1' ? "body {direction:rtl;}" : ""),
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
  images_upload_handler: function (blobInfo, success, failure) {
  var xhr, formData;
  xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('POST', '/custom_uploader/upload.php');

  var file = document.querySelectorAll('.tox-form input')[0].files[0];  
    formData = new FormData();
    formData.append('path','');
    formData.append('path_thumb','');
    formData.append('file', file, file.name);
    xhr.send(formData);
    xhr.onload = function() {
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
    }
  };
  $.each(default_config, function(index, el) {
    if (config[index] === undefined)
      config[index] = el;
  });
  tinyMCE.init(config);
}