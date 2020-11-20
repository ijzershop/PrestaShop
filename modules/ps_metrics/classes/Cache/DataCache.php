<?php
/**
 * 2007-2020 PrestaShop and Contributors
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2020 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

namespace PrestaShop\Module\Ps_metrics\Cache;

use PrestaShop\Module\Ps_metrics\Environment\CacheEnv;
use PrestaShop\Module\Ps_metrics\Helper\JsonHelper;
use PrestaShopLogger;

class DataCache
{
    const CACHE_TIME = 3600;

    /**
     * @var JsonHelper
     */
    private $jsonHelper;

    /**
     * @var array|string
     */
    private $param;

    /**
     * @var CacheDirectory
     */
    private $cacheDirectory;

    /**
     * @var CacheEnv
     */
    private $cacheEnv;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {
        $this->jsonHelper = new JsonHelper();
        $this->cacheDirectory = new CacheDirectory();
        $this->cacheEnv = new CacheEnv();
    }

    /**
     * Get cache if exists
     *
     * @param array|string $param
     *
     * @return mixed
     */
    public function get($param)
    {
        // If cache disabled, return false directly
        if (false === $this->cacheEnv->getCacheEnv()) {
            return false;
        }

        if (false === $this->cacheDirectory->isReadable()) {
            PrestaShopLogger::addLog('[PS_METRICS] Cache folder is not readable', 3);

            return false;
        }

        $this->setParam($param);
        $cacheFileName = $this->cacheDirectory->getPath() . $this->getCacheFileName();

        if ($this->cacheExists($cacheFileName)) {
            return $this->jsonHelper->jsonDecode(
                file_get_contents($cacheFileName),
                true
            );
        }

        return false;
    }

    /**
     * Set cache
     *
     * @param mixed $data
     * @param string $cacheName
     *
     * @return mixed
     */
    public function set($data, $cacheName = null)
    {
        // If cache disabled, return $data directly
        if (false === $this->cacheEnv->getCacheEnv()) {
            return $data;
        }

        if (false === $this->cacheDirectory->isWritable()) {
            PrestaShopLogger::addLog('[PS_METRICS] Cache folder is not writable', 3);

            return $data;
        }

        if (null === $cacheName) {
            $this->setParam($data);
        } else {
            $this->setParam($cacheName);
        }

        $cacheFileName = $this->cacheDirectory->getPath() . $this->getCacheFileName();
        $jsonData = $this->jsonHelper->jsonEncode($data);

        if (false === @file_put_contents($cacheFileName, $jsonData)) {
            PrestaShopLogger::addLog('[PS_METRICS] Unable to create data cache', 3);
        }

        return $data;
    }

    /**
     * Cache File name
     *
     * @return string
     */
    private function getCacheFileName()
    {
        return md5($this->getParam()) . '.ps_metrics.cache';
    }

    /**
     * Check if cache exist and if last time modified < 1hour
     *
     * @param string $cacheFile
     *
     * @return bool
     */
    private function cacheExists($cacheFile)
    {
        if (!file_exists($cacheFile)) {
            return false;
        }

        if (filemtime($cacheFile) < (time() - self::CACHE_TIME)) {
            return false;
        }

        return true;
    }

    /**
     * setParam
     *
     * @param array|string $param
     *
     * @return void
     */
    private function setParam($param)
    {
        $this->param = $param;
    }

    /**
     * Return a string by transforming param to json if is array
     *
     * @return string
     */
    private function getParam()
    {
        if (is_array($this->param)) {
            return $this->jsonHelper->jsonEncode($this->param);
        }

        return $this->param;
    }

    /**
     * Delete all metrics cache
     *
     * @return bool
     */
    public function deleteAllCache()
    {
        if (false === $this->cacheDirectory->isWritable()) {
            PrestaShopLogger::addLog('[PS_METRICS] Not able to delete the cache. Cache folder is not writable', 3);

            return false;
        }

        $files = glob($this->cacheDirectory->getPath() . '*.ps_metrics.cache');

        foreach ($files as $file) {
            if (file_exists($file)) {
                unlink($file);
            }
        }

        return true;
    }
}
