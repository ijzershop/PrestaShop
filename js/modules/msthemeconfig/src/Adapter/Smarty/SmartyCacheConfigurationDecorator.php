<?php
namespace MsThemeConfig\Adapter\Smarty;

use PrestaShop\PrestaShop\Core\Configuration\DataConfigurationInterface;

/**
 * Decorates core smarty cache configuration to normalize multistore array values
 * into scalars so Symfony ChoiceType does not receive arrays.
 */
class SmartyCacheConfigurationDecorator implements DataConfigurationInterface
{
    /** @var DataConfigurationInterface */
    private $inner;

    public function __construct(DataConfigurationInterface $inner)
    {
        $this->inner = $inner;
    }

    public function getConfiguration()
    {
        $config = $this->inner->getConfiguration();

        // Normalize values that may be arrays in multistore context
        foreach (['template_compilation', 'clear_cache'] as $key) {
            if (isset($config[$key]) && is_array($config[$key])) {
                $first = reset($config[$key]);
                $config[$key] = $first;
            }
        }

        // Cast to expected scalar types and clamp to allowed values
        if (isset($config['template_compilation'])) {
            // expected int 0|1|2
            $tpl = (int) $config['template_compilation'];
            $config['template_compilation'] = in_array($tpl, [0, 1, 2], true) ? $tpl : 0;
        }
        if (isset($config['cache'])) {
            // expected bool
            $config['cache'] = (bool) $config['cache'];
        }
        if (isset($config['multi_front_optimization'])) {
            $config['multi_front_optimization'] = (bool) $config['multi_front_optimization'];
        }
        if (isset($config['clear_cache'])) {
            // expected string 'never'|'everytime'
            $val = (string) $config['clear_cache'];
            $config['clear_cache'] = in_array($val, ['never', 'everytime'], true) ? $val : 'never';
        }

        return $config;
    }

    public function updateConfiguration(array $configuration)
    {
        return $this->inner->updateConfiguration($configuration);
    }

    public function validateConfiguration(array $configuration)
    {
        return $this->inner->validateConfiguration($configuration);
    }
}
