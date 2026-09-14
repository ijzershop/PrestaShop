<?php
declare(strict_types=1);

/** Run with PHP CLI; uses the application's Symfony Form and Validator components. */
if (PHP_SAPI !== 'cli') { exit(1); }

use MsThemeConfig\Form\CategoryRelationsForm;
use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Validator\ValidatorExtension;
use Symfony\Component\Form\Forms;
use Symfony\Component\Validator\Validation;

$applicationRoot = dirname(__DIR__, 5);
require $applicationRoot . '/vendor/autoload.php';
require __DIR__ . '/../src/Category/CategoryRelationRepository.php';
require __DIR__ . '/../src/Form/CategoryRelationType.php';
require __DIR__ . '/../src/Form/CategoryRelationsForm.php';
require __DIR__ . '/../src/Form/CategoryDescriptionConstraints.php';

function check(bool $condition, string $message): void
{
    if (!$condition) { throw new RuntimeException($message); }
}

$factory = Forms::createFormFactoryBuilder()
    ->addExtension(new ValidatorExtension(Validation::createValidator()))
    ->getFormFactory();
$categories = [
    ['id_category' => 10, 'name' => 'Eigen categorie', 'second_name' => '', 'parent_name' => 'Staal', 'active' => true],
    ['id_category' => 11, 'name' => 'Bouten', 'second_name' => 'RVS bouten', 'parent_name' => 'Bevestiging', 'active' => true],
    ['id_category' => 12, 'name' => 'Moeren', 'second_name' => '', 'parent_name' => 'Bevestiging', 'active' => true],
    ['id_category' => 13, 'name' => 'Ring <oud>', 'second_name' => '', 'parent_name' => '', 'active' => false],
    ['id_category' => 14, 'name' => 'Verborgen', 'second_name' => '', 'parent_name' => '', 'active' => false],
];
$emptySecondNames = [null, '', " \t\r\n", "\u{00A0}", '&nbsp;', '&#160;', '<p>&nbsp;</p>', '&lt;p&gt;&lt;/p&gt;', '<br>', "\u{200B}\u{FEFF}"];
foreach ($emptySecondNames as $index => $secondName) {
    $categories[] = ['id_category' => 20 + $index, 'name' => 'Normale naam ' . $index, 'second_name' => $secondName, 'active' => true];
}
$categories[] = ['id_category' => 30, 'name' => 'Naam zonder tweede veld', 'active' => true];
$categories[] = ['id_category' => 31, 'name' => 'Bouten', 'second_name' => "\u{00A0}RVS&nbsp;bouten\u{200B}", 'active' => true];
$stored = [['id_related_category' => 13, 'note' => 'Bestaande koppeling', 'position' => 0]];
$make = static function (array $relations = [], bool $editable = true, string $name = 'category') use ($factory, $categories) {
    $builder = $factory->createNamedBuilder($name, FormType::class, [CategoryRelationsForm::FIELD_NAME => $relations]);
    CategoryRelationsForm::addTo($builder, 10, $relations, $categories, $editable);
    return $builder->getForm();
};
$submit = static function (array $rows, array $initial = [], bool $editable = true) use ($make) {
    $form = $make($initial, $editable);
    $form->submit([CategoryRelationsForm::FIELD_NAME => $rows]);
    return $form;
};
$row = static fn (int $id, string $note = '', int $position = 0): array => [
    'id_related_category' => (string) $id, 'note' => $note, 'position' => (string) $position,
];

