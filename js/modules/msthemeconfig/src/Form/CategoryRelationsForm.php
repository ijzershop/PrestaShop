<?php
declare(strict_types=1);

namespace MsThemeConfig\Form;

use MsThemeConfig\Category\CategoryRelationRepository;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Constraints\Count;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/** Configures the collection on both normal and root category forms. */
final class CategoryRelationsForm
{
    public const FIELD_NAME = 'ms_related_categories';

    public static function addTo(
        FormBuilderInterface $builder,
        int $sourceId,
        array $relations,
        array $categories,
        bool $editable
    ): void {
        $existingIds = array_fill_keys(array_map(static fn (array $row): int => (int) $row['id_related_category'], $relations), true);
        $choices = [];
        $unavailable = [];
        foreach ($categories as $category) {
            $id = (int) $category['id_category'];
            if ($id === $sourceId) {
                continue;
            }
            $name = self::extendedName((string) ($category['second_name'] ?? ''));
            if ($name === '') {
                $name = trim((string) ($category['name'] ?? ''));
            }
            $parent = trim((string) ($category['parent_name'] ?? ''));
            $label = $name . ($parent !== '' ? ' — ' . $parent : '') . ' (#' . $id . ')';
            if (empty($category['active'])) {
                $label .= ' [inactief/niet zichtbaar; niet gebruikt bij generatie]';
                if (!isset($existingIds[$id])) {
                    $unavailable[$id] = true;
                }
            }
            $choices[$label] = $id;
        }
        foreach ($existingIds as $id => $unused) {
            if (!in_array($id, $choices, true)) {
                $choices['Categorie #' . $id . ' [niet beschikbaar; verwijder deze koppeling]'] = $id;
                $unavailable[$id] = true;
            }
        }

        $help = $editable
            ? 'Koppelingen zijn optioneel. Koppel maximaal ' . CategoryRelationRepository::MAX_RELATIONS . ' aanvullende categorieën aan deze categorie. '
                . 'De koppeling geldt alleen in deze richting en voor de geselecteerde winkel. '
                . 'Geef eventueel aan waarom de categorie past; de generator gebruikt dit bij een volgende generatie. '
                . 'Bestaande teksten blijven staan. Inactieve of niet zichtbare categorieën worden overgeslagen.'
            : 'Selecteer één winkel in de winkelkeuze bovenaan om aanvullende categorieën te bekijken en te wijzigen. '
                . 'In de context Alle winkels of een winkelgroep worden geen koppelingen opgeslagen.';

        $builder->add(self::FIELD_NAME, CollectionType::class, [
            'label' => 'Aanvullende categorieën',
            'translation_domain' => false,
            'required' => false,
            'disabled' => !$editable,
            'entry_type' => CategoryRelationType::class,
            'entry_options' => ['category_choices' => $choices, 'unavailable_ids' => $unavailable, 'label' => false],
            'allow_add' => $editable,
            'allow_delete' => $editable,
            'by_reference' => false,
            'error_bubbling' => false,
            'help' => $help,
            'attr' => [
                'data-ms-category-relations' => '1',
                'data-enabled' => $editable ? '1' : '0',
                'data-max-relations' => CategoryRelationRepository::MAX_RELATIONS,
                'data-help' => $help,
            ],
            'constraints' => [
                new Count([
                    'max' => CategoryRelationRepository::MAX_RELATIONS,
                    'maxMessage' => 'Koppel maximaal {{ limit }} aanvullende categorieën.',
                ]),
                new Callback(static function ($rows, ExecutionContextInterface $context) use ($sourceId, $unavailable): void {
                    $seen = [];
                    foreach (is_array($rows) ? $rows : [] as $row) {
                        $id = (int) ($row['id_related_category'] ?? 0);
                        if ($id <= 0) {
                            continue; // ChoiceType reports missing or invalid choices on their own row.
                        }
                        if ($id === $sourceId) {
                            $context->buildViolation('Een categorie kan niet naar zichzelf verwijzen.')->addViolation();
                        } elseif (isset($seen[$id])) {
                            $context->buildViolation('Kies elke aanvullende categorie slechts één keer.')->addViolation();
                        } elseif (isset($unavailable[$id])) {
                            $context->buildViolation('Verwijder niet-beschikbare koppelingen. Nieuwe koppelingen zijn alleen mogelijk naar actieve categorieën.')->addViolation();
                        }
                        $seen[$id] = true;
                    }
                }),
            ],
        ]);
    }

    /** Treat empty editor markup and Unicode spacing like an absent second name. */
    private static function extendedName(string $value): string
    {
        $value = strip_tags(html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        $value = (string) preg_replace('/[\x{200B}\x{FEFF}]/u', '', $value);
        return trim((string) preg_replace('/[\s\p{Z}]+/u', ' ', $value));
    }
}
