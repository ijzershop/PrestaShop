<?php

namespace MolliePrefix;

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
use MolliePrefix\Symfony\Polyfill\Php72 as p;
if (\PHP_VERSION_ID >= 70200) {
    return;
}
if (!\defined('PHP_FLOAT_DIG')) {
    \define('PHP_FLOAT_DIG', 15);
}
if (!\defined('PHP_FLOAT_EPSILON')) {
    \define('PHP_FLOAT_EPSILON', 2.2204460492503E-16);
}
if (!\defined('PHP_FLOAT_MIN')) {
    \define('PHP_FLOAT_MIN', 2.2250738585072E-308);
}
if (!\defined('PHP_FLOAT_MAX')) {
    \define('PHP_FLOAT_MAX', 1.7976931348623157E+308);
}
if (!\defined('PHP_OS_FAMILY')) {
    \define('PHP_OS_FAMILY', \MolliePrefix\Symfony\Polyfill\Php72\Php72::php_os_family());
}
if ('\\' === \DIRECTORY_SEPARATOR && !\function_exists('sapi_windows_vt100_support')) {
    function sapi_windows_vt100_support($stream, $enable = null)
    {
        return \MolliePrefix\Symfony\Polyfill\Php72\Php72::sapi_windows_vt100_support($stream, $enable);
    }
}
if (!\function_exists('stream_isatty')) {
    function stream_isatty($stream)
    {
        return \MolliePrefix\Symfony\Polyfill\Php72\Php72::stream_isatty($stream);
    }
}
if (!\function_exists('utf8_encode')) {
    function utf8_encode($string)
    {
        return \MolliePrefix\Symfony\Polyfill\Php72\Php72::utf8_encode($string);
    }
}
if (!\function_exists('utf8_decode')) {
    function utf8_decode($string)
    {
        return \MolliePrefix\Symfony\Polyfill\Php72\Php72::utf8_decode($string);
    }
}
if (!\function_exists('spl_object_id')) {
    function spl_object_id($object)
    {
        return \MolliePrefix\Symfony\Polyfill\Php72\Php72::spl_object_id($object);
    }
}
if (!\function_exists('MolliePrefix\\mb_ord')) {
    function mb_ord($string, $encoding = null)
    {
        return \MolliePrefix\Symfony\Polyfill\Php72\Php72::mb_ord($string, $encoding);
    }
}
if (!\function_exists('MolliePrefix\\mb_chr')) {
    function mb_chr($codepoint, $encoding = null)
    {
        return \MolliePrefix\Symfony\Polyfill\Php72\Php72::mb_chr($codepoint, $encoding);
    }
}
if (!\function_exists('MolliePrefix\\mb_scrub')) {
    function mb_scrub($string, $encoding = null)
    {
        $encoding = null === $encoding ? \mb_internal_encoding() : $encoding;
        return \mb_convert_encoding($string, $encoding, $encoding);
    }
}
