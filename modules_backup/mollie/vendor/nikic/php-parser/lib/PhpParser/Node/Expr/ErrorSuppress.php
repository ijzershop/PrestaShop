<?php declare(strict_types=1);

namespace PhpParser\Node\Expr;

use PhpParser\Node\Expr;

class ErrorSuppress extends Expr
{
    /** @var Expr Expression */
    public $expr;

    /**
     * Constructs an error suppress node.
     *
     * @param Expr  $expr       Expression
     * @param array $attributes Additional attributes
     */
    public function __construct(Expr $expr, array $attributes = []) {
        $this->attributes = $attributes;
        $this->expr = $expr;
    }

    public function getSubNodeNames() : array {
        return ['expr'];
    }
    
    public function getType() : string {
        return 'Expr_ErrorSuppress';
    }
}
