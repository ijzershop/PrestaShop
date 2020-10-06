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
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\LazyProxy\ProxyHelper;
use _PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference;
/**
 * Resolves named arguments to their corresponding numeric index.
 *
 * @author Kévin Dunglas <dunglas@gmail.com>
 */
class ResolveNamedArgumentsPass extends \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Compiler\AbstractRecursivePass
{
    /**
     * {@inheritdoc}
     */
    protected function processValue($value, $isRoot = \false)
    {
        if (!$value instanceof \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition) {
            return parent::processValue($value, $isRoot);
        }
        $calls = $value->getMethodCalls();
        $calls[] = ['__construct', $value->getArguments()];
        foreach ($calls as $i => $call) {
            list($method, $arguments) = $call;
            $parameters = null;
            $resolvedArguments = [];
            foreach ($arguments as $key => $argument) {
                if (\is_int($key)) {
                    $resolvedArguments[$key] = $argument;
                    continue;
                }
                if (null === $parameters) {
                    $r = $this->getReflectionMethod($value, $method);
                    $class = $r instanceof \ReflectionMethod ? $r->class : $this->currentId;
                    $method = $r->getName();
                    $parameters = $r->getParameters();
                }
                if (isset($key[0]) && '$' === $key[0]) {
                    foreach ($parameters as $j => $p) {
                        if ($key === '$' . $p->name) {
                            $resolvedArguments[$j] = $argument;
                            continue 2;
                        }
                    }
                    throw new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('Invalid service "%s": method "%s()" has no argument named "%s". Check your service definition.', $this->currentId, $class !== $this->currentId ? $class . '::' . $method : $method, $key));
                }
                if (null !== $argument && !$argument instanceof \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference && !$argument instanceof \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition) {
                    throw new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('Invalid service "%s": the value of argument "%s" of method "%s()" must be null, an instance of "%s" or an instance of "%s", "%s" given.', $this->currentId, $key, $class !== $this->currentId ? $class . '::' . $method : $method, \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Reference::class, \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Definition::class, \gettype($argument)));
                }
                $typeFound = \false;
                foreach ($parameters as $j => $p) {
                    if (!\array_key_exists($j, $resolvedArguments) && \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\LazyProxy\ProxyHelper::getTypeHint($r, $p, \true) === $key) {
                        $resolvedArguments[$j] = $argument;
                        $typeFound = \true;
                    }
                }
                if (!$typeFound) {
                    throw new \_PhpScoper5eddef0da618a\Symfony\Component\DependencyInjection\Exception\InvalidArgumentException(\sprintf('Invalid service "%s": method "%s()" has no argument type-hinted as "%s". Check your service definition.', $this->currentId, $class !== $this->currentId ? $class . '::' . $method : $method, $key));
                }
            }
            if ($resolvedArguments !== $call[1]) {
                \ksort($resolvedArguments);
                $calls[$i][1] = $resolvedArguments;
            }
        }
        list(, $arguments) = \array_pop($calls);
        if ($arguments !== $value->getArguments()) {
            $value->setArguments($arguments);
        }
        if ($calls !== $value->getMethodCalls()) {
            $value->setMethodCalls($calls);
        }
        return parent::processValue($value, $isRoot);
    }
}
