<?php
/**
 * 2017-2022 liewebs - Prestashop module developers and website designers.
 *
 * NOTICE OF LICENSE
 *  @author    liewebs <info@liewebs.com>
 *  @copyright 2017-2022 www.liewebs.com - Liewebs
 *  @license see file:license_es.html and license_en.html
 * 	@module Advanced VAT Manager
 */
 
class AdminSettingsController extends ModuleAdminController
{
    /**
     * AdminSettingsController::__construct()
     * 
     * @return
     */
    public function __construct()
    {
        parent::__construct();
    }
    
    /**
     * AdminSettingsController::initContent()
     * 
     * @return
     */
    public function initContent()
    {
        Tools::redirectAdmin($this->context->link->getAdminLink('AdminModules', false) . '&configure=advancedvatmanager&tab_module=others&module_name=advancedvatmanager&token=' . Tools::getAdminTokenLite('AdminModules'));
        parent::initContent();
    }
}