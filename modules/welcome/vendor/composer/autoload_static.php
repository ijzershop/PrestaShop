<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit5ec231eab16a43dbe40b6f4b477a9e58
{
    public static $prefixLengthsPsr4 = array (
        'O' => 
        array (
            'OnBoarding\\' => 11,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'OnBoarding\\' => 
        array (
            0 => __DIR__ . '/../..' . '/OnBoarding',
        ),
    );

    public static $classMap = array (
        'OnBoarding\\Configuration' => __DIR__ . '/../..' . '/OnBoarding/Configuration.php',
        'OnBoarding\\OnBoarding' => __DIR__ . '/../..' . '/OnBoarding/OnBoarding.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit5ec231eab16a43dbe40b6f4b477a9e58::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit5ec231eab16a43dbe40b6f4b477a9e58::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit5ec231eab16a43dbe40b6f4b477a9e58::$classMap;

        }, null, ClassLoader::class);
    }
}
