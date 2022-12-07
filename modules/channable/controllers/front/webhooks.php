<?php
/**
* 2007-2016 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
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
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2016 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

class ChannableWebhooksModuleFrontController extends ModuleFrontController
{

    public function postProcess()
    {

        if (!Tools::getValue('key')) {
            die('Not authenticated');
        }
        if (!WebserviceKey::keyExists(Tools::getValue('key')) || !WebserviceKey::isKeyActive(Tools::getValue('key'))) {
            die('Not authenticated');
        }

        $postData = Channable::fetchPhpInput();
        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            $jsonData = ChannableWebhook::getAllWebhooks();
        } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            if (!Tools::getValue('id')) {
                die('ID not submitted');
            }
            $webhook = new ChannableWebhook((int)Tools::getValue('id'));
            $webhook->delete();
            $jsonData = array('status' => 'OK');
        } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $postData = json_decode($postData);
            if ($postData != null) {
                $webhook = ChannableWebhook::getExistingOrNewWebhook((string)$postData->address);
                $webhook->action = (string)$postData->action;
                $webhook->active = (string)$postData->active;
                $webhook->save();
                $jsonData = array('status' => 'OK');
            }
        }

        if (isset($jsonData)) {
            header('Content-Type: application/json');
            echo json_encode($jsonData);
        }
        die();
    }
}
