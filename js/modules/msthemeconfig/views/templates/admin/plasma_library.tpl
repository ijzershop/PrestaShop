<div class="panel">
  <h3><i class="icon-folder-open"></i> {l s='Plasma parts library' mod='msthemeconfig'}</h3>
  <p>{l s='Add a name, choose a category and upload your drawing. Geometry, preview and production files are checked and saved automatically.' mod='msthemeconfig'}</p>
  {if !$plasma_library_single_shop}
    <div class="alert alert-info">{l s='Select one shop to manage its parts library.' mod='msthemeconfig'}</div>
  {/if}
  <div id="plasma-library-feedback" role="status" aria-live="polite"></div>
  {if $plasma_library_can_add}
    <form id="plasma-library-upload" method="post" action="{$plasma_library_url|escape:'htmlall':'UTF-8'}" enctype="multipart/form-data">
      <input type="hidden" name="token" value="{$plasma_library_token|escape:'htmlall':'UTF-8'}">
      <input type="hidden" name="plasma_action" value="import">
      <div class="form-group">
        <label for="plasma-library-name">{l s='Name' mod='msthemeconfig'}</label>
        <input type="text" id="plasma-library-name" class="form-control" name="display_name" maxlength="255" required>
      </div>
      <div class="form-group">
        <label for="plasma-library-category">{l s='Category' mod='msthemeconfig'}</label>
        <select id="plasma-library-category" class="form-control" name="category" required>
          {foreach $plasma_library_categories as $category}
            <option value="{$category|escape:'htmlall':'UTF-8'}">{$category|escape:'htmlall':'UTF-8'}</option>
          {/foreach}
        </select>
      </div>
      <div class="form-group well" id="plasma-library-dropzone">
        <label for="plasma-library-file">{l s='Drop a DXF or SVG drawing here, or choose a file' mod='msthemeconfig'}</label>
        <input type="file" id="plasma-library-file" name="cutfile" accept=".dxf,.svg" required>
        <p class="help-block">{l s='Only verified, closed profiles within 1000 x 500 mm are published in the library.' mod='msthemeconfig'}</p>
      </div>
      <button type="submit" class="btn btn-primary" data-idle-label="{l s='Save part' mod='msthemeconfig'}" data-busy-label="{l s='Checking drawing…' mod='msthemeconfig'}">{l s='Save part' mod='msthemeconfig'}</button>
    </form>
  {/if}
</div>
<div class="panel">
  <h3>{l s='Saved parts' mod='msthemeconfig'}</h3>
  <form method="get" action="{$plasma_library_url|escape:'htmlall':'UTF-8'}" class="form-inline">
    <input type="hidden" name="controller" value="MsAdminPlasmaLibrary">
    <input type="hidden" name="token" value="{$plasma_library_token|escape:'htmlall':'UTF-8'}">
    <label class="sr-only" for="plasma-library-search">{l s='Search parts' mod='msthemeconfig'}</label>
    <input type="search" class="form-control" name="plasma_search" id="plasma-library-search" value="{$plasma_library_search|escape:'htmlall':'UTF-8'}" maxlength="100" placeholder="{l s='Search parts' mod='msthemeconfig'}">
    <button class="btn btn-default" type="submit">{l s='Search' mod='msthemeconfig'}</button>
  </form>
  <div class="table-responsive">
    <table class="table">
      <thead><tr><th>{l s='Name' mod='msthemeconfig'}</th><th>{l s='Category' mod='msthemeconfig'}</th><th>{l s='Dimensions' mod='msthemeconfig'}</th><th>{l s='Cutting length' mod='msthemeconfig'}</th><th>{l s='Pierces' mod='msthemeconfig'}</th><th>{l s='Status' mod='msthemeconfig'}</th><th></th></tr></thead>
      <tbody>
        {foreach $plasma_library_parts as $part}
          <tr>
            <td>{$part.display_name|escape:'htmlall':'UTF-8'}</td>
            <td>{$part.category|escape:'htmlall':'UTF-8'}</td>
            <td>{$part.part_width_mm|escape:'htmlall':'UTF-8'} × {$part.part_height_mm|escape:'htmlall':'UTF-8'} mm</td>
            <td>{$part.raw_geometry_length_mm|escape:'htmlall':'UTF-8'} mm</td>
            <td>{$part.total_pierces|intval}</td>
            <td>{if $part.active}{l s='Active' mod='msthemeconfig'}{else}{l s='Inactive' mod='msthemeconfig'}{/if}</td>
            <td>
              {if $part.active && $plasma_library_can_edit}
                <form method="post" action="{$plasma_library_url|escape:'htmlall':'UTF-8'}">
                  <input type="hidden" name="token" value="{$plasma_library_token|escape:'htmlall':'UTF-8'}">
                  <input type="hidden" name="plasma_action" value="deactivate">
                  <input type="hidden" name="id_cutfile" value="{$part.id_cutfile|intval}">
                  <button type="submit" class="btn btn-default">{l s='Deactivate' mod='msthemeconfig'}</button>
                </form>
              {/if}
            </td>
          </tr>
        {foreachelse}
          <tr><td colspan="7">{l s='No saved parts found.' mod='msthemeconfig'}</td></tr>
        {/foreach}
      </tbody>
    </table>
  </div>
  {if count($plasma_library_parts) >= 200}<p class="help-block">{l s='Showing the first 200 parts. Search to narrow the results.' mod='msthemeconfig'}</p>{/if}
</div>
