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
class UnaryNode extends \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node
{
    private static $operators = ['!' => '!', 'not' => '!', '+' => '+', '-' => '-'];
    public function __construct($operator, \_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Node\Node $node)
    {
        parent::__construct(['node' => $node], ['operator' => $operator]);
    }
    public function compile(\_PhpScoper5eddef0da618a\Symfony\Component\ExpressionLanguage\Compiler $compiler)
    {
        $compiler->raw('(')->raw(self::$operators[$this->attributes['operator']])->compile($this->nodes['node'])->raw(')');
    }
    public function evaluate($functions, $values)
    {
        $value = $this->nodes['node']->evaluate($functions, $values);
        switch ($this->attributes['operator']) {
            case 'not':
            case '!':
                return !$value;
            case '-':
                return -$value;
        }
        return $value;
    }
    public function toArray()
    {
        return ['(', $this->attributes['operator'] . ' ', $this->nodes['node'], ')'];
    }
}
