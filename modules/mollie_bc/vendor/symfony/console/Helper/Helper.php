<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Console\Helper;

use Symfony\Component\Console\Formatter\OutputFormatterInterface;
use Symfony\Component\String\UnicodeString;

/**
 * Helper is the base class for all helper classes.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 */
abstract class Helper implements HelperInterface
{
    protected $helperSet;

    /**
     * @return void
     */
    public function setHelperSet(HelperSet $helperSet = null)
    {
        if (1 > \func_num_args()) {
            trigger_deprecation('symfony/console', '6.2', 'Calling "%s()" without any arguments is deprecated, pass null explicitly instead.', __METHOD__);
        }
        $this->helperSet = $helperSet;
    }

    public function getHelperSet(): ?HelperSet
    {
        return $this->helperSet;
    }

    /**
     * Returns the width of a string, using mb_strwidth if it is available.
     * The width is how many characters positions the string will use.
     */
    public static function width(?string $string): int
    {
        $string ??= '';

        if (preg_match('//u', $string)) {
            return (new UnicodeString($string))->width(false);
        }

        if (false === $encoding = mb_detect_encoding($string, null, true)) {
            return \strlen($string);
        }

        return mb_strwidth($string, $encoding);
    }

    /**
     * Returns the length of a string, using mb_strlen if it is available.
     * The length is related to how many bytes the string will use.
     */
    public static function length(?string $string): int
    {
        $string ??= '';

        if (preg_match('//u', $string)) {
            return (new UnicodeString($string))->length();
        }

        if (false === $encoding = mb_detect_encoding($string, null, true)) {
            return \strlen($string);
        }

        return mb_strlen($string, $encoding);
    }

    /**
     * Returns the subset of a string, using mb_substr if it is available.
     */
    public static function substr(?string $string, int $from, int $length = null): string
    {
        $string ??= '';

        if (false === $encoding = mb_detect_encoding($string, null, true)) {
            return substr($string, $from, $length);
        }

        return mb_substr($string, $from, $length, $encoding);
    }

    /**
     * @return string
     */
    public static function formatTime(int|float $secs)
    {
        static $timeFormats = [
            [0, '< 1 sec'],
            [1, '1 sec'],
            [2, 'secs', 1],
            [60, '1 min'],
            [120, 'mins', 60],
            [3600, '1 hr'],
            [7200, 'hrs', 3600],
            [86400, '1 day'],
            [172800, 'days', 86400],
        ];

        foreach ($timeFormats as $index => $format) {
            if ($secs >= $format[0]) {
                if ((isset($timeFormats[$index + 1]) && $secs < $timeFormats[$index + 1][0])
                    || $index == \count($timeFormats) - 1
                ) {
                    if (2 == \count($format)) {
                        return $format[1];
                    }

                    return floor($secs / $format[2]).' '.$format[1];
                }
            }
        }
    }

    /**
     * @return string
     */
    public static function formatMemory(int $memory)
    {
        if ($memory >= 1024 * 1024 * 1024) {
            return sprintf('%.1f GiB', $memory / 1024 / 1024 / 1024);
        }

        if ($memory >= 1024 * 1024) {
            return sprintf('%.1f MiB', $memory / 1024 / 1024);
        }

        if ($memory >= 1024) {
            return sprintf('%d KiB', $memory / 1024);
        }

        return sprintf('%d B', $memory);
    }

    /**
     * @return string
     */
    public static function removeDecoration(OutputFormatterInterface $formatter, ?string $string)
    {
        $isDecorated = $formatter->isDecorated();
        $formatter->setDecorated(false);
        // remove <...> formatting
        $string = $formatter->format($string ?? '');
        // remove already formatted characters
        $string = preg_replace("/\033\[[^m]*m/", '', $string ?? '');
        // remove terminal hyperlinks
        $string = preg_replace('/\\033]8;[^;]*;[^\\033]*\\033\\\\/', '', $string ?? '');
        $formatter->setDecorated($isDecorated);

        return $string;
    }
}
