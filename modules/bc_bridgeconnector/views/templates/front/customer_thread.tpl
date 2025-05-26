{**
 * 2007-2024 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
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
 * @copyright 2007-2024 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}

{if !$email}
<div class="panel">
    <h3>
        {if !empty($message.employee_name)}
            <i>{$employee_avatar|escape:'htmlall':'UTF-8'}</i>
            ({$message.employee_name|escape:'htmlall':'UTF-8'}) - {$PS_SHOP_NAME|escape:'htmlall':'UTF-8'}
        {else}
            <i class="icon-user"></i>
            {if !empty($message.id_customer)}
                <a href="index.php?tab=AdminCustomers&amp;id_customer={$message.id_customer|escape:'htmlall':'UTF-8'}&amp;viewcustomer&amp;token={$message.token|escape:'htmlall':'UTF-8'}" title="{l s='View customer' d='Admin.Orderscustomers.Feature'}">
                    {$message.customer_name|escape:'htmlall':'UTF-8'}
                </a>
            {else}
                {$message.email|escape:'htmlall':'UTF-8'}
            {/if}
        {/if}
    </h3>
    <div class="infoCustomer">
        {if !empty($message.id_customer) && empty($message.id_employee)}
            <dl class="dl-horizontal">
                <dt>{l s='Customer ID:' d='Admin.Orderscustomers.Feature'}</dt>
                <dd>
                    <a href="index.php?tab=AdminCustomers&amp;id_customer={$message.id_customer|escape:'htmlall':'UTF-8'}&amp;viewcustomer&amp;token={$message.token|escape:'htmlall':'UTF-8'}" title="{l s='View customer' d='Admin.Orderscustomers.Feature'}">
                        {$message.id_customer|escape:'htmlall':'UTF-8'} <i class="icon-search"></i>
                    </a>
                </dd>
            </dl>
        {/if}
        <dl class="dl-horizontal">
            <dt>{l s='Sent on:' d='Admin.Orderscustomers.Feature'}</dt>
            <dd>{$message.date_add|escape:'htmlall':'UTF-8'}&nbsp;</dd>
        </dl>
        {if empty($message.id_employee)}
            <dl class="dl-horizontal">
                <dt>{l s='Browser:' d='Admin.Orderscustomers.Feature'}</dt>
                <dd>{$message.user_agent|escape:'htmlall':'UTF-8'}&nbsp;</dd>
            </dl>
        {/if}
        {if !empty($message.file_name) && $file_name}
            <dl class="dl-horizontal">
                <dt>{l s='File attachment' d='Admin.Orderscustomers.Feature'}</dt>
                <dd>
                    <a href="index.php?tab=AdminCustomerThreads&amp;id_customer_thread={$message.id_customer_thread|escape:'htmlall':'UTF-8'}&amp;viewcustomer_thread&amp;token={$message.token|escape:'htmlall':'UTF-8'}&amp;filename={$message.file_name|escape:'htmlall':'UTF-8'}"
                       title="{l s='View file' d='Admin.Orderscustomers.Feature'}">
                        <i class="icon-search"></i>
                    </a>
                </dd>
            </dl>
        {/if}
        {if !empty($message.id_order) && $is_valid_order_id && empty($message.id_employee)}
            <dl class="dl-horizontal">
                <dt>{l s='Order #' d='Admin.Orderscustomers.Feature'}</dt>
                <dd><a href="index.php?tab=AdminOrders&amp;id_order={$message.id_order|escape:'htmlall':'UTF-8'}&amp;vieworder&amp;token={$message.token|escape:'htmlall':'UTF-8'}" title="{l s='View order' d='Admin.Orderscustomers.Feature'}">{$message.id_order|escape:'htmlall':'UTF-8'} <img src="../img/admin/search.gif" alt="{l s='View' d='Admin.Actions'}" /></a>
                </dd>
            </dl>
        {/if}
        {if !empty($message.id_product) && empty($message.id_employee)}
            <dl class="dl-horizontal">
                <dt>{l s='Product #' d='Admin.Orderscustomers.Feature'}</dt>
                <dd><a href="{$link->getAdminLink('AdminProducts', true, ['id_product' => $message.id_product, 'updateproduct' => '1'])|escape:'html':'UTF-8'}" title="{l s='View order' d='Admin.Orderscustomers.Feature'}">{$message.id_product|escape:'htmlall':'UTF-8'} <img src="../img/admin/search.gif" alt="{l s='View' d='Admin.Actions'}" /></a></dd>
            </dl>
        {/if}

        <form class="form-inline" action="{$current|escape:'html':'UTF-8'}&amp;token={$token|escape:'html':'UTF-8'}&amp;id_customer_thread={$message.id_customer_thread|escape:'htmlall':'UTF-8'}&amp;viewcustomer_thread" method="post" >
            <input type="hidden" name="id_customer_message" value="{$message.id_customer_message|escape:'htmlall':'UTF-8'}" />
            <div class="form-group">
                <dl class="dl-horizontal">
                    <dt>{l s='Subject:' d='Admin.Global'}</dt>
                    <dd>
                        <select name="id_contact" class="fixed-width-lg" onchange="this.form.submit();">
                            {foreach $contacts as $contact}
                                <option value="{$contact.id_contact|escape:'htmlall':'UTF-8'}" {if $contact.id_contact == $message.id_contact}selected="selected"{/if}>
                                    {$contact.name|escape:'htmlall':'UTF-8'}
                                </option>
                            {/foreach}
                        </select>
                    </dd>
                </dl>
            </div>
        </form>
    </div>
    {else}
    <div class="infoEmployee">
        {if $id_employee}
            <a class="btn btn-default pull-right" href="{$thread_url|escape:'htmlall':'UTF-8'}">
                {l s='View this thread' d='Admin.Orderscustomers.Feature'}
            </a>
        {/if}
        <dl class="dl-horizontal">
            <dt>{l s='Sent by:' d='Admin.Orderscustomers.Feature'}</dt>
            <dd>
                {if !empty($message.customer_name)}
                    {$message.customer_name|escape:'htmlall':'UTF-8'} ({$message.email|escape:'htmlall':'UTF-8'})
                {else}
                    {$message.email|escape:'htmlall':'UTF-8'}
                {/if}
            </dd>
        </dl>

        {if !empty($message.id_customer) && empty($message.id_employee)}
            <!--<dl class="dl-horizontal">
					<dt>{l s='Customer ID:' mod='bridgeconnector'}</dt>
					<dd>{$message.id_customer|escape:'htmlall':'UTF-8'}</dd>
				</dl>-->
        {/if}

        {if !empty($message.id_order) && empty($message.id_employee)}
            <!--<dl class="dl-horizontal">
					<dt>{l s='Order #' mod='bridgeconnector'}:</dt>
					<dd>{$message.id_order|escape:'htmlall':'UTF-8'}</dd>
				</dl>-->
        {/if}

        {if !empty($message.id_product) && empty($message.id_employee)}
            <!--<dl class="dl-horizontal">
					<dt>{l s='Product #' mod='bridgeconnector'}:</dt>
					<dd>{$message.id_product|escape:'htmlall':'UTF-8'}</dd>
				</dl>-->
        {/if}

        <!--<dl class="dl-horizontal">
				<dt>{l s='Subject:' mod='bridgeconnector'}</dt>
				<dd>{$message.subject|escape:'htmlall':'UTF-8'}</dd>
			</dl>-->
        {/if}
        {if !$email}
            <dl class="dl-horizontal">
                <dt>{l s='Thread ID:' d='Admin.Orderscustomers.Feature'}</dt>
                <dd>{$message.id_customer_thread|escape:'htmlall':'UTF-8'}</dd>
            </dl>
            <dl class="dl-horizontal">
                <dt>{l s='Message ID:' d='Admin.Orderscustomers.Feature'}</dt>
                <dd>{$message.id_customer_message|escape:'htmlall':'UTF-8'}</dd>
            </dl>
        {/if}
        <dl class="dl-horizontal">
            <dt>{l s='Message:' d='Admin.Orderscustomers.Feature'}</dt>
            <dd>{$message.message|escape:'html':'UTF-8'|nl2br}</dd>
        </dl>
    </div>
    {if !$email}
