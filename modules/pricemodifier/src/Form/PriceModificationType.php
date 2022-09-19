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

namespace Modernesmid\Module\Pricemodifier\Form;

use PrestaShopBundle\Form\Admin\Type\TranslatorAwareType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Builds form for file upload
 */
class PriceModificationType extends TranslatorAwareType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('file_supplier', ChoiceType::class, [
                'label' => 'Supplier Name',
                'help' => 'Supplier name of the uploaded supplier price list',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'constraints' => [
                    new NotBlank(),
                ],
                'choices' => [
                    'Douma' => 'douma',
                    'MCB' => 'mcb',
                    'Indi' => 'indi'
                ],
            ])
            ->add('uploaded_file', FileType::class, [
                'label' => 'File',
                'help' => 'Select the file you would like to upload.',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'constraints' => [
                    new NotBlank(),
                ],
            ]);
    }
}
