<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\Config\Tests\Definition\Builder;

use MolliePrefix\PHPUnit\Framework\TestCase;
use MolliePrefix\Symfony\Component\Config\Definition\Builder\FloatNodeDefinition;
use MolliePrefix\Symfony\Component\Config\Definition\Builder\IntegerNodeDefinition;
class NumericNodeDefinitionTest extends \MolliePrefix\PHPUnit\Framework\TestCase
{
    public function testIncoherentMinAssertion()
    {
        $this->expectException('InvalidArgumentException');
        $this->expectExceptionMessage('You cannot define a min(4) as you already have a max(3)');
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\IntegerNodeDefinition('foo');
        $def->max(3)->min(4);
    }
    public function testIncoherentMaxAssertion()
    {
        $this->expectException('InvalidArgumentException');
        $this->expectExceptionMessage('You cannot define a max(2) as you already have a min(3)');
        $node = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\IntegerNodeDefinition('foo');
        $node->min(3)->max(2);
    }
    public function testIntegerMinAssertion()
    {
        $this->expectException('MolliePrefix\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidConfigurationException');
        $this->expectExceptionMessage('The value 4 is too small for path "foo". Should be greater than or equal to 5');
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\IntegerNodeDefinition('foo');
        $def->min(5)->getNode()->finalize(4);
    }
    public function testIntegerMaxAssertion()
    {
        $this->expectException('MolliePrefix\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidConfigurationException');
        $this->expectExceptionMessage('The value 4 is too big for path "foo". Should be less than or equal to 3');
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\IntegerNodeDefinition('foo');
        $def->max(3)->getNode()->finalize(4);
    }
    public function testIntegerValidMinMaxAssertion()
    {
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\IntegerNodeDefinition('foo');
        $node = $def->min(3)->max(7)->getNode();
        $this->assertEquals(4, $node->finalize(4));
    }
    public function testFloatMinAssertion()
    {
        $this->expectException('MolliePrefix\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidConfigurationException');
        $this->expectExceptionMessage('The value 400 is too small for path "foo". Should be greater than or equal to 500');
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\FloatNodeDefinition('foo');
        $def->min(500.0)->getNode()->finalize(400.0);
    }
    public function testFloatMaxAssertion()
    {
        $this->expectException('MolliePrefix\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidConfigurationException');
        $this->expectExceptionMessage('The value 4.3 is too big for path "foo". Should be less than or equal to 0.3');
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\FloatNodeDefinition('foo');
        $def->max(0.3)->getNode()->finalize(4.3);
    }
    public function testFloatValidMinMaxAssertion()
    {
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\FloatNodeDefinition('foo');
        $node = $def->min(3.0)->max(700.0)->getNode();
        $this->assertEquals(4.5, $node->finalize(4.5));
    }
    public function testCannotBeEmptyThrowsAnException()
    {
        $this->expectException('MolliePrefix\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidDefinitionException');
        $this->expectExceptionMessage('->cannotBeEmpty() is not applicable to NumericNodeDefinition.');
        $def = new \MolliePrefix\Symfony\Component\Config\Definition\Builder\IntegerNodeDefinition('foo');
        $def->cannotBeEmpty();
    }
}
