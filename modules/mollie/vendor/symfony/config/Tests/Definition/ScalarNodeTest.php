<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Config\Tests\Definition;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ArrayNode;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode;
class ScalarNodeTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    /**
     * @dataProvider getValidValues
     */
    public function testNormalize($value)
    {
        $node = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode('test');
        $this->assertSame($value, $node->normalize($value));
    }
    public function getValidValues()
    {
        return [[\false], [\true], [null], [''], ['foo'], [0], [1], [0.0], [0.1]];
    }
    public function testSetDeprecated()
    {
        $childNode = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode('foo');
        $childNode->setDeprecated('"%node%" is deprecated');
        $this->assertTrue($childNode->isDeprecated());
        $this->assertSame('"foo" is deprecated', $childNode->getDeprecationMessage($childNode->getName(), $childNode->getPath()));
        $node = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ArrayNode('root');
        $node->addChild($childNode);
        $deprecationTriggered = 0;
        $deprecationHandler = function ($level, $message, $file, $line) use(&$prevErrorHandler, &$deprecationTriggered) {
            if (\E_USER_DEPRECATED === $level) {
                return ++$deprecationTriggered;
            }
            return $prevErrorHandler ? $prevErrorHandler($level, $message, $file, $line) : \false;
        };
        $prevErrorHandler = \set_error_handler($deprecationHandler);
        $node->finalize([]);
        \restore_error_handler();
        $this->assertSame(0, $deprecationTriggered, '->finalize() should not trigger if the deprecated node is not set');
        $prevErrorHandler = \set_error_handler($deprecationHandler);
        $node->finalize(['foo' => '']);
        \restore_error_handler();
        $this->assertSame(1, $deprecationTriggered, '->finalize() should trigger if the deprecated node is set');
    }
    /**
     * @dataProvider getInvalidValues
     */
    public function testNormalizeThrowsExceptionOnInvalidValues($value)
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidTypeException');
        $node = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode('test');
        $node->normalize($value);
    }
    public function getInvalidValues()
    {
        return [[[]], [['foo' => 'bar']], [new \stdClass()]];
    }
    public function testNormalizeThrowsExceptionWithoutHint()
    {
        $node = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode('test');
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidTypeException');
        $this->expectExceptionMessage('Invalid type for path "test". Expected scalar, but got array.');
        $node->normalize([]);
    }
    public function testNormalizeThrowsExceptionWithErrorMessage()
    {
        $node = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode('test');
        $node->setInfo('"the test value"');
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidTypeException');
        $this->expectExceptionMessage("Invalid type for path \"test\". Expected scalar, but got array.\nHint: \"the test value\"");
        $node->normalize([]);
    }
    /**
     * @dataProvider getValidNonEmptyValues
     *
     * @param mixed $value
     */
    public function testValidNonEmptyValues($value)
    {
        $node = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode('test');
        $node->setAllowEmptyValue(\false);
        $this->assertSame($value, $node->finalize($value));
    }
    public function getValidNonEmptyValues()
    {
        return [[\false], [\true], ['foo'], [0], [1], [0.0], [0.1]];
    }
    /**
     * @dataProvider getEmptyValues
     *
     * @param mixed $value
     */
    public function testNotAllowedEmptyValuesThrowException($value)
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\Config\\Definition\\Exception\\InvalidConfigurationException');
        $node = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Definition\ScalarNode('test');
        $node->setAllowEmptyValue(\false);
        $node->finalize($value);
    }
    public function getEmptyValues()
    {
        return [[null], ['']];
    }
}
