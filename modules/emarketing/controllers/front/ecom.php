<?php
/**
 * NOTICE OF LICENSE
 *
 * This file is licenced under the GNU General Public License, version 3 (GPL-3.0).
 * With the purchase or the installation of the software in your application
 * you accept the licence agreement.
 *
 * @author    emarketing www.emarketing.com <integrations@emarketing.com>
 * @copyright 2019 easymarketing AG
 * @license   https://opensource.org/licenses/GPL-3.0 GNU General Public License version 3
 */

require_once(dirname(__FILE__) . '/../../vendor/autoload.php');

/**
 * Class EmarketingEcomModuleFrontController
 */
class EmarketingEcomModuleFrontController extends ModuleFrontController
{
    /**
     * @var \Emarketing\Service\Gateway
     */
    private $gateway;

    /**
     * EmarketingEcomModuleFrontController constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->gateway = new \Emarketing\Service\Gateway;
    }

    /**
     * @return bool
     */
    public function display()
    {
        return true;
    }

    /**
     * @throws Exception
     */
    public function initContent()
    {
        \Tools::redirect($this->gateway->getEcomUrl());
    }
}
