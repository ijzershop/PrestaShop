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

<div id="search_widget" class="col p-0 search_widget ui-front" data-search-controller-url="{$search_controller_url}">
	<form method="get" class="input-group header-search-box" action="{$search_controller_url}">
		<input class="form-control form-control-sm" type="text" name="s" value="{$search_string}" placeholder="{l s='Waar bent u naar op zoek?' d='Shop.Theme.Catalog'}" aria-label="{l s='Search' d='Shop.Theme.Catalog'}">
		<div class="input-group-append">
			<button class="btn btn-success btn-secondary btn-sm" type="submit" aria-label="Zoeken">
				<i class="fasr fa-magnifying-glass d-block"></i>
			</button>
		</div>
		<input type="hidden" name="controller" value="search">
	</form>
</div>
