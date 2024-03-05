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
use PrestaShop\PrestaShop\Core\Cart\Calculator as CalculatorCore;
use PrestaShop\PrestaShop\Core\Cart\CartRowCollection;
use PrestaShop\PrestaShop\Core\Localization\CLDR\ComputingPrecision;

class Calculator
{
    /** @var Calculator|null */
    public static $instance;

    /**
     * @var \KlCartRuleExtender
     */
    protected $moduleClass;

    /**
     * @var CalculatorCore
     */
    protected $calculator;

    /**
     * @var CartRuleCalculator
     */
    protected $cartRuleCalculator;

    /**
     * @var bool
     */
    public $isProcessed = false;

    /**
     * @param \KlCartRuleExtender $moduleClass
     */
    public function __construct($moduleClass)
    {
        $this->moduleClass = $moduleClass;
        $this->cartRuleCalculator = new CartRuleCalculator();
    }

    /**
     * @return \KlCartRuleExtender
     */
    public function getModuleClass()
    {
        return $this->moduleClass;
    }

    /**
     * @param CalculatorCore $calculator
     *
     * @return Calculator
     */
    public function setCalculator($calculator)
    {
        $this->calculator = $calculator;

        return $this;
    }

    /**
     * @return CalculatorCore
     */
    public function getCalculator()
    {
        return $this->calculator;
    }

    /**
     * @return array
     */
    public function getCartRules()
    {
        $cartRules = [];

        foreach ($this->cartRuleCalculator->getCartRulesData() as $cartRuleData) {
            $cartRules[] = $cartRuleData->getRuleData();
        }

        return $cartRules;
    }

    /**
     * @return CartRowCollection|null
     */
    public function getCartRows()
    {
        return $this->getCalculatorCoreProperty('cartRows');
    }

    /**
     * @return int|null
     */
    public function getComputePrecision()
    {
        return $this->getCalculatorCoreProperty('computePrecision');
    }

    /**
     * @param string $propertyName
     *
     * @return mixed|null
     */
    private function getCalculatorCoreProperty($propertyName)
    {
        if (!property_exists(CalculatorCore::class, $propertyName)) {
            return null;
        }

        $reflection = new \ReflectionClass($this->calculator);
        $property = $reflection->getProperty($propertyName);
        $property->setAccessible(true);

        return $property->getValue($this->calculator);
    }

    /**
     * @return Calculator
     */
    public function process()
    {
        $this->calculator->processCalculation();
        $this->calculateCartRules();
        $this->isProcessed = true;

        return $this;
    }

    public function calculateCartRules()
    {
        $cartRows = $this->getCartRows() ?? new CartRowCollection();

        $this->cartRuleCalculator->setCartRules($this->calculator->getCartRulesData())
            ->setCartRows($cartRows)
            ->setCalculator($this)
            ->applyCartRules();
    }

    /**
     * @param bool $ignoreProcessedFlag force getting total even if calculation was not made internally
     *
     * @return AmountImmutable
     *
     * @throws \Exception
     */
    public function getTotal($ignoreProcessedFlag = false)
    {
        if (!$this->isProcessed && !$ignoreProcessedFlag) {
            throw new \Exception('Cart must be processed before getting its total');
        }

        $amount = $this->calculator->getRowTotalWithoutDiscount();
        $amount = $amount->sub($this->rounded($this->getDiscountTotal()));
        $shippingFees = $this->calculator->getFees()->getInitialShippingFees();
        if (null !== $shippingFees) {
            $amount = $amount->add($this->rounded($shippingFees));
        }
        $wrappingFees = $this->calculator->getFees()->getFinalWrappingFees();
        if (null !== $wrappingFees) {
            $amount = $amount->add($this->rounded($wrappingFees));
        }

        return $amount;
    }

    /**
     * @return AmountImmutable
     *
     * @throws \Exception
     */
    public function getRowTotalWithoutDiscount()
    {
        return $this->calculator->getRowTotalWithoutDiscount();
    }

    /**
     * @return AmountImmutable
     *
     * @throws \Exception
     */
    public function getDiscountTotal()
    {
        $amount = new AmountImmutable();
        $isFreeShippingAppliedToAmount = false;
        foreach ($this->cartRuleCalculator->getCartRulesData() as $cartRule) {
            if ((bool) $cartRule->getRuleData()['free_shipping']) {
                if ($isFreeShippingAppliedToAmount) {
                    $initialShippingFees = $this->calculator->getFees()->getInitialShippingFees();
                    $amount = $amount->sub($initialShippingFees);
                }
                $isFreeShippingAppliedToAmount = true;
            }

            $amount = $amount->add($cartRule->getDiscountApplied());
        }

        $allowedMaxDiscount = $this->calculator->getRowTotalWithoutDiscount()
            ->add($this->cartRuleCalculator->getAllowedMaxDiscountFees())
        ;

        // discount cannot be above total cart price
        if ($amount > $allowedMaxDiscount) {
            $amount = $allowedMaxDiscount;
        }

        return $amount;
    }

    /**
     * @param AmountImmutable $amount
     *
     * @return AmountImmutable
     */
    public function rounded(AmountImmutable $amount)
    {
        $computePrecision = $this->getComputePrecision();

        if (null === $computePrecision) {
            $currency = new \Currency((int) $this->calculator->getCart()->id_currency);
            $computePrecision = (new ComputingPrecision())->getPrecision($currency->precision);
        }

        return new AmountImmutable(
            \Tools::ps_round($amount->getTaxIncluded(), $computePrecision),
            \Tools::ps_round($amount->getTaxExcluded(), $computePrecision)
        );
    }
}
