<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit601ee8dbc6ac234402831dac7772d593
{
    public static $files = array (
        '320cde22f66dd4f5d3fd621d3e88b98f' => __DIR__ . '/..' . '/symfony/polyfill-ctype/bootstrap.php',
        '5255c38a0faeba867671b61dfda6d864' => __DIR__ . '/..' . '/paragonie/random_compat/lib/random.php',
        '32dcc8afd4335739640db7d200c1971d' => __DIR__ . '/..' . '/symfony/polyfill-apcu/bootstrap.php',
        '023d27dca8066ef29e6739335ea73bad' => __DIR__ . '/..' . '/symfony/polyfill-php70/bootstrap.php',
        '2a9afd012ba84c341672875ae49cd5cd' => __DIR__ . '/..' . '/segmentio/analytics-php/lib/Segment.php',
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Symfony\\Polyfill\\Php70\\' => 23,
            'Symfony\\Polyfill\\Mbstring\\' => 26,
            'Symfony\\Polyfill\\Ctype\\' => 23,
            'Symfony\\Polyfill\\Apcu\\' => 22,
            'Symfony\\Component\\Yaml\\' => 23,
            'Symfony\\Component\\Filesystem\\' => 29,
            'Symfony\\Component\\ExpressionLanguage\\' => 37,
            'Symfony\\Component\\DependencyInjection\\' => 38,
            'Symfony\\Component\\Config\\' => 25,
            'Symfony\\Component\\Cache\\' => 24,
        ),
        'P' => 
        array (
            'Psr\\SimpleCache\\' => 16,
            'Psr\\Log\\' => 8,
            'Psr\\Container\\' => 14,
            'Psr\\Cache\\' => 10,
            'PrestaShop\\Decimal\\' => 19,
            'PhpOption\\' => 10,
        ),
        'M' => 
        array (
            'Mollie\\Api\\' => 11,
            'Mollie\\' => 7,
        ),
        'D' => 
        array (
            'Dotenv\\' => 7,
        ),
        'C' => 
        array (
            'Composer\\CaBundle\\' => 18,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Symfony\\Polyfill\\Php70\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-php70',
        ),
        'Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Symfony\\Polyfill\\Ctype\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-ctype',
        ),
        'Symfony\\Polyfill\\Apcu\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-apcu',
        ),
        'Symfony\\Component\\Yaml\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/yaml',
        ),
        'Symfony\\Component\\Filesystem\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/filesystem',
        ),
        'Symfony\\Component\\ExpressionLanguage\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/expression-language',
        ),
        'Symfony\\Component\\DependencyInjection\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/dependency-injection',
        ),
        'Symfony\\Component\\Config\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/config',
        ),
        'Symfony\\Component\\Cache\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/cache',
        ),
        'Psr\\SimpleCache\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/simple-cache/src',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/Psr/Log',
        ),
        'Psr\\Container\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/container/src',
        ),
        'Psr\\Cache\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/cache/src',
        ),
        'PrestaShop\\Decimal\\' => 
        array (
            0 => __DIR__ . '/..' . '/prestashop/decimal/src',
        ),
        'PhpOption\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpoption/phpoption/src/PhpOption',
        ),
        'Mollie\\Api\\' => 
        array (
            0 => __DIR__ . '/..' . '/mollie/mollie-api-php/src',
        ),
        'Mollie\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'Dotenv\\' => 
        array (
            0 => __DIR__ . '/..' . '/vlucas/phpdotenv/src',
        ),
        'Composer\\CaBundle\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/ca-bundle/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'R' => 
        array (
            'Raven_' => 
            array (
                0 => __DIR__ . '/..' . '/sentry/sentry/lib',
            ),
        ),
    );

    public static $classMap = array (
        'AdminMollieAjaxController' => __DIR__ . '/../..' . '/controllers/admin/AdminMollieAjaxController.php',
        'AdminMollieModuleController' => __DIR__ . '/../..' . '/controllers/admin/AdminMollieModuleController.php',
        'ArithmeticError' => __DIR__ . '/..' . '/symfony/polyfill-php70/Resources/stubs/ArithmeticError.php',
        'AssertionError' => __DIR__ . '/..' . '/symfony/polyfill-php70/Resources/stubs/AssertionError.php',
        'DivisionByZeroError' => __DIR__ . '/..' . '/symfony/polyfill-php70/Resources/stubs/DivisionByZeroError.php',
        'Error' => __DIR__ . '/..' . '/symfony/polyfill-php70/Resources/stubs/Error.php',
        'MolCarrierInformation' => __DIR__ . '/../..' . '/src/Entity/MolCarrierInformation.php',
        'MolCustomer' => __DIR__ . '/../..' . '/src/Entity/MolCustomer.php',
        'MolOrderFee' => __DIR__ . '/../..' . '/src/Entity/MolOrderFee.php',
        'MolPaymentMethod' => __DIR__ . '/../..' . '/src/Entity/MolPaymentMethod.php',
        'MolPaymentMethodIssuer' => __DIR__ . '/../..' . '/src/Entity/MolPaymentMethodIssuer.php',
        'MolPaymentMethodOrderTotalRestriction' => __DIR__ . '/../..' . '/src/Entity/MolPaymentMethodOrderTotalRestriction.php',
        'MolPendingOrderCart' => __DIR__ . '/../..' . '/src/Entity/MolPendingOrderCart.php',
        'MolPendingOrderCartRule' => __DIR__ . '/../..' . '/src/Entity/MolPendingOrderCartRule.php',
        'Mollie' => __DIR__ . '/../..' . '/mollie.php',
        'MollieAjaxModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/ajax.php',
        'MollieFailModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/fail.php',
        'MolliePayScreenModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/payScreen.php',
        'MolliePaymentModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/payment.php',
        'MollieQrcodeModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/qrcode.php',
        'MollieReturnModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/return.php',
        'MollieWebhookModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/webhook.php',
        'Mollie\\Adapter\\ConfigurationAdapter' => __DIR__ . '/../..' . '/src/Adapter/ConfigurationAdapter.php',
        'Mollie\\Adapter\\LegacyContext' => __DIR__ . '/../..' . '/src/Adapter/LegacyContext.php',
        'Mollie\\Adapter\\ToolsAdapter' => __DIR__ . '/../..' . '/src/Adapter/ToolsAdapter.php',
        'Mollie\\Builder\\ApiTestFeedbackBuilder' => __DIR__ . '/../..' . '/src/Builder/ApiTestFeedbackBuilder.php',
        'Mollie\\Builder\\Content\\BaseInfoBlock' => __DIR__ . '/../..' . '/src/Builder/Content/BaseInfoBlock.php',
        'Mollie\\Builder\\Content\\LogoInfoBlock' => __DIR__ . '/../..' . '/src/Builder/Content/LogoInfoBlock.php',
        'Mollie\\Builder\\Content\\PaymentOption\\IdealDropdownInfoBlock' => __DIR__ . '/../..' . '/src/Builder/Content/PaymentOption/IdealDropdownInfoBlock.php',
        'Mollie\\Builder\\Content\\RoundingModeInfoBlock' => __DIR__ . '/../..' . '/src/Builder/Content/RoundingModeInfoBlock.php',
        'Mollie\\Builder\\Content\\SmartyCacheInfoBlock' => __DIR__ . '/../..' . '/src/Builder/Content/SmartyCacheInfoBlock.php',
        'Mollie\\Builder\\Content\\SmartyForceCompileInfoBlock' => __DIR__ . '/../..' . '/src/Builder/Content/SmartyForceCompileInfoBlock.php',
        'Mollie\\Builder\\Content\\UpdateMessageInfoBlock' => __DIR__ . '/../..' . '/src/Builder/Content/UpdateMessageInfoBlock.php',
        'Mollie\\Builder\\FormBuilder' => __DIR__ . '/../..' . '/src/Builder/FormBuilder.php',
        'Mollie\\Builder\\InvoicePdfTemplateBuilder' => __DIR__ . '/../..' . '/src/Builder/InvoicePdfTemplateBuilder.php',
        'Mollie\\Builder\\TemplateBuilderInterface' => __DIR__ . '/../..' . '/src/Builder/TemplateBuilderInterface.php',
        'Mollie\\Command\\TranslationCsvFileGeneratorConsoleCommand' => __DIR__ . '/../..' . '/src/Command/TranslationCsvFileGeneratorConsoleCommand.php',
        'Mollie\\Command\\UpdateTranslationsConsoleCommand' => __DIR__ . '/../..' . '/src/Command/UpdateTranslationsConsoleCommand.php',
        'Mollie\\Command\\UploadTranslationsFromCsvFileConsoleCommand' => __DIR__ . '/../..' . '/src/Command/UploadTranslationsFromCsvFileConsoleCommand.php',
        'Mollie\\Config\\Config' => __DIR__ . '/../..' . '/src/Config/Config.php',
        'Mollie\\Config\\Env' => __DIR__ . '/../..' . '/src/Config/Env.php',
        'Mollie\\Controller\\AbstractMollieController' => __DIR__ . '/../..' . '/src/Controller/AbstractMollieController.php',
        'Mollie\\Controller\\AdminMollieEmailController' => __DIR__ . '/../..' . '/src/Controller/AdminMollieEmailController.php',
        'Mollie\\DTO\\Line' => __DIR__ . '/../..' . '/src/DTO/Line.php',
        'Mollie\\DTO\\Object\\Amount' => __DIR__ . '/../..' . '/src/DTO/Object/Amount.php',
        'Mollie\\DTO\\OrderData' => __DIR__ . '/../..' . '/src/DTO/OrderData.php',
        'Mollie\\DTO\\PaymentData' => __DIR__ . '/../..' . '/src/DTO/PaymentData.php',
        'Mollie\\Enum\\PaymentTypeEnum' => __DIR__ . '/../..' . '/src/Enum/PaymentTypeEnum.php',
        'Mollie\\Exception\\CancelPendingOrderException' => __DIR__ . '/../..' . '/src/Exception/CancelPendingOrderException.php',
        'Mollie\\Exception\\MollieException' => __DIR__ . '/../..' . '/src/Exception/MollieException.php',
        'Mollie\\Exception\\NotImplementedException' => __DIR__ . '/../..' . '/src/Exception/NotImplementedException.php',
        'Mollie\\Exception\\OrderCreationException' => __DIR__ . '/../..' . '/src/Exception/OrderCreationException.php',
        'Mollie\\Exception\\OrderTotalRestrictionException' => __DIR__ . '/../..' . '/src/Exception/OrderTotalRestrictionException.php',
        'Mollie\\Exception\\ShipmentCannotBeSentException' => __DIR__ . '/../..' . '/src/Exception/ShipmentCannotBeSentException.php',
        'Mollie\\Factory\\ContextFactory' => __DIR__ . '/../..' . '/src/Factory/ContextFactory.php',
        'Mollie\\Factory\\CustomerFactory' => __DIR__ . '/../..' . '/src/Factory/CustomerFactory.php',
        'Mollie\\Factory\\ModuleFactory' => __DIR__ . '/../..' . '/src/Factory/ModuleFactory.php',
        'Mollie\\Grid\\Action\\Type\\SecondChanceRowAction' => __DIR__ . '/../..' . '/src/Grid/Action/Type/SecondChanceRowAction.php',
        'Mollie\\Grid\\Definition\\Modifier\\GridDefinitionModifierInterface' => __DIR__ . '/../..' . '/src/Grid/Definition/Modifier/GridDefinitionModifierInterface.php',
        'Mollie\\Grid\\Definition\\Modifier\\OrderGridDefinitionModifier' => __DIR__ . '/../..' . '/src/Grid/Definition/Modifier/OrderGridDefinitionModifier.php',
        'Mollie\\Grid\\Query\\Modifier\\GridQueryModifierInterface' => __DIR__ . '/../..' . '/src/Grid/Query/Modifier/GridQueryModifierInterface.php',
        'Mollie\\Grid\\Query\\Modifier\\OrderGridQueryModifier' => __DIR__ . '/../..' . '/src/Grid/Query/Modifier/OrderGridQueryModifier.php',
        'Mollie\\Grid\\Row\\AccessibilityChecker\\SecondChanceAccessibilityChecker' => __DIR__ . '/../..' . '/src/Grid/Row/AccessibilityChecker/SecondChanceAccessibilityChecker.php',
        'Mollie\\Handler\\Api\\OrderEndpointPaymentTypeHandler' => __DIR__ . '/../..' . '/src/Handler/Api/OrderEndpointPaymentTypeHandler.php',
        'Mollie\\Handler\\Api\\OrderEndpointPaymentTypeHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/Api/OrderEndpointPaymentTypeHandlerInterface.php',
        'Mollie\\Handler\\CartRule\\CartRuleQuantityChangeHandler' => __DIR__ . '/../..' . '/src/Handler/CartRule/CartRuleQuantityChangeHandler.php',
        'Mollie\\Handler\\CartRule\\CartRuleQuantityChangeHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/CartRule/CartRuleQuantityChangeHandlerInterface.php',
        'Mollie\\Handler\\CartRule\\CartRuleQuantityResetHandler' => __DIR__ . '/../..' . '/src/Handler/CartRule/CartRuleQuantityResetHandler.php',
        'Mollie\\Handler\\CartRule\\CartRuleQuantityResetHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/CartRule/CartRuleQuantityResetHandlerInterface.php',
        'Mollie\\Handler\\ErrorHandler\\ErrorHandler' => __DIR__ . '/../..' . '/src/Handler/ErrorHandler/ErrorHandler.php',
        'Mollie\\Handler\\Exception\\ExceptionHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/Exception/ExceptionHandlerInterface.php',
        'Mollie\\Handler\\Exception\\OrderExceptionHandler' => __DIR__ . '/../..' . '/src/Handler/Exception/OrderExceptionHandler.php',
        'Mollie\\Handler\\OrderTotal\\OrderTotalUpdaterHandler' => __DIR__ . '/../..' . '/src/Handler/OrderTotal/OrderTotalUpdaterHandler.php',
        'Mollie\\Handler\\OrderTotal\\OrderTotalUpdaterHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/OrderTotal/OrderTotalUpdaterHandlerInterface.php',
        'Mollie\\Handler\\PaymentOption\\PaymentOptionHandler' => __DIR__ . '/../..' . '/src/Handler/PaymentOption/PaymentOptionHandler.php',
        'Mollie\\Handler\\PaymentOption\\PaymentOptionHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/PaymentOption/PaymentOptionHandlerInterface.php',
        'Mollie\\Handler\\Settings\\PaymentMethodPositionHandler' => __DIR__ . '/../..' . '/src/Handler/Settings/PaymentMethodPositionHandler.php',
        'Mollie\\Handler\\Settings\\PaymentMethodPositionHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/Settings/PaymentMethodPositionHandlerInterface.php',
        'Mollie\\Handler\\Shipment\\ShipmentSenderHandler' => __DIR__ . '/../..' . '/src/Handler/Shipment/ShipmentSenderHandler.php',
        'Mollie\\Handler\\Shipment\\ShipmentSenderHandlerInterface' => __DIR__ . '/../..' . '/src/Handler/Shipment/ShipmentSenderHandlerInterface.php',
        'Mollie\\Install\\DatabaseTableInstaller' => __DIR__ . '/../..' . '/src/Install/DatabaseTableInstaller.php',
        'Mollie\\Install\\DatabaseTableUninstaller' => __DIR__ . '/../..' . '/src/Install/DatabaseTableUninstaller.php',
        'Mollie\\Install\\Installer' => __DIR__ . '/../..' . '/src/Install/Installer.php',
        'Mollie\\Install\\InstallerInterface' => __DIR__ . '/../..' . '/src/Install/InstallerInterface.php',
        'Mollie\\Install\\Uninstall' => __DIR__ . '/../..' . '/src/Install/Uninstall.php',
        'Mollie\\Install\\UninstallerInterface' => __DIR__ . '/../..' . '/src/Install/UninstallerInterface.php',
        'Mollie\\Logger\\PrestaLogger' => __DIR__ . '/../..' . '/src/Logger/PrestaLogger.php',
        'Mollie\\Presenter\\OrderListActionBuilder' => __DIR__ . '/../..' . '/src/Presenter/OrderListActionBuilder.php',
        'Mollie\\Provider\\AbstractCustomLogoProvider' => __DIR__ . '/../..' . '/src/Provider/AbstractCustomLogoProvider.php',
        'Mollie\\Provider\\CreditCardLogoProvider' => __DIR__ . '/../..' . '/src/Provider/CreditCardLogoProvider.php',
        'Mollie\\Provider\\CustomLogoProviderInterface' => __DIR__ . '/../..' . '/src/Provider/CustomLogoProviderInterface.php',
        'Mollie\\Provider\\EnvironmentVersionProvider' => __DIR__ . '/../..' . '/src/Provider/EnvironmentVersionProvider.php',
        'Mollie\\Provider\\EnvironmentVersionProviderInterface' => __DIR__ . '/../..' . '/src/Provider/EnvironmentVersionProviderInterface.php',
        'Mollie\\Provider\\OrderTotalProvider' => __DIR__ . '/../..' . '/src/Provider/OrderTotal/OrderTotalProvider.php',
        'Mollie\\Provider\\OrderTotalProviderInterface' => __DIR__ . '/../..' . '/src/Provider/OrderTotal/OrderTotalProviderInterface.php',
        'Mollie\\Provider\\OrderTotalRestrictionProvider' => __DIR__ . '/../..' . '/src/Provider/OrderTotal/OrderTotalRestrictionProvider.php',
        'Mollie\\Provider\\OrderTotalRestrictionProviderInterface' => __DIR__ . '/../..' . '/src/Provider/OrderTotal/OrderTotalRestrictionProviderInterface.php',
        'Mollie\\Provider\\PaymentFeeProvider' => __DIR__ . '/../..' . '/src/Provider/PaymentFeeProvider.php',
        'Mollie\\Provider\\PaymentFeeProviderInterface' => __DIR__ . '/../..' . '/src/Provider/PaymentFeeProviderInterface.php',
        'Mollie\\Provider\\PaymentMethod\\PaymentMethodOrderTotalRestrictionProvider' => __DIR__ . '/../..' . '/src/Provider/PaymentMethod/PaymentMethodOrderTotalRestrictionProvider.php',
        'Mollie\\Provider\\PaymentMethod\\PaymentMethodOrderTotalRestrictionProviderInterface' => __DIR__ . '/../..' . '/src/Provider/PaymentMethod/PaymentMethodOrderTotalRestrictionProviderInterface.php',
        'Mollie\\Provider\\PaymentOption\\BasePaymentOptionProvider' => __DIR__ . '/../..' . '/src/Provider/PaymentOption/BasePaymentOptionProvider.php',
        'Mollie\\Provider\\PaymentOption\\CreditCardPaymentOptionProvider' => __DIR__ . '/../..' . '/src/Provider/PaymentOption/CreditCardPaymentOptionProvider.php',
        'Mollie\\Provider\\PaymentOption\\IdealPaymentOptionProvider' => __DIR__ . '/../..' . '/src/Provider/PaymentOption/IdealPaymentOptionProvider.php',
        'Mollie\\Provider\\PaymentOption\\PaymentOptionProviderInterface' => __DIR__ . '/../..' . '/src/Provider/PaymentOption/PaymentOptionProviderInterface.php',
        'Mollie\\Provider\\PaymentType\\PaymentTypeIdentificationProvider' => __DIR__ . '/../..' . '/src/Provider/PaymentType/PaymentTypeIdentificationProvider.php',
        'Mollie\\Provider\\PaymentType\\RegularPaymentTypeIdentification' => __DIR__ . '/../..' . '/src/Provider/PaymentType/RegularPaymentTypeIdentification.php',
        'Mollie\\Provider\\PhoneNumberProvider' => __DIR__ . '/../..' . '/src/Provider/PhoneNumberProvider.php',
        'Mollie\\Provider\\PhoneNumberProviderInterface' => __DIR__ . '/../..' . '/src/Provider/PhoneNumberProviderInterface.php',
        'Mollie\\Provider\\Shipment\\AutomaticShipmentSenderStatusesProvider' => __DIR__ . '/../..' . '/src/Provider/Shipment/AutomaticShipmentSenderStatusesProvider.php',
        'Mollie\\Provider\\Shipment\\AutomaticShipmentSenderStatusesProviderInterface' => __DIR__ . '/../..' . '/src/Provider/Shipment/AutomaticShipmentSenderStatusesProviderInterface.php',
        'Mollie\\Provider\\UpdateMessageProvider' => __DIR__ . '/../..' . '/src/Provider/UpdateMessageProvider.php',
        'Mollie\\Provider\\UpdateMessageProviderInterface' => __DIR__ . '/../..' . '/src/Provider/UpdateMessageProviderInterface.php',
        'Mollie\\Repository\\AbstractRepository' => __DIR__ . '/../..' . '/src/Repository/AbstractRepository.php',
        'Mollie\\Repository\\AttributeRepository' => __DIR__ . '/../..' . '/src/Repository/AttributeRepository.php',
        'Mollie\\Repository\\CartRuleRepository' => __DIR__ . '/../..' . '/src/Repository/CartRuleRepository.php',
        'Mollie\\Repository\\CartRuleRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/CartRuleRepositoryInterface.php',
        'Mollie\\Repository\\CountryRepository' => __DIR__ . '/../..' . '/src/Repository/CountryRepository.php',
        'Mollie\\Repository\\CurrencyRepository' => __DIR__ . '/../..' . '/src/Repository/CurrencyRepository.php',
        'Mollie\\Repository\\CurrencyRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/CurrencyRepositoryInterface.php',
        'Mollie\\Repository\\MethodCountryRepository' => __DIR__ . '/../..' . '/src/Repository/MethodCountryRepository.php',
        'Mollie\\Repository\\ModuleRepository' => __DIR__ . '/../..' . '/src/Repository/ModuleRepository.php',
        'Mollie\\Repository\\MolCarrierInformationRepository' => __DIR__ . '/../..' . '/src/Repository/MolCarrierInformationRepository.php',
        'Mollie\\Repository\\MolCustomerRepository' => __DIR__ . '/../..' . '/src/Repository/MolCustomerRepository.php',
        'Mollie\\Repository\\MolPaymentMethodOrderTotalRestrictionRepository' => __DIR__ . '/../..' . '/src/Repository/MolPaymentMethodOrderTotalRestrictionRepository.php',
        'Mollie\\Repository\\MolPaymentMethodOrderTotalRestrictionRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/MolPaymentMethodOrderTotalRestrictionRepositoryInterface.php',
        'Mollie\\Repository\\OrderCartRuleRepository' => __DIR__ . '/../..' . '/src/Repository/OrderCartRuleRepository.php',
        'Mollie\\Repository\\OrderCartRuleRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/OrderCartRuleRepositoryInterface.php',
        'Mollie\\Repository\\OrderFeeRepository' => __DIR__ . '/../..' . '/src/Repository/OrderFeeRepository.php',
        'Mollie\\Repository\\OrderRepository' => __DIR__ . '/../..' . '/src/Repository/OrderRepository.php',
        'Mollie\\Repository\\OrderRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/OrderRepositoryInterface.php',
        'Mollie\\Repository\\OrderShipmentRepository' => __DIR__ . '/../..' . '/src/Repository/OrderShipmentRepository.php',
        'Mollie\\Repository\\OrderStateRepository' => __DIR__ . '/../..' . '/src/Repository/OrderStateRepository.php',
        'Mollie\\Repository\\PaymentMethodRepository' => __DIR__ . '/../..' . '/src/Repository/PaymentMethodRepository.php',
        'Mollie\\Repository\\PaymentMethodRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/PaymentMethodRepositoryInterface.php',
        'Mollie\\Repository\\PendingOrderCartRepository' => __DIR__ . '/../..' . '/src/Repository/PendingOrderCartRepository.php',
        'Mollie\\Repository\\PendingOrderCartRuleRepository' => __DIR__ . '/../..' . '/src/Repository/PendingOrderCartRuleRepository.php',
        'Mollie\\Repository\\PendingOrderCartRuleRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/PendingOrderCartRuleRepositoryInterface.php',
        'Mollie\\Repository\\ReadOnlyRepositoryInterface' => __DIR__ . '/../..' . '/src/Repository/ReadOnlyRepositoryInterface.php',
        'Mollie\\Service\\ApiKeyService' => __DIR__ . '/../..' . '/src/Service/ApiKeyService.php',
        'Mollie\\Service\\ApiService' => __DIR__ . '/../..' . '/src/Service/ApiService.php',
        'Mollie\\Service\\CancelService' => __DIR__ . '/../..' . '/src/Service/CancelService.php',
        'Mollie\\Service\\CarrierService' => __DIR__ . '/../..' . '/src/Service/CarrierService.php',
        'Mollie\\Service\\CartDuplicationService' => __DIR__ . '/../..' . '/src/Service/CartDuplicationService.php',
        'Mollie\\Service\\CartLinesService' => __DIR__ . '/../..' . '/src/Service/CartLinesService.php',
        'Mollie\\Service\\CartRuleDuplicationService' => __DIR__ . '/../..' . '/src/Service/CartRuleDuplicationService.php',
        'Mollie\\Service\\ConfigFieldService' => __DIR__ . '/../..' . '/src/Service/ConfigFieldService.php',
        'Mollie\\Service\\Content\\SmartyTemplateParser' => __DIR__ . '/../..' . '/src/Service/Content/SmartyTemplateParser.php',
        'Mollie\\Service\\Content\\TemplateParserInterface' => __DIR__ . '/../..' . '/src/Service/Content/TemplateParserInterface.php',
        'Mollie\\Service\\CountryService' => __DIR__ . '/../..' . '/src/Service/CountryService.php',
        'Mollie\\Service\\CustomerService' => __DIR__ . '/../..' . '/src/Service/CustomerService.php',
        'Mollie\\Service\\EntityManager\\EntityManagerInterface' => __DIR__ . '/../..' . '/src/Service/EntityManager/EntityManagerInterface.php',
        'Mollie\\Service\\EntityManager\\ObjectModelManager' => __DIR__ . '/../..' . '/src/Service/EntityManager/ObjectModelManager.php',
        'Mollie\\Service\\ErrorDisplayService' => __DIR__ . '/../..' . '/src/Service/ErrorDisplayService.php',
        'Mollie\\Service\\ExceptionService' => __DIR__ . '/../..' . '/src/Service/ExceptionService.php',
        'Mollie\\Service\\IssuerService' => __DIR__ . '/../..' . '/src/Service/IssuerService.php',
        'Mollie\\Service\\LanguageService' => __DIR__ . '/../..' . '/src/Service/LanguageService.php',
        'Mollie\\Service\\MailService' => __DIR__ . '/../..' . '/src/Service/MailService.php',
        'Mollie\\Service\\MemorizeCartService' => __DIR__ . '/../..' . '/src/Service/MemorizeCartService.php',
        'Mollie\\Service\\MolCarrierInformationService' => __DIR__ . '/../..' . '/src/Service/MolCarrierInformationService.php',
        'Mollie\\Service\\MollieOrderInfoService' => __DIR__ . '/../..' . '/src/Service/MollieOrderInfoService.php',
        'Mollie\\Service\\MolliePaymentMailService' => __DIR__ . '/../..' . '/src/Service/MolliePaymentMailService.php',
        'Mollie\\Service\\OrderCartAssociationService' => __DIR__ . '/../..' . '/src/Service/OrderCartAssociationService.php',
        'Mollie\\Service\\OrderFeeService' => __DIR__ . '/../..' . '/src/Service/OrderFeeService.php',
        'Mollie\\Service\\OrderStateImageService' => __DIR__ . '/../..' . '/src/Service/OrderStateImageService.php',
        'Mollie\\Service\\OrderStatusService' => __DIR__ . '/../..' . '/src/Service/OrderStatusService.php',
        'Mollie\\Service\\OrderTotal\\OrderTotalRestrictionService' => __DIR__ . '/../..' . '/src/Service/OrderTotal/OrderTotalRestrictionService.php',
        'Mollie\\Service\\OrderTotal\\OrderTotalRestrictionServiceInterface' => __DIR__ . '/../..' . '/src/Service/OrderTotal/OrderTotalRestrictionServiceInterface.php',
        'Mollie\\Service\\OrderTotal\\OrderTotalService' => __DIR__ . '/../..' . '/src/Service/OrderTotal/OrderTotalService.php',
        'Mollie\\Service\\OrderTotal\\OrderTotalServiceInterface' => __DIR__ . '/../..' . '/src/Service/OrderTotal/OrderTotalServiceInterface.php',
        'Mollie\\Service\\PaymentMethodService' => __DIR__ . '/../..' . '/src/Service/PaymentMethodService.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodOrderRestrictionUpdater' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodOrderRestrictionUpdater.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodOrderRestrictionUpdaterInterface' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodOrderRestrictionUpdaterInterface.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidationInterface' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidationInterface.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\ApplePayPaymentMethodRestrictionValidator' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/ApplePayPaymentMethodRestrictionValidator.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\BasePaymentMethodRestrictionValidator' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/BasePaymentMethodRestrictionValidator.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\EnvironmentVersionSpecificPaymentMethodRestrictionValidator' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/EnvironmentVersionSpecificPaymentMethodRestrictionValidator.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\PaymentMethodRestrictionValidatorInterface' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/PaymentMethodRestrictionValidatorInterface.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\VoucherPaymentMethodRestrictionValidator' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/VoucherPaymentMethodRestrictionValidator.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodSortProvider' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodSortProvider.php',
        'Mollie\\Service\\PaymentMethod\\PaymentMethodSortProviderInterface' => __DIR__ . '/../..' . '/src/Service/PaymentMethod/PaymentMethodSortProviderInterface.php',
        'Mollie\\Service\\PaymentReturnService' => __DIR__ . '/../..' . '/src/Service/PaymentReturnService.php',
        'Mollie\\Service\\PaymentsTranslationService' => __DIR__ . '/../..' . '/src/Service/PaymentsTranslationService.php',
        'Mollie\\Service\\RefundService' => __DIR__ . '/../..' . '/src/Service/RefundService.php',
        'Mollie\\Service\\RepeatOrderLinkFactory' => __DIR__ . '/../..' . '/src/Service/RepeatOrderLinkFactory.php',
        'Mollie\\Service\\RestorePendingCartService' => __DIR__ . '/../..' . '/src/Service/RestorePendingCartService.php',
        'Mollie\\Service\\SettingsSaveService' => __DIR__ . '/../..' . '/src/Service/SettingsSaveService.php',
        'Mollie\\Service\\ShipService' => __DIR__ . '/../..' . '/src/Service/ShipService.php',
        'Mollie\\Service\\ShipmentService' => __DIR__ . '/../..' . '/src/Service/ShipmentService.php',
        'Mollie\\Service\\ShipmentServiceInterface' => __DIR__ . '/../..' . '/src/Service/ShipmentServiceInterface.php',
        'Mollie\\Service\\Shipment\\ShipmentInformationSender' => __DIR__ . '/../..' . '/src/Service/Shipment/ShipmentInformationSender.php',
        'Mollie\\Service\\Shipment\\ShipmentInformationSenderInterface' => __DIR__ . '/../..' . '/src/Service/Shipment/ShipmentInformationSenderInterface.php',
        'Mollie\\Service\\TransactionService' => __DIR__ . '/../..' . '/src/Service/TransactionService.php',
        'Mollie\\Service\\UpgradeNoticeService' => __DIR__ . '/../..' . '/src/Service/UpgradeNoticeService.php',
        'Mollie\\Service\\VoucherService' => __DIR__ . '/../..' . '/src/Service/VoucherService.php',
        'Mollie\\Tracker\\Segment' => __DIR__ . '/../..' . '/src/Tracker/Segment.php',
        'Mollie\\Tracker\\TrackerInterface' => __DIR__ . '/../..' . '/src/Tracker/TrackerInterface.php',
        'Mollie\\Utility\\ArrayUtility' => __DIR__ . '/../..' . '/src/Utility/ArrayUtility.php',
        'Mollie\\Utility\\AssortUtility' => __DIR__ . '/../..' . '/src/Utility/AssortUtility.php',
        'Mollie\\Utility\\CalculationUtility' => __DIR__ . '/../..' . '/src/Utility/CalculationUtility.php',
        'Mollie\\Utility\\CartPriceUtility' => __DIR__ . '/../..' . '/src/Utility/CartPriceUtility.php',
        'Mollie\\Utility\\ContextUtility' => __DIR__ . '/../..' . '/src/Utility/ContextUtility.php',
        'Mollie\\Utility\\CustomLogoUtility' => __DIR__ . '/../..' . '/src/Utility/CustomLogoUtility.php',
        'Mollie\\Utility\\Decoder\\DecoderInterface' => __DIR__ . '/../..' . '/src/Utility/Decoder/DecoderInterface.php',
        'Mollie\\Utility\\Decoder\\JsonDecoder' => __DIR__ . '/../..' . '/src/Utility/Decoder/JsonDecoder.php',
        'Mollie\\Utility\\EnvironmentUtility' => __DIR__ . '/../..' . '/src/Utility/EnvironmentUtility.php',
        'Mollie\\Utility\\HashUtility' => __DIR__ . '/../..' . '/src/Utility/HashUtility.php',
        'Mollie\\Utility\\ImageUtility' => __DIR__ . '/../..' . '/src/Utility/ImageUtility.php',
        'Mollie\\Utility\\LocaleUtility' => __DIR__ . '/../..' . '/src/Utility/LocaleUtility.php',
        'Mollie\\Utility\\MenuLocationUtility' => __DIR__ . '/../..' . '/src/Utility/MenuLocationUtility.php',
        'Mollie\\Utility\\MollieStatusUtility' => __DIR__ . '/../..' . '/src/Utility/MollieStatusUtility.php',
        'Mollie\\Utility\\MultiLangUtility' => __DIR__ . '/../..' . '/src/Utility/MultiLangUtility.php',
        'Mollie\\Utility\\NumberUtility' => __DIR__ . '/../..' . '/src/Utility/NumberUtility.php',
        'Mollie\\Utility\\OrderStatusUtility' => __DIR__ . '/../..' . '/src/Utility/OrderStatusUtility.php',
        'Mollie\\Utility\\PaymentFeeUtility' => __DIR__ . '/../..' . '/src/Utility/PaymentFeeUtility.php',
        'Mollie\\Utility\\PaymentMethodUtility' => __DIR__ . '/../..' . '/src/Utility/PaymentMethodUtility.php',
        'Mollie\\Utility\\RefundUtility' => __DIR__ . '/../..' . '/src/Utility/RefundUtility.php',
        'Mollie\\Utility\\SecureKeyUtility' => __DIR__ . '/../..' . '/src/Utility/SecureKeyUtility.php',
        'Mollie\\Utility\\TagsUtility' => __DIR__ . '/../..' . '/src/Utility/TagsUtility.php',
        'Mollie\\Utility\\TextFormatUtility' => __DIR__ . '/../..' . '/src/Utility/TextFormatUtility.php',
        'Mollie\\Utility\\TextGeneratorUtility' => __DIR__ . '/../..' . '/src/Utility/TextGeneratorUtility.php',
        'Mollie\\Utility\\TimeUtility' => __DIR__ . '/../..' . '/src/Utility/TimeUtility.php',
        'Mollie\\Utility\\TransactionUtility' => __DIR__ . '/../..' . '/src/Utility/TransactionUtility.php',
        'Mollie\\Utility\\UrlPathUtility' => __DIR__ . '/../..' . '/src/Utility/UrlPathUtility.php',
        'Mollie\\Validator\\MailValidatorInterface' => __DIR__ . '/../..' . '/src/Validator/MailValidatorInterface.php',
        'Mollie\\Validator\\NewOrderMailValidator' => __DIR__ . '/../..' . '/src/Validator/NewOrderMailValidator.php',
        'Mollie\\Validator\\OrderCallBackValidator' => __DIR__ . '/../..' . '/src/Validator/OrderCallBackValidator.php',
        'Mollie\\Validator\\OrderConfMailValidator' => __DIR__ . '/../..' . '/src/Validator/OrderConfMailValidator.php',
        'Mollie\\Validator\\VoucherValidator' => __DIR__ . '/../..' . '/src/Validator/VoucherValidator.php',
        'Mollie\\Verification\\OrderTotal\\CanOrderTotalBeUpdated' => __DIR__ . '/../..' . '/src/Verification/OrderTotal/CanOrderTotalBeUpdated.php',
        'Mollie\\Verification\\OrderTotal\\OrderTotalVerificationInterface' => __DIR__ . '/../..' . '/src/Verification/OrderTotal/OrderTotalVerificationInterface.php',
        'Mollie\\Verification\\PaymentType\\CanBeRegularPaymentType' => __DIR__ . '/../..' . '/src/Verification/PaymentType/CanBeRegularPaymentType.php',
        'Mollie\\Verification\\PaymentType\\PaymentTypeVerificationInterface' => __DIR__ . '/../..' . '/src/Verification/PaymentType/PaymentTypeVerificationInterface.php',
        'Mollie\\Verification\\Shipment\\CanSendShipment' => __DIR__ . '/../..' . '/src/Verification/Shipment/CanSendShipment.php',
        'Mollie\\Verification\\Shipment\\ShipmentVerificationInterface' => __DIR__ . '/../..' . '/src/Verification/Shipment/ShipmentVerificationInterface.php',
        'ParseError' => __DIR__ . '/..' . '/symfony/polyfill-php70/Resources/stubs/ParseError.php',
        'SessionUpdateTimestampHandlerInterface' => __DIR__ . '/..' . '/symfony/polyfill-php70/Resources/stubs/SessionUpdateTimestampHandlerInterface.php',
        'TypeError' => __DIR__ . '/..' . '/symfony/polyfill-php70/Resources/stubs/TypeError.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit601ee8dbc6ac234402831dac7772d593::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit601ee8dbc6ac234402831dac7772d593::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit601ee8dbc6ac234402831dac7772d593::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit601ee8dbc6ac234402831dac7772d593::$classMap;

        }, null, ClassLoader::class);
    }
}
