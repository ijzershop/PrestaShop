<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

declare(strict_types=1);

namespace PrestaShopBundle\Form\Admin\Sell\Product;

use PrestaShop\PrestaShop\Core\Form\FormChoiceProviderInterface;
use PrestaShopBundle\Form\Admin\Type\TranslatorAwareType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Translation\TranslatorInterface;

class SuppliersType extends TranslatorAwareType
{
    /**
     * @var FormChoiceProviderInterface
     */
    private $supplierNameByIdChoiceProvider;

    /**
     * @param TranslatorInterface $translator
     * @param array $locales
     * @param FormChoiceProviderInterface $supplierNameByIdChoiceProvider
     */
    public function __construct(
        TranslatorInterface $translator,
        array $locales,
        FormChoiceProviderInterface $supplierNameByIdChoiceProvider
    ) {
        parent::__construct($translator, $locales);
        $this->supplierNameByIdChoiceProvider = $supplierNameByIdChoiceProvider;
    }

    /**
     * {@inheritDoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $suppliers = $this->supplierNameByIdChoiceProvider->getChoices();

        $builder
            ->add('supplier_ids', ChoiceType::class, [
                'choices' => $suppliers,
                'expanded' => true,
                'multiple' => true,
                'required' => false,
                'label' => $this->trans('Choose the suppliers associated with this product', 'Admin.Catalog.Feature'),
            ])
            ->add('default_supplier_id', ChoiceType::class, [
                'choices' => $suppliers,
                'expanded' => true,
                'label' => $this->trans('Default supplier', 'Admin.Catalog.Feature'),
            ])
            ->add('supplier_references', CollectionType::class, [
                'label' => false,
                'entry_type' => SupplierReferencesType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'prototype_name' => '__SUPPLIER_REFERENCE_PROTOTYPE__',
            ])
        ;
    }
}
