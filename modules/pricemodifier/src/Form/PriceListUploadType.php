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

use PrestaShopBundle\Form\Admin\Type\CommonAbstractType;
use PrestaShopBundle\Form\Admin\Type\TranslatorAwareType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Builds form for file upload
 */
class PriceListUploadType extends CommonAbstractType
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
                'mapped' => true,
                'help' => 'Select the file you would like to upload.',
                'translation_domain' => 'Modules.Pricemodifier.Admin',
                'constraints' => [
                    new NotBlank(),
                    new File([
                        'maxSize' => '6024k',
//                        'mimeTypes' => [
//                            'application/xls',
//                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//                        ],
                        'mimeTypesMessage' => 'Please upload a valid Excel document',
                    ])
                ],
            ]);
    }
}
