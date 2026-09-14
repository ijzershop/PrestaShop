<?php
declare(strict_types=1);

namespace MsThemeConfig\Category {
    final class CategoryRelationRepository
    {
        public static array $saves = [];
        public function __construct(\Db $db) {}
        public function replace(int $sourceId, int $shopId, int $langId, array $relations): void
        {
            self::$saves[] = compact('sourceId', 'shopId', 'langId', 'relations');
        }
    }
}

namespace {
    if (PHP_SAPI !== 'cli') { exit(1); }
    class Db { public static function getInstance(): self { return new self(); } }
    class Shop {
        public const CONTEXT_SHOP = 1;
        public static int $scope = self::CONTEXT_SHOP;
        public static function getContext(): int { return self::$scope; }
    }
    class Category { public function __construct($id) {} }
    class Context { public static function getContext(): object { return (object) ['language' => (object) ['id' => 2]]; } }
    class Tools { public static function getAllValues(): array { return []; } }

    require dirname(__DIR__, 5) . '/vendor/autoload.php';
    require __DIR__ . '/../src/Form/CategoryRelationsForm.php';
    require __DIR__ . '/../src/Class/ModernHook.php';

    function check(bool $condition, string $message): void
    {
        if (!$condition) { throw new RuntimeException($message); }
    }

    try {
        $reflection = new ReflectionClass(MsThemeConfig\Class\ModernHook::class);
        $hook = $reflection->newInstanceWithoutConstructor();
        $reflection->getProperty('idShop')->setValue($hook, 3);
        $reflection->getProperty('idLang')->setValue($hook, 2);
        $field = MsThemeConfig\Form\CategoryRelationsForm::FIELD_NAME;
        $repository = MsThemeConfig\Category\CategoryRelationRepository::class;
        $rows = [['id_related_category' => 12, 'note' => 'Aanvullend', 'position' => 0]];
        $_POST = ['category' => [$field => [['id_related_category' => 999]]]];

        $hook->hookActionAfterUpdateCategoryFormHandler(['id' => 10]);
        $hook->hookActionAfterUpdateCategoryFormHandler(['id' => 10, 'form_data' => ['name' => 'Normaal']]);
        check($repository::$saves === [], 'Absent validated relation field must not overwrite existing links or read raw POST.');
        foreach ([0, 2] as $scope) {
            Shop::$scope = $scope;
            $hook->hookActionAfterUpdateCategoryFormHandler(['id' => 10, 'form_data' => [$field => $rows]]);
        }
        check($repository::$saves === [], 'All-shops/group scope must never persist relations.');
        Shop::$scope = Shop::CONTEXT_SHOP;

        foreach ([
            'hookActionAfterUpdateCategoryFormHandler',
            'hookActionAfterCreateCategoryFormHandler',
            'hookActionAfterUpdateRootCategoryFormHandler',
            'hookActionAfterCreateRootCategoryFormHandler',
        ] as $method) {
            $before = count($repository::$saves);
            $hook->$method(['id' => 10, 'form_data' => [$field => $rows]]);
            check(count($repository::$saves) === $before + 1, $method . ' must save once.');
            $saved = $repository::$saves[$before];
            check($saved === ['sourceId' => 10, 'shopId' => 3, 'langId' => 2, 'relations' => $rows], 'Save must use validated rows, created/current ID and the current single shop/language.');
        }
        $hook->hookActionAfterUpdateCategoryFormHandler(['id' => 10, 'form_data' => [$field => []]]);
        check(end($repository::$saves)['relations'] === [], 'Explicit empty collection must persist deletion.');
        $before = count($repository::$saves);
        $hook->hookActionAfterUpdateCategoryFormHandler(['id' => 0, 'form_data' => [$field => $rows]]);
        check(count($repository::$saves) === $before, 'Uncreated category cannot be saved.');
        echo "PASS: normal/root create/update hooks use validated form_data and preserve single-shop scope.\n";
    } catch (Throwable $error) {
        fwrite(STDERR, $error->getMessage() . "\n");
        exit(1);
    }
}
