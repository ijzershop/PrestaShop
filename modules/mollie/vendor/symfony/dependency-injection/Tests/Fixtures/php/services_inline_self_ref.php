<?php

namespace _PhpScoper5eddef0da618a;

use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ContainerInterface;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Container;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\LogicException;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\RuntimeException;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\FrozenParameterBag;
/**
 * This class has been auto-generated
 * by the Symfony Dependency Injection Component.
 *
 * @final since Symfony 3.3
 */
class Symfony_DI_PhpDumper_Test_Inline_Self_Ref extends \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Container
{
    private $parameters = [];
    private $targetDirs = [];
    public function __construct()
    {
        $this->services = [];
        $this->normalizedIds = ['_PhpScoper5eddef0da618a\\app\\foo' => '_PhpScoper5eddef0da618a\\App\\Foo'];
        $this->methodMap = ['_PhpScoper5eddef0da618a\\App\\Foo' => 'getFooService'];
        $this->aliases = [];
    }
    public function getRemovedIds()
    {
        return ['_PhpScoper5eddef0da618a\\Psr\\Container\\ContainerInterface' => \true, '_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\ContainerInterface' => \true];
    }
    public function compile()
    {
        throw new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\LogicException('You cannot compile a dumped container that was already compiled.');
    }
    public function isCompiled()
    {
        return \true;
    }
    public function isFrozen()
    {
        @\trigger_error(\sprintf('The %s() method is deprecated since Symfony 3.3 and will be removed in 4.0. Use the isCompiled() method instead.', __METHOD__), \E_USER_DEPRECATED);
        return \true;
    }
    /**
     * Gets the public 'App\Foo' shared service.
     *
     * @return \App\Foo
     */
    protected function getFooService()
    {
        $a = new \_PhpScoper5eddef0da618a\App\Bar();
        $b = new \_PhpScoper5eddef0da618a\App\Baz($a);
        $b->bar = $a;
        $this->services['App\\Foo'] = $instance = new \_PhpScoper5eddef0da618a\App\Foo($b);
        $a->foo = $instance;
        return $instance;
    }
}
/**
 * This class has been auto-generated
 * by the Symfony Dependency Injection Component.
 *
 * @final since Symfony 3.3
 */
\class_alias('_PhpScoper5eddef0da618a\\Symfony_DI_PhpDumper_Test_Inline_Self_Ref', 'Symfony_DI_PhpDumper_Test_Inline_Self_Ref', \false);
