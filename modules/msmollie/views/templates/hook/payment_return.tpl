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

<div class="box">
  <h3 class="h3">{l s='Order status' mod='msmollie'}</h3>

  {if $status == 'ok'}
    <p>
      {l s='Your payment has been successfully processed.' mod='msmollie'}
      <br /><br />
      {l s='Order reference:' mod='msmollie'} <strong>{$reference|escape:'html':'UTF-8'}</strong>
    </p>
  {else}
    <p class="warning">
      {l s='We noticed a problem with your payment. Please contact our customer support.' mod='msmollie'}
    </p>
  {/if}
</div>
