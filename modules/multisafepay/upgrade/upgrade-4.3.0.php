<?php
/**
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is provided with Prestashop in the file LICENSES.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade the MultiSafepay plugin
 * to newer versions in the future. If you wish to customize the plugin for your
 * needs please document your changes and make backups before your update.
 *
 * @category    MultiSafepay
 * @package     Connect
 * @author      Tech Support <techsupport@multisafepay.com>
 * @copyright   Copyright (c) 2019 MultiSafepay, Inc. (http://www.multisafepay.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

if (!defined('_PS_VERSION_')) {
    exit;
}

/**
 * @param $module
 * @return bool
 */
function upgrade_module_4_3_0($module)
{
    // Convert use of id_carrier to id_reference when upgrading plugin
    $carriers = Carrier::getCarriers((int)Context::getContext()->language->id, false, false, false, null, Carrier::ALL_CARRIERS);
    foreach ($carriers as $carrier) {
        foreach ($module->gateways as $gateway) {
            if (Configuration::get('MULTISAFEPAY_GATEWAY_' . $gateway['code'] . '_CARRIER_' . $carrier['id_carrier']) === 'on') {
                Configuration::updateValue('MULTISAFEPAY_GATEWAY_' . $gateway['code'] . '_CARRIER_' . $carrier['id_reference'], 'on');
            }
        }
    }
    return true;
}
