<?php
/**
 * @author    N1ED http://n1ed.com
 * @copyright N1ED/EdSDK
 * @license   Proprietary license
 * @file      Code for accepting HTML built with N1ED
 */

class Validate extends ValidateCore
{
    public static function isCleanHtml($html, $allow_iframe = false)
    {
        if (Module::isEnabled('n1ed')) {
            return true;
        } else {
            return parent::isCleanHtml($html, $allow_iframe);
        }
    }
}
