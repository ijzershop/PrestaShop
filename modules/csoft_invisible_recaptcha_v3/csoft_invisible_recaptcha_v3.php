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
 * @version   1.1.3
 */

if (!defined('_PS_VERSION_'))
  exit;

class Csoft_invisible_recaptcha_v3 extends Module
{

  private $_html = '';
  private $product_shop_id;

  public function __construct()
  {
    $this->author = 'ComonSoft';
    $this->name = 'csoft_invisible_recaptcha_v3';
    $this->tab = 'front_office_features';
    $this->version = '1.2.3';
    $this->need_instance = 1;
    $this->bootstrap = true;
    $this->ps_versions_compliancy = array('min' => '1.7.1', 'max' => _PS_VERSION_);
    $this->displayName = $this->l('Google reCaptcha v3');
    $this->description = $this->l('Add a Invisible reCaptcha to your website contact form, newsletter and registration account page');

    $this->module_review_path = _PS_MODULE_DIR_ . '/' . $this->name . '/views/templates/admin/post-review-modal.tpl';
    $this->module_controller_url = __PS_BASE_URI__ . 'module/' . $this->name . '/AddModuleReviews';
    $this->product_shop_id = 37;

    parent::__construct();

    if ($this->active && (!Configuration::get('RECAPTCHA_PUBLIC_KEY') || !Configuration::get('RECAPTCHA_PRIVATE_KEY')))
      $this->warning = $this->l('Need to be configurated with recaptcha keys.');
  }

  public function install()
  {
    $path = 'modules/contactform/views/templates/widget/contactform.tpl';
    $contactFormTplChild = file_exists(_PS_THEME_DIR_ . $path) ? file_get_contents(_PS_THEME_DIR_ . $path) : false;
    $contactFormTplParent = file_exists(_PS_PARENT_THEME_DIR_ . $path) ? file_get_contents(_PS_PARENT_THEME_DIR_ . $path) : false;

    if ($contactFormTplChild) {
      $pos = strpos($contactFormTplChild, 'name="submitMessage"');
      if (!$pos) {
        $this->_errors[] = $this->l('HTML tag input type="submit" name="submitMessage" not found in "contactform.tpl"');
      }
    } elseif ($contactFormTplParent) {
      $pos = strpos($contactFormTplParent, 'name="submitMessage"');
      if (!$pos) {
        $this->_errors[] = $this->l('HTML tag input type="submit" name="submitMessage" not found in "contactform.tpl"');
      }
    } else {
      $this->_errors[] = $this->l('Template "contactform.tpl" was not found in your theme!');
    }

    Configuration::updateValue('RECAPTCHA_SCORE', 6);

    if (count($this->_errors)) {
      return false;
    } elseif (!parent::install() 
				|| !$this->registerHook('displayBackOfficeHeader')
      			|| !$this->registerHook('actionAdminControllerSetMedia') 
      			|| !$this->registerHook('displayHeader') 
				|| !$this->registerHook('actionSubmitAccountBefore') 
				|| !$this->registerHook('actionCSoftRecaptchaV3IsValid') 
				|| !Configuration::updateValue('RECAPTCHA_BADGE', 1)) {
      return false;
    } else {
      return true;
    }
  }

  public function uninstall()
  {
    if (!Configuration::deleteByName('RECAPTCHA_PUBLIC_KEY') || !Configuration::deleteByName('RECAPTCHA_PRIVATE_KEY') || !Configuration::deleteByName('RECAPTCHA_BADGE'))
      return false;

    if (!parent::uninstall())
      return false;

    return true;
  }

  public function installOverrides()
  {
    $newsletter = Module::getInstanceByName('ps_emailsubscription');

    if (Tools::version_compare($newsletter->version, '2.6.0', '>=')) {
      $result = true;
      $class = basename('modules/contactform/contactform.php', '.php');
      $result &= $this->addOverride($class);
      $this->registerHook('actionNewsletterRegistrationBefore');

      return $result;
    } else
      parent::installOverrides();
  }

