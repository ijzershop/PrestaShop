<div class="panel">
<style type="text/css">
  /* Bootstrap 5 Essential Styles for catalog_backup.tpl */

  /* Box sizing */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Grid columns */
  [class*="col-"] {
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 992px) {
    .col-lg-2 { width: 16.666667%; }
    .col-lg-10 { width: 83.333333%; }
  }

  /* Buttons */
  .btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .btn:hover {
    color: #212529;
  }

  .btn:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }

  .btn-primary {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
  }

  .btn-primary:hover {
    color: #fff;
    background-color: #0b5ed7;
    border-color: #0a58ca;
  }

  .btn-primary:focus {
    box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
  }

  .btn-warning {
    color: #000;
    background-color: #ffc107;
    border-color: #ffc107;
  }

  .btn-warning:hover {
    color: #000;
    background-color: #ffca2c;
    border-color: #ffc720;
  }

  .btn-warning:focus {
    box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);
  }

  /* Forms */
  .form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .form-control:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }

  .form-control::placeholder {
    color: #6c757d;
    opacity: 1;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-horizontal .form-group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .control-label {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    margin-bottom: 0;
    font-weight: 500;
  }

  .help-block {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #6c757d;
  }

  /* Labels/Badges */
  .label {
    display: inline-block;
    padding: 0.35em 0.65em;
    font-size: 0.75em;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    border-radius: 0.25rem;
  }

  .label-default {
    background-color: #6c757d;
  }

  .label-info {
    background-color: #0dcaf0;
    color: #000;
  }

  .label-warning {
    background-color: #ffc107;
    color: #000;
  }

  .label-danger {
    background-color: #dc3545;
  }

  /* Panel */
  .panel {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .panel h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
  }

  /* Code */
  code {
    font-size: 0.875em;
    color: #d63384;
    background-color: #f8f9fa;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
  }

  /* Horizontal rule */
  hr {
    margin: 1rem 0;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  /* Icon spacing */
  .btn i, h3 i {
    margin-right: 0.5rem;
  }
</style>


  <h3><i class="icon-database"></i> {l s='Catalog backup/restore' mod='msthemeconfig'}</h3>

  <p>
    {l s='This tool lets you create a full 1:1 backup of categories, products, combinations, features, tags, specific prices, stock and images, and restore it into a clean shop. Artifacts are written to:' mod='msthemeconfig'}
    <code>{$data_dir|escape:'htmlall'}</code>
  </p>

  <div class="form-horizontal">
    <div class="form-group">
      <label class="control-label col-lg-2">{l s='Export catalog' mod='msthemeconfig'}</label>
      <div class="col-lg-10">
        <button id="ms-export" class="btn btn-primary">
          <i class="icon-download"></i> {l s='Start export' mod='msthemeconfig'}
        </button>
        <span class="help-block">
          {l s='Writes JSON and image ZIP parts into scripts/data. The console output appears below.' mod='msthemeconfig'}
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="control-label col-lg-2">{l s='Import catalog' mod='msthemeconfig'}</label>
      <div class="col-lg-10">
        <input type="text" id="ms-import-json" class="form-control" placeholder="{$data_dir|escape:'htmlall'}/catalog-export-YYYYMMDDHHMMSS.json" />
        <div style="margin-top:8px">
          <button id="ms-import" class="btn btn-warning">
            <i class="icon-upload"></i> {l s='Start import (strict shops, wipe catalog)' mod='msthemeconfig'}
          </button>
        </div>
        <span class="help-block">
          {l s='Restores into this shop with the original IDs. Use on a new/empty target. The console output appears below.' mod='msthemeconfig'}
        </span>
      </div>
    </div>
  </div>

  <hr/>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css" />
  <div id="terminal" style="height:380px;border:1px solid #ccc;border-radius:4px"></div>
  <div style="margin-top:6px">
    <span id="ms-status" class="label label-default">{l s='Idle' mod='msthemeconfig'}</span>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.min.js"></script>
<script>
  (function() {
    let controllerLink = '{$controller_link}';
    let term = new window.Terminal({ convertEol: true, disableStdin: true, fontFamily: 'monospace', fontSize: 12 });
    term.open(document.getElementById('terminal'));
    let statusEl = document.getElementById('ms-status');
    let tailTimer = null, tailOffset = 0, tailLog = null;

    function setStatus(text, cls) {
      statusEl.textContent = text;
      statusEl.className = 'label ' + (cls || 'label-default');
    }

    function startTail(logPath) {
      if (!logPath) return;
      tailLog = logPath; tailOffset = 0;
      if (tailTimer) { clearInterval(tailTimer); }
      tailTimer = setInterval(function() {
        let url = controllerLink + '&ajax=1&action=Tail&log=' + encodeURIComponent(tailLog) + '&offset=' + tailOffset;
        fetch(url, { credentials: 'same-origin' }).then(r => r.json()).then(function(j){
          if (!j || !j.ok) return;
          if (j.data) { term.write(j.data.replace(/\n/g, '\r\n')); }
          tailOffset = j.offset || tailOffset;
        }).catch(function(){});
      }, 900);
    }

    function startExport() {
      term.clear(); setStatus('Export running...', 'label-info');
      let url = controllerLink + '&ajax=1&action=StartExport';
      fetch(url, { credentials: 'same-origin' }).then(r => r.json()).then(function(j){
        if (j && j.ok) { startTail(j.log); }
        else { setStatus('Export failed', 'label-danger'); }
      }).catch(function(){ setStatus('Export failed', 'label-danger'); });
    }

    function startImport() {
      let json = document.getElementById('ms-import-json').value.trim();
      if (!json) { alert('Please provide JSON path under scripts/data'); return; }
      term.clear(); setStatus('Import running...', 'label-warning');
      let url = controllerLink + '&ajax=1&action=StartImport&json=' + encodeURIComponent(json);
      fetch(url, { credentials: 'same-origin' }).then(r => r.json()).then(function(j){
        if (j && j.ok) { startTail(j.log); }
        else { setStatus('Import failed', 'label-danger'); if (j && j.error) term.write(j.error+'\r\n'); }
      }).catch(function(){ setStatus('Import failed', 'label-danger'); });
    }

    document.getElementById('ms-export').addEventListener('click', function(ev){ ev.preventDefault(); startExport(); });
    document.getElementById('ms-import').addEventListener('click', function(ev){ ev.preventDefault(); startImport(); });
  })();
</script>
