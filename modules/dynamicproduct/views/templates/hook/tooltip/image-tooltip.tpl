{**
* 2010-2019 Tuni-Soft
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author
*  @copyright 2014-2015
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

{$has_image = $field->hasImage()}
{$has_max_size = isset($field->settings->max_size) && $field->settings->max_size != 0}
{$has_min_width = isset($field->settings->min_width) && $field->settings->min_width != 0}
{$has_min_height = isset($field->settings->min_height) && $field->settings->min_height != 0}

{$hide_tooltip = !($has_image || $has_max_size || $has_min_width || $has_min_height)}

{if !$hide_tooltip}
    <a tabindex="-1" href="#" data-id_field="{$field->id|intval}" class="dp_tooltip"></a>
    <div class="dp_content dp_qtip dp_content_{$field->id|intval}">
	    {if $has_image}
	    <img src="{$field->getImageUrl()|escape:'htmlall':'UTF-8'}" alt=""><br>
	    {/if}
	    <span><strong>{$field->label|escape:'htmlall':'UTF-8'}</strong></span><br>
	    {if $has_max_size}
		    <span>{l s='Max Size' mod='dynamicproduct'}:</span> {$field->settings->max_size|floatval} {l s='MB' mod='dynamicproduct'}<br>
	    {/if}
	    {if $has_min_width}
		    <span>{l s='Min width' mod='dynamicproduct'}:</span> {$field->settings->min_width|floatval} {l s='px' mod='dynamicproduct'}<br>
	    {/if}
	    {if $has_min_height}
		    <span>{l s='Min height' mod='dynamicproduct'}:</span> {$field->settings->min_height|floatval} {l s='px' mod='dynamicproduct'}<br>
	    {/if}
    </div>
{/if}