{**
 * Google Authenticator Security Module for Prestashop
 *
 * Based on the Prestashop 8.0.2 login/content.tpl
 *
 * @author    Rinku Kazeno <development@kazeno.co>
 *
 * @copyright Copyright since 2012 Rinku Kazeno
 * @license   This module is licensed to the user, upon purchase
 *  from either Prestashop Addons or directly from the author,
 *  for use on a single commercial Prestashop install, plus an
 *  optional separate non-commercial install (for development/testing
 *  purposes only). This license is non-assignable and non-transferable.
 *  To use in additional Prestashop installations an additional
 *  license of the module must be purchased for each one.
 *
 *  The user may modify the source of this module to suit their
 *  own business needs, as long as no distribution of either the
 *  original module or the user-modified version is made.
 *
 * @file-version: 1.25
 *}
<div id="login-panel">
	<div id="login-header">
		<h1 class="text-center">
			<img id="logo" src="{$img_dir}prestashop@2x.png" width="123px" height="24px" alt="PrestaShop" />
		</h1>
		<div class="text-center">{$ps_version}</div>
		<div id="error" class="hide alert alert-danger">
		{if isset($errors)}
			<h4>
				{if isset($nbErrors) && $nbErrors > 1}
					{l s='There are %d errors.' sprintf=[$nbErrors] d='Admin.Notifications.Error'}
				{else}
					{l s='There is %d error.' sprintf=[$nbErrors] d='Admin.Notifications.Error'}
				{/if}
			</h4>
			<ol>
				{foreach from=$errors item="error"}
				<li>{$error}</li>
				{/foreach}
			</ol>
		{/if}
		</div>

		{if isset($warningSslMessage)}
		<div class="alert alert-warning">{$warningSslMessage}</div>
		{/if}
	</div>
	<div id="shop-img"><img src="{$img_dir}preston-login@2x.png" alt="{$shop_name}" width="69.5px" height="118.5px" /></div>
	<div class="flip-container">
		<div class="flipper">
			<div class="front front_login panel" {if isset($reset_token) && isset($id_employee)}style="display:none;"{/if}>
				<h4 id="shop_name">{$shop_name}</h4>
				{if !isset($wrong_folder_name) && !isset($wrong_install_name)}
				<form action="#" id="login_form" method="post">
					<input type="hidden" name="redirect" id="redirect" value="{$redirect}"/>
					<div class="form-group">
						<label class="control-label" for="email">{l s='Email address' d='Admin.Global'}</label>
						<input name="email" type="email" id="email" class="form-control" value="{if isset($email)}{$email|escape:'html':'UTF-8'}{/if}" autofocus="autofocus" tabindex="1" placeholder="&#xf0e0 test@example.com" />
					</div>
					<div class="form-group">
						<label class="control-label" for="passwd">
							{l s='Password' d='Admin.Global'}
						</label>
						<input name="passwd" type="password" id="passwd" class="form-control" value="{if isset($password)}{$password|escape:'html':'UTF-8'}{/if}" tabindex="2" placeholder="&#xf084 {l s='Password'}" />
					</div>
                    {if isset($enableGauth)}
                        <div class="form-group">
                            <label class="control-label" for="gauthcode">
                                {$gauthText}
                            </label>
                            <input type="text" id="gauthcode" name="gauthcode" class="form-control" value="" tabindex="3" placeholder="&#xf023 " />
                            <script>//<!--
                                $(document).ajaxSend(function(e, jqxhr, settings) {     //send gauthcode too when logging in by ajax
                                    settings.data += '&gauthcode='+encodeURIComponent($('#gauthcode').val());
                                });
                                //--></script>
                        </div>
                    {/if}
					<div class="form-group row-padding-top">
						<button id="submit_login" name="submitLogin" type="submit" tabindex="4" class="btn btn-primary btn-lg btn-block ladda-button" data-style="slide-up" data-spinner-color="white" >
							<span class="ladda-label">
								{l s='Log in' d='Admin.Login.Feature'}
							</span>
						</button>
					</div>
					<div class="form-group row">
						<div id="remind-me" class="checkbox col-xs-6">
							<label for="stay_logged_in">
								<input name="stay_logged_in" type="checkbox" id="stay_logged_in" value="1"	tabindex="3"/>
								{l s='Stay logged in' d='Admin.Login.Feature'}
							</label>
						</div>
						<a href="#" id="forgot-password-link" class="show-forgot-password col-xs-6 text-right">
							{l s='I forgot my password' d='Admin.Login.Feature'}
						</a>
					</div>
				</form>
			</div>
			{if isset($reset_token) && isset($id_employee)}
			<div class="front front_reset panel">
				<form action="#" id="reset_password_form" method="post">
					<h4 id="reset_name">{l s='Reset your password' d='Admin.Login.Feature'}</h4>
					<div class="form-group">
						<label class="control-label" for="reset_passwd">
							{l s='New password' d='Admin.Login.Feature'}
						</label>
						<input name="reset_passwd" type="password" id="reset_passwd" class="form-control" value="" tabindex="1" placeholder="&#xf084 {l s='Password' d='Admin.Global'}" />
					</div>
					<div class="form-group">
						<label class="control-label" for="reset_confirm">
							{l s='Confirm new password' d='Admin.Login.Feature'}
						</label>
						<input name="reset_confirm" type="password" id="reset_confirm" class="form-control" value="" tabindex="2" placeholder="&#xf084 {l s='Confirm password' d='Admin.Login.Feature'}" />
					</div>
					<div class="panel-footer">
						<button class="btn btn-primary btn-default pull-right" name="submitLogin" type="submit" tabindex="3">
							<i class="icon-ok text-success"></i>
							{l s='Reset password' d='Admin.Login.Feature'}
						</button>
					</div>
					<input type="hidden" name="reset_token" id="reset_token" value="{$reset_token|escape:'html':'UTF-8'}" />
					<input type="hidden" name="id_employee" id="id_employee" value="{$id_employee|escape:'html':'UTF-8'}" />
					<input type="hidden" name="reset_email" id="reset_email" value="{$reset_email|escape:'html':'UTF-8'}" />
				</form>
			</div>
			<div class="back back_reset">
				<h4 id="reset_confirm_name">{l s='Your password has been successfully changed.'}<br/><br/>{l s='You will be redirected to the login page in a few seconds.' d='Admin.Login.Notification'}</h4>
			</div>
			{/if}

			<div class="back panel">
				<h4 id="forgot_name">{l s='Forgot your password?' d='Admin.Global'}</h4>
				<form action="#" id="forgot_password_form" method="post">
					<div class="form-group">
						<label class="control-label" for="email_forgot">
							{l s='Email address' d='Admin.Global'}
						</label>
						<input type="text" name="email_forgot" id="email_forgot" class="form-control" autofocus="autofocus" tabindex="5" placeholder="&#xf0e0 test@example.com" />
					</div>
					<div class="panel-footer">
						<button type="button" href="#" class="btn btn-default show-login-form" tabindex="7">
							<i class="icon-caret-left"></i>
							{l s='Cancel' d='Admin.Actions'}
						</button>
						<button id="reset-password-button" class="btn btn-primary btn-default pull-right" name="submitLogin" type="submit" tabindex="6">
							<i class="icon-ok text-success"></i>
							{l s='Send reset link' d='Admin.Login.Feature'}
						</button>
					</div>
				</form>
			</div>

			<div class="front forgot_confirm" style="display: none">
				<h4 id="forgot_confirm_name">{l s='Please, check your mailbox.' d='Admin.Login.Notification'}<br/><br/>{l s='A link to reset your password has been sent to you.' d='Admin.Login.Notification'}</h4>
			</div>
		</div>
		{else}
		<div class="alert alert-danger">
			<p>{l s='For security reasons, you cannot connect to the back office until you have:' d='Admin.Login.Notification'}</p>
			<ul>
				{if isset($wrong_install_name) && $wrong_install_name == true}
					<li>{l s='deleted the /install folder' d='Admin.Login.Notification'}</li>
				{/if}
				{if isset($wrong_folder_name) && $wrong_folder_name == true}
					<li>{l s='renamed the /admin folder (e.g. %s)' sprintf=[$randomNb] d='Admin.Login.Notification'}</li>
				{/if}
			</ul>
			<p>
				<a href="{$adminUrl|escape:'html':'UTF-8'}">
					{l s='Please then access this page by the new URL (e.g. %s)' sprintf=[$adminUrl] d='Admin.Login.Notification'}
				</a>
			</p>
		</div>
		{/if}
	</div>

  <a class='login-back' href='{$homeUrl}'><i class="material-icons rtl-flip">arrow_back</i> <span>{l s='Back to' d='Admin.Actions'}</span> <span class="login-back-shop">{$shop_name}</span></a>

	{hook h="displayAdminLogin"}

	<div id="login-footer">
		<p class="text-center text-muted">
			<a href="https://www.prestashop.com/" onclick="return !window.open(this.href);">
				&copy; PrestaShop&#8482; 2007-{$smarty.now|date_format:"%Y"} - All rights reserved
			</a>
		</p>
		<p class="text-center">
			<a class="link-social link-twitter _blank" href="https://twitter.com/PrestaShop" title="Twitter">
				<i class="icon-twitter"></i>
			</a>
			<a class="link-social link-facebook _blank" href="https://www.facebook.com/prestashop" title="Facebook">
				<i class="icon-facebook"></i>
			</a>
			<a class="link-social link-github _blank" href="https://www.prestashop.com/github" title="Github">
				<i class="icon-github"></i>
			</a>
		</p>
	</div>
</div>
