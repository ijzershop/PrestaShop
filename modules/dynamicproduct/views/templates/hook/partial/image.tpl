{**
* 2010-2022 Tuni-Soft
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
*  @copyright 2014-2022
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

{if !$is_pdf}
    {$target = uniqid()}
  <br>
  <a class="dp_thumb_view"
     data-name="{$input_field->name}"
     data-toggle="modal"
     data-target="#dp_modal_{$target|escape:'htmlall':'UTF-8'}"
     data-label="{$input_field->label|escape:'htmlall':'UTF-8'}"
     href="{$input_field->getFileUrl()|escape:'htmlall':'UTF-8'}"
     target="_blank"
     title="{l s='Click to enlarge' mod='dynamicproduct'}"
  >
    <img src="{$input_field->getThumbUrl()|escape:'htmlall':'UTF-8'}" alt="">
  </a>
  <div class="modal fade" id="dp_modal_{$target|escape:'htmlall':'UTF-8'}" tabindex="-1" role="dialog"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <!-- Front office and backoffice have different bootstrap versions -->
          <!-- So in the backoffice, we display the title before the close button -->
          <!-- And in the front office, we displayed it afterward -->
            {if isset($is_admin) && $is_admin}
              <h5 class="modal-title">{$input_field->label}</h5>
            {/if}
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
            {if !isset($is_admin) || !$is_admin}
              <h5 class="modal-title">{$input_field->label}</h5>
            {/if}
        </div>
        <div class="modal-body">
          <img src="{$input_field->getFileUrl()|escape:'htmlall':'UTF-8'}" style="width: 100%;" alt="preview">
        </div>
      </div>
    </div>
  </div>
{else}
    {l s='attachment' mod='dynamicproduct'}
{/if}
