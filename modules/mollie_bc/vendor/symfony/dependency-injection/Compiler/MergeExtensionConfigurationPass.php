<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\DependencyInjection\Compiler;

use MolliePrefix\Symfony\Component\DependencyInjection\ContainerBuilder;
use MolliePrefix\Symfony\Component\DependencyInjection\Exception\LogicException;
use MolliePrefix\Symfony\Component\DependencyInjection\Exception\RuntimeException;
use MolliePrefix\Symfony\Component\DependencyInjection\Extension\ConfigurationExtensionInterface;
use MolliePrefix\Symfony\Component\DependencyInjection\Extension\Extension;
use MolliePrefix\Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use MolliePrefix\Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\EnvPlaceholderParameterBag;
use MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
/**
 * Merges extension configs into the container builder.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 */
class MergeExtensionConfigurationPass implements \MolliePrefix\Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(\MolliePrefix\Symfony\Component\DependencyInjection\ContainerBuilder $container)
    {
        $parameters = $container->getParameterBag()->all();
        $definitions = $container->getDefinitions();
        $aliases = $container->getAliases();
        $exprLangProviders = $container->getExpressionLanguageProviders();
        foreach ($container->getExtensions() as $extension) {
            if ($extension instanceof \MolliePrefix\Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface) {
                $extension->prepend($container);
            }
        }
        foreach ($container->getExtensions() as $name => $extension) {
            if (!($config = $container->getExtensionConfig($name))) {
                // this extension was not called
                continue;
            }
            $resolvingBag = $container->getParameterBag();
            if ($resolvingBag instanceof \MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\EnvPlaceholderParameterBag && $extension instanceof \MolliePrefix\Symfony\Component\DependencyInjection\Extension\Extension) {
                // create a dedicated bag so that we can track env vars per-extension
                $resolvingBag = new \MolliePrefix\Symfony\Component\DependencyInjection\Compiler\MergeExtensionConfigurationParameterBag($resolvingBag);
            }
            $config = $resolvingBag->resolveValue($config);
            try {
                $tmpContainer = new \MolliePrefix\Symfony\Component\DependencyInjection\Compiler\MergeExtensionConfigurationContainerBuilder($extension, $resolvingBag);
                $tmpContainer->setResourceTracking($container->isTrackingResources());
                $tmpContainer->addObjectResource($extension);
                if ($extension instanceof \MolliePrefix\Symfony\Component\DependencyInjection\Extension\ConfigurationExtensionInterface && null !== ($configuration = $extension->getConfiguration($config, $tmpContainer))) {
                    $tmpContainer->addObjectResource($configuration);
                }
                foreach ($exprLangProviders as $provider) {
                    $tmpContainer->addExpressionLanguageProvider($provider);
                }
                $extension->load($config, $tmpContainer);
            } catch (\Exception $e) {
                if ($resolvingBag instanceof \MolliePrefix\Symfony\Component\DependencyInjection\Compiler\MergeExtensionConfigurationParameterBag) {
                    $container->getParameterBag()->mergeEnvPlaceholders($resolvingBag);
                }
                throw $e;
            }
            if ($resolvingBag instanceof \MolliePrefix\Symfony\Component\DependencyInjection\Compiler\MergeExtensionConfigurationParameterBag) {
                // don't keep track of env vars that are *overridden* when configs are merged
                $resolvingBag->freezeAfterProcessing($extension, $tmpContainer);
            }
            $container->merge($tmpContainer);
            $container->getParameterBag()->add($parameters);
        }
        $container->addDefinitions($definitions);
        $container->addAliases($aliases);
    }
}
/**
 * @internal
 */
