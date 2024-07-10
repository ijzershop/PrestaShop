<?php
/**
* 2022 - Keyrnel
*
* NOTICE OF LICENSE
*
* The source code of this module is under a commercial license.
* Each license is unique and can be installed and used on only one shop.
* Any reproduction or representation total or partial of the module, one or more of its components,
* by any means whatsoever, without express permission from us is prohibited.
* If you have not received this module from us, thank you for contacting us.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade this module to newer
* versions in the future.
*
* @author    Keyrnel
* @copyright 2022 - Keyrnel
* @license   commercial
* International Registered Trademark & Property of Keyrnel
*/

namespace Keyrnel\CartRuleExtender\Core\Cart;

use PrestaShop\PrestaShop\Core\Cart\AmountImmutable;
use PrestaShop\PrestaShop\Core\Cart\CartRowCollection;
use PrestaShop\PrestaShop\Core\Cart\CartRuleCollection;
use PrestaShop\PrestaShop\Core\Cart\CartRuleData;

class CartRuleCalculator
{
    /**
     * @var Calculator
     */
    protected $calculator;

    /**
     * @var CartRowCollection
     */
    protected $cartRows;

    /**
     * @var CartRuleCollection
     */
    protected $cartRules;

    /**
     * @var bool
     */
    protected $isFreeShipping = false;

    /**
     * @var bool
     */
    protected $includeShipping;

    /**
     * @var bool
     */
    protected $includeWrapping;

    /**
     * @var AmountImmutable
     */
    protected $remainingFeesAmount;

    /**
     * @var AmountImmutable
     */
    protected $totalRowAmount;

    /**
     * @var AmountImmutable
     */
    protected $totalDiscountAmount;

    public function __construct()
    {
        $this->includeShipping = (bool) \Configuration::get('KL_CART_RULE_EXTENDER_SHIPPING_FEES');
        $this->includeWrapping = (bool) \Configuration::get('KL_CART_RULE_EXTENDER_WRAPPING_FEES');
    }

    /**
     * @param CartRuleCollection $cartRules
     *
     * @return CartRuleCalculator
     */
    public function setCartRules(CartRuleCollection $cartRules)
    {
        $this->cartRules = $cartRules;

        return $this;
    }

    /**
     * @return CartRuleCollection
     */
    public function getCartRulesData()
    {
        return $this->cartRules;
    }

    /**
     * @param Calculator $calculator
     *
     * @return CartRuleCalculator
     */
    public function setCalculator($calculator)
    {
        $this->calculator = $calculator;

        return $this;
    }

    /**
     * @param CartRowCollection $cartRows
     *
     * @return CartRuleCalculator
     */
    public function setCartRows(CartRowCollection $cartRows)
    {
        $this->cartRows = $cartRows;

        return $this;
    }

    /**
     * process cart rules calculation
     */
    public function applyCartRules()
    {
        $this->remainingFeesAmount = (new AmountImmutable())
            ->add($this->getFinalShippingFees())
            ->add($this->getFinalWrappingFees())
        ;

        $this->totalRowAmount = $this->calculator->getCalculator()->getRowTotalWithoutDiscount();
        $this->totalDiscountAmount = $this->calculator->getCalculator()->getDiscountTotal();

        foreach ($this->cartRules as $cartRule) {
            if ((bool) $cartRule->getRuleData()['free_shipping'] && !$this->isFreeShipping) {
                $this->isFreeShipping = true;
                break;
            }
        }

        foreach ($this->cartRules as $cartRule) {
            $this->applyCartRule($cartRule);
        }
    }

    /**
     * @param CartRuleData $cartRuleData
     *
     * @throws \PrestaShopDatabaseException
     */
    protected function applyCartRule(CartRuleData $cartRuleData)
    {
        $cartRule = $cartRuleData->getCartRule();
        $cart = $this->calculator->getCalculator()->getCart();

        if (!\CartRule::isFeatureActive()) {
            return;
        }

        if ($cartRule->reduction_amount > 0
            && $cartRule->reduction_product == 0
            && $this->calculator->getModuleClass()->isCartRuleIncludingFees($cartRule->id)
        ) {
            // currency conversion
            $discountConverted = $this->convertAmountBetweenCurrencies(
                $cartRule->reduction_amount,
                new \Currency($cartRule->reduction_currency),
                new \Currency($cart->id_currency)
            );

            $remainingDiscount = $discountConverted - ($cartRule->reduction_tax
                ? $cartRuleData->getDiscountApplied()->getTaxIncluded()
                : $cartRuleData->getDiscountApplied()->getTaxExcluded()
            );

            $remainingFees = $cartRule->reduction_tax
                ? $this->remainingFeesAmount->getTaxIncluded()
                : $this->remainingFeesAmount->getTaxExcluded()
            ;

            $newDiscount = max(0, min($remainingDiscount, $remainingFees));

            if ($newDiscount > 0) {
                $discountAmount = $this->calculateDiscountAmount($cartRuleData->getDiscountApplied(), $newDiscount, $cartRule->reduction_tax);

                $cartRuleData->addDiscountApplied($discountAmount);
                $this->remainingFeesAmount = $this->remainingFeesAmount->sub($discountAmount);
                $this->totalDiscountAmount = $this->totalDiscountAmount->add($discountAmount);
            }
        }

        $ruleData = $cartRuleData->getRuleData();
        $ruleData['value_real'] = $cartRuleData->getDiscountApplied()->getTaxIncluded();
        $ruleData['value_tax_exc'] = $cartRuleData->getDiscountApplied()->getTaxExcluded();
        $cartRuleData->setRuleData($ruleData);
    }

