<?php
/**
 *    This file is part of eMagicOne Store Manager Bridge Connector.
 *
 *   eMagicOne Store Manager Bridge Connector is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   eMagicOne Store Manager Bridge Connector is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with eMagicOne Store Manager Bridge Connector. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author    eMagicOne <contact@emagicone.com>
 * @copyright 2014-2019 eMagicOne
 * @license   http://www.gnu.org/licenses   GNU General Public License
 */

class BridgeconnectorBridgeModuleFrontController extends ModuleFrontController
{
    private $shop_cart_overrider;

    public function __construct()
    {
        require_once _PS_MODULE_DIR_.'/'.EM1Constants::MODULE_NAME.'/classes/helper/EM1Constants.php';
        require_once _PS_MODULE_DIR_.'/'.EM1Constants::MODULE_NAME.'/classes/bridge/BridgeConnectorCore.php';
        require_once _PS_MODULE_DIR_.'/'.EM1Constants::MODULE_NAME.'/classes/bridge/BridgeConnectorCommon.php';
        require_once _PS_MODULE_DIR_.'/'.EM1Constants::MODULE_NAME.'/classes/PrestaShopOverrider.php';

        $this->shop_cart_overrider = new PrestaShopOverrider(
            EM1Constants::MODULE_NAME,
            EM1Constants::OPTIONS_KEY
        );

        new BridgeConnectorCommon(
            $this->shop_cart_overrider,
            EM1Constants::MODULE_VERSION,
            EM1Constants::BC_MODULE_REVISION
        );
    }
}
