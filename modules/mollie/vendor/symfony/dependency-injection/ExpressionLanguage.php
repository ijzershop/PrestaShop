<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace MolliePrefix\Symfony\Component\DependencyInjection;

use MolliePrefix\Symfony\Component\ExpressionLanguage\ExpressionLanguage as BaseExpressionLanguage;
/**
 * Adds some function to the default ExpressionLanguage.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 *
 * @see ExpressionLanguageProvider
 */
class ExpressionLanguage extends \MolliePrefix\Symfony\Component\ExpressionLanguage\ExpressionLanguage
{
    /**
     * {@inheritdoc}
     */
    public function __construct($cache = null, array $providers = [], callable $serviceCompiler = null)
    {
        // prepend the default provider to let users override it easily
        \array_unshift($providers, new \MolliePrefix\Symfony\Component\DependencyInjection\ExpressionLanguageProvider($serviceCompiler));
        parent::__construct($cache, $providers);
    }
}
