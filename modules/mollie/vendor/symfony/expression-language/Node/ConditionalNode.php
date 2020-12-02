<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node;

use _PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Compiler;
/**
 * @author Fabien Potencier <fabien@symfony.com>
 *
 * @internal
 */
class ConditionalNode extends \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node
{
    public function __construct(\_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node $expr1, \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node $expr2, \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node $expr3)
    {
        parent::__construct(['expr1' => $expr1, 'expr2' => $expr2, 'expr3' => $expr3]);
    }
    public function compile(\_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Compiler $compiler)
    {
        $compiler->raw('((')->compile($this->nodes['expr1'])->raw(') ? (')->compile($this->nodes['expr2'])->raw(') : (')->compile($this->nodes['expr3'])->raw('))');
    }
    public function evaluate($functions, $values)
    {
        if ($this->nodes['expr1']->evaluate($functions, $values)) {
            return $this->nodes['expr2']->evaluate($functions, $values);
        }
        return $this->nodes['expr3']->evaluate($functions, $values);
    }
    public function toArray()
    {
        return ['(', $this->nodes['expr1'], ' ? ', $this->nodes['expr2'], ' : ', $this->nodes['expr3'], ')'];
    }
}
