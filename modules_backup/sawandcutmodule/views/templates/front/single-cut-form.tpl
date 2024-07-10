<style type="text/css">
  #input-group-length .input-group-prepend .input-group-text, #input-group-length .input-group-append .input-group-text, #input-group-width .input-group-prepend .input-group-text {
    background-color: transparent;
    border: 0px;
    font-weight: bold;
  }
  #input-group-width input, #input-group-length input {
    min-width: 120px;
    max-width: 164px;

  }
  #btn-group-single-cut, #btn-group-single-switch {
    margin-left: 10px;
  }
</style>

<div class="modal-dialog" role="document">
  <form class="platecutting" name="platecutting">
    <div class="modal-content cutform">
      <div class="modal-header">
        <h4 class="modal-title" id="platecuttingLabel-{$product->id}">Knipmenu
          voor {$product->name[$language]|escape:'html':'UTF-8'}</h4>
        <button type="button" class="close p-1" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        <input type="hidden" name="current_cut_id" id="current_cut_id" value='1'/>
        <input type="hidden" name="current_parent_id" id="current_parent_id" value='0'/>
        <input type="hidden" name="cuts_array" id="cuts_array" value=''/>
        <input type="hidden" name="plates_array" id="plates_array" value=''/>
        <input type="hidden" name="cut_history" id="cut_history" value=''/>
          {* Validation messages container *}
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12 message-container h6 text-danger"></div>
        </div>
        <!-- Start form normal cuts -->
        <div class="row">
          <div class="col-12">
            <div class="form-group row" id="canvas-container">
              <table class="mx-auto row">
                <tbody class="col-12">
                <tr class="row">
                  <td class="col-6 pl-4 border-0">
                    <p class="text-left">Op welke lengte (L) en breedte (B) moeten wij de plaat knippen?<br/>
                      Wilt u graag de volgorde van de lengte en breedte knip wisselen klik dan op
                      <button type="button" onclick="void(0)" class="btn btn-sm btn-secondary" disabled>
                        <i class="fasl fa-arrows-left-right"></i>
                      </button>
                    </p>
                  </td>
                  <td colspan="2" class="col text-center p-0  border-0">
                    <div id="canvas-container-preview">
                      <img src="/modules/sawandcutmodule/views/img/preview_single_cut.svg" title="" width="85%"
                           height="auto"/>
                    </div>
                  </td>
                </tr>
                <tr class="row mt-2">
                  <td class="form-inline mx-auto border-0" colspan="3">
                    <div class="input-group" id="input-group-length">
                      <div class="input-group-prepend">
                        <span for="platecutlength-input" class="input-group-text">L</span>
                      </div>
                      <input class="form-control text-center" onfocus="this.select();" placeholder="Knipmaat lengte"
                             type="number" step="0.5" min="{$min_cut_size}" max="{$length}" step="1" id="width"
                             name="width" value="{$length}"/>
                    </div>
                    <div class="input-group" id="input-group-width">
                      <div class="input-group-prepend">
                        <span for="platecutwith-input" class="input-group-text">B</span>
                      </div>
                      <input class="form-control text-center" onfocus="this.select();" placeholder="Knipmaat breedte"
                             type="number" step="0.5" min="{$min_cut_size}" max="{$width}" step="1" id="height"
                             name="height" value="{$width}"/>
                    </div>
                    <div class="btn-group btn-group-justified" id="btn-group-single-cut">
{*                      <button id="clear" class="btn btn-secondary btn-danger"><i class="fasl fa-times"></i></button>*}
                      <button id="switch" type="button" class="btn btn-secondary" title="Wissel de volgorde van knippen"><i class="fasl fa-arrows-left-right"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="row">
                  <td colspan="3" class="col-12 mx-auto text-center pt-3 border-0">
                    <label class="col-12 text-left h6" for="canvas-container-block">Bekijk het resultaat</label>
                    <div id="canvas-container-block">
                      <canvas id="canvas" title="Het resultaat van uw knippen"></canvas>
                    </div>
                  </td>
                </tr>

                <tr class="row">
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
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{number_format(Tools::convertPrice($price_excl),2,',','.')}</span>
                    </div>
                  </td>
                </tr>
                <tr id="tr_cut_price" style="display:none;">
                  <td>Knipkosten per stuk</td>
                  <td class="price-td">
                    <div id="cut_price" class="price product-price excl">
                      <span data-cutprice="0">&euro;&nbsp;&nbsp;&nbsp;&nbsp;{Tools::convertPrice(0)}</span>
                    </div>
                  </td>
                </tr>
                  {if SpecificPrice::getByProductId($product->id)|count}
                    <tr id="tr_cut_discount_price" style="display:none;">
                      <td>Aantallenkorting per stuk</td>
                      <td class="price-td">
                        <div id="cut_discount_price" class="price product-price excl">
                          <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{Tools::convertPrice(-0)}</span>
                        </div>
                      </td>
                    </tr>
                  {/if}
                <tr>
                  <td>Prijs per stuk (excl. BTW)</td>
                  <td class="price-td" style="border-top:1px solid #ccc">
                    <div id="total_product_price_excl" class="price product-price excl">
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{number_format(Tools::convertPrice($price_excl),2,',','.')}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>BTW (21%)</td>
                  <td class="price-td" style="border-bottom:1px solid #ccc">
                    <div id="total_tax" class="price product-price excl">
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{number_format(Tools::convertPrice($tax),2,',','.')}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Prijs per stuk (incl. BTW)</td>
                  <td class="price-td">
                    <div id="total_product_price_incl" class="price product-price excl">
                      <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{number_format(Tools::convertPrice($price_incl),2,',','.')}</span>
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
                  <input type="hidden" name="price_excl" value="{round(Tools::convertPrice($price_excl),2)}"/>
                  <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{number_format(Tools::convertPrice($price_excl),2,',','.')}</span>
                </div>
              </div>
            </div>
            <div class="form-group col-4">
              <div style="text-align:right">
                <label>Prijs (incl. btw)</label><br/>
                <div id="subtotal_incl_pre" class="price product-price incl">
                  <input type="hidden" name="price_incl" value="{round(Tools::convertPrice($price_incl),2)}"/>
                  <span>&euro;&nbsp;&nbsp;&nbsp;&nbsp;{number_format(Tools::convertPrice($price_incl),2,',','.')}</span>
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
            <button class="btn btn-sm w-100 extended-cut-button" type="button" data-product-id="{$product->id}" data-cut-width="{$width}" data-cut-length="{$length}" data-min-cut-size="{$min_cut_size}" {if $maxCuts >= 0}data-max-cuts="{$maxCuts}"{else}data-max-cuts="6"{/if}             <button class="btn btn-sm btn-outline-success w-100 extended-cut-button" type="button" data-product-id="{$product->id}" data-cut-width="{$width}" data-cut-length="{$length}" data-min-cut-size="{$min_cut_size}" {if $maxCuts >= 0}data-max-cuts="{$maxCuts}"{else}data-max-cuts="6"{/if} data-combi-prices="{$combiPrices}" data-default-cut-price="{{$product->default_cut_price}}">
              Meer knippen? Klik dan hier.</button>
          </div>
        </div>
      </div>
      <!-- End prices and totals -->
      <div class="modal-footer pl-4 pr-4">
        <button type="button" style="display:none;" class="btn view_button btn-default backBtnCutModal">Terug</button>
        <button type="button" class="btn view_button btn-dark" id="close-cut-modal" data-dismiss="modal">Sluiten
        </button>
        <button type="button" class="btn view_button btn-success platecuttingAddToCart" id="add-cut-to-cart">In
          winkelwagen
        </button>
      </div>
    </div>
  </form>
</div>
<div class="backdrop"></div>



