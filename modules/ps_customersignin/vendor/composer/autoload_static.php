<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit51ac8de2c0e06af8e336a85d7d9cdb1a
{
    public static $classMap = array (
        'Ps_CustomerSignIn' => __DIR__ . '/../..' . '/ps_customersignin.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->classMap = ComposerStaticInit51ac8de2c0e06af8e336a85d7d9cdb1a::$classMap;

        }, null, ClassLoader::class);
    }
}
