<?php
/**
 * 2007-2019 PrestaShop SA and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2019 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace Tests\Unit\Core\Domain\Employee\ValueObject;

use PHPUnit\Framework\TestCase;
use PrestaShop\PrestaShop\Core\Domain\Employee\Exception\InvalidEmployeeIdException;
use PrestaShop\PrestaShop\Core\Domain\Employee\ValueObject\EmployeeId;

class EmployeeIdTest extends TestCase
{
    public function testItCreatesEmployeeWithValidValues()
    {
        $employeeId = new EmployeeId(1);

        $this->assertEquals(1, $employeeId->getValue());
    }

    /**
     * @dataProvider testItExceptionThrownWithInvalidValuesData
     ** */
    public function testItExceptionThrownWithInvalidValues($employeId)
    {
        $this->expectException(InvalidEmployeeIdException::class);
        new EmployeeId($employeId);
    }

    public function testItExceptionThrownWithInvalidValuesData()
    {
        return [
            'stringy -1' => ['-1'],
            'stringy 1.1' => ['1.1'],
            'stringy a' => ['a'],
            'stringy +' => ['+'],
        ];
    }
}
