{*<div class="modal-dialog" role="document">*}
{*    <form class="staffelform" name="staffel">*}
{*        <div class="modal-content">*}
{*            *}{* Header with product title *}
{*            <div class="modal-header">*}
{*                <div class="">*}
{*                    <h4 class="modal-title" id="staffelLabel-{$product->id}">{$product->name[$language]|escape:'html':'UTF-8'}</h4>*}
{*                </div>*}
{*                <div style="position:absolute;right:15px;top: 15px;">*}
{*                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>*}
{*                </div>*}
{*            </div>*}


{*            *}{* Body *}
{*            <div class="modal-body">*}
{*                *}{* Product id *}
{*                <input type="hidden" name="product-id" id="product-id" value="{$product->id}">*}
{*                <input type="hidden" name="product-attribute-id" id="product-attribute-id" value="{$product->cache_default_attribute}">*}
{*                  <div class="row">*}
{*                    <div class="col-sm-12">*}
{*                      <p>Koop <strong>{$product->name[$language]|escape:'html':'UTF-8'}</strong> in bulk voor staffelkorting.</p>*}
{*                    </div>*}
{*                  </div>*}
{*                  <div class="row">*}
{*                    <div class="col-sm-12">*}
{*                      <p>Bereken hier uw staffelkorting, prijzen worden automatisch verrekend in de winkelwagen. Ook als u buiten het staffelmenu besteld of zaagsnedes bestelt.</p>*}
{*                    </div>*}
{*                  </div>*}
{*                  <div class="row">*}
{*                    <div class="col-sm-12">*}
{*                    <table class="table">*}
{*                      {foreach from=$specific_prices item=specificprice}*}
{*                        {assign var=discount value={$specificprice['reduction']*100}}*}
{*                        {math assign=staffelprice equation="x - (x / 100 * y)" x=$price_incl y=$discount format="%.3f"}*}
{*                        <tr>*}
{*                          <td>Prijs vanaf {$specificprice['from_quantity']} stuks</td>*}
{*                          <td>&euro; {number_format(Tools::convertPrice($staffelprice),2,',','.')} incl. btw</td>*}
{*                          <td>({$discount}% korting)</td>*}
{*                        </tr>*}
{*                      {/foreach}*}
{*                    </table>*}
{*                    </div>*}
{*                  </div>*}

{*                *}{* Quantity *}
{*                <div class="row staffelform-totalen">*}
{*                    <div class="form-group col-sm-12">*}
{*                        <label for="aantal">Aantal</label>*}
{*                        <div class="input-group input-group-sm">*}
{*                            <input onclick="this.select()" type="number" min="1" step="1" class="form-control" name="quantity" id="quantity" value="1">*}
{*                            <div class="input-group-append"><div class="input-group-text">stuk(s)</div></div>*}
{*                        </div>*}
{*                        <span class="error-message"></span>*}
{*                    </div>*}
{*                </div>*}
{*                <div class="row">*}

{*                <div class="col-sm-12" id="price-specification">*}
{*                    <table id="price-specification-table" style="width:100%;line-height:2.5;margin-bottom:20px;">*}
{*                        <tr>*}
{*                            <td>Prijs zonder korting</td>*}
{*                            <td class="price-td">*}
{*                                <div id="price_excl_no_addition" class="price product-price excl">*}
{*                                    <input type="hidden" name="price_excl_no_addition" value="{$price_incl}"/>*}
{*                                    <span class="subtotal-inc-price">&euro; {number_format(Tools::convertPrice($price_incl),2,',','.')}</span>*}
{*                                </div>*}
{*                            </td>*}
{*                        </tr>*}
{*                        <tr id="tr_staffel_discount_price">*}
{*                            <td>Staffelkorting</td>*}
{*                            <td class="price-td" style="border-bottom:1px solid #ccc">*}
{*                                <div id="staffel_discount_price" class="price product-price excl">*}
{*                                   <span class="subtotal-inc-price">&euro; {number_format(Tools::convertPrice(-0),2,',','.')}</span>*}
{*                                </div>*}
{*                            </td>*}
{*                        </tr>*}
{*                        <tr>*}
{*                            <td>Subtotaal (excl. BTW)</td>*}
{*                            <td class="price-td">*}
{*                                <div id="total_price_excl" class="price product-price excl">*}
{*                                    <span class="subtotal-inc-price">&euro; {number_format(Tools::convertPrice($price_excl),2,',','.')}</span>*}
{*                                </div>*}
{*                            </td>*}
{*                        </tr>*}
{*                        <tr>*}
{*                            <td>Subtotaal (incl. BTW)</td>*}
{*                            <td class="price-td">*}
{*                                <div id="total_price_incl" class="price product-price excl">*}
{*                                    <span class="subtotal-inc-price">&euro; {number_format(Tools::convertPrice($price_incl),2,',','.')}</span>*}
{*                                </div>*}
{*                            </td>*}
{*                        </tr>*}
{*                    </table>*}
{*                </div>*}
{*                <div class="clearfix"></div>*}
{*                </div>*}



{*            </div>*}

{*            *}{* Footer *}
{*            <div class="modal-footer">*}
{*                <button type="button" class="btn view_button btn-default btn-cancel" data-dismiss="modal">Sluiten</button>*}
{*                <button type="button" class="btn view_button btn-success addToCart"  data-dismiss="modal">In winkelwagen</button>*}
{*            </div>*}
{*        </div>*}
{*    </form>*}
{*</div>*}
