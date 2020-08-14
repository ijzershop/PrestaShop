{*
* 2007-2019 PrestaShop
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2019 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<div class="dp_fields_field_formula dp_fields_field_formula_{$dp_field_formula->id|intval}" data-id="{$dp_field_formula->id|intval}">

    <a><i class="material-icons dp_field_formula_drag" title="{l s='Drag to reorder' mod='dynamicproduct'}">dehaze</i></a>

    <div class="dp_field_formula" title="{l s='Click to edit' mod='dynamicproduct'}">
        <span>{$dp_field_formula->formula|escape:'htmlall':'UTF-8'}</span>
    </div>

    <button type="button" class="btn btn-danger dp_field_formula_delete" title="{l s='Delete field formula' mod='dynamicproduct'}"><i class="material-icons">delete</i></button>
</div>
