<?php
/**
 * 2017-2024 liewebs - prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2024 www.liewebs.com - Liewebs
 *  @license See "License registration" section
 * 	@module Advanced VAT Manager
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

class OrderController extends OrderControllerCore
{
    public function postProcess()
    {
        parent::postProcess();
        if (Module::isEnabled('advancedvatmanager')) {
            if (Module::isEnabled('advancedantispamsystem') && Configuration::get('ADVANCEDANTISPAMSYSTEM_ENABLED') == 1) {
                if (Tools::isSubmit('submitCreate')) {
                    $advancedantispamsystem = Module::getInstanceByName('advancedantispamsystem');
                    if ($advancedantispamsystem->displayReCAPTCHA('registration')) {
                        if (!$advancedantispamsystem->recaptchaServerVerification('submitAuthentication')) {
                            $advancedantispamsystem->insertLog($advancedantispamsystem->controller_error_msg['RECAPTCHA_VERIFICATION_CHECKOUT']);
                            unset($_POST['submitCreate']);
                        }
                    }  
                }
            }
            if (Tools::isSubmit('submitCreate') &&
                Module::isInstalled('recaptcha') &&
                Module::isEnabled('recaptcha') &&
                Configuration::get('CAPTCHA_ENABLE_ACCOUNT')
            ) {
                require_once _PS_ROOT_DIR_ . '/modules/recaptcha/recaptcha.php';
                $recaptcha = new Recaptcha();
                $recaptcha->validateCaptcha();
                if (!empty($this->errors)) {
                    unset($_POST['password']);
                }
            }
            if (Tools::isSubmit('submitCreate')
                && Module::isInstalled('eicaptcha')
                && Module::isEnabled('eicaptcha')
                && false === Module::getInstanceByName('eicaptcha')->hookActionContactFormSubmitCaptcha(array())
                && !empty($this->errors)
            ) {
                unset($_POST['submitCreate']);
            }
            if (Module::isEnabled('minpurchase')) {
                include_once(_PS_MODULE_DIR_.'minpurchase/minpurchase.php');
                $mod = new MinpurchaseConfiguration();
                $errors = array();
                if ($cart = Context::getContext()->cart) {
                    $errors = $mod->checkProductsAvailability($cart->getProducts());
                }
                if (!empty($errors)) {
                    foreach ($errors as $error) {
                        $this->errors[] = $error;
                    }
                }
    
                if (!empty($this->errors)) {
                    $id_lang = Context::getContext()->language->id;
                    $params = array('action' => 'show');
                    Tools::redirect($this->context->link->getPageLink('cart', true, (int)$id_lang, $params));
                }
            }
            if (Module::isEnabled('hideprice')) {
                include_once(_PS_MODULE_DIR_.'hideprice/hideprice.php');
                $mod = new HidepriceConfiguration();
                $errors = $mod->checkProductsAvailability($this->context->cart->getProducts());
    
                if (!empty($errors)) {
                    foreach ($errors as $error) {
                        $this->errors[] = $error;
                    }
                }
    
                if (!empty($this->errors)) {
                    $params = array('action' => 'show');
                    $this->canonicalRedirection($this->context->link->getPageLink('cart', true, (int)$this->context->language->id, $params));
                }
            }
            if (Module::isEnabled('onepagecheckoutps') && version_compare(Module::getInstanceByName('onepagecheckoutps')->version, '4.1.5', '>=')) {
                if (isset($this->is_active_module)?$this->is_active_module:$this->isModuleActived) {
                    $this->bootstrap();
                    $this->opc->postProcessControllerOPC($this);
                }
            }
            else {
                $advancedvatmanager = Module::getInstanceByName('advancedvatmanager');
                $checkNotAllowCheckout = $advancedvatmanager->checkNotAllowCheckout();
                if($checkNotAllowCheckout !== false) {
                    if (version_compare(_PS_VERSION_, '1.7.0.0', '>=')) {
                        if (version_compare(_PS_VERSION_, '1.7.8.0', '<')) {
                            $this->errors[] = $checkNotAllowCheckout;
                            // Remove checkout steps to avoid make an order from customer.
                            foreach ($this->checkoutProcess->getSteps() as $step) {
                                if (is_a($step, 'CheckoutAddressesStep')) {
                                    $step->setCurrent(true);
                                    break;
                                }
                            }
                            $this->checkoutProcess->invalidateAllStepsAfterCurrent();    
                        }                             
                    }
                    else {
                        if (!Tools::getValue('ajax') || !Tools::getIsset('add') || !Tools::getIsset('update')) {
                            $this->errors[] = $checkNotAllowCheckout;
                            $this->step = 0;
                            if (Tools::getIsset('step')) {
                                Tools::redirect('index.php?controller=order');    
                            }     
                        } 
                    }
                    
                }
            }
        }
    }
}