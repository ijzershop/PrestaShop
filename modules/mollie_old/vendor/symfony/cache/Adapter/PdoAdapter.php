<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace _PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter;

use _PhpScoper5eddef0da618a\Doctrine\DBAL\Connection;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Exception\InvalidArgumentException;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\PruneableInterface;
use _PhpScoper5eddef0da618a\Symfony\Component\Cache\Traits\PdoTrait;
class PdoAdapter extends \_PhpScoper5eddef0da618a\Symfony\Component\Cache\Adapter\AbstractAdapter implements \_PhpScoper5eddef0da618a\Symfony\Component\Cache\PruneableInterface
{
    use PdoTrait;
    protected $maxIdLength = 255;
    /**
     * You can either pass an existing database connection as PDO instance or
     * a Doctrine DBAL Connection or a DSN string that will be used to
     * lazy-connect to the database when the cache is actually used.
     *
     * List of available options:
     *  * db_table: The name of the table [default: cache_items]
     *  * db_id_col: The column where to store the cache id [default: item_id]
     *  * db_data_col: The column where to store the cache data [default: item_data]
     *  * db_lifetime_col: The column where to store the lifetime [default: item_lifetime]
     *  * db_time_col: The column where to store the timestamp [default: item_time]
     *  * db_username: The username when lazy-connect [default: '']
     *  * db_password: The password when lazy-connect [default: '']
     *  * db_connection_options: An array of driver-specific connection options [default: []]
     *
     * @param \PDO|Connection|string $connOrDsn       A \PDO or Connection instance or DSN string or null
     * @param string                 $namespace
     * @param int                    $defaultLifetime
     * @param array                  $options         An associative array of options
     *
     * @throws InvalidArgumentException When first argument is not PDO nor Connection nor string
     * @throws InvalidArgumentException When PDO error mode is not PDO::ERRMODE_EXCEPTION
     * @throws InvalidArgumentException When namespace contains invalid characters
     */
    public function __construct($connOrDsn, $namespace = '', $defaultLifetime = 0, array $options = [])
    {
        $this->init($connOrDsn, $namespace, $defaultLifetime, $options);
    }
}
