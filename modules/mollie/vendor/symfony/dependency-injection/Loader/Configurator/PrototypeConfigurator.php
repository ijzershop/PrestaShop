<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\Configurator;

use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\PhpFileLoader;
/**
 * @author Nicolas Grekas <p@tchwork.com>
 */
class PrototypeConfigurator extends \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\Configurator\AbstractServiceConfigurator
{
    const FACTORY = 'load';
    use Traits\AbstractTrait;
    use Traits\ArgumentTrait;
    use Traits\AutoconfigureTrait;
    use Traits\AutowireTrait;
    use Traits\BindTrait;
    use Traits\CallTrait;
    use Traits\ConfiguratorTrait;
    use Traits\DeprecateTrait;
    use Traits\FactoryTrait;
    use Traits\LazyTrait;
    use Traits\ParentTrait;
    use Traits\PropertyTrait;
    use Traits\PublicTrait;
    use Traits\ShareTrait;
    use Traits\TagTrait;
    private $loader;
    private $resource;
    private $exclude;
    private $allowParent;
    public function __construct(\_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\Configurator\ServicesConfigurator $parent, \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Loader\PhpFileLoader $loader, \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition $defaults, $namespace, $resource, $allowParent)
    {
        $definition = new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition();
        if (!$defaults->isPublic() || !$defaults->isPrivate()) {
            $definition->setPublic($defaults->isPublic());
        }
        $definition->setAutowired($defaults->isAutowired());
        $definition->setAutoconfigured($defaults->isAutoconfigured());
        // deep clone, to avoid multiple process of the same instance in the passes
        $definition->setBindings(\unserialize(\serialize($defaults->getBindings())));
        $definition->setChanges([]);
        $this->loader = $loader;
        $this->resource = $resource;
        $this->allowParent = $allowParent;
        parent::__construct($parent, $definition, $namespace, $defaults->getTags());
    }
    public function __destruct()
    {
        parent::__destruct();
        if ($this->loader) {
            $this->loader->registerClasses($this->definition, $this->id, $this->resource, $this->exclude);
        }
        $this->loader = null;
    }
    /**
     * Excludes files from registration using a glob pattern.
     *
     * @param string $exclude
     *
     * @return $this
     */
    public final function exclude($exclude)
    {
        $this->exclude = $exclude;
        return $this;
    }
}
