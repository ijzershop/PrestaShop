<?php

// autoload_real.php @generated by Composer

<<<<<<< HEAD
class ComposerAutoloaderInit05987e847ab5fccfa2b6e73fd3fc378f
=======
class ComposerAutoloaderInit38b579f37f38bc398b41d4d08851e40a
>>>>>>> 0f7e91ca085b84d60ae6add90bdb23427562782f
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

<<<<<<< HEAD
        spl_autoload_register(array('ComposerAutoloaderInit05987e847ab5fccfa2b6e73fd3fc378f', 'loadClassLoader'), true, false);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(\dirname(__FILE__)));
        spl_autoload_unregister(array('ComposerAutoloaderInit05987e847ab5fccfa2b6e73fd3fc378f', 'loadClassLoader'));
=======
        spl_autoload_register(array('ComposerAutoloaderInit38b579f37f38bc398b41d4d08851e40a', 'loadClassLoader'), true, false);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(\dirname(__FILE__)));
        spl_autoload_unregister(array('ComposerAutoloaderInit38b579f37f38bc398b41d4d08851e40a', 'loadClassLoader'));
>>>>>>> 0f7e91ca085b84d60ae6add90bdb23427562782f

        $useStaticLoader = PHP_VERSION_ID >= 50600 && !defined('HHVM_VERSION') && (!function_exists('zend_loader_file_encoded') || !zend_loader_file_encoded());
        if ($useStaticLoader) {
            require __DIR__ . '/autoload_static.php';

<<<<<<< HEAD
            call_user_func(\Composer\Autoload\ComposerStaticInit05987e847ab5fccfa2b6e73fd3fc378f::getInitializer($loader));
=======
            call_user_func(\Composer\Autoload\ComposerStaticInit38b579f37f38bc398b41d4d08851e40a::getInitializer($loader));
>>>>>>> 0f7e91ca085b84d60ae6add90bdb23427562782f
        } else {
            $map = require __DIR__ . '/autoload_namespaces.php';
            foreach ($map as $namespace => $path) {
                $loader->set($namespace, $path);
            }

            $map = require __DIR__ . '/autoload_psr4.php';
            foreach ($map as $namespace => $path) {
                $loader->setPsr4($namespace, $path);
            }

            $classMap = require __DIR__ . '/autoload_classmap.php';
            if ($classMap) {
                $loader->addClassMap($classMap);
            }
        }

        $loader->register(false);

        if ($useStaticLoader) {
<<<<<<< HEAD
            $includeFiles = Composer\Autoload\ComposerStaticInit05987e847ab5fccfa2b6e73fd3fc378f::$files;
=======
            $includeFiles = Composer\Autoload\ComposerStaticInit38b579f37f38bc398b41d4d08851e40a::$files;
>>>>>>> 0f7e91ca085b84d60ae6add90bdb23427562782f
        } else {
            $includeFiles = require __DIR__ . '/autoload_files.php';
        }
        foreach ($includeFiles as $fileIdentifier => $file) {
<<<<<<< HEAD
            composerRequire05987e847ab5fccfa2b6e73fd3fc378f($fileIdentifier, $file);
=======
            composerRequire38b579f37f38bc398b41d4d08851e40a($fileIdentifier, $file);
>>>>>>> 0f7e91ca085b84d60ae6add90bdb23427562782f
        }

        return $loader;
    }
}

<<<<<<< HEAD
function composerRequire05987e847ab5fccfa2b6e73fd3fc378f($fileIdentifier, $file)
=======
function composerRequire38b579f37f38bc398b41d4d08851e40a($fileIdentifier, $file)
>>>>>>> 0f7e91ca085b84d60ae6add90bdb23427562782f
{
    if (empty($GLOBALS['__composer_autoload_files'][$fileIdentifier])) {
        require $file;

        $GLOBALS['__composer_autoload_files'][$fileIdentifier] = true;
    }
}
