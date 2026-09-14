<style type="text/css">
  #input-group-length .input-group-prepend .input-group-text, #input-group-length .input-group-append .input-group-text, #input-group-width .input-group-prepend .input-group-text {
    background-color: transparent;
    border: 1px;
    border-color: gray;
    border-style: dashed;
    line-height: .8em;
    font-weight: bold;
  }
</style>

<div class="modal-dialog" role="document">
  <form class="platecutting" name="platecutting">
    <div class="modal-content cutform">
      <div class="modal-header">
        <h4 class="modal-title" id="platecuttingLabel-{$product->id}">Knipmenu
          voor {$product->name|escape:'html':'UTF-8'}</h4>
        <button type="button" class="close btn btn-outline-secondary text-dark position-absolute" style="right: 1em;" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close" data-ai-keep><span
            aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="current_cut_id" id="current_cut_id" value='1'/>
        <input type="hidden" name="current_parent_id" id="current_parent_id" value='0'/>
        <input type="hidden" name="cuts_array" id="cuts_array" value=''/>
        <input type="hidden" name="plates_array" id="plates_array" value=''/>
        <input type="hidden" name="cut_history" id="cut_history" value=''/>
        <input type="hidden" name="sequence" id="sequence" value='wl'/>
          {* Validation messages container *}
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12 message-container h6 text-danger"></div>
        </div>
        {if $ai_frontend_enabled}
        <div class="row">
          <div class="col-12">
            <p class="mb-2">
              <button class="btn btn-primary btn-sm w-100 js-ai-toggle" type="button"
                      data-ai-target="#ai-context-plate-{$product->id}" aria-expanded="false"
                      aria-controls="ai-context-plate-{$product->id}" data-ai-keep>
                <i class="fasl fa-brain mr-1"></i> Hulp met AI
              </button>
            </p>
            <div class="collapse" id="ai-context-plate-{$product->id}" data-ai-collapse>
              <div class="card card-body p-3">
                <div class="form-group mb-2">
                  <label for="ai-context-plate-cuts-{$product->id}">Context voor plaat snedes</label>
                  <textarea class="form-control" id="ai-context-plate-cuts-{$product->id}"
                            name="ai_context_plate_cuts" rows="3">{$ai_context_plate_cuts|escape:'html':'UTF-8'}</textarea>
                  <small class="form-text text-muted">Deze context helpt bij het bepalen van knipinstructies.</small>
                </div>
                <button type="button" class="btn btn-success w-100 js-ai-context-send" data-ai-keep data-ai-context-type="plate">
                  Genereer en verstuur
                </button>
                <div class="alert mt-2 mb-0 d-none js-ai-context-response" role="alert"></div>
              </div>
            </div>
          </div>
        </div>
        {/if}
        <div class="js-ai-form-body" data-ai-form-body>
        <!-- Start form normal cuts -->
        <div class="row">
          <div class="col-12">
            <div class="form-group row" id="canvas-container">
              <table class="mx-auto row">
                <tbody class="col-12">
                <tr class="row">
                  <td class="col-12 col-sm-6 pl-4 border-0">
                    <p class="text-left">Op welke lengte (L) en breedte (B) moeten wij de plaat knippen?<br/>
                      Wilt u graag de volgorde van de lengte en breedte knip wisselen? Om zo het formaat van uw restplaten te wijzigen. Klik dan op
                      <button type="button" onclick="void(0)" class="btn btn-sm btn-secondary" disabled>
                        <i class="fasl fa-rotate mx-auto"></i> Restplaten
                      </button>
                    </p>
                  </td>
                  <td colspan="2" class="col-12 col-sm-6 text-center p-0  border-0">
                    <div id="canvas-container-preview">
                      <img src="/modules/msthemeconfig/views/img/preview_single_cut.svg" title="" width="85%"
                           height="auto"/>
                    </div>
                  </td>
                </tr>
                <tr class="row">
                  <td colspan="3" class="col-12 mx-auto text-center pt-3 border-0">
                    <label class="col-12 text-left h6" for="canvas-container-block">Bekijk het resultaat</label>
                    <div id="canvas-container-block" style="width: 100%; max-width: 450px;">
                      <canvas id="canvas" title="Het resultaat van uw knippen"></canvas>
                    </div>
                  </td>
                </tr>

                <tr class="row mt-2">
                  <td class="col mx-auto border-0" colspan="3">
                    <div class="row">
                      <div class="col-12 col-sm-6 col-md-4 mb-2 pl-3 pr-3 pr-md-1">
                        <div class="input-group" id="input-group-length">
                          <div class="input-group-prepend">
                            <span for="platecutlength-input" class="input-group-text">L</span>
                          </div>
                          <input class="form-control text-center" onfocus="this.select();" placeholder="Knipmaat lengte"
                                 type="number" oninput="this.value = Math.floor(this.value)" min="{$min_cut_size}" max="{$length}" step="1" id="width"
                                 name="width" value="{$length}"/>
                        </div>
                      </div>
                      <div class="col-12 col-sm-6 col-md-4 mb-2  pl-3 pl-sm-1 pr-3 pr-md-1">
                        <div class="input-group" id="input-group-width">
                          <div class="input-group-prepend">
                            <span for="platecutwith-input" class="input-group-text">B</span>
                          </div>
                          <input class="form-control text-center" onfocus="this.select();" placeholder="Knipmaat breedte"
                                 type="number" oninput="this.value = Math.floor(this.value)" min="{$min_cut_size}" max="{$width}" step="1" id="height"
                                 name="height" value="{$width}"/>
                        </div>
                      </div>
                      <div class="col-12 col-sm-12 col-md-4 mb-2  pl-3 pl-md-1 pr-3" >
                        <div class="btn-group btn-group-justified w-100" id="btn-group-single-cut">
                          {*                      <button id="clear" class="btn btn-secondary btn-danger"><i class="fasl fa-times"></i></button>*}
                          <button id="switch" type="button" class="btn btn-secondary flex-wrap w-100 text-center disabled" disabled title="Wissel de volgorde van knippen"><i class="fasl fa-rotate"></i> Restplaten
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr class="row d-flex">
                  <td colspan="3" class="col-12 pl-4 pr-4 border-0">
                    <div class="alert alert-danger alert-dismissible fade mb-0" id="error-msg-box">
                      <b class="alert-heading"><i class="fasl fa-exclamation-triangle"></i> Let op!</b>
                      <p id="error-msg" class="font-weight-bold"></p>
                    </div>
                    <button type="button" id="cut" style="opacity: 0;">Hidden Cut</button>
                    <input type="hidden" id="currentSelectedPlate" name="currentSelectedPlate" value="plateBox_A">
                    <input type="hidden" id="currentCutNumber" name="currentCutNumber" value="0">
                    <input type="hidden" id="machineCutList" name="machineCutList" value="">
                    <input type="hidden" id="machineCutPreview" name="machineCutPreview" value="">
                    <input type="hidden" id="sequence" name="sequence" value="lw">
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pl-4 pr-4">Bent u tevreden? Klik op "In winkelwagen" om uw plaat inclusief knip-instructie
            af te rekenen (rest materiaal word meegeleverd).
          </div>
          <div class="col-12 pl-4 pr-4 mt-2">
            <table class="table table-sm" id="singleCutResultTable">
              <tr>
                <td class="col-4 border-top-0"><span class="bg-success"></span> knip resultaat</td>
                <td id="cutPreviewSize" class="col-8 border-top-0">{$length}mm x {$width}mm</td>
              </tr>
              <tr>
                <td class="col-4"><span class="bg-primary"></span> restdeel</td>
                <td id="cutPreviewRemainder1" class="col-8"></td>
              </tr>
              <tr>
                <td class="col-4"><span class="bg-primary"></span> restdeel</td>
                <td id="cutPreviewRemainder2" class="col-8"></td>
              </tr>
            </table>
          </div>
        </div>
          {* Product id *}
        <input type="hidden" name="product-id" id="product-id" value="{$product->id}">
        <!-- Start prices and totals -->
        <div id="price_row" class="pt-3" style="display:block;">
          <div class="row">
            <div class="col-12 pl-4 pr-4" id="price-specification" style="display:none;">
              <table id="price-specification-table" style="width:100%;line-height:2.5;margin-bottom:20px;">
                <tr>
                  <td>Prijs per stuk</td>
                  <td class="price-td">
                    <div id="product_price" class="price product-price excl">
                      <input type="hidden" name="price_excl_no_addition" value="{$price_excl}"/>
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$price_excl_formatted_plain}</span>
                    </div>
                  </td>
                </tr>
                <tr id="tr_cut_price" style="display:none;">
                  <td>Knipkosten per stuk</td>
                  <td class="price-td">
                    <div id="cut_price" class="price product-price excl">
                      <span data-cutprice="0">&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$zero_price_simple}</span>
                    </div>
                  </td>
                </tr>
                  {if $has_specific_prices}
                    <tr id="tr_cut_discount_price" style="display:none;">
                      <td>Aantallenkorting per stuk</td>
                      <td class="price-td">
                        <div id="cut_discount_price" class="price product-price excl">
                          <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$zero_price_simple}</span>
                        </div>
                      </td>
                    </tr>
                  {/if}
                <tr>
                  <td>Prijs per stuk (excl. BTW)</td>
                  <td class="price-td" style="border-top:1px solid #ccc">
                    <div id="total_product_price_excl" class="price product-price excl">
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$price_excl_formatted_plain}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>BTW (21%)</td>
                  <td class="price-td" style="border-bottom:1px solid #ccc">
                    <div id="total_tax" class="price product-price excl">
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$tax_formatted_plain}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Prijs per stuk (incl. BTW)</td>
                  <td class="price-td">
                    <div id="total_product_price_incl" class="price product-price excl">
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$price_incl_formatted_plain}</span>
                    </div>
                  </td>
                </tr>
              </table>
              <div class="clearfix"></div>
            </div>
          </div>
            {* Quantity *}
          <div class="row plateform-totalen" style="margin:0 10px">
            <div class="form-group col-4">
              <label for="aantal">Aantal</label>
              <div class="input-group " style="max-width:80px;">
                <input onclick="this.select()" type="number" min="1" class="form-control" name="quantity" id="quantity"
                       value="1">
                  {*<div class="input-group-append"><div class="input-group-text p-1">stuk(s)</div>*}
              </div>
              <span class="error-message"></span>
            </div>
            <div class="form-group col-4">
              <div style="text-align:right">
                <label>Prijs per stuk</label><br/>
                <div id="product_price_pre" class="price product-price excl">
                  <input type="hidden" name="price_excl" value="{$price_excl_converted}"/>
                  <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$price_excl_formatted_plain}</span>
                </div>
              </div>
            </div>
            <div class="form-group col-4">
              <div style="text-align:right">
                <label>Prijs (incl. btw)</label><br/>
                <div id="subtotal_incl_pre" class="price product-price incl">
                  <input type="hidden" name="price_incl" value="{$price_incl_converted}"/>
                  <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$price_incl_formatted_plain}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="text-center margin-top-10 pad_10">Toon details (knipkosten, stukprijs & btw) <label
                class="switch">
                <input type="checkbox" class="cart_details_toggle" id="show-hide-price-specification">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-12 message-container-bottom h6 text-danger"></div>
          </div>
          <div class="col-12">
            <button class="btn btn-sm btn-outline-success w-100 extended-cut-button" type="button" data-product-id="{$product->id}" data-cut-width="{$width}" data-cut-length="{$length}" data-min-cut-size="{$min_cut_size}" {if $maxCuts >= 0}data-max-cuts="{$maxCuts}"{else}data-max-cuts="6"{/if} data-combi-prices="{$combiPrices}" data-default-cut-price="{{$product->default_cut_price}}">
              Meer knippen? Klik dan hier.</button>
          </div>
        </div>
        </div>
      </div>
      <!-- End prices and totals -->
      <div class="modal-footer pl-4 pr-4">
        <button type="button" style="display:none;" class="btn view_button btn-default backBtnCutModal">Terug</button>
        <button type="button" class="btn view_button btn-dark" id="close-cut-modal" data-bs-dismiss="modal" data-dismiss="modal" data-ai-keep>Sluiten
        </button>
        {if $showAddToCartButton}
        <button type="button" class="btn view_button btn-success platecuttingAddToCart" id="add-cut-to-cart">In
          winkelwagen
        </button>
        {/if}
      </div>
    </div>
  </form>
</div>
<div class="backdrop"></div>
