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

{if $categories|count > 0}
    {if $categories|count > 1}
        <button type="button" class="button btn btn-default remove-all-ssa-categories">
            <i class='icon-remove text-danger'></i> {l s='Remove All Categories' mod='singlestockattributespoco'}
        </button>
    {/if}
    {foreach $categories as $category}
        <div class="form-control-static">
            <button type="button" class="button btn btn-default remove-ssa-category" data-id-category="{$category.id_category}">
                {if $ps_version >= 1.6}
                    <i class='icon-remove text-danger'></i>
                {else}
                    {l s='Remove' mod='singlestockattributespoco'}
                {/if}
            </button> {$category.id_category} - {$category.name}
        </div>
    {/foreach}
    <br>
{/if}