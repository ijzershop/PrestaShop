<?php

namespace MolliePrefix;

// Don't redefine the functions if included multiple times.
if (!\function_exists('MolliePrefix\\GuzzleHttp\\Promise\\promise_for')) {
    require __DIR__ . '/functions.php';
}
