<?php
/**
 * 2007-2017 PrestaShop
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShopBundle\Tests\Localization\Specification;

use PHPUnit\Framework\TestCase;
use PrestaShopBundle\Localization\Exception\InvalidArgumentException;
use PrestaShopBundle\Localization\Specification\Number as NumberSpecification;
use PrestaShopBundle\Localization\Specification\NumberSymbolList;

class NumberTest extends TestCase
{
    /**
     * @var NumberSpecification
     */
    protected $numberSpec;

    protected function setUp()
    {
        $this->numberSpec = new NumberSpecification();
    }

    /**
     * Given a valid Number specification
     * When adding several symbols lists
     * Then calling getAllSymbols() should return an array of available symbols lists, indexed by numbering system
     *
     * (also tests addSymbols() at the same time)
     */
    public function testGetAllSymbols()
    {
        $latinList          = $this->createMock(NumberSymbolList::class);
        $latinList->decimal = ',';
        $arabList           = $this->createMock(NumberSymbolList::class);
        $arabList->decimal  = '.';

        $this->numberSpec->addSymbols('latin', $latinList);
        $this->numberSpec->addSymbols('arab', $arabList);

        $this->assertSame(
            [
                'latin' => $latinList,
                'arab'  => $arabList,
            ],
            $this->numberSpec->getAllSymbols()
        );
    }

    /**
     * Given a valid Number specification
     * When adding to it a new symbols list (under a new numbering system)
     * Then this symbols list should be retrievable afterwards, under the said numbering system
     *
     * (also tests addSymbols() at the same time)
     */
    public function testGetSymbolsByNumberingSystem()
    {
        $symbolList = $this->createMock(NumberSymbolList::class);
        $this->numberSpec->addSymbols('latin', $symbolList);

        $this->assertSame($symbolList, $this->numberSpec->getSymbolsByNumberingSystem('latin'));
    }

    /**
     * @expectedException InvalidArgumentException
     */
    public function testGetSymbolsByNumberingSystemWithInvalidParameter()
    {
        $symbolList = $this->createMock(NumberSymbolList::class);
        $this->numberSpec->addSymbols('latin', $symbolList);

        // Should throw an exception because 'bar' numbering system is unknown
        $this->numberSpec->getSymbolsByNumberingSystem('arab');
    }

    /**
     * Given a valid Number specification having several symbol lists
     * When trying to hydrate one of its symbols list
     * Then this (and only this) symbols list should be hydrated with passed data
     */
    public function testHydrateSymbols()
    {
        // Default list. Will be used to hydrate one of the incomplete lists
        $defaultDataList          = $this->createMock(NumberSymbolList::class);
        $defaultDataList->decimal = ',';

        // Init two incomplete symbols lists (latin and arab)
        $incompleteLatinList = $this->createMock(NumberSymbolList::class);
        $incompleteLatinList
            ->expects($this->once())
            ->method('hydrate')
            ->with($defaultDataList);
        $this->numberSpec->addSymbols('latin', $incompleteLatinList);

        $incompleteArabList = $this->createMock(NumberSymbolList::class);
        $incompleteArabList
            ->expects($this->never())
            ->method('hydrate');
        $this->numberSpec->addSymbols('arab', $incompleteArabList);

        // Hydrate only one of them with default list
        $this->numberSpec->hydrateSymbols('latin', $defaultDataList);
    }

    /**
     * Given a valid Number specification
     * When trying to hydrate an unknown symbols list (unknown numbering system)
     * Then this unknown symbols list should be created with passed numbering system and hydration data
     */
    public function testHydrateSymbolsOnNewNumberingSystem()
    {
        $defaultDataList = $this->createMock(NumberSymbolList::class);
        $this->numberSpec->hydrateSymbols('latin', $defaultDataList);

        $this->assertSame(
            $defaultDataList,
            $this->numberSpec->getSymbolsByNumberingSystem('latin')
        );
    }
}
