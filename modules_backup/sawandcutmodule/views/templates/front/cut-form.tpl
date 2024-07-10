<style type="text/css">
  #input-group-length .input-group-prepend .input-group-text, #input-group-length .input-group-append .input-group-text, #input-group-width .input-group-prepend .input-group-text, #input-group-width .input-group-append .input-group-text {
    background-color: transparent;
    border: 0px;
    font-weight: bold;
  }
  #input-group-width input, #input-group-length input {
    min-width: 120px;

  }
  #btn-group-single-cut, #btn-group-single-switch {
    margin-left: 10px;
  }
</style>

<div class="modal-dialog" role="document">
    <form class="platecutting" name="platecutting">
        <div class="modal-content cutform">
            <div class="modal-header">
                <h4 class="modal-title" id="platecuttingLabel-{$product->id}">Knipmenu voor {$product->name[$language]|escape:'html':'UTF-8'}</h4>
                <button type="button" class="close p-1" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <input type="hidden" name="current_cut_id" id="current_cut_id" value='1'/>
                <input type="hidden" name="current_parent_id" id="current_parent_id" value='0'/>
                <input type="hidden" name="cuts_array" id="cuts_array" value=''/>
                <input type="hidden" name="plates_array" id="plates_array" value=''/>
                {* Validation messages container *}
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-12 message-container h6 text-danger"></div>
                </div>
                <!-- Start form normal cuts -->
                {* Product descripton *}
                <div class="row">
                    <div class="col-12 pl-4 pr-4">
                      <p><a class="show-hide-info"><span style="width: calc(100% - 20px);float: left;">1. Vul de velden in en knip uw plaat van {$product->name[$language]|escape:'html':'UTF-8'} in delen </span><span style="width: 20px;float:right;"><i data-id="plate-info-1" class="icon-info ml-1"></i></span></a></p>
                        <div id="plate-info-1" style="display:none;color:blue;padding-top: 35px;">
                          <p>Wij knippen eerst over de hele plaat maatgeving <b>A</b>. Daarna knippen we het linkerdeel volgens maatgeving <b>B</b>. Als voorbeeld: bij maat a 500, maat b 200, komen de volgende platen: 500x300, 500x200 en 500x500. Alle maten zijn in milimeters. </p>
                            <p>Wilt u anders knippen? <br/><a href="{$offer_page}" title="vrijblijvende offerte">> Vraag dan een offerte aan.</a></p>
                            <p>Wilt u meer informatie over het gebruik van dit knip formulier? <a href="{$info_page}">Klik hier om verder te lezen.</a></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group row" id="canvas-container">
                            <table class="mx-auto row">
                                <tbody class="col-12">
                                    <tr class="row">
                                        <td colspan="2" class="col-12 mx-auto text-center border-0">
                                            <div id="canvas-container-block">
                                                <canvas id="canvas"></canvas>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="row">
                                        <td class="col-6 d-block border-0">
                                            <label class="w-100 text-center" for="rotate-width" title="Gewenste breedte van de knip">
                                                <i class="fasl fa-3x fa-arrows-left-right"></i>
                                                <br/>
                                                <input type="radio" name="rotate-plate" id="rotate-width" class="rotate mt-1 mb-1" value="landscape" checked>
                                            </label>
                                            <div class="input-group" id="input-group-length">
                                                <div class="cut-prepend-letter input-group-prepend">
                                                    <span class="input-group-text">A</span>
                                                </div>
                                                <input class="form-control text-center" onfocus="this.select();" placeholder="Knipmaat a" type="number" step="0.5" min="{$min_cut_size}" max="{$length}" step="1" id="width" name="width" value="{$length}">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">mm</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="col-6 d-block border-0">
                                            <label class="w-100 text-center" for="rotate-height" title="Gewenste hoogte van de knip">
                                                <i class="fasl fa-3x fa-arrows-up-down"></i>
                                                <br>
                                                <input type="radio" name="rotate-plate" id="rotate-height" class="rotate mt-1 mb-1" value="portrait">
                                            </label>
                                            <div class="input-group" id="input-group-width">
                                                <div class="cut-prepend-letter input-group-prepend">
                                                    <span class="input-group-text">B</span>
                                                </div>
                                                <input class="form-control text-center" onfocus="this.select();" placeholder="Knipmaat b" type="number" step="0.5" min="{$min_cut_size}" max="{$width}" step="1" id="height" name="height" value="{$width}" disabled>
                                                <div class="input-group-append">
                                                    <span class="input-group-text">mm</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="row">
                                        <td colspan="2" class="col-12 border-0">
                                            <div class="alert alert-danger alert-dismissible fade mt-4" id="error-msg-box">
                                                <b class="alert-heading"><i class="fasl fa-exclamation-triangle"></i> Let op!</b>
                                                <p id="error-msg" class="font-weight-bold"></p>
                                            </div>
                                            <div class="btn-group w-100">
                                                <button class="btn btn-secondary btn-success col-12 col d-block" id="cut" title="Knip de plaat">Knip</button>
                                                <button class="btn btn-secondary btn-warning col-6 col d-none" id="undo" title="Maak uw laatste knip ongedaan" disabled="true">
                                                    <i class="fasl fa-undo"></i>
                                                    <span id="cutTotal" class="badge badge-pill badge-danger">0</span>
                                                </button>
                                                <button class="btn btn-secondary btn-warning col-6 d-none" id="redo" title="Doe de ongedane knip nogmaal" disabled="true">
                                                    <i class="fasl fa-redo"></i>
                                                </button>
                                            </div>
                                            <input type="hidden" id="currentSelectedPlate" name="currentSelectedPlate" value="plateBox_A">
                                            <input type="hidden" id="currentCutNumber" name="currentCutNumber" value="0">
                                            <input type="hidden" id="machineCutList" name="machineCutList" value="">
                                            <input type="hidden" id="machineCutPreview" name="machineCutPreview" value="">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 pl-4 pr-4">Meer of complex knipwerk?<br>
                        <a href="{$offer_page}" title="vrijblijvende offerte">> Vraag een offerte aan</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <hr class="remainder-hr mt-2">
                    </div>
                </div>
                <div class="row">
                  <p class="col-12 pl-4 pr-4">
                    <a>2. Controleer uw geknipte platen</a>
                  </p>
                  <div class="col-12 pl-5 pr-5 mx-auto">
                    <div class="input-group w-auto">
                      <ul class="list-unstyled h6" id="cuttedPlatesList"></ul>
                    </div>
                  </div>
                </div>
                {* Start dynamic form *}
                {* Product id *}
                <input type="hidden" name="product-id" id="product-id" value="{$product->id}">
                {* Length fields as defined in product customization options *}
{*                 {assign var="chunk" value=0}
                {assign var="prevPrice" value=0}
                {assign var="pieceCutPrice" value=0}

                {assign var="i" value=0}
                {foreach from=$cuts key=index item=cut}
                <div class="plate-chunk row" style="display:none">
                    <div class="col-12">
                        <table class="w-100">
                            <tr>
                                <td class="align-middle" width="15%">
                                    <label for="platecuts{$i}">Knip {$cut.attribute_name}</label>
                                </td>
                                <td class="align-middle" width="50%">
                                    <div class="w-100">
                                        <div class="w-50 float-left p-1">
                                            <div class="input-group">
                                                <input type="number"
                                                class="form-control chunks chunk-{$i} chunk platecutwidth p-0 text-center"
                                                style="font-size:0.9em;"
                                                name="chunks[{$i}][width]"
                                                id="chunk-{$i}-width"
                                                data-knippen="{$i}"
                                                min="0"
                                                step="1"
                                                placeholder="Breedte" disabled>
                                                <div class="input-group-append"><div style="font-size:0.9em;" class="input-group-text p-1">mm</div></div>
                                            </div>
                                        </div>
                                        <div class="w-50 float-right p-1">
                                            <div class="input-group">
                                                <input type="number"
                                                class="form-control chunks chunk-{$i} chunk platecutlength p-0 text-center"
                                                style="font-size:0.9em;"
                                                name="chunks[{$i}][length]"
                                                id="chunk-{$i}-length"
                                                data-knippen="{$i}"
                                                min="0"
                                                step="1"
                                                placeholder="Lengte" disabled>
                                                <div class="input-group-append"><div style="font-size:0.9em;" class="input-group-text p-1">mm</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle" width="20%">
                                    <div class="w-100 text-center">
                                        <button class="input-group-addon extra-cut btn btn-success m-1 setCutValues" data-index="{$i}" data-cutid="{$i+1}" data-width="" data-length="" style="display:none;width: 34px;height: 34px;padding: 7px;border-radius: 50%;"><i class="fasl fa-cut"></i></button>
                                        <button class="input-group-addon remove-cut btn btn-success m-1 removeLastChanges" data-index="{$i}" data-cutid="{$i+1}" data-width="" data-length="" style="display:none;width: 34px;height: 34px;padding: 7px;border-radius: 50%;"><i class="fasl fa-trash"></i></button>
                                    </div>
                                </td>
                                <td class="align-middle" width="15%">
                                    <span class="cutprice-span" style="color:#ccc;">
                                        {if $cut.price > 1}
                                        {if $pieceCutPrice == 0}
                                            {assign var="pieceCutPrice" value=Tools::convertPrice($cut.price)}
                                        {/if}
                                        {number_format($pieceCutPrice, 2, ',','.')} {else} <span style="text-decoration:line-through;">{number_format($cut.price, 2, ',','.')}</span> gratis {/if}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <span class="error-message"></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                {assign var="i" value=$i+1}
                {/foreach} *}
                <!-- Start prices and totals -->
                <div  id="price_row" class="pt-3" style="display:block;">
                    <div class="row">
                        <p class="col-12  pl-4 pr-4"><a class="show-hide-info">3. Kies een aantal en voeg toe aan de winkelwagen</a></p>
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
                                <tr>
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
                                <input onclick="this.select()" type="number" min="1" class="form-control" name="quantity" id="quantity" value="1">
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
                    <div class="text-center margin-top-10 pad_10">Toon details (knipkosten, stukprijs & btw) <label class="switch">
                          <input type="checkbox" class="cart_details_toggle" id="show-hide-price-specification">
                          <span class="slider round"></span>
                        </label>
                    </div>
                    </div>

                  <div class="row">
                    <div class="col-lg-12 col-md-12 col-12 message-container-bottom h6 text-danger"></div>
                  </div>
                </div>
            </div>
            <!-- End prices and totals -->
            <div class="modal-footer">
                {if $singleCutEnabled}
                <button type="button" id="back" class="btn view_button btn-outline-success cut-button"  data-product-id="{$product->id}" data-cut-width="{$width}" data-cut-length="{$length}" data-min-cut-size="{$min_cut_size}" {if $maxCuts >= 0}data-max-cuts="{$maxCuts}"{else}data-max-cuts="6"{/if} data-combi-prices="{$combiPrices}" data-default-cut-price="{{$product->default_cut_price}}">Terug</button>
                {/if}
                <button type="button" class="btn view_button btn-dark" id="close-cut-modal" data-dismiss="modal">Sluiten</button>
                <button type="button" class="btn view_button btn-success platecuttingAddToCart">In winkelwagen</button>
            </div>
        </div>
    </form>
</div>
<div class="backdrop"></div>