try {
    $validator = Validation::createValidator();
    $byteConstraint = MsThemeConfig\Form\CategoryDescriptionConstraints::byteLimit();
    $maxBytes = MsThemeConfig\Form\CategoryDescriptionConstraints::MAX_BYTES;
    check(count($validator->validate('<p>' . str_repeat('Technische uitleg. ', 300) . '</p>', $byteConstraint)) === 0, 'Long generated descriptions remain editable.');
    $exactHtml = '<p>' . str_repeat('a', $maxBytes - 7) . '</p>';
    check(count($validator->validate($exactHtml, $byteConstraint)) === 0, 'The full MEDIUMTEXT byte capacity is available, including HTML.');
    check(count($validator->validate($exactHtml . 'a', $byteConstraint)) === 1, 'Raw HTML exceeding the byte capacity is rejected.');
    unset($exactHtml);
    check(count($validator->validate(str_repeat('é', intdiv($maxBytes, 2) + 1), $byteConstraint)) === 1, 'Multibyte text is limited by bytes, not visible characters.');
    $form = $make($stored);
    $choiceViews = $form->createView()[CategoryRelationsForm::FIELD_NAME][0]['id_related_category']->vars['choices'];
    $labels = [];
    $attributes = [];
    foreach ($choiceViews as $view) { $labels[(int) $view->value] = $view->label; $attributes[(int) $view->value] = $view->attr; }
    check(!isset($labels[10]), 'Self category must not be offered.');
    check(str_contains($labels[11], 'RVS bouten') && str_contains($labels[11], 'Bevestiging') && str_contains($labels[11], '#11'), 'Second name and unambiguous parent/ID label.');
    check(str_contains($labels[12], 'Moeren'), 'Normal name fallback.');
    foreach ($emptySecondNames as $index => $unused) {
        check(str_starts_with($labels[20 + $index], 'Normale naam ' . $index . ' (#'), 'Empty/missing/Unicode/markup-only second name must fall back to the normal name: ' . $index);
    }
    check(str_starts_with($labels[30], 'Naam zonder tweede veld (#'), 'Missing second_name field must fall back to the normal name.');
    check(str_starts_with($labels[31], 'RVS bouten (#'), 'An extended name with HTML entities and Unicode spacing remains readable.');
    check(str_contains($labels[13], 'inactief') && !isset($attributes[13]['disabled']), 'Existing inactive selection is labelled and retainable.');
    check(isset($attributes[14]['disabled']), 'New inactive target is disabled.');

    $valid = $submit([$row(12, 'Voor boutverbindingen', 0), $row(11, '', 1)]);
    check($valid->isValid(), 'Valid selections and explanation should pass.');
    check($valid->getData()[CategoryRelationsForm::FIELD_NAME][0]['id_related_category'] === 12, 'Validated data uses the selected integer category ID.');
    check($submit($stored, $stored)->isValid(), 'An existing inactive connection can be retained.');
    check(!$submit([$row(14)])->isValid(), 'Crafted new inactive connection is rejected.');
    check(!$submit([$row(11), $row(11, '', 1)])->isValid(), 'Duplicate connections are rejected.');
    check(!$submit([$row(10)])->isValid(), 'Self connection is rejected.');
    check(!$submit([$row(9999)])->isValid(), 'Unknown/other-shop category is rejected.');
    check(!$submit([$row(11, '<script>bad</script>')])->isValid(), 'HTML explanation is rejected.');
    check(!$submit([$row(11, '&lt;b&gt;bad&lt;/b&gt;')])->isValid(), 'Encoded HTML explanation is rejected before persistence.');
    check(!$submit([$row(11, str_repeat('é', 501))])->isValid(), 'Explanation is limited by Unicode character count.');
    check(!$submit([$row(11, '', -1)])->isValid(), 'Invalid position is rejected.');
    $tooMany = [];
    for ($i = 0; $i < 21; ++$i) { $tooMany[] = $row(11, '', $i); }
    check(!$submit($tooMany)->isValid(), 'More than twenty relations is rejected.');

    $empty = $submit([], $stored);
    check($empty->isValid() && $empty->getData()[CategoryRelationsForm::FIELD_NAME] === [], 'Removing every relation produces an explicit empty array.');
    $optional = $submit([]);
    check($optional->isValid() && $optional->getData()[CategoryRelationsForm::FIELD_NAME] === [], 'A category needs no related-category selections.');
    foreach (['category', 'root_category'] as $formName) {
        $unselected = $make([], true, $formName);
        $unselected->submit([]);
        check($unselected->isValid() && $unselected->getData()[CategoryRelationsForm::FIELD_NAME] === [], 'A missing optional collection is accepted in ' . $formName . '.');
    }
    $noChoicesBuilder = $factory->createNamedBuilder('category', FormType::class, [CategoryRelationsForm::FIELD_NAME => []]);
    CategoryRelationsForm::addTo($noChoicesBuilder, 10, [], [], true);
    $noChoices = $noChoicesBuilder->getForm();
    $noChoices->submit([]);
    check($noChoices->isValid(), 'An optional collection with no available categories is accepted.');
    $absent = $make($stored);
    $absent->submit([]);
    check($absent->isValid() && $absent->getData()[CategoryRelationsForm::FIELD_NAME] === [], 'Native browser omission after removing every row clears the collection.');
    $disabled = $submit([$row(11)], [], false);
    check($disabled->isValid() && $disabled->getData()[CategoryRelationsForm::FIELD_NAME] === [], 'All-shops/group field ignores crafted submission.');
    check(!$make([], false)->createView()[CategoryRelationsForm::FIELD_NAME]->vars['allow_add'], 'All-shops/group context has no add prototype.');
    $stale = [$row(9999, 'Niet meer beschikbaar')];
    check(!$submit($stale, $stale)->isValid(), 'Stale links require explicit removal.');
    check($submit([], $stale)->isValid(), 'A stale link can be removed.');
    $failed = $submit([$row(11, 'Bewaar deze toelichting'), $row(11, 'Dubbel', 1)]);
    check($failed->get(CategoryRelationsForm::FIELD_NAME)->get('0')->get('note')->getData() === 'Bewaar deze toelichting', 'Failed validation preserves edited explanation.');

    if (in_array('--render', $argv, true)) {
        $loader = new Twig\Loader\FilesystemLoader($applicationRoot . '/vendor/symfony/twig-bridge/Resources/views/Form');
        $useShopTheme = in_array('--prestashop', $argv, true);
        if ($useShopTheme) {
            $loader->addPath($applicationRoot . '/src/PrestaShopBundle/Resources/views', 'PrestaShop');
        }
        $twig = new Twig\Environment($loader);
        $theme = $useShopTheme ? '@PrestaShop/Admin/Sell/Catalog/Categories/FormTheme/category.html.twig' : 'form_div_layout.html.twig';
        $renderer = new Symfony\Component\Form\FormRenderer(new Symfony\Bridge\Twig\Form\TwigRendererEngine([$theme], $twig));
        $twig->addRuntimeLoader(new Twig\RuntimeLoader\FactoryRuntimeLoader([
            Symfony\Component\Form\FormRenderer::class => static fn () => $renderer,
        ]));
        $twig->addExtension(new Symfony\Bridge\Twig\Extension\FormExtension());
        $twig->addExtension(new Symfony\Bridge\Twig\Extension\TranslationExtension(new Symfony\Component\Translation\IdentityTranslator()));
        if ($useShopTheme) {
            $twig->addGlobal('multistore_field_prefix', PrestaShopBundle\Service\Form\MultistoreCheckboxEnabler::MULTISTORE_FIELD_PREFIX);
            $twig->addGlobal('modify_all_shops_prefix', PrestaShopBundle\Form\Extension\ModifyAllShopsExtension::MODIFY_ALL_SHOPS_PREFIX);
            $twig->addGlobal('disabling_switch_prefix', PrestaShopBundle\Form\Extension\DisablingSwitchExtension::FIELD_PREFIX);
            // Services used by unrelated blocks in the real theme; this collection only needs plain help text.
            $twig->addFilter(new Twig\TwigFilter('raw_purified', static fn ($value) => (string) $value, ['is_safe' => ['html']]));
            $twig->addFunction(new Twig\TwigFunction('get_context_iso_code', static fn () => 'nl'));
            $twig->addFunction(new Twig\TwigFunction('update_form_vars', static function ($view, $vars): void { $view->vars = array_replace($view->vars, $vars); }));
            $twig->addFunction(new Twig\TwigFunction('path', static fn () => '#'));
        }
        $template = $twig->createTemplate('<form>{{ form_widget(form) }}</form>');
        $enabledHtml = $template->render(['form' => $make($stored)->createView()]);
        $disabledHtml = $template->render(['form' => $make([], false, 'root_category')->createView()]);
        echo json_encode(['enabled' => $enabledHtml, 'disabled' => $disabledHtml], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    } else {
        echo "PASS: category relation form validation, inactive/stale selections, empty deletion, labels and shop scope.\n";
    }
} catch (Throwable $error) {
    fwrite(STDERR, $error->getMessage() . "\n" . $error->getTraceAsString() . "\n");
    exit(1);
}
