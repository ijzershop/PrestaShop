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
        $this->parameters = $this->getDefaultParameters();
        $this->services = [];
        $this->normalizedIds = ['bar_%env(bar)%' => 'bar_%env(BAR)%'];
        $this->methodMap = ['bar' => 'getBarService', 'bar_%env(BAR)%' => 'getBarenvBARService', 'foo' => 'getFooService'];
        $this->privates = ['bar_%env(BAR)%' => \true];
        $this->aliases = [];
    }
    public function getRemovedIds()
    {
        return ['_PhpScoper5eddef0da618a\\Psr\\Container\\ContainerInterface' => \true, '_PhpScoper5eddef0da618a\\Symfony\\Component\\DependencyInjection\\ContainerInterface' => \true, 'bar_%env(BAR)%' => \true, 'baz_%env(BAR)%' => \true];
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
     * Gets the public 'bar' shared service.
     *
     * @return \stdClass
     */
    protected function getBarService()
    {
        return $this->services['bar'] = new \stdClass(${($_ = isset($this->services['bar_%env(BAR)%']) ? $this->services['bar_%env(BAR)%'] : ($this->services['bar_%env(BAR)%'] = new \stdClass())) && \false ?: '_'});
    }
    /**
     * Gets the public 'foo' shared service.
     *
     * @return \stdClass
     */
    protected function getFooService()
    {
        return $this->services['foo'] = new \stdClass(${($_ = isset($this->services['bar_%env(BAR)%']) ? $this->services['bar_%env(BAR)%'] : ($this->services['bar_%env(BAR)%'] = new \stdClass())) && \false ?: '_'}, ['baz_' . $this->getEnv('string:BAR') => new \stdClass()]);
    }
    /**
     * Gets the private 'bar_%env(BAR)%' shared service.
     *
     * @return \stdClass
     */
    protected function getBarenvBARService()
    {
        return $this->services['bar_%env(BAR)%'] = new \stdClass();
    }
    public function getParameter($name)
    {
        $name = (string) $name;
        if (!(isset($this->parameters[$name]) || isset($this->loadedDynamicParameters[$name]) || \array_key_exists($name, $this->parameters))) {
            $name = $this->normalizeParameterName($name);
            if (!(isset($this->parameters[$name]) || isset($this->loadedDynamicParameters[$name]) || \array_key_exists($name, $this->parameters))) {
                throw new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('The parameter "%s" must be defined.', $name));
            }
        }
        if (isset($this->loadedDynamicParameters[$name])) {
            return $this->loadedDynamicParameters[$name] ? $this->dynamicParameters[$name] : $this->getDynamicParameter($name);
        }
        return $this->parameters[$name];
    }
    public function hasParameter($name)
    {
        $name = (string) $name;
        $name = $this->normalizeParameterName($name);
        return isset($this->parameters[$name]) || isset($this->loadedDynamicParameters[$name]) || \array_key_exists($name, $this->parameters);
    }
    public function setParameter($name, $value)
    {
        throw new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\LogicException('Impossible to call set() on a frozen ParameterBag.');
    }
    public function getParameterBag()
    {
        if (null === $this->parameterBag) {
            $parameters = $this->parameters;
            foreach ($this->loadedDynamicParameters as $name => $loaded) {
                $parameters[$name] = $loaded ? $this->dynamicParameters[$name] : $this->getDynamicParameter($name);
            }
            $this->parameterBag = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\ParameterBag\FrozenParameterBag($parameters);
        }
        return $this->parameterBag;
    }
    private $loadedDynamicParameters = [];
    private $dynamicParameters = [];
    /**
     * Computes a dynamic parameter.
     *
     * @param string $name The name of the dynamic parameter to load
     *
     * @return mixed The value of the dynamic parameter
     *
     * @throws InvalidArgumentException When the dynamic parameter does not exist
     */
    private function getDynamicParameter($name)
    {
        throw new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('The dynamic parameter "%s" must be defined.', $name));
    }
    private $normalizedParameterNames = ['env(bar)' => 'env(BAR)'];
    private function normalizeParameterName($name)
    {
        if (isset($this->normalizedParameterNames[$normalizedName = \strtolower($name)]) || isset($this->parameters[$normalizedName]) || \array_key_exists($normalizedName, $this->parameters)) {
            $normalizedName = isset($this->normalizedParameterNames[$normalizedName]) ? $this->normalizedParameterNames[$normalizedName] : $normalizedName;
            if ((string) $name !== $normalizedName) {
                @\trigger_error(\sprintf('Parameter names will be made case sensitive in Symfony 4.0. Using "%s" instead of "%s" is deprecated since Symfony 3.4.', $name, $normalizedName), \E_USER_DEPRECATED);
            }
        } else {
            $normalizedName = $this->normalizedParameterNames[$normalizedName] = (string) $name;
        }
        return $normalizedName;
    }
    /**
     * Gets the default parameters.
     *
     * @return array An array of the default parameters
     */
    protected function getDefaultParameters()
    {
        return ['env(BAR)' => 'bar'];
    }
}
/**
 * This class has been auto-generated
 * by the Symfony Dependency Injection Component.
 *
 * @final since Symfony 3.3
 */
\class_alias('_PhpScoper5eddef0da618a\\ProjectServiceContainer', 'ProjectServiceContainer', \false);