  /**
   * Submitting the configuration in the admin
   */
  public function postProcess()
  {
    if (Tools::isSubmit('SubmitCaptchaConfiguration')) {
      $output = false;

      $public_key = trim(strval(Tools::getValue('RECAPTCHA_PUBLIC_KEY')));
      if ($public_key && !empty($public_key) && ValidateCore::isGenericName($public_key))
        Configuration::updateValue('RECAPTCHA_PUBLIC_KEY', Tools::getValue('RECAPTCHA_PUBLIC_KEY'));
      else
        $output .= $this->displayError($this->l('Please fill the captcha public key'));

      $private_key = trim(strval(Tools::getValue('RECAPTCHA_PRIVATE_KEY')));
      if ($private_key && !empty($private_key) && ValidateCore::isGenericName($private_key))
        Configuration::updateValue('RECAPTCHA_PRIVATE_KEY', Tools::getValue('RECAPTCHA_PRIVATE_KEY'));
      else
        $output .= $this->displayError($this->l('Please fill the captcha private key'));

      Configuration::updateValue('RECAPTCHA_BADGE', (int)Tools::getValue('RECAPTCHA_BADGE'));
      Configuration::updateValue('RECAPTCHA_SCORE', (int)Tools::getValue('RECAPTCHA_SCORE'));

      if (!$output)
        $this->_html .= $this->displayConfirmation($this->l('Settings updated'));
      else
        return $output;
    }
  }

  private function _displayInfos()
  {
    $this->smarty->assign(array('moduleName' => $this->displayName, 
								'customer_name' => $this->context->employee->firstname . ' ' . substr($this->context->employee->lastname, 0, 1) . '.', 
								'module_review_path' => $this->module_review_path, 
								'product_shop_id' => $this->product_shop_id, 
								'domain' => urlencode(Context::getContext()->shop->getBaseURL(true)),
								'module_controller_url' => $this->module_controller_url));

    return $this->display(__FILE__, 'views/templates/admin/infos.tpl');
  }

  public function getContent()
  {
    $this->_html .= $this->_displayInfos();
    $this->_html .= $this->postProcess();
    $this->_html .= $this->renderForm();

    return $this->_html;
  }

  /**
   * Viewing the Admin Configuration Form
   */
  public function renderForm()
  {
    $fields_form = array(
      'form' => array(
        'legend' => array(
          'title' => $this->l('Google reCaptcha Configuration'),
          'icon' => 'icon-cogs'
        ),
        'description' => $this->l('To get your own public and private keys please click on the folowing link') . '<br /><a href="https://www.google.com/recaptcha/intro/index.html" target="_blank">https://www.google.com/recaptcha/intro/index.html</a>',
        'input' => array(
          array(
            'type' => 'text',
            'label' => $this->l('reCaptcha public key'),
            'name' => 'RECAPTCHA_PUBLIC_KEY',
            'required' => true,
            'empty_message' => $this->l('Please fill the captcha public key'),
          ),
          array(
            'type' => 'text',
            'label' => $this->l('reCaptcha private key'),
            'name' => 'RECAPTCHA_PRIVATE_KEY',
            'required' => true,
            'empty_message' => $this->l('Please fill the captcha private key'),
          ),
          array(
            'type' => 'switch',
            'label' => $this->l('Show reCaptcha badge'),
            'name' => 'RECAPTCHA_BADGE',
            'required' => true,
            'class' => 't',
            'is_bool' => true,
            'values' => array(
              array(
                'id' => 'active_on',
                'value' => 1,
                'label' => $this->l('Enabled'),
              ),
              array(
                'id' => 'active_off',
                'value' => 0,
                'label' => $this->l('Disabled'),
              ),
            ),
          ),
          array(
            'type' => 'text',
            'name' => 'RECAPTCHA_SCORE',
            'required' => true,
            'label' => $this->l('Select score security'),
            'min' => 0,
            'max' => 10,
            'step' => 1,
            'hint' => $this->l('Recaptcha\'s Score security is between 0 and 10. If you have false positives, increase the value. On the contrary, if you are detected as a robot, reduce the value.'),
          ),
        ),
        'submit' => array(
          'title' => $this->l('Save'),
          'class' => 'button btn btn-default pull-right',
        )
      ),
    );

    $helper = new HelperForm();
    $helper->show_toolbar = false;
    $helper->table = $this->table;
    $lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
    $helper->default_form_language = $lang->id;
    $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
    $helper->submit_action = 'SubmitCaptchaConfiguration';
    $helper->token = Tools::getAdminTokenLite('AdminModules');
    $helper->fields_value['RECAPTCHA_SCORE'] = Tools::getValue('RECAPTCHA_SCORE', Configuration::get('RECAPTCHA_SCORE'));
    $helper->tpl_vars = array(
      'fields_value' => $this->getConfigFieldsValues(),
      'languages' => $this->context->controller->getLanguages(),
      'id_language' => $this->context->language->id
    );

    return $helper->generateForm(array($fields_form));

  }

