<?php
/**
 * Mollie       https://www.mollie.nl
 *
 * @author      Mollie B.V. <info@mollie.nl>
 * @copyright   Mollie B.V.
 * @license     https://github.com/mollie/PrestaShop/blob/master/LICENSE.md
 *
 * @see        https://github.com/mollie/PrestaShop
 * @codingStandardsIgnoreStart
 */

namespace Mollie\Handler\ErrorHandler;

use Raven_Client;

/**
 * Inheritance allow us to check data generated by Raven and filter errors
 * that are not related to the module.
 * Raven does not filter errors by itself depending on the appPath and any
 * excludedAppPaths, but declares what phase of the stack trace is outside the app.
 * We use this data to allow each module filtering their own errors.
 *
 * IMPORTANT NOTE: This class is present is this module during the
 * stabilisation phase, and will be moved later in a library.
 */
class ModuleFilteredRavenClient extends Raven_Client
{
    /**
     * @var string[]|null
     */
    protected $excluded_domains;

    public function capture($data, $stack = null, $vars = null)
    {
        /*
            Content of $data:
            array:2 [▼
            "exception" => array:1 [▼
                "values" => array:1 [▼
                    0 => array:3 [▼
                        "value" => "Class 'DogeInPsFacebook' not found"
                        "type" => "Error"
                        "stacktrace" => array:1 [▼
                            "frames" => array:4 [▼
                                0 => array:7 [▼
                                    "filename" => "index.php"
                                    "lineno" => 93
                                    "function" => null
                                    "pre_context" => array:5 [▶]
                                    "context_line" => "    Dispatcher::getInstance()->dispatch();"
                                    "post_context" => array:2 [▶]
                                    "in_app" => false
                    1 => array:3 [▼
                        [Can be defined when a subexception is set]

        */
        if (!isset($data['exception']['values'][0]['stacktrace']['frames'])) {
            return null;
        }

        $allowCapture = false;
        foreach ($data['exception']['values'] as $errorValues) {
            $allowCapture = $allowCapture || $this->isErrorInApp($errorValues);
        }

        if (!$allowCapture) {
            return null;
        }

        return parent::capture($data, $stack, $vars);
    }

    /**
     * @return bool
     */
    private function isErrorInApp(array $data)
    {
        $atLeastOneFileIsInApp = false;
        foreach ($data['stacktrace']['frames'] as $frame) {
            $atLeastOneFileIsInApp = $atLeastOneFileIsInApp || ((isset($frame['in_app']) && $frame['in_app']));
        }

        return $atLeastOneFileIsInApp;
    }

    /**
     * @return self
     */
    public function setExcludedDomains(array $domains)
    {
        $this->excluded_domains = $domains;

        return $this;
    }
}
