<?php
/**
 * 2007-2015 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2015 PrestaShop SA
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

use PrestaShop\PrestaShop\Adapter\ServiceLocator;
use PrestaShop\PrestaShop\Core\ContainerBuilder;
use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmerAggregate;

$container_builder = new ContainerBuilder();
$container = $container_builder->build();
ServiceLocator::setServiceContainerInstance($container);

if (!file_exists(_PS_CACHE_DIR_)) {
    @mkdir(_PS_CACHE_DIR_);
    $warmer = new CacheWarmerAggregate([
        new PrestaShopBundle\Cache\LocalizationWarmer(_PS_VERSION_, 'en') //@replace hard-coded Lang
    ]);
    $warmer->warmUp(_PS_CACHE_DIR_);
}

$parametersFilepath = __DIR__. '/../app/config/parameters.php';
$lastParametersModificationTime = (int)@filemtime($parametersFilepath);

if ($lastParametersModificationTime) {
    $lastParametersCacheModificationTime = (int)@filemtime(_PS_CACHE_DIR_. 'appParameters.php');
    if (!$lastParametersCacheModificationTime || $lastParametersCacheModificationTime < $lastParametersModificationTime) {
        // When parameters file is available, update its cache if it is stale.
        if (file_exists($parametersFilepath)) {
            $config = require($parametersFilepath);
            file_put_contents(_PS_CACHE_DIR_ .'appParameters.php', '<?php return ' . var_export($config, true). ';');
        }
    }

    $config = require_once _PS_CACHE_DIR_ .'appParameters.php';

    $database_host = $config['parameters']['database_host'];

    if (!empty($config['parameters']['database_port'])) {
        $database_host .= ':'. $config['parameters']['database_port'];
    }

    define('_DB_SERVER_', $database_host);
    define('_DB_NAME_', $config['parameters']['database_name']);
    define('_DB_USER_', $config['parameters']['database_user']);
    define('_DB_PASSWD_', $config['parameters']['database_password']);
    define('_DB_PREFIX_',  $config['parameters']['database_prefix']);
    define('_MYSQL_ENGINE_',  $config['parameters']['database_engine']);
    define('_PS_CACHING_SYSTEM_',  $config['parameters']['ps_caching']);
    define('_PS_CACHE_ENABLED_', $config['parameters']['ps_cache_enable']);
    define('_COOKIE_KEY_', $config['parameters']['cookie_key']);
    define('_COOKIE_IV_', $config['parameters']['cookie_iv']);
    define('_PS_CREATION_DATE_', $config['parameters']['ps_creation_date']);

    if (isset($config['parameters']['_rijndael_key']) && isset($config['parameters']['_rijndael_iv'])) {
        define('_RIJNDAEL_KEY_', $config['parameters']['_rijndael_key']);
        define('_RIJNDAEL_IV_', $config['parameters']['_rijndael_iv']);
    }
}
