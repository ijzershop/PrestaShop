{*
* 2007-2013 PrestaShop
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
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2013 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*}

<script type="text/javascript">
	var textMsg = "{l s='This is a test message. Your server is now configured to send email.' js=1}";
	var textSubject = "{l s='Test message -- Prestashop' js=1}";
	var textSendOk = "{l s='A test email has been sent to the email address you provided.' js=1}";
	var textSendError= "{l s='Error: Please check your configuration' js=1}";
	var token_mail = '{$token}';
	var errorMail = "{l s='This email address is not valid' js=1}";
	$(document).ready(function() {
		if ($('input[name=PS_MAIL_METHOD]:checked').val() == 2)
			$('#configuration_fieldset_smtp').show();
		else
			$('#configuration_fieldset_smtp').hide();
	});
</script>

{if isset($content)}
	{if isset($show_page_header_toolbar) && $show_page_header_toolbar &&(!isset($lite_display) || !$lite_display)}
		<div class="leadin">
			{foreach from=$page_header_toolbar_btn item=btn key=k}
				{if $k == 'modules-list'}
				<div class="modal fade" id="modules_list_container">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
								<h3 class="modal-title">{l s='Modules'}</h3>
							</div>
							<div class="modal-body">
								<div id="modules_list_container_tab" style="display:none;"></div>
								<div id="modules_list_loader"><img src="../img/loader.gif" alt=""/></div>
							</div>
						</div>
					</div>
				</div>
				{/if}
			{/foreach}
		</div>
		{include file="page_header_toolbar.tpl" toolbar_btn=$page_header_toolbar_btn title=$page_header_toolbar_title}
	{/if}
	{$content}
{/if}

