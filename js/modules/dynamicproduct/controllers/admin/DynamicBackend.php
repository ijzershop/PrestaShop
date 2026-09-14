<?php
/**
 * 2007-2026 TuniSoft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
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
 * @author    TuniSoft (tunisoft.solutions@gmail.com)
 * @copyright 2007-2026 TuniSoft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 *  International Registered Trademark & Property of PrestaShop SA
 */
if (!defined('_PS_VERSION_')) {
    exit;
}
/**
 * Backend endpoint for sveltekit apps
 *
 * @noinspection PhpUnused called by prestashop internally
 */
class DynamicBackendController extends ModuleAdminController
{
    /** @var DynamicProduct */
    public $module;
    public $action;
    public $id_product;
    public $id_default_lang;

    public function __construct()
    {
        if (empty($_POST)) {
            $_POST = json_decode(Tools::file_get_contents('php://input'), true);
            if (is_null($_POST)) {
                $_POST = [];
            }
        }
        parent::__construct();
    }

    public function postProcess()
    {
        $source = basename(__FILE__, '.php');

        $method = $_SERVER['REQUEST_METHOD'];

        /** @var DynamicProduct $module */
        $module = Module::getInstanceByName('dynamicproduct');

        $app_path = 'lib/apps/admin/src';
        $base_dir = $module->getLocalPath() . $app_path;

        header('Content-Type: application/json');

        if ($method == 'GET') {
            if (!Tools::getIsset('route')) {
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(['error' => true, 'message' => 'The route parameter is required']);
                exit;
            }
            $route = Tools::getValue('route');
            $type = Tools::getValue('type', 'page');
            $route_path = $base_dir . '/routes' . $route . "/+$type.server.php";
            if (file_exists($route_path)) {
                include $route_path;

                $action = Tools::getValue('action');
                if ($action && class_exists('\DynamicProduct\Actions')) {
                    if (!method_exists('\DynamicProduct\Actions', $action)) {
                        header('HTTP/1.0 404 Not Found');
                        echo json_encode(['error' => true, 'message' => 'Action ' . $action . ' not found']);
                        exit;
                    }
                    DynamicProduct\Actions::$module = $module;
                    try {
                        $data = DynamicProduct\Actions::$action();
                    } catch (Exception $e) {
                        if (_PS_MODE_DEV_) {
                            throw $e;
                        }
                        header('HTTP/1.0 500 Internal Server Error');
                        echo json_encode(['error' => true, 'message' => $e->getMessage()]);
                        exit;
                    }
                    if (is_array($data) && !isset($data['error'])) {
                        $data['success'] = true;
                    }
                    echo json_encode($data);
                    exit;
                }

                if (function_exists('\DynamicProduct\load')) {
                    try {
                        $data = \DynamicProduct\load($module);
                    } catch (Exception $e) {
                        if (_PS_MODE_DEV_) {
                            throw $e;
                        }
                        header('HTTP/1.0 500 Internal Server Error');
                        echo json_encode(['error' => true, 'message' => $e->getMessage()]);
                        exit;
                    }
                    echo json_encode($data);
                    exit;
                } else {
                    header('HTTP/1.0 404 Not Found');
                    echo json_encode(['error' => true, 'message' => 'Load function not found']);
                }
            } else {
                header('HTTP/1.0 404 Not Found');
                echo json_encode(['error' => true, 'message' => 'Route not found']);
            }
        }

        if ($method == 'POST') {
            if (!Tools::getIsset('route')) {
                header('HTTP/1.0 400 Bad Request');
                echo json_encode(['error' => true, 'message' => 'The route parameter is required']);
                exit;
            }
            $route = Tools::getValue('route');
            $type = Tools::getValue('type', 'page');
            $route_path = $base_dir . '/routes' . $route . "/+$type.server.php";
            if (file_exists($route_path)) {
                include $route_path;
                if (class_exists('\DynamicProduct\Actions')) {
                    $action = Tools::getValue('action', 'default');
                    if (!method_exists('\DynamicProduct\Actions', $action)) {
                        header('HTTP/1.0 404 Not Found');
                        echo json_encode(['error' => true, 'message' => 'Action ' . $action . ' not found']);
                        exit;
                    }
                    DynamicProduct\Actions::$module = $module;
                    try {
                        $data = DynamicProduct\Actions::$action();
                    } catch (Exception $e) {
                        if (_PS_MODE_DEV_) {
                            throw $e;
                        }
                        header('HTTP/1.0 500 Internal Server Error');
                        echo json_encode(['error' => true, 'message' => $e->getMessage()]);
                        exit;
                    }
                    if (is_array($data) && !isset($data['error'])) {
                        $data['success'] = true;
                    }
                    echo json_encode($data);
                    exit;
                } else {
                    header('HTTP/1.0 404 Not Found');
                    echo json_encode(['error' => true, 'message' => 'Actions not found']);
                }
            } else {
                header('HTTP/1.0 404 Not Found');
                echo json_encode(['error' => true, 'message' => 'Route not found']);
            }
        }

        exit;
    }
}
