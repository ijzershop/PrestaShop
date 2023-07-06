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

{if $showReset}<input type="submit" class="button" name="submitReset" value="Reset" />{/if}
<script>//<!--{literal}
    $(document).ready(function () {
        var $form = $('#employee_form');
        $('#desc-employee-back, a:has(.process-icon-cancel)').remove();      //Remove back button to prevent users from interrupting the configuration
        $('#employee_form [name=submitSync]').click(function () {
            if (!$('#ga_key1').val() || !$('#ga_key2').val()) {
                alert('{/literal}{$requiredTxt}{literal}');
                return false;
            } else if ($('#ga_key1').val() == $('#ga_key2').val()) {
                alert('{/literal}{$differentTxt}{literal}');
                return false;
            }
        });
        $('#employee_form [name=submitReset]').click(function () {
            $('#employee_form input[name^=key]').val('');
            $('#employee_form input[name=reset]').val(1);
            $form.submit();
            return true;
        });
    });
//--></script>{/literal}