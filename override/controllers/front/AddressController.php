<?php
/**
 * 2007-2016 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2016 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
class AddressController extends AddressControllerCore
{
    /*
    * module: advancedvatmanager
    * date: 2023-10-02 07:45:24
    * version: 1.6.2.2
    */
    public function processSubmitAddress()
    {
        if (Module::isEnabled('advancedvatmanager') && Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')) {
            if (version_compare(_PS_VERSION_, '1.7.0.0', '<')) {
                $module = new ValidationEngine(Tools::getValue('vat_number'));
                $module->VATValidationProcess(Tools::getValue('id_country'), $this->context->customer->id, Tools::getValue('id_address'), Tools::getValue('company'));
                if (ValidationEngine::$skip_validation_process === false) {
                    if (Configuration::get('ADVANCEDVATMANAGER_COMPANY_VALIDATION') == 1 && ValidationEngine::getVATValidation() && ValidationEngine::$company_valid == 0) {
                        return $this->context->controller->errors[] = $module->getMessage(); 
                    }
                    else if (!ValidationEngine::getVATValidation() && ValidationEngine::$skip_validation_process === false) {
                        return $this->context->controller->errors[] = $module->getMessage();      
                    }
                }
            }
        }
        return parent::processSubmitAddress();
    }
}
