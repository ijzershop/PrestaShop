<?php

// autoload_classmap.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    'AdminMollieAjaxController' => $baseDir . '/controllers/admin/AdminMollieAjaxController.php',
    'AdminMollieModuleController' => $baseDir . '/controllers/admin/AdminMollieModuleController.php',
    'ArithmeticError' => $vendorDir . '/symfony/polyfill-php70/Resources/stubs/ArithmeticError.php',
    'AssertionError' => $vendorDir . '/symfony/polyfill-php70/Resources/stubs/AssertionError.php',
    'Composer\\InstalledVersions' => $vendorDir . '/composer/InstalledVersions.php',
    'DivisionByZeroError' => $vendorDir . '/symfony/polyfill-php70/Resources/stubs/DivisionByZeroError.php',
    'Error' => $vendorDir . '/symfony/polyfill-php70/Resources/stubs/Error.php',
    'MolCarrierInformation' => $baseDir . '/src/Entity/MolCarrierInformation.php',
    'MolCustomer' => $baseDir . '/src/Entity/MolCustomer.php',
    'MolOrderFee' => $baseDir . '/src/Entity/MolOrderFee.php',
    'MolPaymentMethod' => $baseDir . '/src/Entity/MolPaymentMethod.php',
    'MolPaymentMethodIssuer' => $baseDir . '/src/Entity/MolPaymentMethodIssuer.php',
    'MolPendingOrderCart' => $baseDir . '/src/Entity/MolPendingOrderCart.php',
    'MolPendingOrderCartRule' => $baseDir . '/src/Entity/MolPendingOrderCartRule.php',
    'Mollie' => $baseDir . '/mollie.php',
    'MollieAjaxModuleFrontController' => $baseDir . '/controllers/front/ajax.php',
    'MollieFailModuleFrontController' => $baseDir . '/controllers/front/fail.php',
    'MolliePayScreenModuleFrontController' => $baseDir . '/controllers/front/payScreen.php',
    'MolliePaymentModuleFrontController' => $baseDir . '/controllers/front/payment.php',
    'MollieQrcodeModuleFrontController' => $baseDir . '/controllers/front/qrcode.php',
    'MollieReturnModuleFrontController' => $baseDir . '/controllers/front/return.php',
    'MollieWebhookModuleFrontController' => $baseDir . '/controllers/front/webhook.php',
    'Mollie\\Adapter\\ConfigurationAdapter' => $baseDir . '/src/Adapter/ConfigurationAdapter.php',
    'Mollie\\Adapter\\LegacyContext' => $baseDir . '/src/Adapter/LegacyContext.php',
    'Mollie\\Adapter\\ToolsAdapter' => $baseDir . '/src/Adapter/ToolsAdapter.php',
    'Mollie\\Builder\\ApiTestFeedbackBuilder' => $baseDir . '/src/Builder/ApiTestFeedbackBuilder.php',
    'Mollie\\Builder\\Content\\BaseInfoBlock' => $baseDir . '/src/Builder/Content/BaseInfoBlock.php',
    'Mollie\\Builder\\Content\\LogoInfoBlock' => $baseDir . '/src/Builder/Content/LogoInfoBlock.php',
    'Mollie\\Builder\\Content\\PaymentOption\\IdealDropdownInfoBlock' => $baseDir . '/src/Builder/Content/PaymentOption/IdealDropdownInfoBlock.php',
    'Mollie\\Builder\\Content\\RoundingModeInfoBlock' => $baseDir . '/src/Builder/Content/RoundingModeInfoBlock.php',
    'Mollie\\Builder\\Content\\SmartyCacheInfoBlock' => $baseDir . '/src/Builder/Content/SmartyCacheInfoBlock.php',
    'Mollie\\Builder\\Content\\SmartyForceCompileInfoBlock' => $baseDir . '/src/Builder/Content/SmartyForceCompileInfoBlock.php',
    'Mollie\\Builder\\Content\\UpdateMessageInfoBlock' => $baseDir . '/src/Builder/Content/UpdateMessageInfoBlock.php',
    'Mollie\\Builder\\FormBuilder' => $baseDir . '/src/Builder/FormBuilder.php',
    'Mollie\\Builder\\InvoicePdfTemplateBuilder' => $baseDir . '/src/Builder/InvoicePdfTemplateBuilder.php',
    'Mollie\\Builder\\TemplateBuilderInterface' => $baseDir . '/src/Builder/TemplateBuilderInterface.php',
    'Mollie\\Command\\TranslationCsvFileGeneratorConsoleCommand' => $baseDir . '/src/Command/TranslationCsvFileGeneratorConsoleCommand.php',
    'Mollie\\Command\\UpdateTranslationsConsoleCommand' => $baseDir . '/src/Command/UpdateTranslationsConsoleCommand.php',
    'Mollie\\Command\\UploadTranslationsFromCsvFileConsoleCommand' => $baseDir . '/src/Command/UploadTranslationsFromCsvFileConsoleCommand.php',
    'Mollie\\Config\\Config' => $baseDir . '/src/Config/Config.php',
    'Mollie\\Config\\Env' => $baseDir . '/src/Config/Env.php',
    'Mollie\\Controller\\AbstractMollieController' => $baseDir . '/src/Controller/AbstractMollieController.php',
    'Mollie\\Controller\\AdminMollieEmailController' => $baseDir . '/src/Controller/AdminMollieEmailController.php',
    'Mollie\\DTO\\Line' => $baseDir . '/src/DTO/Line.php',
    'Mollie\\DTO\\Object\\Amount' => $baseDir . '/src/DTO/Object/Amount.php',
    'Mollie\\DTO\\OrderData' => $baseDir . '/src/DTO/OrderData.php',
    'Mollie\\DTO\\PaymentData' => $baseDir . '/src/DTO/PaymentData.php',
    'Mollie\\Enum\\PaymentTypeEnum' => $baseDir . '/src/Enum/PaymentTypeEnum.php',
    'Mollie\\Exception\\CancelPendingOrderException' => $baseDir . '/src/Exception/CancelPendingOrderException.php',
    'Mollie\\Exception\\MollieException' => $baseDir . '/src/Exception/MollieException.php',
    'Mollie\\Exception\\NotImplementedException' => $baseDir . '/src/Exception/NotImplementedException.php',
    'Mollie\\Exception\\OrderCreationException' => $baseDir . '/src/Exception/OrderCreationException.php',
    'Mollie\\Exception\\ShipmentCannotBeSentException' => $baseDir . '/src/Exception/ShipmentCannotBeSentException.php',
    'Mollie\\Factory\\ContextFactory' => $baseDir . '/src/Factory/ContextFactory.php',
    'Mollie\\Factory\\CustomerFactory' => $baseDir . '/src/Factory/CustomerFactory.php',
    'Mollie\\Factory\\ModuleFactory' => $baseDir . '/src/Factory/ModuleFactory.php',
    'Mollie\\Grid\\Action\\Type\\SecondChanceRowAction' => $baseDir . '/src/Grid/Action/Type/SecondChanceRowAction.php',
    'Mollie\\Grid\\Definition\\Modifier\\GridDefinitionModifierInterface' => $baseDir . '/src/Grid/Definition/Modifier/GridDefinitionModifierInterface.php',
    'Mollie\\Grid\\Definition\\Modifier\\OrderGridDefinitionModifier' => $baseDir . '/src/Grid/Definition/Modifier/OrderGridDefinitionModifier.php',
    'Mollie\\Grid\\Query\\Modifier\\GridQueryModifierInterface' => $baseDir . '/src/Grid/Query/Modifier/GridQueryModifierInterface.php',
    'Mollie\\Grid\\Query\\Modifier\\OrderGridQueryModifier' => $baseDir . '/src/Grid/Query/Modifier/OrderGridQueryModifier.php',
    'Mollie\\Grid\\Row\\AccessibilityChecker\\SecondChanceAccessibilityChecker' => $baseDir . '/src/Grid/Row/AccessibilityChecker/SecondChanceAccessibilityChecker.php',
    'Mollie\\Handler\\Api\\OrderEndpointPaymentTypeHandler' => $baseDir . '/src/Handler/Api/OrderEndpointPaymentTypeHandler.php',
    'Mollie\\Handler\\Api\\OrderEndpointPaymentTypeHandlerInterface' => $baseDir . '/src/Handler/Api/OrderEndpointPaymentTypeHandlerInterface.php',
    'Mollie\\Handler\\CartRule\\CartRuleQuantityChangeHandler' => $baseDir . '/src/Handler/CartRule/CartRuleQuantityChangeHandler.php',
    'Mollie\\Handler\\CartRule\\CartRuleQuantityChangeHandlerInterface' => $baseDir . '/src/Handler/CartRule/CartRuleQuantityChangeHandlerInterface.php',
    'Mollie\\Handler\\CartRule\\CartRuleQuantityResetHandler' => $baseDir . '/src/Handler/CartRule/CartRuleQuantityResetHandler.php',
    'Mollie\\Handler\\CartRule\\CartRuleQuantityResetHandlerInterface' => $baseDir . '/src/Handler/CartRule/CartRuleQuantityResetHandlerInterface.php',
    'Mollie\\Handler\\ErrorHandler\\ErrorHandler' => $baseDir . '/src/Handler/ErrorHandler/ErrorHandler.php',
    'Mollie\\Handler\\ErrorHandler\\ModuleFilteredRavenClient' => $baseDir . '/src/Handler/ErrorHandler/ModuleFilteredRavenClient.php',
    'Mollie\\Handler\\Exception\\ExceptionHandlerInterface' => $baseDir . '/src/Handler/Exception/ExceptionHandlerInterface.php',
    'Mollie\\Handler\\Exception\\OrderExceptionHandler' => $baseDir . '/src/Handler/Exception/OrderExceptionHandler.php',
    'Mollie\\Handler\\PaymentOption\\PaymentOptionHandler' => $baseDir . '/src/Handler/PaymentOption/PaymentOptionHandler.php',
    'Mollie\\Handler\\PaymentOption\\PaymentOptionHandlerInterface' => $baseDir . '/src/Handler/PaymentOption/PaymentOptionHandlerInterface.php',
    'Mollie\\Handler\\Settings\\PaymentMethodPositionHandler' => $baseDir . '/src/Handler/Settings/PaymentMethodPositionHandler.php',
    'Mollie\\Handler\\Settings\\PaymentMethodPositionHandlerInterface' => $baseDir . '/src/Handler/Settings/PaymentMethodPositionHandlerInterface.php',
    'Mollie\\Handler\\Shipment\\ShipmentSenderHandler' => $baseDir . '/src/Handler/Shipment/ShipmentSenderHandler.php',
    'Mollie\\Handler\\Shipment\\ShipmentSenderHandlerInterface' => $baseDir . '/src/Handler/Shipment/ShipmentSenderHandlerInterface.php',
    'Mollie\\Install\\DatabaseTableInstaller' => $baseDir . '/src/Install/DatabaseTableInstaller.php',
    'Mollie\\Install\\DatabaseTableUninstaller' => $baseDir . '/src/Install/DatabaseTableUninstaller.php',
    'Mollie\\Install\\Installer' => $baseDir . '/src/Install/Installer.php',
    'Mollie\\Install\\InstallerInterface' => $baseDir . '/src/Install/InstallerInterface.php',
    'Mollie\\Install\\Uninstall' => $baseDir . '/src/Install/Uninstall.php',
    'Mollie\\Install\\UninstallerInterface' => $baseDir . '/src/Install/UninstallerInterface.php',
    'Mollie\\Logger\\PrestaLogger' => $baseDir . '/src/Logger/PrestaLogger.php',
    'Mollie\\Presenter\\OrderListActionBuilder' => $baseDir . '/src/Presenter/OrderListActionBuilder.php',
    'Mollie\\Provider\\AbstractCustomLogoProvider' => $baseDir . '/src/Provider/AbstractCustomLogoProvider.php',
    'Mollie\\Provider\\CreditCardLogoProvider' => $baseDir . '/src/Provider/CreditCardLogoProvider.php',
    'Mollie\\Provider\\CustomLogoProviderInterface' => $baseDir . '/src/Provider/CustomLogoProviderInterface.php',
    'Mollie\\Provider\\EnvironmentVersionProvider' => $baseDir . '/src/Provider/EnvironmentVersionProvider.php',
    'Mollie\\Provider\\EnvironmentVersionProviderInterface' => $baseDir . '/src/Provider/EnvironmentVersionProviderInterface.php',
    'Mollie\\Provider\\OrderTotalProvider' => $baseDir . '/src/Provider/OrderTotal/OrderTotalProvider.php',
    'Mollie\\Provider\\OrderTotalProviderInterface' => $baseDir . '/src/Provider/OrderTotal/OrderTotalProviderInterface.php',
    'Mollie\\Provider\\PaymentFeeProvider' => $baseDir . '/src/Provider/PaymentFeeProvider.php',
    'Mollie\\Provider\\PaymentFeeProviderInterface' => $baseDir . '/src/Provider/PaymentFeeProviderInterface.php',
    'Mollie\\Provider\\PaymentOption\\BasePaymentOptionProvider' => $baseDir . '/src/Provider/PaymentOption/BasePaymentOptionProvider.php',
    'Mollie\\Provider\\PaymentOption\\CreditCardPaymentOptionProvider' => $baseDir . '/src/Provider/PaymentOption/CreditCardPaymentOptionProvider.php',
    'Mollie\\Provider\\PaymentOption\\IdealPaymentOptionProvider' => $baseDir . '/src/Provider/PaymentOption/IdealPaymentOptionProvider.php',
    'Mollie\\Provider\\PaymentOption\\PaymentOptionProviderInterface' => $baseDir . '/src/Provider/PaymentOption/PaymentOptionProviderInterface.php',
    'Mollie\\Provider\\PaymentType\\PaymentTypeIdentificationProvider' => $baseDir . '/src/Provider/PaymentType/PaymentTypeIdentificationProvider.php',
    'Mollie\\Provider\\PaymentType\\RegularPaymentTypeIdentification' => $baseDir . '/src/Provider/PaymentType/RegularPaymentTypeIdentification.php',
    'Mollie\\Provider\\PhoneNumberProvider' => $baseDir . '/src/Provider/PhoneNumberProvider.php',
    'Mollie\\Provider\\PhoneNumberProviderInterface' => $baseDir . '/src/Provider/PhoneNumberProviderInterface.php',
    'Mollie\\Provider\\Shipment\\AutomaticShipmentSenderStatusesProvider' => $baseDir . '/src/Provider/Shipment/AutomaticShipmentSenderStatusesProvider.php',
    'Mollie\\Provider\\Shipment\\AutomaticShipmentSenderStatusesProviderInterface' => $baseDir . '/src/Provider/Shipment/AutomaticShipmentSenderStatusesProviderInterface.php',
    'Mollie\\Provider\\UpdateMessageProvider' => $baseDir . '/src/Provider/UpdateMessageProvider.php',
    'Mollie\\Provider\\UpdateMessageProviderInterface' => $baseDir . '/src/Provider/UpdateMessageProviderInterface.php',
    'Mollie\\Repository\\AbstractRepository' => $baseDir . '/src/Repository/AbstractRepository.php',
    'Mollie\\Repository\\AttributeRepository' => $baseDir . '/src/Repository/AttributeRepository.php',
    'Mollie\\Repository\\CartRuleRepository' => $baseDir . '/src/Repository/CartRuleRepository.php',
    'Mollie\\Repository\\CartRuleRepositoryInterface' => $baseDir . '/src/Repository/CartRuleRepositoryInterface.php',
    'Mollie\\Repository\\CountryRepository' => $baseDir . '/src/Repository/CountryRepository.php',
    'Mollie\\Repository\\CurrencyRepository' => $baseDir . '/src/Repository/CurrencyRepository.php',
    'Mollie\\Repository\\CurrencyRepositoryInterface' => $baseDir . '/src/Repository/CurrencyRepositoryInterface.php',
    'Mollie\\Repository\\MethodCountryRepository' => $baseDir . '/src/Repository/MethodCountryRepository.php',
    'Mollie\\Repository\\ModuleRepository' => $baseDir . '/src/Repository/ModuleRepository.php',
    'Mollie\\Repository\\MolCarrierInformationRepository' => $baseDir . '/src/Repository/MolCarrierInformationRepository.php',
    'Mollie\\Repository\\MolCustomerRepository' => $baseDir . '/src/Repository/MolCustomerRepository.php',
    'Mollie\\Repository\\OrderCartRuleRepository' => $baseDir . '/src/Repository/OrderCartRuleRepository.php',
    'Mollie\\Repository\\OrderCartRuleRepositoryInterface' => $baseDir . '/src/Repository/OrderCartRuleRepositoryInterface.php',
    'Mollie\\Repository\\OrderFeeRepository' => $baseDir . '/src/Repository/OrderFeeRepository.php',
    'Mollie\\Repository\\OrderRepository' => $baseDir . '/src/Repository/OrderRepository.php',
    'Mollie\\Repository\\OrderRepositoryInterface' => $baseDir . '/src/Repository/OrderRepositoryInterface.php',
    'Mollie\\Repository\\OrderShipmentRepository' => $baseDir . '/src/Repository/OrderShipmentRepository.php',
    'Mollie\\Repository\\OrderStateRepository' => $baseDir . '/src/Repository/OrderStateRepository.php',
    'Mollie\\Repository\\PaymentMethodRepository' => $baseDir . '/src/Repository/PaymentMethodRepository.php',
    'Mollie\\Repository\\PaymentMethodRepositoryInterface' => $baseDir . '/src/Repository/PaymentMethodRepositoryInterface.php',
    'Mollie\\Repository\\PendingOrderCartRepository' => $baseDir . '/src/Repository/PendingOrderCartRepository.php',
    'Mollie\\Repository\\PendingOrderCartRuleRepository' => $baseDir . '/src/Repository/PendingOrderCartRuleRepository.php',
    'Mollie\\Repository\\PendingOrderCartRuleRepositoryInterface' => $baseDir . '/src/Repository/PendingOrderCartRuleRepositoryInterface.php',
    'Mollie\\Repository\\ReadOnlyRepositoryInterface' => $baseDir . '/src/Repository/ReadOnlyRepositoryInterface.php',
    'Mollie\\Service\\ApiKeyService' => $baseDir . '/src/Service/ApiKeyService.php',
    'Mollie\\Service\\ApiService' => $baseDir . '/src/Service/ApiService.php',
    'Mollie\\Service\\CancelService' => $baseDir . '/src/Service/CancelService.php',
    'Mollie\\Service\\CarrierService' => $baseDir . '/src/Service/CarrierService.php',
    'Mollie\\Service\\CartLinesService' => $baseDir . '/src/Service/CartLinesService.php',
    'Mollie\\Service\\ConfigFieldService' => $baseDir . '/src/Service/ConfigFieldService.php',
    'Mollie\\Service\\Content\\SmartyTemplateParser' => $baseDir . '/src/Service/Content/SmartyTemplateParser.php',
    'Mollie\\Service\\Content\\TemplateParserInterface' => $baseDir . '/src/Service/Content/TemplateParserInterface.php',
    'Mollie\\Service\\CountryService' => $baseDir . '/src/Service/CountryService.php',
    'Mollie\\Service\\CustomerService' => $baseDir . '/src/Service/CustomerService.php',
    'Mollie\\Service\\EntityManager\\EntityManagerInterface' => $baseDir . '/src/Service/EntityManager/EntityManagerInterface.php',
    'Mollie\\Service\\EntityManager\\ObjectModelManager' => $baseDir . '/src/Service/EntityManager/ObjectModelManager.php',
    'Mollie\\Service\\ErrorDisplayService' => $baseDir . '/src/Service/ErrorDisplayService.php',
    'Mollie\\Service\\ExceptionService' => $baseDir . '/src/Service/ExceptionService.php',
    'Mollie\\Service\\IssuerService' => $baseDir . '/src/Service/IssuerService.php',
    'Mollie\\Service\\LanguageService' => $baseDir . '/src/Service/LanguageService.php',
    'Mollie\\Service\\MailService' => $baseDir . '/src/Service/MailService.php',
    'Mollie\\Service\\MolCarrierInformationService' => $baseDir . '/src/Service/MolCarrierInformationService.php',
    'Mollie\\Service\\MollieOrderInfoService' => $baseDir . '/src/Service/MollieOrderInfoService.php',
    'Mollie\\Service\\MolliePaymentMailService' => $baseDir . '/src/Service/MolliePaymentMailService.php',
    'Mollie\\Service\\OrderFeeService' => $baseDir . '/src/Service/OrderFeeService.php',
    'Mollie\\Service\\OrderStateImageService' => $baseDir . '/src/Service/OrderStateImageService.php',
    'Mollie\\Service\\OrderStatusService' => $baseDir . '/src/Service/OrderStatusService.php',
    'Mollie\\Service\\PaymentMethodService' => $baseDir . '/src/Service/PaymentMethodService.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidationInterface' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidationInterface.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\ApplePayPaymentMethodRestrictionValidator' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/ApplePayPaymentMethodRestrictionValidator.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\BasePaymentMethodRestrictionValidator' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/BasePaymentMethodRestrictionValidator.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\EnvironmentVersionSpecificPaymentMethodRestrictionValidator' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/EnvironmentVersionSpecificPaymentMethodRestrictionValidator.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\PaymentMethodRestrictionValidatorInterface' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/PaymentMethodRestrictionValidatorInterface.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodRestrictionValidation\\VoucherPaymentMethodRestrictionValidator' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodRestrictionValidation/VoucherPaymentMethodRestrictionValidator.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodSortProvider' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodSortProvider.php',
    'Mollie\\Service\\PaymentMethod\\PaymentMethodSortProviderInterface' => $baseDir . '/src/Service/PaymentMethod/PaymentMethodSortProviderInterface.php',
    'Mollie\\Service\\PaymentReturnService' => $baseDir . '/src/Service/PaymentReturnService.php',
    'Mollie\\Service\\PaymentsTranslationService' => $baseDir . '/src/Service/PaymentsTranslationService.php',
    'Mollie\\Service\\RefundService' => $baseDir . '/src/Service/RefundService.php',
    'Mollie\\Service\\RepeatOrderLinkFactory' => $baseDir . '/src/Service/RepeatOrderLinkFactory.php',
    'Mollie\\Service\\SettingsSaveService' => $baseDir . '/src/Service/SettingsSaveService.php',
    'Mollie\\Service\\ShipService' => $baseDir . '/src/Service/ShipService.php',
    'Mollie\\Service\\ShipmentService' => $baseDir . '/src/Service/ShipmentService.php',
    'Mollie\\Service\\ShipmentServiceInterface' => $baseDir . '/src/Service/ShipmentServiceInterface.php',
    'Mollie\\Service\\Shipment\\ShipmentInformationSender' => $baseDir . '/src/Service/Shipment/ShipmentInformationSender.php',
    'Mollie\\Service\\Shipment\\ShipmentInformationSenderInterface' => $baseDir . '/src/Service/Shipment/ShipmentInformationSenderInterface.php',
    'Mollie\\Service\\TransactionService' => $baseDir . '/src/Service/TransactionService.php',
    'Mollie\\Service\\UpgradeNoticeService' => $baseDir . '/src/Service/UpgradeNoticeService.php',
    'Mollie\\Service\\VoucherService' => $baseDir . '/src/Service/VoucherService.php',
    'Mollie\\Tracker\\Segment' => $baseDir . '/src/Tracker/Segment.php',
    'Mollie\\Tracker\\TrackerInterface' => $baseDir . '/src/Tracker/TrackerInterface.php',
    'Mollie\\Utility\\ArrayUtility' => $baseDir . '/src/Utility/ArrayUtility.php',
    'Mollie\\Utility\\AssortUtility' => $baseDir . '/src/Utility/AssortUtility.php',
    'Mollie\\Utility\\CalculationUtility' => $baseDir . '/src/Utility/CalculationUtility.php',
    'Mollie\\Utility\\CartPriceUtility' => $baseDir . '/src/Utility/CartPriceUtility.php',
    'Mollie\\Utility\\ContextUtility' => $baseDir . '/src/Utility/ContextUtility.php',
    'Mollie\\Utility\\CustomLogoUtility' => $baseDir . '/src/Utility/CustomLogoUtility.php',
    'Mollie\\Utility\\Decoder\\DecoderInterface' => $baseDir . '/src/Utility/Decoder/DecoderInterface.php',
    'Mollie\\Utility\\Decoder\\JsonDecoder' => $baseDir . '/src/Utility/Decoder/JsonDecoder.php',
    'Mollie\\Utility\\EnvironmentUtility' => $baseDir . '/src/Utility/EnvironmentUtility.php',
    'Mollie\\Utility\\HashUtility' => $baseDir . '/src/Utility/HashUtility.php',
    'Mollie\\Utility\\ImageUtility' => $baseDir . '/src/Utility/ImageUtility.php',
    'Mollie\\Utility\\LocaleUtility' => $baseDir . '/src/Utility/LocaleUtility.php',
    'Mollie\\Utility\\MenuLocationUtility' => $baseDir . '/src/Utility/MenuLocationUtility.php',
    'Mollie\\Utility\\MollieStatusUtility' => $baseDir . '/src/Utility/MollieStatusUtility.php',
    'Mollie\\Utility\\MultiLangUtility' => $baseDir . '/src/Utility/MultiLangUtility.php',
    'Mollie\\Utility\\NumberUtility' => $baseDir . '/src/Utility/NumberUtility.php',
    'Mollie\\Utility\\OrderNumberUtility' => $baseDir . '/src/Utility/OrderNumberUtility.php',
    'Mollie\\Utility\\OrderStatusUtility' => $baseDir . '/src/Utility/OrderStatusUtility.php',
    'Mollie\\Utility\\PaymentFeeUtility' => $baseDir . '/src/Utility/PaymentFeeUtility.php',
    'Mollie\\Utility\\PaymentMethodUtility' => $baseDir . '/src/Utility/PaymentMethodUtility.php',
    'Mollie\\Utility\\RefundUtility' => $baseDir . '/src/Utility/RefundUtility.php',
    'Mollie\\Utility\\SecureKeyUtility' => $baseDir . '/src/Utility/SecureKeyUtility.php',
    'Mollie\\Utility\\TagsUtility' => $baseDir . '/src/Utility/TagsUtility.php',
    'Mollie\\Utility\\TextFormatUtility' => $baseDir . '/src/Utility/TextFormatUtility.php',
    'Mollie\\Utility\\TextGeneratorUtility' => $baseDir . '/src/Utility/TextGeneratorUtility.php',
    'Mollie\\Utility\\TimeUtility' => $baseDir . '/src/Utility/TimeUtility.php',
    'Mollie\\Utility\\TransactionUtility' => $baseDir . '/src/Utility/TransactionUtility.php',
    'Mollie\\Utility\\UrlPathUtility' => $baseDir . '/src/Utility/UrlPathUtility.php',
    'Mollie\\Validator\\MailValidatorInterface' => $baseDir . '/src/Validator/MailValidatorInterface.php',
    'Mollie\\Validator\\NewOrderMailValidator' => $baseDir . '/src/Validator/NewOrderMailValidator.php',
    'Mollie\\Validator\\OrderCallBackValidator' => $baseDir . '/src/Validator/OrderCallBackValidator.php',
    'Mollie\\Validator\\OrderConfMailValidator' => $baseDir . '/src/Validator/OrderConfMailValidator.php',
    'Mollie\\Validator\\VoucherValidator' => $baseDir . '/src/Validator/VoucherValidator.php',
    'Mollie\\Verification\\PaymentType\\CanBeRegularPaymentType' => $baseDir . '/src/Verification/PaymentType/CanBeRegularPaymentType.php',
    'Mollie\\Verification\\PaymentType\\PaymentTypeVerificationInterface' => $baseDir . '/src/Verification/PaymentType/PaymentTypeVerificationInterface.php',
    'Mollie\\Verification\\Shipment\\CanSendShipment' => $baseDir . '/src/Verification/Shipment/CanSendShipment.php',
    'Mollie\\Verification\\Shipment\\ShipmentVerificationInterface' => $baseDir . '/src/Verification/Shipment/ShipmentVerificationInterface.php',
    'ParseError' => $vendorDir . '/symfony/polyfill-php70/Resources/stubs/ParseError.php',
    'PhpCsFixer\\Diff\\GeckoPackages\\DiffOutputBuilder\\ConfigurationException' => $vendorDir . '/php-cs-fixer/diff/src/GeckoPackages/DiffOutputBuilder/ConfigurationException.php',
    'PhpCsFixer\\Diff\\GeckoPackages\\DiffOutputBuilder\\UnifiedDiffOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/GeckoPackages/DiffOutputBuilder/UnifiedDiffOutputBuilder.php',
    'PhpCsFixer\\Diff\\v1_4\\Chunk' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/Chunk.php',
    'PhpCsFixer\\Diff\\v1_4\\Diff' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/Diff.php',
    'PhpCsFixer\\Diff\\v1_4\\Differ' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/Differ.php',
    'PhpCsFixer\\Diff\\v1_4\\LCS\\LongestCommonSubsequence' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/LCS/LongestCommonSubsequence.php',
    'PhpCsFixer\\Diff\\v1_4\\LCS\\MemoryEfficientImplementation' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/LCS/MemoryEfficientLongestCommonSubsequenceImplementation.php',
    'PhpCsFixer\\Diff\\v1_4\\LCS\\TimeEfficientImplementation' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/LCS/TimeEfficientLongestCommonSubsequenceImplementation.php',
    'PhpCsFixer\\Diff\\v1_4\\Line' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/Line.php',
    'PhpCsFixer\\Diff\\v1_4\\Parser' => $vendorDir . '/php-cs-fixer/diff/src/v1_4/Parser.php',
    'PhpCsFixer\\Diff\\v2_0\\Chunk' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Chunk.php',
    'PhpCsFixer\\Diff\\v2_0\\Diff' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Diff.php',
    'PhpCsFixer\\Diff\\v2_0\\Differ' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Differ.php',
    'PhpCsFixer\\Diff\\v2_0\\Exception' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Exception/Exception.php',
    'PhpCsFixer\\Diff\\v2_0\\InvalidArgumentException' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Exception/InvalidArgumentException.php',
    'PhpCsFixer\\Diff\\v2_0\\Line' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Line.php',
    'PhpCsFixer\\Diff\\v2_0\\LongestCommonSubsequenceCalculator' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/LongestCommonSubsequenceCalculator.php',
    'PhpCsFixer\\Diff\\v2_0\\MemoryEfficientLongestCommonSubsequenceCalculator' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/MemoryEfficientLongestCommonSubsequenceCalculator.php',
    'PhpCsFixer\\Diff\\v2_0\\Output\\AbstractChunkOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Output/AbstractChunkOutputBuilder.php',
    'PhpCsFixer\\Diff\\v2_0\\Output\\DiffOnlyOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Output/DiffOnlyOutputBuilder.php',
    'PhpCsFixer\\Diff\\v2_0\\Output\\DiffOutputBuilderInterface' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Output/DiffOutputBuilderInterface.php',
    'PhpCsFixer\\Diff\\v2_0\\Output\\UnifiedDiffOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Output/UnifiedDiffOutputBuilder.php',
    'PhpCsFixer\\Diff\\v2_0\\Parser' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/Parser.php',
    'PhpCsFixer\\Diff\\v2_0\\TimeEfficientLongestCommonSubsequenceCalculator' => $vendorDir . '/php-cs-fixer/diff/src/v2_0/TimeEfficientLongestCommonSubsequenceCalculator.php',
    'PhpCsFixer\\Diff\\v3_0\\Chunk' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Chunk.php',
    'PhpCsFixer\\Diff\\v3_0\\ConfigurationException' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Exception/ConfigurationException.php',
    'PhpCsFixer\\Diff\\v3_0\\Diff' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Diff.php',
    'PhpCsFixer\\Diff\\v3_0\\Differ' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Differ.php',
    'PhpCsFixer\\Diff\\v3_0\\Exception' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Exception/Exception.php',
    'PhpCsFixer\\Diff\\v3_0\\InvalidArgumentException' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Exception/InvalidArgumentException.php',
    'PhpCsFixer\\Diff\\v3_0\\Line' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Line.php',
    'PhpCsFixer\\Diff\\v3_0\\LongestCommonSubsequenceCalculator' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/LongestCommonSubsequenceCalculator.php',
    'PhpCsFixer\\Diff\\v3_0\\MemoryEfficientLongestCommonSubsequenceCalculator' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/MemoryEfficientLongestCommonSubsequenceCalculator.php',
    'PhpCsFixer\\Diff\\v3_0\\Output\\AbstractChunkOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Output/AbstractChunkOutputBuilder.php',
    'PhpCsFixer\\Diff\\v3_0\\Output\\DiffOnlyOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Output/DiffOnlyOutputBuilder.php',
    'PhpCsFixer\\Diff\\v3_0\\Output\\DiffOutputBuilderInterface' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Output/DiffOutputBuilderInterface.php',
    'PhpCsFixer\\Diff\\v3_0\\Output\\StrictUnifiedDiffOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Output/StrictUnifiedDiffOutputBuilder.php',
    'PhpCsFixer\\Diff\\v3_0\\Output\\UnifiedDiffOutputBuilder' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Output/UnifiedDiffOutputBuilder.php',
    'PhpCsFixer\\Diff\\v3_0\\Parser' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/Parser.php',
    'PhpCsFixer\\Diff\\v3_0\\TimeEfficientLongestCommonSubsequenceCalculator' => $vendorDir . '/php-cs-fixer/diff/src/v3_0/TimeEfficientLongestCommonSubsequenceCalculator.php',
    'PhpCsFixer\\Tests\\InterimTestCase' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/TestCase.php',
    'PhpCsFixer\\Tests\\TestCase' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/TestCase.php',
    'PhpCsFixer\\Tests\\Test\\AbstractFixerTestCase' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/AbstractFixerTestCase.php',
    'PhpCsFixer\\Tests\\Test\\AbstractIntegrationCaseFactory' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/AbstractIntegrationCaseFactory.php',
    'PhpCsFixer\\Tests\\Test\\AbstractIntegrationTestCase' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/AbstractIntegrationTestCase.php',
    'PhpCsFixer\\Tests\\Test\\Assert\\AssertTokensTrait' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/Assert/AssertTokensTrait.php',
    'PhpCsFixer\\Tests\\Test\\IntegrationCase' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/IntegrationCase.php',
    'PhpCsFixer\\Tests\\Test\\IntegrationCaseFactory' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/IntegrationCaseFactory.php',
    'PhpCsFixer\\Tests\\Test\\IntegrationCaseFactoryInterface' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/IntegrationCaseFactoryInterface.php',
    'PhpCsFixer\\Tests\\Test\\InternalIntegrationCaseFactory' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/InternalIntegrationCaseFactory.php',
    'PhpCsFixer\\Tests\\Test\\IsIdenticalConstraint' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/IsIdenticalConstraint.php',
    'PhpCsFixer\\Tests\\Test\\TokensWithObservedTransformers' => $vendorDir . '/friendsofphp/php-cs-fixer/tests/Test/TokensWithObservedTransformers.php',
    'SessionUpdateTimestampHandlerInterface' => $vendorDir . '/symfony/polyfill-php70/Resources/stubs/SessionUpdateTimestampHandlerInterface.php',
    'TypeError' => $vendorDir . '/symfony/polyfill-php70/Resources/stubs/TypeError.php',
);
