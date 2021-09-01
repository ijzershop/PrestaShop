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

function fetchKey(hostname) {
  var keys = [];
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
  keys["ijzershop176.local"] =  "cC0luxUtaZy9sMivhCZz+PbOGbkvLEdccW5/Y484dpmftIOvjnss+mhviBjMWYpzfTD8gujkxPFveiunw80iXmfbHphHun6k0qBPJyPtFC8="; //SET
  keys["paneelhek.nl"] =  "";
  keys["paneelhek.viho.nl"] =  "";
  keys["viho.nl"] =  "paLRcpM5PcDm1duliaErNH68VcRsntx2MacT2bqMPdq9je0ISiUiWoBLH1+eLBLTCEyySTXdHIxel6w2Aceuki8+MEabGVzHjNngtZBzun4="; //Set

    return keys[hostname];

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
    }
    var tbpKey = this.fetchKey(window.location.hostname);

  var default_config = {
    selector: 'textarea.rte',
    plugins: ['link', 'table', 'media', 'advlist', 'code', 'table', 'autoresize', 'bootstrap', 'fullscreen', 'responsivefilemanager','paste', 'lists'],
    browser_spellcheck: true,
    toolbar: "undo redo code | bold italic underline strikethrough | numlist bullist checklist | fullscreen responsivefilemanager | fontselect fontsizeselect formatselect styleselect | alignleft aligncenter alignright alignjustify | outdent indent | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments | bootstrap",
    paste_data_images: true,
    paste_preprocess: function(plugin, args) {
      let m;
      const content = args.content;
      const regex = new RegExp('^<img.*?src=\"(.*?)\"');
      if(regex.test(content))
      {
        //is an image do nothing
        return false;
      } else {
        //is text strip all
        m = content.replace(/(<([^>]+)>)/gi, "");
        args.content = m;
      }
    },
    contextmenu: "bootstrap",
    image_advtab: true ,
    external_filemanager_path:"/js/filemanager/",
    filemanager_title:"Bestands beheer" ,
    external_plugins: { "filemanager" : "/js/filemanager/plugin.min.js"},
    bootstrapConfig: {
      language: iso_user,
      url: base_url + 'js/tiny_mce/plugins/bootstrap/',
      iconFont: 'fontawesome5',
      imagesPath: '/upload',
      key: tbpKey,
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
    images_upload_handler: function (blobInfo, success, failure, progress) {
      let xhr, formData;
      const url = '/index.php?fc=module&module=modernesmidthemeconfigurator&controller=ajax&id_lang=1';
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
        success('/upload'+json.location);
        top.tinymce.activeEditor.notificationManager.close();
      };
      xhr.send(formData);
      return false;
    }
  };
  $.each(default_config, function(index, el) {
    if (config[index] === undefined)
      config[index] = el;
  });
  tinyMCE.init(config);
}
