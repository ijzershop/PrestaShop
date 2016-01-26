<?php
/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2015 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
namespace PrestaShopBundle\Form\Admin\Product;

use PrestaShopBundle\Form\Admin\Type\CommonAbstractType;
use PrestaShopBundle\Form\Admin\Type\TranslateType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type as FormType;

/**
 * This form class is responsible to generate the product SEO form
 */
class ProductSeo extends CommonAbstractType
{
    private $translator;
    private $locales;

    /**
     * Constructor
     *
     * @param object $translator
     * @param object $legacyContext
     */
    public function __construct($translator, $legacyContext)
    {
        $this->translator = $translator;
        $this->locales = $legacyContext->getLanguages();
    }

    /**
     * {@inheritdoc}
     *
     * Builds form
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('meta_title', new TranslateType(
            FormType\TextType::class,
            array('required' => false),
            $this->locales,
            true
        ), array(
            'label' => $this->translator->trans('Meta title', [], 'AdminProducts'),
            'required' => false
        ))
        ->add('meta_description', new TranslateType(
            FormType\TextType::class,
            array('required' => false),
            $this->locales,
            true
        ), array(
            'label' => $this->translator->trans('Meta description', [], 'AdminProducts'),
            'required' => false
        ))
        ->add('link_rewrite', new TranslateType(
            FormType\TextType::class,
            array(),
            $this->locales,
            true
        ), array('label' => $this->translator->trans('Friendly URL:', [], 'AdminProducts')));
    }

    /**
     * Returns the block prefix of this type.
     *
     * @return string The prefix name
     */
    public function getBlockPrefix()
    {
        return 'product_seo';
    }
}
