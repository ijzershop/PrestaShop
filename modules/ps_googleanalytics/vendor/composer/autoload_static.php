<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit1f7441557b348dfa7bb0221084f52fe6
{
    public static $classMap = array (
        'AdminGanalyticsAjaxController' => __DIR__ . '/../..' . '/controllers/admin/AdminGanalyticsAjax.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Database\\Install' => __DIR__ . '/../..' . '/classes/Database/Install.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Database\\Uninstall' => __DIR__ . '/../..' . '/classes/Database/Uninstall.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Form\\ConfigurationForm' => __DIR__ . '/../..' . '/classes/Form/ConfigurationForm.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\GoogleAnalyticsTools' => __DIR__ . '/../..' . '/classes/GoogleAnalyticsTools.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Handler\\GanalyticsDataHandler' => __DIR__ . '/../..' . '/classes/Handler/GanalyticsDataHandler.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Handler\\GanalyticsJsHandler' => __DIR__ . '/../..' . '/classes/Handler/GanalyticsJsHandler.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Handler\\ModuleHandler' => __DIR__ . '/../..' . '/classes/Handler/ModuleHandler.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookActionCarrierProcess' => __DIR__ . '/../..' . '/classes/Hook/HookActionCarrierProcess.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookActionCartSave' => __DIR__ . '/../..' . '/classes/Hook/HookActionCartSave.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookActionProductCancel' => __DIR__ . '/../..' . '/classes/Hook/HookActionProductCancel.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookDisplayBackOfficeHeader' => __DIR__ . '/../..' . '/classes/Hook/HookDisplayBackOfficeHeader.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookDisplayFooter' => __DIR__ . '/../..' . '/classes/Hook/HookDisplayFooter.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookDisplayFooterProduct' => __DIR__ . '/../..' . '/classes/Hook/HookDisplayFooterProduct.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookDisplayHeader' => __DIR__ . '/../..' . '/classes/Hook/HookDisplayHeader.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookDisplayHome' => __DIR__ . '/../..' . '/classes/Hook/HookDisplayHome.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookDisplayOrderConfirmation' => __DIR__ . '/../..' . '/classes/Hook/HookDisplayOrderConfirmation.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\HookInterface' => __DIR__ . '/../..' . '/classes/Hook/HookInterface.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Hooks\\WrapperInterface' => __DIR__ . '/../..' . '/classes/Wrapper/WrapperInterface.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Repository\\CarrierRepository' => __DIR__ . '/../..' . '/classes/Repository/CarrierRepository.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Repository\\GanalyticsDataRepository' => __DIR__ . '/../..' . '/classes/Repository/GanalyticsDataRepository.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Repository\\GanalyticsRepository' => __DIR__ . '/../..' . '/classes/Repository/GanalyticsRepository.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Wrapper\\OrderWrapper' => __DIR__ . '/../..' . '/classes/Wrapper/OrderWrapper.php',
        'PrestaShop\\Module\\Ps_Googleanalytics\\Wrapper\\ProductWrapper' => __DIR__ . '/../..' . '/classes/Wrapper/ProductWrapper.php',
        'Ps_Googleanalytics' => __DIR__ . '/../..' . '/ps_googleanalytics.php',
        'ps_GoogleanalyticsAjaxModuleFrontController' => __DIR__ . '/../..' . '/controllers/front/ajax.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit1f7441557b348dfa7bb0221084f52fe6::$classMap;

        }, null, ClassLoader::class);
    }
}
