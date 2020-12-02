<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Loader;

use _PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Loader\LoaderResolver;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\FileResource;
use _PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\GlobResource;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Argument\IteratorArgument;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\ResolveBindingsPass;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Dumper\PhpDumper;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\IniFileLoader;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\YamlFileLoader;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Bar;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\BarInterface;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\CaseSensitiveClass;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\NamedArgumentsDummy;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Prototype;
use _PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Expression;
class XmlFileLoaderTest extends \_PhpScoper5eddef0da618a\PHPUnit\Framework\TestCase
{
    protected static $fixturesPath;
    public static function setUpBeforeClass()
    {
        self::$fixturesPath = \realpath(__DIR__ . '/../Fixtures/');
        require_once self::$fixturesPath . '/includes/foo.php';
        require_once self::$fixturesPath . '/includes/ProjectExtension.php';
        require_once self::$fixturesPath . '/includes/ProjectWithXsdExtension.php';
    }
    public function testLoad()
    {
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder(), new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/ini'));
        try {
            $loader->load('foo.xml');
            $this->fail('->load() throws an InvalidArgumentException if the loaded file does not exist');
        } catch (\Exception $e) {
            $this->assertInstanceOf('InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the loaded file does not exist');
            $this->assertStringStartsWith('The file "foo.xml" does not exist (in:', $e->getMessage(), '->load() throws an InvalidArgumentException if the loaded file does not exist');
        }
    }
    public function testParseFile()
    {
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder(), new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/ini'));
        $r = new \ReflectionObject($loader);
        $m = $r->getMethod('parseFileToDOM');
        $m->setAccessible(\true);
        try {
            $m->invoke($loader, self::$fixturesPath . '/ini/parameters.ini');
            $this->fail('->parseFileToDOM() throws an InvalidArgumentException if the loaded file is not a valid XML file');
        } catch (\Exception $e) {
            $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException', $e, '->parseFileToDOM() throws an InvalidArgumentException if the loaded file is not a valid XML file');
            $this->assertRegExp(\sprintf('#^Unable to parse file ".+%s": .+.$#', 'parameters.ini'), $e->getMessage(), '->parseFileToDOM() throws an InvalidArgumentException if the loaded file is not a valid XML file');
            $e = $e->getPrevious();
            $this->assertInstanceOf('InvalidArgumentException', $e, '->parseFileToDOM() throws an InvalidArgumentException if the loaded file is not a valid XML file');
            $this->assertStringStartsWith('[ERROR 4] Start tag expected, \'<\' not found (in', $e->getMessage(), '->parseFileToDOM() throws an InvalidArgumentException if the loaded file is not a valid XML file');
        }
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder(), new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        try {
            $m->invoke($loader, self::$fixturesPath . '/xml/nonvalid.xml');
            $this->fail('->parseFileToDOM() throws an InvalidArgumentException if the loaded file does not validate the XSD');
        } catch (\Exception $e) {
            $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException', $e, '->parseFileToDOM() throws an InvalidArgumentException if the loaded file does not validate the XSD');
            $this->assertRegExp(\sprintf('#^Unable to parse file ".+%s": .+.$#', 'nonvalid.xml'), $e->getMessage(), '->parseFileToDOM() throws an InvalidArgumentException if the loaded file is not a valid XML file');
            $e = $e->getPrevious();
            $this->assertInstanceOf('InvalidArgumentException', $e, '->parseFileToDOM() throws an InvalidArgumentException if the loaded file does not validate the XSD');
            $this->assertStringStartsWith('[ERROR 1845] Element \'nonvalid\': No matching global declaration available for the validation root. (in', $e->getMessage(), '->parseFileToDOM() throws an InvalidArgumentException if the loaded file does not validate the XSD');
        }
        $xml = $m->invoke($loader, self::$fixturesPath . '/xml/services1.xml');
        $this->assertInstanceOf('DOMDocument', $xml, '->parseFileToDOM() returns an SimpleXMLElement object');
    }
    public function testLoadWithExternalEntitiesDisabled()
    {
        $disableEntities = \libxml_disable_entity_loader(\true);
        $containerBuilder = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($containerBuilder, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services2.xml');
        \libxml_disable_entity_loader($disableEntities);
        $this->assertGreaterThan(0, $containerBuilder->getParameterBag()->all(), 'Parameters can be read from the config file.');
    }
    public function testLoadParameters()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services2.xml');
        $actual = $container->getParameterBag()->all();
        $expected = ['a string', 'foo' => 'bar', 'values' => [0, 'integer' => 4, 100 => null, 'true', \true, \false, 'on', 'off', 'float' => 1.3, 1000.3, 'a string', ['foo', 'bar']], 'mixedcase' => ['MixedCaseKey' => 'value'], 'constant' => \PHP_EOL];
        $this->assertEquals($expected, $actual, '->load() converts XML values to PHP ones');
    }
    public function testLoadImports()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $resolver = new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Loader\LoaderResolver([new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\IniFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/ini')), new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\YamlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/yml')), $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'))]);
        $loader->setResolver($resolver);
        $loader->load('services4.xml');
        $actual = $container->getParameterBag()->all();
        $expected = ['a string', 'foo' => 'bar', 'values' => [0, 'integer' => 4, 100 => null, 'true', \true, \false, 'on', 'off', 'float' => 1.3, 1000.3, 'a string', ['foo', 'bar']], 'mixedcase' => ['MixedCaseKey' => 'value'], 'constant' => \PHP_EOL, 'bar' => '%foo%', 'imported_from_ini' => \true, 'imported_from_yaml' => \true, 'with_wrong_ext' => 'from yaml'];
        $this->assertEquals(\array_keys($expected), \array_keys($actual), '->load() imports and merges imported files');
        $this->assertTrue($actual['imported_from_ini']);
        // Bad import throws no exception due to ignore_errors value.
        $loader->load('services4_bad_import.xml');
    }
    public function testLoadAnonymousServices()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services5.xml');
        $services = $container->getDefinitions();
        $this->assertCount(7, $services, '->load() attributes unique ids to anonymous services');
        // anonymous service as an argument
        $args = $services['foo']->getArguments();
        $this->assertCount(1, $args, '->load() references anonymous services as "normal" ones');
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Reference', $args[0], '->load() converts anonymous services to references to "normal" services');
        $this->assertArrayHasKey((string) $args[0], $services, '->load() makes a reference to the created ones');
        $inner = $services[(string) $args[0]];
        $this->assertEquals('BarClass', $inner->getClass(), '->load() uses the same configuration as for the anonymous ones');
        $this->assertFalse($inner->isPublic());
        // inner anonymous services
        $args = $inner->getArguments();
        $this->assertCount(1, $args, '->load() references anonymous services as "normal" ones');
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Reference', $args[0], '->load() converts anonymous services to references to "normal" services');
        $this->assertArrayHasKey((string) $args[0], $services, '->load() makes a reference to the created ones');
        $inner = $services[(string) $args[0]];
        $this->assertEquals('BazClass', $inner->getClass(), '->load() uses the same configuration as for the anonymous ones');
        $this->assertFalse($inner->isPublic());
        // anonymous service as a property
        $properties = $services['foo']->getProperties();
        $property = $properties['p'];
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Reference', $property, '->load() converts anonymous services to references to "normal" services');
        $this->assertArrayHasKey((string) $property, $services, '->load() makes a reference to the created ones');
        $inner = $services[(string) $property];
        $this->assertEquals('BuzClass', $inner->getClass(), '->load() uses the same configuration as for the anonymous ones');
        $this->assertFalse($inner->isPublic());
        // "wild" service
        $service = $container->findTaggedServiceIds('biz_tag');
        $this->assertCount(1, $service);
        foreach ($service as $id => $tag) {
            $service = $container->getDefinition($id);
        }
        $this->assertEquals('BizClass', $service->getClass(), '->load() uses the same configuration as for the anonymous ones');
        $this->assertTrue($service->isPublic());
        // anonymous services are shared when using decoration definitions
        $container->compile();
        $services = $container->getDefinitions();
        $fooArgs = $services['foo']->getArguments();
        $barArgs = $services['bar']->getArguments();
        $this->assertSame($fooArgs[0], $barArgs[0]);
    }
    /**
     * @group legacy
     * @expectedDeprecation Top-level anonymous services are deprecated since Symfony 3.4, the "id" attribute will be required in version 4.0 in %sservices_without_id.xml at line 5.
     */
    public function testLoadAnonymousServicesWithoutId()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_without_id.xml');
    }
    public function testLoadAnonymousNestedServices()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('nested_service_without_id.xml');
        $this->assertTrue($container->hasDefinition('FooClass'));
        $arguments = $container->getDefinition('FooClass')->getArguments();
        $this->assertInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference::class, \array_shift($arguments));
    }
    public function testLoadServices()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services6.xml');
        $services = $container->getDefinitions();
        $this->assertArrayHasKey('foo', $services, '->load() parses <service> elements');
        $this->assertFalse($services['not_shared']->isShared(), '->load() parses shared flag');
        $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Definition', $services['foo'], '->load() converts <service> element to Definition instances');
        $this->assertEquals('FooClass', $services['foo']->getClass(), '->load() parses the class attribute');
        $this->assertEquals('%path%/foo.php', $services['file']->getFile(), '->load() parses the file tag');
        $this->assertEquals(['foo', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference('foo'), [\true, \false]], $services['arguments']->getArguments(), '->load() parses the argument tags');
        $this->assertEquals('sc_configure', $services['configurator1']->getConfigurator(), '->load() parses the configurator tag');
        $this->assertEquals([new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference('baz'), 'configure'], $services['configurator2']->getConfigurator(), '->load() parses the configurator tag');
        $this->assertEquals(['BazClass', 'configureStatic'], $services['configurator3']->getConfigurator(), '->load() parses the configurator tag');
        $this->assertEquals([['setBar', []], ['setBar', [new \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Expression('service("foo").foo() ~ (container.hasParameter("foo") ? parameter("foo") : "default")')]]], $services['method_call1']->getMethodCalls(), '->load() parses the method_call tag');
        $this->assertEquals([['setBar', ['foo', new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference('foo'), [\true, \false]]]], $services['method_call2']->getMethodCalls(), '->load() parses the method_call tag');
        $this->assertEquals('factory', $services['new_factory1']->getFactory(), '->load() parses the factory tag');
        $this->assertEquals([new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference('baz'), 'getClass'], $services['new_factory2']->getFactory(), '->load() parses the factory tag');
        $this->assertEquals(['BazClass', 'getInstance'], $services['new_factory3']->getFactory(), '->load() parses the factory tag');
        $this->assertSame([null, 'getInstance'], $services['new_factory4']->getFactory(), '->load() accepts factory tag without class');
        $aliases = $container->getAliases();
        $this->assertArrayHasKey('alias_for_foo', $aliases, '->load() parses <service> elements');
        $this->assertEquals('foo', (string) $aliases['alias_for_foo'], '->load() parses aliases');
        $this->assertTrue($aliases['alias_for_foo']->isPublic());
        $this->assertArrayHasKey('another_alias_for_foo', $aliases);
        $this->assertEquals('foo', (string) $aliases['another_alias_for_foo']);
        $this->assertFalse($aliases['another_alias_for_foo']->isPublic());
        $this->assertEquals(['decorated', null, 0], $services['decorator_service']->getDecoratedService());
        $this->assertEquals(['decorated', 'decorated.pif-pouf', 0], $services['decorator_service_with_name']->getDecoratedService());
        $this->assertEquals(['decorated', 'decorated.pif-pouf', 5], $services['decorator_service_with_name_and_priority']->getDecoratedService());
    }
    public function testParsesIteratorArgument()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services9.xml');
        $lazyDefinition = $container->getDefinition('lazy_context');
        $this->assertEquals([new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Argument\IteratorArgument(['k1' => new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference('foo.baz'), 'k2' => new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference('service_container')]), new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Argument\IteratorArgument([])], $lazyDefinition->getArguments(), '->load() parses lazy arguments');
    }
    public function testParsesTags()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services10.xml');
        $services = $container->findTaggedServiceIds('foo_tag');
        $this->assertCount(1, $services);
        foreach ($services as $id => $tagAttributes) {
            foreach ($tagAttributes as $attributes) {
                $this->assertArrayHasKey('other_option', $attributes);
                $this->assertEquals('lorem', $attributes['other_option']);
                $this->assertArrayHasKey('other-option', $attributes, 'unnormalized tag attributes should not be removed');
                $this->assertEquals('ciz', $attributes['some_option'], 'no overriding should be done when normalizing');
                $this->assertEquals('cat', $attributes['some-option']);
                $this->assertArrayNotHasKey('an_other_option', $attributes, 'normalization should not be done when an underscore is already found');
            }
        }
    }
    public function testParseTagsWithoutNameThrowsException()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('tag_without_name.xml');
    }
    public function testParseTagWithEmptyNameThrowsException()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException');
        $this->expectExceptionMessageRegExp('/The tag name for service ".+" in .* must be a non-empty string/');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('tag_with_empty_name.xml');
    }
    public function testDeprecated()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_deprecated.xml');
        $this->assertTrue($container->getDefinition('foo')->isDeprecated());
        $message = 'The "foo" service is deprecated. You should stop using it, as it will soon be removed.';
        $this->assertSame($message, $container->getDefinition('foo')->getDeprecationMessage('foo'));
        $this->assertTrue($container->getDefinition('bar')->isDeprecated());
        $message = 'The "bar" service is deprecated.';
        $this->assertSame($message, $container->getDefinition('bar')->getDeprecationMessage('bar'));
    }
    public function testConvertDomElementToArray()
    {
        $doc = new \DOMDocument('1.0');
        $doc->loadXML('<foo>bar</foo>');
        $this->assertEquals('bar', \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader::convertDomElementToArray($doc->documentElement), '::convertDomElementToArray() converts a \\DomElement to an array');
        $doc = new \DOMDocument('1.0');
        $doc->loadXML('<foo foo="bar" />');
        $this->assertEquals(['foo' => 'bar'], \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader::convertDomElementToArray($doc->documentElement), '::convertDomElementToArray() converts a \\DomElement to an array');
        $doc = new \DOMDocument('1.0');
        $doc->loadXML('<foo><foo>bar</foo></foo>');
        $this->assertEquals(['foo' => 'bar'], \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader::convertDomElementToArray($doc->documentElement), '::convertDomElementToArray() converts a \\DomElement to an array');
        $doc = new \DOMDocument('1.0');
        $doc->loadXML('<foo><foo>bar<foo>bar</foo></foo></foo>');
        $this->assertEquals(['foo' => ['value' => 'bar', 'foo' => 'bar']], \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader::convertDomElementToArray($doc->documentElement), '::convertDomElementToArray() converts a \\DomElement to an array');
        $doc = new \DOMDocument('1.0');
        $doc->loadXML('<foo><foo></foo></foo>');
        $this->assertEquals(['foo' => null], \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader::convertDomElementToArray($doc->documentElement), '::convertDomElementToArray() converts a \\DomElement to an array');
        $doc = new \DOMDocument('1.0');
        $doc->loadXML('<foo><foo><!-- foo --></foo></foo>');
        $this->assertEquals(['foo' => null], \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader::convertDomElementToArray($doc->documentElement), '::convertDomElementToArray() converts a \\DomElement to an array');
        $doc = new \DOMDocument('1.0');
        $doc->loadXML('<foo><foo foo="bar"/><foo foo="bar"/></foo>');
        $this->assertEquals(['foo' => [['foo' => 'bar'], ['foo' => 'bar']]], \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader::convertDomElementToArray($doc->documentElement), '::convertDomElementToArray() converts a \\DomElement to an array');
    }
    public function testExtensions()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->registerExtension(new \_PhpScoper5eddef0da618a\ProjectExtension());
        $container->registerExtension(new \_PhpScoper5eddef0da618a\ProjectWithXsdExtension());
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        // extension without an XSD
        $loader->load('extensions/services1.xml');
        $container->compile();
        $services = $container->getDefinitions();
        $parameters = $container->getParameterBag()->all();
        $this->assertArrayHasKey('project.service.bar', $services, '->load() parses extension elements');
        $this->assertArrayHasKey('project.parameter.bar', $parameters, '->load() parses extension elements');
        $this->assertEquals('BAR', $services['project.service.foo']->getClass(), '->load() parses extension elements');
        $this->assertEquals('BAR', $parameters['project.parameter.foo'], '->load() parses extension elements');
        // extension with an XSD
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->registerExtension(new \_PhpScoper5eddef0da618a\ProjectExtension());
        $container->registerExtension(new \_PhpScoper5eddef0da618a\ProjectWithXsdExtension());
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('extensions/services2.xml');
        $container->compile();
        $services = $container->getDefinitions();
        $parameters = $container->getParameterBag()->all();
        $this->assertArrayHasKey('project.service.bar', $services, '->load() parses extension elements');
        $this->assertArrayHasKey('project.parameter.bar', $parameters, '->load() parses extension elements');
        $this->assertEquals('BAR', $services['project.service.foo']->getClass(), '->load() parses extension elements');
        $this->assertEquals('BAR', $parameters['project.parameter.foo'], '->load() parses extension elements');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->registerExtension(new \_PhpScoper5eddef0da618a\ProjectExtension());
        $container->registerExtension(new \_PhpScoper5eddef0da618a\ProjectWithXsdExtension());
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        // extension with an XSD (does not validate)
        try {
            $loader->load('extensions/services3.xml');
            $this->fail('->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
        } catch (\Exception $e) {
            $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
            $this->assertRegExp(\sprintf('#^Unable to parse file ".+%s": .+.$#', 'services3.xml'), $e->getMessage(), '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
            $e = $e->getPrevious();
            $this->assertInstanceOf('InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
            $this->assertStringContainsString('The attribute \'bar\' is not allowed', $e->getMessage(), '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
        }
        // non-registered extension
        try {
            $loader->load('extensions/services4.xml');
            $this->fail('->load() throws an InvalidArgumentException if the tag is not valid');
        } catch (\Exception $e) {
            $this->assertInstanceOf('\\InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the tag is not valid');
            $this->assertStringStartsWith('There is no extension able to load the configuration for "project:bar" (in', $e->getMessage(), '->load() throws an InvalidArgumentException if the tag is not valid');
        }
    }
    public function testExtensionInPhar()
    {
        if (\extension_loaded('suhosin') && \false === \strpos(\ini_get('suhosin.executor.include.whitelist'), 'phar')) {
            $this->markTestSkipped('To run this test, add "phar" to the "suhosin.executor.include.whitelist" settings in your php.ini file.');
        }
        if (\defined('HHVM_VERSION')) {
            $this->markTestSkipped('HHVM makes this test conflict with those run in separate processes.');
        }
        require_once self::$fixturesPath . '/includes/ProjectWithXsdExtensionInPhar.phar';
        // extension with an XSD in PHAR archive
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $container->registerExtension(new \_PhpScoper5eddef0da618a\ProjectWithXsdExtensionInPhar());
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('extensions/services6.xml');
        // extension with an XSD in PHAR archive (does not validate)
        try {
            $loader->load('extensions/services7.xml');
            $this->fail('->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
        } catch (\Exception $e) {
            $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
            $this->assertRegExp(\sprintf('#^Unable to parse file ".+%s": .+.$#', 'services7.xml'), $e->getMessage(), '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
            $e = $e->getPrevious();
            $this->assertInstanceOf('InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
            $this->assertStringContainsString('The attribute \'bar\' is not allowed', $e->getMessage(), '->load() throws an InvalidArgumentException if the configuration does not validate the XSD');
        }
    }
    public function testSupports()
    {
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder(), new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator());
        $this->assertTrue($loader->supports('foo.xml'), '->supports() returns true if the resource is loadable');
        $this->assertFalse($loader->supports('foo.foo'), '->supports() returns false if the resource is not loadable');
        $this->assertTrue($loader->supports('with_wrong_ext.yml', 'xml'), '->supports() returns true if the resource with forced type is loadable');
    }
    public function testNoNamingConflictsForAnonymousServices()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader1 = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml/extension1'));
        $loader1->load('services.xml');
        $services = $container->getDefinitions();
        $this->assertCount(3, $services, '->load() attributes unique ids to anonymous services');
        $loader2 = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml/extension2'));
        $loader2->load('services.xml');
        $services = $container->getDefinitions();
        $this->assertCount(5, $services, '->load() attributes unique ids to anonymous services');
        $services = $container->getDefinitions();
        $args1 = $services['extension1.foo']->getArguments();
        $inner1 = $services[(string) $args1[0]];
        $this->assertEquals('BarClass1', $inner1->getClass(), '->load() uses the same configuration as for the anonymous ones');
        $args2 = $services['extension2.foo']->getArguments();
        $inner2 = $services[(string) $args2[0]];
        $this->assertEquals('BarClass2', $inner2->getClass(), '->load() uses the same configuration as for the anonymous ones');
    }
    public function testDocTypeIsNotAllowed()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        // document types are not allowed.
        try {
            $loader->load('withdoctype.xml');
            $this->fail('->load() throws an InvalidArgumentException if the configuration contains a document type');
        } catch (\Exception $e) {
            $this->assertInstanceOf('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the configuration contains a document type');
            $this->assertRegExp(\sprintf('#^Unable to parse file ".+%s": .+.$#', 'withdoctype.xml'), $e->getMessage(), '->load() throws an InvalidArgumentException if the configuration contains a document type');
            $e = $e->getPrevious();
            $this->assertInstanceOf('InvalidArgumentException', $e, '->load() throws an InvalidArgumentException if the configuration contains a document type');
            $this->assertSame('Document types are not allowed.', $e->getMessage(), '->load() throws an InvalidArgumentException if the configuration contains a document type');
        }
    }
    public function testXmlNamespaces()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('namespaces.xml');
        $services = $container->getDefinitions();
        $this->assertArrayHasKey('foo', $services, '->load() parses <srv:service> elements');
        $this->assertCount(1, $services['foo']->getTag('foo.tag'), '->load parses <srv:tag> elements');
        $this->assertEquals([['setBar', ['foo']]], $services['foo']->getMethodCalls(), '->load() parses the <srv:call> tag');
    }
    public function testLoadIndexedArguments()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services14.xml');
        $this->assertEquals(['index_0' => 'app'], $container->findDefinition('logger')->getArguments());
    }
    public function testLoadInlinedServices()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services21.xml');
        $foo = $container->getDefinition('foo');
        $fooFactory = $foo->getFactory();
        $this->assertInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference::class, $fooFactory[0]);
        $this->assertTrue($container->has((string) $fooFactory[0]));
        $fooFactoryDefinition = $container->getDefinition((string) $fooFactory[0]);
        $this->assertSame('FooFactory', $fooFactoryDefinition->getClass());
        $this->assertSame('createFoo', $fooFactory[1]);
        $fooFactoryFactory = $fooFactoryDefinition->getFactory();
        $this->assertInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference::class, $fooFactoryFactory[0]);
        $this->assertTrue($container->has((string) $fooFactoryFactory[0]));
        $this->assertSame('Foobar', $container->getDefinition((string) $fooFactoryFactory[0])->getClass());
        $this->assertSame('createFooFactory', $fooFactoryFactory[1]);
        $fooConfigurator = $foo->getConfigurator();
        $this->assertInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference::class, $fooConfigurator[0]);
        $this->assertTrue($container->has((string) $fooConfigurator[0]));
        $fooConfiguratorDefinition = $container->getDefinition((string) $fooConfigurator[0]);
        $this->assertSame('Bar', $fooConfiguratorDefinition->getClass());
        $this->assertSame('configureFoo', $fooConfigurator[1]);
        $barConfigurator = $fooConfiguratorDefinition->getConfigurator();
        $this->assertInstanceOf(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference::class, $barConfigurator[0]);
        $this->assertSame('Baz', $container->getDefinition((string) $barConfigurator[0])->getClass());
        $this->assertSame('configureBar', $barConfigurator[1]);
    }
    /**
     * @group legacy
     */
    public function testType()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services22.xml');
        $this->assertEquals(['Bar', 'Baz'], $container->getDefinition('foo')->getAutowiringTypes());
    }
    public function testAutowire()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services23.xml');
        $this->assertTrue($container->getDefinition('bar')->isAutowired());
    }
    public function testClassFromId()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('class_from_id.xml');
        $container->compile();
        $this->assertEquals(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\CaseSensitiveClass::class, $container->getDefinition(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\CaseSensitiveClass::class)->getClass());
    }
    public function testPrototype()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_prototype.xml');
        $ids = \array_keys($container->getDefinitions());
        \sort($ids);
        $this->assertSame([\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Prototype\Foo::class, \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Prototype\Sub\Bar::class, 'service_container'], $ids);
        $resources = $container->getResources();
        $fixturesDir = \dirname(__DIR__) . \DIRECTORY_SEPARATOR . 'Fixtures' . \DIRECTORY_SEPARATOR;
        $resources = \array_map('strval', $resources);
        $this->assertContains((string) new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\FileResource($fixturesDir . 'xml' . \DIRECTORY_SEPARATOR . 'services_prototype.xml'), $resources);
        $this->assertContains((string) new \_PhpScoper5eddef0da618a\Symfony\Component\Config\Resource\GlobResource($fixturesDir . 'Prototype', '/*', \true), $resources);
        $this->assertContains('_PhpScoper5eddef0da618a\\reflection.Symfony\\Component\\DependencyInjection\\Tests\\Fixtures\\Prototype\\Foo', $resources);
        $this->assertContains('_PhpScoper5eddef0da618a\\reflection.Symfony\\Component\\DependencyInjection\\Tests\\Fixtures\\Prototype\\Sub\\Bar', $resources);
    }
    /**
     * @group legacy
     * @expectedDeprecation Using the attribute "class" is deprecated for the service "bar" which is defined as an alias %s.
     * @expectedDeprecation Using the element "tag" is deprecated for the service "bar" which is defined as an alias %s.
     * @expectedDeprecation Using the element "factory" is deprecated for the service "bar" which is defined as an alias %s.
     */
    public function testAliasDefinitionContainsUnsupportedElements()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('legacy_invalid_alias_definition.xml');
        $this->assertTrue($container->has('bar'));
    }
    public function testArgumentWithKeyOutsideCollection()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('with_key_outside_collection.xml');
        $this->assertSame(['type' => 'foo', 'bar'], $container->getDefinition('foo')->getArguments());
    }
    public function testDefaults()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services28.xml');
        $this->assertFalse($container->getDefinition('with_defaults')->isPublic());
        $this->assertSame(['foo' => [[]]], $container->getDefinition('with_defaults')->getTags());
        $this->assertTrue($container->getDefinition('with_defaults')->isAutowired());
        $this->assertArrayNotHasKey('public', $container->getDefinition('with_defaults')->getChanges());
        $this->assertArrayNotHasKey('autowire', $container->getDefinition('with_defaults')->getChanges());
        $container->compile();
        $this->assertTrue($container->getDefinition('no_defaults')->isPublic());
        $this->assertSame(['foo' => [[]]], $container->getDefinition('no_defaults')->getTags());
        $this->assertFalse($container->getDefinition('no_defaults')->isAutowired());
        $this->assertTrue($container->getDefinition('child_def')->isPublic());
        $this->assertSame(['foo' => [[]]], $container->getDefinition('child_def')->getTags());
        $this->assertFalse($container->getDefinition('child_def')->isAutowired());
        $definitions = $container->getDefinitions();
        $this->assertSame('service_container', \key($definitions));
        \array_shift($definitions);
        $anonymous = \current($definitions);
        $this->assertSame('bar', \key($definitions));
        $this->assertTrue($anonymous->isPublic());
        $this->assertTrue($anonymous->isAutowired());
        $this->assertSame(['foo' => [[]]], $anonymous->getTags());
    }
    public function testNamedArguments()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_named_args.xml');
        $this->assertEquals(['$apiKey' => 'ABCD', \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\CaseSensitiveClass::class => null], $container->getDefinition(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\NamedArgumentsDummy::class)->getArguments());
        $container->compile();
        $this->assertEquals([null, 'ABCD'], $container->getDefinition(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\NamedArgumentsDummy::class)->getArguments());
        $this->assertEquals([['setApiKey', ['123']]], $container->getDefinition(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\NamedArgumentsDummy::class)->getMethodCalls());
    }
    public function testInstanceof()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_instanceof.xml');
        $container->compile();
        $definition = $container->getDefinition(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Bar::class);
        $this->assertTrue($definition->isAutowired());
        $this->assertTrue($definition->isLazy());
        $this->assertSame(['foo' => [[]], 'bar' => [[]]], $definition->getTags());
    }
    public function testInstanceOfAndChildDefinitionNotAllowed()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException');
        $this->expectExceptionMessage('The service "child_service" cannot use the "parent" option in the same file where "instanceof" configuration is defined as using both is not supported. Move your child definitions to a separate file.');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_instanceof_with_parent.xml');
        $container->compile();
    }
    public function testAutoConfigureAndChildDefinitionNotAllowed()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException');
        $this->expectExceptionMessage('The service "child_service" cannot have a "parent" and also have "autoconfigure". Try setting autoconfigure="false" for the service.');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_autoconfigure_with_parent.xml');
        $container->compile();
    }
    public function testDefaultsAndChildDefinitionNotAllowed()
    {
        $this->expectException('_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\Exception\\InvalidArgumentException');
        $this->expectExceptionMessage('Attribute "autowire" on service "child_service" cannot be inherited from "defaults" when a "parent" is set. Move your child definitions to a separate file or define this attribute explicitly.');
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_defaults_with_parent.xml');
        $container->compile();
    }
    public function testAutoConfigureInstanceof()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_autoconfigure.xml');
        $this->assertTrue($container->getDefinition('use_defaults_settings')->isAutoconfigured());
        $this->assertFalse($container->getDefinition('override_defaults_settings_to_false')->isAutoconfigured());
    }
    public function testBindings()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_bindings.xml');
        $container->compile();
        $definition = $container->getDefinition('bar');
        $this->assertEquals(['NonExistent' => null, \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\BarInterface::class => new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Bar::class), '$foo' => [null], '$quz' => 'quz', '$factory' => 'factory'], \array_map(function ($v) {
            return $v->getValues()[0];
        }, $definition->getBindings()));
        $this->assertEquals(['quz', null, new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Bar::class), [null]], $definition->getArguments());
        $definition = $container->getDefinition(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\Bar::class);
        $this->assertEquals([null, 'factory'], $definition->getArguments());
        $this->assertEquals(['NonExistent' => null, '$quz' => 'quz', '$factory' => 'factory'], \array_map(function ($v) {
            return $v->getValues()[0];
        }, $definition->getBindings()));
    }
    public function testTsantosContainer()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('services_tsantos.xml');
        $container->compile();
        $dumper = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Dumper\PhpDumper($container);
        $this->assertStringEqualsFile(self::$fixturesPath . '/php/services_tsantos.php', $dumper->dump());
    }
    /**
     * The pass may throw an exception, which will cause the test to fail.
     */
    public function testOverriddenDefaultsBindings()
    {
        $container = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerBuilder();
        $loader = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\XmlFileLoader($container, new \_PhpScoper5eddef0da618a\Symfony\Component\Config\FileLocator(self::$fixturesPath . '/xml'));
        $loader->load('defaults_bindings.xml');
        $loader->load('defaults_bindings2.xml');
        (new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\ResolveBindingsPass())->process($container);
        $this->assertSame('overridden', $container->get('bar')->quz);
    }
}
