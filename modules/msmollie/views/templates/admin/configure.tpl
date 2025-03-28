{*
* 2023 ModerneSmid
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
*
* @author    ModerneSmid <info@modernesmid.nl>
* @copyright 2023 ModerneSmid
* @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*}

<div class="panel">
	<div class="row moduleconfig-header">
		<div class="col-xs-5 text-right">
			<img src="{$module_dir|escape:'html':'UTF-8'}views/img/mollie_logo.png" />
		</div>
		<div class="col-xs-7 text-left">
			<h2>{l s='ModerneSmid Mollie Payment' mod='msmollie'}</h2>
			<h4>{l s='Accept payments through Mollie payment gateway' mod='msmollie'}</h4>
		</div>
	</div>

	<hr />

	<div class="moduleconfig-content">
		<div class="row">
			<div class="col-xs-12">
				<p>
					<strong>{l s='This module allows you to accept payments through Mollie.' mod='msmollie'}</strong><br />
					{l s='Mollie offers a wide range of payment methods including iDEAL, credit card, PayPal, Bancontact, and more.' mod='msmollie'}
				</p>

				<br />

				<p>
					{l s='To configure this module, you need an API key from Mollie:' mod='msmollie'}
					<ol>
						<li>{l s='Create an account at' mod='msmollie'} <a href="https://www.mollie.com/" target="_blank">Mollie.com</a></li>
						<li>{l s='Get your API key from the Mollie Dashboard' mod='msmollie'}</li>
						<li>{l s='Enter your API key in the configuration form below' mod='msmollie'}</li>
					</ol>
				</p>

				<br />

				<p>
					{l s='If you need help or have questions, please contact:' mod='msmollie'}<br />
					<a href="mailto:info@modernesmid.nl">info@modernesmid.nl</a>
				</p>
			</div>
		</div>
	</div>
</div>
