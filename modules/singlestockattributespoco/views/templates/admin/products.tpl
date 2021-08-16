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

{if $products|count > 0}
    {if $products|count > 1}
        <button type="button" class="button btn btn-default remove-all-ssa-products">
            <i class='icon-remove text-danger'></i> {l s='Remove All Products' mod='singlestockattributespoco'}
        </button>
    {/if}
    {foreach $products as $product}
        <div class="form-control-static">
            <button type="button" class="button btn btn-default remove-ssa-product" data-id-product="{$product.id_product}">
                {if $ps_version >= 1.6}
                    <i class='icon-remove text-danger'></i>
                {else}
                    {l s='Remove' mod='singlestockattributespoco'}
                {/if}
            </button> {$product.id_product} - {$product.name}
        </div>
    {/foreach}
    <br>
{/if}