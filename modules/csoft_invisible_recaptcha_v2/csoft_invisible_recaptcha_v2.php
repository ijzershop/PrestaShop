<?php
/**
 * csoft_invisible_recaptcha_v2 front-end module version 1.1.1 for Prestashop 1.7
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
 * @package   csoft_invisible_recaptcha_v2
 * @author    Com'onSoft (http://www.comonsoft.com/)
 * @copyright 2016-2020. Com'onSoft and contributors
 * @version   1.1.3
 */

if (!defined('_PS_VERSION_'))
	exit;


class Csoft_invisible_recaptcha_v2 extends Module
{

	private $_html = '';

	public function __construct()
	{
		$this->author = 'ComonSoft';
		$this->name = 'csoft_invisible_recaptcha_v2';
		$this->tab = 'front_office_features';
		$this->version = '1.1.4';
		$this->need_instance = 1;
		$this->bootstrap = true;
		$this->ps_versions_compliancy = array('min' => '1.7.1', 'max' => _PS_VERSION_);
		parent::__construct();
		$this->displayName = $this->l('Invisible reCaptcha');
		$this->description = $this->l('Add a Invisible reCaptcha to your website contact form and registration account page');

		if ($this->active && (!Configuration::get('RECAPTCHA_PUBLIC_KEY') || !Configuration::get('RECAPTCHA_PRIVATE_KEY')) )
			$this->warning = $this->l('need to be configurated');
	}

	public function install()
	{

//        var_export([_PS_THEME_DIR_,_PS_PARENT_THEME_DIR_]);
//        die();
		$contactFormTplChild = file_get_contents(_PS_ALL_THEMES_DIR_.'modernesmid_theme/modules/contactform/views/templates/widget/contactform.tpl');
		$contactFormTplParent = file_get_contents(_PS_ALL_THEMES_DIR_.'classic/modules/contactform/views/templates/widget/contactform.tpl');

		if($contactFormTplChild){
			$pos = strpos($contactFormTplChild, 'name="submitMessage"');
			if(!$pos){
				$this->_errors[] = $this->l('HTML tag input type="submit" name="submitMessage" not found in "contactform.tpl"');
			}
		}elseif($contactFormTplParent){
			$pos = strpos($contactFormTplParent, 'name="submitMessage"');
			if(!$pos){
				$this->_errors[] = $this->l('HTML tag input type="submit" name="submitMessage" not found in "contactform.tpl"');
			}
		}else{
			$this->_errors[] = $this->l('Template "contactform.tpl" was not found in your theme!');
		}

		if(count($this->_errors)){
			return false;
		}elseif (!parent::install() || !$this->registerHook('displayHeader')|| !$this->registerHook('actionSubmitAccountBefore') || !$this->registerHook('actionBeforeSubmitAccount') || !Configuration::updateValue('RECAPTCHA_BADGE', 1) || !Configuration::updateValue('RECAPTCHA_ACCOUNT', 1)){
			return false;
		}else{
			return true;
		}
	}

	public function uninstall()
	{
		if (!parent::uninstall())
			return false;

		if (!Configuration::deleteByName('RECAPTCHA_PUBLIC_KEY') || !Configuration::deleteByName('RECAPTCHA_PRIVATE_KEY') || !Configuration::deleteByName('RECAPTCHA_BADGE') || !Configuration::deleteByName('RECAPTCHA_ACCOUNT'))
			return false;

		return true;
	}

	/**
	 * Submitting the configuration in the admin
	 */
	public function postProcess()
	{
		if (Tools::isSubmit('SubmitCaptchaConfiguration'))
		{
			$output = false;

			$public_key = trim(strval(Tools::getValue('RECAPTCHA_PUBLIC_KEY')));
			if($public_key && !empty($public_key) && ValidateCore::isGenericName($public_key))
				Configuration::updateValue('RECAPTCHA_PUBLIC_KEY', Tools::getValue('RECAPTCHA_PUBLIC_KEY'));
			else
				$output .= $this->displayError($this->l('Please fill the captcha public key'));

			$private_key = trim(strval(Tools::getValue('RECAPTCHA_PRIVATE_KEY')));
			if($private_key && !empty($private_key) && ValidateCore::isGenericName($private_key))
				Configuration::updateValue('RECAPTCHA_PRIVATE_KEY', Tools::getValue('RECAPTCHA_PRIVATE_KEY'));
			else
				$output .= $this->displayError($this->l('Please fill the captcha private key'));

			Configuration::updateValue('RECAPTCHA_BADGE', (int) Tools::getValue('RECAPTCHA_BADGE'));
			Configuration::updateValue('RECAPTCHA_ACCOUNT', (int) Tools::getValue('RECAPTCHA_ACCOUNT'));

			if(!$output)
				$this->_html .= $this->displayConfirmation($this->l('Settings updated'));
			else
				return $output;
		}
	}

	private function _displayInfos()
	{
		return $this->display(__FILE__, 'views/templates/admin/infos.tpl');
	}

	public function getContent()
	{
		$this->_html .=$this->_displayInfos();
		$this->_html .=$this->postProcess();
		$this->_html .= $this->renderForm();

		return $this->_html;
	}

