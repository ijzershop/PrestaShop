<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler;

use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition;
/**
 * Replaces env var placeholders by their current values.
 */
class ResolveEnvPlaceholdersPass extends \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\AbstractRecursivePass
{
    protected function processValue($value, $isRoot = \false)
    {
        if (\is_string($value)) {
            return $this->container->resolveEnvPlaceholders($value, \true);
        }
        if ($value instanceof \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition) {
            $changes = $value->getChanges();
            if (isset($changes['class'])) {
                $value->setClass($this->container->resolveEnvPlaceholders($value->getClass(), \true));
            }
            if (isset($changes['file'])) {
                $value->setFile($this->container->resolveEnvPlaceholders($value->getFile(), \true));
            }
        }
        $value = parent::processValue($value, $isRoot);
        if ($value && \is_array($value) && !$isRoot) {
            $value = \array_combine($this->container->resolveEnvPlaceholders(\array_keys($value), \true), $value);
        }
        return $value;
    }
}
