<?php

namespace MolliePrefix;

use MolliePrefix\Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use MolliePrefix\Symfony\Component\DependencyInjection\ContainerInterface;
use MolliePrefix\Symfony\Component\DependencyInjection\Container;
use MolliePrefix\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;
use MolliePrefix\Symfony\Component\DependencyInjection\Exception\LogicException;
use MolliePrefix\Symfony\Component\DependencyInjection\Exception\RuntimeException;
use MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\FrozenParameterBag;
/**
 * This class has been auto-generated
 * by the Symfony Dependency Injection Component.
 *
 * @final since Symfony 3.3
 */
class ProjectServiceContainer extends \MolliePrefix\Symfony\Component\DependencyInjection\Container
{
    private $parameters = [];
    private $targetDirs = [];
    public function __construct()
    {
        $this->parameters = $this->getDefaultParameters();
        $this->services = [];
        $this->methodMap = ['test' => 'getTestService'];
        $this->aliases = [];
    }
    public function getRemovedIds()
    {
        return ['MolliePrefix\\Psr\\Container\\ContainerInterface' => \true, 'MolliePrefix\\Symfony\\Component\\DependencyInjection\\ContainerInterface' => \true];
    }
    public function compile()
    {
        throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\LogicException('You cannot compile a dumped container that was already compiled.');
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
     * Gets the public 'test' shared service.
     *
     * @return \stdClass
     */
    protected function getTestService()
    {
        return $this->services['test'] = new \stdClass(['only dot' => '.', 'concatenation as value' => '.\'\'.', 'concatenation from the start value' => '\'\'.', '.' => 'dot as a key', '.\'\'.' => 'concatenation as a key', '\'\'.' => 'concatenation from the start key', 'optimize concatenation' => 'string1-string2', 'optimize concatenation with empty string' => 'string1string2', 'optimize concatenation from the start' => 'start', 'optimize concatenation at the end' => 'end', 'new line' => 'string with ' . "\n" . 'new line']);
    }
    public function getParameter($name)
    {
        $name = (string) $name;
        if (!(isset($this->parameters[$name]) || isset($this->loadedDynamicParameters[$name]) || \array_key_exists($name, $this->parameters))) {
            $name = $this->normalizeParameterName($name);
            if (!(isset($this->parameters[$name]) || isset($this->loadedDynamicParameters[$name]) || \array_key_exists($name, $this->parameters))) {
                throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('The parameter "%s" must be defined.', $name));
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
        throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\LogicException('Impossible to call set() on a frozen ParameterBag.');
    }
    public function getParameterBag()
    {
        if (null === $this->parameterBag) {
            $parameters = $this->parameters;
            foreach ($this->loadedDynamicParameters as $name => $loaded) {
                $parameters[$name] = $loaded ? $this->dynamicParameters[$name] : $this->getDynamicParameter($name);
            }
            $this->parameterBag = new \MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\FrozenParameterBag($parameters);
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
        throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('The dynamic parameter "%s" must be defined.', $name));
    }
    private $normalizedParameterNames = [];
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
        return ['empty_value' => '', 'some_string' => '-'];
    }
}
/**
 * This class has been auto-generated
 * by the Symfony Dependency Injection Component.
 *
 * @final since Symfony 3.3
 */
\class_alias('MolliePrefix\\ProjectServiceContainer', 'MolliePrefix\\ProjectServiceContainer', \false);
