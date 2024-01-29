{**
 * 2008 - 2020 Presto-Changeo
 *
 * MODULE Single Stock Attributes
 *
 * @author    Presto-Changeo <info@presto-changeo.com>
 * @copyright Copyright (c) permanent, Presto-Changeo
 * @license   Addons PrestaShop license limitation
 * @link      http://www.presto-changeo.com
 * @version   2.0.0
 *
 * NOTICE OF LICENSE
 *
 * Don't use this module on several shops. The license provided by PrestaShop Addons
 * for all its modules is valid only once for a single shop.
 *
 *}

<script type="text/javascript">
    var baseDir = '{$module_dir}/';
    var id_lang = '{$id_lang}';
    var id_employee = '{$id_employee}';
</script>

<div class="panel po_main_content" id="basic_settings">
    <form action="{$request_uri}" method="post">
        <div class="panel_header">
            <div class="panel_title">{l s='Basic Settings' mod='singlestockattributespoco'}</div>
            <div class="clear"></div>
        </div>
        <div class="columns">
            {l s='This module will use the stock of the default attribute combination (highlighted in blue) as the main stock of the product. All combinations will use that stock.' mod='singlestockattributespoco'}
            <br><br>
            {l s='Make sure to set the starting stock of all combinations the same as the default combination.' mod='singlestockattributespoco'}
            <br><br><br>
            <div class="form-wrapper clearfix">
                <div class="form-group clearfix">
                    <label class="control-label col-lg-3">
                        {l s='Enable single stock attributes for' mod='singlestockattributespoco'}
                    </label>
                    <div class="col-lg-9">
                        <select name="ssa_products_type" id="ssa_products_type" class="fixed-width-xl">
                            <option value="0" {if $ssa_products_type == 0}selected{/if}>{l s='All Products' mod='singlestockattributespoco'}</option>
                            <option value="1" {if $ssa_products_type == 1}selected{/if}>{l s='Include Products' mod='singlestockattributespoco'}</option>
                            <option value="2" {if $ssa_products_type == 2}selected{/if}>{l s='Exclude Products' mod='singlestockattributespoco'}</option>
                        </select>
                    </div>
                </div>

                <div class="form-group clearfix">
                    <label class="control-label col-lg-3">
                        {l s='Select Products' mod='singlestockattributespoco'}:
                    </label>
                    <div class="col-lg-7">
                        <input type="text" name="ssa_product" id="ssa_product" style="width: 300px;display:inline-block;">
                        <button type="button" id="add-ssa-product" class="button btn btn-default" name="add-ssa-product">
                            <i class="icon-plus-sign-alt"></i> {l s='Add' mod='singlestockattributespoco'}
                        </button>
                    </div>
                </div>
                
                <div class="form-group clearfix">
                    <div class="ssa-products-container col-lg-9 col-lg-offset-3"></div>
                </div>

                <div class="form-group clearfix">
                    <label class="control-label col-lg-3">
                        {l s='Select Categories' mod='singlestockattributespoco'}:
                    </label>
                    <div class="col-lg-9">
                        <input type="text" name="ssa_category" id="ssa_category" style="width: 300px;display:inline-block;">
                        <button type="button" id="add-ssa-category" class="button btn btn-default" name="add-ssa-category">
                            <i class="icon-plus-sign-alt"></i> {l s='Add' mod='singlestockattributespoco'}
                        </button>
                    </div>
                </div>
                
                <div class="form-group clearfix">
                    <div class="ssa-categories-container col-lg-9 col-lg-offset-3"></div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
        
    </form>
</div>