</div>
    {if empty($message.id_employee)}
        <div class="panel">
            <button class="btn btn-default"
                    onclick="$('#reply_to_{$message.id_customer_message|escape:'htmlall':'UTF-8'}').show(500); $(this).parent().hide();">
                <i class="icon-mail-reply"></i> {l s='Reply to this message' d='Admin.Orderscustomers.Feature'}
            </button>
        </div>
    {/if}
    <div id="reply_to_{$message.id_customer_message|escape:'htmlall':'UTF-8'}" style="display: none;">
        <div class="panel">
            <form action="{$current|escape:'html':'UTF-8'}&amp;token={$message.token|escape:'htmlall':'UTF-8'}&amp;id_customer_thread={$message.id_customer_thread|intval}&amp;viewcustomer_thread=1" method="post" enctype="multipart/form-data" class="form-horizontal">
                <div class="panel-heading">
                    {l s='Please type your reply below:' d='Admin.Orderscustomers.Feature'}
                </div>
                <div class="row row-margin-bottom">
                    <textarea class="col-lg-12" rows="6" name="reply_message">{$PS_CUSTOMER_SERVICE_SIGNATURE|escape:'htmlall':'UTF-8'}</textarea>
                </div>
                <div class="row">
                    <p class="pull-right">{l s='Your reply will be sent to:' d='Admin.Orderscustomers.Feature'} {$message.email|escape:'htmlall':'UTF-8'}</p>
                </div>
                <div class="row row-margin-bottom">
                    <input type="file" name="joinFile"/>
                </div>
                <div class="row">
                    <button type="submit" class="btn btn-default" name="submitReply">
                        <i class="icon-check"></i> {l s='Send my reply' d='Admin.Orderscustomers.Feature'}</button>
                    <input type="hidden" name="id_customer_thread" value="{$message.id_customer_thread|intval}" />
                    <input type="hidden" name="msg_email" value="{$message.email|escape:'htmlall':'UTF-8'}" />
                </div>
            </form>
        </div>
    </div>
{/if}
