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
class ObjectModel extends ObjectModelCore
{
    /*
    * module: advancedvatmanager
    * date: 2024-07-10 13:39:04
    * version: 1.7.0
    */
    public function cacheFieldsRequiredDatabase($all = true)
    {
        if (Module::isEnabled('advancedvatmanager') && (Configuration::get('ADVANCEDVATMANAGER_ADMINVALIDATION')== 1 && Context::getContext()->controller instanceof AdmintController) || (Configuration::get('ADVANCEDVATMANAGER_FRONTVALIDATION')== 1 && Context::getContext()->controller instanceof FrontController)) {
            if (Configuration::get('ADVANCEDVATMANAGER_VATFIELD') == 'optional') {
                $this->clearCache(true);
                if (!is_array(self::$fieldsRequiredDatabase)) {
                    $fields = $this->getFieldsRequiredDatabase((bool) $all);
                    if ($fields) {
                        foreach ($fields as $row) {
                            if ($row['field_name'] != 'vat_number') {
                                self::$fieldsRequiredDatabase[$row['object_name']][(int) $row['id_required_field']] = pSQL($row['field_name']);       
                            }
                        }
                    } 
                    else {
                        self::$fieldsRequiredDatabase = [];
                    }
                }
            }
            else {
                return parent::cacheFieldsRequiredDatabase($all);
            }
        }
        else {
            return parent::cacheFieldsRequiredDatabase($all);    
        }
    }
 }