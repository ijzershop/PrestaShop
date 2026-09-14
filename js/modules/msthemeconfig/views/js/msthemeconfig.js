(function(){
  if (window._msThemeConfigInit) { return; }
  window._msThemeConfigInit = true;
  let homePageCategoriesSortable = {
    selectSelector: '#MSTHEMECONFIG_HOMEPAGE_CATEGORIES',
    sortedListSelector: '#home_categories_sorted',
    sortedListId: 'home_categories_sorted',
    sortedContainerId: 'home_categories_sorted_container',
    sortedInputSelector: '#MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED',
    sortedInputName: 'MSTHEMECONFIG_HOMEPAGE_CATEGORIES_SORTED'
  };
  let featureEnabledSortable = {
    selectSelector: '#MSTHEMECONFIG_FEATURE_ENABLED',
    sortedListSelector: '#feature_enabled_sorted',
    sortedListId: 'feature_enabled_sorted',
    sortedContainerId: 'feature_enabled_sorted_container',
    sortedInputSelector: '#MSTHEMECONFIG_FEATURE_ENABLED_SORTED',
    sortedInputName: 'MSTHEMECONFIG_FEATURE_ENABLED_SORTED'
  };

  function appendSortableItem($sortedList, id, text) {
    let $item = $('<li class="list-group-item"></li>').attr('data-id', id);
    $item.append('<i class="icon-move"></i> ');
    $item.append(document.createTextNode(text));
    $sortedList.append($item);
  }

  function setSortable($parentFormElement, settings) {
    let selectedArray = [];
    let $select = $parentFormElement.find(settings.selectSelector);
    let $sortedList = $parentFormElement.find(settings.sortedListSelector);
    let $sortedInput = $parentFormElement.find(settings.sortedInputSelector);

    if ($select.length === 0) {
      $select = $(settings.selectSelector);
    }

    if ($sortedList.length === 0) {
        // Fallback if template changes
        $parentFormElement.find('.col-xs-8').append('<div id="' + settings.sortedContainerId + '" class="mt-3">' +
            '<ol id="' + settings.sortedListId + '" class="ui-sortable list-group"></ol>' +
            '<input type="hidden" name="' + settings.sortedInputName + '" id="' + settings.sortedInputName + '"/>' +
            '</div>');
        $sortedList = $parentFormElement.find(settings.sortedListSelector);
        $sortedInput = $parentFormElement.find(settings.sortedInputSelector);
    }

    $sortedList.html('');

    // 1) Prefer the explicitly saved order if present
    try {
      var savedOrderRaw = $sortedInput.val();
      var savedOrder = [];
      if (savedOrderRaw && savedOrderRaw.trim() !== '') {
        try {
            savedOrder = JSON.parse(savedOrderRaw);
            // Handle cases where it's double encoded or a string representation of an array
            if (typeof savedOrder === 'string') { savedOrder = JSON.parse(savedOrder); }
        } catch(e) { savedOrder = []; }
      }

      var selectedMap = {};
      $select.find('option:selected').each(function (_, opt) {
        var id = String(opt.value);
        selectedMap[id] = opt.textContent;
      });

      // If we have a saved order, render selected items in that order first
      if (Array.isArray(savedOrder) && savedOrder.length) {
        savedOrder.forEach(function(id){
          id = String(id);
          if (selectedMap[id] !== undefined) {
            appendSortableItem($sortedList, id, selectedMap[id]);
            selectedArray.push(id);
            // mark as rendered
            delete selectedMap[id];
          }
        });
      }

      // Append any newly selected items that were not in saved order yet
      Object.keys(selectedMap).forEach(function(id){
        appendSortableItem($sortedList, id, selectedMap[id]);
        selectedArray.push(id);
      });
    } catch(e) {
      console.error("Error populating sortable list:", e);
      // Fallback: render in DOM order
      $select.find('option:selected').each(function (index, val) {
        appendSortableItem($sortedList, val.value, val.textContent);
        selectedArray.push(val.value);
      });
    }
    $sortedInput.val(JSON.stringify(selectedArray));


    if (!$sortedList.data('sortable-initialized')) {
      $sortedList.sortable({
        update: function () {
          let selectedArray = [];
          $sortedList.find('li').each(function (index, el) {
            selectedArray.push(String($(el).data('id')));
          });
          $sortedInput.val(JSON.stringify(selectedArray));
        }
      });
      $sortedList.data('sortable-initialized', true);
    }
  }

  $(document).on('select2:select select2:unselect', homePageCategoriesSortable.selectSelector, function () {
    let $parentFormElement = $(this).parents('.form-group');
    setSortable($parentFormElement, homePageCategoriesSortable);
  });

  $(document).on('select2:select select2:unselect', featureEnabledSortable.selectSelector, function () {
    let $parentFormElement = $(this).parents('.form-group');
    setSortable($parentFormElement, featureEnabledSortable);
  });


  function setEmailInputList($parentFormElement) {
    if ($parentFormElement.find('ol').length === 0) {
      $parentFormElement.append('<style type="text/css"> #extra_email_settings li{padding: 5px; border: 1px solid grey;} </style>');
      $parentFormElement.append('<ol id="extra_email_settings" class="col-xs-12 list-unstyled"></ol>');
    } else {
      $('#extra_email_settings').html('');
    }

    let jsonVal = $('#MSTHEMECONFIG_ORDERSTATE_SENDMAIL_JSON').val();
    if (typeof jsonVal !== 'undefined' && jsonVal !== '') {
      let existingData = JSON.parse(jsonVal);
      if (existingData !== null) {
        for (let i = 0; i < existingData.length; i++) {
          let statusText = existingData[i].id_order_state_text;
          let statusId = existingData[i].id_order_state;
          let statusFirstEmail = existingData[i].first_email_order_state;
          let statusSecondEmail = existingData[i].second_email_order_state;

          $('#extra_email_settings').append('<li data-id="' + statusId + '"><div class="row" data-id="' + statusId + '"> <div class="form-group col-xs-12" data-tab-id="email"><div class="form-group text-center" data-tab-id="email"><h2>Orderstatus: ' + statusText + '</h2></div> </div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Eerste email adres <input type="hidden" name="SENDMAIL_ORDER_STATUS[]" value="' + statusId + '"> </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_FIRST_EMAIL[]" value="' + statusFirstEmail + '" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon gezonden moet worden by order status wijziging </p></div></div><div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Tweede email adres </label> <div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> <input type="text" name="SENDMAIL_ORDER_STATUS_SECOND_EMAIL[]" value="' + statusSecondEmail + '" class=""> </div><p class="help-block"> Voeg een email adres toe waaraan de pakbon email CC moet worden </p></div></div><div class="form-group col-xs-2" data-tab-id="email"><label class="control-label col-lg-3"></label><div class="col-lg-9"><a class="btn btn-danger trash-sendmail-row" data-id="' + statusId + '"><i class="icon-trash"></i></a></div></div></li>');
        }
      }
    }
  }

  function setEmailInputRow($parentFormElement, statusText, statusId) {
    $('#extra_email_settings').append('<li data-id="' + statusId + '">' +
      '<div class="row" data-id="' + statusId + '"> ' +
      '<div class="form-group col-xs-12" data-tab-id="email">' +
      '<div class="form-group text-center" data-tab-id="email"><h2>Orderstatus: ' + statusText + '</h2></div> ' +
      '</div>' +
      '<div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Eerste email adres ' +
      '<input type="hidden" name="SENDMAIL_ORDER_STATUS[]" value="' + statusId + '"> </label> <div class="col-lg-9"> ' +
      '<div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> ' +
      '<input type="text" name="SENDMAIL_ORDER_STATUS_FIRST_EMAIL[]" value="" class=""> </div>' +
      '<p class="help-block"> Voeg een email adres toe waaraan de pakbon gezonden moet worden by order status wijziging </p></div></div>' +
      '<div class="form-group col-xs-5" data-tab-id="email"> <label class="control-label col-lg-3"> Tweede email adres </label> ' +
      '<div class="col-lg-9"> <div class="input-group"> <span class="input-group-addon"> <i class="icon-envelope"></i> </span> ' +
      '<input type="text" name="SENDMAIL_ORDER_STATUS_SECOND_EMAIL[]" value="" class=""> </div>' +
      '<p class="help-block"> Voeg een email adres toe waaraan de pakbon email CC moet worden</p></div></div>' +
      '<div class="form-group col-xs-2" data-tab-id="email"><label class="control-label col-lg-3"></label><div class="col-lg-9">' +
      '<a class="btn btn-danger trash-sendmail-row" data-id="' + statusId + '"><i class="icon-trash"></i></a></div></div></li>');
  }

  $(document).on('select2:select', '#MSTHEMECONFIG_ORDERSTATE_SENDMAIL', function (event) {

    event.preventDefault();
    let text = event.params.data.text;
    let value = event.params.data.id;
    let $parentFormElement = $(this).closest('.form-group');
    let exists = false;
    $('ol#extra_email_settings li').each(function (index, el) {
      if ($(el).attr('data-id') === value) {
        exists = true;
        return;
      }
    });

    if (!exists) {
      setEmailInputRow($parentFormElement, text, value);
    }
  });


  $(document).on('change', '#mailtheme-symlink', function(){
    let enabled = $(this).prop('checked');
    $.ajax({
      url: msThemeConfigSymLinkMailTheme + enabled,
      type: 'GET',
    }).done(function (e) {
      $('form#retourForm .messages').html(e);
    })
      .fail(function (e) {
        $('form#retourForm .messages').html(e);
      });
  });

  $(document).on('click', '.trash-sendmail-row', function (event) {
    event.preventDefault();
    let id = $(this).attr('data-id');
    $('#extra_email_settings li[data-id="' + id + '"]').remove();
  });



  function buildPanelUrl(base, panel){
    if(!base){ return ''; }
    // If base already contains a panel_name param, replace its value
    if (base.indexOf('panel_name=') !== -1) {
      return base.replace(/([?&]panel_name=)[^&#]*/i, function(_, p1){ return p1 + encodeURIComponent(panel); });
    }
    // Prefer path-style if base ends with '/'
    if(base.charAt(base.length-1) === '/'){
      return base + encodeURIComponent(panel);
    }
    // Otherwise fall back to query param
    var sep = base.indexOf('?') === -1 ? '?' : '&';
    return base + sep + 'panel_name=' + encodeURIComponent(panel);
  }

  function initSelect2(container){
    try{
      var jq = window.jQuery || window.$;
      if (!jq || !jq.fn || typeof jq.fn.select2 !== 'function') { return; }
      jq(container).find('select.select2-data-input').each(function(){
        var $el = jq(this);
        // Skip selects inside a closed collapse — the shown.bs.collapse handler will init them
        if ($el.closest('.collapse').filter(':hidden').length > 0) { return; }
        var dataType = $el.data('type') || 'pages';
        var base = (window.msThemeConfigSelect2Url || '');
        var ajaxUrl = base;
        try {
          if (base.indexOf('select2-get-data/') !== -1) {
            // Path-style route: /.../select2-get-data/{data_type}
            // Replace only the 'home' path segment, never touch the query string
            ajaxUrl = base.replace(/\/home(\?|#|$)/, '/' + encodeURIComponent(dataType) + '$1');
          } else {
            // Query-style: ...?data_type=
            ajaxUrl = base.replace(/data_type=\s*$/, 'data_type=' + encodeURIComponent(dataType));
          }
        } catch(e) { ajaxUrl = base; }
        $el.select2({
          width: '100%',
          theme: 'default',
          ajax: {
            delay: 250,
            url: ajaxUrl,
            dataType: 'json',
          },
          allowClear: true
        });
      });
    } catch(e) { /* noop */ }
  }

  function loadPanel(panel){
    var url = buildPanelUrl(window.msThemeConfigAjaxUrl, panel);
    var paneId = '#v-pills-' + panel.replace(/[^a-z0-9\-]/gi,'-');
    var $pane = window.jQuery ? window.jQuery(paneId) : null;
    if(!$pane || $pane.length === 0){ return; }

    // Show loading state
    $pane.html('<div class="alert alert-info">Laden...</div>');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        if (xhr.status >= 200 && xhr.status < 300){
          $pane.html(xhr.responseText);
          initSelect2($pane);
          // Wire up Bootstrap collapses for dynamically injected content
          try {
            wireCollapses($pane);
          } catch(e) { /* noop */ }
          // Re-init select2 inside collapsed sections when they open,
          // because select2 requires a visible parent at init time.
          try {
            $pane.off('shown.bs.collapse.msselect2').on('shown.bs.collapse.msselect2', function(e) {
              var $target = $(e.target);
              $target.find('select.select2-data-input').each(function() {
                if (!$(this).data('select2')) {
                  initSelect2($target);
                }
              });
            });
          } catch(e) { /* noop */ }
          // Initialize sortable list for homepage categories immediately after panel load
          try {
            var $homepageCategoriesSorted = $pane.find(homePageCategoriesSortable.sortedInputSelector);
            var $featureEnabledSorted = $pane.find(featureEnabledSortable.sortedInputSelector);
            var $orderStateSendMailSelect = $pane.find('#MSTHEMECONFIG_ORDERSTATE_SENDMAIL');
            if ($homepageCategoriesSorted && $homepageCategoriesSorted.length) {
              var $grp = $homepageCategoriesSorted.closest('.form-group');
              setSortable($grp, homePageCategoriesSortable);
            }
            if ($featureEnabledSorted && $featureEnabledSorted.length) {
              var $featureGrp = $featureEnabledSorted.closest('.form-group');
              setSortable($featureGrp, featureEnabledSortable);
            }
            if ($orderStateSendMailSelect && $orderStateSendMailSelect.length) {
              var $grp2 = $orderStateSendMailSelect.closest('.form-group');
              setEmailInputList($grp2);
            }
            if (typeof tinySetup === 'function') {
                tinySetup({
                    editor_selector: 'autoload_rte',
                    skin: 'oxide',
                  menubar: true,
                  statusbar: true,
                    // Force local N1ED file manager to avoid CORS issues with cloud fallback
                    urlFileManager: (window.location.origin || (window.location.protocol + "//" + window.location.host)) + "/modules/n1ed/flmngr/index.php"
                });
            }
          } catch (e) { /* noop */ }
        } else {
          $pane.html('<div class="alert alert-danger">Kon het paneel niet laden (' + panel + ').</div>');
        }
      }
    };
    xhr.send();
  }

  function onReady(){
    var $ = window.jQuery || window.$;
    if(!$){ return; }

    // Initial active tab content
    var $activeBtn = $('.tab-btn.active');
    var initialPanel = $activeBtn.data('panel') || 'home';
    loadPanel(initialPanel);

    // Hook tab clicks
    $(document).on('click', '.tab-btn', function(){
      var panel = $(this).data('panel');
      if(panel){ loadPanel(panel); }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // Helper: ensure collapse toggles work after AJAX panel injection
  function wireCollapses(container){
    var $ = window.jQuery || window.$;
    if(!$){ return; }
    var $root = $(container || document);

    // Find all toggle buttons/links that intend to control a collapse
    var $toggles = $root.find('[data-toggle="collapse"], [data-bs-toggle="collapse"], a[href^="#collapse"]');
    if (!$toggles.length) { return; }

    var isBS5 = !!(window.bootstrap && window.bootstrap.Collapse);

    $toggles.each(function(){
      var $t = $(this);
      var targetSel = $t.attr('data-bs-target') || $t.attr('data-target') || '';
      // Fallback: some templates use <a href="#collapseX"> without data-* attributes
      if (!targetSel) {
        var href = $t.attr('href');
        if (href && href.charAt(0) === '#') {
          targetSel = href;
        }
      }
      if (!targetSel) { return; }

      // Normalize attributes for BS5 while keeping backward compatibility
      if (isBS5) {
        if (!$t.attr('data-bs-toggle')) { $t.attr('data-bs-toggle', 'collapse'); }
        if (!$t.attr('data-bs-target')) { $t.attr('data-bs-target', targetSel); }
      }

      // Initialize collapse instance on target without toggling state
      try {
        var $target = $root.find(targetSel);
        // If not found within container, try global lookup (in case of id outside current root)
        if ((!$target || !$target.length) && targetSel.charAt(0) === '#') {
          $target = $(targetSel);
        }
        if ($target && $target.length) {
          // Ensure target has collapse class for proper styling/behavior
          if (!$target.hasClass('collapse')) { $target.addClass('collapse'); }
          if (isBS5) {
            // Avoid duplicate instances
            var el = $target.get(0);
            var existing = el && window.bootstrap ? window.bootstrap.Collapse.getInstance(el) : null;
            if (!existing) {
              // eslint-disable-next-line no-new
              new window.bootstrap.Collapse(el, { toggle: false });
            }
          } else if (typeof $target.collapse === 'function') {
            // jQuery plugin (BS3/4)
            $target.collapse({ toggle: false });
          }
        }
      } catch(e) { /* ignore */ }
    });
  }

  // Expand collapsed parents and focus invalid inputs on submit to avoid
  // "invalid form control is not focusable" errors in collapsed panels/tabs
  (function setupInvalidFocusGuard(){
    var $ = window.jQuery || window.$;
    if(!$){ return; }

    // Delegate on document to handle dynamically injected panel forms
    $(document).on('submit', 'form', function(){
      var form = this;
      var $form = $(form);
      // Scope: only act for this module's config forms (presence of MSTHEMECONFIG fields)
      if ($form.find('[name^="MSTHEMECONFIG_"]').length === 0) { return true; }

      // Find first invalid control using native constraint validation
      var invalid = null;
      try { invalid = form.querySelector(':invalid'); } catch(e) { invalid = null; }
      if (!invalid) { return true; }

      var $invalid = $(invalid);

      // Expand any collapsed ancestors (Bootstrap 3/4/5 compatible)
      $invalid.parents('.collapse').each(function(){
        var $c = $(this);
        try {
          var isShown = $c.hasClass('in') || $c.hasClass('show') || $c.is(':visible');
          if (!isShown) {
            if (typeof $c.collapse === 'function') {
              $c.collapse('show');
            }
            // Also force classes for safety across BS versions
            $c.addClass('in show').css('height', 'auto');
          }
        } catch(e) { /* noop */ }
      });

      // Activate parent tab if the field is inside a tab pane
      var $tabPane = $invalid.closest('.tab-pane');
      if ($tabPane.length) {
        var id = $tabPane.attr('id');
        if (id) {
          var $trigger = $('a[href="#' + id + '"]');
          if (!$trigger.length) {
            $trigger = $('[data-bs-target="#' + id + '"], [data-target="#' + id + '"]');
          }
          if ($trigger.length) { $trigger.first().trigger('click'); }
          $tabPane.addClass('active show');
        }
      }

      // Attempt to focus the invalid control after opening its containers
      setTimeout(function(){
        try { invalid.focus({ preventScroll: false }); } catch(e) { $invalid.focus(); }
      }, 50);

      // Allow native validation to proceed (do not preventDefault here)
      return true;
    });
  })();
})();
