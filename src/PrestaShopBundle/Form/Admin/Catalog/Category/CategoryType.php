<?php
/**
 * 2007-2018 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2018 PrestaShop SA
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShopBundle\Form\Admin\Catalog\Category;

use PrestaShopBundle\Form\Admin\Type\Material\MaterialChoiceTableType;
use PrestaShopBundle\Form\Admin\Type\SwitchType;
use PrestaShopBundle\Form\Admin\Type\TranslateTextareaType;
use PrestaShopBundle\Form\Admin\Type\TranslateTextType;
use PrestaShopBundle\Form\Admin\Type\TranslatorAwareType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Translation\TranslatorInterface;

class CategoryType extends TranslatorAwareType
{
    /**
     * @var array
     */
    private $customerGroupChoices;

    /**
     * @param TranslatorInterface $translator
     * @param array $locales
     * @param array $customerGroupChoices
     */
    public function __construct(
        TranslatorInterface $translator,
        array $locales,
        array $customerGroupChoices
    ) {
        parent::__construct($translator, $locales);

        $this->customerGroupChoices = $customerGroupChoices;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TranslateTextType::class, [
                'locales' => $this->locales,
            ])
            ->add('active', SwitchType::class)
            ->add('id_parent',ChoiceType::class)
            ->add('description', TranslateTextareaType::class)
            ->add('cover_image', FileType::class)
            ->add('thumbnail_image', FileType::class)
            ->add('menu_thumbnail_images', FileType::class, [
                'multiple' => true,
            ])
            ->add('meta_title', TranslateTextType::class, [
                'locales' => $this->locales,
            ])
            ->add('meta_description', TranslateTextareaType::class, [
                'locales' => $this->locales,
            ])
            ->add('meta_keyword', TranslateTextType::class, [
                'locales' => $this->locales,
            ])
            ->add('friendly_url', TranslateTextType::class, [
                'locales' => $this->locales,
            ])
            ->add('customer_group_access', MaterialChoiceTableType::class, [
                'choices' => $this->customerGroupChoices,
            ])
            ->add('shop_association', ChoiceType::class)
        ;
    }
}
