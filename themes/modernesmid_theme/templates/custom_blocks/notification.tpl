{assign var="showNotification" value=0}
{assign var="showOnPages" value=explode(',',Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_PAGES'))}
{* Home  *}
{if $page.page_name == 'index' && in_array('home', $showOnPages)}
	{assign var="showNotification" value=1}
{* Contact page *}
{elseif $page.page_name == 'contactinformation' && in_array('offer', $showOnPages)}
	{assign var="showNotification" value=1}
{* Offer page *}
{elseif $page.page_name == 'contactoffer' && in_array('information', $showOnPages)}
	{assign var="showNotification" value=1}
{* My account page *}
{elseif $page.page_name == 'my-account' && in_array('my-account', $showOnPages)}
	{assign var="showNotification" value=1}
{* Other cms pages *}
{elseif $page.page_name == 'cms' && in_array($cms.id, $showOnPages)}
	{assign var="showNotification" value=1}
{* Product pages *}
{elseif $page.page_name == 'product' && in_array('product', $showOnPages)}
	{assign var="showNotification" value=1}
{* Category pages *}
{elseif $page.page_name == 'category' && in_array('category', $showOnPages)}
	{assign var="showNotification" value=1}
{* Checkout pages *}
{elseif $page.page_name == 'module-supercheckout-supercheckout' && in_array('module-supercheckout-supercheckout', $showOnPages)}
	{assign var="showNotification" value=1}
{else}
	{assign var="showNotification" value=0}
{/if}


{if ($showNotification > 0 || in_array('all', $showOnPages)) && strlen(Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_TEXT')) > 3}
	<div class="row">
		<div class="alert alert-{Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_TYPE')} rounded-0 p-3 text-center w-100" role="alert">
		  {Configuration::get('MSTHEMECONFIG_SHOP_NOTIFICATION_TEXT') nofilter}
		</div>
	</div>
{/if}

