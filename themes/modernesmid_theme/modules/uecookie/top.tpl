{*
* PrestaShop module created by VEKIA, a guy from official PrestaShop community ;-)
*
* @author    VEKIA https://www.prestashop.com/forums/user/132608-vekia/
* @copyright 2010-2019 VEKIA
* @license   This program is not free software and you can't resell and redistribute it
*
* CONTACT WITH DEVELOPER
* support@mypresta.eu
*}

<script>
    {literal}
    function setcook() {
        var nazwa = 'cookie_ue';
        var wartosc = '1';
        var expire = new Date();
        expire.setMonth(expire.getMonth() + 12);

        var string = nazwa + "=" + escape(wartosc) + ";path=/" + ((expire == null) ? "" : (";expires=" + expire.toGMTString()))+ ";samesite=strict;";
        // console.log(string);
        document.cookie = string;
    }

    {/literal}
    {if Configuration::get('uecookie_close_anim')==1}
    {literal}
        function closeUeNotify() {
            $('#cookieNotice').fadeOut(1500);
            setcook();
            if(document.getElementById('delete-all-after').checked){
                $.ajax({
                    url: '/index.php?fc=module&module=msthemeconfig&controller=ajax&action=remove_gdpr',
                    type: 'GET'
                });
            }
        }
    {/literal}
    {/if}
    {literal}

    {/literal}
    {if Configuration::get('uecookie_close_anim')==0}
    {literal}
        function closeUeNotify() {
            {/literal}{if $vareu->uecookie_position==2}{literal}
            $('#cookieNotice').animate(
                    {bottom: '-200px'},
                    2500, function () {
                        $('#cookieNotice').hide();
                    });
            setcook();
            {/literal}{else}{literal}
            $('#cookieNotice').animate(
                    {top: '-200px'},
                    2500, function () {
                        $('#cookieNotice').hide();
                    });
            setcook();
            {/literal}{/if}{literal}
        }
    {/literal}
    {/if}
    {literal}
    {/literal}
</script>
<style>
    {literal}
    .closeFontAwesome {
        cursor: pointer;
        padding: 2px 5px 2px 15px;
    }

    .closeButtonNormal {
        {/literal} {if Configuration::get('uecookie_x_where')!=3}display: block;{else}display: inline-block; margin:5px;{/if} {literal}
        text-align: center;
        padding: 2px 5px;
        border-radius: 2px;
        color: {/literal}#{$vareu->uecookie_close_txt}{literal};
        background: {/literal}#{$vareu->uecookie_close_bg}{literal};
        cursor: pointer;
    }

    #cookieNotice p {
        margin: 0px;
        padding: 0px;
    }


    #cookieNoticeContent {
        {/literal}
        {if Configuration::get('uecookie_padding') != ""}
            padding:{Configuration::get('uecookie_padding')}px;
        {/if}
        {literal}
    }

    {/literal}
</style>

<div id="cookieNotice" style=" width: 100%; position: fixed; {if $vareu->uecookie_position==2}bottom:0px; box-shadow: 0px 0 10px 0 #{$vareu->uecookie_shadow};{else} top:0px; box-shadow: 0 0 10px 0 #{$vareu->uecookie_shadow};{/if} background: #{$vareu->uecookie_bg}; z-index: 9999999999; font-size: 12px; line-height: 1.3em; font-family: Open-sans, sans-serif; left: 0px; text-align:center; color:#444; opacity:0.92 ">
    <div id="cookieNoticeContent" class="text-center" style="position:relative; margin:auto; width:100%; display:block;padding:0px 10px;">
        <table style="margin: 10px auto;">
            <tr class="d-block">
                <td id="cookieNoticeCheckbox">
                      <p>Deze website maakt gebruik van cookies. Zie voor meer informatie bij onze <a class="text-decoration-none text-dark" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_CONTACTPAGE_PRIVACY'))}"><i class="fa-sharp fa-chevron-right" style="height:10px;"></i> Privacy voorwaarden</a></p>
                      <p>
                        <label for="delete-all-after" class="switch mx-auto">
                          <input type="checkbox" name="delete-all-after" id="delete-all-after">
                          <span class="slider round"></span>
                      </label> Verwijder al mijn gegevens na aankoop of verlaten van de site. U kunt deze gegevens na registratie ook zelf inzien en laten verwijderen. <a class="text-decoration-none text-dark" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_AVG_INFO_PAGE'))}"><i class="fa-sharp fa-chevron-right" style="height:10px;"></i> Zie hier voor meer informatie</a>
                      </p>
                </td>
              <td width="90px">
                <button id="cookie-check-submit" class="btn btn-sm btn-success rounded-0 ml-sm-2 mt-1 " onclick="closeUeNotify()">Accepteren</button>
              </td>
            </tr>
{*          <tr class="d-block d-sm-none">*}
{*            <td id="cookieNoticeCheckbox">*}
{*              <p>Deze website maakt gebruik van cookies. Zie voor meer informatie bij onze <a class="text-decoration-none text-dark" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_CONTACTPAGE_PRIVACY'))}"><i class="fa-sharp fa-chevron-right" style="height:10px;"></i> Privacy voorwaarden</a></p>*}
{*              <p>*}
{*                <label for="delete-all-after" class="switch mx-auto">*}
{*                  <input type="checkbox" name="delete-all-after" id="delete-all-after">*}
{*                  <span class="slider round"></span>*}
{*                </label> Verwijder al mijn gegevens na aankoop of verlaten van de site. U kunt deze gegevens na registratie ook zelf inzien en laten verwijderen. <a class="text-decoration-none text-dark" href="{$link->getCMSLink(Configuration::get('MSTHEMECONFIG_AVG_INFO_PAGE'))}"><i class="fa-sharp fa-chevron-right" style="height:10px;"></i> Zie hier voor meer informatie</a>*}
{*              </p>*}
{*              <p>*}
{*                <button class="btn btn-sm btn-success rounded-0 mt-1" onclick="closeUeNotify()">Accepteren</button>*}
{*              </p>*}
{*            </td>*}
{*          </tr>*}



        </table>
    </div>
</div>
