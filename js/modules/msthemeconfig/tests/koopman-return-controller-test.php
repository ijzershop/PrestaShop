<?php

declare(strict_types=1);

namespace {
    /**
     * Offline controller checks using the installed PrestaShop controller base,
     * EmployeeContext and Symfony HTTP, routing and CSRF implementations.
     * No PrestaShop bootstrap, database, carrier requests, emails or real sessions.
     * Run: php modules/msthemeconfig/tests/koopman-return-controller-test.php
     */
    if (PHP_SAPI !== 'cli') {
        http_response_code(404);
        exit;
    }

    $shopRoot = __DIR__;
    while (!is_file($shopRoot . '/src/PrestaShopBundle/Controller/Admin/PrestaShopAdminController.php')) {
        $parent = dirname($shopRoot);
        if ($parent === $shopRoot) {
            throw new \RuntimeException('Run this test from a PrestaShop installation.');
        }
        $shopRoot = $parent;
    }
    $loader = require $shopRoot . '/vendor/autoload.php';
    $loader->addPsr4('MsThemeConfig\\', dirname(__DIR__) . '/src');
    define('_PS_MODULE_DIR_', dirname(__DIR__, 2) . '/');

    class Order
    {
        public static array $orders = [];
        public static array $products = [['product_quantity' => 1, 'product_name' => 'Test product']];
        public int $id = 0;
        public int $id_shop = 1;
        public int $id_shop_group = 1;
        public int $id_lang = 1;
        public int $id_address_delivery = 1;
        public int $current_state = 2;
        public string $reference = 'OFFLINE-RETURN';

        public function __construct(int $id)
        {
            foreach (self::$orders[$id] ?? [] as $key => $value) {
                $this->{$key} = $value;
            }
        }

        public function getOrderDetailList(): array
        {
            return self::$products;
        }
    }

    class Address
    {
        public static array $values = [];
        public int $id;
        public int $id_country = 1;
        public string $firstname = 'Test';
        public string $lastname = 'Customer';
        public string $company = '';
        public string $address1 = 'Example street';
        public string $address2 = '';
        public string $house_number = '1';
        public string $house_number_extension = '';
        public string $postcode = '1234AB';
        public string $city = 'Test city';
        public string $phone_mobile = '0612345678';
        public string $phone = '';

        public function __construct(int $id)
        {
            $this->id = $id;
            foreach (self::$values as $key => $value) {
                $this->{$key} = $value;
            }
        }
    }

    class Country
    {
        public static function getNameById(int $language, int $country): string
        {
            return 'Nederland';
        }
    }

    class Validate
    {
        public static function isLoadedObject(object $object): bool
        {
            return ($object->id ?? 0) > 0;
        }
    }

    class Configuration
    {
        public static array $values = [];
        public static array $calls = [];

        public static function get(string $key, int $language, int $group, int $shop)
        {
            self::$calls[] = [$key, $language, $group, $shop];
            return self::$values[$key] ?? false;
        }
    }

    class Context
    {
        public static object $context;

        public static function getContext(): object
        {
            return self::$context;
        }
    }

    class ReturnTemplateStub
    {
        public array $assigned = [];

        public function createTemplate(string $path): self
        {
            if (!is_file($path)) {
                throw new \RuntimeException('Return form template does not exist.');
            }
            return $this;
        }

        public function assign(array $values): void
        {
            $this->assigned = $values;
        }

        public function fetch(): string
        {
            return '<form>offline return form</form>';
        }
    }
}

namespace MsThemeConfig\Class {
    /** Controller boundary only: the carrier/storage service has separate tests. */
    class KoopmanReturnShipment
    {
        public static ?array $existing = null;
        public static array $created = [];
        public static array $labelRequests = [];
        public static int $phoneChecks = 0;
        public static ?\Throwable $readError = null;
        public static ?\Throwable $createError = null;
        public static ?\Throwable $labelError = null;

        public function getForOrder(\Order $order): ?array
        {
            if (self::$readError) {
                throw self::$readError;
            }
            return self::$existing;
        }

