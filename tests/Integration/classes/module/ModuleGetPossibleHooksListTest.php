<?php
/*
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
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2016 PrestaShop SA
*  @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

namespace PrestaShop\PrestaShop\Tests\Integration;

use PrestaShop\PrestaShop\Tests\TestCase\IntegrationTestCase;
use Module;
use Cache;
use PrestaShopAutoload;

class ModuleGetPossibleHooksListTest extends IntegrationTestCase
{
    /**
     * Test if a module return the good possible hooks list.
     * This test is done on the bankwire generic module.
     */
    public function testGetRightListForModule()
    {
        $module = Module::getInstanceByName('bankwire');
        Cache::clean('hook_alias');
        $possible_hooks_list = $module->getPossibleHooksList();

        $this->assertCount(3, $possible_hooks_list);

        $this->assertEquals('displayPayment', $possible_hooks_list[0]['name']);
        $this->assertEquals('displayPaymentEU', $possible_hooks_list[1]['name']);
        $this->assertEquals('displayPaymentReturn', $possible_hooks_list[2]['name']);
    }
}
