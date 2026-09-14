<div class="modal-dialog" role="document">
    <form class="sawform" name="zaagsnedes">
{*      <i class="fasl fa-metal-saw"></i>*}

        <div class="modal-content">
            {* Header with product title *}
            <div class="modal-header">


                <div class="">
                    <h4 class="modal-title" id="zaagsnedesLabel-{$product->id}">Zaagmenu voor {$product->name|escape:'html':'UTF-8'}</h4>
                </div>
                <div style="position:absolute;right:15px;top: 15px;">
                    <button type="button" class="close btn btn-outline-secondary text-dark position-absolute" style="right: 1em;" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close" data-ai-keep><span aria-hidden="true"></span></button>

                </div>
                <div class="" style="margin-top:10px;">
                {* <div class="" id="saw-info-3" style="display:none;width:100%">

                     Tekst.
                </div> *}


                </div>
            </div>


            {* Body *}
            <div class="modal-body">
                {* Validation messages container *}
<!--                 <div class="row">
                    <div class="col-lg-12 col-md-12 col-12 message-container"></div>
                </div> -->

                {* Product descripton *}
                <div class="row">
                    <div class="col-12">
                        <p><a class="show-hide-info  text-decoration-none">1. Selecteer gewenste zaaglengtes en typ lengte per deel <i data-id="saw-info-1" class="icon-info float-end"></i></a></p>
                        <div id="saw-info-1" style="display:none;">
                            <p>
                           Noteer de gewenste lengte van de zaagsnede in het veld. Wilt u een zaaglengte toch niet? Noteer dan het getal 0, dan wordt de zaagsnede weer verwijderd.
                            De minimale zaaglengte is {$product->min_saw_size}mm.
                            U betaald enkel de zaaglengtes waar een getal is ingevuld.
                            De eerste twee zaaglengtes zijn gratis.
                            </p>
                            <p>Wilt u uw profiel schuin afzagen of in meer lengtes zagen?<br/><a target="_blank" href="{$offer_page}" title="vrijblijvende offerte">> Klik hier om een offerte aan te vragen</a></p>
                            <p>Wilt u meer informatie over het gebruik van dit zaag formulier? <a class="btn btn-sm btn-primary text-white" target="_blank" href="{$info_page}">Klik hier om verder te lezen.</a></p>
                        </div>
                    </div>
                </div>

                {if $ai_frontend_enabled}
                <div class="row">
                    <div class="col-12">
                        <p class="mb-2">
                            <button class="btn btn-primary btn-sm w-100 js-ai-toggle" type="button"
                                    data-ai-target="#ai-context-saw-{$product->id}" aria-expanded="false"
                                    aria-controls="ai-context-saw-{$product->id}" data-ai-keep>
                                <i class="fasl fa-brain mr-1"></i> Hulp met AI
                            </button>
                        </p>
                        <div class="collapse" id="ai-context-saw-{$product->id}" data-ai-collapse>
                            <div class="card card-body p-3">
                                <div class="form-group mb-2">
                                    <label for="ai-context-saw-cuts-{$product->id}">Context voor zaagsnedes</label>
                                    <textarea class="form-control" id="ai-context-saw-cuts-{$product->id}"
                                              name="ai_context_saw_cuts" rows="3">{$ai_context_saw_cuts|escape:'html':'UTF-8'}</textarea>
                                    <small class="form-text text-muted">Deze context helpt bij het bepalen van zaaginstructies.</small>
                                </div>
                                <button type="button" class="btn btn-success w-100 js-ai-context-send" data-ai-keep data-ai-context-type="saw">
                                    Genereer en verstuur
                                </button>
                                <div class="alert mt-2 mb-0 d-none js-ai-context-response" role="alert"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}

                <div class="js-ai-form-body" data-ai-form-body>
                {* Start dynamic form *}
                {* Product id *}
                <input type="hidden" name="product-id" id="product-id" value="{$product->id}">
                {* Length fields as defined in product customization options *}
                {assign var="chunk" value=0}
                {assign var="prevPrice" value=0}

                {assign var="i" value=0}
                {foreach from=$cuts key=index item=cut}
                    <div class="col-12 saw-chunk">
                        <div class="form-group row mb-2" style="line-height: 2.5rem;">
                            <label class="col-3 text-end" for="zaagsnedes{$i}">Zaaglengte {$cut.attribute_name}</label>
                            <div class="col-6">
                                <div class="input-group input-group-sm">
                                    <input type="number"
                                           class="form-control chunks chunk-{$i} chunk"
                                           name="chunks[{$i}]"
                                           id="chunk-{$i}"
                                           data-zaagsnede="{$i}"
                                           min="0"
                                           step="1"
                                           placeholder="">
                                    <div class="input-group-append"><div class="input-group-text">mm</div></div>
                                  <span class="invalid-feedback error-message"></span>
                                </div>
                            </div>
                            <div class="col-3 input-price">
                            {if $cut.price > 0}&euro;&nbsp;&nbsp;&nbsp;&nbsp;{$cut.price_formatted}{else} gratis {/if}
                            </div>

                        </div>
                    </div>
                    {assign var="i" value=$i+1}
                {/foreach}
                {* Remainder  *}
                <div class="col-9">
                    <hr class="remainder-hr">
                </div>
                <div class="col-12 mb-3">
                    <div class="form-group row">
                        <div class="col-3 text-end zaagsnedes-remainder">
                            <label for="zaagsnedes-remainder">Restlengte (&plusmn; 5mm)</label>
                        </div>
                        <div class="col-6">
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control remainder" name="remainder" id="remainder" value="{$total_length}" disabled="disabled">
                                <div class="input-group-append"><div class="input-group-text">mm</div></div>
                            </div>
                        </div>
                        <div class="col-3">
                            <p><a class="show-hide-info"><i data-id="saw-info-2" class="icon-info float-end"></i></a></p>
                        </div>
                            <p id="saw-info-2" class="col-12"   style="display:none;">
                                Bij elke keer zagen gaat er ca. {$loss_per_cut}mm aan materiaal verloren.
                                Daarom is de restlengte wellicht anders dan verwacht. De restlengte krijgt u altijd geleverd als onderdeel van uw product. Uw huidige zaagverlies is <span id="saw-loss">0</span>mm
                            </p>
                        <span class=" col-12 error-message"></span>
                    </div>
                </div>
                <div class="col-12 mb-3">
                <div class="row">
                        <p><a class="show-hide-info  text-decoration-none" data-id="saw-info-3">2. Controleer uw gezaagde eindproduct</a></p>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control saw-check" name="saw-check" id="saw-check" value="Volledige lengte" disabled="disabled">
                                    <div class="input-group-append"><div class="input-group-text">mm</div></div>
                                </div>
                                <span class="error-message"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p><a class="show-hide-info text-decoration-none" data-id="saw-info-4">3. Kies een aantal en voeg toe aan winkelwagen</a></p>
                    </div>
                </div>


                <div class="col-12" id="price-specification" style="display:none;">
                    <table id="price-specification-table" style="width:100%;line-height:2.5;margin-bottom:20px;">
                        <tr>
                            <td>Prijs per stuk</td>
                            <td class="price-td">
                                <div id="product_price" class="price product-price excl">
                                    <input type="hidden" name="price_excl_no_addition" value="{$price_excl}"/>
                                    <span class="subtotal-inc-price">{$price_excl_formatted}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Zaagkosten per stuk</td>
                            <td class="price-td">
                                <div id="saw_price" class="price product-price excl">
                                    <span class="subtotal-inc-price">{$zero_price_formatted}</span>
                                </div>
                            </td>
                        </tr>
                        {if $has_specific_prices}
                        <tr style="display:none;" id="tr_saw_discount_price">
                            <td>Volumekorting per stuk</td>
                            <td class="price-td" style="border-bottom:1px solid #ccc">
                                <div id="saw_discount_price" class="price product-price excl">
                                   <span class="subtotal-inc-price">{$zero_price_formatted}</span>
                                </div>
                            </td>
                        </tr>
                        {/if}
                        <tr>
                            <td>Prijs per stuk (excl. BTW)</td>
                            <td class="price-td">
                                <div id="total_product_price_excl" class="price product-price excl">
                                   <span class="subtotal-inc-price">{$price_excl_formatted}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>BTW (21%)</td>
                            <td class="price-td" style="border-bottom:1px solid #ccc">
                                 <div id="total_tax" class="price product-price excl">
                                    <span class="subtotal-inc-price">{$zero_price_formatted}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Prijs per stuk (incl. BTW)</td>
                            <td class="price-td">
                                <div id="total_product_price_incl" class="price product-price excl">
                                    <span class="subtotal-inc-price">{$price_incl_formatted}</span>
                                </div>
                            </td>
                        </tr>
                    </table>

                <div class="clearfix"></div>
                </div>

                {* Quantity *}
                <div class="row sawform-totalen" style="margin:0 10px">
                    <div class="form-group col-4">
                        <label for="aantal">Aantal</label>
                        <div class="input-group input-group-sm" style="max-width:80px;">
                            <input onclick="this.select()" type="number" min="1" class="form-control" name="quantity" id="quantity" value="1">
                            {*<div class="input-group-addon">stuk(s)</div>*}
                        </div>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group col-4">
                        <div style="text-align:left;padding-left: 10px;">
                            <label>Prijs per stuk</label><br/>
                            <div id="product_price_pre" class="price product-price excl" style="padding-top: 8px;">
                            <input type="hidden" name="price_excl" value="{$price_excl_converted}"/>
                            <span class="subtotal-inc-price">{$price_excl_formatted}</span>
                        </div>
                        </div>
                    </div>
                    <div class="form-group col-4">
                    <div style="text-align:right;margin-right:-10px;">
                        <label>Prijs (incl. btw)</label><br/>
                        <div id="subtotal_incl_pre" class="price product-price incl" style="text-align:right;padding-right:8px;padding-top:8px;">
                            <input type="hidden" name="price_incl" value="{$price_incl_converted}"/>
                            <span class="subtotal-inc-price">{$price_incl_formatted}</span>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <div class="text-center margin-top-10 pad_10">Toon details (zaagkosten, stukprijs & btw) <label class="switch">
                          <input type="checkbox" class="cart_details_toggle" id="show-hide-price-specification">
                          <span class="slider round"></span>
                        </label>
                      </div>
                </div>

            </div>
            </div>

            {* Footer *}
            <div class="modal-footer">
                <button type="button" class="btn view_button btn-default btn-outline-secondary text-dark btn-cancel" data-bs-dismiss="modal" data-dismiss="modal" data-ai-keep>Sluiten</button>

              {if $showAddToCartButton}
                <button type="button" class="btn view_button btn-success addToCart" data-bs-dismiss="modal" data-dismiss="modal">In winkelwagen</button>
              {/if}
            </div>
        </div>
    </form>
</div>
