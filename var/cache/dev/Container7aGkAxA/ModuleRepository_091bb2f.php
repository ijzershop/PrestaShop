<?php

class ModuleRepository_091bb2f extends \PrestaShop\PrestaShop\Core\Module\ModuleRepository implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \PrestaShop\PrestaShop\Core\Module\ModuleRepository|null wrapped object, if the proxy is initialized
     */
    private $valueHolder0318e = null;

    /**
     * @var \Closure|null initializer responsible for generating the wrapped object
     */
    private $initializerf828d = null;

    /**
     * @var bool[] map of public properties of the parent class
     */
    private static $publicProperties6bc8f = [
        
    ];

    public function getList() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getList', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getList();
    }

    public function getInstalledModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getInstalledModules', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getInstalledModules();
    }

    public function getMustBeConfiguredModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getMustBeConfiguredModules', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getMustBeConfiguredModules();
    }

    public function getUpgradableModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getUpgradableModules', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getUpgradableModules();
    }

    public function getModule(string $moduleName) : \PrestaShop\PrestaShop\Core\Module\ModuleInterface
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getModule', array('moduleName' => $moduleName), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getModule($moduleName);
    }

    public function getModulePath(string $moduleName) : ?string
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getModulePath', array('moduleName' => $moduleName), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getModulePath($moduleName);
    }

    public function setActionUrls(\PrestaShop\PrestaShop\Core\Module\ModuleCollection $collection) : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'setActionUrls', array('collection' => $collection), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->setActionUrls($collection);
    }

    public function clearCache(?string $moduleName = null, bool $allShops = false) : bool
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'clearCache', array('moduleName' => $moduleName, 'allShops' => $allShops), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->clearCache($moduleName, $allShops);
    }

    /**
     * Constructor for lazy initialization
     *
     * @param \Closure|null $initializer
     */
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;

        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();

        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $instance, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($instance);

        $instance->initializerf828d = $initializer;

        return $instance;
    }

    public function __construct(\PrestaShop\PrestaShop\Adapter\Module\ModuleDataProvider $moduleDataProvider, \PrestaShop\PrestaShop\Adapter\Module\AdminModuleDataProvider $adminModuleDataProvider, \Doctrine\Common\Cache\CacheProvider $cacheProvider, \PrestaShop\PrestaShop\Adapter\HookManager $hookManager, string $modulePath, int $contextLangId)
    {
        static $reflection;

        if (! $this->valueHolder0318e) {
            $reflection = $reflection ?? new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
            $this->valueHolder0318e = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);

        }

        $this->valueHolder0318e->__construct($moduleDataProvider, $adminModuleDataProvider, $cacheProvider, $hookManager, $modulePath, $contextLangId);
    }

    public function & __get($name)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, '__get', ['name' => $name], $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        if (isset(self::$publicProperties6bc8f[$name])) {
            return $this->valueHolder0318e->$name;
        }

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder0318e;

            $backtrace = debug_backtrace(false, 1);
            trigger_error(
                sprintf(
                    'Undefined property: %s::$%s in %s on line %s',
                    $realInstanceReflection->getName(),
                    $name,
                    $backtrace[0]['file'],
                    $backtrace[0]['line']
                ),
                \E_USER_NOTICE
            );
            return $targetObject->$name;
        }

        $targetObject = $this->valueHolder0318e;
        $accessor = function & () use ($targetObject, $name) {
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __set($name, $value)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, '__set', array('name' => $name, 'value' => $value), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder0318e;

            $targetObject->$name = $value;

            return $targetObject->$name;
        }

        $targetObject = $this->valueHolder0318e;
        $accessor = function & () use ($targetObject, $name, $value) {
            $targetObject->$name = $value;

            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __isset($name)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, '__isset', array('name' => $name), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder0318e;

            return isset($targetObject->$name);
        }

        $targetObject = $this->valueHolder0318e;
        $accessor = function () use ($targetObject, $name) {
            return isset($targetObject->$name);
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = $accessor();

        return $returnValue;
    }

    public function __unset($name)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, '__unset', array('name' => $name), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder0318e;

            unset($targetObject->$name);

            return;
        }

        $targetObject = $this->valueHolder0318e;
        $accessor = function () use ($targetObject, $name) {
            unset($targetObject->$name);

            return;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $accessor();
    }

    public function __clone()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, '__clone', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        $this->valueHolder0318e = clone $this->valueHolder0318e;
    }

    public function __sleep()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, '__sleep', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return array('valueHolder0318e');
    }

    public function __wakeup()
    {
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);
    }

    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializerf828d = $initializer;
    }

    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializerf828d;
    }

    public function initializeProxy() : bool
    {
        return $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'initializeProxy', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;
    }

    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolder0318e;
    }

    public function getWrappedValueHolderValue()
    {
        return $this->valueHolder0318e;
    }
}
