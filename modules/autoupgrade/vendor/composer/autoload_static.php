<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbf9e4fba170cfcbaab4cd872179cda91
{
    public static $files = array (
        '320cde22f66dd4f5d3fd621d3e88b98f' => __DIR__ . '/..' . '/symfony/polyfill-ctype/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Symfony\\Polyfill\\Ctype\\' => 23,
            'Symfony\\Component\\Filesystem\\' => 29,
        ),
        'P' => 
        array (
            'PrestaShop\\Module\\AutoUpgrade\\Temp\\' => 35,
            'PrestaShop\\Module\\AutoUpgrade\\' => 30,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Symfony\\Polyfill\\Ctype\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-ctype',
        ),
        'Symfony\\Component\\Filesystem\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/filesystem',
        ),
        'PrestaShop\\Module\\AutoUpgrade\\Temp\\' => 
        array (
            0 => __DIR__ . '/../..' . '/templates',
        ),
        'PrestaShop\\Module\\AutoUpgrade\\' => 
        array (
            0 => __DIR__ . '/../..' . '/classes',
        ),
    );

    public static $prefixesPsr0 = array (
        'D' => 
        array (
            'Doctrine\\Common\\Collections\\' => 
            array (
                0 => __DIR__ . '/..' . '/doctrine/collections/lib',
            ),
        ),
    );

    public static $classMap = array (
        'Doctrine\\Common\\Collections\\AbstractLazyCollection' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/AbstractLazyCollection.php',
        'Doctrine\\Common\\Collections\\ArrayCollection' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/ArrayCollection.php',
        'Doctrine\\Common\\Collections\\Collection' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Collection.php',
        'Doctrine\\Common\\Collections\\Criteria' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Criteria.php',
        'Doctrine\\Common\\Collections\\Expr\\ClosureExpressionVisitor' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Expr/ClosureExpressionVisitor.php',
        'Doctrine\\Common\\Collections\\Expr\\Comparison' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Expr/Comparison.php',
        'Doctrine\\Common\\Collections\\Expr\\CompositeExpression' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Expr/CompositeExpression.php',
        'Doctrine\\Common\\Collections\\Expr\\Expression' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Expr/Expression.php',
        'Doctrine\\Common\\Collections\\Expr\\ExpressionVisitor' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Expr/ExpressionVisitor.php',
        'Doctrine\\Common\\Collections\\Expr\\Value' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Expr/Value.php',
        'Doctrine\\Common\\Collections\\ExpressionBuilder' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/ExpressionBuilder.php',
        'Doctrine\\Common\\Collections\\Selectable' => __DIR__ . '/..' . '/doctrine/collections/lib/Doctrine/Common/Collections/Selectable.php',
        'PrestaShop\\Module\\AutoUpgrade\\AjaxResponse' => __DIR__ . '/../..' . '/classes/AjaxResponse.php',
        'PrestaShop\\Module\\AutoUpgrade\\BackupFinder' => __DIR__ . '/../..' . '/classes/BackupFinder.php',
        'PrestaShop\\Module\\AutoUpgrade\\ChannelInfo' => __DIR__ . '/../..' . '/classes/ChannelInfo.php',
        'PrestaShop\\Module\\AutoUpgrade\\Cookie' => __DIR__ . '/../..' . '/classes/Cookie.php',
        'PrestaShop\\Module\\AutoUpgrade\\ErrorHandler' => __DIR__ . '/../..' . '/classes/ErrorHandler.php',
        'PrestaShop\\Module\\AutoUpgrade\\Log\\LegacyLogger' => __DIR__ . '/../..' . '/classes/Log/LegacyLogger.php',
        'PrestaShop\\Module\\AutoUpgrade\\Log\\Logger' => __DIR__ . '/../..' . '/classes/Log/Logger.php',
        'PrestaShop\\Module\\AutoUpgrade\\Log\\LoggerInterface' => __DIR__ . '/../..' . '/classes/Log/LoggerInterface.php',
        'PrestaShop\\Module\\AutoUpgrade\\Log\\StreamedLogger' => __DIR__ . '/../..' . '/classes/Log/StreamedLogger.php',
        'PrestaShop\\Module\\AutoUpgrade\\LoggedEvent' => __DIR__ . '/../..' . '/classes/LoggedEvent.php',
        'PrestaShop\\Module\\AutoUpgrade\\LoggedEventIo' => __DIR__ . '/../..' . '/classes/LoggedEventIo.php',
        'PrestaShop\\Module\\AutoUpgrade\\Parameters\\FileConfigurationStorage' => __DIR__ . '/../..' . '/classes/Parameters/FileConfigurationStorage.php',
        'PrestaShop\\Module\\AutoUpgrade\\Parameters\\UpgradeConfiguration' => __DIR__ . '/../..' . '/classes/Parameters/UpgradeConfiguration.php',
        'PrestaShop\\Module\\AutoUpgrade\\Parameters\\UpgradeConfigurationStorage' => __DIR__ . '/../..' . '/classes/Parameters/UpgradeConfigurationStorage.php',
        'PrestaShop\\Module\\AutoUpgrade\\Parameters\\UpgradeFileNames' => __DIR__ . '/../..' . '/classes/Parameters/UpgradeFileNames.php',
        'PrestaShop\\Module\\AutoUpgrade\\PrestashopConfiguration' => __DIR__ . '/../..' . '/classes/PrestashopConfiguration.php',
        'PrestaShop\\Module\\AutoUpgrade\\State' => __DIR__ . '/../..' . '/classes/State.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\AbstractTask' => __DIR__ . '/../..' . '/classes/TaskRunner/AbstractTask.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\ChainedTasks' => __DIR__ . '/../..' . '/classes/TaskRunner/ChainedTasks.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Miscellaneous\\CheckFilesVersion' => __DIR__ . '/../..' . '/classes/TaskRunner/Miscellaneous/CheckFilesVersion.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Miscellaneous\\CompareReleases' => __DIR__ . '/../..' . '/classes/TaskRunner/Miscellaneous/CompareReleases.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Miscellaneous\\GetChannelInfo' => __DIR__ . '/../..' . '/classes/TaskRunner/Miscellaneous/GetChannelInfo.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Miscellaneous\\UpdateConfig' => __DIR__ . '/../..' . '/classes/TaskRunner/Miscellaneous/UpdateConfig.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\NullTask' => __DIR__ . '/../..' . '/classes/TaskRunner/NullTask.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Rollback\\AllRollbackTasks' => __DIR__ . '/../..' . '/classes/TaskRunner/Rollback/AllRollbackTasks.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Rollback\\NoRollbackFound' => __DIR__ . '/../..' . '/classes/TaskRunner/Rollback/NoRollbackFound.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Rollback\\RestoreDb' => __DIR__ . '/../..' . '/classes/TaskRunner/Rollback/RestoreDb.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Rollback\\RestoreFiles' => __DIR__ . '/../..' . '/classes/TaskRunner/Rollback/RestoreFiles.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Rollback\\Rollback' => __DIR__ . '/../..' . '/classes/TaskRunner/Rollback/Rollback.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Rollback\\RollbackComplete' => __DIR__ . '/../..' . '/classes/TaskRunner/Rollback/RollbackComplete.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\AllUpgradeTasks' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/AllUpgradeTasks.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\BackupDb' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/BackupDb.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\BackupFiles' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/BackupFiles.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\CleanDatabase' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/CleanDatabase.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\Download' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/Download.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\RemoveSamples' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/RemoveSamples.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\Unzip' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/Unzip.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\UpgradeComplete' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/UpgradeComplete.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\UpgradeDb' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/UpgradeDb.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\UpgradeFiles' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/UpgradeFiles.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\UpgradeModules' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/UpgradeModules.php',
        'PrestaShop\\Module\\AutoUpgrade\\TaskRunner\\Upgrade\\UpgradeNow' => __DIR__ . '/../..' . '/classes/TaskRunner/Upgrade/UpgradeNow.php',
        'PrestaShop\\Module\\AutoUpgrade\\Tools14' => __DIR__ . '/../..' . '/classes/Tools14.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\Block\\ChannelInfoBlock' => __DIR__ . '/../..' . '/classes/Twig/Block/ChannelInfoBlock.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\Block\\RollbackForm' => __DIR__ . '/../..' . '/classes/Twig/Block/RollbackForm.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\Block\\UpgradeButtonBlock' => __DIR__ . '/../..' . '/classes/Twig/Block/UpgradeButtonBlock.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\Block\\UpgradeChecklist' => __DIR__ . '/../..' . '/classes/Twig/Block/UpgradeChecklist.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\Form\\BackupOptionsForm' => __DIR__ . '/../..' . '/classes/Twig/Form/BackupOptionsForm.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\Form\\FormRenderer' => __DIR__ . '/../..' . '/classes/Twig/Form/FormRenderer.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\Form\\UpgradeOptionsForm' => __DIR__ . '/../..' . '/classes/Twig/Form/UpgradeOptionsForm.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\TransFilterExtension' => __DIR__ . '/../..' . '/classes/Twig/TransFilterExtension.php',
        'PrestaShop\\Module\\AutoUpgrade\\Twig\\TransFilterExtension3' => __DIR__ . '/../..' . '/classes/Twig/TransFilterExtension3.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeContainer' => __DIR__ . '/../..' . '/classes/UpgradeContainer.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeException' => __DIR__ . '/../..' . '/classes/UpgradeException.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradePage' => __DIR__ . '/../..' . '/classes/UpgradePage.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeSelfCheck' => __DIR__ . '/../..' . '/classes/UpgradeSelfCheck.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\CacheCleaner' => __DIR__ . '/../..' . '/classes/UpgradeTools/CacheCleaner.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\CoreUpgrader\\CoreUpgrader' => __DIR__ . '/../..' . '/classes/UpgradeTools/CoreUpgrader/CoreUpgrader.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\CoreUpgrader\\CoreUpgrader17' => __DIR__ . '/../..' . '/classes/UpgradeTools/CoreUpgrader/CoreUpgrader17.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\CoreUpgrader\\CoreUpgrader80' => __DIR__ . '/../..' . '/classes/UpgradeTools/CoreUpgrader/CoreUpgrader80.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\CoreUpgrader\\CoreUpgrader81' => __DIR__ . '/../..' . '/classes/UpgradeTools/CoreUpgrader/CoreUpgrader81.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\Database' => __DIR__ . '/../..' . '/classes/UpgradeTools/Database.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\FileFilter' => __DIR__ . '/../..' . '/classes/UpgradeTools/FileFilter.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\FilesystemAdapter' => __DIR__ . '/../..' . '/classes/UpgradeTools/FilesystemAdapter.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\ModuleAdapter' => __DIR__ . '/../..' . '/classes/UpgradeTools/ModuleAdapter.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\SymfonyAdapter' => __DIR__ . '/../..' . '/classes/UpgradeTools/SymfonyAdapter.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\TaskRepository' => __DIR__ . '/../..' . '/classes/UpgradeTools/TaskRepository.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\ThemeAdapter' => __DIR__ . '/../..' . '/classes/UpgradeTools/ThemeAdapter.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\Translation' => __DIR__ . '/../..' . '/classes/UpgradeTools/Translation.php',
        'PrestaShop\\Module\\AutoUpgrade\\UpgradeTools\\Translator' => __DIR__ . '/../..' . '/classes/UpgradeTools/Translator.php',
        'PrestaShop\\Module\\AutoUpgrade\\Upgrader' => __DIR__ . '/../..' . '/classes/Upgrader.php',
        'PrestaShop\\Module\\AutoUpgrade\\Workspace' => __DIR__ . '/../..' . '/classes/Workspace.php',
        'PrestaShop\\Module\\AutoUpgrade\\Xml\\ChecksumCompare' => __DIR__ . '/../..' . '/classes/Xml/ChecksumCompare.php',
        'PrestaShop\\Module\\AutoUpgrade\\Xml\\FileLoader' => __DIR__ . '/../..' . '/classes/Xml/FileLoader.php',
        'PrestaShop\\Module\\AutoUpgrade\\ZipAction' => __DIR__ . '/../..' . '/classes/ZipAction.php',
        'Symfony\\Component\\Filesystem\\Exception\\ExceptionInterface' => __DIR__ . '/..' . '/symfony/filesystem/Exception/ExceptionInterface.php',
        'Symfony\\Component\\Filesystem\\Exception\\FileNotFoundException' => __DIR__ . '/..' . '/symfony/filesystem/Exception/FileNotFoundException.php',
        'Symfony\\Component\\Filesystem\\Exception\\IOException' => __DIR__ . '/..' . '/symfony/filesystem/Exception/IOException.php',
        'Symfony\\Component\\Filesystem\\Exception\\IOExceptionInterface' => __DIR__ . '/..' . '/symfony/filesystem/Exception/IOExceptionInterface.php',
        'Symfony\\Component\\Filesystem\\Filesystem' => __DIR__ . '/..' . '/symfony/filesystem/Filesystem.php',
        'Symfony\\Component\\Filesystem\\LockHandler' => __DIR__ . '/..' . '/symfony/filesystem/LockHandler.php',
        'Symfony\\Polyfill\\Ctype\\Ctype' => __DIR__ . '/..' . '/symfony/polyfill-ctype/Ctype.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbf9e4fba170cfcbaab4cd872179cda91::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbf9e4fba170cfcbaab4cd872179cda91::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitbf9e4fba170cfcbaab4cd872179cda91::$prefixesPsr0;
            $loader->classMap = ComposerStaticInitbf9e4fba170cfcbaab4cd872179cda91::$classMap;

        }, null, ClassLoader::class);
    }
}
