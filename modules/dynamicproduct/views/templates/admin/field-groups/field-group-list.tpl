{*
* 2007-2022 PrestaShop
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
*  @copyright 2007-2022 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<div id="dp_field_groups_data">
  <form action="{$req|escape:'htmlall':'UTF-8'}" method="post" id="dp_field_groups_form">
    <div class="panel">
      <div class="panel-heading">
        <i class="icon-list"></i>
          {l s='Field Groups' mod='dynamicproduct'}
      </div>
      <div class="form-wrapper">
          {if count($field_groups)}
            <table class="table">
              <thead>
                <tr>
                  <th>{l s='Label' mod='dynamicproduct'}</th>
                  <th>{l s='Name' mod='dynamicproduct'}</th>
                  <th class="fixed-width-sm center">{l s='Actions' mod='dynamicproduct'}</th>
                </tr>
              </thead>
              <tbody>
                  {foreach from=$field_groups item=field_group}
                      {$editlink = "index.php?controller=AdminModules{$default}&id_field_group={$field_group->id|intval}&display_update_field_group&token={$token|escape:'htmlall':'UTF-8'}"}
                      {$deletelink = "index.php?controller=AdminModules{$default}&id_field_group={$field_group->id|intval}&submit_delete_field_group&token={$token|escape:'htmlall':'UTF-8'}"}
                    <tr>
                      <td data-cy="label-cell">{$field_group->label|escape:'htmlall':'UTF-8'}</td>
                      <td data-cy="name-cell">{$field_group->name|escape:'htmlall':'UTF-8'}</td>
                      <td class="text-right">
                        <div class="btn-group-action">
                          <div class="btn-group pull-right">
                            <a href="{$editlink|escape:'htmlall':'UTF-8'}"
                               data-cy="edit-button"
                               title="{l s='Edit' mod='dynamicproduct'}"
                               class="edit btn btn-default"
                            >
                              <i class="icon-pencil"></i> {l s='Edit' mod='dynamicproduct'}
                            </a>
                            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                              <i class="icon-caret-down"></i>&nbsp;
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a href="{$deletelink|escape:'htmlall':'UTF-8'}"
                                   data-cy="delete-button"
                                   title="{l s='Delete' mod='dynamicproduct'}"
                                   class="dp_confirm_delete"
                                >
                                  <i class="icon-trash"></i> {l s='Delete' mod='dynamicproduct'}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  {/foreach}
              </tbody>
            </table>
          {else}
            <div class="alert alert-info">
                {l s='No field groups configured yet' mod='dynamicproduct'}
            </div>
          {/if}
      </div>
      <div class="panel-footer">
        <a class="btn btn-default pull-right"
           data-cy="add-field-group"
           href="{$dp_module_link|escape:'htmlall':'UTF-8'}&display_add_field_group"
        >
          <i class="process-icon-new"></i>
          <span>{l s='Add a new field group' mod='dynamicproduct'}</span>
        </a>
      </div>
    </div>
  </form>
</div>
