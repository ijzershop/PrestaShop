<?php
/**
 * Mollie       https://www.mollie.nl
 *
 * @author      Mollie B.V. <info@mollie.nl>
 * @copyright   Mollie B.V.
 *
 * @license     https://github.com/mollie/PrestaShop/blob/master/LICENSE.md
 *
 * @see        https://github.com/mollie/PrestaShop
 * @codingStandardsIgnoreStart
 */

namespace Mollie\Verification\OrderTotal;

use Mollie\Exception\OrderTotalRestrictionException;

interface OrderTotalVerificationInterface
{
    /**
     * @return bool
     *
     * @throws OrderTotalRestrictionException
     */
    public function verify();
}
