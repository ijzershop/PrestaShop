{**
* 2010-2018 Tuni-Soft
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

<style type="text/css">
    {if $is_after_1730}
      #dp_exclude_price {
          display: none;
      }
    {else}
      #dp_displayed_price {
        display: none;
      }
    {/if}
</style>

<script type="text/javascript">
  var ps_module_dev = {$ps_module_dev|intval};
  var is_seven = {$is_seven|intval};
  var dp_tab_text = '{l s='Dynamic Product' mod='dynamicproduct' js=1}';
  var dp_link = '{$link->getAdminLink('DynamicProductAjax')|escape:'javascript':'UTF-8'}';
  var dp_dir = '{$dp_module_dir|escape:'javascript':'UTF-8'}';
  var dp_langs = [
      {foreach from=$dp_languages item=lang}
    {ldelim}
      id_lang: "{$lang.id_lang|escape:'javascript':'UTF-8'}",
      name: "{$lang.name|escape:'javascript':'UTF-8'}",
      active: "{$lang.active|escape:'javascript':'UTF-8'}",
      iso_code: "{$lang.iso_code|escape:'javascript':'UTF-8'}"
        {rdelim},
      {/foreach}
  ];
  var dp_message = {
    loading: '{l s='Loading...' mod='dynamicproduct' js=1}',
    success: '{l s='Data saved' mod='dynamicproduct' js=1}',
    error: '{l s='An error occurred' mod='dynamicproduct' js=1}',
    confirm: '{l s='Are you sure you want to delete this item?' mod='dynamicproduct' js=1}',
    erase: '{l s='You will lose any unsaved changes to this formula, continue?' mod='dynamicproduct' js=1}',
    delete_image: '{l s='Are you sure you want to delete this image?' mod='dynamicproduct' js=1}',
    close: '{l s='You will lose any unsaved changes, continue?' mod='dynamicproduct' js=1}',
    invalid: '{l s='The formula is invalid' mod='dynamicproduct' js=1}:',
    unavailable: '{l s='This field does not exist! Double click to remove it.' mod='dynamicproduct' js=1}',
    empty: '{l s='Some values were not filled, continue?' mod='dynamicproduct' js=1}',

    no_product: '{l s='Please select a product first.' mod='dynamicproduct' js=1}',
    warn_config: '{l s='The current configuration will be overwritten, continue?' mod='dynamicproduct' js=1}',
    loaded_config: '{l s='The configuration was loaded successfully' mod='dynamicproduct' js=1}',

    no_category: '{l s='Please select a category first.' mod='dynamicproduct' js=1}',
    warn_copy_config: '{l s='Overwrite the configuration of all products of the selected category?' mod='dynamicproduct' js=1}',
    copied_config: '{l s='The configuration was copied successfully' mod='dynamicproduct' js=1}',

    no_field: '{l s='Please select a field first.' mod='dynamicproduct' js=1}'
  };
  var dp_handled = false;
</script>