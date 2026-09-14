<?php
declare(strict_types=1);

namespace PrestaShopBundle\Form\Admin\Sell\Product\Pricing;

use MsThemeConfig\Form\Admin\Sell\Product\Pricing\CatalogPriceRulesTypeOverride as MsCatalogPriceRulesTypeOverride;
use PrestaShop\PrestaShop\Adapter\LegacyContext;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Bridge override class.
 *
 * Why this file exists:
 * - Some core/legacy code paths (or parent classes) may instantiate the
 *   form type by FQCN directly instead of through the Symfony service
 *   container. When that happens, a service-based override alone is not
 *   enough.
 * - This file re-declares the core FQCN and proxies to the module
 *   implementation while keeping the original constructor signature
 *   (translator, locales array, legacyContext) so any direct instantiation
 *   keeps working without modifying core.
 */
class CatalogPriceRulesType extends MsCatalogPriceRulesTypeOverride
{
    /**
     * Keep the original signature to be compatible with any direct usages.
     * The $locales parameter is ignored because the module implementation
     * builds locales from LegacyContext to avoid missing container params.
     *
     * @param TranslatorInterface $translator
     * @param array $locales (ignored)
     * @param LegacyContext $legacyContext
     */
    public function __construct(
        TranslatorInterface $translator,
        array $locales,
        LegacyContext $legacyContext
    ) {
        parent::__construct($translator, $legacyContext);
    }
}
