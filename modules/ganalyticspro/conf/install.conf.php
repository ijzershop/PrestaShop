<?php
/**
 * Google Analytics : GA4 and Universal-Analytics
 *
 * @author    businesstech.fr <modules@businesstech.fr> - https://www.businesstech.fr/
 * @copyright Business Tech - https://www.businesstech.fr/
 * @license   see file: LICENSE.txt
 *
 *           ____    _______
 *          |  _ \  |__   __|
 *          | |_) |    | |
 *          |  _ <     | |
 *          | |_) |    | |
 *          |____/     |_|
 */

require_once(dirname(__FILE__) . '/common.conf.php');

/* defines install library path */
define('_GAP_PATH_LIB_INSTALL', _GAP_PATH_LIB . 'install/');

/* defines installation sql file */
define('_GAP_INSTALL_SQL_FILE', 'install.sql'); // comment if not use SQL

/* defines uninstallation sql file */
define('_GAP_UNINSTALL_SQL_FILE', 'uninstall.sql'); // comment if not use SQL

/* defines constant for plug SQL install/uninstall debug */
define('_GAP_LOG_JAM_SQL', false); // comment if not use SQL

/* defines constant for plug CONFIG install/uninstall debug */
define('_GAP_LOG_JAM_CONFIG', false);
