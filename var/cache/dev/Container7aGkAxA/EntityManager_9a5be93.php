<?php

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \Doctrine\ORM\EntityManager|null wrapped object, if the proxy is initialized
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

    public function getConnection()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getConnection', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getConnection();
    }

    public function getMetadataFactory()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getMetadataFactory', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getMetadataFactory();
    }

    public function getExpressionBuilder()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getExpressionBuilder', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getExpressionBuilder();
    }

    public function beginTransaction()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'beginTransaction', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->beginTransaction();
    }

    public function getCache()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getCache', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getCache();
    }

    public function transactional($func)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'transactional', array('func' => $func), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->transactional($func);
    }

    public function wrapInTransaction(callable $func)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'wrapInTransaction', array('func' => $func), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->wrapInTransaction($func);
    }

    public function commit()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'commit', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->commit();
    }

    public function rollback()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'rollback', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->rollback();
    }

    public function getClassMetadata($className)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getClassMetadata', array('className' => $className), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getClassMetadata($className);
    }

    public function createQuery($dql = '')
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'createQuery', array('dql' => $dql), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->createQuery($dql);
    }

    public function createNamedQuery($name)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'createNamedQuery', array('name' => $name), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->createNamedQuery($name);
    }

    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->createNativeQuery($sql, $rsm);
    }

    public function createNamedNativeQuery($name)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->createNamedNativeQuery($name);
    }

    public function createQueryBuilder()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'createQueryBuilder', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->createQueryBuilder();
    }

    public function flush($entity = null)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'flush', array('entity' => $entity), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->flush($entity);
    }

    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->find($className, $id, $lockMode, $lockVersion);
    }

    public function getReference($entityName, $id)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getReference($entityName, $id);
    }

    public function getPartialReference($entityName, $identifier)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getPartialReference($entityName, $identifier);
    }

    public function clear($entityName = null)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'clear', array('entityName' => $entityName), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->clear($entityName);
    }

    public function close()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'close', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->close();
    }

    public function persist($entity)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'persist', array('entity' => $entity), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->persist($entity);
    }

    public function remove($entity)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'remove', array('entity' => $entity), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->remove($entity);
    }

    public function refresh($entity)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'refresh', array('entity' => $entity), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->refresh($entity);
    }

    public function detach($entity)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'detach', array('entity' => $entity), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->detach($entity);
    }

    public function merge($entity)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'merge', array('entity' => $entity), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->merge($entity);
    }

    public function copy($entity, $deep = false)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->copy($entity, $deep);
    }

    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->lock($entity, $lockMode, $lockVersion);
    }

    public function getRepository($entityName)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getRepository', array('entityName' => $entityName), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getRepository($entityName);
    }

    public function contains($entity)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'contains', array('entity' => $entity), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->contains($entity);
    }

    public function getEventManager()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getEventManager', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getEventManager();
    }

    public function getConfiguration()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getConfiguration', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getConfiguration();
    }

    public function isOpen()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'isOpen', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->isOpen();
    }

    public function getUnitOfWork()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getUnitOfWork', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getUnitOfWork();
    }

    public function getHydrator($hydrationMode)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getHydrator($hydrationMode);
    }

    public function newHydrator($hydrationMode)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->newHydrator($hydrationMode);
    }

    public function getProxyFactory()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getProxyFactory', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getProxyFactory();
    }

    public function initializeObject($obj)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'initializeObject', array('obj' => $obj), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->initializeObject($obj);
    }

    public function getFilters()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'getFilters', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->getFilters();
    }

    public function isFiltersStateClean()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'isFiltersStateClean', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->isFiltersStateClean();
    }

    public function hasFilters()
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, 'hasFilters', array(), $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        return $this->valueHolder0318e->hasFilters();
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

        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $instance, 'Doctrine\\ORM\\EntityManager')->__invoke($instance);

        $instance->initializerf828d = $initializer;

        return $instance;
    }

    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;

        if (! $this->valueHolder0318e) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolder0318e = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);

        }

        $this->valueHolder0318e->__construct($conn, $config, $eventManager);
    }

    public function & __get($name)
    {
        $this->initializerf828d && ($this->initializerf828d->__invoke($valueHolder0318e, $this, '__get', ['name' => $name], $this->initializerf828d) || 1) && $this->valueHolder0318e = $valueHolder0318e;

        if (isset(self::$publicProperties6bc8f[$name])) {
            return $this->valueHolder0318e->$name;
        }

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
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
