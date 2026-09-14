<?php
declare(strict_types=1);

namespace MsThemeConfig\Form;

use Symfony\Component\Validator\Constraints\Callback;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

final class CategoryDescriptionConstraints
{
    /** category_lang.top_description is MEDIUMTEXT; capacity includes UTF-8 HTML bytes. */
    public const MAX_BYTES = 16777215;

    public static function byteLimit(): Callback
    {
        return new Callback(static function ($value, ExecutionContextInterface $context): void {
            if (is_string($value) && strlen($value) > self::MAX_BYTES) {
                $context->buildViolation('De bovenbeschrijving mag inclusief HTML maximaal 16.777.215 UTF-8-bytes bevatten.')->addViolation();
            }
        });
    }
}
