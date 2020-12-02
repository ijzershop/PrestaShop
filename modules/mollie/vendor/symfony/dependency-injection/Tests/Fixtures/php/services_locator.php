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
class ProjectServiceContainer extends \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Container
{
    private $parameters = [];
    private $targetDirs = [];
    public function __construct()
    {
        $this->services = [];
        $this->methodMap = ['bar_service' => 'getBarServiceService', 'baz_service' => 'getBazServiceService', 'foo_service' => 'getFooServiceService', 'translator.loader_1' => 'getTranslator_Loader1Service', 'translator.loader_2' => 'getTranslator_Loader2Service', 'translator.loader_3' => 'getTranslator_Loader3Service', 'translator_1' => 'getTranslator1Service', 'translator_2' => 'getTranslator2Service', 'translator_3' => 'getTranslator3Service'];
        $this->privates = ['baz_service' => \true];
        $this->aliases = [];
    }
    public function getRemovedIds()
    {
        return ['_PhpScoper5eddef0da618a\\Psr\\Container\\ContainerInterface' => \true, '_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\ContainerInterface' => \true, 'baz_service' => \true, 'translator.loader_1_locator' => \true, 'translator.loader_2_locator' => \true, 'translator.loader_3_locator' => \true];
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
     * Gets the public 'bar_service' shared service.
     *
     * @return \stdClass
     */
    protected function getBarServiceService()
    {
        return $this->services['bar_service'] = new \stdClass(${($_ = isset($this->services['baz_service']) ? $this->services['baz_service'] : ($this->services['baz_service'] = new \stdClass())) && \false ?: '_'});
    }
    /**
     * Gets the public 'foo_service' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    protected function getFooServiceService()
    {
        return $this->services['foo_service'] = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ServiceLocator(['bar' => function () {
            return ${($_ = isset($this->services['bar_service']) ? $this->services['bar_service'] : $this->getBarServiceService()) && \false ?: '_'};
        }, 'baz' => function () {
            $f = function (\stdClass $v) {
                return $v;
            };
            return $f(${($_ = isset($this->services['baz_service']) ? $this->services['baz_service'] : ($this->services['baz_service'] = new \stdClass())) && \false ?: '_'});
        }, 'nil' => function () {
            return \NULL;
        }]);
    }
    /**
     * Gets the public 'translator.loader_1' shared service.
     *
     * @return \stdClass
     */
    protected function getTranslator_Loader1Service()
    {
        return $this->services['translator.loader_1'] = new \stdClass();
    }
    /**
     * Gets the public 'translator.loader_2' shared service.
     *
     * @return \stdClass
     */
    protected function getTranslator_Loader2Service()
    {
        return $this->services['translator.loader_2'] = new \stdClass();
    }
    /**
     * Gets the public 'translator.loader_3' shared service.
     *
     * @return \stdClass
     */
    protected function getTranslator_Loader3Service()
    {
        return $this->services['translator.loader_3'] = new \stdClass();
    }
    /**
     * Gets the public 'translator_1' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\Tests\Fixtures\StubbedTranslator
     */
    protected function getTranslator1Service()
    {
        return $this->services['translator_1'] = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\StubbedTranslator(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ServiceLocator(['translator.loader_1' => function () {
            return ${($_ = isset($this->services['translator.loader_1']) ? $this->services['translator.loader_1'] : ($this->services['translator.loader_1'] = new \stdClass())) && \false ?: '_'};
        }]));
    }
    /**
     * Gets the public 'translator_2' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\Tests\Fixtures\StubbedTranslator
     */
    protected function getTranslator2Service()
    {
        $this->services['translator_2'] = $instance = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\StubbedTranslator(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ServiceLocator(['translator.loader_2' => function () {
            return ${($_ = isset($this->services['translator.loader_2']) ? $this->services['translator.loader_2'] : ($this->services['translator.loader_2'] = new \stdClass())) && \false ?: '_'};
        }]));
        $instance->addResource('db', ${($_ = isset($this->services['translator.loader_2']) ? $this->services['translator.loader_2'] : ($this->services['translator.loader_2'] = new \stdClass())) && \false ?: '_'}, 'nl');
        return $instance;
    }
    /**
     * Gets the public 'translator_3' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\Tests\Fixtures\StubbedTranslator
     */
    protected function getTranslator3Service()
    {
        $this->services['translator_3'] = $instance = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Tests\Fixtures\StubbedTranslator(new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ServiceLocator(['translator.loader_3' => function () {
            return ${($_ = isset($this->services['translator.loader_3']) ? $this->services['translator.loader_3'] : ($this->services['translator.loader_3'] = new \stdClass())) && \false ?: '_'};
        }]));
        $a = ${($_ = isset($this->services['translator.loader_3']) ? $this->services['translator.loader_3'] : ($this->services['translator.loader_3'] = new \stdClass())) && \false ?: '_'};
        $instance->addResource('db', $a, 'nl');
        $instance->addResource('db', $a, 'en');
        return $instance;
    }
    /**
     * Gets the private 'baz_service' shared service.
     *
     * @return \stdClass
     */
    protected function getBazServiceService()
    {
        return $this->services['baz_service'] = new \stdClass();
    }
}
/**
 * This class has been auto-generated
 * by the Symfony Dependency Injection Component.
 *
 * @final since Symfony 3.3
 */
\class_alias('_PhpScoper5eddef0da618a\\ProjectServiceContainer', 'ProjectServiceContainer', \false);