	/**
	 * Viewing the Admin Configuration Form
	 */
	public function renderForm(){

		$fields_form = array(
			'form' => array(
				'legend' => array(
					'title' => $this->l('Invisible reCaptcha Configuration'),
					'icon' => 'icon-cogs'
				),
				'description' => $this->l('To get your own public and private keys please click on the folowing link').'<br /><a href="https://www.google.com/recaptcha/intro/index.html" target="_blank">https://www.google.com/recaptcha/intro/index.html</a>',
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
								'value'=> 1,
								'label'=> $this->l('Enabled'),
							),
							array(
								'id' => 'active_off',
								'value'=> 0,
								'label'=> $this->l('Disabled'),
							),
						),
					),
					array(
						'type' => 'switch',
						'label' => $this->l('Enable reCaptcha on registration page'),
						'name' => 'RECAPTCHA_ACCOUNT',
						'required' => true,
						'class' => 't',
						'is_bool' => true,
						'values' => array(
							array(
								'id' => 'active_on',
								'value'=> 1,
								'label'=> $this->l('Enabled'),
							),
							array(
								'id' => 'active_off',
								'value'=> 0,
								'label'=> $this->l('Disabled'),
							),
						),
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
		$helper->table =  $this->table;
		$lang = new Language((int)Configuration::get('PS_LANG_DEFAULT'));
		$helper->default_form_language = $lang->id;
		$helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') ? Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG') : 0;
		$this->fields_form = array();
		$helper->id = (int)Tools::getValue('id_carrier');
		$helper->identifier = $this->identifier;
		$helper->submit_action = 'SubmitCaptchaConfiguration';
		$helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false).'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
		$helper->token = Tools::getAdminTokenLite('AdminModules');
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
			'RECAPTCHA_ACCOUNT' => Tools::getValue('RECAPTCHA_ACCOUNT', Configuration::get('RECAPTCHA_ACCOUNT')),
		);
	}

	/**
	 * Hook Header for the contact form
	 */
	public function hookDisplayHeader($params)
	{
		// Display on the contact form
		if ($this->context->controller instanceof ContactController ||
            $this->context->controller instanceof ContactOfferController ||
            $this->context->controller instanceof ContactInformationController ||
            $this->context->controller instanceof CategoryController ||
            $this->context->controller instanceof PageNotFoundController ||
            $this->context->controller instanceof RegistrationControllerCore ||
            $this->context->controller instanceof SearchController){

			$this->context->controller->registerJavascript(
				'recaptcha',
				'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl='.$this->context->language->language_code,
				[
					'attributes' => 'async',
					'server' =>  'remote'
				]
			);
			$this->context->controller->registerJavascript(
				'settings-recaptcha',
				'modules/'.$this->name.'/js/settings.js',
				[
					'attributes' => 'async'
				]
				);

			Media::addJsDef(array('recaptchaKey' => Configuration::get('RECAPTCHA_PUBLIC_KEY')));
			return $this->displayCaptchaContactForm();

		}elseif($this->context->controller instanceof AuthController){

			if(Configuration::get('RECAPTCHA_ACCOUNT') == 1){

				$this->context->controller->registerJavascript(
					'recaptcha',
					'https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl='.$this->context->language->language_code,
					[
						'attributes' => 'async',
						'server' =>  'remote'
					]
				);

				$this->context->controller->registerJavascript(
					'settings-recaptcha',
					'modules/'.$this->name.'/js/settings-account.js',
					[
						'attributes' => 'async'
					]
				);
				Media::addJsDef(array('recaptchaKey' => Configuration::get('RECAPTCHA_PUBLIC_KEY')));
				return $this->displayCaptchaContactForm();

			}

		}

	}

	/**
	 * reCaptcha display on the contact form page
	 */
	private function displayCaptchaContactForm()
	{
		$includes = '';

		if(Tools::getValue('RECAPTCHA_BADGE', Configuration::get('RECAPTCHA_BADGE')) == 0){
			$includes = '<style>
						.grecaptcha-badge {
  							display: none;
						}
					</style>';
		}

		return $includes;
	}

	public function hookActionSubmitAccountBefore(){

		if(Configuration::get('RECAPTCHA_ACCOUNT') == 1){
			$data = array(
				'secret' => Tools::getValue('RECAPTCHA_PRIVATE_KEY', Configuration::get('RECAPTCHA_PRIVATE_KEY')),
				'response' => $_POST['g-recaptcha-response']
			);
			$verify = curl_init();
			if(isset($verify) && $verify){
				curl_setopt($verify, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
				curl_setopt($verify, CURLOPT_POST, true);
				curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
				curl_setopt($verify, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
				$response = @curl_exec($verify);
				curl_close($verify);
				$decode = json_decode($response, true);

				if (!$decode['success'] == true) {
					$this->context->controller->errors[] = $this->trans('Formulaire invalide.', array(), 'Modules.Contactform.Shop');
					return false;
				}else{
					return true;
				}

			}else{
				$this->context->controller->errors[] = $this->trans('Erreur de traitement.', array(), 'Modules.Contactform.Shop');
				return false;
			}
		}
		return true;
	}

	public function hookactionBeforeSubmitAccount(){
		return $this->hookActionSubmitAccountBefore();
	}
}
