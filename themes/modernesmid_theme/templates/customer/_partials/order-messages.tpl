{**
 * 2007-2019 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{block name='order_messages_table'}
  {if $order.messages}
    <div class="box messages col-12">
      <h4 class="h4">{l s='Messages' d='Shop.Theme.Customeraccount'}</h4>
      {foreach from=$order.messages item=message}
        <div class="message row card mb-2 ml-2 mr-2">
          <div class="card-header">
              <strong> 
               {AttributeGroup::stripSawCutModuleAttributeGroupName($message.name, Context::getContext()->cookie->id_lang)}
              </strong>
            <span class="float-right">{$message.message_date}</span>
          </div>
          <div class="card-body">
            {$message.message nofilter}
          </div>
        </div>
      {/foreach}
    </div>
  {/if}
{/block}

{block name='order_message_form'}
  <section class="order-message-form box col-12">
    <form action="{$urls.pages.order_detail}" method="post">

      <header>
        <h4 class="h4">{l s='Add a message' d='Shop.Theme.Customeraccount'}</h4>
        <p>{l s='If you would like to add a comment about your order, please write it in the field below.' d='Shop.Theme.Customeraccount'}</p>
      </header>

      <section class="form-fields">

        <div class="form-group row">
          <label class="col-md-2 form-control-label">{l s='Product' d='Shop.Forms.Labels'}</label>
          <div class="col-md-10">
            <select name="id_product" class="form-control form-control-select">
              <option value="0">{l s='-- please choose --' d='Shop.Forms.Labels'}</option>
              {foreach from=$order.products item=product}
                <option value="{$product.id_product}">
                  {AttributeGroup::stripSawCutModuleAttributeGroupName($product.name, Context::getContext()->cookie->id_lang)}
                </option>
              {/foreach}
            </select>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-2 form-control-label">Uw bericht</label>
          <div class="col-md-10">
            <textarea rows="3" name="msgText" class="form-control"></textarea>
          </div>
        </div>

      </section>

      <footer class="form-footer text-sm-center">
        <input type="hidden" name="id_order" value="{$order.details.id}">
        <button type="submit" name="submitMessage" class="btn btn-primary form-control-submit w-100">
          {l s='Send' d='Shop.Theme.Actions'}
        </button>
      </footer>

    </form>
  </section>
{/block}
