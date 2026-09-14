<div class="modal fade" id="plasma-modal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="plasma-modal-title" aria-describedby="plasma-sheet-notice"
     data-error="{l s='We could not process this drawing. Please try again.' mod='msthemeconfig'}"
     data-file-error="{l s='Please select one DXF or SVG drawing.' mod='msthemeconfig'}"
     data-file-size-error="{l s='The drawing must be smaller than 10 MB.' mod='msthemeconfig'}"
     data-empty-library="{l s='No parts found.' mod='msthemeconfig'}"
     data-loading="{l s='Processing your drawing and calculating the full-sheet price…' mod='msthemeconfig'}"
     data-library-loading="{l s='Loading the parts library…' mod='msthemeconfig'}"
     data-ready="{l s='Your drawing is ready to order.' mod='msthemeconfig'}"
     data-added="{l s='Your configured sheet has been added to your cart.' mod='msthemeconfig'}"
     data-adding="{l s='Adding your configured sheet to the cart…' mod='msthemeconfig'}"
     data-quantity-error="{l s='Enter a whole number of sheets between 1 and 100.' mod='msthemeconfig'}"
     data-drawing-changed="{l s='Your drawing has changed. Upload the updated file to calculate a new price.' mod='msthemeconfig'}"
     data-contour-label="{l s='Cut line' mod='msthemeconfig'}"
     data-position-error="{l s='Enter a valid position that keeps the whole drawing inside the sheet.' mod='msthemeconfig'}"
     data-unavailable="{l s='Plasma cutting is temporarily unavailable. Please try again later.' mod='msthemeconfig'}">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="plasma-modal-title">{l s='Configure plasma cutting' mod='msthemeconfig'}</h4>
        <button type="button" class="close btn btn-outline-secondary text-dark" data-dismiss="modal" data-bs-dismiss="modal" aria-label="{l s='Close' mod='msthemeconfig'}"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <p class="alert alert-info" id="plasma-sheet-notice">{l s='You buy one complete 1000 × 500 mm sheet per quantity. Your cut parts and the remaining material are shipped together as one complete sheet.' mod='msthemeconfig'}</p>
        <div class="nav nav-tabs plasma-tabs" role="tablist" aria-label="{l s='Choose your drawing' mod='msthemeconfig'}">
          <button type="button" class="nav-link active" id="plasma-upload-tab" role="tab" aria-selected="true" aria-controls="plasma-upload-panel" data-plasma-tab="upload">{l s='Upload your own file' mod='msthemeconfig'}</button>
          <button type="button" class="nav-link" id="plasma-library-tab" role="tab" aria-selected="false" aria-controls="plasma-library-panel" tabindex="-1" data-plasma-tab="library">{l s='Browse verified parts' mod='msthemeconfig'}</button>
        </div>
        <div id="plasma-upload-panel" class="plasma-panel" role="tabpanel" aria-labelledby="plasma-upload-tab">
          <div class="plasma-dropzone" id="plasma-dropzone">
            <span class="fasl fa-upload" aria-hidden="true"></span>
            <p class="mb-2">{l s='Drop your DXF or SVG drawing here' mod='msthemeconfig'}</p>
            <label class="btn btn-outline-secondary mb-2" for="plasma-drawing">{l s='Choose drawing' mod='msthemeconfig'}</label>
            <input class="plasma-file-input" type="file" id="plasma-drawing" accept=".dxf,.svg" aria-describedby="plasma-file-help">
            <small id="plasma-file-help" class="d-block">{l s='One drawing, up to 10 MB. Use millimetres for your drawing.' mod='msthemeconfig'}</small>
            <p id="plasma-filename" class="plasma-filename mb-0 mt-2"></p>
          </div>
        </div>
        <div id="plasma-library-panel" class="plasma-panel" role="tabpanel" aria-labelledby="plasma-library-tab" hidden>
          <label for="plasma-library-search">{l s='Search by part name or category' mod='msthemeconfig'}</label>
          <input type="search" class="form-control" id="plasma-library-search" autocomplete="off" placeholder="{l s='Search the parts library' mod='msthemeconfig'}">
          <div id="plasma-library-results" class="plasma-library-results" role="group" aria-label="{l s='Verified parts' mod='msthemeconfig'}"></div>
        </div>
        <div class="message-container plasma-notifications" aria-live="polite" aria-atomic="true">
          <p class="plasma-status" id="plasma-status" role="status"></p>
          <div class="alert alert-danger" id="plasma-error" role="alert" hidden></div>
          <div class="alert alert-warning" id="plasma-open-warning" hidden>{l s='Notice: We detected unclosed vector lines highlighted in Red. This might cause manufacturing defects. Review paths before ordering.' mod='msthemeconfig'}</div>
          <div class="alert alert-success" id="plasma-optimized" hidden>{l s='Optimized: Overlapping vectors were automatically merged to prevent double-cutting material burnout.' mod='msthemeconfig'}</div>
          <div class="alert alert-info" id="plasma-rotated" hidden>{l s='Your drawing was rotated 90° to fit the 1000 × 500 mm sheet.' mod='msthemeconfig'}</div>
        </div>
        <div class="plasma-visualizer" id="plasma-visualizer" hidden>
          <div class="plasma-sheet" id="plasma-sheet">
            <canvas id="plasma-preview" width="1010" height="510" tabindex="0" aria-label="{l s='Interactive plasma cutting drawing on a 1000 × 500 mm sheet' mod='msthemeconfig'}" aria-describedby="plasma-preview-help">{l s='Your browser must support canvas to show the cutting preview.' mod='msthemeconfig'}</canvas>
          </div>
          <p class="text-muted text-center mb-2 mt-1">1000 × 500 mm</p>
          <p id="plasma-preview-help" class="text-muted">{l s='Select a cut line to inspect it, or drag it to move the entire drawing. Use the arrow keys to select a line and Escape to clear the selection.' mod='msthemeconfig'}</p>
          <p id="plasma-selection" aria-live="polite" hidden>{l s='Selected cut line:' mod='msthemeconfig'} <strong id="plasma-selected-line"></strong></p>
          <dl class="plasma-metrics">
            <div><dt>{l s='Cutting length' mod='msthemeconfig'}</dt><dd><span id="plasma-length">—</span> mm</dd></div>
            <div><dt>{l s='Pierces' mod='msthemeconfig'}</dt><dd id="plasma-pierces">—</dd></div>
            <div><dt>{l s='Part dimensions' mod='msthemeconfig'}</dt><dd><span id="plasma-dimensions">—</span> mm</dd></div>
          </dl>
        </div>
        <div id="plasma-editor" class="plasma-editor" hidden>
          <fieldset>
            <legend>{l s='Position the complete drawing' mod='msthemeconfig'}</legend>
            <div class="plasma-position-fields">
              <div><label for="plasma-offset-x">{l s='Distance from left edge (mm)' mod='msthemeconfig'}</label><input type="number" class="form-control" id="plasma-offset-x" min="0" max="1000" step="0.1" value="0"></div>
              <div><label for="plasma-offset-y">{l s='Distance from bottom edge (mm)' mod='msthemeconfig'}</label><input type="number" class="form-control" id="plasma-offset-y" min="0" max="500" step="0.1" value="0"></div>
            </div>
          </fieldset>
          <fieldset>
            <legend>{l s='Choose contours to cut' mod='msthemeconfig'}</legend>
            <p class="text-muted">{l s='Uncheck a complete contour to leave it uncut. Grey lines will not be cut.' mod='msthemeconfig'}</p>
            <div id="plasma-contours" class="plasma-contours"></div>
          </fieldset>
          <p class="alert alert-info" id="plasma-edit-notice" hidden>{l s='Your changes need a new calculation before ordering. The drawing shape and size stay the same.' mod='msthemeconfig'}</p>
          <button type="button" class="btn btn-primary" id="plasma-apply" disabled>{l s='Apply changes and recalculate' mod='msthemeconfig'}</button>
        </div>
        <div class="plasma-quote" id="plasma-quote" hidden>
          <span>{l s='Price per complete configured sheet' mod='msthemeconfig'} <span id="plasma-tax-included" hidden>{l s='including tax' mod='msthemeconfig'}</span><span id="plasma-tax-excluded" hidden>{l s='excluding tax' mod='msthemeconfig'}</span></span>
          <strong id="plasma-total"></strong>
        </div>
      </div>
      <div class="modal-footer plasma-footer">
        <div class="plasma-quantity">
          <label for="plasma-quantity">{l s='Sheets' mod='msthemeconfig'}</label>
          <input type="number" class="form-control" id="plasma-quantity" value="1" min="1" max="100" step="1" inputmode="numeric">
        </div>
        <button type="button" class="btn btn-success" id="plasma-add" disabled><span class="fasl fa-shopping-cart" aria-hidden="true"></span> {l s='Add configured sheet to cart' mod='msthemeconfig'}</button>
        <a class="btn btn-outline-secondary" id="plasma-cart" hidden>{l s='View cart' mod='msthemeconfig'}</a>
      </div>
    </div>
  </div>
</div>
