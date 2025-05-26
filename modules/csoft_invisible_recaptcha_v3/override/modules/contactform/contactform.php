<?php

/**
 * csoft_invisible_recaptcha_v3 front-end module version 1.1.1 for Prestashop 1.7
 * Support contact : prestashop@comonsoft.com.
 *
 * NOTICE OF LICENSE
 *
 * This source file is the property of Com'onSoft
 * that is bundled with this package.
 * It is also available through the world-wide-web at this URL:
 * https://boutique.comonsoft.com/
 *
 * @category  front-end
 * @package   csoft_invisible_recaptcha_v3
 * @author    Com'onSoft (http://www.comonsoft.com/)
 * @copyright 2016-2020. Com'onSoft and contributors
 * @version   1.1.2
 */

if (!defined('_PS_VERSION_')) {
  exit;
}

class ContactformOverride extends Contactform
{
  public function sendMessage()
  {
    $hookErrorMsg = null;

    if (Hook::exec('actionCSoftRecaptchaV3IsValid', ['hookErrorMsg' => &$hookErrorMsg]) == 1) {
      parent::sendMessage();
    } else {
      if ($hookErrorMsg !== null) {
        $this->context->controller->errors[] = $hookErrorMsg;
      }
    }
  }
}

