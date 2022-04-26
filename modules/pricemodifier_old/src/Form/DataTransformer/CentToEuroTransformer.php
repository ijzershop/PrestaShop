<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

namespace Modernesmid\Module\Pricemodifier\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;

class CentToEuroTransformer implements DataTransformerInterface
{
    /**
     * Transforms cent to euro amount.
     *
     * @param int|null $priceInCent
     *
     * @return string
     */
    public function transform($priceInCent)
    {
        if (null === $priceInCent) {
            return '0';
        }

        $priceInEuro = number_format(($priceInCent / 100), 2, '.', ' ');

        return $priceInEuro;
    }

    /**
     * Transforms euro to cent amount.
     *
     * @param float|null $priceInEuro
     *
     * @return int
     */
    public function reverseTransform($priceInEuro)
    {
        if (null === $priceInEuro) {
            return 0;
        }

        $priceInCent = (int) ($priceInEuro * 100);

        return $priceInCent;
    }
}