class MergeExtensionConfigurationParameterBag extends \MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\EnvPlaceholderParameterBag
{
    private $processedEnvPlaceholders;
    public function __construct(parent $parameterBag)
    {
        parent::__construct($parameterBag->all());
        $this->mergeEnvPlaceholders($parameterBag);
    }
    public function freezeAfterProcessing(\MolliePrefix\Symfony\Component\DependencyInjection\Extension\Extension $extension, \MolliePrefix\Symfony\Component\DependencyInjection\ContainerBuilder $container)
    {
        if (!($config = $extension->getProcessedConfigs())) {
            // Extension::processConfiguration() wasn't called, we cannot know how configs were merged
            return;
        }
        $this->processedEnvPlaceholders = [];
        // serialize config and container to catch env vars nested in object graphs
        $config = \serialize($config) . \serialize($container->getDefinitions()) . \serialize($container->getAliases()) . \serialize($container->getParameterBag()->all());
        foreach (parent::getEnvPlaceholders() as $env => $placeholders) {
            foreach ($placeholders as $placeholder) {
                if (\false !== \stripos($config, $placeholder)) {
                    $this->processedEnvPlaceholders[$env] = $placeholders;
                    break;
                }
            }
        }
    }
    /**
     * {@inheritdoc}
     */
    public function getEnvPlaceholders()
    {
        return null !== $this->processedEnvPlaceholders ? $this->processedEnvPlaceholders : parent::getEnvPlaceholders();
    }
}
/**
 * A container builder preventing using methods that wouldn't have any effect from extensions.
 *
 * @internal
 */
class MergeExtensionConfigurationContainerBuilder extends \MolliePrefix\Symfony\Component\DependencyInjection\ContainerBuilder
{
    private $extensionClass;
    public function __construct(\MolliePrefix\Symfony\Component\DependencyInjection\Extension\ExtensionInterface $extension, \MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface $parameterBag = null)
    {
        parent::__construct($parameterBag);
        $this->extensionClass = \get_class($extension);
    }
    /**
     * {@inheritdoc}
     */
    public function addCompilerPass(\MolliePrefix\Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface $pass, $type = \MolliePrefix\Symfony\Component\DependencyInjection\Compiler\PassConfig::TYPE_BEFORE_OPTIMIZATION)
    {
        throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\LogicException(\sprintf('You cannot add compiler pass "%s" from extension "%s". Compiler passes must be registered before the container is compiled.', \get_class($pass), $this->extensionClass));
    }
    /**
     * {@inheritdoc}
     */
    public function registerExtension(\MolliePrefix\Symfony\Component\DependencyInjection\Extension\ExtensionInterface $extension)
    {
        throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\LogicException(\sprintf('You cannot register extension "%s" from "%s". Extensions must be registered before the container is compiled.', \get_class($extension), $this->extensionClass));
    }
    /**
     * {@inheritdoc}
     */
    public function compile($resolveEnvPlaceholders = \false)
    {
        throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\LogicException(\sprintf('Cannot compile the container in extension "%s".', $this->extensionClass));
    }
    /**
     * {@inheritdoc}
     */
    public function resolveEnvPlaceholders($value, $format = null, array &$usedEnvs = null)
    {
        if (\true !== $format || !\is_string($value)) {
            return parent::resolveEnvPlaceholders($value, $format, $usedEnvs);
        }
        $bag = $this->getParameterBag();
        $value = $bag->resolveValue($value);
        if (!$bag instanceof \MolliePrefix\Symfony\Component\DependencyInjection\ParameterBag\EnvPlaceholderParameterBag) {
            return parent::resolveEnvPlaceholders($value, $format, $usedEnvs);
        }
        foreach ($bag->getEnvPlaceholders() as $env => $placeholders) {
            if (\false === \strpos($env, ':')) {
                continue;
            }
            foreach ($placeholders as $placeholder) {
                if (\false !== \stripos($value, $placeholder)) {
                    throw new \MolliePrefix\Symfony\Component\DependencyInjection\Exception\RuntimeException(\sprintf('Using a cast in "env(%s)" is incompatible with resolution at compile time in "%s". The logic in the extension should be moved to a compiler pass, or an env parameter with no cast should be used instead.', $env, $this->extensionClass));
                }
            }
        }
        return parent::resolveEnvPlaceholders($value, $format, $usedEnvs);
    }
}