        /** Controller boundary: real normalization and payload behavior are tested separately. */
        public static function getCustomerPhone(\Address $address): string
        {
            ++self::$phoneChecks;
            $mobile = trim($address->phone_mobile);
            $phone = $mobile !== '' ? $mobile : trim($address->phone);
            if ($phone === '' || mb_strlen($phone) > 30) {
                throw new \InvalidArgumentException('Telefoonnummer klant ontbreekt of is te lang (maximaal 30 tekens).');
            }
            return $phone;
        }

        public function create(\Order $order, array $form, string $key, int $employee): array
        {
            self::$created[] = [$order->id, $form, $key, $employee];
            if (self::$createError) {
                throw self::$createError;
            }
            return self::$existing ?? [
                'status' => 'created', 'message' => 'Created', 'return_id' => 23,
                'tracking_number' => 'TEST-RETURN', 'tracking_url' => '', 'label_count' => 1,
            ];
        }

        public function getLabel(\Order $order, int $returnId, int $index): array
        {
            self::$labelRequests[] = [$order->id, $returnId, $index];
            if (self::$labelError) {
                throw self::$labelError;
            }
            return ['content' => '%PDF-1.4 offline', 'filename' => 'retour-42-23-1.pdf'];
        }
    }

    /** No email transport is ever instantiated by these controller tests. */
    class KoopmanReturnNotification
    {
        public static array $lookups = [];
        public static array $sends = [];
        public static ?\Throwable $readError = null;
        public static ?\Throwable $sendError = null;
        public static array $state = [
            'status' => 'not_sent', 'sent' => false, 'blocked' => false, 'can_send' => true,
            'recipient' => 'customer@example.test', 'sent_at' => '', 'message' => 'Not yet sent',
        ];

        public function getForReturn(\Order $order, int $returnId): array
        {
            self::$lookups[] = [$order->id, $order->id_shop, $returnId];
            if (self::$readError) {
                throw self::$readError;
            }
            return self::$state;
        }

        public function send(\Order $order, int $returnId, int $employee): array
        {
            self::$sends[] = [$order->id, $order->id_shop, $returnId, $employee];
            if (self::$sendError) {
                throw self::$sendError;
            }
            self::$state = array_replace(self::$state, [
                'status' => 'sent', 'sent' => true, 'blocked' => true, 'can_send' => false,
                'sent_at' => '2030-01-01 12:00:00', 'message' => 'Email sent',
            ]);
            return self::$state;
        }
    }
}

namespace {
    use MsThemeConfig\Class\KoopmanReturnNotification;
    use MsThemeConfig\Class\KoopmanReturnShipment;
    use MsThemeConfig\Controller\Admin\KoopmanReturnController;
    use PrestaShop\PrestaShop\Core\Context\Employee;
    use PrestaShop\PrestaShop\Core\Context\EmployeeContext;
    use Symfony\Component\Config\FileLocator;
    use Symfony\Component\DependencyInjection\ContainerBuilder;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
    use Symfony\Component\Routing\Exception\MethodNotAllowedException;
    use Symfony\Component\Routing\Generator\UrlGenerator;
    use Symfony\Component\Routing\Loader\YamlFileLoader;
    use Symfony\Component\Routing\Matcher\UrlMatcher;
    use Symfony\Component\Routing\RequestContext;
    use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
    use Symfony\Component\Security\Core\Exception\AccessDeniedException;
    use Symfony\Component\Security\Csrf\CsrfToken;
    use Symfony\Component\Security\Csrf\CsrfTokenManager;
    use Symfony\Component\Security\Csrf\Exception\TokenNotFoundException;
    use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;
    use Symfony\Component\Yaml\Yaml;

    require dirname(__DIR__) . '/src/Controller/Admin/KoopmanReturnController.php';

    final class ReturnTokenStorage implements TokenStorageInterface
    {
        private array $tokens = [];

        public function getToken(string $tokenId): string
        {
            return $this->tokens[$tokenId] ?? throw new TokenNotFoundException($tokenId);
        }

        public function setToken(string $tokenId, string $token): void
        {
            $this->tokens[$tokenId] = $token;
        }

        public function removeToken(string $tokenId): ?string
        {
            $previous = $this->tokens[$tokenId] ?? null;
            unset($this->tokens[$tokenId]);
            return $previous;
        }

        public function hasToken(string $tokenId): bool
        {
            return isset($this->tokens[$tokenId]);
        }
    }

