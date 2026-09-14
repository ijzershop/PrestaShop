/**
 *  @author    N1ED http://n1ed.com
 *  @copyright N1ED/EdSDK
 *  @license   Proprietary license
 */

$(document).ready(function () {
  $("textarea").each(function (index, textarea) {
    if (
        $('textarea[id="' + textarea.id + '"]').hasClass("autoload_rte") &&
        !$('textarea[id="' + textarea.id + '"]').hasClass("n1ed")
    ) {
      $('textarea[id="' + textarea.id + '"]')
          .removeClass("autoload_rte")
          .addClass("n1ed");
    }
  });

  if (window.controller == "AdminCmsContent") {
    if (window.prestashop_16)
      $("#cms_category_form textarea.textarea-autosize").addClass("n1ed");
    else
      $('textarea[id*="cms_page_category_description"]').addClass("n1ed");
  }

  // Editing regular CMS pages
  function setupNowAdminCmsContent() {
    var elEditor = document.querySelector(".n1ed");

      // Are we now as CMS page editor?
      var elEditorGroup = elEditor.closest(".form-group");
      var elTitle = document.querySelector("#cms_page_title_1");
      var elTitleGroup = elTitle && elTitle.closest(".form-group");
      if (!!elEditor && !!elEditorGroup && !!elTitle && !!elTitleGroup) {

        var elEditorWrap = document.createElement("div");
        elEditorWrap.className = "form-group row";

        var elEditorWrap2 = document.createElement("div");
        elEditorWrap2.className = "col-sm";

        elEditorWrap.appendChild(elEditorWrap2);
        elEditorWrap2.appendChild(elEditor.closest(".translations") || elEditor);

        var elTranslationFields = elEditorWrap2.querySelector(".translationsFields");
        elTranslationFields.style.marginTop = "-1px";

        elEditorGroup.parentElement.removeChild(elEditorGroup);

        elTitleGroup.parentElement.insertBefore(elEditorWrap, elTitleGroup.nextSibling);
      }
  }

  // Editing shop products
  function setupNowAdminProducts() {
    var elsEditors = document.querySelectorAll(".n1ed");
    for (var i=0; i<elsEditors.length; i++) {
      var elEditor = elsEditors.item(i);
      elEditor.parentElement.style.margin = "-1px";

      var elForm = elEditor.closest("#form-loading");
      if (!!elForm) {
        elForm.classList = "col-xxl-12"; // instead of col-xxl-10
      }
    }
  }

  // Editing categories
  function setupNowAdminCategories() {
    // do not change anything on such pages
  }

  function setupNow() {

    switch (window.controller) {
      case "AdminCmsContent": setupNowAdminCmsContent(); break;
      case "AdminProducts": setupNowAdminProducts(); break;
      case "AdminCategories": setupNowAdminCategories(); break;
    }

    // N1ALL compatibility patch: when tinymce.init() creates editors one by one,
    // N1ALL may call tinymce.get(id) for an editor not yet created, returning
    // undefined and crashing on .options.set(). Return a safe no-op mock instead.
    var _origGet = tinymce.get;
    tinymce.get = function (id) {
      var result = _origGet.apply(tinymce, arguments);
      if (result === undefined || result === null) {
        return {
          options: {
            set: function () {},
            get: function () { return null; },
            isSet: function () { return false; },
            register: function () {}
          }
        };
      }
      return result;
    };

    tinymce.init({
      selector: ".n1ed",
      urlFileManager: (window.N1ED_MODULE_URL || "/modules/n1ed/") + "flmngr/index.php",
      urlFiles: window.N1ED_FILES_URL || "/img/cms/",
      integration: "prestashop",
      apiKey: N1ED_APIKEY,
      token: N1ED_TOKEN,
      relative_urls: false,
      width: "100%"
    }).then(function () {
      tinymce.get = _origGet;
    });

  }

  function includeJS(urlJS, doc, callback) {
    if (!doc) {
      doc = document;
    }
    var scripts = doc.getElementsByTagName("script");
    var alreadyExists = false;
    var existingScript = null;
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src");
      if (src && src.indexOf(urlJS) !== -1) {
        alreadyExists = true;
        existingScript = scripts[i];
      }
    }
    if (!alreadyExists) {
      var script = doc.createElement("script");
      script.type = "text/javascript";
      if (callback != null) {
        if (script.readyState) {
          // IE
          script.onreadystatechange = function () {
            if (
              script.readyState === "loaded" ||
              script.readyState === "complete"
            ) {
              script.onreadystatechange = null;
              callback(false);
            }
          };
        } else {
          // Others
          script.onload = function () {
            callback(false);
          };
        }
      }
      script.src = urlJS;
      doc.getElementsByTagName("head")[0].appendChild(script);
      return script;
    } else {
      if (callback != null) {
        callback(true);
      }
      return null;
    }
  }

  function waitForN1ED() {
    if (window.tinymce) {
      setupNow();
    } else {
      setTimeout(function () {
        waitForN1ED();
      }, 10);
    }
  }

  function waitForTinyMCE() {
    if (window.tinymce) {
      tinymce.remove();
      delete window.tinymce;
      delete window.tinyMCE;

      includeJS(
        "https://cloud.n1ed.com/cdn/" + N1ED_APIKEY + "/n1tinymce.js",
        document,
        function () {
          waitForN1ED();
        }
      );
    } else {
      setTimeout(function () {
        waitForTinyMCE();
      }, 10);
    }
  }

  waitForTinyMCE();

});
