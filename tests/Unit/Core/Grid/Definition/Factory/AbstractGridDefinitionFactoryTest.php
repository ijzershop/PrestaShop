<?php
/**
 * 2007-2018 PrestaShop
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
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace Tests\Unit\Core\Grid\Definition\Factory;

use PHPUnit\Framework\TestCase;
use PrestaShop\PrestaShop\Core\Grid\Action\BulkActionCollectionInterface;
use PrestaShop\PrestaShop\Core\Grid\Action\GridActionCollectionInterface;
use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\SimpleColumn;
use PrestaShop\PrestaShop\Core\Grid\Definition\DefinitionInterface;
use PrestaShop\PrestaShop\Core\Grid\Definition\Factory\AbstractGridDefinitionFactory;

class AbstractGridDefinitionFactoryTest extends TestCase
{
    /**
     * @var AbstractGridDefinitionFactory
     */
    private $definitionFactory;

    public function setUp()
    {
        $definitionFactory = $this->getMockForAbstractClass(AbstractGridDefinitionFactory::class);
        $definitionFactory->expects($this->once())
            ->method('getName')
            ->willReturn('Test name');
        $definitionFactory->expects($this->once())
            ->method('getId')
            ->willReturn('test_id')
        ;
        $definitionFactory->expects($this->once())
            ->method('getColumns')
            ->willReturn($this->getColumns())
        ;

        $this->definitionFactory = $definitionFactory;
    }

    public function testItCreatesDefinition()
    {
        $definition = $this->definitionFactory->create();

        $this->assertInstanceOf(DefinitionInterface::class, $definition);
        $this->assertInstanceOf(BulkActionCollectionInterface::class, $definition->getBulkActions());
        $this->assertInstanceOf(GridActionCollectionInterface::class, $definition->getGridActions());

        $this->assertEquals($definition->getId(), 'test_id');
        $this->assertEquals($definition->getName(), 'Test name');
        $this->assertCount(3, $definition->getColumns());
        $this->assertCount(0, $definition->getGridActions());
        $this->assertCount(0, $definition->getBulkActions());
    }

    private function getColumns()
    {
        return (new ColumnCollection())
            ->add(new SimpleColumn('test_1'))
            ->add(new SimpleColumn('test_2'))
            ->add(new SimpleColumn('test_3'))
        ;
    }
}
