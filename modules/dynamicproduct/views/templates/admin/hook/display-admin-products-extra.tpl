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

{$dp_controller = $link->getAdminLink('DynamicProductAjax')}
<!--suppress JSUnusedLocalSymbols -->
<script type="text/javascript">
  var dp_id_product = {$dp_product|intval};
  var dp_fields = {$dp_fields|json_encode};
  var dp_features = {$dp_features|json_encode};
  var dp_attributes = {$dp_attributes|json_encode};
  var dp_equations = {$dp_equations|json_encode};
  var dp_conditions = {$dp_conditions|json_encode};
</script>

{include file="./extra/links.tpl"}

<div id="dp_tabs">

    <ul>
        <li><a href="#dp_tab_product_settings">{l s='Settings' mod='dynamicproduct'}</a></li>
        <li><a href="#dp_tab_price_formula">{l s='Price Formula' mod='dynamicproduct'}</a></li>
        <li><a href="#dp_tab_weight_formula">{l s='Weight Formula' mod='dynamicproduct'}</a></li>
        <li><a href="#dp_tab_quantity_formula">{l s='Quantity Formula' mod='dynamicproduct'}</a></li>
        <li><a href="#dp_tab_fields">{l s='Fields' mod='dynamicproduct'}</a></li>
        <li id="dp_combinations_tab_btn"><a href="#dp_tab_combinations">{l s='Combinations' mod='dynamicproduct'}</a></li>
        <li id="dp_visibility_tab_btn"><a href="#dp_tab_visibility">{l s='Visibility' mod='dynamicproduct'}</a></li>
        <li><a href="#dp_tab_conditions">{l s='Conditions' mod='dynamicproduct'}</a></li>
        <li><a href="#dp_tab_field_formulas">{l s='Field Formulas' mod='dynamicproduct'}</a></li>
        <li><a href="#dp_tab_proportions">{l s='Proportions' mod='dynamicproduct'}</a></li>
    </ul>

    <div id="dp_tab_product_settings">
        {include file="./extra/settings.tpl"}
    </div>

    <div id="dp_tab_price_formula">
        {include file="./extra/price-formula.tpl"}
    </div>

    <div id="dp_tab_weight_formula">
        {include file="./extra/weight-formula.tpl"}
    </div>

    <div id="dp_tab_quantity_formula">
        {include file="./extra/quantity-formula.tpl"}
    </div>

    <div id="dp_tab_fields">
        {include file="./extra/fields.tpl"}
    </div>

    <div id="dp_tab_combinations">
        {include file="./extra/combinations.tpl"}
    </div>

    <div id="dp_tab_visibility">
        {include file="./extra/visibility.tpl"}
    </div>

    <div id="dp_tab_conditions">
        {include file="./extra/conditions.tpl"}
    </div>

    <div id="dp_tab_field_formulas">
        {include file="./extra/field_formulas.tpl"}
    </div>

    <div id="dp_tab_proportions">
        <div id="dp_proportions_container">
            {include file="./extra/proportions.tpl"}
        </div>
    </div>

</div>

<script type="text/javascript">
  $(function () {
    $(document).trigger('dp-content-ready');
    // dp_admin.init();
  });
</script>