    final class ReturnAuthorizationChecker implements AuthorizationCheckerInterface
    {
        public bool $allowed = true;
        public array $calls = [];

        public function isGranted(mixed $attribute, mixed $subject = null): bool
        {
            $this->calls[] = [$attribute, $subject];
            return $this->allowed;
        }
    }

    function checkReturnController(bool $condition, string $message): void
    {
        if (!$condition) {
            throw new \RuntimeException($message);
        }
    }

    function expectReturnException(string $class, callable $action): void
    {
        try {
            $action();
        } catch (\Throwable $error) {
            checkReturnController($error instanceof $class, 'Expected ' . $class . ', got ' . get_class($error) . ': ' . $error->getMessage());
            return;
        }
        throw new \RuntimeException('Expected ' . $class . ' was not thrown.');
    }

    $routes = (new YamlFileLoader(new FileLocator(dirname(__DIR__) . '/config')))->load('routes.yml');
    $tokens = new CsrfTokenManager(null, new ReturnTokenStorage(), 'offline');
    $authorization = new ReturnAuthorizationChecker();
    $container = new ContainerBuilder();
    $container->set('security.authorization_checker', $authorization);
    $container->set('security.csrf.token_manager', $tokens);
    $container->set('router', new UrlGenerator($routes, new RequestContext('/admin-test')));
    $employee = new Employee(7, 2, 1, 'Test', 'Employee', 'employee@example.test', '', '', 1, 1, [1], [1]);
    $container->set(EmployeeContext::class, new EmployeeContext($employee, [1, 2]));
    $controller = new KoopmanReturnController($tokens);
    $controller->setContainer($container);
    $template = new ReturnTemplateStub();
    Context::$context = (object) ['smarty' => $template];
    Order::$orders = [42 => ['id' => 42], 43 => ['id' => 43, 'id_shop' => 2]];
    Configuration::$values = [
        'KOOPMANORDEREXPORT_SHOW_RETOUR' => '1',
        'KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES' => '[5,2]',
        'KOOPMANORDEREXPORT_RETOUR_CREATED_STATUSSES' => '[14]',
    ];
    $validToken = $tokens->getToken('koopman_return_42')->getValue();
    $form = ['id_order' => '42', 'token' => $validToken, 'request_key' => str_repeat('a', 32), 'pickup_date' => '2030-01-02'];