  public function getConfigFieldsValues()
  {
    return array(
      'RECAPTCHA_PUBLIC_KEY' => Tools::getValue('RECAPTCHA_PUBLIC_KEY', Configuration::get('RECAPTCHA_PUBLIC_KEY')),
      'RECAPTCHA_PRIVATE_KEY' => Tools::getValue('RECAPTCHA_PRIVATE_KEY', Configuration::get('RECAPTCHA_PRIVATE_KEY')),
      'RECAPTCHA_BADGE' => Tools::getValue('RECAPTCHA_BADGE', Configuration::get('RECAPTCHA_BADGE')),
      'RECAPTCHA_SCORE' => Tools::getValue('RECAPTCHA_SCORE', Configuration::get('RECAPTCHA_SCORE')),
    );
  }

  public function hookDisplayBackOfficeHeader($params)
  {
    if (Tools::getValue('configure') == $this->name) {
      $this->context->controller->addJquery();
      $this->context->controller->addJqueryUI('ui.slider');
      $this->context->controller->addCSS($this->getPathUri(). 'views/css/productcomments.css');
      $this->context->controller->addJS($this->getPathUri() . 'views/js/jquery.rating.plugin.js');
      $this->context->controller->addJS($this->getPathUri() . 'views/js/post-comment.js');
    }
  }

  public function hookActionAdminControllerSetMedia()
  {
    if (Tools::getValue('configure') == $this->name) {
      $this->context->controller->addJs($this->getPathUri() . 'js/slider.js');
      $this->context->controller->addCss($this->getPathUri() . 'views/css/slider.css');
    }
  }

  /**
   * Hook Header for the contact form
   */
  public function hookDisplayHeader($params)
  {

    $this->context->controller->registerJavascript(
      'recaptcha',
      'https://www.google.com/recaptcha/api.js?render=' . Configuration::get('RECAPTCHA_PUBLIC_KEY'),
      [
        'attributes' => 'async',
        'server' => 'remote'
      ]
    );
	$this->context->controller->addJquery(); 
    $this->context->controller->registerJavascript(
      'settings-recaptcha',
      'modules/' . $this->name . '/js/settings.js',
      [
        'attributes' => 'async'
      ]
    );

    Media::addJsDef(array('recaptchaKey' => Configuration::get('RECAPTCHA_PUBLIC_KEY')));
    return $this->displayCaptchaContactForm();

  }

  /**
   * reCaptcha badge display or not
   */
  private function displayCaptchaContactForm()
  {
    $includes = '';

    if (Configuration::get('RECAPTCHA_BADGE') == 0) {
      $includes = '<style>
						.grecaptcha-badge {
  							display: none;
						}
					</style>';
    }

    return $includes;
  }

  /* specific hook, way to call it
        $hookErrorMsg = null;
        if( false===Hook::exec(
            'actionNewsletterRegistrationBefore',
            [
                'hookErrorMsg' => &$hookErrorMsg
            ]
        ) ) {
      if ($hookErrorMsg !== null) { // error message
        ...;
      }
    }
    Parameters:
      $param = array('hookErrorMsg')
    Return:
      true = valid user
      false = invalid user

  */
  public function hookActionCSoftRecaptchaV3IsValid($param)
  {
    $ret = false;
    $data = array(
      'secret' => Configuration::get('RECAPTCHA_PRIVATE_KEY'),
      'response' => $_POST['g-recaptcha-response']
    );
    $verify = curl_init();

    if (isset($verify) && $verify) {
      curl_setopt($verify, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
      curl_setopt($verify, CURLOPT_POST, true);
      curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
      curl_setopt($verify, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
      $response = @curl_exec($verify);
      curl_close($verify);
      $decode = json_decode($response, true);
      $score = Configuration::get('RECAPTCHA_SCORE');
      $nscore = $score / 10;

      if ($decode['success'] === true && $decode['score'] >= $nscore) {
        $ret = true;
      } else {
        return $param['hookErrorMsg'] = $this->l('You have been detected as a robot, your form can\'t be send.');
      }
    } else {
      return $param['hookErrorMsg'] = $this->l('An error occured, during API call.');
    }
    return $ret;
  }

  public function hookActionNewsletterRegistrationBefore(array $param)
  {
 
    $hookErrorMsg = null;
    if ($this->hookActionCSoftRecaptchaV3IsValid(['hookErrorMsg' => &$hookErrorMsg]) === true)
      return true;
    else {
		$param['hookError'] = $hookErrorMsg;
      return false;
    }
  }

  public function hookActionSubmitAccountBefore() {
    $hookErrorMsg = null;

    if ($this->hookActionCSoftRecaptchaV3IsValid(['hookErrorMsg' => &$hookErrorMsg]) === true) {
      return true;
    } else {
      $this->context->controller->errors[] = $hookErrorMsg;
      return false;
    }

    return true;
  }

}