    /**
     * @param float $amount
     * @param \Currency $currencyFrom
     * @param \Currency $currencyTo
     *
     * @return float
     */
    protected function convertAmountBetweenCurrencies($amount, \Currency $currencyFrom, \Currency $currencyTo)
    {
        if ($amount == 0 || $currencyFrom->conversion_rate == 0) {
            return 0;
        }

        // convert to default currency
        $amount /= $currencyFrom->conversion_rate;
        // convert to destination currency
        $amount *= $currencyTo->conversion_rate;

        return $amount;
    }

    /**
     * @param AmountImmutable $discountApplied
     * @param mixed $newDiscount
     * @param bool $withTaxes
     *
     * @return AmountImmutable
     */
    public function calculateDiscountAmount(AmountImmutable $discountApplied, $newDiscount, $withTaxes)
    {
        $previousTotalDiscountAmount = $this->calculator->rounded($this->totalDiscountAmount->sub($discountApplied));
        $totalRowAmount = $this->calculator->rounded($this->totalRowAmount);
        $totalRowWithShippingAmount = $totalRowAmount->add($this->getInitialShippingFees());

        if ($withTaxes) {
            $totalRowWithShipping = $totalRowWithShippingAmount->getTaxIncluded();
            $previousTotalDiscount = $previousTotalDiscountAmount->getTaxIncluded();
            $amount = $newDiscount + $discountApplied->getTaxIncluded();
        } else {
            $totalRowWithShipping = $totalRowWithShippingAmount->getTaxExcluded();
            $previousTotalDiscount = $previousTotalDiscountAmount->getTaxExcluded();
            $amount = $newDiscount + $discountApplied->getTaxExcluded();
        }

        if ($previousTotalDiscount + $amount <= $totalRowWithShipping) {
            $taxRate = 1 + $this->getShippingTaxRate();
            $totalRow = $totalRowAmount;
        } else {
            $taxRate = 1 + $this->getWrappingTaxRate();
            $totalRow = $totalRowWithShippingAmount;
        }

        if ($withTaxes) {
            $newAmount = ($totalRow->getTaxExcluded() - $previousTotalDiscountAmount->getTaxExcluded())
                + (($amount - ($totalRow->getTaxIncluded() - $previousTotalDiscountAmount->getTaxIncluded())) / $taxRate);
        } else {
            $newAmount = ($totalRow->getTaxIncluded() - $previousTotalDiscountAmount->getTaxIncluded())
                + (($amount - ($totalRow->getTaxExcluded() - $previousTotalDiscountAmount->getTaxExcluded())) * $taxRate);
        }

        $amountTaxIncluded = $withTaxes ? $amount : $newAmount;
        $amountTaxExcluded = $withTaxes ? $newAmount : $amount;

        return $this->calculator
            ->rounded(new AmountImmutable($amountTaxIncluded, $amountTaxExcluded))
            ->sub($discountApplied)
        ;
    }

    /**
     * Returns the average Tax rate for shipping, as a multiplier.
     *
     * @return float Average Tax Rate on shipping (eg. 0.2 for 20% average rate)
     */
    public function getShippingTaxRate()
    {
        $amount = $this->calculator->getCalculator()->getFees()->getInitialShippingFees()->getTaxIncluded()
            - $this->calculator->getCalculator()->getFees()->getInitialShippingFees()->getTaxExcluded();

        if (0 == $amount || 0 == $this->calculator->getCalculator()->getFees()->getInitialShippingFees()->getTaxExcluded()) {
            return 0;
        } else {
            return $amount / $this->calculator->getCalculator()->getFees()->getInitialShippingFees()->getTaxExcluded();
        }
    }

    /**
     * Returns the average Tax rate for wrapping, as a multiplier.
     *
     * @return float Average Tax Rate on wrapping (eg. 0.2 for 20% average rate)
     */
    public function getWrappingTaxRate()
    {
        $amount = $this->calculator->getCalculator()->getFees()->getInitialWrappingFees()->getTaxIncluded()
            - $this->calculator->getCalculator()->getFees()->getInitialWrappingFees()->getTaxExcluded();

        if (0 == $amount || 0 == $this->calculator->getCalculator()->getFees()->getInitialWrappingFees()->getTaxExcluded()) {
            return 0;
        } else {
            return $amount / $this->calculator->getCalculator()->getFees()->getInitialWrappingFees()->getTaxExcluded();
        }
    }

    /**
     * @return AmountImmutable
     */
    public function getInitialShippingFees()
    {
        return ((!$this->isFreeShipping && $this->includeShipping) || $this->isFreeShipping)
            ? $this->calculator->getCalculator()->getFees()->getInitialShippingFees()
            : new AmountImmutable(0, 0)
        ;
    }

    /**
     * @return AmountImmutable
     */
    public function getFinalShippingFees()
    {
        return $this->includeShipping
            ? $this->calculator->getCalculator()->getFees()->getFinalShippingFees()
            : new AmountImmutable(0, 0)
        ;
    }

    /**
     * @return AmountImmutable
     */
    public function getFinalWrappingFees()
    {
        return $this->includeWrapping
            ? $this->calculator->getCalculator()->getFees()->getFinalWrappingFees()
            : new AmountImmutable(0, 0)
        ;
    }

    /**
     * @return AmountImmutable
     */
    public function getAllowedMaxDiscountFees()
    {
        $amount = new AmountImmutable(0, 0);

        if ($this->includeShipping || $this->isFreeShipping) {
            $amount = $amount->add($this->calculator->getCalculator()->getFees()->getInitialShippingFees());
        }

        if ($this->includeWrapping) {
            $amount = $amount->add($this->calculator->getCalculator()->getFees()->getInitialWrappingFees());
        }

        return $amount;
    }
}
