{*
*  @author JK Webdesign Alkmaar <info@jk.nl>
*  @copyright 2007-2018 JK Webdesign Alkmaar
*  @url https://www.jk.nl
*}
	<style>
		.extended {
			display: block;
			border: 1px solid #d6d4d4;
			-moz-border-radius: 4px;
			-webkit-border-radius: 4px;
			border-radius: 4px;
			font-size: 17px;
			line-height: 23px;
			color: #333;
			font-weight: bold;
			padding: 33px 40px 34px 99px;
			letter-spacing: -1px;
			position: relative;
			background: url({$this_path_ssl}logo.png) 15px 15px no-repeat #fbfbfb;
		}
		.exclusive {
			margin-top: 10px;
		}
		.form {
			margin-top: 12px
		}
	</style>
	<div class="row">
	<div class="col-xs-12">
		<div class="extended">
			<span>{l s='Koop nu en betaal binnen 14 dagen op factuur' mod='billinkpayment'}</span>

			<form method="post" class="form" action="{$action}">
				   <label>Uw geboortedatum: </label><br/>
					<select name="dag" required>
						<option value="0">Dag</option>
						{section name=foo start=1 loop=32 step=1}
							<option value="{$smarty.section.foo.index}" {if $smarty.section.foo.index == $birthday_dag}selected=selected{/if}>{$smarty.section.foo.index}</option>
						{/section}
					</select>
					<select name="maand" required>
						<option value="0">Maand</option>
						{foreach from=$maanden item=maand key=key}
							<option value="{$key}" {if $key == $birthday_maand}selected=selected{/if}>{$maand}</option>
						{/foreach}
					</select>
					<select name="jaar" required>
						<option value="0">Jaar</option>
						{section name=foo start=1900 loop=$current_year+1 step=1}
							<option value="{$smarty.section.foo.index}" {if $smarty.section.foo.index == $birthday_jaar}selected=selected{/if}>{$smarty.section.foo.index}</option>
						{/section}
					</select>
					<br/><br/>
					<label>Telefoonnummer: </label><br/>
					<input type="number" name="telefoon" value="{$telefoon_account}" required/>
					<p>
						<small>{l s='Na succesvolle controle kunt u direct afrekenen met Billink'}</small>
					</p>
			</form>
		</div>
	</div>
	</div>
