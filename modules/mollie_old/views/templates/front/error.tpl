{**
* Copyright (c) 2012-2020, Mollie B.V.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* - Redistributions of source code must retain the above copyright notice,
*    this list of conditions and the following disclaimer.
* - Redistributions in binary form must reproduce the above copyright
*    notice, this list of conditions and the following disclaimer in the
*    documentation and/or other materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
* LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
* OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
* DAMAGE.
*
* @author     Mollie B.V. <info@mollie.nl>
* @copyright  Mollie B.V.
* @license    Berkeley Software Distribution License (BSD-License 2) http://www.opensource.org/licenses/bsd-license.php
* @category   Mollie
* @package    Mollie
* @link       https://www.mollie.nl
*}
{capture name=path}
  <a href="{$link->getPageLink('order.php', true, null, ['step' => 3])|escape:'htmlall':'UTF-8'}">
    {l s='Payment' mod='mollie'}
  </a>
  <span class="navigation-pipe">
        {$navigationPipe|escape:'htmlall':'UTF-8'}
    </span>
  <span class="navigation_page">
        {l s='Payment error' mod='mollie'}
    </span>
{/capture}
<div class="alert alert-danger">
  <strong>{l s='An error occurred' mod='mollie'}:</strong>
  <ul>
    {foreach from=$errors item='error'}
      <li>{$error|escape:'htmlall':'UTF-8'}</li>
    {/foreach}
  </ul>
</div>
<ul class="footer_links clearfix">
  <li>
    <a class="btn btn-default button button-small" href="{$link->getPageLink('order.php', true, null, ['step' => 3])|escape:'htmlall':'UTF-8'}" title="{l s='Back to your shopping cart' mod='mollie'}">
      <span><i class="icon-chevron-left"></i> {l s='Back to your shopping cart' mod='mollie'}</span>
    </a>
  </li>
</ul>
