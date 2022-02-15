<?php

namespace lib\media;

use Context;
use DynamicProduct;
use Tools;

class DynamicEntriesHelper
{

    /** @var DynamicProduct $module */
    public $module;
    /** @var Context $context */
    public $context;

    private static $entries = null;

    public function __construct($module, $context)
    {
        $this->module = $module;
        $this->context = $context;
    }

    public function getEntry($name)
    {
        if (!self::$entries) {
            self::$entries = json_decode(Tools::file_get_contents(__DIR__ . '/entries.json'), true);
        }
        return self::$entries[$name] ?? false;
    }
}
