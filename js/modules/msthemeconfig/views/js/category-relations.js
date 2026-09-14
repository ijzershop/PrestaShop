(function () {
  'use strict';

  function initialize(collection) {
    if (collection.dataset.msInitialized === '1') return;
    collection.dataset.msInitialized = '1';

    var help = document.getElementById(collection.id + '_help') || document.createElement('p');
    help.className = 'form-text mb-3';
    help.textContent = collection.dataset.help;
    collection.insertBefore(help, collection.firstChild);
    if (collection.dataset.enabled !== '1') return;

    var maxRows = Number(collection.dataset.maxRelations) || 20;
    var nextIndex = 0;
    var status = document.createElement('p');
    status.className = 'form-text mb-2';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    var add = button('Categorie toevoegen', 'add');
    collection.appendChild(status);
    collection.appendChild(add);

    function rows() {
      return Array.prototype.slice.call(collection.querySelectorAll('[data-ms-relation-row]'));
    }

    // Symfony wraps each entry in form_row markup; move/remove that whole wrapper.
    function wrapper(row) {
      var element = row;
      while (element.parentElement && element.parentElement !== collection) element = element.parentElement;
      return element;
    }

    function button(label, action) {
      var element = document.createElement('button');
      element.type = 'button';
      element.className = 'btn btn-outline-secondary btn-sm mr-2';
      element.dataset.msRelationAction = action;
      element.textContent = label;
      return element;
    }

    function enhance(row) {
      if (row.dataset.msInitialized === '1') return;
      row.dataset.msInitialized = '1';
      var select = row.querySelector('select');
      var match = select && select.name.match(/\[(\d+)\]\[id_related_category\]$/);
      if (match) nextIndex = Math.max(nextIndex, Number(match[1]) + 1);
      var controls = document.createElement('div');
      controls.className = 'mt-2';
      controls.appendChild(button('Omhoog', 'up'));
      controls.appendChild(button('Omlaag', 'down'));
      controls.appendChild(button('Verwijderen', 'remove'));
      row.appendChild(controls);
    }

    function update(message) {
      var entries = rows();
      var selected = {};
      entries.forEach(function (row, index) {
        var position = row.querySelector('[data-ms-relation-position]');
        if (position) position.value = String(index);
        var select = row.querySelector('select');
        if (select) {
          select.setCustomValidity(select.value && selected[select.value] ? 'Kies elke aanvullende categorie slechts één keer.' : '');
          if (select.value) selected[select.value] = true;
        }
        var up = row.querySelector('[data-ms-relation-action="up"]');
        var down = row.querySelector('[data-ms-relation-action="down"]');
        up.disabled = index === 0;
        down.disabled = index === entries.length - 1;
        [up, down, row.querySelector('[data-ms-relation-action="remove"]')].forEach(function (control) {
          control.setAttribute('aria-label', control.textContent + ': koppeling ' + (index + 1));
        });
      });
      add.disabled = entries.length >= maxRows;
      status.textContent = (message ? message + ' ' : '') + entries.length + ' van maximaal ' + maxRows + ' koppelingen. Sla de categorie op om wijzigingen te bewaren.';
    }

    rows().forEach(enhance);
    update();
    collection.addEventListener('change', function () { update(); });
    collection.addEventListener('click', function (event) {
      var control = event.target.closest('[data-ms-relation-action]');
      if (!control || !collection.contains(control)) return;
      var action = control.dataset.msRelationAction;
      if (action === 'add') {
        if (rows().length >= maxRows || !collection.dataset.prototype) return;
        var template = document.createElement('template');
        template.innerHTML = collection.dataset.prototype.replace(/__name__/g, String(nextIndex++));
        var added = template.content.querySelector('[data-ms-relation-row]');
        collection.insertBefore(template.content, status);
        if (!added) return;
        enhance(added);
        update('Koppeling toegevoegd.');
        added.querySelector('select').focus();
        return;
      }

      var row = control.closest('[data-ms-relation-row]');
      if (!row) return;
      var entries = rows();
      var index = entries.indexOf(row);
      if (action === 'remove') {
        wrapper(row).remove();
        update('Koppeling verwijderd.');
        var remaining = rows();
        if (remaining.length) remaining[Math.min(index, remaining.length - 1)].querySelector('select').focus();
        else add.focus();
      } else if (action === 'up' && index > 0) {
        collection.insertBefore(wrapper(row), wrapper(entries[index - 1]));
        update('Koppeling omhoog verplaatst.');
        row.querySelector('select').focus();
      } else if (action === 'down' && index < entries.length - 1) {
        collection.insertBefore(wrapper(entries[index + 1]), wrapper(row));
        update('Koppeling omlaag verplaatst.');
        row.querySelector('select').focus();
      }
    });
  }

  function boot() {
    document.querySelectorAll('[data-ms-category-relations]').forEach(initialize);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
