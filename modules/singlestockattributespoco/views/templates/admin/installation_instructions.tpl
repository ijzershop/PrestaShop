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

<div class="panel po_main_content" id="installation_instructions">
    <div class="panel_header">
        <div class="panel_title">{l s='Installation Instructions' mod='singlestockattributespoco'}</div>
        <div class="panel_info_text important">
            <span class="important_alert"> </span>
            {l s='This installation instruction is very important. Please read carefully before installation' mod='singlestockattributespoco'}
        </div>
        <div class="clear"></div>
    </div>
        
    <div class="general_instructions single_column">
        <div class="instructions_title">{l s='General Instructions' mod='singlestockattributespoco'}</div>
        <div class="general_instructions_content">
            <ul>
                <li>
                    <span>{l s='Copy the files listed below from' mod='singlestockattributespoco'} /modules/singlestockattributespoco/modified_{$override_folder} {l s='to' mod='singlestockattributespoco'} /override/classes {l s='in your root PrestaShop directory.' mod='singlestockattributespoco'}</span>
                </li>
                <li class="notes">
                    <span class="notes">
                        {l s='If those files already exist in /override/classes, you will need to merge the files. To do so, copy only the lines listed below from the files in' mod='singlestockattributespoco'} /modules/singlestockattributespoco/modified_{$override_folder} {l s='to the corresponding files in' mod='singlestockattributespoco'} /override/classes.
                    </span>
                </li>
                <li>
                    <span>
                    {l s='The filenames below will appear in' mod='singlestockattributespoco'} <b style="color: red;">{l s='RED' mod='singlestockattributespoco'}</b> {l s='until you make the necessary changes. If the changes were made correctly, they will turn' mod='singlestockattributespoco'} <b style="color: green;">{l s='GREEN' mod='singlestockattributespoco'}</b> {l s='after you reload the page.' mod='singlestockattributespoco'}
                    </span>
                </li>
            </ul>
        </div>
    </div>
            
    <div class="override_instructions single_column">
        <div class="instructions_title">
            {l s='Override Files' mod='singlestockattributespoco'}
        </div>

        <div class="override_content">
            <div class="override_block">
                <div class="override_class">
                    <span class="{if $checkInstalledCart['/override/classes/Cart.php']['file_installed']}file_installed{else}file_not_installed{/if}">/override/classes/Cart.php</span>
                </div>
                <div class="override_lines">
                    {if $checkInstalledCart['/override/classes/Cart.php']['file_not_found']}
                        {l s='Lines' mod='singlestockattributespoco'} #
                        {if $override_folder == '1.7'}
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['24-27']}file_installed{else}file_not_installed{/if}">24-27<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['56-66']}file_installed{else}file_not_installed{/if}">56-66<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['89-92']}file_installed{else}file_not_installed{/if}">89-92<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['119']}file_installed{else}file_not_installed{/if}">119<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['169']}file_installed{else}file_not_installed{/if}">169<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['217']}file_installed{else}file_not_installed{/if}">217<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['231-237']}file_installed{else}file_not_installed{/if}">231-237<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['240']}file_installed{else}file_not_installed{/if}">240<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['285']}file_installed{else}file_not_installed{/if}">285<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['316-339']}file_installed{else}file_not_installed{/if}">316-339<span>
                        {else}
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['24-27']}file_installed{else}file_not_installed{/if}">24-27<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['56-66']}file_installed{else}file_not_installed{/if}">56-66<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['90-93']}file_installed{else}file_not_installed{/if}">90-93<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['120']}file_installed{else}file_not_installed{/if}">120<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['170']}file_installed{else}file_not_installed{/if}">170<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['218']}file_installed{else}file_not_installed{/if}">218<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['232-238']}file_installed{else}file_not_installed{/if}">232-238<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['241']}file_installed{else}file_not_installed{/if}">241<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['286']}file_installed{else}file_not_installed{/if}">286<span>,
                            <span class="{if $checkInstalledCart['/override/classes/Cart.php']['317-340']}file_installed{else}file_not_installed{/if}">317-340<span>
                        {/if}
                    {else}
                        {l s='Copy entire file' mod='singlestockattributespoco'}
                    {/if}
                </div>
            </div>
            <div class="override_block">
                <div class="override_class">
                    <span class="{if $checkInstalledProduct['/override/classes/Product.php']['file_installed']}file_installed{else}file_not_installed{/if}">/override/classes/Product.php</span>
                </div>
                <div class="override_lines">
                    {if $checkInstalledProduct['/override/classes/Product.php']['file_not_found']}
                        {l s='Lines' mod='singlestockattributespoco'} #
                        <span class="{if $checkInstalledProduct['/override/classes/Product.php']['24-27']}file_installed{else}file_not_installed{/if}">24-27<span>,
                        <span class="{if $checkInstalledProduct['/override/classes/Product.php']['52-61']}file_installed{else}file_not_installed{/if}">52-61<span>
                    {else}
                        {l s='Copy entire file' mod='singlestockattributespoco'}
                    {/if}
                </div>
            </div>
            <div class="override_block">
                <div class="override_class">
                    <span class="{if $checkInstalledCartController['/override/controllers/front/CartController.php']['file_installed']}file_installed{else}file_not_installed{/if}">/override/controllers/front/CartController.php</span>
                </div>
                <div class="override_lines">
                    {if $checkInstalledCartController['/override/controllers/front/CartController.php']['file_not_found']}
                        {l s='Lines' mod='singlestockattributespoco'} #
                        <span class="{if $checkInstalledCartController['/override/controllers/front/CartController.php']['24-27']}file_installed{else}file_not_installed{/if}">24-27<span>,
                        {if $override_folder == '1.7'}
                            <span class="{if $checkInstalledCartController['/override/controllers/front/CartController.php']['59-76']}file_installed{else}file_not_installed{/if}">59-76<span>,
                        {else}
                            <span class="{if $checkInstalledCartController['/override/controllers/front/CartController.php']['78-95']}file_installed{else}file_not_installed{/if}">78-95<span>,
                        {/if}
                    {else}
                        {l s='Copy entire file' mod='singlestockattributespoco'}
                    {/if}
                </div>
            </div>
            <div class="override_block">
                <div class="override_class">
                    <span class="{if $checkInstalledOrderController['/override/controllers/admin/AdminOrdersController.php']['file_installed']}file_installed{else}file_not_installed{/if}">/override/controllers/admin/AdminOrdersController.php</span>
                </div>
                <div class="override_lines">
                    {if $checkInstalledOrderController['/override/controllers/admin/AdminOrdersController.php']['file_not_found']}
                        {l s='Lines' mod='singlestockattributespoco'} #
                        <span class="{if $checkInstalledOrderController['/override/controllers/admin/AdminOrdersController.php']['280-285']}file_installed{else}file_not_installed{/if}">280-285<span>,

                        <span class="{if $checkInstalledOrderController['/override/controllers/admin/AdminOrdersController.php']['556-561']}file_installed{else}file_not_installed{/if}">556-561<span>,

                        <span class="{if $checkInstalledOrderController['/override/controllers/admin/AdminOrdersController.php']['1230']}file_installed{else}file_not_installed{/if}">1230<span>,

                        <span class="{if $checkInstalledOrderController['/override/controllers/admin/AdminOrdersController.php']['1351-1359']}file_installed{else}file_not_installed{/if}">1351-1359<span>,

                        <span class="{if $checkInstalledOrderController['/override/controllers/admin/AdminOrdersController.php']['1477-1482']}file_installed{else}file_not_installed{/if}">1477-1482<span>
                    {else}
                        {l s='Copy entire file' mod='singlestockattributespoco'}
                    {/if}
                </div>
            </div>
            <div class="extra_instructions">
                <span class="important_alert"> </span>
                <span class="important_instructions important"> 
                    {l s='Make sure to clear the cache in Advanced Parameteres->Performance->Clear Cache.' mod='singlestockattributespoco'}
                </span>
            </div>
        </div>
    </div>
     
    <div class="extra_line"></div>
</div>