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

use PrestaShop\PrestaShop\Adapter\Shop\Url\ProductProvider;
use PrestaShopBundle\Form\Admin\Type\TranslatorAwareType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * This is the parent product form type
 */
class ProductType extends TranslatorAwareType
{
    /**
     * @var ProductProvider
     */
    private $productUrlProvider;

    /**
     * @param TranslatorInterface $translator
     * @param array $locales
     * @param ProductProvider $productUrlProvider
     */
    public function __construct(
        TranslatorInterface $translator,
        array $locales,
        ProductProvider $productUrlProvider
    ) {
        parent::__construct($translator, $locales);
        $this->productUrlProvider = $productUrlProvider;
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $formIsUsedToEditAProduct = !empty($options['product_id']);
        $builder
            ->add('basic', BasicInformationType::class)
            ->add('stock', StockType::class)
            ->add('price', PriceType::class)
            ->add('shipping', ShippingType::class)
            ->add('options', OptionsType::class)
            ->add('seo', SEOType::class)
            ->add('redirect_option', RedirectOptionType::class)
            ->add('suppliers', SuppliersType::class)
            ->add('save', SubmitType::class, [
                'label' => $this->trans('Save', 'Admin.Actions'),
                'attr' => [
                    'disabled' => $formIsUsedToEditAProduct,
                    'data-toggle' => 'pstooltip',
                    'title' => $this->trans('Save the product and stay on the current page: ALT+SHIFT+S', 'Admin.Catalog.Help'),
                ],
            ])
        ;

        if ($formIsUsedToEditAProduct) {
            $builder
                ->add('preview', ButtonType::class, [
                    'label' => $this->trans('Preview', 'Admin.Actions'),
                    'attr' => [
                        'class' => 'btn-secondary',
                        'data-seo-url' => $this->productUrlProvider->getUrl((int) $options['product_id'], '{friendly-url}'),
                    ],
                ])
            ;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        if (!empty($options['product_id'])) {
            $view->vars = array_replace($view->vars, [
                'attr' => [
                    'data-product-id' => $options['product_id'],
                ],
            ]);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        parent::configureOptions($resolver);

        $resolver->setDefaults([
            'product_id' => null,
        ]);
        $resolver->setAllowedTypes('product_id', ['null', 'int']);
    }
}
