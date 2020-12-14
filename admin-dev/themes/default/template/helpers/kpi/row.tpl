{**
* 2007-2019 PrestaShop and Contributors
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
* @author PrestaShop SA <contact@prestashop.com>
  * @copyright 2007-2019 PrestaShop SA and Contributors
  * @license https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
  * International Registered Trademark & Property of PrestaShop SA
  *}
  {assign var="workshopProfiles" value=Configuration::get('MODERNESMIDTHEMECONFIGURATOR_EMPLOYEE_WORKSHOP_PROFILES')}
  {assign var="profiles" value=array()}
  {if !empty($workshopProfiles)}
  {assign var="profiles" value=explode(',', $workshopProfiles)}
  {/if}
  {if !in_array(Context::getContext()->cookie->__get('profile'), $profiles)}
  <div class="panel kpi-container">
    {if $refresh}
    <div class="kpi-refresh"><button class="close refresh" type="button" onclick="refresh_kpis(true);"><i class="process-icon-refresh" style="font-size:1em"></i></button></div>
    {/if}
    <div class="row">
      {assign var='col' value=(int)(12 / $kpis|count)}
      {foreach from=$kpis item=i name=kpi}
      {if $smarty.foreach.kpi.iteration > $col+1}
    </div>
    <div class="row">
      {/if}
      <div class="col-sm-6 col-lg-{$col}">{$i}</div>
      {/foreach}
    </div>
  </div>
  {else}
  <style type="text/css">
  #content {
    margin-right: 50px;
  }

  .table-responsive-row {
    overflow: auto;
  }

  </style>
  {/if}

<style type="text/css">
  /*Koopman settings */
  .cc-koopman {
    margin-top: 10px;
  }

  .cc-koopman input {
    display: none;
    z-index: 999;
  }

  .envelope {
    background-image: url('../modules/koopmanorderexport/views/templates/img/envelop_koopman.png');
  }

  .plaat {
    background-image: url('../modules/koopmanorderexport/views/templates/img/plaat_koopman.png');
  }

  .meter-1 {
    background-image: url('../modules/koopmanorderexport/views/templates/img/1m_koopman.png');
  }

  .meter-larger-2 {
    background-image: url('../modules/koopmanorderexport/views/templates/img/2m+35_koopman.png');
  }

  .meter-smaller-2 {
    background-image: url('../modules/koopmanorderexport/views/templates/img/2m-35_koopman.png');
  }
  .toegevoegd {
    background-image: url('../modules/koopmanorderexport/views/templates/img/toegevoegd.png');
  }
  .aftehalen {
    background-image: url('../modules/koopmanorderexport/views/templates/img/aftehalen.png');
  }
  .afgehaald {
    background-image: url('../modules/koopmanorderexport/views/templates/img/afgehaald.png');
  }

  .type-cc {
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 0px 15px 0px 0px;
    -webkit-transition: all 100ms ease-in;
    -moz-transition: all 100ms ease-in;
    transition: all 100ms ease-in;
    -webkit-filter: opacity(1);
    -moz-filter: opacity(1);
    filter: opacity(1);
  }

  .type-cc:hover {
    -webkit-filter: opacity(.7);
    -moz-filter: opacity(.7);
    filter: opacity(.7);
  }
  </style>
