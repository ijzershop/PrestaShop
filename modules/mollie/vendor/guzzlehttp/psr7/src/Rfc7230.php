<?php

namespace _PhpScoper5eddef0da618a\GuzzleHttp\Psr7;

final class Rfc7230
{
    /**
     * Header related regular expressions (copied from amphp/http package)
     * (Note: once we require PHP 7.x we could just depend on the upstream package)
     *
     * Note: header delimiter (\r\n) is modified to \r?\n to accept line feed only delimiters for BC reasons.
     *
     * @link    https://github.com/amphp/http/blob/v1.0.1/src/Rfc7230.php#L12-L15
     * @license https://github.com/amphp/http/blob/v1.0.1/LICENSE
     */
    const HEADER_REGEX = "(^([^()<>@,;:\\\"/[\\]?={}\1- ]++):[ \t]*+((?:[ \t]*+[!-~�-�]++)*+)[ \t]*+\r?\n)m";
    const HEADER_FOLD_REGEX = "(\r?\n[ \t]++)";
}
