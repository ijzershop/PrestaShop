<div class="container mt-4">
    <div class="row">
      {if Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE', true)}
      <div class="footer_block border-bottom pb-mb-4 col-lg-5 col-md-12 col-12">
            <div class="title_block">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> {Configuration::get('MSTHEMECONFIG_FOOTERTOP_ABOUTUS_HEADER')}
                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasr fa-plus plus_sign"></i></div>
                </div>
            </div>
            <div class="footer_block_content d-sm-none d-none d-md-flex">
                <div class="easy_brother_block text-1 text-md-0">
                    {Configuration::get('MSTHEMECONFIG_FOOTERTOP_ABOUTUS_TEXT') nofilter}
{*                    {if (int)Configuration::get('MSTHEMECONFIG_FOOTERTOP_ABOUTUS_LINK') > 0}*}
{*                      <a class="text-dark" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERTOP_ABOUTUS_LINK'))}" title="{l s="Read more" d='Shop.Modernesmid'}">{l s="Read more" d='Shop.Modernesmid'} >></a>*}
{*                    {/if}*}
                </div>
            </div>
        </div>
      {/if}
      {if Configuration::get('MSTHEMECONFIG_INFORMATION_FOOTERTOP_BOX_ACTIVE', true)}
      <div class="footer_block border-bottom pb-mb-4 {if Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE', true)}col-12 col-md-4 col-lg-2{else}col{/if} pl-lg-0 pt-0 pt-md-1 pt-lg-0 p-0">
            <div class="title_block ">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> {Configuration::get('MSTHEMECONFIG_FOOTERTOP_INFORMATION_HEADER')}
                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasr fa-plus plus_sign"></i></div>
                </div>
            </div>
             {Configuration::get('MSTHEMECONFIG_FOOTERTOP_INFORMATION') nofilter}
        </div>
      {/if}
      {if Configuration::get('MSTHEMECONFIG_PARTNERS_FOOTERTOP_BOX_ACTIVE', true)}
      <div class="footer_block border-bottom pb-mb-4 {if Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE', true)}col-12 col-md-4 col-lg-2{else}col{/if} pt-0 pt-md-1 pt-lg-0">
            <div class="title_block ">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> {Configuration::get('MSTHEMECONFIG_FOOTERTOP_PARTNERS_HEADER')}
                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasr fa-plus plus_sign"></i></div>
                </div>
            </div>
             {Configuration::get('MSTHEMECONFIG_FOOTERTOP_PARTNERS') nofilter}
      </div>




      {/if}
      {if Configuration::get('MSTHEMECONFIG_STORE_INFORMATION_FOOTERTOP_BOX_ACTIVE', true)}
      <div class="footer_block border-bottom pb-mb-4 {if Configuration::get('MSTHEMECONFIG_ABOUT_FOOTERTOP_BOX_ACTIVE', true)}col-12 col-md-4 col-lg-3{else}col{/if} pr-lg-0 pt-0 pt-md-1 pt-lg-0">
            <div class="title_block ">
                <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> {l s="Store Information" d='Shop.Modernesmid'}
                    <div class="opener float-right d-sm-flex d-md-none"><i class="fasr fa-plus plus_sign"></i></div>
                </div>
            </div>
            <ul class="footer_block_content bullet custom_links_list  list-unstyled d-sm-none d-none d-md-block">
                <li>
                    <a href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_LINK'))}" class="dropdown_list_item text-decoration-none text-dark" title="{l s="Daily opened from %s" sprintf=[Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_OPENED')] d='Shop.Modernesmid'}">
                        <i class="fasr fa-clock  list_arrow  st_custom_link_icon"></i> &nbsp;{Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_OPENED')}
                    </a>
                </li>
                <li>
                    <a href="https://www.google.com/maps/place/{Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_GOOGLE_STRING')}" class="dropdown_list_item text-decoration-none text-dark" title="{Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_ADDRESS')}" rel="noopener" target="_blank">
                        <i class="fasr fa-location-dot  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_ADDRESS')}
                    </a>
                </li>
                <li>
                    <a href="tel://{str_replace(' ','',Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE'))}" class="dropdown_list_item text-decoration-none text-dark" title="{l s="Call us:" d='Shop.Modernesmid'} {Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE')}">
                        <i class="fasr fa-phone  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{l s="Call us:" d='Shop.Modernesmid'} {Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_PHONE')}
                    </a>
                </li>
                <li>
                    <a href="{str_replace(' ','',Configuration::get('MSTHEMECONFIG_HEADER_WHATSAPP_LINK'))}" class="dropdown_list_item text-decoration-none text-dark" title="{l s="Whatsapp:" d='Shop.Modernesmid'} {Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_WHATSAPP')}">
                        <i class="fab fa-whatsapp  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{l s="Whatsapp:" d='Shop.Modernesmid'} {Configuration::get('MSTHEMECONFIG_FOOTERTOP_STOREINFO_WHATSAPP')}
                    </a>
                </li>
                <li>
                    <a href="{Configuration::get('MSTHEMECONFIG_CONTACTPAGE_CONTACTINFORMATION_PAGE')}" class="dropdown_list_item text-decoration-none text-dark" title="Contactformulier">
                        <i class="fasr fa-envelope  list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{l s="Mail ons: contactformulier:" d='Shop.Modernesmid'}
                    </a>
                </li>
            </ul>


        <div class="d-none d-md-block">
          <ul class="footer_block_content bullet custom_links_list  list-unstyled ">
              {if Context::getContext()->cookie->logged}
                <li>
                  <a href="{$urls.pages.my_account}" class="dropdown_list_item text-decoration-none text-dark" title="Uw account">
                    <i class="fasr fa-user list_arrow st_custom_link_icon"></i> &nbsp;&nbsp;{l s='Your account' d='Shop.Theme.Customeraccount'}
                  </a>
                </li>
                <li>
                  <a href="{$urls.pages.history}" class="dropdown_list_item text-decoration-none text-dark" title="Uw bestellingen">
                    <i class="fasr fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Uw Bestellingen
                  </a>
                </li>
                <li>
                  <a href="{$urls.actions.logout}" class="dropdown_list_item text-decoration-none text-dark" title="Afmelden">
                    <i class="fasr fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{l s='Logout' d='Shop.Theme.Customeraccount'}
                  </a>
                </li>
              {else}
                <li>
                  <a href="{$urls.pages.guest_tracking}" class="dropdown_list_item text-decoration-none text-dark" title="Gast bestelling status opvragen">
                    <i class="fasr fa-magnifying-glass list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Gast bestelling status opvragen
                  </a>
                </li>
                <li>
                  <a href="{$urls.pages.authentication}" class="dropdown_list_item text-decoration-none text-dark" title="Aanmelden">
                    <i class="fasr fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{l s='Login' d='Shop.Theme.Customeraccount'}
                  </a>
                </li>
              {/if}
          </ul>
        </div>

        </div>
      {/if}
        <div class="footer_block border-bottom pb-mb-4 d-block d-md-none col">
          <div class="title_block ">
            <div class="title_block_inner text-dark pb-mb-1" style="font-size:16px;"> Mijn Account
              <div class="opener float-right d-sm-flex d-md-none"><i class="fasr fa-plus plus_sign"></i></div>
            </div>
          </div>

          <ul class="footer_block_content bullet custom_links_list  list-unstyled d-none">
            {if Context::getContext()->cookie->logged}
            <li>
              <a href="{$urls.pages.my_account}" class="dropdown_list_item text-decoration-none text-dark" title="Uw account">
                <i class="fasr fa-user list_arrow st_custom_link_icon"></i> &nbsp;&nbsp;{l s='Your account' d='Shop.Theme.Customeraccount'}
              </a>
            </li>
              <li>
                <a href="{$urls.pages.history}" class="dropdown_list_item text-decoration-none text-dark" title="Uw bestellingen">
                  <i class="fasr fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Uw Bestellingen
                </a>
              </li>
            <li>
              <a href="{$urls.actions.logout}" class="dropdown_list_item text-decoration-none text-dark" title="Afmelden">
                <i class="fasr fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{l s='Logout' d='Shop.Theme.Customeraccount'}
              </a>
            </li>
              {else}
              <li>
                <a href="{$urls.pages.guest_tracking}" class="dropdown_list_item text-decoration-none text-dark" title="Gast bestelling status opvragen">
                  <i class="fasr fa-magnifying-glass list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;Gast bestelling status opvragen
                </a>
              </li>
              <li>
                <a href="{$urls.pages.authentication}" class="dropdown_list_item text-decoration-none text-dark" title="Aanmelden">
                  <i class="fasr fa-lock list_arrow  st_custom_link_icon"></i> &nbsp;&nbsp;{l s='Login' d='Shop.Theme.Customeraccount'}
                </a>
              </li>
            {/if}
          </ul>
        </div>
    </div>
</div>


