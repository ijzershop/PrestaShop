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
        document.cookie = nazwa + "=" + escape(wartosc) + ";path=/;"+ ";SameSite = strict;Secure; HttpOnly;" + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()))
    }

    {/literal}
    {if Configuration::get('uecookie_close_anim')==1}
    {literal}
        function closeUeNotify() {
            $('#cookieNotice').fadeOut(1500);
            setcook();
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

<div id="cookieNotice" style=" width: 100%; position: fixed; {if $vareu->uecookie_position==2}bottom:0px; box-shadow: 0px 0 10px 0 #{$vareu->uecookie_shadow};{else} top:0px; box-shadow: 0 0 10px 0 #{$vareu->uecookie_shadow};{/if} background: #{$vareu->uecookie_bg}; z-index: 9999; font-size: 12px; line-height: 1.3em; font-family: arial; left: 0px; text-align:center; color:#444; opacity: {$vareu->uecookie_opacity} ">
    <div id="cookieNoticeContent" style="position:relative; margin:auto; width:100%; display:block;">
        <table style="width:100%;margin: 10px;">
            <tr>
            <td style="text-align:center;">
                {$uecookie nofilter}
            </td>
            </tr>
            <tr>
                <td colspan="2">
                    <a class="btn btn-sm btn-dark rounded-0" href="{$link->getCMSLink(Configuration::get('MODERNESMIDTHEMECONFIGURATOR_CONTACTPAGE_PRIVACY'))}">Privacy voorwaarden</a>
                    <button class="btn btn-sm btn-dark rounded-0" onclick="closeUeNotify()">Ok</button>
                </td>
            </tr>
        </table>
    </div>
</div>