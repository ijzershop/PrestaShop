<?php
/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker <jelmer@ijzershop.nl>
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */
declare(strict_types=1);

namespace MsThemeConfig\Core\Form;


use PrestaShopBundle\Form\Admin\Type\TranslatorAwareType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Builds form for file upload
 */
class OfferIntegrationType extends TranslatorAwareType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('code', TextType::class, [
                'label' => 'Code',
                'help' => 'De code van de offerte',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('name', TextType::class, [
                'label' => 'Naam klant',
                'help' => 'De naam van de klant, (bij invoeren van email adres word deze ook toegevoegd aan het onderstaande email veld)',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('email', TextType::class, [
                'label' => 'Email klant',
                'help' => 'Het email adres van de klant',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ->add('phone', HiddenType::class, [
                'label' => 'Phone',
                'help' => 'Het telefoonnummer van de klant',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'required' => false,
            ])
            ->add('date_exp', DateTimeType::class, [
                'time_widget' => 'single_text',
                'date_widget' => 'single_text',
                'label' => 'Verloopdatum',
                'help' => 'De verloopdatum',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'required' => false,
                'constraints' => [
                    new NotBlank(),
                ],
            ])
            ;
    }
}
