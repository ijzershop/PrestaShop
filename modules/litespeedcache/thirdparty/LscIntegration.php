<?php
/**
 * LiteSpeed Cache for Prestashop.
 *
 * NOTICE OF LICENSE
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see https://opensource.org/licenses/GPL-3.0 .
 *
 * @author   LiteSpeed Technologies
 * @copyright  Copyright (c) 2017-2018 LiteSpeed Technologies, Inc. (https://www.litespeedtech.com)
 * @license     https://opensource.org/licenses/GPL-3.0
 */

use LiteSpeedCacheLog as LSLog;

abstract class LscIntegration
{
    protected static $integrated = [];

    protected $moduleName;

    protected $esiConf;

    // do not allow public constructor
    protected function __construct()
    {
    }

    public static function isUsed($name)
    {
        return Module::isEnabled($name);
    }

    public static function register()
    {
        $className = get_called_class();
        $name = $className::NAME;
        if ($className::isUsed($name)) {
            $instance = new $className();
            if ($instance->init()) {
                self::$integrated[$name] = ['class' => $instance];
            }
        }
    }

    protected function addJsDef($jsk, $proc)
    {
        if (!isset(self::$integrated['jsdef'])) {
            self::$integrated['jsdef'] = [];
            self::$integrated['jsloc'] = [];
        }
        self::$integrated['jsdef'][$jsk] = ['proc' => $proc];
        $locator = explode(':', $jsk);
        $cur = &self::$integrated['jsloc'];
        while ($key = array_shift($locator)) {
            if (!empty($locator)) {
                $cur[$key] = [];
                $cur = &$cur[$key];
            } else {
                $cur[$key] = $jsk;
            }
        }
    }
    
    protected function addCacheableControllers($controllers)
    {
        LiteSpeedCacheConfig::getInstance()->addExtraPubControllers($controllers);
    }
    
    protected function registerEsiModule()
    {
        if ($this->esiConf && ($this->esiConf instanceof LiteSpeedCacheEsiModConf)) {
            LiteSpeedCacheConfig::getInstance()->registerEsiModule($this->esiConf);

            return true;
        } else {
            if (_LITESPEED_DEBUG_ >= LSLog::LEVEL_NOTICE) {
                LSLog::log(__FUNCTION__ . 'something wrong', LSLog::LEVEL_NOTICE);
            }

            return false;
        }
    }

    protected static function filterCurrentJSKeyVal($key, &$val, &$injected, &$log)
    {
        $def = &self::$integrated['jsdef'];
        if (!isset($def[$key])) {
            return false;
        }
        if (!isset($def[$key]['replace'])) {
            $proc = $def[$key]['proc'];
            $esiParam = ['pt' => LiteSpeedCacheEsiItem::ESI_JSDEF,
                'm' => $proc::NAME,
                'jsk' => $key,
            ];
            $log .= $proc::NAME . ':' . $key . ' ';

            $item = new LiteSpeedCacheEsiItem($esiParam, $proc->esiConf);
            $id = $item->getId();
            $injected[$id] = $item;

            // replacement, hardcoded
            $def[$key]['replace'] = '_LSCESIJS-' . $id . '-START__LSCESIEND_';
            $def[$key]['value'] = json_encode($val); // original
        }
        $val = $def[$key]['replace'];

        return true;
    }

    private static function locateJSKey($key, &$js, &$loc, &$injected, &$log)
    {
        if (!isset($loc[$key])) {
            return null;
        }
        if (is_array($loc[$key]) && is_array($js)) {
            $loc = &$loc[$key];
            foreach ($js as $key2 => &$js2) {
                self::locateJSKey($key2, $js2, $loc, $injected, $log);
            }
        } else {
            $curkey = $loc[$key];
            self::filterCurrentJSKeyVal($curkey, $js, $injected, $log);
        }
    }

    public static function filterJSDef(&$jsDef)
    {
        if (!isset(self::$integrated['jsloc']) || !is_array($jsDef)) {
            return null;
        }

        $injected = [];
        $log = '';

        foreach ($jsDef as $key => &$js) {
            $loc = &self::$integrated['jsloc'];
            self::locateJSKey($key, $js, $loc, $injected, $log);
        }
        if ($log && _LITESPEED_DEBUG_ >= LSLog::LEVEL_ESI_INCLUDE) {
            LSLog::log('filter JSDef = ' . $log, LSLog::LEVEL_ESI_INCLUDE);
        }

        return $injected;
    }

    public static function processJsDef($item)
    {
        $name = $item->getParam('m');
        if (isset(self::$integrated[$name])) {
            $key = $item->getParam('jsk');
            if (isset(self::$integrated['jsdef'][$key]['value'])) {
                $item->setContent(self::$integrated['jsdef'][$key]['value']);

                return;
            }
            $proc = self::$integrated[$name]['class'];
            if (method_exists($proc, 'jsKeyProcess')) {
                $item->setContent($proc->jsKeyProcess($key));

                return;
            }
        }
        $item->setFailed();
    }

    public static function processModField($item)
    {
        $name = $item->getParam('m');
        if (isset(self::$integrated[$name])) {
            $proc = self::$integrated[$name]['class'];
            if (method_exists($proc, 'moduleFieldProcess')) {
                $content = $proc->moduleFieldProcess($item->getParam());
                $item->setContent($content);

                return;
            }
        }
        $item->setFailed();
    }

    protected function addPreDispatchAction($proc)
    {
        if (!isset(self::$integrated['predispatch'])) {
            self::$integrated['predispatch'] = [];
        }
        self::$integrated['predispatch'][] = $proc;
    }

    public static function preDispatchAction()
    {
        if (isset(self::$integrated['predispatch'])) {
            foreach (self::$integrated['predispatch'] as $proc) {
                $proc->actionPreDispatch();
            }
        }
    }

    protected function addCheckPurgeControllerCustomHandler($controller_class, $proc)
    {
        $c = Tools::strtolower($controller_class);
        if (!isset(self::$integrated['checkpurgecontroller'])) {
            self::$integrated['checkpurgecontroller'] = [];
        }
        if (!isset(self::$integrated['checkpurgecontroller'][$c])) {
            self::$integrated['checkpurgecontroller'][$c] = [$proc];
        } else {
            self::$integrated['checkpurgecontroller'][$c][] = $proc;
        }
    }

    /**
     *
     * @param type $controller_class
     * @param type $tags = ['pub' => [], 'priv' => []];
     */
    public static function checkPurgeController($lowercase_controller_class, &$tags)
    {
        if (isset(self::$integrated['checkpurgecontroller'][$lowercase_controller_class])) {
            foreach (self::$integrated['checkpurgecontroller'][$lowercase_controller_class] as $proc) {
                $proc->checkPurgeControllerCustomHandler($lowercase_controller_class, $tags);
            }
        }
    }

    protected function addInitCacheTagAction($proc)
    {
        if (!isset(self::$integrated['initCacheTag'])) {
            self::$integrated['initCacheTag'] = [];
        }
        self::$integrated['initCacheTag'][] = $proc;
    }

    public static function initCacheTagAction($params)
    {
        if (isset(self::$integrated['initCacheTag'])) {
            foreach (self::$integrated['initCacheTag'] as $proc) {
                $tag = $proc->initCacheTagsByController($params);
                if ($tag !== null) {
                    return $tag;
                }
            }
        }
    }

    protected function isLoggedIn()
    {
        $context = Context::getContext();
        return (($context->customer != null) && $context->customer->isLogged());
    }

    abstract protected function init();
}
