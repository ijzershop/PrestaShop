<?php declare(strict_types=1);

namespace PhpParser\Node\Expr\AssignOp;

use PhpParser\Node\Expr\AssignOp;

class Coalesce extends AssignOp
{
    public function getType() : string {
        return 'Expr_AssignOp_Coalesce';
    }
}
