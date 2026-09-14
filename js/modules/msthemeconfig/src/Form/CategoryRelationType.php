<?php
declare(strict_types=1);

namespace MsThemeConfig\Form;

use MsThemeConfig\Category\CategoryRelationRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Range;
use Symfony\Component\Validator\Constraints\Regex;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/** One selected category and the editor's explanation of its relevance. */
final class CategoryRelationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $unavailable = $options['unavailable_ids'];
        $builder
            ->add('id_related_category', ChoiceType::class, [
                'label' => 'Categorie',
                'choices' => $options['category_choices'],
                'choice_translation_domain' => false,
                'placeholder' => 'Kies een aanvullende categorie',
                'required' => true,
                'invalid_message' => 'Kies een beschikbare categorie uit deze winkel.',
                'constraints' => [new NotBlank(['message' => 'Kies een categorie of verwijder deze regel.'])],
                'choice_attr' => static function ($choice) use ($unavailable): array {
                    return isset($unavailable[(int) $choice]) ? ['disabled' => 'disabled'] : [];
                },
            ])
            ->add('note', TextareaType::class, [
                'label' => 'Toelichting (optioneel)',
                'required' => false,
                'empty_data' => '',
                'attr' => [
                    'rows' => 2,
                    'maxlength' => CategoryRelationRepository::MAX_NOTE_LENGTH,
                    'placeholder' => 'Bijvoorbeeld: bevestigingsmateriaal voor projecten met boutverbindingen.',
                ],
                'constraints' => [
                    new Length([
                        'max' => CategoryRelationRepository::MAX_NOTE_LENGTH,
                        'maxMessage' => 'Gebruik maximaal {{ limit }} tekens voor de toelichting.',
                    ]),
                    new Callback(static function ($note, ExecutionContextInterface $context): void {
                        $decoded = html_entity_decode((string) $note, ENT_QUOTES | ENT_HTML5, 'UTF-8');
                        if (!mb_check_encoding((string) $note, 'UTF-8')
                            || preg_match('/[<>\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', $decoded)) {
                            $context->buildViolation('Schrijf de toelichting als gewone tekst, zonder HTML.')->addViolation();
                        }
                    }),
                ],
            ])
            ->add('position', HiddenType::class, [
                'empty_data' => '0',
                'attr' => ['data-ms-relation-position' => '1'],
                'constraints' => [
                    new Regex(['pattern' => '/^(0|[1-9][0-9]*)$/D', 'message' => 'De volgorde is ongeldig.']),
                    new Range(['min' => 0, 'max' => CategoryRelationRepository::MAX_RELATIONS - 1]),
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'category_choices' => [],
            'unavailable_ids' => [],
            'data_class' => null,
            'label' => false,
            'translation_domain' => false,
            'attr' => ['data-ms-relation-row' => '1', 'class' => 'border rounded p-3 mb-3'],
        ]);
        $resolver->setAllowedTypes('category_choices', 'array');
        $resolver->setAllowedTypes('unavailable_ids', 'array');
    }
}
