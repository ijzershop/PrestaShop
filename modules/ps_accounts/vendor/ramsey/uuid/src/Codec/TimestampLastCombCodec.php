<?php
/**
 * This file is part of the ramsey/uuid library
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @copyright Copyright (c) Ben Ramsey <ben@benramsey.com>
 * @license http://opensource.org/licenses/MIT MIT
 * @link https://benramsey.com/projects/ramsey-uuid/ Documentation
 * @link https://packagist.org/packages/ramsey/uuid Packagist
 * @link https://github.com/ramsey/uuid GitHub
 */
namespace Ramsey\Uuid\Codec;

/**
 * TimestampLastCombCodec encodes and decodes COMB UUIDs which have the timestamp as the last 48 bits.
 * To be used with MSSQL.
 */
class TimestampLastCombCodec extends StringCodec
{
}