    $checks = [];
    $checks['routes constrain methods and retain order permissions'] = static function () use ($routes): void {
        foreach (['form' => 'GET', 'create' => 'POST', 'label' => 'GET', 'send' => 'POST'] as $action => $method) {
            $route = $routes->get('admin_koopman_return_' . $action);
            checkReturnController($route !== null && $route->getMethods() === [$method], 'Incorrect method restriction.');
            checkReturnController($route->getDefault('_legacy_controller') === 'AdminOrders', 'Return route must use AdminOrders permissions.');
            $context = (new RequestContext())->setMethod($method);
            $matched = (new UrlMatcher($routes, $context))->match($route->getPath());
            checkReturnController($matched['_controller'] === KoopmanReturnController::class . '::' . $action . 'Action', 'Incorrect return route controller.');
        }
        expectReturnException(MethodNotAllowedException::class, static fn () => (new UrlMatcher($routes, (new RequestContext())->setMethod('POST')))->match('/modernesmid/koopman/return/label'));
        expectReturnException(MethodNotAllowedException::class, static fn () => (new UrlMatcher($routes, (new RequestContext())->setMethod('GET')))->match($routes->get('admin_koopman_return_send')->getPath()));
        $services = Yaml::parseFile(dirname(__DIR__) . '/config/services.yml')['services'];
        $definition = $services[KoopmanReturnController::class] ?? [];
        checkReturnController(($services['_defaults']['autowire'] ?? false) && ($services['_defaults']['public'] ?? false), 'Controller needs an autowired public service.');
        checkReturnController(in_array(['name' => 'controller.service_arguments'], $definition['tags'] ?? [], true), 'Missing controller service tag.');
    };
    $checks['all endpoints deny missing order update permission before service calls'] = static function () use ($authorization, $controller, $form): void {
        $authorization->allowed = false;
        foreach (['formAction', 'labelAction', 'createAction', 'sendAction'] as $action) {
            $request = Request::create('/', in_array($action, ['createAction', 'sendAction'], true) ? 'POST' : 'GET', $form);
            expectReturnException(AccessDeniedException::class, static fn () => $controller->{$action}($request));
        }
        $authorization->allowed = true;
        checkReturnController($authorization->calls === array_fill(0, 4, ['update', 'AdminOrders']), 'Unexpected order permission check.');
        checkReturnController(!KoopmanReturnShipment::$created && !KoopmanReturnShipment::$labelRequests, 'Unauthorized request reached shipment service.');
        checkReturnController(!KoopmanReturnNotification::$sends && !KoopmanReturnNotification::$lookups, 'Unauthorized request reached notification service.');
    };
    $checks['employee authentication and shop membership are enforced'] = static function () use ($container, $employee, $controller, $form): void {
        $container->set(EmployeeContext::class, new EmployeeContext(null, [1, 2]));
        foreach (['formAction', 'labelAction', 'createAction', 'sendAction'] as $action) {
            expectReturnException(AccessDeniedException::class, static fn () => $controller->{$action}(Request::create('/', in_array($action, ['createAction', 'sendAction'], true) ? 'POST' : 'GET', $form)));
        }
        $container->set(EmployeeContext::class, new EmployeeContext($employee, [1, 2]));
        foreach (['formAction', 'labelAction', 'createAction', 'sendAction'] as $action) {
            expectReturnException(AccessDeniedException::class, static fn () => $controller->{$action}(Request::create('/', in_array($action, ['createAction', 'sendAction'], true) ? 'POST' : 'GET', array_replace($form, ['id_order' => 43]))));
        }
        expectReturnException(NotFoundHttpException::class, static fn () => $controller->formAction(Request::create('/', 'GET', ['id_order' => 999])));
        checkReturnController(!KoopmanReturnNotification::$sends && !KoopmanReturnNotification::$lookups, 'Missing employee or shop permission reached notification service.');
    };
    $checks['missing, forged and other order CSRF tokens cannot book or email'] = static function () use ($tokens, $controller, $form): void {
        foreach ([null, 'forged', $tokens->getToken('koopman_return_43')->getValue()] as $token) {
            foreach (['createAction', 'sendAction'] as $action) {
                $response = $controller->{$action}(Request::create('/', 'POST', array_replace($form, ['token' => $token, 'return_id' => 23])));
                checkReturnController($response->getStatusCode() === 403 && !json_decode($response->getContent(), true)['success'], 'Invalid CSRF token was accepted.');
            }
        }
        checkReturnController(!KoopmanReturnShipment::$created, 'Invalid token reached booking service.');
        checkReturnController(!KoopmanReturnNotification::$sends && !KoopmanReturnNotification::$lookups, 'Invalid token reached notification service.');
    };
    $checks['form renders a valid per-order token and authenticated submit URL'] = static function () use ($controller, $template, $tokens): void {
        $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
        checkReturnController($response->getStatusCode() === 200, 'Return form did not render: ' . $response->getContent());
        checkReturnController($tokens->isTokenValid(new CsrfToken('koopman_return_42', $template->assigned['retour_token'])), 'Form token is invalid.');
        checkReturnController(str_starts_with($template->assigned['retour_submit_url'], '/admin-test/'), 'Submit URL escaped the admin base path.');
        checkReturnController(str_starts_with($template->assigned['retour_send_url'], '/admin-test/'), 'Email URL escaped the admin base path.');
        checkReturnController((bool) preg_match('/^[a-f0-9]{32}$/D', $template->assigned['retour_request_key']), 'Missing unique booking key.');
        checkReturnController($response->headers->hasCacheControlDirective('no-store'), 'Customer return form must not be cached.');
        checkReturnController(!KoopmanReturnNotification::$sends, 'Opening return form sent an email.');
    };
    $checks['invalid customer phone is explained when opening a new return'] = static function () use ($controller, $template): void {
        $createdBefore = count(KoopmanReturnShipment::$created);
        $sentBefore = count(KoopmanReturnNotification::$sends);
        $phoneChecksBefore = KoopmanReturnShipment::$phoneChecks;
        try {
            foreach ([
                ['phone_mobile' => '', 'phone' => ''],
                ['phone_mobile' => " \t ", 'phone' => "\n "],
                ['phone_mobile' => str_repeat('1', 31), 'phone' => ''],
                ['phone_mobile' => '', 'phone' => str_repeat('1', 31)],
            ] as $phones) {
                Address::$values = $phones;
                $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
                checkReturnController($response->getStatusCode() === 200, 'Phone warning must render inside the return popup.');
                checkReturnController(str_contains($template->assigned['retour_preflight_error'] ?? '', 'Telefoonnummer'), 'Missing or overlong phone did not produce a preflight warning.');
                checkReturnController(!$template->assigned['retour_created'] && !$template->assigned['retour_blocked'], 'Phone warning must not masquerade as an existing carrier booking.');
            }
            checkReturnController(KoopmanReturnShipment::$phoneChecks === $phoneChecksBefore + 4, 'New return form did not use the shared phone validator.');
            checkReturnController(count(KoopmanReturnShipment::$created) === $createdBefore && count(KoopmanReturnNotification::$sends) === $sentBefore, 'Phone validation triggered a booking or email.');
        } finally {
            Address::$values = [];
        }
    };
    $checks['mobile and fallback landline permit opening the normal return form'] = static function () use ($controller, $template): void {
        try {
            foreach ([
                ['phone_mobile' => ' 0612345678 ', 'phone' => ''],
                ['phone_mobile' => '', 'phone' => '0501234567'],
                ['phone_mobile' => " \t ", 'phone' => ' 0501234567 '],
            ] as $phones) {
                Address::$values = $phones;
                $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
                checkReturnController($response->getStatusCode() === 200 && ($template->assigned['retour_preflight_error'] ?? null) === '', 'Valid mobile or fallback landline blocked the return form.');
            }
            checkReturnController(!KoopmanReturnShipment::$created && !KoopmanReturnNotification::$sends, 'Opening a valid return form caused external work.');
        } finally {
            Address::$values = [];
        }
    };
    $checks['return product rows show quantity-weight totals and preserve unknown weights'] = static function () use ($controller, $template): void {
        $previousProducts = Order::$products;
        $createdBefore = count(KoopmanReturnShipment::$created);
        $sentBefore = count(KoopmanReturnNotification::$sends);
        try {
            Order::$products = [
                ['product_quantity' => 2, 'product_weight' => 1.25, 'product_name' => 'Two pieces'],
                ['product_quantity' => '3', 'product_weight' => '0.1', 'product_name' => 'Numeric stored values'],
                ['product_quantity' => 1, 'product_weight' => 0, 'product_name' => 'Known zero'],
                ['product_quantity' => 1, 'product_name' => 'Missing weight'],
                ['product_quantity' => 1, 'product_weight' => 'unknown', 'product_name' => 'Invalid weight'],
                ['product_quantity' => 1, 'product_weight' => -1, 'product_name' => 'Negative weight'],
                ['product_quantity' => 1, 'product_weight' => NAN, 'product_name' => 'Not a number'],
                ['product_quantity' => 1, 'product_weight' => INF, 'product_name' => 'Nonfinite weight'],
            ];
            $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
            checkReturnController($response->getStatusCode() === 200, 'Product weights prevented the return form from opening.');
            $products = $template->assigned['retour_products'];
            checkReturnController(count($products) === count(Order::$products), 'Product rows were lost while displaying weights.');
            checkReturnController(array_column($products, 'retour_weight') === ['2,500', '0,300', '0,000', null, null, null, null, null], 'Row weight must multiply quantity and distinguish unavailable values from real zero.');
            foreach ($products as $index => $product) {
                checkReturnController($product['product_name'] === Order::$products[$index]['product_name'] && $product['product_quantity'] === Order::$products[$index]['product_quantity'], 'Displaying weight changed existing product details.');
            }
            checkReturnController(count(KoopmanReturnShipment::$created) === $createdBefore && count(KoopmanReturnNotification::$sends) === $sentBefore, 'Displaying product weights created a booking or sent email.');
        } finally {
            Order::$products = $previousProducts;
        }
    };
    $checks['ineligible and already returned order states cannot create a new booking'] = static function () use ($controller, $form): void {
        foreach ([4, 14] as $state) {
            Order::$orders[42]['current_state'] = $state;
            // An overlapping created state must still be refused after JSON parsing.
            Configuration::$values['KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES'] = '[5,2,14]';
            $response = $controller->createAction(Request::create('/', 'POST', $form));
            checkReturnController($response->getStatusCode() === 400, 'Ineligible status was accepted.');
        }
        Configuration::$values['KOOPMANORDEREXPORT_RETOUR_ACCEPTED_STATUSSES'] = '[5,2]';
        Order::$orders[42]['current_state'] = 2;
        Configuration::$values['KOOPMANORDEREXPORT_SHOW_RETOUR'] = '0';
        checkReturnController($controller->createAction(Request::create('/', 'POST', $form))->getStatusCode() === 400, 'Disabled returns were accepted.');
        Configuration::$values['KOOPMANORDEREXPORT_SHOW_RETOUR'] = '1';
        checkReturnController(!KoopmanReturnShipment::$created, 'Disallowed status reached booking service.');
    };
    $checks['authorized booking forwards employee and returns downloadable labels'] = static function () use ($controller, $form): void {
        $response = $controller->createAction(Request::create('/', 'POST', $form));
        $json = json_decode($response->getContent(), true);
        checkReturnController($response->getStatusCode() === 200 && $json['success'], 'Booking result not returned.');
        checkReturnController(KoopmanReturnShipment::$created[0] === [42, $form, $form['request_key'], 7], 'Incorrect booking input or employee attribution.');
        $query = [];
        parse_str((string) parse_url($json['labels'][0]['url'], PHP_URL_QUERY), $query);
        checkReturnController($query === ['id_order' => '42', 'return_id' => '23', 'label_index' => '0'], 'Label link did not bind order and return.');
        parse_str((string) parse_url($json['labels'][0]['preview_url'], PHP_URL_QUERY), $query);
        checkReturnController($query === ['id_order' => '42', 'return_id' => '23', 'label_index' => '0', 'preview' => '1'], 'Preview link did not bind order and return.');
        checkReturnController($json['return_id'] === 23 && $json['customer_email'] === 'customer@example.test', 'Created return omitted notification preview data.');
        checkReturnController($json['notification']['can_send'] && str_starts_with($json['send_url'], '/admin-test/'), 'Created return omitted explicit email action.');
        checkReturnController(KoopmanReturnNotification::$lookups === [[42, 1, 23]] && !KoopmanReturnNotification::$sends, 'Booking must only read email status, never send.');
        foreach (Configuration::$calls as $call) {
            checkReturnController(array_slice($call, 1) === [1, 1, 1], 'Eligibility configuration used the wrong shop context.');
        }
    };
    $checks['uncertain bookings stay blocked and existing labels remain reachable'] = static function () use ($controller, $template, $form): void {
        Address::$values = ['phone_mobile' => '', 'phone' => ''];
        $phoneChecksBefore = KoopmanReturnShipment::$phoneChecks;
        KoopmanReturnShipment::$existing = ['status' => 'uncertain', 'message' => 'Check portal', 'tracking_number' => '', 'tracking_url' => '', 'label_count' => 0, 'return_id' => 23];
        Order::$orders[42]['current_state'] = 4;
        $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
        checkReturnController($response->getStatusCode() === 200 && $template->assigned['retour_blocked'], 'Uncertain booking must remain visible after order status changes.');
        checkReturnController(($template->assigned['retour_preflight_error'] ?? null) === '', 'Missing phone must not obscure an uncertain existing booking.');
        $json = json_decode($controller->createAction(Request::create('/', 'POST', $form))->getContent(), true);
        checkReturnController(!$json['success'] && $json['blocked'], 'Uncertain booking was presented as retryable.');
        KoopmanReturnShipment::$existing['status'] = 'created';
        KoopmanReturnShipment::$existing['label_count'] = 1;
        $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
        checkReturnController($response->getStatusCode() === 200 && $template->assigned['retour_created'] && count($template->assigned['retour_labels']) === 1, 'Existing booking label disappeared when order status changed.');
        checkReturnController($template->assigned['retour_return_id'] === 23 && $template->assigned['retour_customer_email'] === 'customer@example.test', 'Existing return omitted the email recipient preview.');
        checkReturnController(($template->assigned['retour_preflight_error'] ?? null) === '' && KoopmanReturnShipment::$phoneChecks === $phoneChecksBefore, 'Created return must retain its labels without revalidating the current customer phone.');
        checkReturnController(!KoopmanReturnNotification::$sends, 'Opening an existing return sent an email.');
        Address::$values = [];
        KoopmanReturnShipment::$existing = null;
        Order::$orders[42]['current_state'] = 2;
    };
    $checks['email status failure preserves successful booking and label preview'] = static function () use ($controller, $template, $form): void {
        KoopmanReturnNotification::$readError = new \RuntimeException('private notification database details');
        KoopmanReturnShipment::$existing = ['status' => 'created', 'message' => 'Created', 'tracking_number' => 'TEST-RETURN', 'tracking_url' => '', 'label_count' => 1, 'return_id' => 23];
        $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
        checkReturnController($response->getStatusCode() === 200 && $template->assigned['retour_created'], 'Notification lookup failure hid the existing return.');
        checkReturnController(count($template->assigned['retour_labels']) === 1 && isset($template->assigned['retour_labels'][0]['preview_url']), 'Notification failure hid the label preview.');
        $notification = $template->assigned['retour_notification'];
        checkReturnController($notification['status'] === 'unavailable' && $notification['blocked'] && !$notification['can_send'], 'Unknown notification state must prevent sending.');
        checkReturnController(!str_contains($notification['message'], 'database details'), 'Notification exception details exposed.');
        $response = $controller->createAction(Request::create('/', 'POST', $form));
        $json = json_decode($response->getContent(), true);
        checkReturnController($response->getStatusCode() === 200 && $json['success'] && count($json['labels']) === 1, 'Notification lookup failure obscured carrier acceptance.');
        checkReturnController($json['notification']['blocked'] && !$json['notification']['can_send'], 'Unknown notification state was presented as sendable.');
        checkReturnController(!KoopmanReturnNotification::$sends, 'Notification lookup failure unexpectedly sent an email.');
        KoopmanReturnNotification::$readError = null;
        KoopmanReturnShipment::$existing = null;
    };
    $checks['PDF download preserves authorization scope and download headers'] = static function () use ($controller): void {
        $response = $controller->labelAction(Request::create('/', 'GET', ['id_order' => 42, 'return_id' => 23, 'label_index' => 0]));
        checkReturnController(KoopmanReturnShipment::$labelRequests === [[42, 23, 0]], 'Incorrect scoped label lookup.');
        checkReturnController($response->getContent() === '%PDF-1.4 offline' && $response->headers->get('Content-Type') === 'application/pdf', 'Label bytes or PDF content type changed.');
        checkReturnController($response->headers->hasCacheControlDirective('private') && $response->headers->hasCacheControlDirective('no-store'), 'PDF response must not be shared or cached.');
        checkReturnController($response->headers->get('X-Content-Type-Options') === 'nosniff', 'Missing label nosniff header.');
        checkReturnController($response->headers->get('X-Frame-Options') === 'SAMEORIGIN', 'Label must not be embeddable by another origin.');
        checkReturnController(str_starts_with($response->headers->get('Content-Disposition'), 'attachment;'), 'Label should download.');
        $preview = $controller->labelAction(Request::create('/', 'GET', ['id_order' => 42, 'return_id' => 23, 'label_index' => 0, 'preview' => 1]));
        checkReturnController(str_starts_with($preview->headers->get('Content-Disposition'), 'inline;'), 'Label preview must display inline.');
        checkReturnController($preview->getContent() === $response->getContent(), 'Preview must use the same saved label bytes as the download.');
        checkReturnController($preview->headers->hasCacheControlDirective('private') && $preview->headers->hasCacheControlDirective('no-store') && $preview->headers->get('X-Frame-Options') === 'SAMEORIGIN', 'Preview lacks private same-origin response headers.');
        checkReturnController(!KoopmanReturnNotification::$sends, 'Previewing a PDF sent an email.');
        KoopmanReturnShipment::$labelError = new \RuntimeException('private storage details');
        expectReturnException(NotFoundHttpException::class, static fn () => $controller->labelAction(Request::create('/', 'GET', ['id_order' => 42, 'return_id' => 999, 'label_index' => 0])));
        KoopmanReturnShipment::$labelError = null;
    };
    $checks['booking errors have actionable validation responses without exposing internal errors'] = static function () use ($controller, $form): void {
        KoopmanReturnShipment::$createError = new \InvalidArgumentException('Enter a package weight.');
        $response = $controller->createAction(Request::create('/', 'POST', $form));
        checkReturnController($response->getStatusCode() === 400 && str_contains($response->getContent(), 'package weight'), 'Validation message lost.');
        KoopmanReturnShipment::$createError = new \RuntimeException('private database password');
        $response = $controller->createAction(Request::create('/', 'POST', $form));
        checkReturnController($response->getStatusCode() === 500 && !str_contains($response->getContent(), 'password'), 'Internal exception details exposed.');
        KoopmanReturnShipment::$createError = null;
        KoopmanReturnShipment::$readError = new \RuntimeException('private database password');
        $response = $controller->formAction(Request::create('/', 'GET', ['id_order' => 42]));
        checkReturnController($response->getStatusCode() === 400 && !str_contains($response->getContent(), 'password'), 'Return form exposed internal exception details.');
        KoopmanReturnShipment::$readError = null;
    };
    $checks['explicit send uses server order context and ignores recipient and tracking input'] = static function () use ($controller, $form): void {
        checkReturnController(!KoopmanReturnNotification::$sends, 'An email was dispatched without an explicit send action.');
        $bookingCalls = count(KoopmanReturnShipment::$created);
        $sendRequest = array_replace($form, [
            'return_id' => '23', 'recipient' => 'attacker@example.test', 'email' => 'attacker@example.test',
            'customer_email' => 'attacker@example.test', 'tracking_number' => 'ATTACKER',
            'tracking_url' => 'https://attacker.example.test', 'employee_id' => '999', 'id_employee' => '999',
        ]);
        $response = $controller->sendAction(Request::create('/', 'POST', $sendRequest));
        $json = json_decode($response->getContent(), true);
        checkReturnController($response->getStatusCode() === 200 && $json['success'] && $json['blocked'], 'Explicit send did not return sent result.');
        checkReturnController(KoopmanReturnNotification::$sends === [[42, 1, 23, 7]], 'Send must pass only the loaded order, return id and authenticated employee.');
        checkReturnController($json['notification']['recipient'] === 'customer@example.test' && !str_contains($response->getContent(), 'attacker'), 'Client-controlled recipient or tracking leaked into email result.');
        checkReturnController($response->headers->hasCacheControlDirective('no-store'), 'Email result must not be cached.');
        checkReturnController(count(KoopmanReturnShipment::$created) === $bookingCalls, 'Email action created another carrier shipment.');

        $repeat = $controller->sendAction(Request::create('/', 'POST', $sendRequest));
        checkReturnController(json_decode($repeat->getContent(), true) === $json, 'Repeated send did not return the persisted sent status.');
        checkReturnController(!json_decode($repeat->getContent(), true)['notification']['can_send'], 'Persisted sent result must disable another send.');
    };
    $checks['email validation and uncertain failures return safe statuses'] = static function () use ($controller, $form): void {
        $sendForm = array_replace($form, ['return_id' => '23']);
        KoopmanReturnNotification::$sendError = new \InvalidArgumentException('The saved return label is missing.');
        $response = $controller->sendAction(Request::create('/', 'POST', $sendForm));
        checkReturnController($response->getStatusCode() === 400 && !json_decode($response->getContent(), true)['success'] && str_contains($response->getContent(), 'label is missing'), 'Email validation error was not explained.');
        KoopmanReturnNotification::$sendError = new \RuntimeException('private SMTP password');
        $response = $controller->sendAction(Request::create('/', 'POST', $sendForm));
        $json = json_decode($response->getContent(), true);
        checkReturnController($response->getStatusCode() === 500 && !$json['success'] && $json['blocked'], 'Unknown send result must prevent blind retries.');
        checkReturnController(!str_contains($response->getContent(), 'SMTP') && !str_contains($response->getContent(), 'password'), 'Email transport details exposed.');
        checkReturnController($response->headers->hasCacheControlDirective('no-store'), 'Email error must not be cached.');
        KoopmanReturnNotification::$sendError = null;
    };

    foreach ($checks as $name => $check) {
        $check();
        echo "PASS: {$name}\n";
    }
    echo count($checks) . " offline Koopman return controller checks passed.\n";
}
