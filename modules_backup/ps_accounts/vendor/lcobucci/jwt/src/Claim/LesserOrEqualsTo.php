<?php

/**
 * This file is part of Lcobucci\JWT, a simple library to handle JWT and JWS
 *
 * @license http://opensource.org/licenses/BSD-3-Clause BSD-3-Clause
 */
namespace PrestaShop\Module\PsAccounts\Vendor\Lcobucci\JWT\Claim;

use PrestaShop\Module\PsAccounts\Vendor\Lcobucci\JWT\Claim;
use PrestaShop\Module\PsAccounts\Vendor\Lcobucci\JWT\ValidationData;
/**
 * Validatable claim that checks if value is lesser or equals to the given data
 *
 * @deprecated This class will be removed on v4
 *
 * @author Luís Otávio Cobucci Oblonczyk <lcobucci@gmail.com>
 * @since 2.0.0
 */
class LesserOrEqualsTo extends Basic implements Claim, Validatable
{
    /**
     * {@inheritdoc}
     */
    public function validate(ValidationData $data)
    {
        if ($data->has($this->getName())) {
            return $this->getValue() <= $data->get($this->getName());
        }
        return \true;
    }
}
