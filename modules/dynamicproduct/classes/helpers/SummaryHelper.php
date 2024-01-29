<?php
/**
 * 2010-2022 Tuni-Soft
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * It is available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this module to newer
 * versions in the future. If you wish to customize the module for your
 * needs please refer to
 * http://doc.prestashop.com/display/PS15/Overriding+default+behaviors
 * for more information.
 *
 * @author    Tunis-Soft
 * @copyright 2010-2022 Tuni-Soft
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

namespace classes\helpers;

use classes\DynamicTools;
use Context;
use DynamicProduct;
use Tools;

class SummaryHelper
{
    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function getCachedSummary($summary_name, $id_input, $id_lang, $is_pdf, $is_order_detail)
    {
        if (!DynamicTools::isCacheEnabled()) {
            return false;
        }
        $cache_file = $this->getCacheFile($summary_name, $id_input, $id_lang, $is_pdf, $is_order_detail);
        if (is_file($cache_file)) {
            return Tools::file_get_contents($cache_file);
        }
        return false;
    }

    public function cacheSummary($summary_name, $id_input, $id_lang, $is_pdf, $is_order_detail, $summary)
    {
        $cache_file = $this->getCacheFile($summary_name, $id_input, $id_lang, $is_pdf, $is_order_detail);
        return file_put_contents($cache_file, $summary);
    }

    /**
     * @param $summary_name
     * @param $id_input
     * @param $id_lang
     */
    private function getCacheFile($summary_name, $id_input, $id_lang, $is_pdf, $is_order_detail)
    {
        return $this->module->provider->getDataFile(
            "cache/$summary_name-$id_input-$id_lang-$is_pdf-$is_order_detail.html"
        );
    }
}
