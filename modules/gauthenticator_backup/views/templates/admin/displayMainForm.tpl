{**
 * Google Authenticator Security Module for Prestashop
 *
 * @author    Rinku Kazeno <development@kazeno.co>
 *
 * @copyright Copyright (c) 2012-2017, Rinku Kazeno
 * @license   This module is licensed to the user, upon purchase
 *  from either Prestashop Addons or directly from the author,
 *  for use on a single commercial Prestashop install, plus an
 *  optional separate non-commercial install (for development/testing
 *  purposes only). This license is non-assignable and non-transferable.
 *  To use in additional Prestashop installations an additional
 *  license of the module must be purchased for each one.
 *
 *  The user may modify the source of this module to suit their
 *  own business needs, as long as no distribution of either the
 *  original module or the user-modified version is made.
 *
 * @file-version: 1.21
 *}

{if $showReset}<input type="submit" class="button" name="submitReset" value="Reset Key" />{/if}
<script>//<!--{literal}
    $(document).ready(function () {
        var enabled = $('#ga_enabled');
        var disabled = $('#ga_disabled');
        var status = $().add(enabled).add(disabled);
        var typeSelect = $('#ga_type');
        var form = $('#employee_form');
        status.change(function () {
            var sel = $('#employee_form input[name=enabled]:checked').val();
            if (sel == "1") {
                typeSelect.prop('disabled', '');
            } else {
                typeSelect.prop('disabled', 'disabled');
            }
        });
        status.trigger('change');
    {/literal}{if $type}{literal}
        var curType = typeSelect.val();
        var changed = $('#employee_form input[name=changed]');
        typeSelect.change(function () {
            if (typeSelect.val() != curType)
                changed.val(1);
            else
                changed.val(0);
        });
        $('#employee_form [name=submitSave]').click(function () {
            /**/console.log('aaa')
            if (typeSelect.val() != curType) {
                if (confirm('{/literal}{$retypeConf}{literal}')) {
                    var action = form.attr('action');
                    form.attr('action', action+"&submitAddemployeeAndStay=1");
                    /**/console.log(form.attr('action'))
                    return true;
                } else return false;
            } else {
                return true;
            }
        });
    {/literal}{else}{literal}
        var action = form.attr('action');
        form.prop('action', action+"&submitAddemployeeAndStay=1");
    {/literal}{/if}{literal}
        $('#employee_form [name=submitReset]').click(function () {
            if (parseInt($('#employee_form input:radio[name=enabled]:checked').val())) {
                if (confirm('{/literal}{$resetConf}{literal}')) {
                    var action = form.attr('action');
                    form.attr('action', action+"&submitAddemployeeAndStay=1");
                    form.submit();
                    return true;
                } else
                return false;
            } else if(confirm('{/literal}{$disableConf}{literal}')) {
                return true;
            }
            return false;
        });
    });
//--></script>{/literal}