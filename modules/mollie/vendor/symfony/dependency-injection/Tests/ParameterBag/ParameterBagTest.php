<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\ParameterBag;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterCircularReferenceException;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterNotFoundException;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\RuntimeException;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag;
class ParameterBagTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    public function testConstructor()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag($parameters = ['foo' => 'foo', 'bar' => 'bar']);
        $this->assertEquals($parameters, $bag->all(), '__construct() takes an array of parameters as its first argument');
    }
    public function testClear()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag($parameters = ['foo' => 'foo', 'bar' => 'bar']);
        $bag->clear();
        $this->assertEquals([], $bag->all(), '->clear() removes all parameters');
    }
    public function testRemove()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'foo', 'bar' => 'bar']);
        $bag->remove('foo');
        $this->assertEquals(['bar' => 'bar'], $bag->all(), '->remove() removes a parameter');
    }
    public function testGetSet()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'bar']);
        $bag->set('bar', 'foo');
        $this->assertEquals('foo', $bag->get('bar'), '->set() sets the value of a new parameter');
        $bag->set('foo', 'baz');
        $this->assertEquals('baz', $bag->get('foo'), '->set() overrides previously set parameter');
        try {
            $bag->get('baba');
            $this->fail('->get() throws an Symfony\\Component\\DependencyInjection\\Exception\\ParameterNotFoundException if the key does not exist');
        } catch (\Exception $e) {
            $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\ParameterNotFoundException', $e, '->get() throws an Symfony\\Component\\DependencyInjection\\Exception\\ParameterNotFoundException if the key does not exist');
            $this->assertEquals('You have requested a non-existent parameter "baba".', $e->getMessage(), '->get() throws an Symfony\\Component\\DependencyInjection\\Exception\\ParameterNotFoundException if the key does not exist');
        }
    }
    /**
     * @dataProvider provideGetThrowParameterNotFoundExceptionData
     */
    public function testGetThrowParameterNotFoundException($parameterKey, $exceptionMessage)
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'foo', 'bar' => 'bar', 'baz' => 'baz', 'fiz' => ['bar' => ['boo' => 12]]]);
        $this->expectException(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterNotFoundException::class);
        $this->expectExceptionMessage($exceptionMessage);
        $bag->get($parameterKey);
    }
    public function provideGetThrowParameterNotFoundExceptionData()
    {
        return [['foo1', 'You have requested a non-existent parameter "foo1". Did you mean this: "foo"?'], ['bag', 'You have requested a non-existent parameter "bag". Did you mean one of these: "bar", "baz"?'], ['', 'You have requested a non-existent parameter "".'], ['fiz.bar.boo', 'You have requested a non-existent parameter "fiz.bar.boo". You cannot access nested array items, do you want to inject "fiz" instead?']];
    }
    public function testHas()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'bar']);
        $this->assertTrue($bag->has('foo'), '->has() returns true if a parameter is defined');
        $this->assertFalse($bag->has('bar'), '->has() returns false if a parameter is not defined');
    }
    /**
     * @group legacy
     * @expectedDeprecation Parameter names will be made case sensitive in Symfony 4.0. Using "BAR" instead of "bar" is deprecated since Symfony 3.4.
     * @expectedDeprecation Parameter names will be made case sensitive in Symfony 4.0. Using "Foo" instead of "foo" is deprecated since Symfony 3.4.
     * @expectedDeprecation Parameter names will be made case sensitive in Symfony 4.0. Using "FOO" instead of "foo" is deprecated since Symfony 3.4.
     * @expectedDeprecation Parameter names will be made case sensitive in Symfony 4.0. Using "Foo" instead of "foo" is deprecated since Symfony 3.4.
     */
    public function testMixedCase()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'foo', 'bar' => 'bar']);
        $bag->remove('BAR');
        $this->assertEquals(['foo' => 'foo'], $bag->all(), '->remove() converts key to lowercase before removing');
        $bag->set('Foo', 'baz1');
        $this->assertEquals('baz1', $bag->get('foo'), '->set() converts the key to lowercase');
        $this->assertEquals('baz1', $bag->get('FOO'), '->get() converts the key to lowercase');
        $this->assertTrue($bag->has('Foo'), '->has() converts the key to lowercase');
    }
    public function testResolveValue()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag([]);
        $this->assertEquals('foo', $bag->resolveValue('foo'), '->resolveValue() returns its argument unmodified if no placeholders are found');
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'bar']);
        $this->assertEquals('I\'m a bar', $bag->resolveValue('I\'m a %foo%'), '->resolveValue() replaces placeholders by their values');
        $this->assertEquals(['bar' => 'bar'], $bag->resolveValue(['%foo%' => '%foo%']), '->resolveValue() replaces placeholders in keys and values of arrays');
        $this->assertEquals(['bar' => ['bar' => ['bar' => 'bar']]], $bag->resolveValue(['%foo%' => ['%foo%' => ['%foo%' => '%foo%']]]), '->resolveValue() replaces placeholders in nested arrays');
        $this->assertEquals('I\'m a %%foo%%', $bag->resolveValue('I\'m a %%foo%%'), '->resolveValue() supports % escaping by doubling it');
        $this->assertEquals('I\'m a bar %%foo bar', $bag->resolveValue('I\'m a %foo% %%foo %foo%'), '->resolveValue() supports % escaping by doubling it');
        $this->assertEquals(['foo' => ['bar' => ['ding' => 'I\'m a bar %%foo %%bar']]], $bag->resolveValue(['foo' => ['bar' => ['ding' => 'I\'m a bar %%foo %%bar']]]), '->resolveValue() supports % escaping by doubling it');
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => \true]);
        $this->assertTrue($bag->resolveValue('%foo%'), '->resolveValue() replaces arguments that are just a placeholder by their value without casting them to strings');
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => null]);
        $this->assertNull($bag->resolveValue('%foo%'), '->resolveValue() replaces arguments that are just a placeholder by their value without casting them to strings');
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'bar', 'baz' => '%%%foo% %foo%%% %%foo%% %%%foo%%%']);
        $this->assertEquals('%%bar bar%% %%foo%% %%bar%%', $bag->resolveValue('%baz%'), '->resolveValue() replaces params placed besides escaped %');
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['baz' => '%%s?%%s']);
        $this->assertEquals('%%s?%%s', $bag->resolveValue('%baz%'), '->resolveValue() is not replacing greedily');
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag([]);
        try {
            $bag->resolveValue('%foobar%');
            $this->fail('->resolveValue() throws an InvalidArgumentException if a placeholder references a non-existent parameter');
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterNotFoundException $e) {
            $this->assertEquals('You have requested a non-existent parameter "foobar".', $e->getMessage(), '->resolveValue() throws a ParameterNotFoundException if a placeholder references a non-existent parameter');
        }
        try {
            $bag->resolveValue('foo %foobar% bar');
            $this->fail('->resolveValue() throws a ParameterNotFoundException if a placeholder references a non-existent parameter');
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterNotFoundException $e) {
            $this->assertEquals('You have requested a non-existent parameter "foobar".', $e->getMessage(), '->resolveValue() throws a ParameterNotFoundException if a placeholder references a non-existent parameter');
        }
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'a %bar%', 'bar' => []]);
        try {
            $bag->resolveValue('%foo%');
            $this->fail('->resolveValue() throws a RuntimeException when a parameter embeds another non-string parameter');
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\RuntimeException $e) {
            $this->assertEquals('A string value must be composed of strings and/or numbers, but found parameter "bar" of type "array" inside string value "a %bar%".', $e->getMessage(), '->resolveValue() throws a RuntimeException when a parameter embeds another non-string parameter');
        }
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => '%bar%', 'bar' => '%foobar%', 'foobar' => '%foo%']);
        try {
            $bag->resolveValue('%foo%');
            $this->fail('->resolveValue() throws a ParameterCircularReferenceException when a parameter has a circular reference');
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterCircularReferenceException $e) {
            $this->assertEquals('Circular reference detected for parameter "foo" ("foo" > "bar" > "foobar" > "foo").', $e->getMessage(), '->resolveValue() throws a ParameterCircularReferenceException when a parameter has a circular reference');
        }
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'a %bar%', 'bar' => 'a %foobar%', 'foobar' => 'a %foo%']);
        try {
            $bag->resolveValue('%foo%');
            $this->fail('->resolveValue() throws a ParameterCircularReferenceException when a parameter has a circular reference');
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterCircularReferenceException $e) {
            $this->assertEquals('Circular reference detected for parameter "foo" ("foo" > "bar" > "foobar" > "foo").', $e->getMessage(), '->resolveValue() throws a ParameterCircularReferenceException when a parameter has a circular reference');
        }
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['host' => 'foo.bar', 'port' => 1337]);
        $this->assertEquals('foo.bar:1337', $bag->resolveValue('%host%:%port%'));
    }
    public function testResolveIndicatesWhyAParameterIsNeeded()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => '%bar%']);
        try {
            $bag->resolve();
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterNotFoundException $e) {
            $this->assertEquals('The parameter "foo" has a dependency on a non-existent parameter "bar".', $e->getMessage());
        }
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => '%bar%']);
        try {
            $bag->resolve();
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterNotFoundException $e) {
            $this->assertEquals('The parameter "foo" has a dependency on a non-existent parameter "bar".', $e->getMessage());
        }
    }
    public function testResolveUnescapesValue()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => ['bar' => ['ding' => 'I\'m a bar %%foo %%bar']], 'bar' => 'I\'m a %%foo%%']);
        $bag->resolve();
        $this->assertEquals('I\'m a %foo%', $bag->get('bar'), '->resolveValue() supports % escaping by doubling it');
        $this->assertEquals(['bar' => ['ding' => 'I\'m a bar %foo %bar']], $bag->get('foo'), '->resolveValue() supports % escaping by doubling it');
    }
    public function testEscapeValue()
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag();
        $bag->add(['foo' => $bag->escapeValue(['bar' => ['ding' => 'I\'m a bar %foo %bar', 'zero' => null]]), 'bar' => $bag->escapeValue('I\'m a %foo%')]);
        $this->assertEquals('I\'m a %%foo%%', $bag->get('bar'), '->escapeValue() escapes % by doubling it');
        $this->assertEquals(['bar' => ['ding' => 'I\'m a bar %%foo %%bar', 'zero' => null]], $bag->get('foo'), '->escapeValue() escapes % by doubling it');
    }
    /**
     * @dataProvider stringsWithSpacesProvider
     */
    public function testResolveStringWithSpacesReturnsString($expected, $test, $description)
    {
        $bag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\ParameterBag(['foo' => 'bar']);
        try {
            $this->assertEquals($expected, $bag->resolveString($test), $description);
        } catch (\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\ParameterNotFoundException $e) {
            $this->fail(\sprintf('%s - "%s"', $description, $expected));
        }
    }
    public function stringsWithSpacesProvider()
    {
        return [['bar', '%foo%', 'Parameters must be wrapped by %.'], ['% foo %', '% foo %', 'Parameters should not have spaces.'], ['{% set my_template = "foo" %}', '{% set my_template = "foo" %}', 'Twig-like strings are not parameters.'], ['50% is less than 100%', '50% is less than 100%', 'Text between % signs is allowed, if there are spaces.']];
    }
}
